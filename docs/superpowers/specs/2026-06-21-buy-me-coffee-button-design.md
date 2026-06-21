# Buy Me a Coffee floating button — design

## Problem

PlayQAcademy is free to use and maintained solo. Jorge wants a way for users
who found it valuable to optionally support it financially, via
`https://buymeacoffee.com/jorgeborn3m`.

## Goal

A globally visible, on-brand floating button linking out to that Buy Me a
Coffee page, without colliding with existing fixed/sticky UI.

## Non-goals

- The official Buy Me a Coffee embed `<script>` widget — rejected because it
  ships its own non-brand styling (BMC's yellow/black) and is the first
  third-party script embed in the project; a plain styled link achieves the
  same outcome with zero external dependencies and full control of the look.
- An in-app tip/payment flow — this just links out to the existing external
  BMC page.
- A dismiss/close control — out of scope for this pass; revisit if it turns
  out to feel intrusive in practice.

## Architecture

### New component: `src/components/layout/BuyMeCoffeeButton.tsx`

`"use client"`. Renders a single `<a>`, not a `<button>` (it's a navigation,
not an action):

```tsx
<a
  href="https://buymeacoffee.com/jorgeborn3m"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full
    bg-brand-terra-500 px-4 py-3 text-sm font-medium text-white shadow-xl
    transition-colors hover:bg-brand-terra-400"
>
  ☕ {t("nav.buyMeCoffee")}
</a>
```

`bg-brand-terra-500` / `hover:bg-brand-terra-400` reuses the same accent
already used for the navbar's "Crear cuenta" CTA — no new color introduced.
Theme-aware automatically (brand colors aren't theme-conditional; no
`dark:` variants needed, consistent with the rest of the site).

The component owns its own route-exclusion check (see below) and renders
`null` on excluded routes — callers don't need to know about the exclusion
list.

```tsx
const EXCLUDED_PATH_PATTERNS = [
  /^\/[a-z]{2}\/learn\/[^/]+\/[^/]+$/,        // lesson player: bottom nav bar
  /^\/[a-z]{2}\/playground\/dynamic$/,         // toast exercise: same corner
  /^\/[a-z]{2}\/exams\/[^/]+\/take\/[^/]+$/,   // timed exam: avoid distraction
];

const pathname = usePathname();
if (EXCLUDED_PATH_PATTERNS.some((p) => p.test(pathname))) return null;
```

### Mounting: `src/app/[lng]/layout.tsx`

Current structure (`AuthProvider → GamificationProvider → div.flex.flex-col
→ Navbar / main / Footer`). `<BuyMeCoffeeButton />` is added as a sibling
right after `<Footer />`, inside that same `div`:

```tsx
<div className="flex min-h-screen flex-col">
  <Navbar currentLng={lng} />
  <main className="flex-1">{children}</main>
  <Footer currentLng={lng} />
  <BuyMeCoffeeButton />
</div>
```

Position in the JSX doesn't affect rendering (the button is `fixed`), but
this keeps it visually grouped with the other global-chrome components for
anyone reading the file. Global by construction — no per-page wiring needed.

### i18n: `public/locales/{es,en}/common.json`

New key under `nav`:
- `es`: `"nav.buyMeCoffee": "Invítame un café"`
- `en`: `"nav.buyMeCoffee": "Buy me a coffee"`

## Why these 3 routes are excluded

Found by grepping for existing `fixed bottom-*` / `sticky bottom-*` usage
before finalizing the design (`Bash: grep -rn "fixed.*bottom|sticky.*bottom"`):

1. `/[lng]/learn/[moduleId]/[lessonId]` — full-width `sticky bottom-0` lesson
   nav bar with a "Next" button in the same corner.
2. `/[lng]/playground/dynamic` — a Playwright toast-locating exercise that
   renders toasts in `fixed bottom-4 right-4`, the same corner.
3. `/[lng]/exams/[examId]/take/[attemptId]` — no layout collision, excluded
   purely to avoid distracting during a timed exam (Jorge's call, not a
   layout bug).

## Edge cases

- Route matching must account for the `/[lng]/` locale prefix on every path
  (both `es` and `en`) — patterns above match the 2-letter prefix generically
  rather than hardcoding `es`/`en`.
- External link: `rel="noopener noreferrer"` is required (security best
  practice for `target="_blank"` to untrusted/external origins).

## Testing

No automated test runner in this repo (per `AGENTS.md`); `npm run typecheck`
and `npm run lint` must stay at 0/0, and `npm run build` must succeed (per
the existing Suspense-boundary lesson learned). Manual verification in the
browser:

1. Button appears bottom-right on a normal page (e.g. `/es`, `/es/dashboard`)
   in both `es` and `en`, with the correct bilingual label.
2. Button is absent on a lesson page, on `/playground/dynamic`, and while
   taking an exam (`/exams/[examId]/take/[attemptId]`).
3. Clicking it opens `https://buymeacoffee.com/jorgeborn3m` in a new tab; the
   current tab stays on PlayQAcademy.
4. Visually check it doesn't overlap the mobile hamburger menu or user
   dropdown when those are open (both were just fixed for viewport overflow
   in this same session).
