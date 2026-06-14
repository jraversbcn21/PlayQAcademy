/**
 * PlayQAcademy — 20 Badge Definitions.
 *
 * Each badge has a unique id, bilingual name/description, emoji icon,
 * rarity, points reward, and typed criteria used by badgeChecker.ts.
 */

import type { Badge } from "@/types/gamification";

export const BADGES: Badge[] = [
  /* ================================================================== */
  /*  FIRST STEPS (Common — 6 badges)                                   */
  /* ================================================================== */

  {
    id: "first_login",
    name: {
      es: "Primer Paso",
      en: "First Step",
    },
    description: {
      es: "Bienvenido a PlayQAcademy. Tu viaje hacia la automatización comienza.",
      en: "Welcome to PlayQAcademy. Your automation journey begins.",
    },
    icon: "👋",
    rarity: "common",
    points: 5,
    criteria: { type: "first_login" },
  },
  {
    id: "first_lesson",
    name: {
      es: "Primera Lección",
      en: "First Lesson",
    },
    description: {
      es: "Completaste tu primera lección. ¡El aprendizaje comienza!",
      en: "You completed your first lesson. Learning begins!",
    },
    icon: "📖",
    rarity: "common",
    points: 10,
    criteria: { type: "lessons_completed", count: 1 },
  },
  {
    id: "first_quiz_correct",
    name: {
      es: "Mente Afilada",
      en: "Sharp Mind",
    },
    description: {
      es: "Respondiste un quiz correctamente en tu primer intento.",
      en: "You answered a quiz correctly on your first try.",
    },
    icon: "🧠",
    rarity: "common",
    points: 10,
    criteria: { type: "perfect_quizzes", count: 1 },
  },
  {
    id: "first_exercise",
    name: {
      es: "Manos a la Obra",
      en: "Hands On",
    },
    description: {
      es: "Completaste tu primer ejercicio práctico de código.",
      en: "You completed your first practical coding exercise.",
    },
    icon: "⌨️",
    rarity: "common",
    points: 15,
    criteria: { type: "exercise_completed", count: 1 },
  },
  {
    id: "5_lessons",
    name: {
      es: "Constancia",
      en: "Consistency",
    },
    description: {
      es: "Completaste 5 lecciones. ¡Vas por buen camino!",
      en: "You completed 5 lessons. You're on the right track!",
    },
    icon: "📚",
    rarity: "common",
    points: 25,
    criteria: { type: "lessons_completed", count: 5 },
  },
  {
    id: "10_lessons",
    name: {
      es: "Dedicación",
      en: "Dedication",
    },
    description: {
      es: "Completaste 10 lecciones. Tu compromiso es admirable.",
      en: "You completed 10 lessons. Your commitment is admirable.",
    },
    icon: "📘",
    rarity: "common",
    points: 50,
    criteria: { type: "lessons_completed", count: 10 },
  },

  /* ================================================================== */
  /*  MILESTONES (Rare — 6 badges)                                      */
  /* ================================================================== */

  {
    id: "25_lessons",
    name: {
      es: "Maestro del Cuarto",
      en: "Quarter Master",
    },
    description: {
      es: "Completaste 25 lecciones. Has recorrido un cuarto del camino.",
      en: "You completed 25 lessons. A quarter of the way there.",
    },
    icon: "🏆",
    rarity: "rare",
    points: 100,
    criteria: { type: "lessons_completed", count: 25 },
  },
  {
    id: "module_1_complete",
    name: {
      es: "Fundador TypeScript",
      en: "TypeScript Founder",
    },
    description: {
      es: "Completaste el módulo Fundamentos de TypeScript para QA.",
      en: "You completed the TypeScript Foundations for QA module.",
    },
    icon: "🔷",
    rarity: "rare",
    points: 75,
    criteria: { type: "module_completed", moduleId: "m1-typescript-foundations" },
  },
  {
    id: "module_2_complete",
    name: {
      es: "Aprendiz Playwright",
      en: "Playwright Apprentice",
    },
    description: {
      es: "Completaste el módulo Fundamentos de Playwright.",
      en: "You completed the Playwright Fundamentals module.",
    },
    icon: "🎭",
    rarity: "rare",
    points: 75,
    criteria: { type: "module_completed", moduleId: "m2-playwright-fundamentals" },
  },
  {
    id: "module_3_complete",
    name: {
      es: "Mago de Localizadores",
      en: "Locator Wizard",
    },
    description: {
      es: "Completaste el módulo Localizadores y Selectores.",
      en: "You completed the Locators and Selectors module.",
    },
    icon: "🔍",
    rarity: "rare",
    points: 75,
    criteria: { type: "module_completed", moduleId: "m3-locators-selectors" },
  },
  {
    id: "streak_3",
    name: {
      es: "Tres Días Seguidos",
      en: "Three Days Strong",
    },
    description: {
      es: "Mantuviste una racha de 3 días consecutivos de estudio.",
      en: "You kept a 3-day consecutive learning streak.",
    },
    icon: "🔥",
    rarity: "rare",
    points: 20,
    criteria: { type: "streak_days", days: 3 },
  },
  {
    id: "streak_7",
    name: {
      es: "Guerrero Semanal",
      en: "Week Warrior",
    },
    description: {
      es: "Mantuviste una racha de 7 días consecutivos. ¡Una semana entera!",
      en: "You kept a 7-day streak. A full week!",
    },
    icon: "📅",
    rarity: "rare",
    points: 50,
    criteria: { type: "streak_days", days: 7 },
  },

  /* ================================================================== */
  /*  PERFECT PERFORMANCE (Epic — 5 badges)                             */
  /* ================================================================== */

  {
    id: "perfect_5",
    name: {
      es: "Sin Errores",
      en: "Flawless",
    },
    description: {
      es: "Respondiste 5 quizzes perfectamente en el primer intento.",
      en: "You answered 5 quizzes perfectly on the first try.",
    },
    icon: "💎",
    rarity: "epic",
    points: 100,
    criteria: { type: "perfect_quizzes", count: 5 },
  },
  {
    id: "perfect_module",
    name: {
      es: "Perfeccionista de Módulo",
      en: "Module Perfectionist",
    },
    description: {
      es: "Respondiste todos los quizzes de un módulo correctamente en el primer intento.",
      en: "You answered all quizzes in a module correctly on the first try.",
    },
    icon: "⭐",
    rarity: "epic",
    points: 150,
    criteria: { type: "perfect_quizzes", count: 5 },
  },
  {
    id: "speed_learner",
    name: {
      es: "Aprendiz Veloz",
      en: "Speed Learner",
    },
    description: {
      es: "Completaste el módulo de Fundamentos TypeScript en menos de 90 minutos.",
      en: "You completed the TypeScript Foundations module in under 90 minutes.",
    },
    icon: "⚡",
    rarity: "epic",
    points: 100,
    criteria: {
      type: "speed_learner",
      minutesUnder: 90,
      moduleId: "m1-typescript-foundations",
    },
  },
  {
    id: "streak_30",
    name: {
      es: "Maestro del Mes",
      en: "Month Master",
    },
    description: {
      es: "Mantuviste una racha de 30 días consecutivos. ¡Increíble disciplina!",
      en: "You kept a 30-day streak. Incredible discipline!",
    },
    icon: "🌋",
    rarity: "epic",
    points: 200,
    criteria: { type: "streak_days", days: 30 },
  },
  {
    id: "automation_master",
    name: {
      es: "Maestro de Automatización",
      en: "Automation Master",
    },
    description: {
      es: "Completaste todos los ejercicios prácticos del curso.",
      en: "You completed all practical exercises in the course.",
    },
    icon: "🤖",
    rarity: "epic",
    points: 300,
    criteria: { type: "exercise_completed", count: 8 },
  },

  /* ================================================================== */
  /*  ULTIMATE (Legendary — 3 badges)                                   */
  /* ================================================================== */

  {
    id: "all_modules_complete",
    name: {
      es: "Graduado PlayQAcademy",
      en: "PlayQAcademy Graduate",
    },
    description: {
      es: "Completaste los 8 módulos del curso. ¡Eres un QA Automatizado!",
      en: "You completed all 8 course modules. You're an Automated QA!",
    },
    icon: "🎓",
    rarity: "legendary",
    points: 500,
    criteria: { type: "all_modules_completed" },
  },
  {
    id: "perfectionist",
    name: {
      es: "Perfeccionista Supremo",
      en: "Ultimate Perfectionist",
    },
    description: {
      es: "Respondiste TODOS los quizzes del curso correctamente en el primer intento.",
      en: "You answered ALL course quizzes correctly on the first try.",
    },
    icon: "👑",
    rarity: "legendary",
    points: 750,
    criteria: { type: "perfect_quizzes", count: 44 },
  },
  {
    id: "all_badges",
    name: {
      es: "Coleccionista de Insignias",
      en: "Badge Collector",
    },
    description: {
      es: "Ganaste todas las insignias disponibles. ¡Eres una leyenda de PlayQ!",
      en: "You earned every available badge. You're a PlayQ legend!",
    },
    icon: "🌟",
    rarity: "legendary",
    points: 1000,
    criteria: { type: "lessons_completed", count: 44 },
  },
  {
    id: "playq_certified",
    name: {
      es: "PlayQ Certificado",
      en: "PlayQ Certified",
    },
    description: {
      es: "Aprobaste el Examen de Certificación Final con 80% o más. Eres oficialmente un QA Automatizado certificado por PlayQAcademy.",
      en: "You passed the Final Certification Exam with 80%+. You are officially a PlayQAcademy Certified Automated QA.",
    },
    icon: "📜",
    rarity: "legendary",
    points: 1500,
    criteria: { type: "all_modules_completed" },
  },
  {
    id: "module_1_exam_passed",
    name: {
      es: "Maestría del Módulo 1",
      en: "Module 1 Mastery",
    },
    description: {
      es: "Aprobaste el examen del Módulo 1 — Fundamentos de TypeScript.",
      en: "You passed the Module 1 exam — TypeScript Foundations.",
    },
    icon: "🥇",
    rarity: "rare",
    points: 150,
    criteria: { type: "exam_passed", examId: "exam-module-1" },
  },
  {
    id: "istqb_ctfl_passed",
    name: {
      es: "Certificación ISTQB CTFL",
      en: "ISTQB CTFL Certified",
    },
    description: {
      es: "Aprobaste el simulacro ISTQB CTFL v4.0. ¡Estás listo para la certificación oficial!",
      en: "You passed the ISTQB CTFL v4.0 mock exam. You're ready for the official certification!",
    },
    icon: "🎓",
    rarity: "epic",
    points: 400,
    criteria: { type: "exam_passed", examId: "exam-istqb-ctfl" },
  },
  {
    id: "qaf_m1_complete",
    name: {
      es: "Iniciado en QA",
      en: "QA Initiate",
    },
    description: {
      es: "Completaste el módulo Introducción al QA y al Testing de Software.",
      en: "You completed the Introduction to QA and Software Testing module.",
    },
    icon: "🧭",
    rarity: "rare",
    points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m1" },
  },
  {
    id: "qaf_m2_complete",
    name: {
      es: "Conocedor de Calidad",
      en: "Quality Connoisseur",
    },
    description: {
      es: "Completaste el módulo Fundamentos de Calidad de Software.",
      en: "You completed the Software Quality Fundamentals module.",
    },
    icon: "💎",
    rarity: "rare",
    points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m2" },
  },
  {
    id: "qaf_m3_complete",
    name: { es: "Navegante del Ciclo de Vida", en: "Lifecycle Navigator" },
    description: { es: "Completaste el módulo Ciclos de Vida SDLC y STLC.", en: "You completed the SDLC and STLC Lifecycles module." },
    icon: "🔄", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m3" },
  },
  {
    id: "qaf_m4_complete",
    name: { es: "Analista de Requisitos", en: "Requirements Analyst" },
    description: { es: "Completaste el módulo Análisis de Requisitos para QA.", en: "You completed the Requirements Analysis for QA module." },
    icon: "📋", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m4" },
  },
  {
    id: "qaf_m5_complete",
    name: { es: "Diseñador de Pruebas", en: "Test Designer" },
    description: { es: "Completaste el módulo Diseño de Casos de Prueba.", en: "You completed the Test Case Design module." },
    icon: "✏️", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m5" },
  },
  {
    id: "qaf_m6_complete",
    name: { es: "Cazador de Defectos", en: "Defect Hunter" },
    description: { es: "Completaste el módulo Ejecución de Pruebas y Gestión de Defectos.", en: "You completed the Test Execution and Defect Management module." },
    icon: "🐛", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m6" },
  },
  {
    id: "qaf_m7_complete",
    name: { es: "QA Ágil", en: "Agile QA" },
    description: { es: "Completaste el módulo Metodologías Ágiles para QA.", en: "You completed the Agile Methodologies for QA module." },
    icon: "🏃", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m7" },
  },
  {
    id: "qaf_m8_complete",
    name: { es: "Maestro de Herramientas", en: "Tooling Master" },
    description: { es: "Completaste el módulo Herramientas para QA Manual.", en: "You completed the Manual QA Tools module." },
    icon: "🧰", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m8" },
  },
  {
    id: "qaf_m9_complete",
    name: { es: "Explorador Web y Mobile", en: "Web and Mobile Explorer" },
    description: { es: "Completaste el módulo Testing Web y Mobile Manual.", en: "You completed the Manual Web and Mobile Testing module." },
    icon: "📱", rarity: "rare", points: 75,
    criteria: { type: "module_completed", moduleId: "qaf-m9" },
  },
  {
    id: "qaf_m10_complete",
    name: { es: "QA Aumentado con IA", en: "AI-Augmented QA" },
    description: { es: "Completaste el módulo Inteligencia Artificial aplicada al QA.", en: "You completed the AI Applied to QA module." },
    icon: "🤖", rarity: "epic", points: 100,
    criteria: { type: "module_completed", moduleId: "qaf-m10" },
  },
  {
    id: "qaf_certified",
    name: { es: "QA Fundamentals Certificado", en: "QA Fundamentals Certified" },
    description: { es: "Aprobaste el Simulacro Final de QA Fundamentals. ¡Estás listo como QA Junior!", en: "You passed the QA Fundamentals Final Mock Exam. You're ready as a Junior QA!" },
    icon: "🎓", rarity: "legendary", points: 500,
    criteria: { type: "exam_passed", examId: "exam-qaf-final" },
  },
];

/**
 * Lookup map for O(1) badge access by id.
 */
export const BADGES_BY_ID: Record<string, Badge> = {};
for (const b of BADGES) {
  BADGES_BY_ID[b.id] = b;
}

/**
 * Badges sorted by rarity priority (common < rare < epic < legendary).
 */
const RARITY_ORDER: Record<string, number> = {
  common: 0,
  rare: 1,
  epic: 2,
  legendary: 3,
};

export const BADGES_SORTED_BY_RARITY = [...BADGES].sort(
  (a, b) => (RARITY_ORDER[a.rarity] ?? 0) - (RARITY_ORDER[b.rarity] ?? 0)
);
