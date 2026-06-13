/**
 * Transform v2 — Chapter 2 batch (lessons 2.1–2.4).
 *
 * Strategy: ES as source of truth for structure.
 * EN matched by exact text lookup in translation map.
 * Missing EN translated from ES using canonical ISTQB glossary terms.
 *
 * Usage: node scripts/transform-istqb-ch2.mjs
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
/*  EN translation maps — Chapter 2                                    */
/* ================================================================== */

const EN_2_1 = {
  // Headings
  "Modelos de Desarrollo de Software y Testing": "Software Development Models and Testing",
  "Modelo Waterfall (Cascada)": "Waterfall Model",
  "Modelos Iterativos/Ágiles (Scrum, Kanban)": "Iterative/Agile Models (Scrum, Kanban)",
  "DevOps y Shift-Left": "DevOps and Shift-Left",
  // Paragraphs
  "El testing debe adaptarse al modelo de desarrollo utilizado:":
    "Testing must adapt to the development model being used:",
  "DevOps combina el desarrollo y las operaciones para entregar software más rápidamente. El shift-left mueve el testing hacia las fases más tempranas del SDLC.":
    "DevOps combines development and operations to deliver software more quickly. Shift-left moves testing to the earliest phases of the SDLC.",
  // Callouts
  "📌 Shift-left en práctica:\n  \n    Revisiones de requisitos (antes de diseñar)\n    TDD: escribir pruebas antes del código\n    ATDD: criterios de aceptación como pruebas\n    Integración continua con pruebas automáticas":
    "📌 Shift-left in practice:\n  \n    Requirements reviews (before designing)\n    TDD: writing tests before code\n    ATDD: acceptance criteria as tests\n    Continuous integration with automated tests",
  "💡 Principio: En cualquier modelo de SDLC, el testing debe comenzar lo antes posible (Principio 3: testing temprano).":
    "💡 Principle: In any SDLC model, testing should start as early as possible (Principle 3: early testing).",
  // List items — Waterfall
  "Las fases son secuenciales: requisitos → diseño → código → pruebas → mantenimiento":
    "Phases are sequential: requirements → design → code → tests → maintenance",
  "El testing ocurre después de que el desarrollo está completo":
    "Testing occurs after development is complete",
  "Los defectos encontrados tardíamente son muy costosos":
    "Defects found late are very expensive",
  "Testing más formal y documentado":
    "More formal and documented testing",
  // List items — Agile
  "El testing se integra en cada iteración/sprint":
    "Testing is integrated into each iteration/sprint",
  "Los testers colaboran con desarrolladores desde el inicio":
    "Testers collaborate with developers from the start",
  "Testing continuo con feedback rápido":
    "Continuous testing with fast feedback",
  "Automatización es esencial para mantener el ritmo":
    "Automation is essential to maintain the pace",
};

const EN_2_2 = {
  // Headings
  "Los 4 Niveles de Prueba": "The 4 Test Levels",
  "Los niveles de prueba son grupos de actividades de testing organizadas y gestionadas juntos. Cada nivel corresponde a una fase del desarrollo.":
    "Test levels are groups of testing activities organized and managed together. Each level corresponds to a development phase.",
  "Prueba de Componente / Unitaria": "Component / Unit Testing",
  "Verifica componentes individuales en aislamiento. También llamada prueba unitaria.":
    "Verifies individual components in isolation. Also called unit testing.",
  "Prueba de Integración de Componentes": "Component Integration Testing",
  "Verifica la interacción entre componentes integrados.":
    "Verifies the interaction between integrated components.",
  "Prueba de Sistema": "System Testing",
  "Verifica el comportamiento del sistema completo de extremo a extremo.":
    "Verifies the behavior of the complete system end-to-end.",
  "Prueba de Aceptación": "Acceptance Testing",
  "Verifica si el sistema cumple con los criterios de aceptación del negocio y es listo para entrega.":
    "Verifies whether the system meets business acceptance criteria and is ready for delivery.",
  // List items — Component
  "Objeto de prueba: Código fuente, módulos, clases":
    "Test object: Source code, modules, classes",
  "Defectos típicos: Errores de código, malos caminos en el flujo":
    "Typical defects: Code errors, wrong paths in the flow",
  "Entorno: Stubs y drivers para simular dependencias":
    "Environment: Stubs and drivers to simulate dependencies",
  "Realizado por: Desarrolladores":
    "Performed by: Developers",
  // List items — Integration
  "Objeto de prueba: Interfaces, APIs, flujos de datos entre módulos":
    "Test object: Interfaces, APIs, data flows between modules",
  "Defectos típicos: Comunicación incorrecta entre componentes":
    "Typical defects: Incorrect communication between components",
  "Enfoques: Bottom-up, Top-down, Big-bang, Sandwich":
    "Approaches: Bottom-up, Top-down, Big-bang, Sandwich",
  // List items — System
  "Objeto de prueba: Sistema completo, aplicación end-to-end":
    "Test object: Complete system, end-to-end application",
  "Defectos típicos: Flujos de datos incorrectos, fallos funcionales del sistema":
    "Typical defects: Incorrect data flows, system functional failures",
  "Realizado por: Equipo de pruebas independiente":
    "Performed by: Independent test team",
  // List items — Acceptance
  "UAT (User Acceptance Testing): Usuarios finales":
    "UAT (User Acceptance Testing): End users",
  "BAT (Business Acceptance Testing): Procesos de negocio":
    "BAT (Business Acceptance Testing): Business processes",
  "Alpha testing: En el sitio del desarrollador":
    "Alpha testing: At the developer's site",
  "Beta testing: En el entorno del cliente":
    "Beta testing: In the customer's environment",
  "Regulatory testing: Cumplimiento legal":
    "Regulatory testing: Legal compliance",
  // Table
  "Nivel": "Level",
  "¿Qué verifica?": "What it verifies",
  "¿Quién?": "Who?",
  "Componente": "Component",
  "Módulos individuales": "Individual modules",
  "Desarrolladores": "Developers",
  "Integración": "Integration",
  "Interacción entre componentes": "Interaction between components",
  "Desarrolladores / Testers": "Developers / Testers",
  "Sistema": "System",
  "Sistema completo": "Complete system",
  "Testers independientes": "Independent testers",
  "Aceptación": "Acceptance",
  "Necesidades del negocio/usuario": "Business/user needs",
  "Usuarios / Clientes": "Users / Clients",
};

