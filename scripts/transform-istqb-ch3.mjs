/**
 * Transform v2 — Chapter 3 batch (lessons 3.1–3.2).
 *
 * Usage: node scripts/transform-istqb-ch3.mjs
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
/*  EN translation maps — Chapter 3                                    */
/* ================================================================== */

const EN_3_1 = {
  // Headings
  "¿Qué es el Testing Estático?": "What is Static Testing?",
  "Análisis Estático": "Static Analysis",
  "Beneficios del Testing Estático": "Benefits of Static Testing",
  // Paragraphs
  "El testing estático evalúa artefactos de software sin ejecutar el software. Puede aplicarse a:":
    "Static testing evaluates software artifacts without executing the software. It can be applied to:",
  "El análisis estático es el proceso automatizado de examinar el código fuente sin ejecutarlo. Las herramientas de análisis estático detectan:":
    "Static analysis is the automated process of examining source code without executing it. Static analysis tools detect:",
  // Callouts
  "📌 Herramientas comunes: SonarQube, ESLint, FindBugs, PMD, Checkstyle.":
    "📌 Common tools: SonarQube, ESLint, FindBugs, PMD, Checkstyle.",
  "💡 Defectos típicos encontrados en testing estático:\n  \n• Requisitos ambiguos o contradictorios\n  \n• Errores de diseño o interfaces\n  \n• Código no seguro o difícil de mantener\n  \n• Desviaciones de los estándares de codificación":
    "💡 Typical defects found in static testing:\n  \n• Ambiguous or contradictory requirements\n  \n• Design or interface errors\n  \n• Insecure or hard-to-maintain code\n  \n• Deviations from coding standards",
  // List items — applicable to
  "Especificaciones de requisitos": "Requirements specifications",
  "Historias de usuario y criterios de aceptación": "User stories and acceptance criteria",
  "Diseño del sistema y arquitectura": "System design and architecture",
  "Código fuente": "Source code",
  "Documentación técnica y de pruebas": "Technical and test documentation",
  "Contratos y planes de proyecto": "Contracts and project plans",
  // List items — static analysis detects
  "Violaciones de estándares de codificación": "Coding standard violations",
  "Variables no inicializadas o no usadas": "Uninitialized or unused variables",
  "Dead code (código muerto nunca ejecutado)": "Dead code (never executed code)",
  "Vulnerabilidades de seguridad (SQL injection, XSS, etc.)": "Security vulnerabilities (SQL injection, XSS, etc.)",
  "Complejidad ciclomática alta": "High cyclomatic complexity",
  // List items — benefits
  "Detecta defectos antes de la ejecución (más barato corregir)":
    "Detects defects before execution (cheaper to fix)",
  "Encuentra defectos que el testing dinámico no puede detectar fácilmente":
    "Finds defects that dynamic testing cannot easily detect",
  "Mejora la calidad del código y la documentación":
    "Improves code and documentation quality",
  "Facilita la comunicación entre el equipo":
    "Facilitates communication within the team",
  "Reduce el tiempo de testing dinámico posterior":
    "Reduces subsequent dynamic testing time",
};

const EN_3_2 = {
  // Headings
  "Tipos de Revisión": "Review Types",
  "Roles en una Revisión Formal": "Roles in a Formal Review",
  "Proceso de Revisión": "Review Process",
  // Callouts
  "💡 Para el examen: La INSPECCIÓN es la revisión más formal. El WALKTHROUGH es guiado por el autor. La revisión INFORMAL no tiene proceso definido.":
    "💡 For the exam: INSPECTION is the most formal review. WALKTHROUGH is author-led. INFORMAL review has no defined process.",
  // List items — Roles
  "Autor: Creó el producto de trabajo que se revisa":
    "Author: Created the work product being reviewed",
  "Moderador (Manager): Facilita el proceso, asegura la eficacia":
    "Moderator (Manager): Facilitates the process, ensures effectiveness",
  "Escritor/Escriba: Documenta los defectos encontrados":
    "Scribe: Documents the defects found",
  "Revisores (Inspectores): Analizan el producto de trabajo":
    "Reviewers (Inspectors): Analyze the work product",
  "Líder de revisión: Planifica y organiza la revisión":
    "Review leader: Plans and organizes the review",
  // List items — Process (ordered)
  "Planificación: Definir alcance, criterios de entrada/salida, asignar roles":
    "Planning: Define scope, entry/exit criteria, assign roles",
  "Inicio: Distribuir materiales, verificar criterios de entrada":
    "Kick-off: Distribute materials, verify entry criteria",
  "Revisión individual: Cada revisor examina el producto de trabajo":
    "Individual review: Each reviewer examines the work product",
  "Comunicación y análisis: Reunión para discutir los hallazgos":
    "Communication and analysis: Meeting to discuss findings",
    "Corrección y reporte: El autor corrige; se genera el informe":
    "Correction and reporting: Author corrects; report is generated",
  "Seguimiento: Verificar que los defectos fueron corregidos":
    "Follow-up: Verify that defects were corrected",
  // Table
  "Tipo": "Type",
  "Formalidad": "Formality",
  "Guiado por": "Led by",
  "Objetivo": "Objective",
  "Informal": "Informal",
  "Muy baja": "Very low",
  "Cualquiera": "Anyone",
  "Encontrar defectos rápidamente": "Find defects quickly",
  "Walkthrough": "Walkthrough",
  "Baja-Media": "Low-Medium",
  "Autor": "Author",
  "Aprendizaje del equipo": "Team learning",
  "Revisión técnica": "Technical review",
  "Media": "Medium",
  "Moderador": "Moderator",
  "Consenso técnico": "Technical consensus",
  "Inspección": "Inspection",
  "Alta": "High",
  "Moderador certificado": "Certified moderator",
  "Máxima detección de defectos": "Maximum defect detection",
};

const CHAPTER3_MAPS = {
  "3.1": EN_3_1,
  "3.2": EN_3_2,
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
/*  Generate Chapter 3 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-static-testing";
const chapter = CHAPTERS[2]; // Chapter index 2 = Static Testing
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER3_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 2 at end of last lesson
  if (topicId === topicIds[topicIds.length - 1]) {
    const fcs = FLASHCARDS.filter((fc) => fc.chapter === 2);
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
 * Static Testing — ISTQB CTFL v4.0, Chapter 3
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
