/**
 * PlayQ Academy — Full typed curriculum.
 *
 * This module defines every module and lesson available in the platform.
 * It serves as the single source of truth for:
 *   - Course content rendering
 *   - Progress tracking (unlock logic)
 *   - Dashboard module cards
 *   - Sidebar navigation
 *
 * The curriculum IS the course. Nothing is stored in Firestore beyond
 * user progress (completed lesson IDs).
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface CurriculumLesson {
  id: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  estimatedMinutes: number;
}

export interface CurriculumModule {
  id: string;
  order: number;
  title: { es: string; en: string };
  description: { es: string; en: string };
  estimatedMinutes: number;
  difficulty: Difficulty;
  /** Whether the module starts locked (modules 4+ locked by default). */
  isLocked: boolean;
  lessons: CurriculumLesson[];
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lesson(
  id: string,
  esTitle: string,
  enTitle: string,
  esDesc: string,
  enDesc: string,
  minutes: number
): CurriculumLesson {
  return {
    id,
    title: { es: esTitle, en: enTitle },
    description: { es: esDesc, en: enDesc },
    estimatedMinutes: minutes,
  };
}

function module_(
  id: string,
  order: number,
  esTitle: string,
  enTitle: string,
  esDesc: string,
  enDesc: string,
  minutes: number,
  difficulty: Difficulty,
  isLocked: boolean,
  lessons: CurriculumLesson[]
): CurriculumModule {
  return {
    id,
    order,
    title: { es: esTitle, en: enTitle },
    description: { es: esDesc, en: enDesc },
    estimatedMinutes: minutes,
    difficulty,
    isLocked,
    lessons,
  };
}

/* ------------------------------------------------------------------ */
/*  Curriculum                                                         */
/* ------------------------------------------------------------------ */

