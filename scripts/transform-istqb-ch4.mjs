/**
 * Transform v2 — Chapter 4 batch (lessons 4.1–4.5).
 *
 * Usage: node scripts/transform-istqb-ch4.mjs
 */

import { parse } from "node-html-parser";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const contentSrc = readFileSync(resolve(ROOT, "migration/content.js"), "utf-8");

function extractGlobal(src, varName) {
  const fn = new Function(`${src}\nreturn ${varName};`);
  return fn();
}

const CHAPTERS = extractGlobal(contentSrc, "CHAPTERS");
const LESSONS = extractGlobal(contentSrc, "LESSONS");
const FLASHCARDS = extractGlobal(contentSrc, "FLASHCARDS");

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
/*  EN translation maps — Chapter 4                                    */
/* ================================================================== */

const EN_4_1 = {
  "Categorías de Técnicas de Prueba": "Test Design Technique Categories",
  "Las técnicas de diseño de pruebas se clasifican en tres grandes categorías:":
    "Test design techniques are classified into three main categories:",
  "🎯 Resumen clave para el examen:\n  \n    Caja Negra: Basadas en la especificación (qué hace el sistema)\n    Caja Blanca: Basadas en la estructura interna (cómo lo hace)\n    Experiencia: Basadas en el conocimiento del tester":
    "🎯 Key summary for the exam:\n  \n    Black-Box: Specification-based (what the system does)\n    White-Box: Structure-based (how it does it)\n    Experience-based: Based on tester knowledge",
  "Técnicas de Caja Negra (Black-Box)": "Black-Box Techniques",
  "No requieren conocimiento del código interno. Se basan en las especificaciones:":
    "Do not require internal code knowledge. Based on specifications:",
  "Partición de Equivalencia (EP)": "Equivalence Partitioning (EP)",
  "Análisis de Valor Límite (BVA)": "Boundary Value Analysis (BVA)",
  "Tablas de Decisión": "Decision Tables",
  "Prueba de Transición de Estado": "State Transition Testing",
  "Prueba de Caso de Uso": "Use Case Testing",
  "Técnicas de Caja Blanca (White-Box)": "White-Box Techniques",
  "Requieren acceso al código fuente. Miden la cobertura del código:":
    "Require access to source code. Measure code coverage:",
  "Cobertura de Sentencia (Statement Coverage)": "Statement Coverage",
  "Cobertura de Rama (Branch Coverage)": "Branch Coverage",
  "Técnicas Basadas en Experiencia": "Experience-Based Techniques",
  "Se basan en el conocimiento, intuición y experiencia del tester:":
    "Based on tester knowledge, intuition and experience:",
  "Error Guessing (Adivinanza de Errores)": "Error Guessing",
  "Testing Exploratorio": "Exploratory Testing",
  "Testing basado en Checklists": "Checklist-based Testing",
  "Técnicas Basadas en Colaboración (CTFL 4.0)": "Collaboration-Based Techniques (CTFL 4.0)",
  "Escritura colaborativa de historias de usuario": "Collaborative user story writing",
  "ATDD (Acceptance Test-Driven Development)": "ATDD (Acceptance Test-Driven Development)",
};

