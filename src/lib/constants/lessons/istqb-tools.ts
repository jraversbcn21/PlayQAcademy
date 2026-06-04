/**
 * Tool Support for Testing — ISTQB CTFL v4.0, Chapter 6
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-tools";

const L_6_1: LessonContent = {
  id: "istqb-l6-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Herramientas de Testing",
      "en": "Testing Tools"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las herramientas de testing pueden soportar muchas actividades del proceso de prueba:",
      "en": "Testing tools can support many activities of the test process:"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Categorías de Herramientas",
      "en": "Tool Categories"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Categoría",
        "en": "Category"
      },
      {
        "es": "Ejemplos",
        "en": "Examples"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Gestión de pruebas",
            "en": "Test management"
          },
          {
            "es": "TestRail, Zephyr, Xray",
            "en": "TestRail, Zephyr, Xray"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Análisis estático",
            "en": "Static analysis"
          },
          {
            "es": "SonarQube, ESLint, FindBugs",
            "en": "SonarQube, ESLint, FindBugs"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Automatización de UI",
            "en": "UI automation"
          },
          {
            "es": "Selenium, Playwright, Cypress",
            "en": "Selenium, Playwright, Cypress"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas de API",
            "en": "API testing"
          },
          {
            "es": "Postman, RestAssured, SoapUI",
            "en": "Postman, RestAssured, SoapUI"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas de rendimiento",
            "en": "Performance testing"
          },
          {
            "es": "JMeter, Gatling, k6",
            "en": "JMeter, Gatling, k6"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas unitarias",
            "en": "Unit testing"
          },
          {
            "es": "JUnit, pytest, NUnit",
            "en": "JUnit, pytest, NUnit"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "CI/CD",
            "en": "CI/CD"
          },
          {
            "es": "Jenkins, GitHub Actions, GitLab CI",
            "en": "Jenkins, GitHub Actions, GitLab CI"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Seguimiento de defectos",
            "en": "Defect tracking"
          },
          {
            "es": "Jira, Bugzilla, Redmine",
            "en": "Jira, Bugzilla, Redmine"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Beneficios de la Automatización",
      "en": "Benefits of Automation"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Ejecución más rápida de pruebas de regresión",
        "en": "Faster regression test execution"
      },
      {
        "es": "Mayor consistencia y repetibilidad",
        "en": "Greater consistency and repeatability"
      },
      {
        "es": "Cobertura ampliada (más pruebas en menos tiempo)",
        "en": "Extended coverage (more tests in less time)"
      },
      {
        "es": "Disponibilidad 24/7 (integración continua)",
        "en": "24/7 availability (continuous integration)"
      },
      {
        "es": "Reducción del trabajo manual repetitivo",
        "en": "Reduction of repetitive manual work"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Riesgos de la Automatización",
      "en": "Risks of Automation"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Expectativas poco realistas sobre los beneficios",
        "en": "Unrealistic expectations about benefits"
      },
      {
        "es": "Alto costo inicial de implementación",
        "en": "High initial implementation cost"
      },
      {
        "es": "Mantenimiento costoso de scripts (especialmente con UI cambiante)",
        "en": "Costly script maintenance (especially with changing UI)"
      },
      {
        "es": "Falsa sensación de seguridad",
        "en": "False sense of security"
      },
      {
        "es": "Dependencia de herramientas específicas",
        "en": "Dependency on specific tools"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Consideraciones para adoptar herramientas:\n  \n1. Evaluar la madurez del proceso existente\n  \n2. Pilotar antes de adoptar masivamente\n  \n3. Capacitar al equipo\n  \n4. Establecer métricas de ROI claras",
      "en": "💡 Considerations for tool adoption:\n  \n1. Assess the maturity of the existing process\n  \n2. Pilot before mass adoption\n  \n3. Train the team\n  \n4. Establish clear ROI metrics"
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-27",
    "front": {
      "es": "¿Cuáles son los beneficios del testing automatizado?",
      "en": "What are the benefits of automated testing?"
    },
    "back": {
      "es": "Reducción del trabajo manual repetitivo, mayor consistencia, ejecución más rápida de regresión, mayor cobertura, disponibilidad 24/7, y liberación de testers para tareas de mayor valor.",
      "en": "Reduction of repetitive manual work, greater consistency, faster regression execution, more coverage, 24/7 availability, and freeing testers for higher-value tasks."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-28",
    "front": {
      "es": "¿Cuáles son los riesgos de la automatización de pruebas?",
      "en": "What are the risks of test automation?"
    },
    "back": {
      "es": "Expectativas poco realistas, mantenimiento de scripts costoso, falsa sensación de seguridad, costo inicial alto, dependencia de herramientas específicas, y dificultad en pruebas exploratorias y visuales.",
      "en": "Unrealistic expectations, costly script maintenance, false sense of security, high initial cost, tool dependency, and difficulty with exploratory and visual testing."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_6_1];
}
