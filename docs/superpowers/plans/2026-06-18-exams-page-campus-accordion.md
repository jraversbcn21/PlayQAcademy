# Exams Page Horizontal Campus Accordion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the long, stacked-by-campus exam list on `/exams` with a single-open
horizontal pill accordion — three campus pills side by side, clicking one expands
that campus's exam list below the row and collapses any other.

**Architecture:** One new piece of client state (`openCampusId: string | null`) in
the existing `src/app/[lng]/exams/page.tsx`. No new files, no new shared
component — the pill row and the single open panel stay inline in this file,
matching how `CampusPageClient.tsx` already inlines its own toggle. The
per-exam card JSX is copied verbatim from the current implementation; only the
campus-grouping wrapper around it changes.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript (strict), Tailwind CSS.
No test runner exists in this repo — verification is `npm run typecheck` +
`npm run lint` (must both be 0 errors/warnings, per `AGENTS.md`) plus manual
browser verification.

## Global Constraints

- Every user-facing string must stay bilingual via the existing `lng === "es" ? ... : ...` pattern already used throughout this file — no new i18n keys, no empty strings.
- `npm run typecheck` and `npm run lint` must both report 0 errors/warnings before committing (per `AGENTS.md` quality gate).
- No change to `getSubCampuses`, `getExamsForCampus`, `isExamReady`, `isModuleUnlocked`, or `getExamHistory` — same calls, same arguments, same consumption of return values as today.
- No change to the stats summary row or to any per-exam-card markup/logic (badges, "Comenzar" button, best-score line) — copied character-for-character from the current file.
- Direct-to-`main` workflow: commit straight to `main`, no branch/PR.

---

### Task 1: Horizontal campus accordion on `/exams`

**Files:**
- Modify: `src/app/[lng]/exams/page.tsx` (full-file replacement — see Step 2)

**Interfaces:**
- Consumes: `getSubCampuses(): Campus[]` (from `@/lib/constants/campuses`), `getExamsForCampus(campusId: string): Exam[]` and `isExamReady(exam: Exam): boolean` (from `@/lib/constants/exams`), `useProgress(uid?: string)` returning `{ isModuleUnlocked(moduleId: string): boolean }` (from `@/lib/hooks/useProgress`), `getExamHistory(uid: string): Promise<ExamAttempt[]>` (from `@/lib/hooks/useExamAttempt`) — all pre-existing, unchanged signatures.
- Produces: nothing consumed by other tasks — this is the only task in the plan.

- [ ] **Step 1: Read the current file to confirm it matches the version this plan was written against**

Run: open `src/app/[lng]/exams/page.tsx` and confirm it is 155 lines, a single default-exported `ExamsPage` client component with the stats grid followed by `<div className="space-y-10">{getSubCampuses().map(...)}</div>`.

If the file differs from this (e.g. someone already changed it), stop and reconcile before proceeding — the replacement in Step 2 assumes this exact starting point.

- [ ] **Step 2: Replace the full file content**

Replace the entire contents of `src/app/[lng]/exams/page.tsx` with:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

interface ExamsPageProps { params: { lng: string } }

export default function ExamsPage({ params: { lng } }: ExamsPageProps) {
  const { t: _t } = useTranslation("common");
  const { user, loading: authLoading } = useAuth();
  const { isModuleUnlocked } = useProgress(user?.uid);
  const [history, setHistory] = useState<ExamAttempt[]>([]);
  const [openCampusId, setOpenCampusId] = useState<string | null>(null);

  useEffect(() => {
    if (user) getExamHistory(user.uid).then(setHistory);
  }, [user]);

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

        {/* Campus pill row */}
        <div className="mb-6 flex flex-wrap gap-3">
          {campusesWithExams.map(({ campus, exams }) => {
            const isOpen = openCampusId === campus.id;
            return (
              <button
                key={campus.id}
                type="button"
                onClick={() => setOpenCampusId(isOpen ? null : campus.id)}
                aria-expanded={isOpen}
                className={[
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  isOpen
                    ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
                    : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                {campus.title[lng as "es" | "en"] ?? campus.title.en}
                <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                  {exams.length}
                </span>
                <svg
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
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
```

- [ ] **Step 3: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0, no `error TS` lines (ignore any pre-existing unrelated `TS6053` about `.next/types/...` — stale Next.js cache, not related to this change; if it's the *only* output, that's a pass).

- [ ] **Step 4: Run lint**

Run: `npm run lint`
Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 5: Manual browser verification**

Start the dev server if not already running (`npm run dev`, port 3001) and, logged in, walk through on **both** `/es/exams` and `/en/exams`:

1. Page loads with all 3 pills visible ("Fundamentos de QA", "ISTQB CTFL Foundation", "Automatización con Playwright" / their English titles), none highlighted, no exam list below — page is short, no scrolling needed to see all 3 pills.
2. Click the first pill → panel appears directly below the pill row showing its exam cards (11 for QA Fundamentals), the pill switches to the green/active style, its chevron rotates 180°.
3. Click the second pill → the first panel disappears and the second campus's panel appears in its place; only the second pill is now highlighted.
4. Click the currently-open pill again → panel collapses entirely, no pill highlighted.
5. With a panel open, confirm every existing per-exam behavior still works exactly as before: "Ver campus →" navigates to `/${lng}/campus/{campusId}`, "Comenzar" links to `/${lng}/exams/{examId}/start`, "Próximamente"/"Bloqueado" badges appear on the right exams, "Mejor puntuación" shows when a past attempt exists.
6. Narrow the browser window (or use device toolbar at ~375px width) → the 3 pills wrap onto a second line instead of overflowing or needing horizontal scroll.

If any of these don't match, fix `src/app/[lng]/exams/page.tsx` before continuing — do not commit a broken state.

- [ ] **Step 6: Commit**

```bash
git add src/app/[lng]/exams/page.tsx
git commit -m "feat(exams): collapse campus exam lists into a horizontal pill accordion

Replaces the long stacked-by-campus exam list with three horizontal pills
(one per campus); clicking one expands its exam list below and collapses
any other. Page now loads fully collapsed and short instead of one long
scroll through all 24 exams. Per-exam card markup/logic is unchanged.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Notes for the implementer

- `AGENTS.md` does not document the `/exams` page's layout today, so this change needs no `docs:` sync commit — the "sync this file" convention applies to durable architecture facts (campus/exam/badge data model), not page-level presentation.
- There is exactly one task in this plan. It is not splittable: the pill row has no independent meaning without the panel it toggles (clicking a pill with no panel logic would visibly do nothing), and the panel has nothing to render without `openCampusId` being settable — so they must land together for either half to be testable.