const EN_4_2 = {
  "¿Qué son las técnicas de caja negra?": "What are black-box techniques?",
  "Las técnicas de caja negra (black-box) se basan en la especificación del objeto de prueba. No se accede al código fuente; solo se evalúan entradas y salidas.":
    "Black-box techniques are based on the specification of the test object. Source code is not accessed; only inputs and outputs are evaluated.",
  "1. Partición de Equivalencia (EP)": "1. Equivalence Partitioning (EP)",
  "Divide los datos en particiones donde todos los valores se comportan de la misma manera. Se prueba un valor representativo de cada partición.":
    "Divides data into partitions where all values behave the same way. One representative value per partition is tested.",
  "📌 Ejemplo: Un campo acepta edades de 18 a 65 años.\n  \n• Partición válida: 18-65 (ej: probar con 30)\n  \n• Partición inválida 1: menor a 18 (ej: probar con 10)\n  \n• Partición inválida 2: mayor a 65 (ej: probar con 70)":
    "📌 Example: A field accepts ages from 18 to 65 years.\n  \n• Valid partition: 18-65 (e.g., test with 30)\n  \n• Invalid partition 1: less than 18 (e.g., test with 10)\n  \n• Invalid partition 2: greater than 65 (e.g., test with 70)",
  "2. Análisis de Valor Límite (BVA)": "2. Boundary Value Analysis (BVA)",
  "Se enfoca en los valores en los límites de las particiones, donde es más probable que haya defectos.":
    "Focuses on values at partition boundaries, where defects are most likely to occur.",
  "📌 Ejemplo (BVA 2 valores): Para el rango 18-65:\n  \n• Límites: 17, 18, 65, 66\n  \nEjemplo (BVA 3 valores): 17, 18, 19, 64, 65, 66":
    "📌 Example (BVA 2 values): For range 18-65:\n  \n• Boundaries: 17, 18, 65, 66\n  \nExample (BVA 3 values): 17, 18, 19, 64, 65, 66",
  "3. Tablas de Decisión": "3. Decision Table Testing",
  "Se utilizan para probar sistemas con combinaciones de condiciones (reglas de negocio). Cada columna representa una combinación posible de condiciones y sus resultados.":
    "Used to test systems with combinations of conditions (business rules). Each column represents a possible combination of conditions and their outcomes.",
  "📌 Estructura:\n  \nCondiciones (filas superiores) × Acciones (filas inferiores) × Reglas (columnas)":
    "📌 Structure:\n  \nConditions (top rows) × Actions (bottom rows) × Rules (columns)",
  "4. Prueba de Transición de Estado": "4. State Transition Testing",
  "Se usa cuando el comportamiento del sistema depende del estado actual y del evento recibido. Se modela como un diagrama de estados.":
    "Used when system behavior depends on the current state and received event. Modeled as a state diagram.",
  "Cobertura de todos los estados: cada estado se visita al menos una vez":
    "Coverage of all states: each state is visited at least once",
  "Cobertura de transiciones válidas: todas las transiciones válidas se ejercitan":
    "Valid transition coverage: all valid transitions are exercised",
  "Cobertura de transiciones inválidas: se prueban transiciones que no deberían ser posibles":
    "Invalid transition coverage: transitions that should not be possible are tested",
  "📌 Ejemplo: Un cajero ATM: estados = \"Esperando tarjeta\", \"Esperando PIN\", \"Menú principal\", \"Dispensando efectivo\".":
    "📌 Example: An ATM: states = \"Waiting for card\", \"Waiting for PIN\", \"Main menu\", \"Dispensing cash\".",
  "⚠️ Para el examen: Debes poder calcular el número de casos de prueba con EP y BVA, e identificar qué técnica aplicar en un escenario dado.":
    "⚠️ For the exam: You must be able to calculate the number of test cases with EP and BVA, and identify which technique to apply in a given scenario.",
};

const EN_4_3 = {
  "Técnicas de Caja Blanca": "White-Box Techniques",
  "Las técnicas de caja blanca (white-box o estructura-based) se basan en el análisis de la estructura interna del código. Requieren acceso al código fuente.":
    "White-box (structure-based) techniques are based on analysis of the internal structure of the code. Require access to source code.",
  "Cobertura de Sentencia (Statement Coverage)": "Statement Coverage",
  "Mide el porcentaje de sentencias ejecutables que han sido ejecutadas por los casos de prueba.":
    "Measures the percentage of executable statements that have been executed by test cases.",
  "📌 Ejemplo:\n  \n  if (x > 0) {\n    y = x * 2;  // Sentencia 1\n  }\n  z = y + 1;    // Sentencia 2\n  \n  Si solo probamos con x=5, ejecutamos ambas sentencias → 100% statement coverage.\n  Si solo probamos con x=-1, solo ejecutamos la sentencia 2 → 50% statement coverage.":
    "📌 Example:\n  \n  if (x > 0) {\n    y = x * 2;  // Statement 1\n  }\n  z = y + 1;    // Statement 2\n  \n  If we only test with x=5, we execute both statements → 100% statement coverage.\n  If we only test with x=-1, we only execute statement 2 → 50% statement coverage.",
  "Cobertura de Rama (Branch Coverage)": "Branch Coverage",
  "Mide el porcentaje de ramas del flujo de control ejecutadas. Para cada decisión (IF/SWITCH), tanto el camino verdadero como el falso deben ser probados.":
    "Measures the percentage of control flow branches executed. For each decision (IF/SWITCH), both the true and false paths must be tested.",
  "💡 Branch Coverage ⊃ Statement Coverage:\n  \nSi alcanzamos 100% de branch coverage, también tenemos 100% de statement coverage.\n  \nPero 100% de statement coverage NO garantiza 100% de branch coverage.":
    "💡 Branch Coverage ⊃ Statement Coverage:\n  \nIf we achieve 100% branch coverage, we also have 100% statement coverage.\n  \nBut 100% statement coverage does NOT guarantee 100% branch coverage.",
  "⚠️ Para el examen:\n  \n• Statement coverage = % de sentencias ejecutadas\n  \n• Branch coverage = % de ramas ejecutadas (más fuerte)\n  \n• 100% branch coverage implica 100% statement coverage (no viceversa)":
    "⚠️ For the exam:\n  \n• Statement coverage = % of statements executed\n  \n• Branch coverage = % of branches executed (stronger)\n  \n• 100% branch coverage implies 100% statement coverage (not vice versa)",
};

