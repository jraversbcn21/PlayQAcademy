/**
 * Exam definitions — 4 exams for PlayQ Academy.
 */

import type { Exam } from "@/types/exam";

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
];

export const EXAMS_BY_ID: Record<string, Exam> = {};
for (const exam of EXAMS) {
  EXAMS_BY_ID[exam.id] = exam;
}
