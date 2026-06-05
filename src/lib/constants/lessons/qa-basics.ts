/**
 * QA Fundamentals — Module: Conceptos Básicos de QA
 *
 * Placeholder content for Campus 1 (QA Fundamentals).
 * Contains 2 lessons covering test types and testing levels.
 */

import type { LessonContent } from "@/types/lesson";

export const QA_BASICS_LESSONS: LessonContent[] = [
  {
    id: "qa-basics-l1",
    moduleId: "qa-basics",
    sections: [
      {
        type: "paragraph",
        content: {
          es: "Las pruebas funcionales verifican qué hace el sistema (sus funciones), mientras que las pruebas no funcionales verifican cómo lo hace (rendimiento, usabilidad, seguridad, etc.). Ambas son esenciales para garantizar la calidad del software.",
          en: "Functional tests verify what the system does (its functions), while non-functional tests verify how it does it (performance, usability, security, etc.). Both are essential to ensure software quality.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: { es: "Pruebas Funcionales", en: "Functional Tests" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          { es: "Pruebas de unidad: verifican funciones individuales", en: "Unit tests: verify individual functions" },
          { es: "Pruebas de integración: verifican la interacción entre componentes", en: "Integration tests: verify component interactions" },
          { es: "Pruebas de sistema: verifican el sistema completo", en: "System tests: verify the complete system" },
          { es: "Pruebas de aceptación: verifican que cumple los requisitos del usuario", en: "Acceptance tests: verify it meets user requirements" },
        ],
      },
      {
        type: "heading",
        level: 2,
        content: { es: "Pruebas No Funcionales", en: "Non-Functional Tests" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          { es: "Pruebas de rendimiento: miden velocidad y escalabilidad", en: "Performance tests: measure speed and scalability" },
          { es: "Pruebas de usabilidad: evalúan la facilidad de uso", en: "Usability tests: evaluate ease of use" },
          { es: "Pruebas de seguridad: detectan vulnerabilidades", en: "Security tests: detect vulnerabilities" },
          { es: "Pruebas de compatibilidad: verifican funcionamiento en diferentes entornos", en: "Compatibility tests: verify operation in different environments" },
        ],
      },
    ],
  },
  {
    id: "qa-basics-l2",
    moduleId: "qa-basics",
    sections: [
      {
        type: "paragraph",
        content: {
          es: "El testing se organiza en cuatro niveles principales, cada uno con un enfoque y objetivo específico. Estos niveles siguen el modelo V de desarrollo y testing, donde cada nivel de testing corresponde a una fase del desarrollo.",
          en: "Testing is organized into four main levels, each with a specific focus and objective. These levels follow the V model of development and testing, where each testing level corresponds to a development phase.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: { es: "Pirámide de Testing", en: "Testing Pyramid" },
      },
      {
        type: "table",
        headers: [
          { es: "Nivel", en: "Level" },
          { es: "Enfoque", en: "Focus" },
          { es: "Responsable", en: "Responsible" },
        ],
        rows: [
          {
            cells: [
              { es: "Unitario", en: "Unit" },
              { es: "Funciones y métodos individuales", en: "Individual functions and methods" },
              { es: "Desarrolladores", en: "Developers" },
            ],
          },
          {
            cells: [
              { es: "Integración", en: "Integration" },
              { es: "Interacción entre componentes", en: "Component interactions" },
              { es: "Desarrolladores / QA", en: "Developers / QA" },
            ],
          },
          {
            cells: [
              { es: "Sistema", en: "System" },
              { es: "Sistema completo funcional", en: "Complete functional system" },
              { es: "QA", en: "QA" },
            ],
          },
          {
            cells: [
              { es: "Aceptación", en: "Acceptance" },
              { es: "Requisitos del negocio", en: "Business requirements" },
              { es: "Usuario / Product Owner", en: "User / Product Owner" },
            ],
          },
        ],
        caption: {
          es: "Los cuatro niveles de testing y sus responsabilidades típicas",
          en: "The four testing levels and their typical responsibilities",
        },
      },
      {
        type: "callout",
        variant: "warning",
        content: {
          es: "⚠️ No omitas ningún nivel de testing. Cada uno detecta diferentes tipos de defectos y contribuye a la calidad general del producto.",
          en: "⚠️ Don't skip any testing level. Each one detects different types of defects and contributes to overall product quality.",
        },
      },
    ],
  },
];
