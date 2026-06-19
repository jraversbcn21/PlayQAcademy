# Playground Campus-Aware Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the `/playground` index campus-aware — group its 9 exercises by campus in a collapsible accordion (Automation populated, QA Fundamentals & ISTQB shown "Próximamente"), driven by a new data registry, mirroring the exams campus-accordion pattern.

**Architecture:** Extract the inline exercise list into a typed data registry (`playground.ts`) with a `getExercisesForCampus()` helper — the same Open/Closed shape as `getExamsForCampus()`. Rewrite the index `page.tsx` to render a campus pill row + open-campus panel using `getSubCampuses()`, exactly like `exams/page.tsx`. Add a static breadcrumb in the playground `layout.tsx` shown inside exercise pages only. No Firestore, no new persisted state.

**Tech Stack:** Next.js 14 App Router (client components), TypeScript, Tailwind CSS, bilingual `{ es, en }` data via the `Bilingual` type.

## Global Constraints

- **No test framework exists** in this repo (no jest/vitest; `exams/page.tsx` has no tests). The quality gate per task is: `npm run typecheck` (0 errors) **and** `npm run lint` (0 new errors), plus the manual walkthrough described in each task.
- **i18n convention:** follow the existing inline-bilingual pattern of `playground/page.tsx` and `exams/page.tsx` — `lng === "es" ? "…" : "…"` in JSX, `Bilingual` `{ es, en }` objects in data. Do **not** add or modify `common.json` keys.
- **Bilingual type:** `import type { Bilingual } from "@/types/lesson";` (shape: `{ es: string; en: string }`).
- **Locale access pattern:** read bilingual values as `value[lng as "es" | "en"] ?? value.en` (matches `exams/page.tsx`).
- **Dev server runs on port 3002** (`npm run dev`).
- **Exact exercise data must be transcribed verbatim** from the current `EXERCISE_CARDS` in `src/app/[lng]/playground/page.tsx` — same href, icon, titles, descriptions, modules, difficulty. All 9 belong to `campusId: "automation"`.
- **Brand classes** in use: open/active = `border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400`; idle = `border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)]`; count badge = `bg-brand-forest-500/15 text-brand-forest-400`.

---

### Task 1: Exercise data registry

**Files:**
- Create: `src/lib/constants/playground.ts`

**Interfaces:**
- Consumes: `Bilingual` from `@/types/lesson`.
- Produces:
  - `type ExerciseDifficulty = "beginner" | "intermediate" | "advanced"`
  - `interface PlaygroundExercise { href: string; icon: string; title: Bilingual; description: Bilingual; modules: string[]; difficulty: ExerciseDifficulty; campusId: string; }`
  - `const PLAYGROUND_EXERCISES: PlaygroundExercise[]` (the 9 automation exercises)
  - `function getExercisesForCampus(campusId: string): PlaygroundExercise[]`

- [ ] **Step 1: Create the registry file**

Create `src/lib/constants/playground.ts` with the full content below. The 9 entries are a 1:1 transcription of today's `EXERCISE_CARDS` (in `src/app/[lng]/playground/page.tsx` lines 24-34), with `titleEs/titleEn` → `title: { es, en }` and `descEs/descEn` → `description: { es, en }`, plus `campusId: "automation"` on every entry.

