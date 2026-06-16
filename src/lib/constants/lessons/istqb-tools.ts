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
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 6)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 6)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Glossary", en: "ISTQB Glossary" }, url: "https://glossary.istqb.org/" },
  ],
};

const L_6_2: LessonContent = {
  id: "istqb-l6-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Herramientas de gestión de pruebas",
      "en": "Test management tools"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las herramientas de gestión de pruebas organizan todo el ciclo de testing: desde el plan y los casos hasta las ejecuciones, los defectos y los informes. Su valor principal es la trazabilidad: poder seguir el hilo desde un requisito hasta el caso que lo prueba y el defecto que se encontró.",
      "en": "Test management tools organize the whole testing cycle: from the plan and cases to executions, defects and reports. Their main value is traceability: being able to follow the thread from a requirement to the case that tests it and the defect that was found."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué gestionan?",
      "en": "What do they manage?"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Casos de prueba, suites y planes de prueba",
        "en": "Test cases, suites and test plans"
      },
      {
        "es": "Ejecuciones y sus resultados (pasa / falla / bloqueado)",
        "en": "Executions and their results (pass / fail / blocked)"
      },
      {
        "es": "Trazabilidad requisito ↔ caso de prueba ↔ defecto",
        "en": "Traceability requirement ↔ test case ↔ defect"
      },
      {
        "es": "Seguimiento de defectos a lo largo de su ciclo de vida",
        "en": "Defect tracking throughout its lifecycle"
      },
      {
        "es": "Métricas e informes de progreso (cobertura, tasa de paso, defectos abiertos)",
        "en": "Progress metrics and reports (coverage, pass rate, open defects)"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Herramientas habituales",
      "en": "Common tools"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Herramienta",
        "en": "Tool"
      },
      {
        "es": "Para qué se usa",
        "en": "What it is used for"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Jira + Xray / Zephyr",
            "en": "Jira + Xray / Zephyr"
          },
          {
            "es": "Gestión de casos y defectos integrada con el backlog ágil",
            "en": "Case and defect management integrated with the agile backlog"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Azure Test Plans",
            "en": "Azure Test Plans"
          },
          {
            "es": "Planes, suites y ejecución manual/exploratoria dentro de Azure DevOps",
            "en": "Plans, suites and manual/exploratory execution within Azure DevOps"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "TestRail / qTest",
            "en": "TestRail / qTest"
          },
          {
            "es": "Gestión dedicada de casos, ejecuciones y reportes de cobertura",
            "en": "Dedicated management of cases, executions and coverage reports"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Trazabilidad y gestión de defectos",
      "en": "Traceability and defect management"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Un defecto recorre un ciclo de vida (nuevo → asignado → corregido → re-test → cerrado). Un buen reporte de defecto incluye identificador, pasos para reproducir, resultado esperado vs. real, severidad, prioridad y entorno. Vincular cada defecto al caso de prueba y al requisito permite medir el impacto y demostrar la cobertura.",
      "en": "A defect goes through a lifecycle (new → assigned → fixed → re-test → closed). A good defect report includes an identifier, steps to reproduce, expected vs. actual result, severity, priority and environment. Linking each defect to the test case and requirement lets you measure impact and demonstrate coverage."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Buena práctica: mantén la matriz de trazabilidad viva. Si un requisito cambia, deberías poder ver de inmediato qué casos y qué defectos se ven afectados.",
      "en": "💡 Best practice: keep the traceability matrix alive. If a requirement changes, you should immediately see which cases and which defects are affected."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-29",
    "front": {
      "es": "¿Qué es una herramienta de gestión de pruebas?",
      "en": "What is a test management tool?"
    },
    "back": {
      "es": "Una herramienta que organiza casos, planes, ejecuciones, defectos y reportes, y mantiene la trazabilidad entre requisitos, casos de prueba y defectos. Ejemplos: Jira+Xray, Azure Test Plans, TestRail.",
      "en": "A tool that organizes cases, plans, executions, defects and reports, and maintains traceability between requirements, test cases and defects. Examples: Jira+Xray, Azure Test Plans, TestRail."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-30",
    "front": {
      "es": "¿Qué debería incluir un buen reporte de defecto?",
      "en": "What should a good defect report include?"
    },
    "back": {
      "es": "Identificador, pasos para reproducir, resultado esperado vs. real, severidad, prioridad, entorno y, idealmente, el vínculo al caso de prueba y al requisito afectado.",
      "en": "An identifier, steps to reproduce, expected vs. actual result, severity, priority, environment and, ideally, the link to the test case and affected requirement."
    }
  }
],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 6)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 6)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "Atlassian Jira — Documentación", en: "Atlassian Jira — Documentation" }, url: "https://support.atlassian.com/jira-software-cloud/" },
    { title: { es: "Microsoft Azure Test Plans — Documentación", en: "Microsoft Azure Test Plans — Documentation" }, url: "https://learn.microsoft.com/azure/devops/test/" },
  ],
};