export const CURRICULUM: CurriculumModule[] = [
  /* ---------- Module 1 ---------- */
  module_(
    "m1-typescript-foundations",
    1,
    "Fundamentos de TypeScript para QA",
    "TypeScript Foundations for QA",
    "Domina los conceptos esenciales de TypeScript aplicados a la automatización de pruebas.",
    "Master essential TypeScript concepts applied to test automation.",
    90,
    "beginner",
    false,
    [
      lesson(
        "m1-l1",
        "¿Por qué TypeScript para automatización de pruebas?",
        "Why TypeScript for Test Automation",
        "Descubre las ventajas del tipado estático, el autocompletado y la detección temprana de errores en tus scripts de pruebas.",
        "Discover the advantages of static typing, autocompletion, and early error detection in your test scripts.",
        15
      ),
      lesson(
        "m1-l2",
        "Tipos, Interfaces y Enums en pruebas",
        "Types, Interfaces and Enums in Tests",
        "Aprende a modelar datos de prueba con interfaces, usar tipos para parámetros de funciones de test y enums para estados.",
        "Learn to model test data with interfaces, use types for test function parameters, and enums for states.",
        20
      ),
      lesson(
        "m1-l3",
        "Async/Await y Promises",
        "Async/Await and Promises",
        "Entiende el modelo asíncrono de JavaScript y cómo Playwright lo utiliza para esperar elementos automáticamente.",
        "Understand JavaScript's async model and how Playwright uses it to auto-wait for elements.",
        20
      ),
      lesson(
        "m1-l4",
        "Funciones y Arrow Functions",
        "Functions and Arrow Functions",
        "Diferencias entre function declarations, arrow functions y su impacto en el scope de this en pruebas.",
        "Differences between function declarations, arrow functions, and their impact on this scope in tests.",
        15
      ),
      lesson(
        "m1-l5",
        "Ejercicio práctico: Tipa tu primer archivo de test",
        "Practical Exercise: Type your first test file",
        "Pon en práctica todo lo aprendido creando un archivo de prueba completamente tipado desde cero.",
        "Put everything into practice by creating a fully typed test file from scratch.",
        20
      ),
    ]
  ),

  /* ---------- Module 2 ---------- */
  module_(
    "m2-playwright-fundamentals",
    2,
    "Fundamentos de Playwright",
    "Playwright Fundamentals",
    "Instala, configura y ejecuta tu primer test con Playwright. Conoce los navegadores y modos de ejecución.",
    "Install, configure, and run your first Playwright test. Learn about browsers and execution modes.",
    120,
    "beginner",
    false,
    [
      lesson(
        "m2-l1",
        "¿Qué es Playwright y por qué gana?",
        "What is Playwright and why it wins",
        "Comparativa con Selenium y Cypress: velocidad, fiabilidad, auto-waiting y soporte multi-browser nativo.",
        "Comparison with Selenium and Cypress: speed, reliability, auto-waiting, and native multi-browser support.",
        20
      ),
      lesson(
        "m2-l2",
        "Instalación y primer test",
        "Installation and first test",
        "Guía paso a paso para instalar Playwright, configurar el proyecto y ejecutar tu primer test exitoso.",
        "Step-by-step guide to install Playwright, configure the project, and run your first passing test.",
        25
      ),
      lesson(
        "m2-l3",
        "Entendiendo el Test Runner",
        "Understanding the Test Runner",
        "Estructura de un test: describe, test, beforeEach, afterEach. Cómo Playwright organiza y ejecuta las pruebas.",
        "Test structure: describe, test, beforeEach, afterEach. How Playwright organises and runs tests.",
        20
      ),
      lesson(
        "m2-l4",
        "Navegadores: Chromium, Firefox, WebKit",
        "Browsers: Chromium, Firefox, WebKit",
        "Cómo Playwright maneja los tres motores de navegador y cuándo usar cada uno en tu suite de pruebas.",
        "How Playwright handles the three browser engines and when to use each in your test suite.",
        20
      ),
      lesson(
        "m2-l5",
        "Modo Headless vs Headed",
        "Headless vs Headed mode",
        "Diferencias entre ejecución con y sin interfaz gráfica. Cuándo usar cada modo en desarrollo y CI/CD.",
        "Differences between GUI and headless execution. When to use each mode in development and CI/CD.",
        15
      ),
      lesson(
        "m2-l6",
        "Ejercicio práctico: Tu primer test que pasa",
        "Practical Exercise: Your first passing test",
        "Crea un test completo que navegue, interactúe y verifique elementos en una página web real.",
        "Create a complete test that navigates, interacts with, and verifies elements on a real web page.",
        20
      ),
    ]
  ),

  /* ---------- Module 3 ---------- */
  module_(
    "m3-locators-selectors",
    3,
    "Localizadores y Selectores",
    "Locators and Selectors",
    "Domina la API de localizadores de Playwright para encontrar cualquier elemento de forma robusta y mantenible.",
    "Master the Playwright Locator API to find any element robustly and maintainably.",
    110,
    "beginner",
    false,
    [
      lesson(
        "m3-l1",
        "La API de Localizadores",
        "The Locator API",
        "Introducción a los localizadores de Playwright: qué son, cómo funcionan y por qué son superiores a los selectores CSS crudos.",
        "Introduction to Playwright locators: what they are, how they work, and why they are superior to raw CSS selectors.",
        20
      ),
      lesson(
        "m3-l2",
        "Localizadores por rol (getByRole)",
        "Role-based locators (getByRole)",
        "La forma más recomendada de localizar elementos: por su rol ARIA implícito o explícito. Accesibilidad como guía.",
        "The most recommended way to locate elements: by their implicit or explicit ARIA role. Accessibility as a guide.",
        20
      ),
      lesson(
        "m3-l3",
        "Localizadores por texto, label y placeholder",
        "Text, Label and Placeholder locators",
        "getByText, getByLabel, getByPlaceholder: localiza elementos como lo haría un usuario real.",
        "getByText, getByLabel, getByPlaceholder: locate elements like a real user would.",
        15
      ),
      lesson(
        "m3-l4",
        "CSS y XPath: cuándo (y por qué) evitarlos",
        "CSS and XPath: when (and why) to avoid them",
        "Casos límite donde CSS/XPath son necesarios y cómo minimizar su uso para mantener tests mantenibles.",
        "Edge cases where CSS/XPath are necessary and how to minimise their use to keep tests maintainable.",
        20
      ),
      lesson(
        "m3-l5",
        "Encadenamiento y filtrado de localizadores",
        "Chaining and filtering locators",
        "Cómo combinar localizadores con .locator().locator() y filtrar resultados con .filter() y .nth().",
        "How to combine locators with .locator().locator() and filter results with .filter() and .nth().",
        15
      ),
      lesson(
        "m3-l6",
        "Ejercicio práctico: Localiza elementos en la app PlayQ Playground",
        "Practical Exercise: Locate elements in the PlayQ Playground app",
        "Aplica todos los tipos de localizadores en una aplicación de práctica diseñada con casos complejos de UI.",
        "Apply all locator types in a practice app designed with complex UI cases.",
        20
      ),
    ]
  ),

  /* ---------- Module 4 — LOCKED ---------- */
  module_(
    "m4-actions-assertions",
    4,
    "Acciones y Aserciones",
    "Actions and Assertions",
    "Interactúa con la página y verifica resultados: clicks, inputs, expect() y el potente auto-waiting de Playwright.",
    "Interact with the page and verify results: clicks, inputs, expect(), and Playwright's powerful auto-waiting.",
    100,
    "intermediate",
    true,
    [
      lesson(
        "m4-l1",
        "Click, Fill, Type, Press",
        "Click, Fill, Type, Press",
        "Todas las acciones de interacción con la página: diferencias entre fill y type, doble click, right click y atajos de teclado.",
        "All page interaction actions: differences between fill and type, double click, right click, and keyboard shortcuts.",
        20
      ),
      lesson(
        "m4-l2",
        "expect() y tipos de aserción",
        "expect() and assertion types",
        "Visibilidad, texto, valor, atributos, estado: todas las aserciones que necesitas para validar tu aplicación.",
        "Visibility, text, value, attributes, state: all assertions you need to validate your application.",
        20
      ),
      lesson(
        "m4-l3",
        "Soft assertions",
        "Soft assertions",
        "expect.soft(): cómo ejecutar múltiples verificaciones sin detener el test en el primer fallo.",
        "expect.soft(): how to run multiple checks without stopping the test on the first failure.",
        15
      ),
      lesson(
        "m4-l4",
        "Auto-waiting explicado",
        "Auto-waiting explained",
        "El secreto de la fiabilidad de Playwright: cómo espera automáticamente a que los elementos estén listos antes de actuar.",
        "The secret behind Playwright's reliability: how it automatically waits for elements to be ready before acting.",
        20
      ),
      lesson(
        "m4-l5",
        "Ejercicio práctico: Automatiza un flujo de login",
        "Practical Exercise: Automate a login flow",
        "Crea un test completo de inicio de sesión con credenciales válidas e inválidas, verificando mensajes de error.",
        "Create a complete login test with valid and invalid credentials, verifying error messages.",
        25
      ),
    ]
  ),

  /* ---------- Module 5 — LOCKED ---------- */
  module_(
    "m5-page-object-model",
    5,
    "Page Object Model",
    "Page Object Model",
    "Organiza tus tests como un profesional con el patrón POM. Crea page objects reutilizables y mantenibles con TypeScript.",
    "Organise your tests like a pro with the POM pattern. Create reusable, maintainable page objects with TypeScript.",
    95,
    "intermediate",
    true,
    [
      lesson(
        "m5-l1",
        "Por qué POM importa",
        "Why POM matters",
        "El problema del código duplicado en tests y cómo Page Object Model resuelve el mantenimiento a largo plazo.",
        "The problem of duplicated code in tests and how Page Object Model solves long-term maintenance.",
        15
      ),
      lesson(
        "m5-l2",
        "Construyendo tu primera Page class",
        "Building your first Page class",
        "Paso a paso: encapsula selectores y acciones en una clase TypeScript que representa una página de tu aplicación.",
        "Step by step: encapsulate selectors and actions in a TypeScript class that represents a page of your application.",
        25
      ),
      lesson(
        "m5-l3",
        "Componiendo Page Objects",
        "Composing Page Objects",
        "Cómo un page object puede devolver otros page objects para modelar la navegación entre páginas de forma fluida.",
        "How a page object can return other page objects to model page navigation fluently.",
        20
      ),
      lesson(
        "m5-l4",
        "POM con interfaces de TypeScript",
        "POM with TypeScript interfaces",
        "Usa interfaces para definir contratos claros entre tus page objects y los tests que los consumen.",
        "Use interfaces to define clear contracts between your page objects and the tests that consume them.",
        15
      ),
      lesson(
        "m5-l5",
        "Ejercicio práctico: Refactoriza tests a POM",
        "Practical Exercise: Refactor tests to POM",
        "Toma un test con selectores dispersos y refactorízalo usando Page Object Model con tipado estricto.",
        "Take a test with scattered selectors and refactor it using Page Object Model with strict typing.",
        20
      ),
    ]
  ),

  /* ---------- Module 6 — LOCKED ---------- */
  module_(
    "m6-configuration-environments",
    6,
    "Configuración y Entornos",
    "Configuration and Environments",
    "Domina playwright.config.ts para ejecutar tests en múltiples navegadores, dispositivos y entornos simultáneamente.",
    "Master playwright.config.ts to run tests across multiple browsers, devices, and environments simultaneously.",
    80,
    "intermediate",
    true,
    [
      lesson(
        "m6-l1",
        "playwright.config.ts en profundidad",
        "playwright.config.ts deep dive",
        "Explora cada sección del archivo de configuración: timeout, retries, workers, reporter y más.",
        "Explore every section of the configuration file: timeout, retries, workers, reporter, and more.",
        25
      ),
      lesson(
        "m6-l2",
        "Múltiples proyectos (navegadores + dispositivos)",
        "Multiple projects (browsers + devices)",
        "Configura proyectos para ejecutar tests en Chromium, Firefox y WebKit, además de emular dispositivos móviles.",
        "Configure projects to run tests on Chromium, Firefox, and WebKit, plus emulate mobile devices.",
        20
      ),
      lesson(
        "m6-l3",
        "Variables de entorno en tests",
        "Environment variables in tests",
        "Gestiona URLs, credenciales y configuraciones sensibles por entorno (dev, staging, prod) sin hardcodear valores.",
        "Manage URLs, credentials, and sensitive configurations per environment (dev, staging, prod) without hardcoding values.",
        15
      ),
      lesson(
        "m6-l4",
        "Ejercicio práctico: Configuración multi-browser",
        "Practical Exercise: Multi-browser config",
        "Configura tu proyecto para ejecutar todos los tests en tres navegadores simultáneamente y verifica los reportes.",
        "Configure your project to run all tests on three browsers simultaneously and verify the reports.",
        20
      ),
    ]
  ),

  /* ---------- Module 7 — LOCKED ---------- */
  module_(
    "m7-api-testing",
    7,
    "API Testing con Playwright",
    "API Testing with Playwright",
    "Playwright no es solo UI: aprende a probar APIs REST directamente, mezclar tests UI+API y mockear respuestas.",
    "Playwright isn't just UI: learn to test REST APIs directly, mix UI+API tests, and mock responses.",
    90,
    "advanced",
    true,
    [
      lesson(
        "m7-l1",
        "APIRequestContext",
        "APIRequestContext",
        "Introducción al cliente HTTP integrado de Playwright para realizar peticiones API sin necesidad de librerías externas.",
        "Introduction to Playwright's built-in HTTP client for making API requests without external libraries.",
        20
      ),
      lesson(
        "m7-l2",
        "GET, POST, PUT, DELETE",
        "GET, POST, PUT, DELETE requests",
        "Realiza peticiones HTTP completas, verifica códigos de estado, headers y cuerpos de respuesta JSON.",
        "Perform full HTTP requests, verify status codes, headers, and JSON response bodies.",
        20
      ),
      lesson(
        "m7-l3",
        "Mezclando tests UI y API",
        "Mixing UI and API tests",
        "Combina interacciones de UI con llamadas API en un mismo test para flujos end-to-end más rápidos y fiables.",
        "Combine UI interactions with API calls in the same test for faster, more reliable end-to-end flows.",
        15
      ),
      lesson(
        "m7-l4",
        "Mockeando respuestas API",
        "Mocking API responses",
        "Usa route.fulfill() para simular respuestas del backend y probar escenarios de error sin depender del servidor real.",
        "Use route.fulfill() to simulate backend responses and test error scenarios without depending on the real server.",
        15
      ),
      lesson(
        "m7-l5",
        "Ejercicio práctico: Testea una API REST",
        "Practical Exercise: Test a REST API",
        "Escribe tests para todos los endpoints de una API REST: CRUD completo con validación de respuestas.",
        "Write tests for all endpoints of a REST API: full CRUD with response validation.",
        20
      ),
    ]
  ),

  /* ---------- Module 8 — LOCKED ---------- */
  module_(
    "m8-cicd-reporting",
    8,
    "CI/CD y Reportes",
    "CI/CD and Reporting",
    "Integra tus tests en pipelines de GitHub Actions y genera reportes profesionales con HTML Reporter y Allure.",
    "Integrate your tests into GitHub Actions pipelines and generate professional reports with HTML Reporter and Allure.",
    85,
    "advanced",
    true,
    [
      lesson(
        "m8-l1",
        "HTML Reporter en profundidad",
        "HTML Reporter deep dive",
        "Explora el reporte HTML nativo de Playwright: trazas, screenshots, videos y cómo navegar los resultados de tests fallidos.",
        "Explore Playwright's native HTML report: traces, screenshots, videos, and how to navigate failed test results.",
        20
      ),
      lesson(
        "m8-l2",
        "Configuración de GitHub Actions",
        "GitHub Actions setup",
        "Crea un workflow completo que ejecute tus tests en cada push y pull request en múltiples navegadores.",
        "Create a complete workflow that runs your tests on every push and pull request across multiple browsers.",
        20
      ),
      lesson(
        "m8-l3",
        "Trace Viewer en CI",
        "Trace Viewer in CI",
        "Cómo subir y visualizar trazas de Playwright como artefactos de CI para depurar fallos en pipelines.",
        "How to upload and view Playwright traces as CI artifacts to debug pipeline failures.",
        15
      ),
      lesson(
        "m8-l4",
        "Integración con Allure Reporter",
        "Allure Reporter integration",
        "Configura Allure para generar reportes con histórico de ejecuciones, gráficos de tendencia y categorías de fallos.",
        "Configure Allure to generate reports with execution history, trend charts, and failure categories.",
        15
      ),
      lesson(
        "m8-l5",
        "Ejercicio práctico: Pipeline completo en GitHub",
        "Practical Exercise: Full pipeline on GitHub",
        "Configura un repositorio con GitHub Actions que ejecute tests, genere reportes y los despliegue en GitHub Pages.",
        "Configure a repository with GitHub Actions that runs tests, generates reports, and deploys them to GitHub Pages.",
        15
      ),
    ]
  ),
];

