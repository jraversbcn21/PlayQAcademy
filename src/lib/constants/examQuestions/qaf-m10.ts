/**
 * QA Fundamentals — Banco de preguntas Módulo 10 (IA aplicada al QA).
 * Fuente: ISTQB Certified Tester AI Testing (CT-AI).
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["qaf-m10"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "qaf-m10-e1", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "¿Cuál es el rol correcto de la IA generativa en el QA manual?", en: "What is the correct role of generative AI in manual QA?" },
    options: [
      { id: "a", text: { es: "Reemplazar al tester", en: "Replace the tester" } },
      { id: "b", text: { es: "Potenciar al tester, que revisa lo generado", en: "Augment the tester, who reviews the output" } },
      { id: "c", text: { es: "Decidir sin supervisión humana", en: "Decide without human supervision" } },
      { id: "d", text: { es: "Eliminar los requisitos", en: "Remove requirements" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "La IA es un copiloto: el criterio y la revisión humana son imprescindibles.", en: "AI is a copilot: human judgment and review are essential." },
    points: 1, timeEstimateSeconds: 40,
  },
  {
    id: "qaf-m10-e2", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué tres tipos de casos conviene pedir explícitamente a la IA?", en: "Which three case types should you explicitly ask the AI for?" },
    options: [
      { id: "a", text: { es: "Solo válidos", en: "Only valid" } },
      { id: "b", text: { es: "Válidos, inválidos y de valores límite", en: "Valid, invalid and boundary" } },
      { id: "c", text: { es: "Solo los que pasan", en: "Only passing ones" } },
      { id: "d", text: { es: "Ninguno en concreto", en: "None in particular" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Pide cobertura de casos válidos, inválidos y límite.", en: "Ask for coverage of valid, invalid and boundary cases." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m10-e3", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Qué es una 'alucinación' de la IA?", en: "What is an AI 'hallucination'?" },
    options: [
      { id: "a", text: { es: "Un error de red", en: "A network error" } },
      { id: "b", text: { es: "Cuando inventa información plausible pero falsa", en: "When it invents plausible but false information" } },
      { id: "c", text: { es: "Un tipo de caso de prueba", en: "A type of test case" } },
      { id: "d", text: { es: "Una métrica de calidad", en: "A quality metric" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Una alucinación es información plausible pero incorrecta; hay que verificar siempre.", en: "A hallucination is plausible but incorrect information; always verify." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m10-e4", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Cuál es una buena práctica al usar IA en QA?", en: "Which is a good practice when using AI in QA?" },
    options: [
      { id: "a", text: { es: "Confiar ciegamente en lo generado", en: "Blindly trust the output" } },
      { id: "b", text: { es: "Pegar datos reales de clientes", en: "Paste real customer data" } },
      { id: "c", text: { es: "Revisar y verificar siempre lo generado", en: "Always review and verify the output" } },
      { id: "d", text: { es: "Eliminar la revisión humana", en: "Remove human review" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "La revisión humana es la salvaguarda clave frente a alucinaciones y sesgos.", en: "Human review is the key safeguard against hallucinations and bias." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m10-e5", type: "single_choice", difficulty: "easy", moduleIds: M,
    question: { es: "Diferencia entre 'IA para QA' y 'QA de IA':", en: "Difference between 'AI for QA' and 'QA of AI':" },
    options: [
      { id: "a", text: { es: "Son exactamente lo mismo", en: "They are exactly the same" } },
      { id: "b", text: { es: "'IA para QA' usa IA como herramienta; 'QA de IA' prueba sistemas con IA", en: "'AI for QA' uses AI as a tool; 'QA of AI' tests AI-based systems" } },
      { id: "c", text: { es: "Ambas eliminan al tester", en: "Both remove the tester" } },
      { id: "d", text: { es: "Ninguna existe", en: "Neither exists" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "'IA para QA' = usar IA para probar mejor; 'QA de IA' = probar sistemas con IA.", en: "'AI for QA' = use AI to test better; 'QA of AI' = test AI-based systems." },
    points: 1, timeEstimateSeconds: 45,
  },
  {
    id: "qaf-m10-e6", type: "single_choice", difficulty: "medium", moduleIds: M,
    question: { es: "¿Por qué no pegar requisitos confidenciales en una IA pública?", en: "Why not paste confidential requirements into a public AI?" },
    options: [
      { id: "a", text: { es: "Porque es más lento", en: "Because it is slower" } },
      { id: "b", text: { es: "Por riesgo de filtrar información protegida", en: "Risk of leaking protected information" } },
      { id: "c", text: { es: "Porque la IA no los entiende", en: "Because AI doesn't understand them" } },
      { id: "d", text: { es: "No hay ningún problema", en: "There is no problem" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Pegar datos sensibles puede filtrar información protegida; cuida la privacidad.", en: "Pasting sensitive data can leak protected information; mind privacy." },
    points: 1, timeEstimateSeconds: 45,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
