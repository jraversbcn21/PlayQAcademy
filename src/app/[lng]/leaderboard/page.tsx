"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { fetchLeaderboard } from "@/lib/hooks/useGamification";
import { getLevelFromPoints } from "@/lib/gamification/levels";
import type { LeaderboardEntry } from "@/types/gamification";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function MedalIcon({ rank }: { rank: number }): ReactNode {
  if (rank === 1) return <span className="text-xl">🥇</span>;
  if (rank === 2) return <span className="text-xl">🥈</span>;
  if (rank === 3) return <span className="text-xl">🥉</span>;
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] text-xs font-bold text-[var(--color-text-muted)]">
      {rank}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Skeleton row                                                       */
/* ------------------------------------------------------------------ */

function SkeletonRow() {
  return (
    <div className="flex animate-pulse items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
      <div className="h-7 w-7 rounded-full bg-[var(--color-bg-elevated)]" />
      <div className="h-8 w-8 rounded-full bg-[var(--color-bg-elevated)]" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 rounded bg-[var(--color-bg-elevated)]" />
        <div className="h-2 w-20 rounded bg-[var(--color-bg-elevated)]" />
      </div>
      <div className="h-4 w-12 rounded bg-[var(--color-bg-elevated)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface LeaderboardPageProps {
  params: { lng: string };
}

export default function LeaderboardPage({ params: { lng } }: LeaderboardPageProps) {
  const { t: _t } = useTranslation("common");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push(`/${lng}/auth/sign-in`);
  }, [authLoading, user, lng, router]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const { entries: data } = await fetchLeaderboard(50);
        if (!cancelled) setEntries(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {lng === "es" ? "Ranking" : "Leaderboard"}
        </h1>
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          {lng === "es" ? "Top 50 estudiantes por puntos" : "Top 50 students by points"}
        </p>

        {loading && (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && entries.length === 0 && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-12 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">
              {lng === "es" ? "No hay datos del ranking todavía." : "No leaderboard data yet."}
            </p>
          </div>
        )}

        {!loading && !error && entries.length > 0 && (
          <div className="space-y-2">
            {entries.map((entry) => {
              const isCurrentUser = entry.uid === user.uid;
              const levelInfo = getLevelFromPoints(entry.totalPoints);
              const levelTitle = levelInfo.title[lng as "es" | "en"] ?? levelInfo.title.en;

              return (
                <div
                  key={entry.uid}
                  className={[
                    "flex items-center gap-4 rounded-xl border p-4 transition-colors",
                    isCurrentUser
                      ? "border-brand-blue-500/40 bg-brand-blue-500/5"
                      : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-elevated)]",
                  ].join(" ")}
                >
                  {/* Rank */}
                  <div className="w-8 shrink-0 text-center">
                    <MedalIcon rank={entry.rank} />
                  </div>

                  {/* Avatar */}
                  {entry.photoURL ? (
                    <img
                      src={entry.photoURL}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue-500/20 text-xs font-bold text-brand-blue-400">
                      {(entry.displayName ?? "?")[0]?.toUpperCase()}
                    </div>
                  )}

                  {/* Name + level */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                      {entry.displayName}
                      {isCurrentUser && (
                        <span className="ml-2 text-[10px] text-brand-blue-400">({lng === "es" ? "Tú" : "You"})</span>
                      )}
                    </p>
                    <p className="truncate text-xs text-[var(--color-text-muted)]">
                      Lv.{entry.level} {levelTitle}
                    </p>
                  </div>

                  {/* Points + badges */}
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-bold tabular-nums text-brand-green-400">
                      {entry.totalPoints.toLocaleString()} pts
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {entry.badgeCount} {lng === "es" ? "insignias" : "badges"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
