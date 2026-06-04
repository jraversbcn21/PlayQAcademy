/**
 * Tool Support for Testing
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
      "en": "Testing Tool Categories"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las herramientas de testing pueden soportar muchas actividades del proceso de prueba:",
      "en": ""
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Categorías de Herramientas",
      "en": "Benefits of Automation"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Categoría",
        "en": ""
      },
      {
        "es": "Ejemplos",
        "en": ""
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Gestión de pruebas",
            "en": ""
          },
          {
            "es": "TestRail, Zephyr, Xray",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Análisis estático",
            "en": ""
          },
          {
            "es": "SonarQube, ESLint, FindBugs",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Automatización de UI",
            "en": ""
          },
          {
            "es": "Selenium, Playwright, Cypress",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas de API",
            "en": ""
          },
          {
            "es": "Postman, RestAssured, SoapUI",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas de rendimiento",
            "en": ""
          },
          {
            "es": "JMeter, Gatling, k6",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Pruebas unitarias",
            "en": ""
          },
          {
            "es": "JUnit, pytest, NUnit",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "CI/CD",
            "en": ""
          },
          {
            "es": "Jenkins, GitHub Actions, GitLab CI",
            "en": ""
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Seguimiento de defectos",
            "en": ""
          },
          {
            "es": "Jira, Bugzilla, Redmine",
            "en": ""
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
      "en": "Risks of Automation"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Ejecución más rápida de pruebas de regresión",
        "en": "Unrealistic expectations, high initial cost, maintenance overhead, false sense of security"
      },
      {
        "es": "Mayor consistencia y repetibilidad",
        "en": ""
      },
      {
        "es": "Cobertura ampliada (más pruebas en menos tiempo)",
        "en": ""
      },
      {
        "es": "Disponibilidad 24/7 (integración continua)",
        "en": ""
      },
      {
        "es": "Reducción del trabajo manual repetitivo",
        "en": ""
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Riesgos de la Automatización",
      "en": ""
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Expectativas poco realistas sobre los beneficios",
        "en": ""
      },
      {
        "es": "Alto costo inicial de implementación",
        "en": ""
      },
      {
        "es": "Mantenimiento costoso de scripts (especialmente con UI cambiante)",
        "en": ""
      },
      {
        "es": "Falsa sensación de seguridad",
        "en": ""
      },
      {
        "es": "Dependencia de herramientas específicas",
        "en": ""
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Consideraciones para adoptar herramientas:\n  \n1. Evaluar la madurez del proceso existente\n  \n2. Pilotar antes de adoptar masivamente\n  \n3. Capacitar al equipo\n  \n4. Establecer métricas de ROI claras",
      "en": ""
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
