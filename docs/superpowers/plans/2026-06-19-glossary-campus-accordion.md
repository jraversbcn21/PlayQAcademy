# Glossary Campus Accordion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Playwright Automation glossary terms (today it has none) and replace
`/glossary`'s single flat, mixed list with a single-open campus accordion
(QA Fundamentals / ISTQB / Automation), mirroring the pattern already shipped
on `/exams`, plus fix the outdated "ISTQB Glossary" title and a chapter-sort
bug.

**Architecture:** `src/lib/constants/glossary.ts` gains ~42 new Automation
entries (chapters `"auto-1"`–`"auto-8"`) and a new explicit
`GLOSSARY_CHAPTERS_BY_CAMPUS` registry that replaces the page's current
`[...new Set(...)].sort()` chapter ordering (which mis-sorts `"qaf-10"`
before `"qaf-2"` as strings). `src/app/[lng]/glossary/page.tsx` becomes a
single-open campus accordion (one `openCampusId` state, same shape as
`src/app/[lng]/exams/page.tsx`), with chapter-headed sections inside the open
campus, and a separate search mode that bypasses the accordion to show
matches grouped by campus across all three. No new files, no new shared
components — same approach the exams accordion plan used.

**Tech Stack:** Next.js 14 App Router, React 18, TypeScript (strict), Tailwind
CSS. No test runner exists in this repo — verification is `npm run typecheck`
+ `npm run lint` (must both be 0 errors/warnings, per `AGENTS.md`) plus manual
browser verification.

## Global Constraints

- Every user-facing string must stay bilingual — either via the existing `t()` i18n keys in `common.json`, or the inline `lng === "es" ? "X" : "Y"` ternary pattern already used throughout `exams/page.tsx` and `glossary/page.tsx` for ad-hoc strings not worth a locale key. No empty `"en": ""`.
- `npm run typecheck` and `npm run lint` must both report 0 errors/warnings before committing (per `AGENTS.md` quality gate).
- Direct-to-`main` workflow: commit straight to `main`, no branch/PR.
- Existing `GLOSSARY` entries for ISTQB (`"1"`–`"6"`) and QA Fundamentals (`"qaf-1"`–`"qaf-10"`) keep their `term`/`def`/`chapter` fields unchanged — only `CHAPTER_TITLES` text for the `qaf-*` keys is edited (prefix removed), per the approved spec.
- Campus ids used throughout (`getSubCampuses()`, `GLOSSARY_CHAPTERS_BY_CAMPUS` keys) are exactly `"qaFundamentals"`, `"istqb"`, `"automation"` — confirmed in `src/lib/constants/campuses.ts`.
- Spec reference: `docs/superpowers/specs/2026-06-19-glossary-campus-accordion-design.md`.

---

### Task 1: Glossary data layer — Automation terms + campus/chapter registry

**Files:**
- Modify: `src/lib/constants/glossary.ts` (163 lines today)

**Interfaces:**
- Consumes: nothing new — same `Bilingual` type import already at the top of the file.
- Produces: `GLOSSARY_CHAPTERS_BY_CAMPUS: Record<string, string[]>` (new export, keys `"qaFundamentals" | "istqb" | "automation"`, values = ordered chapter-key arrays) — consumed by Task 2. `CHAPTER_TITLES` keeps its existing shape (`Record<string, { es: string; en: string }>`) with 8 new `"auto-N"` keys and its 10 `"qaf-N"` values' text changed (same keys, same type). `GLOSSARY` keeps its existing shape (`GlossaryEntry[]`) with ~42 new entries appended (chapter values `"auto-1"`–`"auto-8"`).

- [ ] **Step 1: Read the file to confirm it matches the version this plan was written against**

Run: open `src/lib/constants/glossary.ts` and confirm it is 163 lines: a `GLOSSARY: GlossaryEntry[]` array ending at line 144 (`];`), followed by `export const CHAPTER_TITLES: Record<string, { es: string; en: string }> = {` at line 146, ending at line 163 (`};`).

If the file differs (e.g. someone already changed it), stop and reconcile before proceeding — the edits below assume this exact starting point.

- [ ] **Step 2: Remove the "QA Fundamentals — " prefix from the 10 `qaf-*` chapter titles**

Find this block (lines 153–162):