const EN_2_3 = {
  // Headings
  "Tipos de Prueba": "Test Types",
  "Los tipos de prueba categorizan las pruebas según su objetivo:":
    "Test types categorize tests according to their objective:",
  "Pruebas Funcionales": "Functional Testing",
  "Verifican QUÉ hace el sistema (comportamiento funcional). Evalúan características, funciones y comportamiento del sistema.":
    "Verify WHAT the system does (functional behavior). They evaluate features, functions and system behavior.",
  "Pruebas No Funcionales": "Non-Functional Testing",
  "Verifican CÓMO se comporta el sistema. Cubren características de calidad que no son funciones específicas.":
    "Verify HOW the system behaves. They cover quality characteristics that are not specific functions.",
  "Pruebas de Caja Blanca": "White-Box Testing",
  "Basadas en la estructura interna del código. Se derivan de la implementación del software (sentencias, ramas, rutas).":
    "Based on the internal structure of the code. Derived from software implementation (statements, branches, paths).",
  "Pruebas Relacionadas con Cambios": "Change-Related Testing",
  "Confirmación: Verifica que un defecto corregido ya no falla":
    "Confirmation: Verifies that a fixed defect no longer fails",
  "Regresión: Verifica que los cambios no introdujeron nuevos defectos":
    "Regression: Verifies that changes have not introduced new defects",
  // Callouts
  "⚠️ Para el examen: Distingue entre pruebas funcionales (QUÉ hace el sistema) y no funcionales (CÓMO lo hace).":
    "⚠️ For the exam: Distinguish between functional tests (WHAT the system does) and non-functional tests (HOW it does it).",
  // List items — Functional
  "Prueba de funcionalidad": "Functionality testing",
  "Prueba de regresión": "Regression testing",
  "Prueba de humo (smoke/sanity)": "Smoke testing (smoke/sanity)",
  // Table
  "Tipo": "Type",
  "Qué evalúa": "What it evaluates",
  "Rendimiento/Carga": "Performance/Load",
  "Velocidad, escalabilidad bajo carga": "Speed, scalability under load",
  "Seguridad": "Security",
  "Vulnerabilidades, acceso no autorizado": "Vulnerabilities, unauthorized access",
  "Usabilidad": "Usability",
  "Facilidad de uso, experiencia de usuario": "Ease of use, user experience",
  "Fiabilidad": "Reliability",
  "Disponibilidad, tolerancia a fallos": "Availability, fault tolerance",
  "Compatibilidad": "Compatibility",
  "Interoperabilidad con otros sistemas": "Interoperability with other systems",
  "Mantenibilidad": "Maintainability",
  "Facilidad de modificación": "Ease of modification",
};

