/**
 * QA Fundamentals — Módulo 3: Ciclos de Vida SDLC y STLC.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0 (cap. 2), ISO/IEC/IEEE 29119-1.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m3";

/* ------------------------------------------------------------------ */
/*  Lección 3.1 — Modelos de SDLC                                      */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m3-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "¿Qué es el SDLC?", en: "What is the SDLC?" } },
    {
      type: "paragraph",
      content: {
        es: "El ciclo de vida de desarrollo de software (Software Development Life Cycle, SDLC) es el proceso estructurado por el que pasa un software desde la idea hasta el mantenimiento. Conocer el modelo de SDLC que usa el equipo te dice cuándo y cómo encaja el testing.",
        en: "The Software Development Life Cycle (SDLC) is the structured process software goes through from idea to maintenance. Knowing the team's SDLC model tells you when and how testing fits in.",
      },
    },
    {
      type: "table",
      caption: { es: "Modelos de SDLC más comunes", en: "Most common SDLC models" },
      headers: [
        { es: "Modelo", en: "Model" },
        { es: "Idea clave", en: "Key idea" },
        { es: "Rol del testing", en: "Role of testing" },
      ],
      rows: [
        { cells: [ { es: "Waterfall (cascada)", en: "Waterfall" }, { es: "Fases secuenciales", en: "Sequential phases" }, { es: "Testing al final, tras desarrollar", en: "Testing at the end, after development" } ] },
        { cells: [ { es: "Modelo en V", en: "V-model" }, { es: "Cada fase de desarrollo tiene su nivel de prueba", en: "Each development phase has its test level" }, { es: "Testing planificado en paralelo", en: "Testing planned in parallel" } ] },
        { cells: [ { es: "Iterativo / incremental", en: "Iterative / incremental" }, { es: "Entregas parciales repetidas", en: "Repeated partial deliveries" }, { es: "Testing en cada iteración", en: "Testing in each iteration" } ] },
        { cells: [ { es: "Ágil", en: "Agile" }, { es: "Entregas frecuentes y adaptativas", en: "Frequent, adaptive deliveries" }, { es: "Testing continuo dentro del sprint", en: "Continuous testing within the sprint" } ] },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "No existe un modelo 'mejor': el adecuado depende del contexto (principio 6 del testing). Hoy lo más común es trabajar en ágil, pero muchos proyectos combinan enfoques.",
        en: "There is no 'best' model: the right one depends on context (testing principle 6). Agile is the most common today, but many projects combine approaches.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m3-l1-fc1",
      front: { es: "En el modelo en V, ¿qué se asocia a cada fase de desarrollo?", en: "In the V-model, what is associated with each development phase?" },
      back: { es: "Un nivel de prueba correspondiente, planificado en paralelo a esa fase.", en: "A corresponding test level, planned in parallel with that phase." },
    },
    {
      type: "quiz",
      questionId: "qaf-m3-l1-q1",
      question: { es: "¿Qué modelo de SDLC realiza el testing principalmente al final, tras completar el desarrollo?", en: "Which SDLC model performs testing mainly at the end, after development is complete?" },
      options: [
        { id: "a", text: { es: "Ágil", en: "Agile" } },
        { id: "b", text: { es: "Waterfall (cascada)", en: "Waterfall" } },
        { id: "c", text: { es: "Iterativo", en: "Iterative" } },
        { id: "d", text: { es: "Incremental", en: "Incremental" } },
      ],
      correctOptionId: "b",
      explanation: { es: "En cascada las fases son secuenciales y el testing se concentra al final.", en: "In waterfall the phases are sequential and testing is concentrated at the end." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 3.2 — Testing a lo largo del SDLC                          */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m3-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "El testing acompaña a todo el ciclo", en: "Testing accompanies the whole cycle" } },
    {
      type: "paragraph",
      content: {
        es: "El buen testing no espera al final: empieza con la revisión de requisitos y continúa en cada fase. Cuanto antes participa el QA, más barato es corregir (shift-left). Por eso cada producto de trabajo (requisitos, diseño, código) puede y debe revisarse.",
        en: "Good testing does not wait until the end: it starts with reviewing requirements and continues in each phase. The earlier QA gets involved, the cheaper it is to fix (shift-left). That is why every work product (requirements, design, code) can and should be reviewed.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Requisitos: revisión estática para detectar ambigüedades.", en: "Requirements: static review to detect ambiguities." },
        { es: "Diseño: revisión de la arquitectura y casos límite.", en: "Design: review of architecture and edge cases." },
        { es: "Código: revisiones y pruebas de componente.", en: "Code: reviews and component tests." },
        { es: "Sistema integrado: pruebas de integración y de sistema.", en: "Integrated system: integration and system tests." },
        { es: "Antes del despliegue: pruebas de aceptación.", en: "Before deployment: acceptance tests." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Una prueba de aceptación bien definida en la fase de requisitos sirve a la vez como criterio de aceptación y como caso de prueba.",
        en: "A well-defined acceptance test in the requirements phase serves both as an acceptance criterion and as a test case.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m3-l2-fc1",
      front: { es: "¿Cuándo debería empezar el testing en un proyecto?", en: "When should testing start in a project?" },
      back: { es: "Lo antes posible: desde la revisión de requisitos (shift-left).", en: "As early as possible: from the requirements review (shift-left)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m3-l2-q1",
      question: { es: "Revisar los requisitos para detectar ambigüedades es un ejemplo de…", en: "Reviewing requirements to detect ambiguities is an example of…" },
      options: [
        { id: "a", text: { es: "Testing tardío", en: "Late testing" } },
        { id: "b", text: { es: "Testing temprano (shift-left)", en: "Early testing (shift-left)" } },
        { id: "c", text: { es: "Prueba de aceptación", en: "Acceptance testing" } },
        { id: "d", text: { es: "Prueba de regresión", en: "Regression testing" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Revisar requisitos pronto es testing temprano: previene que los defectos avancen.", en: "Reviewing requirements early is early testing: it prevents defects from progressing." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 3.3 — Niveles de prueba                                    */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m3-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Los cuatro niveles de prueba", en: "The four test levels" } },
    {
      type: "paragraph",
      content: {
        es: "Los niveles de prueba agrupan las actividades de testing según el objeto que se prueba, desde la pieza más pequeña hasta el sistema completo en manos del usuario.",
        en: "Test levels group testing activities by the object under test, from the smallest piece up to the complete system in the user's hands.",
      },
    },
    {
      type: "table",
      caption: { es: "Niveles de prueba", en: "Test levels" },
      headers: [
        { es: "Nivel", en: "Level" },
        { es: "Qué verifica", en: "What it verifies" },
        { es: "Quién suele hacerlo", en: "Who usually does it" },
      ],
      rows: [
        { cells: [ { es: "Componente / Unitaria", en: "Component / Unit" }, { es: "Una pieza aislada de código", en: "An isolated piece of code" }, { es: "Desarrollo", en: "Development" } ] },
        { cells: [ { es: "Integración", en: "Integration" }, { es: "La interacción entre componentes", en: "The interaction between components" }, { es: "Desarrollo / QA", en: "Development / QA" } ] },
        { cells: [ { es: "Sistema", en: "System" }, { es: "El sistema completo de extremo a extremo", en: "The full system end-to-end" }, { es: "QA", en: "QA" } ] },
        { cells: [ { es: "Aceptación", en: "Acceptance" }, { es: "Que cumple las necesidades del negocio/usuario", en: "That it meets business/user needs" }, { es: "Usuario / Negocio / QA", en: "User / Business / QA" } ] },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "El QA manual funcional trabaja sobre todo en los niveles de sistema y aceptación, donde se prueba el comportamiento observable de la aplicación.",
        en: "Functional manual QA works mostly at the system and acceptance levels, where the application's observable behavior is tested.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m3-l3-fc1",
      front: { es: "¿Qué nivel de prueba verifica que el sistema cumple las necesidades del negocio?", en: "Which test level verifies that the system meets business needs?" },
      back: { es: "La prueba de aceptación (acceptance testing).", en: "Acceptance testing." },
    },
    {
      type: "quiz",
      questionId: "qaf-m3-l3-q1",
      question: { es: "Probar la interacción entre dos módulos que se acaban de conectar corresponde al nivel de…", en: "Testing the interaction between two newly connected modules corresponds to the … level" },
      options: [
        { id: "a", text: { es: "Componente", en: "Component" } },
        { id: "b", text: { es: "Integración", en: "Integration" } },
        { id: "c", text: { es: "Sistema", en: "System" } },
        { id: "d", text: { es: "Aceptación", en: "Acceptance" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Probar cómo interactúan los componentes es la prueba de integración.", en: "Testing how components interact is integration testing." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 3.4 — Tipos de prueba                                      */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m3-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Tipos de prueba", en: "Test types" } },
    {
      type: "paragraph",
      content: {
        es: "Mientras que los niveles indican 'sobre qué' se prueba, los tipos indican 'qué cualidad' se evalúa. Un mismo nivel puede incluir varios tipos de prueba.",
        en: "While levels indicate 'what' is tested, types indicate 'which quality' is evaluated. The same level can include several test types.",
      },
    },
    {
      type: "table",
      caption: { es: "Tipos de prueba", en: "Test types" },
      headers: [
        { es: "Tipo", en: "Type" },
        { es: "Pregunta que responde", en: "Question it answers" },
      ],
      rows: [
        { cells: [ { es: "Funcional", en: "Functional" }, { es: "¿Hace el sistema lo que debe?", en: "Does the system do what it should?" } ] },
        { cells: [ { es: "No funcional", en: "Non-functional" }, { es: "¿Cómo se comporta (rendimiento, usabilidad…)?", en: "How does it behave (performance, usability…)?" } ] },
        { cells: [ { es: "Regresión", en: "Regression" }, { es: "¿Los cambios rompieron algo que funcionaba?", en: "Did changes break something that worked?" } ] },
        { cells: [ { es: "Reprueba (retest)", en: "Retest" }, { es: "¿Se corrigió realmente el defecto?", en: "Was the defect really fixed?" } ] },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "No confundas regresión con retest: el retest confirma que un defecto concreto se corrigió; la regresión comprueba que la corrección no rompió otras áreas.",
        en: "Don't confuse regression with retest: retest confirms a specific defect was fixed; regression checks that the fix didn't break other areas.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m3-l4-fc1",
      front: { es: "Diferencia entre retest y regresión.", en: "Difference between retest and regression." },
      back: { es: "Retest: confirmar que el defecto corregido ya no aparece. Regresión: comprobar que el cambio no rompió otras funciones.", en: "Retest: confirm the fixed defect no longer appears. Regression: check the change didn't break other functions." },
    },
    {
      type: "quiz",
      questionId: "qaf-m3-l4-q1",
      question: { es: "Tras corregir un bug, vuelves a ejecutar pruebas en áreas relacionadas para asegurar que nada más se rompió. Eso es…", en: "After fixing a bug, you re-run tests in related areas to ensure nothing else broke. That is…" },
      options: [
        { id: "a", text: { es: "Retest", en: "Retest" } },
        { id: "b", text: { es: "Prueba de regresión", en: "Regression testing" } },
        { id: "c", text: { es: "Prueba de humo", en: "Smoke testing" } },
        { id: "d", text: { es: "Prueba de aceptación", en: "Acceptance testing" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Comprobar que un cambio no rompió otras áreas es prueba de regresión.", en: "Checking that a change didn't break other areas is regression testing." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 3.5 — El ciclo de vida del testing (STLC)                  */
/* ------------------------------------------------------------------ */

const L5: LessonContent = {
  id: "qaf-m3-l5",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "El STLC fase a fase", en: "The STLC phase by phase" } },
    {
      type: "paragraph",
      content: {
        es: "El ciclo de vida del testing (Software Testing Life Cycle, STLC) describe las fases ordenadas de la actividad de pruebas. No es lo mismo que el SDLC: el STLC se centra exclusivamente en el testing y vive dentro del SDLC.",
        en: "The Software Testing Life Cycle (STLC) describes the ordered phases of the testing activity. It is not the same as the SDLC: the STLC focuses exclusively on testing and lives within the SDLC.",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        { es: "Análisis de requisitos de prueba: qué se va a probar.", en: "Test requirements analysis: what will be tested." },
        { es: "Planificación de pruebas: estrategia, recursos, alcance.", en: "Test planning: strategy, resources, scope." },
        { es: "Diseño de casos de prueba: técnicas y casos concretos.", en: "Test case design: techniques and concrete cases." },
        { es: "Preparación del entorno y datos de prueba.", en: "Test environment and data setup." },
        { es: "Ejecución de pruebas y registro de resultados.", en: "Test execution and result logging." },
        { es: "Cierre: métricas, informe y lecciones aprendidas.", en: "Closure: metrics, report and lessons learned." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Cada fase tiene criterios de entrada y de salida: condiciones que deben cumplirse para empezar o dar por terminada la fase.",
        en: "Each phase has entry and exit criteria: conditions that must be met to start or to consider the phase complete.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m3-l5-fc1",
      front: { es: "¿Cuál es la diferencia entre SDLC y STLC?", en: "What is the difference between SDLC and STLC?" },
      back: { es: "El SDLC es el ciclo de desarrollo completo; el STLC son las fases específicas del testing dentro de él.", en: "The SDLC is the full development cycle; the STLC is the specific testing phases within it." },
    },
    {
      type: "quiz",
      questionId: "qaf-m3-l5-q1",
      question: { es: "En el STLC, ¿qué fase produce las métricas, el informe final y las lecciones aprendidas?", en: "In the STLC, which phase produces the metrics, final report and lessons learned?" },
      options: [
        { id: "a", text: { es: "Planificación de pruebas", en: "Test planning" } },
        { id: "b", text: { es: "Diseño de casos", en: "Test design" } },
        { id: "c", text: { es: "Cierre de pruebas", en: "Test closure" } },
        { id: "d", text: { es: "Ejecución de pruebas", en: "Test execution" } },
      ],
      correctOptionId: "c",
      explanation: { es: "El cierre de pruebas recopila métricas, informe final y lecciones aprendidas.", en: "Test closure gathers metrics, the final report and lessons learned." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISO/IEC/IEEE 29119-1 — Conceptos", en: "ISO/IEC/IEEE 29119-1 — Concepts" }, url: "https://www.iso.org/standard/81291.html" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4, L5];
}
