/**
 * Module 8 — CI/CD and Reporting
 *
 * The GRADUATION MODULE of PlayQAcademy. Transforms the student from
 * "someone who writes tests locally" into "someone who operates testing
 * infrastructure in production." After this module, the student is ready
 * to join a senior QA team.
 *
 * Full bilingual lesson content for all 5 lessons in Module 8.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m8-cicd-reporting";

/* ================================================================== */
/*  Lesson 8.1 — HTML Reporter deep dive                               */
/* ================================================================== */

const L8_1: LessonContent = {
  id: "m8-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Más allá del contador de verdes y rojos",
        en: "Beyond the green and red counter",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El HTML reporter es la primera línea de defensa cuando un test falla. Viene incluido con Playwright — sin instalación, sin dependencias extra — y sin embargo la mayoría de QAs solo miran el resumen de pasados/fallados en la página principal. Detrás de ese resumen hay una herramienta de debugging extraordinaria que incluye una línea de tiempo paso a paso, snapshots del DOM antes y después de cada acción, errores con frames de código fuente, y acceso directo a screenshots, videos y trazas. Esta lección te muestra todo lo que te estás perdiendo.",
        en: "The HTML reporter is the first line of defense when a test fails. It comes bundled with Playwright — no installation, no extra dependencies — and yet most QAs only glance at the pass/fail summary on the main page. Behind that summary is an extraordinary debugging tool that includes a step-by-step timeline, DOM snapshots before and after every action, errors with source code frames, and direct access to screenshots, videos, and traces. This lesson shows you everything you're missing.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Anatomía del reporte HTML",
        en: "Anatomy of the HTML report",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Lista de tests: cada test con su estado (pass/fail/skip/flaky), duración, navegador, y número de reintentos. Filtrable por proyecto, estado y texto.",
          en: "Test list: each test with its status (pass/fail/skip/flaky), duration, browser, and retry count. Filterable by project, status, and search text.",
        },
        {
          es: "Detalle por test: al hacer clic en un test fallido, ves una línea de tiempo con cada paso (beforeEach, acciones, expect, afterEach). Cada paso muestra su duración y estado.",
          en: "Per-test detail: clicking a failed test shows a timeline with every step (beforeEach, actions, expect, afterEach). Each step shows its duration and status.",
        },
        {
          es: "Mensajes de error con code frames: el error exacto con el snippet de código fuente donde ocurrió. Sin adivinar — ves la línea que falló.",
          en: "Error messages with code frames: the exact error with the source code snippet where it occurred. No guessing — you see the line that failed.",
        },
        {
          es: "Artefactos adjuntos: screenshots automáticos del momento del fallo, videos de la sesión completa, y enlaces directos para abrir la traza en Trace Viewer.",
          en: "Attached artifacts: automatic screenshots of the failure moment, full-session videos, and direct links to open the trace in Trace Viewer.",
        },
        {
          es: "Filtros y búsqueda: filtra por proyecto (chromium, firefox), estado (failed, passed), o busca por nombre de test. Esencial en suites con 200+ tests.",
          en: "Filters and search: filter by project (chromium, firefox), status (failed, passed), or search by test name. Essential in suites with 200+ tests.",
        },
        {
          es: "Estadísticas agregadas: total de tests, porcentaje de pasados, duración total, y desglose por proyecto. El dashboard que tu equipo verá en cada build.",
          en: "Aggregate statistics: total tests, pass percentage, total duration, and per-project breakdown. The dashboard your team will see on every build.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Abrir y configurar el reporte",
        en: "Opening and configuring the report",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Abrir el reporte más reciente
npx playwright show-report

# Si moviste el reporte a otra carpeta:
npx playwright show-report ./ruta/a/playwright-report

# Si usaste un outputFolder personalizado:
npx playwright show-report ./mis-reportes`,
      caption: {
        es: "show-report abre el reporte HTML en tu navegador por defecto",
        en: "show-report opens the HTML report in your default browser",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts — configuración del reporter

export default defineConfig({
  reporter: [
    // HTML: el más visual. 'never' evita abrirlo automáticamente
    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    // También puedes configurarlo como string simple:
    // reporter: 'html',
  ],
});`,
      caption: {
        es: "Configuración del reporter HTML con carpeta de salida personalizada",
        en: "HTML reporter configuration with custom output folder",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Múltiples reporters a la vez",
        en: "Multiple reporters at once",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts — combina reporters para diferentes audiencias

export default defineConfig({
  reporter: [
    // HTML: para humanos haciendo debug (el más rico visualmente)
    ['html', { open: 'never' }],

    // List: output en terminal, una línea por test. Ideal para CI logs
    ['list'],

    // JUnit: formato XML estándar. Lo entienden Jenkins, GitLab, Azure DevOps
    ['junit', { outputFile: 'test-results/junit.xml' }],

    // JSON: para procesamiento programático (dashboards personalizados)
    ['json', { outputFile: 'test-results/results.json' }],
  ],
});`,
      caption: {
        es: "4 reporters simultáneos: HTML (humanos), list (terminal), JUnit (CI), JSON (dashboards)",
        en: "4 simultaneous reporters: HTML (humans), list (terminal), JUnit (CI), JSON (dashboards)",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 La regla de oro para reporters: usa `list` en CI para feedback rápido en logs, `html` para debug humano, y `junit` si tu plataforma de CI (Jenkins, GitLab) tiene un dashboard de tests que lee XML. No uses solo uno — combínalos. Cada uno sirve a una audiencia distinta.",
        en: "💡 The golden rule for reporters: use `list` in CI for fast log feedback, `html` for human debugging, and `junit` if your CI platform (Jenkins, GitLab) has a test dashboard that reads XML. Don't use just one — combine them. Each serves a different audience.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Eligiendo el reporter correcto",
        en: "Choosing the right reporter",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "`list` — Una línea por test en la terminal. Ideal para CI: ves el progreso en tiempo real. No genera archivos.",
          en: "`list` — One line per test in the terminal. Ideal for CI: you see progress in real time. No files generated.",
        },
        {
          es: "`line` — Más verboso que list, muestra cada paso del test. Bueno para debuggeo local de un test específico.",
          en: "`line` — More verbose than list, shows every test step. Good for local debugging of a specific test.",
        },
        {
          es: "`dot` — Un punto por test. Minimalista. Útil cuando solo quieres saber '¿cuántos pasaron?' sin detalles.",
          en: "`dot` — A dot per test. Minimalist. Useful when you just want to know 'how many passed?' without details.",
        },
        {
          es: "`html` — Reporte interactivo con timeline, errores, artefactos. El estándar para debuggeo post-mortem.",
          en: "`html` — Interactive report with timeline, errors, artifacts. The standard for post-mortem debugging.",
        },
        {
          es: "`junit` — XML estándar de la industria. Conecta Playwright con Jenkins, GitLab CI, Azure DevOps, y dashboards de calidad.",
          en: "`junit` — Industry-standard XML. Connects Playwright with Jenkins, GitLab CI, Azure DevOps, and quality dashboards.",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m8-l1-quiz",
      question: {
        es: "Tu equipo necesita feedback rápido en los logs de CI Y un reporte detallado para debuggeo post-mortem. ¿Qué combinación de reporters es la correcta?",
        en: "Your team needs fast feedback in CI logs AND a detailed report for post-mortem debugging. Which reporter combination is correct?",
      },
      options: [
        { id: "a", text: { es: "Solo 'html' — contiene toda la información necesaria", en: "Only 'html' — it contains all the necessary information" } },
        { id: "b", text: { es: "['list'] para los logs de CI + ['html'] para debuggeo humano. Ejecutar ambos simultáneamente.", en: "['list'] for CI logs + ['html'] for human debugging. Run both simultaneously." } },
        { id: "c", text: { es: "Solo 'dot' — es el más rápido y no distrae", en: "Only 'dot' — it's the fastest and doesn't distract" } },
        { id: "d", text: { es: "['line'] para CI + ['junit'] para debuggeo. Line es más detallado que HTML.", en: "['line'] for CI + ['junit'] for debugging. Line is more detailed than HTML." } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Playwright permite ejecutar múltiples reporters simultáneamente. `list` te da feedback inmediato en los logs de CI (una línea por test, ves el progreso en tiempo real). `html` genera el reporte interactivo completo que puedes descargar como artefacto y abrir localmente para investigar fallos. `dot` es demasiado minimalista para CI serio; `html` solo no te da visibilidad en tiempo real durante la ejecución.",
        en: "Playwright allows running multiple reporters simultaneously. `list` gives you immediate feedback in CI logs (one line per test, you see progress in real time). `html` generates the full interactive report you can download as an artifact and open locally to investigate failures. `dot` is too minimal for serious CI; `html` alone doesn't give you real-time visibility during execution.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 8.2 — GitHub Actions setup                                  */
/* ================================================================== */

const L8_2: LessonContent = {
  id: "m8-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "De funciona en mi máquina a corre en cada push",
        en: "From works on my machine to runs on every push",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Los tests que solo ejecutas en tu máquina son tests que no existen para tu equipo. El propósito de la automatización de pruebas no es ahorrarte clicks a ti — es proteger a TODO el equipo de regresiones en cada commit. GitHub Actions es el mecanismo que convierte tus tests de 'algo que ejecuto cuando me acuerdo' en 'algo que se ejecuta en cada push y bloquea el merge si algo se rompe'.",
        en: "Tests you only run on your machine are tests that don't exist for your team. The purpose of test automation isn't to save you clicks — it's to protect the ENTIRE team from regressions on every commit. GitHub Actions is the mechanism that turns your tests from 'something I run when I remember' into 'something that runs on every push and blocks the merge if something breaks'.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "GitHub Actions en 60 segundos",
        en: "GitHub Actions in 60 seconds",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Workflow: El archivo YAML completo. Define CUÁNDO se ejecuta (triggers) y QUÉ hace (jobs). Vive en `.github/workflows/`.",
          en: "Workflow: The complete YAML file. Defines WHEN it runs (triggers) and WHAT it does (jobs). Lives in `.github/workflows/`.",
        },
        {
          es: "Jobs: Unidades de trabajo independientes. Pueden ejecutarse en paralelo o en secuencia. Cada job tiene su propio runner.",
          en: "Jobs: Independent units of work. Can run in parallel or sequentially. Each job has its own runner.",
        },
        {
          es: "Steps: Comandos secuenciales dentro de un job. Pueden ser acciones reutilizables (`uses:`) o comandos shell (`run:`).",
          en: "Steps: Sequential commands within a job. Can be reusable actions (`uses:`) or shell commands (`run:`).",
        },
        {
          es: "Runners: Las máquinas virtuales que ejecutan los jobs. `ubuntu-latest` es el más común para Playwright.",
          en: "Runners: The virtual machines that execute jobs. `ubuntu-latest` is the most common for Playwright.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Tu primer workflow de Playwright",
        en: "Your first Playwright workflow",
      },
    },
    {
      type: "code",
      language: "yaml",
      code: `# .github/workflows/playwright.yml

name: Playwright Tests

# Cuándo se ejecuta
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    # Máquina virtual
    runs-on: ubuntu-latest

    # Timeout total para evitar workflows colgados
    timeout-minutes: 30

    # Matriz de navegadores (ejecuta el job 3 veces, una por navegador)
    strategy:
      fail-fast: false            # no cancelar los demás si uno falla
      matrix:
        browser: [chromium, firefox, webkit]

    steps:
      # 1. Clonar el repositorio
      - name: Checkout
        uses: actions/checkout@v4

      # 2. Instalar Node.js 20
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'           # cachea node_modules automáticamente

      # 3. Instalar dependencias del proyecto
      - name: Install dependencies
        run: npm ci              # ci es más rápido y estricto que install

      # 4. Cachear los binarios de Playwright (~400 MB)
      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: pw-cache
        with:
          path: ~/.cache/ms-playwright
          key: playwright-browsers-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}

      # 5. Instalar navegadores (solo si no están en caché)
      - name: Install Playwright browsers
        if: steps.pw-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps \${{ matrix.browser }}

      # 6. Ejecutar los tests
      - name: Run tests
        run: npx playwright test --project=\${{ matrix.browser }}

      # 7. Subir el reporte HTML como artefacto (SIEMPRE, incluso si falla)
      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-\${{ matrix.browser }}
          path: playwright-report/
          retention-days: 14`,
      caption: {
        es: "Workflow completo con matrix de navegadores, caché y subida de artefactos siempre",
        en: "Complete workflow with browser matrix, caching, and always-upload artifacts",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Estrategia de caché",
        en: "Caching strategy",
      },
    },
    {
      type: "code",
      language: "yaml",
      code: `# La caché reduce el tiempo de CI de 5 minutos a 1-2 minutos

# Caché 1: node_modules (manejado automáticamente por setup-node con cache: 'npm')
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'          # ← cachea ~/.npm automáticamente

# Caché 2: binarios de navegadores (~400 MB, no cambian entre builds)
- uses: actions/cache@v4
  id: pw-cache
  with:
    path: ~/.cache/ms-playwright
    key: playwright-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
    # La clave incluye el hash de package-lock: si actualizas Playwright,
    # la caché se invalida automáticamente y los navegadores se reinstalan

# Caché 3 (opcional): node_modules para npm ci más rápido
# Si tienes muchas dependencias, añade:
- uses: actions/cache@v4
  with:
    path: node_modules
    key: node-modules-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}`,
      caption: {
        es: "Tres niveles de caché que reducen el tiempo de CI en un 60-80%",
        en: "Three cache levels that reduce CI time by 60-80%",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Cachear los binarios de los navegadores es la mayor ganancia de velocidad en CI. Los navegadores de Playwright pesan ~400 MB y cambian solo cuando actualizas la versión de Playwright. Sin caché, cada build descarga 400 MB. Con caché, la primera build tarda 5 minutos y las siguientes 1-2 minutos. El `hashFiles('package-lock.json')` en la clave asegura que la caché se invalida automáticamente cuando actualizas dependencias.",
        en: "💡 Caching browser binaries is the biggest speed gain in CI. Playwright browsers are ~400 MB and only change when you update the Playwright version. Without cache, every build downloads 400 MB. With cache, the first build takes 5 minutes and subsequent ones take 1-2 minutes. The `hashFiles('package-lock.json')` in the key ensures the cache invalidates automatically when you update dependencies.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Secretos y variables de entorno en CI",
        en: "Secrets and env vars in CI",
      },
    },
    {
      type: "code",
      language: "yaml",
      code: `# NUNCA hardcodees credenciales en archivos YAML públicos
