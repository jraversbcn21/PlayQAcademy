# Expand Zero-Margin Exam Question Pools Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 21 new exam questions across 4 question-bank files so the three zero-margin exams (`exam-module-2-3`, `exam-qaf-m1`, `exam-qaf-m2`) gain ~1.5× pool margin and a populated `hard` bucket.

**Architecture:** Each bank is a flat `ExamQuestion[]` registered via `registerQuestions()` and side-effect-imported in `exams.ts` (already wired). Tasks append complete new question objects to the arrays — no engine, exam-definition, or import changes. Each file is independent, so each task is self-contained and reviewable on its own.

**Tech Stack:** TypeScript data modules; bilingual `{ es, en }` content; `ExamQuestion` type from `src/types/exam.ts`.

## Global Constraints

- **No test framework** in this repo. Per-task gate: `npm run typecheck` (0 errors) + `npm run lint` (0 new errors) + a per-difficulty `grep -c` count check (commands given per task).
- **Bilingual `{ es, en }` parity** on `question`, every `option.text`, and `explanation`. No empty strings, no missing language.
- **Single-module tag**, matching each file's existing convention: module-2/3 use `moduleIds: [M2]` / `moduleIds: [M3]` (string const); qaf files use `moduleIds: M` (array const). Do not invent new module ids.
- **Each question:** exactly 4 `options` (except `true_false`, which uses the 2 true/false options already used in the file) and exactly one correct answer id in `correctOptionIds` for `single_choice`/`true_false`; `multiple_choice` may have several. Plausible distractors only.
- **`points` by file convention:** module-2/3 → 1 (easy) / 2 (medium) / 3 (hard); qaf → 1 always. (Scoring is equal-weight, so `points` does not affect scoring — match convention for consistency.)
- **Append only.** Insert the new question objects as the final elements of the `QUESTIONS` array (immediately before the closing `];`), under the banner comment given in each task. Do **not** modify, reorder, or delete existing questions, and do **not** touch the existing in-file EASY/MEDIUM/HARD section banners. For module-2/3 only, also update the count in the file's header docblock (exact edit given).
- **No `common.json` changes; no changes to `exams.ts`, `scoring.ts`, or `src/types/exam.ts`.**
- Commit directly to `main` (direct-to-main workflow). End every commit message with `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`.

---

### Task 1: Expand module-2 (Playwright Fundamentals) bank by 6

**Files:**
- Modify: `src/lib/constants/examQuestions/module-2.ts`

**Interfaces:**
- Consumes: existing `const M2 = "m2-playwright-fundamentals";` and `ExamQuestion` shape in the file.
- Produces: bank grows 12 → 18 (7 easy / 6 medium / 5 hard). No exported symbols change.

- [ ] **Step 1: Update the header docblock count**

Replace this line near the top of the file:

```
 * 12 questions (5 easy, 4 medium, 3 hard) covering:
```

with:

```
 * 18 questions (7 easy, 6 medium, 5 hard) covering:
```

- [ ] **Step 2: Append the 6 new question objects**

Insert the following objects as the final elements of the `QUESTIONS` array — immediately before the closing `];` (after the existing `m2-h3` object). Keep them as one block under the banner comment shown.

