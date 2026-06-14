"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGamificationUI } from "@/context/GamificationContext";
import { EXAMS_BY_ID } from "@/lib/constants/exams";
import { generateExamQuestions } from "@/lib/exam/scoring";
import { saveAnswer, submitExam } from "@/lib/hooks/useExamAttempt";
import type { ExamQuestion, ExamAnswer } from "@/types/exam";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Timer component                                                    */
/* ------------------------------------------------------------------ */

function ExamTimer({ endTime, onTimeUp }: { endTime: number; onTimeUp: () => void }) {
  const [remaining, setRemaining] = useState(Math.max(0, Math.round((endTime - Date.now()) / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      setRemaining(r);
      if (r <= 0) onTimeUp();
    }, 250);
    return () => clearInterval(interval);
  }, [endTime, onTimeUp]);

  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  let color = "text-brand-gold-400";
  if (remaining < 120) color = "text-red-400 animate-pulse";
  else if (remaining < 600) color = "text-amber-400";

  return <span className={`font-mono text-sm font-bold tabular-nums ${color}`}>{m}:{String(s).padStart(2, "0")}</span>;
}

/* ------------------------------------------------------------------ */
/*  Question navigator                                                 */
/* ------------------------------------------------------------------ */

function QuestionNavigator({
  total,
  current,
  answers,
  flagged,
  onJump,
}: {
  total: number;
  current: number;
  answers: Record<number, boolean>;
  flagged: Set<number>;
  onJump: (idx: number) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-8">
        {Array.from({ length: total }, (_, i) => {
          const isCurrent = i === current;
          const isAnswered = answers[i];
          const isFlagged = flagged.has(i);
          let cls = "border-[var(--color-border)] text-[var(--color-text-muted)]";
          if (isCurrent) cls = "border-brand-forest-500 bg-brand-forest-500/20 text-brand-forest-400";
          else if (isAnswered) cls = "border-brand-gold-500/50 bg-brand-gold-500/10 text-brand-gold-400";
          if (isFlagged) cls += " ring-1 ring-amber-400";

          return (
            <button
              key={i}
              type="button"
              onClick={() => onJump(i)}
              className={["flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium transition-colors", cls].join(" ")}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="flex gap-3 text-[10px] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand-forest-500/50" />Current</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-brand-gold-500/50" />Answered</span>
        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm ring-1 ring-amber-400" />Flagged</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Take page                                                          */
/* ------------------------------------------------------------------ */

interface TakePageProps { params: { lng: string; examId: string; attemptId: string } }

export default function ExamTakePage({ params: { lng, examId, attemptId } }: TakePageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { queueBadges } = useGamificationUI();
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [generated, setGenerated] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [answered, setAnswered] = useState<Record<number, boolean>>({});
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const endTimeRef = useRef(Date.now() + 1200 * 1000);

  useEffect(() => {
    if (!user) { router.push(`/${lng}/auth/sign-in`); return; }
    const exam = EXAMS_BY_ID[examId];
    if (!exam) return;
    const qs = generateExamQuestions(examId, user.uid, exam.moduleIds, exam.questionCount);
    setQuestions(qs);
    setGenerated(true);
    endTimeRef.current = Date.now() + exam.timeLimit * 1000;
  }, [user, examId, lng, router]);

  // Tab switch detection
  useEffect(() => {
    function onBlur() { setTabWarnings((p) => p + 1); }
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, []);

  const currentQ = questions[currentIdx];
  const isMulti = currentQ?.type === "multiple_choice";
  const selected = selectedOptions[currentIdx] ?? [];
  const isFlagged = flagged.has(currentIdx);
  const totalAnswered = Object.values(answered).filter(Boolean).length;

  const toggleOption = useCallback((optionId: string) => {
    setSelectedOptions((prev) => {
      const cur = prev[currentIdx] ?? [];
      if (isMulti) {
        const next = cur.includes(optionId) ? cur.filter((id) => id !== optionId) : [...cur, optionId];
        return { ...prev, [currentIdx]: next };
      }
      return { ...prev, [currentIdx]: [optionId] };
    });
  }, [currentIdx, isMulti]);

  const saveCurrentAnswer = useCallback(() => {
    if (!currentQ) return;
    const sel = selectedOptions[currentIdx] ?? [];
    setAnswered((prev) => ({ ...prev, [currentIdx]: sel.length > 0 }));
    saveAnswer(attemptId, currentQ.id, sel, currentQ.correctOptionIds, 0).catch((e) => console.error("Failed to save answer:", e));
  }, [currentIdx, currentQ, selectedOptions, attemptId]);

  const buildAnswers = useCallback((): ExamAnswer[] => {
    return questions.map((q, idx) => {
      const selectedOptionIds = selectedOptions[idx] ?? [];
      const isCorrect =
        selectedOptionIds.length === q.correctOptionIds.length &&
        selectedOptionIds.every((id) => q.correctOptionIds.includes(id));
      return { questionId: q.id, selectedOptionIds, isCorrect, timeSpent: 0 };
    });
  }, [questions, selectedOptions]);

  const goTo = useCallback((idx: number) => {
    saveCurrentAnswer();
    setCurrentIdx(idx);
    if (idx < questions.length) {
      // Preload answered state
    }
  }, [saveCurrentAnswer, questions.length]);

  const handleTimeUp = useCallback(async () => {
    saveCurrentAnswer();
    const answers = buildAnswers();
    const { newBadges } = await submitExam(attemptId, answers);
    if (newBadges.length > 0) queueBadges(newBadges);
    router.push(`/${lng}/exams/${examId}/results/${attemptId}`);
  }, [saveCurrentAnswer, buildAnswers, attemptId, examId, lng, router, queueBadges]);

  const handleSubmit = useCallback(async () => {
    saveCurrentAnswer();
    const answers = buildAnswers();
    const { newBadges } = await submitExam(attemptId, answers);
    if (newBadges.length > 0) queueBadges(newBadges);
    router.push(`/${lng}/exams/${examId}/results/${attemptId}`);
  }, [saveCurrentAnswer, buildAnswers, attemptId, examId, lng, router, queueBadges]);

  const exam = EXAMS_BY_ID[examId];

  // Generated but no questions available → empty bank. Show a message instead
  // of spinning forever (exams with no question bank for their modules).
  if (exam && generated && questions.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-1 text-lg font-semibold text-[var(--color-text-primary)]">
            {lng === "es" ? "Examen no disponible" : "Exam unavailable"}
          </p>
          <p className="mb-4 text-sm text-[var(--color-text-muted)]">
            {lng === "es" ? "Este examen aún no tiene preguntas. El banco se está preparando." : "This exam has no questions yet. Its bank is being prepared."}
          </p>
          <Button variant="secondary" size="sm" onClick={() => router.push(`/${lng}/exams`)}>
            {lng === "es" ? "Volver a Exámenes" : "Back to Exams"}
          </Button>
        </div>
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" /></div>;
  }

  const title = exam.title[lng as "es" | "en"] ?? exam.title.en;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Top bar */}
      <div className="sticky top-16 z-20 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">{title}</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--color-text-muted)]">
              {lng === "es" ? "Pregunta" : "Question"} {currentIdx + 1}/{questions.length}
            </span>
            <ExamTimer endTime={endTimeRef.current} onTimeUp={handleTimeUp} />
          </div>
        </div>
        {/* Progress bar */}
        <div className="mx-auto max-w-6xl px-4 pb-2">
          <div className="h-1 overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
            <div className="h-full rounded-full bg-brand-forest-500 transition-all" style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Main area */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-4 py-6">
        {/* Question area */}
        <div className="flex-1 min-w-0">
          {currentQ && (
            <div>
              {/* Question text */}
              <div className="mb-4">
                <span className="mb-2 inline-block rounded-md bg-brand-forest-500/10 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                  {currentQ.difficulty} &middot; {currentQ.points} {lng === "es" ? "punto(s)" : "pt(s)"}
                </span>
                <p className="text-base font-medium text-[var(--color-text-primary)] sm:text-lg">
                  {currentQ.question[lng as "es" | "en"] ?? currentQ.question.en}
                </p>
              </div>

              {/* Code snippet */}
              {currentQ.codeSnippet && (
                <pre className="mb-4 overflow-x-auto rounded-lg bg-[#0d1117] p-4 font-mono text-sm leading-relaxed text-[#c9d1d9]">
                  <code>{currentQ.codeSnippet}</code>
                </pre>
              )}

              {/* Options */}
              <div className="space-y-2.5 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selected.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleOption(opt.id)}
                      className={[
                        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                        isSelected
                          ? "border-brand-forest-500/50 bg-brand-forest-500/10 text-[var(--color-text-primary)]"
                          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)]",
                      ].join(" ")}
                    >
                      <span className={[
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs",
                        isSelected ? "border-brand-forest-500 bg-brand-forest-500/20 text-brand-forest-400" : "border-[var(--color-border)]",
                      ].join(" ")}>
                        {isSelected && (isMulti ? "✓" : "●")}
                      </span>
                      <span>{opt.text[lng as "es" | "en"] ?? opt.text.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" size="sm" disabled={currentIdx === 0} onClick={() => goTo(currentIdx - 1)}>
              {lng === "es" ? "← Anterior" : "← Previous"}
            </Button>
            <div className="flex gap-2">
              <Button
                variant={isFlagged ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFlagged((prev) => {
                  const next = new Set(prev);
                  isFlagged ? next.delete(currentIdx) : next.add(currentIdx);
                  return next;
                })}
                className={isFlagged ? "!border-amber-500/50 !text-amber-400" : ""}
              >
                {isFlagged ? "🏴" : "🏳"} {lng === "es" ? "Revisar" : "Flag"}
              </Button>
              {currentIdx < questions.length - 1 ? (
                <Button variant="primary" size="sm" onClick={() => goTo(currentIdx + 1)}>
                  {lng === "es" ? "Siguiente →" : "Next →"}
                </Button>
              ) : (
                <Button variant="primary" size="sm" className="!bg-brand-terra-500" onClick={() => setShowSubmitConfirm(true)}>
                  {lng === "es" ? "Finalizar" : "Finish"}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Side navigator (desktop) */}
        <div className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-40 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4">
            <QuestionNavigator
              total={questions.length}
              current={currentIdx}
              answers={answered}
              flagged={flagged}
              onJump={(i) => goTo(i)}
            />
            <div className="mt-4 border-t border-[var(--color-border)] pt-3">
              <p className="text-xs text-[var(--color-text-muted)]">
                {totalAnswered}/{questions.length} {lng === "es" ? "respondidas" : "answered"}
              </p>
              {tabWarnings > 0 && (
                <p className="mt-1 text-xs text-amber-400">
                  ⚠ {tabWarnings} {lng === "es" ? "cambio(s) de pestaña" : "tab switch(es)"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submit confirmation modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
            <h3 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
              {lng === "es" ? "¿Entregar examen?" : "Submit exam?"}
            </h3>
            <div className="mb-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
              <p>✓ {totalAnswered} {lng === "es" ? "respondidas" : "answered"}</p>
              <p>✗ {questions.length - totalAnswered} {lng === "es" ? "sin responder" : "unanswered"}</p>
              <p>🏴 {flagged.size} {lng === "es" ? "marcadas" : "flagged"}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => setShowSubmitConfirm(false)}>
                {lng === "es" ? "Cancelar" : "Cancel"}
              </Button>
              <Button variant="primary" size="sm" className="flex-1 !bg-brand-terra-500" onClick={handleSubmit}>
                {lng === "es" ? "Entregar" : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