```ts
  "qaf-1": { es: "QA Fundamentals — Introducción al QA", en: "QA Fundamentals — Introduction to QA" },
  "qaf-2": { es: "QA Fundamentals — Calidad de Software", en: "QA Fundamentals — Software Quality" },
  "qaf-3": { es: "QA Fundamentals — SDLC y STLC", en: "QA Fundamentals — SDLC and STLC" },
  "qaf-4": { es: "QA Fundamentals — Análisis de Requisitos", en: "QA Fundamentals — Requirements Analysis" },
  "qaf-5": { es: "QA Fundamentals — Diseño de Casos de Prueba", en: "QA Fundamentals — Test Case Design" },
  "qaf-6": { es: "QA Fundamentals — Ejecución y Gestión de Defectos", en: "QA Fundamentals — Test Execution and Defect Management" },
  "qaf-7": { es: "QA Fundamentals — Metodologías Ágiles", en: "QA Fundamentals — Agile Methodologies" },
  "qaf-8": { es: "QA Fundamentals — Herramientas de QA Manual", en: "QA Fundamentals — Manual QA Tools" },
  "qaf-9": { es: "QA Fundamentals — Testing Web y Mobile", en: "QA Fundamentals — Web and Mobile Testing" },
  "qaf-10": { es: "QA Fundamentals — IA aplicada al QA", en: "QA Fundamentals — AI Applied to QA" },
```

