/**
 * Transform script: migration/content.js + migration/questions.js
 * → 6 ISTQB module files in src/lib/constants/lessons/
 *
 * Usage: node scripts/transform-istqb.mjs
 */

import { parse } from "node-html-parser";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

/* ------------------------------------------------------------------ */
/*  Load migration data (CommonJS globals)                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Chapter → Module mapping                                           */
/* ------------------------------------------------------------------ */

const CHAPTER_TO_MODULE = [
  { chapterIdx: 0, moduleId: "istqb-fundamentals", topicPrefix: "1" },
  { chapterIdx: 1, moduleId: "istqb-sdlc", topicPrefix: "2" },
  { chapterIdx: 2, moduleId: "istqb-static-testing", topicPrefix: "3" },
  { chapterIdx: 3, moduleId: "istqb-test-analysis", topicPrefix: "4" },
  { chapterIdx: 4, moduleId: "istqb-management", topicPrefix: "5" },
  { chapterIdx: 5, moduleId: "istqb-tools", topicPrefix: "6" },
];

/* ------------------------------------------------------------------ */
/*  HTML → typed sections[] for a single language                      */
/* ------------------------------------------------------------------ */

function parseHtml(html, lang) {
  const root = parse(html);
  const sections = [];

  function text(node) {
    return node.textContent.trim();
  }

  function innerClean(node) {
    return node.textContent.trim();
  }

  for (const child of root.childNodes) {
    if (child.nodeType === 3) {
      const t = child.text.trim();
      if (t) sections.push({ type: "paragraph", lang, text: t });
      continue;
    }
    if (child.nodeType !== 1) continue;

    const tag = child.tagName.toLowerCase();

    if (tag === "h3") {
      sections.push({ type: "heading", level: 2, lang, text: text(child) });
    } else if (tag === "h4") {
      sections.push({ type: "heading", level: 3, lang, text: text(child) });
    } else if (tag === "p") {
      const t = innerClean(child);
      if (t) sections.push({ type: "paragraph", lang, text: t });
    } else if (tag === "ul" || tag === "ol") {
      const items = [];
      for (const li of child.querySelectorAll("li")) {
        items.push(innerClean(li));
      }
      if (items.length > 0) {
        sections.push({ type: "list", ordered: tag === "ol", lang, items });
      }
    } else if (tag === "code") {
      sections.push({ type: "code", language: "typescript", code: child.textContent });
    } else if (tag === "pre") {
      const codeEl = child.querySelector("code");
      sections.push({ type: "code", language: "typescript", code: codeEl ? codeEl.textContent : child.textContent });
    } else if (tag === "table") {
      const headers = [];
      const rows = [];
      const trs = child.querySelectorAll("tr");
      let headerParsed = false;
      for (const tr of trs) {
        const ths = tr.querySelectorAll("th");
        const tds = tr.querySelectorAll("td");
        if (!headerParsed && ths.length > 0 && ths.length === tds.length + ths.length) {
          // All ths - this is the header row
          // Actually let's check if all cells are th
        }
        const cells = [];
        const allCells = tr.querySelectorAll("td, th");
        for (const td of allCells) {
          cells.push(innerClean(td));
        }
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
      sections.push({ type: "callout", variant, lang, text: innerClean(child) });
    }
  }

  return sections;
}

/* ------------------------------------------------------------------ */
/*  Merge ES + EN parsed sections into bilingual LessonSection[]       */
/* ------------------------------------------------------------------ */

function mergeSections(esSections, enSections) {
  const result = [];
  const maxLen = Math.max(esSections.length, enSections.length);

  for (let i = 0; i < maxLen; i++) {
    const es = esSections[i];
    const en = enSections[i];

    if (!es) {
      result.push(buildSection(en, "en"));
      continue;
    }
    if (!en) {
      result.push(buildSection(es, "es"));
      continue;
    }

    // Both exist - merge
    if (es.type !== en.type) {
      // Type mismatch - use ES as primary, add EN text as paragraph
      result.push(buildSection(es, "es"));
      continue;
    }

    result.push(buildBilingualSection(es, en));
  }

  return result;
}

function buildSection(s, lang) {
  const bi = (text) => {
    const obj = { es: "", en: "" };
    obj[lang] = text;
    return obj;
  };

  switch (s.type) {
    case "heading":
      return { type: "heading", level: s.level, content: bi(s.text) };
    case "paragraph":
      return { type: "paragraph", content: bi(s.text) };
    case "callout":
      return { type: "callout", variant: s.variant, content: bi(s.text) };
    case "list":
      return { type: "list", ordered: s.ordered, items: s.items.map((t) => bi(t)) };
    case "code":
      return { type: "code", language: s.language, code: s.code };
    case "table":
      return {
        type: "table",
        headers: s.headers.map((h) => bi(h)),
        rows: s.rows.map((row) => ({ cells: row.map((c) => bi(c)) })),
      };
    default:
      return { type: "paragraph", content: bi("") };
  }
}

function buildBilingualSection(es, en) {
  switch (es.type) {
    case "heading":
      return { type: "heading", level: es.level, content: { es: es.text, en: en.text } };
    case "paragraph":
      return { type: "paragraph", content: { es: es.text, en: en.text } };
    case "callout":
      return { type: "callout", variant: es.variant, content: { es: es.text, en: en.text } };
    case "list": {
      const maxItems = Math.max(es.items.length, en.items.length);
      const items = [];
      for (let i = 0; i < maxItems; i++) {
        items.push({
          es: es.items[i] || "",
          en: en.items[i] || "",
        });
      }
      return { type: "list", ordered: es.ordered, items };
    }
    case "code":
      return { type: "code", language: es.language, code: es.code };
    case "table": {
      const maxHeaders = Math.max(es.headers.length, en.headers.length);
      const headers = [];
      for (let i = 0; i < maxHeaders; i++) {
        headers.push({ es: es.headers[i] || "", en: en.headers[i] || "" });
      }
      const maxRows = Math.max(es.rows.length, en.rows.length);
      const rows = [];
      for (let r = 0; r < maxRows; r++) {
        const esRow = es.rows[r] || [];
        const enRow = en.rows[r] || [];
        const maxCells = Math.max(esRow.length, enRow.length);
        const cells = [];
        for (let c = 0; c < maxCells; c++) {
          cells.push({ es: esRow[c] || "", en: enRow[c] || "" });
        }
        rows.push({ cells });
      }
      return { type: "table", headers, rows };
    }
    default:
      return { type: "paragraph", content: { es: es.text || "", en: en.text || "" } };
  }
}

/* ------------------------------------------------------------------ */
/*  Generate module files                                              */
/* ------------------------------------------------------------------ */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
let totalFlashcards = 0;
let totalLessons = 0;

for (const mapping of CHAPTER_TO_MODULE) {
  const { chapterIdx, moduleId } = mapping;
  const chapter = CHAPTERS[chapterIdx];
  if (!chapter) continue;

  const topicIds = chapter.topics.map((t) => t.id);
  const lessonBlocks = [];

  for (const topicId of topicIds) {
    const lesson = LESSONS[topicId];
    if (!lesson) {
      console.warn(`  ⚠ Lesson ${topicId} not found in LESSONS`);
      continue;
    }

    const esSections = parseHtml(lesson.es.content, "es");
    const enSections = parseHtml(lesson.en.content, "en");
    const sections = mergeSections(esSections, enSections);

    // Add flashcards for this chapter at the end of the last lesson in the chapter
    const isLastTopic = topicId === topicIds[topicIds.length - 1];
    if (isLastTopic) {
      const chapterFlashcards = FLASHCARDS.filter((fc) => fc.chapter === chapterIdx);
      for (const fc of chapterFlashcards) {
        sections.push({
          type: "flashcard",
          flashcardId: `istqb-fc-${fc.id}`,
          front: { es: fc.q.es, en: fc.q.en },
          back: { es: fc.a.es, en: fc.a.en },
        });
        totalFlashcards++;
      }
    }

    const lessonId = `istqb-l${topicId.replace(".", "-")}`;
    lessonBlocks.push({ topicId, lessonId, sections, titleEs: lesson.es.title, titleEn: lesson.en.title });
    totalLessons++;
  }

  // Write TypeScript file
  const ts = generateModuleTS(moduleId, lessonBlocks, chapter);
  writeFileSync(resolve(outputDir, `${moduleId}.ts`), ts, "utf-8");
  console.log(`✅ ${moduleId}.ts (${lessonBlocks.length} lessons)`);
}

function generateModuleTS(moduleId, lessonBlocks, chapter) {
  const imports = `import type { LessonContent } from "@/types/lesson";\n\nconst MODULE_ID = "${moduleId}";\n`;

  const lessonDefs = lessonBlocks
    .map((lb) => {
      const varName = `L_${lb.topicId.replace(".", "_")}`;
      const sectionsStr = JSON.stringify(lb.sections, null, 2);
      return `const ${varName}: LessonContent = {\n  id: "${lb.lessonId}",\n  moduleId: MODULE_ID,\n  sections: ${sectionsStr},\n};\n`;
    })
    .join("\n");

  const varNames = lessonBlocks.map((lb) => `L_${lb.topicId.replace(".", "_")}`);

  return `/**
 * ${chapter.title.en}
 * Auto-generated from migration/content.js
 */

${imports}
${lessonDefs}
export function getAllLessonsContent(): LessonContent[] {
  return [${varNames.join(", ")}];
}
`;
}

/* ------------------------------------------------------------------ */
/*  Generate exam questions file                                       */
/* ------------------------------------------------------------------ */

const examDir = resolve(ROOT, "src/lib/constants/examQuestions");
const examTS = generateExamQuestionsTS(QUESTIONS);
writeFileSync(resolve(examDir, "istqb.ts"), examTS, "utf-8");
console.log(`✅ istqb.ts (${QUESTIONS.length} questions)`);

function generateExamQuestionsTS(questions) {
  const questionsArr = questions.map((q) => {
    const options = q.options.es.map((opt, idx) => {
      const id = String.fromCharCode(97 + idx);
      return `      { id: "${id}", text: { es: ${JSON.stringify(opt)}, en: ${JSON.stringify(q.options.en[idx] || opt)} } }`;
    });

    const correctId = String.fromCharCode(97 + q.correct);

    return `  {
    id: "istqb-q${q.id}",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: ISTQB_MODULE_IDS,
    question: { es: ${JSON.stringify(q.q.es)}, en: ${JSON.stringify(q.q.en)} },
    options: [
${options.join(",\n")}
    ],
    correctOptionIds: ["${correctId}"],
    explanation: { es: ${JSON.stringify(q.explanation.es)}, en: ${JSON.stringify(q.explanation.en)} },
    points: 2,
    timeEstimateSeconds: 60,
  },`;
  });

  return `/**
 * ISTQB CTFL v4.0 Exam Question Bank
 * Auto-generated from migration/questions.js
 * 50 questions covering all 6 ISTQB chapters.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const ISTQB_MODULE_IDS = [
  "istqb-fundamentals",
  "istqb-sdlc",
  "istqb-static-testing",
  "istqb-test-analysis",
  "istqb-management",
  "istqb-tools",
];

const QUESTIONS: ExamQuestion[] = [
${questionsArr.join("\n\n")}
];

registerQuestions(QUESTIONS);
`;
}

console.log(`\n🎉 Transform complete!`);
console.log(`   ${totalLessons} lessons across 6 modules`);
console.log(`   ${totalFlashcards} flashcards embedded`);
console.log(`   ${QUESTIONS.length} exam questions registered`);
