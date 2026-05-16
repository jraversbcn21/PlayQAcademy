"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import type { LevelInfo } from "@/types/gamification";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LevelUpModalProps {
  oldLevel: LevelInfo;
  newLevel: LevelInfo;
  onDismiss: () => void;
  lng: string;
}

/* ------------------------------------------------------------------ */
/*  Animated number                                                    */
/* ------------------------------------------------------------------ */

function AnimatedLevel({ level }: { level: number }) {
  return (
    <span className="animate-fade-in-up text-5xl font-black tabular-nums text-brand-orange-400">
      {level}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LevelUpModal({
  oldLevel,
  newLevel,
  onDismiss,
  lng,
}: LevelUpModalProps) {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setShow(true);
    dialogRef.current?.showModal();
  }, []);

  const dismiss = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
      onDismiss();
    }, 300);
  }, [onDismiss]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") dismiss();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dismiss]);

  const oldTitle = oldLevel.title[lng as "es" | "en"] ?? oldLevel.title.en;
  const newTitle = newLevel.title[lng as "es" | "en"] ?? newLevel.title.en;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto max-w-sm rounded-2xl border border-brand-orange-500/30 bg-[var(--color-bg-secondary)] p-0 shadow-2xl backdrop:bg-black/60"
      onClick={(e) => {
        if (e.target === dialogRef.current) dismiss();
      }}
    >
      <div
        className={[
          "bg-gradient-to-br from-brand-orange-500/10 to-brand-orange-600/5 p-8 text-center transition-all duration-300 rounded-2xl",
          show ? "scale-100 opacity-100" : "scale-90 opacity-0",
        ].join(" ")}
      >
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange-500/20 text-3xl">
          ⬆
        </div>

        {/* Title */}
        <p className="mb-1 text-sm font-medium text-[var(--color-text-muted)]">
          {lng === "es" ? "¡Subiste de nivel!" : "Level Up!"}
        </p>

        {/* Level number */}
        <div className="my-3">
          <AnimatedLevel level={newLevel.level} />
        </div>

        {/* New title */}
        <h2 className="mb-4 text-xl font-bold text-brand-orange-400">
          {newTitle}
        </h2>

        {/* Old → New */}
        <div className="mb-6 flex items-center justify-center gap-2 text-sm">
          <span className="text-[var(--color-text-muted)] line-through">{oldTitle}</span>
          <span className="text-[var(--color-text-muted)]">→</span>
          <span className="font-medium text-[var(--color-text-primary)]">{newTitle}</span>
        </div>

        <Button
          variant="primary"
          onClick={dismiss}
          className="w-full justify-center !bg-brand-orange-500 hover:!bg-brand-orange-400"
        >
          {lng === "es" ? "¡Genial!" : "Awesome!"}
        </Button>
      </div>
    </dialog>
  );
}
