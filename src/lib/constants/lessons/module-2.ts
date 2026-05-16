/**
 * Module 2 — Playwright Fundamentals
 *
 * Full bilingual lesson content for all 6 lessons in Module 2.
 * Follows the same structure as Module 1:
 *   - Explanatory headings + paragraphs
 *   - Real, runnable Playwright code examples in TypeScript
 *   - Callouts (info / tip / warning / important)
 *   - A quiz section testing comprehension per lesson
 *   - Lesson 2.6 includes a full coding exercise against /playground/login
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m2-playwright-fundamentals";

/* ================================================================== */
/*  Lesson 2.1 — What is Playwright and why it wins                    */
/* ================================================================== */

const L2_1: LessonContent = {
  id: "m2-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "¿Qué es Playwright y por qué gana?",
        en: "What is Playwright and why it wins",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Playwright es un framework de automatización de pruebas end-to-end (E2E) desarrollado por Microsoft. Te permite controlar navegadores web — Chromium, Firefox y WebKit — desde una única API limpia y moderna. Si vienes de Selenium o Cypress, prepárate para una grata sorpresa.",
        en: "Playwright is an end-to-end (E2E) test automation framework developed by Microsoft. It lets you control web browsers — Chromium, Firefox, and WebKit — from a single clean, modern API. If you're coming from Selenium or Cypress, prepare for a pleasant surprise.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Playwright es de código abierto (Apache 2.0), mantenido por un equipo dedicado en Microsoft con contribuciones activas de la comunidad. No es un proyecto abandonado ni experimental.",
        en: "Playwright is open source (Apache 2.0), maintained by a dedicated Microsoft team with active community contributions. It is not an abandoned or experimental project.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Comparativa: Playwright vs Selenium vs Cypress",
        en: "Comparison: Playwright vs Selenium vs Cypress",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Cross-browser: Playwright prueba Chromium, Firefox y WebKit con un solo API. Selenium también, pero requiere WebDrivers separados. Cypress solo soporta navegadores basados en Chromium.",
          en: "Cross-browser: Playwright tests Chromium, Firefox, and WebKit with a single API. Selenium does too, but needs separate WebDrivers. Cypress only supports Chromium-based browsers.",
        },
        {
          es: "Auto-waiting: Playwright espera automáticamente a que los elementos estén listos antes de actuar. Sin need for waitForSelector, sin sleeps. Cypress también lo hace. Selenium requiere WebDriverWait explícito.",
          en: "Auto-waiting: Playwright automatically waits for elements to be ready before acting. No need for waitForSelector, no sleeps. Cypress does this too. Selenium requires explicit WebDriverWait.",
        },
        {
          es: "Multi-lenguaje: Playwright soporta JS, TS, Python, Java y .NET. Cypress solo JS/TS. Selenium soporta aún más lenguajes.",
          en: "Multi-language: Playwright supports JS, TS, Python, Java, and .NET. Cypress only JS/TS. Selenium supports even more languages.",
        },
        {
          es: "Ejecución paralela: Playwright ejecuta tests en paralelo por defecto con workers configurables. Selenium requiere integración con frameworks externos para paralelismo.",
          en: "Parallel execution: Playwright runs tests in parallel by default with configurable workers. Selenium requires integration with external frameworks for parallelism.",
        },
        {
          es: "Network interception: Playwright puede interceptar y mockear peticiones de red nativamente. Esto es mucho más limitado en Cypress y requiere proxies en Selenium.",
          en: "Network interception: Playwright can intercept and mock network requests natively. This is much more limited in Cypress and requires proxies in Selenium.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Arquitectura de Playwright",
        en: "Playwright architecture",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Playwright se comunica con los navegadores mediante el protocolo DevTools (CDP para Chromium, protocolos equivalentes para Firefox y WebKit). No usa WebDriver ni depende de Selenium Server. Esto le da control de bajo nivel sobre el navegador, permitiendo características como interceptación de red, geolocalización simulada y emulación de dispositivos móviles.",
        en: "Playwright communicates with browsers via the DevTools protocol (CDP for Chromium, equivalent protocols for Firefox and WebKit). It does not use WebDriver or depend on Selenium Server. This gives it low-level control over the browser, enabling features like network interception, simulated geolocation, and mobile device emulation.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Playwright's architecture in a test:
// 1. test() creates a browser context per test (isolation)
// 2. context creates pages (tabs)
// 3. Each page has its own isolated storage, cookies, session

import { test, expect } from '@playwright/test';

test('architecture demo', async ({ browser, page }) => {
  // This page is already inside an isolated browser context
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});`,
      caption: {
        es: "Cada test recibe un contexto de navegador aislado automáticamente",
        en: "Each test receives an isolated browser context automatically",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Browser Contexts son el superpoder de Playwright. Cada test se ejecuta en un perfil de navegador limpio (sin cookies, sin localStorage, sin extensiones). Esto elimina el problema de 'tests que dependen del orden de ejecución' que atormenta a otras herramientas.",
        en: "💡 Browser Contexts are Playwright's superpower. Each test runs in a clean browser profile (no cookies, no localStorage, no extensions). This eliminates the 'test interdependency' problem that plagues other tools.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Cuándo elegir Playwright?",
        en: "When to choose Playwright?",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "✅ Elige Playwright si necesitas cross-browser real (Chromium + Firefox + WebKit), auto-waiting moderno, y escribes tests en TypeScript/JavaScript.",
          en: "✅ Choose Playwright if you need real cross-browser (Chromium + Firefox + WebKit), modern auto-waiting, and write tests in TypeScript/JavaScript.",
        },
        {
          es: "✅ Elige Playwright si valoras el paralelismo nativo sin configuración extra.",
          en: "✅ Choose Playwright if you value native parallelism without extra configuration.",
        },
        {
          es: "✅ Elige Playwright si necesitas interceptar/mockear peticiones de red en tus tests.",
          en: "✅ Choose Playwright if you need to intercept/mock network requests in your tests.",
        },
        {
          es: "❌ Quizás no elijas Playwright si tu empresa ya tiene una suite masiva en Selenium que funciona bien y migrarla sería costoso.",
          en: "❌ Maybe don't choose Playwright if your company already has a massive Selenium suite that works well and migrating would be costly.",
        },
        {
          es: "❌ Cypress puede ser preferible si solo necesitas Chromium y tu equipo de frontend ya usa Cypress para testing de componentes.",
          en: "❌ Cypress may be preferable if you only need Chromium and your frontend team already uses Cypress for component testing.",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m2-l1-quiz",
      question: {
        es: "¿Cuál NO es una ventaja de Playwright sobre Selenium?",
        en: "Which is NOT an advantage of Playwright over Selenium?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Auto-waiting integrado sin configuración adicional",
            en: "Built-in auto-waiting without extra configuration",
          },
        },
        {
          id: "b",
          text: {
            es: "Ejecución paralela de tests por defecto",
            en: "Parallel test execution by default",
          },
        },
        {
          id: "c",
          text: {
            es: "Soporta más lenguajes de programación que Selenium",
            en: "Supports more programming languages than Selenium",
          },
        },
        {
          id: "d",
          text: {
            es: "Browser contexts aislados por test sin configuración adicional",
            en: "Isolated browser contexts per test without extra configuration",
          },
        },
      ],
      correctOptionId: "c",
      explanation: {
        es: "Selenium soporta más lenguajes de programación que Playwright (Java, C#, Ruby, Python, JS, etc.). Playwright soporta JS, TS, Python, Java y .NET — un conjunto más moderno pero menos amplio. Las otras opciones SÍ son ventajas reales de Playwright.",
        en: "Selenium supports more programming languages than Playwright (Java, C#, Ruby, Python, JS, etc.). Playwright supports JS, TS, Python, Java, and .NET — a more modern but narrower set. The other options ARE real advantages of Playwright.",
      },
    },
  ],
  resources: [
    {
      title: { es: "Documentación oficial de Playwright", en: "Official Playwright Docs" },
      url: "https://playwright.dev/docs/intro",
    },
    {
      title: { es: "Playwright vs Cypress vs Selenium", en: "Playwright vs Cypress vs Selenium" },
      url: "https://playwright.dev/docs/why-playwright",
    },
  ],
};

/* ================================================================== */
/*  Lesson 2.2 — Installation and first test                          */
/* ================================================================== */

const L2_2: LessonContent = {
  id: "m2-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Instalación y primer test",
        en: "Installation and first test",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Instalar Playwright es sorprendentemente simple. Microsoft ha invertido en una experiencia de onboarding que te lleva de cero a tu primer test funcionando en menos de 5 minutos. En esta lección, recorreremos cada paso.",
        en: "Installing Playwright is surprisingly simple. Microsoft has invested in an onboarding experience that takes you from zero to your first passing test in under 5 minutes. In this lesson, we'll walk through every step.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Prerrequisito: Node.js",
        en: "Prerequisite: Node.js",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Playwright requiere Node.js 18 o superior. Si no lo tienes instalado, descárgalo de nodejs.org (versión LTS recomendada). Verifica tu instalación con:",
        en: "Playwright requires Node.js 18 or higher. If you don't have it installed, download it from nodejs.org (LTS version recommended). Verify your installation with:",
      },
    },
    {
      type: "code",
      language: "bash",
      code: "# Verificar versión de Node.js\nnode --version\n# Debería mostrar v18.x.x, v20.x.x, o superior\n\n# Verificar que npm está disponible\nnpm --version",
      caption: {
        es: "Asegúrate de que Node.js y npm están correctamente instalados",
        en: "Make sure Node.js and npm are correctly installed",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ Si tu versión de Node.js es 16 o inferior, Playwright no funcionará correctamente. Actualiza a la versión LTS más reciente antes de continuar.",
        en: "⚠️ If your Node.js version is 16 or lower, Playwright will not work correctly. Update to the latest LTS before continuing.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Creando un proyecto Playwright desde cero",
        en: "Creating a Playwright project from scratch",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El comando `npm init playwright@latest` es la forma más rápida de empezar. Este comando interactivo te guiará para configurar tu proyecto:",
        en: "The `npm init playwright@latest` command is the fastest way to start. This interactive command guides you through setting up your project:",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# 1. Crea una carpeta para tu proyecto\nmkdir my-playwright-tests\ncd my-playwright-tests\n\n# 2. Inicializa Playwright\nnpm init playwright@latest\n\n# El comando te preguntará:\n# - Dónde guardar los tests → "tests" (por defecto)\n# - ¿Configurar GitHub Actions? → "Yes" o "No"\n# - ¿Instalar navegadores? → "Yes" (instala Chromium, Firefox, WebKit)`,
      caption: {
        es: "npm init playwright@latest: el comando que lo inicia todo",
        en: "npm init playwright@latest: the command that starts it all",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Qué se crea?",
        en: "What gets created?",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "playwright.config.ts — Archivo de configuración principal. Define navegadores, timeouts, workers, reporter y más.",
          en: "playwright.config.ts — Main configuration file. Defines browsers, timeouts, workers, reporter, and more.",
        },
        {
          es: "tests/example.spec.ts — Un test de ejemplo que visita playwrigth.dev y verifica el título.",
          en: "tests/example.spec.ts — An example test that visits playwright.dev and verifies the title.",
        },
        {
          es: "tests-examples/ — Tests de demostración más complejos con varios escenarios.",
          en: "tests-examples/ — More complex demo tests with various scenarios.",
        },
        {
          es: ".github/workflows/ — Configuración de GitHub Actions (si elegiste Yes).",
          en: ".github/workflows/ — GitHub Actions configuration (if you chose Yes).",
        },
        {
          es: "package.json — Actualizado con @playwright/test como dependencia y scripts de ejecución.",
          en: "package.json — Updated with @playwright/test as a dependency and run scripts.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Ejecutando tu primer test",
        en: "Running your first test",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Ejecutar todos los tests\nnpx playwright test\n\n# Modos útiles desde el primer día:\nnpx playwright test --headed    # Ver el navegador\nnpx playwright test --ui        # Timeline interactivo (recomendado)\nnpx playwright test --debug      # Depuración paso a paso\n\n# Generar y abrir el reporte HTML\nnpx playwright show-report`,
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔥 Playwright instala navegadores dedicados (no los de tu sistema) en ~/.cache/ms-playwright/. Estos navegadores están optimizados para testing y se actualizan con playwrigth. Si alguna vez necesitas reinstalarlos: `npx playwright install`.",
        en: "🔥 Playwright installs dedicated browsers (not your system ones) in ~/.cache/ms-playwright/. These browsers are optimised for testing and update with Playwright. If you ever need to reinstall them: `npx playwright install`.",
      },
    },
    {
      type: "quiz",
      questionId: "m2-l2-quiz",
      question: {
        es: "¿Qué comando usas para crear un nuevo proyecto Playwright desde cero?",
        en: "What command do you use to create a new Playwright project from scratch?",
      },
      options: [
        {
          id: "a",
          text: { es: "npm install playwright", en: "npm install playwright" },
        },
        {
          id: "b",
          text: {
            es: "npm init playwright@latest",
            en: "npm init playwright@latest",
          },
        },
        {
          id: "c",
          text: { es: "npx playwright create", en: "npx playwright create" },
        },
        {
          id: "d",
          text: {
            es: "npm create playwright-app",
            en: "npm create playwright-app",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`npm init playwright@latest` es el comando oficial de inicialización. No solo instala Playwright, sino que también configura el proyecto con archivos de ejemplo, configuración de TypeScript y scripts predefinidos. `npm install playwright` solo instalaría la librería sin configurar nada.",
        en: "`npm init playwright@latest` is the official initialisation command. It not only installs Playwright but also configures the project with example files, TypeScript configuration, and predefined scripts. `npm install playwright` would only install the library without setting anything up.",
      },
    },
  ],
  resources: [
    {
      title: { es: "Guía de instalación oficial", en: "Official Installation Guide" },
      url: "https://playwright.dev/docs/intro",
    },
  ],
};

