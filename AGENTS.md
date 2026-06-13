# AGENTS.md — PlayQAcademy / main

## Project overview

PlayQAcademy is a bilingual (ES/EN) learning platform for software QA professionals, built with Next.js 14 (App Router), TypeScript (strict), Firebase (Auth + Firestore), and Tailwind CSS. The platform organizes content into three campuses: QA Fundamentals (coming soon), ISTQB CTFL Foundation (active, 6 modules, 21 lessons), and Playwright Automation (active, 8 modules, 44 lessons). Each campus contains modules, each module contains lessons with interactive content (flashcards, quizzes, exercises), and campuses have associated exams. Gamification (points, levels, badges) tracks user progress across all campuses.

## Branch state

- **HEAD:** bbb94b0 Merge pull request #1 from jraversbcn21/feature/qa-campus-root (into `main`)
- **Branch:** `main` — up to date with `origin/main`.
- **Status:** PR #1 (`feature/qa-campus-root`) was created and merged with `main` as base instead of the planned `feature/unified-campus`. Net effect: all of `feature/unified-campus`'s prior work (ISTQB content/wiring, exam fixes, gamification fixes, landing restructure) plus the QA Campus root restructure (Steps 1, 2, 3, 4, 6, see below) are now all in `main`. No conflicts, no data/code loss. **`feature/unified-campus` (local at `22f2dca`, origin at `38691fa`) is now fully merged into `main` and is obsolete** — safe to delete once confirmed. `feature/qa-campus-root` is likewise fully merged and obsolete.
- Step 5 (per-campus SEO metadata) remains deferred to a follow-up branch off `main`.

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
- **Exam:** 4 exams defined (`exam-module-1`, `exam-module-2-3`, `exam-midterm`, `exam-final`). Only `exam-module-1` has a question bank (25 questions). The other 3 exams have no question banks for modules m2-m8, causing infinite spinner or incorrect question counts. **Broken — see known bugs.**

## Known bugs (confirmed, separate branches required)

1. **~~calculateScore points-weighted vs equal-weight mismatch~~ — FIXED** (branch `fix/exam-score-denominators`). `calculateScore` now uses the decided equal-weight model (`correct / total questions × 100`) instead of points-weighted. Browser-verified by Jorge on `exam-module-1` (non-uniform points bank: 1/2/3 pts): 3/15 → 20% (reprobado), 11/15 → 73% (aprobado) — headline % now equals `round(correct/total×100)` in both cases.

2. **~~Results page two-denominator bug~~ — FIXED** (same branch). Results page derives `correct` and `total` from the same question set (`total = questions.length`, `correct` restricted to that set), so the fraction and the headline percentage always agree. Note: old attempts stored before this fix keep their points-weighted `score` in Firestore (not recomputed); only new attempts are fully consistent.

3. **3 content-less exams** — `exam-module-2-3` (infinite spinner, 0 questions for m2+m3), `exam-midterm` (25 questions shown vs 40 promised, only m1 has questions), `exam-final` (25 questions shown vs 60 promised, only m1 has questions). Question banks for m2-m8 do not exist. **Separate branch: hide or gate these exams.**

4. **/exams global index mixes all campuses** — `/[lng]/exams` shows all 5 exams regardless of campus. Needs per-campus separation (e.g., ISTQB exams section, Automation exams section). **Separate branch.**

5. **coming_soon campus is a clickable Link** — QA Fundamentals card links to `/campus/qaFundamentals` which shows empty page. Should be disabled or show "Coming Soon" modal. **Separate branch.**

6. **Automation header: 44 lessons displayed vs 41 real** — Campus description says "44 lessons" but actual count is 41. **Separate branch.**

## Next development tasks (priority order)

1. **~~Fix calculateScore to correct/total + fix results page two-denominator bug.~~ — DONE** (branch `fix/exam-score-denominators`, browser-verified). Equal-weight model chosen; see Known bugs #1–#2 above.

2. **Gate or hide 3 content-less exams while question banks for m2-m8 do not exist.** Either hide `exam-module-2-3`, `exam-midterm`, `exam-final` from `/exams` index, or show "Coming Soon" badge. **Separate branch.**

3. **/exams redesign: separate per-campus exam index instead of global mixed list.** Group exams by campus (ISTQB section, Automation section). **Separate branch.**

4. **exam-pass badge: add badge criteria for passing an exam.** Currently no badge exists for exam passing. Add `exam_passed` criteria type to `badgeChecker.ts`, define badge(s) in `badges.ts`. **Separate branch.**

5. **QA Fundamentals campus content: curriculum and lessons.** Create 3-5 modules with introductory QA content. **Separate branch.**

6. **Lint cleanup: ~45 pre-existing lint errors + 3 unused imports in useExamAttempt.ts.** Run `npm run lint`, fix all errors. Remove unused imports (`useCallback`, `Exam`, `getQuestionBank`) from `useExamAttempt.ts`. **Separate branch after merge to main.**

## Pre-existing debt (do not touch without instruction)

- **SEO/OG metadata layout.tsx Playwright-only** — `layout.tsx` hardcodes Playwright-specific metadata. Needs campus-aware metadata. **→ Now addressed by the planned QA Campus restructure (Step 2 = neutralize root branding; Step 5 = optional per-campus metadata). See top of file.**
- **~45 lint errors pre-existing across codebase** — Do not fix in feature branches. Separate cleanup branch after merge.
- **3 unused imports in useExamAttempt.ts** — `useCallback`, `Exam`, `getQuestionBank` confirmed pre-existing via `git diff`. Do not remove in feature branches; goes to lint cleanup branch.
