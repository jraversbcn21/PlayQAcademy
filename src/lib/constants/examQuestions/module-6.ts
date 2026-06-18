/**
 * Exam question bank — Module 6: Configuration and Environments.
 *
 * 25 questions (10 easy, 10 medium, 5 hard) covering:
 *   - playwright.config.ts deep dive: timeout vs expect.timeout, retries, workers, reporter
 *   - Multiple projects (browsers + devices): chromium/firefox/webkit + mobile emulation
 *   - Environment variables in tests: process.env, .gitignore, assertEnv() fail-fast validation
 *   - Practical exercise: multi-browser configuration skeleton with TODOs
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M6 = "m6-configuration-environments";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (10 questions)                                                */
  /* ================================================================== */

  {
    id: "m6-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "¿Qué función de Playwright se usa para definir `playwright.config.ts` y por qué se recomienda siempre usarla?",
      en: "Which Playwright function is used to define `playwright.config.ts`, and why is it always recommended?",
    },
    options: [
      { id: "a", text: { es: "`createConfig()`, porque genera el archivo automáticamente", en: "`createConfig()`, because it generates the file automatically" } },
      { id: "b", text: { es: "`defineConfig()`, porque da autocompletado en el IDE y verificación de tipos sobre cada opción", en: "`defineConfig()`, because it gives IDE autocomplete and type checking on every option" } },
      { id: "c", text: { es: "`setup()`, porque es la única forma de exportar configuración por defecto", en: "`setup()`, because it's the only way to export a default configuration" } },
      { id: "d", text: { es: "No hace falta ninguna función especial: un objeto plano exportado por defecto es equivalente", en: "No special function is needed: a plain object exported by default is equivalent" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`defineConfig()` envuelve el objeto de configuración dándole autocompletado en el IDE (Ctrl+Space muestra todas las opciones válidas) y verificación de tipos (si pones un string donde va un número, `tsc` lo rechaza). Sin ella, pierdes ambas garantías y los errores de configuración solo aparecen al ejecutar los tests, no al escribir el código.",
      en: "`defineConfig()` wraps the configuration object, giving it IDE autocomplete (Ctrl+Space shows all valid options) and type checking (if you put a string where a number belongs, `tsc` rejects it). Without it, you lose both guarantees and configuration errors only surface when running tests, not while writing the code.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m6-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "El `timeout` de nivel superior en `playwright.config.ts` cubre el tiempo total de un test, incluyendo los hooks `beforeEach` y `afterEach`.",
      en: "The top-level `timeout` in `playwright.config.ts` covers the total time of a test, including the `beforeEach` and `afterEach` hooks.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El `timeout` mide desde que arranca el primer hook hasta que termina el último: `beforeEach` + cuerpo del test + `afterEach`. Si el `beforeEach` consume la mayor parte del tiempo, el cuerpo del test se queda con muy poco margen antes de que el test completo falle por timeout.",
      en: "Correct. `timeout` measures from when the first hook starts to when the last one finishes: `beforeEach` + test body + `afterEach`. If `beforeEach` consumes most of the time, the test body is left with very little margin before the whole test fails due to timeout.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m6-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "¿Qué controla `expect.timeout` en la configuración, a diferencia del `timeout` de nivel superior?",
      en: "What does `expect.timeout` control in the configuration, unlike the top-level `timeout`?",
    },
    options: [
      { id: "a", text: { es: "El tiempo máximo de TODO el test, incluyendo hooks", en: "The maximum time for the ENTIRE test, including hooks" } },
      { id: "b", text: { es: "El tiempo máximo que Playwright reintenta CADA aserción `expect()` individual, con su propio temporizador desde cero", en: "The maximum time Playwright retries EACH individual `expect()` assertion, with its own timer starting from zero" } },
      { id: "c", text: { es: "El tiempo máximo que tarda en arrancar el navegador", en: "The maximum time it takes for the browser to launch" } },
      { id: "d", text: { es: "El tiempo máximo de espera entre reintentos del test completo", en: "The maximum wait time between retries of the entire test" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`expect.timeout` es independiente y por aserción: cada `expect()` reinicia su propio contador desde cero (por defecto 5 segundos) para reintentar la condición hasta que se cumpla o expire. No depende de cuánto tiempo ya consumieron los hooks ni otras aserciones anteriores.",
      en: "`expect.timeout` is independent and per assertion: each `expect()` restarts its own counter from zero (5 seconds by default) to retry the condition until it's met or expires. It doesn't depend on how much time the hooks or previous assertions already consumed.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m6-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "¿Cuál es la configuración típica de `retries` recomendada en el módulo para local vs CI?",
      en: "What is the typical `retries` configuration recommended in the module for local vs CI?",
    },
    options: [
      { id: "a", text: { es: "Siempre 2 reintentos, sin importar el entorno", en: "Always 2 retries, regardless of the environment" } },
      { id: "b", text: { es: "0 reintentos en local (para detectar y depurar fallos rápido) y más reintentos en CI (donde el entorno puede ser más lento o inestable)", en: "0 retries locally (to detect and debug failures quickly) and more retries on CI (where the environment can be slower or flakier)" } },
      { id: "c", text: { es: "0 reintentos en CI y varios en local", en: "0 retries on CI and several locally" } },
      { id: "d", text: { es: "Los reintentos no se configuran en playwright.config.ts, solo por línea de comandos", en: "Retries can't be configured in playwright.config.ts, only via the command line" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El patrón típico es `retries: process.env.CI ? 4 : 0` (o un valor similar mayor que 0 en CI). En local quieres ver el fallo inmediatamente para depurarlo; en CI, donde el servidor puede estar más lento o haber inestabilidad de red, los reintentos absorben fallos transitorios sin bloquear el pipeline.",
      en: "The typical pattern is `retries: process.env.CI ? 4 : 0` (or a similar value greater than 0 on CI). Locally you want to see the failure immediately to debug it; on CI, where the server may be slower or there may be network flakiness, retries absorb transient failures without blocking the pipeline.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m6-e5",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "El array `projects` en `playwright.config.ts` permite definir perfiles de ejecución independientes, como navegadores distintos o dispositivos móviles emulados.",
      en: "The `projects` array in `playwright.config.ts` lets you define independent execution profiles, such as different browsers or emulated mobile devices.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Cada entrada de `projects` es un perfil de ejecución independiente con su propio `name` y bloque `use`. Definir varios proyectos (chromium, firefox, webkit, dispositivos móviles) permite ejecutar toda la suite en múltiples configuraciones con un solo comando `npx playwright test`.",
      en: "Correct. Each `projects` entry is an independent execution profile with its own `name` and `use` block. Defining multiple projects (chromium, firefox, webkit, mobile devices) lets you run the entire suite across multiple configurations with a single `npx playwright test` command.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m6-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "¿Qué utilidad de Playwright se importa junto a `defineConfig` para configurar fácilmente la emulación de dispositivos móviles?",
      en: "What Playwright utility is imported alongside `defineConfig` to easily configure mobile device emulation?",
    },
    options: [
      { id: "a", text: { es: "`devices`, que contiene presets con viewport, user-agent y capacidades de dispositivos reales", en: "`devices`, which contains presets with viewport, user-agent, and capabilities of real devices" } },
      { id: "b", text: { es: "`mobile`, que activa un modo genérico de emulación táctil", en: "`mobile`, which enables a generic touch-emulation mode" } },
      { id: "c", text: { es: "`browsers`, que lista los navegadores instalados", en: "`browsers`, which lists installed browsers" } },
      { id: "d", text: { es: "`viewport`, que solo ajusta el tamaño de pantalla sin cambiar el user-agent", en: "`viewport`, which only adjusts screen size without changing the user-agent" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`devices` se importa de `@playwright/test` junto a `defineConfig` y ofrece docenas de presets (`devices['Pixel 5']`, `devices['iPhone 13']`, `devices['Desktop Chrome']`, etc.), cada uno con el viewport, user-agent y capacidades correctas configuradas automáticamente al hacer spread (`...devices['Pixel 5']`) dentro del bloque `use` de un proyecto.",
      en: "`devices` is imported from `@playwright/test` alongside `defineConfig` and offers dozens of presets (`devices['Pixel 5']`, `devices['iPhone 13']`, `devices['Desktop Chrome']`, etc.), each with the correct viewport, user-agent, and capabilities configured automatically when spread (`...devices['Pixel 5']`) inside a project's `use` block.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m6-e7",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "Según el módulo, los archivos `.env.local` deben añadirse a `.gitignore` y nunca commitearse, porque pueden contener secretos reales.",
      en: "According to the module, `.env.local` files should be added to `.gitignore` and never committed, because they may contain real secrets.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El módulo es enfático: `.env*.local` debe estar en `.gitignore` SIEMPRE. Un archivo con secretos commiteado a Git queda en el historial para siempre, incluso si luego se elimina del repositorio — la única solución real ante una filtración es rotar las credenciales.",
      en: "Correct. The module is emphatic: `.env*.local` must ALWAYS be in `.gitignore`. A file with secrets committed to Git stays in history forever, even if it's later removed from the repository — the only real fix after a leak is rotating the credentials.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m6-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "¿Cómo se leen las URLs, credenciales o configuraciones sensibles dentro de un test, según el patrón profesional enseñado en el módulo?",
      en: "How are URLs, credentials, or sensitive configuration values read inside a test, according to the professional pattern taught in the module?",
    },
    options: [
      { id: "a", text: { es: "Hardcodeadas directamente en el test, ya que es más rápido de escribir", en: "Hardcoded directly in the test, since it's faster to write" } },
      { id: "b", text: { es: "Desde `process.env`, leyendo variables de entorno en lugar de valores fijos en el código fuente", en: "From `process.env`, reading environment variables instead of fixed values in the source code" } },
      { id: "c", text: { es: "Desde un archivo JSON commiteado al repositorio con todas las credenciales", en: "From a JSON file committed to the repository with all the credentials" } },
      { id: "d", text: { es: "Pidiéndolas por consola cada vez que se ejecuta un test", en: "By prompting for them via the console every time a test runs" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El patrón profesional lee `process.env.NOMBRE_VARIABLE` en lugar de hardcodear valores. Esto desacopla el código fuente (que se commitea) de los valores sensibles (que viven en `.env.local` o en secretos de CI), evitando que credenciales reales terminen en el historial de Git.",
      en: "The professional pattern reads `process.env.VARIABLE_NAME` instead of hardcoding values. This decouples the source code (which gets committed) from sensitive values (which live in `.env.local` or CI secrets), preventing real credentials from ending up in Git history.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m6-e9",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "Dejar un comentario como `// TODO: mover esta contraseña a .env` junto a una credencial hardcodeada es una práctica aceptable según el módulo, siempre que se complete eventualmente.",
      en: "Leaving a comment like `// TODO: move this password to .env` next to a hardcoded credential is an acceptable practice according to the module, as long as it's eventually completed.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. El módulo señala explícitamente que un 'TODO: mover a .env' nunca se completa en la práctica, y mientras tanto la credencial queda expuesta en el código fuente y en el historial de Git desde el primer commit. La corrección debe hacerse de inmediato, no diferirse.",
      en: "False. The module explicitly points out that a 'TODO: move to .env' is never actually completed in practice, and in the meantime the credential remains exposed in the source code and in Git history from the very first commit. The fix must happen immediately, not be deferred.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m6-e10",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M6],
    question: {
      es: "En el ejercicio práctico del módulo, ¿qué tres proyectos de navegador de escritorio se deben configurar como mínimo?",
      en: "In the module's practical exercise, which three desktop browser projects must be configured at minimum?",
    },
    options: [
      { id: "a", text: { es: "chrome, edge, opera", en: "chrome, edge, opera" } },
      { id: "b", text: { es: "chromium, firefox, webkit", en: "chromium, firefox, webkit" } },
      { id: "c", text: { es: "ie11, chrome, safari", en: "ie11, chrome, safari" } },
      { id: "d", text: { es: "desktop1, desktop2, desktop3", en: "desktop1, desktop2, desktop3" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El ejercicio pide configurar tres proyectos de navegador de escritorio (chromium, firefox, webkit) usando `devices['Desktop Chrome']`, `devices['Desktop Firefox']` y `devices['Desktop Safari']` respectivamente, además de dos proyectos móviles (Mobile Chrome con Pixel 5, Mobile Safari con iPhone 13).",
      en: "The exercise asks to configure three desktop browser projects (chromium, firefox, webkit) using `devices['Desktop Chrome']`, `devices['Desktop Firefox']`, and `devices['Desktop Safari']` respectively, plus two mobile projects (Mobile Chrome with Pixel 5, Mobile Safari with iPhone 13).",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },

  /* ================================================================== */
  /*  MEDIUM (10 questions)                                              */
  /* ================================================================== */

  {
    id: "m6-m1",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "Dado este fragmento de configuración, si el `beforeEach` tarda 8 segundos, ¿cuánto tiempo le queda al cuerpo del test (incluyendo el `afterEach`) antes de que el test falle por timeout?",
      en: "Given this configuration snippet, if `beforeEach` takes 8 seconds, how much time is left for the test body (including `afterEach`) before the test fails due to timeout?",
    },
    codeSnippet: `export default defineConfig({
  timeout: 10_000, // 10 seconds
  expect: {
    timeout: 5_000, // 5 seconds
  },
});`,
    options: [
      { id: "a", text: { es: "10 segundos completos, porque expect.timeout es el que cuenta para los hooks", en: "A full 10 seconds, because expect.timeout is what counts for hooks" } },
      { id: "b", text: { es: "2 segundos, porque el timeout de 10s cubre TODO el test incluyendo beforeEach + cuerpo + afterEach", en: "2 seconds, because the 10s timeout covers the ENTIRE test including beforeEach + body + afterEach" } },
      { id: "c", text: { es: "5 segundos, porque expect.timeout sustituye al timeout general una vez que arranca el cuerpo del test", en: "5 seconds, because expect.timeout replaces the general timeout once the test body starts" } },
      { id: "d", text: { es: "Ilimitado, porque los hooks no cuentan dentro del timeout del test", en: "Unlimited, because hooks don't count toward the test's timeout" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El `timeout` de 10_000 ms cubre el test completo: `beforeEach` + cuerpo + `afterEach`. Si `beforeEach` consume 8 de esos 10 segundos, solo quedan 2 segundos para que el cuerpo del test (y cualquier `afterEach`) se ejecuten antes de que Playwright marque el test como fallido por timeout. `expect.timeout` es un concepto distinto: gobierna cuánto reintenta CADA `expect()` individualmente, no sustituye ni se suma al timeout general.",
      en: "The 10_000 ms `timeout` covers the entire test: `beforeEach` + body + `afterEach`. If `beforeEach` consumes 8 of those 10 seconds, only 2 seconds remain for the test body (and any `afterEach`) to run before Playwright marks the test as failed due to timeout. `expect.timeout` is a separate concept: it governs how long EACH `expect()` retries individually, it doesn't replace or add to the overall timeout.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m6-m2",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Por qué CI suele configurarse con MENOS `workers` que en local, a pesar de que más workers significa más paralelismo?",
      en: "Why is CI usually configured with FEWER `workers` than locally, even though more workers means more parallelism?",
    },
    options: [
      { id: "a", text: { es: "Porque Playwright no soporta más de 2 workers en entornos Linux", en: "Because Playwright doesn't support more than 2 workers on Linux environments" } },
      { id: "b", text: { es: "Porque los runners de CI suelen tener recursos de CPU/memoria limitados, y demasiado paralelismo puede causar inestabilidad (tests flaky) o saturar el servidor bajo prueba", en: "Because CI runners often have limited CPU/memory resources, and too much parallelism can cause instability (flaky tests) or overload the server under test" } },
      { id: "c", text: { es: "Porque en CI los workers cuestan dinero por separado y hay que minimizarlos siempre", en: "Because in CI, workers cost extra money individually and must always be minimised" } },
      { id: "d", text: { es: "No hay ninguna razón técnica: es solo una convención arbitraria sin impacto real", en: "There's no technical reason: it's just an arbitrary convention with no real impact" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Los runners de CI suelen tener menos núcleos de CPU y memoria disponible que una máquina de desarrollo local. Ejecutar demasiados workers en paralelo sobre recursos limitados compite por CPU, ralentiza cada test individual, y puede sobrecargar el servidor bajo prueba (si corre en el mismo runner), generando timeouts y fallos intermitentes (flakiness) que no reflejan bugs reales.",
      en: "CI runners typically have fewer CPU cores and less available memory than a local development machine. Running too many workers in parallel over limited resources competes for CPU, slows down each individual test, and can overload the server under test (if it runs on the same runner), causing timeouts and intermittent failures (flakiness) that don't reflect real bugs.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m6-m3",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Qué hace exactamente esta configuración del bloque `use` cuando un test pasa sin fallos?",
      en: "What exactly does this `use` block configuration do when a test passes without failures?",
    },
    codeSnippet: `use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},`,
    options: [
      { id: "a", text: { es: "Genera trace, screenshot y video de todos modos, pero los borra al final si el test pasó", en: "It generates trace, screenshot, and video regardless, but deletes them at the end if the test passed" } },
      { id: "b", text: { es: "No genera trace, screenshot ni video — estos artefactos solo se capturan si el test falla (o, en el caso de trace, en el primer reintento)", en: "It generates no trace, screenshot, or video — these artifacts are only captured if the test fails (or, in trace's case, on the first retry)" } },
      { id: "c", text: { es: "Genera solo el video, porque trace y screenshot requieren configuración adicional para activarse", en: "It only generates the video, because trace and screenshot require additional configuration to activate" } },
      { id: "d", text: { es: "Lanza un error porque estos tres valores no pueden combinarse", en: "It throws an error because these three values can't be combined" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Estos tres valores ('on-first-retry', 'only-on-failure', 'retain-on-failure') están diseñados para tener costo CERO cuando los tests pasan. `trace: 'on-first-retry'` solo grava si el test se reintenta (lo cual implica que falló al menos una vez); `screenshot: 'only-on-failure'` y `video: 'retain-on-failure'` solo capturan/conservan artefactos cuando el test efectivamente falla. En un test exitoso sin reintentos, no se genera ninguno de los tres.",
      en: "These three values ('on-first-retry', 'only-on-failure', 'retain-on-failure') are designed to have ZERO cost when tests pass. `trace: 'on-first-retry'` only records if the test is retried (which implies it failed at least once); `screenshot: 'only-on-failure'` and `video: 'retain-on-failure'` only capture/keep artifacts when the test actually fails. In a successful test with no retries, none of the three are generated.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m6-m4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Qué hace `forbidOnly: !!process.env.CI` en `playwright.config.ts`?",
      en: "What does `forbidOnly: !!process.env.CI` do in `playwright.config.ts`?",
    },
    options: [
      { id: "a", text: { es: "Prohíbe ejecutar tests en CI por completo", en: "It forbids running tests on CI entirely" } },
      { id: "b", text: { es: "En CI, hace que la ejecución falle si algún test quedó marcado con test.only(), evitando que se mergee código que solo corre un subconjunto de tests por accidente", en: "On CI, it makes the run fail if any test was left marked with test.only(), preventing accidentally merging code that only runs a subset of tests" } },
      { id: "c", text: { es: "Bloquea el uso de test.skip() en cualquier entorno", en: "It blocks the use of test.skip() in any environment" } },
      { id: "d", text: { es: "Convierte automáticamente todos los test.only() en test() normales", en: "It automatically converts every test.only() into a regular test()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`!!process.env.CI` evalúa a `true` solo cuando se ejecuta en CI (donde la variable `CI` suele estar definida automáticamente). Con `forbidOnly: true` en ese contexto, si algún desarrollador olvidó quitar un `test.only()` antes de hacer push, la ejecución en CI falla explícitamente en vez de ejecutar silenciosamente solo ese test y dar una falsa sensación de que toda la suite pasó.",
      en: "`!!process.env.CI` evaluates to `true` only when running on CI (where the `CI` variable is usually set automatically). With `forbidOnly: true` in that context, if a developer forgot to remove a `test.only()` before pushing, the CI run explicitly fails instead of silently running just that test and giving a false impression that the whole suite passed.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m6-m5",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Cuáles de las siguientes afirmaciones sobre el patrón `assertEnv()` enseñado en el módulo son correctas? (Selecciona todas las correctas)",
      en: "Which of the following statements about the `assertEnv()` pattern taught in the module are correct? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Falla al arrancar la configuración si falta alguna variable de entorno requerida, con un mensaje claro listando cuáles faltan", en: "It fails when the configuration starts up if any required environment variable is missing, with a clear message listing which ones are missing" } },
      { id: "b", text: { es: "Implementa el principio de 'fail fast': prefiere un error inmediato y descriptivo a un error críptico minutos después dentro de un test anidado", en: "It implements the 'fail fast' principle: it prefers an immediate, descriptive error over a cryptic error minutes later inside a nested test" } },
      { id: "c", text: { es: "Es una función nativa de Playwright que se importa de @playwright/test", en: "It's a native Playwright function imported from @playwright/test" } },
      { id: "d", text: { es: "Sustituye por completo la necesidad de usar dotenv para cargar archivos .env", en: "It completely replaces the need to use dotenv to load .env files" } },
    ],
    correctOptionIds: ["a", "b"],
    explanation: {
      es: "`assertEnv()` es una función auxiliar escrita por el propio equipo (no nativa de Playwright, c es falsa) que recorre los nombres de variables requeridas y lanza un error inmediato y descriptivo si falta alguna (a), implementando el principio de 'fail fast' (b): es mejor ver 'Required environment variables are missing: BASE_URL' al arrancar que un críptico 'URL is undefined' en el test #47. No sustituye a dotenv (d es falsa): dotenv carga los valores desde `.env` a `process.env`, y assertEnv() valida después que esos valores existan.",
      en: "`assertEnv()` is a helper function written by the team itself (not native to Playwright, c is false) that loops through required variable names and throws an immediate, descriptive error if any is missing (a), implementing the 'fail fast' principle (b): it's better to see 'Required environment variables are missing: BASE_URL' at startup than a cryptic 'URL is undefined' in test #47. It doesn't replace dotenv (d is false): dotenv loads values from `.env` into `process.env`, and assertEnv() then validates those values exist.",
    },
    points: 2,
    timeEstimateSeconds: 65,
  },
  {
    id: "m6-m6",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Qué proyectos genera este fragmento, y qué comando ejecutaría solo el de Safari móvil?",
      en: "What projects does this snippet generate, and what command would run only the mobile Safari one?",
    },
    codeSnippet: `projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
],`,
    options: [
      { id: "a", text: { es: "Dos proyectos: 'chromium' y 'Mobile Safari'. Para ejecutar solo el segundo: npx playwright test --project=\"Mobile Safari\"", en: "Two projects: 'chromium' and 'Mobile Safari'. To run only the second: npx playwright test --project=\"Mobile Safari\"" } },
      { id: "b", text: { es: "Un solo proyecto combinado que ejecuta ambos navegadores en la misma sesión", en: "A single combined project that runs both browsers in the same session" } },
      { id: "c", text: { es: "Dos proyectos, pero no hay forma de ejecutar uno sin el otro", en: "Two projects, but there's no way to run one without the other" } },
      { id: "d", text: { es: "Cero proyectos válidos, porque 'Mobile Safari' no es un nombre reservado por Playwright", en: "Zero valid projects, because 'Mobile Safari' isn't a name reserved by Playwright" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Cada entrada del array `projects` es independiente; aquí hay dos: 'chromium' (emulando Desktop Chrome) y 'Mobile Safari' (emulando un iPhone 13 vía devices). El nombre de un proyecto es una cadena arbitraria elegida por quien escribe la configuración, no una palabra reservada. Para ejecutar solo uno, se usa el flag `--project` con el nombre exacto (entre comillas si contiene espacios): `npx playwright test --project=\"Mobile Safari\"`.",
      en: "Each entry in the `projects` array is independent; here there are two: 'chromium' (emulating Desktop Chrome) and 'Mobile Safari' (emulating an iPhone 13 via devices). A project's name is an arbitrary string chosen by whoever writes the configuration, not a reserved keyword. To run just one, use the `--project` flag with the exact name (quoted if it contains spaces): `npx playwright test --project=\"Mobile Safari\"`.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m6-m7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "Según el módulo, ¿qué diferencia hay entre el archivo `.env` y el archivo `.env.local` en la convención de Playwright/dotenv?",
      en: "According to the module, what's the difference between the `.env` file and the `.env.local` file in the Playwright/dotenv convention?",
    },
    options: [
      { id: "a", text: { es: "Son exactamente iguales y ambos deben commitearse siempre", en: "They are exactly the same and both should always be committed" } },
      { id: "b", text: { es: "`.env` puede contener valores por defecto para desarrollo (sin secretos) y commitearse; `.env.local` contiene overrides y secretos reales, y NUNCA se commitea", en: "`.env` can hold non-secret default development values and be committed; `.env.local` holds overrides and real secrets, and is NEVER committed" } },
      { id: "c", text: { es: "`.env.local` es para producción y `.env` es solo para tests unitarios", en: "`.env.local` is for production and `.env` is only for unit tests" } },
      { id: "d", text: { es: "No existe diferencia funcional: dotenv ignora `.env.local` por defecto", en: "There's no functional difference: dotenv ignores `.env.local` by default" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "La convención que enseña el módulo es: `.env` contiene valores por defecto razonables para desarrollo local que NO son secretos (puede commitearse); `.env.local` contiene overrides locales y credenciales reales y NUNCA se commitea (debe estar en `.gitignore` vía el patrón `.env*.local`). Archivos como `.env.staging` o `.env.production` siguen el mismo principio para sus respectivos entornos.",
      en: "The convention the module teaches is: `.env` holds reasonable default values for local development that are NOT secrets (it can be committed); `.env.local` holds local overrides and real credentials and is NEVER committed (it must be in `.gitignore` via the `.env*.local` pattern). Files like `.env.staging` or `.env.production` follow the same principle for their respective environments.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m6-m8",
    type: "true_false",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "Según el módulo, `import 'dotenv/config'` debe colocarse en la primera línea de `playwright.config.ts`, antes de cualquier referencia a `process.env`.",
      en: "According to the module, `import 'dotenv/config'` should be placed on the very first line of `playwright.config.ts`, before any reference to `process.env`.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. dotenv carga las variables del archivo `.env` hacia `process.env` en el momento en que se ejecuta el import. Si ese import ocurre después de leer `process.env.BASE_URL` (por ejemplo, dentro de `defineConfig()`), esa lectura obtendría `undefined` porque dotenv todavía no había poblado la variable. Por eso debe ser la primera línea del archivo.",
      en: "Correct. dotenv loads the `.env` file's variables into `process.env` at the moment the import executes. If that import happens after reading `process.env.BASE_URL` (for example, inside `defineConfig()`), that read would get `undefined` because dotenv hadn't populated the variable yet. That's why it must be the file's first line.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m6-m9",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Qué problema concreto resuelve `fullyParallel: true` en `playwright.config.ts`?",
      en: "What concrete problem does `fullyParallel: true` solve in `playwright.config.ts`?",
    },
    options: [
      { id: "a", text: { es: "Hace que los tests dentro de un mismo archivo también se ejecuten en paralelo entre sí, en lugar de solo paralelizar entre archivos distintos", en: "It makes tests within the same file also run in parallel with each other, instead of only parallelising across different files" } },
      { id: "b", text: { es: "Permite ejecutar Playwright en más de un sistema operativo simultáneamente", en: "It allows running Playwright on more than one operating system simultaneously" } },
      { id: "c", text: { es: "Aumenta automáticamente el número de reintentos en CI", en: "It automatically increases the number of retries on CI" } },
      { id: "d", text: { es: "Activa la captura de video y trace en todos los tests, no solo en los fallidos", en: "It enables video and trace capture for all tests, not just failed ones" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Por defecto, Playwright ya paraleliza distintos archivos de test entre sí, pero los tests DENTRO de un mismo archivo se ejecutan en serie. `fullyParallel: true` extiende el paralelismo también a los tests de un mismo archivo, cada uno en su propio worker, maximizando la velocidad de la suite cuando los tests son independientes entre sí.",
      en: "By default, Playwright already parallelises different test files against each other, but tests WITHIN the same file run serially. `fullyParallel: true` extends parallelism to tests within the same file as well, each in its own worker, maximising suite speed when tests are independent of each other.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m6-m10",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M6],
    question: {
      es: "¿Qué hace exactamente esta línea dentro del bloque `use`, y qué pasa si `BASE_URL` no está definida en el entorno?",
      en: "What does this line inside the `use` block do exactly, and what happens if `BASE_URL` isn't defined in the environment?",
    },
    codeSnippet: `use: {
  baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
},`,
    options: [
      { id: "a", text: { es: "Lanza un error inmediatamente si BASE_URL no está definida", en: "It throws an error immediately if BASE_URL isn't defined" } },
      { id: "b", text: { es: "Usa el valor de la variable de entorno BASE_URL si existe; si es undefined o null, recurre al fallback 'http://localhost:3000'", en: "It uses the BASE_URL environment variable's value if it exists; if it's undefined or null, it falls back to 'http://localhost:3000'" } },
      { id: "c", text: { es: "Ignora process.env.BASE_URL siempre y usa el literal 'http://localhost:3000'", en: "It always ignores process.env.BASE_URL and uses the literal 'http://localhost:3000'" } },
      { id: "d", text: { es: "Concatena ambos valores en una sola URL", en: "It concatenates both values into a single URL" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El operador `??` (nullish coalescing) evalúa el operando izquierdo; si es `undefined` o `null`, usa el derecho. Aquí, si `BASE_URL` está definida en el entorno, `baseURL` toma ese valor; si no está definida, usa el fallback `'http://localhost:3000'` para que el desarrollo local funcione sin configuración adicional. A diferencia de `assertEnv()`, este patrón NO falla si la variable falta — simplemente usa un valor por defecto sensato.",
      en: "The `??` (nullish coalescing) operator evaluates the left operand; if it's `undefined` or `null`, it uses the right one. Here, if `BASE_URL` is defined in the environment, `baseURL` takes that value; if it isn't defined, it uses the `'http://localhost:3000'` fallback so local development works without extra configuration. Unlike `assertEnv()`, this pattern does NOT fail if the variable is missing — it simply uses a sensible default.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },

  /* ================================================================== */
  /*  HARD (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m6-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M6],
    question: {
      es: "Esta configuración tiene un defecto que afectará específicamente a la ejecución en CI. ¿Cuál es, y por qué?",
      en: "This configuration has a flaw that will specifically affect CI execution. What is it, and why?",
    },
    codeSnippet: `export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 2,
  workers: undefined,

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});`,
    options: [
      { id: "a", text: { es: "No hay ningún defecto: esta configuración es idéntica en CI y en local", en: "There's no flaw at all: this configuration is identical on CI and locally" } },
      { id: "b", text: { es: "`retries: 2` está fijo en lugar de condicionado a `process.env.CI`, así que en local también se reintentará 2 veces antes de ver el fallo real, ralentizando el feedback de depuración; y `baseURL` hardcodeada a localhost rompe la ejecución contra staging/CI si el servidor no corre en esa misma máquina", en: "`retries: 2` is fixed instead of conditioned on `process.env.CI`, so locally it will also retry twice before showing the real failure, slowing down debugging feedback; and `baseURL` hardcoded to localhost breaks execution against staging/CI if the server doesn't run on that same machine" } },
      { id: "c", text: { es: "El problema es que fullyParallel debería ser false en cualquier entorno", en: "The problem is that fullyParallel should be false in any environment" } },
      { id: "d", text: { es: "trace: 'on-first-retry' no es válido si retries es mayor que 0", en: "trace: 'on-first-retry' isn't valid if retries is greater than 0" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo enseña explícitamente `retries: process.env.CI ? N : 0` para que en local los fallos se vean inmediatamente (depuración rápida) y en CI se absorban fallos transitorios. Con `retries: 2` fijo, en local también se reintenta 2 veces, ocultando temporalmente el fallo real y ralentizando el ciclo de feedback del desarrollador. Además, `baseURL: 'http://localhost:3000'` hardcodeada (sin `process.env.BASE_URL` con fallback) asume que el servidor SIEMPRE corre en localhost, lo que falla en cualquier pipeline de CI o entorno de staging donde la app se sirve desde otra URL.",
      en: "The module explicitly teaches `retries: process.env.CI ? N : 0` so that locally failures show up immediately (fast debugging) and on CI transient failures get absorbed. With a fixed `retries: 2`, locally it also retries twice, temporarily hiding the real failure and slowing the developer's feedback loop. Additionally, the hardcoded `baseURL: 'http://localhost:3000'` (without `process.env.BASE_URL` with a fallback) assumes the server ALWAYS runs on localhost, which breaks in any CI pipeline or staging environment where the app is served from a different URL.",
    },
    points: 3,
    timeEstimateSeconds: 100,
  },
  {
    id: "m6-h2",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M6],
    question: {
      es: "Este test tiene un `beforeEach` que tarda 27 segundos en promedio (carga de datos pesada). ¿Qué pasará con el test al ejecutarse con esta configuración?",
      en: "This test has a `beforeEach` that takes 27 seconds on average (heavy data loading). What will happen to the test when run with this configuration?",
    },
    codeSnippet: `// playwright.config.ts
export default defineConfig({
  timeout: 30_000, // 30 seconds
});

// some.spec.ts
test.beforeEach(async ({ page }) => {
  await seedHeavyTestData(); // takes ~27 seconds
  await page.goto('/dashboard');
});

test('renders dashboard widgets', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page.getByTestId('widget-revenue')).toBeVisible();
  await expect(page.getByTestId('widget-users')).toBeVisible();
});`,
    options: [
      { id: "a", text: { es: "El test siempre pasará, porque expect.timeout (5s por defecto) es independiente del timeout del beforeEach", en: "The test will always pass, because expect.timeout (5s by default) is independent of the beforeEach's timeout" } },
      { id: "b", text: { es: "El test es muy probable que falle por timeout: el beforeEach consume 27 de los 30 segundos disponibles, dejando solo ~3 segundos para tres acciones (goto implícito ya contado) y tres aserciones del cuerpo del test", en: "The test is very likely to fail due to timeout: the beforeEach consumes 27 of the available 30 seconds, leaving only ~3 seconds for the test body's actions and three assertions" } },
      { id: "c", text: { es: "El beforeEach no cuenta para el timeout del test, solo el cuerpo del test mismo", en: "The beforeEach doesn't count toward the test's timeout, only the test body itself" } },
      { id: "d", text: { es: "Playwright extiende automáticamente el timeout si detecta que el beforeEach es lento", en: "Playwright automatically extends the timeout if it detects the beforeEach is slow" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El `timeout` de 30_000 ms cubre TODO: `beforeEach` (incluyendo `seedHeavyTestData()` y `page.goto()`) + el cuerpo del test. Si el `beforeEach` ya consume 27 segundos, solo quedan ~3 segundos para que las tres aserciones del cuerpo se completen — un margen extremadamente ajustado que probablemente cause un fallo por timeout, especialmente si el dashboard tarda en renderizar tras la navegación. La solución correcta sería aumentar el `timeout` global, mover el seeding fuera del `beforeEach` (a un fixture o setup global), u optimizar `seedHeavyTestData()`.",
      en: "The 30_000 ms `timeout` covers EVERYTHING: `beforeEach` (including `seedHeavyTestData()` and `page.goto()`) + the test body. If `beforeEach` already consumes 27 seconds, only ~3 seconds remain for the body's three assertions to complete — an extremely tight margin likely to cause a timeout failure, especially if the dashboard takes time to render after navigation. The correct fix would be increasing the global `timeout`, moving the seeding out of `beforeEach` (into a fixture or global setup), or optimising `seedHeavyTestData()`.",
    },
    points: 3,
    timeEstimateSeconds: 110,
  },
  {
    id: "m6-h3",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M6],
    question: {
      es: "Este test lee una credencial sensible sin validación ni fallback. ¿Cuál es la corrección que mejor sigue el patrón profesional enseñado en el módulo?",
      en: "This test reads a sensitive credential with no validation or fallback. What fix best follows the professional pattern taught in the module?",
    },
    codeSnippet: `test('admin can delete a user', async ({ page, request }) => {
  const apiKey = process.env.ADMIN_API_KEY;

  const response = await request.delete('/api/users/42', {
    headers: { Authorization: \`Bearer \${apiKey}\` },
  });

  expect(response.status()).toBe(204);
});`,
    options: [
      { id: "a", text: { es: "Añadir un fallback hardcodeado: `process.env.ADMIN_API_KEY ?? 'admin-secret-123'`, para que el test nunca falle por falta de configuración", en: "Add a hardcoded fallback: `process.env.ADMIN_API_KEY ?? 'admin-secret-123'`, so the test never fails due to missing configuration" } },
      { id: "b", text: { es: "Validar con assertEnv('ADMIN_API_KEY') al inicio de la config (o un test.skip si no está definida), para fallar rápido con un mensaje claro en lugar de enviar `Bearer undefined` y obtener un fallo de autenticación difícil de diagnosticar", en: "Validate with assertEnv('ADMIN_API_KEY') at config startup (or a test.skip if it's not defined), to fail fast with a clear message instead of sending `Bearer undefined` and getting a hard-to-diagnose authentication failure" } },
      { id: "c", text: { es: "Eliminar la variable de entorno y escribir la API key real directamente en el test para simplificar", en: "Remove the environment variable and write the real API key directly in the test to simplify" } },
      { id: "d", text: { es: "Cambiar request.delete por page.evaluate para evitar el uso de variables de entorno", en: "Change request.delete to page.evaluate to avoid using environment variables" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Si `ADMIN_API_KEY` no está definida, `apiKey` es `undefined`, y el header termina siendo literalmente `Authorization: Bearer undefined`. El servidor probablemente responde con 401/403, y el test falla con un mensaje que no indica la causa real (variable de entorno faltante) — exactamente el escenario que `assertEnv()` previene, fallando inmediatamente al arrancar con un mensaje explícito. La opción (a) es peor que el problema original: hardcodea un secreto falso pero sigue exponiendo el patrón de credenciales en el código, y (c)/(d) ni siquiera abordan el problema real.",
      en: "If `ADMIN_API_KEY` isn't defined, `apiKey` is `undefined`, and the header ends up being literally `Authorization: Bearer undefined`. The server likely responds with 401/403, and the test fails with a message that doesn't indicate the real cause (a missing environment variable) — exactly the scenario `assertEnv()` prevents, by failing immediately at startup with an explicit message. Option (a) is worse than the original problem: it hardcodes a fake secret while still exposing the credential pattern in code, and (c)/(d) don't even address the real issue.",
    },
    points: 3,
    timeEstimateSeconds: 105,
  },
  {
    id: "m6-h4",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M6],
    question: {
      es: "Revisando esta configuración completa, ¿cuáles de las siguientes afirmaciones sobre sus defectos son correctas? (Selecciona todas las correctas)",
      en: "Reviewing this complete configuration, which of the following statements about its flaws are correct? (Select all that apply)",
    },
    codeSnippet: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 8, // (1)

  use: {
    baseURL: process.env.BASE_URL, // (2)
    trace: 'on', // (3)
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});`,
    options: [
      { id: "a", text: { es: "(1) workers: 8 fijo, sin condicionar a CI, puede sobrecargar un runner de CI con pocos núcleos aunque funcione bien en local", en: "(1) A fixed workers: 8, not conditioned on CI, may overload a CI runner with few cores even though it works fine locally" } },
      { id: "b", text: { es: "(2) baseURL lee directamente de process.env.BASE_URL sin fallback ni validación: si la variable no está definida, baseURL será undefined y las navegaciones relativas fallarán de forma confusa", en: "(2) baseURL reads directly from process.env.BASE_URL with no fallback or validation: if the variable isn't defined, baseURL will be undefined and relative navigations will fail confusingly" } },
      { id: "c", text: { es: "(3) trace: 'on' graba la traza de TODOS los tests, pasen o fallen, lo que añade overhead constante en lugar de aprovechar 'on-first-retry' que es gratis cuando todo pasa", en: "(3) trace: 'on' records the trace for ALL tests, whether they pass or fail, adding constant overhead instead of taking advantage of 'on-first-retry' which is free when everything passes" } },
      { id: "d", text: { es: "No hay ningún defecto real: los tres valores son válidos sintácticamente y eso es suficiente para una configuración de producción", en: "There are no real flaws: all three values are syntactically valid and that's sufficient for a production configuration" } },
    ],
    correctOptionIds: ["a", "b", "c"],
    explanation: {
      es: "(a) `workers: 8` fijo no diferencia CI de local; un runner de CI con 2 núcleos ejecutando 8 workers probablemente sufra contención de recursos y tests inestables, mientras que en una máquina local potente podría ser razonable — la solución es condicionarlo, ej. `process.env.CI ? 2 : undefined`. (b) Sin `?? 'http://localhost:3000'` ni `assertEnv('BASE_URL')`, si la variable falta, `baseURL` es `undefined`, y cualquier `page.goto('/ruta')` relativa fallará porque no hay URL base contra la que resolver — un bug silencioso hasta que se ejecuta. (c) `trace: 'on'` grava SIEMPRE, incluso en tests exitosos, lo que añade overhead de disco y CPU en cada ejecución; el módulo enseña `'on-first-retry'` precisamente para evitar este costo cuando los tests pasan. La opción (d) es incorrecta: la validez sintáctica no garantiza una configuración de producción robusta.",
      en: "(a) A fixed `workers: 8` doesn't distinguish CI from local; a CI runner with 2 cores running 8 workers likely suffers resource contention and flaky tests, while it might be reasonable on a powerful local machine — the fix is conditioning it, e.g. `process.env.CI ? 2 : undefined`. (b) Without `?? 'http://localhost:3000'` or `assertEnv('BASE_URL')`, if the variable is missing, `baseURL` is `undefined`, and any relative `page.goto('/path')` will fail because there's no base URL to resolve against — a silent bug until it runs. (c) `trace: 'on'` records ALWAYS, even on successful tests, adding disk and CPU overhead on every run; the module teaches `'on-first-retry'` precisely to avoid this cost when tests pass. Option (d) is incorrect: syntactic validity doesn't guarantee a robust production configuration.",
    },
    points: 3,
    timeEstimateSeconds: 120,
  },
  {
    id: "m6-h5",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M6],
    question: {
      es: "Esta combinación de `fullyParallel` y `workers` en un proyecto con tests que comparten estado mutable global (un contador en una base de datos compartida sin aislamiento), ¿qué problema concreto puede causar?",
      en: "This combination of `fullyParallel` and `workers` in a project whose tests share mutable global state (a counter in a shared database with no isolation) — what concrete problem can it cause?",
    },
    codeSnippet: `export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 4 : undefined,
  // tests in the same file mutate a shared 'orders' counter
  // with no per-test isolation (no unique IDs, no test-scoped DB)
});`,
    options: [
      { id: "a", text: { es: "Ninguno: fullyParallel y workers nunca interactúan con el estado de la aplicación bajo prueba", en: "None: fullyParallel and workers never interact with the application's state under test" } },
      { id: "b", text: { es: "Condiciones de carrera entre tests: al ejecutarse en paralelo (incluso dentro del mismo archivo, por fullyParallel) y mutar el mismo contador compartido sin aislamiento, los tests pueden leerse/sobrescribirse entre sí, produciendo fallos intermitentes (flakiness) que no reflejan bugs reales de la aplicación", en: "Race conditions between tests: running in parallel (even within the same file, due to fullyParallel) and mutating the same shared counter with no isolation, tests can read/overwrite each other, producing intermittent failures (flakiness) that don't reflect real application bugs" } },
      { id: "c", text: { es: "Playwright detecta automáticamente el estado compartido y serializa esos tests sin configuración adicional", en: "Playwright automatically detects shared state and serializes those tests with no additional configuration" } },
      { id: "d", text: { es: "El problema se resolvería simplemente subiendo el número de workers, ya que más paralelismo reduce las colisiones", en: "The problem would be solved simply by increasing the number of workers, since more parallelism reduces collisions" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`fullyParallel: true` hace que incluso los tests de un mismo archivo se ejecuten en paralelo, cada uno potencialmente en un worker distinto. Si esos tests mutan el mismo recurso compartido (un contador, una fila de base de datos) sin aislamiento por test (IDs únicos, transacciones, bases de datos separadas por worker), se generan condiciones de carrera: un test puede leer un valor que otro test está modificando simultáneamente, causando fallos intermitentes que desaparecen al re-ejecutar — el síntoma clásico de tests mal aislados, no un problema de la configuración en sí. La solución no es ajustar `workers` (d es incorrecta y contraproducente) sino aislar el estado por test, o forzar `fullyParallel: false` / `test.describe.serial()` para esos casos específicos mientras se corrige el aislamiento.",
      en: "`fullyParallel: true` makes even tests within the same file run in parallel, each potentially on a different worker. If those tests mutate the same shared resource (a counter, a database row) without per-test isolation (unique IDs, transactions, per-worker databases), race conditions arise: one test can read a value another test is simultaneously modifying, causing intermittent failures that vanish on re-run — the classic symptom of poorly isolated tests, not a configuration problem per se. The fix isn't adjusting `workers` (d is incorrect and counterproductive) but isolating state per test, or forcing `fullyParallel: false` / `test.describe.serial()` for those specific cases while fixing the isolation.",
    },
    points: 3,
    timeEstimateSeconds: 115,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
