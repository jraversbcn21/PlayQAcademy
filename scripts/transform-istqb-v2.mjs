/**
 * Transform v2 — Chapter 1 batch (lessons 1.1–1.5).
 *
 * Strategy: ES as source of truth for structure.
 * EN matched by exact text lookup in translation map.
 * Missing EN translated from ES using canonical ISTQB glossary terms.
 *
 * Usage: node scripts/transform-istqb-v2.mjs
 */

import { parse } from "node-html-parser";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const contentSrc = readFileSync(resolve(ROOT, "migration/content.js"), "utf-8");
const questionsSrc = readFileSync(resolve(ROOT, "migration/questions.js"), "utf-8");

function extractGlobal(src, varName) {
  const fn = new Function(`${src}\nreturn ${varName};`);
  return fn();
}

const CHAPTERS = extractGlobal(contentSrc, "CHAPTERS");
const LESSONS = extractGlobal(contentSrc, "LESSONS");
const FLASHCARDS = extractGlobal(contentSrc, "FLASHCARDS");
const QUESTIONS = extractGlobal(questionsSrc, "QUESTIONS");

/* ================================================================== */
/*  HTML parser                                                        */
/* ================================================================== */

function parseHtml(html) {
  const root = parse(html);
  const sections = [];

  for (const child of root.childNodes) {
    if (child.nodeType === 3) {
      const t = child.text.trim();
      if (t) sections.push({ type: "paragraph", text: t });
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();

    if (tag === "h3") {
      sections.push({ type: "heading", level: 2, text: child.textContent.trim() });
    } else if (tag === "h4") {
      sections.push({ type: "heading", level: 3, text: child.textContent.trim() });
    } else if (tag === "p") {
      const t = child.textContent.trim();
      if (t) sections.push({ type: "paragraph", text: t });
    } else if (tag === "ul" || tag === "ol") {
      const items = [];
      for (const li of child.querySelectorAll("li")) items.push(li.textContent.trim());
      if (items.length > 0) sections.push({ type: "list", ordered: tag === "ol", items });
    } else if (tag === "code") {
      sections.push({ type: "code", language: "typescript", code: child.textContent });
    } else if (tag === "pre") {
      const codeEl = child.querySelector("code");
      sections.push({ type: "code", language: "typescript", code: codeEl ? codeEl.textContent : child.textContent });
    } else if (tag === "table") {
      const headers = [];
      const rows = [];
      let headerParsed = false;
      for (const tr of child.querySelectorAll("tr")) {
        const ths = tr.querySelectorAll("th");
        const tds = tr.querySelectorAll("td");
        const cells = [];
        for (const td of tr.querySelectorAll("td, th")) cells.push(td.textContent.trim());
        if (!headerParsed && ths.length > 0 && tds.length === 0) {
          headers.push(...cells);
          headerParsed = true;
        } else {
          rows.push(cells);
        }
      }
      sections.push({ type: "table", headers, rows });
    } else if (tag === "div") {
      const cls = child.getAttribute("class") || "";
      let variant = "info";
      if (cls.includes("warning-box")) variant = "warning";
      else if (cls.includes("example-box")) variant = "tip";
      sections.push({ type: "callout", variant, text: child.textContent.trim() });
    }
  }
  return sections;
}

/* ================================================================== */
/*  EN translation maps — Chapter 1                                    */
/*  Canonical terms from migration GLOSSARY + FLASHCARDS               */
/* ================================================================== */

const EN_1_1 = {
  // Headings
  "Definición del Testing de Software": "Definition of Software Testing",
  "Testing vs Depuración (Debugging)": "Testing vs Debugging",
  "Objetivos del Testing": "Testing Objectives",
  "Testing dinámico y estático": "Dynamic and Static Testing",
  "Verificación vs Validación": "Verification vs Validation",
  // Paragraphs
  "El testing de software es un conjunto de actividades para descubrir defectos y evaluar la calidad de artefactos de software. Estas actividades se planifican y controlan, y el resultado es un nivel de confianza sobre la calidad del software.":
    "Software testing is a set of activities to discover defects and evaluate the quality of software artifacts. These activities are planned and controlled, and the result is a level of confidence about software quality.",
  "Es fundamental distinguir entre ambos conceptos:":
    "It is fundamental to distinguish between both concepts:",
  "Testing dinámico: Requiere la ejecución del software (pruebas de funcionalidad, rendimiento, etc.).":
    "Dynamic testing: Requires software execution (functionality, performance tests, etc.).",
  "Testing estático: No requiere ejecución del software (revisiones de código, análisis estático, revisiones de documentos).":
    "Static testing: Does not require software execution (code reviews, static analysis, document reviews).",
  // Callouts
  "💡 Objetivo principal: El testing no solo busca defectos, también evalúa la calidad del producto y proporciona información para la toma de decisiones.":
    "💡 Main objective: Testing not only looks for defects, it also evaluates product quality and provides information for decision-making.",
  "📌 Ejemplo: En un proyecto ágil, el testing puede verificar que una historia de usuario (\"Como usuario, quiero restablecer mi contraseña\") funciona correctamente antes de que se considere \"done\".":
    "📌 Example: In an agile project, testing can verify that a user story (\"As a user, I want to reset my password\") works correctly before it is considered \"done\".",
  "⚠️ Importante para el examen: El testing NO puede probar que no hay defectos. Solo puede detectar fallos y reducir la probabilidad de problemas en producción.":
    "⚠️ Important for the exam: Testing CANNOT prove the absence of defects. It can only detect failures and reduce the probability of problems in production.",
  // List items
  "Evaluar productos de trabajo (requisitos, historias de usuario, diseño, código)":
    "Evaluate work products (requirements, user stories, design, code)",
  "Verificar si se cumplen los requisitos":
    "Verify that specified requirements have been fulfilled",
  "Validar que el objeto de prueba funciona como esperan los interesados":
    "Validate that the test object works as stakeholders expect",
  "Construir confianza en el nivel de calidad":
    "Build confidence in the level of quality",
  "Encontrar defectos y fallos para reducir el nivel de riesgo":
    "Find defects and failures to reduce risk level",
  "Proporcionar información a los interesados para la toma de decisiones":
    "Provide information to stakeholders for decision-making",
  "Cumplir requisitos contractuales, legales o regulatorios":
    "Comply with contractual, legal or regulatory requirements",
  // Verification vs Validation (missing from EN source)
  "Verificación: ¿Estamos construyendo el producto correctamente? (cumple especificaciones)":
    "Verification: Are we building the product correctly? (meets specifications)",
  "Validación: ¿Estamos construyendo el producto correcto? (satisface necesidades del usuario)":
    "Validation: Are we building the right product? (satisfies user needs)",
  // Table
  "Testing": "Testing",
  "Depuración": "Debugging",
  "Detecta síntomas (fallos)": "Detects symptoms (failures)",
  "Encuentra y corrige la causa raíz (defecto)": "Finds and fixes root cause (defect)",
  "Realizado por testers": "Done by testers",
  "Realizado por desarrolladores": "Done by developers",
  "Activo (busca problemas)": "Active (searches for problems)",
  "Reactivo (responde a problemas encontrados)": "Reactive (responds to found problems)",
  "Puede ser estático o dinámico": "Can be static or dynamic",
  "Siempre dinámico (ejecuta el código)": "Always dynamic (executes code)",
};

const EN_1_2 = {
  // Headings
  "Causas de los defectos de software": "Root Causes of Software Defects",
  "¿Por qué ocurren los fallos?": "Why do failures occur?",
  "El rol del testing en el desarrollo": "The role of testing in development",
  "Aseguramiento de Calidad (QA) vs Testing": "Quality Assurance (QA) vs Testing",
  // Paragraphs
  "Los defectos de software ocurren porque los seres humanos cometen errores. La terminología clave es:":
    "Software defects occur because humans make mistakes. The key terminology is:",
  "El testing es importante porque contribuye al éxito del software:":
    "Testing is important because it contributes to software success:",
  "QA (Quality Assurance): Se enfoca en los procesos para prevenir defectos. Es preventivo y proactivo.":
    "QA (Quality Assurance): Focuses on processes to prevent defects. It is preventive and proactive.",
  "Testing / QC (Quality Control): Se enfoca en el producto para detectar defectos. Es reactivo y correctivo.":
    "Testing / QC (Quality Control): Focuses on the product to detect defects. It is reactive and corrective.",
  // Callouts
  "🔗 Cadena de causalidad: Error → Defecto → Fallo\n  \nUn error de un humano introduce un defecto en el código. Si ese código se ejecuta, puede producir un fallo.":
    "🔗 Causality chain: Error → Defect → Failure\n  \nA human error introduces a defect in the code. If that code is executed, it may produce a failure.",
  "⚠️ Costo de los defectos: Cuanto más tarde se descubre un defecto, más caro resulta corregirlo. Un defecto en producción puede costar 100x más que uno encontrado en los requisitos.":
    "⚠️ Cost of defects: The later a defect is discovered, the more expensive it is to fix. A defect in production can cost 100x more than one found in requirements.",
  "📌 Ejemplo QA vs QC:\n  \nQA: Implementar revisiones de código obligatorias en el proceso de desarrollo.\n  \nQC: Ejecutar pruebas para encontrar defectos en la aplicación antes de su lanzamiento.":
    "📌 QA vs QC example:\n  \nQA: Implement mandatory code reviews in the development process.\n  \nQC: Execute tests to find defects in the application before release.",
  // List items — Why failures occur
  "Errores humanos al diseñar, codificar o documentar":
    "Human errors when designing, coding or documenting",
  "Presión de tiempo que fuerza atajos":
    "Time pressure that forces shortcuts",
  "Complejidad del código o infraestructura":
    "Code or infrastructure complexity",
  "Malentendidos sobre interfaces o interacciones del sistema":
    "Misunderstandings about system interfaces or interactions",
  "Condiciones ambientales (radiación, contaminación, campos electromagnéticos)":
    "Environmental conditions (radiation, pollution, electromagnetic fields)",
  // List items — Role of testing
  "Reducción de riesgo de defectos en producción":
    "Risk reduction of defects in production",
  "Cumplimiento de requisitos contractuales y normativos":
    "Compliance with contractual and regulatory requirements",
  "Confianza de los usuarios y clientes en el producto":
    "User and customer confidence in the product",
  "Detección temprana reduce el costo de corrección":
    "Early detection reduces correction cost",
  // Table
  "Término": "Term",
  "Definición": "Definition",
  "Ejemplo": "Example",
  "Error / Mistake": "Error / Mistake",
  "Acción humana que produce un resultado incorrecto": "Human action that produces an incorrect result",
  "Un programador malinterpreta un requisito": "A programmer misunderstands a requirement",
  "Defecto / Bug / Fault": "Defect / Bug / Fault",
  "Imperfección en un producto de trabajo": "Imperfection in a work product",
  "El código tiene una condición incorrecta": "The code has an incorrect condition",
  "Fallo / Failure": "Failure",
  "El componente no realiza la función requerida": "The component fails to perform the required function",
  "El sistema calcula mal el total de una compra": "The system miscalculates a purchase total",
  "Causa raíz": "Root cause",
  "La razón fundamental que originó el defecto": "The fundamental reason that originated the defect",
  "Falta de comunicación en los requisitos": "Lack of communication in requirements",
};

const EN_1_3 = {
  "Los 7 Principios Fundamentales": "The 7 Fundamental Principles",
  "Estos principios son la base de la filosofía del testing moderno y son ampliamente examinados en el ISTQB.":
    "These principles form the foundation of modern testing philosophy and are widely tested in ISTQB exams.",
  "Principio 1: El testing muestra la presencia de defectos, no su ausencia": "Principle 1: Testing shows presence of defects, not their absence",
  "El testing puede mostrar que los defectos están presentes en el objeto de prueba, pero no puede probar que no hay defectos. El testing reduce la probabilidad de que permanezcan defectos sin descubrir, pero incluso si no se encuentran defectos, el testing no es una prueba de corrección.":
    "Testing can show that defects are present in the test object, but cannot prove there are no defects. Testing reduces the probability of undiscovered defects remaining, but even if no defects are found, testing is not a proof of correctness.",
  "Principio 2: El testing exhaustivo es imposible": "Principle 2: Exhaustive testing is impossible",
  "No es posible probar todas las combinaciones de entradas y precondiciones (excepto en casos triviales). En lugar del testing exhaustivo, se utilizan técnicas de testing, priorización de casos de prueba y testing basado en riesgos para enfocar los esfuerzos.":
    "It is not possible to test all combinations of inputs and preconditions (except in trivial cases). Instead of exhaustive testing, test techniques, test case prioritization and risk-based testing are used to focus efforts.",
  "Principio 3: El testing temprano ahorra tiempo y dinero": "Principle 3: Early testing saves time and money",
  "Cuanto antes se comience el testing en el SDLC, más económico será corregir los defectos. El \"shift-left\" implica comenzar el testing tan pronto como sea posible (ej: revisar requisitos antes de que se desarrolle el código).":
    "The earlier testing begins in the SDLC, the more economical it is to fix defects. \"Shift-left\" means starting testing as early as possible (e.g., reviewing requirements before code is developed).",
  "Principio 4: Los defectos se agrupan (clustering)": "Principle 4: Defects cluster together",
  "Generalmente, un pequeño número de módulos contiene la mayoría de los defectos descubiertos durante el testing previo a la entrega, o muestra la mayor parte de los fallos operacionales. Este fenómeno se denomina clustering de defectos.":
    "Generally, a small number of modules contain most of the defects discovered during pre-delivery testing, or show most of the operational failures. This phenomenon is called defect clustering.",
  "Principio 5: Los tests se desgastan (paradoja del pesticida)": "Principle 5: Tests wear out (Pesticide paradox)",
  "Si se repiten las mismas pruebas una y otra vez, eventualmente estas dejarán de encontrar nuevos defectos. Para superar esta \"paradoja del pesticida\", los casos de prueba deben revisarse y actualizarse regularmente, y se deben escribir nuevos casos de prueba.":
    "If the same tests are repeated over and over, they will eventually stop finding new defects. To overcome this \"pesticide paradox\", test cases must be regularly reviewed and updated, and new test cases must be written.",
  "Principio 6: El testing depende del contexto": "Principle 6: Testing is context dependent",
  "El testing se hace de forma diferente en distintos contextos. Por ejemplo, el software de seguridad crítica se prueba de manera diferente a una aplicación de comercio electrónico. Diferentes metodologías, técnicas y tipos de prueba se aplican según el contexto.":
    "Testing is done differently in different contexts. For example, safety-critical software is tested differently from an e-commerce application. Different methodologies, techniques and test types are applied depending on the context.",
  "Principio 7: La falacia de la ausencia de defectos": "Principle 7: The absence-of-defects fallacy",
  "Es un error suponer que la verificación de un sistema es todo lo que se necesita para asegurar el éxito de un sistema. Corregir completamente todos los defectos no ayudará si el sistema construido es inutilizable y no cumple con las necesidades y expectativas de los usuarios.":
    "It is a mistake to assume that verifying a system is all that is needed to ensure system success. Completely fixing all defects will not help if the built system is unusable and does not meet user needs and expectations.",
  "🎯 Tip de examen: Debes conocer los 7 principios y ser capaz de identificar cuál aplica en un escenario dado.":
    "🎯 Exam tip: You must know all 7 principles and be able to identify which one applies in a given scenario.",
  "📌 Ejemplo: Un campo de texto que acepta hasta 50 caracteres con letras, números y símbolos tendría millones de combinaciones posibles. Es imposible probarlas todas.":
    "📌 Example: A text field accepting up to 50 characters with letters, numbers and symbols would have millions of possible combinations. It is impossible to test them all.",
  "📊 Regla 80-20: Aproximadamente el 80% de los defectos se encuentran en el 20% del código.":
    "📊 80-20 Rule: Approximately 80% of defects are found in 20% of the code.",
  "#": "#", "Principio": "Principle", "Clave": "Key",
  "Testing muestra presencia, no ausencia": "Testing shows presence, not absence",
  "No prueba corrección": "Does not prove correctness",
  "Testing exhaustivo es imposible": "Exhaustive testing is impossible",
  "Priorización y riesgo": "Prioritization and risk",
  "Testing temprano ahorra dinero": "Early testing saves money",
  "Shift-left": "Shift-left",
  "Los defectos se agrupan": "Defects cluster together",
  "Clustering / 80-20": "Clustering / 80-20",
  "Los tests se desgastan": "Tests wear out",
  "Paradoja del pesticida": "Pesticide paradox",
  "Depende del contexto": "Context dependent",
  "No hay recetas únicas": "No one-size-fits-all",
  "Falacia de ausencia de defectos": "Absence-of-defects fallacy",
  "Validación es esencial": "Validation is essential",
};

const EN_1_4 = {
  "Actividades del proceso de prueba": "Test Process Activities",
  "El proceso de prueba incluye las siguientes actividades principales:":
    "The test process includes the following main activities:",
  "Testware": "Testware",
  "El testware es el conjunto de artefactos producidos durante el proceso de prueba:":
    "Testware is the set of artifacts produced during the test process:",
  "Roles en el testing": "Roles in Testing",
  "Trazabilidad": "Traceability",
  "La trazabilidad es la capacidad de relacionar los productos de trabajo de testing (casos de prueba, defectos) con los requisitos y demás artefactos del proyecto. Permite determinar el impacto de los cambios.":
    "Traceability is the ability to relate test work products (test cases, defects) to requirements and other project artifacts. It allows determining the impact of changes.",
  // List items — activities
  "Planificación de pruebas: Definir objetivos, enfoque y recursos.":
    "Test planning: Define objectives, approach and resources.",
  "Seguimiento y control: Comparar progreso real vs plan.":
    "Test monitoring and control: Compare actual progress against plan.",
  "Análisis de pruebas: ¿Qué probar? Identificar condiciones de prueba.":
    "Test analysis: What to test? Identify test conditions.",
  "Diseño de pruebas: ¿Cómo probar? Diseñar casos de prueba de alto nivel.":
    "Test design: How to test? Design high-level test cases.",
  "Implementación de pruebas: Crear scripts, datos y entorno.":
    "Test implementation: Create scripts, data and environment.",
  "Ejecución de pruebas: Ejecutar pruebas y comparar resultados.":
    "Test execution: Run tests and compare results.",
  "Completitud de pruebas: Verificar criterios de salida, reportar, archivar.":
    "Test completion: Verify exit criteria, report, archive.",
  // List items — testware
  "Plan de pruebas, calendario de pruebas": "Test plan, test schedule",
  "Condiciones de prueba, casos de prueba, scripts de prueba": "Test conditions, test cases, test scripts",
  "Datos de prueba, entorno de prueba": "Test data, test environment",
  "Informe de defectos, informe de pruebas": "Defect report, test report",
  "Registros de ejecución de pruebas": "Test execution logs",
  // Table
  "Rol": "Role", "Responsabilidad": "Responsibility",
  "Test Manager": "Test Manager",
  "Planificación, monitoreo, gestión general del testing": "Planning, monitoring, overall test management",
  "Tester": "Tester",
  "Análisis, diseño, implementación y ejecución de pruebas": "Analysis, design, implementation and test execution",
};

const EN_1_5 = {
  "Habilidades del Tester": "Tester Skills",
  "Un buen tester necesita una combinación de habilidades técnicas y no técnicas:":
    "A good tester needs a combination of technical and non-technical skills:",
  "Habilidades técnicas": "Technical Skills",
  "Habilidades no técnicas": "Non-Technical Skills",
  "Independencia del Testing": "Testing Independence",
  "El nivel de independencia del tester influye en la efectividad del testing:":
    "The level of tester independence influences testing effectiveness:",
  // List items — technical
  "Conocimiento de técnicas de testing": "Knowledge of testing techniques",
  "Comprensión del software a probar": "Understanding of the software being tested",
  "Uso de herramientas de testing": "Use of testing tools",
  "Capacidad de análisis y diseño de pruebas": "Ability to analyze and design tests",
  "Programación (especialmente para testing de componentes y automatización)":
    "Programming (especially for component testing and automation)",
  // List items — non-technical
  "Curiosidad y pensamiento crítico": "Curiosity and critical thinking",
  "Atención al detalle": "Attention to detail",
  "Comunicación efectiva": "Effective communication",
  "Pensamiento analítico y sistemático": "Analytical and systematic thinking",
  "Trabajo en equipo y colaboración": "Teamwork and collaboration",
  "Pensamiento independiente (para cuestionar supuestos)":
    "Independent thinking (to question assumptions)",
  // Callouts
  "💡 Mentalidad del tester: Los testers deben ser capaces de pensar de forma diferente a los desarrolladores — buscando cómo el sistema puede fallar, en lugar de cómo funciona correctamente.":
    "💡 Tester mindset: Testers should be able to think differently from developers — looking for how the system can fail, rather than how it works correctly.",
  "⚠️ Importante: Mayor independencia no siempre es mejor — puede introducir problemas de comunicación y falta de conocimiento del dominio.":
    "⚠️ Important: Greater independence is not always better — it can introduce communication problems and lack of domain knowledge.",
  // Table
  "Nivel": "Level", "Descripción": "Description", "Ventaja": "Advantage",
  "Sin independencia": "No independence",
  "El desarrollador prueba su propio código": "The developer tests their own code",
  "Conoce bien el código": "Knows the code well",
  "Independencia interna": "Internal independence",
  "Tester del mismo equipo": "Tester from the same team",
  "Mayor objetividad": "Greater objectivity",
  "Independencia de equipo": "Team independence",
  "Equipo de QA separado": "Separate QA team",
  "Perspectiva externa": "External perspective",
  "Total independencia": "Total independence",
  "Organización externa": "External organization",
  "Máxima objetividad": "Maximum objectivity",
};

const CHAPTER1_MAPS = {
  "1.1": EN_1_1,
  "1.2": EN_1_2,
  "1.3": EN_1_3,
  "1.4": EN_1_4,
  "1.5": EN_1_5,
};

/* ================================================================== */
/*  Build bilingual sections                                           */
/* ================================================================== */

let missingCount = 0;

function buildBilingual(esSections, enMap) {
  const result = [];
  for (const es of esSections) {
    switch (es.type) {
      case "heading":
        result.push({ type: "heading", level: es.level, content: { es: es.text, en: enMap[es.text] || es.text } });
        break;
      case "paragraph": {
        const en = enMap[es.text];
        if (!en) { missingCount++; console.warn(`  ⚠ Missing EN paragraph: "${es.text.substring(0, 70)}..."`); }
        result.push({ type: "paragraph", content: { es: es.text, en: en || es.text } });
        break;
      }
      case "callout": {
        const en = enMap[es.text];
        if (!en) { missingCount++; console.warn(`  ⚠ Missing EN callout: "${es.text.substring(0, 70)}..."`); }
        result.push({ type: "callout", variant: es.variant, content: { es: es.text, en: en || es.text } });
        break;
      }
      case "list": {
        const items = es.items.map((item) => {
          const en = enMap[item];
          if (!en) { missingCount++; console.warn(`  ⚠ Missing EN list item: "${item.substring(0, 70)}..."`); }
          return { es: item, en: en || item };
        });
        result.push({ type: "list", ordered: es.ordered, items });
        break;
      }
      case "table": {
        const headers = es.headers.map((h) => ({ es: h, en: enMap[h] || h }));
        const rows = es.rows.map((row) => ({
          cells: row.map((cell) => ({ es: cell, en: enMap[cell] || cell })),
        }));
        result.push({ type: "table", headers, rows });
        break;
      }
      case "code":
        result.push({ type: "code", language: es.language, code: es.code });
        break;
    }
  }
  return result;
}

/* ================================================================== */
/*  Generate Chapter 1 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-fundamentals";
const chapter = CHAPTERS[0];
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER1_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 0 at end of last lesson
  if (topicId === topicIds[topicIds.length - 1]) {
    const fcs = FLASHCARDS.filter((fc) => fc.chapter === 0);
    for (const fc of fcs) {
      sections.push({
        type: "flashcard",
        flashcardId: `istqb-fc-${fc.id}`,
        front: { es: fc.q.es, en: fc.q.en },
        back: { es: fc.a.es, en: fc.a.en },
      });
    }
    console.log(`  📇 Added ${fcs.length} flashcards`);
  }

  const lessonId = `istqb-l${topicId.replace(".", "-")}`;
  lessonBlocks.push({ topicId, lessonId, sections });
}

const varNames = lessonBlocks.map((lb) => `L_${lb.topicId.replace(".", "_")}`);
const lessonDefs = lessonBlocks.map((lb) => {
  const v = `L_${lb.topicId.replace(".", "_")}`;
  return `const ${v}: LessonContent = {\n  id: "${lb.lessonId}",\n  moduleId: MODULE_ID,\n  sections: ${JSON.stringify(lb.sections, null, 2)},\n};\n`;
}).join("\n");

const ts = `/**
 * Fundamentals of Testing — ISTQB CTFL v4.0, Chapter 1
 * Auto-generated from migration/content.js
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "${moduleId}";

${lessonDefs}
export function getAllLessonsContent(): LessonContent[] {
  return [${varNames.join(", ")}];
}
`;

writeFileSync(resolve(outputDir, `${moduleId}.ts`), ts, "utf-8");
console.log(`\n✅ ${moduleId}.ts written (${lessonBlocks.length} lessons)`);
console.log(`⚠ Total missing EN entries: ${missingCount}`);
