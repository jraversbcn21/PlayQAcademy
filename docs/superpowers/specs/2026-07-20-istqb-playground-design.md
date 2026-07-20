# ISTQB Playground — Design

**Date:** 2026-07-20
**Status:** Approved by Jorge (brainstorming session)

## Goal

Give the ISTQB CTFL Foundation campus its own Playground: a set of interactive,
exam-prep training drills, 100% scoped to ISTQB Foundation content. Today the
ISTQB pill on `/playground` shows "Próximamente"; after this work it lights up
with 7 exercises.

## Decisions made during brainstorming

1. **No exam simulator duplicate.** `/exams` already has 6 per-module ISTQB
   exams + 3 full 40-question CTFL mocks with attempt history and badges. The
   Playground instead offers a **Quiz Rápido** differentiated by
   **immediate per-question feedback** (real exams only give feedback at the
   end), and links to the real mocks as the "next step".
2. **No progress dashboard.** Playground stays true to its established
   pattern: zero Firestore writes, zero persistence, works without an account.
   Drills show their score at the end (like the QA Fundamentals drills) and
   nothing survives a reload. Real progress lives in `/exams` + `/dashboard`.
3. **Full set: 7 exercises.** No separate "quick resources" page.
4. **New question content.** Quiz and True/False questions are written fresh
   for the Playground — the exam question banks are NOT reused, so a practice
   mode with instant explanations never spoils the pools that award badges.