```ts
/**
 * PlayQ Academy — Playground exercise registry.
 *
 * The hands-on Playground exercises, grouped by the campus they belong to.
 * This is the single source of truth for which exercises exist and which
 * campus owns them. Like exams, the exercise→campus association is data-driven:
 * adding a future campus's exercises is an append here, not a refactor.
 *
 * All current exercises are Playwright/automation practice (campusId "automation").
 */

import type { Bilingual } from "@/types/lesson";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export interface PlaygroundExercise {
  /** Route relative to the locale segment, e.g. "/playground/login". */
  href: string;
  /** Emoji shown on the card. */
  icon: string;
  title: Bilingual;
  description: Bilingual;
  /** Curriculum module tags, e.g. "M3: Locators". */
  modules: string[];
  difficulty: ExerciseDifficulty;
  /** Owning campus id (matches a Campus.id in campuses.ts). */
  campusId: string;
}

export const PLAYGROUND_EXERCISES: PlaygroundExercise[] = [
  {
    href: "/playground/login",
    icon: "🔑",
    title: { es: "Formulario de Login", en: "Login Form" },
    description: {
      es: "Practica localizadores por rol y label, acciones fill/click y aserciones de URL y visibilidad.",
      en: "Practice role and label locators, fill/click actions, and URL/visibility assertions.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "beginner",
    campusId: "automation",
  },
  {
    href: "/playground/signup",
    icon: "📝",
    title: { es: "Asistente de Registro", en: "Sign Up Wizard" },
    description: {
      es: "Formulario multi-paso con validación por etapa, selectores anidados y navegación condicional.",
      en: "Multi-step form with per-stage validation, nested selectors, and conditional navigation.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/catalog",
    icon: "🛍️",
    title: { es: "Catálogo E-commerce", en: "E-commerce Catalog" },
    description: {
      es: "Filtros combinados, ordenamiento, paginación y localizadores complejos en un grid de productos.",
      en: "Combined filters, sorting, pagination, and complex locators in a product grid.",
    },
    modules: ["M3: Locators", "M5: POM"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/cart",
    icon: "🛒",
    title: { es: "Carrito de Compras", en: "Shopping Cart" },
    description: {
      es: "Manejo de estado, aserciones de totales, códigos de descuento y estados vacíos.",
      en: "State management, total assertions, discount codes, and empty states.",
    },
    modules: ["M4: Actions", "M4: Assertions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/table",
    icon: "📊",
    title: { es: "Tabla de Datos", en: "Data Table" },
    description: {
      es: "Tabla con ordenamiento, filtros, paginación, selección de filas y edición inline.",
      en: "Table with sorting, filtering, pagination, row selection, and inline editing.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "advanced",
    campusId: "automation",
  },
  {
    href: "/playground/dynamic",
    icon: "⏳",
    title: { es: "Contenido Dinámico", en: "Dynamic Content" },
    description: {
      es: "Practica el auto-waiting con spinners, progress bars, delays aleatorios y toasts.",
      en: "Practice auto-waiting with spinners, progress bars, random delays, and toasts.",
    },
    modules: ["M4: Auto-waiting"],
    difficulty: "beginner",
    campusId: "automation",
  },
  {
    href: "/playground/files",
    icon: "📁",
    title: { es: "Subida y Descarga de Archivos", en: "File Upload & Download" },
    description: {
      es: "Ejercicios de file input, drag-and-drop, validación de tipos y descargas.",
      en: "File input exercises, drag-and-drop, type validation, and downloads.",
    },
    modules: ["M4: Special Actions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/frames",
    icon: "🖼️",
    title: { es: "iFrames y Popups", en: "iFrames & Popups" },
    description: {
      es: "Navegación entre frames, ventanas emergentes y modales con formularios anidados.",
      en: "Frame switching, popup windows, and modals with nested forms.",
    },
    modules: ["M4: Frames & Windows"],
    difficulty: "advanced",
    campusId: "automation",
  },
  {
    href: "/playground/api",
    icon: "🌐",
    title: { es: "API Playground", en: "API Playground" },
    description: {
      es: "Endpoints REST reales para practicar API testing con Playwright. GET, POST, PUT, DELETE.",
      en: "Real REST endpoints to practice API testing with Playwright. GET, POST, PUT, DELETE.",
    },
    modules: ["M7: API Testing"],
    difficulty: "advanced",
    campusId: "automation",
  },
];

/** Exercises belonging to a given campus, in registry order. */
export function getExercisesForCampus(campusId: string): PlaygroundExercise[] {
  return PLAYGROUND_EXERCISES.filter((e) => e.campusId === campusId);
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Verify the registry counts**

Run this one-off check (no test framework; this confirms the helper + data are correct):

```bash
node -e "const fs=require('fs');const s=fs.readFileSync('src/lib/constants/playground.ts','utf8');const auto=(s.match(/campusId: \"automation\"/g)||[]).length;const total=(s.match(/href: \"\/playground\//g)||[]).length;console.log('automation entries:',auto,'| total entries:',total);if(auto!==9||total!==9){process.exit(1)}"
```
Expected: `automation entries: 9 | total entries: 9` and exit 0.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants/playground.ts
git commit -m "feat(playground): add data-driven exercise registry with getExercisesForCampus"
```

---

### Task 2: Campus-accordion index page

**Files:**
- Modify (full rewrite): `src/app/[lng]/playground/page.tsx`

**Interfaces:**
- Consumes:
  - `getSubCampuses()` from `@/lib/constants/campuses` → `Campus[]` sorted by `order`. A `Campus` has `id: string`, `title: Bilingual`, `description: Bilingual`, `moduleIds: string[]`, `status`.
  - `getExercisesForCampus(campusId: string): PlaygroundExercise[]` and the `PlaygroundExercise` / `ExerciseDifficulty` types from `@/lib/constants/playground` (Task 1).
- Produces: nothing consumed by later tasks.

