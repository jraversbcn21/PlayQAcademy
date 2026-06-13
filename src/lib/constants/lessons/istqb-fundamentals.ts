/**
 * Fundamentals of Testing — ISTQB CTFL v4.0, Chapter 1
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-fundamentals";

const L_1_1: LessonContent = {
  id: "istqb-l1-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Definición del Testing de Software",
      "en": "Definition of Software Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing de software es un conjunto de actividades para descubrir defectos y evaluar la calidad de artefactos de software. Estas actividades se planifican y controlan, y el resultado es un nivel de confianza sobre la calidad del software.",
      "en": "Software testing is a set of activities to discover defects and evaluate the quality of software artifacts. These activities are planned and controlled, and the result is a level of confidence about software quality."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Objetivo principal: El testing no solo busca defectos, también evalúa la calidad del producto y proporciona información para la toma de decisiones.",
      "en": "💡 Main objective: Testing not only looks for defects, it also evaluates product quality and provides information for decision-making."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testing vs Depuración (Debugging)",
      "en": "Testing vs Debugging"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Es fundamental distinguir entre ambos conceptos:",
      "en": "It is fundamental to distinguish between both concepts:"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Testing",
        "en": "Testing"
      },
      {
        "es": "Depuración",
        "en": "Debugging"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Detecta síntomas (fallos)",
            "en": "Detects symptoms (failures)"
          },
          {
            "es": "Encuentra y corrige la causa raíz (defecto)",
            "en": "Finds and fixes root cause (defect)"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Realizado por testers",
            "en": "Done by testers"
          },
          {
            "es": "Realizado por desarrolladores",
            "en": "Done by developers"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Activo (busca problemas)",
            "en": "Active (searches for problems)"
          },
          {
            "es": "Reactivo (responde a problemas encontrados)",
            "en": "Reactive (responds to found problems)"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Puede ser estático o dinámico",
            "en": "Can be static or dynamic"
          },
          {
            "es": "Siempre dinámico (ejecuta el código)",
            "en": "Always dynamic (executes code)"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Objetivos del Testing",
      "en": "Testing Objectives"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Evaluar productos de trabajo (requisitos, historias de usuario, diseño, código)",
        "en": "Evaluate work products (requirements, user stories, design, code)"
      },
      {
        "es": "Verificar si se cumplen los requisitos",
        "en": "Verify that specified requirements have been fulfilled"
      },
      {
        "es": "Validar que el objeto de prueba funciona como esperan los interesados",
        "en": "Validate that the test object works as stakeholders expect"
      },
      {
        "es": "Construir confianza en el nivel de calidad",
        "en": "Build confidence in the level of quality"
      },
      {
        "es": "Encontrar defectos y fallos para reducir el nivel de riesgo",
        "en": "Find defects and failures to reduce risk level"
      },
      {
        "es": "Proporcionar información a los interesados para la toma de decisiones",
        "en": "Provide information to stakeholders for decision-making"
      },
      {
        "es": "Cumplir requisitos contractuales, legales o regulatorios",
        "en": "Comply with contractual, legal or regulatory requirements"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: En un proyecto ágil, el testing puede verificar que una historia de usuario (\"Como usuario, quiero restablecer mi contraseña\") funciona correctamente antes de que se considere \"done\".",
      "en": "📌 Example: In an agile project, testing can verify that a user story (\"As a user, I want to reset my password\") works correctly before it is considered \"done\"."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testing dinámico y estático",
      "en": "Dynamic and Static Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Testing dinámico: Requiere la ejecución del software (pruebas de funcionalidad, rendimiento, etc.).",
      "en": "Dynamic testing: Requires software execution (functionality, performance tests, etc.)."
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Testing estático: No requiere ejecución del software (revisiones de código, análisis estático, revisiones de documentos).",
      "en": "Static testing: Does not require software execution (code reviews, static analysis, document reviews)."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Verificación vs Validación",
      "en": "Verification vs Validation"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Verificación: ¿Estamos construyendo el producto correctamente? (cumple especificaciones)",
        "en": "Verification: Are we building the product correctly? (meets specifications)"
      },
      {
        "es": "Validación: ¿Estamos construyendo el producto correcto? (satisface necesidades del usuario)",
        "en": "Validation: Are we building the right product? (satisfies user needs)"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Importante para el examen: El testing NO puede probar que no hay defectos. Solo puede detectar fallos y reducir la probabilidad de problemas en producción.",
      "en": "⚠️ Important for the exam: Testing CANNOT prove the absence of defects. It can only detect failures and reduce the probability of problems in production."
    }
  }
],
};

const L_1_2: LessonContent = {
  id: "istqb-l1-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Causas de los defectos de software",
      "en": "Root Causes of Software Defects"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Los defectos de software ocurren porque los seres humanos cometen errores. La terminología clave es:",
      "en": "Software defects occur because humans make mistakes. The key terminology is:"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Término",
        "en": "Term"
      },
      {
        "es": "Definición",
        "en": "Definition"
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
            "es": "Error / Mistake",
            "en": "Error / Mistake"
          },
          {
            "es": "Acción humana que produce un resultado incorrecto",
            "en": "Human action that produces an incorrect result"
          },
          {
            "es": "Un programador malinterpreta un requisito",
            "en": "A programmer misunderstands a requirement"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Defecto / Bug / Fault",
            "en": "Defect / Bug / Fault"
          },
          {
            "es": "Imperfección en un producto de trabajo",
            "en": "Imperfection in a work product"
          },
          {
            "es": "El código tiene una condición incorrecta",
            "en": "The code has an incorrect condition"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Fallo / Failure",
            "en": "Failure"
          },
          {
            "es": "El componente no realiza la función requerida",
            "en": "The component fails to perform the required function"
          },
          {
            "es": "El sistema calcula mal el total de una compra",
            "en": "The system miscalculates a purchase total"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Causa raíz",
            "en": "Root cause"
          },
          {
            "es": "La razón fundamental que originó el defecto",
            "en": "The fundamental reason that originated the defect"
          },
          {
            "es": "Falta de comunicación en los requisitos",
            "en": "Lack of communication in requirements"
          }
        ]
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "🔗 Cadena de causalidad: Error → Defecto → Fallo\n  \nUn error de un humano introduce un defecto en el código. Si ese código se ejecuta, puede producir un fallo.",
      "en": "🔗 Causality chain: Error → Defect → Failure\n  \nA human error introduces a defect in the code. If that code is executed, it may produce a failure."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Por qué ocurren los fallos?",
      "en": "Why do failures occur?"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Errores humanos al diseñar, codificar o documentar",
        "en": "Human errors when designing, coding or documenting"
      },
      {
        "es": "Presión de tiempo que fuerza atajos",
        "en": "Time pressure that forces shortcuts"
      },
      {
        "es": "Complejidad del código o infraestructura",
        "en": "Code or infrastructure complexity"
      },
      {
        "es": "Malentendidos sobre interfaces o interacciones del sistema",
        "en": "Misunderstandings about system interfaces or interactions"
      },
      {
        "es": "Condiciones ambientales (radiación, contaminación, campos electromagnéticos)",
        "en": "Environmental conditions (radiation, pollution, electromagnetic fields)"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "El rol del testing en el desarrollo",
      "en": "The role of testing in development"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing es importante porque contribuye al éxito del software:",
      "en": "Testing is important because it contributes to software success:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Reducción de riesgo de defectos en producción",
        "en": "Risk reduction of defects in production"
      },
      {
        "es": "Cumplimiento de requisitos contractuales y normativos",
        "en": "Compliance with contractual and regulatory requirements"
      },
      {
        "es": "Confianza de los usuarios y clientes en el producto",
        "en": "User and customer confidence in the product"
      },
      {
        "es": "Detección temprana reduce el costo de corrección",
        "en": "Early detection reduces correction cost"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Costo de los defectos: Cuanto más tarde se descubre un defecto, más caro resulta corregirlo. Un defecto en producción puede costar 100x más que uno encontrado en los requisitos.",
      "en": "⚠️ Cost of defects: The later a defect is discovered, the more expensive it is to fix. A defect in production can cost 100x more than one found in requirements."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Aseguramiento de Calidad (QA) vs Testing",
      "en": "Quality Assurance (QA) vs Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "QA (Quality Assurance): Se enfoca en los procesos para prevenir defectos. Es preventivo y proactivo.",
      "en": "QA (Quality Assurance): Focuses on processes to prevent defects. It is preventive and proactive."
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Testing / QC (Quality Control): Se enfoca en el producto para detectar defectos. Es reactivo y correctivo.",
      "en": "Testing / QC (Quality Control): Focuses on the product to detect defects. It is reactive and corrective."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo QA vs QC:\n  \nQA: Implementar revisiones de código obligatorias en el proceso de desarrollo.\n  \nQC: Ejecutar pruebas para encontrar defectos en la aplicación antes de su lanzamiento.",
      "en": "📌 QA vs QC example:\n  \nQA: Implement mandatory code reviews in the development process.\n  \nQC: Execute tests to find defects in the application before release."
    }
  }
],
};

const L_1_3: LessonContent = {
  id: "istqb-l1-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Los 7 Principios Fundamentales",
      "en": "The 7 Fundamental Principles"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Estos principios son la base de la filosofía del testing moderno y son ampliamente examinados en el ISTQB.",
      "en": "These principles form the foundation of modern testing philosophy and are widely tested in ISTQB exams."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "🎯 Tip de examen: Debes conocer los 7 principios y ser capaz de identificar cuál aplica en un escenario dado.",
      "en": "🎯 Exam tip: You must know all 7 principles and be able to identify which one applies in a given scenario."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 1: El testing muestra la presencia de defectos, no su ausencia",
      "en": "Principle 1: Testing shows presence of defects, not their absence"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing puede mostrar que los defectos están presentes en el objeto de prueba, pero no puede probar que no hay defectos. El testing reduce la probabilidad de que permanezcan defectos sin descubrir, pero incluso si no se encuentran defectos, el testing no es una prueba de corrección.",
      "en": "Testing can show that defects are present in the test object, but cannot prove there are no defects. Testing reduces the probability of undiscovered defects remaining, but even if no defects are found, testing is not a proof of correctness."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 2: El testing exhaustivo es imposible",
      "en": "Principle 2: Exhaustive testing is impossible"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "No es posible probar todas las combinaciones de entradas y precondiciones (excepto en casos triviales). En lugar del testing exhaustivo, se utilizan técnicas de testing, priorización de casos de prueba y testing basado en riesgos para enfocar los esfuerzos.",
      "en": "It is not possible to test all combinations of inputs and preconditions (except in trivial cases). Instead of exhaustive testing, test techniques, test case prioritization and risk-based testing are used to focus efforts."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: Un campo de texto que acepta hasta 50 caracteres con letras, números y símbolos tendría millones de combinaciones posibles. Es imposible probarlas todas.",
      "en": "📌 Example: A text field accepting up to 50 characters with letters, numbers and symbols would have millions of possible combinations. It is impossible to test them all."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 3: El testing temprano ahorra tiempo y dinero",
      "en": "Principle 3: Early testing saves time and money"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Cuanto antes se comience el testing en el SDLC, más económico será corregir los defectos. El \"shift-left\" implica comenzar el testing tan pronto como sea posible (ej: revisar requisitos antes de que se desarrolle el código).",
      "en": "The earlier testing begins in the SDLC, the more economical it is to fix defects. \"Shift-left\" means starting testing as early as possible (e.g., reviewing requirements before code is developed)."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 4: Los defectos se agrupan (clustering)",
      "en": "Principle 4: Defects cluster together"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Generalmente, un pequeño número de módulos contiene la mayoría de los defectos descubiertos durante el testing previo a la entrega, o muestra la mayor parte de los fallos operacionales. Este fenómeno se denomina clustering de defectos.",
      "en": "Generally, a small number of modules contain most of the defects discovered during pre-delivery testing, or show most of the operational failures. This phenomenon is called defect clustering."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "📊 Regla 80-20: Aproximadamente el 80% de los defectos se encuentran en el 20% del código.",
      "en": "📊 80-20 Rule: Approximately 80% of defects are found in 20% of the code."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 5: Los tests se desgastan (paradoja del pesticida)",
      "en": "Principle 5: Tests wear out (Pesticide paradox)"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Si se repiten las mismas pruebas una y otra vez, eventualmente estas dejarán de encontrar nuevos defectos. Para superar esta \"paradoja del pesticida\", los casos de prueba deben revisarse y actualizarse regularmente, y se deben escribir nuevos casos de prueba.",
      "en": "If the same tests are repeated over and over, they will eventually stop finding new defects. To overcome this \"pesticide paradox\", test cases must be regularly reviewed and updated, and new test cases must be written."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 6: El testing depende del contexto",
      "en": "Principle 6: Testing is context dependent"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testing se hace de forma diferente en distintos contextos. Por ejemplo, el software de seguridad crítica se prueba de manera diferente a una aplicación de comercio electrónico. Diferentes metodologías, técnicas y tipos de prueba se aplican según el contexto.",
      "en": "Testing is done differently in different contexts. For example, safety-critical software is tested differently from an e-commerce application. Different methodologies, techniques and test types are applied depending on the context."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Principio 7: La falacia de la ausencia de defectos",
      "en": "Principle 7: The absence-of-defects fallacy"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Es un error suponer que la verificación de un sistema es todo lo que se necesita para asegurar el éxito de un sistema. Corregir completamente todos los defectos no ayudará si el sistema construido es inutilizable y no cumple con las necesidades y expectativas de los usuarios.",
      "en": "It is a mistake to assume that verifying a system is all that is needed to ensure system success. Completely fixing all defects will not help if the built system is unusable and does not meet user needs and expectations."
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "#",
        "en": "#"
      },
      {
        "es": "Principio",
        "en": "Principle"
      },
      {
        "es": "Clave",
        "en": "Key"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "1",
            "en": "1"
          },
          {
            "es": "Testing muestra presencia, no ausencia",
            "en": "Testing shows presence, not absence"
          },
          {
            "es": "No prueba corrección",
            "en": "Does not prove correctness"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "2",
            "en": "2"
          },
          {
            "es": "Testing exhaustivo es imposible",
            "en": "Exhaustive testing is impossible"
          },
          {
            "es": "Priorización y riesgo",
            "en": "Prioritization and risk"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "3",
            "en": "3"
          },
          {
            "es": "Testing temprano ahorra dinero",
            "en": "Early testing saves money"
          },
          {
            "es": "Shift-left",
            "en": "Shift-left"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "4",
            "en": "4"
          },
          {
            "es": "Los defectos se agrupan",
            "en": "Defects cluster together"
          },
          {
            "es": "Clustering / 80-20",
            "en": "Clustering / 80-20"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "5",
            "en": "5"
          },
          {
            "es": "Los tests se desgastan",
            "en": "Tests wear out"
          },
          {
            "es": "Paradoja del pesticida",
            "en": "Pesticide paradox"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "6",
            "en": "6"
          },
          {
            "es": "Depende del contexto",
            "en": "Context dependent"
          },
          {
            "es": "No hay recetas únicas",
            "en": "No one-size-fits-all"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "7",
            "en": "7"
          },
          {
            "es": "Falacia de ausencia de defectos",
            "en": "Absence-of-defects fallacy"
          },
          {
            "es": "Validación es esencial",
            "en": "Validation is essential"
          }
        ]
      }
    ]
  }
],
};

const L_1_4: LessonContent = {
  id: "istqb-l1-4",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Actividades del proceso de prueba",
      "en": "Test Process Activities"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El proceso de prueba incluye las siguientes actividades principales:",
      "en": "The test process includes the following main activities:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Planificación de pruebas: Definir objetivos, enfoque y recursos.",
        "en": "Test planning: Define objectives, approach and resources."
      },
      {
        "es": "Seguimiento y control: Comparar progreso real vs plan.",
        "en": "Test monitoring and control: Compare actual progress against plan."
      },
      {
        "es": "Análisis de pruebas: ¿Qué probar? Identificar condiciones de prueba.",
        "en": "Test analysis: What to test? Identify test conditions."
      },
      {
        "es": "Diseño de pruebas: ¿Cómo probar? Diseñar casos de prueba de alto nivel.",
        "en": "Test design: How to test? Design high-level test cases."
      },
      {
        "es": "Implementación de pruebas: Crear scripts, datos y entorno.",
        "en": "Test implementation: Create scripts, data and environment."
      },
      {
        "es": "Ejecución de pruebas: Ejecutar pruebas y comparar resultados.",
        "en": "Test execution: Run tests and compare results."
      },
      {
        "es": "Completitud de pruebas: Verificar criterios de salida, reportar, archivar.",
        "en": "Test completion: Verify exit criteria, report, archive."
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testware",
      "en": "Testware"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El testware es el conjunto de artefactos producidos durante el proceso de prueba:",
      "en": "Testware is the set of artifacts produced during the test process:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Plan de pruebas, calendario de pruebas",
        "en": "Test plan, test schedule"
      },
      {
        "es": "Condiciones de prueba, casos de prueba, scripts de prueba",
        "en": "Test conditions, test cases, test scripts"
      },
      {
        "es": "Datos de prueba, entorno de prueba",
        "en": "Test data, test environment"
      },
      {
        "es": "Informe de defectos, informe de pruebas",
        "en": "Defect report, test report"
      },
      {
        "es": "Registros de ejecución de pruebas",
        "en": "Test execution logs"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Roles en el testing",
      "en": "Roles in Testing"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Rol",
        "en": "Role"
      },
      {
        "es": "Responsabilidad",
        "en": "Responsibility"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Test Manager",
            "en": "Test Manager"
          },
          {
            "es": "Planificación, monitoreo, gestión general del testing",
            "en": "Planning, monitoring, overall test management"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Tester",
            "en": "Tester"
          },
          {
            "es": "Análisis, diseño, implementación y ejecución de pruebas",
            "en": "Analysis, design, implementation and test execution"
          }
        ]
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Trazabilidad",
      "en": "Traceability"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "La trazabilidad es la capacidad de relacionar los productos de trabajo de testing (casos de prueba, defectos) con los requisitos y demás artefactos del proyecto. Permite determinar el impacto de los cambios.",
      "en": "Traceability is the ability to relate test work products (test cases, defects) to requirements and other project artifacts. It allows determining the impact of changes."
    }
  }
],
};

const L_1_5: LessonContent = {
  id: "istqb-l1-5",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Habilidades del Tester",
      "en": "Tester Skills"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Un buen tester necesita una combinación de habilidades técnicas y no técnicas:",
      "en": "A good tester needs a combination of technical and non-technical skills:"
    }
  },
  {
    "type": "heading",
    "level": 3,
    "content": {
      "es": "Habilidades técnicas",
      "en": "Technical Skills"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Conocimiento de técnicas de testing",
        "en": "Knowledge of testing techniques"
      },
      {
        "es": "Comprensión del software a probar",
        "en": "Understanding of the software being tested"
      },
      {
        "es": "Uso de herramientas de testing",
        "en": "Use of testing tools"
      },
      {
        "es": "Capacidad de análisis y diseño de pruebas",
        "en": "Ability to analyze and design tests"
      },
      {
        "es": "Programación (especialmente para testing de componentes y automatización)",
        "en": "Programming (especially for component testing and automation)"
      }
    ]
  },
  {
    "type": "heading",
    "level": 3,
    "content": {
      "es": "Habilidades no técnicas",
      "en": "Non-Technical Skills"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Curiosidad y pensamiento crítico",
        "en": "Curiosity and critical thinking"
      },
      {
        "es": "Atención al detalle",
        "en": "Attention to detail"
      },
      {
        "es": "Comunicación efectiva",
        "en": "Effective communication"
      },
      {
        "es": "Pensamiento analítico y sistemático",
        "en": "Analytical and systematic thinking"
      },
      {
        "es": "Trabajo en equipo y colaboración",
        "en": "Teamwork and collaboration"
      },
      {
        "es": "Pensamiento independiente (para cuestionar supuestos)",
        "en": "Independent thinking (to question assumptions)"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Mentalidad del tester: Los testers deben ser capaces de pensar de forma diferente a los desarrolladores — buscando cómo el sistema puede fallar, en lugar de cómo funciona correctamente.",
      "en": "💡 Tester mindset: Testers should be able to think differently from developers — looking for how the system can fail, rather than how it works correctly."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Independencia del Testing",
      "en": "Testing Independence"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El nivel de independencia del tester influye en la efectividad del testing:",
      "en": "The level of tester independence influences testing effectiveness:"
    }
  },
  {
    "type": "table",
    "headers": [
      {
        "es": "Nivel",
        "en": "Level"
      },
      {
        "es": "Descripción",
        "en": "Description"
      },
      {
        "es": "Ventaja",
        "en": "Advantage"
      }
    ],
    "rows": [
      {
        "cells": [
          {
            "es": "Sin independencia",
            "en": "No independence"
          },
          {
            "es": "El desarrollador prueba su propio código",
            "en": "The developer tests their own code"
          },
          {
            "es": "Conoce bien el código",
            "en": "Knows the code well"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Independencia interna",
            "en": "Internal independence"
          },
          {
            "es": "Tester del mismo equipo",
            "en": "Tester from the same team"
          },
          {
            "es": "Mayor objetividad",
            "en": "Greater objectivity"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Independencia de equipo",
            "en": "Team independence"
          },
          {
            "es": "Equipo de QA separado",
            "en": "Separate QA team"
          },
          {
            "es": "Perspectiva externa",
            "en": "External perspective"
          }
        ]
      },
      {
        "cells": [
          {
            "es": "Total independencia",
            "en": "Total independence"
          },
          {
            "es": "Organización externa",
            "en": "External organization"
          },
          {
            "es": "Máxima objetividad",
            "en": "Maximum objectivity"
          }
        ]
      }
    ]
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Importante: Mayor independencia no siempre es mejor — puede introducir problemas de comunicación y falta de conocimiento del dominio.",
      "en": "⚠️ Important: Greater independence is not always better — it can introduce communication problems and lack of domain knowledge."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-1",
    "front": {
      "es": "¿Cuál es la diferencia entre un ERROR, un DEFECTO y un FALLO?",
      "en": "What is the difference between an ERROR, a DEFECT, and a FAILURE?"
    },
    "back": {
      "es": "Error: acción humana incorrecta. Defecto (bug): resultado de ese error en el código. Fallo: comportamiento incorrecto del sistema al ejecutarse el defecto.",
      "en": "Error: incorrect human action. Defect (bug): result of that error in the code. Failure: incorrect system behavior when the defect is executed."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-2",
    "front": {
      "es": "¿Qué dice el Principio 1 del testing?",
      "en": "What does Testing Principle 1 state?"
    },
    "back": {
      "es": "El testing muestra la PRESENCIA de defectos, no su AUSENCIA. No se puede probar que el software no tiene defectos.",
      "en": "Testing shows the PRESENCE of defects, not their ABSENCE. You cannot prove software has no defects."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-3",
    "front": {
      "es": "¿Qué es la 'Paradoja del Pesticida'?",
      "en": "What is the 'Pesticide Paradox'?"
    },
    "back": {
      "es": "Principio 5: Si se repiten las mismas pruebas, eventualmente dejarán de encontrar nuevos defectos. Los tests deben actualizarse y revisarse periódicamente.",
      "en": "Principle 5: If the same tests are repeated, they will eventually stop finding new defects. Tests must be updated and revised periodically."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-4",
    "front": {
      "es": "¿Cuál es la diferencia entre VERIFICACIÓN y VALIDACIÓN?",
      "en": "What is the difference between VERIFICATION and VALIDATION?"
    },
    "back": {
      "es": "Verificación: ¿Estamos construyendo el producto CORRECTAMENTE? (cumple especificaciones). Validación: ¿Estamos construyendo el producto CORRECTO? (satisface necesidades reales).",
      "en": "Verification: Are we building the product CORRECTLY? (meets specs). Validation: Are we building the RIGHT product? (meets real needs)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-5",
    "front": {
      "es": "¿Qué es el 'testing exhaustivo' y por qué es imposible?",
      "en": "What is 'exhaustive testing' and why is it impossible?"
    },
    "back": {
      "es": "Testing exhaustivo = probar todas las combinaciones de entradas. Es imposible porque el número de combinaciones es astronomicamente grande para cualquier software no trivial. (Principio 2)",
      "en": "Exhaustive testing = testing all input combinations. Impossible because the number of combinations is astronomically large for any non-trivial software. (Principle 2)"
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-6",
    "front": {
      "es": "¿Qué significa 'Shift-Left' en testing?",
      "en": "What does 'Shift-Left' mean in testing?"
    },
    "back": {
      "es": "Iniciar el testing lo antes posible en el SDLC, incluyendo revisión de requisitos y diseño antes de que exista código. Reduce costos y detecta defectos temprano (Principio 3).",
      "en": "Starting testing as early as possible in the SDLC, including reviewing requirements and design before code exists. Reduces costs and detects defects early (Principle 3)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-7",
    "front": {
      "es": "¿Qué es la 'Falacia de Ausencia de Defectos'?",
      "en": "What is the 'Absence-of-Defects Fallacy'?"
    },
    "back": {
      "es": "Principio 7: Asumir que encontrar y corregir todos los defectos garantiza el éxito. Error: el sistema puede estar libre de defectos pero ser inútil si no satisface las necesidades del usuario.",
      "en": "Principle 7: Assuming that finding and fixing all defects guarantees success. Wrong: the system can be defect-free but useless if it doesn't meet user needs."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-8",
    "front": {
      "es": "¿Cuáles son los dos roles principales en el proceso de testing?",
      "en": "What are the two main roles in the testing process?"
    },
    "back": {
      "es": "1. Test Manager: planifica, monitorea y gestiona el proceso de prueba. 2. Tester: analiza, diseña, implementa y ejecuta las pruebas.",
      "en": "1. Test Manager: plans, monitors and manages the test process. 2. Tester: analyzes, designs, implements and executes tests."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_1_1, L_1_2, L_1_3, L_1_4, L_1_5];
}
