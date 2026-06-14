/**
 * QA Fundamentals — Módulo 4: Análisis de Requisitos para QA.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0 (cap. 3), BABOK Guide (IIBA), ISO/IEC/IEEE 29119.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m4";

/* ------------------------------------------------------------------ */
/*  Lección 4.1 — Tipos de requisitos                                  */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m4-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Los requisitos son la base de las pruebas", en: "Requirements are the basis of testing" } },
    {
      type: "paragraph",
      content: {
        es: "Un requisito describe qué debe hacer o cómo debe ser el sistema. El QA usa los requisitos como referencia para decidir qué probar: si el requisito es ambiguo, los casos de prueba también lo serán. Por eso entender y cuestionar los requisitos es una habilidad central del tester.",
        en: "A requirement describes what the system must do or how it must be. QA uses requirements as the reference to decide what to test: if the requirement is ambiguous, the test cases will be too. That is why understanding and questioning requirements is a core tester skill.",
      },
    },
    {
      type: "table",
      caption: { es: "Tipos de requisitos", en: "Types of requirements" },
      headers: [
        { es: "Tipo", en: "Type" },
        { es: "Describe", en: "Describes" },
        { es: "Ejemplo", en: "Example" },
      ],
      rows: [
        { cells: [ { es: "Funcional", en: "Functional" }, { es: "Qué hace el sistema", en: "What the system does" }, { es: "El usuario puede restablecer su contraseña", en: "The user can reset their password" } ] },
        { cells: [ { es: "No funcional", en: "Non-functional" }, { es: "Cómo se comporta", en: "How it behaves" }, { es: "La página carga en menos de 2 s", en: "The page loads in under 2s" } ] },
        { cells: [ { es: "De negocio", en: "Business" }, { es: "El objetivo de negocio", en: "The business goal" }, { es: "Reducir el abandono del carrito un 10%", en: "Reduce cart abandonment by 10%" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Un buen requisito es claro, completo, consistente, verificable y sin ambigüedad. Si no puedes escribir un caso de prueba a partir de él, probablemente está mal definido.",
        en: "A good requirement is clear, complete, consistent, verifiable and unambiguous. If you cannot write a test case from it, it is probably poorly defined.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m4-l1-fc1",
      front: { es: "¿Qué hace 'verificable' a un requisito?", en: "What makes a requirement 'verifiable'?" },
      back: { es: "Que se pueda comprobar objetivamente si se cumple, por ejemplo mediante un caso de prueba.", en: "That it can be objectively checked whether it is met, e.g. via a test case." },
    },
    {
      type: "quiz",
      questionId: "qaf-m4-l1-q1",
      question: { es: "'La aplicación debe ser rápida' es un requisito problemático porque…", en: "'The application must be fast' is a problematic requirement because…" },
      options: [
        { id: "a", text: { es: "Es un requisito de negocio", en: "It is a business requirement" } },
        { id: "b", text: { es: "No es verificable: 'rápida' es ambiguo", en: "It is not verifiable: 'fast' is ambiguous" } },
        { id: "c", text: { es: "Es un requisito funcional", en: "It is a functional requirement" } },
        { id: "d", text: { es: "No tiene relación con la calidad", en: "It has nothing to do with quality" } },
      ],
      correctOptionId: "b",
      explanation: { es: "'Rápida' no es medible. Un buen requisito sería 'responde en menos de 2 segundos'.", en: "'Fast' is not measurable. A good requirement would be 'responds in under 2 seconds'." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "BABOK Guide — IIBA", en: "BABOK Guide — IIBA" }, url: "https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 4.2 — Testing estático y revisiones                        */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m4-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Encontrar defectos sin ejecutar código", en: "Finding defects without executing code" } },
    {
      type: "paragraph",
      content: {
        es: "El testing estático evalúa productos de trabajo (requisitos, diseño, código) sin ejecutarlos. Su gran ventaja es detectar defectos muy temprano, cuando corregirlos es barato. Las revisiones son la técnica estática más usada por el QA manual.",
        en: "Static testing evaluates work products (requirements, design, code) without executing them. Its big advantage is detecting defects very early, when fixing them is cheap. Reviews are the static technique most used by manual QA.",
      },
    },
    {
      type: "table",
      caption: { es: "Tipos de revisión (de menos a más formal)", en: "Review types (least to most formal)" },
      headers: [
        { es: "Tipo", en: "Type" },
        { es: "Característica", en: "Characteristic" },
      ],
      rows: [
        { cells: [ { es: "Informal", en: "Informal" }, { es: "Sin proceso definido; rápida", en: "No defined process; quick" } ] },
        { cells: [ { es: "Walkthrough", en: "Walkthrough" }, { es: "Guiada por el autor", en: "Led by the author" } ] },
        { cells: [ { es: "Revisión técnica", en: "Technical review" }, { es: "Realizada por pares expertos", en: "Done by expert peers" } ] },
        { cells: [ { es: "Inspección", en: "Inspection" }, { es: "La más formal: roles, métricas, criterios", en: "The most formal: roles, metrics, criteria" } ] },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "El testing dinámico ejecuta el software; el estático no. Ambos son complementarios: el estático previene, el dinámico verifica el comportamiento real.",
        en: "Dynamic testing executes the software; static testing does not. They are complementary: static prevents, dynamic verifies actual behavior.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m4-l2-fc1",
      front: { es: "¿Cuál es el tipo de revisión más formal?", en: "Which is the most formal review type?" },
      back: { es: "La inspección: tiene roles definidos, métricas y criterios de entrada/salida.", en: "The inspection: it has defined roles, metrics and entry/exit criteria." },
    },
    {
      type: "quiz",
      questionId: "qaf-m4-l2-q1",
      question: { es: "Revisar un documento de requisitos en una reunión guiada por su autor es un ejemplo de…", en: "Reviewing a requirements document in a meeting led by its author is an example of…" },
      options: [
        { id: "a", text: { es: "Inspección", en: "Inspection" } },
        { id: "b", text: { es: "Walkthrough", en: "Walkthrough" } },
        { id: "c", text: { es: "Prueba dinámica", en: "Dynamic test" } },
        { id: "d", text: { es: "Prueba de regresión", en: "Regression test" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El walkthrough es una revisión guiada por el autor del producto de trabajo.", en: "A walkthrough is a review led by the author of the work product." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 4.3 — Historias de usuario y criterios de aceptación       */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m4-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Historias de usuario", en: "User stories" } },
    {
      type: "paragraph",
      content: {
        es: "En equipos ágiles, los requisitos suelen expresarse como historias de usuario: descripciones cortas del valor que necesita un usuario. El formato habitual es: 'Como [rol], quiero [acción], para [beneficio]'.",
        en: "In agile teams, requirements are usually expressed as user stories: short descriptions of the value a user needs. The common format is: 'As a [role], I want [action], so that [benefit]'.",
      },
    },
    {
      type: "code",
      language: "text",
      code: "Como cliente registrado,\nquiero restablecer mi contraseña por correo,\npara recuperar el acceso si la olvido.",
      caption: { es: "Ejemplo de historia de usuario", en: "User story example" },
    },
    { type: "heading", level: 2, content: { es: "Criterios de aceptación (Gherkin)", en: "Acceptance criteria (Gherkin)" } },
    {
      type: "paragraph",
      content: {
        es: "Los criterios de aceptación definen cuándo una historia está 'hecha'. Un formato muy usado es Gherkin: Dado (contexto) / Cuando (acción) / Entonces (resultado esperado). Estos criterios son una mina de oro para el QA: cada uno es casi un caso de prueba.",
        en: "Acceptance criteria define when a story is 'done'. A widely used format is Gherkin: Given (context) / When (action) / Then (expected result). These criteria are a goldmine for QA: each one is almost a test case.",
      },
    },
    {
      type: "code",
      language: "gherkin",
      code: "Dado que estoy en la pantalla de login\nY he solicitado restablecer mi contraseña\nCuando introduzco un correo registrado\nEntonces recibo un email con un enlace de restablecimiento",
      caption: { es: "Criterio de aceptación en estilo Gherkin", en: "Acceptance criterion in Gherkin style" },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m4-l3-fc1",
      front: { es: "¿Qué estructura sigue Gherkin?", en: "What structure does Gherkin follow?" },
      back: { es: "Dado (contexto) / Cuando (acción) / Entonces (resultado esperado).", en: "Given (context) / When (action) / Then (expected result)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m4-l3-q1",
      question: { es: "En un criterio de aceptación Gherkin, ¿qué expresa la cláusula 'Entonces'?", en: "In a Gherkin acceptance criterion, what does the 'Then' clause express?" },
      options: [
        { id: "a", text: { es: "El contexto inicial", en: "The initial context" } },
        { id: "b", text: { es: "La acción del usuario", en: "The user action" } },
        { id: "c", text: { es: "El resultado esperado", en: "The expected result" } },
        { id: "d", text: { es: "El rol del usuario", en: "The user role" } },
      ],
      correctOptionId: "c",
      explanation: { es: "'Entonces' describe el resultado esperado tras la acción.", en: "'Then' describes the expected result after the action." },
    },
  ],
  resources: [
    { title: { es: "BABOK Guide — IIBA", en: "BABOK Guide — IIBA" }, url: "https://www.iiba.org/knowledgehub/business-analysis-body-of-knowledge-babok-guide/" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 4.4 — Trazabilidad de requisitos                           */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m4-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Conectar requisitos y pruebas", en: "Connecting requirements and tests" } },
    {
      type: "paragraph",
      content: {
        es: "La trazabilidad es la capacidad de relacionar cada requisito con los casos de prueba que lo verifican (y viceversa). Una matriz de trazabilidad muestra esta relación y permite responder dos preguntas clave: ¿está todo requisito cubierto por al menos una prueba? ¿toda prueba responde a un requisito?",
        en: "Traceability is the ability to relate each requirement to the test cases that verify it (and vice versa). A traceability matrix shows this relationship and answers two key questions: is every requirement covered by at least one test? Does every test map to a requirement?",
      },
    },
    {
      type: "table",
      caption: { es: "Matriz de trazabilidad (ejemplo)", en: "Traceability matrix (example)" },
      headers: [
        { es: "Requisito", en: "Requirement" },
        { es: "Casos de prueba", en: "Test cases" },
      ],
      rows: [
        { cells: [ { es: "RF-01 Restablecer contraseña", en: "FR-01 Reset password" }, { es: "TC-12, TC-13, TC-14", en: "TC-12, TC-13, TC-14" } ] },
        { cells: [ { es: "RF-02 Iniciar sesión", en: "FR-02 Sign in" }, { es: "TC-01, TC-02", en: "TC-01, TC-02" } ] },
        { cells: [ { es: "RF-03 Cerrar sesión", en: "FR-03 Sign out" }, { es: "(sin cobertura)", en: "(no coverage)" } ] },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Un requisito sin casos de prueba asociados es un riesgo: nadie está verificando que funcione. La matriz de trazabilidad hace visibles esos huecos.",
        en: "A requirement with no associated test cases is a risk: nobody is verifying it works. The traceability matrix makes those gaps visible.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m4-l4-fc1",
      front: { es: "¿Para qué sirve una matriz de trazabilidad?", en: "What is a traceability matrix for?" },
      back: { es: "Para relacionar requisitos con casos de prueba y detectar requisitos sin cobertura.", en: "To relate requirements to test cases and detect requirements without coverage." },
    },
    {
      type: "quiz",
      questionId: "qaf-m4-l4-q1",
      question: { es: "En la matriz de ejemplo, ¿qué problema revela el requisito RF-03?", en: "In the example matrix, what problem does requirement FR-03 reveal?" },
      options: [
        { id: "a", text: { es: "Tiene demasiados casos de prueba", en: "It has too many test cases" } },
        { id: "b", text: { es: "No tiene cobertura de pruebas", en: "It has no test coverage" } },
        { id: "c", text: { es: "Es un requisito no funcional", en: "It is a non-functional requirement" } },
        { id: "d", text: { es: "Está duplicado", en: "It is duplicated" } },
      ],
      correctOptionId: "b",
      explanation: { es: "RF-03 no tiene casos asociados: es un hueco de cobertura y un riesgo.", en: "FR-03 has no associated cases: it is a coverage gap and a risk." },
    },
  ],
  resources: [
    { title: { es: "ISO/IEC/IEEE 29119 — Serie de testing", en: "ISO/IEC/IEEE 29119 — Testing series" }, url: "https://committee.iso.org/sites/jtc1sc7/home/projects/flagship-standards/isoiecieee-29119-series.html" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4];
}
