/**
 * QA Fundamentals — Módulo 5: Diseño de Casos de Prueba.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0 (cap. 4), ISO/IEC/IEEE 29119-4, Azure Test Plans.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m5";

/* ------------------------------------------------------------------ */
/*  Lección 5.1 — Anatomía de un caso de prueba                        */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m5-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "¿Qué es un caso de prueba?", en: "What is a test case?" } },
    {
      type: "paragraph",
      content: {
        es: "Un caso de prueba es un conjunto de condiciones, entradas y resultados esperados diseñados para verificar una funcionalidad concreta. Un buen caso es reproducible: cualquier tester puede ejecutarlo y obtener el mismo resultado.",
        en: "A test case is a set of conditions, inputs and expected results designed to verify a specific functionality. A good case is reproducible: any tester can run it and get the same result.",
      },
    },
    {
      type: "table",
      caption: { es: "Componentes de un caso de prueba", en: "Components of a test case" },
      headers: [
        { es: "Campo", en: "Field" },
        { es: "Descripción", en: "Description" },
      ],
      rows: [
        { cells: [ { es: "ID y título", en: "ID and title" }, { es: "Identificador único y nombre descriptivo", en: "Unique identifier and descriptive name" } ] },
        { cells: [ { es: "Precondición", en: "Precondition" }, { es: "Estado necesario antes de empezar", en: "State required before starting" } ] },
        { cells: [ { es: "Pasos", en: "Steps" }, { es: "Acciones a ejecutar en orden", en: "Actions to perform in order" } ] },
        { cells: [ { es: "Datos de prueba", en: "Test data" }, { es: "Valores de entrada concretos", en: "Specific input values" } ] },
        { cells: [ { es: "Resultado esperado", en: "Expected result" }, { es: "Lo que debe ocurrir si funciona", en: "What should happen if it works" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "El resultado esperado debe definirse ANTES de ejecutar la prueba. Si lo decides después de ver el resultado, pierdes objetividad.",
        en: "The expected result must be defined BEFORE running the test. If you decide it after seeing the result, you lose objectivity.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m5-l1-fc1",
      front: { es: "¿Qué es una precondición en un caso de prueba?", en: "What is a precondition in a test case?" },
      back: { es: "El estado que debe existir antes de ejecutar los pasos (p. ej. 'usuario con sesión iniciada').", en: "The state that must exist before running the steps (e.g. 'logged-in user')." },
    },
    {
      type: "quiz",
      questionId: "qaf-m5-l1-q1",
      question: { es: "¿Cuándo debe definirse el resultado esperado de un caso de prueba?", en: "When should the expected result of a test case be defined?" },
      options: [
        { id: "a", text: { es: "Después de ejecutar la prueba", en: "After running the test" } },
        { id: "b", text: { es: "Antes de ejecutar la prueba", en: "Before running the test" } },
        { id: "c", text: { es: "Solo si la prueba falla", en: "Only if the test fails" } },
        { id: "d", text: { es: "No es necesario definirlo", en: "It does not need to be defined" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Definirlo antes garantiza objetividad: sabes qué esperar sin sesgo.", en: "Defining it beforehand ensures objectivity: you know what to expect without bias." },
    },
  ],
  resources: [
    { title: { es: "Azure Test Plans — Crear casos de prueba", en: "Azure Test Plans — Create test cases" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/create-test-cases?view=azure-devops" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 5.2 — Partición de equivalencia y valores límite           */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m5-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Partición de equivalencia (EP)", en: "Equivalence partitioning (EP)" } },
    {
      type: "paragraph",
      content: {
        es: "Como probar todas las entradas es imposible (principio 2), la partición de equivalencia agrupa las entradas en clases donde se espera que el sistema se comporte igual. Basta con probar un valor representativo de cada clase. Hay clases válidas (deben aceptarse) e inválidas (deben rechazarse).",
        en: "Since testing all inputs is impossible (principle 2), equivalence partitioning groups inputs into classes where the system is expected to behave the same. Testing one representative value per class is enough. There are valid classes (should be accepted) and invalid ones (should be rejected).",
      },
    },
    {
      type: "code",
      language: "text",
      code: "Campo: edad (válida 18–65)\n  Clase inválida baja : 17  ->  rechazar\n  Clase válida        : 30  ->  aceptar\n  Clase inválida alta : 70  ->  rechazar",
      caption: { es: "Particiones para un campo de edad", en: "Partitions for an age field" },
    },
    { type: "heading", level: 2, content: { es: "Análisis de valores límite (BVA)", en: "Boundary value analysis (BVA)" } },
    {
      type: "paragraph",
      content: {
        es: "Los defectos se concentran en los bordes de las particiones. El análisis de valores límite prueba justo los extremos. Para el rango 18–65, los valores límite a probar son 17, 18, 65 y 66.",
        en: "Defects cluster at the edges of partitions. Boundary value analysis tests exactly the extremes. For the range 18–65, the boundary values to test are 17, 18, 65 and 66.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "EP reduce el número de casos; BVA refuerza los bordes, que es donde más fallan los sistemas. Se usan juntas.",
        en: "EP reduces the number of cases; BVA reinforces the edges, where systems fail most. They are used together.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m5-l2-fc1",
      front: { es: "Para un rango válido de 1 a 100, ¿qué valores límite probarías?", en: "For a valid range of 1 to 100, which boundary values would you test?" },
      back: { es: "0, 1, 100 y 101 (justo dentro y justo fuera de cada borde).", en: "0, 1, 100 and 101 (just inside and just outside each edge)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m5-l2-q1",
      question: { es: "Un campo acepta de 1 a 10. ¿Qué técnica te lleva a probar específicamente el 0, 1, 10 y 11?", en: "A field accepts 1 to 10. Which technique leads you to specifically test 0, 1, 10 and 11?" },
      options: [
        { id: "a", text: { es: "Tabla de decisión", en: "Decision table" } },
        { id: "b", text: { es: "Análisis de valores límite", en: "Boundary value analysis" } },
        { id: "c", text: { es: "Transición de estados", en: "State transition" } },
        { id: "d", text: { es: "Error guessing", en: "Error guessing" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Probar los extremos de un rango es análisis de valores límite (BVA).", en: "Testing the extremes of a range is boundary value analysis (BVA)." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISO/IEC/IEEE 29119-4 — Técnicas de prueba", en: "ISO/IEC/IEEE 29119-4 — Test techniques" }, url: "https://committee.iso.org/sites/jtc1sc7/home/projects/flagship-standards/isoiecieee-29119-series.html" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 5.3 — Tablas de decisión y transición de estados           */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m5-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Tablas de decisión", en: "Decision tables" } },
    {
      type: "paragraph",
      content: {
        es: "Cuando el comportamiento depende de combinaciones de condiciones, una tabla de decisión las organiza para no olvidar ningún caso. Cada columna es una combinación de condiciones con su acción resultante.",
        en: "When behavior depends on combinations of conditions, a decision table organizes them so no case is forgotten. Each column is a combination of conditions with its resulting action.",
      },
    },
    {
      type: "table",
      caption: { es: "Tabla de decisión: descuento", en: "Decision table: discount" },
      headers: [
        { es: "Condición / Regla", en: "Condition / Rule" },
        { es: "R1", en: "R1" },
        { es: "R2", en: "R2" },
        { es: "R3", en: "R3" },
      ],
      rows: [
        { cells: [ { es: "¿Es cliente VIP?", en: "Is VIP customer?" }, { es: "Sí", en: "Yes" }, { es: "Sí", en: "Yes" }, { es: "No", en: "No" } ] },
        { cells: [ { es: "¿Compra > 100€?", en: "Purchase > €100?" }, { es: "Sí", en: "Yes" }, { es: "No", en: "No" }, { es: "Sí", en: "Yes" } ] },
        { cells: [ { es: "Descuento", en: "Discount" }, { es: "20%", en: "20%" }, { es: "10%", en: "10%" }, { es: "5%", en: "5%" } ] },
      ],
    },
    { type: "heading", level: 2, content: { es: "Transición de estados", en: "State transition" } },
    {
      type: "paragraph",
      content: {
        es: "Algunos sistemas se comportan según su estado actual y el evento recibido (por ejemplo, una cuenta: activa, bloqueada, cerrada). La técnica de transición de estados prueba los cambios de estado válidos e inválidos.",
        en: "Some systems behave according to their current state and the event received (for example an account: active, locked, closed). The state transition technique tests valid and invalid state changes.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m5-l3-fc1",
      front: { es: "¿Cuándo conviene usar una tabla de decisión?", en: "When is a decision table useful?" },
      back: { es: "Cuando el resultado depende de combinaciones de varias condiciones lógicas.", en: "When the result depends on combinations of several logical conditions." },
    },
    {
      type: "quiz",
      questionId: "qaf-m5-l3-q1",
      question: { es: "Una cuenta pasa de 'activa' a 'bloqueada' tras 3 intentos fallidos. ¿Qué técnica modela mejor esto?", en: "An account goes from 'active' to 'locked' after 3 failed attempts. Which technique models this best?" },
      options: [
        { id: "a", text: { es: "Partición de equivalencia", en: "Equivalence partitioning" } },
        { id: "b", text: { es: "Transición de estados", en: "State transition" } },
        { id: "c", text: { es: "Análisis de valores límite", en: "Boundary value analysis" } },
        { id: "d", text: { es: "Error guessing", en: "Error guessing" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El comportamiento depende del estado y de un evento: es transición de estados.", en: "Behavior depends on state and an event: it is state transition." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 5.4 — Testing exploratorio y basado en experiencia         */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m5-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Cuando la intuición experta importa", en: "When expert intuition matters" } },
    {
      type: "paragraph",
      content: {
        es: "Las técnicas basadas en experiencia aprovechan el conocimiento del tester sobre dónde suelen aparecer defectos. No sustituyen a las técnicas formales, pero las complementan, sobre todo cuando la documentación es escasa.",
        en: "Experience-based techniques leverage the tester's knowledge of where defects tend to appear. They do not replace formal techniques but complement them, especially when documentation is scarce.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Error guessing: anticipar errores comunes (campos vacíos, ceros, formatos raros).", en: "Error guessing: anticipating common errors (empty fields, zeros, odd formats)." },
        { es: "Testing exploratorio: diseñar y ejecutar a la vez, aprendiendo del sistema.", en: "Exploratory testing: designing and executing at once, learning from the system." },
        { es: "Testing basado en checklists: usar listas de comprobación reutilizables.", en: "Checklist-based testing: using reusable check lists." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "El testing exploratorio se organiza mejor con 'charters' (misiones cortas con un objetivo), evitando que se convierta en clicar sin rumbo.",
        en: "Exploratory testing is best organized with 'charters' (short missions with a goal), preventing it from becoming aimless clicking.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m5-l4-fc1",
      front: { es: "¿Qué caracteriza al testing exploratorio?", en: "What characterizes exploratory testing?" },
      back: { es: "El diseño y la ejecución de pruebas ocurren a la vez, sin scripts predefinidos.", en: "Test design and execution happen at the same time, without predefined scripts." },
    },
    {
      type: "quiz",
      questionId: "qaf-m5-l4-q1",
      question: { es: "Probar un campo con valores raros porque 'sabes por experiencia que suele fallar' es…", en: "Testing a field with odd values because 'you know from experience it tends to fail' is…" },
      options: [
        { id: "a", text: { es: "Error guessing", en: "Error guessing" } },
        { id: "b", text: { es: "Partición de equivalencia", en: "Equivalence partitioning" } },
        { id: "c", text: { es: "Tabla de decisión", en: "Decision table" } },
        { id: "d", text: { es: "Prueba de regresión", en: "Regression testing" } },
      ],
      correctOptionId: "a",
      explanation: { es: "Usar la experiencia para anticipar errores comunes es error guessing.", en: "Using experience to anticipate common errors is error guessing." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 5.5 — Gestión de datos de prueba                           */
/* ------------------------------------------------------------------ */

const L5: LessonContent = {
  id: "qaf-m5-l5",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Sin buenos datos no hay buenas pruebas", en: "No good data, no good tests" } },
    {
      type: "paragraph",
      content: {
        es: "Los datos de prueba son los valores concretos que usas para ejecutar los casos. Deben ser representativos (cubrir casos válidos, inválidos y límite) y estar disponibles de forma controlada para que las pruebas sean repetibles.",
        en: "Test data are the concrete values you use to run the cases. They must be representative (covering valid, invalid and boundary cases) and available in a controlled way so tests are repeatable.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Datos válidos: comprueban el comportamiento normal.", en: "Valid data: check normal behavior." },
        { es: "Datos inválidos: comprueban el manejo de errores.", en: "Invalid data: check error handling." },
        { es: "Datos límite: refuerzan los bordes.", en: "Boundary data: reinforce the edges." },
        { es: "Privacidad: nunca usar datos reales de personas sin anonimizar.", en: "Privacy: never use real personal data without anonymizing." },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "Usar datos personales reales en entornos de prueba puede violar la normativa de protección de datos. Usa datos sintéticos o anonimizados.",
        en: "Using real personal data in test environments can violate data protection regulations. Use synthetic or anonymized data.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m5-l5-fc1",
      front: { es: "¿Por qué no usar datos personales reales en pruebas?", en: "Why not use real personal data in testing?" },
      back: { es: "Por privacidad y cumplimiento normativo; conviene usar datos sintéticos o anonimizados.", en: "For privacy and regulatory compliance; use synthetic or anonymized data instead." },
    },
    {
      type: "quiz",
      questionId: "qaf-m5-l5-q1",
      question: { es: "Para probar bien una funcionalidad, ¿qué conjuntos de datos conviene preparar?", en: "To properly test a feature, which data sets should you prepare?" },
      options: [
        { id: "a", text: { es: "Solo datos válidos", en: "Only valid data" } },
        { id: "b", text: { es: "Válidos, inválidos y límite", en: "Valid, invalid and boundary" } },
        { id: "c", text: { es: "Solo datos límite", en: "Only boundary data" } },
        { id: "d", text: { es: "Datos reales de usuarios", en: "Real user data" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Datos representativos = válidos + inválidos + límite, para cubrir distintos comportamientos.", en: "Representative data = valid + invalid + boundary, to cover different behaviors." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4, L5];
}
