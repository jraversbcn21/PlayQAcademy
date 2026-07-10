"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/lib/hooks/useProgress";
import { getExamsForCampus, isExamReady } from "@/lib/constants/exams";
import { getSubCampuses } from "@/lib/constants/campuses";
import { getExamHistory } from "@/lib/hooks/useExamAttempt";
import type { ExamAttempt } from "@/types/exam";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Format seconds to MM:SS                                            */
/* ------------------------------------------------------------------ */

function fmtTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface ExamsPageProps { params: Promise<{ lng: string }> }

export default function ExamsPage(props: ExamsPageProps) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const { t: _t } = useTranslation("common");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isModuleUnlocked } = useProgress(user?.uid);
  const [history, setHistory] = useState<ExamAttempt[]>([]);
  const [openCampusId, setOpenCampusId] = useState<string | null>(null);

  useEffect(() => {
    if (user) getExamHistory(user.uid).then(setHistory);
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/${lng}/auth/sign-in`);
    }
  }, [authLoading, user, lng, router]);

  if (authLoading || !user) {
    return <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" /></div>;
  }

  const passedCount = history.filter((a) => a.passed).length;
  const avgScore = history.length > 0 ? Math.round(history.reduce((s, a) => s + a.score, 0) / history.length) : 0;

  const campusesWithExams = getSubCampuses()
    .map((campus) => ({ campus, exams: getExamsForCampus(campus.id) }))
    .filter(({ exams }) => exams.length > 0);

  const openEntry = campusesWithExams.find(({ campus }) => campus.id === openCampusId);

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-4xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {lng === "es" ? "Exámenes" : "Exams"}
        </h1>
        <p className="mb-6 text-sm text-[var(--color-text-muted)]">
          {lng === "es" ? "Pon a prueba tus conocimientos con exámenes simulados" : "Test your knowledge with mock exams"}
        </p>

        {/* Stats summary */}
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { label: lng === "es" ? "Aprobados" : "Passed", value: passedCount },
            { label: lng === "es" ? "Puntuación Media" : "Average Score", value: `${avgScore}%` },
            { label: lng === "es" ? "Total Intentos" : "Total Attempts", value: history.length },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-center">
              <p className="text-2xl font-bold text-[var(--color-text-primary)]">{s.value}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Campus pill row — same grid as the stats row above so columns line up */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {campusesWithExams.map(({ campus, exams }) => {
            const isOpen = openCampusId === campus.id;
            return (
              <button
                key={campus.id}
                type="button"
                onClick={() => setOpenCampusId(isOpen ? null : campus.id)}
                aria-expanded={isOpen}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                  isOpen
                    ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
                    : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                <span>{campus.title[lng as "es" | "en"] ?? campus.title.en}</span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                    {exams.length}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
            );
          })}
        </div>

        {/* Open campus panel */}
        {openEntry && (
          <section>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {openEntry.campus.title[lng as "es" | "en"] ?? openEntry.campus.title.en}
              </h2>
              <Link
                href={`/${lng}/campus/${openEntry.campus.id}`}
                className="shrink-0 text-sm font-medium text-brand-forest-400 hover:underline"
              >
                {lng === "es" ? "Ver campus →" : "View campus →"}
              </Link>
            </div>
            <div className="space-y-4">
              {openEntry.exams.map((exam) => {
                const ready = isExamReady(exam);
                const isLocked = exam.requiresModuleCompletion.some((mid) => !isModuleUnlocked(mid));
                const bestAttempt = history
                  .filter((a) => a.examId === exam.id)
                  .sort((a, b) => b.score - a.score)[0];

                const title = exam.title[lng as "es" | "en"] ?? exam.title.en;
                const desc = exam.description[lng as "es" | "en"] ?? exam.description.en;

                return (
                  <div
                    key={exam.id}
                    className={[
                      "rounded-xl border bg-[var(--color-bg-secondary)] p-5 transition-shadow hover:shadow-md",
                      isLocked || !ready ? "border-[var(--color-border)] opacity-70" : "border-[var(--color-border)]",
                    ].join(" ")}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant={exam.type === "final" ? "error" : exam.type === "midterm" ? "warning" : "info"} size="sm">
                            {exam.type}
                          </Badge>
                          {!ready && <Badge variant="warning" size="sm">{lng === "es" ? "Próximamente" : "Coming Soon"}</Badge>}
                          {ready && isLocked && <Badge variant="locked" size="sm">{lng === "es" ? "Bloqueado" : "Locked"}</Badge>}
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{title}</h3>
                        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{desc}</p>
                        <div className="mt-2 flex flex-wrap gap-3 text-xs text-[var(--color-text-muted)]">
                          <span>{exam.questionCount} {lng === "es" ? "preguntas" : "questions"}</span>
                          <span>{fmtTime(exam.timeLimit)} min</span>
                          <span>{lng === "es" ? "Nota de corte:" : "Pass:"} {exam.passingScore}%</span>
                        </div>
                        {bestAttempt && (
                          <p className="mt-2 text-xs font-medium text-brand-gold-400">
                            {lng === "es" ? "Mejor puntuación:" : "Best score:"} {bestAttempt.score}% {bestAttempt.passed ? "✓" : ""}
                          </p>
                        )}
                      </div>
                      {!ready ? (
                        <Badge variant="warning" size="md">{lng === "es" ? "Próximamente" : "Coming Soon"}</Badge>
                      ) : isLocked ? (
                        <Badge variant="locked" size="md">{lng === "es" ? "Bloqueado" : "Locked"}</Badge>
                      ) : (
                        <Link href={`/${lng}/exams/${exam.id}/start`}>
                          <Button variant="primary" className="!bg-brand-terra-500 hover:!bg-brand-terra-400">
                            {lng === "es" ? "Comenzar" : "Start"}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
