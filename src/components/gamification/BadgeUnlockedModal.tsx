"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Badge } from "@/types/gamification";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface BadgeUnlockedModalProps {
  /** Queue of badges to display. Modal closes when empty. */
  badgeQueue: Badge[];
  /** Called after all badges in queue have been acknowledged. */
  onAllDismissed: () => void;
  lng: string;
}

/* ------------------------------------------------------------------ */
/*  Rarity styling                                                     */
/* ------------------------------------------------------------------ */

const RARITY_GLOW: Record<string, string> = {
  common: "from-slate-500/30 to-slate-600/10 border-slate-500/30",
  rare: "from-brand-forest-500/30 to-brand-forest-600/10 border-brand-forest-500/30",
  epic: "from-purple-500/30 to-purple-600/10 border-purple-500/30",
  legendary: "from-brand-terra-500/40 to-yellow-500/20 border-yellow-500/40",
};

const RARITY_COLOR: Record<string, string> = {
  common: "text-slate-400",
  rare: "text-brand-forest-400",
  epic: "text-purple-400",
  legendary: "text-yellow-400",
};

/* ------------------------------------------------------------------ */
/*  Lightweight CSS confetti                                           */
/* ------------------------------------------------------------------ */

function ConfettiParticles() {
  const colors = ["#3A73DD", "#10B981", "#F97316", "#A855F7", "#FACC15", "#EF4444"];
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 2,
    color: colors[i % colors.length]!,
    size: 4 + Math.random() * 6,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-confetti-fall rounded-sm"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BadgeUnlockedModal({
  badgeQueue,
  onAllDismissed,
  lng,
}: BadgeUnlockedModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const currentBadge = badgeQueue[currentIndex];

  // Animate in when a new badge arrives
  useEffect(() => {
    if (badgeQueue.length > 0) {
      setVisible(true);
      dialogRef.current?.showModal();
    }
  }, [badgeQueue.length]);

  const dismissCurrent = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      if (currentIndex + 1 >= badgeQueue.length) {
        dialogRef.current?.close();
        onAllDismissed();
        setCurrentIndex(0);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setVisible(true);
      }
    }, 200);
  }, [currentIndex, badgeQueue.length, onAllDismissed]);

  // ESC key to dismiss
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismissCurrent();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismissCurrent]);

  if (!currentBadge) return null;

  const name = currentBadge.name[lng as "es" | "en"] ?? currentBadge.name.en;
  const description = currentBadge.description[lng as "es" | "en"] ?? currentBadge.description.en;

  return (
    <>
      <ConfettiParticles />
      <dialog
        ref={dialogRef}
        className="fixed inset-0 z-50 m-auto max-w-sm rounded-2xl border bg-[var(--color-bg-secondary)] p-0 shadow-2xl backdrop:bg-black/60"
        onClick={(e) => {
          if (e.target === dialogRef.current) dismissCurrent();
        }}
      >
        <div
          className={[
            "rounded-2xl bg-gradient-to-br p-8 text-center transition-all duration-300",
            visible ? "scale-100 opacity-100" : "scale-90 opacity-0",
            "border",
            RARITY_GLOW[currentBadge.rarity] ?? RARITY_GLOW.common,
          ].join(" ")}
        >
          {/* Badge icon */}
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-bg-elevated)] text-5xl shadow-lg">
            {currentBadge.icon}
          </div>

          {/* Rarity label */}
          <span className={["mb-2 inline-block text-xs font-semibold uppercase tracking-wider", RARITY_COLOR[currentBadge.rarity] ?? RARITY_COLOR.common].join(" ")}>
            {currentBadge.rarity}
          </span>

          {/* Name */}
          <h2 className="mb-2 text-xl font-bold text-[var(--color-text-primary)]">
            {name}
          </h2>

          {/* Description */}
          <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-muted)]">
            {description}
          </p>

          {/* Points */}
          <p className="mb-6 text-sm font-semibold text-brand-gold-400">
            +{currentBadge.points} pts
          </p>

          {/* Dismiss button */}
          <Button
            variant="primary"
            onClick={dismissCurrent}
            className="w-full justify-center !bg-brand-terra-500 hover:!bg-brand-terra-400"
          >
            Awesome!
          </Button>

          {/* Queue indicator */}
          {badgeQueue.length > 1 && (
            <p className="mt-3 text-xs text-[var(--color-text-muted)]">
              {currentIndex + 1} / {badgeQueue.length}
            </p>
          )}
        </div>
      </dialog>
    </>
  );
}
