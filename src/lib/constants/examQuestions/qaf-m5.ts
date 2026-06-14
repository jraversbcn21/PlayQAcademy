/**
 * QA Fundamentals — Banco de preguntas Módulo 5 (Diseño de Casos de Prueba).
 * Fuentes: ISTQB CTFL v4.0 (cap. 4), ISO/IEC/IEEE 29119-4.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m5"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m5-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Cuándo debe definirse el resultado esperado de un caso de prueba?", en: "When should the expected result of a test case be defined?" },
    options: [
      { id: "a", text: { es: "Después de ejecutar", en: "After running" } },
      { id: "b", text: { es: "Antes de ejecutar", en: "Before running" } },
      { id: "c", text: { es: "Solo si falla", en: "Only if it fails" } },
      { id: "d", text: { es: "Nunca", en: "Never" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Definirlo antes garantiza objetividad.", en: "Defining it beforehand ensures objectivity." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m5-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Un campo acepta de 1 a 10. ¿Qué técnica lleva a probar 0, 1, 10 y 11?", en: "A field accepts 1 to 10. Which technique leads to testing 0, 1, 10 and 11?" },
    options: [
      { id: "a", text: { es: "Tabla de decisión", en: "Decision table" } },
      { id: "b", text: { es: "Análisis de valores límite", en: "Boundary value analysis" } },
      { id: "c", text: { es: "Transición de estados", en: "State transition" } },
      { id: "d", text: { es: "Error guessing", en: "Error guessing" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Probar los extremos del rango es análisis de valores límite.", en: "Testing the range extremes is boundary value analysis." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m5-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Agrupar entradas en clases que se comportan igual y probar una de cada una es…", en: "Grouping inputs into classes that behave the same and testing one of each is…" },
    options: [
      { id: "a", text: { es: "Partición de equivalencia", en: "Equivalence partitioning" } },
      { id: "b", text: { es: "Transición de estados", en: "State transition" } },
      { id: "c", text: { es: "Tabla de decisión", en: "Decision table" } },
      { id: "d", text: { es: "Testing exploratorio", en: "Exploratory testing" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Eso es partición de equivalencia (EP).", en: "That is equivalence partitioning (EP)." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m5-e4", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Una cuenta pasa de 'activa' a 'bloqueada' tras 3 intentos fallidos. ¿Qué técnica lo modela mejor?", en: "An account goes from 'active' to 'locked' after 3 failed attempts. Which technique models it best?" },
    options: [
      { id: "a", text: { es: "Partición de equivalencia", en: "Equivalence partitioning" } },
      { id: "b", text: { es: "Transición de estados", en: "State transition" } },
      { id: "c", text: { es: "Valores límite", en: "Boundary values" } },
      { id: "d", text: { es: "Error guessing", en: "Error guessing" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El comportamiento depende del estado y un evento: transición de estados.", en: "Behavior depends on state and an event: state transition." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m5-e5", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "Probar un campo con valores raros porque 'sabes por experiencia que suele fallar' es…", en: "Testing a field with odd values because 'you know it tends to fail' is…" },
    options: [
      { id: "a", text: { es: "Error guessing", en: "Error guessing" } },
      { id: "b", text: { es: "Tabla de decisión", en: "Decision table" } },
      { id: "c", text: { es: "Partición de equivalencia", en: "Equivalence partitioning" } },
      { id: "d", text: { es: "Regresión", en: "Regression" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Usar la experiencia para anticipar errores comunes es error guessing.", en: "Using experience to anticipate common errors is error guessing." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m5-e6", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Por qué no usar datos personales reales en pruebas?", en: "Why not use real personal data in testing?" },
    options: [
      { id: "a", text: { es: "Porque ralentiza las pruebas", en: "Because it slows tests down" } },
      { id: "b", text: { es: "Por privacidad y cumplimiento normativo", en: "For privacy and regulatory compliance" } },
      { id: "c", text: { es: "Porque no es realista", en: "Because it is not realistic" } },
      { id: "d", text: { es: "No hay ningún problema en usarlos", en: "There is no problem using them" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Usar datos reales puede violar la protección de datos; usa datos sintéticos.", en: "Using real data can violate data protection; use synthetic data." },
    points: 1, timeEstimateSeconds: 40,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
