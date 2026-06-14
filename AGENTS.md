# AGENTS.md — PlayQAcademy / main

## Project overview

PlayQAcademy is a bilingual (ES/EN) learning platform for software QA professionals, built with Next.js 14 (App Router), TypeScript (strict), Firebase (Auth + Firestore), and Tailwind CSS. The platform organizes content into three active campuses: QA Fundamentals (10 modules, 45 lessons — manual/functional QA from zero to QA Junior), ISTQB CTFL Foundation (6 modules, 21 lessons), and Playwright Automation (8 modules, 44 lessons). Each campus contains modules, each module contains lessons with interactive content (flashcards, quizzes, exercises), and campuses have associated exams. Gamification (points, levels, badges) tracks user progress across all campuses.

## Branch state

- **HEAD:** this commit (`fix(dashboard): resume-learning CTA` + AGENTS.md sync), descendant of `c19996a` (`main`, pushed to `origin/main`). Working tree clean.
- **Status:** All planned work is merged into `main`. The repo passes `npm run typecheck` **and** `npm run lint` with **0 errors** (4 `<img>` warnings remain by choice — see Pre-existing debt).
- **PRs merged (#2–#7):**
  - **#2** `fix/exam-score-denominators` — equal-weight scoring + consistent results denominators (Known bugs #1–#2)
  - **#3** `fix/gate-contentless-exams` — gate content-less exams as "Coming Soon" (Known bug #3)
  - **#4** `feature/exams-by-campus` — group `/exams` index by campus (Known bug #4)
  - **#5** `feature/exam-passed-badge` — exam-pass badges (task #4; **end-to-end pass test still pending**, see task #4)
  - **#6** `chore/lint-typecheck-cleanup` — fixed all lint + typecheck errors (13 typecheck, 45 lint → 0) (task #6)
  - **#7** `fix/landing-cta-buttons` — removed redundant hero "Regístrate aquí" CTA; renamed "Ver currículum" → "Ver campus" (`hero.ctaSecondary`); dropped unused `hero.ctaPrimary` key
- **History note:** PR #1 (`feature/qa-campus-root`) was merged with `main` as base instead of the planned `feature/unified-campus`, bringing all prior unified-campus work (ISTQB content/wiring, exam/gamification fixes, landing restructure) into `main` in one step — no conflicts, no data/code loss. `feature/unified-campus` and `feature/qa-campus-root` are fully merged and deleted.
- **Direct-to-main commits after PR #7** (single-session work, no PR):
  - `881f1f4` chore: ignore Python bytecode artifacts in `.gitignore`
  - `8dade39` feat(landing): redesign hero/campus cards/navbar with brand-blue tech color scheme (pulsing eyebrow badge, gradient "Ver campus" CTA, colored gradient icon tiles on campus + feature cards, pulsing dot next to "PlayQ" logo) — Playwright-verified on `/es` and `/en`, light & dark mode
  - `a497612` feat(qa-fundamentals): activate full QA Fundamentals campus — 10 modules (`qaf-m1`…`qaf-m10`), 45 lessons, 10 module exams + 1 final campus exam, 11 badges (see Campus status #1)
  - `c19996a` feat(qa-fundamentals): glossary entries for modules 3-10 (completes glossary coverage for all 10 QAF modules)
  - this commit: fix(dashboard): "Resume learning" CTA now resolves to the module the user actually has in progress, not always the first curriculum module (see Verified and closed #17)
- **Only remaining open item:** Step 5 of the QA Campus restructure (per-campus SEO metadata for `/campus/[campusId]`) remains deferred.

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
15. **QA Fundamentals campus page** — `/es/campus/qaFundamentals` Playwright-verified in light and dark mode: all 10 modules + 11 exams render with `status: "active"`, no console or page errors.
16. **Lesson `qaf-m1-l1` content review** — Static code review (no live browser session — `/learn/*` requires a real Firebase account, none created by design) confirmed all 7 section types used (heading, paragraph, callout, list, table, flashcard, quiz) have matching renderer branches in `LessonRenderer.tsx`/`QuizSection.tsx`/`FlashcardSection.tsx`, bilingual ES/EN content is complete, and the lesson is correctly registered in `LESSON_REGISTRY` via `getAllLessonsContent()`.
17. **Dashboard "Resume learning" CTA fix** — `unlockedModules[0]` always resolved to `m1-typescript-foundations` (first module in `CURRICULUM`) regardless of actual progress, because `ENFORCE_MODULE_LOCKING = false` means no module is ever `"locked"`. Replaced with `resumeModule`: prefers the last module in curriculum order with `status === "in_progress" && completedLessonCount > 0`, falling back to the first unlocked module for brand-new users. Browser-verified by Jorge on `/es/dashboard`: the banner now points to the QA Fundamentals module he's actually working through.

## Campus status

### 1. QA Fundamentals (`qaFundamentals`)
- **Status:** active
- **Modules:** 10 (`qaf-m1`…`qaf-m10`) — Introducción a QA/Testing, Calidad de Software (ISO/IEC 25010), SDLC/STLC, Análisis de Requisitos, Diseño de Casos (caja negra + exploratorio), Ejecución y Gestión de Defectos, Metodologías Ágiles (Scrum/Kanban), Herramientas QA (Jira/Confluence/Azure Test Plans), Testing Web/Mobile + Accesibilidad (WCAG), IA aplicada al QA (ISTQB CT-AI).
- **Lessons:** 45 total (5+4+5+4+5+5+4+4+4+5 across the 10 modules). Each is bilingual ES/EN, built from the 11 `LessonSection` types (heading, paragraph, code, callout, image, video, list, quiz, exercise, flashcard, table).
- **Exams:** 11 — `exam-qaf-m1`…`exam-qaf-m10` (6-10 questions each, 10-15 min, 65% to pass) + `exam-qaf-final` (40 questions, 60 min, 65% to pass, campus-wide simulacro covering all 10 modules).
- **Badges:** 11 — `qaf_m1_complete`…`qaf_m10_complete` (`module_completed` criteria, one per module) + `qaf_certified` (campus completion).
- **Glossary:** Full coverage, chapters `qaf-1`…`qaf-10` in `glossary.ts`.
- **Sources cited in `resources`:** ISTQB CTFL v4.0 syllabus + Glossary, ISO/IEC 25010:2023, ISO/IEC/IEEE 29119, Scrum Guide 2020, Agile Manifesto, Kanban Guide, Jira/Confluence/Azure Test Plans docs, ISTQB CT-AI.
- **Verification status:** typecheck + lint clean. Campus page (`/es/campus/qaFundamentals`) Playwright-verified in light & dark mode: all 10 modules + 11 exams render with `status: "active"`, no console/page errors. Lesson `qaf-m1-l1` statically reviewed (content + renderer wiring correct, bilingual complete, registered in `LESSON_REGISTRY`). **Not yet browser-verified:** live quiz/flashcard interaction, lesson completion → progress/gamification, and module exam flow — `/learn/*` requires a real Firebase session and no test account has been created (deliberate, see Verified and closed #16).

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

5. **~~coming_soon campus is a clickable Link~~ — RESOLVED.** QA Fundamentals is now `status: "active"` with full content (10 modules, 45 lessons — see Campus status #1); the campus card behaves like ISTQB/Automation.

6. **Automation header: 44 lessons displayed vs 41 real** — Campus description says "44 lessons" but actual count is 41. **Separate branch.**

## Next development tasks (priority order)

1. **~~Fix calculateScore to correct/total + fix results page two-denominator bug.~~ — DONE** (branch `fix/exam-score-denominators`, browser-verified). Equal-weight model chosen; see Known bugs #1–#2 above.

2. **~~Gate or hide 3 content-less exams while question banks for m2-m8 do not exist.~~ — DONE** (branch `fix/gate-contentless-exams`). "Coming Soon" badge approach via data-driven `isExamReady`; see Known bugs #3 above.

3. **~~/exams redesign: separate per-campus exam index instead of global mixed list.~~ — DONE** (branch `feature/exams-by-campus`, PR #4, browser-verified). See Known bugs #4 above.

4. **~~exam-pass badge: add badge criteria for passing an exam.~~ — DONE** (branch `feature/exam-passed-badge`, PR #5 merged). Added `{ type: "exam_passed"; examId }` criteria (`gamification.ts` + `badgeChecker.ts` with optional `passedExamIds` context), two badges in `badges.ts` (🥇 `module_1_exam_passed` rare/150pts → `exam-module-1`; 🎓 `istqb_ctfl_passed` epic/400pts → `exam-istqb-ctfl`), and `recordExamPassed(uid, examId)` in `useGamification.ts` called from `submitExam` on a pass. `playq_certified` left untouched (its `exam-final` has no bank → would be unobtainable). **Partially verified:** typecheck clean (no new errors), routes compile, badge catalog count went 21→23. **Pending end-to-end test by Jorge:** pass an exam and confirm the badge moves to "Earned". Note: only passes *after* this deploy award badges (no retroactive award).

5. **~~QA Fundamentals campus content: curriculum and lessons.~~ — DONE.** Full 10-module curriculum authored and activated (commits `a497612`, `c19996a`; see Campus status #1). Scope grew from the original "3-5 modules" estimate to a complete 10-module manual/functional QA track (zero → QA Junior), per plan `dreamy-doodling-cerf`.

6. **~~Lint cleanup: ~45 pre-existing lint errors + 3 unused imports in useExamAttempt.ts.~~ — DONE** (branch `chore/lint-typecheck-cleanup`). Fixed all 45 lint errors (unused imports/vars across ~24 files) AND all 13 typecheck errors (Metadata import from `next`, `Bilingual` access via `[lng as "es"|"en"]`, `RARITY_ORDER ?? 0`, `unlockedAt` cast, `updateDoc` `UpdateData<DocumentData>` cast, duplicate `Badge` import). `npm run typecheck` and `npm run lint` are both clean (0 errors). **Remaining:** 4 `@next/next/no-img-element` *warnings* (leaderboard, playground/files, Navbar, LessonRenderer) — not errors; converting `<img>`→`next/image` needs width/height + `images.remotePatterns` for avatar domains, deferred as its own change.

## Pre-existing debt (do not touch without instruction)

- **SEO/OG metadata layout.tsx Playwright-only** — `layout.tsx` hardcodes Playwright-specific metadata. Needs campus-aware metadata. **→ Now addressed by the planned QA Campus restructure (Step 2 = neutralize root branding; Step 5 = optional per-campus metadata). See top of file.**
- **~~~45 lint errors + 3 unused imports in useExamAttempt.ts~~ — RESOLVED** by `chore/lint-typecheck-cleanup` (task #6 above). Codebase is lint- and typecheck-clean (0 errors); 4 `<img>` warnings remain by choice.
- **4 `<img>` → `next/image` warnings** — leaderboard avatar, playground/files, Navbar avatar, LessonRenderer image. Conversion needs `images.remotePatterns` config for external avatar domains; deferred to a dedicated change.
