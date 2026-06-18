/**
 * Exam question bank — Module 7: API Testing with Playwright.
 *
 * 25 questions (10 easy, 10 medium, 5 hard) covering:
 *   - APIRequestContext: request fixture vs page.request, no need for axios/fetch
 *   - GET/POST/PUT/DELETE: status codes, headers, JSON bodies, the full CRUD cycle
 *   - Mixing UI and API tests: API setup -> UI verify, UI action -> API verify, storageState
 *   - Mocking API responses with page.route() + route.fulfill(), vs route.continue()/route.abort()
 *   - Practical exercise: typed REST API testing (Product, User, ApiResponse<T>, LoginData)
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M7 = "m7-api-testing";

const QUESTIONS: ExamQuestion[] = [
  /* ================================================================== */
  /*  EASY (10 questions)                                                */
  /* ================================================================== */

  {
    id: "m7-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Qué es `APIRequestContext` en Playwright y qué librería externa necesitas instalar para usarlo?",
      en: "What is `APIRequestContext` in Playwright, and what external library do you need to install to use it?",
    },
    options: [
      { id: "a", text: { es: "Es el cliente HTTP integrado de Playwright; no necesitas instalar axios, supertest ni fetch adicional", en: "It's Playwright's built-in HTTP client; you don't need to install axios, supertest, or additional fetch" } },
      { id: "b", text: { es: "Es un wrapper sobre axios que Playwright instala automáticamente como dependencia oculta", en: "It's a wrapper around axios that Playwright installs automatically as a hidden dependency" } },
      { id: "c", text: { es: "Es una clase que solo funciona si se importa supertest por separado", en: "It's a class that only works if supertest is imported separately" } },
      { id: "d", text: { es: "No existe en Playwright; las peticiones HTTP siempre requieren fetch nativo de Node", en: "It doesn't exist in Playwright; HTTP requests always require Node's native fetch" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`APIRequestContext` es el cliente HTTP completo incluido en Playwright, capaz de hacer GET, POST, PUT, DELETE, PATCH y HEAD sin instalar nada adicional. Esto desmiente el mito de que Playwright 'solo sirve para UI' y permite probar frontend y backend con una sola herramienta. No es un wrapper de axios ni depende de supertest — es una implementación nativa del propio framework.",
      en: "`APIRequestContext` is the complete HTTP client included in Playwright, capable of making GET, POST, PUT, DELETE, PATCH, and HEAD requests without installing anything extra. This debunks the myth that Playwright is 'only for UI' and lets you test frontend and backend with a single tool. It's not an axios wrapper and doesn't depend on supertest — it's a native implementation of the framework itself.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m7-e2",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "El fixture `request` se inyecta en un test de la misma forma en que se inyecta `page` en los tests de UI.",
      en: "The `request` fixture is injected into a test the same way `page` is injected in UI tests.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. Igual que escribes `async ({ page }) => {...}` para tests de UI, escribes `async ({ request }) => {...}` para tests de API. Playwright trata ambos como fixtures de primera clase del test runner, lo que permite mezclarlos libremente en la misma firma: `async ({ page, request }) => {...}`.",
      en: "Correct. Just as you write `async ({ page }) => {...}` for UI tests, you write `async ({ request }) => {...}` for API tests. Playwright treats both as first-class fixtures of the test runner, which lets you freely mix them in the same signature: `async ({ page, request }) => {...}`.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m7-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Qué diferencia principal hay entre el fixture `request` y `page.request`?",
      en: "What is the main difference between the `request` fixture and `page.request`?",
    },
    options: [
      { id: "a", text: { es: "`request` tiene estado limpio sin cookies de navegador; `page.request` comparte cookies, localStorage y sesión con el navegador", en: "`request` has a clean state with no browser cookies; `page.request` shares cookies, localStorage, and session with the browser" } },
      { id: "b", text: { es: "No hay ninguna diferencia, son alias del mismo objeto", en: "There's no difference, they're aliases for the same object" } },
      { id: "c", text: { es: "`page.request` solo puede hacer GET, mientras que `request` puede hacer cualquier verbo HTTP", en: "`page.request` can only make GET requests, while `request` can make any HTTP verb" } },
      { id: "d", text: { es: "`request` requiere que la página ya esté cargada con `page.goto()`", en: "`request` requires the page to already be loaded with `page.goto()`" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "El fixture `request` crea un `APIRequestContext` independiente sin cookies ni sesión de navegador — ideal para tests de API pura. `page.request` comparte el contexto del navegador (cookies, localStorage), útil en tests híbridos donde la UI ya estableció una sesión. Ambos exponen los mismos verbos HTTP, así que la diferencia no está en las capacidades sino en el estado compartido.",
      en: "The `request` fixture creates an independent `APIRequestContext` with no browser cookies or session — ideal for pure API tests. `page.request` shares the browser context (cookies, localStorage), useful in hybrid tests where the UI already established a session. Both expose the same HTTP verbs, so the difference isn't in capability but in shared state.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m7-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Qué método de `APIResponse` devuelve `true` cuando el código de estado HTTP está en el rango 200-299?",
      en: "Which `APIResponse` method returns `true` when the HTTP status code is in the 200-299 range?",
    },
    options: [
      { id: "a", text: { es: "response.status()", en: "response.status()" } },
      { id: "b", text: { es: "response.ok()", en: "response.ok()" } },
      { id: "c", text: { es: "response.json()", en: "response.json()" } },
      { id: "d", text: { es: "response.success()", en: "response.success()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`response.ok()` devuelve un booleano que es `true` solo si el status está en el rango 200-299 (éxito). `response.status()` devuelve el código numérico exacto (200, 201, 404...), no un booleano. `response.json()` parsea el cuerpo como JSON. `success()` no existe en la API de Playwright — ese campo suele venir dentro del CUERPO de la respuesta (`body.success`), no como método del objeto `APIResponse`.",
      en: "`response.ok()` returns a boolean that is `true` only if the status is in the 200-299 range (success). `response.status()` returns the exact numeric code (200, 201, 404...), not a boolean. `response.json()` parses the body as JSON. `success()` doesn't exist in Playwright's API — that field usually lives inside the response BODY (`body.success`), not as a method on the `APIResponse` object.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m7-e5",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "Un POST exitoso que crea un nuevo recurso debe devolver, según la convención REST enseñada en el módulo, el código de estado 201 (Created) en lugar de 200 (OK).",
      en: "A successful POST that creates a new resource should, according to the REST convention taught in the module, return status code 201 (Created) instead of 200 (OK).",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. En los ejemplos del módulo, `POST /api/playground/users` devuelve 201 cuando crea un usuario, reflejando la semántica REST estándar: 200 significa 'éxito genérico', mientras que 201 comunica específicamente 'se creó un nuevo recurso'. Probar que el status sea exactamente 201 (no solo 'es exitoso') detecta APIs que no siguen esta convención.",
      en: "Correct. In the module's examples, `POST /api/playground/users` returns 201 when it creates a user, reflecting standard REST semantics: 200 means 'generic success', while 201 specifically communicates 'a new resource was created'. Testing that the status is exactly 201 (not just 'successful') catches APIs that don't follow this convention.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m7-e6",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Cómo se pasa el cuerpo (body) de una petición POST con `request.post()` en Playwright?",
      en: "How do you pass the request body of a POST with `request.post()` in Playwright?",
    },
    options: [
      { id: "a", text: { es: "Como un objeto en la propiedad `data` del segundo argumento: `request.post(url, { data: {...} })`", en: "As an object in the `data` property of the second argument: `request.post(url, { data: {...} })`" } },
      { id: "b", text: { es: "Concatenado a la URL como query string", en: "Concatenated to the URL as a query string" } },
      { id: "c", text: { es: "Como tercer argumento posicional separado de la URL", en: "As a third positional argument separate from the URL" } },
      { id: "d", text: { es: "Playwright no permite enviar cuerpo en peticiones POST", en: "Playwright doesn't allow sending a body in POST requests" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`request.post(url, { data: {...} })` es el patrón: la URL es el primer argumento, y un objeto de opciones (con `data`, y opcionalmente `headers`, `params`, `timeout`) es el segundo. Playwright serializa automáticamente el objeto `data` a JSON cuando es un objeto plano. No se pasa como query string ni como argumento posicional separado.",
      en: "`request.post(url, { data: {...} })` is the pattern: the URL is the first argument, and an options object (with `data`, and optionally `headers`, `params`, `timeout`) is the second. Playwright automatically serializes the `data` object to JSON when it's a plain object. It isn't passed as a query string or a separate positional argument.",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m7-e7",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "Según el módulo, validar solo el código de estado de una respuesta (sin revisar el cuerpo) es suficiente para confirmar que una operación de API funcionó correctamente.",
      en: "According to the module, validating only a response's status code (without checking the body) is enough to confirm an API operation worked correctly.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. El módulo es enfático: 'Un 200 con `{ success: false }` es un test roto que pasa'. El código de estado por sí solo no es un contrato completo — siempre hay que validar también el cuerpo de la respuesta (`body.success`, los campos esperados, mensajes de error) para confirmar que la operación realmente tuvo el efecto esperado.",
      en: "False. The module is emphatic: 'A 200 with `{ success: false }` is a broken test that passes.' The status code alone isn't a complete contract — you must always also validate the response body (`body.success`, expected fields, error messages) to confirm the operation actually had the expected effect.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m7-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Qué hace `page.route()` en el contexto de mockear respuestas de API?",
      en: "What does `page.route()` do in the context of mocking API responses?",
    },
    options: [
      { id: "a", text: { es: "Intercepta las peticiones que el navegador hace a una URL que coincide con el patrón dado, permitiendo controlar la respuesta", en: "It intercepts requests the browser makes to a URL matching the given pattern, allowing you to control the response" } },
      { id: "b", text: { es: "Navega la página a una nueva ruta, como page.goto()", en: "It navigates the page to a new route, like page.goto()" } },
      { id: "c", text: { es: "Solo funciona con el fixture request, no con page", en: "It only works with the request fixture, not with page" } },
      { id: "d", text: { es: "Registra las rutas visitadas para generar un reporte de cobertura", en: "It logs visited routes to generate a coverage report" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`page.route(urlPattern, handler)` intercepta las peticiones de red que el navegador realiza hacia URLs que coinciden con el patrón (puede incluir wildcards como `**/api/playground/products`). Dentro del handler puedes decidir responder con datos inventados (`route.fulfill()`), dejar pasar la petición real (`route.continue()`), o simular un fallo de red (`route.abort()`).",
      en: "`page.route(urlPattern, handler)` intercepts network requests the browser makes to URLs matching the pattern (which can include wildcards like `**/api/playground/products`). Inside the handler you can decide to respond with made-up data (`route.fulfill()`), let the real request through (`route.continue()`), or simulate a network failure (`route.abort()`).",
    },
    points: 1,
    timeEstimateSeconds: 30,
  },
  {
    id: "m7-e9",
    type: "true_false",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "Un test de API típico (ej. GET a un endpoint REST) se ejecuta significativamente más rápido que un test de UI equivalente.",
      en: "A typical API test (e.g. a GET to a REST endpoint) runs significantly faster than an equivalent UI test.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["true"],
    explanation: {
      es: "Correcto. El módulo cuantifica esto: un test de API tarda 50-200ms, mientras que uno de UI tarda 2-5 segundos — una diferencia de 10-20x. Por eso los escenarios que no requieren interacción visual (CRUD, autenticación, validación de datos) se prueban preferentemente vía API, reservando los tests de UI para lo que realmente necesita verificación visual.",
      en: "Correct. The module quantifies this: an API test takes 50-200ms, while a UI test takes 2-5 seconds — a 10-20x difference. That's why scenarios that don't require visual interaction (CRUD, authentication, data validation) are preferably tested via API, reserving UI tests for what actually needs visual verification.",
    },
    points: 1,
    timeEstimateSeconds: 25,
  },
  {
    id: "m7-e10",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: [M7],
    question: {
      es: "¿Qué patrón ilustra crear un usuario vía `request.post()` antes de navegar la UI a la lista de usuarios para verificar que aparece?",
      en: "What pattern is illustrated by creating a user via `request.post()` before navigating the UI to the user list to verify it appears?",
    },
    options: [
      { id: "a", text: { es: "Mockeo de respuestas con route.fulfill()", en: "Mocking responses with route.fulfill()" } },
      { id: "b", text: { es: "API setup → UI verification: usar la API para preparar datos rápido y la UI solo para verificar la presentación", en: "API setup → UI verification: using the API to set up data quickly and the UI only to verify presentation" } },
      { id: "c", text: { es: "storageState para compartir sesión de autenticación", en: "storageState for sharing authentication session" } },
      { id: "d", text: { es: "Mockeo selectivo con route.continue()", en: "Selective mocking with route.continue()" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Este es el Patrón 1 del módulo: la API crea los datos en ~100ms, y el test de UI se dedica exclusivamente a verificar que esos datos se muestran correctamente, evitando los múltiples clicks frágiles que tomaría crear el mismo dato a través de un formulario. No es mockeo (no se intercepta ninguna petición) ni storageState (no hay autenticación involucrada aquí).",
      en: "This is Pattern 1 from the module: the API creates the data in ~100ms, and the UI test is dedicated exclusively to verifying that data displays correctly, avoiding the multiple fragile clicks it would take to create the same data through a form. It isn't mocking (no request is intercepted) nor storageState (no authentication is involved here).",
    },
    points: 1,
    timeEstimateSeconds: 35,
  },

  /* ================================================================== */
  /*  MEDIUM (10 questions)                                              */
  /* ================================================================== */

  {
    id: "m7-m1",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Qué validará este test si la API responde con status 404, y por qué fallaría correctamente?",
      en: "What will this test validate if the API responds with status 404, and why would it correctly fail?",
    },
    codeSnippet: `test('GET /users/:id returns 404 for non-existent', async ({ request }) => {
  const response = await request.get('/api/playground/users/9999');
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.error).toBe('User not found');
});`,
    options: [
      { id: "a", text: { es: "El test fallaría siempre, porque expect() no puede usarse con código 404", en: "The test would always fail, because expect() can't be used with a 404 status code" } },
      { id: "b", text: { es: "El test pasa si el status es 404 y el cuerpo confirma success:false con el mensaje de error exacto; si el backend devolviera 404 sin ese cuerpo, el test fallaría en la segunda o tercera aserción", en: "The test passes if the status is 404 and the body confirms success:false with the exact error message; if the backend returned 404 without that body, the test would fail on the second or third assertion" } },
      { id: "c", text: { es: "Solo se valida el status; las líneas de body son código muerto que Playwright ignora", en: "Only the status is validated; the body lines are dead code that Playwright ignores" } },
      { id: "d", text: { es: "response.json() lanza una excepción automáticamente cuando el status no es 200", en: "response.json() automatically throws an exception when the status isn't 200" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El test encadena tres aserciones independientes: el status debe ser exactamente 404, el cuerpo debe tener `success: false`, y el mensaje de error debe coincidir exactamente con 'User not found'. Si cualquiera de las tres no se cumple, el test falla en esa aserción específica — esto es justamente lo que el módulo enseña: validar status Y cuerpo juntos, nunca solo uno. `response.json()` no lanza excepciones por el status; simplemente parsea lo que el servidor envió, sea cual sea su código.",
      en: "The test chains three independent assertions: the status must be exactly 404, the body must have `success: false`, and the error message must exactly match 'User not found'. If any of the three doesn't hold, the test fails on that specific assertion — this is exactly what the module teaches: validate status AND body together, never just one. `response.json()` doesn't throw based on status; it simply parses whatever the server sent, regardless of its code.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m7-m2",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "Al probar `DELETE /users/:id`, ¿por qué el módulo recomienda hacer un GET de seguimiento al mismo id después de eliminar?",
      en: "When testing `DELETE /users/:id`, why does the module recommend a follow-up GET to the same id after deleting?",
    },
    options: [
      { id: "a", text: { es: "Porque DELETE nunca devuelve un código de estado fiable", en: "Because DELETE never returns a reliable status code" } },
      { id: "b", text: { es: "Para confirmar que el recurso realmente desapareció — un 200 del DELETE no garantiza por sí solo que la eliminación tuvo efecto, el GET de seguimiento debe devolver 404", en: "To confirm the resource actually disappeared — a 200 from DELETE alone doesn't guarantee the deletion took effect, the follow-up GET must return 404" } },
      { id: "c", text: { es: "Porque el endpoint DELETE de Playwright requiere un GET previo para funcionar", en: "Because Playwright's DELETE endpoint requires a prior GET to work" } },
      { id: "d", text: { es: "Solo para medir el tiempo de respuesta del servidor", en: "Only to measure server response time" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El patrón 'delete + verify-gone' es el estándar profesional: DELETE devuelve 200 + `success: true`, pero eso solo confirma que la petición fue aceptada, no necesariamente que el recurso desapareció de la base de datos. El GET de seguimiento que devuelve 404 es la prueba definitiva de que el recurso ya no existe. Sin este paso, un bug donde DELETE responde 200 pero no borra nada pasaría desapercibido.",
      en: "The 'delete + verify-gone' pattern is the professional standard: DELETE returns 200 + `success: true`, but that only confirms the request was accepted, not necessarily that the resource disappeared from the database. The follow-up GET returning 404 is the definitive proof the resource no longer exists. Without this step, a bug where DELETE responds 200 but deletes nothing would go unnoticed.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m7-m3",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Qué hace exactamente este mock, y qué verá la UI al navegar a `/playground/catalog`?",
      en: "What exactly does this mock do, and what will the UI see when navigating to `/playground/catalog`?",
    },
    codeSnippet: `await page.route('**/api/playground/products', async (route) => {
  await route.fulfill({
    status: 500,
    contentType: 'application/json',
    body: JSON.stringify({
      success: false,
      error: 'Internal server error',
    }),
  });
});

await page.goto('/playground/catalog');`,
    options: [
      { id: "a", text: { es: "La petición real al backend se ejecuta de todos modos, y el mock solo se usa como respaldo si esa petición falla", en: "The real backend request still runs, and the mock is only used as a fallback if that request fails" } },
      { id: "b", text: { es: "Toda petición a /api/playground/products es interceptada y respondida con un 500 simulado sin que el backend real participe; la UI debería reaccionar mostrando su estado de error", en: "Every request to /api/playground/products is intercepted and answered with a simulated 500 without the real backend participating; the UI should react by showing its error state" } },
      { id: "c", text: { es: "route.fulfill() con status 500 hace que Playwright aborte el test inmediatamente", en: "route.fulfill() with status 500 makes Playwright abort the test immediately" } },
      { id: "d", text: { es: "El mock solo aplica a peticiones POST, no a GET", en: "The mock only applies to POST requests, not GET" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`page.route()` intercepta TODAS las peticiones que coincidan con el patrón (sin distinguir verbo HTTP a menos que se filtre explícitamente), y `route.fulfill()` responde directamente sin que la petición llegue jamás al backend real. Aquí se simula un error 500 — algo difícil de provocar con un servidor real bajo demanda — para verificar que la UI maneja correctamente ese escenario (mostrando un estado de error en vez de romperse o quedarse cargando indefinidamente).",
      en: "`page.route()` intercepts ALL requests matching the pattern (regardless of HTTP verb unless explicitly filtered), and `route.fulfill()` responds directly without the request ever reaching the real backend. Here a 500 error is simulated — something hard to trigger on demand with a real server — to verify the UI correctly handles that scenario (showing an error state instead of breaking or loading forever).",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m7-m4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Qué diferencia hay entre `route.fulfill()` y `route.continue()`?",
      en: "What's the difference between `route.fulfill()` and `route.continue()`?",
    },
    options: [
      { id: "a", text: { es: "`fulfill()` responde directamente sin tocar el backend real (mockeo); `continue()` deja pasar la petición al backend real, opcionalmente modificándola (ej. añadiendo cabeceras)", en: "`fulfill()` responds directly without touching the real backend (mocking); `continue()` lets the request pass through to the real backend, optionally modifying it (e.g. adding headers)" } },
      { id: "b", text: { es: "Son sinónimos exactos, intercambiables en cualquier contexto", en: "They are exact synonyms, interchangeable in any context" } },
      { id: "c", text: { es: "`continue()` mockea la respuesta; `fulfill()` deja pasar la petición real", en: "`continue()` mocks the response; `fulfill()` lets the real request through" } },
      { id: "d", text: { es: "Ambos abortan la petición, solo difieren en el código de error que generan", en: "Both abort the request, they only differ in the error code they generate" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "`route.fulfill()` es la herramienta de mockeo: controla completamente la respuesta (status, body, headers) sin que el backend real se entere de la petición. `route.continue()` es para interceptar/observar: la petición sigue su curso normal hacia el backend real, pero puedes modificarla antes de que salga (por ejemplo, añadiendo una cabecera `X-Debug: true` a todas las peticiones). Confundirlos invierte el propósito: usar `continue()` cuando quieres mockear no produce ningún efecto sobre la respuesta.",
      en: "`route.fulfill()` is the mocking tool: it fully controls the response (status, body, headers) without the real backend ever learning about the request. `route.continue()` is for intercepting/observing: the request proceeds normally to the real backend, but you can modify it before it goes out (e.g. adding an `X-Debug: true` header to all requests). Confusing them inverts the purpose: using `continue()` when you intend to mock produces no effect on the response.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m7-m5",
    type: "multiple_choice",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Cuáles de las siguientes son razones válidas, según el módulo, para usar mocking con `page.route()` en lugar del backend real? (Selecciona todas las correctas)",
      en: "Which of the following are valid reasons, according to the module, to use mocking with `page.route()` instead of the real backend? (Select all that apply)",
    },
    options: [
      { id: "a", text: { es: "Probar cómo reacciona la UI ante un error 500 del servidor, que es difícil de provocar a demanda con un backend real", en: "Testing how the UI reacts to a server 500 error, which is hard to trigger on demand with a real backend" } },
      { id: "b", text: { es: "Simular latencia de red (ej. 3 segundos) para verificar que los spinners/loaders se muestran correctamente", en: "Simulating network latency (e.g. 3 seconds) to verify loading spinners/loaders display correctly" } },
      { id: "c", text: { es: "Reemplazar por completo todos los tests contra el backend real, porque mockear siempre es superior", en: "Completely replacing all tests against the real backend, because mocking is always superior" } },
      { id: "d", text: { es: "Probar el estado de la UI cuando la API devuelve un array vacío", en: "Testing the UI's state when the API returns an empty array" } },
    ],
    correctOptionIds: ["a", "b", "d"],
    explanation: {
      es: "(a), (b) y (d) son los casos de uso explícitos del módulo: errores 500, latencia simulada, y respuestas vacías son estados difíciles o imposibles de reproducir bajo demanda con un backend real, y el mocking los hace triviales de probar. (c) es la trampa: el módulo advierte explícitamente contra el sobre-mockeo — 'un test que solo prueba mocks no prueba tu aplicación, prueba tus mocks'. La suite profesional combina tests contra la API real (para detectar cambios de contrato) con mocks selectivos (para edge cases de UI).",
      en: "(a), (b), and (d) are the module's explicit use cases: 500 errors, simulated latency, and empty responses are states that are hard or impossible to reproduce on demand with a real backend, and mocking makes them trivial to test. (c) is the trap: the module explicitly warns against over-mocking — 'a test that only tests mocks doesn't test your application, it tests your mocks'. The professional suite combines tests against the real API (to catch contract changes) with selective mocks (for UI edge cases).",
    },
    points: 2,
    timeEstimateSeconds: 65,
  },
  {
    id: "m7-m6",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "En este flujo de auth, ¿qué debería devolver la segunda petición a `/protected`, y por qué difiere de la primera?",
      en: "In this auth flow, what should the second request to `/protected` return, and why does it differ from the first?",
    },
    codeSnippet: `const loginRes = await request.post('/api/playground/auth/login', {
  data: { email: 'student@playq.test', password: 'Playwright123!' },
});
const { token } = (await loginRes.json()).data;

const okRes = await request.get('/api/playground/protected', {
  headers: { Authorization: \`Bearer \${token}\` },
});
expect(okRes.status()).toBe(200);

const noAuthRes = await request.get('/api/playground/protected');
expect(noAuthRes.status()).toBe(401);`,
    options: [
      { id: "a", text: { es: "Ambas peticiones deberían devolver 200, porque el fixture request mantiene el token entre llamadas automáticamente", en: "Both requests should return 200, because the request fixture automatically keeps the token between calls" } },
      { id: "b", text: { es: "La segunda devuelve 401 porque no incluye la cabecera Authorization con el Bearer token; el fixture request no comparte estado entre peticiones por defecto, cada llamada debe pasar sus propias cabeceras", en: "The second returns 401 because it doesn't include the Authorization header with the Bearer token; the request fixture doesn't share state between calls by default, each call must pass its own headers" } },
      { id: "c", text: { es: "Ambas fallarían con un error de TypeScript porque headers es obligatorio en toda petición", en: "Both would fail with a TypeScript error because headers is mandatory on every request" } },
      { id: "d", text: { es: "El 401 indica que el token expiró entre la primera y la segunda petición", en: "The 401 indicates the token expired between the first and second request" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El fixture `request` no persiste cabeceras ni tokens automáticamente entre llamadas — cada `request.get/post/...()` es independiente, y tú decides explícitamente qué cabeceras enviar. La primera llamada incluye `Authorization: Bearer ${token}` y obtiene 200; la segunda omite deliberadamente esa cabecera, por lo que la API responde 401 (no autenticado). Esto confirma que la ruta protegida realmente exige el token, no que haya un fallo de expiración o de tipado.",
      en: "The `request` fixture doesn't automatically persist headers or tokens between calls — each `request.get/post/...()` is independent, and you explicitly decide what headers to send. The first call includes `Authorization: Bearer ${token}` and gets 200; the second deliberately omits that header, so the API responds 401 (unauthenticated). This confirms the protected route genuinely requires the token, not that there's an expiration or typing failure.",
    },
    points: 2,
    timeEstimateSeconds: 65,
  },
  {
    id: "m7-m7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Qué problema concreto resuelve el patrón de autenticarse vía API y guardar el resultado en `storageState` para reutilizarlo en tests de UI?",
      en: "What concrete problem does the pattern of authenticating via API and saving the result to `storageState` for reuse in UI tests solve?",
    },
    options: [
      { id: "a", text: { es: "Evita repetir el login por UI (2-5s) en cada uno de los N tests, ahorrando minutos de ejecución acumulados en una suite grande", en: "It avoids repeating the UI login (2-5s) in each of the N tests, saving accumulated minutes of execution time across a large suite" } },
      { id: "b", text: { es: "Hace que los tests de UI ya no necesiten ningún tipo de autenticación", en: "It makes UI tests no longer need any kind of authentication" } },
      { id: "c", text: { es: "Permite que dos usuarios distintos compartan la misma sesión simultáneamente sin conflictos", en: "It allows two different users to share the same session simultaneously without conflicts" } },
      { id: "d", text: { es: "Sustituye la necesidad de tener un backend de autenticación real", en: "It replaces the need for a real authentication backend" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "El módulo lo cuantifica: hacer login por UI en cada test (2-5s × 100 tests = minutos perdidos) se reemplaza por un login único vía API (100ms) cuyo resultado se serializa en `storageState` y se reutiliza en todos los tests de UI subsiguientes. El ejemplo del módulo dice que una suite de 100 tests puede pasar de 8 a 3 minutos. No elimina la autenticación (sigue siendo necesaria, solo se hace una vez) ni resuelve sesiones concurrentes de usuarios distintos.",
      en: "The module quantifies this: logging in via UI in every test (2-5s × 100 tests = minutes wasted) is replaced by a single API login (100ms) whose result is serialized into `storageState` and reused across all subsequent UI tests. The module's example states a 100-test suite can go from 8 to 3 minutes. It doesn't eliminate authentication (it's still necessary, just done once) nor does it solve concurrent sessions for different users.",
    },
    points: 2,
    timeEstimateSeconds: 55,
  },
  {
    id: "m7-m8",
    type: "true_false",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "Según el módulo, mockear TODOS los endpoints de una aplicación es una práctica recomendada porque hace que la suite sea más rápida y predecible.",
      en: "According to the module, mocking ALL of an application's endpoints is a recommended practice because it makes the suite faster and more predictable.",
    },
    options: [
      { id: "true", text: { es: "Verdadero", en: "True" } },
      { id: "false", text: { es: "Falso", en: "False" } },
    ],
    correctOptionIds: ["false"],
    explanation: {
      es: "Falso. El módulo advierte explícitamente: 'el sobre-mockeo es peligroso. Si mockeas TODAS las APIs, tus tests pasan contra una versión FICTICIA de tu backend'. El equilibrio recomendado es mockear solo los endpoints con estados difíciles de reproducir (errores, edge cases, lentitud), y dejar que el resto se pruebe contra el backend real para detectar cambios de contrato reales.",
      en: "False. The module explicitly warns: 'over-mocking is dangerous. If you mock ALL APIs, your tests pass against a FICTIONAL version of your backend'. The recommended balance is to mock only the endpoints with hard-to-reproduce states (errors, edge cases, slowness), and let the rest be tested against the real backend to catch real contract changes.",
    },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "m7-m9",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Por qué tipar la respuesta de una API con una interfaz como `ApiResponse<Product[]>` en lugar de dejarla como `any` ayuda a evitar errores en cascada en el resto del test?",
      en: "Why does typing an API response with an interface like `ApiResponse<Product[]>` instead of leaving it as `any` help avoid cascading errors in the rest of the test?",
    },
    options: [
      { id: "a", text: { es: "Porque TypeScript verifica en tiempo de compilación que accedas solo a propiedades que existen en la forma tipada, detectando typos o suposiciones incorrectas antes de ejecutar el test", en: "Because TypeScript checks at compile time that you only access properties that exist in the typed shape, catching typos or incorrect assumptions before the test runs" } },
      { id: "b", text: { es: "Porque tipar la respuesta hace que las peticiones HTTP se ejecuten más rápido", en: "Because typing the response makes the HTTP requests execute faster" } },
      { id: "c", text: { es: "Porque any y una interfaz concreta producen exactamente el mismo comportamiento en runtime y en compilación", en: "Because any and a concrete interface produce exactly the same behavior at runtime and at compile time" } },
      { id: "d", text: { es: "Porque las interfaces validan automáticamente el JSON recibido del servidor en tiempo de ejecución", en: "Because interfaces automatically validate the JSON received from the server at runtime" } },
    ],
    correctOptionIds: ["a"],
    explanation: {
      es: "Con `any`, `body.dat.name` (un typo de `data`) compila sin error y falla en runtime con un mensaje confuso muchas líneas después. Con `ApiResponse<Product[]>`, ese mismo typo lo marca `tsc` inmediatamente al escribir el código, porque `dat` no existe en la interfaz. Importante: el tipado es solo a nivel de TypeScript (compile-time) — NO valida el JSON real que llega del servidor en runtime; si el backend cambia su forma, el tipo seguirá 'mintiendo' hasta que se actualice manualmente.",
      en: "With `any`, `body.dat.name` (a typo for `data`) compiles without error and fails at runtime with a confusing message many lines later. With `ApiResponse<Product[]>`, that same typo is flagged immediately by `tsc` while writing the code, because `dat` doesn't exist on the interface. Important: typing is TypeScript-only (compile-time) — it does NOT validate the actual JSON arriving from the server at runtime; if the backend changes shape, the type will keep 'lying' until manually updated.",
    },
    points: 2,
    timeEstimateSeconds: 60,
  },
  {
    id: "m7-m10",
    type: "code_output",
    difficulty: "medium",
    moduleIds: [M7],
    question: {
      es: "¿Qué problema tiene este test híbrido al verificar que un producto creado vía API aparece en la UI?",
      en: "What's the problem with this hybrid test that verifies a product created via the API appears in the UI?",
    },
    codeSnippet: `test('catalog shows newly created product', async ({ page, request }) => {
  await request.post('/api/playground/products', {
    data: { name: 'New Gadget', price: 49.99, category: 'Electronics', inStock: true },
  });

  await page.goto('/playground/catalog');
  expect(page.getByText('New Gadget')).toBeVisible();
});`,
    options: [
      { id: "a", text: { es: "No hay ningún problema: el patrón API setup + UI verify está aplicado correctamente", en: "There's no problem: the API setup + UI verify pattern is applied correctly" } },
      { id: "b", text: { es: "Falta el `await` antes de `expect(page.getByText(...)).toBeVisible()` — sin él, la promesa de la aserción no se espera y el test puede pasar o reportar falsos positivos antes de que la aserción realmente se resuelva", en: "It's missing `await` before `expect(page.getByText(...)).toBeVisible()` — without it, the assertion's promise isn't awaited, and the test may pass or report false positives before the assertion actually resolves" } },
      { id: "c", text: { es: "request.post no puede usarse en el mismo test que page.goto", en: "request.post can't be used in the same test as page.goto" } },
      { id: "d", text: { es: "page.getByText siempre requiere un selector CSS explícito, no texto plano", en: "page.getByText always requires an explicit CSS selector, not plain text" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Las aserciones web-first de Playwright como `expect(locator).toBeVisible()` devuelven una promesa que reintenta hasta que la condición se cumple o expira el timeout — y esa promesa DEBE esperarse con `await`. Sin `await`, el test runner no espera el resultado: el test puede terminar y reportarse como 'pasado' antes de que la aserción realmente se haya evaluado, ocultando fallos reales. El patrón híbrido en sí (API setup + UI verify) es correcto; el bug es la falta de `await`.",
      en: "Playwright's web-first assertions like `expect(locator).toBeVisible()` return a promise that retries until the condition is met or the timeout expires — and that promise MUST be awaited with `await`. Without `await`, the test runner doesn't wait for the result: the test can finish and report as 'passed' before the assertion has actually been evaluated, hiding real failures. The hybrid pattern itself (API setup + UI verify) is correct; the bug is the missing `await`.",
    },
    points: 2,
    timeEstimateSeconds: 65,
  },

  /* ================================================================== */
  /*  HARD (5 questions)                                                 */
  /* ================================================================== */

  {
    id: "m7-h1",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M7],
    question: {
      es: "Este test tiene un defecto sutil en el orden de las operaciones. ¿Cuál es, y qué tipo de fallo puede causar?",
      en: "This test has a subtle flaw in the order of operations. What is it, and what kind of failure can it cause?",
    },
    codeSnippet: `test('reading body before checking status', async ({ request }) => {
  const response = await request.post('/api/playground/users', {
    data: { name: 'Edge Case', email: 'edge@playq.test', role: 'QA Engineer' },
  });

  const body = await response.json();
  expect(body.data.id).toBeGreaterThan(0);
  expect(response.status()).toBe(201);
});`,
    options: [
      { id: "a", text: { es: "No hay ningún defecto: el orden de las aserciones nunca afecta el resultado del test", en: "There's no flaw: the order of assertions never affects the test's outcome" } },
      { id: "b", text: { es: "Si la petición falla (ej. 400 por validación), `body.data` será undefined y `body.data.id` lanzará un TypeError confuso ANTES de llegar a la aserción del status, que hubiera explicado la causa real del fallo", en: "If the request fails (e.g. 400 due to validation), `body.data` will be undefined and `body.data.id` will throw a confusing TypeError BEFORE reaching the status assertion, which would have explained the real cause of the failure" } },
      { id: "c", text: { es: "response.json() solo puede llamarse después de verificar el status, de lo contrario Playwright lanza un error de framework", en: "response.json() can only be called after checking the status, otherwise Playwright throws a framework error" } },
      { id: "d", text: { es: "El problema es usar request.post en lugar de page.request.post", en: "The problem is using request.post instead of page.request.post" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El cuerpo de un error (ej. 400 con `{ success: false, error: '...' }`) probablemente no tiene la propiedad `data`, así que `body.data.id` lanza `TypeError: Cannot read properties of undefined`. Este error de runtime aparece ANTES de que se ejecute `expect(response.status()).toBe(201)`, que es la aserción que realmente hubiera diagnosticado el problema ('esperaba 201, recibí 400'). El orden correcto es: verificar SIEMPRE el status primero, y solo acceder al cuerpo de éxito después de confirmar que la petición tuvo éxito — esto evita errores crípticos y hace que el mensaje de fallo señale la causa real.",
      en: "An error body (e.g. 400 with `{ success: false, error: '...' }`) likely doesn't have a `data` property, so `body.data.id` throws `TypeError: Cannot read properties of undefined`. This runtime error appears BEFORE `expect(response.status()).toBe(201)` runs, which is the assertion that would have actually diagnosed the problem ('expected 201, got 400'). The correct order is: ALWAYS check status first, and only access the success body after confirming the request succeeded — this avoids cryptic errors and makes the failure message point to the real cause.",
    },
    points: 3,
    timeEstimateSeconds: 100,
  },
  {
    id: "m7-h2",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M7],
    question: {
      es: "Este mock tiene un problema de configuración que hará que la prueba de 'estado de carga' nunca funcione como se espera. ¿Cuál es?",
      en: "This mock has a configuration problem that will make the 'loading state' test never work as expected. What is it?",
    },
    codeSnippet: `test('UI shows loading state during slow API response', async ({ page }) => {
  await page.goto('/playground/catalog');

  await page.route('**/api/playground/products', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await route.fulfill({
      status: 200,
      body: JSON.stringify({ success: true, data: [], count: 0 }),
    });
  });

  await expect(page.getByRole('progressbar')).toBeVisible();
});`,
    options: [
      { id: "a", text: { es: "El mock está bien configurado; el problema es que setTimeout no funciona dentro de page.route()", en: "The mock is configured correctly; the problem is that setTimeout doesn't work inside page.route()" } },
      { id: "b", text: { es: "`page.route()` se registra DESPUÉS de `page.goto()`, por lo que la petición a /products del navegador (disparada al cargar la página) ya ocurrió y no fue interceptada — el mock llega tarde para afectar la carga inicial", en: "`page.route()` is registered AFTER `page.goto()`, so the browser's request to /products (fired when the page loads) already happened and wasn't intercepted — the mock arrives too late to affect the initial load" } },
      { id: "c", text: { es: "route.fulfill() no admite un body con un array vacío en data", en: "route.fulfill() doesn't support a body with an empty array in data" } },
      { id: "d", text: { es: "El problema es que count debería ser 1, no 0, para que el spinner se muestre", en: "The problem is that count should be 1, not 0, for the spinner to display" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "El orden de las operaciones importa: `page.route()` debe registrarse ANTES de `page.goto()` para garantizar que intercepte la petición inicial que la página dispara al cargar. Aquí, `page.goto()` se ejecuta primero, lo que significa que la petición a `/products` (y su carga de datos) ya se completó contra el backend real antes de que el mock exista. El `route.fulfill()` con delay de 3s nunca llega a aplicarse a esa carga inicial, así que el spinner de carga probablemente nunca aparece (o aparece y desaparece con datos reales, no con los mockeados). La solución es invertir el orden: registrar el route ANTES de navegar.",
      en: "Operation order matters: `page.route()` must be registered BEFORE `page.goto()` to guarantee it intercepts the initial request the page fires on load. Here, `page.goto()` runs first, meaning the request to `/products` (and its data load) already completed against the real backend before the mock exists. The `route.fulfill()` with a 3s delay never gets applied to that initial load, so the loading spinner likely never appears (or appears/disappears with real data, not the mocked data). The fix is to reverse the order: register the route BEFORE navigating.",
    },
    points: 3,
    timeEstimateSeconds: 110,
  },
  {
    id: "m7-h3",
    type: "code_completion",
    difficulty: "hard",
    moduleIds: [M7],
    question: {
      es: "Este test híbrido tiene una condición de carrera entre crear datos vía API y verificarlos en la UI. ¿Cuál es el problema y cuál es la corrección correcta?",
      en: "This hybrid test has a race condition between creating data via the API and verifying it in the UI. What's the problem, and what's the correct fix?",
    },
    codeSnippet: `test('catalog reflects newly created product', async ({ page, request }) => {
  request.post('/api/playground/products', {
    data: { name: 'Race Gadget', price: 10, category: 'Test', inStock: true },
  });

  await page.goto('/playground/catalog');
  await expect(page.getByText('Race Gadget')).toBeVisible();
});`,
    options: [
      { id: "a", text: { es: "El test es correcto tal cual; cualquier fallo intermitente sería culpa de la UI, no del test", en: "The test is fine as is; any intermittent failure would be the UI's fault, not the test's" } },
      { id: "b", text: { es: "Falta `await` en `request.post(...)`: sin él, `page.goto()` puede ejecutarse antes de que el POST termine (o incluso antes de que se envíe), causando que la verificación en la UI falle de forma intermitente porque el producto aún no existe en el backend", en: "It's missing `await` on `request.post(...)`: without it, `page.goto()` can run before the POST finishes (or even before it's sent), causing the UI check to intermittently fail because the product doesn't exist in the backend yet" } },
      { id: "c", text: { es: "El problema es usar request en vez de page.request, lo cual siempre causa condiciones de carrera", en: "The problem is using request instead of page.request, which always causes race conditions" } },
      { id: "d", text: { es: "expect(...).toBeVisible() ya tiene un retry interno que hace innecesario esperar el POST", en: "expect(...).toBeVisible() already has internal retries that make waiting for the POST unnecessary" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "`request.post(...)` devuelve una promesa que no se está esperando (falta `await`). JavaScript no bloquea la siguiente línea esperando esa promesa, así que `page.goto()` puede dispararse mientras el POST todavía está en vuelo, o incluso antes de que la petición de red salga. El resultado es una condición de carrera: a veces el producto ya existe cuando la UI carga el catálogo (test pasa), y a veces no (test falla intermitentemente) — el clásico síntoma de un test flaky. La corrección es `await request.post(...)` para garantizar que la creación se complete antes de navegar. El retry de `toBeVisible()` ayuda con la sincronización del DOM, pero no puede compensar que el dato ni siquiera exista en el backend todavía.",
      en: "`request.post(...)` returns a promise that isn't being awaited (missing `await`). JavaScript doesn't block the next line waiting for that promise, so `page.goto()` can fire while the POST is still in flight, or even before the network request goes out. The result is a race condition: sometimes the product already exists when the UI loads the catalog (test passes), and sometimes it doesn't (test fails intermittently) — the classic symptom of a flaky test. The fix is `await request.post(...)` to guarantee creation completes before navigating. `toBeVisible()`'s retry helps with DOM synchronization, but it can't compensate for the data not even existing in the backend yet.",
    },
    points: 3,
    timeEstimateSeconds: 105,
  },
  {
    id: "m7-h4",
    type: "multiple_choice",
    difficulty: "hard",
    moduleIds: [M7],
    question: {
      es: "Revisando esta interfaz y su uso, ¿cuáles de las siguientes afirmaciones sobre sus defectos son correctas? (Selecciona todas las correctas)",
      en: "Reviewing this interface and its usage, which of the following statements about its flaws are correct? (Select all that apply)",
    },
    codeSnippet: `interface ApiResponse<T> {
  success: boolean;
  data: T; // (1)
  error: string; // (2)
}

test('GET /users/9999 returns 404', async ({ request }) => {
  const response = await request.get('/api/playground/users/9999');
  const body = (await response.json()) as ApiResponse<User>; // (3)

  expect(response.status()).toBe(404);
  expect(body.data.name).toBeUndefined(); // (4)
});`,
    options: [
      { id: "a", text: { es: "(1) data debería ser opcional (data?: T), porque en una respuesta de error (404) el backend probablemente no incluye ese campo", en: "(1) data should be optional (data?: T), because in an error response (404) the backend likely doesn't include that field" } },
      { id: "b", text: { es: "(2) error debería ser opcional (error?: string), porque en una respuesta exitosa (200/201) ese campo probablemente no existe", en: "(2) error should be optional (error?: string), because in a successful response (200/201) that field likely doesn't exist" } },
      { id: "c", text: { es: "(3)/(4) el `as ApiResponse<User>` es una afirmación de tipo que no valida nada en runtime; si data realmente es undefined en la respuesta 404, TypeScript no lo impide y (4) accede a una propiedad de algo que el tipo dice que existe pero en realidad no", en: "(3)/(4) the `as ApiResponse<User>` is a type assertion that validates nothing at runtime; if data is actually undefined in the 404 response, TypeScript doesn't prevent it, and (4) accesses a property of something the type claims exists but actually doesn't" } },
      { id: "d", text: { es: "No hay ningún problema: el tipo es válido y el test funcionará exactamente como está", en: "There's no problem: the type is valid and the test will work exactly as is" } },
    ],
    correctOptionIds: ["a", "b", "c"],
    explanation: {
      es: "(a) y (b): la interfaz modela `data` y `error` como obligatorios, pero la API real del Playground los hace mutuamente condicionales (éxito trae `data`, error trae `error`) — el tipo correcto sería `data?: T; error?: string`, reflejando la unión real de formas. (c): `as ApiResponse<User>` es una aserción de tipo (type assertion), no una validación — le dice a TypeScript 'confía en mí', pero no comprueba nada en tiempo de ejecución. Si la respuesta 404 real no tiene `data`, `body.data` es `undefined` en runtime, y aunque `body.data.name` no truena aquí porque se compara con `toBeUndefined()` (que no desreferencia `.name`... en realidad si lo intentas, `undefined.name` SÍ lanzaría TypeError), el riesgo real es que el tipo le mintió al desarrollador sobre la forma garantizada de `data`, ocultando el bug hasta que el código intente usar `body.data.name` en un contexto donde se asuma que existe. (d) es incorrecta: hay defectos reales de tipado que pueden esconder errores en cascada.",
      en: "(a) and (b): the interface models `data` and `error` as mandatory, but the real Playground API makes them mutually conditional (success brings `data`, error brings `error`) — the correct type would be `data?: T; error?: string`, reflecting the real union of shapes. (c): `as ApiResponse<User>` is a type assertion, not validation — it tells TypeScript 'trust me', but checks nothing at runtime. If the real 404 response has no `data`, `body.data` is `undefined` at runtime, and even though `body.data.name` doesn't blow up here because it's compared with `toBeUndefined()` (which doesn't dereference `.name`... actually attempting `undefined.name` WOULD throw a TypeError), the real risk is that the type lied to the developer about `data`'s guaranteed shape, hiding the bug until code tries to use `body.data.name` in a context that assumes it exists. (d) is incorrect: there are real typing flaws that can hide cascading errors.",
    },
    points: 3,
    timeEstimateSeconds: 120,
  },
  {
    id: "m7-h5",
    type: "code_output",
    difficulty: "hard",
    moduleIds: [M7],
    question: {
      es: "Este test de CRUD completo tiene un defecto de aislamiento. ¿Cuál es, y qué pasaría si fallara a mitad de camino?",
      en: "This complete CRUD test has an isolation flaw. What is it, and what would happen if it failed halfway through?",
    },
    codeSnippet: `test('full user CRUD lifecycle', async ({ request }) => {
  const createRes = await request.post('/api/playground/users', {
    data: { name: 'CRUD Test User', email: 'crud-test@playq.test', role: 'QA Engineer' },
  });
  const { id: userId } = (await createRes.json()).data;

  const putRes = await request.put(\`/api/playground/users/\${userId}\`, {
    data: { name: 'Updated', email: 'updated@playq.test', role: 'Lead' },
  });
  expect(putRes.status()).toBe(200);

  // Si la aserción de arriba falla, el test se detiene aquí

  const delRes = await request.delete(\`/api/playground/users/\${userId}\`);
  expect(delRes.status()).toBe(200);
});`,
    options: [
      { id: "a", text: { es: "No hay ningún problema: Playwright limpia automáticamente cualquier dato creado durante un test, incluso si falla", en: "There's no problem: Playwright automatically cleans up any data created during a test, even if it fails" } },
      { id: "b", text: { es: "Si la aserción del PUT falla, el test se detiene ahí y el DELETE nunca se ejecuta, dejando el usuario creado huérfano en el backend — afectando potencialmente otros tests que dependan de listados o conteos de usuarios", en: "If the PUT assertion fails, the test stops there and the DELETE never runs, leaving the created user orphaned in the backend — potentially affecting other tests that depend on user listings or counts" } },
      { id: "c", text: { es: "El problema es usar PUT en lugar de PATCH para actualizaciones parciales", en: "The problem is using PUT instead of PATCH for partial updates" } },
      { id: "d", text: { es: "request.delete no puede ejecutarse después de un PUT fallido por restricciones del framework", en: "request.delete can't run after a failed PUT due to framework restrictions" } },
    ],
    correctOptionIds: ["b"],
    explanation: {
      es: "Cuando una aserción de Playwright falla (`expect().toBe()`), lanza una excepción que detiene la ejecución del resto del cuerpo del test — el código después de esa línea (incluyendo el DELETE de limpieza) nunca se ejecuta. Esto deja el usuario creado en el paso CREATE como un dato huérfano en el backend. El checklist del módulo enfatiza 'cada test limpia después de sí mismo' precisamente porque, sin un mecanismo de limpieza garantizada (ej. un hook `afterEach` que borre el recurso independientemente de si el test pasó o falló, o un `try/finally`), los fallos a mitad de un test de CRUD acumulan basura que puede inflar conteos, romper aserciones de 'lista vacía' en otros tests, o sencillamente ensuciar el estado compartido del backend entre ejecuciones.",
      en: "When a Playwright assertion fails (`expect().toBe()`), it throws an exception that halts execution of the rest of the test body — the code after that line (including the cleanup DELETE) never runs. This leaves the user created in the CREATE step as orphaned data in the backend. The module's checklist emphasizes 'each test cleans up after itself' precisely because, without a guaranteed cleanup mechanism (e.g. an `afterEach` hook that deletes the resource regardless of whether the test passed or failed, or a `try/finally`), mid-CRUD-test failures accumulate garbage that can inflate counts, break 'empty list' assertions in other tests, or simply pollute the backend's shared state across runs.",
    },
    points: 3,
    timeEstimateSeconds: 115,
  },
];

/* ------------------------------------------------------------------ */
/*  Registration                                                       */
/* ------------------------------------------------------------------ */

registerQuestions(QUESTIONS);
