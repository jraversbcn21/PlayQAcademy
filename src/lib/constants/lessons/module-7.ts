/**
 * Module 7 — API Testing with Playwright
 *
 * The most DIFFERENTIATING module of the curriculum. Most Playwright
 * courses skip API testing entirely. Here the student learns to test
 * ANY layer of a modern application — UI and API — using a single
 * framework. Tests target the real PlayQ Playground REST API.
 *
 * Full bilingual lesson content for all 5 lessons in Module 7.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "m7-api-testing";

/* ================================================================== */
/*  Lesson 7.1 — APIRequestContext                                     */
/* ================================================================== */

const L7_1: LessonContent = {
  id: "m7-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: { es: "APIRequestContext", en: "APIRequestContext" },
    },
    {
      type: "paragraph",
      content: {
        es: "El mito más persistente sobre Playwright es que 'solo sirve para testing de UI'. Falso. Playwright incluye un cliente HTTP completo — `APIRequestContext` — que te permite hacer peticiones GET, POST, PUT, DELETE, PATCH y HEAD directamente desde tus tests, sin instalar axios, supertest ni fetch adicional. Esto significa que puedes probar el frontend Y el backend con UNA sola herramienta.",
        en: "The most persistent myth about Playwright is that 'it's only for UI testing'. False. Playwright includes a complete HTTP client — `APIRequestContext` — that lets you make GET, POST, PUT, DELETE, PATCH, and HEAD requests directly from your tests, without installing axios, supertest, or additional fetch. This means you can test the frontend AND the backend with ONE tool.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "¿Por qué probar APIs?", en: "Why test APIs?" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "VELOCIDAD: Un test de API tarda 50-200ms. Un test de UI tarda 2-5 segundos. Las APIs son 10-20x más rápidas.",
          en: "SPEED: An API test takes 50-200ms. A UI test takes 2-5 seconds. APIs are 10-20x faster.",
        },
        {
          es: "AISLAMIENTO: Pruebas el backend sin depender de que la UI esté terminada o estable.",
          en: "ISOLATION: You test the backend without depending on the UI being finished or stable.",
        },
        {
          es: "COBERTURA CRUD: Crear, leer, actualizar y eliminar recursos es el 80% de la lógica de backend — los tests de API cubren esto directamente.",
          en: "CRUD COVERAGE: Creating, reading, updating, and deleting resources is 80% of backend logic — API tests cover this directly.",
        },
        {
          es: "SETUP DE DATOS: Usa la API para crear datos de prueba antes de un test de UI — más rápido y fiable que hacerlo con clicks.",
          en: "DATA SETUP: Use the API to create test data before a UI test — faster and more reliable than doing it with clicks.",
        },
        {
          es: "VALIDACIÓN DE CONTRATO: Verifica que el backend respeta el contrato de la API (campos, tipos, códigos de estado) independientemente de la UI.",
          en: "CONTRACT VALIDATION: Verify the backend respects the API contract (fields, types, status codes) independently of the UI.",
        },
      ],
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Tu primer test de API", en: "Your first API test" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// El fixture 'request' es el APIRequestContext de Playwright
// Se inyecta igual que 'page' en los tests de UI

