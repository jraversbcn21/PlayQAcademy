/**
 * QA Fundamentals — Banco de preguntas Módulo 6 (Ejecución y Gestión de Defectos).
 * Fuentes: ISTQB CTFL v4.0 (cap. 5), Jira docs, Azure Test Plans.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m6"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m6-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "El entorno está caído y no puedes ejecutar un caso. ¿Qué estado registras?", en: "The environment is down and you cannot run a case. Which status do you log?" },
    options: [
      { id: "a", text: { es: "Fail", en: "Fail" } },
      { id: "b", text: { es: "Pass", en: "Pass" } },
      { id: "c", text: { es: "Blocked", en: "Blocked" } },
      { id: "d", text: { es: "Skipped", en: "Skipped" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "Si no puedes ejecutar por causa externa, el caso queda bloqueado.", en: "If you cannot run it due to an external cause, it is blocked." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m6-e2", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué dos resultados nunca deben faltar en un bug report?", en: "Which two results must never be missing in a bug report?" },
    options: [
      { id: "a", text: { es: "Severidad y prioridad", en: "Severity and priority" } },
      { id: "b", text: { es: "Resultado esperado y resultado real", en: "Expected result and actual result" } },
      { id: "c", text: { es: "Autor y fecha", en: "Author and date" } },
      { id: "d", text: { es: "Navegador y SO", en: "Browser and OS" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El esperado vs real es el corazón del informe de defecto.", en: "Expected vs actual is the heart of the defect report." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m6-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Un defecto marcado 'Resuelto' sigue ocurriendo en el retest. ¿A qué estado pasa?", en: "A defect marked 'Fixed' still happens in retest. To which state does it move?" },
    options: [
      { id: "a", text: { es: "Cerrado", en: "Closed" } },
      { id: "b", text: { es: "Reabierto", en: "Reopened" } },
      { id: "c", text: { es: "Duplicado", en: "Duplicate" } },
      { id: "d", text: { es: "Rechazado", en: "Rejected" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Si el retest falla, el defecto se reabre.", en: "If the retest fails, the defect is reopened." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m6-e4", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Una errata en el nombre de la empresa en la home suele ser…", en: "A typo in the company name on the homepage is usually…" },
    options: [
      { id: "a", text: { es: "Severidad alta, prioridad alta", en: "High severity, high priority" } },
      { id: "b", text: { es: "Severidad baja, prioridad alta", en: "Low severity, high priority" } },
      { id: "c", text: { es: "Severidad alta, prioridad baja", en: "High severity, low priority" } },
      { id: "d", text: { es: "Severidad baja, prioridad baja", en: "Low severity, low priority" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "No rompe nada (severidad baja) pero es muy visible (prioridad alta).", en: "It breaks nothing (low severity) but is very visible (high priority)." },
    points: 1, timeEstimateSeconds: 50,
  },
  {
    id: "qaf-m6-e5", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué mide la severidad de un defecto?", en: "What does a defect's severity measure?" },
    options: [
      { id: "a", text: { es: "La urgencia de corrección", en: "The urgency to fix" } },
      { id: "b", text: { es: "El impacto técnico sobre el sistema", en: "The technical impact on the system" } },
      { id: "c", text: { es: "El número de pasos", en: "The number of steps" } },
      { id: "d", text: { es: "Quién lo reportó", en: "Who reported it" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La severidad mide el impacto técnico; la prioridad, la urgencia.", en: "Severity measures technical impact; priority, urgency." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m6-e6", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué métrica indica los defectos que llegaron a producción sin detectarse?", en: "Which metric indicates defects that reached production undetected?" },
    options: [
      { id: "a", text: { es: "Densidad de defectos", en: "Defect density" } },
      { id: "b", text: { es: "Tasa de fuga (defect leakage)", en: "Defect leakage" } },
      { id: "c", text: { es: "Cobertura de requisitos", en: "Requirements coverage" } },
      { id: "d", text: { es: "Tasa de aprobado", en: "Pass rate" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La tasa de fuga mide los defectos no detectados que llegaron a producción.", en: "Defect leakage measures undetected defects that reached production." },
    points: 1, timeEstimateSeconds: 45,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