const EN_2_4 = {
  // Headings
  "¿Qué son las pruebas de mantenimiento?": "What is maintenance testing?",
  "Las pruebas de mantenimiento se realizan sobre un sistema ya operativo cuando se producen cambios, migraciones o retiradas del software. A diferencia de otros niveles de prueba, no se inician desde cero: el sistema ya existe y funciona en producción.":
    "Maintenance testing is performed on an already operational system when changes, migrations or retirements occur. Unlike other test levels, it doesn't start from scratch: the system already exists and runs in production.",
  "Tipos de cambios que desencadenan pruebas de mantenimiento": "Types of changes that trigger maintenance testing",
  "Análisis de impacto (Impact Analysis)": "Impact Analysis",
  "Antes de ejecutar pruebas de mantenimiento se realiza un análisis de impacto para:":
    "Before executing maintenance tests, an impact analysis is performed to:",
  "Pruebas de regresión en el mantenimiento": "Regression testing in maintenance",
  "Después de cualquier cambio se ejecutan pruebas de regresión para confirmar que las modificaciones no han introducido nuevos defectos en partes del sistema que antes funcionaban correctamente.":
    "After any change, regression tests are executed to confirm that modifications haven't introduced new defects in parts of the system that previously worked correctly.",
  "Relación con la gestión de configuración": "Relationship with configuration management",
  "Las pruebas de mantenimiento dependen de una buena gestión de configuración: necesitas saber exactamente qué versión del sistema está en producción y qué artefactos han cambiado para poder enfocar las pruebas correctamente.":
    "Maintenance testing depends on good configuration management: you need to know exactly which version of the system is in production and which artifacts have changed to properly focus the tests.",
  // Callouts
  "💡 Clave: Las pruebas de mantenimiento siempre tienen un desencadenante (trigger) que las activa: una modificación, una migración o una retirada del sistema.":
    "💡 Key point: Maintenance testing always has a trigger that activates it: a modification, migration or retirement of the system.",
  "⚠️ Dificultad del análisis de impacto: Si la documentación del sistema está desactualizada o no existe, identificar las áreas afectadas se vuelve muy difícil. Esto aumenta el riesgo de que cambios aparentemente pequeños rompan funcionalidades inesperadas.":
    "⚠️ Impact analysis difficulty: If system documentation is outdated or missing, identifying affected areas becomes very difficult. This increases the risk that apparently small changes break unexpected functionality.",
  "📌 Ejemplo real: Una empresa actualiza su módulo de cálculo de impuestos. El análisis de impacto identifica que los módulos de facturación, informes y exportación a contabilidad dependen de ese cálculo. Se ejecutan pruebas de regresión sobre esos tres módulos además de los tests específicos del nuevo cálculo.":
    "📌 Real example: A company updates its tax calculation module. Impact analysis identifies that the billing, reporting and accounting export modules depend on that calculation. Regression tests are run on those three modules in addition to specific tests for the new calculation.",
  "💡 Para el examen: Recuerda los tres desencadenantes principales: modificación, migración y retirada. Y que el análisis de impacto precede siempre a las pruebas de mantenimiento.":
    "💡 For the exam: Remember the three main triggers: modification, migration and retirement. And that impact analysis always precedes maintenance testing.",
  // List items — Impact analysis
  "Identificar qué partes del sistema pueden verse afectadas por el cambio":
    "Identify which parts of the system may be affected by the change",
  "Determinar el alcance de las pruebas de regresión necesarias":
    "Determine the scope of regression testing needed",
  "Estimar el coste y riesgo del cambio":
    "Estimate the cost and risk of the change",
  // Table
  "Tipo de cambio": "Change type",
  "Descripción": "Description",
  "Ejemplo": "Example",
  "Correctivo": "Corrective",
  "Corrección de defectos encontrados en producción": "Fixing defects found in production",
  "Fix de un bug reportado por un cliente": "Bug fix reported by a customer",
  "Adaptativo": "Adaptive",
  "Adaptación a cambios en el entorno": "Adapting to environment changes",
  "Migrar de Java 8 a Java 17": "Migrating from Java 8 to Java 17",
  "Perfectivo": "Perfective",
  "Mejoras de rendimiento o usabilidad": "Performance or usability improvements",
  "Optimizar una consulta SQL lenta": "Optimizing a slow SQL query",
  "Migración": "Migration",
  "Mover datos o sistema a nueva plataforma": "Moving data or system to a new platform",
  "Migrar de base de datos on-premise a la nube": "Migrating from on-premise to cloud database",
  "Retirada": "Retirement",
  "Retirar el sistema del servicio": "Taking the system out of service",
  "Verificar que los datos migrados son correctos antes de apagar el sistema antiguo":
    "Verifying migrated data is correct before shutting down the old system",
};

const CHAPTER2_MAPS = {
  "2.1": EN_2_1,
  "2.2": EN_2_2,
  "2.3": EN_2_3,
  "2.4": EN_2_4,
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
/*  Generate Chapter 2 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-sdlc";
const chapter = CHAPTERS[1]; // Chapter index 1 = SDLC
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER2_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 1 at end of last lesson
  if (topicId === topicIds[topicIds.length - 1]) {
    const FLASHCARDS = extractGlobal(contentSrc, "FLASHCARDS");
    const fcs = FLASHCARDS.filter((fc) => fc.chapter === 1);
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
 * Testing Throughout the SDLC — ISTQB CTFL v4.0, Chapter 2
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