# Usa GitHub Secrets (Settings > Secrets and variables > Actions)

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      # Variables de entorno para todos los steps
      BASE_URL: \${{ vars.BASE_URL }}           # Variables no secretas
      CI: true                                   # Playwright detecta CI automáticamente

    steps:
      - name: Run tests with secrets
        env:
          # Los secretos se pasan como variables de entorno
          TEST_EMAIL: \${{ secrets.TEST_EMAIL }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}
          API_KEY: \${{ secrets.API_KEY }}
        run: npx playwright test

# Configurar los secretos en GitHub:
# 1. Ve a tu repo → Settings → Secrets and variables → Actions
# 2. Añade TEST_EMAIL, TEST_PASSWORD, API_KEY como 'Repository secrets'
# 3. Los secretos se enmascaran automáticamente en los logs
# 4. NUNCA aparecen en texto plano en ningún sitio`,
      caption: {
        es: "Secretos de GitHub: credenciales seguras sin exponerlas en el código fuente",
        en: "GitHub Secrets: secure credentials without exposing them in source code",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ Las credenciales hardcodeadas en archivos YAML son visibles para cualquiera que lea tu repositorio (incluso en repos privados, cualquiera con acceso de lectura). Usa SIEMPRE `\${{ secrets.NOMBRE }}` para valores sensibles. Los secretos de GitHub se enmascaran en los logs (aparecen como `***`) y no se pueden leer una vez guardados — solo sobrescribir.",
        en: "⚠️ Hardcoded credentials in YAML files are visible to anyone who reads your repository (even in private repos, anyone with read access). ALWAYS use `\${{ secrets.NAME }}` for sensitive values. GitHub secrets are masked in logs (appear as `***`) and cannot be read once saved — only overwritten.",
      },
    },
    {
      type: "quiz",
      questionId: "m8-l2-quiz",
      question: {
        es: "¿Por qué usas `if: always()` en el step de upload del reporte HTML?",
        en: "Why do you use `if: always()` on the HTML report upload step?",
      },
      options: [
        { id: "a", text: { es: "Para subir el reporte en cada build, incluso si los tests fallan. Sin always(), el step se salta si el job falla y pierdes el reporte que necesitas para debuggear.", en: "To upload the report on every build, even if tests fail. Without always(), the step is skipped if the job fails and you lose the report you need for debugging." } },
        { id: "b", text: { es: "Para que el reporte se suba dos veces, una en éxito y otra en fallo", en: "To upload the report twice, once on success and once on failure" } },
        { id: "c", text: { es: "Es un requisito de la acción upload-artifact — no funciona sin always()", en: "It's a requirement of the upload-artifact action — it doesn't work without always()" } },
        { id: "d", text: { es: "Para evitar que el reporte ocupe espacio en el almacenamiento de artefactos de GitHub", en: "To prevent the report from taking up space in GitHub's artifact storage" } },
      ],
      correctOptionId: "a",
      explanation: {
        es: "Por defecto, GitHub Actions detiene la ejecución de steps posteriores cuando un step falla. Sin `if: always()`, si `npx playwright test` falla, el step de upload del reporte NUNCA se ejecuta. Esto significa que no tienes el reporte HTML para investigar POR QUÉ fallaron los tests — que es exactamente cuando más lo necesitas. `always()` fuerza la ejecución del step independientemente del resultado de los steps anteriores.",
        en: "By default, GitHub Actions stops executing subsequent steps when a step fails. Without `if: always()`, if `npx playwright test` fails, the report upload step NEVER runs. This means you don't have the HTML report to investigate WHY the tests failed — which is exactly when you need it most. `always()` forces the step to run regardless of previous step outcomes.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 8.3 — Trace Viewer in CI                                    */
/* ================================================================== */

const L8_3: LessonContent = {
  id: "m8-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Tus ojos cuando el navegador no está",
        en: "Your eyes when the browser isn't there",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El Trace Viewer es la característica de debugging más potente de Playwright. Una traza captura CADA interacción que Playwright tuvo con la página: acciones, snapshots del DOM, peticiones de red, mensajes de consola, y screenshots. Puedes avanzar y retroceder en el tiempo como si fuera un video, inspeccionar el DOM en cualquier momento, y ver exactamente qué vio Playwright antes de que un test fallara. En CI, donde no tienes acceso al navegador, la traza es tus ojos.",
        en: "The Trace Viewer is Playwright's most powerful debugging feature. A trace captures EVERY interaction Playwright had with the page: actions, DOM snapshots, network requests, console messages, and screenshots. You can scrub forward and backward in time like a video, inspect the DOM at any moment, and see exactly what Playwright saw before a test failed. In CI, where you have no browser access, the trace is your eyes.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Qué captura una traza",
        en: "What a trace captures",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Acciones: Cada comando de Playwright (click, fill, expect) con timestamps, parámetros y duración.",
          en: "Actions: Every Playwright command (click, fill, expect) with timestamps, parameters, and duration.",
        },
        {
          es: "Snapshots del DOM: Una fotografía completa del árbol DOM antes y después de cada acción. Puedes inspeccionarlo como en DevTools.",
          en: "DOM snapshots: A complete photograph of the DOM tree before and after every action. You can inspect it like DevTools.",
        },
        {
          es: "Red: Todas las peticiones HTTP que hizo la página (fetch, XHR, recursos estáticos) con headers, cuerpo y tiempo de respuesta.",
          en: "Network: All HTTP requests the page made (fetch, XHR, static resources) with headers, body, and response time.",
        },
        {
          es: "Consola: Todos los mensajes de console.log, console.error, warnings y excepciones no capturadas del navegador.",
          en: "Console: All console.log, console.error, warnings, and uncaught exceptions from the browser.",
        },
        {
          es: "Screenshots: Capturas de pantalla en puntos clave del test — ves exactamente cómo se veía la página.",
          en: "Screenshots: Screen captures at key test points — you see exactly how the page looked.",
        },
        {
          es: "Línea de tiempo interactiva: Un scrubber temporal que te permite navegar al momento exacto de cualquier acción o evento.",
          en: "Interactive timeline: A time scrubber that lets you navigate to the exact moment of any action or event.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Habilitar trazas estratégicamente",
        en: "Enabling traces strategically",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts

export default defineConfig({
  use: {
    // ── Opciones de trace ──

    // RECOMENDADO: traza solo si el test falla y se reintenta
    // Cero overhead en builds verdes. Datos completos en builds rojas.
    trace: 'on-first-retry',

    // ALTERNATIVAS:
    // 'retain-on-failure' — graba en el primer fallo (no espera al retry)
    // 'on'               — graba SIEMPRE (genera archivos enormes, solo debug)
    // 'off'              — deshabilitado (no recomendado en CI)
  },

  // Las trazas se guardan en test-results/ por defecto
  // Cada test genera un trace.zip que puedes descargar y abrir
});`,
      caption: {
        es: "trace: 'on-first-retry' es el punto dulce — sin overhead en verde, datos completos en rojo",
        en: "trace: 'on-first-retry' is the sweet spot — no overhead on green, full data on red",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 `trace: 'on-first-retry'` es una de esas configuraciones que diferencian a un QA senior de un junior. En builds verdes (todo pasa), la traza no se graba → cero impacto en rendimiento. En builds rojas (algo falla), la traza se graba en el primer reintento → tienes una película completa de lo que salió mal. Si pusieras `trace: 'on'`, cada build generaría cientos de MB de trazas que nunca mirarías. Si pusieras `trace: 'off'`, cuando algo falle en CI no tendrás ni idea de por qué.",
        en: "💡 `trace: 'on-first-retry'` is one of those settings that separate a senior QA from a junior. On green builds (everything passes), no trace is recorded → zero performance impact. On red builds (something fails), the trace is recorded on the first retry → you have a complete movie of what went wrong. If you set `trace: 'on'`, every build would generate hundreds of MB of traces you'd never look at. If you set `trace: 'off'`, when something fails in CI you'll have no idea why.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Leyendo una traza",
        en: "Reading a trace",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Abrir una traza es como abrir un DVR de tu test. El panel 'Actions' muestra cada comando en orden cronológico — haz clic en cualquiera para ver el snapshot del DOM en ese momento exacto. El panel 'Network' revela todas las llamadas HTTP: si tu test falla porque la API devolvió 500 en lugar de 200, lo verás aquí. El panel 'Console' expone errores de JavaScript del frontend que ocurrieron durante el test. Los tres paneles juntos te dan una imagen completa de por qué falló el test.",
        en: "Opening a trace is like opening a DVR of your test. The 'Actions' panel shows every command in chronological order — click any to see the DOM snapshot at that exact moment. The 'Network' panel reveals all HTTP calls: if your test fails because the API returned 500 instead of 200, you'll see it here. The 'Console' panel exposes frontend JavaScript errors that occurred during the test. The three panels together give you a complete picture of why the test failed.",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Abrir una traza localmente
npx playwright show-trace trace.zip

# O usar el visor online (no requiere instalar nada)
# Abre https://trace.playwright.dev y arrastra el archivo trace.zip

# En CI, descargas la traza desde los artefactos del workflow:
# 1. Ve a la build fallida en GitHub Actions
# 2. Despliega 'Artifacts' al final de la página
# 3. Descarga el archivo .zip que contiene las trazas
# 4. Ábrelo localmente con show-trace o en trace.playwright.dev`,
      caption: {
        es: "Abrir trazas localmente o en el visor online trace.playwright.dev",
        en: "Open traces locally or on the online viewer trace.playwright.dev",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "📘 `trace.playwright.dev` es un regalo para equipos distribuidos. No necesitas instalar Node.js ni Playwright en tu máquina. Solo arrastras el archivo trace.zip al navegador y tienes el visor completo: acciones, DOM, red, consola, todo. Puedes compartir la URL con un desarrollador que no tiene Playwright instalado y decirle 'mira, el test falló en este paso exacto'. Esto acorta el ciclo de debugging de horas a minutos.",
        en: "📘 `trace.playwright.dev` is a gift for distributed teams. You don't need Node.js or Playwright installed on your machine. Just drag the trace.zip file into the browser and you have the full viewer: actions, DOM, network, console, everything. You can share the URL with a developer who doesn't have Playwright installed and say 'look, the test failed at this exact step'. This shortens the debugging cycle from hours to minutes.",
      },
    },
    {
      type: "quiz",
      questionId: "m8-l3-quiz",
      question: {
        es: "¿Cuál es la configuración de trace recomendada para CI?",
        en: "What is the recommended trace setting for CI?",
      },
      options: [
        { id: "a", text: { es: "trace: 'on' — graba siempre para tener máxima información", en: "trace: 'on' — always record for maximum information" } },
        { id: "b", text: { es: "trace: 'on-first-retry' — graba solo cuando algo falla y se reintenta, cero overhead en builds verdes", en: "trace: 'on-first-retry' — record only when something fails and retries, zero overhead on green builds" } },
        { id: "c", text: { es: "trace: 'off' — las trazas consumen mucho disco y no son necesarias en CI", en: "trace: 'off' — traces consume a lot of disk and aren't needed in CI" } },
        { id: "d", text: { es: "trace: 'retain-on-failure' — es idéntico a on-first-retry pero más rápido", en: "trace: 'retain-on-failure' — it's identical to on-first-retry but faster" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`on-first-retry` es el balance óptimo. En builds verdes, no pagas el costo de grabar trazas. En builds rojas, obtienes una traza completa del fallo (grabada durante el reintento) que te permite diagnosticar el problema. `on` generaría cientos de MB inútiles en cada build. `off` te dejaría ciego cuando ocurre un fallo en CI. `retain-on-failure` graba en el primer intento, lo cual está bien pero `on-first-retry` es aún más eficiente porque evita grabar fallos que se resuelven solos con un retry.",
        en: "`on-first-retry` is the optimal balance. On green builds, you pay no trace recording cost. On red builds, you get a complete trace of the failure (recorded during the retry) that lets you diagnose the problem. `on` would generate hundreds of MB of useless traces on every build. `off` would leave you blind when a failure occurs in CI. `retain-on-failure` records on the first attempt, which is fine but `on-first-retry` is even more efficient because it avoids recording failures that resolve themselves with a retry.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 8.4 — Allure Reporter integration                           */
/* ================================================================== */

const L8_4: LessonContent = {
  id: "m8-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Reportes que tu jefe entiende",
        en: "Reports your manager understands",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El HTML reporter de Playwright es excelente para debuggeo individual. Pero cuando tu suite crece a 500+ tests ejecutándose en 20 pipelines diferentes, necesitas más: categorización por funcionalidad, severidad de fallos, tendencias históricas a lo largo de builds, y dashboards que agreguen resultados de múltiples suites. Ahí es donde entra Allure — el estándar de reporting para equipos enterprise.",
        en: "Playwright's HTML reporter is excellent for individual debugging. But when your suite grows to 500+ tests running across 20 different pipelines, you need more: categorization by feature, failure severity, historical trends across builds, and dashboards aggregating results from multiple suites. That's where Allure comes in — the reporting standard for enterprise teams.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Instalación y configuración",
        en: "Installation and configuration",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# Instalar el adaptador de Allure para Playwright
npm install --save-dev allure-playwright

# Instalar la CLI de Allure (genera el reporte a partir de los resultados)
# Opción A: instalación global
npm install -g allure-commandline

# Opción B: vía npx (sin instalación global)
npx allure generate ./allure-results --clean`,
      caption: {
        es: "Instalación de allure-playwright y allure-commandline",
        en: "Installing allure-playwright and allure-commandline",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// playwright.config.ts

export default defineConfig({
  reporter: [
    // Allure genera resultados en una carpeta separada
    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,           // incluye steps y attachments
      suiteTitle: true,       // usa el título del describe como suite
    }],

    // Mantén también el HTML reporter para debug individual
    ['html', { open: 'never' }],
  ],
});

// Después de ejecutar los tests:
// npx allure generate ./allure-results --clean
// npx allure open
// → Abre un dashboard interactivo con tendencias, severidad, categorías`,
      caption: {
        es: "Allure como reporter adicional junto al HTML reporter nativo",
        en: "Allure as an additional reporter alongside the native HTML reporter",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Anotando tests con metadatos",
        en: "Annotating tests with metadata",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

test.describe('User Management', () => {
  test.beforeEach(async () => {
    // Categorización: epics y features
    await allure.epic('User Management');
    await allure.feature('User Registration');
  });

  test('new user registration with valid data', async ({ page }) => {
    // Story: escenario específico dentro del feature
    await allure.story('Successful registration');

    // Severidad: qué tan crítico es este test
    await allure.severity('critical');

    // Tags para filtrado
    await allure.tag('smoke');
    await allure.tag('registration');

    // Descripción en el reporte
    await allure.description(
      'Verifies a new user can register with valid credentials'
    );

    // ── Test body ──
    await page.goto('/signup');
    // ...
  });

  test('registration with existing email shows error', async () => {
    await allure.story('Duplicate email rejection');
    await allure.severity('normal');
    await allure.tag('validation');

    // ── Test body ──
    // ...
  });

  // Adjuntar datos al reporte
  test('export user data', async ({ page }) => {
    await allure.story('Data export');

    const userData = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('user') ?? '{}')
    );

    // Adjuntar datos como archivo en el reporte
    await allure.attachment(
      'user-data.json',
      JSON.stringify(userData, null, 2),
      'application/json'
    );
  });
});

// También puedes anotar vía test.info().annotations:
test('another approach', async ({}, testInfo) => {
  testInfo.annotations.push(
    { type: 'severity', description: 'blocker' },
    { type: 'JIRA', description: 'PROJ-456' },
    { type: 'owner', description: 'QA Team' }
  );
});`,
      caption: {
        es: "Tests anotados con epic, feature, story, severity, tags y attachments de Allure",
        en: "Tests annotated with Allure epic, feature, story, severity, tags, and attachments",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Niveles de severidad",
        en: "Severity levels",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "`blocker` — La aplicación no puede funcionar. El build debe detenerse. Ej: el login está roto para todos los usuarios.",
          en: "`blocker` — The application cannot function. The build must stop. E.g., login is broken for all users.",
        },
        {
          es: "`critical` — Una funcionalidad principal está rota. Requiere atención inmediata. Ej: el checkout no procesa pagos.",
          en: "`critical` — A core functionality is broken. Requires immediate attention. E.g., checkout doesn't process payments.",
        },
        {
          es: "`normal` — Un bug que afecta a usuarios pero tiene workaround. Ej: un filtro de búsqueda no funciona, pero la búsqueda por texto sí.",
          en: "`normal` — A bug affecting users but with a workaround. E.g., a search filter doesn't work, but text search does.",
        },
        {
          es: "`minor` — Bug cosmético o de usabilidad menor. No bloquea ninguna funcionalidad. Ej: un texto con un typo.",
          en: "`minor` — Cosmetic or minor usability bug. Doesn't block any functionality. E.g., a typo in text.",
        },
        {
          es: "`trivial` — Casi imperceptible. Prioridad más baja. Ej: un margen de 2px incorrecto en una página secundaria.",
          en: "`trivial` — Almost imperceptible. Lowest priority. E.g., a 2px incorrect margin on a secondary page.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Generar y visualizar el reporte",
        en: "Generating and viewing the report",
      },
    },
    {
      type: "code",
      language: "bash",
      code: `# 1. Ejecutar los tests (genera allure-results/)
npx playwright test

# 2. Generar el reporte HTML a partir de los resultados
npx allure generate ./allure-results --clean --output ./allure-report

# 3. Abrir el reporte en el navegador
npx allure open ./allure-report

# Opción: abrir directamente (genera y abre en un solo comando)
npx allure serve ./allure-results

# En CI (GitHub Actions):
# 1. Ejecutar tests → genera allure-results/
# 2. Usar la acción oficial de Allure para publicar el reporte
#    - uses: simple-elf/allure-report-action@v1.9
#      with:
#        allure_results: allure-results
#        allure_history: allure-history
# 3. Desplegar en GitHub Pages para acceso permanente`,
      caption: {
        es: "Flujo completo: ejecutar tests → generar reporte → abrir en navegador",
        en: "Complete flow: run tests → generate report → open in browser",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Allure brilla cuando tienes histórico de 50+ builds. Puedes ver gráficos de tendencia: ¿están aumentando los tests fallidos esta semana? ¿Qué feature tiene más regresiones? ¿Qué severidad de bugs es más común? Para equipos de 2-3 personas con 50 tests, Allure es probablemente overkill — el HTML reporter + JUnit bastan. Para equipos de 10+ con 500+ tests ejecutándose en CI, Allure pasa de 'nice to have' a '¿cómo vivíamos sin esto?'.",
        en: "💡 Allure shines when you have 50+ builds of history. You can see trend charts: are test failures increasing this week? Which feature has the most regressions? Which bug severity is most common? For 2-3 person teams with 50 tests, Allure is probably overkill — HTML reporter + JUnit are enough. For 10+ person teams with 500+ tests running in CI, Allure goes from 'nice to have' to 'how did we live without this?'",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Enlazando a trackers de incidencias",
        en: "Linking to issue trackers",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Vincular tests fallidos directamente a JIRA, GitHub Issues, etc.

test('checkout with invalid coupon', async ({ page }) => {
  await allure.issue(
    'https://github.com/equipo/playqa/issues/42',
    'BUG-42: Coupon validation returns 500'
  );

  await allure.tms(
    'https://equipo.atlassian.net/browse/PROJ-123',
    'PROJ-123: Test case specification'
  );

  // En el reporte de Allure, estos links aparecen como botones clicables
  // El desarrollador hace clic y va directo al ticket de JIRA/GitHub
});`,
      caption: {
        es: "Links directos a JIRA/GitHub Issues desde el reporte de Allure",
        en: "Direct links to JIRA/GitHub Issues from the Allure report",
      },
    },
    {
      type: "quiz",
      questionId: "m8-l4-quiz",
      question: {
        es: "¿Cuándo aporta valor Allure sobre el HTML reporter nativo de Playwright?",
        en: "When does Allure add value over Playwright's native HTML reporter?",
      },
      options: [
        { id: "a", text: { es: "Siempre — Allure es superior en todo y debería reemplazar al HTML reporter", en: "Always — Allure is superior in every way and should replace the HTML reporter" } },
        { id: "b", text: { es: "Cuando el equipo crece y necesita tendencias históricas, categorización por severidad/feature, y dashboards multi-suite. Para equipos pequeños con pocos tests, añade complejidad innecesaria.", en: "When the team grows and needs historical trends, severity/feature categorization, and multi-suite dashboards. For small teams with few tests, it adds unnecessary complexity." } },
        { id: "c", text: { es: "Nunca — el HTML reporter de Playwright es suficiente para cualquier escala", en: "Never — Playwright's HTML reporter is sufficient at any scale" } },
        { id: "d", text: { es: "Solo cuando usas JIRA — Allure está diseñado exclusivamente para integración con JIRA", en: "Only when using JIRA — Allure is designed exclusively for JIRA integration" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Allure es una herramienta de reporting enterprise. Su valor está en features que solo importan a escala: tendencias históricas (¿estamos mejorando o empeorando?), categorización por feature/severidad (¿qué área duele más?), y dashboards multi-suite (resultados de 5 pipelines en una sola vista). Para un equipo pequeño, estos features añaden overhead de configuración y mantenimiento sin beneficio proporcional. La regla: empieza con HTML reporter; migra a Allure cuando sientas el dolor de no tener histórico.",
        en: "Allure is an enterprise reporting tool. Its value is in features that only matter at scale: historical trends (are we improving or worsening?), feature/severity categorization (which area hurts most?), and multi-suite dashboards (results from 5 pipelines in one view). For a small team, these features add configuration and maintenance overhead without proportional benefit. The rule: start with HTML reporter; migrate to Allure when you feel the pain of not having history.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 8.5 — Capstone Exercise: Full pipeline on GitHub            */
/* ================================================================== */

const L8_5: LessonContent = {
  id: "m8-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "El proyecto que pondrás en tu portafolio",
        en: "The project you'll put in your portfolio",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Este es el ejercicio final de PlayQAcademy. No es un ejercicio más — es la demostración de que has completado la transición de QA Manual a QA Automation Engineer. Vas a crear desde cero un repositorio público con un proyecto Playwright completo, una suite de tests que integra todo lo aprendido, y un pipeline de CI/CD en GitHub Actions que ejecuta los tests automáticamente en cada push. Este repositorio será la prueba tangible de tus habilidades — el proyecto que enlazarás en tu CV y mostrarás en entrevistas.",
        en: "This is the final exercise of PlayQAcademy. It's not just another exercise — it's the demonstration that you've completed the transition from Manual QA to QA Automation Engineer. You'll create from scratch a public repository with a complete Playwright project, a test suite that integrates everything you've learned, and a CI/CD pipeline on GitHub Actions that runs tests automatically on every push. This repository will be the tangible proof of your skills — the project you'll link on your CV and show in interviews.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Crea un repositorio PÚBLICO en GitHub llamado `playwright-portfolio`. Hazlo público. Los reclutadores y technical leads miran portfolios reales, no certificados. Un repo público con tests que pasan en CI vale más que diez cursos en tu CV. Esto no es un ejercicio académico — es tu carta de presentación profesional.",
        en: "🔑 Create a PUBLIC GitHub repository called `playwright-portfolio`. Make it public. Recruiters and technical leads look at real portfolios, not certificates. A public repo with passing CI tests is worth more than ten courses on your CV. This is not an academic exercise — it's your professional calling card.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m8-l5-exercise",
      instructions: {
        es: "Vas a construir un proyecto Playwright completo con un pipeline de CI/CD funcional en GitHub Actions. Requisitos:\n\n1) Crea un repositorio público en GitHub llamado `playwright-portfolio`\n2) Inicializa un proyecto Playwright con TypeScript y un reporter HTML\n3) Configura `playwright.config.ts` con 3 proyectos (chromium, firefox, webkit), ejecución paralela, reintentos diferentes para CI vs local, y trace en first-retry\n4) Escribe al menos 3 archivos de test usando POM, cubriendo: un test de UI, un test de API, y un test mixto UI+API contra `https://playwright.dev` (o cualquier sitio público)\n5) Crea `.github/workflows/playwright.yml` que:\n   - Se ejecute en push a main y en pull_request\n   - Use ubuntu-latest\n   - Configure Node.js 20\n   - Cachee dependencias y navegadores Playwright\n   - Instale dependencias + navegadores\n   - Ejecute los tests en todos los proyectos\n   - Suba el reporte HTML como artefacto (siempre, incluso si falla)\n   - Tenga un timeout de 30 minutos\n6) Haz commit + push de todo a main\n7) Verifica que el workflow se ejecuta correctamente en GitHub\n8) Descarga el artefacto y abre el reporte HTML localmente\n\nObjetivo: un repositorio que puedas poner en tu CV y que demuestre que entiendes la automatización de pruebas de producción de extremo a extremo.",
        en: "You'll build a complete Playwright project with a working CI/CD pipeline on GitHub Actions. Requirements:\n\n1) Create a public GitHub repository called `playwright-portfolio`\n2) Initialize a Playwright project with TypeScript and an HTML reporter\n3) Configure `playwright.config.ts` with 3 projects (chromium, firefox, webkit), parallel execution, retries differing for CI vs local, and trace on first-retry\n4) Write at least 3 test files using POM, covering: a UI test, an API test, and a mixed UI+API test against `https://playwright.dev` (or any public site)\n5) Create `.github/workflows/playwright.yml` that:\n   - Runs on push to main and on pull_request\n   - Uses ubuntu-latest\n   - Sets up Node.js 20\n   - Caches dependencies and Playwright browsers\n   - Installs deps + browsers\n   - Runs tests across all projects\n   - Uploads the HTML report as an artifact (always, even on failure)\n   - Has a 30-minute timeout\n6) Commit + push everything to main\n7) Verify the workflow runs successfully on GitHub\n8) Download the artifact and open the HTML report locally\n\nGoal: a repo you can put on your CV that proves you understand production test automation end-to-end.",
      },
      starterCode: `# .github/workflows/playwright.yml
name: Playwright Tests

on:
  # TODO: triggers (push + pull_request)

jobs:
  test:
    # TODO: runs-on
    # TODO: timeout
    steps:
      # TODO: checkout
      # TODO: setup-node
      # TODO: cache deps / browsers
      # TODO: install deps
      # TODO: install playwright browsers
      # TODO: run tests
      # TODO: upload artifact (always)`,
      solution: `# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 30
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Cache Playwright browsers
        uses: actions/cache@v4
        id: playwright-cache
        with:
          path: ~/.cache/ms-playwright
          key: playwright-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload HTML report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14

---

// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://playwright.dev',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});`,
      hints: [
        {
          es: "Empieza ejecutando `npm init playwright@latest` en tu repositorio para generar el proyecto base. El asistente configura TypeScript, playwright.config.ts, y un test de ejemplo automáticamente.",
          en: "Start by running `npm init playwright@latest` in your repository to bootstrap the project. The wizard sets up TypeScript, playwright.config.ts, and an example test automatically.",
        },
        {
          es: "Para el archivo de workflow, el orden de los steps es crítico: checkout → node → instalar dependencias → cachear/instalar navegadores → ejecutar tests → subir artefacto. Cada step usa una acción (`uses:`) o ejecuta un comando shell (`run:`).",
          en: "For the workflow file, the order of steps is critical: checkout → node → install deps → cache/install browsers → run tests → upload artifact. Each step uses an action (`uses:`) or runs a shell command (`run:`).",
        },
        {
          es: "El `if: always()` en el step de upload es crucial — sin él, los artefactos solo se suben en builds exitosas, pero tú NECESITAS los reportes de builds fallidas para diagnosticar los problemas. `always()` fuerza la ejecución pase lo que pase.",
          en: "The `if: always()` on the upload step is crucial — without it, artifacts only upload on successful builds, but you NEED reports from failed builds to diagnose problems. `always()` forces execution no matter what.",
        },
        {
          es: "Cachea los navegadores de Playwright por separado de node_modules. Los navegadores pesan ~400 MB y rara vez cambian entre ejecuciones. La clave de caché debe depender de package-lock.json para que se invalide automáticamente cuando actualices Playwright.",
          en: "Cache Playwright browsers separately from node_modules. Browsers weigh ~400 MB and rarely change between runs. The cache key should depend on package-lock.json so it invalidates automatically when you update Playwright.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🎓 CHECKLIST DE GRADUACIÓN — Has completado PlayQAcademy si:\n\n• ✅ Tu repositorio `playwright-portfolio` es público en GitHub\n• ✅ Tiene un proyecto Playwright con TypeScript y 3 navegadores\n• ✅ Usas Page Object Model en tus tests\n• ✅ Tienes tests de UI, API y mixtos (UI+API)\n• ✅ El workflow de GitHub Actions se ejecuta en cada push y PR\n• ✅ Los artefactos del reporte HTML se suben en cada build\n• ✅ El workflow pasa correctamente (build verde en GitHub)\n• ✅ Puedes explicar cada línea del workflow a un compañero",
        en: "🎓 GRADUATION CHECKLIST — You've completed PlayQAcademy if:\n\n• ✅ Your `playwright-portfolio` repo is public on GitHub\n• ✅ It has a Playwright project with TypeScript and 3 browsers\n• ✅ You use Page Object Model in your tests\n• ✅ You have UI, API, and mixed (UI+API) tests\n• ✅ The GitHub Actions workflow runs on every push and PR\n• ✅ HTML report artifacts upload on every build\n• ✅ The workflow passes successfully (green build on GitHub)\n• ✅ You can explain every line of the workflow to a colleague",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Lo que sigue en tu camino",
        en: "What's next on your journey",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has completado PlayQAcademy. Hace 8 módulos empezaste escribiendo tu primera interfaz de TypeScript. Hoy terminas habiendo construido un pipeline de CI/CD que ejecuta tests en 3 navegadores simultáneamente, con Page Object Model, tests de API, mocks, variables de entorno seguras, y reportes HTML profesionales. No has 'visto un curso'. Has adquirido un oficio.",
        en: "You've completed PlayQAcademy. Eight modules ago you started by writing your first TypeScript interface. Today you finish having built a CI/CD pipeline that runs tests across 3 browsers simultaneously, with Page Object Model, API tests, mocks, secure environment variables, and professional HTML reports. You haven't 'watched a course'. You've acquired a craft.",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has hecho la transición que define una carrera en QA: de ejecutar tests manuales a diseñar infraestructura de testing automatizado. Ese es el salto que separa a quien encuentra bugs de quien construye sistemas que los encuentran automáticamente. El primero es valioso. El segundo es irremplazable.",
        en: "You've made the transition that defines a QA career: from running manual tests to designing automated testing infrastructure. That's the leap that separates someone who finds bugs from someone who builds systems that find them automatically. The first is valuable. The second is irreplaceable.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Tus próximos pasos",
        en: "Your next steps",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        {
          es: "Comparte tu repositorio `playwright-portfolio` en LinkedIn. Escribe un post explicando qué construiste y por qué. Los reclutadores buscan pruebas de trabajo real, no listas de cursos. Tu repo con tests pasando en CI es la prueba definitiva.",
          en: "Share your `playwright-portfolio` repo on LinkedIn. Write a post explaining what you built and why. Recruiters search for proof of real work, not course lists. Your repo with passing CI tests is the definitive proof.",
        },
        {
          es: "Contribuye a proyectos open-source de Playwright. Busca issues etiquetados 'good first issue' en el repositorio de Playwright en GitHub. Tu primer PR aceptado en un proyecto real es un multiplicador de credibilidad.",
          en: "Contribute to Playwright open-source projects. Look for issues tagged 'good first issue' in the Playwright repository on GitHub. Your first accepted PR on a real project is a credibility multiplier.",
        },
        {
          es: "Explora testing visual (snapshot testing), testing de accesibilidad (axe-core + Playwright), y testing de rendimiento (Lighthouse + Playwright). Son las tres especializaciones que diferencian a un QA Automation Engineer senior.",
          en: "Explore visual testing (snapshot testing), accessibility testing (axe-core + Playwright), and performance testing (Lighthouse + Playwright). These are the three specializations that differentiate a senior QA Automation Engineer.",
        },
        {
          es: "Mentorea a alguien que esté donde tú estabas hace 8 módulos. Enseñar es la forma más rápida de consolidar lo que sabes. Además, 'mentored junior QAs in test automation' es una línea de CV que abre puertas.",
          en: "Mentor someone who is where you were 8 modules ago. Teaching is the fastest way to consolidate what you know. Plus, 'mentored junior QAs in test automation' is a CV line that opens doors.",
        },
        {
          es: "No dejes de escribir tests. Cada bug que encuentres en producción es un test que faltaba. Cada test que escribas es un bug que nunca llegará a producción. Ese es el ciclo virtuoso de esta profesión.",
          en: "Never stop writing tests. Every bug you find in production is a test that was missing. Every test you write is a bug that will never reach production. That is the virtuous cycle of this profession.",
        },
      ],
    },
    {
      type: "paragraph",
      content: {
        es: "No eres el mismo QA que eras cuando empezaste este campus. Eres un automation engineer. Bienvenido a la profesión.",
        en: "You're not the same QA you were when you started this campus. You're an automation engineer. Welcome to the profession.",
      },
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_8_LESSONS: LessonContent[] = [L8_1, L8_2, L8_3, L8_4, L8_5];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_8_LESSONS;
}