**Reference precedent:** `src/app/[lng]/exams/page.tsx` (pill row at lines 89-120, open panel at 123-194). Match its visual structure; the only behavioural difference is that empty campuses are rendered (disabled) rather than filtered out.

- [ ] **Step 1: Rewrite the index page**

Replace the entire contents of `src/app/[lng]/playground/page.tsx` with:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { getSubCampuses } from "@/lib/constants/campuses";
import {
  getExercisesForCampus,
  type PlaygroundExercise,
  type ExerciseDifficulty,
} from "@/lib/constants/playground";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Exercise card                                                      */
/* ------------------------------------------------------------------ */

const DIFF_BORDER: Record<ExerciseDifficulty, string> = {
  beginner: "border-brand-gold-500/30",
  intermediate: "border-amber-500/30",
  advanced: "border-red-500/30",
};

const DIFF_BADGE: Record<ExerciseDifficulty, "success" | "warning" | "error"> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "error",
};

function ExerciseCard({ exercise, lng }: { exercise: PlaygroundExercise; lng: string }) {
  const title = exercise.title[lng as "es" | "en"] ?? exercise.title.en;
  const desc = exercise.description[lng as "es" | "en"] ?? exercise.description.en;
  return (
    <Link
      href={`/${lng}${exercise.href}`}
      className={[
        "group rounded-xl border bg-[var(--color-bg-secondary)] p-5 transition-all hover:shadow-lg hover:border-brand-forest-500/40",
        DIFF_BORDER[exercise.difficulty],
      ].join(" ")}
    >
      <div className="mb-3 text-3xl">{exercise.icon}</div>
      <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)] group-hover:text-brand-forest-400 transition-colors">
        {title}
      </h3>
      <p className="mb-3 text-xs leading-relaxed text-[var(--color-text-muted)]">{desc}</p>
      <div className="flex flex-wrap gap-1.5">
        {exercise.modules.map((m) => (
          <Badge key={m} variant="info" size="sm">{m}</Badge>
        ))}
        <Badge variant={DIFF_BADGE[exercise.difficulty]} size="sm">
          {exercise.difficulty}
        </Badge>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface PageProps { params: { lng: string } }

export default function PlaygroundHomePage({ params: { lng } }: PageProps) {
  const [openCampusId, setOpenCampusId] = useState<string | null>(null);

  const campuses = getSubCampuses().map((campus) => ({
    campus,
    exercises: getExercisesForCampus(campus.id),
  }));

  const openEntry = campuses.find(
    ({ campus, exercises }) => campus.id === openCampusId && exercises.length > 0
  );

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-5xl">
        {/* Hero */}
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Playground QA" : "QA Playground"}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {lng === "es"
              ? "Tu laboratorio práctico de QA"
              : "Your hands-on QA practice lab"}
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-sm leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Elige un campus y practica conceptos específicos del currículum. Ejecuta tus tests contra estas páginas desde tu máquina local. Abre la guía de Setup para comenzar."
              : "Pick a campus and practice specific curriculum concepts. Run your tests against these pages from your local machine. Open the Setup guide to get started."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/${lng}/playground/setup`}>
              <span className="inline-flex items-center rounded-lg bg-brand-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-gold-500 transition-colors">
                ⚙️ {lng === "es" ? "Guía de Setup" : "Setup Guide"}
              </span>
            </Link>
          </div>
        </div>

        {/* Campus pill row */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {campuses.map(({ campus, exercises }) => {
            const hasExercises = exercises.length > 0;
            const isOpen = hasExercises && openCampusId === campus.id;
            const title = campus.title[lng as "es" | "en"] ?? campus.title.en;
            return (
              <button
                key={campus.id}
                type="button"
                disabled={!hasExercises}
                onClick={() => hasExercises && setOpenCampusId(isOpen ? null : campus.id)}
                aria-expanded={isOpen}
                className={[
                  "flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                  !hasExercises
                    ? "cursor-not-allowed border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] opacity-50"
                    : isOpen
                      ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
                      : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                <span className="truncate text-left">{title}</span>
                <span className="flex shrink-0 items-center gap-2">
                  {hasExercises ? (
                    <>
                      <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                        {exercises.length}
                      </span>
                      <svg
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  ) : (
                    <Badge variant="warning" size="sm">
                      {lng === "es" ? "Próximamente" : "Coming Soon"}
                    </Badge>
                  )}
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {openEntry.exercises.map((exercise) => (
                <ExerciseCard key={exercise.href} exercise={exercise} lng={lng} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 4: Manual walkthrough**

Start dev server if not running (`npm run dev`, port 3002). In a browser, check **both** `http://localhost:3002/es/playground` and `http://localhost:3002/en/playground`:
- Hero title reads "Playground QA" / "QA Playground" — **no "Playwright" in the title**.
- Three campus pills appear with counts: Fundamentos de QA = "Próximamente" (dimmed), ISTQB = "Próximamente" (dimmed), Automatización = `9` with chevron.
- None open on load.
- Clicking **Automatización** expands a grid of 9 exercise cards; clicking it again collapses.
- Clicking either dimmed pill does nothing (no expand).
- An exercise card link (e.g. Login) navigates to `/{lng}/playground/login`.

