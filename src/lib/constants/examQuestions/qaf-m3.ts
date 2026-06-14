/**
 * QA Fundamentals — Banco de preguntas Módulo 3 (Ciclos de Vida SDLC y STLC).
 * Fuente: ISTQB CTFL v4.0 (cap. 2).
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m3"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m3-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué modelo de SDLC concentra el testing al final, tras el desarrollo?", en: "Which SDLC model concentrates testing at the end, after development?" },
    options: [
      { id: "a", text: { es: "Ágil", en: "Agile" } },
      { id: "b", text: { es: "Waterfall", en: "Waterfall" } },
      { id: "c", text: { es: "Iterativo", en: "Iterative" } },
      { id: "d", text: { es: "Incremental", en: "Incremental" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "En cascada las fases son secuenciales y el testing va al final.", en: "In waterfall phases are sequential and testing comes at the end." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m3-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Revisar requisitos para detectar ambigüedades es un ejemplo de…", en: "Reviewing requirements to detect ambiguities is an example of…" },
    options: [
      { id: "a", text: { es: "Testing tardío", en: "Late testing" } },
      { id: "b", text: { es: "Testing temprano (shift-left)", en: "Early testing (shift-left)" } },
      { id: "c", text: { es: "Prueba de regresión", en: "Regression testing" } },
      { id: "d", text: { es: "Prueba de aceptación", en: "Acceptance testing" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Revisar requisitos pronto es testing temprano (shift-left).", en: "Reviewing requirements early is early testing (shift-left)." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m3-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Probar la interacción entre dos módulos recién conectados es nivel de…", en: "Testing the interaction between two newly connected modules is the … level" },
    options: [
      { id: "a", text: { es: "Componente", en: "Component" } },
      { id: "b", text: { es: "Integración", en: "Integration" } },
      { id: "c", text: { es: "Sistema", en: "System" } },
      { id: "d", text: { es: "Aceptación", en: "Acceptance" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Probar cómo interactúan los componentes es integración.", en: "Testing how components interact is integration." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m3-e4", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué nivel verifica que el sistema cumple las necesidades del negocio?", en: "Which level verifies the system meets business needs?" },
    options: [
      { id: "a", text: { es: "Componente", en: "Component" } },
      { id: "b", text: { es: "Integración", en: "Integration" } },
      { id: "c", text: { es: "Aceptación", en: "Acceptance" } },
      { id: "d", text: { es: "Sistema", en: "System" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "La prueba de aceptación valida las necesidades del negocio/usuario.", en: "Acceptance testing validates business/user needs." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m3-e5", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Tras corregir un bug, ejecutas pruebas en áreas relacionadas para asegurar que nada más se rompió. Eso es…", en: "After fixing a bug, you re-run tests in related areas to ensure nothing else broke. That is…" },
    options: [
      { id: "a", text: { es: "Retest", en: "Retest" } },
      { id: "b", text: { es: "Regresión", en: "Regression" } },
      { id: "c", text: { es: "Humo", en: "Smoke" } },
      { id: "d", text: { es: "Aceptación", en: "Acceptance" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Comprobar que un cambio no rompió otras áreas es regresión.", en: "Checking a change didn't break other areas is regression." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m3-e6", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "En el STLC, ¿qué fase produce métricas, informe final y lecciones aprendidas?", en: "In the STLC, which phase produces metrics, final report and lessons learned?" },
    options: [
      { id: "a", text: { es: "Planificación", en: "Planning" } },
      { id: "b", text: { es: "Diseño", en: "Design" } },
      { id: "c", text: { es: "Cierre", en: "Closure" } },
      { id: "d", text: { es: "Ejecución", en: "Execution" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "El cierre de pruebas recopila métricas, informe y lecciones aprendidas.", en: "Test closure gathers metrics, report and lessons learned." },
    points: 1, timeEstimateSeconds: 45,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