const L_6_3: LessonContent = {
  id: "istqb-l6-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Automatización y análisis estático",
      "en": "Automation and static analysis"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Automatizar no es un fin en sí mismo: es una inversión que se amortiza cuando el ahorro acumulado supera el coste inicial más el mantenimiento. La clave está en automatizar lo adecuado y complementarlo con herramientas que encuentren defectos sin ejecutar el código.",
      "en": "Automating is not an end in itself: it is an investment that pays off when accumulated savings exceed the initial cost plus maintenance. The key is automating the right things and complementing them with tools that find defects without executing the code."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Cuándo automatizar?",
      "en": "When to automate?"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "✅ Regresión estable y repetitiva que se ejecuta con frecuencia",
        "en": "✅ Stable, repetitive regression that runs frequently"
      },
      {
        "es": "✅ Comprobaciones de alto volumen o con muchos datos",
        "en": "✅ High-volume or data-heavy checks"
      },
      {
        "es": "✅ Pruebas de carga/rendimiento (inviables a mano)",
        "en": "✅ Load/performance tests (impractical by hand)"
      },
      {
        "es": "❌ Pruebas exploratorias y de usabilidad que requieren juicio humano",
        "en": "❌ Exploratory and usability testing that require human judgment"
      },
      {
        "es": "❌ Funcionalidad muy cambiante o que se ejecutará una sola vez",
        "en": "❌ Highly volatile functionality or one-off checks"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Herramientas de análisis estático",
      "en": "Static analysis tools"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El análisis estático examina el código sin ejecutarlo y detecta defectos potenciales, code smells y violaciones de estándares de forma temprana y barata. Suele integrarse en el pipeline de CI/CD para fallar la build ante problemas graves.",
      "en": "Static analysis examines code without executing it and detects potential defects, code smells and standard violations early and cheaply. It is usually integrated into the CI/CD pipeline to fail the build on serious issues."
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Herramienta",
        "en": "Tool"
      },
      {
        "es": "Qué detecta",
        "en": "What it detects"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "SonarQube",
            "en": "SonarQube"
          },
          {
            "es": "Code smells, bugs, vulnerabilidades y deuda técnica",
            "en": "Code smells, bugs, vulnerabilities and technical debt"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "ESLint / linters",
            "en": "ESLint / linters"
          },
          {
            "es": "Errores de estilo, variables sin uso, patrones peligrosos",
            "en": "Style errors, unused variables, dangerous patterns"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Herramientas de cobertura (JaCoCo, Istanbul)",
            "en": "Coverage tools (JaCoCo, Istanbul)"
          },
          {
            "es": "Qué sentencias/ramas del código ejercitan las pruebas",
            "en": "Which code statements/branches the tests exercise"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "El ROI de la automatización",
      "en": "Automation ROI"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El retorno de inversión depende de la inversión inicial (crear los scripts), el coste de mantenimiento (actualizarlos cuando cambia la aplicación) y el ahorro por ejecución. Una suite frágil que hay que arreglar en cada cambio puede costar más de lo que ahorra.",
      "en": "Return on investment depends on the initial investment (building the scripts), the maintenance cost (updating them when the application changes) and the per-run savings. A brittle suite that must be fixed on every change can cost more than it saves."
    }
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ El mantenimiento es el coste oculto de la automatización. Si los scripts no se mantienen al ritmo de los cambios, fallan en falso y el equipo deja de confiar en ellos.",
      "en": "⚠️ Maintenance is the hidden cost of automation. If scripts are not maintained as changes happen, they fail falsely and the team stops trusting them."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-31",
    "front": {
      "es": "¿Qué tipo de pruebas es ideal automatizar?",
      "en": "Which type of tests are ideal to automate?"
    },
    "back": {
      "es": "Pruebas estables, repetitivas, de alto volumen y alta frecuencia (regresión, carga, comprobaciones masivas). No conviene automatizar lo exploratorio, la usabilidad o lo muy cambiante.",
      "en": "Stable, repetitive, high-volume and high-frequency tests (regression, load, massive checks). Exploratory, usability or highly volatile work is not worth automating."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-32",
    "front": {
      "es": "¿Qué hace una herramienta de análisis estático?",
      "en": "What does a static analysis tool do?"
    },
    "back": {
      "es": "Examina el código sin ejecutarlo para detectar defectos potenciales, code smells, vulnerabilidades y violaciones de estándares de forma temprana. Ejemplos: SonarQube, ESLint.",
      "en": "It examines code without executing it to detect potential defects, code smells, vulnerabilities and standard violations early. Examples: SonarQube, ESLint."
    }
  }
],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial (cap. 6)", en: "ISTQB CTFL v4.0 — Official syllabus (ch. 6)" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "Playwright — Documentación", en: "Playwright — Documentation" }, url: "https://playwright.dev/" },
    { title: { es: "SonarQube — Documentación", en: "SonarQube — Documentation" }, url: "https://docs.sonarsource.com/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_6_1, L_6_2, L_6_3];
}
