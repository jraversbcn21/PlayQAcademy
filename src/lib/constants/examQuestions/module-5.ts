/**
 * Exam question bank — Module 5: Page Object Model.
 *
 * 25 questions (10 easy, 10 medium, 5 hard) covering:
 *   - Why POM matters: duplicated selectors and the 50-tests maintenance problem
 *   - Anatomy of a Page class: constructor, readonly Locator properties, action methods
 *   - Composing Page Objects: components (e.g. PlaygroundNav) and methods returning other page objects
 *   - POM with TypeScript interfaces: typed parameters, readonly locators, explicit return types
 *   - Practical exercise: refactoring a flat signup wizard suite into a typed POM
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M5 = "m5-page-object-model";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (10 questions)                                                */
  /* ================================================================== */

  {
    id: "m5-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "Tienes 50 tests y el equipo de desarrollo cambia el `id` de un botón de `#login-btn` a `#signin-btn`. Sin Page Object Model, ¿qué tienes que hacer?",
      en: "You have 50 tests and the dev team changes a button's `id` from `#login-btn` to `#signin-btn`. Without Page Object Model, what do you have to do?",
    },
    options: [
      { id: "a", text: { es: "Nada: Playwright detecta el cambio automáticamente", en: "Nothing: Playwright detects the change automatically" } },
      { id: "b", text: { es: "Buscar y reemplazar ese selector en los 50 archivos de test", en: "Find and replace that selector across all 50 test files" } },
      { id: "c", text: { es: "Reinstalar Playwright para que reconozca el nuevo id", en: "Reinstall Playwright so it recognises the new id" } },
      { id: "d", text: { es: "Esperar a que el siguiente despliegue revierta el cambio", en: "Wait for the next deploy to revert the change" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Sin POM, cada test que usa ese botón duplica el selector, así que un cambio de UI obliga a buscar y reemplazar en cada uno de los 50 archivos. Con POM, el selector vive en una sola Page class y el cambio se hace en UNA línea. Esta es exactamente la motivación de la lección: la diferencia entre un proyecto que escala y uno que colapsa.",
      en: "Without POM, every test using that button duplicates the selector, so a UI change forces you to find and replace it across all 50 files. With POM, the selector lives in a single Page class and the change is made in ONE line. This is exactly the lesson's motivation: the difference between a test project that scales and one that collapses.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m5-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "POM encapsula los localizadores y las acciones de una página detrás de nombres de métodos con significado de negocio, como `signIn(email, password)`.",
      en: "POM encapsulates a page's locators and actions behind business-meaningful method names, like `signIn(email, password)`.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. En lugar de escribir `page.getByLabel('Email').fill('test@test.com')` directamente en el test, POM expone `loginPage.signIn('test@test.com', 'pass')`. Los tests pasan de ser instrucciones de DOM a narrativas de negocio que cualquier persona del equipo puede leer.",
      en: "Correct. Instead of writing `page.getByLabel('Email').fill('test@test.com')` directly in the test, POM exposes `loginPage.signIn('test@test.com', 'pass')`. Tests go from DOM instructions to business narratives that anyone on the team can read.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "¿Qué recibe una Page class en su constructor, según el patrón enseñado en el módulo?",
      en: "What does a Page class receive in its constructor, according to the pattern taught in the module?",
    },
    options: [
      { id: "a", text: { es: "Un objeto `Browser`", en: "A `Browser` object" } },
      { id: "b", text: { es: "Un objeto `page: Page`", en: "A `page: Page` object" } },
      { id: "c", text: { es: "Una lista de strings con los selectores CSS", en: "A list of CSS selector strings" } },
      { id: "d", text: { es: "Una instancia de `expect`", en: "An `expect` instance" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Una Page class es una clase de TypeScript que recibe `page: Page` en su constructor. A partir de ese objeto `page`, la clase crea sus localizadores (`page.getByLabel(...)`, `page.getByRole(...)`) y los guarda como propiedades.",
      en: "A Page class is a TypeScript class that receives `page: Page` in its constructor. From that `page` object, the class creates its locators (`page.getByLabel(...)`, `page.getByRole(...)`) and stores them as properties.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "En la clase `LoginPage` del curso, ¿qué tipo tienen las propiedades `emailInput`, `passwordInput` y `signInButton`?",
      en: "In the course's `LoginPage` class, what type do the `emailInput`, `passwordInput`, and `signInButton` properties have?",
    },
    options: [
      { id: "a", text: { es: "string", en: "string" } },
      { id: "b", text: { es: "Locator", en: "Locator" } },
      { id: "c", text: { es: "HTMLElement", en: "HTMLElement" } },
      { id: "d", text: { es: "Promise<void>", en: "Promise<void>" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Los localizadores se declaran como propiedades de tipo `Locator`, inicializadas una sola vez en el constructor (ej. `this.emailInput = page.getByLabel('Email')`). Este es el núcleo del patrón: un solo lugar donde vive cada selector.",
      en: "Locators are declared as properties of type `Locator`, initialised once in the constructor (e.g. `this.emailInput = page.getByLabel('Email')`). This is the core of the pattern: a single place where each selector lives.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e5",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "Según el módulo, las aserciones de negocio como 'el login fue exitoso' deben colocarse dentro de los métodos de la Page class, no en los tests.",
      en: "According to the module, business assertions like 'login was successful' should be placed inside the Page class methods, not in the tests.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. Las aserciones de negocio NO pertenecen al Page Object: el POM expone localizadores y ejecuta acciones; los TESTS hacen las verificaciones. Esto permite reutilizar el mismo método (ej. `signIn()`) en escenarios de éxito, error o validación, cada uno con sus propias aserciones.",
      en: "False. Business assertions do NOT belong in the Page Object: the POM exposes locators and executes actions; the TESTS perform the verifications. This allows the same method (e.g. `signIn()`) to be reused across success, error, or validation scenarios, each with its own assertions.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "¿Cuál de los siguientes nombres de método sigue la convención recomendada en el módulo para los métodos de acción de una Page class?",
      en: "Which of the following method names follows the convention recommended in the module for a Page class's action methods?",
    },
    options: [
      { id: "a", text: { es: "fillEmailAndClickSignIn()", en: "fillEmailAndClickSignIn()" } },
      { id: "b", text: { es: "signIn(email, password)", en: "signIn(email, password)" } },
      { id: "c", text: { es: "clickButtonWithSelectorSignIn()", en: "clickButtonWithSelectorSignIn()" } },
      { id: "d", text: { es: "domAction1()", en: "domAction1()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo recomienda nombrar los métodos como si se los explicaras a un Product Owner: `signIn(email, password)` describe la intención de negocio. Nombres como `fillEmailAndClickSignIn()` revelan detalles de implementación (mecánica del DOM) que no deberían importarle al test.",
      en: "The module recommends naming methods as if explaining them to a Product Owner: `signIn(email, password)` describes the business intention. Names like `fillEmailAndClickSignIn()` reveal implementation details (DOM mechanics) the test shouldn't care about.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m5-e7",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "Las aplicaciones reales suelen tener componentes compartidos, como una navbar, que aparecen en múltiples páginas, y duplicar su código en cada Page class es el mismo error que duplicar selectores en tests.",
      en: "Real applications often have shared components, like a navbar, that appear on multiple pages, and duplicating their code in every Page class is the same mistake as duplicating selectors in tests.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El módulo señala que componentes compartidos como navbar, footer o sidebar deben modelarse en su propia clase de componente (ej. `PlaygroundNav`) y componerse dentro de las Page classes que los necesiten, en lugar de repetir su código.",
      en: "Correct. The module points out that shared components like a navbar, footer, or sidebar should be modelled in their own component class (e.g. `PlaygroundNav`) and composed inside the Page classes that need them, instead of repeating their code.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "¿Qué relación describe mejor el principio 'LoginPage HAS-A PlaygroundNav' enseñado en el módulo?",
      en: "Which relationship best describes the 'LoginPage HAS-A PlaygroundNav' principle taught in the module?",
    },
    options: [
      { id: "a", text: { es: "Herencia: LoginPage extiende PlaygroundNav", en: "Inheritance: LoginPage extends PlaygroundNav" } },
      { id: "b", text: { es: "Composición: LoginPage contiene una instancia de PlaygroundNav como propiedad", en: "Composition: LoginPage holds a PlaygroundNav instance as a property" } },
      { id: "c", text: { es: "Implementación de interfaz: LoginPage implementa PlaygroundNav", en: "Interface implementation: LoginPage implements PlaygroundNav" } },
      { id: "d", text: { es: "Sobrecarga de métodos entre ambas clases", en: "Method overloading between both classes" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo recomienda composición (`HAS-A`) sobre herencia (`IS-A`): LoginPage crea y guarda una instancia de `PlaygroundNav` como propiedad en su constructor (`this.nav = new PlaygroundNav(page)`), en lugar de heredar de una clase base con navbar incluida.",
      en: "The module recommends composition (`HAS-A`) over inheritance (`IS-A`): LoginPage creates and stores a `PlaygroundNav` instance as a property in its constructor (`this.nav = new PlaygroundNav(page)`), instead of inheriting from a base class with the navbar baked in.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m5-e9",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "Según el módulo, los localizadores de una Page class deben declararse con el modificador `readonly`.",
      en: "According to the module, a Page class's locators should be declared with the `readonly` modifier.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El módulo es explícito: 'los localizadores DEBEN ser readonly'. Esto evita que un método reasigne accidentalmente un localizador, lo que rompería silenciosamente todos los tests que lo usan. TypeScript convierte ese bug potencial en un error de compilación.",
      en: "Correct. The module is explicit: 'locators MUST be readonly'. This prevents a method from accidentally reassigning a locator, which would silently break all tests using it. TypeScript turns that potential bug into a compile-time error.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m5-e10",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M5],
    question: {
      es: "En el ejercicio práctico del módulo, ¿qué clase se crea para refactorizar el wizard de registro multi-paso en `/playground/signup`?",
      en: "In the module's practical exercise, what class is created to refactor the multi-step signup wizard at `/playground/signup`?",
    },
    options: [
      { id: "a", text: { es: "RegisterFormPage", en: "RegisterFormPage" } },
      { id: "b", text: { es: "SignupWizardPage", en: "SignupWizardPage" } },
      { id: "c", text: { es: "AccountCreationPage", en: "AccountCreationPage" } },
      { id: "d", text: { es: "MultiStepFormPage", en: "MultiStepFormPage" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El ejercicio pide crear una clase `SignupWizardPage` con métodos para cada paso del wizard (`fillPersonalInfo()`, `fillAccountInfo()`, `setPreferences()`, `goToNextStep()`, `submit()`), encapsulando los localizadores como propiedades readonly y usando interfaces tipadas para los datos de cada paso.",
      en: "The exercise asks for a `SignupWizardPage` class with methods for each wizard step (`fillPersonalInfo()`, `fillAccountInfo()`, `setPreferences()`, `goToNextStep()`, `submit()`), encapsulating locators as readonly properties and using typed interfaces for each step's data.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },

  /* ================================================================== */
  /*  MEDIUM (10 questions)                                              */
  /* ================================================================== */

  {
    id: "m5-m1",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "¿Qué hace exactamente el método `goToCatalog()` de esta clase `PlaygroundNav`?",
      en: "What does this `PlaygroundNav` class's `goToCatalog()` method exactly do?",
    },
    codeSnippet: `export class PlaygroundNav {
  readonly page: Page;
  readonly catalogTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogTab = page.getByRole('link', { name: 'Catalog' });
  }

  async goToCatalog(): Promise<CatalogPage> {
    await this.catalogTab.click();
    return new CatalogPage(this.page);
  }
}`,
    options: [
      { id: "a", text: { es: "Solo hace click en el enlace 'Catalog', sin devolver nada útil", en: "It only clicks the 'Catalog' link, without returning anything useful" } },
      { id: "b", text: { es: "Hace click en el enlace de navegación y devuelve una nueva instancia de CatalogPage, permitiendo encadenar sus métodos", en: "It clicks the navigation link and returns a new CatalogPage instance, allowing its methods to be chained" } },
      { id: "c", text: { es: "Lanza una excepción si CatalogPage no existe todavía", en: "It throws an exception if CatalogPage doesn't exist yet" } },
      { id: "d", text: { es: "Navega directamente con page.goto() sin usar el localizador", en: "It navigates directly with page.goto() without using the locator" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Este es el patrón de composición con navegación fluida: el método ejecuta la acción (click en el tab) y luego devuelve `new CatalogPage(this.page)`, modelando que tras navegar el test ahora está en una página distinta con sus propios métodos disponibles. Esto permite escribir `const catalogPage = await nav.goToCatalog();` y seguir interactuando con `catalogPage`.",
      en: "This is the composition pattern with fluent navigation: the method performs the action (clicking the tab) and then returns `new CatalogPage(this.page)`, modelling that after navigating, the test is now on a different page with its own available methods. This allows writing `const catalogPage = await nav.goToCatalog();` and continuing to interact with `catalogPage`.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m5-m2",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "En la clase `LoginPage` que compone `PlaygroundNav`, el constructor hace `this.nav = new PlaygroundNav(page)`. ¿Por qué se inicializa ahí y no dentro de cada método de acción?",
      en: "In the `LoginPage` class that composes `PlaygroundNav`, the constructor does `this.nav = new PlaygroundNav(page)`. Why is it initialised there instead of inside each action method?",
    },
    options: [
      { id: "a", text: { es: "Porque TypeScript lo exige sintácticamente", en: "Because TypeScript requires it syntactically" } },
      { id: "b", text: { es: "Para crear el componente una sola vez y reutilizarlo en todos los métodos de la clase, igual que se hace con los Locator", en: "To create the component once and reuse it across all the class's methods, the same way it's done with Locators" } },
      { id: "c", text: { es: "Porque PlaygroundNav solo puede instanciarse dentro de un constructor", en: "Because PlaygroundNav can only be instantiated inside a constructor" } },
      { id: "d", text: { es: "Para evitar que el componente sea de tipo readonly", en: "To avoid the component being of type readonly" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El mismo principio que aplica a los localizadores (inicializarlos una vez en el constructor) aplica a los componentes compuestos: `this.nav` se crea una sola vez y queda disponible como propiedad readonly para todos los métodos de `LoginPage`, evitando instanciar `PlaygroundNav` repetidamente.",
      en: "The same principle that applies to locators (initialising them once in the constructor) applies to composed components: `this.nav` is created once and is available as a readonly property to all of `LoginPage`'s methods, avoiding repeated instantiation of `PlaygroundNav`.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m5-m3",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "Dada esta interfaz y este método, ¿qué error detecta TypeScript en tiempo de compilación si un test llama a `loginPage.signIn({ emial: 'a@b.com', password: 'x' })` (nótese 'emial')?",
      en: "Given this interface and method, what error does TypeScript catch at compile time if a test calls `loginPage.signIn({ emial: 'a@b.com', password: 'x' })` (note the typo 'emial')?",
    },
    codeSnippet: `export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

async signIn(credentials: LoginCredentials): Promise<void> {
  await this.emailInput.fill(credentials.email);
  await this.passwordInput.fill(credentials.password);
  if (credentials.rememberMe) {
    await this.rememberCheckbox.check();
  }
  await this.signInButton.click();
}`,
    options: [
      { id: "a", text: { es: "Ningún error: TypeScript ignora propiedades con nombres incorrectos", en: "No error: TypeScript ignores properties with incorrect names" } },
      { id: "b", text: { es: "Un error en tiempo de ejecución únicamente, nunca en compilación", en: "A runtime error only, never at compile time" } },
      { id: "c", text: { es: "Un error de compilación: el objeto no coincide con la forma de LoginCredentials porque le falta 'email' y tiene una propiedad 'emial' que la interfaz no declara", en: "A compile-time error: the object doesn't match LoginCredentials's shape because it's missing 'email' and has an 'emial' property the interface doesn't declare" } },
      { id: "d", text: { es: "Un error solo si rememberMe no se incluye en el objeto", en: "An error only if rememberMe is not included in the object" } },
    ],
    correctOptionIds: ["c"],
    explanation: {
      es: "Esta es la ventaja central de tipar los parámetros con una interfaz: TypeScript verifica en tiempo de compilación que el objeto pasado coincide con la forma de `LoginCredentials`. Como falta la propiedad requerida `email` y aparece una propiedad `emial` no declarada, `tsc` rechaza el código antes de ejecutar ningún test, evitando que el error llegue a producción.",
      en: "This is the central advantage of typing parameters with an interface: TypeScript verifies at compile time that the passed object matches `LoginCredentials`'s shape. Since the required `email` property is missing and an undeclared `emial` property appears, `tsc` rejects the code before any test runs, preventing the bug from reaching production.",
    },
    points: 2,
    timeEstimateSeconds: 65,
  },
  {
    id: "m5-m4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "El módulo distingue entre métodos de 'acción' y métodos de 'query' en una Page class. ¿Cuál de las siguientes firmas describe mejor un método de query?",
      en: "The module distinguishes between 'action' and 'query' methods in a Page class. Which of the following signatures best describes a query method?",
    },
    options: [
      { id: "a", text: { es: "async signIn(email: string, password: string): Promise<void>", en: "async signIn(email: string, password: string): Promise<void>" } },
      { id: "b", text: { es: "async getErrorMessage(): Promise<string | null>", en: "async getErrorMessage(): Promise<string | null>" } },
      { id: "c", text: { es: "async submitEmptyForm(): Promise<void>", en: "async submitEmptyForm(): Promise<void>" } },
      { id: "d", text: { es: "async goto(): Promise<void>", en: "async goto(): Promise<void>" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Las queries devuelven datos que el test puede inspeccionar, en lugar de ejecutar efectos secundarios. `getErrorMessage(): Promise<string | null>` es una query: lee el estado de la página y devuelve un valor. Los otros tres son acciones: ejecutan interacciones (rellenar, hacer click, navegar) y devuelven `Promise<void>`.",
      en: "Queries return data the test can inspect, instead of performing side effects. `getErrorMessage(): Promise<string | null>` is a query: it reads the page's state and returns a value. The other three are actions: they perform interactions (filling, clicking, navigating) and return `Promise<void>`.",
    },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "m5-m5",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "¿Cuáles de las siguientes son razones que el módulo da para preferir composición sobre herencia en Page Objects? (Selecciona todas las correctas)",
      en: "Which of the following are reasons the module gives for preferring composition over inheritance in Page Objects? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Permite añadir, quitar o reemplazar componentes compartidos sin romper la jerarquía de clases", en: "It allows adding, removing, or replacing shared components without breaking the class hierarchy" } },
      { id: "b", text: { es: "Si el componente compartido cambia de diseño, solo se edita su propia clase y todas las páginas que lo componen se actualizan automáticamente", en: "If the shared component's design changes, only its own class needs editing and all pages composing it update automatically" } },
      { id: "c", text: { es: "TypeScript no soporta la palabra clave `extends` en clases", en: "TypeScript doesn't support the `extends` keyword on classes" } },
      { id: "d", text: { es: "Playwright lanza un error en tiempo de ejecución si una Page class usa herencia", en: "Playwright throws a runtime error if a Page class uses inheritance" } },
    ],
    correctOptionIds: ["a", "b"],
    explanation: {
      es: "El módulo justifica preferir composición con dos razones concretas: la flexibilidad para añadir/quitar/reemplazar componentes sin afectar la jerarquía (a), y que un cambio en un componente compartido (ej. el Navbar) se propaga automáticamente a todas las páginas que lo componen (b). TypeScript sí soporta herencia de clases (c es falsa) y Playwright no impone ninguna restricción de este tipo (d es falsa) — la recomendación es de diseño, no una limitación técnica.",
      en: "The module justifies preferring composition with two concrete reasons: the flexibility to add/remove/replace components without affecting the hierarchy (a), and that a change to a shared component (e.g. the Navbar) automatically propagates to all pages composing it (b). TypeScript does support class inheritance (c is false) and Playwright imposes no such restriction (d is false) — the recommendation is a design choice, not a technical limitation.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m5-m6",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "¿Qué tipo de retorno tiene el método `getProductCards()` de esta clase, y qué implica ese tipo?",
      en: "What return type does this class's `getProductCards()` method have, and what does that type imply?",
    },
    codeSnippet: `export class CatalogPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getProductCards(): Locator {
    return this.page.getByRole('article');
  }

  async getProductCount(): Promise<number> {
    return await this.page.getByRole('article').count();
  }
}`,
    options: [
      { id: "a", text: { es: "Devuelve Promise<number>, igual que getProductCount()", en: "It returns Promise<number>, just like getProductCount()" } },
      { id: "b", text: { es: "Devuelve Locator de forma síncrona (sin Promise), porque crear un Locator no requiere esperar nada del navegador; el test puede usarlo directamente en una aserción", en: "It returns Locator synchronously (no Promise), because creating a Locator doesn't require waiting on the browser; the test can use it directly in an assertion" } },
      { id: "c", text: { es: "Devuelve void porque no hace ninguna acción", en: "It returns void because it performs no action" } },
      { id: "d", text: { es: "Devuelve string[] con los nombres de los productos", en: "It returns string[] with the product names" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`getProductCards()` no es `async` y devuelve `Locator` directamente, sin `Promise`. Esto es correcto porque construir un `Locator` (`page.getByRole('article')`) es una operación síncrona — no consulta el DOM hasta que se usa en una acción o aserición. En cambio, `getProductCount()` sí necesita `Promise<number>` porque `.count()` consulta el DOM y requiere `await`.",
      en: "`getProductCards()` is not `async` and returns `Locator` directly, without a `Promise`. This is correct because constructing a `Locator` (`page.getByRole('article')`) is a synchronous operation — it doesn't query the DOM until used in an action or assertion. In contrast, `getProductCount()` does need `Promise<number>` because `.count()` queries the DOM and requires `await`.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m5-m7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "¿Qué excepción menciona el módulo a la regla de 'las aserciones van en los tests, no en el POM'?",
      en: "What exception does the module mention to the rule 'assertions go in tests, not in the POM'?",
    },
    options: [
      { id: "a", text: { es: "Ninguna: la regla es absoluta y no admite excepciones", en: "None: the rule is absolute and admits no exceptions" } },
      { id: "b", text: { es: "Se permiten aserciones de 'sanity check' que son invariantes, como verificar que la página cargó correctamente dentro de goto()", en: "'Sanity check' assertions that are invariants are allowed, like verifying the page loaded correctly inside goto()" } },
      { id: "c", text: { es: "Se permiten todas las aserciones siempre que usen expect.soft()", en: "All assertions are allowed as long as they use expect.soft()" } },
      { id: "d", text: { es: "Se permiten aserciones solo en los métodos de query, nunca en los de acción", en: "Assertions are allowed only in query methods, never in action methods" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo aclara: 'puedes incluir aserciones de sanity check dentro del POM si son invariantes (ej: verificar que la página cargó correctamente en goto())'. Pero las aserciones de negocio — como 'el login fue exitoso' — pertenecen exclusivamente a los tests, porque su definición de éxito varía según el escenario.",
      en: "The module clarifies: 'you can include sanity check assertions inside the POM if they are invariants (e.g., verify the page loaded correctly in goto())'. But business assertions — like 'login was successful' — belong exclusively in tests, because their definition of success varies by scenario.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m5-m8",
    type: "true_false",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "Según el módulo, los tipos de retorno explícitos (como `Promise<string | null>`) documentan la API de una Page class sin necesidad de comentarios adicionales.",
      en: "According to the module, explicit return types (like `Promise<string | null>`) document a Page class's API without needing additional comments.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El módulo explica que un tipo de retorno como `Promise<string | null>` le dice al consumidor 'esto puede darte un string o null, maneja ambos casos', sin que el desarrollador tenga que navegar a la implementación del método para saberlo.",
      en: "Correct. The module explains that a return type like `Promise<string | null>` tells the consumer 'this may give you a string or null, handle both cases', without the developer needing to navigate to the method's implementation to find out.",
    },
    points: 2,
    timeEstimateSeconds: 40,
  },
  {
    id: "m5-m9",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "En este ejemplo del módulo sobre fixtures, ¿qué problema concreto resuelve `test.extend()` respecto al uso manual de la Page class?",
      en: "In this module example about fixtures, what concrete problem does `test.extend()` solve compared to manually using the Page class?",
    },
    codeSnippet: `const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

test('successful login via fixture', async ({ loginPage }) => {
  await loginPage.signIn('student@playq.test', 'Playwright123!');
});`,
    options: [
      { id: "a", text: { es: "Hace los tests más lentos al añadir una capa de configuración extra", en: "It makes tests slower by adding an extra configuration layer" } },
      { id: "b", text: { es: "Elimina el boilerplate repetido de `new LoginPage(page)` y `await loginPage.goto()` en cada test, inyectando la instancia ya lista", en: "It eliminates the repeated `new LoginPage(page)` and `await loginPage.goto()` boilerplate in every test, injecting the already-ready instance" } },
      { id: "c", text: { es: "Permite que las Page classes no necesiten constructor", en: "It allows Page classes to not need a constructor" } },
      { id: "d", text: { es: "Sustituye por completo la necesidad de Page Objects", en: "It completely replaces the need for Page Objects" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo presenta esto como un avance del Módulo 6: `test.extend()` permite declarar un fixture `loginPage` que crea la instancia y navega a la página de login una sola vez; cada test simplemente recibe `{ loginPage }` ya inicializado como parámetro, eliminando la repetición de `new LoginPage(page)` + `goto()` en cada test.",
      en: "The module presents this as a Module 6 preview: `test.extend()` lets you declare a `loginPage` fixture that creates the instance and navigates to the login page once; each test simply receives `{ loginPage }` already initialised as a parameter, eliminating the repetition of `new LoginPage(page)` + `goto()` in every test.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m5-m10",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M5],
    question: {
      es: "En la clase genérica `FormPage<T extends Record<string, string | boolean>>` del módulo, ¿qué propósito tiene el parámetro de tipo `T`?",
      en: "In the module's generic `FormPage<T extends Record<string, string | boolean>>` class, what is the purpose of the type parameter `T`?",
    },
    options: [
      { id: "a", text: { es: "Define cuántos campos de texto puede tener el formulario, como máximo", en: "It defines the maximum number of text fields the form can have" } },
      { id: "b", text: { es: "Permite que la misma clase FormPage se reutilice para cualquier forma de datos de formulario, manteniendo el tipado correcto de cada campo", en: "It allows the same FormPage class to be reused for any form data shape, while keeping each field correctly typed" } },
      { id: "c", text: { es: "Indica el número de Locator que se inicializarán en el constructor", en: "It indicates the number of Locators that will be initialised in the constructor" } },
      { id: "d", text: { es: "Es obligatorio en Playwright para cualquier clase que use page.getByLabel()", en: "It's mandatory in Playwright for any class using page.getByLabel()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El genérico `T` permite que `FormPage<T>` sea un componente reutilizable para cualquier formulario de la aplicación: al instanciarlo como `FormPage<SignupData>`, TypeScript sabe que `fill()` espera un `Partial<SignupData>` y que los mapeos de campos coinciden con las claves de `SignupData`, sin tener que escribir una clase distinta para cada formulario.",
      en: "The `T` generic allows `FormPage<T>` to be a reusable component for any form in the application: when instantiated as `FormPage<SignupData>`, TypeScript knows that `fill()` expects a `Partial<SignupData>` and that field mappings match `SignupData`'s keys, without needing to write a separate class for every form.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },

  /* ================================================================== */
  /*  HARD (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m5-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M5],
    question: {
      es: "Esta Page class tiene un defecto de encapsulación. ¿Cuál es, y por qué viola lo enseñado en el módulo?",
      en: "This Page class has an encapsulation flaw. What is it, and why does it violate what the module teaches?",
    },
    codeSnippet: `export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
  }

  async removeItem(itemName: string): Promise<void> {
    await this.page
      .getByRole('listitem')
      .filter({ hasText: itemName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}`,
    options: [
      { id: "a", text: { es: "No hay ningún defecto: la clase sigue correctamente el patrón POM", en: "There's no flaw at all: the class correctly follows the POM pattern" } },
      { id: "b", text: { es: "`removeItem()` construye el localizador del botón 'Remove' directamente con page.getByRole() dentro del método, en lugar de declararlo como propiedad Locator en el constructor como se hizo con checkoutButton", en: "`removeItem()` builds the 'Remove' button locator directly with page.getByRole() inside the method, instead of declaring it as a Locator property in the constructor like checkoutButton was" } },
      { id: "c", text: { es: "El método checkout() debería tener una aserición expect() antes del click", en: "The checkout() method should have an expect() assertion before the click" } },
      { id: "d", text: { es: "removeItem() debería devolver un nuevo objeto CartPage", en: "removeItem() should return a new CartPage object" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo enseña que el núcleo del patrón es declarar cada localizador UNA vez como propiedad en el constructor (como se hizo con `checkoutButton`). Aquí, `removeItem()` llama a `page.getByRole(...)` directamente dentro del método cada vez que se invoca, en lugar de reutilizar un Locator parametrizado o declarado de forma consistente. Aunque funcionalmente puede funcionar (es un caso dinámico por `itemName`), rompe la consistencia del patrón: la clase mezcla dos estilos (locators como propiedades vs. locators construidos al vuelo) sin justificación clara, dificultando el mantenimiento.",
      en: "The module teaches that the core of the pattern is declaring each locator ONCE as a property in the constructor (as was done with `checkoutButton`). Here, `removeItem()` calls `page.getByRole(...)` directly inside the method every time it's invoked, instead of reusing a consistently declared or parametrised Locator. While it may work functionally (it's a dynamic case due to `itemName`), it breaks the pattern's consistency: the class mixes two styles (locators as properties vs. locators built on the fly) without clear justification, hurting maintainability.",
    },
    points: 3,
    timeEstimateSeconds: 90,
  },
  {
    id: "m5-h2",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M5],
    question: {
      es: "Esta clase `LoginPage` compone `PlaygroundNav`, pero el método `goToCatalog()` no reutiliza la composición correctamente. ¿Cuál es el problema?",
      en: "This `LoginPage` class composes `PlaygroundNav`, but the `goToCatalog()` method doesn't reuse the composition correctly. What's the problem?",
    },
    codeSnippet: `export class LoginPage {
  readonly page: Page;
  readonly nav: PlaygroundNav;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nav = new PlaygroundNav(page);
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
  }

  async goToCatalog(): Promise<CatalogPage> {
    await this.page.getByRole('link', { name: 'Catalog' }).click();
    return new CatalogPage(this.page);
  }
}`,
    options: [
      { id: "a", text: { es: "No hay problema: el resultado final (navegar al catálogo) es el mismo", en: "There's no problem: the end result (navigating to the catalog) is the same" } },
      { id: "b", text: { es: "goToCatalog() reconstruye el localizador del link 'Catalog' directamente en vez de delegar en this.nav.goToCatalog(), duplicando el selector que ya vive en PlaygroundNav y anulando el propósito de la composición", en: "goToCatalog() rebuilds the 'Catalog' link locator directly instead of delegating to this.nav.goToCatalog(), duplicating the selector that already lives in PlaygroundNav and defeating the purpose of composing it" } },
      { id: "c", text: { es: "El método debería ser síncrono porque PlaygroundNav ya está inicializado", en: "The method should be synchronous because PlaygroundNav is already initialised" } },
      { id: "d", text: { es: "this.nav nunca se usa en ningún lado, así que TypeScript lo elimina automáticamente", en: "this.nav is never used anywhere, so TypeScript removes it automatically" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El módulo muestra exactamente este patrón con `async goToCatalog(): Promise<CatalogPage> { return await this.nav.goToCatalog(); }` — delegar en el componente compuesto. En el snippet, `LoginPage` instancia `this.nav` pero igualmente reconstruye el selector del link 'Catalog' por su cuenta dentro de `goToCatalog()`, duplicando el localizador que ya existe en `PlaygroundNav.catalogTab`. Si el texto del link cambia, ahora hay que actualizarlo en DOS lugares: dentro de `PlaygroundNav` y dentro de `LoginPage`, exactamente el problema de mantenimiento que POM busca evitar.",
      en: "The module shows exactly this pattern with `async goToCatalog(): Promise<CatalogPage> { return await this.nav.goToCatalog(); }` — delegating to the composed component. In the snippet, `LoginPage` instantiates `this.nav` but still rebuilds the 'Catalog' link selector on its own inside `goToCatalog()`, duplicating the locator that already exists in `PlaygroundNav.catalogTab`. If the link's text changes, it now has to be updated in TWO places: inside `PlaygroundNav` and inside `LoginPage` — exactly the maintenance problem POM is meant to avoid.",
    },
    points: 3,
    timeEstimateSeconds: 95,
  },
  {
    id: "m5-h3",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M5],
    question: {
      es: "Esta interfaz tiene un error de tipado que rompería el método `signIn()` mostrado más abajo. ¿Cuál es la corrección correcta?",
      en: "This interface has a typing mistake that would break the `signIn()` method shown below. What is the correct fix?",
    },
    codeSnippet: `export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean; // <-- sin '?'
}

async signIn(credentials: LoginCredentials): Promise<void> {
  await this.emailInput.fill(credentials.email);
  await this.passwordInput.fill(credentials.password);
  if (credentials.rememberMe) {
    await this.rememberCheckbox.check();
  }
  await this.signInButton.click();
}

// En un test:
await loginPage.signIn({ email: 'a@b.com', password: 'x' }); // ❌ Error de tipo`,
    options: [
      { id: "a", text: { es: "Cambiar `rememberMe: boolean` a `rememberMe?: boolean`, haciendo la propiedad opcional", en: "Change `rememberMe: boolean` to `rememberMe?: boolean`, making the property optional" } },
      { id: "b", text: { es: "Cambiar `signIn(credentials: LoginCredentials)` a `signIn(credentials: any)`", en: "Change `signIn(credentials: LoginCredentials)` to `signIn(credentials: any)`" } },
      { id: "c", text: { es: "Eliminar el chequeo `if (credentials.rememberMe)` del método", en: "Remove the `if (credentials.rememberMe)` check from the method" } },
      { id: "d", text: { es: "Cambiar `rememberMe: boolean` a `rememberMe: string`", en: "Change `rememberMe: boolean` to `rememberMe: string`" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "El test del módulo llama a `signIn()` sin pasar `rememberMe` en varios escenarios (login simple sin marcar 'recordarme'). Tal como está la interfaz original del curso, `rememberMe?: boolean` es opcional (con `?`), por lo que el objeto literal puede omitirlo y el método lo trata como `undefined` (falsy) en el `if`. Quitar el `?` (como en este snippet con el error) rompe esa flexibilidad y obliga a pasar `rememberMe` siempre, generando un error de tipo en cualquier llamada que lo omita. La opción (b) destruye la seguridad de tipos por completo, y (d) cambia el significado semántico del campo sin resolver el problema real.",
      en: "The module's test calls `signIn()` without passing `rememberMe` in several scenarios (a simple login without checking 'remember me'). As originally taught in the course, `rememberMe?: boolean` is optional (with `?`), so the literal object can omit it and the method treats it as `undefined` (falsy) in the `if`. Removing the `?` (as in this broken snippet) breaks that flexibility and forces every call to pass `rememberMe`, producing a type error on any call that omits it. Option (b) destroys type safety entirely, and (d) changes the field's semantic meaning without solving the actual problem.",
    },
    points: 3,
    timeEstimateSeconds: 95,
  },
  {
    id: "m5-h4",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M5],
    question: {
      es: "Revisando esta refactorización parcial del ejercicio de la Lección 5.5, ¿cuáles de las siguientes afirmaciones sobre sus defectos son correctas?",
      en: "Reviewing this partial refactor from the Lesson 5.5 exercise, which of the following statements about its flaws are correct?",
    },
    codeSnippet: `export class SignupWizardPage {
  page: Page; // (1)
  readonly nextButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nextButton = page.getByRole('button', { name: 'Next' });
  }

  async fillPersonalInfo(fullName: string, email: string, dob: string): Promise<void> { // (2)
    await this.page.getByLabel('Full name').fill(fullName);
    await this.page.getByLabel('Email').fill(email);
    await this.page.getByLabel('Date of birth').fill(dob);
  }

  async goToNextStep(): Promise<void> {
    await this.nextButton.click();
    await expect(this.page.getByText('Account created successfully')).toBeVisible(); // (3)
  }
}`,
    options: [
      { id: "a", text: { es: "(1) `page` debería declararse readonly, siguiendo la convención del módulo para evitar reasignaciones accidentales", en: "(1) `page` should be declared readonly, following the module's convention to prevent accidental reassignment" } },
      { id: "b", text: { es: "(2) Debería usar una interfaz como PersonalInfo en lugar de tres parámetros sueltos, tal como pide el ejercicio", en: "(2) It should use an interface like PersonalInfo instead of three loose parameters, as the exercise requires" } },
      { id: "c", text: { es: "(3) Es correcto incluir esa aserición de negocio dentro de goToNextStep(), porque siempre se ejecuta tras un click", en: "(3) It's correct to include that business assertion inside goToNextStep(), because it always runs after a click" } },
      { id: "d", text: { es: "(3) Es un error: 'Account created successfully' es una aserición de negocio que solo aplica al ÚLTIMO paso del wizard, y meterla en goToNextStep() rompe la reutilización de ese método en los pasos intermedios", en: "(3) It's a mistake: 'Account created successfully' is a business assertion that only applies to the LAST wizard step, and putting it in goToNextStep() breaks that method's reuse across intermediate steps" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "(a) El módulo exige `readonly` en los localizadores y, por extensión, en `page` mismo (visto en todos los ejemplos como `readonly page: Page`), para prevenir reasignaciones accidentales. (b) El ejercicio pide explícitamente agrupar los campos relacionados en interfaces tipadas (`PersonalInfo`, `AccountInfo`, `Preferences`) en lugar de parámetros sueltos, manteniendo las firmas limpias. (d) `goToNextStep()` se usa en los 3 pasos del wizard, pero el mensaje 'Account created successfully' solo aparece tras el paso final — meter esa aserición ahí rompe el método para los pasos 1 y 2, además de violar la regla de que las aserciones de negocio van en los tests. La opción (c) es incorrecta por la misma razón que hace correcta a (d): la aserición no debería estar ahí en absoluto, independientemente de cuándo se ejecute.",
      en: "(a) The module requires `readonly` on locators and, by extension, on `page` itself (seen in every example as `readonly page: Page`), to prevent accidental reassignment. (b) The exercise explicitly asks to group related fields into typed interfaces (`PersonalInfo`, `AccountInfo`, `Preferences`) instead of loose parameters, keeping signatures clean. (d) `goToNextStep()` is used across all 3 wizard steps, but the 'Account created successfully' message only appears after the final step — putting that assertion there breaks the method for steps 1 and 2, on top of violating the rule that business assertions belong in tests. Option (c) is wrong for the same reason that makes (d) correct: the assertion shouldn't be there at all, regardless of when it runs.",
    },
    points: 3,
    timeEstimateSeconds: 110,
  },
  {
    id: "m5-h5",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M5],
    question: {
      es: "Este `FormPage<T>` genérico se usa con dos formularios distintos. ¿Qué garantiza TypeScript al instanciarlo como `FormPage<SignupData>` y luego llamar a `.fill()`?",
      en: "This generic `FormPage<T>` is used with two different forms. What does TypeScript guarantee when instantiating it as `FormPage<SignupData>` and then calling `.fill()`?",
    },
    codeSnippet: `interface SignupData {
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
  emial: 'jane@test.com', // <-- typo
  newsletter: true,
});`,
    options: [
      { id: "a", text: { es: "TypeScript no detecta nada porque fill() acepta Partial<T> y cualquier subconjunto de claves es válido, incluidas las mal escritas", en: "TypeScript catches nothing because fill() accepts Partial<T> and any subset of keys is valid, including misspelled ones" } },
      { id: "b", text: { es: "TypeScript marca un error de compilación: 'emial' no es una clave válida de Partial<SignupData>, porque T está acotado a las claves reales de SignupData", en: "TypeScript flags a compile error: 'emial' is not a valid key of Partial<SignupData>, because T is bound to SignupData's actual keys" } },
      { id: "c", text: { es: "El error solo aparece en tiempo de ejecución, cuando Playwright intenta encontrar el campo 'emial'", en: "The error only appears at runtime, when Playwright tries to find the 'emial' field" } },
      { id: "d", text: { es: "TypeScript convierte automáticamente 'emial' en 'email' porque son similares", en: "TypeScript automatically converts 'emial' to 'email' because they're similar" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Al instanciar `FormPage<SignupData>`, el parámetro de tipo `T` queda fijado a `SignupData`. El método `fill(data: Partial<T>)` solo acepta un objeto cuyas claves sean un subconjunto de `fullName | email | newsletter`. La clave `emial` no existe en `SignupData`, así que TypeScript rechaza el objeto en tiempo de compilación — exactamente el beneficio que el módulo atribuye a los genéricos: reutilización de la clase `FormPage` para cualquier formulario, sin sacrificar la seguridad de tipos de cada campo.",
      en: "When instantiating `FormPage<SignupData>`, the type parameter `T` becomes fixed to `SignupData`. The `fill(data: Partial<T>)` method only accepts an object whose keys are a subset of `fullName | email | newsletter`. The key `emial` doesn't exist on `SignupData`, so TypeScript rejects the object at compile time — exactly the benefit the module attributes to generics: reusing the `FormPage` class for any form, without sacrificing each field's type safety.",
    },
    points: 3,
    timeEstimateSeconds: 100,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
