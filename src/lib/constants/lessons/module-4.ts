/**
 * Module 4 — Actions and Assertions
 *
 * Where students learn to MAKE tests do things (actions) and VERIFY
 * outcomes (assertions). The module that finally explains Playwright's
 * killer feature: AUTO-WAITING. Most QA-from-Selenium pain comes from
 * manual waits — this module must make crystal clear why Playwright
 * eliminates that problem.
 *
 * Full bilingual lesson content for all 5 lessons in Module 4.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m4-actions-assertions";

/* ================================================================== */
/*  Lesson 4.1 — Click, Fill, Type, Press                              */
/* ================================================================== */

const L4_1: LessonContent = {
  id: "m4-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: { es: "Click, Fill, Type, Press", en: "Click, Fill, Type, Press" },
    },
    {
      type: "paragraph",
      content: {
        es: "Los locators te dicen DÓNDE está un elemento. Las acciones te permiten INTERACTUAR con él. Playwright ofrece un conjunto completo de acciones — desde clicks hasta atajos de teclado — que imitan fielmente cómo un usuario real interactúa con tu aplicación.",
        en: "Locators tell you WHERE an element is. Actions let you INTERACT with it. Playwright offers a complete set of actions — from clicks to keyboard shortcuts — that faithfully mimic how a real user interacts with your application.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Variaciones de click", en: "Click variations" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Basic click
await page.getByRole('button', { name: 'Sign In' }).click();

// Double click (useful for edit-in-place interactions)
await page.getByRole('cell').dblclick();

// Click with modifier keys held
await page.getByRole('button')
  .click({ modifiers: ['Control'] }); // Ctrl+Click

// Click at a specific position within an element
await page.getByRole('button')
  .click({ position: { x: 10, y: 5 } });`,
      caption: {
        es: "Click básico, doble click, click con modificadores y click posicional",
        en: "Basic click, double click, modifier click, and positional click",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Llenando formularios: .fill() vs .type()", en: "Filling forms: .fill() vs .type()" },
    },
    {
      type: "paragraph",
      content: {
        es: "`.fill()` es el método estándar para establecer valores en campos de formulario. Limpia el campo y escribe el valor de una vez. `.type()` escribe carácter por carácter, disparando eventos de teclado individuales — útil para probar autocompletado o validación en tiempo real.",
        en: "`.fill()` is the standard method for setting form field values. It clears the field and writes the value at once. `.type()` writes character by character, firing individual keyboard events — useful for testing autocomplete or real-time validation.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `await page.goto('/playground/signup');

// .fill() — fast, standard for form fields
await page.getByLabel('Full Name').fill('Jane Doe');
await page.getByLabel('Email').fill('jane@test.com');
await page.getByLabel('Date of Birth').fill('1990-05-15');
await page.getByRole('button', { name: 'Next' }).click();

// Step 2
await page.getByLabel('Username').fill('janedoe');
await page.getByLabel('Password').fill('SecurePass1');
await page.getByLabel('Confirm Password').fill('SecurePass1');

// .type() — character by character, 50ms per keystroke
await page.getByLabel('Username').type('janedoe', { delay: 50 });
// Use .type() when you need to simulate real human typing
// (e.g., testing an autocomplete dropdown that triggers on input)`,
      caption: {
        es: ".fill() en el wizard de registro del Playground",
        en: ".fill() on the Playground signup wizard",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Usa `.fill()` el 95% del tiempo. Solo usa `.type()` cuando específicamente necesites simular la escritura humana (tests de autocompletado, validación carácter por carácter, o contadores de caracteres en tiempo real).",
        en: "💡 Use `.fill()` 95% of the time. Only use `.type()` when you specifically need to simulate human typing (autocomplete tests, character-by-character validation, or real-time character counters).",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Interacciones de teclado", en: "Keyboard interactions" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Single key press
await page.getByRole('textbox').press('Enter');

// Common presses in tests
await page.press('Escape');         // Close modals/dialogs
await page.press('Tab');           // Focus next element
await page.press('Control+A');     // Select all text
await page.press('Backspace');     // Delete last character

// Combine with fill for realistic flows
await page.getByLabel('Email').fill('test@test.com');
await page.getByLabel('Email').press('Tab'); // Move to next field
await page.getByLabel('Password').fill('pass123');
await page.getByLabel('Password').press('Enter'); // Submit form`,
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Checkboxes, radios, selects", en: "Checkboxes, radios, selects" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Checkboxes: .check() and .uncheck()
await page.getByRole('checkbox', { name: 'Remember me' }).check();
await page.getByRole('checkbox', { name: 'Subscribe' }).uncheck();

// .check() is idempotent — safe to call on already-checked element
await page.getByRole('checkbox', { name: 'Books' }).check();

// Radio buttons
await page.getByRole('radio', { name: 'Email' }).check();

// <select> dropdowns: .selectOption()
await page.getByRole('combobox', { name: 'Country' }).selectOption('ES');
// select by visible label
await page.getByRole('combobox').selectOption({ label: 'Price: Low to High' });
// select by value attribute
await page.getByRole('combobox').selectOption({ value: 'price_asc' });`,
      caption: {
        es: ".check(), .uncheck(), .selectOption() en acción",
        en: ".check(), .uncheck(), .selectOption() in action",
      },
    },
    {
      type: "quiz",
      questionId: "m4-l1-quiz",
      question: {
        es: "¿Cuándo deberías usar .type() en lugar de .fill()?",
        en: "When should you use .type() instead of .fill()?",
      },
      options: [
        { id: "a", text: { es: "Siempre, porque es más realista", en: "Always, because it's more realistic" } },
        { id: "b", text: { es: "Cuando necesitas simular escritura humana carácter por carácter, como en tests de autocompletado", en: "When you need to simulate human typing character-by-character, like in autocomplete tests" } },
        { id: "c", text: { es: "Cuando el campo es muy largo y fill() podría fallar", en: "When the field is very long and fill() might fail" } },
        { id: "d", text: { es: ".type() y .fill() son idénticos, usa el que prefieras", en: ".type() and .fill() are identical, use whichever you prefer" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`.type()` escribe carácter por carácter con un delay configurable, disparando eventos de teclado individuales. Esto es necesario para probar funcionalidades que reaccionan a cada pulsación, como dropdowns de autocompletado o contadores de caracteres. Para formularios normales, `.fill()` es más rápido y fiable.",
        en: "`.type()` writes character by character with a configurable delay, firing individual keyboard events. This is necessary for testing features that react to each keystroke, like autocomplete dropdowns or character counters. For normal forms, `.fill()` is faster and more reliable.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 4.2 — expect() and assertion types                          */
/* ================================================================== */

const L4_2: LessonContent = {
  id: "m4-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: { es: "expect() y tipos de aserción", en: "expect() and assertion types" },
    },
    {
      type: "paragraph",
      content: {
        es: "Las aserciones son el corazón de cualquier test: verifican que la aplicación se comporta como esperas. Playwright ofrece dos categorías de aserciones: las WEB assertions (que hacen auto-wait) y las GENERIC assertions (que son inmediatas). Saber cuál usar en cada momento es la diferencia entre un test robusto y uno frágil.",
        en: "Assertions are the heart of any test: they verify the application behaves as expected. Playwright offers two categories: WEB assertions (which auto-wait) and GENERIC assertions (which are immediate). Knowing which to use when is the difference between a robust test and a fragile one.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Las WEB assertions (toBeVisible, toHaveText, etc.) hacen AUTO-WAIT — reintentan hasta que la condición se cumple o el timeout expira. Las GENERIC assertions (toBe, toEqual) son INMEDIATAS — evalúan el valor actual sin esperar. Memoriza esta diferencia: es la razón #1 de tests flaky.",
        en: "🔑 WEB assertions (toBeVisible, toHaveText, etc.) AUTO-WAIT — they retry until the condition is met or the timeout expires. GENERIC assertions (toBe, toEqual) are IMMEDIATE — they evaluate the current value without waiting. Memorise this difference: it's the #1 cause of flaky tests.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Aserciones web más útiles", en: "Most useful web assertions" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "`toBeVisible()` — El elemento es visible. La aserción más usada.", en: "`toBeVisible()` — The element is visible. The most-used assertion." },
        { es: "`toBeHidden()` — El elemento NO es visible o no existe en el DOM.", en: "`toBeHidden()` — The element is NOT visible or doesn't exist in the DOM." },
        { es: "`toBeEnabled()` / `toBeDisabled()` — El elemento está habilitado/deshabilitado.", en: "`toBeEnabled()` / `toBeDisabled()` — The element is enabled/disabled." },
        { es: "`toBeChecked()` — Un checkbox o radio está marcado.", en: "`toBeChecked()` — A checkbox or radio is checked." },
        { es: "`toHaveText()` — El elemento contiene exactamente ese texto.", en: "`toHaveText()` — The element contains exactly that text." },
        { es: "`toContainText()` — El elemento contiene el texto como substring.", en: "`toContainText()` — The element contains the text as a substring." },
        { es: "`toHaveValue()` — Un input tiene ese valor.", en: "`toHaveValue()` — An input has that value." },
        { es: "`toHaveAttribute()` — El elemento tiene ese atributo con ese valor.", en: "`toHaveAttribute()` — The element has that attribute with that value." },
        { es: "`toHaveCount()` — El Locator coincide con exactamente N elementos.", en: "`toHaveCount()` — The Locator matches exactly N elements." },
        { es: "`toHaveURL()` — La página actual tiene esa URL (acepta string o regex).", en: "`toHaveURL()` — The current page has that URL (accepts string or regex)." },
        { es: "`toHaveTitle()` — El título de la página es ese.", en: "`toHaveTitle()` — The page title is that." },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Flujo completo: login con aserciones", en: "Complete flow: login with assertions" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('complete login flow with assertions', async ({ page }) => {
  await page.goto('/playground/login');

  // Pre-condition assertions: form is visible
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign In' }))
    .toBeEnabled();

  // Interact
  await page.getByLabel('Email').fill('student@playq.test');
  await page.getByLabel('Password').fill('Playwright123!');
  await page.getByRole('checkbox', { name: 'Remember me' }).check();
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Post-condition assertions: login succeeded
  await expect(page).toHaveURL(/login\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Login Successful!' }))
    .toBeVisible();
  await expect(page.getByText('Welcome back')).toBeVisible();
  await expect(page.getByText('student@playq.test')).toBeVisible();
});`,
      caption: {
        es: "Pre-condiciones, interacción y post-condiciones en un solo test",
        en: "Pre-conditions, interaction, and post-conditions in one test",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Aserciones negativas y timeouts", en: "Negative assertions and timeouts" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Negative assertions with .not
await expect(page.getByRole('alert')).not.toBeVisible();
await expect(page.getByRole('button', { name: 'Delete' }))
  .not.toBeEnabled();

// Custom timeout per assertion (default is 5s)
await expect(page.getByText('Loading...'))
  .not.toBeVisible({ timeout: 15000 }); // Wait up to 15s

// Set global timeout in playwright.config.ts:
// use: { actionTimeout: 10000 }

// Verify count of elements
await expect(page.getByRole('article'))
  .toHaveCount(12); // 12 product cards on catalog`,
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Las aserciones de Playwright son 'inteligentes' con `.not`. Si haces `expect(element).not.toBeVisible()` y el elemento ni siquiera existe en el DOM, la aserción pasa inmediatamente. No espera 5 segundos para confirmar que algo que no existe sigue sin ser visible.",
        en: "💡 Playwright assertions are 'smart' with `.not`. If you do `expect(element).not.toBeVisible()` and the element doesn't even exist in the DOM, the assertion passes immediately. It doesn't wait 5 seconds to confirm that something non-existent remains invisible.",
      },
    },
    {
      type: "quiz",
      questionId: "m4-l2-quiz",
      question: {
        es: "¿Cuál es la diferencia clave entre `toBeVisible()` y `toEqual(true)`?",
        en: "What is the key difference between `toBeVisible()` and `toEqual(true)`?",
      },
      options: [
        { id: "a", text: { es: "toBeVisible() verifica visibilidad; toEqual() compara valores. Ambas esperan el mismo tiempo.", en: "toBeVisible() checks visibility; toEqual() compares values. Both wait the same amount of time." } },
        { id: "b", text: { es: "toBeVisible() es una web assertion que auto-espera; toEqual() es una generic assertion que evalúa inmediatamente sin esperar", en: "toBeVisible() is a web assertion that auto-waits; toEqual() is a generic assertion that evaluates immediately without waiting" } },
        { id: "c", text: { es: "toEqual() es más rápida y deberías usarla siempre", en: "toEqual() is faster and you should always use it" } },
        { id: "d", text: { es: "No hay diferencia, son alias de la misma función", en: "There's no difference, they're aliases of the same function" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`toBeVisible()` es una web assertion: reintenta automáticamente hasta que el elemento está visible o el timeout expira. `toEqual()` es una generic assertion: evalúa el valor actual inmediatamente. Si usas `toEqual(true)` en lugar de `toBeVisible()`, tu test fallará instantáneamente si el elemento aún no es visible, sin dar tiempo a que la UI se actualice. Por eso siempre debes usar web assertions para verificar estado de la UI.",
        en: "`toBeVisible()` is a web assertion: it automatically retries until the element is visible or the timeout expires. `toEqual()` is a generic assertion: it evaluates the current value immediately. If you use `toEqual(true)` instead of `toBeVisible()`, your test will fail instantly if the element isn't visible yet, without giving the UI time to update. That's why you should always use web assertions for verifying UI state.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 4.3 — Soft assertions                                       */
/* ================================================================== */

const L4_3: LessonContent = {
  id: "m4-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: { es: "Soft assertions", en: "Soft assertions" },
    },
    {
      type: "paragraph",
      content: {
        es: "Las aserciones normales ('hard') detienen el test en el primer fallo. A veces quieres ver TODOS los fallos de una página a la vez — por ejemplo, al validar un formulario con 10 campos. Para eso existen las soft assertions: continúan ejecutándose tras un fallo y reportan todos los errores al final.",
        en: "Normal ('hard') assertions stop the test on the first failure. Sometimes you want to see ALL failures on a page at once — for example, when validating a form with 10 fields. That's what soft assertions are for: they continue executing after a failure and report all errors at the end.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "expect.soft() en acción", en: "expect.soft() in action" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('validate signup review page', async ({ page }) => {
  // Complete the signup wizard...
  await page.goto('/playground/signup');
  await page.getByLabel('Full Name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane@test.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Username').fill('janedoe');
  await page.getByLabel('Password').fill('SecurePass1');
  await page.getByLabel('Confirm Password').fill('SecurePass1');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 4: Review page — validate ALL fields at once
  // Hard assertion: if Name is wrong, stop (critical)
  await expect(page.getByText('Welcome back')).not.toBeVisible();

  // Soft assertions: check EVERY field, don't stop on first fail
  await expect.soft(page.getByText('Jane Doe')).toBeVisible();
  await expect.soft(page.getByText('jane@test.com')).toBeVisible();
  await expect.soft(page.getByText('janedoe')).toBeVisible();
  // Even if the first soft assertion fails, the second still runs
  await expect.soft(page.getByRole('button', { name: 'Sign Up' }))
    .toBeEnabled();

  // test.info().errors shows all soft failures in the report
});`,
      caption: {
        es: "Soft assertions validan todos los campos del resumen de registro a la vez",
        en: "Soft assertions validate all signup summary fields at once",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Las soft assertions son perfectas para páginas de resumen o confirmación donde necesitas verificar muchos campos. Si falla el nombre Y el email Y la fecha, verás los tres errores en el reporte, no solo el primero.",
        en: "💡 Soft assertions are perfect for summary or confirmation pages where you need to verify many fields. If the name AND email AND date all fail, you'll see all three errors in the report, not just the first one.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "expect.poll() para condiciones cambiantes", en: "expect.poll() for changing conditions" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// poll() retries a generic assertion until it passes or times out
// Useful for checking non-UI state like API results

// Wait for an async operation to complete
await expect.poll(async () => {
  const response = await page.request.get('/api/status');
  const json = await response.json();
  return json.status;
}).toBe('completed');

// Check a counter reaches a certain value
await expect.poll(() =>
  page.getByTestId('cart-counter').textContent()
).toBe('3');

// poll() is a bridge between generic assertions and auto-waiting`,
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Agrupando con test.step()", en: "Grouping with test.step()" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// test.step() groups related actions in the HTML report
test('complex checkout flow', async ({ page }) => {
  await test.step('Navigate to catalog', async () => {
    await page.goto('/playground/catalog');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  await test.step('Add products to cart', async () => {
    await page.getByRole('button', { name: 'Add to Cart' }).first().click();
    await page.getByRole('button', { name: 'Add to Cart' }).nth(1).click();
  });

  await test.step('Verify cart totals', async () => {
    await page.goto('/playground/cart');
    await expect(page.getByRole('spinbutton').first()).toHaveValue('1');
  });
});
// Each step appears as a collapsible section in the HTML report`,
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ No abuses de las soft assertions. Si un fallo significa que el resto del test no tiene sentido (ej: el login falló, no puedes verificar el dashboard), usa una hard assertion. Soft es para cuando quieres ver múltiples fallos independientes.",
        en: "⚠️ Don't overuse soft assertions. If a failure means the rest of the test is meaningless (e.g., login failed, you can't verify the dashboard), use a hard assertion. Soft is for when you want to see multiple independent failures.",
      },
    },
    {
      type: "quiz",
      questionId: "m4-l3-quiz",
      question: {
        es: "¿En qué escenario usarías expect.soft() en lugar de expect()?",
        en: "In which scenario would you use expect.soft() instead of expect()?",
      },
      options: [
        { id: "a", text: { es: "Para verificar que el login fue exitoso antes de continuar", en: "To verify the login was successful before continuing" } },
        { id: "b", text: { es: "Para validar múltiples campos independientes en una página de resumen, donde quieres ver todos los errores a la vez", en: "To validate multiple independent fields on a summary page, where you want to see all errors at once" } },
        { id: "c", text: { es: "Siempre, porque las soft assertions son más rápidas", en: "Always, because soft assertions are faster" } },
        { id: "d", text: { es: "Para aserciones que no son importantes", en: "For assertions that aren't important" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Las soft assertions son ideales cuando tienes múltiples verificaciones independientes entre sí. Si el nombre está mal pero el email está bien, quieres saber ambas cosas, no solo la primera. Sin embargo, si el login falla y todo el resto del test depende de estar autenticado, una hard assertion que detenga el test inmediatamente es más apropiada.",
        en: "Soft assertions are ideal when you have multiple independent checks. If the name is wrong but the email is right, you want to know both, not just the first. However, if the login fails and the entire rest of the test depends on being authenticated, a hard assertion that stops the test immediately is more appropriate.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 4.4 — Auto-waiting explained                                */
/* ================================================================== */

const L4_4: LessonContent = {
  id: "m4-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: { es: "Auto-waiting explicado", en: "Auto-waiting explained" },
    },
    {
      type: "paragraph",
      content: {
        es: "Si hay UNA característica que hace que los QAs que vienen de Selenium se enamoren de Playwright, es el auto-waiting. En Selenium, pasas el 30% de tu tiempo escribiendo waits explícitos. En Playwright, ese porcentaje baja a casi cero. Aquí entenderás POR QUÉ.",
        en: "If there's ONE feature that makes QAs coming from Selenium fall in love with Playwright, it's auto-waiting. In Selenium, you spend 30% of your time writing explicit waits. In Playwright, that percentage drops to nearly zero. Here you'll understand WHY.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Qué verifica Playwright antes de cada acción", en: "What Playwright checks before every action" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Elemento ATTACHED al DOM — El elemento existe en el árbol del documento.", en: "Element ATTACHED to DOM — The element exists in the document tree." },
        { es: "Elemento VISIBLE — No está oculto con CSS (display:none, visibility:hidden).", en: "Element VISIBLE — Not hidden with CSS (display:none, visibility:hidden)." },
        { es: "Elemento STABLE — No está animándose. Playwright espera a que termine la animación.", en: "Element STABLE — Not animating. Playwright waits for animation to finish." },
        { es: "Elemento RECEIVES EVENTS — No está cubierto por otro elemento (ej: modal overlay).", en: "Element RECEIVES EVENTS — Not covered by another element (e.g., modal overlay)." },
        { es: "Elemento ENABLED — No está deshabilitado (para acciones como click y fill).", en: "Element ENABLED — Not disabled (for actions like click and fill)." },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Estos 5 checks de 'actionability' ocurren automáticamente antes de CADA acción (click, fill, type, etc.). Tú no escribes ni una línea de código para esto. Es la razón principal por la que los tests de Playwright son drásticamente más fiables que los de Selenium.",
        en: "These 5 'actionability' checks happen automatically before EVERY action (click, fill, type, etc.). You don't write a single line of code for this. It's the main reason Playwright tests are dramatically more reliable than Selenium tests.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Auto-waiting en el Playground dinámico", en: "Auto-waiting on the Dynamic Playground" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('auto-waiting handles dynamic content effortlessly', async ({ page }) => {
  await page.goto('/playground/dynamic');

  // 1. Loading spinner: click button, wait for content
  await page.getByRole('button', { name: 'Load Content' }).click();
  // No waitForSelector! expect auto-waits for content
  await expect(page.getByText('Content loaded successfully!'))
    .toBeVisible({ timeout: 5000 });

  // 2. Progress bar: click, wait for button to enable
  await page.getByRole('button', { name: 'Start Progress' }).click();
  // Auto-waits for the Continue button to become enabled
  await page.getByRole('button', { name: 'Continue' })
    .click({ timeout: 10000 });

  // 3. Disappearing element: wait for it to vanish
  await page.getByRole('button', { name: 'Show for 2 seconds' }).click();
  // expect().not.toBeVisible() auto-waits for disappearance
  await expect(page.getByText("I'll disappear soon"))
    .not.toBeVisible({ timeout: 5000 });

  // 4. Toast notification: appears and auto-dismisses
  await page.getByRole('button', { name: 'Show Toast' }).click();
  await expect(page.getByRole('status'))
    .toBeVisible({ timeout: 3000 });
  await expect(page.getByRole('status'))
    .not.toBeVisible({ timeout: 5000 });
});`,
      caption: {
        es: "Un test completo contra /playground/dynamic — cero waits manuales",
        en: "A complete test against /playground/dynamic — zero manual waits",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "El anti-patrón: page.waitForTimeout()", en: "The anti-pattern: page.waitForTimeout()" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// ❌ ANTI-PATTERN: fixed wait
await page.getByRole('button').click();
await page.waitForTimeout(5000); // "Wait and hope"
await expect(page.getByText('Done')).toBeVisible();

// ✅ CORRECT: assert on the condition
await page.getByRole('button').click();
await expect(page.getByText('Done'))
  .toBeVisible({ timeout: 5000 }); // Wait for exact condition`,
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ `page.waitForTimeout(5000)` es casi siempre un 'code smell'. Espera 5 segundos pase lo que pase — si el elemento aparece en 1 segundo, perdiste 4. Si tarda 6 segundos, tu test falla. Siempre prefiere aserciones con timeout explícito.",
        en: "⚠️ `page.waitForTimeout(5000)` is almost always a code smell. It waits 5 seconds no matter what — if the element appears in 1 second, you wasted 4. If it takes 6 seconds, your test fails. Always prefer assertions with explicit timeouts.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "waitFor methods: cuándo sí los necesitas", en: "waitFor methods: when you do need them" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// page.waitForURL — wait for navigation to complete
await page.getByRole('button', { name: 'Sign In' }).click();
await page.waitForURL('**/dashboard');
// This is more reliable than expect(page).toHaveURL() in some cases

// page.waitForLoadState — wait for network to settle
await page.goto('/playground/catalog');
await page.waitForLoadState('networkidle');
// Useful for pages that lazy-load content after initial render

// locator.waitFor() — rarely needed, but available
await page.getByText('Loading...').waitFor({ state: 'hidden' });`,
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Regla de oro: si estás a punto de escribir `page.waitForTimeout()`, pregúntate QUÉ condición exacta estás esperando. Luego escribe una aserción para esa condición con un timeout adecuado. Tu yo del futuro (y tu pipeline de CI) te lo agradecerán.",
        en: "💡 Golden rule: if you're about to write `page.waitForTimeout()`, ask yourself WHAT exact condition you're waiting for. Then write an assertion for that condition with an appropriate timeout. Your future self (and your CI pipeline) will thank you.",
      },
    },
    {
      type: "quiz",
      questionId: "m4-l4-quiz",
      question: {
        es: "¿Por qué `page.waitForTimeout(5000)` se considera un anti-patrón en Playwright?",
        en: "Why is `page.waitForTimeout(5000)` considered an anti-pattern in Playwright?",
      },
      options: [
        { id: "a", text: { es: "Porque la función no existe en Playwright", en: "Because the function doesn't exist in Playwright" } },
        { id: "b", text: { es: "Porque espera un tiempo fijo sin verificar condiciones reales: si el elemento aparece antes, pierdes tiempo; si tarda más, el test falla innecesariamente", en: "Because it waits a fixed time without checking real conditions: if the element appears sooner, you waste time; if it takes longer, the test fails unnecessarily" } },
        { id: "c", text: { es: "Porque solo funciona en modo headless", en: "Because it only works in headless mode" } },
        { id: "d", text: { es: "Porque ralentiza todos los tests del proyecto globalmente", en: "Because it slows down all tests in the project globally" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Los waits fijos son frágiles por naturaleza. Si esperas 5 segundos y la UI responde en 1, tu test es 5x más lento de lo necesario. Si la UI tarda 6 segundos (porque el servidor de CI está lento), tu test falla aunque la aplicación funcione correctamente. Las aserciones con timeout son superiores porque esperan el tiempo MÍNIMO necesario para que se cumpla la condición real.",
        en: "Fixed waits are inherently fragile. If you wait 5 seconds and the UI responds in 1, your test is 5x slower than necessary. If the UI takes 6 seconds (because the CI server is slow), your test fails even though the application works correctly. Assertions with timeouts are superior because they wait the MINIMUM time needed for the real condition to be met.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 4.5 — Practical Exercise: Automate a login flow             */
/* ================================================================== */

const L4_5: LessonContent = {
  id: "m4-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Ejercicio práctico: Automatiza un flujo de login",
        en: "Practical Exercise: Automate a login flow",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Este ejercicio consolida todo lo aprendido en los Módulos 2, 3 y 4. Vas a escribir una suite de tests completa para el formulario de login del PlayQ Playground, usando localizadores semánticos, acciones precisas y aserciones correctas. Cero waits manuales.",
        en: "This exercise consolidates everything learned in Modules 2, 3, and 4. You'll write a complete test suite for the PlayQ Playground login form, using semantic locators, precise actions, and correct assertions. Zero manual waits.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 PROHIBIDO usar `page.waitForTimeout()`. Cada espera debe ser una aserción web con timeout explícito si es necesario. Las credenciales de prueba están en la página de login: student@playq.test / Playwright123!",
        en: "💡 FORBIDDEN to use `page.waitForTimeout()`. Every wait must be a web assertion with an explicit timeout if needed. Test credentials are on the login page: student@playq.test / Playwright123!",
      },
    },
    {
      type: "exercise",
      exerciseId: "m4-l5-exercise",
      instructions: {
        es: "Escribe una suite de tests completa para /playground/login que cubra estos 4 escenarios:\n\n1. Login exitoso con credenciales de estudiante: verifica que redirige al dashboard y muestra el mensaje de bienvenida\n2. Login fallido con contraseña incorrecta: verifica que aparece el mensaje de error\n3. Envío de formulario vacío: verifica que aparecen los mensajes de validación para email y contraseña\n4. Toggle del checkbox 'Remember me': verifica que se puede marcar y desmarcar\n\nUsa la jerarquía de preferencia para localizadores (Módulo 3) y web assertions apropiadas (Módulo 4).",
        en: "Write a complete test suite for /playground/login covering these 4 scenarios:\n\n1. Successful login with student credentials: verify it redirects to dashboard and shows welcome message\n2. Failed login with wrong password: verify the error message appears\n3. Empty form submission: verify validation messages appear for email and password\n4. Toggle the 'Remember me' checkbox: verify it can be checked and unchecked\n\nUse the preference hierarchy for locators (Module 3) and appropriate web assertions (Module 4).",
      },
      starterCode: `import { test, expect } from '@playwright/test';

test.describe('PlayQ Playground — Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground/login');
  });

  test('1. successful login with student credentials', async ({ page }) => {
    // TODO: Fill email and password with valid credentials
    // TODO: Click Sign In
    // TODO: Assert redirect + welcome message visible
  });

  test('2. failed login with wrong password', async ({ page }) => {
    // TODO: Fill with valid email but wrong password
    // TODO: Click Sign In
    // TODO: Assert error alert appears with correct text
  });

  test('3. empty form shows validation errors', async ({ page }) => {
    // TODO: Click Sign In without filling anything
    // TODO: Assert both validation messages appear
  });

  test('4. remember me checkbox toggles', async ({ page }) => {
    const checkbox = /* TODO */;

    // TODO: Check the checkbox and assert it's checked
    // TODO: Uncheck it and assert it's not checked
  });
});`,
      solution: `import { test, expect } from '@playwright/test';

test.describe('PlayQ Playground — Login Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground/login');
  });

  test('1. successful login with student credentials', async ({ page }) => {
    // Fill form using semantic locators
    await page.getByLabel('Email').fill('student@playq.test');
    await page.getByLabel('Password').fill('Playwright123!');

    // Submit
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify success — web assertions auto-wait
    await expect(
      page.getByRole('heading', { name: 'Login Successful!' })
    ).toBeVisible();
    await expect(page.getByText('Welcome back')).toBeVisible();
    await expect(page.getByText('student@playq.test')).toBeVisible();
  });

  test('2. failed login with wrong password', async ({ page }) => {
    await page.getByLabel('Email').fill('student@playq.test');
    await page.getByLabel('Password').fill('WrongPassword');

    await page.getByRole('button', { name: 'Sign In' }).click();

    // Error alert has role='alert' — semantic + auto-wait
    const alert = page.getByRole('alert');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Invalid email or password');
  });

  test('3. empty form shows validation errors', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('4. remember me checkbox toggles', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: 'Remember me',
    });

    // Check and verify
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Uncheck and verify
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });
});`,
      hints: [
        {
          es: "Para el login exitoso, usa getByLabel para los campos y getByRole para el botón. Las credenciales son student@playq.test / Playwright123!.",
          en: "For the successful login, use getByLabel for fields and getByRole for the button. Credentials are student@playq.test / Playwright123!.",
        },
        {
          es: "El mensaje de error de login fallido tiene role='alert'. Usa getByRole('alert') para localizarlo y toContainText para verificar su contenido.",
          en: "The failed login error message has role='alert'. Use getByRole('alert') to locate it and toContainText to verify its content.",
        },
        {
          es: "Para el formulario vacío, simplemente haz clic en Sign In sin llenar nada. Luego verifica que AMBOS mensajes de error (email y contraseña) son visibles.",
          en: "For the empty form, just click Sign In without filling anything. Then verify that BOTH error messages (email and password) are visible.",
        },
        {
          es: "El checkbox 'Remember me' tiene el texto visible 'Remember me'. Usa getByRole('checkbox', { name: 'Remember me' }). Los métodos check() y uncheck() son idempotentes.",
          en: "The 'Remember me' checkbox has visible text 'Remember me'. Use getByRole('checkbox', { name: 'Remember me' }). The check() and uncheck() methods are idempotent.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Este patrón de 4 escenarios (éxito, error, validación, toggle) es el estándar profesional para probar cualquier formulario. Domínalo y podrás escribir tests para cualquier flujo de UI que encuentres en tu carrera.",
        en: "🔑 This 4-scenario pattern (success, error, validation, toggle) is the professional standard for testing any form. Master it and you'll be able to write tests for any UI flow you encounter in your career.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Verifica tu solución", en: "Verify your solution" },
    },
    {
      type: "list",
      ordered: true,
      items: [
        { es: "¿Los 4 tests pasan con `npx playwright test`?", en: "Do all 4 tests pass with `npx playwright test`?" },
        { es: "¿Usaste getByRole, getByLabel y getByText en lugar de selectores CSS?", en: "Did you use getByRole, getByLabel, and getByText instead of CSS selectors?" },
        { es: "¿Usaste expect.soft() donde era apropiado (múltiples verificaciones independientes)?", en: "Did you use expect.soft() where appropriate (multiple independent verifications)?" },
        { es: "¿No hay ningún page.waitForTimeout() en tu código?", en: "Is there no page.waitForTimeout() in your code?" },
        { es: "¿Verificaste tanto el caso exitoso como los casos de error y validación?", en: "Did you verify both the success case and the error/validation cases?" },
      ],
    },
    {
      type: "quiz",
      questionId: "m4-l5-quiz",
      question: {
        es: "¿Cuál es el patrón profesional recomendado para probar un formulario?",
        en: "What is the recommended professional pattern for testing a form?",
      },
      options: [
        { id: "a", text: { es: "Solo probar el caso exitoso; los errores son responsabilidad del desarrollador", en: "Only test the success case; errors are the developer's responsibility" } },
        { id: "b", text: { es: "Probar todos los campos uno por uno en tests separados", en: "Test every field one by one in separate tests" } },
        { id: "c", text: { es: "Cubrir 4 escenarios: éxito, error, validación de campos vacíos, y toggle de elementos interactivos como checkboxes", en: "Cover 4 scenarios: success, error, empty-field validation, and toggle of interactive elements like checkboxes" } },
        { id: "d", text: { es: "Escribir un solo test gigante que pruebe todo el formulario de una vez", en: "Write a single giant test that tests the entire form at once" } },
      ],
      correctOptionId: "c",
      explanation: {
        es: "El patrón de 4 escenarios cubre las dimensiones más importantes de cualquier formulario: el camino feliz (éxito), el manejo de errores del servidor (credenciales inválidas), la validación del cliente (campos vacíos), y la interactividad (toggles). Este patrón te da confianza de que el formulario funciona correctamente en todas las situaciones comunes.",
        en: "The 4-scenario pattern covers the most important dimensions of any form: the happy path (success), server error handling (invalid credentials), client validation (empty fields), and interactivity (toggles). This pattern gives you confidence that the form works correctly in all common situations.",
      },
    },
  ],
  resources: [
    {
      title: { es: "Playwright — Acciones", en: "Playwright — Actions" },
      url: "https://playwright.dev/docs/input",
    },
    {
      title: { es: "Playwright — Aserciones", en: "Playwright — Assertions" },
      url: "https://playwright.dev/docs/test-assertions",
    },
    {
      title: { es: "Playwright — Auto-waiting", en: "Playwright — Auto-waiting" },
      url: "https://playwright.dev/docs/actionability",
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_4_LESSONS: LessonContent[] = [L4_1, L4_2, L4_3, L4_4, L4_5];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_4_LESSONS;
}
