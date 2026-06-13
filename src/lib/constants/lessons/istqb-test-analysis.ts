/**
 * Test Analysis and Design — ISTQB CTFL v4.0, Chapter 4
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-test-analysis";

const L_4_1: LessonContent = {
  id: "istqb-l4-1",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Categorías de Técnicas de Prueba",
      "en": "Test Design Technique Categories"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las técnicas de diseño de pruebas se clasifican en tres grandes categorías:",
      "en": "Test design techniques are classified into three main categories:"
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "🎯 Resumen clave para el examen:\n  \n    Caja Negra: Basadas en la especificación (qué hace el sistema)\n    Caja Blanca: Basadas en la estructura interna (cómo lo hace)\n    Experiencia: Basadas en el conocimiento del tester",
      "en": "🎯 Key summary for the exam:\n  \n    Black-Box: Specification-based (what the system does)\n    White-Box: Structure-based (how it does it)\n    Experience-based: Based on tester knowledge"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas de Caja Negra (Black-Box)",
      "en": "Black-Box Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "No requieren conocimiento del código interno. Se basan en las especificaciones:",
      "en": "Do not require internal code knowledge. Based on specifications:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Partición de Equivalencia (EP)",
        "en": "Equivalence Partitioning (EP)"
      },
      {
        "es": "Análisis de Valor Límite (BVA)",
        "en": "Boundary Value Analysis (BVA)"
      },
      {
        "es": "Tablas de Decisión",
        "en": "Decision Tables"
      },
      {
        "es": "Prueba de Transición de Estado",
        "en": "State Transition Testing"
      },
      {
        "es": "Prueba de Caso de Uso",
        "en": "Use Case Testing"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas de Caja Blanca (White-Box)",
      "en": "White-Box Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Requieren acceso al código fuente. Miden la cobertura del código:",
      "en": "Require access to source code. Measure code coverage:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Cobertura de Sentencia (Statement Coverage)",
        "en": "Statement Coverage"
      },
      {
        "es": "Cobertura de Rama (Branch Coverage)",
        "en": "Branch Coverage"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas Basadas en Experiencia",
      "en": "Experience-Based Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Se basan en el conocimiento, intuición y experiencia del tester:",
      "en": "Based on tester knowledge, intuition and experience:"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Error Guessing (Adivinanza de Errores)",
        "en": "Error Guessing"
      },
      {
        "es": "Testing Exploratorio",
        "en": "Exploratory Testing"
      },
      {
        "es": "Testing basado en Checklists",
        "en": "Checklist-based Testing"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas Basadas en Colaboración (CTFL 4.0)",
      "en": "Collaboration-Based Techniques (CTFL 4.0)"
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Escritura colaborativa de historias de usuario",
        "en": "Collaborative user story writing"
      },
      {
        "es": "ATDD (Acceptance Test-Driven Development)",
        "en": "ATDD (Acceptance Test-Driven Development)"
      }
    ]
  }
],
};

const L_4_2: LessonContent = {
  id: "istqb-l4-2",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "¿Qué son las técnicas de caja negra?",
      "en": "What are black-box techniques?"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las técnicas de caja negra (black-box) se basan en la especificación del objeto de prueba. No se accede al código fuente; solo se evalúan entradas y salidas.",
      "en": "Black-box techniques are based on the specification of the test object. Source code is not accessed; only inputs and outputs are evaluated."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "1. Partición de Equivalencia (EP)",
      "en": "1. Equivalence Partitioning (EP)"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Divide los datos en particiones donde todos los valores se comportan de la misma manera. Se prueba un valor representativo de cada partición.",
      "en": "Divides data into partitions where all values behave the same way. One representative value per partition is tested."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: Un campo acepta edades de 18 a 65 años.\n  \n• Partición válida: 18-65 (ej: probar con 30)\n  \n• Partición inválida 1: menor a 18 (ej: probar con 10)\n  \n• Partición inválida 2: mayor a 65 (ej: probar con 70)",
      "en": "📌 Example: A field accepts ages from 18 to 65 years.\n  \n• Valid partition: 18-65 (e.g., test with 30)\n  \n• Invalid partition 1: less than 18 (e.g., test with 10)\n  \n• Invalid partition 2: greater than 65 (e.g., test with 70)"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "2. Análisis de Valor Límite (BVA)",
      "en": "2. Boundary Value Analysis (BVA)"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Se enfoca en los valores en los límites de las particiones, donde es más probable que haya defectos.",
      "en": "Focuses on values at partition boundaries, where defects are most likely to occur."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo (BVA 2 valores): Para el rango 18-65:\n  \n• Límites: 17, 18, 65, 66\n  \nEjemplo (BVA 3 valores): 17, 18, 19, 64, 65, 66",
      "en": "📌 Example (BVA 2 values): For range 18-65:\n  \n• Boundaries: 17, 18, 65, 66\n  \nExample (BVA 3 values): 17, 18, 19, 64, 65, 66"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "3. Tablas de Decisión",
      "en": "3. Decision Table Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Se utilizan para probar sistemas con combinaciones de condiciones (reglas de negocio). Cada columna representa una combinación posible de condiciones y sus resultados.",
      "en": "Used to test systems with combinations of conditions (business rules). Each column represents a possible combination of conditions and their outcomes."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Estructura:\n  \nCondiciones (filas superiores) × Acciones (filas inferiores) × Reglas (columnas)",
      "en": "📌 Structure:\n  \nConditions (top rows) × Actions (bottom rows) × Rules (columns)"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "4. Prueba de Transición de Estado",
      "en": "4. State Transition Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Se usa cuando el comportamiento del sistema depende del estado actual y del evento recibido. Se modela como un diagrama de estados.",
      "en": "Used when system behavior depends on the current state and received event. Modeled as a state diagram."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "Cobertura de todos los estados: cada estado se visita al menos una vez",
        "en": "Coverage of all states: each state is visited at least once"
      },
      {
        "es": "Cobertura de transiciones válidas: todas las transiciones válidas se ejercitan",
        "en": "Valid transition coverage: all valid transitions are exercised"
      },
      {
        "es": "Cobertura de transiciones inválidas: se prueban transiciones que no deberían ser posibles",
        "en": "Invalid transition coverage: transitions that should not be possible are tested"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: Un cajero ATM: estados = \"Esperando tarjeta\", \"Esperando PIN\", \"Menú principal\", \"Dispensando efectivo\".",
      "en": "📌 Example: An ATM: states = \"Waiting for card\", \"Waiting for PIN\", \"Main menu\", \"Dispensing cash\"."
    }
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen: Debes poder calcular el número de casos de prueba con EP y BVA, e identificar qué técnica aplicar en un escenario dado.",
      "en": "⚠️ For the exam: You must be able to calculate the number of test cases with EP and BVA, and identify which technique to apply in a given scenario."
    }
  }
],
};

const L_4_3: LessonContent = {
  id: "istqb-l4-3",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas de Caja Blanca",
      "en": "White-Box Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las técnicas de caja blanca (white-box o estructura-based) se basan en el análisis de la estructura interna del código. Requieren acceso al código fuente.",
      "en": "White-box (structure-based) techniques are based on analysis of the internal structure of the code. Require access to source code."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Cobertura de Sentencia (Statement Coverage)",
      "en": "Statement Coverage"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Mide el porcentaje de sentencias ejecutables que han sido ejecutadas por los casos de prueba.",
      "en": "Measures the percentage of executable statements that have been executed by test cases."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo:\n  \n  if (x > 0) {\n    y = x * 2;  // Sentencia 1\n  }\n  z = y + 1;    // Sentencia 2\n  \n  Si solo probamos con x=5, ejecutamos ambas sentencias → 100% statement coverage.\n  Si solo probamos con x=-1, solo ejecutamos la sentencia 2 → 50% statement coverage.",
      "en": "📌 Example:\n  \n  if (x > 0) {\n    y = x * 2;  // Statement 1\n  }\n  z = y + 1;    // Statement 2\n  \n  If we only test with x=5, we execute both statements → 100% statement coverage.\n  If we only test with x=-1, we only execute statement 2 → 50% statement coverage."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Cobertura de Rama (Branch Coverage)",
      "en": "Branch Coverage"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Mide el porcentaje de ramas del flujo de control ejecutadas. Para cada decisión (IF/SWITCH), tanto el camino verdadero como el falso deben ser probados.",
      "en": "Measures the percentage of control flow branches executed. For each decision (IF/SWITCH), both the true and false paths must be tested."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Branch Coverage ⊃ Statement Coverage:\n  \nSi alcanzamos 100% de branch coverage, también tenemos 100% de statement coverage.\n  \nPero 100% de statement coverage NO garantiza 100% de branch coverage.",
      "en": "💡 Branch Coverage ⊃ Statement Coverage:\n  \nIf we achieve 100% branch coverage, we also have 100% statement coverage.\n  \nBut 100% statement coverage does NOT guarantee 100% branch coverage."
    }
  },
  {
    "type": "callout",
    "variant": "warning",
    "content": {
      "es": "⚠️ Para el examen:\n  \n• Statement coverage = % de sentencias ejecutadas\n  \n• Branch coverage = % de ramas ejecutadas (más fuerte)\n  \n• 100% branch coverage implica 100% statement coverage (no viceversa)",
      "en": "⚠️ For the exam:\n  \n• Statement coverage = % of statements executed\n  \n• Branch coverage = % of branches executed (stronger)\n  \n• 100% branch coverage implies 100% statement coverage (not vice versa)"
    }
  }
],
};

const L_4_4: LessonContent = {
  id: "istqb-l4-4",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas Basadas en Experiencia",
      "en": "Experience-Based Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Estas técnicas se basan en el conocimiento, intuición y experiencia previa del tester. Son complementarias a las técnicas sistemáticas.",
      "en": "These techniques are based on the tester's knowledge, intuition and previous experience. They are complementary to systematic techniques."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Error Guessing (Adivinanza de Errores)",
      "en": "Error Guessing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El tester anticipa tipos de errores, defectos y fallos basándose en su experiencia previa. Crea una lista de errores y diseña pruebas para detectarlos.",
      "en": "The tester anticipates types of errors, defects and failures based on previous experience. Creates an error list and designs tests to detect them."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Errores típicos a \"adivinar\":\n  \n    División por cero\n    Desbordamiento de buffer\n    Campo vacío o nulo\n    Caracteres especiales en campos de texto\n    Valores negativos donde solo se esperan positivos",
      "en": "📌 Typical errors to \"guess\":\n  \n    Division by zero\n    Buffer overflow\n    Empty or null field\n    Special characters in text fields\n    Negative values where only positive values are expected"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testing Exploratorio",
      "en": "Exploratory Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Técnica simultánea donde el aprendizaje, diseño y ejecución ocurren al mismo tiempo. Se guía por charters (objetivos de exploración).",
      "en": "Simultaneous technique where learning, design and execution occur at the same time. Guided by charters (exploration objectives)."
    }
  },
  {
    "type": "list",
    "ordered": false,
    "items": [
      {
        "es": "No sigue scripts predefinidos",
        "en": "Does not follow predefined scripts"
      },
      {
        "es": "El tester adapta su enfoque en tiempo real",
        "en": "The tester adapts their approach in real time"
      },
      {
        "es": "Útil para descubrir defectos inesperados",
        "en": "Useful for discovering unexpected defects"
      },
      {
        "es": "Requiere testers experimentados",
        "en": "Requires experienced testers"
      }
    ]
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Testing Basado en Checklists",
      "en": "Checklist-based Testing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "El tester usa una lista de condiciones o comprobaciones basadas en experiencia, estándares o heurísticas para guiar el testing.",
      "en": "The tester uses a list of conditions or checks based on experience, standards or heuristics to guide testing."
    }
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Cuándo usar cada técnica:\n  \n• Error guessing: defectos esperados en áreas conocidas\n  \n• Exploratorio: descubrir lo desconocido, probar sin especificaciones\n  \n• Checklist: asegurar cobertura de áreas de riesgo conocidas",
      "en": "💡 When to use each technique:\n  \n• Error guessing: expected defects in known areas\n  \n• Exploratory: discover the unknown, test without specifications\n  \n• Checklist: ensure coverage of known risk areas"
    }
  }
],
};

const L_4_5: LessonContent = {
  id: "istqb-l4-5",
  moduleId: MODULE_ID,
  sections: [
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Técnicas Basadas en Colaboración",
      "en": "Collaboration-Based Techniques"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "En el ISTQB v4.0, se añaden técnicas basadas en la colaboración entre desarrolladores, testers y representantes del negocio.",
      "en": "In ISTQB v4.0, techniques based on collaboration between developers, testers and business representatives are added."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "Escritura Colaborativa de Historias de Usuario",
      "en": "Collaborative User Story Writing"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las historias de usuario se escriben en colaboración. El formato típico es:",
      "en": "User stories are written collaboratively. The typical format is:"
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Formato:\n  \nComo [tipo de usuario], quiero [acción/objetivo] para que [beneficio/valor].\n  \n\nEjemplo: Como cliente registrado, quiero restablecer mi contraseña por email, para que pueda recuperar mi acceso si la olvido.",
      "en": "📌 Format:\n  \nAs a [user type], I want [action/objective] so that [benefit/value].\n  \n\nExample: As a registered customer, I want to reset my password by email, so that I can recover my access if I forget it."
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Las historias deben incluir criterios de aceptación claros que definan cuándo la historia está \"done\".",
      "en": "Stories must include clear acceptance criteria that define when the story is \"done\"."
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "ATDD (Acceptance Test-Driven Development)",
      "en": "ATDD (Acceptance Test-Driven Development)"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "En ATDD, los criterios de aceptación se expresan como casos de prueba antes de comenzar el desarrollo:",
      "en": "In ATDD, acceptance criteria are expressed as test cases before development begins:"
    }
  },
  {
    "type": "list",
    "ordered": true,
    "items": [
      {
        "es": "El equipo (dev + tester + negocio) define los criterios de aceptación",
        "en": "The team (dev + tester + business) defines the acceptance criteria"
      },
      {
        "es": "Se crean los casos de prueba de aceptación",
        "en": "Acceptance test cases are created"
      },
      {
        "es": "El desarrollador implementa la funcionalidad para pasar esas pruebas",
        "en": "The developer implements the functionality to pass those tests"
      },
      {
        "es": "Se ejecutan las pruebas para verificar que la historia está completa",
        "en": "Tests are executed to verify the story is complete"
      }
    ]
  },
  {
    "type": "callout",
    "variant": "info",
    "content": {
      "es": "💡 Diferencia ATDD vs TDD:\n  \n• TDD: el desarrollador escribe pruebas unitarias antes de su código\n  \n• ATDD: el equipo completo escribe pruebas de aceptación antes del desarrollo",
      "en": "💡 Difference ATDD vs TDD:\n  \n• TDD: the developer writes unit tests before their code\n  \n• ATDD: the whole team writes acceptance tests before development"
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-16",
    "front": {
      "es": "¿Qué es la Partición de Equivalencia (EP)?",
      "en": "What is Equivalence Partitioning (EP)?"
    },
    "back": {
      "es": "Técnica de caja negra que divide los datos de entrada en particiones donde todos los valores se comportan igual. Se prueba un valor representativo de cada partición (válida e inválida).",
      "en": "Black-box technique that divides input data into partitions where all values behave the same. Test one representative value per partition (valid and invalid)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-17",
    "front": {
      "es": "¿Qué es el Análisis de Valor Límite (BVA)?",
      "en": "What is Boundary Value Analysis (BVA)?"
    },
    "back": {
      "es": "Técnica de caja negra que prueba los valores en los BORDES de las particiones. BVA-2: mínimo y máximo de cada borde. BVA-3: también incluye los valores inmediatamente adyacentes.",
      "en": "Black-box technique testing values at the EDGES of partitions. BVA-2: min and max of each boundary. BVA-3: also includes immediately adjacent values."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-18",
    "front": {
      "es": "¿Para qué se usan las Tablas de Decisión?",
      "en": "When are Decision Tables used?"
    },
    "back": {
      "es": "Para probar combinaciones de condiciones (lógica de negocio compleja). Cada columna es una 'regla' que combina condiciones con resultados. Número de reglas = 2^n (n = número de condiciones).",
      "en": "For testing combinations of conditions (complex business logic). Each column is a 'rule' combining conditions with outcomes. Number of rules = 2^n (n = number of conditions)."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-19",
    "front": {
      "es": "¿Qué es la prueba de Transición de Estado?",
      "en": "What is State Transition Testing?"
    },
    "back": {
      "es": "Técnica de caja negra para sistemas con estados. El comportamiento depende del estado actual y del evento recibido. Se modela con diagramas de estado y tablas de transición.",
      "en": "Black-box technique for systems with states. Behavior depends on current state and received event. Modeled with state diagrams and transition tables."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-20",
    "front": {
      "es": "¿Qué cubren las pruebas de SENTENCIA y de RAMA?",
      "en": "What do STATEMENT and BRANCH coverage cover?"
    },
    "back": {
      "es": "Sentencia (Statement): % de sentencias ejecutables ejecutadas. Rama (Branch): % de ramas del código ejecutadas (incluyendo verdadero/falso). Branch coverage es más fuerte que statement coverage.",
      "en": "Statement: % of executable statements executed. Branch: % of code branches executed (including true/false). Branch coverage is stronger than statement coverage."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-21",
    "front": {
      "es": "¿Qué es el Testing Exploratorio?",
      "en": "What is Exploratory Testing?"
    },
    "back": {
      "es": "Técnica basada en experiencia donde el tester diseña y ejecuta pruebas simultáneamente, aprendiendo del sistema a medida que avanza. Útil para encontrar defectos que las pruebas formales no detectan.",
      "en": "Experience-based technique where the tester simultaneously designs and executes tests, learning from the system as they go. Useful for finding defects that formal tests miss."
    }
  },
  {
    "type": "flashcard",
    "flashcardId": "istqb-fc-22",
    "front": {
      "es": "¿Qué es ATDD (Acceptance Test-Driven Development)?",
      "en": "What is ATDD (Acceptance Test-Driven Development)?"
    },
    "back": {
      "es": "Técnica colaborativa donde los casos de prueba de aceptación se crean ANTES del desarrollo, con la participación de desarrolladores, testers y stakeholders. Los tests guían el desarrollo.",
      "en": "Collaborative technique where acceptance test cases are created BEFORE development, with participation of developers, testers and stakeholders. Tests drive development."
    }
  }
],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L_4_1, L_4_2, L_4_3, L_4_4, L_4_5];
}
