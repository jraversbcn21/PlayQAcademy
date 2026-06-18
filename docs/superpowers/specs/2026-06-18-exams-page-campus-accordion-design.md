# Exams page — horizontal campus accordion — design

## Problem

`/exams` lists every exam across all 3 campuses in one long vertical page: QA
Fundamentals (11 exams incl. final mock), ISTQB CTFL Foundation (9 incl. 3 mocks),
and Playwright Automation (4). Each campus renders as a stacked `<section>` with
a header and a flat column of full exam cards underneath the previous one — 24
cards total, one continuous scroll. There is no way to jump straight to one
campus's exams without scrolling past the others.

## Goal

Replace the stacked sections with a single-open accordion: three horizontal pill
triggers (one per campus, "Fundamentos de QA", "ISTQB CTFL Foundation",
"Automatización con Playwright"), each showing the campus name and its exam
count. Clicking a pill expands that campus's exam list directly below the pill
row; clicking another pill swaps which one is open (only one campus's list is
visible at a time). On first load, all three are collapsed.

## Non-goals

- Changing the exam card itself (badges, "Comenzar" button, best-score line,
  "Próximamente"/"Bloqueado" states) — copied verbatim from the current JSX,
  zero behavior change.
- Changing the stats summary row (Aprobados / Puntuación Media / Total
  Intentos) at the top of the page.
- Changing any data layer: `getSubCampuses`, `getExamsForCampus`,
  `isExamReady`, `isModuleUnlocked`, `getExamHistory` are called exactly as
  today, same arguments, same return values consumed the same way.
- Persisting which campus was last open (e.g. `localStorage`) — every page
  load starts fully collapsed, per the approved design.
- A "expand all" or multi-open mode — explicitly rejected in favor of
  single-open accordion behavior.
- Touching `CampusPageClient.tsx`'s own "Hacer examen N ⌄" trigger — that
  component is the visual reference for the new pills' styling, not something
  this change modifies.

## Architecture

`src/app/[lng]/exams/page.tsx` stays a single client component; no new files,
no new shared component extracted (the pill row and panel are simple enough to
stay inline in this 155-line file, consistent with how `CampusPageClient.tsx`
already inlines its own toggle).

One new piece of state: `const [openCampusId, setOpenCampusId] = useState<string | null>(null);`

Render order, replacing the current `<div className="space-y-10">{...sections}</div>`:

1. **Pill row** — `getSubCampuses()` mapped into a `flex flex-wrap gap-3` row of
   buttons. Each button toggles `openCampusId`: clicking the already-open
   campus's pill sets it back to `null` (collapse); clicking any other pill
   sets `openCampusId` to that campus's id (closing whichever was open before,
   since it's a single piece of state — this *is* the single-open guarantee,
   no extra bookkeeping needed).
2. **Panel** — directly below the pill row, a single conditional block: find
   `getSubCampuses().find(c => c.id === openCampusId)`, and if present, render
   exactly the `<section>` JSX that exists today for that one campus (header
   with title + "Ver campus →" link, then the `.map` over `getExamsForCampus`
   producing the existing exam cards). If `openCampusId` is `null`, render
   nothing (collapsed state — page is short).

Campuses with zero exams already return `null` today (`if (campusExams.length
=== 0) return null;`) — that early-return logic moves to filtering which
campuses get a pill in the first place, so a campus with no exams never shows
a pill (matches current behavior of never showing its section).

## Components

### Pill button (inline in the `.map`, not extracted)

Visually based on the existing "Hacer examen" trigger in
`CampusPageClient.tsx` (`campus/[campusId]/CampusPageClient.tsx` lines ~80-107):

```tsx
<button
  type="button"
  onClick={() => setOpenCampusId(openCampusId === campus.id ? null : campus.id)}
  aria-expanded={openCampusId === campus.id}
  className={[
    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
    openCampusId === campus.id
      ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
      : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
  ].join(" ")}
>
  {campus.title[lng as "es" | "en"] ?? campus.title.en}
  <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
    {campusExams.length}
  </span>
  <svg className={`h-4 w-4 transition-transform duration-200 ${openCampusId === campus.id ? "rotate-180" : ""}`} ...>
    {/* same chevron path already used in CampusPageClient.tsx */}
  </svg>
</button>
```

The count badge keeps its green styling regardless of active/inactive pill
state (matches existing "Hacer examen" badge, which doesn't change color on
toggle either).

### Panel

No new component — the existing `<section>{...}</section>` JSX block (header
+ exam-card `.map`) is kept character-for-character, just no longer wrapped in
the multi-section `.map` over all campuses. It's rendered once, for whichever
single campus is open.

## Responsive behavior

`flex flex-wrap gap-3` on the pill row: on narrow viewports the three pills
wrap to a second line naturally (no horizontal scroll container, no media
query needed) — same technique already used for the exam-chip row inside
`CampusPageClient.tsx`.

## Error handling / edge cases

- No exams in any campus ready yet: pills still render (count badge shows the
  total exam count, not just ready ones — matches current section-header
  behavior, which shows all exams including "Próximamente" ones).
- `openCampusId` referencing a campus that turns out to have 0 exams: can't
  happen, since pills are only rendered for campuses where
  `campusExams.length > 0`, so `openCampusId` can never be set to an id without
  a panel.

## Testing

No automated test runner in this repo (per `AGENTS.md`). Verification is
manual in the browser, logged in, on `/es/exams` and `/en/exams`:

1. Page loads with all 3 pills visible, none active, no panel below (short
   page, no scroll needed).
2. Click "Fundamentos de QA" → panel appears below the pill row with its 11
   exam cards, pill highlights green, chevron rotates.
3. Click "ISTQB CTFL Foundation" → Fundamentos panel disappears, ISTQB panel
   appears in its place; only the ISTQB pill is highlighted now.
4. Click the currently-open pill again → panel collapses, no pill highlighted.
5. Inside the open panel, confirm all existing behaviors are untouched: "Ver
   campus →" link navigates correctly, "Comenzar" link still points to
   `/${lng}/exams/${exam.id}/start`, "Próximamente"/"Bloqueado" badges and
   best-score line still render for the right exams.
6. Resize to a narrow width: pills wrap to a second line instead of
   overflowing or scrolling horizontally.
