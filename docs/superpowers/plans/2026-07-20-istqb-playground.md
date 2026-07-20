# ISTQB Playground Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the ISTQB campus's Playground — 7 self-contained, client-side training drills — so the ISTQB pill on `/playground` goes from "Próximamente" to 7 live exercises.

**Architecture:** Each drill is an independent `"use client"` page under `src/app/[lng]/playground/istqb-*/page.tsx` with inline bilingual content and client-side scoring, exactly like the 4 QA Fundamentals drills. The registry (`playground.ts`) drives the index pill, breadcrumb, and sub-nav automatically. Spec: `docs/superpowers/specs/2026-07-20-istqb-playground-design.md`.

**Tech Stack:** Next.js 15 App Router, TypeScript strict, Tailwind (existing CSS vars, no `dark:`), no new dependencies, no Firestore, no auth.

## Global Constraints

- **Bilingual everywhere:** every user-facing string is `{ es, en }`, read with `[lng as "es" | "en"] ?? .en`. No empty `"en": ""`.
- **Zero new dependencies, components, or colors.** Reuse: `Badge` (`@/components/ui/Badge`), CSS vars `--color-bg-secondary`/`--color-text-primary`/etc., accents `brand-forest` (correct/primary), `amber` (partial/warning), `red` (incorrect), `brand-gold` (achievement).
- **No Firestore, no `useAuth`, no persistence** (not even localStorage). All state in React, resets on reload.
- **Page pattern** (mirror `src/app/[lng]/playground/partitioning/page.tsx`): `"use client"`, `export default function Page(props: { params: Promise<{ lng: string }> })`, `const { lng } = use(props.params)`, wrapper `<div className="px-4 py-8"><div className="container-app max-w-3xl">`, `<h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">`, intro `<p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">`, "↺ Reintentar / Retry" reset button.
- **Real `<button>`s** for every interactive element; `aria-pressed` on toggle selections.
- **No test framework in this repo.** Per-task gate: `npm run typecheck` (0 errors) + `npm run lint` (0 warnings/errors). `npm run build` runs in the final task (kill any stray `npm run dev` first — Windows `.next` lock).
- **Commit to `main` after each task, but DO NOT `git push` until Task 9 passes** — pushing auto-deploys to production, and Task 1 makes the index link to pages that don't exist until Tasks 2–8 land.
- End every commit message with:
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- Content sizes given per task are exact; the spec treats them as minimums.
- **Content correctness:** every manifest below pins the correct answer. Explanations must teach *why* (and for pickers, why the tempting wrong option loses), in the didactic voice of the existing drills. Syllabus scope is ISTQB CTFL v4.0 only.

---

### Task 1: Registry entries + layout Setup-link fix

**Files:**
- Modify: `src/lib/constants/playground.ts` (append to `PLAYGROUND_EXERCISES`)
- Modify: `src/app/[lng]/playground/layout.tsx:100`

**Interfaces:**
- Consumes: `PlaygroundExercise` type (unchanged).
- Produces: 7 registry entries with `campusId: "istqb"` whose `href` values Tasks 2–8 must match exactly: `/playground/istqb-flashcards`, `/playground/istqb-truefalse`, `/playground/istqb-levels`, `/playground/istqb-techniques`, `/playground/istqb-match`, `/playground/istqb-quiz`, `/playground/istqb-coverage`.

- [ ] **Step 1: Append the 7 registry entries**

Insert at the end of the `PLAYGROUND_EXERCISES` array (after the `req-match` entry, before `];`):