```ts
  /* ================================================================== */
  /*  ADDED 2026-06-19 — margin expansion (2 easy, 2 medium, 2 hard)     */
  /* ================================================================== */

  {
    id: "m2-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "¿Qué archivo genera Playwright para centralizar la configuración del proyecto (navegadores, baseURL, reporters, timeouts)?",
      en: "Which file does Playwright generate to centralize project configuration (browsers, baseURL, reporters, timeouts)?",
    },
    options: [
      { id: "a", text: { es: "playwright.json", en: "playwright.json" } },
      { id: "b", text: { es: "playwright.config.ts", en: "playwright.config.ts" } },
      { id: "c", text: { es: "pw.config.js", en: "pw.config.js" } },
      { id: "d", text: { es: "test.config.ts", en: "test.config.ts" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`playwright.config.ts` es el archivo central de configuración que crea `npm init playwright@latest`. Ahí se definen los `projects` (navegadores), el bloque `use` (baseURL, headless, trace), el `reporter`, los `timeout` y demás opciones globales.",
      en: "`playwright.config.ts` is the central configuration file created by `npm init playwright@latest`. It defines the `projects` (browsers), the `use` block (baseURL, headless, trace), the `reporter`, `timeout`, and other global options.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m2-e7",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "El Modo UI de Playwright (`npx playwright test --ui`) permite ejecutar tests de forma interactiva y viajar en el tiempo (time-travel) por cada paso.",
      en: "Playwright's UI Mode (`npx playwright test --ui`) lets you run tests interactively and time-travel through each step.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El Modo UI abre una interfaz donde eliges qué tests ejecutar, ves cada acción paso a paso con snapshots del DOM (time-travel) e inspeccionas localizadores. Es una herramienta de desarrollo/depuración, no para CI.",
      en: "Correct. UI Mode opens an interface where you pick which tests to run, watch each action step by step with DOM snapshots (time-travel), and inspect locators. It's a development/debugging tool, not for CI.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m2-m5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "Tras clonar un repo con tests de Playwright, `npx playwright test` falla diciendo que faltan los navegadores. ¿Qué comando los descarga?",
      en: "After cloning a repo with Playwright tests, `npx playwright test` fails saying browsers are missing. Which command downloads them?",
    },
    options: [
      { id: "a", text: { es: "npm install", en: "npm install" } },
      { id: "b", text: { es: "npx playwright install", en: "npx playwright install" } },
      { id: "c", text: { es: "npx playwright download", en: "npx playwright download" } },
      { id: "d", text: { es: "npm run browsers", en: "npm run browsers" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`npx playwright install` descarga los binarios de los navegadores (Chromium, Firefox, WebKit) que Playwright controla. Son independientes de los navegadores de tu sistema y, por su tamaño, no se incluyen en `npm install`.",
      en: "`npx playwright install` downloads the browser binaries (Chromium, Firefox, WebKit) that Playwright drives. They are independent of your system's browsers and, due to their size, are not included in `npm install`.",
    },
    points: 2,
    timeEstimateSeconds: 40,
  },
  {
    id: "m2-m6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "Necesitas sembrar la base de datos UNA sola vez antes de todos los tests de un archivo (operación costosa). ¿Qué hook usas?",
      en: "You need to seed the database ONCE before all tests in a file (an expensive operation). Which hook do you use?",
    },
    options: [
      { id: "a", text: { es: "test.beforeEach", en: "test.beforeEach" } },
      { id: "b", text: { es: "test.beforeAll", en: "test.beforeAll" } },
      { id: "c", text: { es: "test.afterEach", en: "test.afterEach" } },
      { id: "d", text: { es: "Un test normal colocado al principio", en: "A regular test placed first" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`test.beforeAll` se ejecuta una sola vez antes del primer test del bloque/archivo, ideal para setup costoso compartido (sembrar datos, login de sistema). `test.beforeEach` correría antes de CADA test, repitiendo la operación innecesariamente.",
      en: "`test.beforeAll` runs once before the first test of the block/file, ideal for shared expensive setup (seeding data, system login). `test.beforeEach` would run before EACH test, repeating the operation unnecessarily.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m2-h4",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: [M2],
    question: {
      es: "Por defecto Playwright ejecuta los archivos de test en paralelo, pero los tests DENTRO de un mismo archivo en serie. ¿Cómo habilitas que los tests de un archivo también corran en paralelo entre sí?",
      en: "By default Playwright runs test files in parallel, but tests WITHIN a single file serially. How do you enable tests within a file to also run in parallel with each other?",
    },
    options: [
      { id: "a", text: { es: "test.describe.configure({ mode: 'parallel' })", en: "test.describe.configure({ mode: 'parallel' })" } },
      { id: "b", text: { es: "test.parallel()", en: "test.parallel()" } },
      { id: "c", text: { es: "Añadir la bandera --parallel-within-file", en: "Add the --parallel-within-file flag" } },
      { id: "d", text: { es: "No es posible: dentro de un archivo siempre van en serie", en: "It's not possible: within a file they always run serially" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`test.describe.configure({ mode: 'parallel' })` (o `fullyParallel: true` en la config) hace que los tests de un mismo archivo se repartan entre workers y corran en paralelo. Requiere que los tests sean independientes (sin estado compartido), por eso no es el comportamiento por defecto.",
      en: "`test.describe.configure({ mode: 'parallel' })` (or `fullyParallel: true` in the config) makes tests in the same file spread across workers and run in parallel. It requires the tests to be independent (no shared state), which is why it isn't the default.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
  {
    id: "m2-h5",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: [M2],
    question: {
      es: "En CI configuras `retries: 2`. Un test falla en el primer intento y pasa en el segundo. ¿Cómo lo reporta Playwright y qué significa?",
      en: "In CI you set `retries: 2`. A test fails on the first attempt and passes on the second. How does Playwright report it and what does it mean?",
    },
    options: [
      { id: "a", text: { es: "Como 'passed' limpio: el reintento borra cualquier rastro del fallo", en: "As a clean 'passed': the retry erases any trace of the failure" } },
      { id: "b", text: { es: "Como 'flaky': pasó, pero solo tras reintentar, señal de inestabilidad a investigar", en: "As 'flaky': it passed, but only after retrying — a sign of instability to investigate" } },
      { id: "c", text: { es: "Como 'failed', porque falló al menos una vez", en: "As 'failed', because it failed at least once" } },
      { id: "d", text: { es: "Lo reintenta de forma infinita hasta que falle definitivamente", en: "It retries infinitely until it finally fails" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Playwright marca el test como 'flaky' cuando falla y luego pasa dentro de los reintentos. No es un 'passed' limpio: señala inestabilidad (timing, locators ambiguos, dependencias de estado) que conviene investigar, aunque los reintentos eviten romper el pipeline.",
      en: "Playwright marks the test as 'flaky' when it fails and then passes within the retries. It's not a clean 'passed': it flags instability (timing, ambiguous locators, state dependencies) worth investigating, even though the retries keep the pipeline from breaking.",
    },
    points: 3,
    timeEstimateSeconds: 65,
  },
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 4: Verify counts**

Run from the repo root:

```bash
cd src/lib/constants/examQuestions && for d in easy medium hard; do echo "$d: $(grep -c "difficulty: \"$d\"" module-2.ts)"; done && echo "total: $(grep -c "difficulty:" module-2.ts)"
```
Expected: `easy: 7`, `medium: 6`, `hard: 5`, `total: 18`.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants/examQuestions/module-2.ts
git commit -m "feat(exams): expand module-2 question bank 12->18 for retake margin"
```