Replace it with (campus name dropped — the accordion's pill header supplies it):

```ts
  "qaf-1": { es: "Introducción al QA", en: "Introduction to QA" },
  "qaf-2": { es: "Calidad de Software", en: "Software Quality" },
  "qaf-3": { es: "SDLC y STLC", en: "SDLC and STLC" },
  "qaf-4": { es: "Análisis de Requisitos", en: "Requirements Analysis" },
  "qaf-5": { es: "Diseño de Casos de Prueba", en: "Test Case Design" },
  "qaf-6": { es: "Ejecución y Gestión de Defectos", en: "Test Execution and Defect Management" },
  "qaf-7": { es: "Metodologías Ágiles", en: "Agile Methodologies" },
  "qaf-8": { es: "Herramientas de QA Manual", en: "Manual QA Tools" },
  "qaf-9": { es: "Testing Web y Mobile", en: "Web and Mobile Testing" },
  "qaf-10": { es: "IA aplicada al QA", en: "AI Applied to QA" },
```

- [ ] **Step 3: Add the 8 Automation chapter titles**

Immediately after the `"qaf-10"` line from Step 2 (still inside the `CHAPTER_TITLES` object, before its closing `};`), add:

```ts
  "auto-1": { es: "Fundamentos de TypeScript para QA", en: "TypeScript Foundations for QA" },
  "auto-2": { es: "Fundamentos de Playwright", en: "Playwright Fundamentals" },
  "auto-3": { es: "Localizadores y Selectores", en: "Locators and Selectors" },
  "auto-4": { es: "Acciones y Aserciones", en: "Actions and Assertions" },
  "auto-5": { es: "Page Object Model", en: "Page Object Model" },
  "auto-6": { es: "Configuración y Entornos", en: "Configuration and Environments" },
  "auto-7": { es: "API Testing con Playwright", en: "API Testing with Playwright" },
  "auto-8": { es: "CI/CD y Reportes", en: "CI/CD and Reporting" },
```

- [ ] **Step 4: Insert the Automation glossary entries**

Find the closing line of the `GLOSSARY` array:

```ts
  { term: "Dossier de QA / QA dossier", def: { es: "Conjunto de entregables de un proyecto de QA (análisis, casos, ejecución, defectos, informe) reunidos como evidencia del trabajo realizado.", en: "Set of deliverables from a QA project (analysis, cases, execution, defects, report) gathered as evidence of the work done." }, chapter: "qaf-10" },
];
```

Insert the following block of 42 entries directly before the `];`, right after the `qaf-10` entry shown above (so it becomes the new line before `];`):

```ts

  /* ---------- Automation — Módulo 1 (TypeScript Foundations) ---------- */
  { term: "Tipado estático / Static typing", def: { es: "Verificación de tipos en tiempo de compilación que detecta errores en los datos y parámetros de un test antes de ejecutarlo.", en: "Type checking at compile time that catches errors in test data and parameters before running the test." }, chapter: "auto-1" },
  { term: "Interface (TypeScript)", def: { es: "Contrato que define la forma de un objeto, usado para modelar datos de prueba de forma explícita y verificable.", en: "Contract defining the shape of an object, used to model test data explicitly and verifiably." }, chapter: "auto-1" },
  { term: "Enum (TypeScript)", def: { es: "Conjunto de valores nombrados y finitos, útil para modelar estados conocidos en los tests (p. ej. estados de un pedido).", en: "Finite set of named values, useful for modeling known states in tests (e.g. order statuses)." }, chapter: "auto-1" },
  { term: "Async/Await", def: { es: "Sintaxis de JavaScript/TypeScript para escribir código asíncrono de forma secuencial; Playwright la usa para esperar automáticamente a que los elementos estén listos.", en: "JavaScript/TypeScript syntax for writing asynchronous code sequentially; Playwright uses it to automatically wait for elements to be ready." }, chapter: "auto-1" },
  { term: "Promise", def: { es: "Objeto que representa la finalización (con éxito o error) futura de una operación asíncrona, como una petición de red.", en: "Object representing the future completion (success or failure) of an asynchronous operation, such as a network request." }, chapter: "auto-1" },
  { term: "Arrow function", def: { es: "Función con sintaxis compacta que no tiene su propio binding de 'this', evitando errores comunes al definir callbacks en los tests.", en: "Function with compact syntax that has no own 'this' binding, avoiding common errors when defining callbacks in tests." }, chapter: "auto-1" },

  /* ---------- Automation — Módulo 2 (Playwright Fundamentals) ---------- */
  { term: "Playwright", def: { es: "Framework de automatización de pruebas end-to-end de Microsoft, con soporte nativo multi-navegador y auto-waiting.", en: "Microsoft's end-to-end test automation framework, with native multi-browser support and auto-waiting." }, chapter: "auto-2" },
  { term: "Auto-waiting", def: { es: "Mecanismo por el que Playwright espera automáticamente a que un elemento esté visible, habilitado y estable antes de actuar sobre él.", en: "Mechanism by which Playwright automatically waits for an element to be visible, enabled and stable before acting on it." }, chapter: "auto-2" },
  { term: "Test runner (Playwright)", def: { es: "Motor que descubre, organiza y ejecuta los archivos de test mediante bloques 'describe', 'test', 'beforeEach' y 'afterEach'.", en: "Engine that discovers, organizes and runs test files via 'describe', 'test', 'beforeEach' and 'afterEach' blocks." }, chapter: "auto-2" },
  { term: "Modo headless", def: { es: "Ejecución de un navegador sin interfaz gráfica visible; más rápido y el modo por defecto en entornos de CI/CD.", en: "Running a browser without a visible GUI; faster, and the default mode in CI/CD environments." }, chapter: "auto-2" },
  { term: "Motor de navegador / Browser engine", def: { es: "Cada uno de los tres motores (Chromium, Firefox, WebKit) que Playwright soporta de forma nativa para ejecutar la misma suite de pruebas.", en: "Each of the three engines (Chromium, Firefox, WebKit) that Playwright natively supports for running the same test suite." }, chapter: "auto-2" },

  /* ---------- Automation — Módulo 3 (Locators and Selectors) ---------- */
  { term: "Locator (Playwright)", def: { es: "Objeto que representa cómo encontrar uno o varios elementos en la página en cualquier momento, sin apuntar a un nodo del DOM fijo.", en: "Object representing how to find one or more elements on the page at any time, without pointing to a fixed DOM node." }, chapter: "auto-3" },
  { term: "getByRole", def: { es: "Forma de localizar elementos recomendada por Playwright, basada en su rol ARIA implícito o explícito; favorece la accesibilidad.", en: "Playwright's recommended way to locate elements, based on their implicit or explicit ARIA role; favors accessibility." }, chapter: "auto-3" },
  { term: "getByText / getByLabel / getByPlaceholder", def: { es: "Localizadores que encuentran elementos por su texto visible, su etiqueta o su placeholder, igual que lo haría un usuario real.", en: "Locators that find elements by their visible text, label or placeholder, the same way a real user would." }, chapter: "auto-3" },
  { term: "Selector CSS/XPath", def: { es: "Mecanismo de localización de bajo nivel basado en la estructura del DOM; se recomienda evitarlo cuando existe una alternativa más semántica.", en: "Low-level locating mechanism based on DOM structure; recommended to avoid when a more semantic alternative exists." }, chapter: "auto-3" },
  { term: "Encadenamiento de localizadores", def: { es: "Técnica de combinar '.locator().locator()' para acotar la búsqueda de un elemento dentro de otro ya localizado.", en: "Technique of combining '.locator().locator()' to narrow the search for an element within another already-located one." }, chapter: "auto-3" },
  { term: "Filtrado de localizadores (.filter()/.nth())", def: { es: "Métodos para refinar un conjunto de elementos coincidentes hasta quedarse con uno específico.", en: "Methods for refining a set of matching elements down to one specific element." }, chapter: "auto-3" },

  /* ---------- Automation — Módulo 4 (Actions and Assertions) ---------- */
  { term: "expect() (Playwright)", def: { es: "Función de aserción que valida el estado esperado de la aplicación: visibilidad, texto, valor o atributos de un elemento.", en: "Assertion function that validates the application's expected state: an element's visibility, text, value or attributes." }, chapter: "auto-4" },
  { term: "Soft assertion", def: { es: "Aserción ('expect.soft()') que registra un fallo pero permite que el test siga ejecutándose en vez de detenerse en el primer error.", en: "Assertion ('expect.soft()') that records a failure but lets the test keep running instead of stopping at the first error." }, chapter: "auto-4" },
  { term: "Auto-waiting en aserciones", def: { es: "Comportamiento por el que 'expect()' reintenta automáticamente una condición hasta que se cumple o expira su timeout, sin esperas manuales.", en: "Behavior by which 'expect()' automatically retries a condition until it's met or its timeout expires, with no manual waits." }, chapter: "auto-4" },
  { term: "fill() vs type()", def: { es: "fill() rellena un campo de una vez; type() simula pulsaciones de teclado una a una, útil para probar autocompletados o validaciones en vivo.", en: "fill() fills a field in one go; type() simulates keystrokes one by one, useful for testing autocomplete or live validation." }, chapter: "auto-4" },
  { term: "Timeout de aserción", def: { es: "Tiempo máximo que 'expect()' reintenta una condición antes de fallar el test, configurable de forma independiente al timeout de las acciones.", en: "Maximum time 'expect()' retries a condition before failing the test, configurable independently from the action timeout." }, chapter: "auto-4" },

  /* ---------- Automation — Módulo 5 (Page Object Model) ---------- */
  { term: "Page Object Model (POM)", def: { es: "Patrón de diseño que encapsula los selectores y acciones de una página en una clase reutilizable, separando el 'qué' del 'cómo' en los tests.", en: "Design pattern that encapsulates a page's selectors and actions in a reusable class, separating the 'what' from the 'how' in tests." }, chapter: "auto-5" },
  { term: "Page class", def: { es: "Clase de TypeScript que representa una página o componente de la aplicación bajo prueba, exponiendo métodos de alto nivel en vez de selectores.", en: "TypeScript class representing a page or component of the application under test, exposing high-level methods instead of raw selectors." }, chapter: "auto-5" },
  { term: "Composición de Page Objects", def: { es: "Técnica por la que un page object devuelve otro page object, modelando de forma fluida la navegación entre páginas.", en: "Technique by which a page object returns another page object, fluently modeling navigation between pages." }, chapter: "auto-5" },
  { term: "POM con interfaces de TypeScript", def: { es: "Uso de interfaces para definir contratos claros entre los page objects y los tests que los consumen.", en: "Use of interfaces to define clear contracts between page objects and the tests that consume them." }, chapter: "auto-5" },
  { term: "Selectores encapsulados", def: { es: "Principio de POM por el que ningún test accede directamente a un selector: siempre pasa por un método del page object.", en: "POM principle by which no test accesses a selector directly: it always goes through a page object method." }, chapter: "auto-5" },

  /* ---------- Automation — Módulo 6 (Configuration and Environments) ---------- */
  { term: "playwright.config.ts", def: { es: "Archivo central de configuración de un proyecto Playwright: timeout, retries, workers, reporter y proyectos de navegador/dispositivo.", en: "Central configuration file of a Playwright project: timeout, retries, workers, reporter, and browser/device projects." }, chapter: "auto-6" },
  { term: "Proyecto (Playwright)", def: { es: "Configuración independiente definida en 'playwright.config.ts', típicamente asociada a un navegador o dispositivo concreto.", en: "Independent configuration defined in 'playwright.config.ts', typically tied to a specific browser or device." }, chapter: "auto-6" },
  { term: "Retries", def: { es: "Número de reintentos automáticos de un test fallido antes de marcarlo como definitivamente fallido; útil para mitigar flakiness en CI.", en: "Number of automatic re-runs of a failed test before marking it as definitively failed; useful for mitigating flakiness in CI." }, chapter: "auto-6" },
  { term: "Workers", def: { es: "Número de procesos que ejecutan tests en paralelo; más workers reducen el tiempo total de ejecución de la suite.", en: "Number of processes running tests in parallel; more workers reduce the suite's total execution time." }, chapter: "auto-6" },
  { term: "Variable de entorno (testing)", def: { es: "Valor externo (URL, credenciales, flags) inyectado en tiempo de ejecución, en vez de hardcodeado, para adaptar los tests a cada entorno (dev, staging, prod).", en: "External value (URL, credentials, flags) injected at runtime instead of hardcoded, to adapt tests to each environment (dev, staging, prod)." }, chapter: "auto-6" },

  /* ---------- Automation — Módulo 7 (API Testing with Playwright) ---------- */
  { term: "APIRequestContext", def: { es: "Cliente HTTP integrado de Playwright para realizar peticiones API directamente, sin necesidad de librerías externas.", en: "Playwright's built-in HTTP client for making API requests directly, without needing external libraries." }, chapter: "auto-7" },
  { term: "Petición HTTP (GET/POST/PUT/DELETE)", def: { es: "Las cuatro operaciones básicas para interactuar con una API REST, verificables en Playwright junto con sus códigos de estado y cuerpos de respuesta.", en: "The four basic operations for interacting with a REST API, verifiable in Playwright along with their status codes and response bodies." }, chapter: "auto-7" },
  { term: "Test híbrido UI+API", def: { es: "Test que combina interacciones de interfaz con llamadas API en el mismo flujo, para escenarios end-to-end más rápidos y fiables.", en: "Test that combines UI interactions with API calls in the same flow, for faster and more reliable end-to-end scenarios." }, chapter: "auto-7" },
  { term: "Mocking de respuestas (route.fulfill())", def: { es: "Técnica para simular la respuesta de un backend con 'route.fulfill()', permitiendo probar escenarios de error sin depender del servidor real.", en: "Technique for simulating a backend's response with 'route.fulfill()', allowing error scenarios to be tested without depending on the real server." }, chapter: "auto-7" },
  { term: "Código de estado HTTP", def: { es: "Valor numérico (200, 404, 500...) que indica el resultado de una petición API y que se verifica habitualmente en las aserciones del test.", en: "Numeric value (200, 404, 500...) indicating the result of an API request, commonly verified in the test's assertions." }, chapter: "auto-7" },

  /* ---------- Automation — Módulo 8 (CI/CD and Reporting) ---------- */
  { term: "Pipeline de CI/CD", def: { es: "Flujo automatizado que construye, prueba y despliega una aplicación en cada push o pull request.", en: "Automated flow that builds, tests and deploys an application on every push or pull request." }, chapter: "auto-8" },
  { term: "HTML Reporter", def: { es: "Informe nativo de Playwright con trazas, capturas de pantalla y vídeos de cada ejecución de test, especialmente útil para depurar fallos.", en: "Playwright's native report with traces, screenshots and videos of each test run, especially useful for debugging failures." }, chapter: "auto-8" },
  { term: "Trace Viewer", def: { es: "Herramienta para inspeccionar paso a paso la ejecución de un test fallido, incluso cuando se ejecutó en un pipeline de CI.", en: "Tool for inspecting a failed test's execution step by step, even when it ran in a CI pipeline." }, chapter: "auto-8" },
  { term: "Allure Reporter", def: { es: "Herramienta externa de generación de reportes con histórico de ejecuciones, gráficos de tendencia y categorización de fallos.", en: "External reporting tool with execution history, trend charts and failure categorization." }, chapter: "auto-8" },
  { term: "GitHub Actions", def: { es: "Servicio de CI/CD integrado en GitHub, usado para ejecutar la suite de tests automáticamente en cada cambio del repositorio.", en: "CI/CD service built into GitHub, used to automatically run the test suite on every repository change." }, chapter: "auto-8" },
];
```

(Note the `];` at the very end is the array's existing closing line — it moves down, it isn't duplicated.)

- [ ] **Step 5: Add the `GLOSSARY_CHAPTERS_BY_CAMPUS` registry**

At the very end of the file, after the `CHAPTER_TITLES` object's closing `};` (from Step 3), add:

```ts

export const GLOSSARY_CHAPTERS_BY_CAMPUS: Record<string, string[]> = {
  qaFundamentals: ["qaf-1", "qaf-2", "qaf-3", "qaf-4", "qaf-5", "qaf-6", "qaf-7", "qaf-8", "qaf-9", "qaf-10"],
  istqb: ["1", "2", "3", "4", "5", "6"],
  automation: ["auto-1", "auto-2", "auto-3", "auto-4", "auto-5", "auto-6", "auto-7", "auto-8"],
};
```

- [ ] **Step 6: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0, no `error TS` lines.

- [ ] **Step 7: Run lint**

Run: `npm run lint`
Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 8: Verify entry counts**

Run (Git Bash):
```bash
grep -c 'chapter: "auto-' src/lib/constants/glossary.ts
```
Expected: `42`

Run:
```bash
grep -c '{ term:' src/lib/constants/glossary.ts
```
Expected: `156` (114 existing + 42 new).

- [ ] **Step 9: Commit**

```bash
git add src/lib/constants/glossary.ts
git commit -m "feat(glossary): add Playwright Automation terms and campus/chapter registry

Adds 42 bilingual glossary entries for Automation modules m1-m8
(chapters auto-1..auto-8), sourced from their lesson titles/descriptions
in curriculum.ts. Adds GLOSSARY_CHAPTERS_BY_CAMPUS, an explicit,
correctly-ordered chapter registry per campus, replacing the lexicographic
chapter sort the page currently does (which put qaf-10 before qaf-2).
Strips the redundant 'QA Fundamentals — ' prefix from CHAPTER_TITLES now
that campus grouping will be visual, not baked into the title text.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 2: Glossary page — campus accordion + cross-campus search

**Files:**
- Modify: `public/locales/es/common.json:235-236`
- Modify: `public/locales/en/common.json:235-236`
- Modify: `src/app/[lng]/glossary/page.tsx` (full-file replacement — see Step 3)

**Interfaces:**
- Consumes: `GLOSSARY: GlossaryEntry[]`, `CHAPTER_TITLES: Record<string, { es: string; en: string }>`, `GLOSSARY_CHAPTERS_BY_CAMPUS: Record<string, string[]>` (all from `@/lib/constants/glossary`, the last one new from Task 1), `getSubCampuses(): Campus[]` (from `@/lib/constants/campuses`, pre-existing, unchanged).
- Produces: nothing consumed by other tasks — this is the last task in the plan.

- [ ] **Step 1: Update the Spanish title/subtitle**

In `public/locales/es/common.json`, find (lines 235–236):

```json
    "title": "Glosario ISTQB",
    "subtitle": "Términos clave del syllabus CTFL v4.0",
```

Replace with:

```json
    "title": "Glosario",
    "subtitle": "Términos clave de los 3 campus de PlayQAcademy",
```

- [ ] **Step 2: Update the English title/subtitle**

In `public/locales/en/common.json`, find (lines 235–236):

```json
    "title": "ISTQB Glossary",
    "subtitle": "Key terms from CTFL v4.0 syllabus",
```

Replace with:

```json
    "title": "Glossary",
    "subtitle": "Key terms from PlayQAcademy's 3 campuses",
```

- [ ] **Step 3: Replace the full page component**

Replace the entire contents of `src/app/[lng]/glossary/page.tsx` with:

```tsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import {
  GLOSSARY,
  CHAPTER_TITLES,
  GLOSSARY_CHAPTERS_BY_CAMPUS,
} from "@/lib/constants/glossary";
import type { GlossaryEntry } from "@/lib/constants/glossary";
import { getSubCampuses } from "@/lib/constants/campuses";
import Card from "@/components/ui/Card";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function tText(bi: { es: string; en: string }, lng: string): string {
  return (bi as unknown as Record<string, string>)[lng] ?? bi.en;
}

/** "qaf-3" -> "3", "auto-5" -> "5", "1" -> "1" */
function chapterNumber(chapter: string): string {
  return chapter.replace(/[^0-9]/g, "");
}

function buildChapterToCampus(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const [campusId, chapters] of Object.entries(GLOSSARY_CHAPTERS_BY_CAMPUS)) {
    for (const chapter of chapters) {
      map[chapter] = campusId;
    }
  }
  return map;
}

