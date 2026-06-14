/**
 * QA Fundamentals — Módulo 6: Ejecución de Pruebas y Gestión de Defectos.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0 (cap. 5), Jira docs, Azure Test Plans, ISO/IEC/IEEE 29119-3.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m6";

/* ------------------------------------------------------------------ */
/*  Lección 6.1 — Ejecución y registro de resultados                   */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m6-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Ejecutar y registrar", en: "Execute and log" } },
    {
      type: "paragraph",
      content: {
        es: "Ejecutar una prueba es seguir sus pasos y comparar el resultado real con el esperado. Cada ejecución se registra con un estado, que comunica de forma estándar cómo fue la prueba.",
        en: "Executing a test means following its steps and comparing the actual result with the expected one. Each execution is logged with a status, which communicates in a standard way how the test went.",
      },
    },
    {
      type: "table",
      caption: { es: "Estados de ejecución habituales", en: "Common execution statuses" },
      headers: [
        { es: "Estado", en: "Status" },
        { es: "Significado", en: "Meaning" },
      ],
      rows: [
        { cells: [ { es: "Pass (pasó)", en: "Pass" }, { es: "El resultado real coincide con el esperado", en: "Actual result matches the expected one" } ] },
        { cells: [ { es: "Fail (falló)", en: "Fail" }, { es: "El resultado real difiere del esperado", en: "Actual result differs from the expected one" } ] },
        { cells: [ { es: "Blocked (bloqueado)", en: "Blocked" }, { es: "No se pudo ejecutar (p. ej. entorno caído)", en: "Could not be run (e.g. environment down)" } ] },
        { cells: [ { es: "Skipped (omitido)", en: "Skipped" }, { es: "No aplica en esta ejecución", en: "Not applicable in this run" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Registra evidencia (capturas, logs) al ejecutar, sobre todo cuando una prueba falla: ahorrará tiempo al reportar y reproducir el defecto.",
        en: "Capture evidence (screenshots, logs) while executing, especially when a test fails: it will save time when reporting and reproducing the defect.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m6-l1-fc1",
      front: { es: "¿Qué significa el estado 'blocked'?", en: "What does the 'blocked' status mean?" },
      back: { es: "Que la prueba no se pudo ejecutar por una causa externa (entorno, dependencia).", en: "That the test could not be run due to an external cause (environment, dependency)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m6-l1-q1",
      question: { es: "El entorno de pruebas está caído y no puedes ejecutar un caso. ¿Qué estado registras?", en: "The test environment is down and you cannot run a case. Which status do you log?" },
      options: [
        { id: "a", text: { es: "Fail", en: "Fail" } },
        { id: "b", text: { es: "Pass", en: "Pass" } },
        { id: "c", text: { es: "Blocked", en: "Blocked" } },
        { id: "d", text: { es: "Skipped", en: "Skipped" } },
      ],
      correctOptionId: "c",
      explanation: { es: "Si no puedes ejecutar por una causa externa, el caso queda bloqueado (blocked).", en: "If you cannot run it due to an external cause, the case is blocked." },
    },
  ],
  resources: [
    { title: { es: "Azure Test Plans — Ejecutar pruebas manuales", en: "Azure Test Plans — Run manual tests" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/run-manual-tests?view=azure-devops" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 6.2 — Cómo reportar un defecto profesional                 */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m6-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Anatomía de un buen bug report", en: "Anatomy of a good bug report" } },
    {
      type: "paragraph",
      content: {
        es: "Un buen informe de defecto permite a quien lo lee reproducir el problema sin preguntarte nada. La diferencia entre un bug que se corrige rápido y uno que se ignora suele estar en la calidad del reporte.",
        en: "A good defect report lets the reader reproduce the problem without asking you anything. The difference between a bug that gets fixed quickly and one that gets ignored is often in the quality of the report.",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        { es: "Título claro y específico (qué falla y dónde).", en: "Clear, specific title (what fails and where)." },
        { es: "Pasos para reproducir, numerados.", en: "Steps to reproduce, numbered." },
        { es: "Resultado esperado vs resultado real.", en: "Expected result vs actual result." },
        { es: "Evidencia: capturas, vídeo, logs.", en: "Evidence: screenshots, video, logs." },
        { es: "Entorno: navegador, SO, versión, datos usados.", en: "Environment: browser, OS, version, data used." },
        { es: "Severidad y prioridad propuestas.", en: "Proposed severity and priority." },
      ],
    },
    {
      type: "code",
      language: "text",
      code: "Título: El total del carrito no se actualiza al eliminar un producto\n\nPasos:\n 1. Añadir 2 productos al carrito\n 2. Eliminar 1 producto\nEsperado: el total se recalcula\nReal: el total sigue mostrando el importe de los 2 productos\nEntorno: Chrome 124 / Windows 11 / v2.3.0",
      caption: { es: "Ejemplo de informe de defecto", en: "Defect report example" },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Reporta hechos, no opiniones, y sé respetuoso: el objetivo es mejorar el producto, no señalar culpables.",
        en: "Report facts, not opinions, and be respectful: the goal is to improve the product, not to point fingers.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m6-l2-fc1",
      front: { es: "¿Qué dos resultados nunca deben faltar en un bug report?", en: "Which two results must never be missing in a bug report?" },
      back: { es: "El resultado esperado y el resultado real.", en: "The expected result and the actual result." },
    },
    {
      type: "quiz",
      questionId: "qaf-m6-l2-q1",
      question: { es: "¿Cuál es el propósito principal de los 'pasos para reproducir'?", en: "What is the main purpose of the 'steps to reproduce'?" },
      options: [
        { id: "a", text: { es: "Alargar el informe", en: "Make the report longer" } },
        { id: "b", text: { es: "Que cualquiera pueda recrear el defecto", en: "Let anyone recreate the defect" } },
        { id: "c", text: { es: "Asignar culpables", en: "Assign blame" } },
        { id: "d", text: { es: "Sustituir a la evidencia", en: "Replace the evidence" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Los pasos permiten reproducir el defecto de forma fiable, clave para corregirlo.", en: "The steps allow reliably reproducing the defect, which is key to fixing it." },
    },
  ],
  resources: [
    { title: { es: "Jira — Trabajar con reportes de bugs", en: "Jira — Working with bug reports" }, url: "https://support.atlassian.com/jira-service-management-cloud/docs/working-on-bug-reports-with-jira-software-teams/" },
    { title: { es: "ISO/IEC/IEEE 29119-3 — Documentación de pruebas", en: "ISO/IEC/IEEE 29119-3 — Test documentation" }, url: "https://committee.iso.org/sites/jtc1sc7/home/projects/flagship-standards/isoiecieee-29119-series.html" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 6.3 — Ciclo de vida del defecto                            */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m6-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Del descubrimiento al cierre", en: "From discovery to closure" } },
    {
      type: "paragraph",
      content: {
        es: "Un defecto recorre una serie de estados desde que se descubre hasta que se cierra. Conocer este flujo te permite saber en todo momento quién es responsable del defecto y qué falta para resolverlo.",
        en: "A defect goes through a series of states from discovery to closure. Knowing this flow lets you always know who is responsible for the defect and what is left to resolve it.",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        { es: "Nuevo (New): el tester lo reporta.", en: "New: the tester reports it." },
        { es: "Asignado (Assigned): se asigna a un desarrollador.", en: "Assigned: assigned to a developer." },
        { es: "En progreso / Abierto (Open): se está corrigiendo.", en: "In progress / Open: being fixed." },
        { es: "Resuelto (Fixed): el desarrollador lo corrige.", en: "Fixed: the developer fixes it." },
        { es: "Reprobado (Retest): el QA vuelve a probar.", en: "Retest: QA re-tests it." },
        { es: "Cerrado (Closed) o Reabierto (Reopened).", en: "Closed or Reopened." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Otros estados posibles: 'Rechazado' (no es un defecto), 'Duplicado' (ya reportado) y 'Diferido' (se corregirá más adelante).",
        en: "Other possible states: 'Rejected' (not a defect), 'Duplicate' (already reported) and 'Deferred' (will be fixed later).",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m6-l3-fc1",
      front: { es: "Tras corregir un defecto, ¿quién lo verifica y a qué estado pasa antes de cerrarse?", en: "After a defect is fixed, who verifies it and to which state does it move before closing?" },
      back: { es: "El QA lo verifica (retest); si la corrección funciona, pasa a 'Cerrado'.", en: "QA verifies it (retest); if the fix works, it moves to 'Closed'." },
    },
    {
      type: "quiz",
      questionId: "qaf-m6-l3-q1",
      question: { es: "Un defecto se marca como 'Resuelto' pero el QA comprueba que sigue ocurriendo. ¿A qué estado pasa?", en: "A defect is marked 'Fixed' but QA finds it still happens. To which state does it move?" },
      options: [
        { id: "a", text: { es: "Cerrado", en: "Closed" } },
        { id: "b", text: { es: "Reabierto", en: "Reopened" } },
        { id: "c", text: { es: "Duplicado", en: "Duplicate" } },
        { id: "d", text: { es: "Rechazado", en: "Rejected" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Si el retest falla, el defecto se reabre (Reopened) para volver a corregirlo.", en: "If the retest fails, the defect is reopened to be fixed again." },
    },
  ],
  resources: [
    { title: { es: "Jira Documentation hub", en: "Jira Documentation hub" }, url: "https://confluence.atlassian.com/jira" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 6.4 — Severidad vs prioridad                               */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m6-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Dos ejes distintos", en: "Two different axes" } },
    {
      type: "paragraph",
      content: {
        es: "La severidad mide el impacto técnico del defecto sobre el sistema. La prioridad mide la urgencia con la que el negocio quiere que se corrija. Son independientes: un defecto puede ser muy severo pero de baja prioridad, y viceversa.",
        en: "Severity measures the defect's technical impact on the system. Priority measures the urgency with which the business wants it fixed. They are independent: a defect can be very severe but low priority, and vice versa.",
      },
    },
    {
      type: "table",
      caption: { es: "Severidad vs prioridad (ejemplos)", en: "Severity vs priority (examples)" },
      headers: [
        { es: "Caso", en: "Case" },
        { es: "Severidad", en: "Severity" },
        { es: "Prioridad", en: "Priority" },
      ],
      rows: [
        { cells: [ { es: "La app se cierra al pagar", en: "The app crashes when paying" }, { es: "Alta", en: "High" }, { es: "Alta", en: "High" } ] },
        { cells: [ { es: "Logo mal en una página interna poco visitada", en: "Wrong logo on a rarely visited page" }, { es: "Baja", en: "Low" }, { es: "Baja", en: "Low" } ] },
        { cells: [ { es: "Error de ortografía en el nombre de la empresa en la home", en: "Typo in the company name on the homepage" }, { es: "Baja", en: "Low" }, { es: "Alta", en: "High" } ] },
        { cells: [ { es: "Caída rara que casi nunca ocurre", en: "Rare crash that almost never happens" }, { es: "Alta", en: "High" }, { es: "Baja", en: "Low" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "El tester propone la severidad (sabe el impacto técnico); la prioridad suele decidirla el negocio o el product owner.",
        en: "The tester proposes the severity (knows the technical impact); priority is usually decided by the business or product owner.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m6-l4-fc1",
      front: { es: "Una errata en el nombre de la empresa en la home: ¿severidad y prioridad?", en: "A typo in the company name on the homepage: severity and priority?" },
      back: { es: "Severidad baja (no rompe nada) pero prioridad alta (muy visible, daña la imagen).", en: "Low severity (breaks nothing) but high priority (very visible, hurts the brand)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m6-l4-q1",
      question: { es: "¿Qué mide la prioridad de un defecto?", en: "What does a defect's priority measure?" },
      options: [
        { id: "a", text: { es: "El impacto técnico sobre el sistema", en: "The technical impact on the system" } },
        { id: "b", text: { es: "La urgencia con la que debe corregirse", en: "The urgency with which it must be fixed" } },
        { id: "c", text: { es: "El número de pasos para reproducirlo", en: "The number of steps to reproduce it" } },
        { id: "d", text: { es: "El tamaño del informe", en: "The size of the report" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La prioridad expresa la urgencia de corrección; la severidad, el impacto técnico.", en: "Priority expresses the urgency to fix; severity, the technical impact." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 6.5 — Métricas básicas de testing                          */
/* ------------------------------------------------------------------ */

const L5: LessonContent = {
  id: "qaf-m6-l5",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Medir para mejorar", en: "Measure to improve" } },
    {
      type: "paragraph",
      content: {
        es: "Las métricas ayudan a comunicar el estado de la calidad y a tomar decisiones. No buscan 'puntuar' a las personas, sino dar visibilidad objetiva del avance y del riesgo.",
        en: "Metrics help communicate the state of quality and make decisions. They are not meant to 'score' people, but to give objective visibility of progress and risk.",
      },
    },
    {
      type: "table",
      caption: { es: "Métricas habituales", en: "Common metrics" },
      headers: [
        { es: "Métrica", en: "Metric" },
        { es: "Qué indica", en: "What it indicates" },
      ],
      rows: [
        { cells: [ { es: "Densidad de defectos", en: "Defect density" }, { es: "Defectos por tamaño/módulo", en: "Defects per size/module" } ] },
        { cells: [ { es: "Tasa de fuga (defect leakage)", en: "Defect leakage" }, { es: "Defectos que llegaron a producción", en: "Defects that reached production" } ] },
        { cells: [ { es: "Cobertura de requisitos", en: "Requirements coverage" }, { es: "% de requisitos con pruebas", en: "% of requirements with tests" } ] },
        { cells: [ { es: "Tasa de aprobado (pass rate)", en: "Pass rate" }, { es: "% de casos que pasan", en: "% of cases passing" } ] },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "Cuidado con usar métricas como objetivo en sí mismas: optimizar un número puede empeorar la calidad real (p. ej. cerrar bugs sin resolverlos para mejorar la tasa de aprobado).",
        en: "Be careful using metrics as goals in themselves: optimizing a number can worsen real quality (e.g. closing bugs without solving them to improve the pass rate).",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m6-l5-fc1",
      front: { es: "¿Qué mide la 'tasa de fuga de defectos'?", en: "What does 'defect leakage' measure?" },
      back: { es: "Los defectos que no se detectaron en testing y llegaron a producción.", en: "The defects not caught in testing that reached production." },
    },
    {
      type: "quiz",
      questionId: "qaf-m6-l5-q1",
      question: { es: "¿Qué métrica indica el porcentaje de requisitos que tienen al menos una prueba?", en: "Which metric indicates the percentage of requirements that have at least one test?" },
      options: [
        { id: "a", text: { es: "Densidad de defectos", en: "Defect density" } },
        { id: "b", text: { es: "Cobertura de requisitos", en: "Requirements coverage" } },
        { id: "c", text: { es: "Tasa de fuga", en: "Defect leakage" } },
        { id: "d", text: { es: "Tasa de aprobado", en: "Pass rate" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La cobertura de requisitos mide qué proporción de requisitos está cubierta por pruebas.", en: "Requirements coverage measures what proportion of requirements is covered by tests." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4, L5];
}