/* ================================================================== */
/*  Lesson 2.3 — Understanding the Test Runner                         */
/* ================================================================== */

const L2_3: LessonContent = {
  id: "m2-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Entendiendo el Test Runner",
        en: "Understanding the Test Runner",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El Test Runner de Playwright es el motor que ejecuta tus tests. Entender su estructura — `test()`, `describe()`, hooks, y anotaciones — es fundamental para organizar suites de pruebas profesionales.",
        en: "Playwright's Test Runner is the engine that executes your tests. Understanding its structure — `test()`, `describe()`, hooks, and annotations — is fundamental to organising professional test suites.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "test(): el bloque fundamental",
        en: "test(): the fundamental block",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// Cada test es una función async independiente
test('visit homepage and verify title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});`,
      caption: {
        es: "El bloque básico: test() con una función async",
        en: "The basic block: test() with an async function",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Cada `test()` recibe un objeto `fixtures` con las herramientas que necesitas. El fixture más común es `page` — una página de navegador nueva y aislada. Playwright también proporciona `browser`, `context`, `request` (para API testing), y puedes definir tus propios fixtures.",
        en: "Each `test()` receives a `fixtures` object with the tools you need. The most common fixture is `page` — a new, isolated browser page. Playwright also provides `browser`, `context`, `request` (for API testing), and you can define your own fixtures.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "describe(): agrupando tests",
        en: "describe(): grouping tests",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// describe() agrupa tests relacionados
test.describe('Login Page', () => {
  test('shows email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('shows error with empty fields', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Email is required')).toBeVisible();
  });

  test('successful login redirects', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('test@test.com');
    await page.getByLabel('Password').fill('pass123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/dashboard/);
  });
});`,
      caption: {
        es: "describe() agrupa tests que comparten un contexto lógico (ej: misma página)",
        en: "describe() groups tests that share a logical context (e.g., same page)",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Hooks: beforeEach y afterEach",
        en: "Hooks: beforeEach and afterEach",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Los hooks son funciones que se ejecutan antes o después de cada test. Son ideales para tareas repetitivas como navegar a una página, limpiar estado o tomar screenshots tras un fallo.",
        en: "Hooks are functions that run before or after each test. They're ideal for repetitive tasks like navigating to a page, cleaning up state, or taking screenshots after a failure.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  // Se ejecuta ANTES de cada test en este describe
  test.beforeEach(async ({ page }) => {
    // Navegar a la página de login y autenticarse
    await page.goto('/login');
    await page.getByLabel('Email').fill('user@test.com');
    await page.getByLabel('Password').fill('pass123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  // Se ejecuta DESPUÉS de cada test
  test.afterEach(async ({ page }) => {
    // Limpiar: cerrar sesión
    await page.getByRole('button', { name: 'Sign Out' }).click();
  });

  test('dashboard shows welcome message', async ({ page }) => {
    await expect(page.getByText('Welcome back')).toBeVisible();
  });

  test('dashboard shows user modules', async ({ page }) => {
    await expect(page.getByText('Your Modules')).toBeVisible();
  });
});`,
      caption: {
        es: "hooks evitan duplicar código de setup en cada test",
        en: "hooks avoid duplicating setup code in each test",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 También existen `beforeAll` y `afterAll` que se ejecutan UNA vez por bloque describe, no por test. Úsalos con cuidado — pierden el aislamiento entre tests.",
        en: "💡 There are also `beforeAll` and `afterAll` that run ONCE per describe block, not per test. Use them carefully — they lose isolation between tests.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Anotaciones: skip, only, fixme",
        en: "Annotations: skip, only, fixme",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Saltar un test (útil cuando sabes que fallará temporalmente)
test.skip('feature not yet implemented', async ({ page }) => {
  // ...
});

// Ejecutar SOLO este test (ideal para depuración)
test.only('debug this specific test', async ({ page }) => {
  // ...
});

// Marcar como pendiente de arreglar
test.fixme('broken due to API change', async ({ page }) => {
  // ...
});

// Anotaciones también funcionan en describe()
test.describe.skip('Whole suite skipped', () => { /* ... */ });`,
      caption: {
        es: "Anotaciones te ayudan a gestionar tests en desarrollo activo",
        en: "Annotations help you manage tests in active development",
      },
    },
    {
      type: "quiz",
      questionId: "m2-l3-quiz",
      question: {
        es: "¿Cuál es la diferencia principal entre `beforeEach` y `beforeAll`?",
        en: "What is the main difference between `beforeEach` and `beforeAll`?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "beforeEach se ejecuta antes de cada test; beforeAll se ejecuta UNA vez antes de todos los tests del bloque",
            en: "beforeEach runs before each test; beforeAll runs ONCE before all tests in the block",
          },
        },
        {
          id: "b",
          text: {
            es: "No hay diferencia, son alias del mismo hook",
            en: "There is no difference, they are aliases of the same hook",
          },
        },
        {
          id: "c",
          text: {
            es: "beforeAll solo funciona en describe() de nivel superior",
            en: "beforeAll only works in top-level describe()",
          },
        },
        {
          id: "d",
          text: {
            es: "beforeEach es más rápido porque se ejecuta en paralelo",
            en: "beforeEach is faster because it runs in parallel",
          },
        },
      ],
      correctOptionId: "a",
      explanation: {
        es: "`beforeEach` se ejecuta antes de CADA test individual — ideal para resetear el estado y garantizar aislamiento. `beforeAll` se ejecuta UNA SOLA VEZ antes de que cualquier test en el bloque comience — útil para operaciones costosas como crear datos de prueba, pero sacrifica el aislamiento entre tests.",
        en: "`beforeEach` runs before EACH individual test — ideal for resetting state and ensuring isolation. `beforeAll` runs ONLY ONCE before any test in the block starts — useful for expensive operations like creating test data, but sacrifices isolation between tests.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 2.4 — Browsers: Chromium, Firefox, WebKit                   */
/* ================================================================== */

const L2_4: LessonContent = {
  id: "m2-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Navegadores: Chromium, Firefox, WebKit",
        en: "Browsers: Chromium, Firefox, WebKit",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Una de las características más potentes de Playwright es su soporte nativo para los tres motores de navegador principales. No necesitas WebDrivers, instalaciones separadas ni configuraciones complejas. Todo viene incluido.",
        en: "One of Playwright's most powerful features is its native support for all three major browser engines. You don't need WebDrivers, separate installations, or complex configurations. Everything is included.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Los tres navegadores",
        en: "The three browsers",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Chromium: Motor de Google Chrome y Microsoft Edge. ~75% de cuota de mercado. Ideal para testear la experiencia de la mayoría de usuarios.",
          en: "Chromium: Engine behind Google Chrome and Microsoft Edge. ~75% market share. Ideal for testing the experience of most users.",
        },
        {
          es: "Firefox: Motor de Mozilla Firefox. Importante para organizaciones que usan Firefox internamente o audiencias de código abierto.",
          en: "Firefox: Engine behind Mozilla Firefox. Important for organisations that use Firefox internally or open-source audiences.",
        },
        {
          es: "WebKit: Motor de Safari (Apple). CRUCIAL para apps con usuarios de iPhone/Mac. Muchos bugs CSS y JS solo aparecen en Safari.",
          en: "WebKit: Engine behind Safari (Apple). CRUCIAL for apps with iPhone/Mac users. Many CSS and JS bugs only appear in Safari.",
        },
      ],
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// Ejecutar un test en Chromium (por defecto)
test('works in Chromium', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/PlayQ/);
});

// Forzar Firefox para un test específico
test('works in Firefox', async ({ browser }) => {
  const context = await browser.newContext({
    // browser ya es Firefox gracias a la configuración
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveTitle(/PlayQ/);
});`,
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Configuración multi-navegador en playwright.config.ts",
        en: "Multi-browser configuration in playwright.config.ts",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Navegadores de escritorio
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

    // Dispositivos móviles (también usan navegadores)
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});`,
      caption: {
        es: "Define proyectos para cada navegador; Playwright ejecuta tests en todos simultáneamente",
        en: "Define projects for each browser; Playwright runs tests on all simultaneously",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Cada proyecto en `projects[]` se ejecuta en PARALELO (respetando el límite de workers). Si tienes 3 navegadores y 4 workers, Playwright ejecutará hasta 4 tests simultáneos, distribuyéndolos entre los navegadores.",
        en: "Each project in `projects[]` runs in PARALLEL (respecting the worker limit). If you have 3 browsers and 4 workers, Playwright will run up to 4 tests simultaneously, distributing them across browsers.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Browser Contexts: aislamiento por test",
        en: "Browser Contexts: per-test isolation",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Un Browser Context es como un perfil de navegador independiente. Dos contextos no comparten cookies, localStorage, sesiones ni estado. Playwright crea un nuevo contexto para cada test automáticamente. Esto significa que cada test empieza desde cero, sin importar el orden de ejecución.",
        en: "A Browser Context is like an independent browser profile. Two contexts don't share cookies, localStorage, sessions, or state. Playwright creates a new context for each test automatically. This means each test starts fresh, regardless of execution order.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('context A: logged in as admin', async ({ browser }) => {
  // Crear un contexto con rol de admin
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/login');
  // ... login as admin
  await context.close();
});

test('context B: logged in as user', async ({ browser }) => {
  // Este contexto está COMPLETAMENTE aislado del anterior
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('/login');
  // ... login as regular user
  await context.close();
});

// AMBOS tests pueden ejecutarse en paralelo sin interferir`,
      caption: {
        es: "Dos contextos = dos perfiles de navegador independientes ejecutándose en paralelo",
        en: "Two contexts = two independent browser profiles running in parallel",
      },
    },
    {
      type: "quiz",
      questionId: "m2-l4-quiz",
      question: {
        es: "¿Por qué es importante probar en WebKit además de Chromium?",
        en: "Why is it important to test on WebKit in addition to Chromium?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Porque WebKit es más rápido que Chromium",
            en: "Because WebKit is faster than Chromium",
          },
        },
        {
          id: "b",
          text: {
            es: "Porque Safari usa WebKit y tiene comportamientos diferentes de CSS/JS que pueden causar bugs que no aparecen en Chrome",
            en: "Because Safari uses WebKit and has different CSS/JS behaviours that can cause bugs not seen in Chrome",
          },
        },
        {
          id: "c",
          text: {
            es: "Porque WebKit es el navegador más usado del mundo",
            en: "Because WebKit is the world's most used browser",
          },
        },
        {
          id: "d",
          text: {
            es: "Porque Playwright solo funciona en WebKit",
            en: "Because Playwright only works on WebKit",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Safari (motor WebKit) es el navegador por defecto en todos los dispositivos Apple (iPhone, iPad, Mac). WebKit tiene diferencias sutiles en cómo renderiza CSS, maneja JavaScript y soporta APIs web. Bugs que no aparecen en Chrome pueden manifestarse en Safari. Probar en WebKit es esencial si tu aplicación tiene usuarios de Apple.",
        en: "Safari (WebKit engine) is the default browser on all Apple devices (iPhone, iPad, Mac). WebKit has subtle differences in how it renders CSS, handles JavaScript, and supports web APIs. Bugs that don't appear in Chrome can manifest in Safari. Testing on WebKit is essential if your app has Apple users.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 2.5 — Headless vs Headed mode                               */
/* ================================================================== */

const L2_5: LessonContent = {
  id: "m2-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Modo Headless vs Headed",
        en: "Headless vs Headed mode",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Por defecto, Playwright ejecuta los navegadores en modo 'headless' — sin interfaz gráfica. Esto es ideal para CI/CD porque es más rápido y no requiere un entorno gráfico. Pero durante el desarrollo, ver el navegador en acción es invaluable para depurar.",
        en: "By default, Playwright runs browsers in 'headless' mode — without a graphical interface. This is ideal for CI/CD because it's faster and doesn't require a graphical environment. But during development, seeing the browser in action is invaluable for debugging.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Activar el modo headed",
        en: "Enabling headed mode",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Ver el navegador durante la ejecución\nnpx playwright test --headed\n\n# Modo UI: la forma más moderna de depurar\nnpx playwright test --ui\n\n# Modo debug: ejecución paso a paso con inspector\nnpx playwright test --debug\n\n# Desde código: configurar en playwright.config.ts\n// use: { headless: false }`,
      caption: {
        es: "Tres modos de ver lo que Playwright está haciendo",
        en: "Three ways to see what Playwright is doing",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 El Modo UI (`--ui`) es la mejor herramienta de depuración para el día a día. Te muestra una timeline de cada acción, puedes hacer clic en cualquier paso para ver el estado de la página, y tiene un 'watch mode' que re-ejecuta tests al guardar.",
        en: "💡 UI Mode (`--ui`) is the best daily debugging tool. It shows a timeline of every action, you can click any step to see the page state, and it has a 'watch mode' that re-runs tests on save.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Slow motion: ralentizar la ejecución",
        en: "Slow motion: slowing down execution",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "A veces los tests pasan demasiado rápido para entender qué está pasando. La opción `slowMo` añade un retraso artificial entre cada acción, permitiéndote seguir visualmente el flujo del test.",
        en: "Sometimes tests run too fast to understand what's happening. The `slowMo` option adds an artificial delay between each action, letting you visually follow the test flow.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// En playwright.config.ts: ralentizar todo
export default defineConfig({
  use: {
    launchOptions: {
      slowMo: 500, // 500ms entre cada acción
    },
  },
});

// O desde línea de comandos para un test específico (requiere headed)
npx playwright test --headed --slowmo=1000`,
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Variables de entorno para depuración",
        en: "Environment variables for debugging",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Modo debug con pausa automática en cada paso
PWDEBUG=1 npx playwright test

# Modo debug con inspector en un puerto específico
PWDEBUG=console npx playwright test

# Verbose: ver cada acción en la consola
DEBUG=pw:api npx playwright test`,
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ NO uses `--headed` o `slowMo` en CI/CD. Ralentizaría drásticamente los pipelines y consumiría recursos innecesarios. Headless es la configuración correcta para entornos de integración continua.",
        en: "⚠️ DO NOT use `--headed` or `slowMo` in CI/CD. It would drastically slow down pipelines and consume unnecessary resources. Headless is the correct setting for continuous integration environments.",
      },
    },
    {
      type: "quiz",
      questionId: "m2-l5-quiz",
      question: {
        es: "¿Cuál es la mejor herramienta para depurar un test de Playwright durante el desarrollo diario?",
        en: "What is the best tool for debugging a Playwright test during daily development?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Ejecutar con console.log en cada línea",
            en: "Running with console.log on every line",
          },
        },
        {
          id: "b",
          text: {
            es: "El Modo UI (--ui) que muestra una timeline interactiva de cada paso",
            en: "UI Mode (--ui) which shows an interactive timeline of every step",
          },
        },
        {
          id: "c",
          text: {
            es: "Poner slowMo a 10000ms y esperar",
            en: "Setting slowMo to 10000ms and waiting",
          },
        },
        {
          id: "d",
          text: {
            es: "Solo leer los logs del reporte HTML",
            en: "Just reading the HTML report logs",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El Modo UI es una herramienta gráfica integrada que muestra cada acción del test en una timeline, capturas de pantalla en cada paso, y permite inspeccionar el DOM y los logs. Es mucho más eficiente que console.log o slowMo, que son soluciones manuales y lentas.",
        en: "UI Mode is an integrated graphical tool that shows every test action on a timeline, screenshots at each step, and lets you inspect the DOM and logs. It's far more efficient than console.log or slowMo, which are manual and slow solutions.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 2.6 — Practical Exercise: Your first passing test           */
/* ================================================================== */

const L2_6: LessonContent = {
  id: "m2-l6",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Ejercicio práctico: Tu primer test que pasa",
        en: "Practical Exercise: Your first passing test",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has aprendido qué es Playwright, cómo instalarlo y cómo funciona el test runner. Ahora es momento de escribir tu primer test real contra el PlayQ Playground. Vas a automatizar el flujo de login que practicamos en el Módulo 1.",
        en: "You've learned what Playwright is, how to install it, and how the test runner works. Now it's time to write your first real test against the PlayQ Playground. You'll automate the login flow we practiced in Module 1.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Contexto del ejercicio",
        en: "Exercise context",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El PlayQ Playground tiene una página de login en `/playground/login`. Tu tarea es escribir un test que: (1) navegue a la página, (2) llene el formulario con credenciales válidas, (3) haga clic en Sign In, y (4) verifique que el login fue exitoso. También debes escribir un test para el caso de credenciales inválidas.",
        en: "The PlayQ Playground has a login page at `/playground/login`. Your task is to write a test that: (1) navigates to the page, (2) fills the form with valid credentials, (3) clicks Sign In, and (4) verifies the login was successful. You must also write a test for invalid credentials.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Tu punto de partida: un archivo tests/playground-login.spec.ts
import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  // 1. Navegar al Playground
  await page.goto('/playground/login');

  // 2. TODO: Llenar el formulario con credenciales de prueba
  // Pista: page.getByLabel('Email') y page.getByLabel('Password')

  // 3. TODO: Hacer clic en el botón de Sign In
  // Pista: page.getByRole('button', { name: 'Sign In' })

  // 4. TODO: Verificar que el login fue exitoso
  // Pista: expect(page.getByRole('heading', { name: 'Login Successful!' }))
});

test('login with wrong password shows error', async ({ page }) => {
  await page.goto('/playground/login');

  // TODO: Llenar con credenciales inválidas
  // TODO: Verificar mensaje de error
});`,
      caption: {
        es: "Esqueleto del test — completa las secciones TODO",
        en: "Test skeleton — complete the TODO sections",
      },
    },
    {
      type: "exercise",
      exerciseId: "m2-l6-exercise",
      instructions: {
        es: "Completa los dos tests de Playwright para el formulario de login del Playground:\n\n1. Crea un archivo `tests/playground-login.spec.ts`\n2. Configura `baseURL` en playwright.config.ts para que apunte al PlayQ Playground\n3. Escribe el test de login exitoso con:\n   - `page.getByLabel('Email').fill('student@playq.test')`\n   - `page.getByLabel('Password').fill('Playwright123!')`\n   - `page.getByRole('button', { name: 'Sign In' }).click()`\n   - `expect(page.getByRole('heading', { name: 'Login Successful!' })).toBeVisible()`\n4. Escribe el test de credenciales inválidas\n5. Ejecuta con `npx playwright test` y verifica que ambos pasan",
        en: "Complete the two Playwright tests for the Playground login form:\n\n1. Create a file `tests/playground-login.spec.ts`\n2. Configure `baseURL` in playwright.config.ts to point to the PlayQ Playground\n3. Write the successful login test with:\n   - `page.getByLabel('Email').fill('student@playq.test')`\n   - `page.getByLabel('Password').fill('Playwright123!')`\n   - `page.getByRole('button', { name: 'Sign In' }).click()`\n   - `expect(page.getByRole('heading', { name: 'Login Successful!' })).toBeVisible()`\n4. Write the invalid credentials test\n5. Run with `npx playwright test` and verify both pass",
      },
      starterCode: `import { test, expect } from '@playwright/test';

// Configura baseURL en playwright.config.ts:
// use: { baseURL: 'http://localhost:3000/es' }

test('login with valid credentials', async ({ page }) => {
  await page.goto('/playground/login');

  // TODO: Fill form fields using getByLabel
  // TODO: Click Sign In button using getByRole
  // TODO: Verify successful login
});

test('login with wrong password shows error', async ({ page }) => {
  await page.goto('/playground/login');

  // TODO: Fill with invalid credentials
  // TODO: Verify error message appears
});`,
      solution: `import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  await page.goto('/playground/login');

  // Fill the form using semantic locators
  await page.getByLabel('Email').fill('student@playq.test');
  await page.getByLabel('Password').fill('Playwright123!');

  // Submit
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Assert success
  await expect(
    page.getByRole('heading', { name: 'Login Successful!' })
  ).toBeVisible();
  await expect(page.getByText('Welcome back')).toBeVisible();
  await expect(page.getByText('student@playq.test')).toBeVisible();
});

test('login with wrong password shows error', async ({ page }) => {
  await page.goto('/playground/login');

  // Fill with invalid credentials
  await page.getByLabel('Email').fill('student@playq.test');
  await page.getByLabel('Password').fill('WrongPassword123');

  // Submit
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Assert error message
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('alert')).toContainText(
    'Invalid email or password'
  );
});

