/**
 * QA Fundamentals — Módulo 2: Fundamentos de Calidad de Software.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISO/IEC 25010:2023 (modelo de calidad), ISTQB CTFL v4.0.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m2";

/* ------------------------------------------------------------------ */
/*  Lección 2.1 — ¿Qué es la calidad del software?                     */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m2-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Definición de calidad", en: "Definition of quality" },
    },
    {
      type: "paragraph",
      content: {
        es: "La calidad del software es el grado en que un componente o sistema satisface las necesidades declaradas e implícitas de sus partes interesadas. Es decir, no basta con cumplir el documento de requisitos: también hay que satisfacer expectativas que el usuario da por supuestas (que sea rápido, seguro, fácil de usar).",
        en: "Software quality is the degree to which a component or system satisfies the stated and implied needs of its stakeholders. In other words, meeting the requirements document is not enough: you must also satisfy expectations the user takes for granted (that it is fast, secure, easy to use).",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Necesidades declaradas = lo que está escrito en los requisitos. Necesidades implícitas = lo que el usuario espera aunque nadie lo haya escrito.",
        en: "Stated needs = what is written in the requirements. Implied needs = what the user expects even if nobody wrote it down.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: { es: "Calidad interna, externa y en uso", en: "Internal, external and in-use quality" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Calidad interna: propiedades del código y diseño (mantenibilidad, claridad).", en: "Internal quality: properties of the code and design (maintainability, clarity)." },
        { es: "Calidad externa: comportamiento del sistema al ejecutarse (defectos, rendimiento).", en: "External quality: system behavior at runtime (defects, performance)." },
        { es: "Calidad en uso: experiencia real del usuario al alcanzar sus objetivos.", en: "Quality in use: the real user experience when achieving their goals." },
      ],
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m2-l1-fc1",
      front: { es: "¿Qué son las 'necesidades implícitas' de calidad?", en: "What are 'implied' quality needs?" },
      back: { es: "Expectativas que el usuario da por supuestas aunque no estén escritas en los requisitos.", en: "Expectations the user takes for granted even if they are not written in the requirements." },
    },
    {
      type: "quiz",
      questionId: "qaf-m2-l1-q1",
      question: { es: "Un sistema cumple todos los requisitos escritos pero es tan lento que nadie lo usa. ¿Tiene calidad?", en: "A system meets every written requirement but is so slow nobody uses it. Does it have quality?" },
      options: [
        { id: "a", text: { es: "Sí, porque cumple los requisitos escritos", en: "Yes, because it meets the written requirements" } },
        { id: "b", text: { es: "No, porque no satisface las necesidades implícitas del usuario", en: "No, because it does not satisfy the user's implied needs" } },
        { id: "c", text: { es: "La calidad no tiene nada que ver con el rendimiento", en: "Quality has nothing to do with performance" } },
        { id: "d", text: { es: "Solo el equipo de desarrollo puede decidirlo", en: "Only the development team can decide" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "La calidad incluye necesidades implícitas como el rendimiento. Cumplir solo lo escrito no garantiza calidad.",
        en: "Quality includes implied needs such as performance. Meeting only what is written does not guarantee quality.",
      },
    },
  ],
  resources: [
    { title: { es: "ISO/IEC 25010:2023 — Modelo de calidad de producto", en: "ISO/IEC 25010:2023 — Product quality model" }, url: "https://www.iso.org/standard/78176.html" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 2.2 — El modelo de calidad ISO/IEC 25010                   */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m2-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "El modelo de calidad de producto", en: "The product quality model" },
    },
    {
      type: "paragraph",
      content: {
        es: "La norma ISO/IEC 25010 (parte de la familia SQuaRE) define un modelo de calidad de producto de software organizado en características y subcaracterísticas. Sirve como referencia común para especificar, medir y evaluar la calidad de un sistema.",
        en: "The ISO/IEC 25010 standard (part of the SQuaRE family) defines a software product quality model organized into characteristics and sub-characteristics. It serves as a common reference to specify, measure and evaluate the quality of a system.",
      },
    },
    {
      type: "table",
      caption: { es: "Características de calidad del producto (ISO/IEC 25010)", en: "Product quality characteristics (ISO/IEC 25010)" },
      headers: [
        { es: "Característica", en: "Characteristic" },
        { es: "Qué evalúa", en: "What it evaluates" },
      ],
      rows: [
        { cells: [ { es: "Adecuación funcional", en: "Functional suitability" }, { es: "Que las funciones hagan lo correcto", en: "That functions do the right thing" } ] },
        { cells: [ { es: "Eficiencia de desempeño", en: "Performance efficiency" }, { es: "Tiempos de respuesta y uso de recursos", en: "Response times and resource use" } ] },
        { cells: [ { es: "Compatibilidad", en: "Compatibility" }, { es: "Coexistencia e interoperabilidad", en: "Coexistence and interoperability" } ] },
        { cells: [ { es: "Usabilidad / Interacción", en: "Usability / Interaction" }, { es: "Facilidad de aprendizaje y uso", en: "Ease of learning and use" } ] },
        { cells: [ { es: "Fiabilidad", en: "Reliability" }, { es: "Disponibilidad y tolerancia a fallos", en: "Availability and fault tolerance" } ] },
        { cells: [ { es: "Seguridad", en: "Security" }, { es: "Confidencialidad, integridad, autenticidad", en: "Confidentiality, integrity, authenticity" } ] },
        { cells: [ { es: "Mantenibilidad", en: "Maintainability" }, { es: "Facilidad para modificar y corregir", en: "Ease of modifying and fixing" } ] },
        { cells: [ { es: "Portabilidad / Flexibilidad", en: "Portability / Flexibility" }, { es: "Adaptación a otros entornos", en: "Adaptation to other environments" } ] },
        { cells: [ { es: "Seguridad física (Safety)", en: "Safety" }, { es: "Evitar daños en condiciones de riesgo (añadida en 2023)", en: "Avoiding harm under hazardous conditions (added in 2023)" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Para QA manual funcional, la 'adecuación funcional' es la característica central, pero un buen tester observa también usabilidad, fiabilidad y seguridad durante sus pruebas.",
        en: "For functional manual QA, 'functional suitability' is the central characteristic, but a good tester also observes usability, reliability and security during testing.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m2-l2-fc1",
      front: { es: "¿Qué característica de ISO 25010 evalúa que las funciones hagan lo correcto?", en: "Which ISO 25010 characteristic evaluates that functions do the right thing?" },
      back: { es: "La adecuación funcional (functional suitability).", en: "Functional suitability." },
    },
    {
      type: "quiz",
      questionId: "qaf-m2-l2-q1",
      question: { es: "Un usuario no puede aprender a usar la app sin ayuda constante. ¿Qué característica de calidad falla?", en: "A user cannot learn to use the app without constant help. Which quality characteristic is failing?" },
      options: [
        { id: "a", text: { es: "Seguridad", en: "Security" } },
        { id: "b", text: { es: "Usabilidad", en: "Usability" } },
        { id: "c", text: { es: "Portabilidad", en: "Portability" } },
        { id: "d", text: { es: "Mantenibilidad", en: "Maintainability" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "La facilidad de aprendizaje y uso forma parte de la usabilidad.",
        en: "Ease of learning and use is part of usability.",
      },
    },
  ],
  resources: [
    { title: { es: "ISO/IEC 25010:2023 — Modelo de calidad de producto", en: "ISO/IEC 25010:2023 — Product quality model" }, url: "https://www.iso.org/standard/78176.html" },
    { title: { es: "ISO/IEC 25010 — Plataforma de navegación", en: "ISO/IEC 25010 — Online browsing platform" }, url: "https://www.iso.org/obp/ui/en/#!iso:std:78176:en" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 2.3 — Calidad funcional vs no funcional                    */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m2-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Qué hace vs cómo se comporta", en: "What it does vs how it behaves" },
    },
    {
      type: "paragraph",
      content: {
        es: "La calidad funcional responde a '¿hace el sistema lo que debe?'. La calidad no funcional responde a '¿cómo se comporta mientras lo hace?' (rapidez, seguridad, usabilidad). El QA manual funcional se centra sobre todo en lo primero, pero debe reconocer lo segundo.",
        en: "Functional quality answers 'does the system do what it should?'. Non-functional quality answers 'how does it behave while doing it?' (speed, security, usability). Functional manual QA focuses mainly on the former, but must recognize the latter.",
      },
    },
    {
      type: "table",
      caption: { es: "Funcional vs no funcional", en: "Functional vs non-functional" },
      headers: [
        { es: "Tipo", en: "Type" },
        { es: "Pregunta", en: "Question" },
        { es: "Ejemplo de prueba", en: "Test example" },
      ],
      rows: [
        { cells: [ { es: "Funcional", en: "Functional" }, { es: "¿Hace lo correcto?", en: "Does it do the right thing?" }, { es: "Al pulsar 'Pagar' se crea el pedido", en: "Clicking 'Pay' creates the order" } ] },
        { cells: [ { es: "No funcional", en: "Non-functional" }, { es: "¿Cómo lo hace?", en: "How does it do it?" }, { es: "El pago responde en menos de 2 s", en: "The payment responds in under 2s" } ] },
      ],
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m2-l3-fc1",
      front: { es: "'El login responde en menos de 1 segundo' ¿es requisito funcional o no funcional?", en: "'Login responds in under 1 second' — functional or non-functional?" },
      back: { es: "No funcional: describe cómo se comporta (rendimiento), no qué hace.", en: "Non-functional: it describes how it behaves (performance), not what it does." },
    },
    {
      type: "quiz",
      questionId: "qaf-m2-l3-q1",
      question: { es: "'El sistema debe permitir restablecer la contraseña por correo' es un requisito…", en: "'The system must allow password reset by email' is a requirement that is…" },
      options: [
        { id: "a", text: { es: "No funcional", en: "Non-functional" } },
        { id: "b", text: { es: "Funcional", en: "Functional" } },
        { id: "c", text: { es: "De rendimiento", en: "Performance" } },
        { id: "d", text: { es: "De seguridad física", en: "Safety" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Describe una función que el sistema debe hacer: es un requisito funcional.",
        en: "It describes a function the system must perform: it is a functional requirement.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 2.4 — El coste de la calidad y de los defectos             */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m2-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Cuanto más tarde, más caro", en: "The later, the more expensive" },
    },
    {
      type: "paragraph",
      content: {
        es: "Un defecto cuesta más cuanto más tarde se detecta. Corregir un error en los requisitos es barato; corregir ese mismo defecto cuando ya está en producción puede costar mucho más, además del daño a la reputación. Por eso el testing temprano (principio 3) es clave.",
        en: "A defect costs more the later it is detected. Fixing an error in the requirements is cheap; fixing that same defect once it is in production can cost much more, plus reputational damage. That is why early testing (principle 3) is key.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: { es: "Shift-left", en: "Shift-left" },
    },
    {
      type: "paragraph",
      content: {
        es: "'Shift-left' significa mover las actividades de calidad hacia la izquierda del ciclo de vida, es decir, hacia las fases tempranas. Revisar requisitos y diseñar pruebas pronto evita que los defectos avancen.",
        en: "'Shift-left' means moving quality activities to the left of the lifecycle, i.e. towards the early phases. Reviewing requirements and designing tests early prevents defects from progressing.",
      },
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "El coste de la calidad incluye prevención y evaluación (lo que invertimos en evitar y detectar defectos) frente al coste de los fallos (lo que cuesta cuando el defecto llega al usuario).",
        en: "The cost of quality includes prevention and appraisal (what we invest to avoid and detect defects) versus the cost of failures (what it costs when the defect reaches the user).",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m2-l4-fc1",
      front: { es: "¿Qué significa 'shift-left' en QA?", en: "What does 'shift-left' mean in QA?" },
      back: { es: "Mover las actividades de calidad y testing hacia las fases tempranas del ciclo de vida.", en: "Moving quality and testing activities towards the early phases of the lifecycle." },
    },
    {
      type: "quiz",
      questionId: "qaf-m2-l4-q1",
      question: { es: "¿Por qué conviene detectar los defectos lo antes posible?", en: "Why is it best to detect defects as early as possible?" },
      options: [
        { id: "a", text: { es: "Porque corregirlos más tarde suele ser más caro", en: "Because fixing them later is usually more expensive" } },
        { id: "b", text: { es: "Porque los defectos tempranos no importan", en: "Because early defects do not matter" } },
        { id: "c", text: { es: "Porque así se evita documentar", en: "Because it avoids documentation" } },
        { id: "d", text: { es: "Porque elimina la necesidad de pruebas", en: "Because it removes the need for testing" } },
      ],
      correctOptionId: "a",
      explanation: {
        es: "El coste de corregir un defecto crece cuanto más avanza en el ciclo de vida; de ahí el valor del shift-left.",
        en: "The cost of fixing a defect grows the further it advances in the lifecycle; hence the value of shift-left.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4];
}
