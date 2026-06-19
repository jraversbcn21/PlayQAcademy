# Playground Campus-Aware Restructure — Design

**Date:** 2026-06-19
**Status:** Approved (pending implementation plan)

## Problem

The **Playground** is a top-level nav tab (`/playground`) presenting 9 hands-on
exercises (login form, signup wizard, e-commerce catalog, cart, data table,
dynamic content, files, iframes, API). **All 9 are 100% Playwright/automation**
(they reference automation modules M3–M7), and the hero literally reads *"Your
hands-on lab to write real Playwright tests."*

This is the same **domain leakage** the QA Campus restructure removed elsewhere:
an Automation-only feature surfaced in the global chrome as if it were
cross-cutting. Users of QA Fundamentals or ISTQB see "Playground" in the top
bar, enter, and find nothing for them — contradicting the decision that the
three sub-campuses are equal and self-contained.

## Goal

Make the Playground **campus-aware** (Option A): keep it as a prominent
top-level entry point, but present its content grouped by campus — Automation
populated today, QA Fundamentals and ISTQB shown as "Próximamente / Coming
Soon" — so the feature grows with the platform instead of being either demoted
or left as automation-centric leakage.

## Decisions (confirmed with user)

1. **Index layout:** campus **accordion**, mirroring the glossary/exams pattern
   (3 collapsible pills with exercise counts). Maximum consistency with what the
   user already learned elsewhere.
2. **Empty campuses:** QA Fundamentals and ISTQB render as **dimmed,
   non-expandable pills with a "Próximamente" badge** (count 0). They communicate
   the full vision without promising content that does not exist.
3. **Exercise sub-nav** (`layout.tsx`, the sticky bar inside each exercise):
   **left as-is.** Only addition: a static breadcrumb "Playground →
   Automatización" above it, shown when inside an exercise (not on the index), to
   locate the user in their campus.
4. **Hero copy:** reframed from "Playwright lab" → **neutral "QA practice lab"**
   ("Playground QA" / "Tu laboratorio práctico de QA").
5. **i18n convention:** follow the **existing inline-bilingual pattern** of this
   page and `exams/page.tsx` (`lng === "es" ? … : …`, `Bilingual` typed data).
   No `common.json` changes (the only nav key, `nav.playground`, already exists).

## Architecture

The existing `src/app/[lng]/exams/page.tsx` is the exact precedent: a campus
pill row + an open-campus accordion panel, driven by `getSubCampuses()` +
`getExamsForCampus()`. We replicate this for the Playground, with the one
difference that empty campuses are shown (dimmed) rather than filtered out.

A `Campus` remains a derived grouping layer defined only in `campuses.ts`. The
exercise → campus association becomes data-driven via a new
`getExercisesForCampus()` helper — the same Open/Closed extensibility as
`getExamsForCampus()`. Adding a future sub-campus of exercises is a data append,
not a refactor.

## Components

### 1. Exercise data registry — `src/lib/constants/playground.ts` (new)

Extracts the 9 exercises currently inline in `page.tsx` into a typed registry,
each tagged with its owning campus.

```ts
import type { Bilingual } from "@/types/lesson";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export interface PlaygroundExercise {
  href: string;          // e.g. "/playground/login"
  icon: string;          // emoji
  title: Bilingual;      // { es, en }
  description: Bilingual; // { es, en }
  modules: string[];     // e.g. ["M3: Locators", "M4: Actions"]
  difficulty: ExerciseDifficulty;
  campusId: string;      // all 9 current exercises → "automation"
}

export const PLAYGROUND_EXERCISES: PlaygroundExercise[] = [ /* the 9, campusId: "automation" */ ];

/** Exercises belonging to a given campus, in registry order. */
export function getExercisesForCampus(campusId: string): PlaygroundExercise[] {
  return PLAYGROUND_EXERCISES.filter((e) => e.campusId === campusId);
}
```

The data is a 1:1 transcription of today's `EXERCISE_CARDS` (titles,
descriptions, icons, modules, difficulty), converting the `titleEs/titleEn`
pairs to `Bilingual` `{ es, en }` objects.