Expected: all the above hold in both locales.

- [ ] **Step 5: Commit**

```bash
git add src/app/[lng]/playground/page.tsx
git commit -m "feat(playground): campus-accordion index, neutral QA hero copy"
```

---

### Task 3: Breadcrumb inside exercise pages

**Files:**
- Modify: `src/app/[lng]/playground/layout.tsx` (currently 88 lines; the sticky sub-nav lives at lines 35-84)

**Interfaces:**
- Consumes: `usePathname()` (already imported in the file) and `params.lng` (already destructured).
- Produces: nothing consumed by later tasks.

**Goal:** show a static "Playground → Automatización" breadcrumb above the existing sub-nav, **only when not on the index** (`pathname !== /${lng}/playground`). The "Playground" segment links back to the index. The sticky sub-nav itself is unchanged.

- [ ] **Step 1: Add the breadcrumb above the sub-nav**

In `src/app/[lng]/playground/layout.tsx`, locate the opening of the layout's returned markup:

```tsx
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Sub-nav */}
      <div className="sticky top-16 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-lg">
```

Replace those lines with (adds a `const isIndex` above the return and the breadcrumb block immediately inside the wrapper `div`):

```tsx
  const isIndex = pathname === `/${lng}/playground`;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Breadcrumb — shown inside an exercise, not on the index */}
      {!isIndex && (
        <div className="container-app px-4 pt-4">
          <nav className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]" aria-label="Breadcrumb">
            <Link href={`/${lng}/playground`} className="hover:text-[var(--color-text-primary)] transition-colors">
              Playground
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-[var(--color-text-secondary)]">
              {lng === "es" ? "Automatización" : "Automation"}
            </span>
          </nav>
        </div>
      )}

      {/* Sub-nav */}
      <div className="sticky top-16 z-30 border-b border-[var(--color-border)] bg-[var(--color-bg-primary)]/90 backdrop-blur-lg">
```

(`Link`, `usePathname`, and `pathname` are already imported/declared in the file — no new imports needed.)

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 4: Manual walkthrough**

With the dev server running, in both `/es` and `/en`:
- Visit `http://localhost:3002/es/playground` (index) → **no breadcrumb** shown above the sub-nav.
- Visit `http://localhost:3002/es/playground/login` (an exercise) → breadcrumb "Playground › Automatización" (ES) / "Playground › Automation" (EN) appears above the sub-nav; clicking "Playground" returns to the index.

Expected: breadcrumb present on exercise pages only, correct per locale, link works.

- [ ] **Step 5: Commit**

```bash
git add src/app/[lng]/playground/layout.tsx
git commit -m "feat(playground): add campus breadcrumb inside exercise pages"
```

---

## Verification Strategy (end-to-end)

1. **Static:** `npm run typecheck` clean; `npm run lint` no new errors (after each task and once at the end).
2. **Registry:** Task 1 Step 3 confirms 9 automation entries; the pill counts in Task 2 (9 / 0 / 0) are the live confirmation that `getExercisesForCampus` resolves correctly per campus.
3. **Index accordion** (Task 2 Step 4): neutral hero, three pills, Automation expands/collapses, empty pills dimmed + "Próximamente", cards link out — both `/es` and `/en`.
4. **Breadcrumb** (Task 3 Step 4): present inside exercises only, absent on index, correct per locale, link returns to index.
5. **Regression sanity:** the 9 exercise pages and the sticky sub-nav inside them are visually unchanged (only the breadcrumb is added above).

## Critical Files

- `src/lib/constants/playground.ts` — new exercise registry + `getExercisesForCampus` (Task 1)
- `src/app/[lng]/playground/page.tsx` — campus-accordion index, neutral hero (Task 2)
- `src/app/[lng]/playground/layout.tsx` — conditional breadcrumb (Task 3)
- `src/app/[lng]/exams/page.tsx` — accordion precedent (reference only, not modified)
- `src/lib/constants/campuses.ts` — `getSubCampuses()` (reference only, not modified)