```ts
  {
    href: "/playground/istqb-quiz",
    icon: "⚡",
    title: { es: "Quiz Rápido ISTQB", en: "ISTQB Quick Quiz" },
    description: {
      es: "10 preguntas al azar con feedback inmediato y explicación, capítulos 1-6 del syllabus CTFL.",
      en: "10 random questions with instant feedback and explanations, CTFL syllabus chapters 1-6.",
    },
    modules: ["Cap. 1-6"],
    difficulty: "intermediate",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-flashcards",
    icon: "🃏",
    title: { es: "Flashcards del Glosario", en: "Glossary Flashcards" },
    description: {
      es: "Repasa los términos oficiales del glosario ISTQB con tarjetas giratorias, filtradas por capítulo.",
      en: "Review the official ISTQB glossary terms with flip cards, filtered by chapter.",
    },
    modules: ["Cap. 1-6"],
    difficulty: "beginner",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-levels",
    icon: "🧩",
    title: { es: "Niveles y Tipos de Prueba", en: "Test Levels & Types" },
    description: {
      es: "Clasifica escenarios reales por nivel de prueba y tipo de prueba según el syllabus.",
      en: "Classify real scenarios by test level and test type per the syllabus.",
    },
    modules: ["Cap. 2: SDLC"],
    difficulty: "beginner",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-techniques",
    icon: "🧰",
    title: { es: "Selección de Técnica", en: "Technique Picker" },
    description: {
      es: "Dada una mini-especificación, elige la técnica de diseño de pruebas más adecuada y aprende por qué.",
      en: "Given a mini-spec, pick the best-fit test design technique and learn why.",
    },
    modules: ["Cap. 4: Técnicas"],
    difficulty: "intermediate",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-truefalse",
    icon: "⚖️",
    title: { es: "Verdadero o Falso", en: "True or False" },
    description: {
      es: "Ronda rápida de afirmaciones sobre los 7 principios, mitos del testing e independencia del QA.",
      en: "Rapid round of statements on the 7 principles, testing myths, and QA independence.",
    },
    modules: ["Cap. 1: Fundamentos"],
    difficulty: "beginner",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-match",
    icon: "🔀",
    title: { es: "Relacionar Conceptos", en: "Concept Matching" },
    description: {
      es: "Tres rondas de emparejar: término↔definición, actividad↔fase del proceso y rol↔responsabilidad en revisiones.",
      en: "Three matching rounds: term↔definition, activity↔process phase, and role↔responsibility in reviews.",
    },
    modules: ["Cap. 1", "Cap. 3", "Cap. 5"],
    difficulty: "intermediate",
    campusId: "istqb",
  },
  {
    href: "/playground/istqb-coverage",
    icon: "📐",
    title: { es: "Cobertura y Trazabilidad", en: "Coverage & Traceability" },
    description: {
      es: "Calcula cobertura de sentencia y rama sobre pseudocódigo y audita matrices de trazabilidad.",
      en: "Compute statement and branch coverage over pseudocode and audit traceability matrices.",
    },
    modules: ["Cap. 4: Técnicas"],
    difficulty: "advanced",
    campusId: "istqb",
  },
```

- [ ] **Step 2: Fix the Setup-link condition in the layout**

In `src/app/[lng]/playground/layout.tsx`, the Setup link (Playwright guide) must only show for the Automation campus. Replace:

```tsx
            {activeCampusId !== "qaFundamentals" && (
```

with:

```tsx
            {activeCampusId === "automation" && (
```

(When `activeCampusId` is `null` — an unregistered page — the link hides too; the setup page itself sets `activeCampusId = "automation"`, so it keeps its own link.)

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add src/lib/constants/playground.ts "src/app/[lng]/playground/layout.tsx"
git commit -m "feat(playground): register the 7 ISTQB drills and scope the Setup link to Automation"
```

---

### Task 2: Flashcards (`istqb-flashcards`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-flashcards/page.tsx`

**Interfaces:**
- Consumes: `GLOSSARY`, `CHAPTER_TITLES` from `@/lib/constants/glossary` (entries with `chapter` in `"1"`…`"6"` are the ISTQB set — 57 terms today; filter dynamically, never hardcode the count).
- Produces: nothing consumed by later tasks.

- [ ] **Step 1: Write the page**

Behavior spec (all state in-memory):

- `const ISTQB_CHAPTERS = ["1", "2", "3", "4", "5", "6"];` — deck = `GLOSSARY.filter((e) => ISTQB_CHAPTERS.includes(e.chapter))`, optionally narrowed by the active chapter filter.
- **Chapter filter pills:** "Todos / All" + one pill per chapter labeled `Cap. N` with `title` tooltip from `CHAPTER_TITLES[n]`. Selecting a filter rebuilds the deck and resets position/flip/marks. Style: the pill row pattern from `partitioning`'s category buttons (`rounded-full border px-3 py-1 text-xs`), active pill `border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400`, `aria-pressed`.
- **Card:** one large centered card (`min-h-[16rem]`, `max-w-xl mx-auto`) that flips on click/Enter/Space. It is a real `<button type="button" className="group [perspective:1000px] w-full" aria-pressed={flipped}>` wrapping an inner div:

```tsx
<div
  className={[
    "relative min-h-[16rem] w-full rounded-xl transition-transform duration-500 [transform-style:preserve-3d]",
    flipped ? "[transform:rotateY(180deg)]" : "",
  ].join(" ")}
>
  {/* front: term */}
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 [backface-visibility:hidden]">
    <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
      Cap. {entry.chapter}
    </span>
    <span className="text-center text-xl font-semibold text-[var(--color-text-primary)]">
      {entry.term}
    </span>
    <span className="text-xs text-[var(--color-text-muted)]">
      {lng === "es" ? "Toca para ver la definición" : "Tap to reveal the definition"}
    </span>
  </div>
  {/* back: definition */}
  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-brand-forest-500/40 bg-brand-forest-500/10 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
    <p className="text-center text-sm leading-relaxed text-[var(--color-text-primary)]">
      {entry.def[lng as "es" | "en"] ?? entry.def.en}
    </p>
  </div>
</div>
```