---

### Task 2: Expand module-3 (Locators & Selectors) bank by 6

**Files:**
- Modify: `src/lib/constants/examQuestions/module-3.ts`

**Interfaces:**
- Consumes: existing `const M3 = "m3-locators-selectors";` and `ExamQuestion` shape.
- Produces: bank grows 13 → 19 (8 easy / 7 medium / 4 hard).

- [ ] **Step 1: Update the header docblock count**

Replace this line near the top of the file:

```
 * 13 questions (5 easy, 5 medium, 3 hard) covering:
```

with:

```
 * 19 questions (8 easy, 7 medium, 4 hard) covering:
```

- [ ] **Step 2: Append the 6 new question objects**

Insert as the final elements of the `QUESTIONS` array — immediately before the closing `];` (after the existing `m3-h3` object).

```ts
  /* ================================================================== */
  /*  ADDED 2026-06-19 — margin expansion (3 easy, 2 medium, 1 hard)     */
  /* ================================================================== */

  {
    id: "m3-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "Un campo de búsqueda no tiene `<label>` pero muestra el texto 'Buscar productos…' dentro del campo. ¿Qué localizador lo encuentra por ese texto?",
      en: "A search field has no `<label>` but shows the text 'Search products…' inside the field. Which locator finds it by that text?",
    },
    options: [
      { id: "a", text: { es: "page.getByText('Buscar productos…')", en: "page.getByText('Search products…')" } },
      { id: "b", text: { es: "page.getByPlaceholder('Buscar productos…')", en: "page.getByPlaceholder('Search products…')" } },
      { id: "c", text: { es: "page.getByLabel('Buscar productos…')", en: "page.getByLabel('Search products…')" } },
      { id: "d", text: { es: "page.getByTitle('Buscar productos…')", en: "page.getByTitle('Search products…')" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`getByPlaceholder` localiza un input por el texto de su atributo `placeholder`. `getByText` busca contenido visible de la página (no placeholders) y `getByLabel` requiere un `<label>` asociado, que aquí no existe.",
      en: "`getByPlaceholder` locates an input by its `placeholder` attribute text. `getByText` searches the page's visible content (not placeholders) and `getByLabel` requires an associated `<label>`, which doesn't exist here.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m3-e7",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "`getByAltText` localiza imágenes (u otros elementos con `alt`) por el texto de su atributo `alt`.",
      en: "`getByAltText` locates images (or other elements with `alt`) by their `alt` attribute text.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. `getByAltText('Logo de la empresa')` encuentra una imagen por su texto alternativo. Es semántico —el `alt` también lo usan los lectores de pantalla— y está en la jerarquía de localizadores por encima de CSS/XPath.",
      en: "Correct. `getByAltText('Company logo')` finds an image by its alternative text. It's semantic — `alt` is also used by screen readers — and ranks above CSS/XPath in the locator hierarchy.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m3-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "Un localizador coincide con varios elementos y solo quieres actuar sobre el primero para evitar el strict mode violation. ¿Qué método usas?",
      en: "A locator matches several elements and you only want to act on the first to avoid the strict mode violation. Which method do you use?",
    },
    options: [
      { id: "a", text: { es: ".one()", en: ".one()" } },
      { id: "b", text: { es: ".first()", en: ".first()" } },
      { id: "c", text: { es: ".single()", en: ".single()" } },
      { id: "d", text: { es: ".pick(0)", en: ".pick(0)" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`.first()` devuelve el primer elemento coincidente (equivalente a `.nth(0)`), resolviendo el strict mode violation cuando el localizador coincide con varios. Úsalo con cuidado: depende del orden, así que filtrar por contenido suele ser más robusto.",
      en: "`.first()` returns the first matching element (equivalent to `.nth(0)`), resolving the strict mode violation when the locator matches several. Use it carefully: it depends on order, so filtering by content is usually more robust.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m3-m6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "La página tiene dos textos: 'Add' y 'Add to Cart'. `page.getByText('Add')` provoca un strict mode violation porque coincide con ambos (match por subcadena). ¿Cómo localizas SOLO el texto exacto 'Add'?",
      en: "The page has two texts: 'Add' and 'Add to Cart'. `page.getByText('Add')` causes a strict mode violation because it matches both (substring match). How do you locate ONLY the exact text 'Add'?",
    },
    options: [
      { id: "a", text: { es: "page.getByText('Add', { exact: true })", en: "page.getByText('Add', { exact: true })" } },
      { id: "b", text: { es: "page.getByText('Add').first()", en: "page.getByText('Add').first()" } },
      { id: "c", text: { es: "page.getByText('^Add$')", en: "page.getByText('^Add$')" } },
      { id: "d", text: { es: "page.getByText('Add', { strict: true })", en: "page.getByText('Add', { strict: true })" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Por defecto `getByText` hace match por subcadena e insensible a mayúsculas, por eso 'Add' coincide también con 'Add to Cart'. La opción `{ exact: true }` exige coincidencia exacta del texto completo (sensible a may/min), seleccionando solo el 'Add' literal. `.first()` acertaría por azar según el orden, no por precisión.",
      en: "By default `getByText` does a case-insensitive substring match, which is why 'Add' also matches 'Add to Cart'. The `{ exact: true }` option requires a full exact match (case-sensitive), selecting only the literal 'Add'. `.first()` would hit by luck depending on order, not precision.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m3-m7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "¿Por qué `page.getByRole('list').getByRole('listitem')` suele ser preferible a `page.locator('ul li')` para recorrer los ítems de una lista?",
      en: "Why is `page.getByRole('list').getByRole('listitem')` usually preferable to `page.locator('ul li')` for iterating a list's items?",
    },
    options: [
      { id: "a", text: { es: "Porque es más corto de escribir", en: "Because it's shorter to write" } },
      { id: "b", text: { es: "Porque localiza por rol semántico (list/listitem), resistente a cambios de etiquetas/clases HTML y alineado con la accesibilidad", en: "Because it locates by semantic role (list/listitem), resilient to HTML tag/class changes and aligned with accessibility" } },
      { id: "c", text: { es: "Porque `page.locator('ul li')` no funciona en Playwright", en: "Because `page.locator('ul li')` doesn't work in Playwright" } },
      { id: "d", text: { es: "Porque getByRole es más rápido en tiempo de ejecución", en: "Because getByRole is faster at runtime" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Los roles ARIA 'list'/'listitem' describen la función semántica, no la implementación: si el equipo cambia la estructura `<ul><li>` por otra con los mismos roles (o añade clases), el localizador semántico sigue funcionando, mientras que `ul li` (CSS) se rompe. Además refleja cómo lo percibe la accesibilidad.",
      en: "The ARIA roles 'list'/'listitem' describe the semantic function, not the implementation: if the team swaps the `<ul><li>` structure for another with the same roles (or adds classes), the semantic locator keeps working, while `ul li` (CSS) breaks. It also reflects how accessibility perceives it.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m3-h4",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M3],
    question: {
      es: "Hay dos botones: 'Add to Cart' y 'Add to Cart and Checkout'. `getByRole('button', { name: 'Add to Cart' })` coincide con AMBOS (el `name` hace match por subcadena). Completa para seleccionar SOLO 'Add to Cart'.",
      en: "There are two buttons: 'Add to Cart' and 'Add to Cart and Checkout'. `getByRole('button', { name: 'Add to Cart' })` matches BOTH (the `name` does a substring match). Complete it to select ONLY 'Add to Cart'.",
    },
    codeSnippet: `const addBtn = page.getByRole('button', { name: 'Add to Cart', _____ });`,
    options: [
      { id: "a", text: { es: "exact: true", en: "exact: true" } },
      { id: "b", text: { es: "strict: true", en: "strict: true" } },
      { id: "c", text: { es: "full: true", en: "full: true" } },
      { id: "d", text: { es: "trim: true", en: "trim: true" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Por defecto, la opción `name` de `getByRole` hace match por subcadena insensible a mayúsculas, por eso 'Add to Cart' coincide también con 'Add to Cart and Checkout'. Añadir `exact: true` fuerza la coincidencia exacta del nombre accesible completo, seleccionando solo el botón 'Add to Cart'.",
      en: "By default, `getByRole`'s `name` option does a case-insensitive substring match, which is why 'Add to Cart' also matches 'Add to Cart and Checkout'. Adding `exact: true` forces an exact match of the full accessible name, selecting only the 'Add to Cart' button.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 4: Verify counts**

```bash
cd src/lib/constants/examQuestions && for d in easy medium hard; do echo "$d: $(grep -c "difficulty: \"$d\"" module-3.ts)"; done && echo "total: $(grep -c "difficulty:" module-3.ts)"
```
Expected: `easy: 8`, `medium: 7`, `hard: 4`, `total: 19`.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants/examQuestions/module-3.ts
git commit -m "feat(exams): expand module-3 question bank 13->19 for retake margin"
```

