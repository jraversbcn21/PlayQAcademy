/**
 * QA Fundamentals — Módulo 1: Introducción al QA y al Testing de Software.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0 (cap. 1), ISTQB Glossary.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m1";

/* ------------------------------------------------------------------ */
/*  Lección 1.1 — ¿Qué es QA y qué es el testing?                       */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m1-l1",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Qué es el aseguramiento de calidad (QA)?",
        en: "What is quality assurance (QA)?",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El aseguramiento de calidad (Quality Assurance, QA) es el conjunto de actividades orientadas a generar confianza en que un producto de software cumplirá los requisitos de calidad esperados. QA se enfoca en el proceso: busca prevenir defectos mejorando la forma en que se construye el software, no solo encontrarlos al final.",
        en: "Quality assurance (QA) is the set of activities aimed at building confidence that a software product will meet the expected quality requirements. QA focuses on the process: it seeks to prevent defects by improving the way software is built, not just to find them at the end.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Qué es el testing de software?",
        en: "What is software testing?",
      },
    },
    {
      type: "paragraph",
      content: {
        es: "El testing de software es un conjunto de actividades planificadas para descubrir defectos y evaluar la calidad de los artefactos de software (requisitos, diseño, código, producto final). El testing es una parte central del QA, pero no es lo mismo que QA: el testing es una actividad concreta dentro del esfuerzo más amplio de calidad.",
        en: "Software testing is a set of planned activities to discover defects and evaluate the quality of software artifacts (requirements, design, code, final product). Testing is a core part of QA, but it is not the same as QA: testing is a concrete activity within the broader quality effort.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "El testing no solo busca defectos: también evalúa la calidad y aporta información objetiva para que el equipo y el negocio tomen decisiones con menor riesgo.",
        en: "Testing does not only look for defects: it also evaluates quality and provides objective information so the team and the business can make lower-risk decisions.",
      },
    },
    {
      type: "heading",
      level: 2,
      content: {
        es: "¿Por qué es necesario el testing?",
        en: "Why is testing necessary?",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        {
          es: "Reduce el riesgo de fallos durante la operación del software.",
          en: "Reduces the risk of failures during software operation.",
        },
        {
          es: "Detecta defectos temprano, cuando corregirlos es más barato.",
          en: "Detects defects early, when fixing them is cheaper.",
        },
        {
          es: "Verifica que el software cumple los requisitos acordados.",
          en: "Verifies that the software meets the agreed requirements.",
        },
        {
          es: "Genera confianza en el nivel de calidad del producto.",
          en: "Builds confidence in the product's quality level.",
        },
        {
          es: "Ayuda a cumplir requisitos contractuales, legales o de estándares.",
          en: "Helps meet contractual, legal or standards requirements.",
        },
      ],
    },
    {
      type: "table",
      caption: {
        es: "QA y testing en una frase",
        en: "QA and testing in one sentence",
      },
      headers: [
        { es: "Concepto", en: "Concept" },
        { es: "Enfoque", en: "Focus" },
      ],
      rows: [
        {
          cells: [
            { es: "QA (aseguramiento de calidad)", en: "QA (quality assurance)" },
            { es: "El proceso: prevenir defectos", en: "The process: prevent defects" },
          ],
        },
        {
          cells: [
            { es: "Testing", en: "Testing" },
            { es: "El producto: encontrar defectos y evaluar calidad", en: "The product: find defects and evaluate quality" },
          ],
        },
      ],
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m1-l1-fc1",
      front: { es: "¿QA y testing son lo mismo?", en: "Are QA and testing the same?" },
      back: {
        es: "No. QA es el esfuerzo amplio orientado al proceso para prevenir defectos; el testing es una actividad concreta para encontrarlos y evaluar la calidad.",
        en: "No. QA is the broad, process-oriented effort to prevent defects; testing is a concrete activity to find them and evaluate quality.",
      },
    },
    {
      type: "quiz",
      questionId: "qaf-m1-l1-q1",
      question: {
        es: "¿Cuál es el objetivo principal del testing de software?",
        en: "What is the main objective of software testing?",
      },
      options: [
        { id: "a", text: { es: "Demostrar que el software no tiene ningún defecto", en: "Prove the software has no defects at all" } },
        { id: "b", text: { es: "Evaluar la calidad y reducir el riesgo de fallos en operación", en: "Evaluate quality and reduce the risk of failures in operation" } },
        { id: "c", text: { es: "Sustituir por completo al equipo de desarrollo", en: "Completely replace the development team" } },
        { id: "d", text: { es: "Escribir la documentación del usuario final", en: "Write the end-user documentation" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El testing evalúa la calidad de los artefactos y reduce el riesgo de fallos. No puede demostrar la ausencia total de defectos.",
        en: "Testing evaluates artifact quality and reduces the risk of failures. It cannot prove the total absence of defects.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Glossary", en: "ISTQB Glossary" }, url: "https://glossary.istqb.org/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 1.2 — QA vs QC vs Testing                                  */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m1-l2",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Tres conceptos que se confunden", en: "Three concepts that get confused" },
    },
    {
      type: "paragraph",
      content: {
        es: "QA, QC y testing se usan a menudo como sinónimos, pero describen cosas distintas. Entender la diferencia es clave para comunicarte con precisión en un equipo profesional.",
        en: "QA, QC and testing are often used as synonyms, but they describe different things. Understanding the difference is key to communicating precisely in a professional team.",
      },
    },
    {
      type: "table",
      caption: { es: "QA vs QC vs Testing", en: "QA vs QC vs Testing" },
      headers: [
        { es: "Aspecto", en: "Aspect" },
        { es: "QA", en: "QA" },
        { es: "QC (control de calidad)", en: "QC (quality control)" },
        { es: "Testing", en: "Testing" },
      ],
      rows: [
        {
          cells: [
            { es: "Orientación", en: "Orientation" },
            { es: "Al proceso", en: "Process-oriented" },
            { es: "Al producto", en: "Product-oriented" },
            { es: "Al producto", en: "Product-oriented" },
          ],
        },
        {
          cells: [
            { es: "Objetivo", en: "Goal" },
            { es: "Prevenir defectos", en: "Prevent defects" },
            { es: "Detectar defectos", en: "Detect defects" },
            { es: "Encontrar defectos y evaluar calidad", en: "Find defects and evaluate quality" },
          ],
        },
        {
          cells: [
            { es: "Ejemplo", en: "Example" },
            { es: "Definir estándares y plantillas", en: "Define standards and templates" },
            { es: "Revisar el producto contra criterios", en: "Review the product against criteria" },
            { es: "Ejecutar casos de prueba", en: "Execute test cases" },
          ],
        },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Regla mnemotécnica: QA = construir bien (proceso). QC = comprobar lo construido (producto). Testing = una de las técnicas de QC.",
        en: "Mnemonic: QA = build it right (process). QC = check what was built (product). Testing = one of the QC techniques.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m1-l2-fc1",
      front: { es: "¿QA o QC se orienta al proceso?", en: "Which is process-oriented, QA or QC?" },
      back: { es: "QA se orienta al proceso (prevención); QC se orienta al producto (detección).", en: "QA is process-oriented (prevention); QC is product-oriented (detection)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m1-l2-q1",
      question: { es: "Ejecutar casos de prueba sobre una aplicación es un ejemplo de…", en: "Running test cases against an application is an example of…" },
      options: [
        { id: "a", text: { es: "QA orientado al proceso", en: "Process-oriented QA" } },
        { id: "b", text: { es: "Testing (una técnica de control de calidad)", en: "Testing (a quality control technique)" } },
        { id: "c", text: { es: "Gestión de proyectos", en: "Project management" } },
        { id: "d", text: { es: "Diseño de la arquitectura", en: "Architecture design" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "Ejecutar pruebas es testing, una actividad de control de calidad orientada al producto.",
        en: "Running tests is testing, a product-oriented quality control activity.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB Glossary — quality assurance", en: "ISTQB Glossary — quality assurance" }, url: "https://glossary.istqb.org/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 1.3 — Error, defecto y fallo                               */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m1-l3",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "La cadena causa-efecto", en: "The cause-effect chain" },
    },
    {
      type: "paragraph",
      content: {
        es: "Una persona comete un error (mistake), que introduce un defecto (defect/bug) en el software. Cuando ese defecto se ejecuta, puede producir un fallo (failure): un comportamiento observable distinto del esperado. Distinguir estos tres términos es uno de los fundamentos del vocabulario del QA.",
        en: "A person makes an error (mistake), which introduces a defect (bug) into the software. When that defect is executed, it can produce a failure: an observable behavior different from the expected one. Distinguishing these three terms is one of the fundamentals of the QA vocabulary.",
      },
    },
    {
      type: "table",
      caption: { es: "Error → Defecto → Fallo", en: "Error → Defect → Failure" },
      headers: [
        { es: "Término", en: "Term" },
        { es: "Qué es", en: "What it is" },
        { es: "Ejemplo", en: "Example" },
      ],
      rows: [
        {
          cells: [
            { es: "Error (mistake)", en: "Error (mistake)" },
            { es: "Acción humana incorrecta", en: "Incorrect human action" },
            { es: "El programador escribe '+' en vez de '-'", en: "The programmer writes '+' instead of '-'" },
          ],
        },
        {
          cells: [
            { es: "Defecto (defect/bug)", en: "Defect (bug)" },
            { es: "Imperfección en el artefacto", en: "Imperfection in the artifact" },
            { es: "El código de cálculo es incorrecto", en: "The calculation code is incorrect" },
          ],
        },
        {
          cells: [
            { es: "Fallo (failure)", en: "Failure" },
            { es: "Comportamiento observable incorrecto", en: "Incorrect observable behavior" },
            { es: "La factura muestra un total equivocado", en: "The invoice shows a wrong total" },
          ],
        },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "No todos los defectos producen fallos: un defecto solo causa un fallo si el código defectuoso se ejecuta bajo las condiciones adecuadas. Por eso 'no haber visto un fallo' no significa 'no hay defectos'.",
        en: "Not every defect produces a failure: a defect only causes a failure if the faulty code runs under the right conditions. That is why 'not having seen a failure' does not mean 'there are no defects'.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m1-l3-fc1",
      front: { es: "El usuario ve un total equivocado en pantalla. ¿Es error, defecto o fallo?", en: "The user sees a wrong total on screen. Is it an error, defect or failure?" },
      back: { es: "Es un fallo: el comportamiento observable incorrecto en ejecución.", en: "It is a failure: the incorrect observable behavior at runtime." },
    },
    {
      type: "quiz",
      questionId: "qaf-m1-l3-q1",
      question: { es: "El código incorrecto que vive dentro del sistema se denomina…", en: "The incorrect code that lives inside the system is called…" },
      options: [
        { id: "a", text: { es: "Error", en: "Error" } },
        { id: "b", text: { es: "Defecto", en: "Defect" } },
        { id: "c", text: { es: "Fallo", en: "Failure" } },
        { id: "d", text: { es: "Riesgo", en: "Risk" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "El defecto (bug) es la imperfección en el artefacto. El error es la acción humana que lo introduce y el fallo es el comportamiento observable.",
        en: "The defect (bug) is the imperfection in the artifact. The error is the human action that introduces it and the failure is the observable behavior.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 1.4 — Los 7 principios del testing                         */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m1-l4",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "Los 7 principios del testing (ISTQB)", en: "The 7 testing principles (ISTQB)" },
    },
    {
      type: "paragraph",
      content: {
        es: "El ISTQB resume siete principios que toda persona de QA debe interiorizar. Son la base del criterio profesional para decidir qué, cuánto y cómo probar.",
        en: "ISTQB summarizes seven principles that every QA professional should internalize. They are the foundation of the professional judgment to decide what, how much and how to test.",
      },
    },
    {
      type: "table",
      caption: { es: "Los 7 principios", en: "The 7 principles" },
      headers: [
        { es: "#", en: "#" },
        { es: "Principio", en: "Principle" },
        { es: "Idea clave", en: "Key idea" },
      ],
      rows: [
        { cells: [ { es: "1", en: "1" }, { es: "El testing muestra la presencia de defectos", en: "Testing shows the presence of defects" }, { es: "No puede probar que no haya defectos", en: "It cannot prove there are none" } ] },
        { cells: [ { es: "2", en: "2" }, { es: "El testing exhaustivo es imposible", en: "Exhaustive testing is impossible" }, { es: "Hay que priorizar con técnicas y riesgo", en: "Prioritize with techniques and risk" } ] },
        { cells: [ { es: "3", en: "3" }, { es: "El testing temprano ahorra tiempo y dinero", en: "Early testing saves time and money" }, { es: "Shift-left: probar cuanto antes", en: "Shift-left: test as early as possible" } ] },
        { cells: [ { es: "4", en: "4" }, { es: "Los defectos se agrupan", en: "Defects cluster together" }, { es: "Pocas áreas concentran la mayoría", en: "A few areas hold most defects" } ] },
        { cells: [ { es: "5", en: "5" }, { es: "La paradoja del pesticida", en: "The pesticide paradox" }, { es: "Repetir las mismas pruebas deja de encontrar defectos", en: "Repeating the same tests stops finding defects" } ] },
        { cells: [ { es: "6", en: "6" }, { es: "El testing depende del contexto", en: "Testing is context dependent" }, { es: "No se prueba igual un juego que un sistema médico", en: "A game is not tested like a medical system" } ] },
        { cells: [ { es: "7", en: "7" }, { es: "La falacia de ausencia de errores", en: "Absence-of-errors fallacy" }, { es: "Un software sin defectos pero inútil sigue siendo un fracaso", en: "Defect-free but useless software is still a failure" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "El principio 5 (paradoja del pesticida) explica por qué hay que revisar y renovar los casos de prueba periódicamente.",
        en: "Principle 5 (pesticide paradox) explains why test cases must be reviewed and refreshed periodically.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m1-l4-fc1",
      front: { es: "¿Qué dice el principio 1 del testing?", en: "What does testing principle 1 state?" },
      back: { es: "El testing muestra la presencia de defectos, pero no puede demostrar su ausencia.", en: "Testing shows the presence of defects, but cannot prove their absence." },
    },
    {
      type: "quiz",
      questionId: "qaf-m1-l4-q1",
      question: { es: "Repetir siempre los mismos casos de prueba deja de encontrar defectos nuevos. ¿Qué principio lo describe?", en: "Always repeating the same test cases stops finding new defects. Which principle describes this?" },
      options: [
        { id: "a", text: { es: "Principio 2: testing exhaustivo imposible", en: "Principle 2: exhaustive testing is impossible" } },
        { id: "b", text: { es: "Principio 4: agrupación de defectos", en: "Principle 4: defect clustering" } },
        { id: "c", text: { es: "Principio 5: paradoja del pesticida", en: "Principle 5: pesticide paradox" } },
        { id: "d", text: { es: "Principio 7: falacia de ausencia de errores", en: "Principle 7: absence-of-errors fallacy" } },
      ],
      correctOptionId: "c",
      explanation: {
        es: "La paradoja del pesticida indica que los casos repetidos pierden eficacia; hay que renovarlos.",
        en: "The pesticide paradox states that repeated cases lose effectiveness; they must be refreshed.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 1.5 — El rol y la mentalidad del QA tester                 */
/* ------------------------------------------------------------------ */

const L5: LessonContent = {
  id: "qaf-m1-l5",
  moduleId: MODULE_ID,
  sections: [
    {
      type: "heading",
      level: 2,
      content: { es: "¿Qué hace un QA tester manual?", en: "What does a manual QA tester do?" },
    },
    {
      type: "paragraph",
      content: {
        es: "El QA tester manual analiza requisitos, diseña y ejecuta casos de prueba sin automatización, reporta defectos con claridad y colabora con el equipo para mejorar la calidad del producto. Es la voz crítica que pregunta '¿y si…?' antes de que lo haga el usuario.",
        en: "The manual QA tester analyzes requirements, designs and executes test cases without automation, reports defects clearly and collaborates with the team to improve product quality. They are the critical voice that asks 'what if…?' before the user does.",
      },
    },
    {
      type: "heading",
      level: 3,
      content: { es: "Habilidades clave", en: "Key skills" },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Atención al detalle y pensamiento crítico.", en: "Attention to detail and critical thinking." },
        { es: "Comunicación clara (sobre todo al reportar defectos).", en: "Clear communication (especially when reporting defects)." },
        { es: "Empatía con el usuario final.", en: "Empathy with the end user." },
        { es: "Curiosidad y mentalidad exploratoria.", en: "Curiosity and an exploratory mindset." },
        { es: "Rigor y método para ser reproducible.", en: "Rigor and method to be reproducible." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "La mentalidad de testing combina curiosidad, escepticismo profesional y atención al detalle, sin perder la colaboración: el objetivo es mejorar el producto, no 'culpar' a quien programó.",
        en: "The testing mindset combines curiosity, professional skepticism and attention to detail, without losing collaboration: the goal is to improve the product, not to 'blame' whoever coded it.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m1-l5-fc1",
      front: { es: "Menciona dos habilidades clave de un QA tester manual.", en: "Name two key skills of a manual QA tester." },
      back: { es: "Pensamiento crítico y comunicación clara (también atención al detalle, empatía y rigor).", en: "Critical thinking and clear communication (also attention to detail, empathy and rigor)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m1-l5-q1",
      question: { es: "¿Cuál de estas actitudes describe MEJOR la mentalidad de un buen tester?", en: "Which of these attitudes BEST describes a good tester's mindset?" },
      options: [
        { id: "a", text: { es: "Confiar en que todo funciona y no cuestionar", en: "Trust that everything works and not question it" } },
        { id: "b", text: { es: "Escepticismo profesional y curiosidad para anticipar problemas", en: "Professional skepticism and curiosity to anticipate problems" } },
        { id: "c", text: { es: "Buscar culpables cuando aparece un defecto", en: "Look for someone to blame when a defect appears" } },
        { id: "d", text: { es: "Probar solo lo que es fácil de probar", en: "Test only what is easy to test" } },
      ],
      correctOptionId: "b",
      explanation: {
        es: "La mentalidad de testing combina escepticismo profesional, curiosidad y colaboración para mejorar el producto.",
        en: "The testing mindset combines professional skepticism, curiosity and collaboration to improve the product.",
      },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4, L5];
}
