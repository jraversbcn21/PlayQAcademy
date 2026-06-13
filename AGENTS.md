# AGENTS.md — PlayQAcademy / main

## Project overview

PlayQAcademy is a bilingual (ES/EN) learning platform for software QA professionals, built with Next.js 14 (App Router), TypeScript (strict), Firebase (Auth + Firestore), and Tailwind CSS. The platform organizes content into three campuses: QA Fundamentals (coming soon), ISTQB CTFL Foundation (active, 6 modules, 21 lessons), and Playwright Automation (active, 8 modules, 44 lessons). Each campus contains modules, each module contains lessons with interactive content (flashcards, quizzes, exercises), and campuses have associated exams. Gamification (points, levels, badges) tracks user progress across all campuses.

## Branch state

- **HEAD:** 7cd5268 (`main`, in sync with `origin/main`). Working tree clean.
- **Status:** All planned work is merged into `main`. The repo passes `npm run typecheck` **and** `npm run lint` with **0 errors** (4 `<img>` warnings remain by choice — see Pre-existing debt).
- **PRs merged this session (#2–#7):**
  - **#2** `fix/exam-score-denominators` — equal-weight scoring + consistent results denominators (Known bugs #1–#2)
  - **#3** `fix/gate-contentless-exams` — gate content-less exams as "Coming Soon" (Known bug #3)
  - **#4** `feature/exams-by-campus` — group `/exams` index by campus (Known bug #4)
  - **#5** `feature/exam-passed-badge` — exam-pass badges (task #4; **end-to-end pass test still pending**, see task #4)
  - **#6** `chore/lint-typecheck-cleanup` — fixed all lint + typecheck errors (13 typecheck, 45 lint → 0) (task #6)
  - **#7** `fix/landing-cta-buttons` — removed redundant hero "Regístrate aquí" CTA; renamed "Ver currículum" → "Ver campus" (`hero.ctaSecondary`); dropped unused `hero.ctaPrimary` key
- **History note:** PR #1 (`feature/qa-campus-root`) was merged with `main` as base instead of the planned `feature/unified-campus`, bringing all prior unified-campus work (ISTQB content/wiring, exam/gamification fixes, landing restructure) into `main` in one step — no conflicts, no data/code loss. `feature/unified-campus` and `feature/qa-campus-root` are fully merged and deleted.
- **Only remaining "Next development task":** #5 (QA Fundamentals campus content). Step 5 of the QA Campus restructure (per-campus SEO metadata) also remains deferred.

## QA Campus restructure — done, verified, closed (do not reopen)

- **Goal achieved:** **"QA Campus"** is now the neutral root/entry point. Users land on the QA Campus hub (`/[lng]`) and pick one of three equal, self-contained sub-campuses (QA Fundamentals, ISTQB, Automation).
- **Key finding (still true):** campuses are NOT nested in data — `Campus` is a *derived grouping layer over modules*; progress/exams/gamification/badges key off `moduleId`/`examId`, never `campusId`. No Firestore migration, no URL breakage, no data risk occurred.
- **What changed:** root `/[lng]` is the QA Campus hub (sub-campus URLs stayed flat `/campus/[campusId]`, no redirects); added single fixed `QA_CAMPUS` parent abstraction (`src/types/campus.ts`, `src/lib/constants/campuses.ts`); neutralized root branding (`src/app/layout.tsx`, `src/app/[lng]/layout.tsx`); campus exam links are now data-driven via `getExamsForCampus()` (`src/lib/constants/exams.ts`, `src/app/[lng]/campus/[campusId]/page.tsx`), removing the `campusId === "istqb"` hardcode; added breadcrumb `QA Campus → {campus}` linking back to the hub.
- **Verification:** typecheck (13 pre-existing errors, unchanged vs. pre-branch `22f2dca`) and lint (~45 pre-existing errors, unchanged) confirmed no new issues. Full manual walkthrough on `/es` and `/en` (hub, all 3 campus detail pages, exam links, breadcrumbs, lesson progress persistence) confirmed working. Details in `docs/todo-qa-campus-restructure.md`.
- **Deferred (separate follow-up, not blocking):** Step 5 — per-campus SEO metadata for `/campus/[campusId]` (requires splitting the client page into server+client components for `generateMetadata`).
- **Out of scope (separate branches, unchanged):** all items under "Known bugs" and "Next development tasks" below (exam content gaps, `calculateScore`, `/exams` redesign, QA Fundamentals content, lint cleanup).

## Verified and closed (do not reopen)

All items below have been verified by Jorge with his own eyes in the browser. Evidence is documented in `docs/session-log-2026-06-10.md`.

1. **ISTQB exam scoring fix** — `submitExam` now accepts `answers` parameter and scores from in-memory answers, not Firestore re-read. Evidence: score 68 = 27/40 correct, confirmed in `exam_attempts` doc.
2. **Firestore rules fix** — `in_progress → in_progress` transition allowed for answer persistence. Evidence: deployed to Firebase, no permission errors in console when `saveAnswer` writes during exam.
3. **Gamification write isolation** — `submitExam` wraps gamification write in try/catch with `[exam-gamification-write-failed]` error logging. Evidence: browser-verified, no console errors on pass, results screen always reachable.
4. **Level update on exam pass** — `getLevelFromPoints(newTotal)` called on same write as `totalPoints`. Evidence: totalPoints 295→561 (+266 = two exam passes: 130+136), level 3→5, both consistent with levels.ts thresholds.
5. **Points write confirmed working** — Reconstructed from two exam passes: score 65→130pts, score 68→136pts, total delta 266, matches Firebase doc exactly.
6. **Manual walkthrough of 21 ISTQB lessons** — All lessons render correctly, content complete, no missing translations.
7. **EN/ES locale completeness** — No hydration flash, no empty `"en":""` strings, all i18n keys present in both locales.
8. **Campus detail page** — ISTQB campus shows "Take exam" button, module numbering is campus-relative (1-6, not global 9-14).
9. **Learn page breadcrumb** — Module numbering uses campus-relative position, `prevModTitle` uses campus-aware logic.
10. **TTS audio** — "Escuchar" button works on all flashcards, no console errors.
11. **Badge "Módulos" count** — Displays correctly on ISTQB campus page (6 modules).
12. **Tables in modules 4-6** — Not flattened to lists, render as tables.
13. **Campus-aware unlock logic** — `isModuleUnlocked` never crosses campus boundaries, gated behind `ENFORCE_MODULE_LOCKING = false` flag.
14. **Flashcard i18n** — 5 keys changed from `flashcard.*` to `lesson.flashcard.*` to match project convention.

## Campus status

### 1. QA Fundamentals (`qaFundamentals`)
- **Status:** coming_soon
- **Modules:** 0 (placeholder)
- **Lessons:** 0
- **Exam:** None
- **Notes:** `moduleIds` set to `[]` to prevent false counts on landing page. Content creation is future work.

### 2. ISTQB CTFL Foundation (`istqb`)
- **Status:** active
- **Modules:** 6 (istqb-fundamentals, istqb-sdlc, istqb-static-testing, istqb-test-analysis, istqb-management, istqb-tools)
- **Lessons:** 21
- **Exam:** `exam-istqb-ctfl` — 40 questions, 60 minutes, 65% to pass. Question bank: 50 questions (all medium, 2 points each). **Working and verified.**

### 3. Playwright Automation (`automation`)
- **Status:** active
- **Modules:** 8 (m1-typescript-foundations through m8-cicd-reporting)
- **Lessons:** 44 (header displays 44, actual count is 41 — known bug, see below)
- **Exam:** 4 exams defined (`exam-module-1`, `exam-module-2-3`, `exam-midterm`, `exam-final`). Only `exam-module-1` has a question bank (25 questions). The other 3 have no banks for m2-m8 and are now gated as "Coming Soon" via `isExamReady` (see Known bugs #3) — they surface but are not startable until banks exist.

## Known bugs (confirmed, separate branches required)

1. **~~calculateScore points-weighted vs equal-weight mismatch~~ — FIXED** (branch `fix/exam-score-denominators`). `calculateScore` now uses the decided equal-weight model (`correct / total questions × 100`) instead of points-weighted. Browser-verified by Jorge on `exam-module-1` (non-uniform points bank: 1/2/3 pts): 3/15 → 20% (reprobado), 11/15 → 73% (aprobado) — headline % now equals `round(correct/total×100)` in both cases.

2. **~~Results page two-denominator bug~~ — FIXED** (same branch). Results page derives `correct` and `total` from the same question set (`total = questions.length`, `correct` restricted to that set), so the fraction and the headline percentage always agree. Note: old attempts stored before this fix keep their points-weighted `score` in Firestore (not recomputed); only new attempts are fully consistent.

3. **~~3 content-less exams~~ — FIXED** (branch `fix/gate-contentless-exams`). New data-driven helper `isExamReady(exam)` in `exams.ts` (= `getQuestionsForModules(exam.moduleIds).length >= exam.questionCount`) gates `exam-module-2-3`, `exam-midterm`, `exam-final`. They now show a "Coming Soon"/"Próximamente" badge (not startable) in the `/exams` index, the campus detail page, and the `start` page (defense in depth). The `take` page also shows a proper "unavailable" message instead of the infinite spinner when a bank is empty. When question banks for m2-m8 are added later, these exams light up automatically (no code change — the helper is data-driven).

4. **~~/exams global index mixes all campuses~~ — FIXED** (branch `feature/exams-by-campus`, PR #4). `/[lng]/exams` now groups exams into per-campus sections via `getSubCampuses()` + `getExamsForCampus()`, each with a campus heading and a "View campus →" link. Campuses with no exams (QA Fundamentals) are skipped. Browser-verified on `/es` and `/en`.

5. **coming_soon campus is a clickable Link** — QA Fundamentals card links to `/campus/qaFundamentals` which shows empty page. Should be disabled or show "Coming Soon" modal. **Separate branch.**

6. **Automation header: 44 lessons displayed vs 41 real** — Campus description says "44 lessons" but actual count is 41. **Separate branch.**

## Next development tasks (priority order)

1. **~~Fix calculateScore to correct/total + fix results page two-denominator bug.~~ — DONE** (branch `fix/exam-score-denominators`, browser-verified). Equal-weight model chosen; see Known bugs #1–#2 above.

2. **~~Gate or hide 3 content-less exams while question banks for m2-m8 do not exist.~~ — DONE** (branch `fix/gate-contentless-exams`). "Coming Soon" badge approach via data-driven `isExamReady`; see Known bugs #3 above.

3. **~~/exams redesign: separate per-campus exam index instead of global mixed list.~~ — DONE** (branch `feature/exams-by-campus`, PR #4, browser-verified). See Known bugs #4 above.

4. **~~exam-pass badge: add badge criteria for passing an exam.~~ — DONE** (branch `feature/exam-passed-badge`, PR #5 merged). Added `{ type: "exam_passed"; examId }` criteria (`gamification.ts` + `badgeChecker.ts` with optional `passedExamIds` context), two badges in `badges.ts` (🥇 `module_1_exam_passed` rare/150pts → `exam-module-1`; 🎓 `istqb_ctfl_passed` epic/400pts → `exam-istqb-ctfl`), and `recordExamPassed(uid, examId)` in `useGamification.ts` called from `submitExam` on a pass. `playq_certified` left untouched (its `exam-final` has no bank → would be unobtainable). **Partially verified:** typecheck clean (no new errors), routes compile, badge catalog count went 21→23. **Pending end-to-end test by Jorge:** pass an exam and confirm the badge moves to "Earned". Note: only passes *after* this deploy award badges (no retroactive award).

5. **QA Fundamentals campus content: curriculum and lessons.** Create 3-5 modules with introductory QA content. **Separate branch.**

6. **~~Lint cleanup: ~45 pre-existing lint errors + 3 unused imports in useExamAttempt.ts.~~ — DONE** (branch `chore/lint-typecheck-cleanup`). Fixed all 45 lint errors (unused imports/vars across ~24 files) AND all 13 typecheck errors (Metadata import from `next`, `Bilingual` access via `[lng as "es"|"en"]`, `RARITY_ORDER ?? 0`, `unlockedAt` cast, `updateDoc` `UpdateData<DocumentData>` cast, duplicate `Badge` import). `npm run typecheck` and `npm run lint` are both clean (0 errors). **Remaining:** 4 `@next/next/no-img-element` *warnings* (leaderboard, playground/files, Navbar, LessonRenderer) — not errors; converting `<img>`→`next/image` needs width/height + `images.remotePatterns` for avatar domains, deferred as its own change.

## Pre-existing debt (do not touch without instruction)

- **SEO/OG metadata layout.tsx Playwright-only** — `layout.tsx` hardcodes Playwright-specific metadata. Needs campus-aware metadata. **→ Now addressed by the planned QA Campus restructure (Step 2 = neutralize root branding; Step 5 = optional per-campus metadata). See top of file.**
- **~~~45 lint errors + 3 unused imports in useExamAttempt.ts~~ — RESOLVED** by `chore/lint-typecheck-cleanup` (task #6 above). Codebase is lint- and typecheck-clean (0 errors); 4 `<img>` warnings remain by choice.
- **4 `<img>` → `next/image` warnings** — leaderboard avatar, playground/files, Navbar avatar, LessonRenderer image. Conversion needs `images.remotePatterns` config for external avatar domains; deferred to a dedicated change.
