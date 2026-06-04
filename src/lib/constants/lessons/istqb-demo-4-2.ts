/**
 * Lesson 4.2 — Black-box test techniques
 * Demo output from transform v2
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "istqb-test-analysis";

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
      "en": "Divides data into partitions where all values behave the same way. One representative value from each partition is tested."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo: Un campo acepta edades de 18 a 65 años.\n  \n• Partición válida: 18-65 (ej: probar con 30)\n  \n• Partición inválida 1: menor a 18 (ej: probar con 10)\n  \n• Partición inválida 2: mayor a 65 (ej: probar con 70)",
      "en": "📌 Example: A field accepts ages from 18 to 65.\n  \n• Valid partition: 18-65 (e.g., test with 30)\n  \n• Invalid partition 1: less than 18 (e.g., test with 10)\n  \n• Invalid partition 2: greater than 65 (e.g., test with 70)"
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
      "en": "Focuses on values at the boundaries of partitions, where defects are most likely to occur."
    }
  },
  {
    "type": "callout",
    "variant": "tip",
    "content": {
      "es": "📌 Ejemplo (BVA 2 valores): Para el rango 18-65:\n  \n• Límites: 17, 18, 65, 66\n  \nEjemplo (BVA 3 valores): 17, 18, 19, 64, 65, 66",
      "en": "📌 Example (2-value BVA): For range 18-65:\n  \n• Boundaries: 17, 18, 65, 66\n  \nExample (3-value BVA): 17, 18, 19, 64, 65, 66"
    }
  },
  {
    "type": "heading",
    "level": 2,
    "content": {
      "es": "3. Tablas de Decisión",
      "en": "3. Decision Tables"
    }
  },
  {
    "type": "paragraph",
    "content": {
      "es": "Se utilizan para probar sistemas con combinaciones de condiciones (reglas de negocio). Cada columna representa una combinación posible de condiciones y sus resultados.",
      "en": "Used to test systems with combinations of conditions (business rules). Each column represents a possible combination of conditions and their results."
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
      "en": "Used when system behavior depends on the current state and the received event. It is modeled as a state diagram."
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
        "en": "Coverage of valid transitions: all valid transitions are exercised"
      },
      {
        "es": "Cobertura de transiciones inválidas: se prueban transiciones que no deberían ser posibles",
        "en": "Coverage of invalid transitions: transitions that should not be possible are tested"
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

export function getAllLessonsContent(): LessonContent[] {
  return [L_4_2];
}
