/**
 * QA Fundamentals — Banco de preguntas Módulo 7 (Metodologías Ágiles).
 * Fuentes: Scrum Guide 2020, Agile Manifesto, Kanban Guide.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m7"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m7-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "Según el Manifiesto Ágil, ¿qué se valora más?", en: "According to the Agile Manifesto, what is valued more?" },
    options: [
      { id: "a", text: { es: "Seguir un plan sobre responder al cambio", en: "Following a plan over responding to change" } },
      { id: "b", text: { es: "Responder al cambio sobre seguir un plan", en: "Responding to change over following a plan" } },
      { id: "c", text: { es: "Documentación sobre software funcionando", en: "Documentation over working software" } },
      { id: "d", text: { es: "Procesos sobre individuos", en: "Processes over individuals" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El manifiesto valora responder al cambio sobre seguir un plan rígido.", en: "The manifesto values responding to change over a rigid plan." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m7-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Quién es responsable de priorizar el Product Backlog en Scrum?", en: "Who is responsible for prioritizing the Product Backlog in Scrum?" },
    options: [
      { id: "a", text: { es: "El Scrum Master", en: "The Scrum Master" } },
      { id: "b", text: { es: "El Product Owner", en: "The Product Owner" } },
      { id: "c", text: { es: "El QA", en: "QA" } },
      { id: "d", text: { es: "El cliente", en: "The customer" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El Product Owner es responsable del Product Backlog.", en: "The Product Owner is accountable for the Product Backlog." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m7-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué evento de Scrum sirve para inspeccionar y adaptar el proceso del equipo?", en: "Which Scrum event inspects and adapts the team's process?" },
    options: [
      { id: "a", text: { es: "Sprint Planning", en: "Sprint Planning" } },
      { id: "b", text: { es: "Daily Scrum", en: "Daily Scrum" } },
      { id: "c", text: { es: "Sprint Review", en: "Sprint Review" } },
      { id: "d", text: { es: "Sprint Retrospective", en: "Sprint Retrospective" } },
    ],
    correctOptionIds: ["d"],
    explanation: { es: "La Retrospectiva inspecciona y adapta el proceso del equipo.", en: "The Retrospective inspects and adapts the team's process." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m7-e4", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Cuál es el principal beneficio de limitar el WIP en Kanban?", en: "What is the main benefit of limiting WIP in Kanban?" },
    options: [
      { id: "a", text: { es: "Hacer más cosas a la vez", en: "Do more at once" } },
      { id: "b", text: { es: "Mejorar el flujo y revelar cuellos de botella", en: "Improve flow and reveal bottlenecks" } },
      { id: "c", text: { es: "Eliminar el testing", en: "Remove testing" } },
      { id: "d", text: { es: "Aumentar la documentación", en: "Increase documentation" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Limitar el WIP mejora el flujo y hace visibles los cuellos de botella.", en: "Limiting WIP improves flow and surfaces bottlenecks." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m7-e5", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué describe la 'Definition of Done'?", en: "What does the 'Definition of Done' describe?" },
    options: [
      { id: "a", text: { es: "Cuándo una historia está lista para empezar", en: "When a story is ready to start" } },
      { id: "b", text: { es: "Las condiciones para considerar una historia terminada (incluido el testing)", en: "Conditions for a story to be considered finished (incl. testing)" } },
      { id: "c", text: { es: "El backlog del producto", en: "The product backlog" } },
      { id: "d", text: { es: "La duración del sprint", en: "The sprint duration" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La DoD define cuándo una historia está realmente terminada.", en: "The DoD defines when a story is truly finished." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m7-e6", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "En Scrum, ¿dónde encaja el QA?", en: "In Scrum, where does QA fit?" },
    options: [
      { id: "a", text: { es: "Es un rol separado y externo", en: "It is a separate, external role" } },
      { id: "b", text: { es: "Forma parte de los Developers; la calidad es de todo el equipo", en: "It is part of the Developers; quality is the whole team's" } },
      { id: "c", text: { es: "Solo trabaja tras el sprint", en: "It only works after the sprint" } },
      { id: "d", text: { es: "Sustituye al Scrum Master", en: "It replaces the Scrum Master" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El QA forma parte de los Developers; la calidad es responsabilidad de todos.", en: "QA is part of the Developers; quality is everyone's responsibility." },
    points: 1, timeEstimateSeconds: 45,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