---

### Task 3: Expand qaf-m1 (Introduction to QA) bank by 5

**Files:**
- Modify: `src/lib/constants/examQuestions/qaf-m1.ts`

**Interfaces:**
- Consumes: existing `const M = ["qaf-m1"];` and `ExamQuestion` shape.
- Produces: bank grows 10 → 15 (6 easy / 6 medium / 3 hard). Note this file uses sequential ids (`qaf-m1-eN`) regardless of difficulty, `moduleIds: M`, and `points: 1` for all questions.

- [ ] **Step 1: Append the 5 new question objects**

Insert as the final elements of the `QUESTIONS` array — immediately before the closing `];` (after the existing `qaf-m1-e10` object, before `registerQuestions(QUESTIONS);`).

```ts
  {
    id: "qaf-m1-e11",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué afirma el primer principio del testing del ISTQB?", en: "What does the ISTQB's first testing principle state?" },
    options: [
      { id: "a", text: { es: "El testing demuestra la ausencia de defectos", en: "Testing proves the absence of defects" } },
      { id: "b", text: { es: "El testing muestra la presencia de defectos, pero no puede demostrar su ausencia", en: "Testing shows the presence of defects, but cannot prove their absence" } },
      { id: "c", text: { es: "El testing exhaustivo es posible con suficiente tiempo", en: "Exhaustive testing is possible with enough time" } },
      { id: "d", text: { es: "Los defectos se distribuyen siempre por igual", en: "Defects are always evenly distributed" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El principio 1 dice que el testing puede mostrar que hay defectos (presencia), pero nunca probar que no quedan (ausencia). Pasar todas las pruebas reduce el riesgo, no garantiza un software perfecto.", en: "Principle 1 states that testing can show that defects exist (presence), but never prove that none remain (absence). Passing all tests reduces risk; it does not guarantee perfect software." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e12",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "El principio de 'testing temprano' recomienda involucrar el testing desde el inicio (incluso revisando requisitos). ¿Cuál es su justificación principal?", en: "The 'early testing' principle recommends involving testing from the start (even reviewing requirements). What is its main rationale?" },
    options: [
      { id: "a", text: { es: "Tener más reuniones de equipo", en: "Having more team meetings" } },
      { id: "b", text: { es: "Corregir un defecto cuesta más cuanto más tarde se detecta en el ciclo de vida", en: "Fixing a defect costs more the later it is detected in the lifecycle" } },
      { id: "c", text: { es: "Así se evita tener que escribir casos de prueba", en: "It avoids having to write test cases" } },
      { id: "d", text: { es: "El testing temprano elimina la necesidad de testing dinámico", en: "Early testing removes the need for dynamic testing" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El testing temprano (shift-left) detecta defectos lo antes posible —incluso en requisitos y diseño mediante testing estático— porque el coste de corregir crece a lo largo del ciclo de vida: un error en requisitos es mucho más barato de arreglar que el mismo error ya en producción.", en: "Early testing (shift-left) detects defects as soon as possible — even in requirements and design via static testing — because the cost to fix grows along the lifecycle: a requirements error is far cheaper to fix than the same error already in production." },
    points: 1,
    timeEstimateSeconds: 50,
  },
  {
    id: "qaf-m1-e13",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "En un proyecto, el 80% de los fallos se concentran en 3 de los 20 módulos. Según el principio de 'agrupación de defectos', ¿qué estrategia es la más sensata?", en: "In a project, 80% of failures concentrate in 3 of 20 modules. Per the 'defect clustering' principle, which strategy is wisest?" },
    options: [
      { id: "a", text: { es: "Repartir el esfuerzo de prueba por igual entre los 20 módulos", en: "Spread test effort evenly across all 20 modules" } },
      { id: "b", text: { es: "Concentrar más esfuerzo en los módulos con más defectos detectados, sin abandonar el resto", en: "Focus more effort on the modules with the most detected defects, without abandoning the rest" } },
      { id: "c", text: { es: "Dejar de probar los 3 módulos problemáticos porque ya se conocen sus fallos", en: "Stop testing the 3 problematic modules because their failures are already known" } },
      { id: "d", text: { es: "Probar solo los 17 módulos restantes", en: "Test only the remaining 17 modules" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La agrupación de defectos (principio 4) observa que unos pocos módulos suelen concentrar la mayoría de los defectos. Lo razonable es priorizar el esfuerzo donde se concentran los problemas (análisis de riesgos) sin dejar de cubrir el resto, y combinarlo con la paradoja del pesticida para no estancarse.", en: "Defect clustering (principle 4) observes that a few modules usually concentrate most defects. The sensible approach is to prioritize effort where problems cluster (risk analysis) while still covering the rest, combined with the pesticide paradox to avoid stagnation." },
    points: 1,
    timeEstimateSeconds: 55,
  },
  {
    id: "qaf-m1-e14",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Se prueba con mucho más rigor el software de un marcapasos que el de un blog personal. ¿Qué principio del testing lo explica?", en: "A pacemaker's software is tested far more rigorously than a personal blog's. Which testing principle explains this?" },
    options: [
      { id: "a", text: { es: "El testing exhaustivo es imposible", en: "Exhaustive testing is impossible" } },
      { id: "b", text: { es: "El testing depende del contexto", en: "Testing is context-dependent" } },
      { id: "c", text: { es: "La paradoja del pesticida", en: "The pesticide paradox" } },
      { id: "d", text: { es: "La agrupación de defectos", en: "Defect clustering" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El principio 'el testing depende del contexto' establece que la intensidad, las técnicas y los criterios se adaptan al riesgo y al dominio: un sistema crítico de seguridad (marcapasos) exige mucho más rigor que un sitio de bajo riesgo (blog).", en: "The 'testing is context-dependent' principle states that intensity, techniques, and criteria adapt to risk and domain: a safety-critical system (pacemaker) demands far more rigor than a low-risk site (blog)." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m1-e15",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "'¿Estamos construyendo el producto correctamente?' frente a '¿Estamos construyendo el producto correcto?'. ¿A qué corresponden, respectivamente?", en: "'Are we building the product right?' vs 'Are we building the right product?'. What do these correspond to, respectively?" },
    options: [
      { id: "a", text: { es: "Validación y verificación", en: "Validation and verification" } },
      { id: "b", text: { es: "Verificación y validación", en: "Verification and validation" } },
      { id: "c", text: { es: "Ambas son verificación", en: "Both are verification" } },
      { id: "d", text: { es: "Ambas son validación", en: "Both are validation" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La verificación comprueba que el producto se construye conforme a sus especificaciones ('correctamente'); la validación comprueba que satisface las necesidades reales del usuario ('el producto correcto'). Un sistema puede pasar la verificación y aun así fallar la validación (ligado a la falacia de ausencia de errores).", en: "Verification checks that the product is built according to its specifications ('right'); validation checks that it meets the user's real needs ('the right product'). A system can pass verification and still fail validation (related to the absence-of-errors fallacy)." },
    points: 1,
    timeEstimateSeconds: 50,
  },
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Verify counts**

```bash
cd src/lib/constants/examQuestions && for d in easy medium hard; do echo "$d: $(grep -c "difficulty: \"$d\"" qaf-m1.ts)"; done && echo "total: $(grep -c "difficulty:" qaf-m1.ts)"
```
Expected: `easy: 6`, `medium: 6`, `hard: 3`, `total: 15`.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants/examQuestions/qaf-m1.ts
git commit -m "feat(exams): expand qaf-m1 question bank 10->15 (adds hard bucket)"
```

