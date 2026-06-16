# AGENTS.md — PlayQAcademy / main

## Project overview

PlayQAcademy is a bilingual (ES/EN) learning platform for software QA professionals, built with Next.js 14 (App Router), TypeScript (strict), Firebase (Auth + Firestore), and Tailwind CSS. The platform organizes content into three active campuses: QA Fundamentals (10 modules, 45 lessons — manual/functional QA from zero to QA Junior), ISTQB CTFL Foundation (6 modules, 24 lessons, 9 exams), and Playwright Automation (8 modules, 44 lessons). Each campus contains modules, each module contains lessons with interactive content (flashcards, quizzes, exercises), and campuses have associated exams. Gamification (points, levels, badges) tracks user progress across all campuses.

## Branch state

- **HEAD:** `main`, working tree clean. All work below is committed directly to `main` (no open branches/PRs).
- **Status:** `npm run typecheck` **and** `npm run lint` both pass with **0 errors and 0 warnings**.
- **PRs merged (#2–#7):**
  - **#2** `fix/exam-score-denominators` — equal-weight scoring + consistent results denominators (Known bugs #1–#2)
  - **#3** `fix/gate-contentless-exams` — gate content-less exams as "Coming Soon" (Known bug #3)
  - **#4** `feature/exams-by-campus` — group `/exams` index by campus (Known bug #4)
  - **#5** `feature/exam-passed-badge` — exam-pass badges (task #4; **end-to-end pass test still pending**, see task #4)
  - **#6** `chore/lint-typecheck-cleanup` — fixed all lint + typecheck errors (13 typecheck, 45 lint → 0) (task #6)
  - **#7** `fix/landing-cta-buttons` — removed redundant hero "Regístrate aquí" CTA; renamed "Ver currículum" → "Ver campus" (`hero.ctaSecondary`); dropped unused `hero.ctaPrimary` key
- **History note:** PR #1 (`feature/qa-campus-root`) was merged with `main` as base instead of the planned `feature/unified-campus`, bringing all prior unified-campus work (ISTQB content/wiring, exam/gamification fixes, landing restructure) into `main` in one step — no conflicts, no data/code loss. `feature/unified-campus` and `feature/qa-campus-root` are fully merged and deleted.
- **Direct-to-main commits after PR #7** (single-session work, no PRs):
  - `881f1f4` chore: ignore Python bytecode artifacts in `.gitignore`
  - `8dade39` feat(landing): redesign hero/campus cards/navbar with pulsing eyebrow badge, gradient "Ver campus" CTA, colored gradient icon tiles on campus + feature cards, pulsing dot next to "PlayQ" logo — Playwright-verified on `/es` and `/en`, light & dark mode. *Color scheme (brand-blue) superseded by `1847a5d`.*
  - `a497612` feat(qa-fundamentals): activate full QA Fundamentals campus — 10 modules (`qaf-m1`…`qaf-m10`), 45 lessons, 10 module exams + 1 final campus exam, 11 badges (see Campus status #1)
  - `c19996a` feat(qa-fundamentals): glossary entries for modules 3-10 (completes glossary coverage for all 10 QAF modules)
  - `9a5f55e` fix(dashboard): "Resume learning" CTA now resolves to the module the user actually has in progress, not always the first curriculum module (see Verified and closed #17)
  - `c0223bd` fix(gamification): fix module-completion badge not awarding — `updateUserProgress` rewritten as an atomic `arrayUnion`/`arrayRemove` merge (was a racy read-modify-write that could silently drop already-completed lessons); `handleMarkComplete`'s `completedModuleIds` now derived via shared `buildModuleCompletionContext` helper so a module reaching 100% on its final lesson is recognized immediately for its `module_completed` badge.
  - `4e0e4fd` feat(dashboard): redesign with gradient icon tiles for stat cards, pulsing-dot "resume learning" badge, per-campus gradient tiles on progress cards (reuses `CampusCard` tile definitions). *Color scheme (tech-blue) superseded by `1847a5d`.*
  - `b9296da` fix(exams): show badge-unlocked popup when passing an exam — `submitExam` now propagates the `Badge[]` returned by `recordExamPassed`, so exam-pass badges (e.g. `qaf_certified`) queue a `BadgeUnlockedModal`, mirroring the lesson-completion flow.
  - `0a76a70` fix(automation campus): correct lesson count in description (44 → 41) — m1-m8 total 41 lessons, not 44 (see Campus status #3, Known bug #6).
  - `6a43861` feat(seo): add per-campus metadata; document remaining no-img-element warnings — split `campus/[campusId]/page.tsx` into a server component (`generateMetadata`) + `CampusPageClient.tsx`; annotated the 4 `@next/next/no-img-element` warnings with `eslint-disable` + rationale (external OAuth avatars, `blob:` preview, arbitrary lesson-content images — none compatible with `next/image` without `remotePatterns`). Lint went from 4 warnings to **0**.
  - `b96b680` fix(gamification): persist bookmarks and feed real quiz/exercise data into lesson-complete badge check — `useBookmarked` now reads `users/{uid}.bookmarks` on mount (was hardcoded `false`, so toggled bookmarks vanished on reload); `markLessonComplete` derives `perfectQuizIds`/`exerciseCompletedCount` from the gamification doc it already fetches instead of taking them as dead `[]`/`0` parameters. **Note:** the `perfectionist` badge (`perfect_quizzes: 44`) was already obtainable via `recordQuizAnswer`'s own `checkAndAwardBadges` call (always uses the real `correctQuizIds`) — this commit makes `markLessonComplete`'s own badge check internally consistent, it does not unlock a previously-unobtainable badge.
  - `1847a5d` feat(theme): rebrand to forest/terra/gold palette with light/dark toggle — renamed `brand.blue/green/orange` → `brand.forest/gold/terra` across 52 files (new 50-900 color scales in `tailwind.config.ts`; `qaFundamentals`=forest, `istqb`=gold, `automation`=terra, matching the new design reference `Care new.jpg`); swapped Inter for Plus Jakarta Sans (`font-sans`, body), added Chakra Petch (`font-display`, hero `<h1>`) and Space Grotesk (`font-heading`, "PlayQ" wordmark + campus card titles), kept JetBrains Mono for code; added a real light/dark theme toggle (`src/components/layout/ThemeToggle.tsx`, sun/moon icon in navbar) defaulting to **light mode** (cream `#fbfaf5`), with a no-flash inline script in `layout.tsx` + `localStorage["theme"]` persistence. Typecheck/lint clean (0/0). See "Visual identity (current)" below for the full palette/typography reference.
- **Direct-to-main commits after `1847a5d`** (2026-06-16 session):
  - `b1a4ca2` feat(ui): collapsible exams panel on campus page + hero banner image — `CampusPageClient.tsx`: replaced flat 11-button exam grid with a single collapsible toggle (collapsed by default, count badge + chevron animation) so the modules grid is the visual focus; exam chips expand on demand as small pill links. `src/app/[lng]/page.tsx`: added a horizontal hero banner (`public/images/banner.jpg`, `h-52` fixed height, `object-cover`) above the hero title; reduced hero padding `py-20 → py-12` and removed `min-h-[calc(100vh-4rem)]` so the title sits immediately below the banner. Typecheck/lint clean (0/0).
  - `0fba020` feat(gamification): add 14 ISTQB badges — 6 module-completion (`istqb_m1_complete`…`m6`, rare/75), 6 per-module exam-passed (`istqb_m1_exam_passed`…`m6`, rare/125 → `exam-istqb-m1..m6`), and 2 alternate mock-exam badges (`istqb_ctfl_b_passed`/`istqb_ctfl_c_passed`, epic/300 → Set B/C). Brings ISTQB badges 1 → 15 and the global catalog 34 → 48; all award via the existing data-driven `module_completed`/`exam_passed` flow (no new wiring). Typecheck/lint clean (0/0); runtime-verified (0 orphan criteria, no duplicate icons). See Campus status #2.
  - `9078a25` feat(istqb): expand ISTQB campus from 1 exam/21 lessons to **9 exams/24 lessons**, all sources cited. **Phase 1:** added 6 per-module question banks (`istqb-m1..m6.ts`, 72 questions) + 6 module exams (`exam-istqb-m1..m6`); retagged `istqb.ts`'s 50 general questions from all-6-modules to their real chapter (fixes per-module pool pollution under `getQuestionsForModules` `.some()` matching); expanded `istqb-tools` (module 6) from 1 to 3 lessons with sourced `resources` (registered in `curriculum.ts`). **Phase 2:** added `istqb-extra.ts` (22 chapter-tagged, mixed-difficulty questions → simulacro pool 122→144) + 2 mock exams (`exam-istqb-ctfl-2` Set B, `exam-istqb-ctfl-3` Set C; seeded distinct selections, 11-14/40 overlap). Every new bank cites its syllabus chapter; every new resource cites a source. Typecheck/lint clean (0/0); runtime-verified (all 9 exams ready, per-module pools pure, simulacros at 40/35/25 split). See Campus status #2.
- **Open items:** none blocking. One pending item: live browser test of the `1847a5d` theme toggle (click → dark variant `#0e1814`, reload → persists via `localStorage`) — verified via the dev server's rendered HTML/CSS (correct classes, CSS var values, light-by-default) but not interactively clicked in a browser (no browser automation tool available this session). See "Next development tasks" for backlog.

## Visual identity (current)

- **Palette** (`tailwind.config.ts`, 50-900 scales): `brand.forest` (primary green — was `blue`), `brand.terra` (terracotta accent — was `orange`), `brand.gold` (achievements/ISTQB — was `green`). Shades 300/400 are theme-aware CSS vars (`--brand-{forest,terra,gold}-{300,400}`, defined in `globals.css`) so text colors stay legible in both themes.
- **Theme:** real light/dark toggle (`src/components/layout/ThemeToggle.tsx`, sun/moon icon in navbar), **defaults to light** (cream `#fbfaf5`). A no-flash inline script in `src/app/layout.tsx` reads `localStorage["theme"]` before paint to avoid a flash. All theming flows through `--color-bg-*`/`--color-text-*`/`--color-border` CSS vars in `globals.css` (`.light` = light values/default, `:root` = dark) — `dark:` Tailwind variants are not used anywhere.
- **Typography:** `font-sans` = Plus Jakarta Sans (body, default), `font-display` = Chakra Petch (hero `<h1>` on landing), `font-heading` = Space Grotesk ("PlayQ" wordmark + campus card titles), `font-mono` = JetBrains Mono (unchanged, code blocks).
- **Campus tile colors:** `qaFundamentals` = forest (book icon), `istqb` = gold (certificate icon), `automation` = terra (automation icon) in `CampusCard.tsx`'s `CAMPUS_TILES`.
- Implemented in `1847a5d` (see Branch state above).

## QA Campus restructure — done, verified, closed (do not reopen)

- **Goal achieved:** **"QA Campus"** is now the neutral root/entry point. Users land on the QA Campus hub (`/[lng]`) and pick one of three equal, self-contained sub-campuses (QA Fundamentals, ISTQB, Automation).
- **Key finding (still true):** campuses are NOT nested in data — `Campus` is a *derived grouping layer over modules*; progress/exams/gamification/badges key off `moduleId`/`examId`, never `campusId`. No Firestore migration, no URL breakage, no data risk occurred.
- **What changed:** root `/[lng]` is the QA Campus hub (sub-campus URLs stayed flat `/campus/[campusId]`, no redirects); added single fixed `QA_CAMPUS` parent abstraction (`src/types/campus.ts`, `src/lib/constants/campuses.ts`); neutralized root branding (`src/app/layout.tsx`, `src/app/[lng]/layout.tsx`); campus exam links are now data-driven via `getExamsForCampus()` (`src/lib/constants/exams.ts`, `src/app/[lng]/campus/[campusId]/page.tsx`), removing the `campusId === "istqb"` hardcode; added breadcrumb `QA Campus → {campus}` linking back to the hub.
- **Verification:** typecheck (13 pre-existing errors, unchanged vs. pre-branch `22f2dca`) and lint (~45 pre-existing errors, unchanged) confirmed no new issues. Full manual walkthrough on `/es` and `/en` (hub, all 3 campus detail pages, exam links, breadcrumbs, lesson progress persistence) confirmed working. Details in `docs/todo-qa-campus-restructure.md`.
- **Step 5 (per-campus SEO metadata) — DONE** (commit `6a43861`): `campus/[campusId]/page.tsx` is now a server component exporting `generateMetadata` (title/description/OG derived from `getCampusById`), rendering the former page UI via `CampusPageClient.tsx`. Verified via curl for all 3 campuses (es/en) plus the not-found fallback.
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
18. **QA Fundamentals end-to-end flow** — Browser-verified using a local-dev test account (Firebase Auth + Firestore, `http://localhost:3001`): completing a lesson awards points and a `module_completed` badge, passing `exam-qaf-final` (93%) shows the results screen, and the `qaf_certified` badge unlocks via a `BadgeUnlockedModal` popup and appears as "QA Fundamentals Certificado" on `/badges`. Supersedes the "Not yet browser-verified" caveat in Campus status #1.

## Campus status

### 1. QA Fundamentals (`qaFundamentals`)
- **Status:** active
- **Modules:** 10 (`qaf-m1`…`qaf-m10`) — Introducción a QA/Testing, Calidad de Software (ISO/IEC 25010), SDLC/STLC, Análisis de Requisitos, Diseño de Casos (caja negra + exploratorio), Ejecución y Gestión de Defectos, Metodologías Ágiles (Scrum/Kanban), Herramientas QA (Jira/Confluence/Azure Test Plans), Testing Web/Mobile + Accesibilidad (WCAG), IA aplicada al QA (ISTQB CT-AI).
- **Lessons:** 45 total (5+4+5+4+5+5+4+4+4+5 across the 10 modules). Each is bilingual ES/EN, built from the 11 `LessonSection` types (heading, paragraph, code, callout, image, video, list, quiz, exercise, flashcard, table).
- **Exams:** 11 — `exam-qaf-m1`…`exam-qaf-m10` (6-10 questions each, 10-15 min, 65% to pass) + `exam-qaf-final` (40 questions, 60 min, 65% to pass, campus-wide simulacro covering all 10 modules).
- **Badges:** 11 — `qaf_m1_complete`…`qaf_m10_complete` (`module_completed` criteria, one per module) + `qaf_certified` (campus completion).
- **Glossary:** Full coverage, chapters `qaf-1`…`qaf-10` in `glossary.ts`.
- **Sources cited in `resources`:** ISTQB CTFL v4.0 syllabus + Glossary, ISO/IEC 25010:2023, ISO/IEC/IEEE 29119, Scrum Guide 2020, Agile Manifesto, Kanban Guide, Jira/Confluence/Azure Test Plans docs, ISTQB CT-AI.
- **Verification status:** typecheck + lint clean. Campus page (`/es/campus/qaFundamentals`) Playwright-verified in light & dark mode: all 10 modules + 11 exams render with `status: "active"`, no console/page errors. Lesson `qaf-m1-l1` statically reviewed (content + renderer wiring correct, bilingual complete, registered in `LESSON_REGISTRY`). Full live flow (quiz/flashcard interaction, lesson completion → progress/gamification/badges, `exam-qaf-final` pass → `qaf_certified`) browser-verified end-to-end — see Verified and closed #18.

### 2. ISTQB CTFL Foundation (`istqb`)
- **Status:** active
- **Modules:** 6 (istqb-fundamentals, istqb-sdlc, istqb-static-testing, istqb-test-analysis, istqb-management, istqb-tools)
- **Lessons:** 24 — module 6 (`istqb-tools`) expanded from 1 to 3 lessons in `9078a25` (added test-management tools + automation/static-analysis lessons, all with sourced `resources`).
- **Exams:** 9 (commit `9078a25`):
  - **6 per-module** `exam-istqb-m1`…`exam-istqb-m6` (8-12 questions, 15-25 min, 65% to pass, gated behind their module). Backed by 6 chapter-specific banks `istqb-m1..m6.ts` (72 questions) plus the retagged general questions; each per-module pool is **pure** (only that chapter's questions).
  - **3 full mock exams** `exam-istqb-ctfl` (Set A), `exam-istqb-ctfl-2` (Set B), `exam-istqb-ctfl-3` (Set C) — 40 questions, 60 min, 65% to pass, covering all 6 chapters.
- **Question bank:** 144 general/simulacro questions (`istqb.ts` 50 + `istqb-extra.ts` 22 + the per-module banks, all chapter-tagged) with mixed difficulty. The 3 simulacros draw seeded, distinct selections (11-14/40 overlap between any pair) at a 40/35/25 easy/medium/hard split.
- **Badges:** 15 (was 1) — 6 module-completion (`istqb_m1_complete`…`istqb_m6_complete`, rare/75, one per chapter), 6 per-module exam-passed (`istqb_m1_exam_passed`…`istqb_m6_exam_passed`, rare/125, → `exam-istqb-m1..m6`), and 3 mock-exam badges (`istqb_ctfl_passed` epic/400 → Set A; `istqb_ctfl_b_passed`/`istqb_ctfl_c_passed` epic/300 → Set B/C). All award data-driven via the existing `module_completed`/`exam_passed` flow (no new wiring). Global badge catalog 34 → 48.
- **Architecture note:** `istqb.ts`'s 50 questions were retagged from all-6-modules to their real chapter in `9078a25` to stop per-module exams drawing from the whole general pool (`getQuestionsForModules` uses `.some()` matching). The simulacros (moduleIds = all 6) are unaffected.
- **Sources cited in banks/`resources`:** ISTQB CTFL v4.0 Syllabus + Glossary; Jira/Xray, Azure Test Plans, TestRail, SonarQube, Playwright docs (lesson resources). **Working and verified** (typecheck/lint clean, runtime-verified).

### 3. Playwright Automation (`automation`)
- **Status:** active
- **Modules:** 8 (m1-typescript-foundations through m8-cicd-reporting)
- **Lessons:** 41 (m1-m8 total; description corrected from a previous "44" — see Known bugs #6)
- **Exam:** 4 exams defined (`exam-module-1`, `exam-module-2-3`, `exam-midterm`, `exam-final`). Only `exam-module-1` has a question bank (25 questions). The other 3 have no banks for m2-m8 and are now gated as "Coming Soon" via `isExamReady` (see Known bugs #3) — they surface but are not startable until banks exist.

## Known bugs (confirmed, separate branches required)

1. **~~calculateScore points-weighted vs equal-weight mismatch~~ — FIXED** (branch `fix/exam-score-denominators`). `calculateScore` now uses the decided equal-weight model (`correct / total questions × 100`) instead of points-weighted. Browser-verified by Jorge on `exam-module-1` (non-uniform points bank: 1/2/3 pts): 3/15 → 20% (reprobado), 11/15 → 73% (aprobado) — headline % now equals `round(correct/total×100)` in both cases.

2. **~~Results page two-denominator bug~~ — FIXED** (same branch). Results page derives `correct` and `total` from the same question set (`total = questions.length`, `correct` restricted to that set), so the fraction and the headline percentage always agree. Note: old attempts stored before this fix keep their points-weighted `score` in Firestore (not recomputed); only new attempts are fully consistent.

3. **~~3 content-less exams~~ — FIXED** (branch `fix/gate-contentless-exams`). New data-driven helper `isExamReady(exam)` in `exams.ts` (= `getQuestionsForModules(exam.moduleIds).length >= exam.questionCount`) gates `exam-module-2-3`, `exam-midterm`, `exam-final`. They now show a "Coming Soon"/"Próximamente" badge (not startable) in the `/exams` index, the campus detail page, and the `start` page (defense in depth). The `take` page also shows a proper "unavailable" message instead of the infinite spinner when a bank is empty. When question banks for m2-m8 are added later, these exams light up automatically (no code change — the helper is data-driven).

4. **~~/exams global index mixes all campuses~~ — FIXED** (branch `feature/exams-by-campus`, PR #4). `/[lng]/exams` now groups exams into per-campus sections via `getSubCampuses()` + `getExamsForCampus()`, each with a campus heading and a "View campus →" link. Campuses with no exams (QA Fundamentals) are skipped. Browser-verified on `/es` and `/en`.

5. **~~coming_soon campus is a clickable Link~~ — RESOLVED.** QA Fundamentals is now `status: "active"` with full content (10 modules, 45 lessons — see Campus status #1); the campus card behaves like ISTQB/Automation.

6. **~~Automation header: 44 lessons displayed vs 41 real~~ — FIXED** (commit `0a76a70`). Campus description now says "41 lessons", matching the actual m1-m8 lesson count.

## Next development tasks (priority order)

1. **~~Fix calculateScore to correct/total + fix results page two-denominator bug.~~ — DONE** (branch `fix/exam-score-denominators`, browser-verified). Equal-weight model chosen; see Known bugs #1–#2 above.

2. **~~Gate or hide 3 content-less exams while question banks for m2-m8 do not exist.~~ — DONE** (branch `fix/gate-contentless-exams`). "Coming Soon" badge approach via data-driven `isExamReady`; see Known bugs #3 above.

3. **~~/exams redesign: separate per-campus exam index instead of global mixed list.~~ — DONE** (branch `feature/exams-by-campus`, PR #4, browser-verified). See Known bugs #4 above.

4. **~~exam-pass badge: add badge criteria for passing an exam.~~ — DONE** (branch `feature/exam-passed-badge`, PR #5 merged). Added `{ type: "exam_passed"; examId }` criteria (`gamification.ts` + `badgeChecker.ts` with optional `passedExamIds` context), two badges in `badges.ts` (🥇 `module_1_exam_passed` rare/150pts → `exam-module-1`; 🎓 `istqb_ctfl_passed` epic/400pts → `exam-istqb-ctfl`), and `recordExamPassed(uid, examId)` in `useGamification.ts` called from `submitExam` on a pass. `playq_certified` left untouched (its `exam-final` has no bank → would be unobtainable). **Partially verified:** typecheck clean (no new errors), routes compile, badge catalog count went 21→23. **Pending end-to-end test by Jorge:** pass an exam and confirm the badge moves to "Earned". Note: only passes *after* this deploy award badges (no retroactive award).

5. **~~QA Fundamentals campus content: curriculum and lessons.~~ — DONE.** Full 10-module curriculum authored and activated (commits `a497612`, `c19996a`; see Campus status #1). Scope grew from the original "3-5 modules" estimate to a complete 10-module manual/functional QA track (zero → QA Junior).

6. **~~Lint cleanup: ~45 pre-existing lint errors + 3 unused imports in useExamAttempt.ts.~~ — DONE** (branch `chore/lint-typecheck-cleanup`). Fixed all 45 lint errors (unused imports/vars across ~24 files) AND all 13 typecheck errors (Metadata import from `next`, `Bilingual` access via `[lng as "es"|"en"]`, `RARITY_ORDER ?? 0`, `unlockedAt` cast, `updateDoc` `UpdateData<DocumentData>` cast, duplicate `Badge` import). The 4 remaining `@next/next/no-img-element` *warnings* (leaderboard, playground/files, Navbar, LessonRenderer) were resolved separately via commit `6a43861` (`eslint-disable` + rationale comments, see Branch state). `npm run typecheck` and `npm run lint` are both clean with **0 errors and 0 warnings**.

7. **Theme toggle live browser verification.** `1847a5d` added a real light/dark toggle (defaults to light). Code-reviewed and verified via dev server HTML/CSS output (correct `.light`/`:root` CSS vars, classes, no-flash script), but the click→dark-mode→reload→persists flow has not been interactively tested in a browser. Low priority — do when convenient.