5. **Architecture: self-contained pages** (Approach A). Each exercise is an
   independent `"use client"` page with inline bilingual content, exactly like
   the 4 QA Fundamentals drills. No shared "drill engine" abstraction (rejected
   as premature), no single-hub-with-tabs page (rejected as breaking the
   platform's card + sub-nav navigation pattern).

## Routes & registry

7 new routes, all prefixed `istqb-` to avoid colliding with future generic
exercise names from other campuses:

| Route | Exercise | Difficulty | Module tags |
|---|---|---|---|
| `/playground/istqb-quiz` | Quiz Rápido (immediate feedback) | intermediate | all chapters |
| `/playground/istqb-flashcards` | Glossary flashcards | beginner | all chapters |
| `/playground/istqb-levels` | Test levels & types classification | beginner | M2 |
| `/playground/istqb-techniques` | Test design technique picker | intermediate | M4 |
| `/playground/istqb-truefalse` | True/False rapid round | beginner | M1 |
| `/playground/istqb-match` | Concept matching | intermediate | M1, M3, M5 |
| `/playground/istqb-coverage` | Coverage & traceability | advanced | M4 |

Each page: `src/app/[lng]/playground/<route>/page.tsx`, `"use client"`,
self-contained (types + bilingual content + UI in one file), client-side
scoring, "↺ Reintentar" reset, no Firestore, no auth.

Content sizes below marked "~N" are **minimums** — the implementation plan
pins the exact counts, never below these.

### Changes outside the new pages (the strict minimum)

1. **`src/lib/constants/playground.ts`** — append 7 entries with
   `campusId: "istqb"`, real module tags, icons, bilingual title/description.
   The index pill, breadcrumb, and sub-nav all derive from the registry and
   activate automatically.
2. **`src/app/[lng]/playground/layout.tsx`** — one-line fix: the "Setup" link
   (Playwright-specific guide) currently shows when
   `activeCampusId !== "qaFundamentals"`, which would surface it inside ISTQB
   exercises. Change the condition to `activeCampusId === "automation"`.

Nothing else is touched: no other campus's exercises, no exams, no
gamification, no shared components modified.

## The 7 exercises

### 1. Quiz Rápido (`istqb-quiz`)

- Own bank of **~35 new questions** (not from the exam banks), each tagged
  with chapter (1-6) and difficulty, bilingual, with a per-question
  explanation and syllabus chapter reference.
- Each round randomly selects **10 questions** mixing chapters.
- One question at a time; answering reveals correct/incorrect **immediately**
  with the explanation. Round progress bar ("Pregunta 3/10").
- Final screen: score, per-chapter breakdown ("Cap. 4: 2/3"), and a CTA to the
  real CTFL mocks on `/exams` ("¿Listo para el examen real?").

### 2. Flashcards (`istqb-flashcards`)

- **Reuses the existing `GLOSSARY`** filtered to ISTQB chapters `"1"`–`"6"`
  (57 terms today; picks up new terms automatically). No duplicated content.
- Chapter filter pills + "Todos"; every chapter 1-6 has terms, so no empty
  state is reachable.
- Large centered card: term → click/tap/keyboard to flip (pure CSS
  `rotateY` + `backface-visibility`, no new libraries) → definition in the
  active language.
- Prev/next navigation (buttons + arrow keys), "12/57" counter, shuffle.
- Light self-assessment: "La sabía / Repasar" per card; end-of-deck summary
  with the option to re-run only the "Repasar" cards. All in-memory.

### 3. Test levels & types (`istqb-levels`)

- ~12 realistic scenarios; for each, classify **level** (component /
  integration / system / acceptance) and **type** (functional /
  non-functional / white-box / change-related). Same two-axis pattern as the
  QAF triage drill (severity + priority).
- Submit-then-feedback with per-scenario explanation.

### 4. Technique picker (`istqb-techniques`)

- ~10 mini-specs; choose the best-fit technique: EP, BVA, decision table,
  state transition, white-box (statement/branch), experience-based.
- Explanation covers why the right one wins AND why the tempting wrong ones
  don't.

### 5. True/False (`istqb-truefalse`)

- ~20 new statements: the 7 testing principles, common myths ("exhaustive
  testing is possible"), independence of testing, etc.
- Rapid-round format: large statement, two buttons, immediate feedback +
  explanation, next. Final score with best correct-streak.

### 6. Concept matching (`istqb-match`)

- Click-to-match (the established `req-match` pattern — works on mobile; no
  drag & drop).
- 3 rounds: term ↔ definition, activity ↔ test-process phase, role ↔
  responsibility in formal reviews.
- Select left, select right, pair locks in; feedback on round completion.

### 7. Coverage & traceability (`istqb-coverage`)

- ~6 advanced exercises:
  - Given pseudocode + a set of test cases, compute **statement and branch
    coverage** (numeric multiple-choice).
  - Given a requirements × test-cases traceability matrix, identify uncovered
    requirements and orphan test cases.
- Step-by-step explanation of each calculation on submit.

## UX & visual

- **Zero new components, colors, or dependencies.** Cards
  `rounded-xl border bg-[var(--color-bg-secondary)]`; `brand-forest` for
  correct/primary, `amber`/`red` for partial/incorrect, `brand-gold` for
  achievement moments; existing `Badge` for module/difficulty tags. Light and
  dark themes work via the existing CSS vars (no `dark:` variants).
- **Light gamification, no false promises:** ✓/✗ feedback, streaks in T/F,
  per-chapter breakdown in the quiz, closing messages by score tier
  ("¡Nivel certificación!" at ≥65% — the same pass mark as the real CTFL
  exams). No points, no badges, no persistence. Low scores CTA to the
  matching `/campus/istqb` module; high scores CTA to the `/exams` mocks.
- **100% bilingual:** every string `{ es, en }` inline, read with the existing
  `[lng as "es" | "en"] ?? .en` fallback. Both languages written from the
  first commit; no empty `"en": ""`.
- **Accessibility:** real `<button>`s everywhere (flashcard flip included),
  `aria-pressed`/`aria-expanded` on selections, `htmlFor`/`id` on any inputs.
- **Edge cases:** submit disabled with an answered/total counter until
  complete (existing pattern).

## Verification

- Quality gate before every commit: `npm run typecheck` + `npm run lint` +
  `npm run build`, all 0 errors/warnings (kill any stray dev server before
  building — Windows `.next` lock).
- Browser verification via a Playwright script (same pattern as prior
  sessions): all 7 exercises load in ES and EN; the ISTQB pill shows 7; one
  full flow per exercise (answer → submit → feedback → retry); the Setup link
  does NOT appear in the ISTQB sub-nav (and still does in Automation); the
  Automation and QA Fundamentals exercises are untouched.

## Workflow

Direct-to-`main` commits (established workflow), one commit per exercise or
logical group, followed by the `docs:` AGENTS.md sync commit at the end.