---

### Task 4: Expand qaf-m2 (Software Quality) bank by 4

**Files:**
- Modify: `src/lib/constants/examQuestions/qaf-m2.ts`

**Interfaces:**
- Consumes: existing `const M = ["qaf-m2"];` and `ExamQuestion` shape.
- Produces: bank grows 8 → 12 (4 easy / 5 medium / 3 hard). Sequential ids (`qaf-m2-eN`), `moduleIds: M`, `points: 1`.

- [ ] **Step 1: Append the 4 new question objects**

Insert as the final elements of the `QUESTIONS` array — immediately before the closing `];` (after the existing `qaf-m2-e8` object, before `registerQuestions(QUESTIONS);`).

```ts
  {
    id: "qaf-m2-e9",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál de las siguientes es una de las características de calidad de producto del modelo ISO/IEC 25010?", en: "Which of the following is one of the product quality characteristics in the ISO/IEC 25010 model?" },
    options: [
      { id: "a", text: { es: "Rentabilidad", en: "Profitability" } },
      { id: "b", text: { es: "Fiabilidad", en: "Reliability" } },
      { id: "c", text: { es: "Popularidad", en: "Popularity" } },
      { id: "d", text: { es: "Antigüedad", en: "Age" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "ISO/IEC 25010 define ocho características de calidad de producto: adecuación funcional, eficiencia de desempeño, compatibilidad, usabilidad, fiabilidad, seguridad, mantenibilidad y portabilidad. La rentabilidad, la popularidad y la antigüedad no forman parte del modelo.", en: "ISO/IEC 25010 defines eight product quality characteristics: functional suitability, performance efficiency, compatibility, usability, reliability, security, maintainability, and portability. Profitability, popularity, and age are not part of the model." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m2-e10",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Una app debe seguir funcionando correctamente aunque la red se caiga de forma intermitente, recuperándose sola. ¿Qué característica de ISO/IEC 25010 se evalúa principalmente?", en: "An app must keep working correctly even if the network drops intermittently, recovering on its own. Which ISO/IEC 25010 characteristic is primarily evaluated?" },
    options: [
      { id: "a", text: { es: "Usabilidad", en: "Usability" } },
      { id: "b", text: { es: "Fiabilidad (incluye tolerancia a fallos y recuperabilidad)", en: "Reliability (includes fault tolerance and recoverability)" } },
      { id: "c", text: { es: "Portabilidad", en: "Portability" } },
      { id: "d", text: { es: "Compatibilidad", en: "Compatibility" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La fiabilidad agrupa subcaracterísticas como madurez, disponibilidad, tolerancia a fallos y capacidad de recuperación. Mantener el comportamiento correcto ante caídas de red y recuperarse solo es tolerancia a fallos/recuperabilidad, parte de la fiabilidad.", en: "Reliability groups subcharacteristics such as maturity, availability, fault tolerance, and recoverability. Keeping correct behavior under network drops and recovering on its own is fault tolerance/recoverability, part of reliability." },
    points: 1,
    timeEstimateSeconds: 55,
  },
  {
    id: "qaf-m2-e11",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Un equipo necesita poder migrar su aplicación de AWS a Azure con cambios mínimos. ¿Qué característica de calidad prioriza?", en: "A team needs to migrate their app from AWS to Azure with minimal changes. Which quality characteristic does this prioritize?" },
    options: [
      { id: "a", text: { es: "Portabilidad", en: "Portability" } },
      { id: "b", text: { es: "Seguridad", en: "Security" } },
      { id: "c", text: { es: "Usabilidad", en: "Usability" } },
      { id: "d", text: { es: "Adecuación funcional", en: "Functional suitability" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La portabilidad mide la facilidad para transferir el software a otro entorno (hardware, software, plataforma). Migrar entre proveedores cloud con cambios mínimos corresponde a adaptabilidad/instalabilidad, subcaracterísticas de la portabilidad.", en: "Portability measures how easily software can be transferred to another environment (hardware, software, platform). Migrating between cloud providers with minimal changes corresponds to adaptability/installability, subcharacteristics of portability." },
    points: 1,
    timeEstimateSeconds: 50,
  },
  {
    id: "qaf-m2-e12",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Un cliente reporta un bug ya en producción y el equipo gasta tiempo en corregirlo y enviar un parche. En el modelo de coste de la calidad, ¿qué tipo de coste es?", en: "A customer reports a bug already in production and the team spends time fixing it and shipping a patch. In the cost-of-quality model, what type of cost is this?" },
    options: [
      { id: "a", text: { es: "Coste de prevención", en: "Prevention cost" } },
      { id: "b", text: { es: "Coste de evaluación (appraisal)", en: "Appraisal cost" } },
      { id: "c", text: { es: "Coste de fallo externo", en: "External failure cost" } },
      { id: "d", text: { es: "Coste de fallo interno", en: "Internal failure cost" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "El coste de la calidad se divide en prevención (evitar defectos), evaluación (detectarlos: revisiones, testing), fallo interno (defectos hallados antes de entregar) y fallo externo (defectos que llegan al cliente/producción). Un bug reportado por el cliente en producción es un coste de fallo externo, el más caro de todos.", en: "Cost of quality splits into prevention (avoiding defects), appraisal (detecting them: reviews, testing), internal failure (defects found before delivery), and external failure (defects that reach the customer/production). A bug reported by the customer in production is an external failure cost, the most expensive of all." },
    points: 1,
    timeEstimateSeconds: 55,
  },
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: exits 0, no errors.

- [ ] **Step 3: Verify counts**

```bash
cd src/lib/constants/examQuestions && for d in easy medium hard; do echo "$d: $(grep -c "difficulty: \"$d\"" qaf-m2.ts)"; done && echo "total: $(grep -c "difficulty:" qaf-m2.ts)"
```
Expected: `easy: 4`, `medium: 5`, `hard: 3`, `total: 12`.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: "✔ No ESLint warnings or errors" (or 0 new errors).

- [ ] **Step 5: Commit**

```bash
git add src/lib/constants/examQuestions/qaf-m2.ts
git commit -m "feat(exams): expand qaf-m2 question bank 8->12 (adds hard bucket)"
```

---

## Verification Strategy (end-to-end)

1. **Static:** `npm run typecheck` clean and `npm run lint` no new errors after each task and once at the end.
2. **Counts:** the per-task `grep -c` checks confirm the final distributions — module-2 = 7/6/5 (18), module-3 = 8/7/4 (19), qaf-m1 = 6/6/3 (15), qaf-m2 = 4/5/3 (12).
3. **Pool sufficiency (deterministic from counts):** `exam-module-2-3` pool = m2(18)+m3(19)=37 ≥ 25; `exam-qaf-m1` pool = 15 ≥ 10; `exam-qaf-m2` pool = 12 ≥ 8 — every bucket now exceeds its 40/35/25 quota.
4. **Parity / non-duplication spot-check:** read the added questions to confirm each has both `es` and `en` for question, all options, and explanation, and that no new question restates an existing one in the same file.

## Critical Files

- `src/lib/constants/examQuestions/module-2.ts` — +6 (Task 1)
- `src/lib/constants/examQuestions/module-3.ts` — +6 (Task 2)
- `src/lib/constants/examQuestions/qaf-m1.ts` — +5 (Task 3)
- `src/lib/constants/examQuestions/qaf-m2.ts` — +4 (Task 4)
- `src/lib/constants/exams.ts`, `src/lib/exam/scoring.ts`, `src/types/exam.ts` — reference only, not modified
