/**
 * Transform v2 — Chapter 6 batch (lesson 6.1).
 *
 * Usage: node scripts/transform-istqb-ch6.mjs
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
/*  EN translation maps — Chapter 6                                    */
/* ================================================================== */

const EN_6_1 = {
  "Herramientas de Testing": "Testing Tools",
  "Las herramientas de testing pueden soportar muchas actividades del proceso de prueba:":
    "Testing tools can support many activities of the test process:",
  "Categorías de Herramientas": "Tool Categories",
  "Categoría": "Category",
  "Ejemplos": "Examples",
  "Gestión de pruebas": "Test management",
  "Análisis estático": "Static analysis",
  "Automatización de UI": "UI automation",
  "Pruebas de API": "API testing",
  "Pruebas de rendimiento": "Performance testing",
  "Pruebas unitarias": "Unit testing",
  "CI/CD": "CI/CD",
  "Seguimiento de defectos": "Defect tracking",
  "Beneficios de la Automatización": "Benefits of Automation",
  "Ejecución más rápida de pruebas de regresión": "Faster regression test execution",
  "Mayor consistencia y repetibilidad": "Greater consistency and repeatability",
  "Cobertura ampliada (más pruebas en menos tiempo)": "Extended coverage (more tests in less time)",
  "Disponibilidad 24/7 (integración continua)": "24/7 availability (continuous integration)",
  "Reducción del trabajo manual repetitivo": "Reduction of repetitive manual work",
  "Riesgos de la Automatización": "Risks of Automation",
  "Expectativas poco realistas sobre los beneficios": "Unrealistic expectations about benefits",
  "Alto costo inicial de implementación": "High initial implementation cost",
  "Mantenimiento costoso de scripts (especialmente con UI cambiante)":
    "Costly script maintenance (especially with changing UI)",
  "Falsa sensación de seguridad": "False sense of security",
  "Dependencia de herramientas específicas": "Dependency on specific tools",
  "💡 Consideraciones para adoptar herramientas:\n  \n1. Evaluar la madurez del proceso existente\n  \n2. Pilotar antes de adoptar masivamente\n  \n3. Capacitar al equipo\n  \n4. Establecer métricas de ROI claras":
    "💡 Considerations for tool adoption:\n  \n1. Assess the maturity of the existing process\n  \n2. Pilot before mass adoption\n  \n3. Train the team\n  \n4. Establish clear ROI metrics",
};

const CHAPTER6_MAPS = {
  "6.1": EN_6_1,
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
/*  Generate Chapter 6 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-tools";
const chapter = CHAPTERS[5]; // Chapter index 5 = Tool Support for Testing
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER6_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 6 at end of last lesson
  if (topicId === topicIds[topicIds.length - 1]) {
    const fcs = FLASHCARDS.filter((fc) => fc.chapter === 5);
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
 * Tool Support for Testing — ISTQB CTFL v4.0, Chapter 6
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
