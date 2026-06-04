/**
 * Transform v2 — Chapter 5 batch (lessons 5.1–5.5).
 *
 * Usage: node scripts/transform-istqb-ch5.mjs
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
/*  EN translation maps — Chapter 5                                    */
/* ================================================================== */

const EN_5_1 = {
  "El Plan de Pruebas": "The Test Plan",
  "El plan de pruebas documenta el enfoque, recursos, alcance y actividades del testing. Un plan de pruebas típico incluye:":
    "The test plan documents the approach, resources, scope and activities of testing. A typical test plan includes:",
  "Contexto (alcance, objetivos, stakeholders)": "Context (scope, objectives, stakeholders)",
  "Supuestos y restricciones": "Assumptions and constraints",
  "Comunicación y reporte de información": "Communication and information reporting",
  "Gestión de riesgos": "Risk management",
  "Enfoque de pruebas (niveles, tipos, técnicas)": "Test approach (levels, types, techniques)",
  "Criterios de entrada y salida": "Entry and exit criteria",
  "Estimación del esfuerzo": "Effort estimation",
  "Calendario de actividades": "Activity schedule",
  "Roles y responsabilidades": "Roles and responsibilities",
  "Criterios de Entrada y Salida": "Entry and Exit Criteria",
  "Criterios de Entrada": "Entry Criteria",
  "Criterios de Salida": "Exit Criteria",
  "El código está completo y compilado": "Code is complete and compiled",
  "Todos los casos de prueba ejecutados": "All test cases executed",
  "El entorno de pruebas está disponible": "Test environment is available",
  "90% de casos pasados": "90% of tests passed",
  "Los datos de prueba están preparados": "Test data is prepared",
  "Todos los defectos críticos cerrados": "All critical defects closed",
  "Los requisitos están aprobados": "Requirements are approved",
  "Informe de pruebas generado": "Test report generated",
  "Estimación del Esfuerzo de Testing": "Test Effort Estimation",
  "Las técnicas de estimación incluyen:": "Estimation techniques include:",
  "Basada en métricas: Usando datos históricos de proyectos similares":
    "Metrics-based: Using historical data from similar projects",
  "Basada en expertos: Planning Poker, estimación en 3 puntos":
    "Expert-based: Planning Poker, 3-point estimation",
  "Porcentaje del desarrollo: El testing suele representar el 20-40% del total":
    "Percentage of development: Testing usually represents 20-40% of the total",
};

const EN_5_2 = {
  "Riesgo en el Contexto del Testing": "Risk in the Testing Context",
  "Un riesgo es un factor potencial que puede resultar en una consecuencia negativa en el futuro. Se calcula como:":
    "A risk is a potential factor that can result in a negative consequence in the future. It is calculated as:",
  "📊 Nivel de Riesgo = Probabilidad × Impacto": "📊 Risk Level = Probability × Impact",
  "Tipos de Riesgo": "Risk Types",
  "Tipo": "Type",
  "Descripción": "Description",
  "Ejemplos": "Examples",
  "Riesgo de Producto": "Product Risk",
  "Posibilidad de que el producto no cumpla su función": "Possibility that the product won't meet its function",
  "Fallo de seguridad, rendimiento deficiente, funcionalidad incorrecta": "Security failure, poor performance, incorrect functionality",
  "Riesgo de Proyecto": "Project Risk",
  "Posibilidad de que el proyecto falle en sus objetivos": "Possibility that the project won't meet its objectives",
  "Exceso de presupuesto, retrasos, problemas de personal": "Budget overrun, delays, staffing issues",
  "Testing Basado en Riesgos": "Risk-Based Testing",
  "El testing basado en riesgos prioriza los esfuerzos de testing según el nivel de riesgo de cada área:":
    "Risk-based testing prioritizes testing efforts according to the risk level of each area:",
  "Identificar los riesgos del producto": "Identify product risks",
  "Evaluar su probabilidad e impacto": "Assess their probability and impact",
  "Priorizar el testing en áreas de mayor riesgo": "Prioritize testing in higher-risk areas",
  "Mitigar los riesgos mediante pruebas": "Mitigate risks through testing",
  "Monitorear los riesgos a lo largo del proyecto": "Monitor risks throughout the project",
  "📌 Ejemplo: En un sistema bancario, el módulo de transferencias tiene mayor riesgo que la página de inicio. Por lo tanto, se le asigna más esfuerzo de testing y técnicas más exhaustivas.":
    "📌 Example: In a banking system, the transfers module has higher risk than the home page. Therefore, more testing effort and more exhaustive techniques are assigned to it.",
};

