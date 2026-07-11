# Playground Signup Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dismissible banner to the Playground index (`/playground`) that nudges signed-out visitors to create an account, without implying Playground itself saves progress (it doesn't, for anyone).

**Architecture:** One new `"use client"` component (`SignupBanner.tsx`) that reads auth state from `useAuth()` and dismissal state from `localStorage`, rendering `null` until both are known and neither says "hide". Mounted once in `playground/page.tsx`, between the hero and the campus pill row. No Firestore writes, no new i18n JSON keys (inline bilingual, matching this route's existing convention).

**Tech Stack:** Next.js 15 App Router (client component), TypeScript, Tailwind CSS, `useAuth()` from `@/context/AuthContext`, browser `localStorage`.

## Global Constraints

- **No test framework exists** in this repo. The quality gate per task is: `npm run typecheck` (0 errors) and `npm run lint` (0 new errors); the final task also requires `npm run build` to succeed (this project has previously shipped a page that passed typecheck/lint but failed `next build` — see `AGENTS.md`'s Suspense-boundary note).
- **Dev server runs on port 3002** (`npm run dev`).
- **Bilingual convention for this route:** inline `lng === "es" ? "…" : "…"` ternaries, matching the existing pattern throughout `playground/page.tsx` and `playground/layout.tsx` — not the `t()`/JSON-key convention used elsewhere (e.g. Navbar).
- **Brand colors:** `brand-forest-*` (matches the existing "open campus pill" active state in `playground/page.tsx`), not `brand-gold-*` (reserved for Setup-guide CTAs on this page) or `brand-terra-*` (reserved for the Buy Me a Coffee button).
- **Scope:** Playground index (`/playground`) only. Do NOT touch `playground/layout.tsx` (would make it appear on every individual exercise page) or `/glossary` (out of scope per the design doc).
- **No progress-saving language.** The banner must not claim an account saves Playground progress — verified none of the Playground exercises write to Firestore for anyone, logged in or not. Copy sells access to lessons/exams/badges/leaderboard instead.

---

### Task 1: `SignupBanner` component

**Files:**
- Create: `src/components/playground/SignupBanner.tsx`

**Interfaces:**
- Consumes:
  - `useAuth()` from `@/context/AuthContext` → `{ user, loading }` (`user: UserProfile | null`, `loading: boolean`).
  - `Link` from `next/link`.
- Produces: default export `SignupBanner`, props `{ lng: string }`, consumed by Task 2.

- [ ] **Step 1: Create the component**

Create `src/components/playground/SignupBanner.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const DISMISS_KEY = "playground_signup_banner_dismissed";

export default function SignupBanner({ lng }: { lng: string }) {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (loading || user || dismissed) return null;

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-forest-500/30 bg-brand-forest-500/10 p-4">
      <p className="flex-1 text-sm text-[var(--color-text-secondary)]">
        {lng === "es"
          ? "Crea una cuenta gratis para desbloquear lecciones, exámenes, insignias y el ranking."
          : "Create a free account to unlock lessons, exams, badges, and the leaderboard."}
      </p>
      <Link
        href={`/${lng}/auth/sign-up`}
        className="shrink-0 rounded-lg bg-brand-forest-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-forest-500 transition-colors"
      >
        {lng === "es" ? "Crear cuenta" : "Create account"}
      </Link>
      <button
        type="button"
        aria-label={lng === "es" ? "Cerrar" : "Dismiss"}
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
        className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      >
        ✕
      </button>
    </div>
  );
}
```

Defaulting `dismissed` to `true` until the `useEffect` runs avoids a flash-of-banner for returning visitors who already dismissed it, and avoids an SSR/CSR hydration mismatch (`localStorage` doesn't exist server-side). Combined with `loading || user`, the banner only ever appears once both auth state and stored dismissal are known.

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both exit 0, lint shows "✔ No ESLint warnings or errors".

- [ ] **Step 3: Commit**

```bash
git add src/components/playground/SignupBanner.tsx
git commit -m "feat(playground): add SignupBanner component"
```

---

### Task 2: Mount on the Playground index and verify end-to-end

**Files:**
- Modify: `src/app/[lng]/playground/page.tsx:1-11` (imports)
- Modify: `src/app/[lng]/playground/page.tsx:99-108` (hero → campus pill row boundary)

**Interfaces:**
- Consumes: `SignupBanner` default export, `{ lng: string }` prop (Task 1).
- Produces: nothing consumed by later tasks (final task in this plan).

- [ ] **Step 1: Import the component**

In `src/app/[lng]/playground/page.tsx`, the current imports are:

```tsx
"use client";

import { useState, use } from "react";
import Link from "next/link";
import { getSubCampuses } from "@/lib/constants/campuses";
import {
  getExercisesForCampus,
  type PlaygroundExercise,
  type ExerciseDifficulty,
} from "@/lib/constants/playground";
import Badge from "@/components/ui/Badge";
```

Add `SignupBanner` alongside `Badge`:

```tsx
"use client";

import { useState, use } from "react";
import Link from "next/link";
import { getSubCampuses } from "@/lib/constants/campuses";
import {
  getExercisesForCampus,
  type PlaygroundExercise,
  type ExerciseDifficulty,
} from "@/lib/constants/playground";
import Badge from "@/components/ui/Badge";
import SignupBanner from "@/components/playground/SignupBanner";
```

- [ ] **Step 2: Mount it between the hero and the campus pill row**

The hero block currently ends and the campus pill row begins like this:

```tsx
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
```

Change it to:

```tsx
          <div className="mt-6 flex justify-center gap-3">
            <Link href={`/${lng}/playground/setup`}>
              <span className="inline-flex items-center rounded-lg bg-brand-gold-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-gold-500 transition-colors">
                ⚙️ {lng === "es" ? "Guía de Setup" : "Setup Guide"}
              </span>
            </Link>
          </div>
        </div>

        <SignupBanner lng={lng} />

        {/* Campus pill row */}
        <div className="mb-6 grid gap-3 sm:grid-cols-3">
```

- [ ] **Step 3: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both exit 0, lint shows "✔ No ESLint warnings or errors".

- [ ] **Step 4: Production build**

Run:
```bash
npm run build
```
Expected: build completes with "✓ Compiled successfully" and no errors. If a `npm run dev` server is already running, stop it first — this repo's Windows file-locking makes `dev` and `build` fight over `.next` (see `AGENTS.md`).

- [ ] **Step 5: Manual browser walkthrough**

Start the dev server if not already running (`npm run dev`, port 3002). Use a signed-out browser session (private/incognito window, or sign out first) unless a step says otherwise.

1. `http://localhost:3002/es/playground` — banner visible above the campus pill row, Spanish copy ("Crea una cuenta gratis para desbloquear lecciones, exámenes, insignias y el ranking."), "Crear cuenta" button.
2. `http://localhost:3002/en/playground` — banner visible, English copy, "Create account" button.
3. Click "Crear cuenta" / "Create account" — navigates to `/{lng}/auth/sign-up`.
4. Go back to `/es/playground`, click the ✕ — banner disappears immediately.
5. Reload the page — banner stays gone (localStorage persisted the dismissal).
6. Open DevTools → Application → Local Storage, confirm `playground_signup_banner_dismissed` is `"1"`, then delete that key (or open a fresh private window) and reload `/es/playground` — banner reappears.
7. Navigate into any individual exercise, e.g. `http://localhost:3002/es/playground/triage` — banner is **absent** (index-only, not in `playground/layout.tsx`).
8. Sign in with a real account, then visit `/es/playground` — banner never renders, even if the dismissal key isn't set.
9. Sign out again and reload `/es/playground` — banner reappears (assuming the dismissal key was cleared per step 6; if not, clear it again to confirm this case).

Expected: all 9 checks hold.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[lng]/playground/page.tsx"
git commit -m "feat(playground): mount SignupBanner on the Playground index"
```

---

## Verification Strategy (end-to-end)

1. **Static:** `npm run typecheck` and `npm run lint` clean after every task; `npm run build` clean at the end (Task 2 Step 4).
2. **Visual/manual:** Task 2 Step 5 walks both locales, the dismiss/persist/reset cycle via `localStorage`, the index-vs-exercise-page scoping, and the signed-in-never-shows case.
3. **Copy correctness:** confirmed manually in both `es` and `en` (Task 2 Step 5, checks 1-2) — no separate i18n JSON validation needed since this route uses inline bilingual strings, not translation keys.

## Critical Files

- `src/components/playground/SignupBanner.tsx` — new component, owns auth-gating and dismissal logic (Task 1)
- `src/app/[lng]/playground/page.tsx` — single mount point, index-only by construction (Task 2)
- `src/context/AuthContext.tsx` — reference only (`useAuth()` shape), not modified
- `src/app/[lng]/playground/layout.tsx` — reference only (confirms sub-nav/breadcrumb live here, not touched, so the banner never leaks into individual exercise pages), not modified
