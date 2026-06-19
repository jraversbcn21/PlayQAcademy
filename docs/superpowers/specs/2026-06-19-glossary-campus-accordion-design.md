# Glossary page — campus accordion + Automation terms — design

## Problem

`/glossary` shows a misleading title ("Glosario ISTQB" / "Términos clave del
syllabus CTFL v4.0") even though the glossary already mixes terms from two
campuses: 57 ISTQB entries (chapters `"1"`–`"6"`) and 57 QA Fundamentals
entries (`"qaf-1"`–`"qaf-10"`, 114 total). The page renders every matching entry as one
flat, unbroken list of cards (`space-y-3`) in raw array insertion order — not
even grouped by chapter consistently (some chapter `"2"` entries are appended
out of order in the source array). The only chapter-aware control is a
`<select>` dropdown that filters to a single chapter; its option list is also
mis-sorted (`[...new Set(...)].sort()` on strings puts `"qaf-10"` before
`"qaf-2"`). Playwright Automation has zero glossary entries today.

## Goal

1. Add Automation glossary content so the glossary genuinely covers all 3
   campuses.
2. Replace the flat list with a single-open accordion grouped by campus, and
   by chapter/module within the open campus — mirroring the pattern already
   shipped on `/exams` (`docs/superpowers/specs/2026-06-18-exams-page-campus-accordion-design.md`).
3. Fix the outdated title/subtitle and the chapter-sort bug as part of the
   same change (both are directly entangled with the campus/chapter grouping
   this design introduces).

## Non-goals

- Changing the term `Card` markup itself (term name, bilingual definition,
  chapter chip) — kept as-is.
- A second level of collapsing (collapsible chapters *within* an open
  campus) — chapters render as plain headed sections, not nested accordions.
- Persisting which campus was last open across reloads — every page load
  starts fully collapsed, same as `/exams`.
- Touching `GLOSSARY` entries for ISTQB or QA Fundamentals beyond the
  `CHAPTER_TITLES` prefix cleanup described below — their `term`/`def`/
  `chapter` fields are untouched.
- Adding Automation terms anywhere other than `GLOSSARY` (no new exam/badge
  wiring — these are glossary-only entries).

## Content: Automation glossary entries

~5-6 bilingual entries per module (`auto-1`…`auto-8`, mapped 1:1 to
`m1-typescript-foundations`…`m8-cicd-reporting` in `curriculum.ts`), sourced
from each module's actual lesson titles/descriptions already in
`CURRICULUM` (e.g. `auto-3` "Locators and Selectors" draws from `getByRole`,
`getByText`/`getByLabel`/`getByPlaceholder`, locator chaining/filtering).
~40-48 new entries total, written directly into `GLOSSARY` in
`src/lib/constants/glossary.ts`, same shape as existing entries
(`{ term, def: { es, en }, chapter }`).

## Architecture

### `src/lib/constants/glossary.ts`

1. Append the new Automation entries to `GLOSSARY` (chapter values
   `"auto-1"`…`"auto-8"`).
2. Add 8 new `CHAPTER_TITLES["auto-N"]` entries (module name only, no campus
   prefix — e.g. `{ es: "Fundamentos de TypeScript para QA", en: "TypeScript
   Foundations for QA" }`, taken from the matching `CURRICULUM` module title).
3. Strip the `"QA Fundamentals — "` prefix from the existing 10
   `CHAPTER_TITLES["qaf-N"]` entries (the campus name will now come from the
   accordion's pill header, making the prefix redundant — e.g. `"QA
   Fundamentals — Introducción al QA"` becomes `"Introducción al QA"`).
4. New export:
   ```ts
   export const GLOSSARY_CHAPTERS_BY_CAMPUS: Record<string, string[]> = {
     qaFundamentals: ["qaf-1", "qaf-2", ..., "qaf-10"],
     istqb: ["1", "2", "3", "4", "5", "6"],
     automation: ["auto-1", "auto-2", ..., "auto-8"],
   };
   ```
   Listed in real module order (not derived via `.sort()`), which is what
   fixes the `"qaf-10"` vs `"qaf-2"` mis-sort — the page no longer computes
   chapter order itself, it reads this explicit, already-ordered registry.
   Keys match `campus.id` from `getSubCampuses()`.

### `public/locales/{es,en}/common.json`

`glossary.title` / `glossary.subtitle` become campus-neutral:
- es: `"Glosario"` / `"Términos clave de los 3 campus de PlayQAcademy"`
- en: `"Glossary"` / `"Key terms from PlayQAcademy's 3 campuses"`

### `src/app/[lng]/glossary/page.tsx`

Same overall shape as `/exams`' accordion (`useState<string | null>` for
`openCampusId`, single-open toggle, `getSubCampuses()` for pill labels/order),
adapted for two states instead of one:

1. **Browsing state** (`search` is empty): pill row (3 pills, term count per
   campus from `GLOSSARY_CHAPTERS_BY_CAMPUS[campus.id]`), none open on load.
   Opening a pill renders, for each chapter in
   `GLOSSARY_CHAPTERS_BY_CAMPUS[openCampusId]` (in array order): a header
   (`"Módulo N · <title>"` for `qaFundamentals`/`automation`, `"Capítulo N ·
   <title>"` for `istqb`, using `CHAPTER_TITLES`) followed by that chapter's
   term cards.
2. **Search state** (`search` non-empty): accordion is bypassed entirely.
   `GLOSSARY` is filtered by term/definition match (same predicate as today),
   then results are grouped by campus — via a small reverse lookup built from
   `GLOSSARY_CHAPTERS_BY_CAMPUS` (`chapter -> campusId`) — and rendered as
   campus-headed sections, each a flat list of matching cards (no
   chapter-level sub-grouping in search results; each card keeps its existing
   chapter chip for context). Clearing the search box returns to the
   browsing state with whatever `openCampusId` was already set (no forced
   collapse-then-reopen).

The existing chapter `<select>` is removed — it's now redundant with the
accordion's own per-campus chapter sections, and its only purpose
(filter to one chapter) is subsumed by opening that campus and scrolling to
the section.

Total entry count in the header (`glossary.entryCount`) now reflects all 3
campuses combined (`GLOSSARY.length`, unchanged computation, just a bigger
number once Automation entries are added).

## Components

No new files. `page.tsx` stays a single client component, same as `/exams`.
Pill markup is copied from the `/exams` pattern (same border/background/text
classes, same chevron rotation), not extracted into a shared component —
consistent with `/exams` and `CampusPageClient.tsx` each inlining their own
version rather than sharing one.

## Edge cases

- A campus pill is only rendered if `GLOSSARY_CHAPTERS_BY_CAMPUS[campus.id]`
  resolves to at least one chapter with entries — true for all 3 today, but
  keeps the same defensive filter pattern `/exams` uses for campuses with 0
  exams.
- Search with zero matches: existing `glossary.noResults` message, shown
  once instead of repeated per campus.
- A chapter listed in `GLOSSARY_CHAPTERS_BY_CAMPUS` with zero `GLOSSARY`
  entries (shouldn't occur, but defensively): that chapter's header is
  skipped rather than rendered with an empty body.

## Testing

No automated test runner in this repo (per `AGENTS.md`); `npm run typecheck`
and `npm run lint` must stay at 0/0. Manual verification in the browser, on
`/es/glossary` and `/en/glossary`:

1. Page loads with 3 pills (QA Fundamentals / ISTQB / Automation), each
   showing a term count, none open, no list below.
2. Click each pill in turn: its chapters render as headed sections in module
   order (1→10 for QAF, 1→6 for ISTQB, 1→8 for Automation — not
   alphabetical), opening one closes whichever was open before.
3. Type a search term that matches entries in 2+ campuses (e.g. "test"):
   accordion disappears, results show grouped under campus headers spanning
   those campuses.
4. Clear the search box: returns to the accordion, collapsed (or showing
   whichever pill was open before search started, if any).
5. Confirm the title/subtitle no longer mention ISTQB specifically, and the
   total count includes the new Automation entries.
