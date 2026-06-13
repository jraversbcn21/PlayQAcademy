/**
 * Testing Throughout the SDLC — ISTQB CTFL v4.0, Chapter 2
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-sdlc";

const L_2_1: LessonContent = {
  id: "istqb-l2-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Modelos de Desarrollo de Software y Testing",
      "en": "Software Development Models and Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing debe adaptarse al modelo de desarrollo utilizado:",
      "en": "Testing must adapt to the development model being used:"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Modelo Waterfall (Cascada)",
      "en": "Waterfall Model"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Las fases son secuenciales: requisitos → diseño → código → pruebas → mantenimiento",
        "en": "Phases are sequential: requirements → design → code → tests → maintenance"
      },
      {
        "es": "El testing ocurre después de que el desarrollo está completo",
        "en": "Testing occurs after development is complete"
      },
      {
        "es": "Los defectos encontrados tardíamente son muy costosos",
        "en": "Defects found late are very expensive"
      },
      {
        "es": "Testing más formal y documentado",
        "en": "More formal and documented testing"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Modelos Iterativos/Ágiles (Scrum, Kanban)",
      "en": "Iterative/Agile Models (Scrum, Kanban)"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "El testing se integra en cada iteración/sprint",
        "en": "Testing is integrated into each iteration/sprint"
      },
      {
        "es": "Los testers colaboran con desarrolladores desde el inicio",
        "en": "Testers collaborate with developers from the start"
      },
      {
        "es": "Testing continuo con feedback rápido",
        "en": "Continuous testing with fast feedback"
      },
      {
        "es": "Automatización es esencial para mantener el ritmo",
        "en": "Automation is essential to maintain the pace"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "DevOps y Shift-Left",
      "en": "DevOps and Shift-Left"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "DevOps combina el desarrollo y las operaciones para entregar software más rápidamente. El shift-left mueve el testing hacia las fases más tempranas del SDLC.",
      "en": "DevOps combines development and operations to deliver software more quickly. Shift-left moves testing to the earliest phases of the SDLC."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Shift-left en práctica:\n  \n    Revisiones de requisitos (antes de diseñar)\n    TDD: escribir pruebas antes del código\n    ATDD: criterios de aceptación como pruebas\n    Integración continua con pruebas automáticas",
      "en": "📌 Shift-left in practice:\n  \n    Requirements reviews (before designing)\n    TDD: writing tests before code\n    ATDD: acceptance criteria as tests\n    Continuous integration with automated tests"
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Principio: En cualquier modelo de SDLC, el testing debe comenzar lo antes posible (Principio 3: testing temprano).",
      "en": "💡 Principle: In any SDLC model, testing should start as early as possible (Principle 3: early testing)."
    }
  }
],
};

const L_2_2: LessonContent = {
  id: "istqb-l2-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Los 4 Niveles de Prueba",
      "en": "The 4 Test Levels"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Los niveles de prueba son grupos de actividades de testing organizadas y gestionadas juntos. Cada nivel corresponde a una fase del desarrollo.",
      "en": "Test levels are groups of testing activities organized and managed together. Each level corresponds to a development phase."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Prueba de Componente / Unitaria",
      "en": "Component / Unit Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifica componentes individuales en aislamiento. También llamada prueba unitaria.",
      "en": "Verifies individual components in isolation. Also called unit testing."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Objeto de prueba: Código fuente, módulos, clases",
        "en": "Test object: Source code, modules, classes"
      },
      {
        "es": "Defectos típicos: Errores de código, malos caminos en el flujo",
        "en": "Typical defects: Code errors, wrong paths in the flow"
      },
      {
        "es": "Entorno: Stubs y drivers para simular dependencias",
        "en": "Environment: Stubs and drivers to simulate dependencies"
      },
      {
        "es": "Realizado por: Desarrolladores",
        "en": "Performed by: Developers"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Prueba de Integración de Componentes",
      "en": "Component Integration Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifica la interacción entre componentes integrados.",
      "en": "Verifies the interaction between integrated components."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Objeto de prueba: Interfaces, APIs, flujos de datos entre módulos",
        "en": "Test object: Interfaces, APIs, data flows between modules"
      },
      {
        "es": "Defectos típicos: Comunicación incorrecta entre componentes",
        "en": "Typical defects: Incorrect communication between components"
      },
      {
        "es": "Enfoques: Bottom-up, Top-down, Big-bang, Sandwich",
        "en": "Approaches: Bottom-up, Top-down, Big-bang, Sandwich"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Prueba de Sistema",
      "en": "System Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifica el comportamiento del sistema completo de extremo a extremo.",
      "en": "Verifies the behavior of the complete system end-to-end."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Objeto de prueba: Sistema completo, aplicación end-to-end",
        "en": "Test object: Complete system, end-to-end application"
      },
      {
        "es": "Defectos típicos: Flujos de datos incorrectos, fallos funcionales del sistema",
        "en": "Typical defects: Incorrect data flows, system functional failures"
      },
      {
        "es": "Realizado por: Equipo de pruebas independiente",
        "en": "Performed by: Independent test team"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Prueba de Aceptación",
      "en": "Acceptance Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifica si el sistema cumple con los criterios de aceptación del negocio y es listo para entrega.",
      "en": "Verifies whether the system meets business acceptance criteria and is ready for delivery."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "UAT (User Acceptance Testing): Usuarios finales",
        "en": "UAT (User Acceptance Testing): End users"
      },
      {
        "es": "BAT (Business Acceptance Testing): Procesos de negocio",
        "en": "BAT (Business Acceptance Testing): Business processes"
      },
      {
        "es": "Alpha testing: En el sitio del desarrollador",
        "en": "Alpha testing: At the developer's site"
      },
      {
        "es": "Beta testing: En el entorno del cliente",
        "en": "Beta testing: In the customer's environment"
      },
      {
        "es": "Regulatory testing: Cumplimiento legal",
        "en": "Regulatory testing: Legal compliance"
      }
    ]
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Nivel",
        "en": "Level"
      },
      {
        "es": "¿Qué verifica?",
        "en": "What it verifies"
      },
      {
        "es": "¿Quién?",
        "en": "Who?"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Componente",
            "en": "Component"
          },
          {
            "es": "Módulos individuales",
            "en": "Individual modules"
          },
          {
            "es": "Desarrolladores",
            "en": "Developers"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Integración",
            "en": "Integration"
          },
          {
            "es": "Interacción entre componentes",
            "en": "Interaction between components"
          },
          {
            "es": "Desarrolladores / Testers",
            "en": "Developers / Testers"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Sistema",
            "en": "System"
          },
          {
            "es": "Sistema completo",
            "en": "Complete system"
          },
          {
            "es": "Testers independientes",
            "en": "Independent testers"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Aceptación",
            "en": "Acceptance"
          },
          {
            "es": "Necesidades del negocio/usuario",
            "en": "Business/user needs"
          },
          {
            "es": "Usuarios / Clientes",
            "en": "Users / Clients"
          }
        ]
      }
    ]
  }
],
};

const L_2_3: LessonContent = {
  id: "istqb-l2-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Tipos de Prueba",
      "en": "Test Types"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Los tipos de prueba categorizan las pruebas según su objetivo:",
      "en": "Test types categorize tests according to their objective:"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Pruebas Funcionales",
      "en": "Functional Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifican QUÉ hace el sistema (comportamiento funcional). Evalúan características, funciones y comportamiento del sistema.",
      "en": "Verify WHAT the system does (functional behavior). They evaluate features, functions and system behavior."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Prueba de funcionalidad",
        "en": "Functionality testing"
      },
      {
        "es": "Prueba de regresión",
        "en": "Regression testing"
      },
      {
        "es": "Prueba de humo (smoke/sanity)",
        "en": "Smoke testing (smoke/sanity)"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Pruebas No Funcionales",
      "en": "Non-Functional Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Verifican CÓMO se comporta el sistema. Cubren características de calidad que no son funciones específicas.",
      "en": "Verify HOW the system behaves. They cover quality characteristics that are not specific functions."
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
        "es": "Qué evalúa",
        "en": "What it evaluates"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Rendimiento/Carga",
            "en": "Performance/Load"
          },
          {
            "es": "Velocidad, escalabilidad bajo carga",
            "en": "Speed, scalability under load"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Seguridad",
            "en": "Security"
          },
          {
            "es": "Vulnerabilidades, acceso no autorizado",
            "en": "Vulnerabilities, unauthorized access"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Usabilidad",
            "en": "Usability"
          },
          {
            "es": "Facilidad de uso, experiencia de usuario",
            "en": "Ease of use, user experience"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Fiabilidad",
            "en": "Reliability"
          },
          {
            "es": "Disponibilidad, tolerancia a fallos",
            "en": "Availability, fault tolerance"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Compatibilidad",
            "en": "Compatibility"
          },
          {
            "es": "Interoperabilidad con otros sistemas",
            "en": "Interoperability with other systems"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Mantenibilidad",
            "en": "Maintainability"
          },
          {
            "es": "Facilidad de modificación",
            "en": "Ease of modification"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Pruebas de Caja Blanca",
      "en": "White-Box Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Basadas en la estructura interna del código. Se derivan de la implementación del software (sentencias, ramas, rutas).",
      "en": "Based on the internal structure of the code. Derived from software implementation (statements, branches, paths)."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Pruebas Relacionadas con Cambios",
      "en": "Change-Related Testing"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Confirmación: Verifica que un defecto corregido ya no falla",
        "en": "Confirmation: Verifies that a fixed defect no longer fails"
      },
      {
        "es": "Regresión: Verifica que los cambios no introdujeron nuevos defectos",
        "en": "Regression: Verifies that changes have not introduced new defects"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen: Distingue entre pruebas funcionales (QUÉ hace el sistema) y no funcionales (CÓMO lo hace).",
      "en": "⚠️ For the exam: Distinguish between functional tests (WHAT the system does) and non-functional tests (HOW it does it)."
    }
  }
],
};

const L_2_4: LessonContent = {
  id: "istqb-l2-4",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué son las pruebas de mantenimiento?",
      "en": "What is maintenance testing?"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las pruebas de mantenimiento se realizan sobre un sistema ya operativo cuando se producen cambios, migraciones o retiradas del software. A diferencia de otros niveles de prueba, no se inician desde cero: el sistema ya existe y funciona en producción.",
      "en": "Maintenance testing is performed on an already operational system when changes, migrations or retirements occur. Unlike other test levels, it doesn't start from scratch: the system already exists and runs in production."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Clave: Las pruebas de mantenimiento siempre tienen un desencadenante (trigger) que las activa: una modificación, una migración o una retirada del sistema.",
      "en": "💡 Key point: Maintenance testing always has a trigger that activates it: a modification, migration or retirement of the system."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Tipos de cambios que desencadenan pruebas de mantenimiento",
      "en": "Types of changes that trigger maintenance testing"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Tipo de cambio",
        "en": "Change type"
      },
      {
        "es": "Descripción",
        "en": "Description"
      },
      {
        "es": "Ejemplo",
        "en": "Example"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Correctivo",
            "en": "Corrective"
          },
          {
            "es": "Corrección de defectos encontrados en producción",
            "en": "Fixing defects found in production"
          },
          {
            "es": "Fix de un bug reportado por un cliente",
            "en": "Bug fix reported by a customer"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Adaptativo",
            "en": "Adaptive"
          },
          {
            "es": "Adaptación a cambios en el entorno",
            "en": "Adapting to environment changes"
          },
          {
            "es": "Migrar de Java 8 a Java 17",
            "en": "Migrating from Java 8 to Java 17"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Perfectivo",
            "en": "Perfective"
          },
          {
            "es": "Mejoras de rendimiento o usabilidad",
            "en": "Performance or usability improvements"
          },
          {
            "es": "Optimizar una consulta SQL lenta",
            "en": "Optimizing a slow SQL query"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Migración",
            "en": "Migration"
          },
          {
            "es": "Mover datos o sistema a nueva plataforma",
            "en": "Moving data or system to a new platform"
          },
          {
            "es": "Migrar de base de datos on-premise a la nube",
            "en": "Migrating from on-premise to cloud database"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Retirada",
            "en": "Retirement"
          },
          {
            "es": "Retirar el sistema del servicio",
            "en": "Taking the system out of service"
          },
          {
            "es": "Verificar que los datos migrados son correctos antes de apagar el sistema antiguo",
            "en": "Verifying migrated data is correct before shutting down the old system"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Análisis de impacto (Impact Analysis)",
      "en": "Impact Analysis"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Antes de ejecutar pruebas de mantenimiento se realiza un análisis de impacto para:",
      "en": "Before executing maintenance tests, an impact analysis is performed to:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Identificar qué partes del sistema pueden verse afectadas por el cambio",
        "en": "Identify which parts of the system may be affected by the change"
      },
      {
        "es": "Determinar el alcance de las pruebas de regresión necesarias",
        "en": "Determine the scope of regression testing needed"
      },
      {
        "es": "Estimar el coste y riesgo del cambio",
        "en": "Estimate the cost and risk of the change"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Dificultad del análisis de impacto: Si la documentación del sistema está desactualizada o no existe, identificar las áreas afectadas se vuelve muy difícil. Esto aumenta el riesgo de que cambios aparentemente pequeños rompan funcionalidades inesperadas.",
      "en": "⚠️ Impact analysis difficulty: If system documentation is outdated or missing, identifying affected areas becomes very difficult. This increases the risk that apparently small changes break unexpected functionality."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Pruebas de regresión en el mantenimiento",
      "en": "Regression testing in maintenance"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Después de cualquier cambio se ejecutan pruebas de regresión para confirmar que las modificaciones no han introducido nuevos defectos en partes del sistema que antes funcionaban correctamente.",
      "en": "After any change, regression tests are executed to confirm that modifications haven't introduced new defects in parts of the system that previously worked correctly."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo real: Una empresa actualiza su módulo de cálculo de impuestos. El análisis de impacto identifica que los módulos de facturación, informes y exportación a contabilidad dependen de ese cálculo. Se ejecutan pruebas de regresión sobre esos tres módulos además de los tests específicos del nuevo cálculo.",
      "en": "📌 Real example: A company updates its tax calculation module. Impact analysis identifies that the billing, reporting and accounting export modules depend on that calculation. Regression tests are run on those three modules in addition to specific tests for the new calculation."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Relación con la gestión de configuración",
      "en": "Relationship with configuration management"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las pruebas de mantenimiento dependen de una buena gestión de configuración: necesitas saber exactamente qué versión del sistema está en producción y qué artefactos han cambiado para poder enfocar las pruebas correctamente.",
      "en": "Maintenance testing depends on good configuration management: you need to know exactly which version of the system is in production and which artifacts have changed to properly focus the tests."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Para el examen: Recuerda los tres desencadenantes principales: modificación, migración y retirada. Y que el análisis de impacto precede siempre a las pruebas de mantenimiento.",
      "en": "💡 For the exam: Remember the three main triggers: modification, migration and retirement. And that impact analysis always precedes maintenance testing."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-9",
    "front": {
      "es": "¿Cuáles son los 4 niveles de prueba del ISTQB?",
      "en": "What are the 4 ISTQB test levels?"
    },
    "back": {
      "es": "1. Prueba de Componente (Unitaria), 2. Prueba de Integración de Componentes, 3. Prueba de Sistema, 4. Prueba de Aceptación (UAT).",
      "en": "1. Component (Unit) Testing, 2. Component Integration Testing, 3. System Testing, 4. Acceptance Testing (UAT)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-10",
    "front": {
      "es": "¿Qué es el testing funcional vs. no funcional?",
      "en": "What is functional vs. non-functional testing?"
    },
    "back": {
      "es": "Funcional: verifica QUÉ hace el sistema (comportamiento). No funcional: verifica CÓMO se comporta el sistema (rendimiento, usabilidad, seguridad, fiabilidad).",
      "en": "Functional: verifies WHAT the system does (behavior). Non-functional: verifies HOW the system behaves (performance, usability, security, reliability)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-11",
    "front": {
      "es": "¿Qué es el testing de regresión y por qué es importante?",
      "en": "What is regression testing and why is it important?"
    },
    "back": {
      "es": "Pruebas que verifican que los cambios en el código no han introducido nuevos defectos en partes que antes funcionaban correctamente. Fundamental en el mantenimiento y las integraciones continuas.",
      "en": "Tests that verify that code changes have not introduced new defects in parts that previously worked correctly. Fundamental in maintenance and continuous integration."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-12",
    "front": {
      "es": "¿Cuál es la diferencia entre testing Alpha y Beta?",
      "en": "What is the difference between Alpha and Beta testing?"
    },
    "back": {
      "es": "Alpha: realizado por usuarios en el sitio del desarrollador, antes de la entrega al cliente. Beta: realizado por usuarios en su propio entorno, antes del lanzamiento general.",
      "en": "Alpha: performed by users at the developer's site, before delivery to the customer. Beta: performed by users in their own environment, before general release."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_2_1, L_2_2, L_2_3, L_2_4];
}
