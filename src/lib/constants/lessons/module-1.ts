/**
 * Module 1 — TypeScript Foundations for QA
 *
 * Full bilingual lesson content for all 5 lessons in Module 1.
 * Each lesson follows the same structure:
 *   - Explanatory headings + paragraphs
 *   - Real code examples
 *   - Callouts (info / tip / warning / important)
 *   - A quiz section testing comprehension
 *   - Lesson 1.5 includes a full coding exercise
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m1-typescript-foundations";

/* ------------------------------------------------------------------ */
/*  Lesson 1.1 — Why TypeScript for Test Automation                    */
/* ------------------------------------------------------------------ */

const L1_1: LessonContent = {
  id: "m1-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "¿Por qué TypeScript para automatización de pruebas?",
        en: "Why TypeScript for Test Automation?",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Si vienes del testing manual, probablemente has interactuado con herramientas sin código o has escrito scripts sencillos en JavaScript. TypeScript lleva esos scripts al siguiente nivel: añade un sistema de tipos estático que atrapa errores antes de que tus tests lleguen a ejecutarse.",
        en: "If you come from manual testing, you've probably used no-code tools or written simple JavaScript scripts. TypeScript takes those scripts to the next level: it adds a static type system that catches errors before your tests even run.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "TypeScript es un superset de JavaScript. Todo código JavaScript válido es TypeScript válido. Puedes migrar tus tests gradualmente, archivo por archivo.",
        en: "TypeScript is a superset of JavaScript. All valid JavaScript is valid TypeScript. You can migrate your tests gradually, file by file.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "El problema del JavaScript puro en pruebas",
        en: "The problem with plain JavaScript in testing",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "En JavaScript, nada te impide escribir esto en un test:",
        en: "In JavaScript, nothing stops you from writing this in a test:",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// JavaScript — no type safety
const button = page.locator('#submit');
await button.clik(); // typo! "clik" instead of "click"
// This will fail at runtime, silently or with a cryptic error.`,
      caption: {
        es: "JavaScript: los errores tipográficos pasan desapercibidos hasta la ejecución",
        en: "JavaScript: typos go unnoticed until runtime",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "En TypeScript, el mismo error ni siquiera compilaría. El editor te marcaría `clik` como un método inexistente en rojo, antes de ejecutar una sola línea.",
        en: "In TypeScript, the same error wouldn't even compile. Your editor would highlight `clik` as a non-existent method in red, before executing a single line.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// TypeScript — catches typos at compile time
import { type Page } from '@playwright/test';

async function submitForm(page: Page) {
  const button = page.locator('#submit');
  // await button.clik(); // ❌ TS2551: Property 'clik' does not exist
  await button.click();    // ✅ Correct
}`,
      caption: {
        es: "TypeScript detecta métodos inexistentes antes de la ejecución",
        en: "TypeScript catches non-existent methods before execution",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 El autocompletado de TypeScript en VS Code te muestra todos los métodos disponibles en un objeto Playwright (click, dblclick, fill, type, etc.) sin necesidad de consultar la documentación constantemente.",
        en: "💡 TypeScript autocompletion in VS Code shows you all available methods on a Playwright object (click, dblclick, fill, type, etc.) without constantly checking the docs.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Beneficios concretos para QA Automation",
        en: "Concrete benefits for QA Automation",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Detección temprana de errores: un typo en un selector o método se detecta al guardar el archivo, no 20 minutos después cuando el pipeline falla.",
          en: "Early error detection: a typo in a selector or method is caught when you save the file, not 20 minutes later when the pipeline fails.",
        },
        {
          es: "Autocompletado inteligente: el IDE conoce la forma de cada objeto y sugiere propiedades y métodos válidos.",
          en: "Intelligent autocompletion: the IDE knows the shape of every object and suggests valid properties and methods.",
        },
        {
          es: "Refactorización segura: cambia el nombre de una función o interfaz y TypeScript actualiza todas las referencias automáticamente.",
          en: "Safe refactoring: rename a function or interface and TypeScript updates all references automatically.",
        },
        {
          es: "Documentación viva: las interfaces de TypeScript son documentación que nunca miente, porque el compilador la fuerza.",
          en: "Living documentation: TypeScript interfaces are documentation that never lies, because the compiler enforces it.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "TypeScript en el ecosistema Playwright",
        en: "TypeScript in the Playwright ecosystem",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Playwright está escrito en TypeScript y su API está completamente tipada. Al usar TypeScript en tus tests, obtienes verificación de tipos para cada llamada a la API de Playwright sin configuración adicional.",
        en: "Playwright is written in TypeScript and its API is fully typed. By using TypeScript in your tests, you get type checking for every Playwright API call with zero extra configuration.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

interface LoginCredentials {
  email: string;
  password: string;
}

test('login with valid credentials', async ({ page }) => {
  const creds: LoginCredentials = {
    email: 'test@playq.academy',
    password: 's3cr3tP@ss',
  };

  await page.goto('/login');
  await page.getByLabel('Email').fill(creds.email);
  await page.getByLabel('Password').fill(creds.password);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(/dashboard/);
});`,
      caption: {
        es: "Test tipado con interfaz LoginCredentials — el compilador garantiza que email y password existen",
        en: "Test typed with LoginCredentials interface — the compiler guarantees email and password exist",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Playwright genera automáticamente tests en TypeScript por defecto. Cuando ejecutas `npm init playwright`, el proyecto resultante ya incluye tsconfig.json y soporte completo de TypeScript.",
        en: "Playwright generates TypeScript tests by default. When you run `npm init playwright`, the resulting project already includes tsconfig.json and full TypeScript support.",
      },
    },
    {
      type: "quiz",
      questionId: "m1-l1-quiz",
      question: {
        es: "¿Cuál es la principal ventaja de usar TypeScript en tests de automatización?",
        en: "What is the main advantage of using TypeScript in automation tests?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Hace que los tests se ejecuten más rápido",
            en: "It makes tests run faster",
          },
        },
        {
          id: "b",
          text: {
            es: "Detecta errores de tipo y tipográficos antes de ejecutar los tests",
            en: "It catches type and typo errors before tests run",
          },
        },
        {
          id: "c",
          text: {
            es: "Genera automáticamente los casos de prueba",
            en: "It automatically generates test cases",
          },
        },
        {
          id: "d",
          text: {
            es: "Reemplaza la necesidad de assertions",
            en: "It replaces the need for assertions",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "TypeScript es un sistema de tipos estático. Su principal ventaja es detectar errores en tiempo de compilación (antes de ejecutar), como llamadas a métodos inexistentes, propiedades mal escritas o tipos incompatibles. No acelera la ejecución ni reemplaza assertions.",
        en: "TypeScript is a static type system. Its main advantage is catching errors at compile time (before execution), such as calls to non-existent methods, misspelled properties, or incompatible types. It doesn't speed up execution or replace assertions.",
      },
    },
  ],
  resources: [
    {
      title: { es: "Documentación oficial de TypeScript", en: "Official TypeScript Documentation" },
      url: "https://www.typescriptlang.org/docs/",
    },
    {
      title: { es: "TypeScript para testers — Playwright Docs", en: "TypeScript for testers — Playwright Docs" },
      url: "https://playwright.dev/docs/test-typescript",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lesson 1.2 — Types, Interfaces and Enums in Tests                  */
/* ------------------------------------------------------------------ */

const L1_2: LessonContent = {
  id: "m1-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Tipos, Interfaces y Enums en pruebas",
        en: "Types, Interfaces and Enums in Tests",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Uno de los mayores problemas en suites de pruebas grandes es la inconsistencia de datos. Una prueba espera que el objeto `user` tenga la propiedad `email`, otra usa `mail`, y una tercera usa `username`. Con TypeScript, defines la forma de tus datos una vez y el compilador la impone en todas partes.",
        en: "One of the biggest problems in large test suites is data inconsistency. One test expects the `user` object to have an `email` property, another uses `mail`, and a third uses `username`. With TypeScript, you define the shape of your data once and the compiler enforces it everywhere.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Tipos básicos",
        en: "Basic types",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Anotaciones de tipo explícitas
let testName: string = 'Login flow';
let retryCount: number = 3;
let isFlaky: boolean = false;
let screenshotPath: string | null = null;

// Arrays tipados
const selectors: string[] = ['#login', '#submit', '#error'];
const waitTimes: number[] = [1000, 5000, 30000];`,
    },
    {
    type: "heading",
    level: 2,
    content: {
      es: "Interfaces: modelando datos de prueba",
      en: "Interfaces: modeling test data",
    },
    },
    {
      type: "paragraph",
      content: {
        es: "Las interfaces son la herramienta más poderosa de TypeScript para QA. Te permiten definir la estructura exacta de tus datos de prueba y reutilizarla en múltiples tests.",
        en: "Interfaces are TypeScript's most powerful tool for QA. They let you define the exact structure of your test data and reuse it across multiple tests.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `interface TestUser {
  email: string;
  password: string;
  role: 'admin' | 'standard' | 'readonly';
  profile: {
    name: string;
    avatar?: string; // opcional
  };
}

// ✅ Válido — cumple la interfaz
const adminUser: TestUser = {
  email: 'admin@playq.academy',
  password: 'Admin123!',
  role: 'admin',
  profile: {
    name: 'Admin User',
  },
};

// ❌ Error de tipo — falta 'role'
// const badUser: TestUser = {
//   email: 'user@test.com',
//   password: 'test',
//   profile: { name: 'Test' },
// };`,
      caption: {
        es: "TypeScript valida que cada objeto cumpla exactamente con la interfaz definida",
        en: "TypeScript validates that every object exactly matches the defined interface",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Usa el operador `?` para marcar propiedades como opcionales. Esto es útil para campos que no siempre están presentes (como `avatar` o `middleName`).",
        en: "💡 Use the `?` operator to mark properties as optional. This is useful for fields that aren't always present (like `avatar` or `middleName`).",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Enums: estados discretos",
        en: "Enums: discrete states",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Los enums son ideales para representar estados que no deberían ser strings mágicos (\"passed\", \"failed\", \"skipped\"). Al usar un enum, el autocompletado te ofrece todas las opciones válidas.",
        en: "Enums are ideal for representing states that shouldn't be magic strings (\"passed\", \"failed\", \"skipped\"). With an enum, autocompletion offers all valid options.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `enum TestResult {
  Passed = 'PASSED',
  Failed = 'FAILED',
  Skipped = 'SKIPPED',
  Flaky = 'FLAKY',
}

function reportResult(result: TestResult): void {
  switch (result) {
    case TestResult.Passed:
      console.log('✅ Test passed');
      break;
    case TestResult.Failed:
      console.log('❌ Test failed');
      break;
    case TestResult.Skipped:
      console.log('⏭️ Test skipped');
      break;
    case TestResult.Flaky:
      console.log('🔄 Test is flaky');
      break;
  }
}

// ✅ TypeScript garantiza que solo valores del enum son aceptados
reportResult(TestResult.Passed);
// reportResult('PASSED'); // ❌ Error: string no es asignable a TestResult`,
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "En TypeScript moderno, muchos desarrolladores prefieren `const` assertions o union types (`'passed' | 'failed'`) en lugar de enums. Ambos enfoques son válidos. Usa el que tu equipo prefiera.",
        en: "In modern TypeScript, many developers prefer `const` assertions or union types (`'passed' | 'failed'`) over enums. Both approaches are valid. Use what your team prefers.",
      },
    },
    {
      type: "quiz",
      questionId: "m1-l2-quiz",
      question: {
        es: "¿Qué palabra clave de TypeScript usarías para definir la estructura de un objeto de datos de prueba?",
        en: "Which TypeScript keyword would you use to define the structure of a test data object?",
      },
      options: [
        {
          id: "a",
          text: { es: "class", en: "class" },
        },
        {
          id: "b",
          text: { es: "interface", en: "interface" },
        },
        {
          id: "c",
          text: { es: "function", en: "function" },
        },
        {
          id: "d",
          text: { es: "module", en: "module" },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Las `interface` de TypeScript definen la forma de un objeto: qué propiedades debe tener, sus tipos y cuáles son opcionales. Son la herramienta principal para modelar datos de prueba de forma segura.",
        en: "TypeScript `interface` defines the shape of an object: which properties it must have, their types, and which are optional. They are the primary tool for safely modeling test data.",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lesson 1.3 — Async/Await and Promises                              */
/* ------------------------------------------------------------------ */

const L1_3: LessonContent = {
  id: "m1-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Async/Await y Promises",
        en: "Async/Await and Promises",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "La automatización de pruebas es inherentemente asíncrona. Cada interacción con el navegador — hacer clic, escribir, navegar, esperar — toma tiempo. TypeScript + Playwright usan el modelo async/await para manejar estas operaciones de forma legible y predecible.",
        en: "Test automation is inherently asynchronous. Every browser interaction — clicking, typing, navigating, waiting — takes time. TypeScript + Playwright use the async/await model to handle these operations in a readable and predictable way.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Promises: la base de la asincronía",
        en: "Promises: the foundation of asynchrony",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Una Promise representa un valor que estará disponible en el futuro
function waitForElement(selector: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) {
      resolve(); // Éxito
    } else {
      reject(new Error(\`Element \${selector} not found\`)); // Fallo
    }
  });
}

// Consumir una Promise con .then() / .catch()
waitForElement('#login-button')
  .then(() => console.log('Element found!'))
  .catch((err) => console.error(err));`,
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Playwright maneja las Promises automáticamente con su sistema de auto-waiting. No necesitas escribir `waitForElement` — Playwright espera a que el elemento esté listo antes de interactuar.",
        en: "Playwright handles Promises automatically with its auto-waiting system. You don't need to write `waitForElement` — Playwright waits for the element to be ready before interacting.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Async/Await: sintaxis limpia para Promises",
        en: "Async/Await: clean syntax for Promises",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "`async/await` es azúcar sintáctico sobre Promises. Hace que el código asíncrono se lea como código síncrono, lo cual es crucial para tests legibles.",
        en: "`async/await` is syntactic sugar over Promises. It makes asynchronous code read like synchronous code, which is crucial for readable tests.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// ❌ Sin async/await — callback hell encadenado
test('login flow with promises', () => {
  page.goto('/login')
    .then(() => page.fill('#email', 'test@test.com'))
    .then(() => page.fill('#password', '123456'))
    .then(() => page.click('#submit'))
    .then(() => expect(page).toHaveURL('/dashboard'))
    .catch((err) => console.error(err));
});

// ✅ Con async/await — lectura lineal, fácil de entender
test('login flow with async/await', async ({ page }) => {
  await page.goto('/login');
  await page.fill('#email', 'test@test.com');
  await page.fill('#password', '123456');
  await page.click('#submit');
  await expect(page).toHaveURL('/dashboard');
});`,
      caption: {
        es: "Async/await vs .then(): la diferencia en legibilidad es dramática",
        en: "Async/await vs .then(): the readability difference is dramatic",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Regla de oro en Playwright: SIEMPRE usa `await` antes de cada interacción con la página. Si olvidas un `await`, tu test continuará sin esperar y fallará de formas difíciles de depurar.",
        en: "💡 Golden rule in Playwright: ALWAYS use `await` before every page interaction. If you forget an `await`, your test will continue without waiting and fail in hard-to-debug ways.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Manejo de errores en código asíncrono",
        en: "Error handling in async code",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('graceful error handling', async ({ page }) => {
  try {
    await page.goto('/login');
    await page.getByLabel('Email').fill('bad@email.com');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verificar mensaje de error visible
    const errorMsg = page.getByRole('alert');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Invalid credentials');
  } catch (error) {
    // Captura de pantalla en caso de fallo inesperado
    await page.screenshot({ path: 'error-debug.png' });
    throw error; // Re-lanza para que el test falle
  }
});`,
      caption: {
        es: "Try/catch con async/await: captura errores y toma screenshots de depuración",
        en: "Try/catch with async/await: catch errors and take debug screenshots",
      },
    },
    {
      type: "quiz",
      questionId: "m1-l3-quiz",
      question: {
        es: "¿Qué sucede si olvidas poner `await` antes de `page.click()` en Playwright?",
        en: "What happens if you forget to put `await` before `page.click()` in Playwright?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "TypeScript muestra un error de compilación y no deja ejecutar",
            en: "TypeScript shows a compilation error and won't run",
          },
        },
        {
          id: "b",
          text: {
            es: "El test continúa inmediatamente sin esperar a que el clic termine, causando fallos impredecibles",
            en: "The test continues immediately without waiting for the click to finish, causing unpredictable failures",
          },
        },
        {
          id: "c",
          text: {
            es: "El clic se ejecuta dos veces",
            en: "The click executes twice",
          },
        },
        {
          id: "d",
          text: {
            es: "Nada, await es opcional en Playwright",
            en: "Nothing, await is optional in Playwright",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Sin `await`, la ejecución del test no espera a que la operación asíncrona termine. El test continúa a la siguiente línea inmediatamente, lo que puede causar que intente verificar algo que aún no ha sucedido, resultando en fallos intermitentes y difíciles de depurar. Por eso la regla de oro: siempre `await`.",
        en: "Without `await`, the test execution doesn't wait for the async operation to complete. The test continues to the next line immediately, which can cause it to try to verify something that hasn't happened yet, resulting in flaky, hard-to-debug failures. That's why the golden rule: always `await`.",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lesson 1.4 — Functions and Arrow Functions                         */
/* ------------------------------------------------------------------ */

const L1_4: LessonContent = {
  id: "m1-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Funciones y Arrow Functions",
        en: "Functions and Arrow Functions",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "En una suite de pruebas profesional, el código repetitivo es el enemigo número uno. Las funciones bien tipadas te permiten encapsular lógica común — como iniciar sesión, crear datos de prueba o limpiar el estado — y reutilizarla en decenas de tests.",
        en: "In a professional test suite, repetitive code is enemy number one. Well-typed functions let you encapsulate common logic — like logging in, creating test data, or cleaning up state — and reuse it across dozens of tests.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Function declarations vs Arrow functions",
        en: "Function declarations vs Arrow functions",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Function declaration — clásica, tiene su propio 'this'
function loginAsAdmin(page: Page): Promise<void> {
  return login(page, 'admin@playq.academy', 'Admin123!');
}

// Arrow function — más corta, hereda 'this' del contexto padre
const loginAsUser = async (page: Page): Promise<void> => {
  await login(page, 'user@playq.academy', 'User123!');
};

// Tipado de parámetros y retorno
async function login(
  page: Page,
  email: string,
  password: string
): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
}`,
      caption: {
        es: "Ambas sintaxis son válidas. En tests, las arrow functions se usan frecuentemente con test()",
        en: "Both syntaxes are valid. In tests, arrow functions are frequently used with test()",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "La diferencia clave: las function declarations tienen su propio `this`, las arrow functions heredan `this` del ámbito padre. En tests de Playwright esto rara vez importa, pero es crucial saberlo para callbacks y event handlers.",
        en: "Key difference: function declarations have their own `this`, arrow functions inherit `this` from the parent scope. In Playwright tests this rarely matters, but it's crucial to know for callbacks and event handlers.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Funciones con parámetros tipados",
        en: "Functions with typed parameters",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Interfaz para opciones de configuración
interface TestConfig {
  baseURL: string;
  viewport: { width: number; height: number };
  timeout: number;
  retries?: number; // opcional
}

// Función que acepta el tipo definido
function createTestFixture(config: TestConfig): void {
  console.log(\`Running tests on \${config.baseURL}\`);
  console.log(\`Viewport: \${config.viewport.width}x\${config.viewport.height}\`);
}

// ✅ TypeScript valida que el objeto cumpla la interfaz
createTestFixture({
  baseURL: 'https://playq.academy',
  viewport: { width: 1280, height: 720 },
  timeout: 30000,
});

// ❌ Error: falta la propiedad 'timeout'
// createTestFixture({ baseURL: '...', viewport: { width: 1280, height: 720 } });`,
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Helpers reutilizables para tus tests",
        en: "Reusable helpers for your tests",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El verdadero poder de las funciones tipadas en testing es crear una biblioteca de helpers que todos los tests del proyecto pueden usar. Aquí un ejemplo realista:",
        en: "The real power of typed functions in testing is creating a library of helpers that all tests in the project can use. Here's a realistic example:",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, expect } from '@playwright/test';

// Helper: verificar que un toast de éxito aparece y desaparece
async function expectSuccessToast(
  page: Page,
  message: string,
  timeout = 5000
): Promise<void> {
  const toast = page.getByRole('status').filter({ hasText: message });
  await expect(toast).toBeVisible({ timeout });
  await expect(toast).not.toBeVisible({ timeout: 10000 });
}

// Helper: llenar un formulario desde un objeto tipado
async function fillForm<T extends Record<string, string>>(
  page: Page,
  data: T
): Promise<void> {
  for (const [field, value] of Object.entries(data)) {
    await page.getByLabel(field, { exact: false }).fill(value);
  }
}

// Uso en tests
test('create new user', async ({ page }) => {
  await fillForm(page, {
    'Full Name': 'Jane Doe',
    'Email': 'jane@test.com',
    'Password': 'SecurePass123',
  });
  await page.getByRole('button', { name: 'Create' }).click();
  await expectSuccessToast(page, 'User created successfully');
});`,
      caption: {
        es: "Helpers tipados: encapsulan lógica repetitiva y la hacen reutilizable con verificación de tipos",
        en: "Typed helpers: encapsulate repetitive logic and make it reusable with type checking",
      },
    },
    {
      type: "quiz",
      questionId: "m1-l4-quiz",
      question: {
        es: "¿Cuál es la ventaja principal de usar funciones helper tipadas en lugar de repetir código en cada test?",
        en: "What is the main advantage of using typed helper functions instead of repeating code in each test?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Los tests se ejecutan en paralelo automáticamente",
            en: "Tests run in parallel automatically",
          },
        },
        {
          id: "b",
          text: {
            es: "Evitas duplicación, ganas verificación de tipos y haces los tests más mantenibles",
            en: "You avoid duplication, gain type checking, and make tests more maintainable",
          },
        },
        {
          id: "c",
          text: {
            es: "Elimina la necesidad de assertions",
            en: "It eliminates the need for assertions",
          },
        },
        {
          id: "d",
          text: {
            es: "Los tests se escriben automáticamente",
            en: "Tests are written automatically",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Los helpers tipados resuelven tres problemas a la vez: (1) eliminan código duplicado, (2) el tipado de TypeScript garantiza que los parámetros sean correctos, y (3) cuando necesitas cambiar la lógica, lo haces en un solo lugar. Esto es la base de una suite de pruebas mantenible a largo plazo.",
        en: "Typed helpers solve three problems at once: (1) they eliminate duplicated code, (2) TypeScript typing guarantees correct parameters, and (3) when you need to change the logic, you do it in one place. This is the foundation of a long-term maintainable test suite.",
      },
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lesson 1.5 — Practical Exercise: Type your first test file         */
/* ------------------------------------------------------------------ */

const L1_5: LessonContent = {
  id: "m1-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Ejercicio práctico: Tipa tu primer archivo de test",
        en: "Practical Exercise: Type your first test file",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has aprendido los fundamentos de TypeScript aplicados a testing. Ahora es momento de ponerlo en práctica. En este ejercicio, tomarás un archivo de test en JavaScript y lo convertirás a TypeScript, añadiendo tipos, interfaces y buenas prácticas.",
        en: "You've learned the fundamentals of TypeScript applied to testing. Now it's time to put it into practice. In this exercise, you'll take a JavaScript test file and convert it to TypeScript, adding types, interfaces, and best practices.",
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
        es: "Imagina que trabajas en una aplicación de e-commerce. El equipo de desarrollo te ha pedido que escribas tests para el flujo de búsqueda y compra. Actualmente hay un test en JavaScript sin tipos que funciona, pero es frágil. Tu tarea es convertirlo a TypeScript con tipado estricto.",
        en: "Imagine you work on an e-commerce application. The development team has asked you to write tests for the search and purchase flow. There's currently an untyped JavaScript test that works but is fragile. Your task is to convert it to TypeScript with strict typing.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m1-l5-exercise",
      instructions: {
        es: "Convierte el siguiente archivo de test de JavaScript a TypeScript:\n\n1. Define interfaces para `Product` y `SearchCriteria`\n2. Tipa la función `searchProducts`\n3. Añade tipos a todos los parámetros\n4. Usa un enum para los estados de orden (`OrderStatus`)\n5. Asegúrate de que el test compile sin errores con `tsc --noEmit`",
        en: "Convert the following JavaScript test file to TypeScript:\n\n1. Define interfaces for `Product` and `SearchCriteria`\n2. Type the `searchProducts` function\n3. Add types to all parameters\n4. Use an enum for order states (`OrderStatus`)\n5. Ensure the test compiles without errors using `tsc --noEmit`",
      },
      starterCode: `// JavaScript original — sin tipos
const product = {
  name: 'Wireless Mouse',
  price: 29.99,
  category: 'Electronics',
  inStock: true,
};

function searchProducts(criteria) {
  // Simula búsqueda
  if (criteria.maxPrice && product.price > criteria.maxPrice) {
    return [];
  }
  if (criteria.category && product.category !== criteria.category) {
    return [];
  }
  return [product];
}

function getOrderStatus(status) {
  switch (status) {
    case 0: return 'Pending';
    case 1: return 'Shipped';
    case 2: return 'Delivered';
    case 3: return 'Cancelled';
    default: return 'Unknown';
  }
}

// Test
const results = searchProducts({
  category: 'Electronics',
  maxPrice: 50,
  inStockOnly: true,
});

if (results.length > 0) {
  console.log('Found:', results[0].name);
  console.log('Status:', getOrderStatus(1));
}`,
      solution: `// TypeScript — completamente tipado

// 1. Interfaces para los datos
interface Product {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface SearchCriteria {
  category?: string;
  maxPrice?: number;
  inStockOnly?: boolean;
}

// 2. Enum para estados de orden
enum OrderStatus {
  Pending = 0,
  Shipped = 1,
  Delivered = 2,
  Cancelled = 3,
}

// 3. Función tipada
function searchProducts(criteria: SearchCriteria): Product[] {
  const product: Product = {
    name: 'Wireless Mouse',
    price: 29.99,
    category: 'Electronics',
    inStock: true,
  };

  if (criteria.maxPrice !== undefined && product.price > criteria.maxPrice) {
    return [];
  }
  if (criteria.category !== undefined && product.category !== criteria.category) {
    return [];
  }
  if (criteria.inStockOnly && !product.inStock) {
    return [];
  }
  return [product];
}

// 4. Función con enum tipado
function getOrderStatus(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.Pending:
      return 'Pending';
    case OrderStatus.Shipped:
      return 'Shipped';
    case OrderStatus.Delivered:
      return 'Delivered';
    case OrderStatus.Cancelled:
      return 'Cancelled';
    default: {
      const _exhaustive: never = status;
      return 'Unknown';
    }
  }
}

// 5. Test tipado
const results: Product[] = searchProducts({
  category: 'Electronics',
  maxPrice: 50,
  inStockOnly: true,
});

if (results.length > 0) {
  const firstProduct = results[0];
  if (firstProduct) {
    console.log('Found:', firstProduct.name);
  }
  console.log('Status:', getOrderStatus(OrderStatus.Shipped));
}`,
      hints: [
        {
          es: "Empieza por definir una `interface Product` con las propiedades: name (string), price (number), category (string), inStock (boolean).",
          en: "Start by defining a `Product` interface with properties: name (string), price (number), category (string), inStock (boolean).",
        },
        {
          es: "Define `enum OrderStatus` con los valores del 0 al 3. Usa el enum en el switch de `getOrderStatus`.",
          en: "Define `enum OrderStatus` with values 0 through 3. Use the enum in the `getOrderStatus` switch.",
        },
        {
          es: "Para la función `searchProducts`, el parámetro debe ser de tipo `SearchCriteria` y debe retornar `Product[]`.",
          en: "For the `searchProducts` function, the parameter should be of type `SearchCriteria` and it should return `Product[]`.",
        },
        {
          es: "Añade un caso `default` con un `never` type check para asegurar que todos los casos del enum están cubiertos (exhaustive check).",
          en: "Add a `default` case with a `never` type check to ensure all enum cases are covered (exhaustive check).",
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 El patrón `never` en el default del switch es una técnica avanzada de TypeScript llamada 'exhaustive check'. Si en el futuro alguien añade un nuevo valor al enum, TypeScript marcará un error de compilación aquí, forzando a que se maneje el nuevo caso.",
        en: "💡 The `never` pattern in the switch default is an advanced TypeScript technique called 'exhaustive check'. If someone adds a new value to the enum in the future, TypeScript will show a compilation error here, forcing the new case to be handled.",
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
          es: "¿Tu código compila sin errores con `tsc --noEmit`?",
          en: "Does your code compile without errors with `tsc --noEmit`?",
        },
        {
          es: "¿Definiste interfaces para Product y SearchCriteria?",
          en: "Did you define interfaces for Product and SearchCriteria?",
        },
        {
          es: "¿Usaste un enum para OrderStatus en lugar de números mágicos?",
          en: "Did you use an enum for OrderStatus instead of magic numbers?",
        },
        {
          es: "¿Tipaste el parámetro y retorno de cada función?",
          en: "Did you type the parameter and return value of each function?",
        },
        {
          es: "¿Añadiste el exhaustive check con `never` en el default del switch?",
          en: "Did you add the exhaustive check with `never` in the switch default?",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m1-l5-quiz",
      question: {
        es: "¿Qué patrón de TypeScript garantiza que un switch cubra todos los casos posibles de un enum?",
        en: "Which TypeScript pattern guarantees that a switch covers all possible cases of an enum?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Añadir un console.log en el default",
            en: "Adding a console.log in the default",
          },
        },
        {
          id: "b",
          text: {
            es: "El 'exhaustive check' con `never` en el caso default",
            en: "The 'exhaustive check' with `never` in the default case",
          },
        },
        {
          id: "c",
          text: {
            es: "Usar `any` en el parámetro del switch",
            en: "Using `any` in the switch parameter",
          },
        },
        {
          id: "d",
          text: {
            es: "No incluir un caso default",
            en: "Not including a default case",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El exhaustive check asigna el valor restante a una variable de tipo `never`. Si queda algún caso del enum sin cubrir, TypeScript produce un error de compilación porque el tipo no es asignable a `never`. Es una técnica poderosa para garantizar que tu código maneje todos los estados posibles.",
        en: "The exhaustive check assigns the remaining value to a variable of type `never`. If any enum case is left uncovered, TypeScript produces a compilation error because the type is not assignable to `never`. It's a powerful technique to guarantee your code handles all possible states.",
      },
    },
  ],
  resources: [
    {
      title: { es: "TypeScript Handbook — Narrowing", en: "TypeScript Handbook — Narrowing" },
      url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type",
    },
    {
      title: { es: "Playwright — Escribiendo tests", en: "Playwright — Writing tests" },
      url: "https://playwright.dev/docs/writing-tests",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */

const MODULE_1_LESSONS: LessonContent[] = [L1_1, L1_2, L1_3, L1_4, L1_5];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_1_LESSONS;
}
