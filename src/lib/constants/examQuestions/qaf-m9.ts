/**
 * QA Fundamentals — Banco de preguntas Módulo 9 (Testing Web y Mobile Manual).
 * Fuentes: ISTQB CTFL v4.0, DevTools, WCAG.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m9"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m9-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Dónde verías los errores de JavaScript de una página web?", en: "Where would you see a web page's JavaScript errors?" },
    options: [
      { id: "a", text: { es: "Pestaña Console", en: "Console tab" } },
      { id: "b", text: { es: "Pestaña Elements", en: "Elements tab" } },
      { id: "c", text: { es: "Marcadores", en: "Bookmarks" } },
      { id: "d", text: { es: "Historial", en: "History" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La consola muestra los errores de JavaScript.", en: "The Console shows JavaScript errors." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m9-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué pestaña de DevTools usarías para ver si una petición devolvió un error 500?", en: "Which DevTools tab would you use to see if a request returned a 500 error?" },
    options: [
      { id: "a", text: { es: "Elements", en: "Elements" } },
      { id: "b", text: { es: "Network", en: "Network" } },
      { id: "c", text: { es: "Console", en: "Console" } },
      { id: "d", text: { es: "Sources", en: "Sources" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La pestaña Network muestra peticiones y sus códigos de estado.", en: "The Network tab shows requests and their status codes." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m9-e3", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "Comprobar que una web se ve bien en móvil, tablet y escritorio es probar su…", en: "Checking a website looks good on mobile, tablet and desktop tests its…" },
    options: [
      { id: "a", text: { es: "Seguridad", en: "Security" } },
      { id: "b", text: { es: "Diseño responsive", en: "Responsive design" } },
      { id: "c", text: { es: "Rendimiento de BD", en: "DB performance" } },
      { id: "d", text: { es: "Cobertura de código", en: "Code coverage" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Adaptarse a distintos tamaños es diseño responsive.", en: "Adapting to different sizes is responsive design." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m9-e4", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Cuál de estas pruebas es específica de aplicaciones móviles?", en: "Which test is specific to mobile applications?" },
    options: [
      { id: "a", text: { es: "Comportamiento ante una llamada entrante", en: "Behavior on an incoming call" } },
      { id: "b", text: { es: "Cálculo de un descuento", en: "A discount calculation" } },
      { id: "c", text: { es: "Ortografía de un texto", en: "Spelling of a text" } },
      { id: "d", text: { es: "Un enlace roto", en: "A broken link" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Las interrupciones como una llamada son propias del contexto móvil.", en: "Interruptions like a call are specific to mobile." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m9-e5", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Poder usar toda la web solo con el teclado se relaciona con el principio WCAG…", en: "Using the whole site with only the keyboard relates to the WCAG principle…" },
    options: [
      { id: "a", text: { es: "Perceptible", en: "Perceivable" } },
      { id: "b", text: { es: "Operable", en: "Operable" } },
      { id: "c", text: { es: "Comprensible", en: "Understandable" } },
      { id: "d", text: { es: "Robusto", en: "Robust" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La navegación por teclado es parte del principio Operable.", en: "Keyboard navigation is part of the Operable principle." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m9-e6", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Qué cuatro principios resumen las WCAG?", en: "Which four principles summarize WCAG?" },
    options: [
      { id: "a", text: { es: "Perceptible, Operable, Comprensible, Robusto", en: "Perceivable, Operable, Understandable, Robust" } },
      { id: "b", text: { es: "Rápido, Seguro, Bonito, Barato", en: "Fast, Secure, Pretty, Cheap" } },
      { id: "c", text: { es: "Planificar, Diseñar, Ejecutar, Cerrar", en: "Plan, Design, Execute, Close" } },
      { id: "d", text: { es: "Crear, Leer, Actualizar, Borrar", en: "Create, Read, Update, Delete" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "WCAG se resume en POUR: Perceptible, Operable, Comprensible y Robusto.", en: "WCAG is summarized as POUR: Perceivable, Operable, Understandable and Robust." },
    points: 1, timeEstimateSeconds: 40,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