/* ------------------------------------------------------------------ */
/*  Derived data                                                       */
/* ------------------------------------------------------------------ */

/** Flat array of all lessons across all modules with deconstructed IDs. */
export interface FlatLesson extends CurriculumLesson {
  moduleId: string;
  moduleOrder: number;
}

export const ALL_LESSONS: FlatLesson[] = CURRICULUM.flatMap((mod) =>
  mod.lessons.map((l) => ({
    ...l,
    moduleId: mod.id,
    moduleOrder: mod.order,
  }))
);

/** Total lesson count across the entire curriculum. */
export const TOTAL_LESSONS = ALL_LESSONS.length;

/** Total estimated minutes across all modules. */
export const TOTAL_ESTIMATED_MINUTES = CURRICULUM.reduce(
  (sum, m) => sum + m.estimatedMinutes,
  0
);

/** Lookup a module by its id. Returns undefined if not found. */
export function getModuleById(id: string): CurriculumModule | undefined {
  return CURRICULUM.find((m) => m.id === id);
}

/** Get a lesson from a module by their respective ids. */
export function getLessonById(
  moduleId: string,
  lessonId: string
): CurriculumLesson | undefined {
  const mod = getModuleById(moduleId);
  return mod?.lessons.find((l) => l.id === lessonId);
}
