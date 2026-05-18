/**
 * Module 5 — Page Object Model
 *
 * The most important DESIGN PATTERN in test automation. Without POM,
 * test suites grow into chaos within weeks. With POM, they scale to
 * thousands of tests across teams.
 *
 * Full bilingual lesson content for all 5 lessons in Module 5.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m5-page-object-model";

/* ================================================================== */
/*  Lesson 5.1 — Why POM matters                                       */
/* ================================================================== */

const L5_1: LessonContent = {
  id: "m5-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "El día que un botón cambia y 50 tests se rompen", en: "The day a button changes and 50 tests break" },
    },
    {
      type: "paragraph",
      content: {
        es: "Imagina que tienes 50 tests y tu equipo de desarrollo cambia el `id` de un botón de `#login-btn` a `#signin-btn`. Sin Page Object Model, tienes que buscar y reemplazar ese selector en 50 archivos. Con POM, cambias UNA línea. Esta lección te muestra por qué POM no es opcional: es la diferencia entre un proyecto de testing que escala y uno que colapsa.",
        en: "Imagine you have 50 tests and your dev team changes a button's `id` from `#login-btn` to `#signin-btn`. Without Page Object Model, you must find and replace that selector in 50 files. With POM, you change ONE line. This lesson shows you why POM is not optional: it's the difference between a test project that scales and one that collapses.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "El problema: selectores duplicados", en: "The problem: duplicated selectors" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// BEFORE: Flat tests — every test repeats the same locators
// If ANY selector changes, ALL of these tests break

test('admin can view catalog after login', async ({ page }) => {
  await page.goto('/playground/login');
  await page.getByLabel('Email').fill('admin@playq.test');
  await page.getByLabel('Password').fill('Admin123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/catalog');
  await expect(page.getByRole('heading', { name: 'Catalog' }))
    .toBeVisible();
});

test('admin can view cart after login', async ({ page }) => {
  // SAME LOGIN CODE — duplicated!
  await page.goto('/playground/login');
  await page.getByLabel('Email').fill('admin@playq.test');
  await page.getByLabel('Password').fill('Admin123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/cart');
  await expect(page.getByRole('heading', { name: 'Cart' }))
    .toBeVisible();
});

test('admin can view table data after login', async ({ page }) => {
  // SAME LOGIN CODE — duplicated again!
  await page.goto('/playground/login');
  await page.getByLabel('Email').fill('admin@playq.test');
  await page.getByLabel('Password').fill('Admin123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/table');
  await expect(page.getByRole('heading', { name: 'Data Table' }))
    .toBeVisible();
});`,
      caption: {
        es: "3 tests, 3 copias del mismo flujo de login. Una pesadilla de mantenimiento.",
        en: "3 tests, 3 copies of the same login flow. A maintenance nightmare.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';
import { type Page, type Locator } from '@playwright/test';

// AFTER: POM — locators live in ONE place

class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/playground/login');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }
}

// Tests now READ like user stories
test('admin can view catalog after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('admin@playq.test', 'Admin123!');
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/catalog');
  await expect(page.getByRole('heading', { name: 'Catalog' }))
    .toBeVisible();
});

test('admin can view cart after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('admin@playq.test', 'Admin123!');
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/cart');
  await expect(page.getByRole('heading', { name: 'Cart' }))
    .toBeVisible();
});

test('admin can view table data after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('admin@playq.test', 'Admin123!');
  await expect(page.getByText('Login Successful')).toBeVisible();

  await page.goto('/playground/table');
  await expect(page.getByRole('heading', { name: 'Data Table' }))
    .toBeVisible();
});`,
      caption: {
        es: "Misma funcionalidad, pero los selectores de login viven en UNA sola clase. Si el botón cambia, editas una línea.",
        en: "Same functionality, but login selectors live in ONE class. If the button changes, you edit one line.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 LA REGLA DE LOS 50 TESTS: Cada vez que duplicas un selector en más de un test, estás sembrando una deuda técnica que te cobrarás con horas de debugging cuando la UI cambie. Con POM, un cambio de UI = un cambio de código = todos los tests se actualizan automáticamente.",
        en: "🔑 THE 50-TESTS RULE: Every time you duplicate a selector across tests, you're planting technical debt that you'll pay back in hours of debugging when the UI changes. With POM, one UI change = one code change = all tests update automatically.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "POM en una frase", en: "POM in one sentence" },
    },
    {
      type: "paragraph",
      content: {
        es: "POM encapsula los localizadores y las acciones de una página detrás de nombres de métodos con significado de negocio. En lugar de `page.getByLabel('Email').fill('test@test.com')`, escribes `loginPage.signIn('test@test.com', 'pass')`. Tus tests pasan de ser instrucciones de DOM a narrativas de negocio que cualquier persona del equipo — incluido el Product Owner — puede leer.",
        en: "POM encapsulates a page's locators and actions behind business-meaningful method names. Instead of `page.getByLabel('Email').fill('test@test.com')`, you write `loginPage.signIn('test@test.com', 'pass')`. Your tests go from DOM instructions to business narratives that anyone on the team — including the Product Owner — can read.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Piensa en POM como una API para tu aplicación. La clase LoginPage es la interfaz pública que tus tests consumen. Sus métodos son los 'endpoints' de esa API. El código de bajo nivel (selectores, waits) queda encapsulado dentro de la clase y es invisible para los tests.",
        en: "💡 Think of POM as an API for your application. The LoginPage class is the public interface your tests consume. Its methods are the 'endpoints' of that API. The low-level code (selectors, waits) stays encapsulated inside the class and is invisible to tests.",
      },
    },
    {
      type: "quiz",
      questionId: "m5-l1-quiz",
      question: {
        es: "¿Cuál es el beneficio PRINCIPAL del Page Object Model?",
        en: "What is the MAIN benefit of the Page Object Model?",
      },
      options: [
        { id: "a", text: { es: "Hace que los tests se ejecuten más rápido porque los selectores están pre-cargados", en: "It makes tests run faster because selectors are pre-loaded" } },
        { id: "b", text: { es: "Centraliza los localizadores para que un cambio en la UI requiera modificar UNA sola clase en lugar de N tests", en: "It centralises locators so a UI change requires modifying ONE class instead of N tests" } },
        { id: "c", text: { es: "Elimina la necesidad de usar aserciones en los tests", en: "It eliminates the need to use assertions in tests" } },
        { id: "d", text: { es: "Permite ejecutar tests sin abrir el navegador", en: "It allows running tests without opening the browser" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El beneficio principal de POM es la centralización del mantenimiento. Cuando la UI cambia — y siempre cambia — solo necesitas actualizar los selectores en la clase de página correspondiente. Todos los tests que usan esa clase se benefician automáticamente del cambio. Sin POM, cada test duplica los selectores y un cambio de UI se convierte en una búsqueda interminable de 'find & replace'.",
        en: "The main benefit of POM is centralised maintenance. When the UI changes — and it always does — you only need to update selectors in the corresponding page class. All tests using that class automatically benefit from the change. Without POM, every test duplicates selectors and a UI change becomes an endless 'find & replace' hunt.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 5.2 — Building your first Page class                        */
/* ================================================================== */

const L5_2: LessonContent = {
  id: "m5-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Una clase para gobernarlos a todos", en: "One class to rule them all" },
    },
    {
      type: "paragraph",
      content: {
        es: "Una Page class no es más que una clase de TypeScript que recibe `page: Page` en su constructor y expone métodos que representan acciones de usuario. Vamos a construir una paso a paso usando la página de login del PlayQ Playground como ejemplo.",
        en: "A Page class is nothing more than a TypeScript class that receives `page: Page` in its constructor and exposes methods that represent user actions. Let's build one step by step using the PlayQ Playground login page as an example.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Anatomía de una Page Object", en: "Anatomy of a Page Object" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  // ── Properties: typed locators ──
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly rememberCheckbox: Locator;
  readonly errorAlert: Locator;

  // ── Constructor: initialise locators ──
  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.rememberCheckbox = page.getByRole('checkbox', {
      name: 'Remember me',
    });
    this.errorAlert = page.getByRole('alert');
  }

  // ── Navigation ──
  async goto(): Promise<void> {
    await this.page.goto('/playground/login');
  }

  // ── Actions (business-meaningful method names) ──
  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async signInAndRemember(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.rememberCheckbox.check();
    await this.signInButton.click();
  }

  async submitEmptyForm(): Promise<void> {
    await this.signInButton.click();
  }

  // ── Queries (return data, NOT assertions) ──
  async getErrorMessage(): Promise<string | null> {
    if (await this.errorAlert.isVisible()) {
      return await this.errorAlert.textContent();
    }
    return null;
  }
}`,
      caption: {
        es: "LoginPage completa: propiedades, constructor, acciones y queries",
        en: "Complete LoginPage: properties, constructor, actions, and queries",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Localizadores como propiedades", en: "Locators as properties" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Cada localizador se declara como propiedad de la clase
// Esto es el núcleo del patrón: UN solo lugar donde vive cada selector

readonly page: Page;
readonly emailInput: Locator;
readonly passwordInput: Locator;
readonly signInButton: Locator;

constructor(page: Page) {
  this.page = page;
  // Inicializa los localizadores UNA vez en el constructor
  this.emailInput = page.getByLabel('Email');
  this.passwordInput = page.getByLabel('Password');
  // Usa localizadores semánticos (jerarquía de preferencia del Módulo 3)
  this.signInButton = page.getByRole('button', { name: 'Sign In' });
}`,
      caption: {
        es: "Los localizadores se declaran como propiedades readonly y se inicializan en el constructor",
        en: "Locators are declared as readonly properties and initialised in the constructor",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Métodos de acción", en: "Action methods" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Métodos de acción: componen interacciones atómicas en flujos de usuario
// Su nombre describe la intención del usuario, no la mecánica del DOM

// ❌ MAL: método que suena a operación DOM
async fillEmailFieldAndClickSignIn(): Promise<void> { ... }

// ✅ BIEN: método que suena a intención de negocio
async signIn(email: string, password: string): Promise<void> {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.signInButton.click();
}

// ✅ BIEN: variante con semántica clara
async signInAndRemember(email: string, password: string): Promise<void> {
  await this.emailInput.fill(email);
  await this.passwordInput.fill(password);
  await this.rememberCheckbox.check();
  await this.signInButton.click();
}

// ✅ BIEN: método específico para un escenario concreto
async submitEmptyForm(): Promise<void> {
  await this.signInButton.click();
}`,
      caption: {
        es: "Nombres de métodos que leen como intenciones de usuario, no como operaciones DOM",
        en: "Method names that read like user intentions, not DOM operations",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Nombra tus métodos como si se los estuvieras explicando a un Product Owner. `signIn(email, pass)` es comprensible para cualquiera. `fillEmailAndPasswordAndClickLoginButton()` revela detalles de implementación que no deberían importarle al test.",
        en: "💡 Name your methods as if you were explaining them to a Product Owner. `signIn(email, pass)` is understandable to anyone. `fillEmailAndPasswordAndClickLoginButton()` reveals implementation details the test shouldn't care about.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Dónde van las aserciones?",
        en: "Where do assertions go?",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Las aserciones NO pertenecen al Page Object. El POM expone localizadores y devuelve datos; los TESTS hacen las verificaciones. Esta separación mantiene las clases de página reutilizables en diferentes contextos de test donde las condiciones de éxito pueden variar. Si metes `expect(...)` dentro del POM, limitas su reutilización: un test que espera un error no puede usar el mismo método que uno que espera éxito.",
        en: "Assertions do NOT belong in the Page Object. The POM exposes locators and returns data; the TESTS perform the verifications. This separation keeps page classes reusable across different test contexts where success conditions may vary. If you put `expect(...)` inside the POM, you limit its reuse: a test expecting an error can't use the same method as one expecting success.",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// ✅ CORRECT: Assertions in the TEST, not in the POM
test('successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('student@playq.test', 'Playwright123!');

  // Assertions here — the test decides what "success" means
  await expect(page.getByText('Login Successful')).toBeVisible();
  await expect(page.getByText('Welcome back')).toBeVisible();
});

test('failed login shows error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('student@playq.test', 'WrongPass');

  // Different assertions for the same signIn() method!
  const errorText = await loginPage.getErrorMessage();
  expect(errorText).toContain('Invalid email or password');
});

test('empty form shows validation errors', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.submitEmptyForm();

  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Password is required')).toBeVisible();
});`,
      caption: {
        es: "Mismo método signIn() reutilizado en 3 escenarios distintos con aserciones diferentes",
        en: "Same signIn() method reused across 3 different scenarios with different assertions",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ Excepción: puedes incluir aserciones de 'sanity check' dentro del POM si son invariantes (ej: verificar que la página cargó correctamente en goto()). Pero las aserciones de negocio — 'el login fue exitoso', 'el producto se añadió al carrito' — pertenecen exclusivamente a los tests.",
        en: "⚠️ Exception: you can include 'sanity check' assertions inside the POM if they are invariants (e.g., verify the page loaded correctly in goto()). But business assertions — 'login was successful', 'product was added to cart' — belong exclusively in tests.",
      },
    },
    {
      type: "quiz",
      questionId: "m5-l2-quiz",
      question: {
        es: "Según las buenas prácticas de POM, ¿dónde deben ir las aserciones de negocio como 'el login fue exitoso'?",
        en: "According to POM best practices, where should business assertions like 'login was successful' go?",
      },
      options: [
        { id: "a", text: { es: "Dentro de la Page class, en el método signIn(), para que todos los tests se beneficien", en: "Inside the Page class, in the signIn() method, so all tests benefit" } },
        { id: "b", text: { es: "En los tests que consumen la Page class — el POM solo expone localizadores y ejecuta acciones", en: "In the tests that consume the Page class — the POM only exposes locators and executes actions" } },
        { id: "c", text: { es: "En un archivo separado de 'assertions' que importa la Page class", en: "In a separate 'assertions' file that imports the Page class" } },
        { id: "d", text: { es: "En el constructor de la Page class como validación inicial", en: "In the Page class constructor as initial validation" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Las aserciones de negocio pertenecen a los tests. El POM es una capa de abstracción que modela la página: sabe DÓNDE están los elementos y CÓMO interactuar con ellos. Pero QUÉ constituye un resultado exitoso es decisión del test. Un mismo método signIn() puede ser el preludio de un test de catálogo (donde el éxito es ver productos), de un test de carrito (donde el éxito es ver el checkout), o de un test de error (donde el 'éxito' es que aparezca un mensaje de error).",
        en: "Business assertions belong in tests. The POM is an abstraction layer that models the page: it knows WHERE elements are and HOW to interact with them. But WHAT constitutes a successful result is the test's decision. The same signIn() method can be the prelude to a catalog test (where success is seeing products), a cart test (where success is seeing checkout), or an error test (where 'success' is seeing an error message).",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 5.3 — Composing Page Objects                                */
/* ================================================================== */

const L5_3: LessonContent = {
  id: "m5-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Tu página no vive sola: tiene navbar, footer, sidebar", en: "Your page doesn't live alone: it has navbar, footer, sidebar" },
    },
    {
      type: "paragraph",
      content: {
        es: "Las aplicaciones reales tienen componentes compartidos que aparecen en múltiples páginas: una navbar, un footer, un sidebar. Duplicar el código de estos componentes en cada Page class es el mismo error que duplicar selectores en tests. La solución: componer Page Objects usando objetos más pequeños.",
        en: "Real applications have shared components that appear on multiple pages: a navbar, a footer, a sidebar. Duplicating these components' code in every Page class is the same mistake as duplicating selectors in tests. The solution: compose Page Objects using smaller objects.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Clases de componente", en: "Component classes" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, type Locator } from '@playwright/test';

// A Navbar is a component, NOT a full page
// It appears on every playground screen
export class PlaygroundNav {
  readonly page: Page;
  readonly loginTab: Locator;
  readonly catalogTab: Locator;
  readonly cartTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginTab = page.getByRole('link', { name: 'Login' });
    this.catalogTab = page.getByRole('link', { name: 'Catalog' });
    this.cartTab = page.getByRole('link', { name: 'Cart' });
  }

  async goToLogin(): Promise<LoginPage> {
    await this.loginTab.click();
    return new LoginPage(this.page);
  }

  async goToCatalog(): Promise<CatalogPage> {
    await this.catalogTab.click();
    return new CatalogPage(this.page);
  }

  async goToCart(): Promise<CartPage> {
    await this.cartTab.click();
    return new CartPage(this.page);
  }
}`,
      caption: {
        es: "PlaygroundNav: una clase de componente que modela la barra de navegación compartida",
        en: "PlaygroundNav: a component class that models the shared navigation bar",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Las páginas contienen componentes", en: "Pages contain components" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, type Locator } from '@playwright/test';
import { PlaygroundNav } from './PlaygroundNav';

// LoginPage HAS-A PlaygroundNav (composition)
export class LoginPage {
  readonly page: Page;
  readonly nav: PlaygroundNav; // <-- component composed in
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new PlaygroundNav(page); // <-- initialise once
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/playground/login');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // Navigate to catalog using the composed nav
  async goToCatalog(): Promise<CatalogPage> {
    return await this.nav.goToCatalog();
  }
}

// Test using composition
test('login then navigate to catalog via nav', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.signIn('student@playq.test', 'Playwright123!');

  // Composition: LoginPage delegates navigation to its Nav
  const catalogPage = await loginPage.goToCatalog();
  // catalogPage is now ready with its own methods...
});`,
      caption: {
        es: "LoginPage compone PlaygroundNav. La navegación se delega al componente compartido.",
        en: "LoginPage composes PlaygroundNav. Navigation is delegated to the shared component.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Prefiere COMPOSICIÓN (LoginPage HAS-A Navbar) sobre HERENCIA (LoginPage IS-A BasePage). La composición es más flexible: puedes añadir, quitar o reemplazar componentes sin romper la jerarquía de clases. Si mañana el Navbar cambia de diseño, solo editas PlaygroundNav — todas las páginas que lo componen se actualizan automáticamente.",
        en: "💡 Prefer COMPOSITION (LoginPage HAS-A Navbar) over INHERITANCE (LoginPage IS-A BasePage). Composition is more flexible: you can add, remove, or replace components without breaking the class hierarchy. If tomorrow the Navbar's design changes, you only edit PlaygroundNav — all pages that compose it update automatically.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Compartir vía fixtures (avance del Módulo 6)",
        en: "Sharing via fixtures (Module 6 preview)",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test as base, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

// Playwright fixtures: inject page objects into tests automatically
// This eliminates the 'new LoginPage(page)' boilerplate from every test

const test = base.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    // Setup: create the page object and navigate to login
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Pass the fixture to the test
    await use(loginPage);

    // Teardown would go here (not needed for this fixture)
  },
});

// Tests receive loginPage already initialised — no boilerplate!
test('successful login via fixture', async ({ loginPage }) => {
  await loginPage.signIn('student@playq.test', 'Playwright123!');
  await expect(loginPage.page.getByText('Login Successful'))
    .toBeVisible();
});

test('failed login via same fixture', async ({ loginPage }) => {
  await loginPage.signIn('student@playq.test', 'WrongPass');
  await expect(loginPage.page.getByRole('alert')).toBeVisible();
});`,
      caption: {
        es: "test.extend() inyecta el Page Object como fixture, eliminando la inicialización repetitiva",
        en: "test.extend() injects the Page Object as a fixture, eliminating repetitive initialisation",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "📘 El Módulo 6 (Configuración y Entornos) cubre los fixtures en profundidad: cómo declararlos, compartirlos entre archivos con fixtures.ts, y cómo combinarlos para flujos complejos. Este avance es solo para que veas el destino final de un buen diseño POM.",
        en: "📘 Module 6 (Configuration and Environments) covers fixtures in depth: how to declare them, share them across files with fixtures.ts, and combine them for complex flows. This preview is just so you can see the final destination of good POM design.",
      },
    },
    {
      type: "quiz",
      questionId: "m5-l3-quiz",
      question: {
        es: "¿Por qué se recomienda composición sobre herencia en Page Objects?",
        en: "Why is composition recommended over inheritance in Page Objects?",
      },
      options: [
        { id: "a", text: { es: "Porque TypeScript no soporta herencia de clases", en: "Because TypeScript doesn't support class inheritance" } },
        { id: "b", text: { es: "Porque la composición permite añadir, quitar o reemplazar componentes compartidos sin afectar la jerarquía de clases, haciendo el código más flexible y mantenible", en: "Because composition allows adding, removing, or replacing shared components without affecting the class hierarchy, making code more flexible and maintainable" } },
        { id: "c", text: { es: "Porque la herencia hace que los tests fallen aleatoriamente", en: "Because inheritance makes tests fail randomly" } },
        { id: "d", text: { es: "Porque Playwright solo permite composición, no herencia", en: "Because Playwright only allows composition, not inheritance" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "La composición (`LoginPage HAS-A Navbar`) es más flexible que la herencia (`LoginPage IS-A BasePageWithNavbar`). Con composición, cada página decide exactamente qué componentes necesita. Si una página no tiene sidebar, simplemente no lo compone. Si quieres cambiar la implementación del Navbar, solo modificas la clase PlaygroundNav y todas las páginas que la usan se actualizan. La herencia crea jerarquías rígidas que son difíciles de modificar cuando los requisitos cambian.",
        en: "Composition (`LoginPage HAS-A Navbar`) is more flexible than inheritance (`LoginPage IS-A BasePageWithNavbar`). With composition, each page decides exactly which components it needs. If a page has no sidebar, you simply don't compose it. If you want to change the Navbar implementation, you only modify the PlaygroundNav class and all pages using it update. Inheritance creates rigid hierarchies that are hard to modify when requirements change.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 5.4 — POM with TypeScript interfaces                        */
/* ================================================================== */

const L5_4: LessonContent = {
  id: "m5-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Contratos que el compilador hace cumplir", en: "Contracts the compiler enforces" },
    },
    {
      type: "paragraph",
      content: {
        es: "TypeScript eleva POM al siguiente nivel. Las interfaces definen contratos explícitos entre tus Page Objects y los tests que los consumen. Los tipos te avisan en tiempo de compilación si pasas un argumento incorrecto o si olvidas manejar un valor potencialmente nulo. Aquí aprenderás los 4 pilares del POM tipado: interfaces, readonly, return types y genéricos.",
        en: "TypeScript elevates POM to the next level. Interfaces define explicit contracts between your Page Objects and the tests that consume them. Types warn you at compile time if you pass an incorrect argument or forget to handle a potentially null value. Here you'll learn the 4 pillars of typed POM: interfaces, readonly, return types, and generics.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Interfaces tipadas para parámetros", en: "Typed interfaces for parameters" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, type Locator } from '@playwright/test';

// Interface defines the shape of login credentials
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean; // optional: defaults to false
}

// Interface for expected errors
export interface LoginError {
  message: string;
  visible: boolean;
}

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly rememberCheckbox: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    this.rememberCheckbox = page.getByRole('checkbox', {
      name: 'Remember me',
    });
    this.errorAlert = page.getByRole('alert');
  }

  async goto(): Promise<void> {
    await this.page.goto('/playground/login');
  }

  // Method accepts a typed interface, not loose strings
  async signIn(credentials: LoginCredentials): Promise<void> {
    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    if (credentials.rememberMe) {
      await this.rememberCheckbox.check();
    }
    await this.signInButton.click();
  }

  async getError(): Promise<LoginError> {
    const visible = await this.errorAlert.isVisible();
    const message = visible
      ? (await this.errorAlert.textContent()) ?? ''
      : '';
    return { message, visible };
  }
}`,
      caption: {
        es: "LoginCredentials y LoginError: interfaces que definen contratos de entrada y salida",
        en: "LoginCredentials and LoginError: interfaces defining input and output contracts",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';
import { LoginPage, type LoginCredentials } from './pages/LoginPage';

test('typed signIn with interface', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  // TypeScript checks this object matches LoginCredentials
  const creds: LoginCredentials = {
    email: 'student@playq.test',
    password: 'Playwright123!',
    rememberMe: true,
    // If you misspell 'email' as 'emial', tsc catches it
  };

  await loginPage.signIn(creds);
  await expect(page.getByText('Login Successful')).toBeVisible();
});

test('typed error handling', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  await loginPage.signIn({
    email: 'student@playq.test',
    password: 'WrongPass',
  });

  const error = await loginPage.getError();
  // TypeScript knows error.message is string, error.visible is boolean
  expect(error.visible).toBe(true);
  expect(error.message).toContain('Invalid email or password');
});`,
      caption: {
        es: "Tests que consumen las interfaces tipadas — TypeScript valida todo en tiempo de compilación",
        en: "Tests consuming typed interfaces — TypeScript validates everything at compile time",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Localizadores readonly", en: "readonly locators" },
    },
    {
      type: "code",
      language: "typescript",
      code: `export class LoginPage {
  // ✅ readonly: prevents accidental reassignment
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async signIn(credentials: LoginCredentials): Promise<void> {
    // ❌ TypeScript ERROR if you try to reassign:
    // this.signInButton = page.getByRole('button', { name: 'Log In' });
    //                       ^ Cannot assign to 'signInButton'
    //                         because it is a read-only property.

    await this.emailInput.fill(credentials.email);
    await this.passwordInput.fill(credentials.password);
    await this.signInButton.click();
  }
}`,
      caption: {
        es: "El modificador readonly evita la reasignación accidental de localizadores",
        en: "The readonly modifier prevents accidental reassignment of locators",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Los localizadores DEBEN ser `readonly`. Si un método reasigna accidentalmente `this.signInButton`, rompe todos los tests que usan ese localizador, y el bug es silencioso hasta que los tests fallan. Con `readonly`, TypeScript te avisa en el momento en que escribes la reasignación incorrecta. Cero bugs silenciosos.",
        en: "🔑 Locators MUST be `readonly`. If a method accidentally reassigns `this.signInButton`, it breaks all tests using that locator, and the bug is silent until tests fail. With `readonly`, TypeScript warns you the moment you write the incorrect reassignment. Zero silent bugs.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Tipos de retorno explícitos", en: "Explicit return types" },
    },
    {
      type: "code",
      language: "typescript",
      code: `export class CatalogPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Action: performs side effects, returns nothing
  async addFirstProductToCart(): Promise<void> {
    await this.page
      .getByRole('button', { name: 'Add to Cart' })
      .first()
      .click();
  }

  // Query: returns a Locator the test can assert on
  getProductCards(): Locator {
    return this.page.getByRole('article');
  }

  // Query: returns data the test can inspect
  async getProductCount(): Promise<number> {
    return await this.page.getByRole('article').count();
  }

  // Query: returns a string or null
  async getFirstProductName(): Promise<string | null> {
    const first = this.page.getByRole('article').first();
    if (!(await first.isVisible())) return null;
    return await first.getByRole('heading').textContent();
  }
}`,
      caption: {
        es: "Métodos con tipos de retorno explícitos: Promise<void>, Locator, Promise<number>, Promise<string | null>",
        en: "Methods with explicit return types: Promise<void>, Locator, Promise<number>, Promise<string | null>",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Los tipos de retorno explícitos documentan tu API sin necesidad de comentarios. Un método que devuelve `Promise<string | null>` le dice al consumidor: 'esto puede darte un string o null, maneja ambos casos'. Sin el tipo explícito, TypeScript inferiría el tipo correcto, pero el desarrollador que lee tu código tendría que navegar a la implementación para saberlo.",
        en: "💡 Explicit return types document your API without needing comments. A method returning `Promise<string | null>` tells the consumer: 'this may give you a string or null, handle both cases'. Without the explicit type, TypeScript would infer the correct type, but a developer reading your code would have to navigate to the implementation to know.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Patrones genéricos", en: "Generic patterns" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { type Page, type Locator } from '@playwright/test';

// Generic POM: reusable form handler for any shape of data
export class FormPage<T extends Record<string, string | boolean>> {
  readonly page: Page;
  private fieldLocators: Partial<Record<keyof T, Locator>> = {};
  private checkboxLocators: Partial<Record<keyof T, Locator>> = {};

  constructor(
    page: Page,
    fieldMapping: Record<keyof T, string>,
    checkboxMapping?: Partial<Record<keyof T, string>>,
  ) {
    this.page = page;
    for (const [key, label] of Object.entries(fieldMapping)) {
      this.fieldLocators[key as keyof T] = page.getByLabel(label);
    }
    if (checkboxMapping) {
      for (const [key, label] of Object.entries(checkboxMapping)) {
        this.checkboxLocators[key as keyof T] = page.getByRole('checkbox', { name: label });
      }
    }
  }

  async fill(data: Partial<T>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        const locator = this.fieldLocators[key as keyof T];
        if (locator) await locator.fill(value);
      } else if (typeof value === 'boolean') {
        const locator = this.checkboxLocators[key as keyof T];
        if (locator && value) await locator.check();
      }
    }
  }
}

// Usage: define the data shape and field mapping once
interface SignupData {
  fullName: string;
  email: string;
  newsletter: boolean;
}

const signupForm = new FormPage<SignupData>(
  page,
  { fullName: 'Full Name', email: 'Email' },
  { newsletter: 'Subscribe to newsletter' },
);

await signupForm.fill({
  fullName: 'Jane Doe',
  email: 'jane@test.com',
  newsletter: true,
});`,
      caption: {
        es: "FormPage<T> genérico: un solo componente reutilizable para cualquier formulario de la aplicación",
        en: "Generic FormPage<T>: a single reusable component for any form in the application",
      },
    },
    {
      type: "quiz",
      questionId: "m5-l4-quiz",
      question: {
        es: "¿Por qué es importante declarar los localizadores como `readonly` en una Page class?",
        en: "Why is it important to declare locators as `readonly` in a Page class?",
      },
      options: [
        { id: "a", text: { es: "Porque Playwright requiere que todos los Locator sean readonly", en: "Because Playwright requires all Locators to be readonly" } },
        { id: "b", text: { es: "Para evitar la reasignación accidental: si un método sobrescribe un localizador, rompe silenciosamente todos los tests que dependen de él. readonly hace que TypeScript detecte este error en compilación", en: "To prevent accidental reassignment: if a method overwrites a locator, it silently breaks all tests that depend on it. readonly makes TypeScript catch this error at compile time" } },
        { id: "c", text: { es: "Porque mejora el rendimiento de los tests al evitar que Playwright recalcule los localizadores", en: "Because it improves test performance by preventing Playwright from recalculating locators" } },
        { id: "d", text: { es: "Es solo una convención de estilo, no tiene impacto funcional", en: "It's just a style convention, it has no functional impact" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El modificador `readonly` es una red de seguridad. Sin él, un método podría accidentalmente hacer `this.signInButton = page.locator('.btn')` y romper silenciosamente todos los tests que usan ese localizador. Este tipo de bug es especialmente peligroso porque los tests pueden seguir pasando (si el nuevo localizador también funciona parcialmente) pero produciendo falsos positivos. `readonly` convierte un bug de runtime en un error de compilación.",
        en: "The `readonly` modifier is a safety net. Without it, a method could accidentally do `this.signInButton = page.locator('.btn')` and silently break all tests using that locator. This type of bug is especially dangerous because tests may still pass (if the new locator also partially works) but produce false positives. `readonly` turns a runtime bug into a compile-time error.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 5.5 — Practical Exercise: Refactor tests to POM              */
/* ================================================================== */

const L5_5: LessonContent = {
  id: "m5-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "Del caos al orden en 30 minutos",
        en: "From chaos to order in 30 minutes",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Este ejercicio consolida todo lo aprendido en el Módulo 5. Vas a tomar un suite de tests plana — llena de localizadores duplicados y lógica de navegación repetida — y refactorizarla usando Page Object Model con TypeScript estricto. Al terminar, habrás escrito tu primera suite de tests profesional con POM.",
        en: "This exercise consolidates everything learned in Module 5. You'll take a flat test suite — full of duplicated locators and repeated navigation logic — and refactor it using Page Object Model with strict TypeScript. By the end, you'll have written your first professional test suite with POM.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 LEE el código plano primero. Identifica los localizadores que se repiten en múltiples tests y la lógica de pasos del wizard que se duplica. LUEGO refactoriza. No escribas la Page class antes de entender el problema.",
        en: "💡 READ the flat code first. Identify the locators that repeat across multiple tests and the wizard step logic that is duplicated. THEN refactor. Don't write the Page class before understanding the problem.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m5-l5-exercise",
      instructions: {
        es: "Vas a refactorizar un suite de tests desordenado para /playground/signup (el wizard multi-paso) en una implementación limpia basada en POM.\n\nEl código inicial muestra 3 tests planos que duplican localizadores y lógica de navegación entre pasos. Tu trabajo:\n1) Crear una clase SignupWizardPage con métodos para cada paso\n2) Encapsular localizadores como propiedades readonly\n3) Añadir interfaces de TypeScript para los datos del formulario (PersonalInfo, AccountInfo, Preferences)\n4) Refactorizar los 3 tests para usar la nueva clase\n\nObjetivo: los tests deben leerse como escenarios de negocio, no como manipulación del DOM.",
        en: "You'll refactor a messy test suite for /playground/signup (the multi-step wizard) into a clean POM-based implementation.\n\nThe starter code shows 3 flat tests duplicating locators and step-navigation logic. Your job:\n1) Create a SignupWizardPage class with methods for each step\n2) Encapsulate locators as readonly properties\n3) Add TypeScript interfaces for the form data (PersonalInfo, AccountInfo, Preferences)\n4) Refactor the 3 tests to use the new class\n\nGoal: the tests should read like business scenarios, not DOM manipulation.",
      },
      starterCode: `import { test, expect } from '@playwright/test';

// Flat tests — lots of duplication, no POM
test('successful sign up completes all steps',
  async ({ page }) => {
  await page.goto('/playground/signup');

  // Step 1: Personal info
  await page.getByLabel('Full name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane@example.com');
  await page.getByLabel('Date of birth').fill('1990-05-15');
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 2: Account info
  await page.getByLabel('Username').fill('janedoe');
  await page.getByLabel('Password', { exact: true })
    .fill('SecurePass1!');
  await page.getByLabel('Confirm password')
    .fill('SecurePass1!');
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 3: Preferences
  await page.getByLabel('Newsletter').check();
  await page.getByLabel('Country').selectOption('Spain');
  await page.getByLabel('Email notifications').check();
  await page.getByRole('button', { name: 'Next' }).click();

  // Step 4: Review & submit
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByText('Account created successfully'))
    .toBeVisible();
});

test('cannot proceed past step 1 with empty email',
  async ({ page }) => {
  await page.goto('/playground/signup');
  await page.getByLabel('Full name').fill('Jane Doe');
  await page.getByLabel('Date of birth').fill('1990-05-15');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Email is required'))
    .toBeVisible();
});

test('password mismatch blocks step 2', async ({ page }) => {
  await page.goto('/playground/signup');
  await page.getByLabel('Full name').fill('Jane Doe');
  await page.getByLabel('Email').fill('jane@example.com');
  await page.getByLabel('Date of birth').fill('1990-05-15');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByLabel('Username').fill('janedoe');
  await page.getByLabel('Password', { exact: true })
    .fill('SecurePass1!');
  await page.getByLabel('Confirm password')
    .fill('DifferentPass1!');
  await page.getByRole('button', { name: 'Next' }).click();

  await expect(page.getByText('Passwords do not match'))
    .toBeVisible();
});`,
      solution: `// pages/SignupWizardPage.ts
import { type Page, type Locator } from '@playwright/test';

export interface PersonalInfo {
  fullName: string;
  email: string;
  dateOfBirth: string;
}

export interface AccountInfo {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface Preferences {
  newsletter: boolean;
  country: string;
  emailNotifications: boolean;
}

export class SignupWizardPage {
  readonly page: Page;
  readonly nextButton: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'Next' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
  }

  async goto(): Promise<void> {
    await this.page.goto('/playground/signup');
  }

  async fillPersonalInfo(info: PersonalInfo): Promise<void> {
    await this.page.getByLabel('Full name').fill(info.fullName);
    await this.page.getByLabel('Email').fill(info.email);
    await this.page.getByLabel('Date of birth')
      .fill(info.dateOfBirth);
  }

  async fillAccountInfo(info: AccountInfo): Promise<void> {
    await this.page.getByLabel('Username').fill(info.username);
    await this.page.getByLabel('Password', { exact: true })
      .fill(info.password);
    await this.page.getByLabel('Confirm password')
      .fill(info.confirmPassword);
  }

  async setPreferences(prefs: Preferences): Promise<void> {
    if (prefs.newsletter) {
      await this.page.getByLabel('Newsletter').check();
    }
    await this.page.getByLabel('Country')
      .selectOption(prefs.country);
    if (prefs.emailNotifications) {
      await this.page.getByLabel('Email notifications').check();
    }
  }

  async goToNextStep(): Promise<void> {
    await this.nextButton.click();
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }
}

// Tests refactored
import { test, expect } from '@playwright/test';
import { SignupWizardPage } from './pages/SignupWizardPage';

test('successful sign up completes all steps',
  async ({ page }) => {
  const wizard = new SignupWizardPage(page);
  await wizard.goto();

  await wizard.fillPersonalInfo({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    dateOfBirth: '1990-05-15',
  });
  await wizard.goToNextStep();

  await wizard.fillAccountInfo({
    username: 'janedoe',
    password: 'SecurePass1!',
    confirmPassword: 'SecurePass1!',
  });
  await wizard.goToNextStep();

  await wizard.setPreferences({
    newsletter: true,
    country: 'Spain',
    emailNotifications: true,
  });
  await wizard.goToNextStep();
  await wizard.submit();

  await expect(page.getByText('Account created successfully'))
    .toBeVisible();
});

test('cannot proceed past step 1 with empty email',
  async ({ page }) => {
  const wizard = new SignupWizardPage(page);
  await wizard.goto();

  await wizard.fillPersonalInfo({
    fullName: 'Jane Doe',
    email: '',
    dateOfBirth: '1990-05-15',
  });
  await wizard.goToNextStep();

  await expect(page.getByText('Email is required'))
    .toBeVisible();
});

test('password mismatch blocks step 2', async ({ page }) => {
  const wizard = new SignupWizardPage(page);
  await wizard.goto();

  await wizard.fillPersonalInfo({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    dateOfBirth: '1990-05-15',
  });
  await wizard.goToNextStep();

  await wizard.fillAccountInfo({
    username: 'janedoe',
    password: 'SecurePass1!',
    confirmPassword: 'DifferentPass1!',
  });
  await wizard.goToNextStep();

  await expect(page.getByText('Passwords do not match'))
    .toBeVisible();
});`,
      hints: [
        {
          es: "Empieza creando una clase con `page: Page` inyectado en el constructor. Añade localizadores readonly para los elementos que se usan en múltiples tests (botón Next, botón Submit).",
          en: "Start by creating a class with `page: Page` injected in the constructor. Add readonly locators for elements used in multiple tests (Next button, Submit button).",
        },
        {
          es: "Agrupa los campos relacionados en interfaces tipadas (PersonalInfo, AccountInfo, Preferences). Los métodos de la clase aceptan estas interfaces como un solo argumento, manteniendo las firmas limpias.",
          en: "Group related fields into typed interfaces (PersonalInfo, AccountInfo, Preferences). The class methods accept these interfaces as a single argument, keeping signatures clean.",
        },
        {
          es: "La lógica de cada paso se convierte en un método: fillPersonalInfo(), fillAccountInfo(), setPreferences(). Los tests simplemente llaman a estos métodos + goToNextStep().",
          en: "Each step's fill logic becomes a method: fillPersonalInfo(), fillAccountInfo(), setPreferences(). Tests just call these methods + goToNextStep().",
        },
        {
          es: "Las aserciones se QUEDAN en los tests, no en el POM. El POM expone la capacidad de llenar campos y navegar entre pasos; los tests deciden qué verificar después de cada acción.",
          en: "Assertions STAY in the tests, not in the POM. The POM exposes the ability to fill fields and navigate between steps; the tests decide what to verify after each action.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 CHECKLIST POM — Tu Page class está bien diseñada si:\n\n• ✅ Los localizadores están encapsulados como propiedades `readonly`\n• ✅ Los métodos tienen nombres de intención de usuario (`signIn`, no `fillEmailAndClick`)\n• ✅ Las interfaces de TypeScript definen la forma de los datos de entrada\n• ✅ Los tipos de retorno son explícitos (`Promise<void>`, `Promise<string | null>`, `Locator`)\n• ✅ Las aserciones de negocio viven en los tests, NO en la Page class",
        en: "🔑 POM CHECKLIST — Your Page class is well designed if:\n\n• ✅ Locators encapsulated as `readonly` properties\n• ✅ Methods named after user intentions (`signIn`, not `fillEmailAndClick`)\n• ✅ TypeScript interfaces define input data shapes\n• ✅ Return types are explicit (`Promise<void>`, `Promise<string | null>`, `Locator`)\n• ✅ Business assertions live in tests, NOT in the Page class",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "¿Qué sigue?", en: "What's next?" },
    },
    {
      type: "paragraph",
      content: {
        es: "Has dominado el patrón de diseño más importante en automatización de pruebas. Con POM, tus tests pasan de ser frágiles y duplicados a ser mantenibles y escalables. En el Módulo 6 (Configuración y Entornos), aprenderás a ejecutar estos tests en múltiples navegadores simultáneamente, a gestionar variables de entorno por ambiente (dev, staging, prod), y a dominar los Playwright fixtures para inyectar tus Page Objects automáticamente en cada test. Tu suite de tests está a punto de volverse profesional.",
        en: "You've mastered the most important design pattern in test automation. With POM, your tests go from fragile and duplicated to maintainable and scalable. In Module 6 (Configuration and Environments), you'll learn to run these tests across multiple browsers simultaneously, manage environment variables per environment (dev, staging, prod), and master Playwright fixtures to inject your Page Objects automatically into every test. Your test suite is about to become professional-grade.",
      },
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_5_LESSONS: LessonContent[] = [L5_1, L5_2, L5_3, L5_4, L5_5];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_5_LESSONS;
}
