/**
 * QA Fundamentals — Module: Introducción al Testing de Software
 *
 * Placeholder content for Campus 1 (QA Fundamentals).
 * Contains 2 lessons with basic introductory content.
 */

import type { LessonContent } from "@/types/lesson";

export const QA_INTRO_LESSONS: LessonContent[] = [
  {
    id: "qa-intro-l1",
    moduleId: "qa-intro",
    sections: [
      {
        type: "paragraph",
        content: {
          es: "El testing de software es el proceso de evaluar un sistema o componente para identificar diferencias entre los resultados obtenidos y los esperados. Su objetivo principal es detectar defectos antes de que el software llegue al usuario final.",
          en: "Software testing is the process of evaluating a system or component to identify differences between obtained and expected results. Its main goal is to detect defects before the software reaches the end user.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: { es: "Principios del Testing", en: "Testing Principles" },
      },
      {
        type: "paragraph",
        content: {
          es: "El testing se basa en siete principios fundamentales: el testing muestra la presencia de defectos, no su ausencia; el testing exhaustivo es imposible; el testing temprano ahorra tiempo y dinero; los defectos se concentran en pocos módulos; el testing depende del contexto; un sistema libre de errores es una falacia; y el testing debe ser adaptativo.",
          en: "Testing is based on seven fundamental principles: testing shows the presence of defects, not their absence; exhaustive testing is impossible; early testing saves time and money; defects cluster in few modules; testing is context dependent; a defect-free system is a fallacy; and testing must be adaptive.",
        },
      },
      {
        type: "callout",
        variant: "tip",
        content: {
          es: "💡 El testing no solo encuentra errores, también valida que el software cumple con los requisitos del negocio y las expectativas del usuario.",
          en: "💡 Testing doesn't just find errors—it also validates that the software meets business requirements and user expectations.",
        },
      },
    ],
  },
  {
    id: "qa-intro-l2",
    moduleId: "qa-intro",
    sections: [
      {
        type: "paragraph",
        content: {
          es: "El QA (Quality Assurance) es responsable de asegurar la calidad del producto mediante la planificación, diseño y ejecución de pruebas. Trabaja en colaboración con desarrolladores, product owners y otros stakeholders para garantizar que el software cumpla con los estándares de calidad.",
          en: "QA (Quality Assurance) is responsible for ensuring product quality through test planning, design, and execution. They work in collaboration with developers, product owners, and other stakeholders to ensure the software meets quality standards.",
        },
      },
      {
        type: "heading",
        level: 2,
        content: { es: "Responsabilidades del QA", en: "QA Responsibilities" },
      },
      {
        type: "list",
        ordered: false,
        items: [
          { es: "Analizar requisitos y definir criterios de aceptación", en: "Analyze requirements and define acceptance criteria" },
          { es: "Diseñar casos de prueba y escenarios de testing", en: "Design test cases and testing scenarios" },
          { es: "Ejecutar pruebas manuales y automatizadas", en: "Execute manual and automated tests" },
          { es: "Reportar y hacer seguimiento de defectos", en: "Report and track defects" },
          { es: "Participar en revisiones de código y diseño", en: "Participate in code and design reviews" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        content: {
          es: "ℹ️ En metodologías ágiles, el QA está integrado en el equipo desde el inicio del sprint, no solo al final.",
          en: "ℹ️ In agile methodologies, QA is integrated into the team from the start of the sprint, not just at the end.",
        },
      },
    ],
  },
];
