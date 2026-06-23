# Campus page — per-module progress indicators — design

## Problem

On `/campus/[campusId]` (`CampusPageClient.tsx`), the "Progreso general" bar
at the top reflects real progress (fixed 2026-06-22, commit `608fd66`), but
the module grid below it gives zero visual feedback per module: a module
already completed renders identically to one never started. A student
working through QA Fundamentals day by day (real account, modules 1-2 done,
about to start module 3) has no way to tell which modules are already done
without leaving the page and checking `/dashboard` or `/learn/[moduleId]`.

## Goal

Each module card on the campus page reflects that module's own completion
state — visible at a glance, consistent with the visual language already
used elsewhere in the app (dashboard's per-module cards, achievement-style
gold treatment for accomplishments).

## Non-goals

- Reordering cards by completion status — they stay in curriculum order, so
  the grid still reads as "the path", not a shuffled list.
- Per-module locking — `ENFORCE_MODULE_LOCKING` stays `false`; this is a
  read-only completion *indicator*, not a gating mechanism.
- Building a new visual pattern — this reuses `ModuleCard.tsx`'s existing
  progress-bar-color convention and `Card.tsx`'s existing `"achievement"`
  variant rather than introducing new classes/colors.

## Architecture

### Data source

`CampusPageClient.tsx` already calls `useProgress(user?.uid)` for the
overall campus percentage. Add `getModuleProgress` to that destructure and
call it per module in the grid:

```tsx
const { progressData, getModuleProgress } = useProgress(user?.uid);
...
{modules.map((mod, index) => {
  const info = getModuleProgress(mod.id); // ModuleProgressInfo | null
  const percent = info?.percentComplete ?? 0;
  const isCompleted = info?.status === "completed";
  ...
```

`getModuleProgress` is already memoized in `useProgress.ts` (`useCallback`
over `moduleInfoList`) — no new hook logic needed. When there's no signed-in
user or progress is still loading, `info` is `null` and every card falls
back to `percent = 0`, matching the existing "Progreso general" 0% fallback
above it.

### Card visual changes (per module)

Replace the current single `<Card className="h-full p-5 ...">` with a
variant + className chosen by `isCompleted`:

```tsx
<Card
  variant={isCompleted ? "achievement" : "default"}
  className={[
    "h-full !p-5 transition-all hover:shadow-lg",
    isCompleted
      ? "hover:border-brand-gold-500/30 hover:shadow-brand-gold-500/5"
      : "hover:border-brand-forest-500/30 hover:shadow-brand-forest-500/5",
  ].join(" ")}
>
```

`variant="achievement"` already resolves to
`border-brand-gold-500/20 bg-brand-gold-500/5` (`Card.tsx` line 25) — the
same gold tint used for badge/achievement cards elsewhere, so a completed
module reads as "accomplishment" using an established visual vocabulary
instead of a new color.

Inside the card, three additions:

1. **Tag check mark** — the existing "Módulo N" pill gets a ✓ appended when
   completed:
   ```tsx
   <span className="rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
     {t("campus.module")} {index + 1}{isCompleted ? " ✓" : ""}
   </span>
   ```
   (Locked-campus icon logic on the same row is untouched.)

2. **Per-module progress bar** — inserted between the description and the
   lessons/minutes stats row, reusing the `ProgressBar` already imported in
   this file:
   ```tsx
   <ProgressBar
     value={percent}
     size="sm"
     barColor={isCompleted ? "bg-brand-gold-500" : "bg-brand-forest-500"}
   />
   ```
   Same color convention as `ModuleCard.tsx` line 136 on the dashboard.

3. No change to the lessons/minutes stats row or the card's click-through
   behavior (still a `<Link>` to `/learn/[moduleId]`, locking unaffected).

## Edge cases

- **`campus.status === "coming_soon"`** — the existing `isLocked` styling
  (`opacity-60`, `cursor-not-allowed`, lock icon) takes precedence visually;
  since no campus currently has real progress while `coming_soon`, this
  doesn't conflict with the achievement variant in practice, but the code
  computes `isCompleted` independently of `isLocked` (a coming-soon campus
  would still show 0% for every module since no lessons exist to complete).
- **No signed-in user** — `getModuleProgress` returns `null` for every
  module (no `rawProgress` loaded), so every card renders as default/0%,
  same as today's pre-fix behavior for an anonymous visit.

## Testing

No automated test runner in this repo (per `AGENTS.md`); `npm run typecheck`
and `npm run lint` must stay at 0/0, and `npm run build` must succeed.
Manual verification in the browser, using the real Test1 account that
already has QA Fundamentals modules 1-2 completed:

1. `/es/campus/qaFundamentals` — modules 1-2 render with gold border/bg, ✓ on
   the module tag, and a full gold progress bar; module 3 (in progress or
   untouched) renders with the default green styling and a bar matching its
   real `percentComplete`.
2. Hover a completed card → border/shadow shift to gold tones, not green.
3. Toggle dark/light theme — gold tint stays legible in both (relies on the
   same `brand.gold` CSS vars already used by the achievement Card variant
   and the dashboard's `ModuleCard`, no new colors introduced).
4. Visit the page signed out (or a fresh account with zero progress) — every
   card renders default/0%, no console errors.
