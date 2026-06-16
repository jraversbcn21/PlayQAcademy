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
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 3)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 3)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Glossary", en: "ISTQB Glossary" }, url: "https://glossary.istqb.org/" },
    { title: { es: "SonarQube — Documentación", en: "SonarQube — Documentation" }, url: "https://docs.sonarsource.com/" },
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
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 3)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 3)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Glossary", en: "ISTQB Glossary" }, url: "https://glossary.istqb.org/" },
    { title: { es: "IEEE 1028 — Standard for Software Reviews and Audits", en: "IEEE 1028 — Standard for Software Reviews and Audits" }, url: "https://standards.ieee.org/ieee/1028/3905/" },
  ],
};

const L_3_3: LessonContent = {
  id: "istqb-l3-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Factores de éxito de las revisiones",
      "en": "Review success factors"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Una revisión solo aporta valor si está bien preparada y se ejecuta con la actitud correcta. El syllabus identifica factores organizativos y humanos que determinan su éxito:",
      "en": "A review only adds value if it is well prepared and run with the right attitude. The syllabus identifies organizational and people factors that determine its success:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Definir objetivos claros y medibles para la revisión",
        "en": "Define clear, measurable objectives for the review"
      },
      {
        "es": "Elegir el tipo de revisión adecuado al producto de trabajo, al equipo y al nivel de riesgo",
        "en": "Choose the review type that fits the work product, the team and the risk level"
      },
      {
        "es": "Mantener la revisión en un tamaño manejable (dividir productos grandes en partes)",
        "en": "Keep the review to a manageable size (split large work products into parts)"
      },
      {
        "es": "Dar tiempo suficiente para la preparación individual previa",
        "en": "Allow enough time for prior individual preparation"
      },
      {
        "es": "Crear un ambiente de confianza: se revisa el producto, no a la persona",
        "en": "Create a climate of trust: the product is reviewed, not the person"
      },
      {
        "es": "Reconocer y agradecer la participación; usar los hallazgos para aprender, no para culpar",
        "en": "Acknowledge participation; use findings to learn, not to blame"
      },
      {
        "es": "Formar a los participantes, especialmente para revisiones formales como la inspección",
        "en": "Train participants, especially for formal reviews such as inspection"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 El factor humano es decisivo: si los autores perciben la revisión como un ataque personal, dejarán de aportar productos para revisar. El objetivo es la calidad del producto, no juzgar a quien lo creó.",
      "en": "📌 The people factor is decisive: if authors perceive the review as a personal attack, they will stop submitting work products. The goal is product quality, not judging who created it."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué tipo de revisión elegir?",
      "en": "Which review type to choose?"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Situación",
        "en": "Situation"
      },
      {
        "es": "Tipo recomendado",
        "en": "Recommended type"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Feedback rápido sobre un borrador entre compañeros",
            "en": "Quick peer feedback on a draft"
          },
          {
            "es": "Revisión informal",
            "en": "Informal review"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Compartir conocimiento y lograr entendimiento común del producto",
            "en": "Share knowledge and build common understanding of the product"
          },
          {
            "es": "Walkthrough (guiado por el autor)",
            "en": "Walkthrough (author-led)"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Alcanzar consenso técnico entre expertos (p. ej. una arquitectura)",
            "en": "Reach technical consensus among experts (e.g. an architecture)"
          },
          {
            "es": "Revisión técnica",
            "en": "Technical review"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Producto crítico o de alto riesgo que exige máxima detección de defectos y métricas",
            "en": "Critical or high-risk work product needing maximum defect detection and metrics"
          },
          {
            "es": "Inspección (la más formal)",
            "en": "Inspection (the most formal)"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Análisis estático en el pipeline (CI/CD)",
      "en": "Static analysis in the pipeline (CI/CD)"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Mientras las revisiones requieren personas, el análisis estático se automatiza e integra en el pipeline de integración continua para examinar cada cambio antes de que se fusione:",
      "en": "While reviews require people, static analysis is automated and integrated into the continuous integration pipeline to examine every change before it is merged:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Linters (p. ej. ESLint) aplican estándares de codificación y detectan errores de estilo y patrones peligrosos",
        "en": "Linters (e.g. ESLint) enforce coding standards and detect style errors and risky patterns"
      },
      {
        "es": "Análisis SAST (p. ej. SonarQube) detecta bugs, vulnerabilidades y 'code smells'",
        "en": "SAST analysis (e.g. SonarQube) detects bugs, vulnerabilities and code smells"
      },
      {
        "es": "Una 'quality gate' define umbrales (cobertura, deuda técnica, vulnerabilidades) que el cambio debe superar",
        "en": "A quality gate defines thresholds (coverage, technical debt, vulnerabilities) the change must pass"
      },
      {
        "es": "Si no se cumplen los umbrales, el pipeline falla y bloquea la fusión: feedback temprano y automático",
        "en": "If thresholds are not met, the pipeline fails and blocks the merge: early, automatic feedback"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Ejemplo de quality gate (SonarQube): 0 vulnerabilidades nuevas, cobertura del código nuevo ≥ 80% y 0 'bugs' de severidad alta. Si el cambio no lo cumple, no se permite el merge.",
      "en": "💡 Quality gate example (SonarQube): 0 new vulnerabilities, ≥ 80% coverage on new code and 0 high-severity bugs. If the change fails it, the merge is blocked."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Revisión vs análisis estático",
      "en": "Review vs static analysis"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Aspecto",
        "en": "Aspect"
      },
      {
        "es": "Revisión",
        "en": "Review"
      },
      {
        "es": "Análisis estático",
        "en": "Static analysis"
      }
    ],
    "rows": [
      {
        "cells": [
          { "es": "Ejecutada por", "en": "Performed by" },
          { "es": "Personas", "en": "People" },
          { "es": "Herramientas automatizadas", "en": "Automated tools" }
        ]
      },
      {
        "cells": [
          { "es": "Aplica a", "en": "Applies to" },
          { "es": "Cualquier producto (requisitos, diseño, código, planes)", "en": "Any work product (requirements, design, code, plans)" },
          { "es": "Principalmente código y modelos", "en": "Mainly code and models" }
        ]
      },
      {
        "cells": [
          { "es": "Detecta mejor", "en": "Best at detecting" },
          { "es": "Ambigüedades, defectos de lógica y de diseño", "en": "Ambiguities, logic and design defects" },
          { "es": "Violaciones de estándares, vulnerabilidades, code smells", "en": "Standard violations, vulnerabilities, code smells" }
        ]
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Para el examen: revisión y análisis estático son COMPLEMENTARIOS. El análisis estático escala y es barato por cambio, pero no sustituye el juicio humano sobre requisitos y diseño.",
      "en": "💡 For the exam: reviews and static analysis are COMPLEMENTARY. Static analysis scales and is cheap per change, but does not replace human judgment over requirements and design."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-33",
    "front": {
      "es": "Nombra tres factores de éxito de una revisión.",
      "en": "Name three review success factors."
    },
    "back": {
      "es": "Objetivos claros, tipo de revisión adecuado, tamaño manejable, preparación previa suficiente, y un ambiente de confianza donde se revisa el producto y no a la persona.",
      "en": "Clear objectives, the right review type, manageable size, enough prior preparation, and a climate of trust where the product (not the person) is reviewed."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-34",
    "front": {
      "es": "¿En qué se diferencian una revisión y el análisis estático?",
      "en": "How do a review and static analysis differ?"
    },
    "back": {
      "es": "La revisión la hacen personas sobre cualquier producto de trabajo y detecta ambigüedades y defectos de diseño; el análisis estático es automatizado (linters, SAST), se integra en CI/CD y detecta violaciones de estándares y vulnerabilidades. Son complementarios.",
      "en": "A review is done by people on any work product and catches ambiguities and design defects; static analysis is automated (linters, SAST), integrates into CI/CD and catches standard violations and vulnerabilities. They are complementary."
    }
  }
],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 3)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 3)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Glossary", en: "ISTQB Glossary" }, url: "https://glossary.istqb.org/" },
    { title: { es: "SonarQube — Quality Gates (documentación)", en: "SonarQube — Quality Gates (docs)" }, url: "https://docs.sonarsource.com/sonarqube-server/latest/instance-administration/analysis-functions/quality-gates/" },
    { title: { es: "ESLint — Documentación oficial", en: "ESLint — Official documentation" }, url: "https://eslint.org/docs/latest/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_3_1, L_3_2, L_3_3];
}
