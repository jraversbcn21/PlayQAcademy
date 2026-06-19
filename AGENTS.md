# AGENTS.md — PlayQAcademy / main

## Project overview

PlayQAcademy is a bilingual (ES/EN) learning platform for software QA professionals, built with **Next.js 14 (App Router), TypeScript (strict), Firebase (Auth + Firestore), and Tailwind CSS**. Content is organized into three active, self-contained campuses:

| Campus (`id`) | Modules | Lessons | Exams | Badges |
|---|---|---|---|---|
| QA Fundamentals (`qaFundamentals`) | 10 | 45 | 11 | 11 |
| ISTQB CTFL Foundation (`istqb`) | 6 | 25 | 9 | 15 |
| Playwright Automation (`automation`) | 8 | 41 | 4 | 5 |

Each module holds bilingual lessons (flashcards, quizzes, exercises, tables, callouts…). Campuses have associated exams. Gamification (points, levels, badges, streaks) tracks user progress across all campuses. The global badge catalog is **48** (campus badges above + cross-campus badges: first-login/lesson/quiz/exercise, streaks, perfectionist, etc.).

## Conventions & workflow

- **Bilingual everywhere:** every user-facing string is `{ es, en }` (the `Bilingual` type). No empty `"en": ""`, no hydration-flash placeholders.
- **Direct-to-`main` workflow:** work is committed straight to `main` (no open PRs/branches).
- **Quality gate:** `npm run typecheck` **and** `npm run lint` must both be **0 errors / 0 warnings** before every commit. This is currently the case.
- **Sync this file:** every feature commit is followed by (or includes) a `docs:` commit that updates AGENTS.md and references the feature hash. AGENTS.md describes the *current* state; git holds the changelog.

## Architecture (durable facts — read before changing content/exams/badges)

