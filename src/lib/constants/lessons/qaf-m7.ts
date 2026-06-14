/**
 * QA Fundamentals — Módulo 7: Metodologías Ágiles para QA (Scrum y Kanban).
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: Scrum Guide 2020, Agile Manifesto, Official Kanban Guide, ISTQB CTFL-AT.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m7";

/* ------------------------------------------------------------------ */
/*  Lección 7.1 — El Manifiesto Ágil y sus principios                  */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m7-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Los 4 valores ágiles", en: "The 4 agile values" } },
    {
      type: "paragraph",
      content: {
        es: "El Manifiesto Ágil (2001) define una forma de trabajar centrada en entregar valor pronto y adaptarse al cambio. No niega lo de la derecha, pero valora más lo de la izquierda.",
        en: "The Agile Manifesto (2001) defines a way of working focused on delivering value early and adapting to change. It does not reject what is on the right, but values what is on the left more.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Individuos e interacciones sobre procesos y herramientas.", en: "Individuals and interactions over processes and tools." },
        { es: "Software funcionando sobre documentación extensiva.", en: "Working software over comprehensive documentation." },
        { es: "Colaboración con el cliente sobre negociación contractual.", en: "Customer collaboration over contract negotiation." },
        { es: "Responder al cambio sobre seguir un plan.", en: "Responding to change over following a plan." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Detrás de los 4 valores hay 12 principios. Para el QA destacan: entregar software funcionando con frecuencia y la atención continua a la excelencia técnica.",
        en: "Behind the 4 values there are 12 principles. For QA, the standouts are: delivering working software frequently and continuous attention to technical excellence.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m7-l1-fc1",
      front: { es: "¿'Software funcionando sobre...' qué?", en: "'Working software over...' what?" },
      back: { es: "Sobre documentación extensiva.", en: "Over comprehensive documentation." },
    },
    {
      type: "quiz",
      questionId: "qaf-m7-l1-q1",
      question: { es: "Según el Manifiesto Ágil, ¿qué se valora más?", en: "According to the Agile Manifesto, what is valued more?" },
      options: [
        { id: "a", text: { es: "Seguir un plan sobre responder al cambio", en: "Following a plan over responding to change" } },
        { id: "b", text: { es: "Responder al cambio sobre seguir un plan", en: "Responding to change over following a plan" } },
        { id: "c", text: { es: "Procesos sobre individuos", en: "Processes over individuals" } },
        { id: "d", text: { es: "Documentación sobre software funcionando", en: "Documentation over working software" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El manifiesto valora más responder al cambio que seguir un plan rígido.", en: "The manifesto values responding to change over following a rigid plan." },
    },
  ],
  resources: [
    { title: { es: "Manifiesto Ágil", en: "Agile Manifesto" }, url: "https://agilemanifesto.org/" },
    { title: { es: "12 principios — Agile Alliance", en: "12 principles — Agile Alliance" }, url: "https://agilealliance.org/agile101/12-principles-behind-the-agile-manifesto/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 7.2 — Scrum: roles, eventos y artefactos                   */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m7-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "El marco Scrum", en: "The Scrum framework" } },
    {
      type: "paragraph",
      content: {
        es: "Scrum organiza el trabajo en iteraciones cortas llamadas sprints (normalmente de 1 a 4 semanas). Según la Scrum Guide 2020, define tres responsabilidades (roles), cinco eventos y tres artefactos.",
        en: "Scrum organizes work into short iterations called sprints (usually 1 to 4 weeks). Per the 2020 Scrum Guide, it defines three accountabilities (roles), five events and three artifacts.",
      },
    },
    {
      type: "table",
      caption: { es: "Elementos de Scrum", en: "Scrum elements" },
      headers: [
        { es: "Categoría", en: "Category" },
        { es: "Elementos", en: "Elements" },
      ],
      rows: [
        { cells: [ { es: "Roles", en: "Roles" }, { es: "Product Owner, Scrum Master, Developers", en: "Product Owner, Scrum Master, Developers" } ] },
        { cells: [ { es: "Eventos", en: "Events" }, { es: "Sprint, Planning, Daily, Review, Retrospective", en: "Sprint, Planning, Daily, Review, Retrospective" } ] },
        { cells: [ { es: "Artefactos", en: "Artifacts" }, { es: "Product Backlog, Sprint Backlog, Increment", en: "Product Backlog, Sprint Backlog, Increment" } ] },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "En Scrum, el QA forma parte de 'Developers' (el equipo que construye el incremento). No es un rol separado: la calidad es responsabilidad de todo el equipo.",
        en: "In Scrum, QA is part of 'Developers' (the team that builds the increment). It is not a separate role: quality is the whole team's responsibility.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m7-l2-fc1",
      front: { es: "¿Qué evento de Scrum sirve para inspeccionar y adaptar el proceso del equipo?", en: "Which Scrum event is used to inspect and adapt the team's process?" },
      back: { es: "La Retrospectiva del Sprint (Sprint Retrospective).", en: "The Sprint Retrospective." },
    },
    {
      type: "quiz",
      questionId: "qaf-m7-l2-q1",
      question: { es: "¿Quién es responsable de priorizar el Product Backlog en Scrum?", en: "Who is responsible for prioritizing the Product Backlog in Scrum?" },
      options: [
        { id: "a", text: { es: "El Scrum Master", en: "The Scrum Master" } },
        { id: "b", text: { es: "El Product Owner", en: "The Product Owner" } },
        { id: "c", text: { es: "El QA tester", en: "The QA tester" } },
        { id: "d", text: { es: "El cliente directamente", en: "The customer directly" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El Product Owner es responsable del Product Backlog y de su priorización.", en: "The Product Owner is accountable for the Product Backlog and its prioritization." },
    },
  ],
  resources: [
    { title: { es: "The Scrum Guide 2020", en: "The Scrum Guide 2020" }, url: "https://scrumguides.org/" },
    { title: { es: "Scrum Guide 2020 (PDF)", en: "Scrum Guide 2020 (PDF)" }, url: "https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 7.3 — Kanban: flujo y límites WIP                          */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m7-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Visualizar el flujo de trabajo", en: "Visualizing the workflow" } },
    {
      type: "paragraph",
      content: {
        es: "Kanban es un método para gestionar el trabajo visualizándolo en un tablero con columnas (por ejemplo: Por hacer → En progreso → En pruebas → Hecho). Su objetivo es mejorar el flujo y reducir el trabajo a medias.",
        en: "Kanban is a method to manage work by visualizing it on a board with columns (for example: To do → In progress → In testing → Done). Its goal is to improve flow and reduce half-finished work.",
      },
    },
    { type: "heading", level: 2, content: { es: "Límites WIP", en: "WIP limits" } },
    {
      type: "paragraph",
      content: {
        es: "El concepto central de Kanban es el límite de trabajo en progreso (Work In Progress, WIP): un máximo de tareas en cada columna a la vez. Limitar el WIP evita la sobrecarga, revela cuellos de botella y acelera la entrega.",
        en: "Kanban's central concept is the Work In Progress (WIP) limit: a maximum number of tasks in each column at once. Limiting WIP prevents overload, reveals bottlenecks and speeds up delivery.",
      },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Si la columna 'En pruebas' acumula tareas y supera su límite WIP, es señal de un cuello de botella en QA: el equipo debe ayudar a desatascarlo antes de empezar trabajo nuevo.",
        en: "If the 'In testing' column piles up and exceeds its WIP limit, it signals a QA bottleneck: the team should help clear it before starting new work.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m7-l3-fc1",
      front: { es: "¿Qué significa y para qué sirve el límite WIP en Kanban?", en: "What does the WIP limit mean and what is it for in Kanban?" },
      back: { es: "Work In Progress: limita las tareas simultáneas para mejorar el flujo y revelar cuellos de botella.", en: "Work In Progress: it limits simultaneous tasks to improve flow and reveal bottlenecks." },
    },
    {
      type: "quiz",
      questionId: "qaf-m7-l3-q1",
      question: { es: "¿Cuál es el principal beneficio de limitar el WIP?", en: "What is the main benefit of limiting WIP?" },
      options: [
        { id: "a", text: { es: "Hacer más cosas a la vez", en: "Do more things at once" } },
        { id: "b", text: { es: "Mejorar el flujo y revelar cuellos de botella", en: "Improve flow and reveal bottlenecks" } },
        { id: "c", text: { es: "Eliminar la necesidad de pruebas", en: "Remove the need for testing" } },
        { id: "d", text: { es: "Aumentar la documentación", en: "Increase documentation" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Limitar el WIP mejora el flujo y hace visibles los cuellos de botella.", en: "Limiting WIP improves flow and makes bottlenecks visible." },
    },
  ],
  resources: [
    { title: { es: "The Official Kanban Guide", en: "The Official Kanban Guide" }, url: "https://kanban.university/kanban-guide/" },
    { title: { es: "Kanban Guide for Scrum Teams", en: "Kanban Guide for Scrum Teams" }, url: "https://www.scrum.org/resources/kanban-guide-scrum-teams" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 7.4 — El QA en el equipo ágil                              */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m7-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Calidad dentro del sprint", en: "Quality within the sprint" } },
    {
      type: "paragraph",
      content: {
        es: "En ágil, el QA no prueba 'al final': participa desde el refinamiento de las historias hasta la review. Aporta su mirada crítica pronto y prueba de forma continua a medida que las historias se completan.",
        en: "In agile, QA does not test 'at the end': it participates from story refinement to the review. It brings its critical perspective early and tests continuously as stories are completed.",
      },
    },
    {
      type: "table",
      caption: { es: "Definition of Ready vs Definition of Done", en: "Definition of Ready vs Definition of Done" },
      headers: [
        { es: "Concepto", en: "Concept" },
        { es: "Responde a", en: "Answers" },
        { es: "Ejemplo (QA)", en: "Example (QA)" },
      ],
      rows: [
        { cells: [ { es: "Definition of Ready", en: "Definition of Ready" }, { es: "¿La historia está lista para empezar?", en: "Is the story ready to start?" }, { es: "Tiene criterios de aceptación claros", en: "It has clear acceptance criteria" } ] },
        { cells: [ { es: "Definition of Done", en: "Definition of Done" }, { es: "¿La historia está realmente terminada?", en: "Is the story really finished?" }, { es: "Probada y sin defectos críticos abiertos", en: "Tested and with no open critical defects" } ] },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Incluir el testing en la Definition of Done garantiza que ninguna historia se considere 'hecha' sin haber sido probada.",
        en: "Including testing in the Definition of Done ensures no story is considered 'done' without being tested.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m7-l4-fc1",
      front: { es: "¿Qué describe la 'Definition of Done'?", en: "What does the 'Definition of Done' describe?" },
      back: { es: "Las condiciones que una historia debe cumplir para considerarse terminada (incluido el testing).", en: "The conditions a story must meet to be considered finished (including testing)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m7-l4-q1",
      question: { es: "¿Cuándo participa idealmente el QA en un equipo ágil?", en: "When does QA ideally participate in an agile team?" },
      options: [
        { id: "a", text: { es: "Solo el último día del sprint", en: "Only the last day of the sprint" } },
        { id: "b", text: { es: "Desde el refinamiento hasta la review, de forma continua", en: "From refinement to the review, continuously" } },
        { id: "c", text: { es: "Solo cuando hay defectos", en: "Only when there are defects" } },
        { id: "d", text: { es: "Después de desplegar a producción", en: "After deploying to production" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El QA ágil se involucra de forma continua, desde el refinamiento hasta la review.", en: "Agile QA gets involved continuously, from refinement to the review." },
    },
  ],
  resources: [
    { title: { es: "ISTQB Foundation Level Agile Tester (CTFL-AT)", en: "ISTQB Foundation Level Agile Tester (CTFL-AT)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-agile-tester-ctfl-at/" },
    { title: { es: "The Scrum Guide 2020", en: "The Scrum Guide 2020" }, url: "https://scrumguides.org/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4];
}
