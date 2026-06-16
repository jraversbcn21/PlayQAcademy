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

  /* ================================================================== */
  /*  ISTQB CTFL Foundation Modules (Campus 2)                           */
  /* ================================================================== */

  /* ---------- Module 9: ISTQB Fundamentals ---------- */
  module_(
    "istqb-fundamentals",
    9,
    "Fundamentos del Testing",
    "Fundamentals of Testing",
    "Qué es el testing, por qué es necesario, los 7 principios del testing y actividades del proceso.",
    "What testing is, why it is necessary, the 7 testing principles and testing process activities.",
    75,
    "beginner",
    false,
    [
      lesson("istqb-l1-1", "¿Qué es el testing?", "What is testing?", "Definición del testing de software, objetivos, testing vs depuración.", "Definition of software testing, objectives, testing vs debugging.", 15),
      lesson("istqb-l1-2", "¿Por qué es necesario el testing?", "Why is testing necessary?", "Razones para hacer testing, calidad, riesgo y reducción de costos.", "Reasons for testing, quality, risk and cost reduction.", 15),
      lesson("istqb-l1-3", "Los 7 Principios del Testing", "The 7 Testing Principles", "Principios fundamentales que guían la práctica del testing.", "Fundamental principles that guide testing practice.", 15),
      lesson("istqb-l1-4", "Actividades, testware y roles", "Testing activities, testware and roles", "Proceso de testing, artefactos y responsabilidades del equipo.", "Testing process, artifacts and team responsibilities.", 15),
      lesson("istqb-l1-5", "Habilidades esenciales en testing", "Essential skills in testing", "Competencias necesarias para un tester efectivo.", "Skills needed for an effective tester.", 15),
    ]
  ),

  /* ---------- Module 10: ISTQB SDLC ---------- */
  module_(
    "istqb-sdlc",
    10,
    "Testing a lo Largo del SDLC",
    "Testing Throughout the SDLC",
    "Cómo el testing se integra en los distintos modelos de desarrollo, niveles y tipos de prueba.",
    "How testing integrates into different development models, test levels and test types.",
    60,
    "beginner",
    false,
    [
      lesson("istqb-l2-1", "Testing en el contexto del SDLC", "Testing in the context of SDLC", "Modelos de desarrollo y cómo el testing se adapta a cada uno.", "Development models and how testing adapts to each one.", 15),
      lesson("istqb-l2-2", "Niveles de prueba", "Test levels", "Prueba de componente, integración, sistema y aceptación.", "Component, integration, system and acceptance testing.", 15),
      lesson("istqb-l2-3", "Tipos de prueba", "Test types", "Pruebas funcionales, no funcionales, estructurales y de cambios.", "Functional, non-functional, structural and change-related tests.", 15),
      lesson("istqb-l2-4", "Pruebas de mantenimiento", "Maintenance testing", "Testing sobre sistemas en producción ante cambios o migraciones.", "Testing on production systems when changes or migrations occur.", 15),
    ]
  ),

  /* ---------- Module 11: ISTQB Static Testing ---------- */
  module_(
    "istqb-static-testing",
    11,
    "Testing Estático",
    "Static Testing",
    "Revisiones estáticas, tipos de revisiones, beneficios del feedback temprano.",
    "Static reviews, review types, benefits of early feedback.",
    30,
    "intermediate",
    false,
    [
      lesson("istqb-l3-1", "Conceptos básicos del testing estático", "Basic concepts of static testing", "Qué es el testing estático, análisis estático y sus beneficios.", "What is static testing, static analysis and its benefits.", 15),
      lesson("istqb-l3-2", "El proceso de revisión", "The review process", "Tipos de revisión, roles formales y proceso paso a paso.", "Review types, formal roles and step-by-step process.", 15),
    ]
  ),

  /* ---------- Module 12: ISTQB Test Analysis ---------- */
  module_(
    "istqb-test-analysis",
    12,
    "Análisis y Diseño de Pruebas",
    "Test Analysis and Design",
    "Técnicas de caja negra, caja blanca, basadas en experiencia y colaborativas.",
    "Black-box, white-box, experience-based and collaboration-based techniques.",
    120,
    "intermediate",
    false,
    [
      lesson("istqb-l4-1", "Panorama de las técnicas de prueba", "Test techniques overview", "Categorías: caja negra, caja blanca, experiencia y colaboración.", "Categories: black-box, white-box, experience-based and collaboration.", 15),
      lesson("istqb-l4-2", "Técnicas de caja negra", "Black-box test techniques", "Partición de equivalencia, análisis de valor límite, tablas de decisión, transición de estado.", "Equivalence partitioning, boundary value analysis, decision tables, state transition.", 30),
      lesson("istqb-l4-3", "Técnicas de caja blanca", "White-box test techniques", "Cobertura de sentencia y cobertura de rama.", "Statement coverage and branch coverage.", 25),
      lesson("istqb-l4-4", "Técnicas basadas en experiencia", "Experience-based techniques", "Error guessing, testing exploratorio y basado en checklists.", "Error guessing, exploratory testing and checklist-based testing.", 25),
      lesson("istqb-l4-5", "Técnicas basadas en colaboración", "Collaboration-based techniques", "Escritura colaborativa de historias de usuario y ATDD.", "Collaborative user story writing and ATDD.", 25),
    ]
  ),

  /* ---------- Module 13: ISTQB Management ---------- */
  module_(
    "istqb-management",
    13,
    "Gestión de Actividades de Prueba",
    "Managing Test Activities",
    "Planificación, monitoreo, gestión de riesgos, configuración y gestión de defectos.",
    "Planning, monitoring, risk management, configuration management and defect management.",
    100,
    "intermediate",
    false,
    [
      lesson("istqb-l5-1", "Planificación de pruebas", "Test planning", "El plan de pruebas, criterios de entrada/salida, estimación del esfuerzo.", "The test plan, entry/exit criteria, effort estimation.", 20),
      lesson("istqb-l5-2", "Gestión de riesgos", "Risk management", "Riesgos de producto y proyecto, testing basado en riesgos.", "Product and project risks, risk-based testing.", 20),
      lesson("istqb-l5-3", "Monitoreo, control y completitud de pruebas", "Test monitoring, control and completion", "Métricas, informes, criterios de entrada/salida y gestión de completitud.", "Metrics, reports, entry/exit criteria and completion management.", 20),
      lesson("istqb-l5-4", "Gestión de la configuración", "Configuration management", "Ítems de configuración, control de versiones, línea base.", "Configuration items, version control, baseline.", 20),
      lesson("istqb-l5-5", "Gestión de defectos", "Defect management", "Ciclo de vida del defecto, informe de defecto, severidad vs prioridad.", "Defect lifecycle, defect report, severity vs priority.", 20),
    ]
  ),

  /* ---------- Module 14: ISTQB Tools ---------- */
  module_(
    "istqb-tools",
    14,
    "Soporte de Herramientas al Testing",
    "Tool Support for Testing",
    "Tipos de herramientas, beneficios, riesgos y consideraciones para su adopción.",
    "Tool types, benefits, risks and considerations for tool adoption.",
    20,
    "beginner",
    false,
    [
      lesson("istqb-l6-1", "Soporte de herramientas al testing", "Tool support for testing", "Categorías de herramientas, beneficios y riesgos de la automatización.", "Tool categories, benefits and risks of automation.", 20),
      lesson("istqb-l6-2", "Herramientas de gestión de pruebas", "Test management tools", "Gestión de casos, defectos y trazabilidad con Jira/Xray, Azure Test Plans y TestRail.", "Case, defect and traceability management with Jira/Xray, Azure Test Plans and TestRail.", 18),
      lesson("istqb-l6-3", "Automatización y análisis estático", "Automation and static analysis", "Cuándo automatizar, herramientas de análisis estático/cobertura y el ROI de la automatización.", "When to automate, static analysis/coverage tools and automation ROI.", 18),
    ]
  ),

  /* ================================================================== */
  /*  QA Fundamentals — QA Manual / Funcional (Campus 1)                 */
  /* ================================================================== */

  /* ---------- Module 15: Introducción al QA y al Testing ---------- */
  module_(
    "qaf-m1",
    15,
    "Introducción al QA y al Testing de Software",
    "Introduction to QA and Software Testing",
    "Qué es QA, qué hace un QA tester manual, error/defecto/fallo y los 7 principios del testing.",
    "What QA is, what a manual QA tester does, error/defect/failure and the 7 testing principles.",
    80,
    "beginner",
    false,
    [
      lesson("qaf-m1-l1", "¿Qué es QA y qué es el testing?", "What is QA and what is testing?", "Definición de aseguramiento de calidad y testing de software, y por qué es necesario.", "Definition of quality assurance and software testing, and why it is necessary.", 15),
      lesson("qaf-m1-l2", "QA vs QC vs Testing", "QA vs QC vs Testing", "Diferencias entre aseguramiento de calidad, control de calidad y testing.", "Differences between quality assurance, quality control and testing.", 15),
      lesson("qaf-m1-l3", "Error, defecto y fallo", "Error, defect and failure", "La cadena causa-efecto: error humano, defecto en el sistema y fallo observable.", "The cause-effect chain: human error, defect in the system and observable failure.", 15),
      lesson("qaf-m1-l4", "Los 7 principios del testing", "The 7 testing principles", "Principios fundamentales que guían toda práctica de testing.", "Fundamental principles that guide all testing practice.", 20),
      lesson("qaf-m1-l5", "El rol y la mentalidad del QA tester", "The QA tester role and mindset", "Responsabilidades, habilidades y mentalidad crítica del tester.", "Responsibilities, skills and critical mindset of the tester.", 15),
    ]
  ),

  /* ---------- Module 16: Fundamentos de Calidad de Software ---------- */
  module_(
    "qaf-m2",
    16,
    "Fundamentos de Calidad de Software",
    "Software Quality Fundamentals",
    "El modelo de calidad ISO/IEC 25010, calidad funcional vs no funcional y el coste de la calidad.",
    "The ISO/IEC 25010 quality model, functional vs non-functional quality and the cost of quality.",
    65,
    "beginner",
    false,
    [
      lesson("qaf-m2-l1", "¿Qué es la calidad del software?", "What is software quality?", "Definición de calidad y la perspectiva de las partes interesadas.", "Definition of quality and the stakeholders' perspective.", 15),
      lesson("qaf-m2-l2", "El modelo de calidad ISO/IEC 25010", "The ISO/IEC 25010 quality model", "Las características de calidad del producto de software y sus subcaracterísticas.", "Software product quality characteristics and their sub-characteristics.", 20),
      lesson("qaf-m2-l3", "Calidad funcional vs no funcional", "Functional vs non-functional quality", "Qué hace el sistema frente a cómo se comporta, y el foco del QA manual.", "What the system does versus how it behaves, and the manual QA focus.", 15),
      lesson("qaf-m2-l4", "El coste de la calidad y de los defectos", "The cost of quality and defects", "Por qué detectar defectos temprano reduce costes (shift-left).", "Why detecting defects early reduces costs (shift-left).", 15),
    ]
  ),

  /* ---------- Module 17: Ciclos de Vida SDLC y STLC ---------- */
  module_(
    "qaf-m3",
    17,
    "Ciclos de Vida: SDLC y STLC",
    "Lifecycles: SDLC and STLC",
    "Modelos de desarrollo, testing a lo largo del SDLC, niveles y tipos de prueba, y el ciclo de vida del testing.",
    "Development models, testing throughout the SDLC, test levels and types, and the test lifecycle.",
    80,
    "beginner",
    false,
    [
      lesson("qaf-m3-l1", "Modelos de SDLC", "SDLC models", "Waterfall, modelo en V, iterativo y ágil.", "Waterfall, V-model, iterative and agile.", 15),
      lesson("qaf-m3-l2", "Testing a lo largo del SDLC", "Testing throughout the SDLC", "Cómo el testing se integra en cada fase del desarrollo.", "How testing integrates into each development phase.", 15),
      lesson("qaf-m3-l3", "Niveles de prueba", "Test levels", "Componente, integración, sistema y aceptación.", "Component, integration, system and acceptance.", 15),
      lesson("qaf-m3-l4", "Tipos de prueba", "Test types", "Funcional, no funcional, regresión y retest.", "Functional, non-functional, regression and retest.", 15),
      lesson("qaf-m3-l5", "El ciclo de vida del testing (STLC)", "The software testing lifecycle (STLC)", "Fases del STLC desde el análisis hasta el cierre.", "STLC phases from analysis to closure.", 20),
    ]
  ),

  /* ---------- Module 18: Análisis de Requisitos para QA ---------- */
  module_(
    "qaf-m4",
    18,
    "Análisis de Requisitos para QA",
    "Requirements Analysis for QA",
    "Tipos de requisitos, testing estático, historias de usuario, criterios de aceptación y trazabilidad.",
    "Requirement types, static testing, user stories, acceptance criteria and traceability.",
    70,
    "intermediate",
    false,
    [
      lesson("qaf-m4-l1", "Tipos de requisitos", "Types of requirements", "Requisitos funcionales, no funcionales y de negocio.", "Functional, non-functional and business requirements.", 15),
      lesson("qaf-m4-l2", "Testing estático y revisiones", "Static testing and reviews", "Encontrar defectos en requisitos antes de ejecutar código.", "Finding defects in requirements before executing code.", 15),
      lesson("qaf-m4-l3", "Historias de usuario y criterios de aceptación", "User stories and acceptance criteria", "Formato de historia y criterios en estilo Gherkin (Dado/Cuando/Entonces).", "Story format and Gherkin-style criteria (Given/When/Then).", 20),
      lesson("qaf-m4-l4", "Trazabilidad de requisitos", "Requirements traceability", "Matriz de trazabilidad requisito-caso de prueba.", "Requirement-to-test-case traceability matrix.", 20),
    ]
  ),

  /* ---------- Module 19: Diseño de Casos de Prueba ---------- */
  module_(
    "qaf-m5",
    19,
    "Diseño de Casos de Prueba",
    "Test Case Design",
    "Anatomía de un caso, técnicas de caja negra (EP, BVA, tablas de decisión, transición de estados) y testing exploratorio.",
    "Anatomy of a test case, black-box techniques (EP, BVA, decision tables, state transition) and exploratory testing.",
    100,
    "intermediate",
    false,
    [
      lesson("qaf-m5-l1", "Anatomía de un caso de prueba", "Anatomy of a test case", "Precondición, pasos, datos y resultado esperado.", "Precondition, steps, data and expected result.", 15),
      lesson("qaf-m5-l2", "Partición de equivalencia y valores límite", "Equivalence partitioning and boundary values", "Reducir casos manteniendo cobertura con EP y BVA.", "Reduce cases while keeping coverage with EP and BVA.", 25),
      lesson("qaf-m5-l3", "Tablas de decisión y transición de estados", "Decision tables and state transition", "Probar combinaciones de condiciones y comportamiento por estado.", "Test condition combinations and state-based behavior.", 25),
      lesson("qaf-m5-l4", "Testing exploratorio y basado en experiencia", "Exploratory and experience-based testing", "Error guessing, charters y sesiones exploratorias.", "Error guessing, charters and exploratory sessions.", 20),
      lesson("qaf-m5-l5", "Gestión de datos de prueba", "Test data management", "Cómo preparar datos de prueba representativos.", "How to prepare representative test data.", 15),
    ]
  ),

  /* ---------- Module 20: Ejecución y Gestión de Defectos ---------- */
  module_(
    "qaf-m6",
    20,
    "Ejecución de Pruebas y Gestión de Defectos",
    "Test Execution and Defect Management",
    "Ejecución y registro, reporte profesional de defectos, ciclo de vida del defecto, severidad/prioridad y métricas.",
    "Execution and logging, professional defect reporting, defect lifecycle, severity/priority and metrics.",
    80,
    "intermediate",
    false,
    [
      lesson("qaf-m6-l1", "Ejecución de pruebas y registro de resultados", "Test execution and result logging", "Ejecutar casos y registrar pass/fail/blocked con evidencia.", "Run cases and log pass/fail/blocked with evidence.", 15),
      lesson("qaf-m6-l2", "Cómo reportar un defecto profesional", "How to report a professional defect", "Anatomía de un buen bug: pasos, esperado/real y evidencias.", "Anatomy of a good bug: steps, expected/actual and evidence.", 20),
      lesson("qaf-m6-l3", "Ciclo de vida del defecto", "Defect lifecycle", "Estados del defecto desde nuevo hasta cerrado.", "Defect states from new to closed.", 15),
      lesson("qaf-m6-l4", "Severidad vs prioridad", "Severity vs priority", "Impacto técnico frente a urgencia de corrección.", "Technical impact versus urgency to fix.", 15),
      lesson("qaf-m6-l5", "Métricas básicas de testing", "Basic testing metrics", "Densidad de defectos, tasa de fuga y cobertura.", "Defect density, escape rate and coverage.", 15),
    ]
  ),

  /* ---------- Module 21: Metodologías Ágiles para QA ---------- */
  module_(
    "qaf-m7",
    21,
    "Metodologías Ágiles para QA (Scrum y Kanban)",
    "Agile Methodologies for QA (Scrum and Kanban)",
    "Manifiesto Ágil, Scrum, Kanban y el rol del QA dentro del equipo ágil.",
    "Agile Manifesto, Scrum, Kanban and the QA role within the agile team.",
    70,
    "intermediate",
    false,
    [
      lesson("qaf-m7-l1", "El Manifiesto Ágil y sus principios", "The Agile Manifesto and its principles", "Los 4 valores y 12 principios del desarrollo ágil.", "The 4 values and 12 principles of agile development.", 15),
      lesson("qaf-m7-l2", "Scrum: roles, eventos y artefactos", "Scrum: roles, events and artifacts", "El marco Scrum según la Scrum Guide 2020.", "The Scrum framework per the 2020 Scrum Guide.", 20),
      lesson("qaf-m7-l3", "Kanban: flujo y límites WIP", "Kanban: flow and WIP limits", "Tableros, flujo y límites de trabajo en progreso.", "Boards, flow and work-in-progress limits.", 15),
      lesson("qaf-m7-l4", "El QA en el equipo ágil", "QA in the agile team", "Testing en el sprint, Definition of Done y de Ready.", "Testing in the sprint, Definition of Done and Ready.", 20),
    ]
  ),

  /* ---------- Module 22: Herramientas para QA Manual ---------- */
  module_(
    "qaf-m8",
    22,
    "Herramientas para QA Manual (Jira · Confluence · Azure Test Plans)",
    "Manual QA Tools (Jira · Confluence · Azure Test Plans)",
    "Gestión de issues en Jira, documentación en Confluence y casos de prueba en Azure Test Plans.",
    "Issue management in Jira, documentation in Confluence and test cases in Azure Test Plans.",
    70,
    "intermediate",
    false,
    [
      lesson("qaf-m8-l1", "Jira para gestión de issues y defectos", "Jira for issue and defect management", "Issues, workflows, estados, prioridades y JQL básico.", "Issues, workflows, states, priorities and basic JQL.", 20),
      lesson("qaf-m8-l2", "Confluence para documentación de pruebas", "Confluence for test documentation", "Plantillas y documentación colaborativa de QA.", "Templates and collaborative QA documentation.", 15),
      lesson("qaf-m8-l3", "Azure Test Plans", "Azure Test Plans", "Test Plans, Suites, Cases y ejecución manual.", "Test Plans, Suites, Cases and manual execution.", 20),
      lesson("qaf-m8-l4", "Comparativa y elección de herramientas", "Tool comparison and selection", "Criterios para elegir la herramienta adecuada.", "Criteria for choosing the right tool.", 15),
    ]
  ),

  /* ---------- Module 23: Testing Web y Mobile Manual ---------- */
  module_(
    "qaf-m9",
    23,
    "Testing Web y Mobile Manual",
    "Manual Web and Mobile Testing",
    "Testing web manual con DevTools, compatibilidad/responsive, testing mobile y accesibilidad básica.",
    "Manual web testing with DevTools, compatibility/responsive, mobile testing and basic accessibility.",
    70,
    "intermediate",
    false,
    [
      lesson("qaf-m9-l1", "Testing web manual y DevTools", "Manual web testing and DevTools", "Uso de las herramientas de desarrollador del navegador.", "Using the browser developer tools.", 20),
      lesson("qaf-m9-l2", "Compatibilidad y diseño responsive", "Compatibility and responsive design", "Cross-browser y comportamiento en distintos tamaños.", "Cross-browser and behavior across sizes.", 15),
      lesson("qaf-m9-l3", "Testing mobile manual", "Manual mobile testing", "Gestos, permisos, interrupciones y redes en iOS/Android.", "Gestures, permissions, interruptions and networks on iOS/Android.", 20),
      lesson("qaf-m9-l4", "Introducción a la accesibilidad (WCAG)", "Introduction to accessibility (WCAG)", "Conceptos básicos de accesibilidad para QA.", "Accessibility basics for QA.", 15),
    ]
  ),

  /* ---------- Module 24: Inteligencia Artificial aplicada al QA ---------- */
  module_(
    "qaf-m10",
    24,
    "Inteligencia Artificial aplicada al QA",
    "Artificial Intelligence Applied to QA",
    "Fundamentos de IA para QA, generación de casos/datos con IA, análisis con IA, riesgos y proyecto final.",
    "AI fundamentals for QA, AI-assisted case/data generation, AI analysis, risks and final project.",
    105,
    "advanced",
    false,
    [
      lesson("qaf-m10-l1", "Fundamentos de IA para QA", "AI fundamentals for QA", "Qué es la IA generativa y cómo apoya al QA manual.", "What generative AI is and how it supports manual QA.", 15),
      lesson("qaf-m10-l2", "Generar casos de prueba y datos con IA", "Generating test cases and data with AI", "Prompts efectivos para casos, escenarios y datos de prueba.", "Effective prompts for cases, scenarios and test data.", 20),
      lesson("qaf-m10-l3", "Análisis de requisitos e historias con IA", "Requirements and stories analysis with AI", "Usar IA para historias de usuario y criterios de aceptación.", "Using AI for user stories and acceptance criteria.", 20),
      lesson("qaf-m10-l4", "Limitaciones, riesgos y buenas prácticas", "Limitations, risks and best practices", "Alucinaciones, sesgos, privacidad y revisión humana.", "Hallucinations, bias, privacy and human review.", 20),
      lesson("qaf-m10-l5", "Proyecto final del campus (capstone)", "Campus final project (capstone)", "Dossier de QA integrando análisis, diseño, ejecución y reporte.", "QA dossier integrating analysis, design, execution and reporting.", 30),
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
