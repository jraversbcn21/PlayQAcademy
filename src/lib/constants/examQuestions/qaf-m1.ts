/**
 * QA Fundamentals — Banco de preguntas Módulo 1
 * (Introducción al QA y al Testing de Software).
 * Fuentes: ISTQB CTFL v4.0 (cap. 1), ISTQB Glossary.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m1"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m1-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál es el objetivo principal del testing de software?", en: "What is the main objective of software testing?" },
    options: [
      { id: "a", text: { es: "Demostrar que el software no tiene defectos", en: "Prove the software has no defects" } },
      { id: "b", text: { es: "Evaluar la calidad y reducir el riesgo de fallos", en: "Evaluate quality and reduce the risk of failures" } },
      { id: "c", text: { es: "Reemplazar al equipo de desarrollo", en: "Replace the development team" } },
      { id: "d", text: { es: "Escribir el código de la aplicación", en: "Write the application code" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El testing evalúa la calidad y reduce riesgos; no puede demostrar la ausencia de defectos.", en: "Testing evaluates quality and reduces risk; it cannot prove the absence of defects." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e2",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué describe MEJOR el aseguramiento de calidad (QA)?", en: "What BEST describes quality assurance (QA)?" },
    options: [
      { id: "a", text: { es: "Una actividad para ejecutar casos de prueba", en: "An activity to run test cases" } },
      { id: "b", text: { es: "Un enfoque orientado al proceso para prevenir defectos", en: "A process-oriented approach to prevent defects" } },
      { id: "c", text: { es: "La corrección de defectos en el código", en: "Fixing defects in the code" } },
      { id: "d", text: { es: "El despliegue del software a producción", en: "Deploying software to production" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "QA se orienta al proceso para prevenir defectos; el testing es una actividad concreta dentro de QA.", en: "QA is process-oriented to prevent defects; testing is a concrete activity within QA." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e3",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Un desarrollador teclea '+' donde debía ir '-'. ¿Cómo se clasifica esa acción humana?", en: "A developer types '+' where '-' was needed. How is that human action classified?" },
    options: [
      { id: "a", text: { es: "Error", en: "Error" } },
      { id: "b", text: { es: "Defecto", en: "Defect" } },
      { id: "c", text: { es: "Fallo", en: "Failure" } },
      { id: "d", text: { es: "Riesgo", en: "Risk" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La acción humana incorrecta es un error (mistake), que introduce un defecto en el código.", en: "The incorrect human action is an error (mistake), which introduces a defect in the code." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m1-e4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "El usuario ve un total equivocado en la factura. Eso es un…", en: "The user sees a wrong total on the invoice. That is a…" },
    options: [
      { id: "a", text: { es: "Error", en: "Error" } },
      { id: "b", text: { es: "Defecto", en: "Defect" } },
      { id: "c", text: { es: "Fallo", en: "Failure" } },
      { id: "d", text: { es: "Causa raíz", en: "Root cause" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "El comportamiento observable incorrecto en ejecución es un fallo (failure).", en: "The incorrect observable behavior at runtime is a failure." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m1-e5",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué principio dice que el testing exhaustivo es imposible?", en: "Which principle says exhaustive testing is impossible?" },
    options: [
      { id: "a", text: { es: "Principio 1", en: "Principle 1" } },
      { id: "b", text: { es: "Principio 2", en: "Principle 2" } },
      { id: "c", text: { es: "Principio 4", en: "Principle 4" } },
      { id: "d", text: { es: "Principio 7", en: "Principle 7" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El principio 2 establece que probar todas las combinaciones es inviable; hay que priorizar.", en: "Principle 2 states that testing all combinations is infeasible; prioritization is needed." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Los casos de prueba repetidos dejan de encontrar defectos nuevos. ¿Qué principio es?", en: "Repeated test cases stop finding new defects. Which principle is this?" },
    options: [
      { id: "a", text: { es: "Agrupación de defectos", en: "Defect clustering" } },
      { id: "b", text: { es: "Paradoja del pesticida", en: "Pesticide paradox" } },
      { id: "c", text: { es: "Testing temprano", en: "Early testing" } },
      { id: "d", text: { es: "Testing depende del contexto", en: "Context-dependent testing" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La paradoja del pesticida: hay que renovar los casos para seguir encontrando defectos.", en: "The pesticide paradox: cases must be refreshed to keep finding defects." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m1-e7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Un software sin defectos pero que no sirve para lo que el usuario necesita ilustra…", en: "Defect-free software that is useless for what the user needs illustrates…" },
    options: [
      { id: "a", text: { es: "La falacia de ausencia de errores", en: "The absence-of-errors fallacy" } },
      { id: "b", text: { es: "La agrupación de defectos", en: "Defect clustering" } },
      { id: "c", text: { es: "El testing exhaustivo", en: "Exhaustive testing" } },
      { id: "d", text: { es: "El testing temprano", en: "Early testing" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El principio 7: encontrar y corregir defectos no ayuda si el sistema no satisface las necesidades.", en: "Principle 7: finding and fixing defects does not help if the system fails to meet needs." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m1-e8",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál de estas afirmaciones sobre QC (control de calidad) es correcta?", en: "Which statement about QC (quality control) is correct?" },
    options: [
      { id: "a", text: { es: "Se orienta al proceso para prevenir defectos", en: "It is process-oriented to prevent defects" } },
      { id: "b", text: { es: "Se orienta al producto para detectar defectos", en: "It is product-oriented to detect defects" } },
      { id: "c", text: { es: "Es sinónimo exacto de QA", en: "It is an exact synonym of QA" } },
      { id: "d", text: { es: "No tiene relación con la calidad", en: "It is unrelated to quality" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "QC se orienta al producto y busca detectar defectos; QA se orienta al proceso (prevención).", en: "QC is product-oriented and detects defects; QA is process-oriented (prevention)." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e9",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál es una habilidad esencial del QA tester manual?", en: "Which is an essential skill of the manual QA tester?" },
    options: [
      { id: "a", text: { es: "Evitar comunicarse con el equipo", en: "Avoid communicating with the team" } },
      { id: "b", text: { es: "Pensamiento crítico y atención al detalle", en: "Critical thinking and attention to detail" } },
      { id: "c", text: { es: "Confiar en que todo funciona", en: "Trust that everything works" } },
      { id: "d", text: { es: "Probar solo lo más fácil", en: "Test only the easiest things" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El pensamiento crítico y la atención al detalle son centrales en la mentalidad de testing.", en: "Critical thinking and attention to detail are central to the testing mindset." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m1-e10",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Por qué 'no haber observado fallos' no significa 'no hay defectos'?", en: "Why does 'no failures observed' not mean 'there are no defects'?" },
    options: [
      { id: "a", text: { es: "Porque los defectos no existen", en: "Because defects do not exist" } },
      { id: "b", text: { es: "Porque un defecto solo falla si su código se ejecuta en ciertas condiciones", en: "Because a defect only fails if its code runs under certain conditions" } },
      { id: "c", text: { es: "Porque el testing es exhaustivo", en: "Because testing is exhaustive" } },
      { id: "d", text: { es: "Porque QA y QC son lo mismo", en: "Because QA and QC are the same" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Un defecto latente puede no producir fallo si no se ejecuta el camino afectado.", en: "A latent defect may not produce a failure if the affected path is not executed." },
    points: 1,
    timeEstimateSeconds: 50,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
