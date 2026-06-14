/**
 * QA Fundamentals — Módulo 10: Inteligencia Artificial aplicada al QA.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB Certified Tester AI Testing (CT-AI), buenas prácticas de prompting.
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m10";

/* ------------------------------------------------------------------ */
/*  Lección 10.1 — Fundamentos de IA para QA                           */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m10-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "La IA generativa como copiloto del QA", en: "Generative AI as the QA's copilot" } },
    {
      type: "paragraph",
      content: {
        es: "La inteligencia artificial generativa (como ChatGPT u otros asistentes basados en grandes modelos de lenguaje) puede acelerar tareas del QA manual: redactar casos de prueba, generar datos, resumir requisitos o sugerir escenarios. No reemplaza al tester: lo potencia. El criterio humano sigue siendo imprescindible.",
        en: "Generative AI (like ChatGPT or other assistants based on large language models) can speed up manual QA tasks: drafting test cases, generating data, summarizing requirements or suggesting scenarios. It does not replace the tester: it augments them. Human judgment remains essential.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Distingue dos cosas: 'IA para QA' (usar IA como herramienta para probar mejor, el foco de este módulo) y 'QA de IA' (probar sistemas que contienen IA, un campo especializado que cubre la certificación ISTQB CT-AI).",
        en: "Distinguish two things: 'AI for QA' (using AI as a tool to test better, the focus of this module) and 'QA of AI' (testing systems that contain AI, a specialized field covered by the ISTQB CT-AI certification).",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Acelera tareas repetitivas de redacción y análisis.", en: "Speeds up repetitive writing and analysis tasks." },
        { es: "Sugiere casos o escenarios que se podrían pasar por alto.", en: "Suggests cases or scenarios that might be overlooked." },
        { es: "Siempre requiere revisión humana de lo generado.", en: "Always requires human review of what is generated." },
      ],
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m10-l1-fc1",
      front: { es: "¿Diferencia entre 'IA para QA' y 'QA de IA'?", en: "Difference between 'AI for QA' and 'QA of AI'?" },
      back: { es: "'IA para QA' usa la IA como herramienta para probar mejor; 'QA de IA' prueba sistemas que contienen IA.", en: "'AI for QA' uses AI as a tool to test better; 'QA of AI' tests systems that contain AI." },
    },
    {
      type: "quiz",
      questionId: "qaf-m10-l1-q1",
      question: { es: "¿Cuál es el rol correcto de la IA generativa en el trabajo del QA manual?", en: "What is the correct role of generative AI in manual QA work?" },
      options: [
        { id: "a", text: { es: "Reemplazar por completo al tester", en: "Completely replace the tester" } },
        { id: "b", text: { es: "Potenciar al tester, que revisa lo generado", en: "Augment the tester, who reviews what is generated" } },
        { id: "c", text: { es: "Tomar decisiones sin supervisión humana", en: "Make decisions without human supervision" } },
        { id: "d", text: { es: "Eliminar la necesidad de requisitos", en: "Remove the need for requirements" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La IA es un copiloto: acelera tareas, pero el criterio y la revisión humana son imprescindibles.", en: "AI is a copilot: it speeds up tasks, but human judgment and review are essential." },
    },
  ],
  resources: [
    { title: { es: "ISTQB Certified Tester AI Testing (CT-AI)", en: "ISTQB Certified Tester AI Testing (CT-AI)" }, url: "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 10.2 — Generar casos de prueba y datos con IA              */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m10-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Prompts efectivos para QA", en: "Effective prompts for QA" } },
    {
      type: "paragraph",
      content: {
        es: "La calidad de lo que genera la IA depende de la calidad de tu prompt. Un buen prompt da contexto, especifica el formato de salida y pide explícitamente cubrir casos válidos, inválidos y límite (las técnicas del módulo 5).",
        en: "The quality of what the AI generates depends on the quality of your prompt. A good prompt gives context, specifies the output format and explicitly asks to cover valid, invalid and boundary cases (the techniques from module 5).",
      },
    },
    {
      type: "code",
      language: "text",
      code: "Actúa como QA. Para esta historia de usuario:\n'Como usuario quiero restablecer mi contraseña por correo'\ngenera casos de prueba en tabla con: ID, precondición, pasos,\ndatos, resultado esperado. Incluye casos válidos, inválidos\ny de valores límite.",
      caption: { es: "Prompt para generar casos de prueba", en: "Prompt to generate test cases" },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "La IA también es excelente generando datos de prueba sintéticos (nombres, correos, direcciones falsas) sin usar datos personales reales, respetando la privacidad.",
        en: "AI is also excellent at generating synthetic test data (fake names, emails, addresses) without using real personal data, respecting privacy.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m10-l2-fc1",
      front: { es: "¿Qué tres tipos de casos conviene pedir explícitamente a la IA?", en: "Which three case types should you explicitly ask the AI for?" },
      back: { es: "Casos válidos, inválidos y de valores límite.", en: "Valid, invalid and boundary value cases." },
    },
    {
      type: "quiz",
      questionId: "qaf-m10-l2-q1",
      question: { es: "¿Qué hace que un prompt para generar casos de prueba sea efectivo?", en: "What makes a prompt for generating test cases effective?" },
      options: [
        { id: "a", text: { es: "Ser lo más corto y vago posible", en: "Being as short and vague as possible" } },
        { id: "b", text: { es: "Dar contexto, formato de salida y pedir casos válidos/inválidos/límite", en: "Giving context, output format and asking for valid/invalid/boundary cases" } },
        { id: "c", text: { es: "Pedir solo casos que pasen", en: "Asking only for passing cases" } },
        { id: "d", text: { es: "No revisar nunca el resultado", en: "Never reviewing the result" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Un buen prompt da contexto, define el formato y pide cobertura de distintos tipos de casos.", en: "A good prompt gives context, defines the format and asks for coverage of different case types." },
    },
  ],
  resources: [
    { title: { es: "ISTQB Certified Tester AI Testing (CT-AI)", en: "ISTQB Certified Tester AI Testing (CT-AI)" }, url: "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 10.3 — Análisis de requisitos e historias con IA           */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m10-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "IA para clarificar requisitos", en: "AI to clarify requirements" } },
    {
      type: "paragraph",
      content: {
        es: "La IA puede ayudar a detectar ambigüedades en un requisito, proponer preguntas para el product owner, redactar historias de usuario y generar criterios de aceptación en formato Gherkin. Es una forma de acelerar el testing estático del módulo 4.",
        en: "AI can help detect ambiguities in a requirement, propose questions for the product owner, draft user stories and generate acceptance criteria in Gherkin format. It is a way to speed up the static testing from module 4.",
      },
    },
    {
      type: "code",
      language: "text",
      code: "Revisa este requisito y lista sus ambigüedades y las\npreguntas que harías al product owner para aclararlo:\n'El sistema debe enviar notificaciones a los usuarios\ncuando haya novedades.'",
      caption: { es: "Prompt para detectar ambigüedades", en: "Prompt to detect ambiguities" },
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Pídele a la IA que genere también una matriz de escenarios o una matriz de pruebas a partir de los criterios de aceptación: es un buen punto de partida que luego tú depuras.",
        en: "Also ask the AI to generate a scenario matrix or a test matrix from the acceptance criteria: it is a good starting point that you then refine.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m10-l3-fc1",
      front: { es: "Da un ejemplo de tarea de análisis de requisitos donde la IA ayuda al QA.", en: "Give an example of a requirements-analysis task where AI helps QA." },
      back: { es: "Detectar ambigüedades y proponer preguntas de clarificación; también generar criterios de aceptación.", en: "Detecting ambiguities and proposing clarification questions; also generating acceptance criteria." },
    },
    {
      type: "quiz",
      questionId: "qaf-m10-l3-q1",
      question: { es: "¿Cómo puede la IA apoyar el testing estático de requisitos?", en: "How can AI support static testing of requirements?" },
      options: [
        { id: "a", text: { es: "Ejecutando el código del sistema", en: "By executing the system's code" } },
        { id: "b", text: { es: "Detectando ambigüedades y proponiendo preguntas", en: "By detecting ambiguities and proposing questions" } },
        { id: "c", text: { es: "Desplegando a producción", en: "By deploying to production" } },
        { id: "d", text: { es: "Sustituyendo al product owner", en: "By replacing the product owner" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La IA ayuda a detectar ambigüedades y a formular preguntas, acelerando la revisión de requisitos.", en: "AI helps detect ambiguities and formulate questions, speeding up the requirements review." },
    },
  ],
  resources: [
    { title: { es: "ISTQB Certified Tester AI Testing (CT-AI)", en: "ISTQB Certified Tester AI Testing (CT-AI)" }, url: "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 10.4 — Limitaciones, riesgos y buenas prácticas            */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m10-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "La IA no es infalible", en: "AI is not infallible" } },
    {
      type: "paragraph",
      content: {
        es: "La IA generativa tiene limitaciones serias que todo QA debe conocer. Usarla sin criterio puede introducir más riesgos de los que resuelve. La regla de oro: la IA propone, el humano dispone.",
        en: "Generative AI has serious limitations every QA must know. Using it without judgment can introduce more risks than it solves. The golden rule: AI proposes, the human decides.",
      },
    },
    {
      type: "table",
      caption: { es: "Riesgos y cómo mitigarlos", en: "Risks and how to mitigate them" },
      headers: [
        { es: "Riesgo", en: "Risk" },
        { es: "Mitigación", en: "Mitigation" },
      ],
      rows: [
        { cells: [ { es: "Alucinaciones (inventa datos plausibles)", en: "Hallucinations (invents plausible data)" }, { es: "Revisar y verificar siempre lo generado", en: "Always review and verify what is generated" } ] },
        { cells: [ { es: "Sesgos en los datos de entrenamiento", en: "Bias in training data" }, { es: "Contrastar con criterio y diversidad de casos", en: "Cross-check with judgment and diverse cases" } ] },
        { cells: [ { es: "Privacidad (filtrar datos confidenciales)", en: "Privacy (leaking confidential data)" }, { es: "No pegar datos sensibles ni reales de clientes", en: "Don't paste sensitive or real customer data" } ] },
        { cells: [ { es: "Exceso de confianza", en: "Over-reliance" }, { es: "Mantener el pensamiento crítico del tester", en: "Keep the tester's critical thinking" } ] },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "Nunca pegues requisitos confidenciales, credenciales o datos personales reales en una herramienta de IA pública: podrías filtrar información protegida.",
        en: "Never paste confidential requirements, credentials or real personal data into a public AI tool: you could leak protected information.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m10-l4-fc1",
      front: { es: "¿Qué es una 'alucinación' de la IA y cómo se mitiga?", en: "What is an AI 'hallucination' and how is it mitigated?" },
      back: { es: "Cuando la IA inventa información plausible pero falsa; se mitiga revisando y verificando siempre lo generado.", en: "When the AI invents plausible but false information; mitigated by always reviewing and verifying the output." },
    },
    {
      type: "quiz",
      questionId: "qaf-m10-l4-q1",
      question: { es: "¿Cuál es una buena práctica al usar IA en QA?", en: "Which is a good practice when using AI in QA?" },
      options: [
        { id: "a", text: { es: "Confiar ciegamente en todo lo que genera", en: "Blindly trust everything it generates" } },
        { id: "b", text: { es: "Pegar datos reales de clientes para mayor precisión", en: "Paste real customer data for more accuracy" } },
        { id: "c", text: { es: "Revisar y verificar siempre lo generado", en: "Always review and verify what is generated" } },
        { id: "d", text: { es: "Eliminar la revisión humana", en: "Remove human review" } },
      ],
      correctOptionId: "c",
      explanation: { es: "La revisión humana de lo generado es la salvaguarda clave frente a alucinaciones y sesgos.", en: "Human review of the output is the key safeguard against hallucinations and bias." },
    },
  ],
  resources: [
    { title: { es: "ISTQB Certified Tester AI Testing (CT-AI)", en: "ISTQB Certified Tester AI Testing (CT-AI)" }, url: "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 10.5 — Proyecto final del campus (capstone)                */
/* ------------------------------------------------------------------ */

const L5: LessonContent = {
  id: "qaf-m10-l5",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Tu dossier de QA", en: "Your QA dossier" } },
    {
      type: "paragraph",
      content: {
        es: "El proyecto final integra todo lo aprendido. Elige una aplicación de práctica (por ejemplo, el Playground de PlayQ Academy o cualquier web pública de pruebas) y elabora un dossier de QA completo, como lo presentarías en un trabajo real.",
        en: "The final project integrates everything you have learned. Pick a practice application (for example, the PlayQ Academy Playground or any public test website) and produce a complete QA dossier, as you would present it in a real job.",
      },
    },
    {
      type: "list",
      ordered: true,
      items: [
        { es: "Análisis: lista de requisitos/funcionalidades a probar.", en: "Analysis: list of requirements/features to test." },
        { es: "Diseño: suite de casos con técnicas (EP, BVA, etc.).", en: "Design: case suite using techniques (EP, BVA, etc.)." },
        { es: "Ejecución: registro de resultados (pass/fail/blocked).", en: "Execution: results log (pass/fail/blocked)." },
        { es: "Defectos: al menos 3 bug reports profesionales con evidencia.", en: "Defects: at least 3 professional bug reports with evidence." },
        { es: "Trazabilidad: matriz requisito ↔ caso de prueba.", en: "Traceability: requirement ↔ test case matrix." },
        { es: "Bonus IA: genera una parte con IA y documenta tu revisión humana.", en: "AI bonus: generate part of it with AI and document your human review." },
      ],
    },
    {
      type: "callout",
      variant: "important",
      content: {
        es: "Este dossier es una pieza ideal para tu portafolio: demuestra a un empleador que sabes analizar, diseñar, ejecutar y reportar como un QA junior.",
        en: "This dossier is an ideal portfolio piece: it shows an employer you can analyze, design, execute and report like a junior QA.",
      },
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "Áreas futuras de especialización (fuera de esta ruta de QA manual): automatización con Selenium/Cypress/Playwright, testing de rendimiento, seguridad y QA de sistemas de IA. PlayQ Academy ya cuenta con un campus de automatización con Playwright cuando quieras dar el salto.",
        en: "Future specialization areas (outside this manual QA track): automation with Selenium/Cypress/Playwright, performance testing, security and QA of AI systems. PlayQ Academy already has a Playwright automation campus when you want to make the leap.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m10-l5-fc1",
      front: { es: "¿Qué entregables incluye el dossier de QA del proyecto final?", en: "What deliverables does the final project's QA dossier include?" },
      back: { es: "Análisis, suite de casos, registro de ejecución, bug reports, matriz de trazabilidad y un apartado con IA revisado.", en: "Analysis, case suite, execution log, bug reports, traceability matrix and a reviewed AI section." },
    },
    {
      type: "quiz",
      questionId: "qaf-m10-l5-q1",
      question: { es: "¿Cuál es el objetivo del proyecto final del campus?", en: "What is the goal of the campus final project?" },
      options: [
        { id: "a", text: { es: "Aprender a programar automatización", en: "Learn to code automation" } },
        { id: "b", text: { es: "Integrar análisis, diseño, ejecución y reporte en un dossier de QA", en: "Integrate analysis, design, execution and reporting in a QA dossier" } },
        { id: "c", text: { es: "Desplegar la aplicación a producción", en: "Deploy the application to production" } },
        { id: "d", text: { es: "Diseñar la interfaz de la aplicación", en: "Design the application's UI" } },
      ],
      correctOptionId: "b",
      explanation: { es: "El capstone integra todas las competencias del campus en un dossier de QA para el portafolio.", en: "The capstone integrates all campus competencies into a portfolio-ready QA dossier." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
    { title: { es: "ISTQB Certified Tester AI Testing (CT-AI)", en: "ISTQB Certified Tester AI Testing (CT-AI)" }, url: "https://istqb.org/certifications/certified-tester-ai-testing-ct-ai/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4, L5];
}
