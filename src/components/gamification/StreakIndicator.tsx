"use client";

import { useEffect, useState } from "react";
import { useGamification } from "@/lib/hooks/useGamification";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface StreakIndicatorProps {
  uid: string | undefined;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function StreakIndicator({ uid }: StreakIndicatorProps) {
  const { data, recordActivity } = useGamification(uid);
  const [pulsing, setPulsing] = useState(false);

  const streak = data?.currentStreak ?? 0;
  const longest = data?.longestStreak ?? 0;

  // Record activity on mount
  useEffect(() => {
    if (uid) {
      recordActivity();
    }
  }, [uid, recordActivity]);

  // Pulse when streak increases
  useEffect(() => {
    if (streak > 0) {
      setPulsing(true);
      const t = setTimeout(() => setPulsing(false), 800);
      return () => clearTimeout(t);
    }
  }, [streak]);

  if (!uid) return null;

  const hasStreak = streak > 0;

  return (
    <div className="group relative flex items-center gap-1.5">
      <span
        className={[
          "text-lg transition-transform",
          pulsing ? "animate-fade-in-up" : "",
          hasStreak ? "text-brand-orange-400" : "text-[var(--color-text-muted)]",
        ].join(" ")}
        aria-hidden="true"
      >
        🔥
      </span>
      {hasStreak && (
        <span className="text-xs font-semibold tabular-nums text-[var(--color-text-primary)]">
          {streak}
        </span>
      )}
      {!hasStreak && (
        <span className="text-xs text-[var(--color-text-muted)]">0</span>
      )}

      {/* Tooltip */}
      <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {hasStreak
          ? `Streak: ${streak} day${streak !== 1 ? "s" : ""} · Best: ${longest}`
          : "Study daily to build a streak!"}
      </div>
    </div>
  );
}
