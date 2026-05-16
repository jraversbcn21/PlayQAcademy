"use client";

import { useState, useCallback } from "react";
import { useTranslation } from "next-i18next";
import type { Bilingual, QuizOption } from "@/types/lesson";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface QuizSectionProps {
  questionId: string;
  question: Bilingual;
  options: QuizOption[];
  correctOptionId: string;
  explanation: Bilingual;
  lng: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function QuizSectionRenderer({
  questionId: _questionId,
  question,
  options,
  correctOptionId,
  explanation,
  lng,
}: QuizSectionProps) {
  const { t } = useTranslation("common");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const qText = (question as Record<string, string>)[lng] ?? question.en;
  const expText = (explanation as Record<string, string>)[lng] ?? explanation.en;

  function handleSubmit() {
    if (!selectedId) return;
    setSubmitted(true);
    setAttempts((prev) => prev + 1);

    if (selectedId === correctOptionId) {
      setIsCorrect(true);
    }
  }

  function handleRetry() {
    setSubmitted(false);
    setSelectedId(null);
  }

  return (
    <div className="not-prose my-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
      {/* Question */}
      <p className="mb-4 text-sm font-semibold text-[var(--color-text-primary)]">
        {qText}
      </p>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {options.map((opt) => {
          const optText = (opt.text as Record<string, string>)[lng] ?? opt.text.en;
          const isSelected = selectedId === opt.id;
          const isCorrectOption = opt.id === correctOptionId;

          let optionStyle = "border-[var(--color-border)] hover:border-[var(--color-text-muted)]";
          if (submitted) {
            if (isCorrectOption) {
              optionStyle = "border-brand-green-500/50 bg-brand-green-500/10";
            } else if (isSelected && !isCorrect) {
              optionStyle = "border-red-500/50 bg-red-500/10";
            } else {
              optionStyle = "border-[var(--color-border)] opacity-50";
            }
          } else if (isSelected) {
            optionStyle = "border-brand-blue-500/50 bg-brand-blue-500/10";
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={submitted && isCorrect}
              onClick={() => !submitted && setSelectedId(opt.id)}
              className={[
                "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                optionStyle,
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                  isSelected ? "border-brand-blue-500 text-brand-blue-400" : "border-[var(--color-border)] text-[var(--color-text-muted)]",
                  submitted && isCorrectOption ? "border-brand-green-500 text-brand-green-400" : "",
                ].join(" ")}
              >
                {submitted && isCorrectOption ? "✓" : String.fromCharCode(97 + options.indexOf(opt))}
              </span>
              <span className={[
                "text-[var(--color-text-secondary)]",
                submitted && isCorrectOption ? "text-brand-green-400 font-medium" : "",
              ].join(" ")}>
                {optText}
              </span>
            </button>
          );
        })}
      </div>

      {/* Result feedback */}
      {submitted && isCorrect && (
        <div className="rounded-lg border border-brand-green-500/20 bg-brand-green-500/10 p-4">
          <p className="mb-2 text-sm font-medium text-brand-green-400">
            ✅ {t("lesson.correct")}
          </p>
          <p className="text-sm text-[var(--color-text-secondary)]">{expText}</p>
        </div>
      )}

      {submitted && !isCorrect && (
        <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-red-400">{t("lesson.incorrect")}</p>
          {attempts > 1 && (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {t("lesson.attempts", { count: attempts })}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-[var(--color-text-muted)]">
          {attempts > 0 && t("lesson.attempts", { count: attempts })}
        </div>
        <div className="flex gap-2">
          {submitted && !isCorrect && (
            <Button variant="secondary" size="sm" onClick={handleRetry}>
              {t("lesson.retry")}
            </Button>
          )}
          {!isCorrect && (
            <Button
              variant="primary"
              size="sm"
              disabled={!selectedId}
              onClick={handleSubmit}
            >
              {t("lesson.submitAnswer")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
