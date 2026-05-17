"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useTranslation } from "@/lib/i18n/client";
import type { Bilingual } from "@/types/lesson";
import { useAuth } from "@/context/AuthContext";
import { useGamificationUI } from "@/context/GamificationContext";
import { recordExerciseCompleted } from "@/lib/hooks/useGamification";
import { getLevelFromPoints } from "@/lib/gamification/levels";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface ExerciseSectionProps {
  exerciseId: string;
  instructions: Bilingual;
  starterCode: string;
  solution: string;
  hints: Bilingual[];
  lng: string;
  moduleId?: string;
  lessonId?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ExerciseSectionRenderer({
  exerciseId,
  instructions,
  starterCode,
  solution,
  hints,
  lng,
  moduleId,
  lessonId,
}: ExerciseSectionProps) {
  const { t } = useTranslation("common");
  const { user } = useAuth();
  const { queueBadges, triggerLevelUp } = useGamificationUI();

  const [shownHints, setShownHints] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [tried, setTried] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userCode, setUserCode] = useState(starterCode);
  const [recording, setRecording] = useState(false);

  const instText = (instructions as Record<string, string>)[lng] ?? instructions.en;

  const showNextHint = useCallback(() => {
    setShownHints((prev) => Math.min(prev + 1, hints.length));
  }, [hints.length]);

  const handleMarkAsTried = useCallback(async () => {
    if (recording) return;
    setTried(true);

    if (user) {
      setRecording(true);
      const exId = exerciseId.includes("__") ? exerciseId : `${moduleId ?? "unknown"}__${lessonId ?? "unknown"}__${exerciseId}`;
      try {
        const result = await recordExerciseCompleted(user.uid, {
          exerciseId: exId,
          moduleId: moduleId ?? "unknown",
        });

        if (result.newBadges.length > 0) {
          queueBadges(result.newBadges);
        }
        if (result.levelChanged) {
          triggerLevelUp(
            getLevelFromPoints(result.totalPoints - result.pointsAwarded),
            getLevelFromPoints(result.totalPoints),
          );
        }
      } catch {
        // Non-blocking
      } finally {
        setRecording(false);
      }
    }
  }, [recording, exerciseId, moduleId, lessonId, user, queueBadges, triggerLevelUp]);

  return (
    <div className="not-prose my-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-brand-blue-500/5 px-5 py-3">
        <svg className="h-5 w-5 text-brand-blue-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {t("lesson.practicalExercise")}
        </h3>
      </div>

      {/* Instructions */}
      <div className="p-5 border-b border-[var(--color-border)]">
        <h4 className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">
          {t("lesson.instructions")}
        </h4>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-text-secondary)]">
          {instText}
        </p>
      </div>

      {/* Code editor area */}
      <div className="border-b border-[var(--color-border)] bg-[#0d1117]">
        <div className="flex items-center justify-between px-4 py-2">
          <span className="font-mono text-xs text-[var(--color-text-muted)]">TypeScript</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? t("lesson.readOnly") : t("lesson.tryInEditor")}
          </Button>
        </div>
        {editing ? (
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full resize-y bg-[#0d1117] p-4 pb-6 font-mono text-sm leading-relaxed text-[#c9d1d9] outline-none min-h-[200px]"
            spellCheck={false}
            aria-label="Code editor"
          />
        ) : (
          <pre className="overflow-x-auto p-4 pb-6 font-mono text-sm leading-relaxed text-[#c9d1d9]">
            <code>{userCode}</code>
          </pre>
        )}
      </div>

      {/* Hints section */}
      {shownHints > 0 && (
        <div className="border-b border-[var(--color-border)] bg-amber-500/5 p-5">
          <h4 className="mb-3 text-sm font-medium text-amber-400">
            {t("lesson.hintOf", { current: shownHints, total: hints.length })}
          </h4>
          <div className="space-y-2">
            {hints.slice(0, shownHints).map((hint, idx) => {
              const hintText = (hint as Record<string, string>)[lng] ?? hint.en;
              return (
                <p key={idx} className="text-sm text-[var(--color-text-secondary)]">
                  <span className="mr-2 font-mono text-xs text-amber-400">{idx + 1}.</span>
                  {hintText}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* Solution (revealable) */}
      {showSolution && (
        <div className="border-b border-[var(--color-border)] bg-brand-green-500/5 p-5">
          <h4 className="mb-3 text-sm font-medium text-brand-green-400">
            {t("lesson.solution")}
          </h4>
          <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-sm leading-relaxed text-[#c9d1d9]">
            <code>{solution}</code>
          </pre>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap items-center gap-3 p-5">
        {shownHints < hints.length && (
          <Button variant="secondary" size="sm" onClick={showNextHint}>
            {shownHints === 0 ? t("lesson.showHint") : t("lesson.nextHint")}
          </Button>
        )}

        {shownHints > 0 && !showSolution && (
          <Button variant="secondary" size="sm" onClick={() => setShowSolution(true)}>
            {t("lesson.showSolution")}
          </Button>
        )}

        {showSolution && (
          <Button variant="ghost" size="sm" onClick={() => setShowSolution(false)}>
            {t("lesson.hideSolution")}
          </Button>
        )}

        {!tried && (
          <Button
            variant="primary"
            size="sm"
            className="ml-auto !bg-brand-green-600 hover:!bg-brand-green-500"
            onClick={handleMarkAsTried}
          >
            {t("lesson.markAsTried")}
          </Button>
        )}

        {tried && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand-green-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            {t("lesson.tried")}
          </span>
        )}
      </div>
    </div>
  );
}