- **Navigation row** under the card: `← Anterior` / `Siguiente →` buttons (disabled at deck edges), a `12/57`-style counter, and a `🔀 Mezclar / Shuffle` button (Fisher-Yates over the current deck, resets position/flip/marks). Arrow keys also navigate: a `useEffect` with a `keydown` listener on `window` for `ArrowLeft`/`ArrowRight` (cleanup on unmount). Moving to another card always un-flips first (`setFlipped(false)`).
- **Self-assessment:** two buttons visible only while flipped — `✓ La sabía / Knew it` (forest style) and `↻ Repasar / Review` (amber style). Marking records the term into a `Record<string, "known" | "review">` and auto-advances to the next unmarked card.
- **End-of-deck summary:** when every card in the deck is marked, replace the card with a summary panel: X sabidas / Y para repasar, a `Repasar falladas / Review missed` button (rebuilds the deck from the "review" terms only) shown only if Y > 0, and a `↺ Reiniciar / Restart` button (full deck, marks cleared).
- Header copy — title: `{ es: "Flashcards del Glosario ISTQB", en: "ISTQB Glossary Flashcards" }`; intro: `{ es: "Repasa los términos oficiales del syllabus CTFL capítulo por capítulo. Gira la tarjeta, comprueba si la sabías y marca las que quieras repasar.", en: "Review the official CTFL syllabus terms chapter by chapter. Flip the card, check yourself, and mark the ones you want to revisit." }`.

- [ ] **Step 2: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 3: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-flashcards/page.tsx"
git commit -m "feat(playground): ISTQB glossary flashcards drill"
```

---

### Task 3: True/False (`istqb-truefalse`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-truefalse/page.tsx`

**Interfaces:** self-contained; produces nothing for later tasks.

- [ ] **Step 1: Write the page with its 20 statements**

Data shape:

```ts
interface TFStatement {
  id: string;
  statement: { es: string; en: string };
  answer: boolean; // true = Verdadero
  explanation: { es: string; en: string };
}
```

Fully-written example setting the style bar (use as `tf-1`):

```ts
{
  id: "tf-1",
  statement: {
    es: "Con suficiente tiempo y recursos, es posible probar exhaustivamente todas las combinaciones de entradas de un sistema.",
    en: "Given enough time and resources, it is possible to exhaustively test all input combinations of a system.",
  },
  answer: false,
  explanation: {
    es: "Falso — es el principio 2 del testing: las pruebas exhaustivas son imposibles. Salvo en casos triviales, las combinaciones de entradas y precondiciones son astronómicas; por eso se priorizan riesgos y se usan técnicas de diseño para elegir un subconjunto potente de casos.",
    en: "False — this is testing principle 2: exhaustive testing is impossible. Except in trivial cases, the combinations of inputs and preconditions are astronomical; that's why we prioritize by risk and use design techniques to pick a powerful subset of cases.",
  },
},
```

Manifest for the remaining 19 (id → statement concept, correct answer). Write each as a plausible-sounding claim (mix phrasings so ~half are true):

