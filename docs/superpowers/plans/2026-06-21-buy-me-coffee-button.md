# Buy Me a Coffee Floating Button Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a globally visible, on-brand floating button linking to `https://buymeacoffee.com/jorgeborn3m`, hidden on 3 specific routes that either have a real layout collision or would distract.

**Architecture:** One new `"use client"` component (`BuyMeCoffeeButton.tsx`) that renders a styled `<a>` and self-excludes via `usePathname()` against a small regex list. Mounted once in the root locale layout, after `<Footer />`. No new state, no third-party script, no Firestore involvement.

**Tech Stack:** Next.js 14 App Router (client component), TypeScript, Tailwind CSS, the existing bilingual `t()` i18n hook (`useTranslation("common")` from `@/lib/i18n/client`).

## Global Constraints

- **No test framework exists** in this repo. The quality gate per task is: `npm run typecheck` (0 errors), `npm run lint` (0 new errors), and — for the final task — `npm run build` (must succeed; this project has previously shipped a page that passed typecheck/lint but failed `next build`, see `AGENTS.md`'s Suspense-boundary note), plus the manual browser walkthrough described in each task.
- **Dev server runs on port 3002** (`npm run dev`).
- **Bilingual convention:** every user-facing string is `{ es, en }`, looked up via the `t()` function from `useTranslation("common")` (not the inline `lng === "es" ? ... : ...` pattern — this component sits in shared layout, not a per-locale page, so it follows `Navbar.tsx`'s `t()` convention).
- **Brand colors:** `bg-brand-terra-500` / `hover:bg-brand-terra-400` (same accent as the navbar's "Crear cuenta" button) — do not introduce a new color.
- **External link security:** any `target="_blank"` anchor must include `rel="noopener noreferrer"`.
- **BMC URL:** `https://buymeacoffee.com/jorgeborn3m` (exact, case-sensitive).

---

### Task 1: i18n key

**Files:**
- Modify: `public/locales/es/common.json:26-39` (inside the `"nav"` object)
- Modify: `public/locales/en/common.json:26-39` (inside the `"nav"` object)

**Interfaces:**
- Produces: translation key `nav.buyMeCoffee`, consumed by Task 2 via `t("nav.buyMeCoffee")`.

- [ ] **Step 1: Add the Spanish key**

In `public/locales/es/common.json`, the `"nav"` object currently ends with:

```json
    "themeToLight": "Cambiar a modo claro",
    "themeToDark": "Cambiar a modo oscuro"
  },
```

Change it to:

```json
    "themeToLight": "Cambiar a modo claro",
    "themeToDark": "Cambiar a modo oscuro",
    "buyMeCoffee": "Invítame un café"
  },
```

- [ ] **Step 2: Add the English key**

In `public/locales/en/common.json`, the `"nav"` object currently ends with:

```json
    "themeToLight": "Switch to light mode",
    "themeToDark": "Switch to dark mode"
  },
```

Change it to:

```json
    "themeToLight": "Switch to light mode",
    "themeToDark": "Switch to dark mode",
    "buyMeCoffee": "Buy me a coffee"
  },
```

- [ ] **Step 3: Validate both JSON files parse**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('public/locales/es/common.json','utf8'));JSON.parse(require('fs').readFileSync('public/locales/en/common.json','utf8'));console.log('valid json')"
```
Expected: `valid json` (a trailing-comma or bracket mistake would throw here before you even reach typecheck).

- [ ] **Step 4: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both exit 0, lint shows "✔ No ESLint warnings or errors".

- [ ] **Step 5: Commit**

```bash
git add public/locales/es/common.json public/locales/en/common.json
git commit -m "feat(i18n): add nav.buyMeCoffee translation key"
```

---

### Task 2: `BuyMeCoffeeButton` component

**Files:**
- Create: `src/components/layout/BuyMeCoffeeButton.tsx`

**Interfaces:**
- Consumes:
  - `useTranslation("common")` from `@/lib/i18n/client` → `{ t }`, `t("nav.buyMeCoffee")` (Task 1).
  - `usePathname()` from `next/navigation` (already used this way in `src/app/[lng]/playground/layout.tsx`).
- Produces: default export `BuyMeCoffeeButton` (no props), consumed by Task 3.

- [ ] **Step 1: Create the component**

Create `src/components/layout/BuyMeCoffeeButton.tsx`:

```tsx
"use client";

import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";

/**
 * Routes where the floating button must NOT render, because the bottom-right
 * corner already has fixed/sticky UI there (lesson nav bar, the toast
 * exercise) or because it would distract during a timed exam. The 2-letter
 * locale segment is matched generically so this works for every language.
 */
const EXCLUDED_PATH_PATTERNS = [
  /^\/[a-z]{2}\/learn\/[^/]+\/[^/]+$/,
  /^\/[a-z]{2}\/playground\/dynamic$/,
  /^\/[a-z]{2}\/exams\/[^/]+\/take\/[^/]+$/,
];

export default function BuyMeCoffeeButton() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  if (EXCLUDED_PATH_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return null;
  }

  return (
    <a
      href="https://buymeacoffee.com/jorgeborn3m"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-brand-terra-500 px-4 py-3 text-sm font-medium text-white shadow-xl transition-colors hover:bg-brand-terra-400"
    >
      <span aria-hidden="true">☕</span>
      {t("nav.buyMeCoffee")}
    </a>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both exit 0, lint shows "✔ No ESLint warnings or errors".

- [ ] **Step 3: Verify the regexes match/exclude the right paths**

Run this one-off check (no test framework; confirms the exclusion patterns behave correctly before wiring the component into the live layout):

```bash
node -e "
const EXCLUDED = [
  /^\/[a-z]{2}\/learn\/[^/]+\/[^/]+$/,
  /^\/[a-z]{2}\/playground\/dynamic$/,
  /^\/[a-z]{2}\/exams\/[^/]+\/take\/[^/]+$/,
];
const cases = [
  ['/es', false],
  ['/en/dashboard', false],
  ['/es/learn/qaf-m1/qaf-l1', true],
  ['/en/learn/m1-typescript-foundations/m1-l1', true],
  ['/es/playground/dynamic', true],
  ['/es/playground/login', false],
  ['/en/exams/exam-qaf-final/take/abc123', true],
  ['/en/exams/exam-qaf-final/start', false],
];
let ok = true;
for (const [path, expected] of cases) {
  const excluded = EXCLUDED.some((p) => p.test(path));
  const pass = excluded === expected;
  ok = ok && pass;
  console.log(pass ? 'PASS' : 'FAIL', path, '-> excluded:', excluded, '(expected', expected, ')');
}
process.exit(ok ? 0 : 1);
"
```
Expected: all 8 lines show `PASS`, exit code 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/BuyMeCoffeeButton.tsx
git commit -m "feat(layout): add BuyMeCoffeeButton component with route exclusions"
```

---

### Task 3: Mount globally and verify end-to-end

**Files:**
- Modify: `src/app/[lng]/layout.tsx` (currently: `AuthProvider → GamificationProvider → div.flex.flex-col → Navbar / main / Footer`)

**Interfaces:**
- Consumes: `BuyMeCoffeeButton` default export (Task 2).
- Produces: nothing consumed by later tasks (final task in this plan).

- [ ] **Step 1: Import and mount the component**

In `src/app/[lng]/layout.tsx`, add the import alongside the existing `Navbar`/`Footer` imports:

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BuyMeCoffeeButton from "@/components/layout/BuyMeCoffeeButton";
```

Then change:

```tsx
        <div className="flex min-h-screen flex-col">
          <Navbar currentLng={lng} />
          <main className="flex-1">{children}</main>
          <Footer currentLng={lng} />
        </div>
```

to:

```tsx
        <div className="flex min-h-screen flex-col">
          <Navbar currentLng={lng} />
          <main className="flex-1">{children}</main>
          <Footer currentLng={lng} />
          <BuyMeCoffeeButton />
        </div>
```

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck && npm run lint`
Expected: both exit 0, lint shows "✔ No ESLint warnings or errors".

- [ ] **Step 3: Production build**

Run:
```bash
rm -rf .next
npm run build
```
Expected: build completes with "✓ Compiled successfully" and no errors (this project has a documented history of pages that pass typecheck/lint but fail `next build` — always confirm this step before considering the task done).

- [ ] **Step 4: Manual browser walkthrough**

Start the dev server if not already running (`npm run dev`, port 3002). Check in **both** `es` and `en`:

1. `http://localhost:3002/es` and `http://localhost:3002/en` (home) — floating button visible bottom-right, ☕ + correct bilingual label ("Invítame un café" / "Buy me a coffee").
2. `http://localhost:3002/es/dashboard` (requires being signed in) — button still visible, doesn't overlap the mobile hamburger menu or the user dropdown when either is open (both were fixed for viewport overflow earlier this session — re-confirm no regression).
3. Click the button — opens `https://buymeacoffee.com/jorgeborn3m` in a **new tab**; the PlayQAcademy tab stays on the same page.
4. Navigate to any lesson, e.g. `http://localhost:3002/es/learn/qaf-m1/qaf-l1` — button is **absent** (no overlap with the "Siguiente"/"Next" button in the sticky bottom bar).
5. Navigate to `http://localhost:3002/es/playground/dynamic` — button is **absent**.
6. Start an exam attempt and reach the `take/[attemptId]` page — button is **absent**.
7. Resize to a mobile viewport (e.g. 390×844) on the home page — button doesn't clip off-screen and doesn't visually collide with anything else on screen.

Expected: all 7 checks hold.

- [ ] **Step 5: Commit**

```bash
git add "src/app/[lng]/layout.tsx"
git commit -m "feat(layout): mount BuyMeCoffeeButton globally"
```

---

## Verification Strategy (end-to-end)

1. **Static:** `npm run typecheck` and `npm run lint` clean after every task; `npm run build` clean at the end (Task 3 Step 3).
2. **Route exclusion correctness:** Task 2 Step 3's scripted check covers all 3 excluded patterns plus 5 non-excluded paths that look similar (to catch over-matching, e.g. `/playground/login` must NOT be excluded just because it starts with `/playground/`).
3. **Visual/manual:** Task 3 Step 4 walks every excluded route plus the home/dashboard pages, both locales, plus a mobile-viewport check given this session's two prior mobile-overflow fixes in the same general UI area (navbar dropdown, hamburger menu).
4. **External link behavior:** confirmed manually (new tab, `noopener noreferrer` present in the JSX from Task 2).

## Critical Files

- `public/locales/{es,en}/common.json` — new `nav.buyMeCoffee` key (Task 1)
- `src/components/layout/BuyMeCoffeeButton.tsx` — new component, owns its own route-exclusion logic (Task 2)
- `src/app/[lng]/layout.tsx` — single mount point, global by construction (Task 3)
- `src/components/layout/Navbar.tsx` — reference only (brand color precedent, `t()` usage pattern), not modified
