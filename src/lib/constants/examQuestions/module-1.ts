/**
 * Exam question bank — Module 1: TypeScript Foundations for QA.
 *
 * 25 questions (10 easy, 10 medium, 5 hard) covering:
 *   - Why TypeScript for testing
 *   - Types, interfaces, enums
 *   - Async/await and promises
 *   - Functions and arrow functions
 *   - Practical typing scenarios
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M1 = "m1-typescript-foundations";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (10 questions)                                                */
  /* ================================================================== */

  {
    id: "m1-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Qué es TypeScript en relación a JavaScript?",
      en: "What is TypeScript in relation to JavaScript?",
    },
    options: [
      { id: "a", text: { es: "Un lenguaje completamente diferente sin relación con JavaScript", en: "A completely different language unrelated to JavaScript" } },
      { id: "b", text: { es: "Un superset tipado de JavaScript que compila a JavaScript puro", en: "A typed superset of JavaScript that compiles to plain JavaScript" } },
      { id: "c", text: { es: "Un framework de testing para JavaScript", en: "A testing framework for JavaScript" } },
      { id: "d", text: { es: "Un reemplazo del motor V8 de Chrome", en: "A replacement for Chrome's V8 engine" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "TypeScript es un superset de JavaScript desarrollado por Microsoft. Añade tipado estático opcional y compila a JavaScript puro que puede ejecutarse en cualquier navegador o Node.js. Todo código JavaScript válido es también TypeScript válido.",
      en: "TypeScript is a superset of JavaScript developed by Microsoft. It adds optional static typing and compiles to plain JavaScript that runs in any browser or Node.js. All valid JavaScript is also valid TypeScript.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m1-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "TypeScript detecta errores de tipo antes de que el código se ejecute, durante la fase de compilación.",
      en: "TypeScript detects type errors before the code runs, during the compilation phase.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Esta es la ventaja principal de TypeScript: el compilador verifica los tipos en tiempo de compilación (o al guardar en el editor), atrapando errores como propiedades inexistentes, tipos incorrectos y llamadas a funciones con argumentos equivocados antes de que el código llegue a producción.",
      en: "Correct. This is TypeScript's main advantage: the compiler checks types at compile time (or on save in the editor), catching errors like non-existent properties, wrong types, and function calls with incorrect arguments before the code reaches production.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m1-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Qué anotación de tipo usarías para una variable que puede ser string o null?",
      en: "What type annotation would you use for a variable that can be string or null?",
    },
    options: [
      { id: "a", text: { es: "string", en: "string" } },
      { id: "b", text: { es: "string | undefined", en: "string | undefined" } },
      { id: "c", text: { es: "string | null", en: "string | null" } },
      { id: "d", text: { es: "Nullable<string>", en: "Nullable<string>" } },
    ],
    correctOptionIds: ["c"],
    explanation: {
      es: "La respuesta correcta es `string | null`. TypeScript usa el operador de unión `|` para crear tipos que aceptan múltiples posibilidades. `Nullable<string>` no existe como tipo nativo; se usa `string | null` para representar un valor que puede ser string o nulo.",
      en: "The correct answer is `string | null`. TypeScript uses the union operator `|` to create types that accept multiple possibilities. `Nullable<string>` doesn't exist as a native type; `string | null` represents a value that can be a string or null.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m1-e4",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "En TypeScript, `interface` define la estructura de un objeto pero no genera código JavaScript en tiempo de ejecución.",
      en: "In TypeScript, `interface` defines the structure of an object but does not generate JavaScript code at runtime.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Las interfaces de TypeScript son puramente una construcción de tiempo de compilación. Se eliminan completamente durante la compilación y no existen en el JavaScript resultante. Su propósito es exclusivamente la verificación de tipos.",
      en: "TypeScript interfaces are purely a compile-time construct. They are completely removed during compilation and don't exist in the resulting JavaScript. Their sole purpose is type checking.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m1-e5",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Cuál es la palabra clave para declarar una función asíncrona en TypeScript?",
      en: "What keyword declares an asynchronous function in TypeScript?",
    },
    options: [
      { id: "a", text: { es: "promise", en: "promise" } },
      { id: "b", text: { es: "async", en: "async" } },
      { id: "c", text: { es: "await", en: "await" } },
      { id: "d", text: { es: "defer", en: "defer" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`async` se coloca antes de la declaración de una función para convertirla en asíncrona. Una función async siempre retorna una Promise. `await` se usa DENTRO de funciones async para esperar Promises, no para declararlas.",
      en: "`async` is placed before a function declaration to make it asynchronous. An async function always returns a Promise. `await` is used INSIDE async functions to wait for Promises, not to declare them.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m1-e6",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "En Playwright, es seguro omitir `await` antes de `page.click()` porque Playwright espera automáticamente.",
      en: "In Playwright, it's safe to omit `await` before `page.click()` because Playwright auto-waits.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. Aunque Playwright tiene auto-waiting, SIEMPRE debes usar `await` antes de operaciones asíncronas. Sin `await`, el test continúa inmediatamente sin esperar a que la operación termine, causando fallos intermitentes difíciles de depurar.",
      en: "False. Although Playwright has auto-waiting, you MUST always use `await` before async operations. Without `await`, the test continues immediately without waiting for the operation to finish, causing flaky, hard-to-debug failures.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m1-e7",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Cuál es la principal ventaja de usar TypeScript en tests de Playwright?",
      en: "What is the main advantage of using TypeScript in Playwright tests?",
    },
    options: [
      { id: "a", text: { es: "Los tests se ejecutan más rápido", en: "Tests run faster" } },
      { id: "b", text: { es: "Autocompletado de métodos y detección de errores tipográficos en selectores", en: "Method autocompletion and typo detection in selectors" } },
      { id: "c", text: { es: "Los tests se escriben automáticamente", en: "Tests are written automatically" } },
      { id: "d", text: { es: "No necesitas assertions", en: "You don't need assertions" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "TypeScript proporciona autocompletado de la API de Playwright en el editor y detecta errores como `page.clik()` (typo) en tiempo de compilación, antes de ejecutar el test. Esto ahorra tiempo de depuración y reduce tests flaky.",
      en: "TypeScript provides Playwright API autocompletion in the editor and catches errors like `page.clik()` (typo) at compile time, before running the test. This saves debugging time and reduces flaky tests.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m1-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Qué operador de TypeScript marca una propiedad de interfaz como opcional?",
      en: "Which TypeScript operator marks an interface property as optional?",
    },
    options: [
      { id: "a", text: { es: "!", en: "!" } },
      { id: "b", text: { es: "?", en: "?" } },
      { id: "c", text: { es: "*", en: "*" } },
      { id: "d", text: { es: "??", en: "??" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El operador `?` después del nombre de una propiedad la marca como opcional. Por ejemplo: `interface User { name: string; avatar?: string; }`. La propiedad `avatar` es opcional y puede ser `undefined`.",
      en: "The `?` operator after a property name marks it as optional. For example: `interface User { name: string; avatar?: string; }`. The `avatar` property is optional and can be `undefined`.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m1-e9",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "Las arrow functions `() => {}` heredan el valor de `this` del contexto donde fueron definidas.",
      en: "Arrow functions `() => {}` inherit the `this` value from the context where they were defined.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. A diferencia de las function declarations que crean su propio `this`, las arrow functions capturan el `this` del ámbito léxico padre. Esto las hace ideales para callbacks y event handlers en tests.",
      en: "Correct. Unlike function declarations which create their own `this`, arrow functions capture `this` from the enclosing lexical scope. This makes them ideal for callbacks and event handlers in tests.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m1-e10",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M1],
    question: {
      es: "¿Qué valor de retorno tiene una función marcada como `async`?",
      en: "What return value does a function marked as `async` have?",
    },
    options: [
      { id: "a", text: { es: "El valor directamente, sin envoltura", en: "The value directly, unwrapped" } },
      { id: "b", text: { es: "Siempre una Promise, incluso si retornas un valor simple", en: "Always a Promise, even if you return a plain value" } },
      { id: "c", text: { es: "void", en: "void" } },
      { id: "d", text: { es: "Depende de si usas await dentro", en: "Depends on whether you use await inside" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Una función async SIEMPRE retorna una Promise. Si retornas un valor simple como `return 42`, TypeScript/JavaScript lo envuelve automáticamente en `Promise.resolve(42)`. Esto es consistente independientemente de si usas await dentro de la función.",
      en: "An async function ALWAYS returns a Promise. If you return a plain value like `return 42`, TypeScript/JavaScript automatically wraps it in `Promise.resolve(42)`. This is consistent regardless of whether you use await inside the function.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },

  /* ================================================================== */
  /*  MEDIUM (10 questions)                                              */
  /* ================================================================== */

  {
    id: "m1-m1",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Cuáles de las siguientes son ventajas reales de usar TypeScript en automatización de pruebas? (Selecciona todas las correctas)",
      en: "Which of the following are real advantages of using TypeScript in test automation? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Detección de errores en tiempo de compilación", en: "Compile-time error detection" } },
      { id: "b", text: { es: "Autocompletado de métodos de Playwright en el editor", en: "Playwright method autocompletion in the editor" } },
      { id: "c", text: { es: "Los tests se ejecutan 10x más rápido", en: "Tests run 10x faster" } },
      { id: "d", text: { es: "Refactorización segura de nombres de funciones y variables", en: "Safe refactoring of function and variable names" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "TypeScript NO acelera la ejecución de tests — el código compilado es JavaScript puro. Sin embargo, SÍ proporciona detección temprana de errores, autocompletado en el IDE y refactorización segura, que son ventajas enormes para la mantenibilidad de suites de pruebas grandes.",
      en: "TypeScript does NOT speed up test execution — the compiled code is plain JavaScript. However, it DOES provide early error detection, IDE autocompletion, and safe refactoring, which are huge advantages for maintainability of large test suites.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m1-m2",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Qué imprime este código TypeScript?",
      en: "What does this TypeScript code print?",
    },
    codeSnippet: `interface Config {
  url: string;
  retries?: number;
}

function run(config: Config) {
  console.log(config.retries ?? 3);
}

run({ url: 'https://test.com' });
run({ url: 'https://test.com', retries: 5 });`,
    options: [
      { id: "a", text: { es: "3 y 5", en: "3 and 5" } },
      { id: "b", text: { es: "undefined y 5", en: "undefined and 5" } },
      { id: "c", text: { es: "3 y 3", en: "3 and 3" } },
      { id: "d", text: { es: "Error de compilación", en: "Compilation error" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "El operador `??` (nullish coalescing) retorna el lado derecho solo si el izquierdo es `null` o `undefined`. En la primera llamada, `retries` es `undefined` (propiedad opcional omitida), por lo que imprime 3. En la segunda, `retries` es 5, por lo que imprime 5.",
      en: "The `??` operator (nullish coalescing) returns the right side only if the left side is `null` or `undefined`. In the first call, `retries` is `undefined` (optional property omitted), so it prints 3. In the second, `retries` is 5, so it prints 5.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m1-m3",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Qué patrón de TypeScript garantiza que un switch cubra todos los casos posibles de un enum?",
      en: "Which TypeScript pattern guarantees a switch covers all possible cases of an enum?",
    },
    options: [
      { id: "a", text: { es: "Usar `break` en cada caso", en: "Using `break` in each case" } },
      { id: "b", text: { es: "El 'exhaustive check' asignando el valor restante a `never` en el caso default", en: "The 'exhaustive check' by assigning the remaining value to `never` in the default case" } },
      { id: "c", text: { es: "Añadir un `console.log` en el default", en: "Adding a `console.log` in the default" } },
      { id: "d", text: { es: "No incluir un caso default", en: "Not including a default case" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El exhaustive check con `never` es una técnica donde el caso default recibe un valor tipado como `never`. Si queda algún caso del enum sin cubrir, el compilador produce un error porque ese valor no es asignable a `never`. Esto fuerza a manejar todos los casos.",
      en: "The exhaustive check with `never` is a technique where the default case receives a value typed as `never`. If any enum case is left uncovered, the compiler produces an error because that value isn't assignable to `never`. This forces handling all cases.",
    },
    points: 2,
    timeEstimateSeconds: 40,
  },
  {
    id: "m1-m4",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Cuál es el resultado de este test de Playwright?",
      en: "What is the result of this Playwright test?",
    },
    codeSnippet: `test('login flow', async ({ page }) => {
  await page.goto('/login');
  const email = page.getByLabel('Email');
  
  // NOTE: missing 'await'
  email.fill('test@test.com');
  
  await page.getByRole('button').click();
  await expect(page).toHaveURL('/dashboard');
});`,
    options: [
      { id: "a", text: { es: "El test pasa correctamente porque Playwright auto-espera", en: "The test passes because Playwright auto-waits" } },
      { id: "b", text: { es: "El test puede fallar de forma intermitente porque `fill` se ejecuta sin esperar a que termine", en: "The test may fail intermittently because `fill` runs without waiting to finish" } },
      { id: "c", text: { es: "TypeScript muestra un error de compilación", en: "TypeScript shows a compilation error" } },
      { id: "d", text: { es: "El test siempre falla inmediatamente", en: "The test always fails immediately" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El `fill()` sin `await` retorna una Promise que no se espera. El test continúa a `click()` antes de que el campo se haya llenado. Esto puede causar que el formulario se envíe con el campo vacío, resultando en un fallo intermitente. TypeScript no marca error porque `fill()` retorna `Promise<void>` y no hay verificación de 'floating promises' por defecto.",
      en: "`fill()` without `await` returns a Promise that isn't awaited. The test continues to `click()` before the field is filled. This can cause the form to submit with an empty field, resulting in an intermittent failure. TypeScript doesn't flag this because `fill()` returns `Promise<void>` and there's no 'floating promise' check by default.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m1-m5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Cuál es la diferencia entre `interface` y `type` en TypeScript para definir objetos?",
      en: "What is the difference between `interface` and `type` in TypeScript for defining objects?",
    },
    options: [
      { id: "a", text: { es: "No hay diferencias, son idénticos", en: "There are no differences, they're identical" } },
      { id: "b", text: { es: "Solo `interface` puede ser extendida, `type` no", en: "Only `interface` can be extended, `type` cannot" } },
      { id: "c", text: { es: "`interface` puede ser aumentada (declaration merging), `type` no", en: "`interface` can be augmented (declaration merging), `type` cannot" } },
      { id: "d", text: { es: "`type` es más rápido en tiempo de compilación", en: "`type` is faster at compile time" } },
    ],
    correctOptionIds: ["c"],
    explanation: {
      es: "Aunque `interface` y `type` son similares, una diferencia clave es el 'declaration merging': las interfaces con el mismo nombre en el mismo scope se fusionan automáticamente. Los type aliases no pueden fusionarse. Ambos pueden extenderse (interface con `extends`, type con intersecciones `&`).",
      en: "Although `interface` and `type` are similar, a key difference is 'declaration merging': interfaces with the same name in the same scope are automatically merged. Type aliases cannot be merged. Both can be extended (interface with `extends`, type with intersections `&`).",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m1-m6",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Qué error de compilación produce este código?",
      en: "What compilation error does this code produce?",
    },
    codeSnippet: `type Status = 'pending' | 'active' | 'completed';

function updateStatus(status: Status) {
  if (status === 'pending') return 'Pendiente';
  if (status === 'active') return 'Activo';
  // Missing 'completed' case
}`,
    options: [
      { id: "a", text: { es: "Ningún error, compila normalmente", en: "No error, compiles normally" } },
      { id: "b", text: { es: "Error: la función no siempre retorna un valor (not all code paths return a value)", en: "Error: not all code paths return a value" } },
      { id: "c", text: { es: "Error: 'status' no es un tipo válido", en: "Error: 'status' is not a valid type" } },
      { id: "d", text: { es: "Error: no se puede usar 'return' dentro de un if", en: "Error: cannot use 'return' inside an if" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "TypeScript analiza el flujo de control y detecta que si `status` es `'completed'`, la función no retorna nada (implícitamente `undefined`). Como el tipo de retorno inferido incluye `undefined`, y `noImplicitReturns` o `strict` está activado, el compilador advierte que no todos los caminos retornan un valor.",
      en: "TypeScript analyzes control flow and detects that if `status` is `'completed'`, the function returns nothing (implicitly `undefined`). Since the inferred return type includes `undefined`, and `noImplicitReturns` or `strict` is enabled, the compiler warns that not all paths return a value.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m1-m7",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "En testing con Playwright + TypeScript, ¿cuáles de las siguientes prácticas son recomendadas? (Selecciona todas las correctas)",
      en: "In Playwright + TypeScript testing, which of the following practices are recommended? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Definir interfaces para los datos de prueba (credenciales, usuarios, productos)", en: "Define interfaces for test data (credentials, users, products)" } },
      { id: "b", text: { es: "Usar `any` para todos los parámetros cuando no estés seguro del tipo", en: "Use `any` for all parameters when unsure of the type" } },
      { id: "c", text: { es: "Crear funciones helper tipadas para acciones repetitivas (login, navegación)", en: "Create typed helper functions for repetitive actions (login, navigation)" } },
      { id: "d", text: { es: "Usar enums para estados discretos (TestResult.Passed, TestResult.Failed)", en: "Use enums for discrete states (TestResult.Passed, TestResult.Failed)" } },
    ],
    correctOptionIds: ["a", "c", "d"],
    explanation: {
      es: "NUNCA uses `any` en una suite de pruebas profesional — elimina toda la seguridad de tipos. Las interfaces, helpers tipados y enums son prácticas excelentes que hacen tu suite más mantenible y menos propensa a errores.",
      en: "NEVER use `any` in a professional test suite — it removes all type safety. Interfaces, typed helpers, and enums are excellent practices that make your suite more maintainable and less error-prone.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m1-m8",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Qué sucede si una función `async` lanza una excepción con `throw`?",
      en: "What happens if an `async` function throws an exception with `throw`?",
    },
    options: [
      { id: "a", text: { es: "La excepción se pierde porque las funciones async no propagan errores", en: "The exception is lost because async functions don't propagate errors" } },
      { id: "b", text: { es: "La Promise retornada es rechazada (rejected) con el error", en: "The returned Promise is rejected with the error" } },
      { id: "c", text: { es: "El programa se detiene inmediatamente", en: "The program stops immediately" } },
      { id: "d", text: { es: "El error se convierte en un warning de consola", en: "The error becomes a console warning" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Cuando una función async lanza una excepción, la Promise que retorna es rechazada con ese error. Puedes capturarlo con `.catch()` o con `try/catch` + `await`. Por eso en Playwright es importante usar `try/catch` alrededor de operaciones que pueden fallar si quieres manejarlo con gracia.",
      en: "When an async function throws an exception, the Promise it returns is rejected with that error. You can catch it with `.catch()` or with `try/catch` + `await`. That's why in Playwright it's important to use `try/catch` around operations that may fail if you want to handle them gracefully.",
    },
    points: 2,
    timeEstimateSeconds: 35,
  },
  {
    id: "m1-m9",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Qué tipo infiere TypeScript para la variable `result`?",
      en: "What type does TypeScript infer for the variable `result`?",
    },
    codeSnippet: `async function getStatus(): Promise<'ok' | 'error'> {
  return 'ok';
}

async function main() {
  const result = await getStatus();
  // ¿Qué tipo tiene result?
}`,
    options: [
      { id: "a", text: { es: "Promise<'ok' | 'error'>", en: "Promise<'ok' | 'error'>" } },
      { id: "b", text: { es: "'ok' | 'error'", en: "'ok' | 'error'" } },
      { id: "c", text: { es: "string", en: "string" } },
      { id: "d", text: { es: "any", en: "any" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`await` desenvuelve la Promise automáticamente. Como `getStatus()` retorna `Promise<'ok' | 'error'>`, al usar `await` obtienes directamente el tipo `'ok' | 'error'`. TypeScript resuelve los tipos a través de `await` de forma transparente.",
      en: "`await` unwraps the Promise automatically. Since `getStatus()` returns `Promise<'ok' | 'error'>`, using `await` gives you the type `'ok' | 'error'` directly. TypeScript resolves types through `await` transparently.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m1-m10",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M1],
    question: {
      es: "¿Cuál es la mejor manera de tipar una función helper de login que acepta un objeto page de Playwright y credenciales?",
      en: "What is the best way to type a login helper function that accepts a Playwright page object and credentials?",
    },
    options: [
      { id: "a", text: { es: "Usar `any` para page porque su tipo es complejo", en: "Use `any` for page because its type is complex" } },
      { id: "b", text: { es: "Importar `Page` de `@playwright/test` y usarlo como tipo del parámetro", en: "Import `Page` from `@playwright/test` and use it as the parameter type" } },
      { id: "c", text: { es: "Usar `Object` como tipo genérico", en: "Use `Object` as a generic type" } },
      { id: "d", text: { es: "No tipar el parámetro y dejar que TypeScript infiera", en: "Don't type the parameter and let TypeScript infer" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Playwright exporta el tipo `Page` desde `@playwright/test`. Importarlo y usarlo como `async function login(page: Page, creds: Credentials)` te da autocompletado completo y verificación de tipos. NUNCA uses `any` cuando el tipo está disponible.",
      en: "Playwright exports the `Page` type from `@playwright/test`. Importing it and using it as `async function login(page: Page, creds: Credentials)` gives you full autocompletion and type checking. NEVER use `any` when the type is available.",
    },
    points: 2,
    timeEstimateSeconds: 35,
  },

  /* ================================================================== */
  /*  HARD (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m1-h1",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M1],
    question: {
      es: "Completa el código para que la función `createTestUser` retorne un objeto que satisfaga la interfaz `TestUser`. La propiedad `role` debe ser una unión de strings.",
      en: "Complete the code so the `createTestUser` function returns an object that satisfies the `TestUser` interface. The `role` property should be a union of strings.",
    },
    codeSnippet: `interface TestUser {
  email: string;
  roles: ('admin' | 'editor' | 'viewer')[];
  profile: { name: string; avatar?: string };
}

function createTestUser(
  email: string,
  name: string
): TestUser {
  return {
    email,
    roles: [_____],
    profile: { name },
  };
}`,
    options: [
      { id: "a", text: { es: "'viewer'", en: "'viewer'" } },
      { id: "b", text: { es: "['admin', 'editor']", en: "['admin', 'editor']" } },
      { id: "c", text: { es: "roles: ['viewer']", en: "roles: ['viewer']" } },
      { id: "d", text: { es: "Cualquier string del union type 'admin' | 'editor' | 'viewer'", en: "Any string from the union type 'admin' | 'editor' | 'viewer'" } },
    ],
    correctOptionIds: ["d"],
    explanation: {
      es: "El campo `roles` es un array (`[]`) de la unión `'admin' | 'editor' | 'viewer'`. Cualquier combinación de estos valores es válida: `['viewer']`, `['admin', 'editor']`, `['viewer', 'admin', 'editor']`. TypeScript verifica que cada elemento del array pertenezca a la unión.",
      en: "The `roles` field is an array (`[]`) of the union `'admin' | 'editor' | 'viewer'`. Any combination of these values is valid: `['viewer']`, `['admin', 'editor']`, `['viewer', 'admin', 'editor']`. TypeScript verifies that each array element belongs to the union.",
    },
    points: 3,
    timeEstimateSeconds: 60,
  },
  {
    id: "m1-h2",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M1],
    question: {
      es: "¿Qué imprime este código? Explica por qué.",
      en: "What does this code print? Explain why.",
    },
    codeSnippet: `function decorator(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log('before');
    const result = original.apply(this, args);
    console.log('after');
    return result;
  };
}

class TestRunner {
  @decorator
  run(testName: string) {
    console.log(testName);
  }
}

new TestRunner().run('LoginTest');`,
    options: [
      { id: "a", text: { es: "before, LoginTest, after — en ese orden", en: "before, LoginTest, after — in that order" } },
      { id: "b", text: { es: "LoginTest, before, after — en ese orden", en: "LoginTest, before, after — in that order" } },
      { id: "c", text: { es: "before, after, LoginTest", en: "before, after, LoginTest" } },
      { id: "d", text: { es: "before, after", en: "before, after" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Los decoradores en TypeScript envuelven métodos. El decorador `@decorator` reemplaza el método original con una función que ejecuta `console.log('before')`, luego el método original (que imprime 'LoginTest'), y finalmente `console.log('after')`. El orden es: before → LoginTest → after.",
      en: "TypeScript decorators wrap methods. The `@decorator` replaces the original method with a function that runs `console.log('before')`, then the original method (which prints 'LoginTest'), and finally `console.log('after')`. The order is: before → LoginTest → after.",
    },
    points: 3,
    timeEstimateSeconds: 75,
  },
  {
    id: "m1-h3",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M1],
    question: {
      es: "Dado este código TypeScript con tipos genéricos, ¿cuáles de las siguientes afirmaciones son correctas?",
      en: "Given this TypeScript code with generic types, which of the following statements are correct?",
    },
    codeSnippet: `function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

const nums = firstElement([1, 2, 3]);
const strs = firstElement(['a', 'b']);
const mixed = firstElement([1, 'a']);`,
    options: [
      { id: "a", text: { es: "`nums` tiene tipo `number | undefined`", en: "`nums` is of type `number | undefined`" } },
      { id: "b", text: { es: "`strs` tiene tipo `string | undefined`", en: "`strs` is of type `string | undefined`" } },
      { id: "c", text: { es: "`mixed` tiene tipo `any | undefined`", en: "`mixed` is of type `any | undefined`" } },
      { id: "d", text: { es: "`mixed` tiene tipo `string | number | undefined`", en: "`mixed` is of type `string | number | undefined`" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "TypeScript infiere el tipo genérico `T` del argumento. Para `[1, 2, 3]`, `T` es `number`. Para `['a', 'b']`, `T` es `string`. Para `[1, 'a']`, TypeScript infiere `T` como `string | number` (la unión de los tipos en el array). NO infiere `any` porque ambos elementos tienen tipos concretos.",
      en: "TypeScript infers the generic type `T` from the argument. For `[1, 2, 3]`, `T` is `number`. For `['a', 'b']`, `T` is `string`. For `[1, 'a']`, TypeScript infers `T` as `string | number` (the union of types in the array). It does NOT infer `any` because both elements have concrete types.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
  {
    id: "m1-h4",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M1],
    question: {
      es: "En este test de Playwright, ¿qué problema de tipado existe?",
      en: "In this Playwright test, what typing problem exists?",
    },
    codeSnippet: `import { test, expect, type Page } from '@playwright/test';

async function getDashboardTitle(page: Page) {
  return page.locator('h1').textContent();
}

test('dashboard shows title', async ({ page }) => {
  await page.goto('/dashboard');
  const title = await getDashboardTitle(page);
  expect(title).toBe('Dashboard'); // ¿Problema aquí?
});`,
    options: [
      { id: "a", text: { es: "Ningún problema, el código es correcto", en: "No problem, the code is correct" } },
      { id: "b", text: { es: "`title` es `string | null` porque `textContent()` puede retornar null si el elemento no existe. `toBe('Dashboard')` espera `string`, no `string | null`", en: "`title` is `string | null` because `textContent()` can return null if the element doesn't exist. `toBe('Dashboard')` expects `string`, not `string | null`" } },
      { id: "c", text: { es: "Falta tipar el retorno de `getDashboardTitle`", en: "Missing return type on `getDashboardTitle`" } },
      { id: "d", text: { es: "`page` no es del tipo correcto", en: "`page` is not the correct type" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`textContent()` retorna `Promise<string | null>`. Cuando usas `await`, obtienes `string | null`. La aserción `expect(title).toBe('Dashboard')` espera un string, no `string | null`. TypeScript te advertirá con un error como 'Argument of type string | null is not assignable to parameter of type string'. La solución es verificar que title no sea null antes de la aserción.",
      en: "`textContent()` returns `Promise<string | null>`. When you use `await`, you get `string | null`. The assertion `expect(title).toBe('Dashboard')` expects a string, not `string | null`. TypeScript will warn with an error like 'Argument of type string | null is not assignable to parameter of type string'. The solution is to verify title is not null before the assertion.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
  {
    id: "m1-h5",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M1],
    question: {
      es: "¿Qué valor debe reemplazar `_____` para que el código compile sin errores usando el patrón 'exhaustive check'?",
      en: "What value should replace `_____` for the code to compile without errors using the 'exhaustive check' pattern?",
    },
    codeSnippet: `type TestOutcome = 'passed' | 'failed' | 'skipped';

function report(outcome: TestOutcome): string {
  switch (outcome) {
    case 'passed':
      return '✅';
    case 'failed':
      return '❌';
    case 'skipped':
      return '⏭️';
    default:
      const _: _____ = outcome;
      return '❓';
  }
}`,
    options: [
      { id: "a", text: { es: "string", en: "string" } },
      { id: "b", text: { es: "never", en: "never" } },
      { id: "c", text: { es: "void", en: "void" } },
      { id: "d", text: { es: "any", en: "any" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El tipo `never` representa un valor que nunca debería ocurrir. En el exhaustive check, asignas `outcome` a una variable de tipo `never`. Si todos los casos del union type están cubiertos, TypeScript infiere que `outcome` en el default es `never` (no quedan valores posibles). Si falta algún caso, `outcome` tendría un tipo concreto y la asignación a `never` fallaría en compilación.",
      en: "The `never` type represents a value that should never occur. In the exhaustive check, you assign `outcome` to a variable of type `never`. If all union type cases are covered, TypeScript infers that `outcome` in the default is `never` (no possible values remain). If a case is missing, `outcome` would have a concrete type and the assignment to `never` would fail at compile time.",
    },
    points: 3,
    timeEstimateSeconds: 60,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
