/**
 * QA Fundamentals — Banco de preguntas Módulo 2
 * (Fundamentos de Calidad de Software).
 * Fuentes: ISO/IEC 25010:2023, ISTQB CTFL v4.0.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m2"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m2-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué es la calidad del software?", en: "What is software quality?" },
    options: [
      { id: "a", text: { es: "Que el código tenga muchos comentarios", en: "That the code has many comments" } },
      { id: "b", text: { es: "El grado en que satisface las necesidades declaradas e implícitas de las partes interesadas", en: "The degree to which it satisfies stated and implied stakeholder needs" } },
      { id: "c", text: { es: "Que no tenga ninguna línea de código duplicada", en: "That it has no duplicated lines of code" } },
      { id: "d", text: { es: "Que se haya desarrollado rápido", en: "That it was developed quickly" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La calidad es el grado en que se satisfacen las necesidades declaradas e implícitas.", en: "Quality is the degree to which stated and implied needs are satisfied." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m2-e2",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Un sistema cumple los requisitos escritos pero es tan lento que nadie lo usa. ¿Tiene calidad?", en: "A system meets the written requirements but is so slow nobody uses it. Does it have quality?" },
    options: [
      { id: "a", text: { es: "Sí, cumple lo escrito", en: "Yes, it meets what is written" } },
      { id: "b", text: { es: "No, falla en las necesidades implícitas", en: "No, it fails the implied needs" } },
      { id: "c", text: { es: "La velocidad no es parte de la calidad", en: "Speed is not part of quality" } },
      { id: "d", text: { es: "Solo desarrollo puede decidirlo", en: "Only development can decide" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El rendimiento es una necesidad implícita; no satisfacerlo reduce la calidad.", en: "Performance is an implied need; failing it reduces quality." },
    points: 1,
    timeEstimateSeconds: 50,
  },
  {
    id: "qaf-m2-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué norma define el modelo de calidad de producto de software (SQuaRE)?", en: "Which standard defines the software product quality model (SQuaRE)?" },
    options: [
      { id: "a", text: { es: "ISO/IEC 25010", en: "ISO/IEC 25010" } },
      { id: "b", text: { es: "Scrum Guide", en: "Scrum Guide" } },
      { id: "c", text: { es: "Agile Manifesto", en: "Agile Manifesto" } },
      { id: "d", text: { es: "BABOK", en: "BABOK" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "ISO/IEC 25010, de la familia SQuaRE, define el modelo de calidad de producto.", en: "ISO/IEC 25010, from the SQuaRE family, defines the product quality model." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m2-e4",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "El usuario no logra aprender a usar la app sin ayuda constante. ¿Qué característica falla?", en: "The user cannot learn the app without constant help. Which characteristic fails?" },
    options: [
      { id: "a", text: { es: "Usabilidad", en: "Usability" } },
      { id: "b", text: { es: "Seguridad", en: "Security" } },
      { id: "c", text: { es: "Portabilidad", en: "Portability" } },
      { id: "d", text: { es: "Mantenibilidad", en: "Maintainability" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La facilidad de aprendizaje y uso forma parte de la usabilidad.", en: "Ease of learning and use is part of usability." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m2-e5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "'El sistema debe permitir exportar un informe a PDF' es un requisito…", en: "'The system must allow exporting a report to PDF' is a requirement that is…" },
    options: [
      { id: "a", text: { es: "No funcional", en: "Non-functional" } },
      { id: "b", text: { es: "Funcional", en: "Functional" } },
      { id: "c", text: { es: "De rendimiento", en: "Performance" } },
      { id: "d", text: { es: "De seguridad", en: "Security" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Describe qué hace el sistema: es un requisito funcional.", en: "It describes what the system does: a functional requirement." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m2-e6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "'El sistema debe soportar 1000 usuarios simultáneos' es un requisito…", en: "'The system must support 1000 concurrent users' is a requirement that is…" },
    options: [
      { id: "a", text: { es: "Funcional", en: "Functional" } },
      { id: "b", text: { es: "No funcional", en: "Non-functional" } },
      { id: "c", text: { es: "De negocio", en: "Business" } },
      { id: "d", text: { es: "Una historia de usuario", en: "A user story" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Describe cómo se comporta (rendimiento/escalabilidad): requisito no funcional.", en: "It describes how it behaves (performance/scalability): a non-functional requirement." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m2-e7",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué significa 'shift-left' en QA?", en: "What does 'shift-left' mean in QA?" },
    options: [
      { id: "a", text: { es: "Probar solo al final del proyecto", en: "Test only at the end of the project" } },
      { id: "b", text: { es: "Mover las actividades de calidad a fases tempranas", en: "Move quality activities to early phases" } },
      { id: "c", text: { es: "Eliminar la documentación", en: "Remove documentation" } },
      { id: "d", text: { es: "Automatizar todas las pruebas", en: "Automate all tests" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Shift-left adelanta el testing y la calidad para detectar defectos pronto.", en: "Shift-left moves testing and quality earlier to detect defects sooner." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m2-e8",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Por qué conviene detectar defectos lo antes posible?", en: "Why is it best to detect defects as early as possible?" },
    options: [
      { id: "a", text: { es: "Porque corregirlos más tarde suele costar más", en: "Because fixing them later usually costs more" } },
      { id: "b", text: { es: "Porque los defectos tempranos no importan", en: "Because early defects do not matter" } },
      { id: "c", text: { es: "Porque así no hay que documentar", en: "Because then there is no need to document" } },
      { id: "d", text: { es: "Porque elimina la necesidad de testing", en: "Because it removes the need for testing" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El coste de corregir crece a lo largo del ciclo de vida; de ahí el valor del shift-left.", en: "The cost to fix grows along the lifecycle; hence the value of shift-left." },
    points: 1,
    timeEstimateSeconds: 50,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