const EN_4_4 = {
  "Técnicas Basadas en Experiencia": "Experience-Based Techniques",
  "Estas técnicas se basan en el conocimiento, intuición y experiencia previa del tester. Son complementarias a las técnicas sistemáticas.":
    "These techniques are based on the tester's knowledge, intuition and previous experience. They are complementary to systematic techniques.",
  "Error Guessing (Adivinanza de Errores)": "Error Guessing",
  "El tester anticipa tipos de errores, defectos y fallos basándose en su experiencia previa. Crea una lista de errores y diseña pruebas para detectarlos.":
    "The tester anticipates types of errors, defects and failures based on previous experience. Creates an error list and designs tests to detect them.",
  "📌 Errores típicos a \"adivinar\":\n  \n    División por cero\n    Desbordamiento de buffer\n    Campo vacío o nulo\n    Caracteres especiales en campos de texto\n    Valores negativos donde solo se esperan positivos":
    "📌 Typical errors to \"guess\":\n  \n    Division by zero\n    Buffer overflow\n    Empty or null field\n    Special characters in text fields\n    Negative values where only positive values are expected",
  "Testing Exploratorio": "Exploratory Testing",
  "Técnica simultánea donde el aprendizaje, diseño y ejecución ocurren al mismo tiempo. Se guía por charters (objetivos de exploración).":
    "Simultaneous technique where learning, design and execution occur at the same time. Guided by charters (exploration objectives).",
  "No sigue scripts predefinidos": "Does not follow predefined scripts",
  "El tester adapta su enfoque en tiempo real": "The tester adapts their approach in real time",
  "Útil para descubrir defectos inesperados": "Useful for discovering unexpected defects",
  "Requiere testers experimentados": "Requires experienced testers",
  "Testing Basado en Checklists": "Checklist-based Testing",
  "El tester usa una lista de condiciones o comprobaciones basadas en experiencia, estándares o heurísticas para guiar el testing.":
    "The tester uses a list of conditions or checks based on experience, standards or heuristics to guide testing.",
  "💡 Cuándo usar cada técnica:\n  \n• Error guessing: defectos esperados en áreas conocidas\n  \n• Exploratorio: descubrir lo desconocido, probar sin especificaciones\n  \n• Checklist: asegurar cobertura de áreas de riesgo conocidas":
    "💡 When to use each technique:\n  \n• Error guessing: expected defects in known areas\n  \n• Exploratory: discover the unknown, test without specifications\n  \n• Checklist: ensure coverage of known risk areas",
};

const EN_4_5 = {
  "Técnicas Basadas en Colaboración": "Collaboration-Based Techniques",
  "En el ISTQB v4.0, se añaden técnicas basadas en la colaboración entre desarrolladores, testers y representantes del negocio.":
    "In ISTQB v4.0, techniques based on collaboration between developers, testers and business representatives are added.",
  "Escritura Colaborativa de Historias de Usuario": "Collaborative User Story Writing",
  "Las historias de usuario se escriben en colaboración. El formato típico es:":
    "User stories are written collaboratively. The typical format is:",
  "📌 Formato:\n  \nComo [tipo de usuario], quiero [acción/objetivo] para que [beneficio/valor].\n  \n\nEjemplo: Como cliente registrado, quiero restablecer mi contraseña por email, para que pueda recuperar mi acceso si la olvido.":
    "📌 Format:\n  \nAs a [user type], I want [action/objective] so that [benefit/value].\n  \n\nExample: As a registered customer, I want to reset my password by email, so that I can recover my access if I forget it.",
  "Las historias deben incluir criterios de aceptación claros que definan cuándo la historia está \"done\".":
    "Stories must include clear acceptance criteria that define when the story is \"done\".",
  "ATDD (Acceptance Test-Driven Development)": "ATDD (Acceptance Test-Driven Development)",
  "En ATDD, los criterios de aceptación se expresan como casos de prueba antes de comenzar el desarrollo:":
    "In ATDD, acceptance criteria are expressed as test cases before development begins:",
  "El equipo (dev + tester + negocio) define los criterios de aceptación":
    "The team (dev + tester + business) defines the acceptance criteria",
  "Se crean los casos de prueba de aceptación": "Acceptance test cases are created",
  "El desarrollador implementa la funcionalidad para pasar esas pruebas":
    "The developer implements the functionality to pass those tests",
  "Se ejecutan las pruebas para verificar que la historia está completa":
    "Tests are executed to verify the story is complete",
  "💡 Diferencia ATDD vs TDD:\n  \n• TDD: el desarrollador escribe pruebas unitarias antes de su código\n  \n• ATDD: el equipo completo escribe pruebas de aceptación antes del desarrollo":
    "💡 Difference ATDD vs TDD:\n  \n• TDD: the developer writes unit tests before their code\n  \n• ATDD: the whole team writes acceptance tests before development",
};

const CHAPTER4_MAPS = {
  "4.1": EN_4_1,
  "4.2": EN_4_2,
  "4.3": EN_4_3,
  "4.4": EN_4_4,
  "4.5": EN_4_5,
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
/*  Generate Chapter 4 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-test-analysis";
const chapter = CHAPTERS[3]; // Chapter index 3 = Test Analysis and Design
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER4_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 4 at end of last lesson
  if (topicId === topicIds[topicIds.length - 1]) {
    const fcs = FLASHCARDS.filter((fc) => fc.chapter === 4);
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
 * Test Analysis and Design — ISTQB CTFL v4.0, Chapter 4
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
