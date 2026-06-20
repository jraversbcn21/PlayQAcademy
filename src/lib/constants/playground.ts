/**
 * PlayQ Academy — Playground exercise registry.
 *
 * The hands-on Playground exercises, grouped by the campus they belong to.
 * This is the single source of truth for which exercises exist and which
 * campus owns them. Like exams, the exercise→campus association is data-driven:
 * adding a future campus's exercises is an append here, not a refactor.
 *
 * `automation` exercises are live Playwright locator/coding sandboxes.
 * `qaFundamentals` exercises are self-contained manual-testing drills
 * (classification, matching, form-based) — no code, no Firestore writes,
 * scored entirely client-side.
 */

import type { Bilingual } from "@/types/lesson";

export type ExerciseDifficulty = "beginner" | "intermediate" | "advanced";

export interface PlaygroundExercise {
  /** Route relative to the locale segment, e.g. "/playground/login". */
  href: string;
  /** Emoji shown on the card. */
  icon: string;
  title: Bilingual;
  description: Bilingual;
  /** Curriculum module tags, e.g. "M3: Locators". */
  modules: string[];
  difficulty: ExerciseDifficulty;
  /** Owning campus id (matches a Campus.id in campuses.ts). */
  campusId: string;
}

export const PLAYGROUND_EXERCISES: PlaygroundExercise[] = [
  {
    href: "/playground/login",
    icon: "🔑",
    title: { es: "Formulario de Login", en: "Login Form" },
    description: {
      es: "Practica localizadores por rol y label, acciones fill/click y aserciones de URL y visibilidad.",
      en: "Practice role and label locators, fill/click actions, and URL/visibility assertions.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "beginner",
    campusId: "automation",
  },
  {
    href: "/playground/signup",
    icon: "📝",
    title: { es: "Asistente de Registro", en: "Sign Up Wizard" },
    description: {
      es: "Formulario multi-paso con validación por etapa, selectores anidados y navegación condicional.",
      en: "Multi-step form with per-stage validation, nested selectors, and conditional navigation.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/catalog",
    icon: "🛍️",
    title: { es: "Catálogo E-commerce", en: "E-commerce Catalog" },
    description: {
      es: "Filtros combinados, ordenamiento, paginación y localizadores complejos en un grid de productos.",
      en: "Combined filters, sorting, pagination, and complex locators in a product grid.",
    },
    modules: ["M3: Locators", "M5: POM"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/cart",
    icon: "🛒",
    title: { es: "Carrito de Compras", en: "Shopping Cart" },
    description: {
      es: "Manejo de estado, aserciones de totales, códigos de descuento y estados vacíos.",
      en: "State management, total assertions, discount codes, and empty states.",
    },
    modules: ["M4: Actions", "M4: Assertions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/table",
    icon: "📊",
    title: { es: "Tabla de Datos", en: "Data Table" },
    description: {
      es: "Tabla con ordenamiento, filtros, paginación, selección de filas y edición inline.",
      en: "Table with sorting, filtering, pagination, row selection, and inline editing.",
    },
    modules: ["M3: Locators", "M4: Actions"],
    difficulty: "advanced",
    campusId: "automation",
  },
  {
    href: "/playground/dynamic",
    icon: "⏳",
    title: { es: "Contenido Dinámico", en: "Dynamic Content" },
    description: {
      es: "Practica el auto-waiting con spinners, progress bars, delays aleatorios y toasts.",
      en: "Practice auto-waiting with spinners, progress bars, random delays, and toasts.",
    },
    modules: ["M4: Auto-waiting"],
    difficulty: "beginner",
    campusId: "automation",
  },
  {
    href: "/playground/files",
    icon: "📁",
    title: { es: "Subida y Descarga de Archivos", en: "File Upload & Download" },
    description: {
      es: "Ejercicios de file input, drag-and-drop, validación de tipos y descargas.",
      en: "File input exercises, drag-and-drop, type validation, and downloads.",
    },
    modules: ["M4: Special Actions"],
    difficulty: "intermediate",
    campusId: "automation",
  },
  {
    href: "/playground/frames",
    icon: "🖼️",
    title: { es: "iFrames y Popups", en: "iFrames & Popups" },
    description: {
      es: "Navegación entre frames, ventanas emergentes y modales con formularios anidados.",
      en: "Frame switching, popup windows, and modals with nested forms.",
    },
    modules: ["M4: Frames & Windows"],
    difficulty: "advanced",
    campusId: "automation",
  },
  {
    href: "/playground/api",
    icon: "🌐",
    title: { es: "API Playground", en: "API Playground" },
    description: {
      es: "Endpoints REST reales para practicar API testing con Playwright. GET, POST, PUT, DELETE.",
      en: "Real REST endpoints to practice API testing with Playwright. GET, POST, PUT, DELETE.",
    },
    modules: ["M7: API Testing"],
    difficulty: "advanced",
    campusId: "automation",
  },
  {
    href: "/playground/partitioning",
    icon: "🎯",
    title: { es: "Partición de Equivalencia y Valores Límite", en: "Equivalence Partitioning & BVA" },
    description: {
      es: "Clasifica valores de prueba como válidos, inválidos o límite para distintos campos de entrada.",
      en: "Classify test values as valid, invalid, or boundary for different input fields.",
    },
    modules: ["M5: Diseño de Casos"],
    difficulty: "beginner",
    campusId: "qaFundamentals",
  },
  {
    href: "/playground/bug-report",
    icon: "🐛",
    title: { es: "Redacción de Reporte de Bug", en: "Writing a Bug Report" },
    description: {
      es: "Redacta pasos, resultado esperado/actual y clasifica severidad y prioridad para escenarios reales.",
      en: "Write steps, expected/actual results, and classify severity and priority for real-world scenarios.",
    },
    modules: ["M6: Ejecución y Defectos"],
    difficulty: "beginner",
    campusId: "qaFundamentals",
  },
  {
    href: "/playground/triage",
    icon: "🚦",
    title: { es: "Triage de Defectos", en: "Defect Triage" },
    description: {
      es: "Asigna severidad y prioridad a 6 defectos reales y compáralos con el criterio esperado.",
      en: "Assign severity and priority to 6 real defects and compare against the expected call.",
    },
    modules: ["M6: Ejecución y Defectos"],
    difficulty: "intermediate",
    campusId: "qaFundamentals",
  },
  {
    href: "/playground/req-match",
    icon: "🔗",
    title: { es: "Requisitos ↔ Casos de Prueba", en: "Requirements ↔ Test Cases" },
    description: {
      es: "Empareja cada requisito con el caso de prueba que realmente lo verifica.",
      en: "Match each requirement to the test case that actually verifies it.",
    },
    modules: ["M4: Análisis de Requisitos"],
    difficulty: "intermediate",
    campusId: "qaFundamentals",
  },
];

/** Exercises belonging to a given campus, in registry order. */
export function getExercisesForCampus(campusId: string): PlaygroundExercise[] {
  return PLAYGROUND_EXERCISES.filter((e) => e.campusId === campusId);
}