### 2. Index page — `src/app/[lng]/playground/page.tsx` (rewrite)

- **Hero:** neutral copy — "Playground QA" / "Tu laboratorio práctico de QA" (ES),
  "QA Playground" / "Your hands-on QA practice lab" (EN). The "Setup Guide" CTA
  stays.
- **Pill row:** iterate `getSubCampuses()`. Each pill shows the campus title and
  its exercise count (`getExercisesForCampus(campus.id).length`).
  - Campus **with** exercises (Automation): active pill, toggles open/closed,
    `aria-expanded`.
  - Campus **without** exercises (QA Fundamentals, ISTQB): dimmed, `disabled`,
    not expandable, "Próximamente / Coming Soon" badge, count 0.
- **Open panel:** when a populated campus is open, render its exercises in the
  existing card grid (icon, title, description, module badges, difficulty badge),
  each linking to `/${lng}${exercise.href}`.
- **Default state:** none open on load (matches glossary accordion behaviour).

### 3. Exercise layout — `src/app/[lng]/playground/layout.tsx` (small addition)

Keep the existing sticky exercise sub-nav untouched. Add a static breadcrumb
**"Playground → Automatización"** ("Playground → Automation" in EN) rendered
**only when `pathname !== /${lng}/playground`** (i.e. inside an exercise, not on
the index), placed above the sub-nav bar. The "Playground" segment links back to
`/${lng}/playground`.

## Data Flow

```
campuses.ts ──getSubCampuses()──┐
                                ├─> playground/page.tsx (pill row + accordion)
playground.ts ──getExercisesForCampus(id)──┘
                                            └─> card grid for the open campus
```

No Firestore involvement, no new persisted state. The only client state is the
locally-held `openCampusId` (string | null), identical to the exams page.

## Error / Edge Handling

- **Empty campus opened:** not possible — empty-campus pills are `disabled` and
  cannot toggle open.
- **Unknown locale:** existing `lng as "es" | "en"` fallback pattern (already used
  across the codebase) applies; `Bilingual` access falls back to `.en`.
- **No campus open:** index shows the pill row only, no panel — valid initial
  state.

## Out of Scope

- The 9 exercise pages themselves and their behaviour — untouched.
- The Playground API routes (`src/app/api/playground/**`) — untouched.
- Authoring new exercises for QA Fundamentals or ISTQB — future content work.
- Deduplicating the separate `EXERCISES` array in `layout.tsx` vs the index
  registry — the sub-nav stays as-is per decision 3; no unification this pass.
- Any `common.json` key changes.

## Verification

1. **Static:** `npm run typecheck` (0 errors) and `npm run lint` (0 new errors).
2. **Helper check:** assert `getExercisesForCampus("automation").length === 9`,
   and `getExercisesForCampus("istqb")` / `getExercisesForCampus("qaFundamentals")`
   each return `[]`.
3. **Manual run** (`npm run dev`, port 3002), in both `/es` and `/en`:
   - `/playground` shows the neutral hero (no "Playwright" in the title) and 3
     campus pills with correct counts (9 / 0 / 0).
   - None open on load.
   - Clicking Automation expands its 9 exercise cards; clicking it again
     collapses.
   - QA Fundamentals and ISTQB pills are dimmed, show "Próximamente", and do not
     expand on click.
   - Entering an exercise (e.g. `/playground/login`) shows the
     "Playground → Automatización" breadcrumb above the sub-nav; the index does
     not.
   - Exercise links still navigate correctly; sub-nav inside exercises is
     unchanged.

## Critical Files

- `src/lib/constants/playground.ts` — new exercise registry + `getExercisesForCampus`
- `src/app/[lng]/playground/page.tsx` — rewrite to campus accordion
- `src/app/[lng]/playground/layout.tsx` — add conditional breadcrumb
- `src/app/[lng]/exams/page.tsx` — reference precedent (not modified)
- `src/lib/constants/campuses.ts` — `getSubCampuses()` (not modified)
