/**
 * Exam question bank — Module 3: Locators and Selectors.
 *
 * 13 questions (5 easy, 5 medium, 3 hard) covering:
 *   - The Locator API: lazy evaluation and strict mode
 *   - getByRole and the { name } option (the recommended, top-priority locator)
 *   - getByText, getByLabel, getByPlaceholder and the preference hierarchy
 *   - CSS/XPath: why they break, and data-testid as a controlled escape hatch
 *   - Chaining (.locator().locator()) and .filter()/.first()/.nth()
 *   - Practical exercise: locating elements in the PlayQ Playground catalog
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M3 = "m3-locators-selectors";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m3-e1",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "Un Locator de Playwright es 'lazy': no busca el elemento en el DOM hasta que ejecutas una acción sobre él, como `.click()` o `.fill()`.",
      en: "A Playwright Locator is 'lazy': it doesn't search the DOM until you execute an action on it, like `.click()` or `.fill()`.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Un Locator almacena la estrategia de búsqueda pero no la ejecuta al crearlo. Solo busca el elemento cuando llamas a una acción, lo que permite el auto-retry: si el elemento no está listo, Playwright espera y reintenta automáticamente dentro del timeout.",
      en: "Correct. A Locator stores the search strategy but doesn't execute it when created. It only searches for the element when you call an action, which enables auto-retry: if the element isn't ready, Playwright waits and retries automatically within the timeout.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m3-e2",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "¿Cuál es el localizador MÁS recomendado por Playwright para encontrar un botón llamado 'Sign In'?",
      en: "What is Playwright's MOST recommended locator for finding a button named 'Sign In'?",
    },
    options: [
      { id: "a", text: { es: "page.locator('.btn-signin')", en: "page.locator('.btn-signin')" } },
      { id: "b", text: { es: "page.getByRole('button', { name: 'Sign In' })", en: "page.getByRole('button', { name: 'Sign In' })" } },
      { id: "c", text: { es: "page.locator('//button[text()=\"Sign In\"]')", en: "page.locator('//button[text()=\"Sign In\"]')" } },
      { id: "d", text: { es: "page.getByTestId('signin-btn')", en: "page.getByTestId('signin-btn')" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`getByRole` encabeza la jerarquía de preferencia de Playwright: localiza por rol ARIA y nombre accesible, el mismo sistema que usan los lectores de pantalla. Es más resistente a cambios visuales que CSS, XPath o incluso `data-testid`, que debería reservarse para cuando ningún localizador semántico funciona.",
      en: "`getByRole` heads Playwright's preference hierarchy: it locates by ARIA role and accessible name, the same system screen readers use. It's more resilient to visual changes than CSS, XPath, or even `data-testid`, which should be reserved for when no semantic locator works.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m3-e3",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "`getByText` solo encuentra texto que esté VISIBLE en la página; texto oculto con `display: none` no será encontrado.",
      en: "`getByText` only finds text that is VISIBLE on the page; text hidden with `display: none` will not be found.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Este comportamiento es intencional: `getByText` imita cómo un usuario real solo puede interactuar con lo que ve. Si el texto está oculto por CSS o dentro de un elemento colapsado, el localizador no lo encontrará.",
      en: "Correct. This behavior is intentional: `getByText` mimics how a real user can only interact with what they see. If the text is hidden by CSS or inside a collapsed element, the locator won't find it.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },
  {
    id: "m3-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "Para un campo de formulario con `<label for='email'>Email</label>`, ¿qué localizador replica mejor cómo un usuario real identifica el campo?",
      en: "For a form field with `<label for='email'>Email</label>`, which locator best replicates how a real user identifies the field?",
    },
    options: [
      { id: "a", text: { es: "page.locator('#email')", en: "page.locator('#email')" } },
      { id: "b", text: { es: "page.getByLabel('Email')", en: "page.getByLabel('Email')" } },
      { id: "c", text: { es: "page.getByPlaceholder('Enter your email')", en: "page.getByPlaceholder('Enter your email')" } },
      { id: "d", text: { es: "page.locator('input[type=email]')", en: "page.locator('input[type=email]')" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`getByLabel('Email')` busca el campo por el texto de su etiqueta `<label>` asociada, exactamente como lo haría un usuario que lee la etiqueta antes de rellenar el campo. Es resistente a cambios de ID, clase o placeholder.",
      en: "`getByLabel('Email')` finds the field by its associated `<label>` text, exactly as a user would by reading the label before filling the field. It's resistant to ID, class, or placeholder changes.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m3-e5",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M3],
    question: {
      es: "Las clases CSS como `.btn-primary` existen principalmente para estilizar elementos, no para identificarlos de forma única en tests.",
      en: "CSS classes like `.btn-primary` exist primarily for styling elements, not for uniquely identifying them in tests.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. `.btn-primary` describe la APARIENCIA del botón, no su propósito. El equipo de diseño puede cambiar esa clase en cualquier rediseño sin avisar, rompiendo silenciosamente los tests que dependen de ella. Por eso los localizadores semánticos como `getByRole` son preferibles.",
      en: "Correct. `.btn-primary` describes the button's APPEARANCE, not its purpose. The design team can change that class in any redesign without warning, silently breaking tests that depend on it. That's why semantic locators like `getByRole` are preferable.",
    },
    points: 1,
    timeEstimateSeconds: 20,
  },

  /* ================================================================== */
  /*  MEDIUM (5 questions)                                               */
  /* ================================================================== */

  {
    id: "m3-m1",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "La página de catálogo tiene 12 productos, cada uno con su propio botón 'Add to Cart'. ¿Qué ocurre al ejecutar esta línea?",
      en: "The catalog page has 12 products, each with its own 'Add to Cart' button. What happens when this line runs?",
    },
    codeSnippet: `await page.goto('/playground/catalog');
await page.getByRole('button', { name: 'Add to Cart' }).click();`,
    options: [
      { id: "a", text: { es: "Hace clic en el primer botón 'Add to Cart' que encuentra automáticamente", en: "It automatically clicks the first 'Add to Cart' button it finds" } },
      { id: "b", text: { es: "Lanza un error de strict mode violation porque el locator resuelve a 12 elementos", en: "It throws a strict mode violation error because the locator resolves to 12 elements" } },
      { id: "c", text: { es: "Hace clic en todos los 12 botones secuencialmente", en: "It clicks all 12 buttons sequentially" } },
      { id: "d", text: { es: "No hace nada porque el rol 'button' no es válido para múltiples elementos", en: "It does nothing because the 'button' role isn't valid for multiple elements" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Playwright opera en modo estricto por defecto: espera que cada Locator resuelva a EXACTAMENTE un elemento antes de actuar. Si coincide con varios (los 12 botones 'Add to Cart') y no usas `.first()`, `.nth()` o un filtro que lo reduzca a uno, Playwright lanza un error de strict mode violation en lugar de adivinar cuál querías.",
      en: "Playwright operates in strict mode by default: it expects each Locator to resolve to EXACTLY one element before acting. If it matches several (the 12 'Add to Cart' buttons) and you don't use `.first()`, `.nth()`, or a filter that narrows it to one, Playwright throws a strict mode violation error instead of guessing which one you meant.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m3-m2",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "¿Cuál es la jerarquía de preferencia CORRECTA de localizadores en Playwright, de más a menos recomendado?",
      en: "What is the CORRECT preference hierarchy of locators in Playwright, from most to least recommended?",
    },
    options: [
      { id: "a", text: { es: "CSS/XPath > getByTestId > getByText > getByRole", en: "CSS/XPath > getByTestId > getByText > getByRole" } },
      { id: "b", text: { es: "getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath", en: "getByRole > getByLabel > getByText > getByPlaceholder > getByTestId > CSS/XPath" } },
      { id: "c", text: { es: "getByTestId > getByRole > getByLabel > CSS/XPath", en: "getByTestId > getByRole > getByLabel > CSS/XPath" } },
      { id: "d", text: { es: "Todos son equivalentes; la elección no afecta la mantenibilidad del test", en: "They are all equivalent; the choice doesn't affect test maintainability" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "La jerarquía oficial de Playwright es: getByRole → getByLabel → getByText → getByPlaceholder → getByAltText → getByTitle → getByTestId → CSS/XPath (último recurso). Prioriza accesibilidad y resistencia a cambios: cuanto más arriba, más semántico y mantenible es el localizador.",
      en: "Playwright's official hierarchy is: getByRole → getByLabel → getByText → getByPlaceholder → getByAltText → getByTitle → getByTestId → CSS/XPath (last resort). It prioritizes accessibility and resilience to change: the higher up, the more semantic and maintainable the locator.",
    },
    points: 2,
    timeEstimateSeconds: 40,
  },
  {
    id: "m3-m3",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "¿Cuáles de las siguientes afirmaciones sobre `data-testid` son correctas según las buenas prácticas del curso? (Selecciona todas las correctas)",
      en: "Which of the following statements about `data-testid` are correct according to the course's best practices? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Es un 'escape hatch' aceptable cuando ningún localizador semántico (rol, etiqueta, texto) funciona", en: "It's an acceptable 'escape hatch' when no semantic locator (role, label, text) works" } },
      { id: "b", text: { es: "Debe ser tu primera opción siempre, antes de intentar getByRole", en: "It should always be your first choice, before trying getByRole" } },
      { id: "c", text: { es: "A diferencia de las clases CSS, tiene un propósito explícito de testing y los desarrolladores no deberían cambiarlo sin avisar", en: "Unlike CSS classes, it has an explicit testing purpose and developers shouldn't change it without notice" } },
      { id: "d", text: { es: "Si una página necesita más de 3 testid, probablemente algo está mal con su semántica HTML", en: "If a page needs more than 3 testids, something is probably wrong with its HTML semantics" } },
    ],
    correctOptionIds: ["a", "c", "d"],
    explanation: {
      es: "`data-testid` NO debe ser tu primera opción — está casi al final de la jerarquía de preferencia, justo antes de CSS/XPath. Es un escape hatch legítimo cuando no hay rol, etiqueta o texto que identifique el elemento de forma única, tiene un propósito explícito de testing (a diferencia de las clases CSS), y un exceso de testid en una página es señal de problemas de semántica HTML.",
      en: "`data-testid` should NOT be your first choice — it sits near the bottom of the preference hierarchy, just before CSS/XPath. It's a legitimate escape hatch when no role, label, or text uniquely identifies the element, it has an explicit testing purpose (unlike CSS classes), and an excess of testids on a page signals HTML semantics problems.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m3-m4",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "¿Qué hace este localizador encadenado?",
      en: "What does this chained locator do?",
    },
    codeSnippet: `const card = page.getByRole('article').filter({ hasText: 'QA Best Practices' });
const addButton = card.getByRole('button', { name: 'Add to Cart' });
await addButton.click();`,
    options: [
      { id: "a", text: { es: "Hace clic en CUALQUIER botón 'Add to Cart' de la página, ignorando el filtro de texto", en: "Clicks ANY 'Add to Cart' button on the page, ignoring the text filter" } },
      { id: "b", text: { es: "Limita la búsqueda al artículo cuyo texto contiene 'QA Best Practices', y dentro de ÉSE busca el botón 'Add to Cart'", en: "Narrows the search to the article whose text contains 'QA Best Practices', and inside THAT one looks for the 'Add to Cart' button" } },
      { id: "c", text: { es: "Lanza un error porque no se puede llamar `.getByRole()` sobre otro Locator", en: "Throws an error because you can't call `.getByRole()` on another Locator" } },
      { id: "d", text: { es: "Hace clic en todos los botones 'Add to Cart' de todos los artículos que contienen texto", en: "Clicks all 'Add to Cart' buttons in every article that contains text" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Cuando llamas `.getByRole()` (o `.locator()`) sobre un Locator existente, la búsqueda se limita a los descendientes de ese primer Locator. Aquí, `card` ya está acotado al artículo con texto 'QA Best Practices'; `card.getByRole('button', { name: 'Add to Cart' })` busca el botón SOLO dentro de esa tarjeta, no en toda la página.",
      en: "When you call `.getByRole()` (or `.locator()`) on an existing Locator, the search is scoped to descendants of that first Locator. Here, `card` is already scoped to the article with text 'QA Best Practices'; `card.getByRole('button', { name: 'Add to Cart' })` searches for the button ONLY inside that card, not the whole page.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m3-m5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M3],
    question: {
      es: "Si cambias un `<button>` por un `<div role='button'>` manteniendo el mismo texto visible, ¿qué pasa con un test que usa `getByRole('button', { name: '...' })`?",
      en: "If you change a `<button>` to a `<div role='button'>` while keeping the same visible text, what happens to a test using `getByRole('button', { name: '...' })`?",
    },
    options: [
      { id: "a", text: { es: "El test se rompe porque getByRole solo funciona con elementos <button> nativos", en: "The test breaks because getByRole only works with native <button> elements" } },
      { id: "b", text: { es: "El test sigue funcionando porque getByRole localiza por el rol ARIA, que sigue siendo 'button' aunque el elemento HTML cambie", en: "The test keeps working because getByRole locates by ARIA role, which is still 'button' even though the HTML element changed" } },
      { id: "c", text: { es: "El test pasa pero hace clic en un elemento incorrecto", en: "The test passes but clicks the wrong element" } },
      { id: "d", text: { es: "Hay que cambiar el código del test a getByRole('div', { name: '...' })", en: "You need to change the test code to getByRole('div', { name: '...' })" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Esta es justo la ventaja semántica de getByRole: describe QUÉ es el elemento funcionalmente (su rol ARIA), no CÓMO está implementado en el DOM. Un `<div role='button'>` tiene rol ARIA 'button' explícito, así que `getByRole('button', ...)` lo sigue encontrando sin cambios, a diferencia de un selector CSS como `button.btn-primary` que se rompería de inmediato.",
      en: "This is exactly getByRole's semantic advantage: it describes WHAT the element is functionally (its ARIA role), not HOW it's implemented in the DOM. A `<div role='button'>` has an explicit ARIA role of 'button', so `getByRole('button', ...)` keeps finding it unchanged, unlike a CSS selector like `button.btn-primary` which would break immediately.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },

  /* ================================================================== */
  /*  HARD (3 questions)                                                 */
  /* ================================================================== */

  {
    id: "m3-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M3],
    question: {
      es: "El catálogo añade un nuevo producto que se inserta AL PRINCIPIO de la lista (antes era append, ahora es prepend). ¿Cuál de estos dos localizadores sigue siendo fiable para encontrar el producto 'Laptop' después de ese cambio?",
      en: "The catalog adds a new product that gets inserted at the BEGINNING of the list (previously it appended, now it prepends). Which of these two locators remains reliable for finding the 'Laptop' product after that change?",
    },
    codeSnippet: `// Locator A
const productA = page.getByRole('article').nth(2);

// Locator B
const productB = page.getByRole('article').filter({ hasText: 'Laptop' });`,
    options: [
      { id: "a", text: { es: "Locator A, porque .nth() siempre es más preciso que .filter()", en: "Locator A, because .nth() is always more precise than .filter()" } },
      { id: "b", text: { es: "Locator B, porque .filter({ hasText }) busca por contenido y no depende de la posición en el DOM, que cambió", en: "Locator B, because .filter({ hasText }) searches by content and doesn't depend on DOM position, which changed" } },
      { id: "c", text: { es: "Ambos siguen siendo igual de fiables tras el cambio", en: "Both remain equally reliable after the change" } },
      { id: "d", text: { es: "Ninguno funciona porque el DOM cambió de orden", en: "Neither works because the DOM order changed" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`.nth(2)` selecciona por posición en el DOM: si el orden de inserción cambia (de append a prepend), el índice 2 ya NO apunta al mismo producto que antes — apuntará a otro distinto, causando un fallo silencioso o una aserción incorrecta. `.filter({ hasText: 'Laptop' })` busca por contenido textual: mientras el producto 'Laptop' exista en la página, sin importar su posición, el localizador sigue encontrándolo correctamente.",
      en: "`.nth(2)` selects by DOM position: if the insertion order changes (from append to prepend), index 2 no longer points to the same product as before — it will point to a different one, causing a silent failure or an incorrect assertion. `.filter({ hasText: 'Laptop' })` searches by textual content: as long as the 'Laptop' product exists on the page, regardless of its position, the locator keeps finding it correctly.",
    },
    points: 3,
    timeEstimateSeconds: 75,
  },
  {
    id: "m3-h2",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M3],
    question: {
      es: "Dado este código que combina `.filter({ has: ... })` y encadenamiento, ¿cuáles afirmaciones son correctas? (Selecciona todas las correctas)",
      en: "Given this code combining `.filter({ has: ... })` and chaining, which statements are correct? (Select all that apply)",
    },
    codeSnippet: `const inStockHeading = page
  .getByRole('article')
  .filter({ has: page.getByText('$29.99') })
  .getByRole('heading', { level: 3 });

const outOfStock = page
  .getByRole('article')
  .filter({ hasNot: page.getByText('Out of Stock') })
  .count();`,
    options: [
      { id: "a", text: { es: "`inStockHeading` localiza el heading de nivel 3 DENTRO del artículo que contiene un hijo con el texto '$29.99'", en: "`inStockHeading` locates the level-3 heading INSIDE the article that contains a child with the text '$29.99'" } },
      { id: "b", text: { es: "`.filter({ has: locator })` selecciona elementos padre que CONTIENEN un descendiente que coincide con el locator dado", en: "`.filter({ has: locator })` selects parent elements that CONTAIN a descendant matching the given locator" } },
      { id: "c", text: { es: "`.filter({ hasNot: locator })` excluye los elementos que SÍ contienen el descendiente dado, por lo que `outOfStock` cuenta solo los artículos sin el texto 'Out of Stock'", en: "`.filter({ hasNot: locator })` excludes elements that DO contain the given descendant, so `outOfStock` counts only articles without the text 'Out of Stock'" } },
      { id: "d", text: { es: "`.filter({ has: ... })` y `.filter({ hasText: ... })` son intercambiables y producen siempre el mismo resultado", en: "`.filter({ has: ... })` and `.filter({ hasText: ... })` are interchangeable and always produce the same result" } },
    ],
    correctOptionIds: ["a", "b", "c"],
    explanation: {
      es: "`.filter({ has: locator })` filtra elementos que contienen un descendiente que coincide con OTRO locator (no solo texto), lo que permite condiciones más ricas que `hasText`. `.filter({ hasNot: locator })` hace lo opuesto: excluye los que SÍ tienen ese descendiente. La opción (d) es falsa: `hasText` compara contra el texto plano del elemento, mientras que `has` evalúa un locator arbitrario (puede ser un rol, un testid, etc.) — no son intercambiables en general.",
      en: "`.filter({ has: locator })` filters elements that contain a descendant matching ANOTHER locator (not just text), allowing richer conditions than `hasText`. `.filter({ hasNot: locator })` does the opposite: it excludes those that DO have that descendant. Option (d) is false: `hasText` compares against the element's plain text, while `has` evaluates an arbitrary locator (could be a role, a testid, etc.) — they are not interchangeable in general.",
    },
    points: 3,
    timeEstimateSeconds: 85,
  },
  {
    id: "m3-h3",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M3],
    question: {
      es: "La página de catálogo tiene un `<select>` para ordenar productos, con un `<label>Sort by</label>` asociado, y un campo de búsqueda `<input type='search'>` sin etiqueta visible. Completa los dos localizadores siguiendo la jerarquía de preferencia (rol + name antes que CSS/placeholder).",
      en: "The catalog page has a `<select>` for sorting products, with an associated `<label>Sort by</label>`, and a search field `<input type='search'>` with no visible label. Complete the two locators following the preference hierarchy (role + name before CSS/placeholder).",
    },
    codeSnippet: `// 1. Sort dropdown — has a <label>Sort by</label>
const sort = page._____('combobox', { name: 'Sort by' });

// 2. Search input — <input type="search">, no visible label
const search = page._____();`,
    options: [
      { id: "a", text: { es: "1: getByRole, 2: getByRole('searchbox')", en: "1: getByRole, 2: getByRole('searchbox')" } },
      { id: "b", text: { es: "1: locator, 2: locator('input[type=search]')", en: "1: locator, 2: locator('input[type=search]')" } },
      { id: "c", text: { es: "1: getByLabel, 2: getByPlaceholder", en: "1: getByLabel, 2: getByPlaceholder" } },
      { id: "d", text: { es: "1: getByRole, 2: getByTestId('search')", en: "1: getByRole, 2: getByTestId('search')" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Un `<select>` tiene rol ARIA implícito 'combobox', así que `page.getByRole('combobox', { name: 'Sort by' })` es correcto y usa la etiqueta asociada como nombre accesible. Un `<input type='search'>` tiene rol ARIA implícito 'searchbox' — Playwright lo detecta automáticamente sin necesidad de `{ name }` si no hay etiqueta, por lo que `page.getByRole('searchbox')` es la opción más semántica, por encima de CSS o `getByPlaceholder` (que dependería de un texto de placeholder que podría cambiar o no existir).",
      en: "A `<select>` has the implicit ARIA role 'combobox', so `page.getByRole('combobox', { name: 'Sort by' })` is correct and uses the associated label as the accessible name. An `<input type='search'>` has the implicit ARIA role 'searchbox' — Playwright detects it automatically without needing `{ name }` if there's no label, so `page.getByRole('searchbox')` is the most semantic option, ranking above CSS or `getByPlaceholder` (which would depend on placeholder text that could change or not exist).",
    },
    points: 3,
    timeEstimateSeconds: 70,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