- **Campuses are a derived grouping over modules — NOT nested in data.** Progress/exams/gamification/badges key off `moduleId`/`examId`, never `campusId`. Adding or moving content needs no Firestore migration and breaks no URLs. Root `/[lng]` is the neutral "QA Campus" hub; sub-campus URLs are flat `/campus/[campusId]`. The single fixed parent abstraction lives in `src/types/campus.ts` + `src/lib/constants/campuses.ts`. (Full restructure history: `docs/todo-qa-campus-restructure.md`.)
- **Exams are data-driven.** `getExamsForCampus(campusId)` returns exams whose `moduleIds` ⊆ the campus modules. `isExamReady(exam)` gates "Coming Soon" and requires **both** enough total questions (`getAvailableQuestionCount(exam) >= exam.questionCount`) **and** every one of `exam.moduleIds` contributing at least one question — without the second check, a multi-module exam (midterm/final, mock exams) could hit its total purely from a few well-stocked modules while a required module sits at zero, silently never drawing from it despite the exam claiming full coverage. An exam with no/short/partial bank surfaces but is not startable, and lights up automatically once every required module has a bank (no code change). `generateExamQuestions` produces a **seeded (userId+examId), stable** selection at a **40/35/25** easy/medium/hard split.
- **Question-bank registry.** Each `src/lib/constants/examQuestions/*.ts` calls `registerQuestions()` into a global bank and is side-effect-imported in `exams.ts`. `getQuestionsForModules` matches a question if **any** of its `moduleIds` is requested (`.some()`). To keep per-module exams **pure**, tag each question to a **single** chapter/module — broad multi-module tagging pollutes per-module pools.
- **Scoring is equal-weight:** `calculateScore = correct / total questions × 100`. The results page derives `correct` and `total` from the same question set, so the fraction and headline % always agree. (Old attempts stored before this keep their legacy score in Firestore; not recomputed.)
- **Badges are criteria-based** (`src/lib/constants/badges.ts`, `BadgeCriteria` union in `gamification.ts`). `module_completed` and `exam_passed` award through the data-driven flow (`badgeChecker.ts` + `recordExamPassed` / module-completion context) — **adding a badge object is enough, no new wiring**. Passing an exam queues a `BadgeUnlockedModal`. Only passes/completions *after* a badge is added award it (no retroactive award) — `badgeChecker.ts` only evaluates badges not already in `earnedBadges`, so changing a badge's criteria never revokes one a user already has.
- **`campus_completed` criteria is scoped, never global.** It takes a `campusId` and checks only that campus's `getModulesForCampus(campusId)` — there is deliberately no "all modules across every campus" variant; a global version (`all_modules_completed`, no campusId) existed before the multi-campus expansion and silently became "complete all 24 modules in all 3 campuses" once QAF/ISTQB were added, which is why `all_modules_complete` ("Graduado PlayQAcademy") and `playq_certified` now use `campus_completed`/`exam_passed` instead. Don't reintroduce an unscoped variant without scoping it to a campus.
- **`exercise_completed` is a platform-wide counter, not campus-scoped** (no per-campus tracking of which exercise IDs belong to which module exists). It's correct today *only* because the `"exercise"` lesson-section type is used exclusively by the 8 Automation modules (one each) — `automation_master`'s `count: 8` happens to equal both "all exercises in Automation" and "all exercises on the platform". If QA Fundamentals or ISTQB ever add an `"exercise"` section, this badge's criteria silently stops meaning "Automation Master" and must be re-scoped first (see the comment on this case in `badgeChecker.ts`).
- **`all_badges_earned` criteria** (used by `all_badges`, "Coleccionista de Insignias"/"Badge Collector") checks that every *other* badge (`BADGES.filter(b => b.criteria.type !== "all_badges_earned")`) is in the user's `earnedBadges` — it excludes itself structurally rather than by hardcoded id, so it stays correct even if a second such badge were ever added.
- **Glossary** (`src/lib/constants/glossary.ts`): a flat list tagged by `chapter`; the page derives the chapter list dynamically (`Set + sort`). ISTQB uses bare keys `"1"…"6"`; QA Fundamentals uses `qaf-1…qaf-10`. Section titles live in `CHAPTER_TITLES`. Reachable from the navbar (`nav.glossary`, between Curriculum and Playground, desktop + mobile).
- **Module locking is OFF** (`ENFORCE_MODULE_LOCKING = false`): no module is ever `"locked"`; unlock logic never crosses campus boundaries.
- **Module `estimatedMinutes` is a manual value** shown directly in the UI (campus cards, dashboard, learn page) — bump it when you add/remove lessons in a module.
- **Legal pages** (`/privacy`, `/terms`, `/cookies`; content lives in `public/locales/{es,en}/common.json` under `privacy`/`terms`/`cookies` keys, rendered by `src/app/[lng]/{privacy,terms,cookies}/page.tsx`): `terms.s2Body` describes all three campuses (QA Fundamentals, ISTQB CTFL prep, Playwright automation) — update it if a campus is added/removed/renamed. `terms.s8Body` explicitly disclaims any ISTQB® affiliation/accreditation (PlayQAcademy's "Simulacro ISTQB CTFL" exams are unofficial practice material, not the real certification) — keep this if more third-party-branded mock content is ever added. Bump the relevant page's `lastUpdated` only when its body content actually changes.
- **Every auth-gated client page needs both halves of the guard.** The `if (authLoading || !user) return <spinner>` pattern (dashboard, exams, learn) only resolves once `authLoading` flips to `false`; if there's no signed-in user it stays `true` forever unless the page also has a `useEffect` that `router.push`es to `/auth/sign-in` once `!authLoading && !user`. `middleware.ts`'s `PROTECTED_PATTERNS` (cookie-based, server-side) is the other half — a path missing from both means the page spins indefinitely instead of bouncing to sign-in. `/exams` had neither until fixed; both halves now also cover `exams/[examId]/start|take|results`.
- **Email/password sign-up requires verification.** `signUpWithEmail` sends a Firebase verification email whose link opens our own `/auth/action` page (`actionCodeSettings.handleCodeInApp = true`); the `auth_token` cookie that `middleware.ts` checks is only set once `emailVerified` is `true`, so unverified accounts are bounced to `/auth/verify-email` (resend with 60s cooldown, auto re-check on tab focus) instead of the dashboard. `/auth/action` requires an explicit "Verificar mi cuenta" click before calling `applyActionCode` — it never fires automatically on page load, since email-client link prescanners (Outlook Safe Links, Gmail) silently visit and consume the one-time code otherwise. The validity of `mode`/`oobCode` is checked once in the initial `useState` (not a `useEffect`), so there's no render-then-effect gap that could flip the screen before a real click. If `applyActionCode` rejects a code whose account turns out to already be verified (e.g. a previous attempt consumed it), the page shows an "already verified" state pointing to sign-in instead of the generic invalid-link error. Google sign-in is exempt — Firebase marks Google accounts as pre-verified.

## Visual identity

- **Palette** (`tailwind.config.ts`, 50-900 scales): `brand.forest` (primary green), `brand.terra` (terracotta accent), `brand.gold` (achievements/ISTQB). Shades 300/400 are theme-aware CSS vars (`--brand-{forest,terra,gold}-{300,400}` in `globals.css`) so text stays legible in both themes.
- **Theme:** real light/dark toggle (`src/components/layout/ThemeToggle.tsx`, sun/moon icon in navbar), **defaults to light** (cream `#fbfaf5`, dark variant `#0e1814`). A no-flash inline script in `src/app/layout.tsx` reads `localStorage["theme"]` before paint. All theming flows through `--color-bg-*`/`--color-text-*`/`--color-border` CSS vars (`.light` = default/light, `:root` = dark) — `dark:` Tailwind variants are not used.
- **Typography:** `font-sans` Plus Jakarta Sans (body), `font-display` Chakra Petch (hero `<h1>`), `font-heading` Space Grotesk ("PlayQ" wordmark + campus card titles), `font-mono` JetBrains Mono (code).
- **Campus tiles** (`CampusCard.tsx` `CAMPUS_TILES`): `qaFundamentals` = forest (book), `istqb` = gold (certificate), `automation` = terra (automation icon).
- Landing: hero banner (`public/images/banner.jpg`) above the title; campus page has a collapsible exams panel (collapsed by default) so the modules grid is the focus.
- **Exams page (`/exams`):** single-open horizontal pill accordion, one pill per campus (name + exam count + chevron), `grid gap-3 sm:grid-cols-3` — the **same** grid classes as the stats cards row directly above it, so the two rows' columns line up; changing one without the other will misalign them. Clicking a pill expands that campus's exam list below and collapses any other open one; the page loads with all three collapsed. The per-exam card markup below the open pill (badges, "Comenzar" button, best-score line) is unchanged from before the accordion.
- **Curriculum certification section** (`/curriculum`, "Camino a la certificación"): exam cards are grouped into one block per campus (QA Fundamentals → ISTQB → Automation, `getSubCampuses()` order), each with its own forest/gold/terra heading and number-badge color (`CAMPUS_ACCENT` map in `page.tsx`, same convention as `CampusCard.tsx`'s tiles) — not one flat mixed-order grid. The "unlocks badge" hint under each card is derived at module load via `BADGE_BY_EXAM_ID` (every badge whose `criteria.type === "exam_passed"`, keyed by `examId`) — it shows the real badge name or renders nothing, never a guessed/hardcoded string.
- **Footer community links** (`Footer.tsx`): GitHub, LinkedIn, Instagram — all three point to the platform's generic landing page (`https://github.com` / `https://linkedin.com` / `https://instagram.com`), not a personal profile, since no dedicated PlayQAcademy account exists yet on any of them. Swap in the real profile URL once one is created. `footer.learn.courses` points to `/` (home hub) — `/courses` was a dead route (404), there's no separate course-catalog page.

## Campus status

### 1. QA Fundamentals (`qaFundamentals`) — active
- **Modules:** 10 (`qaf-m1`…`qaf-m10`) — Introducción a QA/Testing, Calidad de Software (ISO/IEC 25010), SDLC/STLC, Análisis de Requisitos, Diseño de Casos (caja negra + exploratorio), Ejecución y Gestión de Defectos, Metodologías Ágiles (Scrum/Kanban), Herramientas QA (Jira/Confluence/Azure Test Plans), Testing Web/Mobile + Accesibilidad (WCAG), IA aplicada al QA (ISTQB CT-AI).
- **Lessons:** 45 (5+4+5+4+5+5+4+4+4+5), bilingual, built from the 11 `LessonSection` types.
- **Exams:** 11 — `exam-qaf-m1`…`exam-qaf-m10` (6-10 q, 10-15 min, 65%) + `exam-qaf-final` (40 q, 60 min, campus-wide simulacro).
- **Badges:** 11 — `qaf_m1_complete`…`qaf_m10_complete` + `qaf_certified` (campus completion).
- **Glossary:** full coverage, chapters `qaf-1`…`qaf-10`.
- **Sources in `resources`:** ISTQB CTFL v4.0 syllabus + Glossary, ISO/IEC 25010:2023, ISO/IEC/IEEE 29119, Scrum Guide 2020, Agile Manifesto, Kanban Guide, Jira/Confluence/Azure Test Plans docs, ISTQB CT-AI.
- **Verification:** browser-verified end-to-end (see "Verified in browser" #5 below) — lesson completion → points/badges, `exam-qaf-final` pass → `qaf_certified` modal.

### 2. ISTQB CTFL Foundation (`istqb`) — active
- **Modules:** 6 (`istqb-fundamentals`, `istqb-sdlc`, `istqb-static-testing`, `istqb-test-analysis`, `istqb-management`, `istqb-tools`).
- **Lessons:** 25 (M1:5 · M2:4 · M3:3 · M4:5 · M5:5 · M6:3). Module 6 grew 1→3 and module 3 grew 2→3 (added `istqb-l3-3` "Effective reviews and static analysis in practice"). **All ISTQB lessons carry sourced `resources`.**
- **Exams:** 9
  - **6 per-module** `exam-istqb-m1`…`exam-istqb-m6` (8-12 q, 15-25 min, 65%, gated behind their module). Backed by chapter-specific banks `istqb-m1..m6.ts` (72 q) plus the chapter-tagged general questions; each per-module pool is **pure**.
  - **3 full mock exams** `exam-istqb-ctfl` (Set A), `exam-istqb-ctfl-2` (Set B), `exam-istqb-ctfl-3` (Set C) — 40 q, 60 min, 65%, all 6 chapters. Seeded distinct selections (11-14/40 overlap between any pair).
- **Question bank:** 144 general/simulacro questions (`istqb.ts` 50 + `istqb-extra.ts` 22 + per-module banks, all chapter-tagged), mixed difficulty. `istqb.ts`'s 50 questions were retagged from all-6-modules to their real chapter to keep per-module pools pure (the simulacros, `moduleIds` = all 6, are unaffected).
- **Badges:** 15 — 6 module-completion (`istqb_m1_complete`…`m6`, rare/75), 6 per-module exam-passed (`istqb_m1_exam_passed`…`m6`, rare/125 → `exam-istqb-m1..m6`), 3 mock-exam (`istqb_ctfl_passed` epic/400 → Set A; `istqb_ctfl_b_passed` / `istqb_ctfl_c_passed` epic/300 → Set B/C).
- **Glossary:** chapters 1-6 (bare keys `"1"`…`"6"`), 9 chapter-6 terms (Tool Support).
- **Sources in banks/`resources`:** ISTQB CTFL v4.0 Syllabus + Glossary, IEEE 1028, Jira/Xray, Azure Test Plans, TestRail, SonarQube (incl. Quality Gates), ESLint, Playwright docs.
- **Verification:** typecheck/lint clean + runtime-verified (all 9 exams ready, per-module pools pure, simulacros at 40/35/25, badges 0 orphan criteria). **End-to-end browser test still pending** — see Open items.

### 3. Playwright Automation (`automation`) — active
- **Modules:** 8 (`m1-typescript-foundations` … `m8-cicd-reporting`).
- **Lessons:** 41 (m1-m8 total).
- **Exams:** 4 defined (`exam-module-1`, `exam-module-2-3`, `exam-midterm`, `exam-final`); **all 4 are ready.** Question banks exist for every module `m1`-`m8` (`module-1.ts`…`module-8.ts`, each tagged single-module to stay pure for future per-module exams), 175 questions total. `exam-final` (m1-m8, 60 q) genuinely covers all 8 modules now, not just an aggregate count — see `isExamReady` below.
- **Badges:** module-completion badges for `m1`…`m3` + `automation_master`; `module_1_exam_passed` (🥇 rare/150 → `exam-module-1`).

## Verified in browser (evidence — do not reopen)

Verified by Jorge in the browser; older evidence in `docs/session-log-2026-06-10.md`.

1. **ISTQB exam engine (older fixes)** — in-memory scoring from `answers` (not Firestore re-read), Firestore `in_progress → in_progress` rule for answer persistence, gamification write isolated in try/catch, level + points updated on the same write as pass. All confirmed against `exam_attempts`/Firebase docs.
2. **ISTQB content render** — all lessons render with complete bilingual content, no missing translations; tables (modules 4-6) render as tables; TTS "Escuchar" works on flashcards; badge "Módulos" count correct (6). *(Walkthrough predates the 21→25 lesson growth; new lessons are static-reviewed, not yet click-tested — see Open items.)*
3. **Campus/learn navigation** — campus-relative module numbering (1-6, not global), campus-aware breadcrumbs and unlock logic that never crosses campus boundaries.
4. **Dashboard "Resume learning"** — resolves to the module actually in progress (last in-progress with completed lessons), not always the first curriculum module.
5. **QA Fundamentals end-to-end** — local-dev Firebase account: lesson completion awards points + `module_completed` badge; `exam-qaf-final` pass (93%) → results screen → `qaf_certified` unlocks via `BadgeUnlockedModal` and shows on `/badges`.
6. **Email verification end-to-end** — sign-up → `/auth/verify-email` holding screen → emailed link → `/auth/action` confirm-click → success / already-verified states → sign-in → `/dashboard`; resend button's 60s cooldown countdown; direct navigation to `/dashboard` while unverified bounces to sign-in; Google sign-up skips the verify-email detour entirely.
7. **Exams page accordion** — pills load fully collapsed; clicking one expands its exam list and collapses any other; pill row's columns align exactly with the stats cards row above it.

## Open items / backlog

1. **ISTQB end-to-end browser verification** (this session's output, not yet click-tested): the 9 exams (start → answer → pass → results), the 15 badges (earned state + unlock modal), the Glossary tab + chapter 6, and the new lessons (`istqb-l3-3`, `istqb-l6-2`, `istqb-l6-3`). Requires a real Firebase account.
2. **Theme toggle live browser verification** (low priority): click → dark (`#0e1814`) → reload → persists via `localStorage`. Verified via dev-server HTML/CSS output only, not interactively clicked.
