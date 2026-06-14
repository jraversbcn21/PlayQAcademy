/**
 * QA Fundamentals — Banco de preguntas Módulo 8 (Herramientas para QA Manual).
 * Fuentes: Jira docs, Confluence docs, Azure Test Plans.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m8"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m8-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "En Jira, un bug se representa como…", en: "In Jira, a bug is represented as…" },
    options: [
      { id: "a", text: { es: "Un workflow", en: "A workflow" } },
      { id: "b", text: { es: "Un issue de tipo Bug", en: "An issue of type Bug" } },
      { id: "c", text: { es: "Una consulta JQL", en: "A JQL query" } },
      { id: "d", text: { es: "Un sprint", en: "A sprint" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "En Jira todo es un issue; un defecto es un issue de tipo Bug.", en: "In Jira everything is an issue; a defect is an issue of type Bug." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m8-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué es JQL?", en: "What is JQL?" },
    options: [
      { id: "a", text: { es: "Un tipo de issue", en: "A type of issue" } },
      { id: "b", text: { es: "El lenguaje de consulta de Jira para buscar issues", en: "Jira's query language to search issues" } },
      { id: "c", text: { es: "Un evento de Scrum", en: "A Scrum event" } },
      { id: "d", text: { es: "Una herramienta de automatización", en: "An automation tool" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "JQL (Jira Query Language) busca y filtra issues.", en: "JQL (Jira Query Language) searches and filters issues." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m8-e3", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Cuál es el uso típico de Confluence en QA?", en: "What is the typical use of Confluence in QA?" },
    options: [
      { id: "a", text: { es: "Ejecutar pruebas automáticas", en: "Run automated tests" } },
      { id: "b", text: { es: "Documentación colaborativa (planes, checklists)", en: "Collaborative documentation (plans, checklists)" } },
      { id: "c", text: { es: "Compilar código", en: "Compile code" } },
      { id: "d", text: { es: "Desplegar a producción", en: "Deploy to production" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Confluence es para documentación colaborativa, complementando a Jira.", en: "Confluence is for collaborative documentation, complementing Jira." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m8-e4", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Cuál es la jerarquía correcta en Azure Test Plans?", en: "What is the correct hierarchy in Azure Test Plans?" },
    options: [
      { id: "a", text: { es: "Test Case → Test Suite → Test Plan", en: "Test Case → Test Suite → Test Plan" } },
      { id: "b", text: { es: "Test Plan → Test Suite → Test Case", en: "Test Plan → Test Suite → Test Case" } },
      { id: "c", text: { es: "Test Suite → Test Plan → Test Case", en: "Test Suite → Test Plan → Test Case" } },
      { id: "d", text: { es: "No hay jerarquía", en: "There is no hierarchy" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Un Test Plan contiene Suites, que contienen Cases.", en: "A Test Plan contains Suites, which contain Cases." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m8-e5", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "Al elegir una herramienta de QA, lo más correcto es…", en: "When choosing a QA tool, the most correct approach is…" },
    options: [
      { id: "a", text: { es: "Usar siempre la más cara", en: "Always use the most expensive" } },
      { id: "b", text: { es: "Elegir según el contexto del equipo", en: "Choose based on the team's context" } },
      { id: "c", text: { es: "La herramienta importa más que el proceso", en: "The tool matters more than the process" } },
      { id: "d", text: { es: "Todas son idénticas", en: "All are identical" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La mejor herramienta depende del contexto; sirve al proceso de calidad.", en: "The best tool depends on context; it serves the quality process." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m8-e6", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Durante la ejecución en Azure Test Plans, el Test Runner permite…", en: "During execution in Azure Test Plans, the Test Runner lets you…" },
    options: [
      { id: "a", text: { es: "Registrar resultados por paso y crear bugs con evidencia", en: "Log per-step results and create bugs with evidence" } },
      { id: "b", text: { es: "Escribir el código de la app", en: "Write the app's code" } },
      { id: "c", text: { es: "Sustituir al product owner", en: "Replace the product owner" } },
      { id: "d", text: { es: "Eliminar la necesidad de casos", en: "Remove the need for cases" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El Test Runner registra resultados por paso, captura pantallas y crea bugs.", en: "The Test Runner logs per-step results, captures screenshots and creates bugs." },
    points: 1, timeEstimateSeconds: 45,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