const CHAPTER_TO_CAMPUS = buildChapterToCampus();

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GlossaryPage() {
  const params = useParams();
  const lng = (params?.lng as string) ?? "es";
  const { t } = useTranslation("common");

  const [search, setSearch] = useState("");
  const [openCampusId, setOpenCampusId] = useState<string | null>(null);

  const campuses = useMemo(
    () =>
      getSubCampuses()
        .map((campus) => ({
          campus,
          chapters: GLOSSARY_CHAPTERS_BY_CAMPUS[campus.id] ?? [],
        }))
        .filter(({ chapters }) => chapters.length > 0),
    []
  );

  const searchResults = useMemo(() => {
    if (!search) return [];
    const searchLower = search.toLowerCase();
    return GLOSSARY.filter(
      (entry: GlossaryEntry) =>
        entry.term.toLowerCase().includes(searchLower) ||
        entry.def.es.toLowerCase().includes(searchLower) ||
        entry.def.en.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const resultsByCampus = useMemo(() => {
    if (!search) return [];
    return campuses
      .map(({ campus }) => ({
        campus,
        entries: searchResults.filter(
          (entry) => CHAPTER_TO_CAMPUS[entry.chapter] === campus.id
        ),
      }))
      .filter(({ entries }) => entries.length > 0);
  }, [search, searchResults, campuses]);

  const openEntry = campuses.find(({ campus }) => campus.id === openCampusId);
  const isIstqbOpen = openEntry?.campus.id === "istqb";
  const moduleWord = lng === "es" ? "Módulo" : "Module";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
          {t("glossary.title")}
        </h1>
        <p className="mt-2 text-[var(--color-text-secondary)]">
          {t("glossary.subtitle")}
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          {t("glossary.entryCount", { count: GLOSSARY.length })}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          placeholder={t("glossary.search")}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:border-brand-forest-500 focus:outline-none focus:ring-2 focus:ring-brand-forest-500/20"
        />
      </div>

      {search ? (
        /* ---------------- Search results, grouped by campus ---------------- */
        resultsByCampus.length === 0 ? (
          <div className="py-12 text-center text-[var(--color-text-muted)]">
            {t("glossary.noResults")}
          </div>
        ) : (
          <div className="space-y-8">
            {resultsByCampus.map(({ campus, entries }) => (
              <section key={campus.id}>
                <h2 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
                  {campus.title[lng as "es" | "en"] ?? campus.title.en}
                </h2>
                <div className="space-y-3">
                  {entries.map((entry, idx) => (
                    <Card key={idx} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-[var(--color-text-primary)]">
                            {entry.term}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {tText(entry.def, lng)}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
                          {t("glossary.chapter")} {chapterNumber(entry.chapter)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )
      ) : (
        /* ---------------- Browsing: campus accordion ---------------- */
        <>
          <div className="mb-6 flex flex-wrap gap-3">
            {campuses.map(({ campus, chapters }) => {
              const isOpen = openCampusId === campus.id;
              const count = GLOSSARY.filter((e) => chapters.includes(e.chapter)).length;
              return (
                <button
                  key={campus.id}
                  type="button"
                  onClick={() => setOpenCampusId(isOpen ? null : campus.id)}
                  aria-expanded={isOpen}
                  className={[
                    "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                    isOpen
                      ? "border-brand-forest-500/30 bg-brand-forest-500/10 text-brand-forest-400"
                      : "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {campus.title[lng as "es" | "en"] ?? campus.title.en}
                  <span className="rounded-full bg-brand-forest-500/15 px-2 py-0.5 text-xs font-medium text-brand-forest-400">
                    {count}
                  </span>
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              );
            })}
          </div>

          {openEntry && (
            <div className="space-y-8">
              {openEntry.chapters.map((chapter) => {
                const entries = GLOSSARY.filter((e) => e.chapter === chapter);
                if (entries.length === 0) return null;
                const chapterTitle = CHAPTER_TITLES[chapter]?.[lng as "es" | "en"] ?? "";
                const label = isIstqbOpen ? t("glossary.chapter") : moduleWord;
                return (
                  <section key={chapter}>
                    <h2 className="mb-3 text-lg font-semibold text-[var(--color-text-primary)]">
                      {label} {chapterNumber(chapter)} · {chapterTitle}
                    </h2>
                    <div className="space-y-3">
                      {entries.map((entry, idx) => (
                        <Card key={idx} className="p-4">
                          <h3 className="font-semibold text-[var(--color-text-primary)]">
                            {entry.term}
                          </h3>
                          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                            {tText(entry.def, lng)}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Run typecheck**

Run: `npm run typecheck`
Expected: exits 0, no `error TS` lines.

- [ ] **Step 5: Run lint**

Run: `npm run lint`
Expected: `✔ No ESLint warnings or errors`

- [ ] **Step 6: Manual browser verification**

Start the dev server if not already running (`npm run dev`, port 3001) and, logged in, walk through on **both** `/es/glossary` and `/en/glossary`:

1. Header shows "Glosario" / "Glossary" (not "ISTQB") and the campus-neutral subtitle; total count shown is 156.
2. Page loads with 3 pills ("Fundamentos de QA", "ISTQB CTFL Foundation", "Automatización con Playwright" / English titles), each with a term count badge, none active, nothing rendered below the pill row.
3. Click "Fundamentos de QA" → 10 sections appear in numeric order **Módulo 1 → Módulo 10** (not alphabetical — confirms the `"qaf-10"`-before-`"qaf-2"` bug is fixed), each with its title and term cards.
4. Click "ISTQB CTFL Foundation" → the QAF sections disappear, ISTQB's 6 sections appear instead, labeled **Capítulo 1 → Capítulo 6**; only the ISTQB pill is now highlighted.
5. Click "Automatización con Playwright" → 8 sections **Módulo 1 → Módulo 8** appear, with the new Automation terms (e.g. "Playwright", "Page Object Model (POM)", "GitHub Actions").
6. Click the currently-open pill again → it collapses, no sections shown, no pill highlighted.
7. With no pill open, type "test" in the search box → the accordion disappears and results render grouped under campus headers, spanning at least 2 of the 3 campuses (the word "test" appears in entries from all three).
8. Clear the search box → returns to the collapsed accordion (or to whichever pill was open before search, if one was), not the search view.
9. Type a search term with no matches (e.g. "zzzzz") → `t("glossary.noResults")` message shown once, not repeated per campus.

If any of these don't match, fix `src/app/[lng]/glossary/page.tsx` before continuing — do not commit a broken state.

- [ ] **Step 7: Commit**

```bash
git add public/locales/es/common.json public/locales/en/common.json "src/app/[lng]/glossary/page.tsx"
git commit -m "feat(glossary): campus accordion layout, fix outdated ISTQB-only title

Replaces the flat, mixed-order term list with a single-open accordion
(QA Fundamentals / ISTQB / Automation), each campus showing its chapters
in real module order instead of the previous alphabetical chapter sort.
Search now spans all 3 campuses and groups results by campus instead of
being scoped to a single chapter dropdown (removed). Title/subtitle no
longer claim the glossary is ISTQB-only.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

### Task 3: Docs sync — AGENTS.md

**Files:**
- Modify: `AGENTS.md:32` (Architecture section, Glossary bullet)
- Modify: `AGENTS.md` (Playwright Automation campus status section, ~line 76)

**Interfaces:**
- Consumes: nothing (documentation only).
- Produces: nothing (documentation only).

- [ ] **Step 1: Update the Architecture section's Glossary bullet**

Find (current line 32):

```
- **Glossary** (`src/lib/constants/glossary.ts`): a flat list tagged by `chapter`; the page derives the chapter list dynamically (`Set + sort`). ISTQB uses bare keys `"1"…"6"`; QA Fundamentals uses `qaf-1…qaf-10`. Section titles live in `CHAPTER_TITLES`. Reachable from the navbar (`nav.glossary`, between Curriculum and Playground, desktop + mobile).
```

Replace with:

```
- **Glossary** (`src/lib/constants/glossary.ts`): tagged by `chapter` — ISTQB uses bare keys `"1"…"6"`, QA Fundamentals uses `qaf-1…qaf-10`, Automation uses `auto-1…auto-8`. `GLOSSARY_CHAPTERS_BY_CAMPUS` is the explicit, correctly-ordered (not `.sort()`-derived) registry mapping each campus to its chapter keys in real module order — the `/glossary` page reads this directly instead of deriving order from the data, avoiding a lexicographic-sort bug (`"qaf-10"` sorting before `"qaf-2"` as strings). Section titles live in `CHAPTER_TITLES` (no campus-name prefix — the page's accordion section already provides that context). The page itself is a single-open campus accordion (same pattern as `/exams`): opening a campus shows its chapters as headed sections; typing in the search box bypasses the accordion entirely and shows matches from all 3 campuses grouped by campus header. Reachable from the navbar (`nav.glossary`, between Curriculum and Playground, desktop + mobile).
```

- [ ] **Step 2: Add a Glossary line to the Playwright Automation campus status section**

Find the Playwright Automation campus section's `**Badges:**` line:

```
- **Badges:** module-completion badges for `m1`…`m3` + `automation_master`; `module_1_exam_passed` (🥇 rare/150 → `exam-module-1`).
```

Add a new line directly after it:

```
- **Glossary:** full coverage, 42 terms across chapters `auto-1`…`auto-8` (one per module). Previously had none — the glossary used to cover only ISTQB and QA Fundamentals.
```

- [ ] **Step 3: Commit**

```bash
git add AGENTS.md
git commit -m "docs: sync AGENTS.md with glossary campus accordion and Automation terms

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

---

## Notes for the implementer

- Tasks must run in order: Task 2 imports `GLOSSARY_CHAPTERS_BY_CAMPUS`, which doesn't exist until Task 1's Step 5. Task 3 documents the end state of both.
- The `React.ChangeEvent<HTMLInputElement>` type annotation in Task 2's Step 3 needs no `import React from "react"` — this codebase's existing `glossary/page.tsx` and other client pages already use the same annotation without that import (the global ambient `React` namespace from `@types/react` covers it), confirmed by today's 0-error typecheck.
- Do not reorder the `qaf-*` / `istqb` / `auto-*` chapter arrays inside `GLOSSARY_CHAPTERS_BY_CAMPUS` — their array order **is** the display order on the page (Task 2 reads `openEntry.chapters` directly, no sorting), so they must already be in module/chapter-number order, which they are as written in Task 1 Step 5.
