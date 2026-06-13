/**
 * Lesson 1.3 — The 7 Testing Principles
 * Demo output from transform v2
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-fundamentals";

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

export function getAllLessonsContent(): LessonContent[] {
  return [L_1_3];
}
