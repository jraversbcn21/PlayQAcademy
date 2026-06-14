/**
 * QA Fundamentals — Banco de preguntas Módulo 4 (Análisis de Requisitos).
 * Fuentes: ISTQB CTFL v4.0 (cap. 3), BABOK Guide.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m4"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m4-e1", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "'La aplicación debe ser rápida' es un mal requisito porque…", en: "'The application must be fast' is a bad requirement because…" },
    options: [
      { id: "a", text: { es: "Es funcional", en: "It is functional" } },
      { id: "b", text: { es: "No es verificable: 'rápida' es ambiguo", en: "It is not verifiable: 'fast' is ambiguous" } },
      { id: "c", text: { es: "Es de negocio", en: "It is a business one" } },
      { id: "d", text: { es: "Es demasiado técnico", en: "It is too technical" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "'Rápida' no es medible; debería cuantificarse (p. ej. < 2 s).", en: "'Fast' is not measurable; it should be quantified (e.g. < 2s)." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m4-e2", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "El testing estático se caracteriza por…", en: "Static testing is characterized by…" },
    options: [
      { id: "a", text: { es: "Ejecutar el software", en: "Executing the software" } },
      { id: "b", text: { es: "Evaluar productos de trabajo sin ejecutarlos", en: "Evaluating work products without executing them" } },
      { id: "c", text: { es: "Probar solo en producción", en: "Testing only in production" } },
      { id: "d", text: { es: "Automatizar pruebas", en: "Automating tests" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El testing estático revisa artefactos sin ejecutar el software.", en: "Static testing reviews artifacts without executing the software." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m4-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Una revisión guiada por el autor del documento es un…", en: "A review led by the document's author is a…" },
    options: [
      { id: "a", text: { es: "Inspección", en: "Inspection" } },
      { id: "b", text: { es: "Walkthrough", en: "Walkthrough" } },
      { id: "c", text: { es: "Prueba dinámica", en: "Dynamic test" } },
      { id: "d", text: { es: "Análisis estático automatizado", en: "Automated static analysis" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El walkthrough lo guía el autor del producto de trabajo.", en: "The walkthrough is led by the author of the work product." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m4-e4", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "En un criterio Gherkin, la cláusula 'Entonces' expresa…", en: "In a Gherkin criterion, the 'Then' clause expresses…" },
    options: [
      { id: "a", text: { es: "El contexto inicial", en: "The initial context" } },
      { id: "b", text: { es: "La acción del usuario", en: "The user action" } },
      { id: "c", text: { es: "El resultado esperado", en: "The expected result" } },
      { id: "d", text: { es: "El rol del usuario", en: "The user role" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "'Entonces' describe el resultado esperado tras la acción.", en: "'Then' describes the expected result after the action." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m4-e5", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Un requisito sin ningún caso de prueba asociado en la matriz de trazabilidad indica…", en: "A requirement with no associated test case in the traceability matrix indicates…" },
    options: [
      { id: "a", text: { es: "Exceso de pruebas", en: "Too many tests" } },
      { id: "b", text: { es: "Un hueco de cobertura (riesgo)", en: "A coverage gap (risk)" } },
      { id: "c", text: { es: "Un requisito duplicado", en: "A duplicated requirement" } },
      { id: "d", text: { es: "Un requisito no funcional", en: "A non-functional requirement" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Sin cobertura, nadie verifica ese requisito: es un riesgo.", en: "With no coverage, nobody verifies that requirement: it is a risk." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m4-e6", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué hace 'verificable' a un requisito?", en: "What makes a requirement 'verifiable'?" },
    options: [
      { id: "a", text: { es: "Que sea largo", en: "That it is long" } },
      { id: "b", text: { es: "Que se pueda comprobar objetivamente si se cumple", en: "That it can be objectively checked" } },
      { id: "c", text: { es: "Que lo escriba un desarrollador", en: "That a developer writes it" } },
      { id: "d", text: { es: "Que use términos técnicos", en: "That it uses technical terms" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Verificable = se puede comprobar objetivamente, p. ej. con un caso de prueba.", en: "Verifiable = can be objectively checked, e.g. with a test case." },
    points: 1, timeEstimateSeconds: 40,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
