/**
 * ISTQB CTFL — Banco de preguntas Módulo 3 (Testing Estático).
 * Cubre el Capítulo 3 del syllabus: conceptos básicos del testing estático,
 * valor frente al dinámico, el proceso de revisión, roles y tipos de revisión.
 * Fuentes: ISTQB CTFL v4.0 Syllabus (cap. 3), ISTQB Glossary.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["istqb-static-testing"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "istqb-m3-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Qué caracteriza al testing estático?", en: "What characterizes static testing?" },
    options: [
      { id: "a", text: { es: "Examina los productos de trabajo sin ejecutar el código", en: "It examines work products without executing the code" } },
      { id: "b", text: { es: "Siempre ejecuta el software", en: "It always executes the software" } },
      { id: "c", text: { es: "Solo se aplica en producción", en: "It only applies in production" } },
      { id: "d", text: { es: "Requiere datos de prueba reales", en: "It requires real test data" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El testing estático examina productos de trabajo (requisitos, código, diseños) mediante revisión o análisis estático, sin ejecutarlos.", en: "Static testing examines work products (requirements, code, designs) through review or static analysis, without executing them." },
    points: 1,
    timeEstimateSeconds: 35,
  },
  {
    id: "istqb-m3-e2",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál de estos productos de trabajo puede examinarse con testing estático?", en: "Which of these work products can be examined with static testing?" },
    options: [
      { id: "a", text: { es: "Solo el código compilado", en: "Only compiled code" } },
      { id: "b", text: { es: "Requisitos, especificaciones, código fuente y contratos", en: "Requirements, specifications, source code and contracts" } },
      { id: "c", text: { es: "Únicamente la base de datos de producción", en: "Only the production database" } },
      { id: "d", text: { es: "Solo los registros de ejecución", en: "Only execution logs" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Casi cualquier producto de trabajo legible puede revisarse: requisitos, historias de usuario, diseños, código, contratos, planes de prueba, etc.", en: "Almost any readable work product can be reviewed: requirements, user stories, designs, code, contracts, test plans, etc." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "istqb-m3-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Por qué es valioso el testing estático?", en: "Why is static testing valuable?" },
    options: [
      { id: "a", text: { es: "Porque detecta defectos temprano, cuando son más baratos de corregir", en: "Because it detects defects early, when they are cheaper to fix" } },
      { id: "b", text: { es: "Porque sustituye por completo al testing dinámico", en: "Because it fully replaces dynamic testing" } },
      { id: "c", text: { es: "Porque no requiere personas", en: "Because it requires no people" } },
      { id: "d", text: { es: "Porque solo se hace en producción", en: "Because it is only done in production" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Encontrar defectos en requisitos o diseño (antes de codificar) es mucho más barato; el estático y el dinámico se complementan.", en: "Finding defects in requirements or design (before coding) is far cheaper; static and dynamic testing complement each other." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "istqb-m3-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál es el tipo de revisión MÁS formal según el ISTQB?", en: "Which is the MOST formal review type according to ISTQB?" },
    options: [
      { id: "a", text: { es: "Revisión informal", en: "Informal review" } },
      { id: "b", text: { es: "Walkthrough", en: "Walkthrough" } },
      { id: "c", text: { es: "Revisión técnica", en: "Technical review" } },
      { id: "d", text: { es: "Inspección", en: "Inspection" } },
    ],
    correctOptionIds: ["d"],
    explanation: { es: "La inspección es la revisión más formal: sigue un proceso definido, con roles, métricas y criterios de entrada/salida.", en: "The inspection is the most formal review: it follows a defined process with roles, metrics and entry/exit criteria." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "istqb-m3-e5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "En un walkthrough, ¿quién suele liderar la sesión?", en: "In a walkthrough, who usually leads the session?" },
    options: [
      { id: "a", text: { es: "El autor del producto de trabajo", en: "The author of the work product" } },
      { id: "b", text: { es: "Un auditor externo obligatorio", en: "A mandatory external auditor" } },
      { id: "c", text: { es: "El cliente final", en: "The end customer" } },
      { id: "d", text: { es: "El director de la empresa", en: "The company director" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "En el walkthrough el autor suele guiar al grupo a través del producto de trabajo; es menos formal que la inspección.", en: "In a walkthrough the author usually guides the group through the work product; it is less formal than an inspection." },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "istqb-m3-e6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Cuál es la función del rol de escriba (scribe) en una revisión?", en: "What is the role of the scribe in a review?" },
    options: [
      { id: "a", text: { es: "Aprobar el presupuesto de la revisión", en: "Approve the review budget" } },
      { id: "b", text: { es: "Registrar las anomalías, decisiones y hallazgos de la revisión", en: "Record the anomalies, decisions and findings of the review" } },
      { id: "c", text: { es: "Escribir el código corregido", en: "Write the corrected code" } },
      { id: "d", text: { es: "Decidir qué se libera a producción", en: "Decide what is released to production" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "El escriba documenta los defectos, decisiones y nuevas acciones surgidas durante la reunión de revisión.", en: "The scribe documents the defects, decisions and new actions raised during the review meeting." },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "istqb-m3-e7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Cuál es una diferencia clave entre testing estático y dinámico?", en: "What is a key difference between static and dynamic testing?" },
    options: [
      { id: "a", text: { es: "El estático encuentra defectos directamente; el dinámico observa fallos provocados por defectos", en: "Static finds defects directly; dynamic observes failures caused by defects" } },
      { id: "b", text: { es: "El dinámico nunca encuentra defectos", en: "Dynamic never finds defects" } },
      { id: "c", text: { es: "El estático siempre es más caro", en: "Static is always more expensive" } },
      { id: "d", text: { es: "El estático solo lo hacen máquinas", en: "Static is only done by machines" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El testing estático localiza defectos directamente en el producto de trabajo; el dinámico revela fallos al ejecutar y desde ahí se infiere el defecto.", en: "Static testing locates defects directly in the work product; dynamic reveals failures on execution from which the defect is inferred." },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "istqb-m3-e8",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Cuál es un factor de éxito para las revisiones?", en: "Which is a success factor for reviews?" },
    options: [
      { id: "a", text: { es: "Centrarse en criticar a las personas, no al producto", en: "Focus on criticizing people, not the product" } },
      { id: "b", text: { es: "Definir objetivos claros y un clima de confianza sin culpar", en: "Define clear objectives and a blame-free, trustful atmosphere" } },
      { id: "c", text: { es: "Revisar productos lo más grandes posible de una vez", en: "Review the largest possible products at once" } },
      { id: "d", text: { es: "Evitar que el autor participe", en: "Prevent the author from participating" } },
    ],
    correctOptionIds: ["b"],
    explanation: { es: "Las revisiones funcionan mejor con objetivos claros, alcance adecuado, participantes correctos y una cultura sin culpas centrada en el producto.", en: "Reviews work best with clear objectives, the right scope and participants, and a blame-free culture focused on the product." },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "istqb-m3-e9",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Un equipo necesita verificar formalmente un documento crítico con métricas y criterios de entrada/salida. ¿Qué tipo de revisión es el más adecuado?", en: "A team needs to formally verify a critical document with metrics and entry/exit criteria. Which review type is most appropriate?" },
    options: [
      { id: "a", text: { es: "Revisión informal", en: "Informal review" } },
      { id: "b", text: { es: "Walkthrough", en: "Walkthrough" } },
      { id: "c", text: { es: "Inspección", en: "Inspection" } },
      { id: "d", text: { es: "Lectura individual sin registro", en: "Individual reading with no record" } },
    ],
    correctOptionIds: ["c"],
    explanation: { es: "Cuando se requiere formalidad, métricas y criterios de entrada/salida definidos, la inspección es el tipo de revisión indicado.", en: "When formality, metrics and defined entry/exit criteria are required, inspection is the indicated review type." },
    points: 3,
    timeEstimateSeconds: 55,
  },
  {
    id: "istqb-m3-e10",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "¿Cuál de estas afirmaciones sobre los roles de una revisión es correcta?", en: "Which statement about review roles is correct?" },
    options: [
      { id: "a", text: { es: "El facilitador (moderador) garantiza una ejecución eficaz de la reunión y la mediación entre puntos de vista", en: "The facilitator (moderator) ensures effective conduct of the meeting and mediates differing viewpoints" } },
      { id: "b", text: { es: "El autor es siempre quien registra los defectos", en: "The author is always the one who records defects" } },
      { id: "c", text: { es: "El líder de la revisión escribe el código corregido", en: "The review leader writes the corrected code" } },
      { id: "d", text: { es: "Los revisores deciden el presupuesto del proyecto", en: "Reviewers decide the project budget" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El facilitador/moderador conduce la reunión y media; el líder planifica, el autor crea/corrige, los revisores identifican anomalías y el escriba las registra.", en: "The facilitator/moderator conducts and mediates the meeting; the leader plans, the author creates/fixes, reviewers identify anomalies and the scribe records them." },
    points: 3,
    timeEstimateSeconds: 60,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
