/**
 * Module 3 — Locators and Selectors
 *
 * The most important module in the curriculum. Locators are the #1 daily
 * skill of a QA Automation engineer. A test with bad locators breaks every
 * sprint. Quality here is non-negotiable.
 *
 * Full bilingual lesson content for all 6 lessons in Module 3.
 * Follows the same structure as Modules 1 and 2.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m3-locators-selectors";

/* ================================================================== */
/*  Lesson 3.1 — The Locator API                                       */
/* ================================================================== */

const L3_1: LessonContent = {
  id: "m3-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "La interfaz más importante que jamás usarás",
        en: "The most important API you'll ever use",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "En Playwright, un Locator no es simplemente un selector CSS. Es un objeto inteligente que representa una forma de encontrar uno o más elementos en la página. Un Locator conoce la estrategia de búsqueda pero NO ejecuta la búsqueda hasta que interactúas con él. Este principio — lazy evaluation — es la base de la fiabilidad de Playwright.",
        en: "In Playwright, a Locator is not just a CSS selector. It's an intelligent object that represents a way to find one or more elements on the page. A Locator knows the search strategy but does NOT execute the search until you interact with it. This principle — lazy evaluation — is the foundation of Playwright's reliability.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Locators vs selectores antiguos",
        en: "Locators vs old selectors",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Si vienes de Puppeteer o de versiones antiguas de Playwright, quizás usaste `page.$()` o `page.$$()`. Estos métodos devolvían referencias inmediatas a elementos del DOM. El problema: si el elemento no existía aún (porque la página estaba cargando), obtenías `null` y tu test fallaba. Playwright moderno reemplazó esto con Locators.",
        en: "If you're coming from Puppeteer or older Playwright versions, you may have used `page.$()` or `page.$$()`. These methods returned immediate references to DOM elements. The problem: if the element didn't exist yet (because the page was loading), you got `null` and your test failed. Modern Playwright replaced this with Locators.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// ❌ Old style (deprecated in Playwright)
const button = await page.$('#submit-button');
if (button) await button.click();
// Problem: element might not exist yet → null → test fails or skips

// ✅ Modern Locator approach
const button = page.getByRole('button', { name: 'Submit' });
await button.click();
// Locator auto-retries until the element exists AND is actionable`,
      caption: {
        es: "Locator moderno vs selector antiguo: la diferencia es fiabilidad",
        en: "Modern Locator vs old selector: the difference is reliability",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Un Locator es PEREZOSO (lazy). No consulta el DOM cuando lo creas. Solo busca el elemento cuando ejecutas una acción como `.click()`, `.fill()` o `.textContent()`. Esto permite el auto-retry: si el elemento no está listo, Playwright espera y reintenta.",
        en: "A Locator is LAZY. It doesn't query the DOM when you create it. It only looks for the element when you execute an action like `.click()`, `.fill()`, or `.textContent()`. This enables auto-retry: if the element isn't ready, Playwright waits and retries.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Modo estricto por defecto",
        en: "Strict mode by default",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Playwright espera que cada Locator resuelva a EXACTAMENTE un elemento. Si un Locator coincide con múltiples elementos y no usas `.first()` o `.nth()`, Playwright lanza un error de strict mode. Esto previene que tus tests interactúen con el elemento equivocado por accidente.",
        en: "Playwright expects each Locator to resolve to EXACTLY one element. If a Locator matches multiple elements and you don't use `.first()` or `.nth()`, Playwright throws a strict mode error. This prevents your tests from accidentally interacting with the wrong element.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// The catalog page has multiple "Add to Cart" buttons (12 products)
await page.goto('/playground/catalog');

// ❌ Strict mode violation — matches 12 buttons!
await page.getByRole('button', { name: 'Add to Cart' }).click();
// Error: locator.click: Error: strict mode violation:
// getByRole('button', {name: 'Add to Cart'}) resolved to 12 elements

// ✅ Narrow it down to exactly one
await page.getByRole('button', { name: 'Add to Cart' }).first().click();
// OR: locate within a specific product card
await page.getByRole('article')
  .filter({ hasText: 'QA Best Practices' })
  .getByRole('button', { name: 'Add to Cart' })
  .click();`,
      caption: {
        es: "Strict mode te obliga a ser preciso — evita tests que pasan por casualidad",
        en: "Strict mode forces you to be precise — prevents tests that pass by accident",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Strict mode es tu amigo, no tu enemigo. Un test que hace clic en 'el primer botón que encuentra' puede pasar 100 veces y fallar la 101 cuando el orden de los productos cambia. Ser específico con tus Locators = tests que sobreviven refactors.",
        en: "💡 Strict mode is your friend, not your enemy. A test that clicks 'the first button it finds' may pass 100 times and fail the 101st when the product order changes. Being specific with your Locators = tests that survive refactors.",
      },
    },
    {
      type: "quiz",
      questionId: "m3-l1-quiz",
      question: {
        es: "¿Qué significa que un Locator de Playwright sea 'lazy'?",
        en: "What does it mean for a Playwright Locator to be 'lazy'?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Que tarda más en encontrar elementos que otros selectores",
            en: "That it takes longer to find elements than other selectors",
          },
        },
        {
          id: "b",
          text: {
            es: "Que no busca el elemento en el DOM hasta que ejecutas una acción sobre él, permitiendo auto-retry",
            en: "That it doesn't search the DOM until you execute an action on it, enabling auto-retry",
          },
        },
        {
          id: "c",
          text: {
            es: "Que solo funciona con elementos que tienen lazy loading",
            en: "That it only works with elements that have lazy loading",
          },
        },
        {
          id: "d",
          text: {
            es: "Que el Locator se destruye después de usarlo una vez",
            en: "That the Locator is destroyed after using it once",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Correcto. Un Locator almacena una 'receta' de cómo encontrar un elemento pero no la ejecuta hasta que se necesita. Cuando llamas `.click()`, Playwright ejecuta la búsqueda, y si el elemento no está listo, espera y reintenta automáticamente (dentro del timeout). Esto es lo que hace que los tests de Playwright sean tan fiables.",
        en: "Correct. A Locator stores a 'recipe' for how to find an element but doesn't execute it until needed. When you call `.click()`, Playwright runs the search, and if the element isn't ready, it waits and retries automatically (within the timeout). This is what makes Playwright tests so reliable.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 3.2 — Role-based locators (getByRole)                       */
/* ================================================================== */

const L3_2: LessonContent = {
  id: "m3-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Habla el idioma del navegador, no el del DOM",
        en: "Speak the browser's language, not the DOM's",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "`getByRole` es el localizador más poderoso y recomendado de Playwright. Localiza elementos por su rol ARIA — el mismo sistema que usan los lectores de pantalla para describir la interfaz a usuarios con discapacidad visual. Si tu página es accesible, `getByRole` encuentra todo.",
        en: "`getByRole` is Playwright's most powerful and recommended locator. It locates elements by their ARIA role — the same system screen readers use to describe the interface to visually impaired users. If your page is accessible, `getByRole` finds everything.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Roles más comunes y cuándo usarlos",
        en: "Most common roles and when to use them",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "`button` — Cualquier botón clicable. El más usado en tests.",
          en: "`button` — Any clickable button. The most used in tests.",
        },
        {
          es: "`link` — Enlaces de navegación (<a href='...'>).",
          en: "`link` — Navigation links (<a href='...'>).",
        },
        {
          es: "`textbox` — Campos de texto genéricos (input type=text, textarea).",
          en: "`textbox` — Generic text fields (input type=text, textarea).",
        },
        {
          es: "`searchbox` — Campos de búsqueda (input type=search).",
          en: "`searchbox` — Search fields (input type=search).",
        },
        {
          es: "`checkbox` — Casillas de verificación.",
          en: "`checkbox` — Checkboxes.",
        },
        {
          es: "`radio` — Botones de opción exclusiva.",
          en: "`radio` — Radio buttons.",
        },
        {
          es: "`combobox` — Selectores desplegables (<select>).",
          en: "`combobox` — Dropdown selectors (<select>).",
        },
        {
          es: "`heading` — Títulos y encabezados. Útil para verificar que la página correcta cargó.",
          en: "`heading` — Titles and headers. Useful for verifying the correct page loaded.",
        },
        {
          es: "`dialog` — Ventanas modales. Perfecto para verificar modales visibles.",
          en: "`dialog` — Modal windows. Perfect for verifying visible modals.",
        },
        {
          es: "`alert` — Mensajes de error o confirmación importantes.",
          en: "`alert` — Important error or confirmation messages.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "La opción { name }: filtrado por nombre accesible",
        en: "The { name } option: filtering by accessible name",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Casi siempre usarás `getByRole` con la opción `{ name }`. El nombre accesible es el texto que un lector de pantalla pronunciaría para ese elemento. Proviene del contenido textual del elemento, su atributo `aria-label`, o el texto del `<label>` asociado.",
        en: "You'll almost always use `getByRole` with the `{ name }` option. The accessible name is the text a screen reader would announce for that element. It comes from the element's text content, its `aria-label` attribute, or the associated `<label>` text.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Locating elements by their role + accessible name
await page.goto('/playground/login');

// "Sign In" is the visible text of the button → accessible name
await page.getByRole('button', { name: 'Sign In' }).click();

// "Email" is the text of the <label> associated with the input
await page.getByRole('textbox', { name: 'Email' }).fill('test@test.com');

// "Password" works the same way
await page.getByRole('textbox', { name: 'Password' }).fill('pass123');

// "Remember me" is the text next to the checkbox
await page.getByRole('checkbox', { name: 'Remember me' }).check();`,
      caption: {
        es: "getByRole con { name } en el formulario de login del Playground",
        en: "getByRole with { name } on the Playground login form",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 El `name` de `getByRole` acepta strings y expresiones regulares. Usa `{ name: /sign in/i }` para búsqueda case-insensitive. Prefiere strings exactos cuando puedas — son más rápidos y detectan cambios en el texto.",
        en: "💡 The `name` in `getByRole` accepts strings and regular expressions. Use `{ name: /sign in/i }` for case-insensitive search. Prefer exact strings when possible — they're faster and detect text changes.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Por qué getByRole es el rey?",
        en: "Why is getByRole king?",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Resiliencia: los roles ARIA rara vez cambian. Las clases CSS cambian a diario.",
          en: "Resilience: ARIA roles rarely change. CSS classes change daily.",
        },
        {
          es: "Accesibilidad: un test que usa getByRole es un test que verifica que tu app es usable por todos.",
          en: "Accessibility: a test using getByRole is a test that verifies your app is usable by everyone.",
        },
        {
          es: "Semántica: describe QUÉ es el elemento, no CÓMO se ve. 'Un botón llamado Sign In' es más claro que '.btn-primary'.",
          en: "Semantics: describes WHAT the element is, not HOW it looks. 'A button called Sign In' is clearer than '.btn-primary'.",
        },
        {
          es: "Futuro: si cambias tu <button> por un <div role='button'>, el test sigue funcionando porque el rol no cambió.",
          en: "Future-proof: if you change your <button> to a <div role='button'>, the test still works because the role didn't change.",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m3-l2-quiz",
      question: {
        es: "¿Qué localizador usarías para hacer clic en un enlace que dice 'View Curriculum'?",
        en: "What locator would you use to click a link that says 'View Curriculum'?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "page.getByRole('button', { name: 'View Curriculum' })",
            en: "page.getByRole('button', { name: 'View Curriculum' })",
          },
        },
        {
          id: "b",
          text: {
            es: "page.getByRole('link', { name: 'View Curriculum' })",
            en: "page.getByRole('link', { name: 'View Curriculum' })",
          },
        },
        {
          id: "c",
          text: {
            es: "page.locator('.curriculum-link')",
            en: "page.locator('.curriculum-link')",
          },
        },
        {
          id: "d",
          text: {
            es: "page.getByRole('navigation', { name: 'View Curriculum' })",
            en: "page.getByRole('navigation', { name: 'View Curriculum' })",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Un enlace de navegación tiene rol ARIA `link` (implícito en elementos `<a href>`). Usar `getByRole('link', { name: 'View Curriculum' })` es semánticamente correcto y resistente a cambios visuales. Un botón (`button`) tendría rol `button`. El rol `navigation` es para barras de navegación enteras, no para enlaces individuales.",
        en: "A navigation link has the ARIA role `link` (implicit on `<a href>` elements). Using `getByRole('link', { name: 'View Curriculum' })` is semantically correct and resilient to visual changes. A button would have role `button`. The `navigation` role is for entire nav bars, not individual links.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 3.3 — Text, Label, and Placeholder locators                 */
/* ================================================================== */

const L3_3: LessonContent = {
  id: "m3-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Lo que el usuario sí puede ver",
        en: "What the user can actually see",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "`getByRole` es el rey, pero no siempre es suficiente. Playwright te da un arsenal de localizadores basados en texto visible y atributos HTML que cubren todos los demás casos. La clave está en conocer la jerarquía de preferencia: getByRole > getByLabel > getByText > getByPlaceholder > getByAltText > getByTitle > CSS/XPath.",
        en: "`getByRole` is king, but it's not always enough. Playwright gives you an arsenal of text-based and HTML-attribute locators that cover every other case. The key is knowing the preference hierarchy: getByRole > getByLabel > getByText > getByPlaceholder > getByAltText > getByTitle > CSS/XPath.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "getByText: localizando por contenido visible",
        en: "getByText: locating by visible content",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "`getByText` busca elementos que contengan el texto especificado. Es ideal para párrafos, mensajes de error, y cualquier elemento cuyo contenido textual sea su principal característica identificativa. Por defecto busca substrings; usa `{ exact: true }` para coincidencia exacta.",
        en: "`getByText` finds elements containing the specified text. It's ideal for paragraphs, error messages, and any element whose text content is its main identifying characteristic. By default it matches substrings; use `{ exact: true }` for exact matching.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// getByText examples on the playground catalog page
await page.goto('/playground/catalog');

// Find a product by its name (substring match)
await page.getByText('Playwright Poster').click();

// Exact match — won't match "Playwright Poster Pro"
await page.getByText('Playwright Poster', { exact: true });

// Find error messages or status text
await expect(page.getByText('Email is required')).toBeVisible();

// Multiple elements: use .first() or .nth()
await page.getByText('Add to Cart').first().click();`,
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "ℹ️ `getByText` solo busca texto VISIBLE en la página. Si el texto está oculto con CSS (`display: none`) o dentro de un elemento colapsado, no será encontrado. Esto es intencional: imita cómo un usuario real solo puede interactuar con lo que ve.",
        en: "ℹ️ `getByText` only finds VISIBLE text on the page. If the text is hidden with CSS (`display: none`) or inside a collapsed element, it won't be found. This is intentional: it mimics how a real user can only interact with what they see.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "getByLabel: el rey de los formularios",
        en: "getByLabel: the king of forms",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "`getByLabel` localiza campos de formulario por el texto de su etiqueta `<label>`. Es la forma más natural de encontrar inputs porque replica exactamente cómo un usuario identifica un campo: leyendo su etiqueta. Si tu formulario usa etiquetas HTML correctamente, este es tu localizador principal para inputs.",
        en: "`getByLabel` locates form fields by their `<label>` text. It's the most natural way to find inputs because it replicates exactly how a user identifies a field: by reading its label. If your form uses HTML labels correctly, this is your primary locator for inputs.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// getByLabel on the signup wizard (/playground/signup)
await page.goto('/playground/signup');

// Each field has a <label> element → getByLabel works perfectly
await page.getByLabel('Full Name').fill('Jane Doe');
await page.getByLabel('Email').fill('jane@test.com');
await page.getByLabel('Date of Birth').fill('1990-05-15');
await page.getByRole('button', { name: 'Next' }).click();

// Step 2: Account info
await page.getByLabel('Username').fill('janedoe');
await page.getByLabel('Password').fill('SecurePass1');
await page.getByLabel('Confirm Password').fill('SecurePass1');
await page.getByRole('button', { name: 'Next' }).click();

// Step 3: Preferences (select, checkbox, radio — all labelable)
await page.getByLabel('Country').selectOption('ES');
await page.getByLabel('Subscribe to newsletter').check();
await page.getByRole('button', { name: 'Next' }).click();

// Step 4: Review and submit
await page.getByRole('button', { name: 'Sign Up' }).click();`,
      caption: {
        es: "getByLabel en cada paso del wizard de registro",
        en: "getByLabel on every step of the signup wizard",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "getByPlaceholder, getByAltText, getByTitle",
        en: "getByPlaceholder, getByAltText, getByTitle",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// getByPlaceholder — when the input has no <label> (avoid relying on this)
await page.getByPlaceholder('Search products...').fill('laptop');

// getByAltText — for images (<img alt="...">)
await expect(page.getByAltText('Product image for Playwright Poster')).toBeVisible();

// getByTitle — for elements with title attribute (rarely needed)
await page.getByTitle('Delete item').click();`,
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Jerarquía de preferencia (memorízala): 1️⃣ getByRole 2️⃣ getByLabel 3️⃣ getByText 4️⃣ getByPlaceholder 5️⃣ getByAltText 6️⃣ getByTitle 7️⃣ getByTestId 8️⃣ CSS/XPath (último recurso). Cuanto más arriba en la lista, más resistente es tu test a cambios de UI.",
        en: "🔑 Preference hierarchy (memorise it): 1️⃣ getByRole 2️⃣ getByLabel 3️⃣ getByText 4️⃣ getByPlaceholder 5️⃣ getByAltText 6️⃣ getByTitle 7️⃣ getByTestId 8️⃣ CSS/XPath (last resort). The higher up the list, the more resistant your test is to UI changes.",
      },
    },
    {
      type: "quiz",
      questionId: "m3-l3-quiz",
      question: {
        es: "¿Qué localizador es preferible para un campo de formulario que tiene una etiqueta <label for='email'>Email</label>?",
        en: "Which locator is preferable for a form field that has a label <label for='email'>Email</label>?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "page.locator('#email') — el selector CSS del ID",
            en: "page.locator('#email') — the CSS ID selector",
          },
        },
        {
          id: "b",
          text: {
            es: "page.getByLabel('Email') — el texto de la etiqueta",
            en: "page.getByLabel('Email') — the label text",
          },
        },
        {
          id: "c",
          text: {
            es: "page.getByPlaceholder('Enter your email') — el placeholder",
            en: "page.getByPlaceholder('Enter your email') — the placeholder",
          },
        },
        {
          id: "d",
          text: {
            es: "page.getByRole('textbox') — sin name, solo por rol",
            en: "page.getByRole('textbox') — without name, just by role",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`getByLabel('Email')` es la mejor opción porque replica cómo un usuario real encuentra el campo: leyendo su etiqueta. Es resistente a cambios de ID, clase o placeholder. Si el campo tiene una etiqueta, `getByRole('textbox', { name: 'Email' })` también funciona y es igual de bueno — ambos están en el top de la jerarquía.",
        en: "`getByLabel('Email')` is the best choice because it replicates how a real user finds the field: by reading its label. It's resistant to ID, class, or placeholder changes. If the field has a label, `getByRole('textbox', { name: 'Email' })` also works and is equally good — both are at the top of the hierarchy.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 3.4 — CSS and XPath: when (and why) to avoid them          */
/* ================================================================== */

const L3_4: LessonContent = {
  id: "m3-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Selectores que sobreviven a un rediseño",
        en: "Selectors that survive a redesign",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Si vienes de Selenium, CSS y XPath eran tus herramientas principales. En Playwright, existen, funcionan, pero ocupan el ÚLTIMO lugar en tu caja de herramientas. Entender cuándo usarlos — y más importante, cuándo NO — es lo que separa un test frágil de uno profesional.",
        en: "If you're coming from Selenium, CSS and XPath were your main tools. In Playwright, they exist, they work, but they occupy the LAST place in your toolbox. Understanding when to use them — and more importantly, when NOT to — is what separates a fragile test from a professional one.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "CSS selectors en Playwright",
        en: "CSS selectors in Playwright",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// CSS selectors work in page.locator()
await page.locator('.btn-primary').click();
await page.locator('#submit-button').click();
await page.locator('div.product-card:nth-child(3) button').click();

// These ALL work. The question is: should you use them?`,
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "El problema: los selectores CSS se rompen",
        en: "The problem: CSS selectors break",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Monday: the developer refactors CSS
// .btn-primary → .button-main
// Your test that used:
await page.locator('.btn-primary').click();
// BROKEN. No compile error, no warning — just a failing test.

// Wednesday: the designer changes the DOM structure
// The third child is no longer the button you need
await page.locator('div:nth-child(3) button').click();
// STILL PASSES, but clicks the WRONG button. Silent bug.

// Friday: you have 47 tests using .btn-primary.
// All 47 fail. You spend the afternoon fixing them.`,
      caption: {
        es: "Los selectores CSS se rompen silenciosamente cuando el CSS o el DOM cambian",
        en: "CSS selectors break silently when CSS or DOM changes",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ Las clases CSS existen para estilizar, NO para identificar elementos en tests. `btn-primary` describe cómo se ve un botón, no qué hace. Cuando el equipo de diseño cambia los estilos (y lo harán), tus tests no deberían romperse.",
        en: "⚠️ CSS classes exist for styling, NOT for identifying elements in tests. `btn-primary` describes how a button looks, not what it does. When the design team changes styles (and they will), your tests shouldn't break.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "data-testid: el escape hatch controlado",
        en: "data-testid: the controlled escape hatch",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Cuando ningún localizador semántico funciona, `data-testid` es tu escape hatch. A diferencia de las clases CSS, `data-testid` tiene un propósito explícito: testing. Los desarrolladores saben que no deben cambiarlo sin consultar. Pero úsalo con moderación — cada `data-testid` que añades es una concesión de que no pudiste localizar el elemento semánticamente.",
        en: "When no semantic locator works, `data-testid` is your escape hatch. Unlike CSS classes, `data-testid` has an explicit purpose: testing. Developers know not to change it without consulting. But use it sparingly — every `data-testid` you add is an admission that you couldn't locate the element semantically.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// data-testid in the HTML:
// <span data-testid="cart-total">$49.96</span>

// Locating it in Playwright:
await expect(page.getByTestId('cart-total')).toHaveText('$44.96');

// This is acceptable because the cart total has no inherent
// role, label, or text that's unique enough to identify it
// among all the other numbers on the page.`,
      caption: {
        es: "getByTestId en el carrito de compras del Playground — un uso legítimo",
        en: "getByTestId on the Playground shopping cart — a legitimate use",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Regla práctica: si necesitas más de 3 `data-testid` en una página, algo está mal con la semántica HTML de esa página. Habla con tu equipo de desarrollo. Una página accesible necesita pocos o ningún testid.",
        en: "💡 Rule of thumb: if you need more than 3 `data-testid` on a page, something is wrong with that page's HTML semantics. Talk to your dev team. An accessible page needs few to no testids.",
      },
    },
    {
      type: "quiz",
      questionId: "m3-l4-quiz",
      question: {
        es: "¿Por qué es mejor evitar selectores CSS como `.btn-primary` en tests de Playwright?",
        en: "Why is it better to avoid CSS selectors like `.btn-primary` in Playwright tests?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "Porque Playwright no soporta selectores CSS",
            en: "Because Playwright doesn't support CSS selectors",
          },
        },
        {
          id: "b",
          text: {
            es: "Porque son más lentos que getByRole",
            en: "Because they're slower than getByRole",
          },
        },
        {
          id: "c",
          text: {
            es: "Porque las clases CSS existen para estilizar, no para identificar elementos, y cambian frecuentemente cuando el diseño se actualiza",
            en: "Because CSS classes exist for styling, not identifying elements, and change frequently when the design is updated",
          },
        },
        {
          id: "d",
          text: {
            es: "Porque los selectores CSS solo funcionan en modo headless",
            en: "Because CSS selectors only work in headless mode",
          },
        },
      ],
      correctOptionId: "c",
      explanation: {
        es: "Correcto. Las clases CSS como `.btn-primary` describen la APARIENCIA del elemento, no su PROPÓSITO. Cuando el equipo de diseño actualiza los estilos, las clases cambian y tus tests se rompen. Los localizadores semánticos como `getByRole('button', { name: 'Submit' })` describen la función del elemento y sobreviven a refactors visuales.",
        en: "Correct. CSS classes like `.btn-primary` describe the element's APPEARANCE, not its PURPOSE. When the design team updates styles, classes change and your tests break. Semantic locators like `getByRole('button', { name: 'Submit' })` describe the element's function and survive visual refactors.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 3.5 — Chaining and filtering locators                       */
/* ================================================================== */

const L3_5: LessonContent = {
  id: "m3-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Reduce el ruido, encuentra el elemento exacto",
        en: "Cut the noise, find the exact element",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "A veces un solo localizador no es suficiente. Necesitas decir 'el botón Add to Cart DENTRO de la tarjeta del producto X'. Para eso existen el encadenamiento (`.locator().locator()`) y los métodos de filtrado (`.filter()`, `.first()`, `.nth()`). Estas herramientas te permiten construir consultas complejas que siguen siendo legibles y mantenibles.",
        en: "Sometimes a single locator isn't enough. You need to say 'the Add to Cart button INSIDE the product card for X'. That's what chaining (`.locator().locator()`) and filtering methods (`.filter()`, `.first()`, `.nth()`) are for. These tools let you build complex queries that remain readable and maintainable.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Encadenamiento: locator.locator()",
        en: "Chaining: locator.locator()",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Cuando llamas `.locator()` sobre un Locator existente, la búsqueda se limita a los descendientes del primer Locator. Es como decir 'dentro de este contenedor, busca esto otro'. La sintaxis es idéntica a usar un localizador directamente sobre `page`.",
        en: "When you call `.locator()` on an existing Locator, the search is limited to descendants of the first Locator. It's like saying 'inside this container, find that'. The syntax is identical to using a locator directly on `page`.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Chaining: narrow scope step by step
await page.goto('/playground/catalog');

// Step 1: Find the product article
const card = page.getByRole('article').filter({ hasText: 'QA Best Practices' });

// Step 2: Inside that card, find the Add to Cart button
const addButton = card.getByRole('button', { name: 'Add to Cart' });
await addButton.click();

// Equivalent one-liner (more readable for simple cases):
await page
  .getByRole('article')
  .filter({ hasText: 'QA Best Practices' })
  .getByRole('button', { name: 'Add to Cart' })
  .click();`,
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: ".first(), .last(), .nth(n)",
        en: ".first(), .last(), .nth(n)",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// When multiple elements match, pick one by position

// First matching element
await page.getByRole('button', { name: 'Add to Cart' }).first().click();

// Last matching element
const lastProduct = page.getByRole('article').last();

// Nth element (0-indexed)
const thirdRow = page.getByRole('row').nth(2);

// On data tables: interact with specific rows
const table = page.getByRole('table');
const rows = table.getByRole('row');
await expect(rows).toHaveCount(11); // header + 10 data rows`,
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ `.nth()` depende del orden en el DOM. Si el orden de los elementos cambia (ej: nuevo producto añadido al catálogo), `.nth(2)` podría seleccionar un elemento diferente. Siempre que puedas, prefiere `.filter()` por contenido sobre `.nth()` por posición.",
        en: "⚠️ `.nth()` depends on DOM order. If the element order changes (e.g. a new product is added to the catalog), `.nth(2)` might select a different element. Whenever possible, prefer `.filter()` by content over `.nth()` by position.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: ".filter(): el filtro más potente",
        en: ".filter(): the most powerful filter",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// .filter({ hasText: ... }) — filter by text content
await page
  .getByRole('article')
  .filter({ hasText: 'Automation' })
  .getByRole('button', { name: 'Add to Cart' })
  .click();
// Clicks Add to Cart on the article that contains "Automation"
// (matches "Test Automation Guide")

// .filter({ has: locator }) — filter by child element
await page
  .getByRole('article')
  .filter({ has: page.getByText('$29.99') })
  .getByRole('heading', { level: 3 })
  .textContent();
// Gets the heading of the product card whose price is $29.99

// .filter({ hasNot: locator }) — exclude by child element
await page
  .getByRole('article')
  .filter({ hasNot: page.getByText('Out of Stock') })
  .count();
// Counts only in-stock products`,
      caption: {
        es: "filter() por texto, por elemento hijo y por ausencia de elemento",
        en: "filter() by text, by child element, and by absence of element",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Una cadena de localizadores bien construida se lee como una frase en inglés: 'Get the article that has text X, then get its button called Y'. Si tu cadena no se puede leer así, probablemente es demasiado compleja.",
        en: "💡 A well-built locator chain reads like an English sentence: 'Get the article that has text X, then get its button called Y'. If your chain can't be read this way, it's probably too complex.",
      },
    },
    {
      type: "quiz",
      questionId: "m3-l5-quiz",
      question: {
        es: "¿Cuál es la diferencia clave entre `.nth(2)` y `.filter({ hasText: '...' })`?",
        en: "What is the key difference between `.nth(2)` and `.filter({ hasText: '...' })?",
      },
      options: [
        {
          id: "a",
          text: {
            es: ".nth() es más rápido que .filter()",
            en: ".nth() is faster than .filter()",
          },
        },
        {
          id: "b",
          text: {
            es: ".nth() selecciona por posición en el DOM (frágil si el orden cambia); .filter() selecciona por contenido (resistente a cambios de orden)",
            en: ".nth() selects by DOM position (fragile if order changes); .filter() selects by content (resistant to order changes)",
          },
        },
        {
          id: "c",
          text: {
            es: ".filter() solo funciona con texto, .nth() con cualquier selector",
            en: ".filter() only works with text, .nth() with any selector",
          },
        },
        {
          id: "d",
          text: {
            es: "No hay diferencia, son alias de la misma función",
            en: "There's no difference, they're aliases of the same function",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "`.nth(2)` selecciona el tercer elemento (índice 0) en el orden del DOM. Si se añade un nuevo producto al catálogo y cambia el orden, `.nth(2)` podría apuntar a un producto diferente. `.filter({ hasText: 'Laptop' })` busca por contenido textual: mientras el producto 'Laptop' exista, el localizador funciona. Por eso `.filter()` es preferible cuando el contenido identifica unívocamente al elemento.",
        en: "`.nth(2)` selects the third element (0-indexed) in DOM order. If a new product is added to the catalog and the order changes, `.nth(2)` might point to a different product. `.filter({ hasText: 'Laptop' })` searches by textual content: as long as the 'Laptop' product exists, the locator works. That's why `.filter()` is preferred when content uniquely identifies the element.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 3.6 — Practical Exercise: Locate elements in the PlayQ     */
/*              Playground                                             */
/* ================================================================== */

const L3_6: LessonContent = {
  id: "m3-l6",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Demuestra que entiendes el DOM mejor que los developers",
        en: "Prove you understand the DOM better than the developers",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has aprendido toda la API de localizadores de Playwright. Ahora es momento de ponerlo a prueba. Vas a escribir 6 localizadores diferentes para elementos del catálogo del PlayQ Playground, usando la jerarquía de preferencia que aprendiste. Cada localizador debe ser el más semántico y resistente posible.",
        en: "You've learned the entire Playwright Locator API. Now it's time to put it to the test. You'll write 6 different locators for elements in the PlayQ Playground catalog, using the preference hierarchy you learned. Each locator must be the most semantic and resilient possible.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Antes de escribir cada localizador, pregúntate: '¿Cómo describiría este elemento un usuario real?' La respuesta suele ser el localizador correcto. Un usuario no dice 'el div con clase product-card', dice 'la tarjeta del producto que dice Laptop'.",
        en: "💡 Before writing each locator, ask yourself: 'How would a real user describe this element?' The answer is usually the correct locator. A user doesn't say 'the div with class product-card', they say 'the product card that says Laptop'.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m3-l6-exercise",
      instructions: {
        es: "Escribe localizadores de Playwright para 6 elementos en la página /playground/catalog. Cada tarea te indica qué elemento localizar. Escribe el localizador que mejor siga la jerarquía de preferencia: getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath.\n\n1. Localiza el encabezado de la página\n2. Localiza el campo de búsqueda\n3. Localiza el checkbox de categoría 'Books'\n4. Localiza el dropdown de ordenamiento\n5. Localiza el botón 'Add to Cart' del PRIMER producto\n6. Localiza el contador del carrito",
        en: "Write Playwright locators for 6 elements on the /playground/catalog page. Each task tells you which element to locate. Write the locator that best follows the preference hierarchy: getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath.\n\n1. Locate the page heading\n2. Locate the search input\n3. Locate the 'Books' category checkbox\n4. Locate the sort dropdown\n5. Locate the 'Add to Cart' button of the FIRST product\n6. Locate the cart counter",
      },
      starterCode: `import { test, expect } from '@playwright/test';

test.describe('Catalog locators exercise', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground/catalog');
  });

  test('1. Locate the page heading', async ({ page }) => {
    const heading = /* TODO: write locator here */;
    await expect(heading).toBeVisible();
  });

  test('2. Locate the search input', async ({ page }) => {
    const search = /* TODO: write locator here */;
    await search.fill('laptop');
  });

  test('3. Locate the Books category checkbox', async ({ page }) => {
    const checkbox = /* TODO: write locator here */;
    await checkbox.check();
  });

  test('4. Locate the sort dropdown', async ({ page }) => {
    const sort = /* TODO: write locator here */;
    await sort.selectOption('Price: Low to High');
  });

  test('5. Locate the Add to Cart button of the first product', async ({ page }) => {
    const addBtn = /* TODO: write locator here */;
    await addBtn.click();
  });

  test('6. Locate the cart counter', async ({ page }) => {
    const counter = /* TODO: write locator here */;
    await expect(counter).toHaveText('1');
  });
});`,
      solution: `import { test, expect } from '@playwright/test';

test.describe('Catalog locators exercise — solution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/playground/catalog');
  });

  test('1. Page heading', async ({ page }) => {
    // The heading is an <h1> → role 'heading', level 1
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    // Also acceptable: page.getByRole('heading', { name: /Catalog/ })
  });

  test('2. Search input', async ({ page }) => {
    // The search field is <input type="search"> → role 'searchbox'
    const search = page.getByRole('searchbox');
    await search.fill('laptop');
    // Also acceptable: page.getByPlaceholder('Search products...')
  });

  test('3. Books category checkbox', async ({ page }) => {
    // The category filter uses checkboxes with visible labels
    const checkbox = page.getByRole('checkbox', { name: 'Books' });
    await checkbox.check();
    // This works because each category has a <label> with text "Books"
  });

  test('4. Sort dropdown', async ({ page }) => {
    // The sort <select> has role 'combobox'
    const sort = page.getByRole('combobox', { name: 'Sort by' });
    await sort.selectOption('price_asc');
    // Playwright fills the actual <option value="..."> attribute
  });

  test('5. First product Add to Cart button', async ({ page }) => {
    // Multiple "Add to Cart" buttons exist → use .first()
    const addBtn = page
      .getByRole('button', { name: 'Add to Cart' })
      .first();
    await addBtn.click();
    // Also acceptable: chaining from the first article card
  });

  test('6. Cart counter', async ({ page }) => {
    // The cart counter has role 'status' and an aria-label
    const counter = page.getByRole('status', { name: /cart/i });
    await expect(counter).toHaveText(/1/);
    // The regex /cart/i matches the accessible name case-insensitively
  });
});`,
      hints: [
        {
          es: "Recuerda la jerarquía de preferencia: getByRole > getByLabel > getByText > getByPlaceholder. Empieza siempre preguntándote: ¿qué rol ARIA tiene este elemento?",
          en: "Remember the preference hierarchy: getByRole > getByLabel > getByText > getByPlaceholder. Always start by asking: what ARIA role does this element have?",
        },
        {
          es: "Para campos de formulario, piensa en su rol de accesibilidad: los inputs de texto tienen role 'textbox', los de búsqueda 'searchbox', los selects 'combobox', los checkboxes 'checkbox'.",
          en: "For form fields, think about their accessibility role: text inputs have role 'textbox', search inputs 'searchbox', selects 'combobox', checkboxes 'checkbox'.",
        },
        {
          es: "Cuando múltiples elementos coinciden (como 'Add to Cart' en varias tarjetas de producto), usa .first(), .nth(n) o encadena con .filter({ hasText: ... }) para reducir a uno solo.",
          en: "When multiple elements match (like 'Add to Cart' on multiple product cards), use .first(), .nth(n), or chain with .filter({ hasText: ... }) to narrow to one.",
        },
        {
          es: "Si te encuentras buscando clases CSS o IDs, detente y pregúntate: '¿Qué rol accesible tiene este elemento?' Esa es casi siempre tu respuesta correcta.",
          en: "If you find yourself reaching for CSS classes or IDs, stop and ask: 'What accessible role does this element have?' That's almost always your correct answer.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 La jerarquía de preferencia no es una regla académica — es una estrategia de supervivencia profesional. Cada vez que eliges getByRole sobre un selector CSS, estás ahorrando horas de mantenimiento futuro. Haz de esto un hábito desde el día uno.",
        en: "🔑 The preference hierarchy isn't an academic rule — it's a professional survival strategy. Every time you choose getByRole over a CSS selector, you're saving hours of future maintenance. Make this a habit from day one.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Lo que has logrado",
        en: "What you've achieved",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Has dominado la habilidad más importante del QA Automation: localizar elementos de forma fiable. Con getByRole, getByLabel, getByText y las técnicas de encadenamiento y filtrado, puedes encontrar cualquier elemento en cualquier página de forma que sobreviva a rediseños, refactors y cambios de framework. En el Módulo 4, pondrás estos localizadores en acción con clicks, fills y aserciones reales.",
        en: "You've mastered the most important skill in QA Automation: reliably locating elements. With getByRole, getByLabel, getByText, and chaining/filtering techniques, you can find any element on any page in a way that survives redesigns, refactors, and framework changes. In Module 4, you'll put these locators into action with real clicks, fills, and assertions.",
      },
    },
    {
      type: "quiz",
      questionId: "m3-l6-quiz",
      question: {
        es: "¿Cuál es el orden correcto de la jerarquía de preferencia de localizadores (de mejor a peor)?",
        en: "What is the correct order of the locator preference hierarchy (best to worst)?",
      },
      options: [
        {
          id: "a",
          text: {
            es: "CSS > XPath > getByText > getByRole > getByLabel",
            en: "CSS > XPath > getByText > getByRole > getByLabel",
          },
        },
        {
          id: "b",
          text: {
            es: "getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath",
            en: "getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath",
          },
        },
        {
          id: "c",
          text: {
            es: "getByText > getByRole > getByLabel > getByPlaceholder > CSS/XPath",
            en: "getByText > getByRole > getByLabel > getByPlaceholder > CSS/XPath",
          },
        },
        {
          id: "d",
          text: {
            es: "Todos son igualmente buenos, depende del contexto",
            en: "They're all equally good, it depends on context",
          },
        },
      ],
      correctOptionId: "b",
      explanation: {
        es: "La jerarquía oficial recomendada por Playwright es: getByRole → getByLabel → getByText → getByPlaceholder → getByAltText → getByTitle → getByTestId → CSS/XPath. Esta jerarquía prioriza la accesibilidad y la resistencia a cambios: cuanto más arriba, más semántico y mantenible es el localizador.",
        en: "The official Playwright-recommended hierarchy is: getByRole → getByLabel → getByText → getByPlaceholder → getByAltText → getByTitle → getByTestId → CSS/XPath. This hierarchy prioritises accessibility and resilience to change: the higher up, the more semantic and maintainable the locator.",
      },
    },
  ],
  resources: [
    {
      title: { es: "Playwright — Localizadores", en: "Playwright — Locators" },
      url: "https://playwright.dev/docs/locators",
    },
    {
      title: { es: "PlayQ Playground — Catálogo", en: "PlayQ Playground — Catalog" },
      url: "/playground/catalog",
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_3_LESSONS: LessonContent[] = [L3_1, L3_2, L3_3, L3_4, L3_5, L3_6];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_3_LESSONS;
}