| id | Concept | Answer |
|---|---|---|
| tf-2 | Testing shows the presence of defects, not their absence (principle 1, phrased correctly) | V |
| tf-3 | "Zero defects found" guarantees the system meets user needs (absence-of-errors fallacy) | F |
| tf-4 | Defects cluster in a small number of modules (principle: defect clustering) | V |
| tf-5 | Repeating the same tests forever keeps finding new defects (pesticide paradox — inverted) | F |
| tf-6 | Early testing saves time and money (shift-left) | V |
| tf-7 | Testing is context-dependent: a banking app and a game are tested the same way | F |
| tf-8 | Testing and debugging are the same activity | F |
| tf-9 | QA (quality assurance) is process-oriented; testing is product-oriented | V |
| tf-10 | An error (mistake) made by a person can introduce a defect that may cause a failure | V |
| tf-11 | Every defect always produces a visible failure | F |
| tf-12 | Fully independent testers are always more effective than developer testing, with no drawbacks | F (independence has benefits AND drawbacks — isolation, bottleneck) |
| tf-13 | Developers should never test their own code under any circumstance | F |
| tf-14 | Exploratory testing is an experience-based technique where design and execution happen simultaneously | V |
| tf-15 | Static testing can find defects before any code is executed | V |
| tf-16 | Regression testing verifies that recent changes broke nothing that previously worked | V |
| tf-17 | Confirmation testing (re-testing) and regression testing are the same thing | F |
| tf-18 | 100% statement coverage implies 100% branch coverage | F (it's the reverse) |
| tf-19 | Acceptance testing is typically the responsibility of users/business, not only testers | V |
| tf-20 | Automating a test suite eliminates the pesticide paradox | F |

UI/flow (rapid-round, immediate feedback):

- One statement at a time on a large card, `Pregunta N/20` counter and a thin progress bar (`h-1.5 rounded-full bg-brand-forest-500` inside a `bg-[var(--color-bg-elevated)]` track, width `${(index / total) * 100}%`).
- Two large buttons: `✓ Verdadero / True` and `✗ Falso / False`. On click: lock the pair, show a feedback panel (forest-tinted if right, red-tinted if wrong) with the explanation, and a `Siguiente → / Next →` button. Track current streak and best streak (`streak`, `bestStreak` state; a wrong answer resets `streak` to 0).
- Final screen after tf-20: `X/20 correctas`, `Mejor racha: N`, score-tier message — ≥13/20 (65%): `{ es: "¡Nivel certificación! Prueba un simulacro CTFL completo.", en: "Certification level! Try a full CTFL mock exam." }` with a `Link` to `/${lng}/exams`; below 65%: `{ es: "Repasa los fundamentos en el campus ISTQB y vuelve a intentarlo.", en: "Review the fundamentals in the ISTQB campus and try again." }` with a `Link` to `/${lng}/campus/istqb`. Plus `↺ Reintentar` (reshuffles statement order — Fisher-Yates on mount and on reset via a `useState` initializer + reset function).

- [ ] **Step 2: Content count check**

Run: `grep -c "id: \"tf-" "src/app/[lng]/playground/istqb-truefalse/page.tsx"` → expected `20`.

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-truefalse/page.tsx"
git commit -m "feat(playground): ISTQB true/false rapid-round drill"
```

---

### Task 4: Test levels & types (`istqb-levels`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-levels/page.tsx`

**Interfaces:** self-contained. Mirror the two-axis select pattern of `src/app/[lng]/playground/triage/page.tsx` (severity+priority there → level+type here): per-scenario option pills, submit-all-at-once, per-scenario explanation on submit, score + retry.

- [ ] **Step 1: Write the page with its 12 scenarios**

Data shape:

```ts
type Level = "component" | "integration" | "system" | "acceptance";
type TestType = "functional" | "nonfunctional" | "whitebox" | "changerelated";

interface LevelScenario {
  id: string;
  scenario: { es: string; en: string };
  level: Level;
  type: TestType;
  reason: { es: string; en: string };
}
```

Labels: `component` = Componente, `integration` = Integración, `system` = Sistema, `acceptance` = Aceptación; `functional` = Funcional, `nonfunctional` = No funcional, `whitebox` = Caja blanca, `changerelated` = Relacionado con cambios.

Fully-written example (use as `lv-1`):

```ts
{
  id: "lv-1",
  scenario: {
    es: "Un desarrollador ejecuta pruebas unitarias sobre la función `calcularDescuento()` en aislamiento, con stubs para el servicio de precios.",
    en: "A developer runs unit tests on the `calculateDiscount()` function in isolation, with stubs for the pricing service.",
  },
  level: "component",
  type: "functional",
  reason: {
    es: "Se prueba una unidad individual aislada de sus dependencias (nivel de componente) y se verifica QUÉ hace la función — su comportamiento funcional.",
    en: "An individual unit is tested in isolation from its dependencies (component level), verifying WHAT the function does — its functional behavior.",
  },
},
```

Manifest for the remaining 11 (scenario concept → level / type):

| id | Scenario concept | Level | Type |
|---|---|---|---|
| lv-2 | Payments service ↔ invoicing service interaction over their API contract | integration | functional |
| lv-3 | Load test: 5,000 concurrent users against the complete deployed system | system | nonfunctional |
| lv-4 | Business users validate the complete purchase flow against acceptance criteria before go-live | acceptance | functional |
| lv-5 | After a hotfix, the exact failing case is re-run to confirm the fix (on the full system) | system | changerelated |
| lv-6 | Branch-coverage tests written against a module's internal control flow | component | whitebox |
| lv-7 | End-to-end usability session measuring task completion ease on the whole product | system | nonfunctional |
| lv-8 | Contract tests between a mobile app and its backend after the backend team changes a payload | integration | changerelated |
| lv-9 | Beta testing by real customers in their own environment | acceptance | functional |
| lv-10 | Security scan of the deployed application (penetration test) | system | nonfunctional |
| lv-11 | Regression suite over the module boundaries after refactoring the messaging bus | integration | changerelated |
| lv-12 | Component performance micro-benchmark on a parsing function (execution-time budget) | component | nonfunctional |

Each `reason` must state *both* halves ("why this level" + "why this type"). Submit disabled until every scenario has both selections (`(N/12)` counter, existing pattern). On submit: per-scenario ✓/✗ per axis with the reason; score counts scenarios with BOTH axes right (`X/12 correctas`); tier CTA as in Task 3 (≥8/12 → `/exams`; else → `/campus/istqb`).

- [ ] **Step 2: Content count check**

Run: `grep -c "id: \"lv-" "src/app/[lng]/playground/istqb-levels/page.tsx"` → expected `12`.

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-levels/page.tsx"
git commit -m "feat(playground): ISTQB test levels & types classification drill"
```

---

### Task 5: Technique picker (`istqb-techniques`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-techniques/page.tsx`

**Interfaces:** self-contained. Single-choice per item (one pill row of 6 techniques per spec), submit-all-at-once like Task 4.

- [ ] **Step 1: Write the page with its 10 mini-specs**

Data shape:

```ts
type Technique = "ep" | "bva" | "decisiontable" | "statetransition" | "whitebox" | "experience";

interface TechniqueCase {
  id: string;
  spec: { es: string; en: string };
  technique: Technique;
  reason: { es: string; en: string }; // why it wins AND why the tempting runner-up loses
}
```

Labels: `ep` = Partición de equivalencia, `bva` = Valores límite, `decisiontable` = Tabla de decisión, `statetransition` = Transición de estados, `whitebox` = Caja blanca, `experience` = Basada en experiencia.

Fully-written example (use as `tk-1`):

```ts
{
  id: "tk-1",
  spec: {
    es: "Un campo «Cantidad» acepta enteros de 1 a 999. Quieres el mínimo de casos que detecte errores de rango típicos (< >, ≤ ≥) en los bordes.",
    en: "A «Quantity» field accepts integers 1 to 999. You want the fewest cases that catch typical range errors (< >, ≤ ≥) at the edges.",
  },
  technique: "bva",
  reason: {
    es: "El análisis de valores límite ataca exactamente los bordes (0, 1, 999, 1000), donde viven los errores de comparación. La partición de equivalencia es la tentadora — también reduce casos — pero un valor «del medio» por partición no detectaría un `>` mal escrito como `>=`.",
    en: "Boundary value analysis targets exactly the edges (0, 1, 999, 1000), where comparison errors live. Equivalence partitioning is the tempting one — it also reduces cases — but one mid-partition value per class wouldn't catch a `>` miswritten as `>=`.",
  },
},
```

Manifest for the remaining 9:

| id | Spec concept | Technique |
|---|---|---|
| tk-2 | Shipping cost depends on combinations of 3 independent boolean conditions (member? weight>5kg? express?) — cover all combinations systematically | decisiontable |
| tk-3 | A document moves Draft → In Review → Approved → Published; some events are only valid in some states; test invalid transitions too | statetransition |
| tk-4 | Field accepts any string 3–20 chars; group inputs so each group behaves the same, one representative each | ep |
| tk-5 | You must reach 100% branch coverage of a critical pricing function's control flow | whitebox |
| tk-6 | Veteran tester probes an area where similar past releases hid concurrency defects, without scripts | experience |
| tk-7 | Insurance premium calculated from rules combining age bracket, claim history (y/n), and region — auditors demand every rule combination be exercised | decisiontable |
| tk-8 | ATM card flow: Idle → Card inserted → PIN ok/PIN fail (3 strikes swallows card) — verify allowed and blocked event sequences | statetransition |
| tk-9 | Date-of-birth field: partition into valid dates, future dates, malformed strings; then also test 29-Feb and month ends specifically → which technique adds the *second* step? | bva |
| tk-10 | Time-boxed session on a brand-new feature with no spec yet, charter-driven | experience |

Submit-all-at-once; score `X/10`; tier CTA (≥7/10 → `/exams`, else → `/campus/istqb`); ↺ Reintentar.

- [ ] **Step 2: Content count check**

Run: `grep -c "id: \"tk-" "src/app/[lng]/playground/istqb-techniques/page.tsx"` → expected `10`.

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-techniques/page.tsx"
git commit -m "feat(playground): ISTQB test design technique picker drill"
```

---

### Task 6: Concept matching (`istqb-match`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-match/page.tsx`

**Interfaces:** self-contained. Mirror the click-to-match mechanics of `src/app/[lng]/playground/req-match/page.tsx` (select left → select right; correct pair locks forest-tinted; wrong pair flashes red 700ms via `setTimeout` and clears selection; wrong-attempt counter), extended to 3 sequential rounds with a round stepper.

- [ ] **Step 1: Write the page with its 3 rounds**

Data shape:

```ts
interface MatchPair {
  id: string;
  left: { es: string; en: string };
  right: { es: string; en: string };
}
interface MatchRound {
  id: string;
  title: { es: string; en: string };
  leftHeader: { es: string; en: string };
  rightHeader: { es: string; en: string };
  pairs: MatchPair[];
}
```

Right column renders in a shuffled order fixed per attempt (module-scope shuffle like `req-match`'s `SHUFFLED_TC_IDS`, but re-shuffled on retry — derive inside the component from a `useState` initializer). Round advances via a `Siguiente ronda → / Next round →` button once all pairs lock; after round 3, final summary: total wrong attempts, tier message (0–3 wrong → exams CTA; else campus CTA), ↺ Reintentar (round 1, all reshuffled).

**Round 1 — Término ↔ Definición (8 pairs, Cap. 1):** error/mistake ↔ human action producing an incorrect result; defect ↔ imperfection in a work product; failure ↔ event where the system deviates from expected behavior in operation; quality ↔ degree to which stakeholders' needs are satisfied; verification ↔ "are we building the product right?" (meets specified requirements); validation ↔ "are we building the right product?" (meets user needs); testware ↔ artifacts produced during testing (plans, cases, data, reports); root cause ↔ fundamental reason whose removal prevents recurrence.

**Round 2 — Actividad ↔ Fase del proceso de testing (6 pairs, Cap. 1/5):** defining scope, schedule, and exit criteria ↔ test planning; deriving test conditions from requirements ↔ test analysis; turning conditions into cases, data, and environment setup ↔ test design; prioritizing and scheduling cases into execution order ↔ test implementation; running cases and logging actual vs. expected ↔ test execution; checking exit criteria and reporting to stakeholders ↔ test completion/monitoring & control.

**Round 3 — Rol ↔ Responsabilidad en una revisión formal (5 pairs, Cap. 3):** author ↔ creates and fixes the work product under review; moderator/facilitator ↔ runs the meeting, mediates, ensures the process is followed; scribe ↔ records defects, decisions, and open points; reviewer ↔ examines the product to find anomalies, possibly from an assigned perspective; review leader/manager ↔ plans the review, decides participants and objectives.

All pair texts written bilingual in full — the manifest above pins the pairings; phrase the right-column definitions so no two are trivially interchangeable.

- [ ] **Step 2: Pair count check**

Run: `grep -c "left:" "src/app/[lng]/playground/istqb-match/page.tsx"` → expected `19` (8+6+5).

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-match/page.tsx"
git commit -m "feat(playground): ISTQB three-round concept matching drill"
```

---

### Task 7: Quiz Rápido (`istqb-quiz`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-quiz/page.tsx`

**Interfaces:**
- Consumes: nothing from other tasks. **Must NOT import from `src/lib/constants/examQuestions/`** — the whole point is a separate, non-spoiling bank.
- Produces: nothing for later tasks.

- [ ] **Step 1: Write the page with its 36-question bank**

Data shape:

```ts
interface QuizQuestion {
  id: string;
  chapter: "1" | "2" | "3" | "4" | "5" | "6";
  difficulty: "easy" | "medium" | "hard";
  question: { es: string; en: string };
  options: { id: string; text: { es: string; en: string } }[]; // exactly 4
  correctId: string;
  explanation: { es: string; en: string }; // ends citing the chapter, e.g. "(Syllabus CTFL, cap. 4)"
}
```

Round selection (10 of 36, always mixing chapters): pick 1 random question per chapter (6), then 4 more at random from the rest, then shuffle the 10. Implemented in a plain function `pickRound(bank: QuizQuestion[]): QuizQuestion[]` called from a `useState` initializer and from reset.

Flow: one question at a time; clicking an option locks it and immediately shows a feedback panel — the clicked option turns red/forest, the correct one always highlights forest, and the explanation renders below with its chapter tag; `Siguiente →` advances. Progress bar + `Pregunta N/10` counter (same styles as Task 3). Results screen: `X/10`, per-chapter breakdown listing only chapters present in the round (`Cap. 4: 2/3` style, computed from the answered set), tier message and CTA — ≥65% (≥7/10): "¡Nivel certificación!" + Link to `/${lng}/exams` labeled `{ es: "¿Listo para el examen real? → Simulacros CTFL", en: "Ready for the real thing? → CTFL mocks" }`; below: campus link as in Task 3. `↺ Nueva ronda / New round` draws a fresh selection.

Fully-written example (use as `qz-4-1`):

```ts
{
  id: "qz-4-1",
  chapter: "4",
  difficulty: "medium",
  question: {
    es: "Un campo acepta enteros de 10 a 50. Con BVA de 2 valores, ¿qué conjunto de valores de frontera debes probar?",
    en: "A field accepts integers 10 to 50. Using 2-value BVA, which set of boundary values should you test?",
  },
  options: [
    { id: "a", text: { es: "9, 10, 50, 51", en: "9, 10, 50, 51" } },
    { id: "b", text: { es: "10, 30, 50", en: "10, 30, 50" } },
    { id: "c", text: { es: "9, 11, 49, 51", en: "9, 11, 49, 51" } },
    { id: "d", text: { es: "0, 10, 50, 100", en: "0, 10, 50, 100" } },
  ],
  correctId: "a",
  explanation: {
    es: "El BVA de 2 valores toma cada frontera y su vecino inmediato fuera del rango: 10 y 9 abajo, 50 y 51 arriba. La opción b es partición de equivalencia (un valor por clase), no BVA. (Syllabus CTFL, cap. 4)",
    en: "2-value BVA takes each boundary and its immediate out-of-range neighbor: 10 and 9 below, 50 and 51 above. Option b is equivalence partitioning (one value per class), not BVA. (CTFL Syllabus, ch. 4)",
  },
},
```

Manifest — 6 questions per chapter, ids `qz-<chapter>-<n>` (difficulty in parentheses):

**Cap. 1:** qz-1-1 (e) which principle says exhaustive testing is impossible; qz-1-2 (e) order of the error→defect→failure causal chain; qz-1-3 (m) "testing shows presence, not absence" — pick the correct implication; qz-1-4 (m) main benefit of tester independence (finds different defects / no author bias) vs. distractors (faster, cheaper, replaces reviews); qz-1-5 (m) pesticide paradox — what must be done (evolve/vary tests); qz-1-6 (h) a defect that never causes a failure — possible? (yes: dead/unreached code path, masked by another defect).

**Cap. 2:** qz-2-1 (e) which level verifies interactions between integrated components; qz-2-2 (e) purpose of regression testing; qz-2-3 (m) main benefit of shift-left; qz-2-4 (m) confirmation testing vs regression testing — pick the correct distinction; qz-2-5 (m) in iterative SDLCs the regression suite grows each iteration — why (accumulating change risk); qz-2-6 (h) impact analysis is used to decide what to regression-test after a change.

**Cap. 3:** qz-3-1 (e) static testing does NOT require executing the software; qz-3-2 (e) most formal review type (inspection); qz-3-3 (m) which defect types static analysis finds that dynamic testing typically misses (unreachable code, standard violations, uninitialized variables); qz-3-4 (m) who runs the review meeting in a formal review (moderator/facilitator); qz-3-5 (h) review type led by the author to educate/reach consensus (walkthrough); qz-3-6 (h) static analysis needs tools; reviews are performed by people — pick the true statement.

**Cap. 4:** qz-4-1 = the example above; qz-4-2 (e) EP: how many values per partition are needed at minimum (one); qz-4-3 (m) decision table: 3 boolean conditions → how many rule columns for full coverage (8); qz-4-4 (m) state transition: what does invalid-transition testing check (events rejected in states where they're not allowed); qz-4-5 (h) 100% branch coverage implies 100% statement coverage — but not vice versa (pick correct direction); qz-4-6 (h) 3-value BVA for range 10–50 → 9,10,11 and 49,50,51.

**Cap. 5:** qz-5-1 (e) what a test plan documents (scope, approach, resources, schedule, criteria); qz-5-2 (e) entry vs exit criteria — which gates STARTING an activity; qz-5-3 (m) classify "the vendor may deliver the test environment late" (project risk, not product risk); qz-5-4 (m) severity vs priority — a cosmetic typo on the homepage of a brand can be low severity / high priority (pick correct pairing); qz-5-5 (m) which metric tracks defects per size/component to steer effort (defect density); qz-5-6 (h) risk-based testing: risk level determines test thoroughness and ordering.

**Cap. 6:** qz-6-1 (e) which tool type measures the % of code executed by tests (coverage tool); qz-6-2 (e) examples of test management tools (Jira+Xray, Azure Test Plans, TestRail) vs distractors (ESLint, JMeter as management); qz-6-3 (m) automation ROI: savings must exceed initial investment plus script maintenance; qz-6-4 (m) a real risk of test automation (false sense of security / maintenance burden) vs distractors; qz-6-5 (h) probe effect: the tool itself alters the behavior being measured (e.g. timing under instrumentation); qz-6-6 (h) which activity a test execution tool performs (runs cases and compares actual vs expected results).

Every wrong option must be a plausible ISTQB-flavored distractor (a real concept misapplied), never filler.

- [ ] **Step 2: Content count check**

Run: `grep -c "id: \"qz-" "src/app/[lng]/playground/istqb-quiz/page.tsx"` → expected `36`.

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-quiz/page.tsx"
git commit -m "feat(playground): ISTQB quick quiz with per-question instant feedback"
```

---

### Task 8: Coverage & traceability (`istqb-coverage`)

**Files:**
- Create: `src/app/[lng]/playground/istqb-coverage/page.tsx`

**Interfaces:** self-contained. Two sections on one page: 3 coverage calculations (numeric multiple-choice, pseudocode in a `<pre className="rounded-lg bg-[var(--color-bg-elevated)] p-4 font-mono text-xs leading-relaxed overflow-x-auto">` block) + 3 traceability audits (multi-select checkboxes). Submit-all-at-once, step-by-step explanations, score `X/6`, tier CTA (≥4/6 → exams, else campus), ↺ Reintentar.

- [ ] **Step 1: Write the page with its 6 exercises**

**Coverage exercises — pseudocode and answers are fixed; copy them exactly** (the numbers below were hand-verified; do not improvise new code):

**cv-1 (single choice):** pseudocode:

```
1  leer x
2  si x > 10:
3      imprimir "alto"
4  imprimir "fin"
```

Test case: `x = 5`. Question: statement coverage and branch coverage achieved? Correct: **75% sentencia (3/4), 50% rama (1/2)** — line 3 never runs; only the false branch of the `si` executes. Distractors: 100/50, 75/100, 50/50. Explanation walks the execution line by line.

**cv-2 (single choice):** pseudocode:

```
1  leer a, b
2  si a > 0 y b > 0:
3      msg = "ambos positivos"
4  si no:
5      msg = "no ambos"
6  si a > b:
7      msg = msg + ", a mayor"
8  imprimir msg
```

Test cases: `{a=3, b=2}` and `{a=-1, b=4}`. Correct: **100% sentencia, 100% rama** — TC1 covers if-1 true + if-2 true; TC2 covers if-1 false (else) + if-2 false. Teaching point: two well-chosen cases can fully cover this flow. Distractors: 100/75, 87/100, 75/50.

**cv-3 (single choice):** pseudocode:

```
1  leer n
2  si n >= 0:
3      resultado = "válido"
4  si n > 100:
5      resultado = "demasiado grande"
6  imprimir resultado
```

Test case: `n = 150`. Correct: **100% sentencia, 50% rama (2/4)** — one test executes every line (both `si` are true) yet neither false branch is ever taken. This is the classic proof that 100% statement ≠ 100% branch. Distractors: 100/100, 83/50, 100/75.

**Traceability exercises** (multi-select: "check every item with a problem"; correct = exact set):

**tr-1:** Matrix — R1:{TC1}, R2:{TC2, TC3}, R3:{} (no TC), plus TC4 mapped to no requirement. Find: uncovered requirements and orphan test cases. Correct set: **R3 (uncovered), TC4 (orphan)**.

**tr-2:** R1:{TC1}, R2:{TC1}, R3:{TC2}, R4:{}; TC3 orphan, TC4→R3. Correct set: **R4, TC3**. Extra teaching point in explanation: TC1 covering two requirements is fine — coverage ≠ 1:1.

**tr-3:** 6 requirements / 7 TCs, two defects: R5 and R6 uncovered, TC6 and TC7 orphans; distract with R1 covered by three TCs (fine) and TC5 covering two reqs (fine). Correct set: **R5, R6, TC6, TC7**.

Render each traceability matrix as a small table (`<table>` with the row/column pattern; a plain nested map is fine) followed by one checkbox per candidate item (`R1…Rn`, `TC1…TCn`), real `<input type="checkbox">` with `htmlFor`/`id` pairs on labels. An exercise scores as correct only when the checked set equals the correct set exactly.

- [ ] **Step 2: Content count check**

Run: `grep -c "id: \"cv-\|id: \"tr-" "src/app/[lng]/playground/istqb-coverage/page.tsx"` → expected `6`.

- [ ] **Step 3: Gate**

Run: `npm run typecheck` → 0 errors. `npm run lint` → 0 warnings.

- [ ] **Step 4: Commit (do not push)**

```bash
git add "src/app/[lng]/playground/istqb-coverage/page.tsx"
git commit -m "feat(playground): ISTQB coverage & traceability drill"
```

---

### Task 9: Full verification, AGENTS.md sync, push

**Files:**
- Modify: `AGENTS.md` (Playground/campus sections)
- No src changes expected; fix-forward anything verification finds.

- [ ] **Step 1: Build gate**

Kill any stray dev server first (Windows `.next` lock), then:

Run: `npm run typecheck && npm run lint && npm run build`
Expected: all three clean; build well under a minute.

- [ ] **Step 2: Browser verification (Playwright script, not manual)**

Start `npm run dev`. Write a throwaway script in the session scratchpad (ad-hoc Playwright pattern from prior sessions — never committed) that asserts:

1. `/es/playground`: ISTQB pill is enabled and shows count `7`; clicking it reveals 7 cards; Automation shows `9` and QA Fundamentals `4` (untouched).
2. Each of the 7 ISTQB routes loads in `es` AND `en` with its `<h1>` rendered and zero console errors.
3. One full flow per drill: flashcards (filter Cap. 4 → flip → "La sabía" advances → shuffle works); truefalse (answer all 20 → score + streak + CTA renders); levels (answer all 12 both axes → submit → explanations + score); techniques (answer 10 → submit → score); match (complete 3 rounds → summary); quiz (answer 10 with instant feedback visible each time → results + per-chapter breakdown); coverage (answer 6 → submit → step-by-step explanations).
4. Sub-nav inside an ISTQB drill lists only the 7 ISTQB exercises + Inicio, and does NOT contain the Setup link; inside an Automation exercise the Setup link still shows.
5. Breadcrumb inside an ISTQB drill reads `Playground › ISTQB…` (campus title from registry).
6. Retry resets every drill to a clean state.

Fix any failures before proceeding (fix-forward commits).

- [ ] **Step 3: Sync AGENTS.md**

Update: campus table/status section for ISTQB (add Playground line: 7 drills), the "Verified in browser" list (new numbered entry describing this verification), and any Playground architecture note that changed (Setup-link condition now `=== "automation"`). Reference the feature commit hashes.

- [ ] **Step 4: Commit and push everything**

```bash
git add AGENTS.md
git commit -m "docs(agents): record the ISTQB Playground (7 drills) and its browser verification"
git push
```

Confirm the Vercel deploy goes live and spot-check `/es/playground` in production.

---

## Self-review notes

- **Spec coverage:** simulator→Task 7 (differentiated quiz); flashcards→Task 2; levels/types→Task 4; technique selection→Task 5; T/F→Task 3; matching→Task 6; coverage/traceability→Task 8; registry+layout→Task 1; verification/docs→Task 9. "No progress dashboard" and "no resources page" are deliberate spec decisions, not gaps.
- **Type consistency:** each page is self-contained; no cross-task type imports. Registry `href`s in Task 1 match the folder names in Tasks 2–8 exactly.
- **Push discipline:** the only `git push` in this plan is in Task 9, after the build and browser gates.
