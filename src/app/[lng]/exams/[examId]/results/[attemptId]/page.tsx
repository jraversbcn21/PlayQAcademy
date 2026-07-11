"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { getAttempt, resolveAttemptQuestions } from "@/lib/hooks/useExamAttempt";
import { EXAMS_BY_ID } from "@/lib/constants/exams";
import { identifyWeakAreas } from "@/lib/exam/scoring";
import { CURRICULUM } from "@/lib/constants/curriculum";
import type { ExamAttempt, ExamQuestion } from "@/types/exam";
import Button from "@/components/ui/Button";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface ResultsPageProps { params: Promise<{ lng: string; examId: string; attemptId: string }> }

export default function ExamResultsPage(props: ResultsPageProps) {
  const params = use(props.params);

  const {
    lng,
    examId,
    attemptId
  } = params;

  const { t: _t } = useTranslation("common");
  const { user } = useAuth();
  const [attempt, setAttempt] = useState<ExamAttempt | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const att = await getAttempt(attemptId);
      if (!att || !user) { setLoading(false); return; }
      const exam = EXAMS_BY_ID[examId];
      if (!exam) { setLoading(false); return; }
      const qs = resolveAttemptQuestions(att);
      setAttempt(att);
      setQuestions(qs);
      setLoading(false);
    }
    load();
  }, [attemptId, examId, user]);

  if (loading) {
    return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" /></div>;
  }
  if (!attempt) return null;

  const exam = EXAMS_BY_ID[examId];
  if (!exam) return null;

  const passed = attempt.passed;
  // Single source of truth for the denominator: the question set. `correct`
  // is restricted to that set so `round(correct/total*100)` equals
  // `attempt.score` (both equal-weight) — keeps the fraction and the headline
  // percentage consistent.
  const qMap = new Map(questions.map((q) => [q.id, q]));
  const total = questions.length;
  const correct = attempt.answers.filter((a) => a.isCorrect && qMap.has(a.questionId)).length;
  const scoreColor = attempt.score >= 80 ? "text-brand-gold-400" : attempt.score >= 50 ? "text-amber-400" : "text-red-400";
  const weakModules = identifyWeakAreas(attempt.answers, questions);
  const weakModuleNames = weakModules.map((mid) => {
    const mod = CURRICULUM.find((m) => m.id === mid);
    return mod ? (mod.title[lng as "es" | "en"] ?? mod.title.en) : mid;
  });

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        {/* Hero result */}
        <div className="mb-8 text-center">
          <div className="mb-4 text-5xl">{passed ? "🎉" : "💪"}</div>
          <h1 className="mb-2 text-3xl font-bold text-[var(--color-text-primary)]">
            {passed ? (lng === "es" ? "¡APROBADO!" : "PASSED!") : (lng === "es" ? "SIGUE APRENDIENDO" : "KEEP LEARNING")}
          </h1>
          <p className={["text-4xl font-black", scoreColor].join(" ")}>
            {attempt.score}%
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: lng === "es" ? "Correctas" : "Correct", value: `${correct}/${total}` },
            { label: lng === "es" ? "Tiempo" : "Time", value: `${Math.floor(attempt.timeSpent / 60)}m ${attempt.timeSpent % 60}s` },
            { label: lng === "es" ? "Nota de corte" : "Passing", value: `${exam.passingScore}%` },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-center">
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{s.value}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Question review */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
            {lng === "es" ? "Revisión de preguntas" : "Question Review"}
          </h2>
          <div className="space-y-3">
            {attempt.answers.map((ans, i) => {
              const q = qMap.get(ans.questionId);
              if (!q) return null;
              const isCorrect = ans.isCorrect;
              const userAnswerText = ans.selectedOptionIds.map((oid) => {
                const opt = q.options.find((o) => o.id === oid);
                return opt ? (opt.text[lng as "es" | "en"] ?? opt.text.en) : oid;
              }).join(", ");
              const correctText = q.correctOptionIds.map((oid) => {
                const opt = q.options.find((o) => o.id === oid);
                return opt ? (opt.text[lng as "es" | "en"] ?? opt.text.en) : oid;
              }).join(", ");

              return (
                <details key={ans.questionId} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
                  <summary className={["cursor-pointer p-4 font-medium text-sm", isCorrect ? "text-brand-gold-400" : "text-red-400"].join(" ")}>
                    {isCorrect ? "✓" : "✗"} {lng === "es" ? "Pregunta" : "Question"} {i + 1}: {q.question[lng as "es" | "en"] ?? q.question.en}
                  </summary>
                  <div className="border-t border-[var(--color-border)] p-4 pt-3 space-y-2">
                    {q.codeSnippet && (
                      <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-3 font-mono text-xs text-[#c9d1d9]"><code>{q.codeSnippet}</code></pre>
                    )}
                    <p className="text-xs"><span className="text-[var(--color-text-muted)]">{lng === "es" ? "Tu respuesta:" : "Your answer:"}</span> <span className={isCorrect ? "text-brand-gold-400" : "text-red-400"}>{userAnswerText || (lng === "es" ? "(sin responder)" : "(unanswered)")}</span></p>
                    {!isCorrect && <p className="text-xs"><span className="text-[var(--color-text-muted)]">{lng === "es" ? "Correcta:" : "Correct:"}</span> <span className="text-brand-gold-400">{correctText}</span></p>}
                    <p className="rounded-lg bg-[var(--color-bg-elevated)] p-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                      {q.explanation[lng as "es" | "en"] ?? q.explanation.en}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>

        {/* Weak areas */}
        {!passed && weakModuleNames.length > 0 && (
          <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/10 p-5">
            <h3 className="mb-2 text-sm font-semibold text-amber-400">
              {lng === "es" ? "Áreas a reforzar" : "Areas to review"}
            </h3>
            <ul className="space-y-1 text-sm text-[var(--color-text-secondary)]">
              {weakModuleNames.map((name) => (
                <li key={name}>📚 {name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={`/${lng}/exams/${examId}/start`}>
            <Button variant="secondary" size="md">
              {lng === "es" ? "Repetir Examen" : "Retake Exam"}
            </Button>
          </Link>
          <Link href={`/${lng}/exams`}>
            <Button variant="ghost" size="md">
              {lng === "es" ? "Volver a Exámenes" : "Back to Exams"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