test('GET /api/playground/products returns products', async ({ request }) => {
  // request.get() devuelve una APIResponse
  const response = await request.get('/api/playground/products');

  // Verifica el código de estado
  expect(response.status()).toBe(200);

  // Verifica que la respuesta es exitosa
  expect(response.ok()).toBe(true);

  // Parsea el cuerpo JSON
  const body = await response.json();

  // Valida la estructura de la respuesta
  expect(body.success).toBe(true);
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);

  // Valida que cada producto tiene los campos esperados
  const product = body.data[0];
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('category');
  expect(product).toHaveProperty('inStock');
  expect(typeof product.price).toBe('number');
});`,
      caption: {
        es: "Primer test de API: GET a products, validación de status, estructura y tipos",
        en: "First API test: GET products, validating status, structure, and types",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Los tests de API se ejecutan en 50-200ms. Compáralo con los 2-5 segundos de un test de UI. Para escenarios que no necesitan interacción visual (CRUD, autenticación, validación de datos), los tests de API te dan la misma cobertura en una fracción del tiempo. Una suite híbrida (70% API, 30% UI) es el estándar profesional.",
        en: "💡 API tests run in 50-200ms. Compare that to 2-5 seconds for a UI test. For scenarios that don't need visual interaction (CRUD, authentication, data validation), API tests give you the same coverage in a fraction of the time. A hybrid suite (70% API, 30% UI) is the professional standard.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "El objeto APIResponse", en: "The APIResponse object" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('exploring the APIResponse object', async ({ request }) => {
  const response = await request.post('/api/playground/users', {
    data: {
      name: 'Test User',
      email: 'test@playq.test',
      role: 'QA Engineer',
    },
  });

  // ── Métodos de APIResponse ──

  // status(): código HTTP (200, 201, 404, 500...)
  expect(response.status()).toBe(201);

  // ok(): true si status está en el rango 200-299
  expect(response.ok()).toBe(true);

  // json(): parsea el cuerpo como JSON
  const body = await response.json();
  expect(body.success).toBe(true);
  expect(body.data.id).toBeGreaterThan(0);

  // text(): cuerpo completo como string
  const raw = await response.text();
  expect(raw).toContain('"success":true');

  // headers(): objeto con las cabeceras de respuesta
  const headers = response.headers();
  expect(headers['content-type']).toContain('application/json');

  // statusText(): texto del status ('Created', 'OK', 'Not Found')
  console.log(response.statusText()); // 'Created'

  // url(): URL final después de redirecciones
  console.log(response.url());
});`,
      caption: {
        es: "APIResponse expone status, ok, json, text, headers, statusText y url",
        en: "APIResponse exposes status, ok, json, text, headers, statusText, and url",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "request fixture vs page.request",
        en: "request fixture vs page.request",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// ── Opción 1: request fixture (standalone) ──
// Estado LIMPIO — no comparte cookies ni sesión con el navegador
// Ideal para tests de API pura, CRUD, auth sin UI

test('standalone: request fixture', async ({ request }) => {
  const res = await request.get('/api/playground/products');
  expect(res.status()).toBe(200);
});

// ── Opción 2: page.request (contexto de navegador) ──
// Comparte cookies, localStorage y sesión con el navegador
// Ideal para tests híbridos (API + UI en el mismo test)
// Útil cuando la UI y la API comparten estado de autenticación

test('browser context: page.request', async ({ page }) => {
  // Primero, login por UI (establece cookies de sesión)
  await page.goto('/playground/login');
  await page.getByLabel('Email').fill('student@playq.test');
  await page.getByLabel('Password').fill('Playwright123!');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Ahora page.request comparte las cookies de sesión
  const res = await page.request.get('/api/playground/protected');
  // Si la API usa las mismas cookies de sesión, esto funciona
  expect(res.status()).toBe(401); // Esta API usa Bearer token, no cookies
});`,
      caption: {
        es: "request fixture = estado limpio. page.request = comparte cookies con el navegador.",
        en: "request fixture = clean state. page.request = shares cookies with the browser.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "📘 Usa el `request` fixture para tests de API pura (sin UI). Usa `page.request` cuando necesites que la API comparta el estado de autenticación establecido por la UI. Si tu API usa tokens Bearer (como la del Playground), `request` es mejor porque pasas el token explícitamente en las cabeceras.",
        en: "📘 Use the `request` fixture for pure API tests (no UI). Use `page.request` when you need the API to share the authentication state established by the UI. If your API uses Bearer tokens (like the Playground's), `request` is better because you pass the token explicitly in headers.",
      },
    },
    {
      type: "quiz",
      questionId: "m7-l1-quiz",
      question: {
        es: "¿Cuándo deberías usar el fixture `request` en lugar de `page.request`?",
        en: "When should you use the `request` fixture instead of `page.request`?",
      },
      options: [
        { id: "a", text: { es: "Siempre, porque request es más rápido que page.request", en: "Always, because request is faster than page.request" } },
        { id: "b", text: { es: "Para tests de API pura que no dependen del estado del navegador — el request fixture tiene estado limpio y no comparte cookies", en: "For pure API tests that don't depend on browser state — the request fixture has a clean state and doesn't share cookies" } },
        { id: "c", text: { es: "Cuando necesitas hacer assertions visuales sobre la respuesta de la API", en: "When you need to make visual assertions about the API response" } },
        { id: "d", text: { es: "request y page.request son idénticos — usa el que prefieras", en: "request and page.request are identical — use whichever you prefer" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El fixture `request` crea un APIRequestContext independiente, sin cookies ni sesión de navegador. Es ideal para tests de API pura donde necesitas un estado limpio y control total sobre las cabeceras (ej: pasar tokens Bearer). `page.request` comparte el contexto del navegador, incluyendo cookies y localStorage, lo cual es útil en tests híbridos donde la UI ya estableció una sesión. No son intercambiables — elegir el correcto evita bugs de estado compartido.",
        en: "The `request` fixture creates an independent APIRequestContext, without browser cookies or session. It's ideal for pure API tests where you need a clean state and full control over headers (e.g., passing Bearer tokens). `page.request` shares the browser context, including cookies and localStorage, which is useful in hybrid tests where the UI already established a session. They're not interchangeable — choosing the right one avoids shared-state bugs.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 7.2 — GET, POST, PUT, DELETE requests                       */
/* ================================================================== */

const L7_2: LessonContent = {
  id: "m7-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "GET, POST, PUT, DELETE",
        en: "GET, POST, PUT, DELETE requests",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El ciclo de vida completo de un recurso REST se compone de cuatro operaciones: Crear (POST), Leer (GET), Actualizar (PUT) y Eliminar (DELETE). En esta lección ejecutarás el CRUD completo contra la API real de usuarios del PlayQ Playground, validando códigos de estado, cuerpos de respuesta y el estado del recurso después de cada operación.",
        en: "The complete lifecycle of a REST resource consists of four operations: Create (POST), Read (GET), Update (PUT), and Delete (DELETE). In this lesson you'll execute full CRUD against the real PlayQ Playground user API, validating status codes, response bodies, and the resource state after each operation.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "GET — listar y obtener por id", en: "GET — list and get by id" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('GET /users returns a list', async ({ request }) => {
  const response = await request.get('/api/playground/users');

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.success).toBe(true);
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);

  // Validar estructura de cada usuario
  const user = body.data[0];
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('role');
  expect(user).toHaveProperty('createdAt');
  expect(typeof user.id).toBe('number');
});

test('GET /users/:id returns a specific user', async ({ request }) => {
  // ID 1 siempre existe (Alice Johnson, seeded)
  const response = await request.get('/api/playground/users/1');

  expect(response.status()).toBe(200);
  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.data.name).toBe('Alice Johnson');
  expect(body.data.email).toBe('alice@example.com');
  expect(body.data.role).toBe('QA Engineer');
});

test('GET /users/:id returns 404 for non-existent', async ({ request }) => {
  const response = await request.get('/api/playground/users/9999');
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.success).toBe(false);
  expect(body.error).toBe('User not found');
});`,
      caption: {
        es: "GET: lista completa, recurso individual, y caso 404 — los tres escenarios esenciales",
        en: "GET: full list, individual resource, and 404 case — the three essential scenarios",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "POST — crear recursos", en: "POST — creating resources" },
    },
    {
      type: "code",
      language: "typescript",
      code: `test('POST /users creates a new user', async ({ request }) => {
  const newUser = {
    name: 'Diana Prince',
    email: 'diana@playq.test',
    role: 'QA Engineer',
  };

  const response = await request.post('/api/playground/users', {
    data: newUser,
  });

  // POST exitoso devuelve 201 (Created)
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.success).toBe(true);

  // La API devuelve el recurso creado con un id auto-generado
  expect(body.data.id).toBeGreaterThan(0);
  expect(body.data.name).toBe(newUser.name);
  expect(body.data.email).toBe(newUser.email);
  expect(body.data.role).toBe(newUser.role);
  expect(body.data).toHaveProperty('createdAt');
});

test('POST /users with missing fields returns 400', async ({ request }) => {
  const response = await request.post('/api/playground/users', {
    data: { name: 'Incomplete User' },
    // Faltan email y role
  });

  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.success).toBe(false);
});`,
      caption: {
        es: "POST: creación exitosa con 201 + campos reflejados, y validación 400 con campos faltantes",
        en: "POST: successful creation with 201 + echoed fields, and 400 validation with missing fields",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "PUT — actualizar recursos", en: "PUT — updating resources" },
    },
    {
      type: "code",
      language: "typescript",
      code: `test('PUT /users/:id updates a user', async ({ request }) => {
  // 1. Crear usuario para actualizar
  const createRes = await request.post('/api/playground/users', {
    data: {
      name: 'Bruce Wayne',
      email: 'bruce@playq.test',
      role: 'Developer',
    },
  });
  const { id } = (await createRes.json()).data;

  // 2. Actualizar nombre y email
  const putRes = await request.put(\`/api/playground/users/\${id}\`, {
    data: {
      name: 'Batman',
      email: 'batman@playq.test',
      role: 'Superhero',
    },
  });

  expect(putRes.status()).toBe(200);
  const updated = (await putRes.json()).data;
  expect(updated.name).toBe('Batman');
  expect(updated.email).toBe('batman@playq.test');
  expect(updated.role).toBe('Superhero');
  // El id se mantiene (la API no permite cambiarlo)
  expect(updated.id).toBe(id);

  // 3. Verificar con GET que los cambios persisten
  const getRes = await request.get(\`/api/playground/users/\${id}\`);
  expect((await getRes.json()).data.name).toBe('Batman');
});

test('PUT /users/:id returns 404 for non-existent', async ({ request }) => {
  const response = await request.put('/api/playground/users/9999', {
    data: { name: 'Nobody' },
  });
  expect(response.status()).toBe(404);
});`,
      caption: {
        es: "PUT: crear → actualizar → verificar persistencia con GET. El patrón completo.",
        en: "PUT: create → update → verify persistence with GET. The complete pattern.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "DELETE — eliminar recursos", en: "DELETE — removing resources" },
    },
    {
      type: "code",
      language: "typescript",
      code: `test('DELETE /users/:id removes a user', async ({ request }) => {
  // 1. Crear usuario para eliminar
  const createRes = await request.post('/api/playground/users', {
    data: {
      name: 'Temporary User',
      email: 'temp@playq.test',
      role: 'Tester',
    },
  });
  const { id } = (await createRes.json()).data;

  // 2. Eliminar
  const delRes = await request.delete(\`/api/playground/users/\${id}\`);
  expect(delRes.status()).toBe(200);

  const delBody = await delRes.json();
  expect(delBody.success).toBe(true);
  expect(delBody.message).toBe('User deleted');

  // 3. Verificar que ya no existe (GET debe devolver 404)
  const verifyRes = await request.get(\`/api/playground/users/\${id}\`);
  expect(verifyRes.status()).toBe(404);
});

test('DELETE /users/:id returns 404 for already-deleted', async ({ request }) => {
  const response = await request.delete('/api/playground/users/9999');
  expect(response.status()).toBe(404);
});`,
      caption: {
        es: "DELETE: crear → eliminar → verificar 404. El patrón: crea lo que necesitas, limpia después.",
        en: "DELETE: create → delete → verify 404. The pattern: create what you need, clean up after.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 Valida SIEMPRE el código de estado Y el cuerpo de la respuesta. Un 200 con `{ success: false }` es un test roto que pasa. Un 404 con `{ error: 'User not found' }` confirma que el recurso realmente se eliminó. El código de estado por sí solo no es un contrato — el cuerpo de la respuesta lo completa.",
        en: "🔑 ALWAYS validate the status code AND the response body. A 200 with `{ success: false }` is a broken test that passes. A 404 with `{ error: 'User not found' }` confirms the resource was really deleted. The status code alone is not a contract — the response body completes it.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Query params y cabeceras", en: "Query params and headers" },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Pasar query params, cabeceras personalizadas y timeout

// Query params: ?category=Books&limit=5
const res = await request.get('/api/playground/products', {
  params: {
    category: 'Books',
    // La API del Playground no filtra por params realmente,
    // pero este es el patrón estándar para APIs que sí lo hacen
  },
});

// Cabeceras personalizadas (trazabilidad, autenticación, etc.)
const authRes = await request.get('/api/playground/protected', {
  headers: {
    Authorization: 'Bearer playq_mock_jwt_student_abc123',
    'X-Trace-Id': 'trace-123',
    'Accept-Language': 'es-ES',
  },
});

// Timeout personalizado por petición (ms)
const slowRes = await request.get('/api/playground/products', {
  timeout: 10000, // 10 segundos para esta petición específica
});`,
      caption: {
        es: "Opciones de petición: params, headers y timeout por llamada individual",
        en: "Request options: params, headers, and timeout per individual call",
      },
    },
    {
      type: "quiz",
      questionId: "m7-l2-quiz",
      question: {
        es: "Al probar un DELETE /users/:id, ¿cuál es la secuencia correcta de validación?",
        en: "When testing DELETE /users/:id, what is the correct validation sequence?",
      },
      options: [
        { id: "a", text: { es: "DELETE → verificar status 200 → fin", en: "DELETE → verify status 200 → done" } },
        { id: "b", text: { es: "DELETE → verificar status 200 y body.success → GET del mismo id → verificar status 404", en: "DELETE → verify status 200 and body.success → GET same id → verify status 404" } },
        { id: "c", text: { es: "DELETE → GET del mismo id → verificar status 200", en: "DELETE → GET same id → verify status 200" } },
        { id: "d", text: { es: "DELETE → verificar que el body.data es null", en: "DELETE → verify body.data is null" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Validar solo el código de estado del DELETE es insuficiente — no confirma que el recurso realmente desapareció. La secuencia completa es: (1) DELETE devuelve 200 + success:true, (2) un GET de seguimiento al mismo id devuelve 404, confirmando que el recurso ya no existe. Este patrón 'delete + verify-gone' es el estándar profesional para tests de eliminación.",
        en: "Validating only the DELETE status code is insufficient — it doesn't confirm the resource actually disappeared. The complete sequence is: (1) DELETE returns 200 + success:true, (2) a follow-up GET to the same id returns 404, confirming the resource no longer exists. This 'delete + verify-gone' pattern is the professional standard for deletion tests.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 7.3 — Mixing UI and API tests                               */
/* ================================================================== */

const L7_3: LessonContent = {
  id: "m7-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Mezclando tests UI y API",
        en: "Mixing UI and API tests",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El verdadero superpoder de Playwright no es probar UI o API por separado — es COMBINARLOS. Usas la API para preparar datos en milisegundos, luego la UI para verificar que el usuario los ve correctamente. O haces que el usuario interactúe con la UI y verificas con la API que los datos se guardaron. Este patrón híbrido es lo que usan los equipos de QA más avanzados del mundo.",
        en: "Playwright's real superpower isn't testing UI or API separately — it's COMBINING them. You use the API to set up data in milliseconds, then the UI to verify the user sees it correctly. Or you have the user interact with the UI and verify with the API that the data was saved. This hybrid pattern is what the world's most advanced QA teams use.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Cada vez que te encuentres haciendo 10 clicks de UI para preparar datos de prueba, pregúntate: '¿podría hacer un POST en lugar de esto?'. La respuesta casi siempre es sí. Un POST tarda 100ms. Diez clicks de UI tardan 10 segundos y pueden fallar por mil razones de frontend que no tienen nada que ver con lo que estás probando.",
        en: "💡 Every time you find yourself doing 10 UI clicks to set up test data, ask yourself: 'could I POST this instead?' The answer is almost always yes. A POST takes 100ms. Ten UI clicks take 10 seconds and can fail for a thousand frontend reasons that have nothing to do with what you're testing.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Patrón 1: API setup → UI test",
        en: "Pattern 1: API setup → UI test",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// Patrón 1: La API crea los datos, la UI los verifica
// Ideal para: escenarios que requieren datos pre-existentes

test('catalog shows newly created product', async ({ page, request }) => {
  // ── Fase 1: API setup (100ms) ──
  // Creamos un usuario vía API (los datos existen en el backend)
  await request.post('/api/playground/users', {
    data: {
      name: 'UI Test User',
      email: 'uitest@playq.test',
      role: 'QA Engineer',
    },
  });

  // ── Fase 2: UI verification (2-5s) ──
  // Verificamos que el usuario aparece en la lista de usuarios
  await page.goto('/playground/dynamic');
  await page.getByRole('button', { name: 'Load Users' }).click();

  // La UI debe mostrar el usuario creado por API
  await expect(page.getByText('UI Test User')).toBeVisible();
  await expect(page.getByText('uitest@playq.test')).toBeVisible();
});

// Sin el patrón híbrido, tendrías que:
// 1. Navegar al formulario de creación (click)
// 2. Llenar nombre (fill) → 3. Llenar email (fill)
// 4. Llenar role (fill) → 5. Click Submit (click)
// 6. Esperar confirmación → 7. Navegar a la lista
// = 7 interacciones de UI frágiles vs 1 POST de API`,
      caption: {
        es: "Patrón 1: API crea los datos en 100ms, la UI verifica la presentación",
        en: "Pattern 1: API creates data in 100ms, UI verifies the presentation",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Patrón 2: UI action → API verification",
        en: "Pattern 2: UI action → API verification",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// Patrón 2: La UI ejecuta la acción, la API verifica el resultado
// Ideal para: confirmar que acciones de UI persisten correctamente

test('signup wizard persists data on the backend', async ({ page, request }) => {
  await page.goto('/playground/signup');

  // ── Fase 1: UI action ──
  await page.getByLabel('Full Name').fill('API Verify User');
  await page.getByLabel('Email').fill('apiverify@playq.test');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Username').fill('apiverify');
  await page.getByLabel('Password', { exact: true }).fill('Pass123!');
  await page.getByLabel('Confirm Password').fill('Pass123!');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  // ── Fase 2: API verification ──
  // La API confirma que los datos se guardaron (independiente de la UI)
  const response = await request.get('/api/playground/users');
  const users = (await response.json()).data;
  const created = users.find(
    (u: { email: string }) => u.email === 'apiverify@playq.test'
  );

  expect(created).toBeDefined();
  // La UI puede estar rota, pero la API nos dice si los datos llegaron
});`,
      caption: {
        es: "Patrón 2: La UI ejecuta acciones, la API verifica la persistencia de datos",
        en: "Pattern 2: UI executes actions, API verifies data persistence",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Patrón 3: storageState para sesión compartida",
        en: "Pattern 3: storageState for shared session",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `// Patrón 3: Autenticarse vía API, guardar estado, reutilizar en UI
// Este es el patrón que acelera suites enteras

// Paso 1: Test de setup que guarda el estado de autenticación
// Archivo: tests/auth.setup.ts

import { test as setup } from '@playwright/test';

const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate via API', async ({ request }) => {
  // Login vía API — cero clicks de UI
  const loginRes = await request.post('/api/playground/auth/login', {
    data: {
      email: 'student@playq.test',
      password: 'Playwright123!',
    },
  });

  const { token } = (await loginRes.json()).data;

  // Guardar el token en storageState para que los tests de UI lo usen
  // En un proyecto real, guardarías cookies/localStorage completos
  // Playwright puede serializar el estado del navegador con:
  // await page.context().storageState({ path: AUTH_FILE });
});

// Paso 2: playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        // storageState: AUTH_FILE, // ← hereda la sesión del setup
      },
      dependencies: ['setup'], // ← setup se ejecuta primero
    },
  ],
});`,
      caption: {
        es: "Patrón 3: autenticación vía API → storageState → tests de UI sin repetir login",
        en: "Pattern 3: API authentication → storageState → UI tests without repeating login",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 `storageState` es la mayor ganancia de rendimiento en suites de test maduras. En lugar de hacer login por UI en cada test (2-5 segundos × 100 tests = 5 minutos perdidos), haces login UNA vez vía API (100ms) y compartes el estado con todos los tests. Tus 100 tests pasan de 8 minutos a 3 minutos. Esa es la diferencia entre un pipeline que el equipo espera y uno que el equipo ignora.",
        en: "🔑 `storageState` is the single biggest performance win in mature test suites. Instead of logging in via UI in every test (2-5 seconds × 100 tests = 5 minutes wasted), you log in ONCE via API (100ms) and share the state with all tests. Your 100 tests go from 8 minutes to 3 minutes. That's the difference between a pipeline the team waits for and one the team ignores.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "El argumento del rendimiento", en: "The performance argument" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "VELOCIDAD: Un test híbrido (API setup + UI verify) es 3-5x más rápido que un test puro de UI equivalente.",
          en: "SPEED: A hybrid test (API setup + UI verify) is 3-5x faster than an equivalent pure UI test.",
        },
        {
          es: "FIABILIDAD: Menos pasos de UI = menos puntos de fallo por timeouts, selectores rotos, o animaciones lentas.",
          en: "RELIABILITY: Fewer UI steps = fewer failure points from timeouts, broken selectors, or slow animations.",
        },
        {
          es: "AISLAMIENTO: Si la UI de creación de usuarios se rompe, tus tests de catálogo no deberían fallar. Con API setup, no fallan.",
          en: "ISOLATION: If the user creation UI breaks, your catalog tests shouldn't fail. With API setup, they don't.",
        },
        {
          es: "PARALELISMO: Los setups vía API son independientes y no compiten por recursos de UI (un solo navegador).",
          en: "PARALLELISM: API setups are independent and don't compete for UI resources (a single browser).",
        },
        {
          es: "MANTENIMIENTO: Un cambio en el flujo de UI de creación de usuarios solo afecta a 1 test (el de esa UI), no a 50 tests que lo usaban como setup.",
          en: "MAINTENANCE: A change in the user creation UI flow only affects 1 test (that UI's test), not 50 tests that used it as setup.",
        },
      ],
    },
    {
      type: "quiz",
      questionId: "m7-l3-quiz",
      question: {
        es: "Un test necesita verificar que la página de catálogo muestra productos correctamente. ¿Cuál es el enfoque óptimo?",
        en: "A test needs to verify the catalog page displays products correctly. What is the optimal approach?",
      },
      options: [
        { id: "a", text: { es: "Crear los productos haciendo clicks en la UI de administración, luego verificar el catálogo", en: "Create products by clicking through the admin UI, then verify the catalog" } },
        { id: "b", text: { es: "Crear los productos vía POST a la API (100ms), luego verificar que la UI del catálogo los muestra correctamente", en: "Create products via POST to the API (100ms), then verify the catalog UI displays them correctly" } },
        { id: "c", text: { es: "Solo verificar que la UI muestra 'cargando...' sin preocuparse por los datos", en: "Only verify the UI shows 'loading...' without worrying about the data" } },
        { id: "d", text: { es: "Asumir que los productos existen y solo verificar que la página carga sin errores", en: "Assume products exist and only verify the page loads without errors" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El setup vía API es el enfoque profesional. Creas los datos de prueba con un POST (100ms) y dedicas el test de UI a verificar EXACTAMENTE lo que te importa: que el catálogo renderiza los productos correctamente. El enfoque de UI pura (a) es frágil y lento — si la UI de administración se rompe, tus tests de catálogo fallan por una razón que no tiene nada que ver con el catálogo. Este principio se llama 'test isolation': cada test debe fallar por UNA sola razón.",
        en: "API setup is the professional approach. You create test data with a POST (100ms) and dedicate the UI test to verifying EXACTLY what matters: that the catalog renders products correctly. The pure UI approach (a) is fragile and slow — if the admin UI breaks, your catalog tests fail for a reason that has nothing to do with the catalog. This principle is called 'test isolation': each test should fail for ONE reason only.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 7.4 — Mocking API responses                                 */
/* ================================================================== */

const L7_4: LessonContent = {
  id: "m7-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Mockeando respuestas API",
        en: "Mocking API responses",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "A veces necesitas probar cómo reacciona tu UI ante estados del backend que son difíciles o imposibles de reproducir con la API real: un error 500 en producción, una respuesta vacía, o una latencia de 3 segundos. `page.route()` te permite INTERCEPTAR las peticiones que el navegador hace a la API y responder con lo que tú quieras — datos mockeados, errores, o delays — sin tocar el backend real.",
        en: "Sometimes you need to test how your UI reacts to backend states that are hard or impossible to reproduce with the real API: a 500 error in production, an empty response, or 3-second latency. `page.route()` lets you INTERCEPT the requests the browser makes to the API and respond with whatever you want — mocked data, errors, or delays — without touching the real backend.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "Mockeando un camino feliz",
        en: "Mocking a happy path",
      },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

test('mock products endpoint to control UI state', async ({ page }) => {
  // Intercepta todas las peticiones GET a /api/playground/products
  await page.route('**/api/playground/products', async (route) => {
    // Responde con datos mockeados — el backend real nunca se entera
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: [
          {
            id: 1,
            name: 'Mocked Product A',
            price: 19.99,
            category: 'Mocked',
            inStock: true,
          },
          {
            id: 2,
            name: 'Mocked Product B',
            price: 29.99,
            category: 'Mocked',
            inStock: true,
          },
        ],
        count: 2,
      }),
    });
  });

  await page.goto('/playground/catalog');

  // La UI ahora muestra los productos mockeados, no los reales
  await expect(page.getByText('Mocked Product A')).toBeVisible();
  await expect(page.getByText('Mocked Product B')).toBeVisible();
  // El count también refleja los datos mockeados
  await expect(page.getByText('2 products')).toBeVisible();
});`,
      caption: {
        es: "page.route() intercepta la petición y responde con datos inventados — el backend real no participa",
        en: "page.route() intercepts the request and responds with made-up data — the real backend never participates",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Mockeando errores", en: "Mocking errors" },
    },
    {
      type: "code",
      language: "typescript",
      code: `test('UI shows error state when API returns 500', async ({ page }) => {
  // Mockea un error 500 del servidor
  await page.route('**/api/playground/products', async (route) => {
    await route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
      }),
    });
  });

  await page.goto('/playground/catalog');

  // La UI debería mostrar un estado de error
  // (depende de cómo tu aplicación maneje errores de API)
  await expect(page.getByText('Error loading products')).toBeVisible();
});

test('UI shows empty state when API returns empty array', async ({ page }) => {
  // Mockea una respuesta vacía
  await page.route('**/api/playground/products', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: [],
        count: 0,
      }),
    });
  });

  await page.goto('/playground/catalog');

  // La UI debería mostrar un mensaje de 'no hay productos'
  await expect(page.getByText('No products found')).toBeVisible();
});`,
      caption: {
        es: "Mockear errores 500 y arrays vacíos: prueba cómo tu UI maneja estados extremos",
        en: "Mocking 500 errors and empty arrays: test how your UI handles edge states",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Simulando redes lentas", en: "Simulating slow networks" },
    },
    {
      type: "code",
      language: "typescript",
      code: `test('UI shows loading state during slow API response', async ({ page }) => {
  await page.route('**/api/playground/products', async (route) => {
    // Simula 3 segundos de latencia de red
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Luego responde normalmente
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: [
          { id: 1, name: 'Delayed Product', price: 9.99, category: 'Books', inStock: true },
        ],
        count: 1,
      }),
    });
  });

  await page.goto('/playground/catalog');

  // Inmediatamente después de cargar, debería verse un spinner/loader
  await expect(page.getByRole('progressbar')).toBeVisible();

  // Después de 3 segundos, debería aparecer el contenido
  await expect(page.getByText('Delayed Product')).toBeVisible({ timeout: 5000 });
});`,
      caption: {
        es: "Simular latencia con setTimeout antes de route.fulfill() para probar spinners y loaders",
        en: "Simulate latency with setTimeout before route.fulfill() to test spinners and loaders",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 En desarrollo local, el backend suele responder en <10ms. Tus spinners de carga NUNCA se muestran el tiempo suficiente para ser visibles. Mockear delays de 2-3 segundos es la única forma de probar que tus estados de carga funcionan correctamente. Sin este test, el primer usuario con una conexión lenta verá un bug que tú nunca detectaste.",
        en: "💡 In local development, the backend usually responds in <10ms. Your loading spinners NEVER show long enough to be visible. Mocking 2-3 second delays is the only way to test that your loading states work correctly. Without this test, the first user with a slow connection will see a bug you never detected.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Mockeo selectivo", en: "Selective mocking" },
    },
    {
      type: "code",
      language: "typescript",
      code: `import { test, expect } from '@playwright/test';

// Mockear SOLO algunos endpoints, dejar que los demás pasen al backend real

test('mock products but let users through to real API', async ({ page }) => {
  // Intercepta solo /products
  await page.route('**/api/playground/products', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        success: true,
        data: [{ id: 99, name: 'Mocked Only', price: 0, category: 'Test', inStock: true }],
        count: 1,
      }),
    });
  });

  // Las peticiones a /users pasan directamente al backend real
  // No se necesita route.continue() — por defecto, las rutas no interceptadas pasan

  await page.goto('/playground/catalog');
  await expect(page.getByText('Mocked Only')).toBeVisible();
});

// route.continue() — deja pasar la petición al backend real
// Útil cuando necesitas modificar la petición pero no la respuesta
await page.route('**/api/**', async (route, request) => {
  // Añadir una cabecera de debug a todas las peticiones API
  const headers = {
    ...request.headers(),
    'X-Debug': 'true',
  };
  await route.continue({ headers });
});

// route.abort() — simula un fallo de red (sin respuesta del servidor)
await page.route('**/api/playground/products', async (route) => {
  await route.abort('connectionrefused');
  // La UI debería mostrar un error de conexión, no un error HTTP
});`,
      caption: {
        es: "Mockeo selectivo: solo /products se mockea; el resto de la API funciona normalmente",
        en: "Selective mocking: only /products is mocked; the rest of the API works normally",
      },
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "⚠️ El sobre-mockeo es peligroso. Si mockeas TODAS las APIs, tus tests pasan contra una versión FICTICIA de tu backend. El equilibrio ideal: mockea solo los endpoints que necesitan estados difíciles de reproducir (errores, edge cases, lentitud). El resto de los endpoints deben probarse contra el backend REAL para detectar cambios de contrato. Un test que solo prueba mocks no prueba tu aplicación — prueba tus mocks.",
        en: "⚠️ Over-mocking is dangerous. If you mock ALL APIs, your tests pass against a FICTIONAL version of your backend. The ideal balance: mock only the endpoints that need hard-to-reproduce states (errors, edge cases, slowness). The rest of the endpoints should be tested against the REAL backend to detect contract changes. A test that only tests mocks doesn't test your application — it tests your mocks.",
      },
    },
    {
      type: "quiz",
      questionId: "m7-l4-quiz",
      question: {
        es: "¿Cuándo es apropiado usar page.route() para mockear una API?",
        en: "When is it appropriate to use page.route() to mock an API?",
      },
      options: [
        { id: "a", text: { es: "Siempre — los tests con mocks son más rápidos y fiables que los tests contra APIs reales", en: "Always — tests with mocks are faster and more reliable than tests against real APIs" } },
        { id: "b", text: { es: "Cuando necesitas probar cómo reacciona la UI a estados del backend difíciles de reproducir (errores 500, arrays vacíos, latencia alta)", en: "When you need to test how the UI reacts to backend states that are hard to reproduce (500 errors, empty arrays, high latency)" } },
        { id: "c", text: { es: "Nunca — los mocks no son testing real y no deberían usarse en una suite profesional", en: "Never — mocks aren't real testing and shouldn't be used in a professional suite" } },
        { id: "d", text: { es: "Solo cuando el backend real no está disponible (ej: el desarrollador backend está de vacaciones)", en: "Only when the real backend is unavailable (e.g., the backend developer is on vacation)" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Los mocks son una herramienta, no un sustituto. Su valor está en probar escenarios que el backend real no puede generar bajo demanda: errores 500, timeouts de red, respuestas vacías, o picos de latencia. Pero los tests exclusivamente mockeados no detectan cambios reales en la API — para eso necesitas tests contra el backend real. La suite profesional combina ambos: tests de API real para contrato, mocks para edge cases de UI.",
        en: "Mocks are a tool, not a substitute. Their value is in testing scenarios the real backend can't generate on demand: 500 errors, network timeouts, empty responses, or latency spikes. But purely mocked tests don't detect real API changes — for that you need tests against the real backend. The professional suite combines both: real API tests for contract, mocks for UI edge cases.",
      },
    },
  ],
};