const EN_5_3 = {
  "Monitoreo del testing": "Test monitoring",
  "El monitoreo es la recopilación continua de información sobre el progreso de las pruebas para compararlo con lo planificado. Responde a la pregunta: ¿dónde estamos?":
    "Monitoring is the ongoing collection of information about testing progress to compare it against the plan. It answers: where are we?",
  "Control del testing": "Test control",
  "El control es la toma de acciones correctivas basadas en la información recopilada. Responde a: ¿qué hacemos con lo que sabemos?":
    "Control is taking corrective actions based on collected information. It answers: what do we do with what we know?",
  "💡 Diferencia clave: Monitoreo = observar y medir. Control = actuar sobre lo observado.":
    "💡 Key difference: Monitoring = observe and measure. Control = act on what was observed.",
  "Métricas de prueba más utilizadas": "Commonly used test metrics",
  "Métrica": "Metric",
  "Porcentaje de trabajo completado": "Percentage of work completed",
  "Casos de prueba ejecutados / total planificados": "Test cases executed / total planned",
  "Cobertura de requisitos": "Requirements coverage",
  "% de requisitos cubiertos por al menos un test": "% of requirements covered by at least one test",
  "Densidad de defectos": "Defect density",
  "Número de defectos por módulo o componente": "Number of defects per module or component",
  "Defectos encontrados vs. cerrados": "Defects found vs. closed",
  "Tendencia de apertura/cierre de bugs": "Bug opening/closing trend",
  "Cobertura de código": "Code coverage",
  "% de código ejecutado por los tests": "% of code executed by tests",
  "Coste del testing": "Testing cost",
  "Coste real vs. coste planificado": "Actual cost vs. planned cost",
  "Informes de prueba (Test reports)": "Test reports",
  "El equipo de testing comunica su progreso mediante informes. Existen dos tipos principales:":
    "The testing team communicates its progress through reports. There are two main types:",
  "Informe de progreso de pruebas (Test progress report): Se genera periódicamente durante la ejecución. Incluye estado actual, avance, defectos encontrados y desviaciones del plan.":
    "Test progress report: Generated periodically during execution. Includes current status, progress, defects found and plan deviations.",
  "Informe de completitud de pruebas (Test completion report): Se genera al finalizar una fase de testing. Resume los resultados, lecciones aprendidas y recomendaciones para el futuro.":
    "Test completion report: Generated at the end of a testing phase. Summarizes results, lessons learned and future recommendations.",
  "Criterios de entrada y salida (Entry/Exit criteria)": "Entry and Exit criteria",
  "Los criterios de entrada (también llamados Definition of Ready) definen las condiciones que deben cumplirse antes de iniciar una actividad de testing:":
    "Entry criteria (also called Definition of Ready) define conditions that must be met before starting a testing activity:",
  "Entorno de prueba disponible y configurado": "Test environment available and configured",
  "Datos de prueba preparados": "Test data prepared",
  "Código del objeto de prueba disponible y estable": "Test object code available and stable",
  "Los criterios de salida (también llamados Definition of Done) definen cuándo el testing está suficientemente completo:":
    "Exit criteria (also called Definition of Done) define when testing is sufficiently complete:",
  "Porcentaje mínimo de casos de prueba ejecutados": "Minimum percentage of test cases executed",
  "Número máximo de defectos abiertos por severidad": "Maximum number of open defects by severity",
  "Cobertura mínima de requisitos o código alcanzada": "Minimum requirements or code coverage achieved",
  "⚠️ Para el examen: En contextos ágiles, los criterios de entrada/salida suelen llamarse Definition of Ready y Definition of Done respectivamente.":
    "⚠️ For the exam: In agile contexts, entry/exit criteria are often called Definition of Ready and Definition of Done respectively.",
  "📌 Ejemplo de acción de control: El monitoreo detecta que solo se han ejecutado el 40% de los casos de prueba cuando debería ser el 70%. El control puede implicar: reasignar testers, reducir alcance, negociar fecha de entrega o priorizar las pruebas de mayor riesgo.":
    "📌 Control action example: Monitoring detects only 40% of test cases executed when 70% was expected. Control may involve: reassigning testers, reducing scope, negotiating delivery date or prioritizing highest-risk tests.",
  "Gestión de completitud de pruebas": "Test completion management",
  "Al cierre de una fase o proyecto de testing se realizan las siguientes actividades:":
    "At the close of a testing phase or project, the following activities are performed:",
  "Verificar que todos los defectos están cerrados o aceptados como riesgo conocido":
    "Verify that all defects are closed or accepted as known risk",
  "Entregar el testware al equipo de mantenimiento": "Deliver testware to the maintenance team",
  "Analizar lecciones aprendidas para mejorar futuros proyectos": "Analyze lessons learned to improve future projects",
  "Archivar resultados, logs y evidencias de prueba": "Archive results, logs and test evidence",
};

