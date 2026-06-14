/**
 * QA Fundamentals — Módulo 8: Herramientas para QA Manual.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: Jira docs (Atlassian), Confluence docs (Atlassian), Azure Test Plans (Microsoft).
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m8";

/* ------------------------------------------------------------------ */
/*  Lección 8.1 — Jira para gestión de issues y defectos               */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m8-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Jira: el estándar de gestión de issues", en: "Jira: the standard for issue management" } },
    {
      type: "paragraph",
      content: {
        es: "Jira (de Atlassian) es una de las herramientas más usadas para gestionar el trabajo y los defectos. Todo se representa como un 'issue' (incidencia): historias, tareas, bugs… Cada issue avanza por un workflow de estados configurable.",
        en: "Jira (by Atlassian) is one of the most widely used tools to manage work and defects. Everything is represented as an 'issue': stories, tasks, bugs… Each issue moves through a configurable status workflow.",
      },
    },
    {
      type: "table",
      caption: { es: "Conceptos clave en Jira", en: "Key concepts in Jira" },
      headers: [
        { es: "Concepto", en: "Concept" },
        { es: "Qué es", en: "What it is" },
      ],
      rows: [
        { cells: [ { es: "Issue", en: "Issue" }, { es: "Unidad de trabajo (bug, tarea, historia)", en: "Unit of work (bug, task, story)" } ] },
        { cells: [ { es: "Workflow", en: "Workflow" }, { es: "Conjunto de estados y transiciones", en: "Set of states and transitions" } ] },
        { cells: [ { es: "Prioridad / Etiquetas", en: "Priority / Labels" }, { es: "Clasifican y filtran los issues", en: "Classify and filter issues" } ] },
        { cells: [ { es: "JQL", en: "JQL" }, { es: "Lenguaje de consulta para buscar issues", en: "Query language to search issues" } ] },
      ],
    },
    {
      type: "code",
      language: "sql",
      code: 'project = "WEB" AND type = Bug AND status = Open AND priority = High',
      caption: { es: "Ejemplo de consulta JQL: bugs abiertos de alta prioridad", en: "JQL example: open high-priority bugs" },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m8-l1-fc1",
      front: { es: "¿Qué es JQL en Jira?", en: "What is JQL in Jira?" },
      back: { es: "Jira Query Language: un lenguaje para buscar y filtrar issues con criterios precisos.", en: "Jira Query Language: a language to search and filter issues with precise criteria." },
    },
    {
      type: "quiz",
      questionId: "qaf-m8-l1-q1",
      question: { es: "En Jira, un bug reportado por QA se representa como…", en: "In Jira, a bug reported by QA is represented as…" },
      options: [
        { id: "a", text: { es: "Un workflow", en: "A workflow" } },
        { id: "b", text: { es: "Un issue de tipo Bug", en: "An issue of type Bug" } },
        { id: "c", text: { es: "Una consulta JQL", en: "A JQL query" } },
        { id: "d", text: { es: "Un sprint", en: "A sprint" } },
      ],
      correctOptionId: "b",
      explanation: { es: "En Jira todo es un issue; un defecto es un issue de tipo Bug.", en: "In Jira everything is an issue; a defect is an issue of type Bug." },
    },
  ],
  resources: [
    { title: { es: "Jira Documentation hub", en: "Jira Documentation hub" }, url: "https://confluence.atlassian.com/jira" },
    { title: { es: "Jira — Trabajar con reportes de bugs", en: "Jira — Working with bug reports" }, url: "https://support.atlassian.com/jira-service-management-cloud/docs/working-on-bug-reports-with-jira-software-teams/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 8.2 — Confluence para documentación de pruebas             */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m8-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Documentar la calidad", en: "Documenting quality" } },
    {
      type: "paragraph",
      content: {
        es: "Confluence (también de Atlassian) es una herramienta de documentación colaborativa. El QA la usa para escribir planes de prueba, estrategias, checklists, evidencias y resúmenes de campañas de testing, todo enlazado con los issues de Jira.",
        en: "Confluence (also by Atlassian) is a collaborative documentation tool. QA uses it to write test plans, strategies, checklists, evidence and testing campaign summaries, all linked to Jira issues.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Plantillas reutilizables (plan de pruebas, informe de defectos).", en: "Reusable templates (test plan, defect report)." },
        { es: "Páginas enlazadas con issues de Jira.", en: "Pages linked to Jira issues." },
        { es: "Historial de versiones y comentarios.", en: "Version history and comments." },
        { es: "Una única fuente de verdad para el equipo.", en: "A single source of truth for the team." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Documentar no es burocracia si la documentación es útil y se mantiene viva: un buen plan de pruebas en Confluence ahorra reuniones y malentendidos.",
        en: "Documenting is not bureaucracy if the documentation is useful and kept alive: a good test plan in Confluence saves meetings and misunderstandings.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m8-l2-fc1",
      front: { es: "¿Para qué usa el QA Confluence?", en: "What does QA use Confluence for?" },
      back: { es: "Para documentación colaborativa: planes de prueba, estrategias, checklists y evidencias.", en: "For collaborative documentation: test plans, strategies, checklists and evidence." },
    },
    {
      type: "quiz",
      questionId: "qaf-m8-l2-q1",
      question: { es: "¿Cuál es el uso típico de Confluence en QA?", en: "What is the typical use of Confluence in QA?" },
      options: [
        { id: "a", text: { es: "Ejecutar pruebas automáticas", en: "Run automated tests" } },
        { id: "b", text: { es: "Documentación colaborativa (planes, checklists)", en: "Collaborative documentation (plans, checklists)" } },
        { id: "c", text: { es: "Compilar el código fuente", en: "Compile the source code" } },
        { id: "d", text: { es: "Desplegar a producción", en: "Deploy to production" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Confluence es para documentación colaborativa, complementando a Jira.", en: "Confluence is for collaborative documentation, complementing Jira." },
    },
  ],
  resources: [
    { title: { es: "Confluence — Atlassian Support", en: "Confluence — Atlassian Support" }, url: "https://support.atlassian.com/confluence-cloud/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 8.3 — Azure Test Plans                                     */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m8-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Gestionar pruebas manuales en Azure", en: "Managing manual tests in Azure" } },
    {
      type: "paragraph",
      content: {
        es: "Azure Test Plans (de Microsoft, dentro de Azure DevOps) es una herramienta para planificar, ejecutar y hacer seguimiento de pruebas manuales y exploratorias. Organiza el trabajo en tres tipos de elementos.",
        en: "Azure Test Plans (by Microsoft, within Azure DevOps) is a tool to plan, run and track manual and exploratory tests. It organizes work into three item types.",
      },
    },
    {
      type: "table",
      caption: { es: "Elementos de Azure Test Plans", en: "Azure Test Plans items" },
      headers: [
        { es: "Elemento", en: "Item" },
        { es: "Qué es", en: "What it is" },
      ],
      rows: [
        { cells: [ { es: "Test Plan", en: "Test Plan" }, { es: "Agrupa las pruebas de una entrega o sprint", en: "Groups the tests of a release or sprint" } ] },
        { cells: [ { es: "Test Suite", en: "Test Suite" }, { es: "Conjunto de casos relacionados", en: "A set of related cases" } ] },
        { cells: [ { es: "Test Case", en: "Test Case" }, { es: "Pasos y resultado esperado", en: "Steps and expected result" } ] },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Durante la ejecución, el Test Runner permite registrar el resultado de cada paso, capturar pantallas y crear bugs directamente, con los pasos y evidencias incluidos automáticamente.",
        en: "During execution, the Test Runner lets you record each step's result, capture screenshots and create bugs directly, with the steps and evidence included automatically.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m8-l3-fc1",
      front: { es: "En Azure Test Plans, ¿qué agrupa un Test Suite?", en: "In Azure Test Plans, what does a Test Suite group?" },
      back: { es: "Un conjunto de casos de prueba relacionados dentro de un Test Plan.", en: "A set of related test cases within a Test Plan." },
    },
    {
      type: "quiz",
      questionId: "qaf-m8-l3-q1",
      question: { es: "¿Cuál es la jerarquía correcta en Azure Test Plans?", en: "What is the correct hierarchy in Azure Test Plans?" },
      options: [
        { id: "a", text: { es: "Test Case → Test Suite → Test Plan", en: "Test Case → Test Suite → Test Plan" } },
        { id: "b", text: { es: "Test Plan → Test Suite → Test Case", en: "Test Plan → Test Suite → Test Case" } },
        { id: "c", text: { es: "Test Suite → Test Plan → Test Case", en: "Test Suite → Test Plan → Test Case" } },
        { id: "d", text: { es: "No hay jerarquía", en: "There is no hierarchy" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Un Test Plan contiene Test Suites, que contienen Test Cases.", en: "A Test Plan contains Test Suites, which contain Test Cases." },
    },
  ],
  resources: [
    { title: { es: "Azure Test Plans — Documentación", en: "Azure Test Plans — Documentation" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/?view=azure-devops" },
    { title: { es: "Azure Test Plans — Qué es", en: "Azure Test Plans — Overview" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/overview?view=azure-devops" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 8.4 — Comparativa y elección de herramientas               */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m8-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "No hay herramienta perfecta", en: "There is no perfect tool" } },
    {
      type: "paragraph",
      content: {
        es: "La mejor herramienta es la que encaja con el contexto del equipo: su ecosistema, su presupuesto y su forma de trabajar. Lo importante no es la herramienta, sino el proceso de calidad que soporta.",
        en: "The best tool is the one that fits the team's context: its ecosystem, budget and way of working. What matters is not the tool, but the quality process it supports.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Integración con el resto del ecosistema (repos, CI, chat).", en: "Integration with the rest of the ecosystem (repos, CI, chat)." },
        { es: "Curva de aprendizaje y soporte del equipo.", en: "Learning curve and team support." },
        { es: "Coste y licencias.", en: "Cost and licensing." },
        { es: "Capacidad de reporte y trazabilidad.", en: "Reporting and traceability capabilities." },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Jira + Confluence forman un ecosistema muy común; Azure DevOps integra repos, pipelines y Test Plans en una sola plataforma. Elige según dónde vive ya tu equipo.",
        en: "Jira + Confluence form a very common ecosystem; Azure DevOps integrates repos, pipelines and Test Plans in a single platform. Choose based on where your team already lives.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m8-l4-fc1",
      front: { es: "¿Qué criterio importa al elegir una herramienta de QA?", en: "Which criterion matters when choosing a QA tool?" },
      back: { es: "Que encaje con el contexto del equipo: ecosistema, coste, curva de aprendizaje y trazabilidad.", en: "That it fits the team's context: ecosystem, cost, learning curve and traceability." },
    },
    {
      type: "quiz",
      questionId: "qaf-m8-l4-q1",
      question: { es: "¿Qué afirmación sobre la elección de herramientas es correcta?", en: "Which statement about tool selection is correct?" },
      options: [
        { id: "a", text: { es: "Siempre hay que usar la herramienta más cara", en: "Always use the most expensive tool" } },
        { id: "b", text: { es: "La mejor herramienta depende del contexto del equipo", en: "The best tool depends on the team's context" } },
        { id: "c", text: { es: "La herramienta importa más que el proceso", en: "The tool matters more than the process" } },
        { id: "d", text: { es: "Todas las herramientas son idénticas", en: "All tools are identical" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La elección depende del contexto; la herramienta sirve al proceso de calidad, no al revés.", en: "The choice depends on context; the tool serves the quality process, not the other way around." },
    },
  ],
  resources: [
    { title: { es: "Jira Documentation hub", en: "Jira Documentation hub" }, url: "https://confluence.atlassian.com/jira" },
    { title: { es: "Azure Test Plans — Documentación", en: "Azure Test Plans — Documentation" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/?view=azure-devops" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4];
}
