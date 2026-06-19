/**
 * Exam question bank — Module 2: Playwright Fundamentals.
 *
 * 18 questions (7 easy, 6 medium, 5 hard) covering:
 *   - What is Playwright and why it wins vs Selenium/Cypress
 *   - Installation and first test (npm init playwright@latest)
 *   - The Test Runner: test(), describe(), beforeEach/afterEach, annotations
 *   - Browsers: Chromium, Firefox, WebKit and Browser Contexts
 *   - Headless vs headed mode, UI Mode, slowMo
 *   - Practical exercise: first passing test against the PlayQ Playground
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M2 = "m2-playwright-fundamentals";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m2-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "¿Qué empresa desarrolla y mantiene Playwright?",
      en: "Which company develops and maintains Playwright?",
    },
    options: [
      { id: "a", text: { es: "Google", en: "Google" } },
      { id: "b", text: { es: "Microsoft", en: "Microsoft" } },
      { id: "c", text: { es: "Meta", en: "Meta" } },
      { id: "d", text: { es: "Salesforce", en: "Salesforce" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Playwright es desarrollado y mantenido por Microsoft, de código abierto bajo licencia Apache 2.0. No es un proyecto experimental ni abandonado; tiene un equipo dedicado y contribuciones activas de la comunidad.",
      en: "Playwright is developed and maintained by Microsoft, open source under the Apache 2.0 license. It is not an experimental or abandoned project; it has a dedicated team and active community contributions.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m2-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "Playwright puede ejecutar tests en Chromium, Firefox y WebKit usando una única API.",
      en: "Playwright can run tests on Chromium, Firefox, and WebKit using a single API.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Una de las grandes ventajas de Playwright frente a Cypress (solo navegadores basados en Chromium) es que soporta los tres motores principales — Chromium, Firefox y WebKit — con una sola API consistente, sin necesidad de WebDrivers separados como en Selenium.",
      en: "Correct. One of Playwright's biggest advantages over Cypress (Chromium-based browsers only) is that it supports all three major engines — Chromium, Firefox, and WebKit — with one consistent API, without needing separate WebDrivers like Selenium.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m2-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "¿Qué comando inicializa un proyecto Playwright nuevo desde cero, con archivos de ejemplo y configuración incluidos?",
      en: "What command initializes a brand-new Playwright project, including example files and configuration?",
    },
    options: [
      { id: "a", text: { es: "npm install playwright", en: "npm install playwright" } },
      { id: "b", text: { es: "npm init playwright@latest", en: "npm init playwright@latest" } },
      { id: "c", text: { es: "npx playwright create", en: "npx playwright create" } },
      { id: "d", text: { es: "npm create playwright-app", en: "npm create playwright-app" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`npm init playwright@latest` es el comando oficial de inicialización: crea `playwright.config.ts`, un test de ejemplo, actualiza `package.json` con scripts, y opcionalmente configura GitHub Actions e instala los navegadores. `npm install playwright` solo añadiría la dependencia sin configurar nada.",
      en: "`npm init playwright@latest` is the official initialization command: it creates `playwright.config.ts`, an example test, updates `package.json` with scripts, and optionally sets up GitHub Actions and installs browsers. `npm install playwright` would only add the dependency without configuring anything.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m2-e4",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "Por defecto, Playwright ejecuta los navegadores en modo headless (sin interfaz gráfica), ideal para CI/CD.",
      en: "By default, Playwright runs browsers in headless mode (no graphical interface), ideal for CI/CD.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El modo headless es el predeterminado porque es más rápido y no requiere un entorno gráfico, lo que lo hace ideal para pipelines de CI/CD. El modo headed (`--headed`) y el Modo UI (`--ui`) se usan durante el desarrollo para ver el navegador en acción.",
      en: "Correct. Headless mode is the default because it's faster and doesn't require a graphical environment, making it ideal for CI/CD pipelines. Headed mode (`--headed`) and UI Mode (`--ui`) are used during development to see the browser in action.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m2-e5",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M2],
    question: {
      es: "¿Cuál es el fixture más común que recibe una función `test()` de Playwright?",
      en: "What is the most common fixture received by a Playwright `test()` function?",
    },
    options: [
      { id: "a", text: { es: "browser", en: "browser" } },
      { id: "b", text: { es: "page", en: "page" } },
      { id: "c", text: { es: "request", en: "request" } },
      { id: "d", text: { es: "context", en: "context" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`page` es el fixture más usado: representa una página de navegador nueva y aislada para ese test. Playwright también ofrece `browser`, `context` y `request` (para API testing), pero la mayoría de los tests de UI solo necesitan `page`.",
      en: "`page` is the most used fixture: it represents a fresh, isolated browser page for that test. Playwright also provides `browser`, `context`, and `request` (for API testing), but most UI tests only need `page`.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },

  /* ================================================================== */
  /*  MEDIUM (4 questions)                                               */
  /* ================================================================== */

  {
    id: "m2-m1",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "¿Cuáles de las siguientes son ventajas reales de Playwright sobre Selenium? (Selecciona todas las correctas)",
      en: "Which of the following are real advantages of Playwright over Selenium? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Auto-waiting integrado sin necesidad de WebDriverWait explícito", en: "Built-in auto-waiting without needing explicit WebDriverWait" } },
      { id: "b", text: { es: "Ejecución paralela de tests por defecto, con workers configurables", en: "Parallel test execution by default, with configurable workers" } },
      { id: "c", text: { es: "Soporta más lenguajes de programación que Selenium", en: "Supports more programming languages than Selenium" } },
      { id: "d", text: { es: "Interceptación y mockeo de peticiones de red de forma nativa", en: "Native network request interception and mocking" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "Selenium SÍ soporta más lenguajes que Playwright (Java, C#, Ruby, Python, JS, etc., contra JS/TS/Python/Java/.NET de Playwright), así que esa opción es falsa. Las otras tres — auto-waiting, paralelismo nativo y network interception — son ventajas reales y documentadas de Playwright sobre Selenium.",
      en: "Selenium DOES support more languages than Playwright (Java, C#, Ruby, Python, JS, etc., vs. Playwright's JS/TS/Python/Java/.NET), so that option is false. The other three — auto-waiting, native parallelism, and network interception — are real, documented Playwright advantages over Selenium.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m2-m2",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "¿En qué orden se ejecutan los hooks y tests en este bloque `describe`?",
      en: "In what order do the hooks and tests run in this `describe` block?",
    },
    codeSnippet: `test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    console.log('setup');
  });

  test.afterEach(async ({ page }) => {
    console.log('cleanup');
  });

  test('test A', async ({ page }) => {
    console.log('A');
  });

  test('test B', async ({ page }) => {
    console.log('B');
  });
});`,
    options: [
      { id: "a", text: { es: "setup, A, B, cleanup", en: "setup, A, B, cleanup" } },
      { id: "b", text: { es: "setup, A, cleanup, setup, B, cleanup", en: "setup, A, cleanup, setup, B, cleanup" } },
      { id: "c", text: { es: "A, B, setup, cleanup", en: "A, B, setup, cleanup" } },
      { id: "d", text: { es: "setup, cleanup, A, B", en: "setup, cleanup, A, B" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`beforeEach` y `afterEach` se ejecutan ANTES y DESPUÉS de CADA test individual, no una sola vez por bloque. Por eso el orden es: setup → A → cleanup → setup → B → cleanup. Si fueran `beforeAll`/`afterAll`, solo se ejecutarían una vez (antes del primer test y después del último).",
      en: "`beforeEach` and `afterEach` run BEFORE and AFTER EACH individual test, not once per block. That's why the order is: setup → A → cleanup → setup → B → cleanup. If these were `beforeAll`/`afterAll`, they would only run once (before the first test and after the last).",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m2-m3",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "Un equipo necesita asegurar que su aplicación funciona correctamente en Safari para usuarios de iPhone, pero solo prueban en Chromium. ¿Qué riesgo corren?",
      en: "A team needs to ensure their app works correctly in Safari for iPhone users, but they only test on Chromium. What risk are they taking?",
    },
    options: [
      { id: "a", text: { es: "Ninguno, todos los navegadores renderizan CSS y JS de forma idéntica", en: "None, all browsers render CSS and JS identically" } },
      { id: "b", text: { es: "Bugs específicos de WebKit (motor de Safari) en CSS o JS pasarán desapercibidos hasta producción", en: "WebKit-specific (Safari engine) CSS or JS bugs will go unnoticed until production" } },
      { id: "c", text: { es: "Los tests en Chromium tardarán más tiempo en ejecutarse", en: "Chromium tests will take longer to run" } },
      { id: "d", text: { es: "Playwright no permite configurar el proyecto webkit junto con chromium", en: "Playwright doesn't allow configuring a webkit project alongside chromium" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "WebKit tiene diferencias sutiles en cómo renderiza CSS, maneja JavaScript y soporta APIs web respecto a Chromium. Si la app tiene usuarios de iPhone/Mac y solo se prueba en Chromium, bugs exclusivos de Safari pueden llegar a producción sin detectarse. Playwright permite definir múltiples `projects` (chromium, firefox, webkit) que se ejecutan en paralelo precisamente para evitar este riesgo.",
      en: "WebKit has subtle differences from Chromium in how it renders CSS, handles JavaScript, and supports web APIs. If the app has iPhone/Mac users and is only tested on Chromium, Safari-exclusive bugs can reach production undetected. Playwright lets you define multiple `projects` (chromium, firefox, webkit) that run in parallel precisely to avoid this risk.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m2-m4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M2],
    question: {
      es: "¿Qué hace `test.only('debug this test', ...)` cuando se ejecuta `npx playwright test`?",
      en: "What does `test.only('debug this test', ...)` do when running `npx playwright test`?",
    },
    options: [
      { id: "a", text: { es: "Marca el test como saltado (skip)", en: "Marks the test as skipped" } },
      { id: "b", text: { es: "Ejecuta SOLO ese test, ignorando todos los demás en la ejecución", en: "Runs ONLY that test, ignoring all others in the run" } },
      { id: "c", text: { es: "Ejecuta ese test en todos los navegadores configurados, dos veces", en: "Runs that test on all configured browsers, twice" } },
      { id: "d", text: { es: "Marca el test como pendiente de arreglar (fixme)", en: "Marks the test as pending fix (fixme)" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`test.only()` es una anotación que indica a Playwright que ejecute ÚNICAMENTE ese test (o ese bloque), ignorando el resto de la suite. Es muy útil durante la depuración, pero peligroso si se olvida en el código antes de un commit, porque silenciosamente deja de ejecutar el resto de los tests.",
      en: "`test.only()` is an annotation that tells Playwright to run ONLY that test (or block), ignoring the rest of the suite. It's very useful during debugging, but dangerous if left in the code before a commit, because it silently stops running the rest of the tests.",
    },
    points: 2,
    timeEstimateSeconds: 35,
  },

  /* ================================================================== */
  /*  HARD (3 questions)                                                 */
  /* ================================================================== */

  {
    id: "m2-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M2],
    question: {
      es: "Dos tests usan `browser.newContext()` para iniciar sesión con roles distintos (admin y usuario regular) y se ejecutan en paralelo. ¿Qué garantiza Playwright sobre su aislamiento?",
      en: "Two tests use `browser.newContext()` to log in with different roles (admin and regular user) and run in parallel. What does Playwright guarantee about their isolation?",
    },
    codeSnippet: `test('context A: logged in as admin', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/login');
  // ... login as admin
  await context.close();
});

test('context B: logged in as user', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/login');
  // ... login as regular user
  await context.close();
});`,
    options: [
      { id: "a", text: { es: "Comparten cookies y localStorage porque usan el mismo `browser`, por lo que un test podría heredar la sesión del otro", en: "They share cookies and localStorage because they use the same `browser`, so one test could inherit the other's session" } },
      { id: "b", text: { es: "Cada contexto es un perfil de navegador completamente aislado (sin cookies, localStorage ni sesión compartida), por lo que ambos tests pueden ejecutarse en paralelo sin interferir", en: "Each context is a completely isolated browser profile (no shared cookies, localStorage, or session), so both tests can run in parallel without interfering" } },
      { id: "c", text: { es: "Playwright fuerza a que se ejecuten en serie aunque estén en paralelo, para evitar condiciones de carrera", en: "Playwright forces them to run serially even though they're parallel, to avoid race conditions" } },
      { id: "d", text: { es: "El segundo `newContext()` sobrescribe el primero, dejando solo el usuario regular logueado", en: "The second `newContext()` overwrites the first, leaving only the regular user logged in" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Aunque ambos contextos provienen del mismo `browser` (el navegador en sí, que solo gestiona procesos), cada `browser.newContext()` crea un perfil completamente independiente: sin cookies, localStorage, sesiones ni estado compartido entre contextos. Esto es justamente lo que permite que ambos tests se ejecuten en paralelo sin que la sesión de admin contamine la del usuario regular, ni viceversa.",
      en: "Although both contexts come from the same `browser` (the browser process itself, which just manages processes), each `browser.newContext()` creates a fully independent profile: no cookies, localStorage, sessions, or state shared between contexts. This is exactly what allows both tests to run in parallel without the admin session contaminating the regular user's session, or vice versa.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
  {
    id: "m2-h2",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: [M2],
    question: {
      es: "Un test pasa siempre en local con `--headed` pero falla intermitentemente en el pipeline de CI, que usa headless con 4 workers en paralelo sobre los 3 proyectos de navegador (chromium, firefox, webkit). ¿Cuál es la explicación MÁS probable, asumiendo que el test no tiene `slowMo` ni `--debug` en ningún entorno?",
      en: "A test always passes locally with `--headed` but fails intermittently in the CI pipeline, which runs headless with 4 workers in parallel across 3 browser projects (chromium, firefox, webkit). What is the MOST likely explanation, assuming the test has no `slowMo` or `--debug` in either environment?",
    },
    options: [
      { id: "a", text: { es: "El modo headless es inherentemente menos fiable que headed y produce fallos aleatorios", en: "Headless mode is inherently less reliable than headed and produces random failures" } },
      { id: "b", text: { es: "El test probablemente depende de timing o de un selector poco específico que 'funciona por casualidad' en local; en CI, con más carga de CPU/red por los workers paralelos y diferencias entre motores, esas condiciones de carrera se manifiestan", en: "The test likely depends on timing or a non-specific selector that 'happens to work' locally; in CI, with more CPU/network load from parallel workers and engine differences, those race conditions surface" } },
      { id: "c", text: { es: "Firefox y WebKit no soportan auto-waiting, así que cualquier test que pase en Chromium fallará en ellos", en: "Firefox and WebKit don't support auto-waiting, so any test that passes on Chromium will fail on them" } },
      { id: "d", text: { es: "Los workers paralelos comparten el mismo Browser Context, así que se pisan entre sí", en: "Parallel workers share the same Browser Context, so they step on each other" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Headless en sí mismo no es 'menos fiable' (opción a, falsa); Firefox y WebKit SÍ soportan auto-waiting igual que Chromium (opción c, falsa); y cada test/worker recibe su propio Browser Context aislado, no lo comparten (opción d, falsa). La causa más probable es un test 'flaky': algo que dependía de timing favorable o un locator ambiguo que en local, con menos carga y un solo navegador, casualmente funcionaba, pero en CI —con más contención de recursos por el paralelismo y posibles diferencias de renderizado entre motores— la condición de carrera se hace visible.",
      en: "Headless itself is not 'less reliable' (option a, false); Firefox and WebKit DO support auto-waiting just like Chromium (option c, false); and each test/worker gets its own isolated Browser Context, they don't share one (option d, false). The most likely cause is a flaky test: something that depended on favorable timing or an ambiguous locator that happened to work locally with less load and a single browser, but in CI — with more resource contention from parallelism and possible rendering differences across engines — the race condition becomes visible.",
    },
    points: 3,
    timeEstimateSeconds: 80,
  },
  {
    id: "m2-h3",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M2],
    question: {
      es: "Quieres que el proyecto `webkit` de tu `playwright.config.ts` use el dispositivo emulado de Safari de escritorio, igual que Chromium usa Chrome y Firefox usa Firefox. ¿Qué valor debe reemplazar `_____`?",
      en: "You want the `webkit` project in your `playwright.config.ts` to use the emulated desktop Safari device, just like Chromium uses Chrome and Firefox uses Firefox. What value should replace `_____`?",
    },
    codeSnippet: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices[_____] } },
  ],
});`,
    options: [
      { id: "a", text: { es: "'Desktop WebKit'", en: "'Desktop WebKit'" } },
      { id: "b", text: { es: "'Desktop Safari'", en: "'Desktop Safari'" } },
      { id: "c", text: { es: "'Safari Desktop'", en: "'Safari Desktop'" } },
      { id: "d", text: { es: "'Apple Desktop'", en: "'Apple Desktop'" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El catálogo `devices` de Playwright nombra las entradas de escritorio por el navegador que el usuario final reconoce, no por el motor de renderizado interno. Por eso es `devices['Desktop Safari']` — aunque el proyecto se llame `webkit` y el motor sea WebKit, el dispositivo emulado se identifica como 'Desktop Safari', igual que `devices['Desktop Chrome']` se usa para el proyecto chromium.",
      en: "Playwright's `devices` catalog names desktop entries after the end-user-facing browser, not the internal rendering engine. That's why it's `devices['Desktop Safari']` — even though the project is named `webkit` and the engine is WebKit, the emulated device is identified as 'Desktop Safari', just like `devices['Desktop Chrome']` is used for the chromium project.",
    },
    points: 3,
    timeEstimateSeconds: 65,
  },

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
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