const EN_5_4 = {
  "¿Qué es la gestión de la configuración?": "What is configuration management?",
  "La gestión de la configuración (CM) es una disciplina que proporciona control sobre los artefactos de software y testware a lo largo del proyecto. Su objetivo es mantener la integridad y trazabilidad de todos los elementos del proyecto.":
    "Configuration management (CM) is a discipline that provides control over software and testware artifacts throughout the project. Its goal is to maintain the integrity and traceability of all project elements.",
  "💡 Analogía: La gestión de la configuración es como el control de versiones de todo el proyecto — no solo del código, sino también de los casos de prueba, entornos, documentos y cualquier otro artefacto.":
    "💡 Analogy: Configuration management is like version control for the entire project — not just code, but also test cases, environments, documents and any other artifacts.",
  "Elementos bajo control de configuración (Configuration Items)": "Configuration Items",
  "Cualquier artefacto que necesita ser identificado, controlado y rastreado se denomina ítem de configuración:":
    "Any artifact that needs to be identified, controlled and tracked is called a configuration item:",
  "Código fuente y ejecutables": "Source code and executables",
  "Casos de prueba y scripts de prueba": "Test cases and test scripts",
  "Datos de prueba": "Test data",
  "Entornos de prueba (configuración de servidores, bases de datos)": "Test environments (server and database configurations)",
  "Documentación (requisitos, planes de prueba, informes)": "Documentation (requirements, test plans, reports)",
  "Herramientas y sus configuraciones": "Tools and their configurations",
  "Actividades principales de la gestión de la configuración": "Main CM activities",
  "Actividad": "Activity",
  "Identificación": "Identification",
  "Asignar un identificador único a cada ítem de configuración": "Assign a unique identifier to each configuration item",
  "Control de versiones": "Version control",
  "Registrar todos los cambios y poder recuperar versiones anteriores": "Record all changes and be able to retrieve previous versions",
  "Auditoría de configuración": "Configuration audit",
  "Verificar que los ítems son consistentes entre sí": "Verify that items are consistent with each other",
  "Reporting de estado": "Status reporting",
  "Informar sobre el estado y historial de cambios de los ítems": "Report on the status and change history of items",
  "Relación con el testing": "Relationship with testing",
  "La gestión de la configuración es fundamental para el testing porque:":
    "Configuration management is fundamental for testing because:",
  "Garantiza que los testers prueban la versión correcta del software": "Ensures testers test the correct version of the software",
  "Permite reproducir defectos en el entorno exacto donde ocurrieron": "Allows reproducing defects in the exact environment where they occurred",
  "Facilita la trazabilidad entre requisitos, código y casos de prueba": "Facilitates traceability between requirements, code and test cases",
  "Asegura que los entornos de prueba son consistentes y repetibles": "Ensures test environments are consistent and repeatable",
  "📌 Ejemplo: Sin gestión de configuración, un tester podría reportar un bug en la versión 2.1 del sistema, pero el desarrollador lo busca en la versión 2.3. El defecto \"desaparece\" porque el código cambió. Con CM, ambos trabajan sobre el mismo ítem identificado.":
    "📌 Example: Without CM, a tester might report a bug in version 2.1, but the developer looks for it in version 2.3. The defect \"disappears\" because the code changed. With CM, both work on the same identified item.",
  "Herramientas de gestión de configuración": "Configuration management tools",
  "Las herramientas más comunes en la industria son:": "The most common tools in the industry are:",
  "Control de versiones de código: Git, SVN": "Source code version control: Git, SVN",
  "Gestión de entornos: Docker, Ansible, Terraform": "Environment management: Docker, Ansible, Terraform",
  "Gestión de artefactos: Nexus, Artifactory": "Artifact management: Nexus, Artifactory",
  "Gestión de configuración de pruebas: TestRail, Xray (integrados con Jira)": "Test configuration management: TestRail, Xray (integrated with Jira)",
  "⚠️ Para el examen: La gestión de la configuración apoya al testing asegurando que todos los artefactos están identificados, versionados y son reproducibles. Recuerda que incluye testware (casos de prueba, datos, entornos) además del código.":
    "⚠️ For the exam: CM supports testing by ensuring all artifacts are identified, versioned and reproducible. Remember it includes testware (test cases, data, environments) in addition to code.",
  "Línea base (Baseline)": "Baseline",
  "Una línea base es una instantánea aprobada y verificada de un conjunto de ítems de configuración en un momento determinado. Solo puede modificarse mediante un proceso formal de control de cambios.":
    "A baseline is an approved and verified snapshot of a set of configuration items at a specific point in time. It can only be modified through a formal change control process.",
  "Ejemplo: la línea base de la versión 1.0 incluye el código, los casos de prueba ejecutados y los informes de prueba de ese release.":
    "Example: the version 1.0 baseline includes the code, executed test cases and test reports from that release.",
};

