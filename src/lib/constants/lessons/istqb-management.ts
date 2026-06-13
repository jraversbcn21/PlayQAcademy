/**
 * Managing Test Activities — ISTQB CTFL v4.0, Chapter 5
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-management";

const L_5_1: LessonContent = {
  id: "istqb-l5-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "El Plan de Pruebas",
      "en": "The Test Plan"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El plan de pruebas documenta el enfoque, recursos, alcance y actividades del testing. Un plan de pruebas típico incluye:",
      "en": "The test plan documents the approach, resources, scope and activities of testing. A typical test plan includes:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Contexto (alcance, objetivos, stakeholders)",
        "en": "Context (scope, objectives, stakeholders)"
      },
      {
        "es": "Supuestos y restricciones",
        "en": "Assumptions and constraints"
      },
      {
        "es": "Comunicación y reporte de información",
        "en": "Communication and information reporting"
      },
      {
        "es": "Gestión de riesgos",
        "en": "Risk management"
      },
      {
        "es": "Enfoque de pruebas (niveles, tipos, técnicas)",
        "en": "Test approach (levels, types, techniques)"
      },
      {
        "es": "Criterios de entrada y salida",
        "en": "Entry and exit criteria"
      },
      {
        "es": "Estimación del esfuerzo",
        "en": "Effort estimation"
      },
      {
        "es": "Calendario de actividades",
        "en": "Activity schedule"
      },
      {
        "es": "Roles y responsabilidades",
        "en": "Roles and responsibilities"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Criterios de Entrada y Salida",
      "en": "Entry and Exit Criteria"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Criterios de Entrada",
        "en": "Entry Criteria"
      },
      {
        "es": "Criterios de Salida",
        "en": "Exit Criteria"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "El código está completo y compilado",
            "en": "Code is complete and compiled"
          },
          {
            "es": "Todos los casos de prueba ejecutados",
            "en": "All test cases executed"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "El entorno de pruebas está disponible",
            "en": "Test environment is available"
          },
          {
            "es": "90% de casos pasados",
            "en": "90% of tests passed"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Los datos de prueba están preparados",
            "en": "Test data is prepared"
          },
          {
            "es": "Todos los defectos críticos cerrados",
            "en": "All critical defects closed"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Los requisitos están aprobados",
            "en": "Requirements are approved"
          },
          {
            "es": "Informe de pruebas generado",
            "en": "Test report generated"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Estimación del Esfuerzo de Testing",
      "en": "Test Effort Estimation"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las técnicas de estimación incluyen:",
      "en": "Estimation techniques include:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Basada en métricas: Usando datos históricos de proyectos similares",
        "en": "Metrics-based: Using historical data from similar projects"
      },
      {
        "es": "Basada en expertos: Planning Poker, estimación en 3 puntos",
        "en": "Expert-based: Planning Poker, 3-point estimation"
      },
      {
        "es": "Porcentaje del desarrollo: El testing suele representar el 20-40% del total",
        "en": "Percentage of development: Testing usually represents 20-40% of the total"
      }
    ]
  }
],
};

const L_5_2: LessonContent = {
  id: "istqb-l5-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Riesgo en el Contexto del Testing",
      "en": "Risk in the Testing Context"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Un riesgo es un factor potencial que puede resultar en una consecuencia negativa en el futuro. Se calcula como:",
      "en": "A risk is a potential factor that can result in a negative consequence in the future. It is calculated as:"
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "📊 Nivel de Riesgo = Probabilidad × Impacto",
      "en": "📊 Risk Level = Probability × Impact"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Tipos de Riesgo",
      "en": "Risk Types"
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
        "es": "Descripción",
        "en": "Description"
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
            "es": "Riesgo de Producto",
            "en": "Product Risk"
          },
          {
            "es": "Posibilidad de que el producto no cumpla su función",
            "en": "Possibility that the product won't meet its function"
          },
          {
            "es": "Fallo de seguridad, rendimiento deficiente, funcionalidad incorrecta",
            "en": "Security failure, poor performance, incorrect functionality"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Riesgo de Proyecto",
            "en": "Project Risk"
          },
          {
            "es": "Posibilidad de que el proyecto falle en sus objetivos",
            "en": "Possibility that the project won't meet its objectives"
          },
          {
            "es": "Exceso de presupuesto, retrasos, problemas de personal",
            "en": "Budget overrun, delays, staffing issues"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testing Basado en Riesgos",
      "en": "Risk-Based Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing basado en riesgos prioriza los esfuerzos de testing según el nivel de riesgo de cada área:",
      "en": "Risk-based testing prioritizes testing efforts according to the risk level of each area:"
    }
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      {
        "es": "Identificar los riesgos del producto",
        "en": "Identify product risks"
      },
      {
        "es": "Evaluar su probabilidad e impacto",
        "en": "Assess their probability and impact"
      },
      {
        "es": "Priorizar el testing en áreas de mayor riesgo",
        "en": "Prioritize testing in higher-risk areas"
      },
      {
        "es": "Mitigar los riesgos mediante pruebas",
        "en": "Mitigate risks through testing"
      },
      {
        "es": "Monitorear los riesgos a lo largo del proyecto",
        "en": "Monitor risks throughout the project"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: En un sistema bancario, el módulo de transferencias tiene mayor riesgo que la página de inicio. Por lo tanto, se le asigna más esfuerzo de testing y técnicas más exhaustivas.",
      "en": "📌 Example: In a banking system, the transfers module has higher risk than the home page. Therefore, more testing effort and more exhaustive techniques are assigned to it."
    }
  }
],
};

const L_5_3: LessonContent = {
  id: "istqb-l5-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Monitoreo del testing",
      "en": "Test monitoring"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El monitoreo es la recopilación continua de información sobre el progreso de las pruebas para compararlo con lo planificado. Responde a la pregunta: ¿dónde estamos?",
      "en": "Monitoring is the ongoing collection of information about testing progress to compare it against the plan. It answers: where are we?"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Control del testing",
      "en": "Test control"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El control es la toma de acciones correctivas basadas en la información recopilada. Responde a: ¿qué hacemos con lo que sabemos?",
      "en": "Control is taking corrective actions based on collected information. It answers: what do we do with what we know?"
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Diferencia clave: Monitoreo = observar y medir. Control = actuar sobre lo observado.",
      "en": "💡 Key difference: Monitoring = observe and measure. Control = act on what was observed."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Métricas de prueba más utilizadas",
      "en": "Commonly used test metrics"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Métrica",
        "en": "Metric"
      },
      {
        "es": "Descripción",
        "en": "Descripción"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Porcentaje de trabajo completado",
            "en": "Percentage of work completed"
          },
          {
            "es": "Casos de prueba ejecutados / total planificados",
            "en": "Test cases executed / total planned"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Cobertura de requisitos",
            "en": "Requirements coverage"
          },
          {
            "es": "% de requisitos cubiertos por al menos un test",
            "en": "% of requirements covered by at least one test"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Densidad de defectos",
            "en": "Defect density"
          },
          {
            "es": "Número de defectos por módulo o componente",
            "en": "Number of defects per module or component"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Defectos encontrados vs. cerrados",
            "en": "Defects found vs. closed"
          },
          {
            "es": "Tendencia de apertura/cierre de bugs",
            "en": "Bug opening/closing trend"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Cobertura de código",
            "en": "Code coverage"
          },
          {
            "es": "% de código ejecutado por los tests",
            "en": "% of code executed by tests"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Coste del testing",
            "en": "Testing cost"
          },
          {
            "es": "Coste real vs. coste planificado",
            "en": "Actual cost vs. planned cost"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Informes de prueba (Test reports)",
      "en": "Test reports"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El equipo de testing comunica su progreso mediante informes. Existen dos tipos principales:",
      "en": "The testing team communicates its progress through reports. There are two main types:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Informe de progreso de pruebas (Test progress report): Se genera periódicamente durante la ejecución. Incluye estado actual, avance, defectos encontrados y desviaciones del plan.",
        "en": "Test progress report: Generated periodically during execution. Includes current status, progress, defects found and plan deviations."
      },
      {
        "es": "Informe de completitud de pruebas (Test completion report): Se genera al finalizar una fase de testing. Resume los resultados, lecciones aprendidas y recomendaciones para el futuro.",
        "en": "Test completion report: Generated at the end of a testing phase. Summarizes results, lessons learned and future recommendations."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Criterios de entrada y salida (Entry/Exit criteria)",
      "en": "Entry and Exit criteria"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Los criterios de entrada (también llamados Definition of Ready) definen las condiciones que deben cumplirse antes de iniciar una actividad de testing:",
      "en": "Entry criteria (also called Definition of Ready) define conditions that must be met before starting a testing activity:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Entorno de prueba disponible y configurado",
        "en": "Test environment available and configured"
      },
      {
        "es": "Datos de prueba preparados",
        "en": "Test data prepared"
      },
      {
        "es": "Código del objeto de prueba disponible y estable",
        "en": "Test object code available and stable"
      }
    ]
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Los criterios de salida (también llamados Definition of Done) definen cuándo el testing está suficientemente completo:",
      "en": "Exit criteria (also called Definition of Done) define when testing is sufficiently complete:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Porcentaje mínimo de casos de prueba ejecutados",
        "en": "Minimum percentage of test cases executed"
      },
      {
        "es": "Número máximo de defectos abiertos por severidad",
        "en": "Maximum number of open defects by severity"
      },
      {
        "es": "Cobertura mínima de requisitos o código alcanzada",
        "en": "Minimum requirements or code coverage achieved"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen: En contextos ágiles, los criterios de entrada/salida suelen llamarse Definition of Ready y Definition of Done respectivamente.",
      "en": "⚠️ For the exam: In agile contexts, entry/exit criteria are often called Definition of Ready and Definition of Done respectively."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo de acción de control: El monitoreo detecta que solo se han ejecutado el 40% de los casos de prueba cuando debería ser el 70%. El control puede implicar: reasignar testers, reducir alcance, negociar fecha de entrega o priorizar las pruebas de mayor riesgo.",
      "en": "📌 Control action example: Monitoring detects only 40% of test cases executed when 70% was expected. Control may involve: reassigning testers, reducing scope, negotiating delivery date or prioritizing highest-risk tests."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Gestión de completitud de pruebas",
      "en": "Test completion management"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Al cierre de una fase o proyecto de testing se realizan las siguientes actividades:",
      "en": "At the close of a testing phase or project, the following activities are performed:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Verificar que todos los defectos están cerrados o aceptados como riesgo conocido",
        "en": "Verify that all defects are closed or accepted as known risk"
      },
      {
        "es": "Entregar el testware al equipo de mantenimiento",
        "en": "Deliver testware to the maintenance team"
      },
      {
        "es": "Analizar lecciones aprendidas para mejorar futuros proyectos",
        "en": "Analyze lessons learned to improve future projects"
      },
      {
        "es": "Archivar resultados, logs y evidencias de prueba",
        "en": "Archive results, logs and test evidence"
      }
    ]
  }
],
};

const L_5_4: LessonContent = {
  id: "istqb-l5-4",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué es la gestión de la configuración?",
      "en": "What is configuration management?"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "La gestión de la configuración (CM) es una disciplina que proporciona control sobre los artefactos de software y testware a lo largo del proyecto. Su objetivo es mantener la integridad y trazabilidad de todos los elementos del proyecto.",
      "en": "Configuration management (CM) is a discipline that provides control over software and testware artifacts throughout the project. Its goal is to maintain the integrity and traceability of all project elements."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Analogía: La gestión de la configuración es como el control de versiones de todo el proyecto — no solo del código, sino también de los casos de prueba, entornos, documentos y cualquier otro artefacto.",
      "en": "💡 Analogy: Configuration management is like version control for the entire project — not just code, but also test cases, environments, documents and any other artifacts."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Elementos bajo control de configuración (Configuration Items)",
      "en": "Configuration Items"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Cualquier artefacto que necesita ser identificado, controlado y rastreado se denomina ítem de configuración:",
      "en": "Any artifact that needs to be identified, controlled and tracked is called a configuration item:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Código fuente y ejecutables",
        "en": "Source code and executables"
      },
      {
        "es": "Casos de prueba y scripts de prueba",
        "en": "Test cases and test scripts"
      },
      {
        "es": "Datos de prueba",
        "en": "Test data"
      },
      {
        "es": "Entornos de prueba (configuración de servidores, bases de datos)",
        "en": "Test environments (server and database configurations)"
      },
      {
        "es": "Documentación (requisitos, planes de prueba, informes)",
        "en": "Documentation (requirements, test plans, reports)"
      },
      {
        "es": "Herramientas y sus configuraciones",
        "en": "Tools and their configurations"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Actividades principales de la gestión de la configuración",
      "en": "Main CM activities"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Actividad",
        "en": "Activity"
      },
      {
        "es": "Descripción",
        "en": "Descripción"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Identificación",
            "en": "Identification"
          },
          {
            "es": "Asignar un identificador único a cada ítem de configuración",
            "en": "Assign a unique identifier to each configuration item"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Control de versiones",
            "en": "Version control"
          },
          {
            "es": "Registrar todos los cambios y poder recuperar versiones anteriores",
            "en": "Record all changes and be able to retrieve previous versions"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Auditoría de configuración",
            "en": "Configuration audit"
          },
          {
            "es": "Verificar que los ítems son consistentes entre sí",
            "en": "Verify that items are consistent with each other"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Reporting de estado",
            "en": "Status reporting"
          },
          {
            "es": "Informar sobre el estado y historial de cambios de los ítems",
            "en": "Report on the status and change history of items"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Relación con el testing",
      "en": "Relationship with testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "La gestión de la configuración es fundamental para el testing porque:",
      "en": "Configuration management is fundamental for testing because:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Garantiza que los testers prueban la versión correcta del software",
        "en": "Ensures testers test the correct version of the software"
      },
      {
        "es": "Permite reproducir defectos en el entorno exacto donde ocurrieron",
        "en": "Allows reproducing defects in the exact environment where they occurred"
      },
      {
        "es": "Facilita la trazabilidad entre requisitos, código y casos de prueba",
        "en": "Facilitates traceability between requirements, code and test cases"
      },
      {
        "es": "Asegura que los entornos de prueba son consistentes y repetibles",
        "en": "Ensures test environments are consistent and repeatable"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: Sin gestión de configuración, un tester podría reportar un bug en la versión 2.1 del sistema, pero el desarrollador lo busca en la versión 2.3. El defecto \"desaparece\" porque el código cambió. Con CM, ambos trabajan sobre el mismo ítem identificado.",
      "en": "📌 Example: Without CM, a tester might report a bug in version 2.1, but the developer looks for it in version 2.3. The defect \"disappears\" because the code changed. With CM, both work on the same identified item."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Herramientas de gestión de configuración",
      "en": "Configuration management tools"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las herramientas más comunes en la industria son:",
      "en": "The most common tools in the industry are:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Control de versiones de código: Git, SVN",
        "en": "Source code version control: Git, SVN"
      },
      {
        "es": "Gestión de entornos: Docker, Ansible, Terraform",
        "en": "Environment management: Docker, Ansible, Terraform"
      },
      {
        "es": "Gestión de artefactos: Nexus, Artifactory",
        "en": "Artifact management: Nexus, Artifactory"
      },
      {
        "es": "Gestión de configuración de pruebas: TestRail, Xray (integrados con Jira)",
        "en": "Test configuration management: TestRail, Xray (integrated with Jira)"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen: La gestión de la configuración apoya al testing asegurando que todos los artefactos están identificados, versionados y son reproducibles. Recuerda que incluye testware (casos de prueba, datos, entornos) además del código.",
      "en": "⚠️ For the exam: CM supports testing by ensuring all artifacts are identified, versioned and reproducible. Remember it includes testware (test cases, data, environments) in addition to code."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Línea base (Baseline)",
      "en": "Baseline"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Una línea base es una instantánea aprobada y verificada de un conjunto de ítems de configuración en un momento determinado. Solo puede modificarse mediante un proceso formal de control de cambios.",
      "en": "A baseline is an approved and verified snapshot of a set of configuration items at a specific point in time. It can only be modified through a formal change control process."
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Ejemplo: la línea base de la versión 1.0 incluye el código, los casos de prueba ejecutados y los informes de prueba de ese release.",
      "en": "Example: the version 1.0 baseline includes the code, executed test cases and test reports from that release."
    }
  }
],
};

const L_5_5: LessonContent = {
  id: "istqb-l5-5",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "El Ciclo de Vida de un Defecto",
      "en": "Defect Lifecycle"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Un defecto pasa por diferentes estados desde que se detecta hasta que se cierra:",
      "en": "A defect goes through different states from detection to closure:"
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Estados típicos:\n  \nNuevo → Asignado → En corrección → Pendiente retest → Reabierto / Cerrado",
      "en": "📌 Typical states:\n  \nNew → Assigned → In Fix → Pending Retest → Reopened / Closed"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Informe de Defecto",
      "en": "Defect Report"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Un informe de defecto bien escrito debe incluir:",
      "en": "A well-written defect report should include:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "ID único y título descriptivo",
        "en": "Unique ID and descriptive title"
      },
      {
        "es": "Fecha de detección y autor",
        "en": "Detection date and author"
      },
      {
        "es": "Objeto de prueba (módulo, versión)",
        "en": "Test object (module, version)"
      },
      {
        "es": "Entorno de prueba (OS, browser, etc.)",
        "en": "Test environment (OS, browser, etc.)"
      },
      {
        "es": "Pasos para reproducir el defecto",
        "en": "Steps to reproduce the defect"
      },
      {
        "es": "Resultado esperado vs resultado actual",
        "en": "Expected vs actual result"
      },
      {
        "es": "Severidad y prioridad",
        "en": "Severity and priority"
      },
      {
        "es": "Evidencia: capturas de pantalla, logs",
        "en": "Evidence: screenshots, logs"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Severidad vs Prioridad",
      "en": "Severity vs Priority"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "",
        "en": ""
      },
      {
        "es": "Alta prioridad",
        "en": "High priority"
      },
      {
        "es": "Baja prioridad",
        "en": "Low priority"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Alta severidad",
            "en": "High severity"
          },
          {
            "es": "Sistema caído, afecta a todos",
            "en": "System down, affects everyone"
          },
          {
            "es": "Crash en función rara vez usada",
            "en": "Crash in rarely used function"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Baja severidad",
            "en": "Low severity"
          },
          {
            "es": "Error tipográfico en página principal",
            "en": "Typo on main page"
          },
          {
            "es": "Error visual en pantalla de configuración",
            "en": "Visual error on settings screen"
          }
        ]
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen: Severidad = impacto técnico. Prioridad = urgencia de corrección. Son dimensiones independientes.",
      "en": "⚠️ For the exam: Severity = technical impact. Priority = urgency of fix. Independent dimensions."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-23",
    "front": {
      "es": "¿Qué es el Riesgo de Producto vs. Riesgo de Proyecto?",
      "en": "What is Product Risk vs. Project Risk?"
    },
    "back": {
      "es": "Riesgo de producto: posibilidad de que el producto no cumpla su función (defectos funcionales, problemas de rendimiento). Riesgo de proyecto: posibilidad de que el proyecto no logre sus objetivos (presupuesto, plazos, recursos).",
      "en": "Product risk: possibility that the product won't fulfill its function (functional defects, performance issues). Project risk: possibility that the project won't achieve its objectives (budget, timelines, resources)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-24",
    "front": {
      "es": "¿Qué son los criterios de entrada y salida en testing?",
      "en": "What are entry and exit criteria in testing?"
    },
    "back": {
      "es": "Entrada (Entry): condiciones que deben cumplirse para iniciar una fase de prueba (ej: el código está compilado). Salida (Exit): condiciones para completar la fase (ej: 90% de casos pasados, todos los críticos).",
      "en": "Entry criteria: conditions that must be met to start a test phase (e.g., code is compiled). Exit criteria: conditions to complete the phase (e.g., 90% tests passed, all critical ones)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-25",
    "front": {
      "es": "¿Qué información debe incluir un informe de defecto?",
      "en": "What information should a defect report include?"
    },
    "back": {
      "es": "ID, título, descripción, pasos para reproducir, resultado esperado, resultado actual, severidad, prioridad, entorno, versión del software, y evidencia (capturas, logs).",
      "en": "ID, title, description, steps to reproduce, expected result, actual result, severity, priority, environment, software version, and evidence (screenshots, logs)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-26",
    "front": {
      "es": "¿Cuál es la diferencia entre SEVERIDAD y PRIORIDAD en un defecto?",
      "en": "What is the difference between SEVERITY and PRIORITY in a defect?"
    },
    "back": {
      "es": "Severidad: impacto técnico del defecto (cuánto daño hace al sistema). Prioridad: urgencia de la corrección (cuándo debe corregirse). Un defecto puede ser de alta severidad pero baja prioridad y viceversa.",
      "en": "Severity: technical impact of the defect (how much damage it does to the system). Priority: urgency of the fix (when it must be fixed). A defect can have high severity but low priority and vice versa."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_5_1, L_5_2, L_5_3, L_5_4, L_5_5];
}