/* ================================================================== */
/*  Lesson 7.5 — Practical Exercise: Test a REST API                   */
/* ================================================================== */

const L7_5: LessonContent = {
  id: "m7-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 1,
      content: {
        es: "Ejercicio práctico: Testea una API REST",
        en: "Practical Exercise: Test a REST API",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "Este ejercicio consolida todo lo aprendido en los Módulos 5, 6 y 7. Vas a escribir una suite completa de tests de API contra los endpoints reales del PlayQ Playground, usando TypeScript para tipado estricto, el fixture `request` para estado limpio, y validando tanto códigos de estado como la forma de los cuerpos de respuesta.",
        en: "This exercise consolidates everything learned in Modules 5, 6, and 7. You'll write a complete API test suite against the real PlayQ Playground endpoints, using TypeScript for strict typing, the `request` fixture for clean state, and validating both status codes and response body shapes.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "💡 Cada test debe ser autocontenido: crea los datos que necesitas al principio y limpia al final. No asumas que otros tests dejaron el estado listo para ti. Un test que depende del orden de ejecución es un test que fallará misteriosamente en paralelo.",
        en: "💡 Each test should be self-contained: create the data you need at the start and clean up at the end. Don't assume other tests left the state ready for you. A test that depends on execution order is a test that will fail mysteriously in parallel.",
      },
    },
    {
      type: "exercise",
      exerciseId: "m7-l5-exercise",
      instructions: {
        es: "Escribe una suite de tests de API contra la API REST del PlayQ Playground en `http://localhost:3000/api/playground` cubriendo:\n\n1) GET /products devuelve un array no vacío con ítems que tienen los campos id, name, price, category e inStock\n2) Ciclo de vida CRUD completo de usuarios:\n   a) POST /users crea un usuario, devuelve 201 + el nuevo id\n   b) GET /users/[id] devuelve ese usuario con los campos correctos\n   c) PUT /users/[id] actualiza nombre, email y role\n   d) DELETE /users/[id] devuelve 200 + message\n   e) GET /users/[id] de seguimiento devuelve 404\n3) Flujo de autenticación:\n   a) POST /auth/login con credenciales válidas (student@playq.test / Playwright123!) devuelve 200 + token\n   b) GET /protected con el token devuelve 200\n   c) GET /protected sin token devuelve 401\n\nUsa el fixture `request`, no `page.request`. Valida TANTO códigos de estado COMO la forma del cuerpo de respuesta. Usa interfaces de TypeScript para type safety.",
        en: "Write an API test suite against the PlayQ Playground REST API at `http://localhost:3000/api/playground` covering:\n\n1) GET /products returns a non-empty array with items having id, name, price, category, and inStock fields\n2) Full user CRUD lifecycle:\n   a) POST /users creates a user, returns 201 + the new id\n   b) GET /users/[id] returns that user with correct fields\n   c) PUT /users/[id] updates name, email, and role\n   d) DELETE /users/[id] returns 200 + message\n   e) Follow-up GET /users/[id] returns 404\n3) Auth flow:\n   a) POST /auth/login with valid credentials (student@playq.test / Playwright123!) returns 200 + token\n   b) GET /protected with the token returns 200\n   c) GET /protected without token returns 401\n\nUse the `request` fixture, not `page.request`. Validate BOTH status codes AND response body shape. Use TypeScript interfaces for type safety.",
      },
      starterCode: `import { test, expect } from '@playwright/test';

interface Product {
  // TODO: define product shape
}

interface User {
  // TODO: define user shape
}

interface ApiResponse<T> {
  // TODO: define API response envelope
}

interface LoginData {
  // TODO: define login response shape
}

test.describe('PlayQ Playground API', () => {
  test('GET /products returns a non-empty array with valid items',
    async ({ request }) => {
    // TODO: implement
  });

  test('full user CRUD lifecycle', async ({ request }) => {
    // TODO: POST → GET → PUT → DELETE → GET (verify 404)
  });

  test('auth flow — login, protect, reject', async ({ request }) => {
    // TODO: POST /auth/login → GET /protected with token → GET without
  });
});`,
      solution: `import { test, expect } from '@playwright/test';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface LoginData {
  token: string;
  user: {
    email: string;
    role: string;
  };
}

test.describe('PlayQ Playground API', () => {
  test('GET /products returns a non-empty array with valid items',
    async ({ request }) => {
    const response = await request.get('/api/playground/products');

    expect(response.status()).toBe(200);

    const body = (await response.json()) as ApiResponse<Product[]>;
    expect(body.success).toBe(true);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data!.length).toBeGreaterThan(0);

    const product = body.data![0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('inStock');
    expect(typeof product.id).toBe('number');
    expect(typeof product.price).toBe('number');
    expect(typeof product.inStock).toBe('boolean');
  });

  test('full user CRUD lifecycle', async ({ request }) => {
    const newUser = {
      name: 'CRUD Test User',
      email: 'crud-test@playq.test',
      role: 'QA Engineer',
    };

    // ── CREATE ──
    const createRes = await request.post('/api/playground/users', {
      data: newUser,
    });
    expect(createRes.status()).toBe(201);

    const created = (await createRes.json()) as ApiResponse<User>;
    expect(created.success).toBe(true);
    expect(created.data!.name).toBe(newUser.name);
    expect(created.data!.email).toBe(newUser.email);
    const userId = created.data!.id;
    expect(userId).toBeGreaterThan(0);

    // ── READ ──
    const getRes = await request.get(
      \`/api/playground/users/\${userId}\`
    );
    expect(getRes.status()).toBe(200);

    const fetched = (await getRes.json()) as ApiResponse<User>;
    expect(fetched.data!.id).toBe(userId);
    expect(fetched.data!.name).toBe(newUser.name);

    // ── UPDATE ──
    const putRes = await request.put(
      \`/api/playground/users/\${userId}\`,
      {
        data: {
          name: 'Updated CRUD User',
          email: 'updated-crud@playq.test',
          role: 'Automation Lead',
        },
      }
    );
    expect(putRes.status()).toBe(200);

    const updated = (await putRes.json()) as ApiResponse<User>;
    expect(updated.data!.name).toBe('Updated CRUD User');
    expect(updated.data!.email).toBe('updated-crud@playq.test');
    expect(updated.data!.role).toBe('Automation Lead');

    // ── DELETE ──
    const delRes = await request.delete(
      \`/api/playground/users/\${userId}\`
    );
    expect(delRes.status()).toBe(200);
    const delBody = await delRes.json();
    expect(delBody.success).toBe(true);
    expect(delBody.message).toBe('User deleted');

    // ── VERIFY GONE ──
    const verifyRes = await request.get(
      \`/api/playground/users/\${userId}\`
    );
    expect(verifyRes.status()).toBe(404);
  });

  test('auth flow — login, protect, reject', async ({ request }) => {
    // ── LOGIN ──
    const loginRes = await request.post(
      '/api/playground/auth/login',
      {
        data: {
          email: 'student@playq.test',
          password: 'Playwright123!',
        },
      }
    );
    expect(loginRes.status()).toBe(200);

    const auth = (await loginRes.json()) as ApiResponse<LoginData>;
    expect(auth.success).toBe(true);
    const token = auth.data!.token;
    expect(token).toBeTruthy();
    expect(auth.data!.user.email).toBe('student@playq.test');
    expect(auth.data!.user.role).toBe('student');

    // ── PROTECTED WITH TOKEN ──
    const okRes = await request.get('/api/playground/protected', {
      headers: { Authorization: \`Bearer \${token}\` },
    });
    expect(okRes.status()).toBe(200);
    expect((await okRes.json()).success).toBe(true);

    // ── PROTECTED WITHOUT TOKEN ──
    const noAuthRes = await request.get('/api/playground/protected');
    expect(noAuthRes.status()).toBe(401);

    const noAuthBody = await noAuthRes.json();
    expect(noAuthBody.success).toBe(false);
  });
});`,
      hints: [
        {
          es: "Usa el fixture `request` como parámetro del test, no `page.request`. Cada test recibe su propio APIRequestContext con estado limpio, sin cookies ni sesión compartida.",
          en: "Use the `request` fixture as the test parameter, not `page.request`. Each test receives its own APIRequestContext with clean state, no shared cookies or session.",
        },
        {
          es: "Define interfaces de TypeScript que coincidan con la forma de respuesta de la API: `{ success, data, error }`. El campo `data` es genérico para poder usarlo como `ApiResponse<User>` o `ApiResponse<Product[]>`. La API del Playground SIEMPRE responde con este sobre.",
          en: "Define TypeScript interfaces matching the API response shape: `{ success, data, error }`. The `data` field is generic so you can use it as `ApiResponse<User>` or `ApiResponse<Product[]>`. The Playground API ALWAYS responds with this envelope.",
        },
        {
          es: "Para el CRUD, guarda el `id` del usuario creado en una variable. Pásalo en la URL para GET, PUT y DELETE (`/api/playground/users/${userId}`). Verifica la eliminación esperando 404 en un GET de seguimiento — ese es el patrón profesional.",
          en: "For CRUD, save the created user's `id` in a variable. Pass it in the URL for GET, PUT, and DELETE (`/api/playground/users/${userId}`). Verify deletion by expecting 404 on a follow-up GET — that's the professional pattern.",
        },
        {
          es: "Para el flujo de auth, extrae el `token` del cuerpo de la respuesta de login. Pásalo como `Authorization: Bearer ${token}` en las cabeceras de la petición a `/protected`. La petición sin token debe devolver 401 con `success: false`.",
          en: "For the auth flow, extract the `token` from the login response body. Pass it as `Authorization: Bearer ${token}` in the headers of the `/protected` request. The request without token should return 401 with `success: false`.",
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "🔑 CHECKLIST DE API TESTING — Tu suite de API está lista para producción si:\n\n• ✅ Códigos de estado validados en cada petición (200, 201, 401, 404)\n• ✅ Cuerpos de respuesta validados con interfaces TypeScript\n• ✅ Cada test crea sus propios datos (no depende de estado compartido)\n• ✅ Cada test limpia después de sí mismo (DELETE al final)\n• ✅ Casos de error probados (404, 401, campos faltantes)\n• ✅ Tests seguros para ejecutar en paralelo (sin dependencias entre tests)",
        en: "🔑 API TESTING CHECKLIST — Your API suite is production-ready if:\n\n• ✅ Status codes validated on every request (200, 201, 401, 404)\n• ✅ Response bodies validated with TypeScript interfaces\n• ✅ Each test creates its own data (no shared-state dependency)\n• ✅ Each test cleans up after itself (DELETE at the end)\n• ✅ Error cases tested (404, 401, missing fields)\n• ✅ Tests safe to run in parallel (no inter-test dependencies)",
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
        es: "Has completado el módulo más diferenciador del currículum. Ahora puedes probar cualquier capa de una aplicación — UI y API — con una sola herramienta. Sabes cuándo usar `request` vs `page.request`, cómo ejecutar CRUD completo contra APIs REST, cómo combinar tests de UI y API para máxima velocidad, y cómo mockear respuestas para probar edge cases. En el Módulo 8 (CI/CD y Reportes), llevarás todo esto a producción: integrarás tus tests en GitHub Actions, generarás reportes HTML profesionales con trazas y videos, y configurarás notificaciones para que tu equipo sepa instantáneamente si algo se rompió.",
        en: "You've completed the most differentiating module of the curriculum. You can now test any layer of an application — UI and API — with a single tool. You know when to use `request` vs `page.request`, how to execute full CRUD against REST APIs, how to combine UI and API tests for maximum speed, and how to mock responses to test edge cases. In Module 8 (CI/CD and Reporting), you'll take all this to production: you'll integrate your tests into GitHub Actions, generate professional HTML reports with traces and videos, and configure notifications so your team knows instantly if something broke.",
      },
    },
  ],
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

const MODULE_7_LESSONS: LessonContent[] = [L7_1, L7_2, L7_3, L7_4, L7_5];

export function getAllLessonsContent(): LessonContent[] {
  return MODULE_7_LESSONS;
}