test('empty fields show validation errors', async ({ page }) => {
  await page.goto('/playground/login');

  // Submit without filling anything
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Assert validation messages
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
});`,
      hints: [
        {
          es: "Usa `page.getByLabel('Email')` y `page.getByLabel('Password')` para los campos del formulario. Estos localizadores funcionan porque los campos tienen etiquetas <label> asociadas.",
          en: "Use `page.getByLabel('Email')` and `page.getByLabel('Password')` for the form fields. These locators work because the fields have associated <label> elements.",
        },
        {
          es: "El botón de Sign In se localiza con `page.getByRole('button', { name: 'Sign In' })`. Playwright busca un elemento con role='button' cuyo texto accesible sea 'Sign In'.",
          en: "The Sign In button is located with `page.getByRole('button', { name: 'Sign In' })`. Playwright looks for an element with role='button' whose accessible text is 'Sign In'.",
        },
        {
          es: "Para verificar el mensaje de error, usa `page.getByRole('alert')` — el elemento de error tiene role='alert'. Luego verifica su texto con `.toContainText('Invalid email or password')`.",
          en: "To verify the error message, use `page.getByRole('alert')` — the error element has role='alert'. Then verify its text with `.toContainText('Invalid email or password')`.",
        },
        {
          es: "Las credenciales de prueba son: `student@playq.test` / `Playwright123!`. Están documentadas en la misma página de login del Playground.",
          en: "Test credentials are: `student@playq.test` / `Playwright123!`. They're documented on the Playground login page itself.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Regla de oro que aplicamos aquí: SIEMPRE usa localizadores semánticos (getByRole, getByLabel, getByText) antes de recurrir a selectores CSS o XPath. Esto hace tus tests más accesibles, más mantenibles y más cercanos a cómo un usuario real interactúa con la página.",
        en: "🔑 Golden rule we're applying here: ALWAYS use semantic locators (getByRole, getByLabel, getByText) before falling back to CSS or XPath selectors. This makes your tests more accessible, more maintainable, and closer to how a real user interacts with the page.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Verifica tu solución",
        en: "Verify your solution",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          es: "¿Ambos tests pasan con `npx playwright test`?",
          en: "Do both tests pass with `npx playwright test`?",
        },
        {
          es: "¿Usaste `getByLabel` para los campos y `getByRole` para los botones?",
          en: "Did you use `getByLabel` for fields and `getByRole` for buttons?",
        },
        {
          es: "¿Verificaste tanto el caso exitoso como el de error?",
          en: "Did you verify both the success and error cases?",
        },
        {
          es: "¿El test de credenciales inválidas usa `getByRole('alert')`?",
          en: "Does the invalid credentials test use `getByRole('alert')`?",
        },
        {
          es: "¿Tu baseURL está configurada en playwright.config.ts?",
          en: "Is your baseURL configured in playwright.config.ts?",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m2-l6-quiz",
      question: {
        es: "¿Por qué usamos `getByLabel` y `getByRole` en lugar de selectores CSS como `#email` o `.login-button`?",
        en: "Why do we use `getByLabel` and `getByRole` instead of CSS selectors like `#email` or `.login-button`?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Porque son más cortos de escribir",
            en: "Because they're shorter to write",
          },
        },
        {
          id: "b",
          text: {
            es: "Porque localizan elementos de la misma forma que un usuario real (por etiqueta visible, rol accesible) y no se rompen cuando cambian clases CSS",
            en: "Because they locate elements the same way a real user does (by visible label, accessible role) and don't break when CSS classes change",
          },
        },
        {
          id: "c",
          text: {
            es: "Porque son más rápidos en ejecución",
            en: "Because they're faster at runtime",
          },
        },
        {
          id: "d",
          text: {
            es: "Porque CSS no funciona en Playwright",
            en: "Because CSS doesn't work in Playwright",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Los localizadores semánticos (`getByRole`, `getByLabel`, `getByText`) son la estrategia recomendada por Playwright. Localizan elementos basándose en cómo los usuarios reales los perciben (etiquetas, roles, texto visible), no en detalles de implementación como IDs o clases CSS que los desarrolladores cambian frecuentemente. Esto hace que los tests sean mucho más resistentes a refactorizaciones de UI.",
        en: "Semantic locators (`getByRole`, `getByLabel`, `getByText`) are Playwright's recommended strategy. They locate elements based on how real users perceive them (labels, roles, visible text), not implementation details like IDs or CSS classes that developers change frequently. This makes tests much more resistant to UI refactoring.",
      },
    },
  ],
  resources: [
    {
      title: { es: "PlayQ Playground — Login", en: "PlayQ Playground — Login" },
      url: "/playground/login",
    },
    {
      title: { es: "Playwright — Escribiendo tests", en: "Playwright — Writing tests" },
      url: "https://playwright.dev/docs/writing-tests",
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_2_LESSONS: LessonContent[] = [L2_1, L2_2, L2_3, L2_4, L2_5, L2_6];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_2_LESSONS;
}