const EN_5_5 = {
  "El Ciclo de Vida de un Defecto": "Defect Lifecycle",
  "Un defecto pasa por diferentes estados desde que se detecta hasta que se cierra:":
    "A defect goes through different states from detection to closure:",
  "📌 Estados típicos:\n  \nNuevo → Asignado → En corrección → Pendiente retest → Reabierto / Cerrado":
    "📌 Typical states:\n  \nNew → Assigned → In Fix → Pending Retest → Reopened / Closed",
  "Informe de Defecto": "Defect Report",
  "Un informe de defecto bien escrito debe incluir:": "A well-written defect report should include:",
  "ID único y título descriptivo": "Unique ID and descriptive title",
  "Fecha de detección y autor": "Detection date and author",
  "Objeto de prueba (módulo, versión)": "Test object (module, version)",
  "Entorno de prueba (OS, browser, etc.)": "Test environment (OS, browser, etc.)",
  "Pasos para reproducir el defecto": "Steps to reproduce the defect",
  "Resultado esperado vs resultado actual": "Expected vs actual result",
  "Severidad y prioridad": "Severity and priority",
  "Evidencia: capturas de pantalla, logs": "Evidence: screenshots, logs",
  "Severidad vs Prioridad": "Severity vs Priority",
  "Alta prioridad": "High priority",
  "Baja prioridad": "Low priority",
  "Alta severidad": "High severity",
  "Sistema caído, afecta a todos": "System down, affects everyone",
  "Crash en función rara vez usada": "Crash in rarely used function",
  "Baja severidad": "Low severity",
  "Error tipográfico en página principal": "Typo on main page",
  "Error visual en pantalla de configuración": "Visual error on settings screen",
  "⚠️ Para el examen: Severidad = impacto técnico. Prioridad = urgencia de corrección. Son dimensiones independientes.":
    "⚠️ For the exam: Severity = technical impact. Priority = urgency of fix. Independent dimensions.",
};

const CHAPTER5_MAPS = {
  "5.1": EN_5_1,
  "5.2": EN_5_2,
  "5.3": EN_5_3,
  "5.4": EN_5_4,
  "5.5": EN_5_5,
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
/*  Generate Chapter 5 module file                                     */
/* ================================================================== */

const outputDir = resolve(ROOT, "src/lib/constants/lessons");
const moduleId = "istqb-management";
const chapter = CHAPTERS[4]; // Chapter index 4 = Managing Test Activities
const topicIds = chapter.topics.map((t) => t.id);
const lessonBlocks = [];

for (const topicId of topicIds) {
  const lesson = LESSONS[topicId];
  if (!lesson) { console.warn(`  ⚠ Lesson ${topicId} not found`); continue; }

  const enMap = CHAPTER5_MAPS[topicId] || {};
  console.log(`\n📖 Lesson ${topicId}: ${lesson.es.title}`);

  const esSections = parseHtml(lesson.es.content);
  const sections = buildBilingual(esSections, enMap);

  // Flashcards for chapter 5 at end of last lesson
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
 * Managing Test Activities — ISTQB CTFL v4.0, Chapter 5
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
