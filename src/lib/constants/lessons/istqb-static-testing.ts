/**
 * Static Testing — ISTQB CTFL v4.0, Chapter 3
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-static-testing";

const L_3_1: LessonContent = {
  id: "istqb-l3-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué es el Testing Estático?",
      "en": "What is Static Testing?"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing estático evalúa artefactos de software sin ejecutar el software. Puede aplicarse a:",
      "en": "Static testing evaluates software artifacts without executing the software. It can be applied to:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Especificaciones de requisitos",
        "en": "Requirements specifications"
      },
      {
        "es": "Historias de usuario y criterios de aceptación",
        "en": "User stories and acceptance criteria"
      },
      {
        "es": "Diseño del sistema y arquitectura",
        "en": "System design and architecture"
      },
      {
        "es": "Código fuente",
        "en": "Source code"
      },
      {
        "es": "Documentación técnica y de pruebas",
        "en": "Technical and test documentation"
      },
      {
        "es": "Contratos y planes de proyecto",
        "en": "Contracts and project plans"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Análisis Estático",
      "en": "Static Analysis"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El análisis estático es el proceso automatizado de examinar el código fuente sin ejecutarlo. Las herramientas de análisis estático detectan:",
      "en": "Static analysis is the automated process of examining source code without executing it. Static analysis tools detect:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Violaciones de estándares de codificación",
        "en": "Coding standard violations"
      },
      {
        "es": "Variables no inicializadas o no usadas",
        "en": "Uninitialized or unused variables"
      },
      {
        "es": "Dead code (código muerto nunca ejecutado)",
        "en": "Dead code (never executed code)"
      },
      {
        "es": "Vulnerabilidades de seguridad (SQL injection, XSS, etc.)",
        "en": "Security vulnerabilities (SQL injection, XSS, etc.)"
      },
      {
        "es": "Complejidad ciclomática alta",
        "en": "High cyclomatic complexity"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Herramientas comunes: SonarQube, ESLint, FindBugs, PMD, Checkstyle.",
      "en": "📌 Common tools: SonarQube, ESLint, FindBugs, PMD, Checkstyle."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Beneficios del Testing Estático",
      "en": "Benefits of Static Testing"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Detecta defectos antes de la ejecución (más barato corregir)",
        "en": "Detects defects before execution (cheaper to fix)"
      },
      {
        "es": "Encuentra defectos que el testing dinámico no puede detectar fácilmente",
        "en": "Finds defects that dynamic testing cannot easily detect"
      },
      {
        "es": "Mejora la calidad del código y la documentación",
        "en": "Improves code and documentation quality"
      },
      {
        "es": "Facilita la comunicación entre el equipo",
        "en": "Facilitates communication within the team"
      },
      {
        "es": "Reduce el tiempo de testing dinámico posterior",
        "en": "Reduces subsequent dynamic testing time"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Defectos típicos encontrados en testing estático:\n  \n• Requisitos ambiguos o contradictorios\n  \n• Errores de diseño o interfaces\n  \n• Código no seguro o difícil de mantener\n  \n• Desviaciones de los estándares de codificación",
      "en": "💡 Typical defects found in static testing:\n  \n• Ambiguous or contradictory requirements\n  \n• Design or interface errors\n  \n• Insecure or hard-to-maintain code\n  \n• Deviations from coding standards"
    }
  }
],
};

const L_3_2: LessonContent = {
  id: "istqb-l3-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Tipos de Revisión",
      "en": "Review Types"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Tipo",
        "en": "Type"
      },
      {
        "es": "Formalidad",
        "en": "Formality"
      },
      {
        "es": "Guiado por",
        "en": "Led by"
      },
      {
        "es": "Objetivo",
        "en": "Objective"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Informal",
            "en": "Informal"
          },
          {
            "es": "Muy baja",
            "en": "Very low"
          },
          {
            "es": "Cualquiera",
            "en": "Anyone"
          },
          {
            "es": "Encontrar defectos rápidamente",
            "en": "Find defects quickly"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Walkthrough",
            "en": "Walkthrough"
          },
          {
            "es": "Baja-Media",
            "en": "Low-Medium"
          },
          {
            "es": "Autor",
            "en": "Author"
          },
          {
            "es": "Aprendizaje del equipo",
            "en": "Team learning"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Revisión técnica",
            "en": "Technical review"
          },
          {
            "es": "Media",
            "en": "Medium"
          },
          {
            "es": "Moderador",
            "en": "Moderator"
          },
          {
            "es": "Consenso técnico",
            "en": "Technical consensus"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Inspección",
            "en": "Inspection"
          },
          {
            "es": "Alta",
            "en": "High"
          },
          {
            "es": "Moderador certificado",
            "en": "Certified moderator"
          },
          {
            "es": "Máxima detección de defectos",
            "en": "Maximum defect detection"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Roles en una Revisión Formal",
      "en": "Roles in a Formal Review"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Autor: Creó el producto de trabajo que se revisa",
        "en": "Author: Created the work product being reviewed"
      },
      {
        "es": "Moderador (Manager): Facilita el proceso, asegura la eficacia",
        "en": "Moderator (Manager): Facilitates the process, ensures effectiveness"
      },
      {
        "es": "Escritor/Escriba: Documenta los defectos encontrados",
        "en": "Scribe: Documents the defects found"
      },
      {
        "es": "Revisores (Inspectores): Analizan el producto de trabajo",
        "en": "Reviewers (Inspectors): Analyze the work product"
      },
      {
        "es": "Líder de revisión: Planifica y organiza la revisión",
        "en": "Review leader: Plans and organizes the review"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Proceso de Revisión",
      "en": "Review Process"
    }
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      {
        "es": "Planificación: Definir alcance, criterios de entrada/salida, asignar roles",
        "en": "Planning: Define scope, entry/exit criteria, assign roles"
      },
      {
        "es": "Inicio: Distribuir materiales, verificar criterios de entrada",
        "en": "Kick-off: Distribute materials, verify entry criteria"
      },
      {
        "es": "Revisión individual: Cada revisor examina el producto de trabajo",
        "en": "Individual review: Each reviewer examines the work product"
      },
      {
        "es": "Comunicación y análisis: Reunión para discutir los hallazgos",
        "en": "Communication and analysis: Meeting to discuss findings"
      },
      {
        "es": "Corrección y reporte: El autor corrige; se genera el informe",
        "en": "Correction and reporting: Author corrects; report is generated"
      },
      {
        "es": "Seguimiento: Verificar que los defectos fueron corregidos",
        "en": "Follow-up: Verify that defects were corrected"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Para el examen: La INSPECCIÓN es la revisión más formal. El WALKTHROUGH es guiado por el autor. La revisión INFORMAL no tiene proceso definido.",
      "en": "💡 For the exam: INSPECTION is the most formal review. WALKTHROUGH is author-led. INFORMAL review has no defined process."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-13",
    "front": {
      "es": "¿Qué es el testing estático y cómo difiere del dinámico?",
      "en": "What is static testing and how does it differ from dynamic?"
    },
    "back": {
      "es": "Estático: evalúa artefactos SIN ejecutar el software (revisiones de código, análisis estático). Dinámico: ejecuta el software para verificar su comportamiento.",
      "en": "Static: evaluates artifacts WITHOUT executing software (code reviews, static analysis). Dynamic: executes software to verify its behavior."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-14",
    "front": {
      "es": "¿Cuáles son los tipos de revisión formales en el testing estático?",
      "en": "What are the types of formal reviews in static testing?"
    },
    "back": {
      "es": "1. Revisión informal, 2. Walkthrough (guiado por el autor), 3. Revisión técnica (equipo de pares), 4. Inspección (más formal, con roles definidos y métricas).",
      "en": "1. Informal review, 2. Walkthrough (author-led), 3. Technical review (peer team), 4. Inspection (most formal, with defined roles and metrics)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-15",
    "front": {
      "es": "¿Qué tipos de defectos detecta mejor el testing estático?",
      "en": "What types of defects does static testing best detect?"
    },
    "back": {
      "es": "Ambigüedades en requisitos, violaciones de estándares de codificación, defectos de diseño, interfaces incorrectas, vulnerabilidades de seguridad, y brechas en la cobertura de pruebas.",
      "en": "Requirement ambiguities, coding standard violations, design defects, incorrect interfaces, security vulnerabilities, and test coverage gaps."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_3_1, L_3_2];
}
