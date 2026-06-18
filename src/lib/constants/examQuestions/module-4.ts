/**
 * Exam question bank — Module 4: Actions and Assertions.
 *
 * 25 questions (10 easy, 10 medium, 5 hard) covering:
 *   - Click, Fill, Type, Press (and the semantic differences between them)
 *   - expect() and assertion types (web vs generic assertions)
 *   - Soft assertions with expect.soft()
 *   - Auto-waiting and actionability checks
 *   - Practical exercise: automating a login flow
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M4 = "m4-actions-assertions";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (10 questions)                                                */
  /* ================================================================== */

  {
    id: "m4-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Qué hace el método `.fill()` de Playwright al establecer el valor de un campo de formulario?",
      en: "What does Playwright's `.fill()` method do when setting a form field's value?",
    },
    options: [
      { id: "a", text: { es: "Limpia el campo y escribe el valor de una vez, de forma instantánea", en: "Clears the field and writes the value at once, instantly" } },
      { id: "b", text: { es: "Escribe carácter por carácter disparando eventos de teclado individuales", en: "Writes character by character firing individual keyboard events" } },
      { id: "c", text: { es: "Simula la pulsación de una sola tecla", en: "Simulates pressing a single key" } },
      { id: "d", text: { es: "Solo funciona en campos de tipo checkbox", en: "Only works on checkbox-type fields" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`.fill()` es el método estándar para establecer valores en campos de formulario: limpia el campo y escribe el valor completo de una vez, sin disparar eventos de teclado individuales. Esto lo hace rápido y fiable para el 95% de los casos. Quien dispara eventos carácter por carácter es `.type()`, no `.fill()`.",
      en: "`.fill()` is the standard method for setting form field values: it clears the field and writes the entire value at once, without firing individual keyboard events. This makes it fast and reliable for 95% of cases. The method that fires events character by character is `.type()`, not `.fill()`.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m4-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "El método `.type()` es útil para probar funcionalidades que reaccionan a cada pulsación de tecla, como dropdowns de autocompletado.",
      en: "The `.type()` method is useful for testing features that react to each keystroke, like autocomplete dropdowns.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. `.type()` escribe carácter por carácter con un delay configurable, disparando eventos de teclado individuales. Esto es necesario para validar funcionalidades como autocompletado o contadores de caracteres en tiempo real, que reaccionan a cada tecla pulsada en lugar de a un valor final asignado de golpe.",
      en: "Correct. `.type()` writes character by character with a configurable delay, firing individual keyboard events. This is needed to validate features like autocomplete or real-time character counters, which react to each keystroke rather than to a final value assigned all at once.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m4-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Qué método de Playwright usarías para enviar una sola tecla, como `Enter` o `Escape`?",
      en: "Which Playwright method would you use to send a single key, like `Enter` or `Escape`?",
    },
    options: [
      { id: "a", text: { es: ".fill()", en: ".fill()" } },
      { id: "b", text: { es: ".type()", en: ".type()" } },
      { id: "c", text: { es: ".press()", en: ".press()" } },
      { id: "d", text: { es: ".click()", en: ".click()" } },
    ],
    correctOptionIds: ["c"],
    explanation: {
      es: "`.press()` está diseñado para pulsaciones de teclas individuales o combinaciones, como `Enter`, `Escape`, `Tab` o `Control+A`. Ni `.fill()` (valores de texto completos) ni `.type()` (secuencias de caracteres) están pensados para esto, y `.click()` es para interacciones de ratón.",
      en: "`.press()` is designed for individual key presses or combinations, like `Enter`, `Escape`, `Tab`, or `Control+A`. Neither `.fill()` (full text values) nor `.type()` (character sequences) are meant for this, and `.click()` is for mouse interactions.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m4-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Qué aserción de Playwright usarías para verificar que un elemento es visible en la página?",
      en: "Which Playwright assertion would you use to verify an element is visible on the page?",
    },
    options: [
      { id: "a", text: { es: "toHaveValue()", en: "toHaveValue()" } },
      { id: "b", text: { es: "toBeVisible()", en: "toBeVisible()" } },
      { id: "c", text: { es: "toHaveAttribute()", en: "toHaveAttribute()" } },
      { id: "d", text: { es: "toHaveCount()", en: "toHaveCount()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`toBeVisible()` es la aserción más usada en Playwright: verifica que un elemento es visible en la página, con auto-wait incluido. `toHaveValue()` se usa para inputs, `toHaveAttribute()` para atributos HTML, y `toHaveCount()` para verificar cuántos elementos coinciden con un locator.",
      en: "`toBeVisible()` is the most-used assertion in Playwright: it verifies that an element is visible on the page, with built-in auto-wait. `toHaveValue()` is for inputs, `toHaveAttribute()` is for HTML attributes, and `toHaveCount()` checks how many elements match a locator.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m4-e5",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "Las aserciones \"web\" de Playwright, como `toBeVisible()` o `toHaveText()`, hacen auto-wait reintentando hasta que la condición se cumple o expira el timeout.",
      en: "Playwright's \"web\" assertions, like `toBeVisible()` or `toHaveText()`, auto-wait by retrying until the condition is met or the timeout expires.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Las web assertions reintentan automáticamente hasta que la condición se cumple o el timeout expira (5 segundos por defecto). Esto las distingue de las generic assertions (`toBe`, `toEqual`), que son inmediatas y evalúan el valor actual sin esperar.",
      en: "Correct. Web assertions automatically retry until the condition is met or the timeout expires (5 seconds by default). This distinguishes them from generic assertions (`toBe`, `toEqual`), which are immediate and evaluate the current value without waiting.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m4-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Qué aserción usarías para verificar que un input de texto tiene exactamente el valor `'janedoe'`?",
      en: "Which assertion would you use to verify a text input has exactly the value `'janedoe'`?",
    },
    options: [
      { id: "a", text: { es: "toHaveText('janedoe')", en: "toHaveText('janedoe')" } },
      { id: "b", text: { es: "toHaveValue('janedoe')", en: "toHaveValue('janedoe')" } },
      { id: "c", text: { es: "toContainText('janedoe')", en: "toContainText('janedoe')" } },
      { id: "d", text: { es: "toBeChecked()", en: "toBeChecked()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`toHaveValue()` verifica el valor de un input (lo que el usuario escribió o seleccionó). `toHaveText()` y `toContainText()` se usan para el texto de un elemento (como un `<span>` o `<div>`), no para el `value` de un campo de formulario. `toBeChecked()` es para checkboxes y radios.",
      en: "`toHaveValue()` verifies an input's value (what the user typed or selected). `toHaveText()` and `toContainText()` are used for an element's text content (like a `<span>` or `<div>`), not for a form field's `value`. `toBeChecked()` is for checkboxes and radios.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m4-e7",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Qué hace `expect.soft()` que una aserción normal (`expect()`) no hace?",
      en: "What does `expect.soft()` do that a normal assertion (`expect()`) does not?",
    },
    options: [
      { id: "a", text: { es: "Detiene el test inmediatamente al primer fallo", en: "Stops the test immediately on the first failure" } },
      { id: "b", text: { es: "Permite que el test siga ejecutándose tras un fallo y reporta todos los errores al final", en: "Allows the test to keep running after a failure and reports all errors at the end" } },
      { id: "c", text: { es: "Ejecuta la aserción dos veces para confirmar el resultado", en: "Runs the assertion twice to confirm the result" } },
      { id: "d", text: { es: "Ignora por completo cualquier fallo, sin reportarlo nunca", en: "Completely ignores any failure, never reporting it" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`expect.soft()` permite que el test continúe ejecutándose después de un fallo, marcando el test como fallido solo al final, después de haber evaluado todas las aserciones. Esto es ideal para verificar múltiples campos independientes en una sola pasada. Una aserción normal (`hard`) detiene el test de inmediato.",
      en: "`expect.soft()` lets the test keep running after a failure, marking the test as failed only at the end, after all assertions have been evaluated. This is ideal for verifying multiple independent fields in a single pass. A normal (`hard`) assertion stops the test immediately.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m4-e8",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "Antes de ejecutar una acción como `.click()`, Playwright verifica automáticamente que el elemento esté visible, estable, reciba eventos y esté habilitado.",
      en: "Before performing an action like `.click()`, Playwright automatically checks that the element is visible, stable, receives events, and is enabled.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Estos son los checks de 'actionability': el elemento debe estar attached al DOM, visible, estable (sin animarse), recibir eventos (no cubierto por otro elemento) y habilitado. Playwright los verifica automáticamente antes de cada acción, sin que el desarrollador escriba código adicional.",
      en: "Correct. These are the 'actionability' checks: the element must be attached to the DOM, visible, stable (not animating), receive events (not covered by another element), and enabled. Playwright verifies these automatically before every action, with no extra code from the developer.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m4-e9",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "¿Por qué se considera `page.waitForTimeout(5000)` un anti-patrón en Playwright?",
      en: "Why is `page.waitForTimeout(5000)` considered an anti-pattern in Playwright?",
    },
    options: [
      { id: "a", text: { es: "Porque ese método no existe en la API de Playwright", en: "Because that method doesn't exist in Playwright's API" } },
      { id: "b", text: { es: "Porque espera un tiempo fijo sin verificar ninguna condición real de la aplicación", en: "Because it waits a fixed amount of time without checking any real application condition" } },
      { id: "c", text: { es: "Porque solo puede usarse una vez por archivo de test", en: "Because it can only be used once per test file" } },
      { id: "d", text: { es: "Porque requiere que el modo headless esté desactivado", en: "Because it requires headless mode to be disabled" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`page.waitForTimeout()` espera una cantidad fija de tiempo sin importar si la condición real ya se cumplió o tardará más. Si el elemento aparece antes, pierdes tiempo; si tarda más, el test falla. Por eso siempre se prefieren aserciones con timeout explícito, que esperan el tiempo mínimo necesario para la condición real.",
      en: "`page.waitForTimeout()` waits a fixed amount of time regardless of whether the real condition has already been met or takes longer. If the element appears sooner, you waste time; if it takes longer, the test fails. That's why assertions with explicit timeouts are always preferred — they wait the minimum time needed for the real condition.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m4-e10",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M4],
    question: {
      es: "El método `.check()` de Playwright para checkboxes es idempotente: es seguro llamarlo en un checkbox que ya está marcado.",
      en: "Playwright's `.check()` method for checkboxes is idempotent: it's safe to call it on a checkbox that's already checked.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. `.check()` es idempotente: si el checkbox ya está marcado, no hace nada (no lo desmarca por error); si no lo está, lo marca. Lo mismo aplica a `.uncheck()` en sentido inverso. Esto evita errores comunes donde un doble click accidental invertiría el estado.",
      en: "Correct. `.check()` is idempotent: if the checkbox is already checked, it does nothing (it won't mistakenly uncheck it); if it isn't, it checks it. The same applies to `.uncheck()` in reverse. This avoids common bugs where an accidental double action would flip the state.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },

  /* ================================================================== */
  /*  MEDIUM (10 questions)                                              */
  /* ================================================================== */

  {
    id: "m4-m1",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Cuáles de las siguientes son aserciones \"web\" de Playwright que hacen auto-wait? (Selecciona todas las correctas)",
      en: "Which of the following are Playwright \"web\" assertions that auto-wait? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "toBeVisible()", en: "toBeVisible()" } },
      { id: "b", text: { es: "toHaveText()", en: "toHaveText()" } },
      { id: "c", text: { es: "toEqual()", en: "toEqual()" } },
      { id: "d", text: { es: "toHaveAttribute()", en: "toHaveAttribute()" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "`toBeVisible()`, `toHaveText()` y `toHaveAttribute()` son web assertions: operan sobre un Locator y reintentan hasta que la condición se cumple o expira el timeout. `toEqual()` es una generic assertion: compara un valor inmediatamente, sin reintentar, por lo que no es apropiada para verificar estado de la UI que puede tardar en actualizarse.",
      en: "`toBeVisible()`, `toHaveText()`, and `toHaveAttribute()` are web assertions: they operate on a Locator and retry until the condition is met or the timeout expires. `toEqual()` is a generic assertion: it compares a value immediately, without retrying, so it isn't appropriate for verifying UI state that may take time to update.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m4-m2",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Qué problema tiene este test si el botón \"Sign In\" tarda en habilitarse tras escribir las credenciales?",
      en: "What problem does this test have if the \"Sign In\" button takes time to become enabled after typing the credentials?",
    },
    codeSnippet: `await page.getByLabel('Email').fill('student@playq.test');
await page.getByLabel('Password').fill('Playwright123!');

const button = page.getByRole('button', { name: 'Sign In' });
await expect(button).toEqual(true);
await button.click();`,
    options: [
      { id: "a", text: { es: "Ninguno: toEqual(true) espera correctamente a que el botón esté habilitado", en: "None: toEqual(true) correctly waits for the button to be enabled" } },
      { id: "b", text: { es: "`toEqual(true)` es una generic assertion inmediata; no espera a que el botón se habilite, por lo que el click puede fallar o ejecutarse sobre un botón deshabilitado", en: "`toEqual(true)` is an immediate generic assertion; it doesn't wait for the button to become enabled, so the click may fail or run on a disabled button" } },
      { id: "c", text: { es: "El problema es que falta `await` antes de `fill()`", en: "The problem is that `await` is missing before `fill()`" } },
      { id: "d", text: { es: "`getByRole` no puede usarse para buscar botones", en: "`getByRole` cannot be used to find buttons" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`toEqual()` es una generic assertion: evalúa el valor actual inmediatamente, sin reintentar. Comparar un Locator con `true` ni siquiera tiene sentido semántico para verificar habilitación. La forma correcta es usar la web assertion `toBeEnabled()`, que auto-espera hasta que el botón esté realmente habilitado antes de que el test continúe al click.",
      en: "`toEqual()` is a generic assertion: it evaluates the current value immediately, without retrying. Comparing a Locator to `true` doesn't even make semantic sense for verifying enablement. The correct approach is the web assertion `toBeEnabled()`, which auto-waits until the button is actually enabled before the test proceeds to the click.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m4-m3",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "Si haces `await expect(locator).not.toBeVisible()` y el elemento ni siquiera existe en el DOM, ¿qué ocurre?",
      en: "If you do `await expect(locator).not.toBeVisible()` and the element doesn't even exist in the DOM, what happens?",
    },
    options: [
      { id: "a", text: { es: "La aserción falla porque el elemento no existe", en: "The assertion fails because the element doesn't exist" } },
      { id: "b", text: { es: "La aserción pasa inmediatamente, sin esperar el timeout completo", en: "The assertion passes immediately, without waiting out the full timeout" } },
      { id: "c", text: { es: "Playwright lanza una excepción de tipo `ElementNotFoundError`", en: "Playwright throws an `ElementNotFoundError` exception" } },
      { id: "d", text: { es: "La aserción espera siempre el timeout completo antes de pasar", en: "The assertion always waits out the full timeout before passing" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Las aserciones de Playwright son 'inteligentes' con `.not`. Si el elemento no existe en el DOM, `not.toBeVisible()` pasa de inmediato, porque algo que no existe definitivamente no es visible. No necesita esperar el timeout completo para confirmar un estado que ya es seguro.",
      en: "Playwright assertions are 'smart' with `.not`. If the element doesn't exist in the DOM, `not.toBeVisible()` passes immediately, because something that doesn't exist is definitely not visible. It doesn't need to wait out the full timeout to confirm an already-certain state.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m4-m4",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Qué sucede cuando se ejecuta este test si el campo 'Email' del resumen muestra un valor incorrecto pero el resto de campos son correctos?",
      en: "What happens when this test runs if the summary's 'Email' field shows an incorrect value but the rest of the fields are correct?",
    },
    codeSnippet: `await expect.soft(page.getByText('Jane Doe')).toBeVisible();
await expect.soft(page.getByText('jane@test.com')).toBeVisible();
await expect.soft(page.getByText('janedoe')).toBeVisible();
await expect.soft(page.getByRole('button', { name: 'Sign Up' }))
  .toBeEnabled();`,
    options: [
      { id: "a", text: { es: "El test se detiene en la segunda línea y las siguientes dos aserciones nunca se ejecutan", en: "The test stops at the second line and the next two assertions never run" } },
      { id: "b", text: { es: "Las cuatro aserciones se ejecutan; el test se marca como fallido al final, reportando el fallo del email junto con el resultado de las demás", en: "All four assertions run; the test is marked as failed at the end, reporting the email failure along with the results of the others" } },
      { id: "c", text: { es: "El test pasa porque expect.soft() ignora los fallos por completo", en: "The test passes because expect.soft() ignores failures entirely" } },
      { id: "d", text: { es: "Solo la primera aserción se ejecuta; las demás se saltan automáticamente", en: "Only the first assertion runs; the rest are skipped automatically" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`expect.soft()` no detiene la ejecución del test al fallar. Las cuatro aserciones se evalúan en orden, independientemente de si alguna falla. Al final del test, si alguna soft assertion falló, el test completo se marca como fallido y el reporte muestra TODOS los fallos detectados, no solo el primero.",
      en: "`expect.soft()` doesn't stop test execution on failure. All four assertions are evaluated in order, regardless of whether one fails. At the end of the test, if any soft assertion failed, the entire test is marked as failed and the report shows ALL detected failures, not just the first one.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m4-m5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Cuál de los siguientes NO es uno de los 5 checks de \"actionability\" que Playwright verifica antes de una acción como `.click()`?",
      en: "Which of the following is NOT one of the 5 \"actionability\" checks Playwright verifies before an action like `.click()`?",
    },
    options: [
      { id: "a", text: { es: "El elemento está attached al DOM", en: "The element is attached to the DOM" } },
      { id: "b", text: { es: "El elemento es visible", en: "The element is visible" } },
      { id: "c", text: { es: "El elemento tiene un atributo `data-testid` definido", en: "The element has a `data-testid` attribute defined" } },
      { id: "d", text: { es: "El elemento está habilitado", en: "The element is enabled" } },
    ],
    correctOptionIds: ["c"],
    explanation: {
      es: "Los 5 checks de actionability son: attached al DOM, visible, estable (sin animarse), recibe eventos (no cubierto por otro elemento) y habilitado. Tener un atributo `data-testid` no forma parte de estos checks — es solo una convención para localizar elementos, no una condición de actionability.",
      en: "The 5 actionability checks are: attached to the DOM, visible, stable (not animating), receives events (not covered by another element), and enabled. Having a `data-testid` attribute is not part of these checks — it's just a convention for locating elements, not an actionability condition.",
    },
    points: 2,
    timeEstimateSeconds: 40,
  },
  {
    id: "m4-m6",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "Este test reemplaza un wait fijo por una aserción. ¿Por qué es preferible la segunda versión?",
      en: "This test replaces a fixed wait with an assertion. Why is the second version preferable?",
    },
    codeSnippet: `// Versión A
await page.getByRole('button').click();
await page.waitForTimeout(5000);
await expect(page.getByText('Done')).toBeVisible();

// Versión B
await page.getByRole('button').click();
await expect(page.getByText('Done'))
  .toBeVisible({ timeout: 5000 });`,
    options: [
      { id: "a", text: { es: "Ambas versiones son funcionalmente idénticas en tiempo de ejecución", en: "Both versions are functionally identical at runtime" } },
      { id: "b", text: { es: "La versión B espera el tiempo mínimo necesario hasta que 'Done' aparezca, en lugar de esperar siempre 5 segundos completos", en: "Version B waits only the minimum time needed until 'Done' appears, instead of always waiting the full 5 seconds" } },
      { id: "c", text: { es: "La versión A es más rápida porque no usa expect()", en: "Version A is faster because it doesn't use expect()" } },
      { id: "d", text: { es: "La versión B falla si 'Done' tarda más de 1 segundo en aparecer", en: "Version B fails if 'Done' takes more than 1 second to appear" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "En la versión A, `waitForTimeout(5000)` siempre espera 5 segundos completos sin importar cuándo aparezca 'Done', y luego la aserción se evalúa sobre el estado actual. En la versión B, `toBeVisible({ timeout: 5000 })` reintenta hasta que 'Done' sea visible, deteniéndose en cuanto la condición se cumple — si aparece en 1 segundo, el test continúa en 1 segundo, no en 5.",
      en: "In version A, `waitForTimeout(5000)` always waits the full 5 seconds no matter when 'Done' appears, and the assertion is then evaluated against the current state. In version B, `toBeVisible({ timeout: 5000 })` retries until 'Done' is visible, stopping as soon as the condition is met — if it appears in 1 second, the test proceeds after 1 second, not 5.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m4-m7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Cuál es la diferencia de propósito entre `page.waitForURL('**/dashboard')` y `expect(page).toHaveURL(/dashboard/)`?",
      en: "What is the difference in purpose between `page.waitForURL('**/dashboard')` and `expect(page).toHaveURL(/dashboard/)`?",
    },
    options: [
      { id: "a", text: { es: "Son exactamente lo mismo, solo cambia la sintaxis", en: "They're exactly the same, only the syntax differs" } },
      { id: "b", text: { es: "`waitForURL` espera a que ocurra la navegación; `toHaveURL` es una aserción que verifica (y auto-espera) que la URL actual coincide", en: "`waitForURL` waits for navigation to happen; `toHaveURL` is an assertion that verifies (and auto-waits) the current URL matches" } },
      { id: "c", text: { es: "`toHaveURL` no acepta expresiones regulares", en: "`toHaveURL` doesn't accept regular expressions" } },
      { id: "d", text: { es: "`waitForURL` es una generic assertion y `toHaveURL` es una web assertion", en: "`waitForURL` is a generic assertion and `toHaveURL` is a web assertion" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`page.waitForURL()` es un método de espera de navegación: pausa la ejecución hasta que la URL cambie según el patrón dado. `expect(page).toHaveURL()` es una aserción que verifica que la URL actual cumple una condición, con auto-wait — útil tanto para esperar como para validar el resultado esperado del test.",
      en: "`page.waitForURL()` is a navigation-waiting method: it pauses execution until the URL changes to match the given pattern. `expect(page).toHaveURL()` is an assertion that verifies the current URL meets a condition, with auto-wait — useful both for waiting and for validating the test's expected outcome.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m4-m8",
    type: "true_false",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "Si un test depende totalmente de que el login sea exitoso para que el resto de pasos tengan sentido, lo más apropiado es usar `expect.soft()` para verificar el login.",
      en: "If a test entirely depends on a successful login for the rest of the steps to make sense, the most appropriate choice is to use `expect.soft()` to verify the login.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. Cuando un fallo hace que el resto del test no tenga sentido (como un login fallido antes de probar el dashboard), se debe usar una aserción normal (hard), que detiene el test inmediatamente. `expect.soft()` es apropiado para verificaciones independientes entre sí, no para condiciones bloqueantes.",
      en: "False. When a failure makes the rest of the test meaningless (like a failed login before testing the dashboard), a normal (hard) assertion should be used, which stops the test immediately. `expect.soft()` is appropriate for checks that are independent of each other, not for blocking conditions.",
    },
    points: 2,
    timeEstimateSeconds: 35,
  },
  {
    id: "m4-m9",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Para qué se usa `expect.poll()` en Playwright?",
      en: "What is `expect.poll()` used for in Playwright?",
    },
    options: [
      { id: "a", text: { es: "Para reemplazar todas las web assertions del proyecto", en: "To replace all web assertions in the project" } },
      { id: "b", text: { es: "Para reintentar una función o valor genérico (no necesariamente del DOM) hasta que cumpla una condición o expire el timeout", en: "To retry a generic function or value (not necessarily from the DOM) until it meets a condition or the timeout expires" } },
      { id: "c", text: { es: "Para detener el test si una soft assertion falla", en: "To stop the test if a soft assertion fails" } },
      { id: "d", text: { es: "Para ejecutar tests en paralelo", en: "To run tests in parallel" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`expect.poll()` es un puente entre las generic assertions y el auto-waiting: permite reintentar una función arbitraria (como una llamada a una API o leer el texto de un contador) hasta que su resultado cumpla la condición esperada o expire el timeout. Es útil para estado que no es directamente un elemento del DOM.",
      en: "`expect.poll()` is a bridge between generic assertions and auto-waiting: it lets you retry an arbitrary function (like an API call or reading a counter's text) until its result meets the expected condition or the timeout expires. It's useful for state that isn't directly a DOM element.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m4-m10",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M4],
    question: {
      es: "¿Qué verifica correctamente esta secuencia de código sobre el checkbox 'Remember me'?",
      en: "What does this code sequence correctly verify about the 'Remember me' checkbox?",
    },
    codeSnippet: `const checkbox = page.getByRole('checkbox', { name: 'Remember me' });

await checkbox.check();
await expect(checkbox).toBeChecked();

await checkbox.uncheck();
await expect(checkbox).not.toBeChecked();`,
    options: [
      { id: "a", text: { es: "Que el checkbox no puede desmarcarse una vez marcado", en: "That the checkbox cannot be unchecked once checked" } },
      { id: "b", text: { es: "Que el checkbox puede marcarse y desmarcarse correctamente, verificando ambos estados con toBeChecked() y su negación", en: "That the checkbox can be correctly checked and unchecked, verifying both states with toBeChecked() and its negation" } },
      { id: "c", text: { es: "Que el checkbox está deshabilitado", en: "That the checkbox is disabled" } },
      { id: "d", text: { es: "Que el checkbox tiene el atributo value='remember'", en: "That the checkbox has the attribute value='remember'" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El código marca el checkbox con `.check()` y verifica con `toBeChecked()` que quedó marcado; luego lo desmarca con `.uncheck()` y verifica con `not.toBeChecked()` que quedó desmarcado. Es el patrón estándar para probar el toggle de un elemento interactivo, cubriendo ambos estados posibles.",
      en: "The code checks the checkbox with `.check()` and verifies with `toBeChecked()` that it ended up checked; then it unchecks it with `.uncheck()` and verifies with `not.toBeChecked()` that it ended up unchecked. This is the standard pattern for testing the toggle of an interactive element, covering both possible states.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },

  /* ================================================================== */
  /*  HARD (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m4-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M4],
    question: {
      es: "En este test, el campo 'Name' del resumen muestra un valor incorrecto y el campo 'Email' es correcto. ¿Qué ocurre exactamente con la ejecución y el resultado del test?",
      en: "In this test, the summary's 'Name' field shows an incorrect value and the 'Email' field is correct. What exactly happens with the test's execution and result?",
    },
    codeSnippet: `await expect(page.getByText('Welcome back')).not.toBeVisible();

await expect.soft(page.getByText('Jane Doe')).toBeVisible();
await expect.soft(page.getByText('jane@test.com')).toBeVisible();
await expect.soft(page.getByText('janedoe')).toBeVisible();
await expect.soft(page.getByRole('button', { name: 'Sign Up' }))
  .toBeEnabled();

console.log('reached the end');`,
    options: [
      { id: "a", text: { es: "El test se detiene en la primera soft assertion fallida y 'reached the end' nunca se imprime", en: "The test stops at the first failing soft assertion and 'reached the end' is never printed" } },
      { id: "b", text: { es: "Las 4 soft assertions se evalúan todas, 'reached the end' se imprime, y el test se marca como fallido al terminar por el fallo de 'Jane Doe'", en: "All 4 soft assertions are evaluated, 'reached the end' is printed, and the test is marked failed at the end due to the 'Jane Doe' failure" } },
      { id: "c", text: { es: "El test pasa porque las otras 3 soft assertions son correctas, compensando el fallo", en: "The test passes because the other 3 soft assertions are correct, offsetting the failure" } },
      { id: "d", text: { es: "La primera línea (hard assertion) hace que el test se detenga antes de llegar a las soft assertions", en: "The first line (hard assertion) causes the test to stop before reaching the soft assertions" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "La primera línea es una hard assertion, pero no falla (asumimos que pasa, ya que verifica que 'Welcome back' no está visible en la página de resumen). Las soft assertions no detienen el test: las 4 se evalúan en orden, el código sigue ejecutándose normalmente (incluyendo el `console.log`), y solo al final del test Playwright revisa si alguna soft assertion falló — en este caso 'Jane Doe' — y marca el test completo como fallido, reportando ese error específico.",
      en: "The first line is a hard assertion, but it doesn't fail (we assume it passes, since it checks that 'Welcome back' is not visible on the summary page). Soft assertions don't stop the test: all 4 are evaluated in order, the code keeps running normally (including the `console.log`), and only at the end of the test does Playwright check whether any soft assertion failed — in this case 'Jane Doe' — and marks the entire test as failed, reporting that specific error.",
    },
    points: 3,
    timeEstimateSeconds: 75,
  },
  {
    id: "m4-h2",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M4],
    question: {
      es: "El elemento con el texto \"I'll disappear soon\" se muestra durante 2 segundos tras hacer click y luego se oculta. ¿Qué pasa con este test?",
      en: "The element with the text \"I'll disappear soon\" is shown for 2 seconds after the click and then hides. What happens with this test?",
    },
    codeSnippet: `await page.getByRole('button', { name: 'Show for 2 seconds' }).click();

await expect(page.getByText("I'll disappear soon"))
  .not.toBeVisible({ timeout: 5000 });`,
    options: [
      { id: "a", text: { es: "El test falla porque el elemento SÍ está visible justo después del click", en: "The test fails because the element IS visible right after the click" } },
      { id: "b", text: { es: "La aserción auto-espera hasta 5s a que el elemento deje de ser visible; como desaparece a los 2s, el test pasa", en: "The assertion auto-waits up to 5s for the element to stop being visible; since it disappears at 2s, the test passes" } },
      { id: "c", text: { es: "El test falla porque `not.toBeVisible()` no puede usarse con timeout", en: "The test fails because `not.toBeVisible()` cannot be used with a timeout" } },
      { id: "d", text: { es: "El test se queda colgado esperando los 5 segundos completos incluso después de que el elemento desaparece", en: "The test hangs waiting the full 5 seconds even after the element disappears" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Inmediatamente tras el click, el elemento SÍ es visible, por lo que la aserción fallaría si fuera inmediata — pero `toBeVisible()`/`not.toBeVisible()` son web assertions que auto-esperan. Playwright reintenta la condición hasta que se cumple o expira el timeout. Como el elemento desaparece a los 2 segundos (dentro del timeout de 5s), la aserción detecta el cambio de estado y el test pasa, sin esperar los 5 segundos completos.",
      en: "Immediately after the click, the element IS visible, so the assertion would fail if it were immediate — but `toBeVisible()`/`not.toBeVisible()` are web assertions that auto-wait. Playwright retries the condition until it's met or the timeout expires. Since the element disappears after 2 seconds (within the 5s timeout), the assertion detects the state change and the test passes, without waiting out the full 5 seconds.",
    },
    points: 3,
    timeEstimateSeconds: 75,
  },
  {
    id: "m4-h3",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M4],
    question: {
      es: "Dado este test que mezcla hard y soft assertions, ¿cuáles de las siguientes afirmaciones son correctas si la segunda soft assertion falla pero todo lo demás pasa?",
      en: "Given this test that mixes hard and soft assertions, which of the following statements are correct if the second soft assertion fails but everything else passes?",
    },
    codeSnippet: `test('checkout summary', async ({ page }) => {
  await page.goto('/playground/cart');

  // Hard: must be true for the rest of the test to make sense
  await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();

  // Soft: independent field checks
  await expect.soft(page.getByText('Product A')).toBeVisible();
  await expect.soft(page.getByText('$49.99')).toBeVisible(); // fails
  await expect.soft(page.getByText('Free shipping')).toBeVisible();

  // Hard: critical final action
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page).toHaveURL(/checkout/);
});`,
    options: [
      { id: "a", text: { es: "El click en 'Checkout' y la navegación posterior sí se ejecutan, porque las soft assertions no detienen el test", en: "The 'Checkout' click and subsequent navigation do execute, because soft assertions don't stop the test" } },
      { id: "b", text: { es: "El test termina marcado como fallido, aunque el resto de pasos se hayan ejecutado y pasado", en: "The test ends up marked as failed, even though the rest of the steps ran and passed" } },
      { id: "c", text: { es: "El hard assertion del heading 'Your Cart' detendría el test inmediatamente si fallara, a diferencia de la soft assertion del precio", en: "The hard assertion for the 'Your Cart' heading would stop the test immediately if it failed, unlike the soft assertion for the price" } },
      { id: "d", text: { es: "El fallo de la soft assertion del precio hace que el click en 'Checkout' se omita automáticamente", en: "The price soft assertion failure causes the 'Checkout' click to be skipped automatically" } },
    ],
    correctOptionIds: ["a", "b", "c"],
    explanation: {
      es: "Las soft assertions no detienen el test, así que el flujo continúa hasta el final, incluyendo el click en 'Checkout' y la verificación de navegación (a). Sin embargo, como una soft assertion falló ('$49.99'), Playwright marca el test completo como fallido al finalizar, aunque todo lo demás haya pasado (b). La hard assertion del heading sí detendría el test de inmediato si fallara, comportamiento que contrasta con las soft (c). La opción (d) es falsa: las soft assertions nunca causan que se omitan pasos posteriores; el código sigue ejecutándose línea por línea normalmente.",
      en: "Soft assertions don't stop the test, so execution continues to the end, including the 'Checkout' click and the navigation check (a). However, since one soft assertion failed ('$49.99'), Playwright marks the entire test as failed at the end, even though everything else passed (b). The heading's hard assertion would indeed stop the test immediately if it failed, which contrasts with the soft ones (c). Option (d) is false: soft assertions never cause later steps to be skipped; the code keeps executing line by line normally.",
    },
    points: 3,
    timeEstimateSeconds: 90,
  },
  {
    id: "m4-h4",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M4],
    question: {
      es: "Un elemento con el texto 'Content loaded successfully!' aparece 3 segundos después del click, pero el timeout por defecto de las aserciones es 5 segundos. ¿Qué línea de código falta para que esta verificación sea robusta SIN usar `page.waitForTimeout()`?",
      en: "An element with the text 'Content loaded successfully!' appears 3 seconds after the click, but the default assertion timeout is 5 seconds. What line of code completes this check robustly WITHOUT using `page.waitForTimeout()`?",
    },
    codeSnippet: `await page.getByRole('button', { name: 'Load Content' }).click();

_____`,
    options: [
      { id: "a", text: { es: "await page.waitForTimeout(3000);", en: "await page.waitForTimeout(3000);" } },
      { id: "b", text: { es: "await expect(page.getByText('Content loaded successfully!')).toBeVisible();", en: "await expect(page.getByText('Content loaded successfully!')).toBeVisible();" } },
      { id: "c", text: { es: "console.log(page.getByText('Content loaded successfully!'));", en: "console.log(page.getByText('Content loaded successfully!'));" } },
      { id: "d", text: { es: "page.getByText('Content loaded successfully!');", en: "page.getByText('Content loaded successfully!');" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`toBeVisible()` es una web assertion con un timeout por defecto de 5 segundos, suficiente para esperar los 3 segundos que tarda el contenido en cargar. No es necesario especificar `{ timeout: ... }` salvo que se necesite un valor distinto al default. Las opciones (c) y (d) no hacen ninguna espera ni verificación real, y (a) reintroduce el anti-patrón de wait fijo que el módulo explícitamente desaconseja.",
      en: "`toBeVisible()` is a web assertion with a default timeout of 5 seconds, which is enough to wait out the 3 seconds the content takes to load. There's no need to specify `{ timeout: ... }` unless a different value than the default is needed. Options (c) and (d) perform no real wait or check, and (a) reintroduces the fixed-wait anti-pattern the module explicitly discourages.",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
  {
    id: "m4-h5",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M4],
    question: {
      es: "Este test usa `.type()` para escribir en un campo de autocompletado que muestra sugerencias mientras se escribe. Si se reemplazara `.type()` por `.fill()` en esta línea, ¿qué riesgo se introduciría?",
      en: "This test uses `.type()` to write into an autocomplete field that shows suggestions as you type. If `.type()` were replaced with `.fill()` on this line, what risk would be introduced?",
    },
    codeSnippet: `await page.getByLabel('City').type('Mad', { delay: 50 });
await expect(page.getByRole('option', { name: 'Madrid' })).toBeVisible();
await page.getByRole('option', { name: 'Madrid' }).click();`,
    options: [
      { id: "a", text: { es: "Ningún riesgo: .fill() también dispara eventos de teclado por cada carácter, así que el dropdown se comportaría igual", en: "No risk: .fill() also fires keyboard events per character, so the dropdown would behave the same" } },
      { id: "b", text: { es: "El dropdown de autocompletado podría no activarse, porque .fill() asigna el valor de una vez sin disparar los eventos de teclado individuales que el dropdown escucha", en: "The autocomplete dropdown might not trigger, because .fill() assigns the value all at once without firing the individual keyboard events the dropdown listens for" } },
      { id: "c", text: { es: ".fill() es más lento que .type(), por lo que el test tardaría más en ejecutarse", en: ".fill() is slower than .type(), so the test would take longer to run" } },
      { id: "d", text: { es: ".fill() no acepta texto parcial como 'Mad', solo valores completos", en: ".fill() doesn't accept partial text like 'Mad', only complete values" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`.fill()` establece el valor del campo de una sola vez, sin disparar los eventos de teclado (`keydown`, `keyup`, `input` por cada tecla) que un componente de autocompletado normalmente escucha para decidir cuándo mostrar sugerencias. `.type()` sí dispara esos eventos individualmente, por lo que es la opción correcta cuando el comportamiento de la UI depende de reaccionar a cada pulsación, como en este dropdown de ciudades.",
      en: "`.fill()` sets the field's value all at once, without firing the individual keyboard events (`keydown`, `keyup`, `input` per key) that an autocomplete component typically listens for to decide when to show suggestions. `.type()` does fire those events individually, which is why it's the right choice when the UI's behavior depends on reacting to each keystroke, like this city dropdown.",
    },
    points: 3,
    timeEstimateSeconds: 75,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
