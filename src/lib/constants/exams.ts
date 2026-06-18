/**
 * Exam definitions — 4 exams for PlayQ Academy.
 */

import type { Exam } from "@/types/exam";
import { getModulesForCampus } from "./campuses";
import { getQuestionsForModules } from "@/lib/exam/scoring";
import "./examQuestions/module-1";
import "./examQuestions/module-2";
import "./examQuestions/module-3";
import "./examQuestions/istqb";
import "./examQuestions/istqb-m1";
import "./examQuestions/istqb-m2";
import "./examQuestions/istqb-m3";
import "./examQuestions/istqb-m4";
import "./examQuestions/istqb-m5";
import "./examQuestions/istqb-m6";
import "./examQuestions/istqb-extra";
import "./examQuestions/qaf-m1";
import "./examQuestions/qaf-m2";
import "./examQuestions/qaf-m3";
import "./examQuestions/qaf-m4";
import "./examQuestions/qaf-m5";
import "./examQuestions/qaf-m6";
import "./examQuestions/qaf-m7";
import "./examQuestions/qaf-m8";
import "./examQuestions/qaf-m9";
import "./examQuestions/qaf-m10";

export const EXAMS: Exam[] = [
  {
    id: "exam-module-1",
    title: {
      es: "Dominio del Módulo 1 — Fundamentos TypeScript",
      en: "Module 1 Mastery — TypeScript Foundations",
    },
    description: {
      es: "Evalúa tu comprensión de TypeScript aplicado a automatización de pruebas. 15 preguntas sobre tipos, interfaces, async/await y funciones.",
      en: "Test your understanding of TypeScript for test automation. 15 questions on types, interfaces, async/await, and functions.",
    },
    type: "module",
    moduleIds: ["m1-typescript-foundations"],
    questionCount: 15,
    timeLimit: 20 * 60, // 20 minutes
    passingScore: 70,
    requiresModuleCompletion: ["m1-typescript-foundations"],
  },
  {
    id: "exam-module-2-3",
    title: {
      es: "Combinado Módulo 2-3 — Playwright + Localizadores",
      en: "Module 2-3 Combined — Playwright + Locators",
    },
    description: {
      es: "Domina los fundamentos de Playwright y la API de localizadores. 25 preguntas sobre navegadores, test runner, selectores y localizadores.",
      en: "Master Playwright fundamentals and the Locator API. 25 questions on browsers, test runner, selectors, and locators.",
    },
    type: "module",
    moduleIds: ["m2-playwright-fundamentals", "m3-locators-selectors"],
    questionCount: 25,
    timeLimit: 35 * 60, // 35 minutes
    passingScore: 70,
    requiresModuleCompletion: [
      "m2-playwright-fundamentals",
      "m3-locators-selectors",
    ],
  },
  {
    id: "exam-midterm",
    title: {
      es: "Examen Parcial — Módulos 1 a 4",
      en: "Midterm — Modules 1 to 4",
    },
    description: {
      es: "Evaluación completa de la primera mitad del curso. 40 preguntas sobre TypeScript, Playwright, localizadores, acciones y aserciones.",
      en: "Comprehensive evaluation of the first half of the course. 40 questions on TypeScript, Playwright, locators, actions, and assertions.",
    },
    type: "midterm",
    moduleIds: [
      "m1-typescript-foundations",
      "m2-playwright-fundamentals",
      "m3-locators-selectors",
      "m4-actions-assertions",
    ],
    questionCount: 40,
    timeLimit: 60 * 60, // 60 minutes
    passingScore: 75,
    requiresModuleCompletion: [
      "m1-typescript-foundations",
      "m2-playwright-fundamentals",
      "m3-locators-selectors",
      "m4-actions-assertions",
    ],
  },
  {
    id: "exam-final",
    title: {
      es: "Certificación Final — Currículum Completo",
      en: "Final Certification — Full Curriculum",
    },
    description: {
      es: "El examen definitivo. 60 preguntas cubriendo los 8 módulos. Aprueba con 80%+ y obtén la insignia legendaria PlayQ Certified.",
      en: "The ultimate exam. 60 questions covering all 8 modules. Pass with 80%+ and earn the legendary PlayQ Certified badge.",
    },
    type: "final",
    moduleIds: [
      "m1-typescript-foundations",
      "m2-playwright-fundamentals",
      "m3-locators-selectors",
      "m4-actions-assertions",
      "m5-page-object-model",
      "m6-configuration-environments",
      "m7-api-testing",
      "m8-cicd-reporting",
    ],
    questionCount: 60,
    timeLimit: 90 * 60, // 90 minutes
    passingScore: 80,
    requiresModuleCompletion: [
      "m1-typescript-foundations",
      "m2-playwright-fundamentals",
      "m3-locators-selectors",
      "m4-actions-assertions",
      "m5-page-object-model",
      "m6-configuration-environments",
      "m7-api-testing",
      "m8-cicd-reporting",
    ],
  },
  {
    id: "exam-istqb-m1",
    title: {
      es: "Dominio del Capítulo 1 — Fundamentos del Testing",
      en: "Chapter 1 Mastery — Fundamentals of Testing",
    },
    description: {
      es: "Evalúa el Capítulo 1 del syllabus ISTQB CTFL v4.0: objetivos del testing, error/defecto/fallo, los 7 principios y actividades/roles. 10 preguntas, 65% para aprobar.",
      en: "Test Chapter 1 of the ISTQB CTFL v4.0 syllabus: testing objectives, error/defect/failure, the 7 principles and activities/roles. 10 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-fundamentals"],
    questionCount: 10,
    timeLimit: 20 * 60, // 20 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-fundamentals"],
  },
  {
    id: "exam-istqb-m2",
    title: {
      es: "Dominio del Capítulo 2 — Testing a lo Largo del SDLC",
      en: "Chapter 2 Mastery — Testing Throughout the SDLC",
    },
    description: {
      es: "Evalúa el Capítulo 2 del syllabus ISTQB CTFL v4.0: modelos de SDLC, niveles y tipos de prueba, confirmación/regresión y mantenimiento. 10 preguntas, 65% para aprobar.",
      en: "Test Chapter 2 of the ISTQB CTFL v4.0 syllabus: SDLC models, test levels and types, confirmation/regression and maintenance. 10 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-sdlc"],
    questionCount: 10,
    timeLimit: 20 * 60, // 20 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-sdlc"],
  },
  {
    id: "exam-istqb-m3",
    title: {
      es: "Dominio del Capítulo 3 — Testing Estático",
      en: "Chapter 3 Mastery — Static Testing",
    },
    description: {
      es: "Evalúa el Capítulo 3 del syllabus ISTQB CTFL v4.0: conceptos del testing estático, el proceso de revisión, roles y tipos de revisión. 8 preguntas, 65% para aprobar.",
      en: "Test Chapter 3 of the ISTQB CTFL v4.0 syllabus: static testing concepts, the review process, roles and review types. 8 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-static-testing"],
    questionCount: 8,
    timeLimit: 15 * 60, // 15 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-static-testing"],
  },
  {
    id: "exam-istqb-m4",
    title: {
      es: "Dominio del Capítulo 4 — Análisis y Diseño de Pruebas",
      en: "Chapter 4 Mastery — Test Analysis and Design",
    },
    description: {
      es: "Evalúa el Capítulo 4 del syllabus ISTQB CTFL v4.0: técnicas de caja negra, caja blanca y basadas en experiencia/colaboración. 12 preguntas, 65% para aprobar.",
      en: "Test Chapter 4 of the ISTQB CTFL v4.0 syllabus: black-box, white-box and experience/collaboration-based techniques. 12 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-test-analysis"],
    questionCount: 12,
    timeLimit: 25 * 60, // 25 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-test-analysis"],
  },
  {
    id: "exam-istqb-m5",
    title: {
      es: "Dominio del Capítulo 5 — Gestión de Actividades de Prueba",
      en: "Chapter 5 Mastery — Managing Test Activities",
    },
    description: {
      es: "Evalúa el Capítulo 5 del syllabus ISTQB CTFL v4.0: planificación, criterios de entrada/salida, gestión de riesgos, monitoreo/control y gestión de defectos. 12 preguntas, 65% para aprobar.",
      en: "Test Chapter 5 of the ISTQB CTFL v4.0 syllabus: planning, entry/exit criteria, risk management, monitoring/control and defect management. 12 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-management"],
    questionCount: 12,
    timeLimit: 25 * 60, // 25 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-management"],
  },
  {
    id: "exam-istqb-m6",
    title: {
      es: "Dominio del Capítulo 6 — Soporte de Herramientas",
      en: "Chapter 6 Mastery — Tool Support for Testing",
    },
    description: {
      es: "Evalúa el Capítulo 6 del syllabus ISTQB CTFL v4.0: categorías de herramientas de testing y beneficios/riesgos de la automatización. 8 preguntas, 65% para aprobar.",
      en: "Test Chapter 6 of the ISTQB CTFL v4.0 syllabus: testing tool categories and automation benefits/risks. 8 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["istqb-tools"],
    questionCount: 8,
    timeLimit: 15 * 60, // 15 minutes
    passingScore: 65,
    requiresModuleCompletion: ["istqb-tools"],
  },
  {
    id: "exam-istqb-ctfl",
    title: {
      es: "Simulacro ISTQB CTFL v4.0",
      en: "ISTQB CTFL v4.0 Mock Exam",
    },
    description: {
      es: "Simulacro completo de la certificación ISTQB Foundation Level. 40 preguntas cubriendo los 6 capítulos del syllabus v4.0. 60 minutos, 65% para aprobar.",
      en: "Full ISTQB Foundation Level certification mock exam. 40 questions covering all 6 chapters of the v4.0 syllabus. 60 minutes, 65% to pass.",
    },
    type: "final",
    moduleIds: [
      "istqb-fundamentals",
      "istqb-sdlc",
      "istqb-static-testing",
      "istqb-test-analysis",
      "istqb-management",
      "istqb-tools",
    ],
    questionCount: 40,
    timeLimit: 60 * 60, // 60 minutes
    passingScore: 65,
    requiresModuleCompletion: [],
  },
  {
    id: "exam-istqb-ctfl-2",
    title: {
      es: "Simulacro ISTQB CTFL v4.0 — Set B",
      en: "ISTQB CTFL v4.0 Mock Exam — Set B",
    },
    description: {
      es: "Segundo simulacro completo de la certificación ISTQB Foundation Level, con una selección distinta de preguntas. 40 preguntas sobre los 6 capítulos del syllabus v4.0. 60 minutos, 65% para aprobar.",
      en: "Second full ISTQB Foundation Level certification mock exam, with a different question selection. 40 questions across all 6 chapters of the v4.0 syllabus. 60 minutes, 65% to pass.",
    },
    type: "final",
    moduleIds: [
      "istqb-fundamentals",
      "istqb-sdlc",
      "istqb-static-testing",
      "istqb-test-analysis",
      "istqb-management",
      "istqb-tools",
    ],
    questionCount: 40,
    timeLimit: 60 * 60, // 60 minutes
    passingScore: 65,
    requiresModuleCompletion: [],
  },
  {
    id: "exam-istqb-ctfl-3",
    title: {
      es: "Simulacro ISTQB CTFL v4.0 — Set C",
      en: "ISTQB CTFL v4.0 Mock Exam — Set C",
    },
    description: {
      es: "Tercer simulacro completo de la certificación ISTQB Foundation Level, con una selección distinta de preguntas. 40 preguntas sobre los 6 capítulos del syllabus v4.0. 60 minutos, 65% para aprobar.",
      en: "Third full ISTQB Foundation Level certification mock exam, with a different question selection. 40 questions across all 6 chapters of the v4.0 syllabus. 60 minutes, 65% to pass.",
    },
    type: "final",
    moduleIds: [
      "istqb-fundamentals",
      "istqb-sdlc",
      "istqb-static-testing",
      "istqb-test-analysis",
      "istqb-management",
      "istqb-tools",
    ],
    questionCount: 40,
    timeLimit: 60 * 60, // 60 minutes
    passingScore: 65,
    requiresModuleCompletion: [],
  },
  {
    id: "exam-qaf-m1",
    title: {
      es: "Dominio del Módulo 1 — Introducción al QA",
      en: "Module 1 Mastery — Introduction to QA",
    },
    description: {
      es: "Evalúa tu comprensión de los fundamentos del QA y el testing: QA/QC/testing, error/defecto/fallo y los 7 principios. 10 preguntas, 65% para aprobar.",
      en: "Test your understanding of QA and testing fundamentals: QA/QC/testing, error/defect/failure and the 7 principles. 10 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["qaf-m1"],
    questionCount: 10,
    timeLimit: 15 * 60, // 15 minutes
    passingScore: 65,
    requiresModuleCompletion: ["qaf-m1"],
  },
  {
    id: "exam-qaf-m2",
    title: {
      es: "Dominio del Módulo 2 — Calidad de Software",
      en: "Module 2 Mastery — Software Quality",
    },
    description: {
      es: "Evalúa tu comprensión de la calidad de software: modelo ISO/IEC 25010, calidad funcional vs no funcional y coste de la calidad. 8 preguntas, 65% para aprobar.",
      en: "Test your understanding of software quality: ISO/IEC 25010 model, functional vs non-functional quality and cost of quality. 8 questions, 65% to pass.",
    },
    type: "module",
    moduleIds: ["qaf-m2"],
    questionCount: 8,
    timeLimit: 12 * 60, // 12 minutes
    passingScore: 65,
    requiresModuleCompletion: ["qaf-m2"],
  },
  {
    id: "exam-qaf-m3",
    title: { es: "Dominio del Módulo 3 — SDLC y STLC", en: "Module 3 Mastery — SDLC and STLC" },
    description: { es: "Modelos de desarrollo, niveles y tipos de prueba, y el ciclo de vida del testing. 6 preguntas, 65% para aprobar.", en: "Development models, test levels and types, and the testing lifecycle. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m3"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m3"],
  },
  {
    id: "exam-qaf-m4",
    title: { es: "Dominio del Módulo 4 — Análisis de Requisitos", en: "Module 4 Mastery — Requirements Analysis" },
    description: { es: "Tipos de requisitos, testing estático, criterios de aceptación y trazabilidad. 6 preguntas, 65% para aprobar.", en: "Requirement types, static testing, acceptance criteria and traceability. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m4"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m4"],
  },
  {
    id: "exam-qaf-m5",
    title: { es: "Dominio del Módulo 5 — Diseño de Casos", en: "Module 5 Mastery — Test Case Design" },
    description: { es: "Técnicas de caja negra, testing exploratorio y datos de prueba. 6 preguntas, 65% para aprobar.", en: "Black-box techniques, exploratory testing and test data. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m5"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m5"],
  },
  {
    id: "exam-qaf-m6",
    title: { es: "Dominio del Módulo 6 — Ejecución y Defectos", en: "Module 6 Mastery — Execution and Defects" },
    description: { es: "Ejecución, reporte de defectos, ciclo de vida, severidad/prioridad y métricas. 6 preguntas, 65% para aprobar.", en: "Execution, defect reporting, lifecycle, severity/priority and metrics. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m6"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m6"],
  },
  {
    id: "exam-qaf-m7",
    title: { es: "Dominio del Módulo 7 — Metodologías Ágiles", en: "Module 7 Mastery — Agile Methodologies" },
    description: { es: "Manifiesto Ágil, Scrum, Kanban y el rol del QA ágil. 6 preguntas, 65% para aprobar.", en: "Agile Manifesto, Scrum, Kanban and the agile QA role. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m7"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m7"],
  },
  {
    id: "exam-qaf-m8",
    title: { es: "Dominio del Módulo 8 — Herramientas de QA", en: "Module 8 Mastery — QA Tools" },
    description: { es: "Jira, Confluence y Azure Test Plans. 6 preguntas, 65% para aprobar.", en: "Jira, Confluence and Azure Test Plans. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m8"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m8"],
  },
  {
    id: "exam-qaf-m9",
    title: { es: "Dominio del Módulo 9 — Testing Web y Mobile", en: "Module 9 Mastery — Web and Mobile Testing" },
    description: { es: "DevTools, responsive, testing mobile y accesibilidad. 6 preguntas, 65% para aprobar.", en: "DevTools, responsive, mobile testing and accessibility. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m9"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m9"],
  },
  {
    id: "exam-qaf-m10",
    title: { es: "Dominio del Módulo 10 — IA aplicada al QA", en: "Module 10 Mastery — AI Applied to QA" },
    description: { es: "Fundamentos de IA para QA, generación con IA, riesgos y buenas prácticas. 6 preguntas, 65% para aprobar.", en: "AI fundamentals for QA, AI generation, risks and best practices. 6 questions, 65% to pass." },
    type: "module", moduleIds: ["qaf-m10"], questionCount: 6, timeLimit: 10 * 60, passingScore: 65, requiresModuleCompletion: ["qaf-m10"],
  },
  {
    id: "exam-qaf-final",
    title: { es: "Simulacro Final — QA Fundamentals", en: "Final Mock Exam — QA Fundamentals" },
    description: { es: "Evaluación integral del campus QA Fundamentals: 40 preguntas cubriendo los 10 módulos. 60 minutos, 65% para aprobar.", en: "Comprehensive QA Fundamentals campus assessment: 40 questions covering all 10 modules. 60 minutes, 65% to pass." },
    type: "final",
    moduleIds: ["qaf-m1", "qaf-m2", "qaf-m3", "qaf-m4", "qaf-m5", "qaf-m6", "qaf-m7", "qaf-m8", "qaf-m9", "qaf-m10"],
    questionCount: 40,
    timeLimit: 60 * 60,
    passingScore: 65,
    requiresModuleCompletion: [],
  },
];

export const EXAMS_BY_ID: Record<string, Exam> = {};
for (const exam of EXAMS) {
  EXAMS_BY_ID[exam.id] = exam;
}

/**
 * Get all exams that belong to a given campus, i.e. every exam whose
 * moduleIds are a subset of the campus's moduleIds.
 */
export function getExamsForCampus(campusId: string): Exam[] {
  const campusModuleIds = new Set(getModulesForCampus(campusId));
  return EXAMS.filter((exam) =>
    exam.moduleIds.every((moduleId) => campusModuleIds.has(moduleId)),
  );
}

/**
 * Number of questions currently available in the registered bank for an exam,
 * across all of its modules.
 */
export function getAvailableQuestionCount(exam: Exam): number {
  return getQuestionsForModules(exam.moduleIds).length;
}

/**
 * Whether an exam has enough questions in the bank to be delivered as designed
 * (i.e. it can serve its full `questionCount`). Exams whose question banks do
 * not exist yet (e.g. modules m2–m8) are not ready and should be surfaced as
 * "coming soon" rather than being startable — starting one would otherwise
 * serve fewer questions than promised, or spin forever on an empty pool.
 */
export function isExamReady(exam: Exam): boolean {
  return getAvailableQuestionCount(exam) >= exam.questionCount;
}
