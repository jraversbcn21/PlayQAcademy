/**
 * Module 6 — Configuration and Environments
 *
 * The key transition — from writing individual tests to architecting
 * the testing infrastructure. The playwright.config.ts file is the
 * command centre that defines how, where, and with what your tests run.
 * Masters of Playwright know their config inside out.
 *
 * Full bilingual lesson content for all 4 lessons in Module 6.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m6-configuration-environments";

/* ================================================================== */
/*  Lesson 6.1 — playwright.config.ts deep dive                        */
/* ================================================================== */

const L6_1: LessonContent = {
  id: "m6-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "El archivo que nadie lee pero define todo",
        en: "The file nobody reads but defines everything",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Si los tests son el cuerpo de tu suite, `playwright.config.ts` es su ADN. Este archivo define cuánto tiempo esperan los tests antes de fallar, cuántos reintentos tienen en CI, qué navegadores ejecutan, qué artefactos capturan al fallar, y mucho más. Conocer cada opción relevante te convierte en arquitecto de testing, no solo en escritor de tests.",
        en: "If tests are the body of your suite, `playwright.config.ts` is its DNA. This file defines how long tests wait before failing, how many retries they get in CI, which browsers they run on, what artifacts they capture on failure, and much more. Knowing every relevant option turns you into a test architect, not just a test writer.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "defineConfig() y por qué existe",
        en: "defineConfig() and why it matters",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { defineConfig } from '@playwright/test';

// defineConfig() provides:
// ✅ Autocompletado en tu IDE — nunca escribes una opción que no existe
// ✅ Verificación de tipos — si pones un número donde va un string, tsc te avisa
// ✅ Validación de formas — opciones mal anidadas se detectan en compilación

export default defineConfig({
  // Tu configuración aquí — el IDE te sugiere cada campo disponible
  testDir: './tests',
  //   ^?? Ctrl+Space muestra todas las opciones válidas
  timeout: 30_000,
  //       ^^^^ TypeScript verifica que 30_000 es número (segundos = aceptado)
  //             Si pones '30 segundos' (string), tsc rechaza

  // Sin defineConfig(): sin autocompletado ni verificación de tipos.
  // Con defineConfig(): la configuración se escribe prácticamente sola.
});`,
      caption: {
        es: "defineConfig() da autocompletado y verificación de tipos a tu configuración — úsala SIEMPRE",
        en: "defineConfig() gives autocomplete and type checking to your configuration — ALWAYS use it",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Opciones de nivel superior que importan",
        en: "Top-level options that matter",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Dónde Playwright busca tus archivos de test
  testDir: './tests',

  // Ejecución paralela completa (cada archivo de test en su propio worker)
  // false: ejecuta archivos en paralelo pero tests dentro del archivo en serie
  fullyParallel: true,

  // En CI, bloquea el commit si alguien dejó test.only() accidentalmente
  forbidOnly: !!process.env.CI,

  // Reintentos: 4 en CI (el servidor puede estar lento), 0 en local
  retries: process.env.CI ? 4 : 0,

  // Workers: en CI, 2 para estabilidad; en local, undefined = CPU cores
  workers: process.env.CI ? 2 : undefined,

  // Reporter: HTML es el más visual; --report=dot es rápido para CI
  reporter: [
    ['html', { open: 'never' }], // HTML report, no abrir automáticamente
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // Timeout del test COMPLETO (incluye beforeEach, test, afterEach)
  timeout: 30_000, // 30 segundos

  // Timeout por aserción individual (dentro de expect)
  expect: {
    timeout: 5_000, // 5 segundos por expect
  },
});`,
      caption: {
        es: "Configuración de nivel de producción con nombres auto-explicativos",
        en: "Production-grade config with self-explanatory names",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "El bloque use", en: "The use block" },
    },
    {
      type: "code",
      language: "typescript",
      code: `export default defineConfig({
  // ...opciones de nivel superior...

  use: {
    // URL base — tus tests hacen page.goto('/catalog') sin hardcodear el dominio
    baseURL: 'http://localhost:3000',

    // Traza: 'on-first-retry' es la configuración MÁGICA
    // Cero sobrecarga hasta que algo falla
    trace: 'on-first-retry',

    // Screenshot automático solo si el test falla
    screenshot: 'only-on-failure',

    // Video solo si el test falla (útil para debug en CI)
    video: 'retain-on-failure',

    // Navegador visible (false en CI, true para debuggear en local)
    headless: true,

    // Viewport estándar de escritorio
    viewport: { width: 1280, height: 720 },

    // Locale y timezone — simula usuarios en diferentes regiones
    locale: 'en-US',
    timezoneId: 'America/New_York',

    // Ignorar errores HTTPS en entornos de staging (certificados auto-firmados)
    ignoreHTTPSErrors: false,
  },
});`,
      caption: {
        es: "El bloque use aplica estas opciones a TODOS los tests y proyectos",
        en: "The use block applies these options to ALL tests and projects",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 `trace: 'on-first-retry'` es la configuración más valiosa de todo el archivo. Convierte la traza (el mejor debugger de Playwright) de un costo fijo a un costo CERO en ejecución normal. Solo graba cuando algo falla — y entonces tienes una película completa de cada interacción para diagnosticar el problema.",
        en: "💡 `trace: 'on-first-retry'` is the single most valuable setting in the entire config file. It turns the trace (Playwright's best debugger) from a fixed cost to ZERO cost in normal execution. It only records when something fails — and then you have a complete movie of every interaction to diagnose the problem.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Timeouts: test vs aserción", en: "Timeouts: test vs assertion" },
    },
    {
      type: "code",
      language: "typescript",
      code: `export default defineConfig({
  // Test timeout: tiempo MÁXIMO total para TODO el test
  // Incluye: beforeEach + body del test + afterEach
  timeout: 45_000, // 45 segundos

  // Assertion timeout: tiempo MÁXIMO por CADA expect()
  // NO incluye hooks — solo el tiempo que Playwright reintenta una aserción
  expect: {
    timeout: 10_000, // 10 segundos por expect
  },
});

// Ejemplo de cómo se aplican:
test('slow workflow', async ({ page }) => {
  // Este paso tiene 45 segundos en total para todo el test
  await page.goto('/catalog');

  // Esta aserción tiene 10 segundos para encontrar el texto
  await expect(page.getByText('Loading complete')).toBeVisible();
  // Si no lo encuentra en 10s, el test falla con "expect.timeout exceeded"

  // Esta aserción también tiene 10 segundos (reinicio independiente)
  await expect(page.getByRole('button', { name: 'Checkout' }))
    .toBeEnabled({ timeout: 15_000 }); // Override: 15s para esta aserción
});`,
      caption: {
        es: "test timeout cubre todo el test; expect.timeout cubre CADA aserción individualmente",
        en: "test timeout covers the entire test; expect.timeout covers EACH individual assertion",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 El `timeout` del test incluye TODOS los hooks (beforeEach, afterEach). Si tienes un beforeEach que tarda 8 segundos y un test con timeout de 10 segundos, el test solo tiene 2 segundos para ejecutarse. El `expect.timeout` es independiente y por aserción — cada `expect()` tiene su propio contador de tiempo desde cero.",
        en: "🔑 The test `timeout` includes ALL hooks (beforeEach, afterEach). If you have a beforeEach that takes 8 seconds and a test with a 10-second timeout, the test has only 2 seconds to execute. The `expect.timeout` is independent and per assertion — each `expect()` has its own timer starting from zero.",
      },
    },
    {
      type: "quiz",
      questionId: "m6-l1-quiz",
      question: {
        es: "¿Cuál es la diferencia entre `timeout` y `expect.timeout` en playwright.config.ts?",
        en: "What is the difference between `timeout` and `expect.timeout` in playwright.config.ts?",
      },
      options: [
        { id: "a", text: { es: "timeout es para tests en CI; expect.timeout es para tests en local", en: "timeout is for CI tests; expect.timeout is for local tests" } },
        { id: "b", text: { es: "timeout es el tiempo máximo total del test (incluyendo hooks); expect.timeout es el tiempo máximo que Playwright reintenta CADA aserción individual", en: "timeout is the maximum total time for the test (including hooks); expect.timeout is the maximum time Playwright retries EACH individual assertion" } },
        { id: "c", text: { es: "timeout se configura en segundos; expect.timeout en milisegundos. Son equivalentes.", en: "timeout is configured in seconds; expect.timeout in milliseconds. They are equivalent." } },
        { id: "d", text: { es: "timeout afecta a las acciones; expect.timeout afecta a las aserciones. Pero miden lo mismo.", en: "timeout affects actions; expect.timeout affects assertions. But they measure the same thing." } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El `timeout` a nivel de configuración define el tiempo máximo que un test COMPLETO puede ejecutarse, desde que empieza el primer hook hasta que termina el último. Si un test con timeout de 30s tiene un beforeEach de 25s, solo le quedan 5s para el cuerpo del test. El `expect.timeout` es independiente: cada `expect()` tiene su propio temporizador (por defecto 5s) para reintentar la condición hasta que se cumpla o expire. Puedes sobrescribirlo por aserción con `{ timeout: 15000 }`.",
        en: "The config-level `timeout` defines the maximum time a COMPLETE test can run, from the first hook starting to the last hook ending. If a test with a 30s timeout has a beforeEach of 25s, only 5s remain for the test body. `expect.timeout` is independent: each `expect()` has its own timer (default 5s) to retry the condition until it's met or expires. You can override it per assertion with `{ timeout: 15000 }`.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 6.2 — Multiple projects (browsers + devices)                */
/* ================================================================== */

const L6_2: LessonContent = {
  id: "m6-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Un comando, cinco navegadores, cobertura total",
        en: "One command, five browsers, total coverage",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Un proyecto en Playwright es un perfil de ejecución independiente: un navegador específico con sus propias opciones. Definir múltiples proyectos transforma tu suite de 'pruebo en Chrome' a 'pruebo en Chrome, Firefox, Safari, Chrome móvil y Safari móvil — todo en paralelo'. Esta es una de las características más potentes de Playwright y la razón por la que equipos enteros migran desde otras herramientas.",
        en: "A project in Playwright is an independent execution profile: a specific browser with its own options. Defining multiple projects transforms your suite from 'I test on Chrome' to 'I test on Chrome, Firefox, Safari, mobile Chrome, and mobile Safari — all in parallel'. This is one of Playwright's most powerful features and the reason entire teams migrate from other tools.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Proyectos — tu matriz de testing", en: "Projects — your testing matrix" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    // ── Desktop browsers ──
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // ── Mobile devices ──
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});

// Ejecutar:  npx playwright test
// → 5 proyectos × N tests = 5× cobertura con un solo comando
//
// Ejecutar solo un proyecto:
//   npx playwright test --project=chromium
//   npx playwright test --project="Mobile Safari"`,
      caption: {
        es: "5 proyectos: 3 navegadores de escritorio + 2 dispositivos móviles. Todos se ejecutan con un solo comando.",
        en: "5 projects: 3 desktop browsers + 2 mobile devices. All run with a single command.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Emulación móvil simplificada", en: "Mobile emulation made simple" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { defineConfig, devices } from '@playwright/test';

// devices contiene presets para docenas de dispositivos
// Cada preset define el viewport, user-agent, y capacidades del dispositivo

const MOBILE_PROJECTS = [
  {
    name: 'iPhone 13',
    use: {
      ...devices['iPhone 13'],
      // iPhone 13: viewport 390×844, user-agent de Safari iOS
    },
  },
  {
    name: 'Pixel 5',
    use: {
      ...devices['Pixel 5'],
      // Pixel 5: viewport 393×851, user-agent de Chrome Android
    },
  },
  {
    name: 'iPad Pro',
    use: {
      ...devices['iPad Pro'],
      // iPad Pro: viewport 1024×1366, user-agent de Safari iPadOS
    },
  },
];

// Los tests se ejecutan en viewports reales de dispositivos
// El user-agent se configura automáticamente
// Los eventos táctiles están habilitados
// La orientación y el tamaño de pantalla coinciden con el dispositivo real`,
      caption: {
        es: "devices de Playwright: presets completos para emulación móvil lista para usar",
        en: "Playwright's devices: complete presets for ready-to-use mobile emulation",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 La emulación NO es testing en dispositivo real. No prueba rendimiento real de CPU/GPU, ni condiciones de red reales, ni gestos táctiles reales. PERO captura el 95% de los bugs específicos de móvil: viewports rotos, elementos tapados, diferencias de user-agent, y CSS que falla en Safari. Complementa con servicios como BrowserStack o Saucelabs para el 5% restante.",
        en: "💡 Emulation is NOT real device testing. It doesn't test real CPU/GPU performance, real network conditions, or real touch gestures. BUT it catches 95% of mobile-specific bugs: broken viewports, hidden elements, user-agent differences, and CSS that fails on Safari. Supplement with services like BrowserStack or Saucelabs for the remaining 5%.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Sobrescritura por proyecto", en: "Per-project overrides" },
    },
    {
      type: "code",
      language: "typescript",
      code: `export default defineConfig({
  use: {
    baseURL: 'http://localhost:3000', // default
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Proyecto específico para staging — diferente baseURL
    {
      name: 'staging-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://staging.myapp.com', // ← sobrescribe el default
      },
    },

    // Proyecto para producción — solo ejecutar manualmente
    {
      name: 'production-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://myapp.com',
        // Deshabilitar ciertas acciones destructivas
        // Ej: no llenar formularios reales en producción
      },
    },

    // Proyecto con locale español — test de internacionalización
    {
      name: 'chromium-es',
      use: {
        ...devices['Desktop Chrome'],
        locale: 'es-ES',
        timezoneId: 'Europe/Madrid',
      },
    },
  ],
});

// Ejecutar solo staging:  npx playwright test --project=staging-chromium
// Ejecutar solo i18n:    npx playwright test --project=chromium-es`,
      caption: {
        es: "Proyectos con baseURL y locale sobrescritos — la misma suite, múltiples entornos",
        en: "Projects with overridden baseURL and locale — same suite, multiple environments",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "📘 Pro tip avanzado: los proyectos de setup/teardown te permiten ejecutar lógica antes de que arranquen los proyectos de test. Por ejemplo, un proyecto 'auth-setup' que hace login una vez y comparte el estado de autenticación con todos los demás proyectos vía storageState. Esto evita repetir el login en cada test. Pero requiere un artículo dedicado — busca 'Playwright auth setup project' cuando estés listo.",
        en: "📘 Advanced pro tip: setup/teardown projects let you run logic before test projects start. For example, an 'auth-setup' project that logs in once and shares the authentication state with all other projects via storageState. This avoids repeating login in every test. But it deserves its own deep dive — search 'Playwright auth setup project' when you're ready.",
      },
    },
    {
      type: "quiz",
      questionId: "m6-l2-quiz",
      question: {
        es: "Tienes una suite de tests que debe ejecutarse en 3 navegadores de escritorio y 2 dispositivos móviles. ¿Cómo configuras los proyectos en playwright.config.ts?",
        en: "You have a test suite that must run on 3 desktop browsers and 2 mobile devices. How do you configure projects in playwright.config.ts?",
      },
      options: [
        { id: "a", text: { es: "Defines 5 proyectos en el array projects, cada uno con el device preset correspondiente de devices", en: "You define 5 projects in the projects array, each with the corresponding device preset from devices" } },
        { id: "b", text: { es: "Ejecutas los tests 5 veces cambiando manualmente el navegador en el bloque use", en: "You run the tests 5 times by manually changing the browser in the use block" } },
        { id: "c", text: { es: "Creando 5 playwright.config.ts distintos, uno por navegador/dispositivo", en: "By creating 5 separate playwright.config.ts files, one per browser/device" } },
        { id: "d", text: { es: "Usando un solo proyecto con use: { browsers: ['chromium', 'firefox', 'webkit'] }", en: "Using a single project with use: { browsers: ['chromium', 'firefox', 'webkit'] }" } },
      ],
      correctOptionId: "a",
      explanation: {
        es: "El array `projects` es exactamente para esto. Cada entrada es un perfil de ejecución independiente. Usando `...devices['Desktop Chrome']`, `...devices['Pixel 5']`, etc., defines navegadores y dispositivos móviles en un solo archivo. Con `npx playwright test`, los 5 proyectos se ejecutan (potencialmente en paralelo). También puedes filtrar con `--project=chromium` para ejecutar solo uno durante el desarrollo.",
        en: "The `projects` array is exactly for this. Each entry is an independent execution profile. Using `...devices['Desktop Chrome']`, `...devices['Pixel 5']`, etc., you define browsers and mobile devices in a single file. With `npx playwright test`, all 5 projects run (potentially in parallel). You can also filter with `--project=chromium` to run just one during development.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 6.3 — Environment variables in tests                        */
/* ================================================================== */

const L6_3: LessonContent = {
  id: "m6-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Lo que NUNCA debes committear y cómo evitarlo",
        en: "What you should NEVER commit and how to avoid it",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Las credenciales, URLs de API, claves secretas y tokens NUNCA deben ir hardcodeadas en tus tests. Un solo `git push` y tus credenciales de producción están en el historial de Git para siempre. Las variables de entorno resuelven esto: tus tests leen valores sensibles del entorno de ejecución, no del código fuente. Esta lección te enseña el patrón profesional para gestionar configuración por entorno.",
        en: "Credentials, API URLs, secret keys, and tokens should NEVER be hardcoded in your tests. A single `git push` and your production credentials are in Git history forever. Environment variables solve this: your tests read sensitive values from the runtime environment, not from source code. This lesson teaches you the professional pattern for managing per-environment configuration.",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ REGLA INQUEBRANTABLE: Los archivos `.env` y `.env.local` NUNCA se commitean. Añade `.env*.local` a tu `.gitignore` AHORA. Un archivo `.env` con secretos en GitHub es una vulnerabilidad de seguridad que puede costarte el puesto. Si ya commiteaste uno, cambia las credenciales inmediatamente — eliminarlo del repositorio no las borra del historial de Git.",
        en: "⚠️ UNBREAKABLE RULE: `.env` and `.env.local` files are NEVER committed. Add `.env*.local` to your `.gitignore` NOW. A `.env` file with secrets on GitHub is a security vulnerability that can cost you your job. If you already committed one, rotate the credentials immediately — removing it from the repo doesn't erase them from Git history.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Cargando .env con dotenv", en: "Loading .env with dotenv" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts
// La primera línea del archivo carga las variables de entorno
// Esto debe ir ANTES de cualquier referencia a process.env
import 'dotenv/config';

import { defineConfig } from '@playwright/test';

// En este punto, process.env ya contiene las variables de .env
// dotenv busca un archivo .env en la raíz del proyecto

// Convención de archivos .env:
// .env              — valores por defecto para desarrollo local (PUEDE committearse si no tiene secretos)
// .env.local        — overrides locales, secretos reales (NUNCA se commitea)
// .env.staging      — valores para el entorno de staging
// .env.production   — valores para el entorno de producción
//
// dotenv carga automáticamente .env
// Para otros archivos: import 'dotenv/config'; dotenv.config({ path: '.env.staging' });

export default defineConfig({
  use: {
    // Usa la variable de entorno con un fallback sensato
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
  },
});`,
      caption: {
        es: "dotenv/config carga las variables de entorno ANTES de que Playwright lea la configuración",
        en: "dotenv/config loads environment variables BEFORE Playwright reads the configuration",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Validando variables requeridas", en: "Validating required vars" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts
import 'dotenv/config';
import { defineConfig } from '@playwright/test';

/**
 * Valida que las variables de entorno requeridas estén definidas.
 * Falla RÁPIDO con un mensaje claro en lugar de fallar
 * misteriosamente 30 segundos después dentro de un test.
 *
 * @param names - Nombres de las variables requeridas
 */
function assertEnv(...names: string[]): void {
  const missing = names.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(
      'Required environment variables are missing:\n' +
      missing.map((n) => \`  - \${n}\`).join('\n') +
      '\n\nCheck your .env file or CI environment variables.'
    );
  }
}

// Si falta alguna de estas, Playwright ni siquiera arranca
assertEnv('BASE_URL', 'API_KEY');

export default defineConfig({
  use: {
    // TypeScript sabe que BASE_URL no es undefined porque assertEnv ya verificó
    baseURL: process.env.BASE_URL!,
  },
});

// En CI, las variables se pasan vía secrets del sistema:
// GitHub Actions: secrets.BASE_URL
// GitLab CI:      $BASE_URL (definido en Settings > CI/CD > Variables)`,
      caption: {
        es: "assertEnv() falla al arrancar con un mensaje descriptivo si faltan variables requeridas",
        en: "assertEnv() fails at startup with a descriptive message if required variables are missing",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 'Fail fast' es un principio de ingeniería de software: prefiere un error claro al arrancar que un error críptico 30 segundos después dentro de un test anidado. Con `assertEnv()`, si olvidaste definir `BASE_URL`, ves inmediatamente `Required environment variables are missing: BASE_URL`. Sin validación, verías `page.goto() failed: URL is undefined` en el test #47 de 200.",
        en: "💡 'Fail fast' is a software engineering principle: prefer a clear error at startup over a cryptic error 30 seconds later inside a nested test. With `assertEnv()`, if you forgot to define `BASE_URL`, you immediately see `Required environment variables are missing: BASE_URL`. Without validation, you'd see `page.goto() failed: URL is undefined` in test #47 of 200.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Variables de entorno en los tests", en: "Environment variables in tests" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// process.env está disponible directamente en los tests
// Pero las variables sensibles se leen en runtime, no se hardcodean

test('login with credentials from env', async ({ page }) => {
  await page.goto('/login');

  // ✅ CORRECTO: credenciales desde variables de entorno
  const email = process.env.TEST_EMAIL ?? 'test@example.com';
  const password = process.env.TEST_PASSWORD!;

  // Si TEST_PASSWORD no está definido, el test falla aquí con un error claro
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Welcome')).toBeVisible();
});

test('API call with auth from env', async ({ page }) => {
  // ✅ CORRECTO: API key desde variable de entorno
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    test.skip(true, 'API_KEY not configured — skipping API test');
  }

  const response = await page.request.get('/api/protected', {
    headers: { Authorization: \`Bearer \${apiKey}\` },
  });

  expect(response.status()).toBe(200);
});

// ❌ INCORRECTO: NUNCA hagas esto
// const PASSWORD = 'MySuperSecret123!'; // ← committeado! visible en GitHub!
`,
      caption: {
        es: "Los tests leen credenciales y tokens de process.env — cero secretos en el código fuente",
        en: "Tests read credentials and tokens from process.env — zero secrets in source code",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "📘 En CI (GitHub Actions, GitLab CI, Jenkins), las variables de entorno se configuran en la interfaz del sistema de CI, no en archivos .env. Cada plataforma tiene su mecanismo: GitHub Actions usa `secrets` y `env` en el workflow YAML, GitLab CI usa `Variables` en Settings, Jenkins usa `Credentials`. El patrón `process.env.NOMBRE` funciona igual en todas.",
        en: "📘 In CI (GitHub Actions, GitLab CI, Jenkins), environment variables are configured in the CI system's interface, not in .env files. Each platform has its mechanism: GitHub Actions uses `secrets` and `env` in the workflow YAML, GitLab CI uses `Variables` in Settings, Jenkins uses `Credentials`. The `process.env.NAME` pattern works the same everywhere.",
      },
    },
    {
      type: "quiz",
      questionId: "m6-l3-quiz",
      question: {
        es: "¿Cuál de estas prácticas es CORRECTA para manejar credenciales en tests?",
        en: "Which of these practices is CORRECT for handling credentials in tests?",
      },
      options: [
        { id: "a", text: { es: "Guardar las credenciales en el código fuente con un comentario 'TODO: mover a .env'", en: "Store credentials in source code with a comment 'TODO: move to .env'" } },
        { id: "b", text: { es: "Commitea el archivo .env con las credenciales pero pon el repositorio como privado", en: "Commit the .env file with credentials but make the repository private" } },
        { id: "c", text: { es: "Leer credenciales de process.env, no hardcodearlas nunca, añadir .env*.local a .gitignore, y usar assertEnv() para validar que existen al arrancar", en: "Read credentials from process.env, never hardcode them, add .env*.local to .gitignore, and use assertEnv() to validate they exist at startup" } },
        { id: "d", text: { es: "Usar credenciales genéricas como 'admin/admin' en todos los entornos para simplificar", en: "Use generic credentials like 'admin/admin' across all environments to simplify" } },
      ],
      correctOptionId: "c",
      explanation: {
        es: "El patrón profesional: variables de entorno + .gitignore + validación al arrancar. `process.env` lee del entorno de ejecución. `.env*.local` en `.gitignore` asegura que los secretos nunca lleguen al repositorio. `assertEnv()` falla rápido si algo falta. Las credenciales genéricas (d) son vulnerables; committear .env (b) expone secretos incluso en repos privados; el 'TODO' (a) nunca se completa.",
        en: "The professional pattern: environment variables + .gitignore + startup validation. `process.env` reads from the runtime environment. `.env*.local` in `.gitignore` ensures secrets never reach the repository. `assertEnv()` fails fast if something is missing. Generic credentials (d) are vulnerable; committing .env (b) exposes secrets even in private repos; the 'TODO' (a) never gets done.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 6.4 — Practical Exercise: Multi-browser config              */
/* ================================================================== */

const L6_4: LessonContent = {
  id: "m6-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Arma tu suite para producción",
        en: "Arm your suite for production",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Este ejercicio pone a prueba todo lo aprendido en el Módulo 6. Vas a construir desde cero un `playwright.config.ts` de nivel profesional que tu equipo podría usar en producción. Cero copiar-pegar de la documentación: cada opción la eliges tú entendiendo por qué.",
        en: "This exercise tests everything learned in Module 6. You'll build a professional-grade `playwright.config.ts` from scratch that your team could use in production. Zero copy-paste from the docs: you choose every option understanding why.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Empieza desde el esqueleto vacío. No copies una configuración de memoria — razona cada opción. Pregúntate: ¿por qué `retries: process.env.CI ? 4 : 0` y no `retries: 2` siempre? ¿Por qué `trace: 'on-first-retry'` y no `trace: 'on'`? Cada decisión tiene una razón de peso.",
        en: "💡 Start from the empty skeleton. Don't copy a config from memory — reason through each option. Ask yourself: why `retries: process.env.CI ? 4 : 0` and not `retries: 2` always? Why `trace: 'on-first-retry'` and not `trace: 'on'`? Every decision has a strong reason behind it.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m6-l4-exercise",
      instructions: {
        es: "Construye un `playwright.config.ts` que cumpla los siguientes requisitos:\n\n1) Los tests viven en el directorio `./tests`\n2) Ejecución paralela, con 4 reintentos en CI y 0 en local\n3) `baseURL` viene de la variable de entorno `BASE_URL`, con fallback a `http://localhost:3000`\n4) Capturar trace solo en el primer reintento\n5) Tomar screenshot solo cuando un test falla\n6) Grabar video solo cuando un test falla\n7) Usar el reporter HTML\n8) Test timeout: 30 segundos, assertion timeout: 5 segundos\n9) Tres proyectos de navegador: chromium, firefox, webkit\n10) Dos proyectos móviles: 'Mobile Chrome' (Pixel 5), 'Mobile Safari' (iPhone 13)\n11) Cargar el archivo `.env` usando dotenv al inicio del archivo\n\nUsa `defineConfig()` para tener type safety. NO commitees archivos .env — añade un comentario explicándolo.",
        en: "Build a `playwright.config.ts` that satisfies the following requirements:\n\n1) Tests live in the `./tests` directory\n2) Run in parallel, with 4 retries on CI and 0 locally\n3) `baseURL` comes from the `BASE_URL` env var, falling back to `http://localhost:3000`\n4) Capture trace only on first retry\n5) Take screenshot only when a test fails\n6) Record video only when a test fails\n7) Use HTML reporter\n8) Test timeout: 30 seconds, assertion timeout: 5 seconds\n9) Three browser projects: chromium, firefox, webkit\n10) Two mobile projects: 'Mobile Chrome' (Pixel 5), 'Mobile Safari' (iPhone 13)\n11) Load `.env` file using dotenv at the top\n\nUse `defineConfig()` for type safety. Do NOT commit .env files — add a comment explaining this.",
      },
      starterCode: `import { defineConfig, devices } from '@playwright/test';

// TODO: Load .env file using dotenv

export default defineConfig({
  // TODO: testDir

  // TODO: fullyParallel

  // TODO: retries (different for CI vs local)

  // TODO: workers

  // TODO: reporter

  // TODO: timeout (test-level)

  // TODO: expect (assertion timeout)

  use: {
    // TODO: baseURL from env var with fallback

    // TODO: trace setting

    // TODO: screenshot setting

    // TODO: video setting
  },

  projects: [
    // TODO: chromium, firefox, webkit

    // TODO: Mobile Chrome (Pixel 5)

    // TODO: Mobile Safari (iPhone 13)
  ],
});`,
      solution: `// playwright.config.ts

import 'dotenv/config';

import { defineConfig, devices } from '@playwright/test';

/**
 * Production-grade Playwright configuration.
 *
 * NEVER commit .env files with secrets — verify .gitignore excludes them.
 * .env*.local must be in .gitignore to prevent accidental credential leaks.
 *
 * To use different env files per environment:
 *   import { config } from 'dotenv';
 *   config({ path: \`.env.\${process.env.NODE_ENV ?? 'development'}\` });
 */

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  // Block accidental test.only() in CI
  forbidOnly: !!process.env.CI,

  // 4 retries in CI (server flakiness), 0 locally (debug quickly)
  retries: process.env.CI ? 4 : 0,

  // 2 workers in CI for stability, auto-detect locally
  workers: process.env.CI ? 2 : undefined,

  // HTML reporter — open manually with: npx playwright show-report
  reporter: 'html',

  // Test timeout: 30 seconds for the entire test + hooks
  timeout: 30_000,

  // Assertion timeout: 5 seconds per expect() call
  expect: {
    timeout: 5_000,
  },

  use: {
    // baseURL: env var with localhost fallback
    baseURL: process.env.BASE_URL ?? 'http://localhost:3000',

    // Trace: only on retry — zero overhead until something fails
    trace: 'on-first-retry',

    // Screenshot: only when test fails (saves disk space)
    screenshot: 'only-on-failure',

    // Video: retain only on failure (CI debugging gold)
    video: 'retain-on-failure',
  },

  projects: [
    // ── Desktop browsers ──
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // ── Mobile devices ──
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});`,
      hints: [
        {
          es: "Empieza importando `defineConfig` y `devices` de `@playwright/test`. Añade `import 'dotenv/config'` en la PRIMERA línea del archivo para cargar las variables de entorno antes que cualquier otra cosa.",
          en: "Start by importing `defineConfig` and `devices` from `@playwright/test`. Add `import 'dotenv/config'` as the VERY FIRST line of the file to load environment variables before anything else.",
        },
        {
          es: "Para que los reintentos difieran entre CI y local: `process.env.CI ? 4 : 0`. La variable de entorno `CI` la establecen automáticamente GitHub Actions, GitLab CI y la mayoría de plataformas de CI. En local, `process.env.CI` es `undefined`.",
          en: "For retries differing between CI and local: `process.env.CI ? 4 : 0`. The `CI` env var is set automatically by GitHub Actions, GitLab CI, and most CI platforms. Locally, `process.env.CI` is `undefined`.",
        },
        {
          es: "Para trace, screenshot y video, los valores mágicos son `'on-first-retry'`, `'only-on-failure'`, `'retain-on-failure'`. Estos te dan artefactos de debugging SOLO cuando los necesitas — cero overhead en la ejecución normal.",
          en: "For trace, screenshot, and video, the magic values are `'on-first-retry'`, `'only-on-failure'`, `'retain-on-failure'`. These give you debugging artifacts ONLY when you need them — zero overhead in normal execution.",
        },
        {
          es: "Los proyectos comparten las opciones del bloque `use` pero pueden sobrescribirlas. Cada proyecto usa `...devices['Desktop Chrome']` etc., que configura el viewport, user-agent y capacidades correctas automáticamente. Los proyectos se ejecutan con un solo `npx playwright test`.",
          en: "Projects share the `use` block options but can override them. Each project uses `...devices['Desktop Chrome']` etc., which configures the correct viewport, user-agent, and capabilities automatically. Projects run with a single `npx playwright test`.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 CHECKLIST DE PRODUCCIÓN — Tu configuración está lista para producción si:\n\n• ✅ Ejecución paralela habilitada (`fullyParallel: true`)\n• ✅ Diferentes reintentos para CI vs local (`process.env.CI ? 4 : 0`)\n• ✅ `baseURL` desde variable de entorno con fallback\n• ✅ Trace + screenshot + video solo en fallos (ahorro de recursos)\n• ✅ Timeouts de test y aserción explícitos\n• ✅ Proyectos multi-browser + multi-dispositivo definidos\n• ✅ `forbidOnly: !!process.env.CI` (evita `test.only()` accidental en CI)\n• ✅ Variables de entorno validadas al arrancar con `assertEnv()`",
        en: "🔑 PRODUCTION CHECKLIST — Your configuration is production-ready if:\n\n• ✅ Parallel execution enabled (`fullyParallel: true`)\n• ✅ Different retries for CI vs local (`process.env.CI ? 4 : 0`)\n• ✅ `baseURL` from env var with fallback\n• ✅ Trace + screenshot + video only on failure (resource savings)\n• ✅ Test and assertion timeouts explicit\n• ✅ Multi-browser + multi-device projects defined\n• ✅ `forbidOnly: !!process.env.CI` (prevents accidental `test.only()` in CI)\n• ✅ Environment variables validated at startup with `assertEnv()`",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "¿Qué sigue?", en: "What's next?" },
    },
    {
      type: "paragraph",
      content: {
        es: "Has pasado de escribir tests a diseñar la infraestructura que los ejecuta. Tu suite ahora corre en 5 navegadores y dispositivos simultáneamente, con artefactos de debugging solo cuando algo falla, y con credenciales seguras vía variables de entorno. En el Módulo 7 (API Testing), aprenderás a probar el backend directamente — sin navegador — usando `request` context de Playwright para validar APIs REST, autenticación por token, y contratos de respuesta. Combinarás tests de UI (Módulos 1-5) con tests de API (Módulo 7) para tener una cobertura completa de tu aplicación.",
        en: "You've gone from writing tests to designing the infrastructure that runs them. Your suite now runs on 5 browsers and devices simultaneously, with debugging artifacts only when something fails, and with secure credentials via environment variables. In Module 7 (API Testing), you'll learn to test the backend directly — without a browser — using Playwright's `request` context to validate REST APIs, token authentication, and response contracts. You'll combine UI tests (Modules 1-5) with API tests (Module 7) for complete application coverage.",
      },
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_6_LESSONS: LessonContent[] = [L6_1, L6_2, L6_3, L6_4];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_6_LESSONS;
}
