/**
 * ISTQB CTFL — Banco de preguntas Módulo 6 (Soporte de Herramientas al Testing).
 * Cubre el Capítulo 6 del syllabus: categorías de herramientas de testing,
 * y beneficios y riesgos de la automatización de pruebas.
 * Fuentes: ISTQB CTFL v4.0 Syllabus (cap. 6), ISTQB Glossary.
 */

import type { ExamQuestion } from "@/types/exam";
import { registerQuestions } from "@/lib/exam/scoring";

const M = ["istqb-tools"];

const QUESTIONS: ExamQuestion[] = [
  {
    id: "istqb-m6-e1",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál de estas es una categoría de herramienta de soporte al testing?", en: "Which of these is a category of test support tool?" },
    options: [
      { id: "a", text: { es: "Herramientas de gestión de pruebas y de gestión de defectos", en: "Test management and defect management tools" } },
      { id: "b", text: { es: "Procesadores de texto exclusivamente", en: "Word processors only" } },
      { id: "c", text: { es: "Hojas de cálculo de contabilidad", en: "Accounting spreadsheets" } },
      { id: "d", text: { es: "Editores de imágenes", en: "Image editors" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El syllabus describe herramientas para gestión de pruebas, gestión de defectos, testing estático, diseño/datos, ejecución y medición de cobertura, entre otras.", en: "The syllabus describes tools for test management, defect management, static testing, design/data, execution and coverage measurement, among others." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "istqb-m6-e2",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "Jira con Xray o Azure Test Plans son ejemplos de herramientas de…", en: "Jira with Xray or Azure Test Plans are examples of tools for…" },
    options: [
      { id: "a", text: { es: "Gestión de pruebas y seguimiento", en: "Test management and tracking" } },
      { id: "b", text: { es: "Compilación de código", en: "Code compilation" } },
      { id: "c", text: { es: "Edición de vídeo", en: "Video editing" } },
      { id: "d", text: { es: "Diseño gráfico", en: "Graphic design" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Estas herramientas gestionan casos, ejecuciones, trazabilidad y defectos; son herramientas de gestión de pruebas.", en: "These tools manage cases, executions, traceability and defects; they are test management tools." },
    points: 1,
    timeEstimateSeconds: 40,
  },
  {
    id: "istqb-m6-e3",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál es un beneficio típico de la automatización de pruebas?", en: "What is a typical benefit of test automation?" },
    options: [
      { id: "a", text: { es: "Reducir el esfuerzo manual repetitivo y aumentar la consistencia en tareas frecuentes", en: "Reduce repetitive manual effort and increase consistency in frequent tasks" } },
      { id: "b", text: { es: "Garantizar que el software no tenga defectos", en: "Guarantee the software has no defects" } },
      { id: "c", text: { es: "Eliminar la necesidad de diseñar pruebas", en: "Remove the need to design tests" } },
      { id: "d", text: { es: "Sustituir por completo a los testers", en: "Fully replace testers" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La automatización reduce el esfuerzo repetitivo (p. ej. regresión), mejora la consistencia y libera tiempo, pero no garantiza ausencia de defectos.", en: "Automation reduces repetitive effort (e.g. regression), improves consistency and frees time, but does not guarantee absence of defects." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "istqb-m6-e4",
    type: "single_choice",
    difficulty: "easy",
    moduleIds: M,
    question: { es: "¿Cuál es un riesgo típico de la automatización de pruebas?", en: "What is a typical risk of test automation?" },
    options: [
      { id: "a", text: { es: "Expectativas poco realistas sobre lo que la herramienta puede lograr", en: "Unrealistic expectations about what the tool can achieve" } },
      { id: "b", text: { es: "Que reduzca el esfuerzo de regresión", en: "That it reduces regression effort" } },
      { id: "c", text: { es: "Que mejore la consistencia", en: "That it improves consistency" } },
      { id: "d", text: { es: "Que permita ejecutar más pruebas", en: "That it allows running more tests" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Entre los riesgos: expectativas irreales, subestimar el coste de mantenimiento, dependencia del proveedor y descuidar el testing manual/exploratorio.", en: "Risks include unrealistic expectations, underestimating maintenance cost, vendor dependency and neglecting manual/exploratory testing." },
    points: 1,
    timeEstimateSeconds: 45,
  },
  {
    id: "istqb-m6-e5",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Una herramienta que mide qué porcentaje del código se ejecuta durante las pruebas es una herramienta de…", en: "A tool that measures what percentage of code runs during testing is a…" },
    options: [
      { id: "a", text: { es: "Medición de cobertura", en: "Coverage measurement tool" } },
      { id: "b", text: { es: "Gestión de requisitos", en: "Requirements management tool" } },
      { id: "c", text: { es: "Diseño gráfico", en: "Graphic design tool" } },
      { id: "d", text: { es: "Gestión de defectos", en: "Defect management tool" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Las herramientas de cobertura (coverage) instrumentan el código y reportan sentencias/ramas ejecutadas durante las pruebas.", en: "Coverage tools instrument the code and report statements/branches executed during testing." },
    points: 2,
    timeEstimateSeconds: 45,
  },
  {
    id: "istqb-m6-e6",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿Por qué el coste de mantenimiento es una consideración clave al automatizar?", en: "Why is maintenance cost a key consideration when automating?" },
    options: [
      { id: "a", text: { es: "Los scripts deben actualizarse cuando cambia la aplicación, o se vuelven frágiles e inútiles", en: "Scripts must be updated when the application changes, or they become brittle and useless" } },
      { id: "b", text: { es: "El mantenimiento no tiene ningún coste", en: "Maintenance has no cost at all" } },
      { id: "c", text: { es: "La automatización nunca necesita cambios", en: "Automation never needs changes" } },
      { id: "d", text: { es: "Solo importa el coste de la licencia inicial", en: "Only the initial license cost matters" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Si los scripts no se mantienen al ritmo de los cambios en la aplicación, fallan en falso y pierden valor; el mantenimiento puede superar el ahorro inicial.", en: "If scripts are not maintained as the application changes, they produce false failures and lose value; maintenance can outweigh the initial savings." },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "istqb-m6-e7",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "¿En cuál de estos casos es MENOS recomendable automatizar?", en: "In which of these cases is automation LEAST advisable?" },
    options: [
      { id: "a", text: { es: "Pruebas exploratorias y de usabilidad que requieren juicio humano", en: "Exploratory and usability testing that require human judgment" } },
      { id: "b", text: { es: "Pruebas de regresión estables y repetitivas", en: "Stable, repetitive regression tests" } },
      { id: "c", text: { es: "Pruebas de carga con miles de usuarios", en: "Load tests with thousands of users" } },
      { id: "d", text: { es: "Comprobaciones de datos masivas", en: "Massive data checks" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "Lo exploratorio y la usabilidad dependen del criterio humano; conviene reservar la automatización para tareas repetitivas, estables y de alto volumen.", en: "Exploratory and usability work depend on human judgment; automation is best reserved for repetitive, stable, high-volume tasks." },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "istqb-m6-e8",
    type: "single_choice",
    difficulty: "medium",
    moduleIds: M,
    question: { es: "Una herramienta de análisis estático del código se usa para…", en: "A static code analysis tool is used to…" },
    options: [
      { id: "a", text: { es: "Detectar defectos y violaciones de estándares sin ejecutar el código", en: "Detect defects and standard violations without executing the code" } },
      { id: "b", text: { es: "Medir el tiempo de respuesta en producción", en: "Measure response time in production" } },
      { id: "c", text: { es: "Gestionar el backlog del producto", en: "Manage the product backlog" } },
      { id: "d", text: { es: "Diseñar la interfaz de usuario", en: "Design the user interface" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El análisis estático (linters, SAST) examina el código fuente y detecta defectos potenciales, code smells y violaciones de estándares sin ejecutarlo.", en: "Static analysis (linters, SAST) examines source code and detects potential defects, code smells and standard violations without running it." },
    points: 2,
    timeEstimateSeconds: 50,
  },
  {
    id: "istqb-m6-e9",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "Un equipo quiere ejecutar 500 casos de regresión en cada despliegue, varias veces al día. ¿Qué enfoque es el más adecuado?", en: "A team wants to run 500 regression cases on every deployment, several times a day. Which approach is most appropriate?" },
    options: [
      { id: "a", text: { es: "Automatizar la suite de regresión e integrarla en CI/CD", en: "Automate the regression suite and integrate it into CI/CD" } },
      { id: "b", text: { es: "Ejecutarlos manualmente cada vez", en: "Run them manually every time" } },
      { id: "c", text: { es: "Dejar de hacer regresión", en: "Stop doing regression" } },
      { id: "d", text: { es: "Probar solo una vez al mes", en: "Test only once a month" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "La regresión estable, voluminosa y de alta frecuencia es el caso ideal para automatizar e integrar en el pipeline de CI/CD.", en: "Stable, high-volume, high-frequency regression is the ideal case to automate and integrate into the CI/CD pipeline." },
    points: 3,
    timeEstimateSeconds: 55,
  },
  {
    id: "istqb-m6-e10",
    type: "single_choice",
    difficulty: "hard",
    moduleIds: M,
    question: { es: "¿Qué afirmación sobre el retorno de inversión (ROI) de la automatización es correcta?", en: "Which statement about automation return on investment (ROI) is correct?" },
    options: [
      { id: "a", text: { es: "El ROI debe considerar la inversión inicial y el coste de mantenimiento frente al ahorro a lo largo del tiempo", en: "ROI must weigh the initial investment and maintenance cost against the savings over time" } },
      { id: "b", text: { es: "La automatización siempre tiene ROI positivo desde el primer día", en: "Automation always has positive ROI from day one" } },
      { id: "c", text: { es: "El ROI solo depende del precio de la licencia", en: "ROI depends only on the license price" } },
      { id: "d", text: { es: "El mantenimiento no afecta al ROI", en: "Maintenance does not affect ROI" } },
    ],
    correctOptionIds: ["a"],
    explanation: { es: "El ROI real de automatizar surge cuando el ahorro acumulado supera la inversión inicial más el mantenimiento; suele requerir varias ejecuciones para amortizarse.", en: "Real automation ROI appears when accumulated savings exceed the initial investment plus maintenance; it usually takes several runs to pay off." },
    points: 3,
    timeEstimateSeconds: 60,
  },
];

registerQuestions(QUESTIONS);

export default QUESTIONS;
