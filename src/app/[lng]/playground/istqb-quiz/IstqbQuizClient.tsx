"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface QuizQuestion {
  id: string;
  chapter: "1" | "2" | "3" | "4" | "5" | "6";
  difficulty: "easy" | "medium" | "hard";
  question: { es: string; en: string };
  options: { id: string; text: { es: string; en: string } }[]; // exactly 4
  correctId: string;
  explanation: { es: string; en: string }; // ends citing the chapter
}

const BANK: QuizQuestion[] = [
  /* -------------------------- Capítulo 1 -------------------------- */
  {
    id: "qz-1-1",
    chapter: "1",
    difficulty: "easy",
    question: {
      es: "¿Qué principio del testing establece que probar todas las combinaciones posibles de entradas y precondiciones es, salvo casos triviales, imposible?",
      en: "Which testing principle states that testing all possible combinations of inputs and preconditions is, except in trivial cases, impossible?",
    },
    options: [
      { id: "a", text: { es: "El testing muestra la presencia de defectos", en: "Testing shows the presence of defects" } },
      { id: "b", text: { es: "Las pruebas exhaustivas son imposibles", en: "Exhaustive testing is impossible" } },
      { id: "c", text: { es: "Las pruebas tempranas ahorran tiempo y dinero", en: "Early testing saves time and money" } },
      { id: "d", text: { es: "Los defectos se agrupan (defect clustering)", en: "Defects cluster together" } },
    ],
    correctId: "b",
    explanation: {
      es: "Es el principio 2. Excepto en casos triviales, las combinaciones de entradas, precondiciones y caminos son astronómicas, por lo que se usan técnicas de diseño y priorización por riesgo para elegir un subconjunto potente de casos, en vez de intentar cubrirlo todo. (Syllabus CTFL, cap. 1)",
      en: "This is principle 2. Except in trivial cases, the combinations of inputs, preconditions, and paths are astronomical, so design techniques and risk-based prioritization are used to choose a powerful subset of cases instead of trying to cover everything. (CTFL Syllabus, ch. 1)",
    },
  },
  {
    id: "qz-1-2",
    chapter: "1",
    difficulty: "easy",
    question: {
      es: "¿Cuál es el orden correcto de la cadena causal que describe cómo surge un fallo (failure)?",
      en: "What is the correct order of the causal chain that describes how a failure arises?",
    },
    options: [
      { id: "a", text: { es: "Error → defecto → fallo", en: "Error → defect → failure" } },
      { id: "b", text: { es: "Defecto → error → fallo", en: "Defect → error → failure" } },
      { id: "c", text: { es: "Fallo → error → defecto", en: "Failure → error → defect" } },
      { id: "d", text: { es: "Defecto → fallo → error", en: "Defect → failure → error" } },
    ],
    correctId: "a",
    explanation: {
      es: "Una persona comete un error humano (por ejemplo, malinterpretar un requisito), ese error queda plasmado como un defecto en el código o documento, y ese defecto puede manifestarse como un fallo observable cuando el software se ejecuta bajo ciertas condiciones. (Syllabus CTFL, cap. 1)",
      en: "A person makes a human error (for example, misreading a requirement), that error becomes a defect in the code or document, and that defect can surface as an observable failure when the software runs under certain conditions. (CTFL Syllabus, ch. 1)",
    },
  },
  {
    id: "qz-1-3",
    chapter: "1",
    difficulty: "medium",
    question: {
      es: "El principio \"el testing muestra la presencia de defectos, no su ausencia\" implica que...",
      en: 'The principle "testing shows the presence of defects, not their absence" implies that...',
    },
    options: [
      { id: "a", text: { es: "Encontrar cero defectos prueba que el software está libre de ellos", en: "Finding zero defects proves the software is defect-free" } },
      { id: "b", text: { es: "Aunque no se encuentren defectos, el testing no puede probar que el sistema está libre de ellos", en: "Even if no defects are found, testing cannot prove the system is free of them" } },
      { id: "c", text: { es: "Cada ciclo de pruebas debe encontrar al menos un defecto para ser válido", en: "Every test cycle must find at least one defect to be valid" } },
      { id: "d", text: { es: "Las pruebas estáticas no están sujetas a esta limitación porque no ejecutan código", en: "Static testing is exempt from this limitation because it doesn't execute code" } },
    ],
    correctId: "b",
    explanation: {
      es: "Este es el principio 1. El testing reduce la probabilidad de que queden defectos sin descubrir, pero incluso una ejecución sin hallazgos no demuestra que el sistema esté libre de defectos; la opción a es la falacia de la ausencia de errores. (Syllabus CTFL, cap. 1)",
      en: "This is principle 1. Testing reduces the probability of undiscovered defects remaining, but even a run with zero findings doesn't prove the system is defect-free; option a is the absence-of-errors fallacy. (CTFL Syllabus, ch. 1)",
    },
  },
  {
    id: "qz-1-4",
    chapter: "1",
    difficulty: "medium",
    question: {
      es: "¿Cuál es el principal beneficio de la independencia del tester respecto al equipo que desarrolló el código?",
      en: "What is the main benefit of tester independence from the team that developed the code?",
    },
    options: [
      { id: "a", text: { es: "Encuentra defectos distintos, al no compartir los supuestos ni sesgos del autor", en: "It finds different defects, since it doesn't share the author's assumptions or biases" } },
      { id: "b", text: { es: "Los testers independientes ejecutan las pruebas más rápido", en: "Independent testers execute tests faster" } },
      { id: "c", text: { es: "El testing independiente siempre resulta más barato que el de los desarrolladores", en: "Independent testing is always cheaper than developer testing" } },
      { id: "d", text: { es: "Sustituye la necesidad de hacer revisiones", en: "It replaces the need for reviews" } },
    ],
    correctId: "a",
    explanation: {
      es: "La independencia aporta una mirada objetiva, libre de los supuestos del autor del código, lo que ayuda a detectar defectos diferentes a los que encontraría quien escribió el software; no implica mayor velocidad, menor coste garantizado ni sustituye a las revisiones. (Syllabus CTFL, cap. 1)",
      en: "Independence brings an objective view, free of the code author's own assumptions, which helps surface different defects than the ones the author would find; it doesn't imply higher speed, guaranteed lower cost, or a replacement for reviews. (CTFL Syllabus, ch. 1)",
    },
  },
  {
    id: "qz-1-5",
    chapter: "1",
    difficulty: "medium",
    question: {
      es: "Según la paradoja del pesticida, ¿qué debe hacerse con los casos de prueba para que sigan siendo efectivos con el tiempo?",
      en: "According to the pesticide paradox, what must be done with test cases to keep them effective over time?",
    },
    options: [
      { id: "a", text: { es: "Deben revisarse y variarse/ampliarse regularmente, o dejarán de encontrar defectos nuevos", en: "They must be regularly reviewed and varied/extended, or they will stop finding new defects" } },
      { id: "b", text: { es: "Deben ejecutarse con más frecuencia, sin importar su contenido", en: "They must be run more frequently, regardless of content" } },
      { id: "c", text: { es: "Automatizarlos elimina la necesidad de actualizarlos", en: "Automating them removes the need to update them" } },
      { id: "d", text: { es: "Los testers deben enfocarse solo en las áreas donde ya se hallaron defectos", en: "Testers should focus only on areas where defects were already found" } },
    ],
    correctId: "a",
    explanation: {
      es: "Si se repiten siempre los mismos casos sin cambios, el software \"se vuelve inmune\" a ellos y dejan de revelar defectos nuevos, igual que los insectos desarrollan resistencia a un pesticida repetido; por eso hay que revisarlos y variarlos, con o sin automatización. (Syllabus CTFL, cap. 1)",
      en: "Repeating the exact same unchanged cases makes the software \"immune\" to them, so they stop revealing new defects, much like insects develop resistance to a repeated pesticide; that's why cases need to be reviewed and varied, automated or not. (CTFL Syllabus, ch. 1)",
    },
  },
  {
    id: "qz-1-6",
    chapter: "1",
    difficulty: "hard",
    question: {
      es: "¿Puede existir un defecto en el código que nunca llegue a provocar un fallo observable?",
      en: "Can a defect exist in the code that never ends up causing an observable failure?",
    },
    options: [
      { id: "a", text: { es: "No, todo defecto en el código termina manifestándose como un fallo tarde o temprano", en: "No, every defect in the code eventually surfaces as a failure" } },
      { id: "b", text: { es: "Sí — puede estar en un camino de código que nunca se ejecuta, o quedar enmascarado por otro defecto", en: "Yes — it may sit in a code path that's never executed, or be masked by another defect" } },
      { id: "c", text: { es: "No, un defecto solo existe si ya provocó un fallo durante la ejecución de pruebas", en: "No, a defect only exists once it has already caused a failure during test execution" } },
      { id: "d", text: { es: "Sí, pero solo si el software tiene cobertura de pruebas igual a cero", en: "Yes, but only if the software has exactly zero test coverage" } },
    ],
    correctId: "b",
    explanation: {
      es: "Un defecto puede quedar \"dormido\" indefinidamente si la ruta de código que lo contiene nunca se ejecuta en producción, o si sus condiciones exactas de activación nunca se dan, o si otro defecto lo enmascara antes de que se manifieste. (Syllabus CTFL, cap. 1)",
      en: "A defect can remain dormant indefinitely if the code path containing it is never executed in production, if its exact triggering conditions never occur, or if another defect masks it before it can surface. (CTFL Syllabus, ch. 1)",
    },
  },

  /* -------------------------- Capítulo 2 -------------------------- */
  {
    id: "qz-2-1",
    chapter: "2",
    difficulty: "easy",
    question: {
      es: "¿Qué nivel de pruebas se enfoca en verificar las interacciones entre componentes ya integrados?",
      en: "Which test level focuses on verifying the interactions between components that have already been integrated?",
    },
    options: [
      { id: "a", text: { es: "Pruebas de componente", en: "Component testing" } },
      { id: "b", text: { es: "Pruebas de integración", en: "Integration testing" } },
      { id: "c", text: { es: "Pruebas de aceptación", en: "Acceptance testing" } },
      { id: "d", text: { es: "Pruebas de sistema", en: "System testing" } },
    ],
    correctId: "b",
    explanation: {
      es: "Las pruebas de integración verifican específicamente las interfaces y las interacciones entre componentes o sistemas ya integrados; las de componente prueban unidades aisladas, y las de sistema evalúan el comportamiento del sistema completo de punta a punta. (Syllabus CTFL, cap. 2)",
      en: "Integration testing specifically verifies the interfaces and interactions between components or systems that have been integrated; component testing tests isolated units, and system testing evaluates the behavior of the whole system end to end. (CTFL Syllabus, ch. 2)",
    },
  },
  {
    id: "qz-2-2",
    chapter: "2",
    difficulty: "easy",
    question: {
      es: "¿Cuál es el propósito principal de las pruebas de regresión?",
      en: "What is the main purpose of regression testing?",
    },
    options: [
      { id: "a", text: { es: "Verificar que un caso de prueba que antes falló ahora pasa", en: "Verify that a test case which previously failed now passes" } },
      { id: "b", text: { es: "Confirmar que un cambio no ha afectado negativamente funcionalidades que antes funcionaban", en: "Confirm that a change hasn't adversely affected functionality that previously worked" } },
      { id: "c", text: { es: "Descubrir requisitos completamente nuevos que nadie había especificado", en: "Discover entirely new requirements that no one had specified" } },
      { id: "d", text: { es: "Eliminar la necesidad de seguir diseñando casos de prueba", en: "Remove the need for any further test design" } },
    ],
    correctId: "b",
    explanation: {
      es: "Las pruebas de regresión repiten pruebas ya existentes tras un cambio (una corrección, una nueva funcionalidad) para confirmar que las áreas no relacionadas siguen comportándose como antes; la opción a describe, en cambio, las pruebas de confirmación. (Syllabus CTFL, cap. 2)",
      en: "Regression testing re-runs existing tests after a change (a fix, a new feature) to confirm unrelated areas still behave as they did before; option a instead describes confirmation testing. (CTFL Syllabus, ch. 2)",
    },
  },
  {
    id: "qz-2-3",
    chapter: "2",
    difficulty: "medium",
    question: {
      es: "¿Cuál es el principal beneficio de aplicar \"shift-left\" (mover las pruebas más temprano en el ciclo de vida)?",
      en: 'What is the main benefit of "shift-left" (moving testing earlier in the lifecycle)?',
    },
    options: [
      { id: "a", text: { es: "Encontrar defectos antes, cuando son más baratos de corregir", en: "Finding defects earlier, when they're cheaper to fix" } },
      { id: "b", text: { es: "Elimina por completo la necesidad de pruebas de sistema posteriores", en: "It completely eliminates the need for later system testing" } },
      { id: "c", text: { es: "Garantiza que ningún defecto llegará a producción", en: "It guarantees no defect will ever reach production" } },
      { id: "d", text: { es: "Reduce el número total de testers necesarios en el proyecto", en: "It reduces the total number of testers a project needs" } },
    ],
    correctId: "a",
    explanation: {
      es: "Cuanto antes se detecta un defecto — idealmente durante requisitos o diseño —, más barato resulta corregirlo frente a encontrarlo en pruebas de sistema o ya en producción; shift-left no sustituye niveles de prueba posteriores ni elimina el riesgo por completo. (Syllabus CTFL, cap. 2)",
      en: "The earlier a defect is caught — ideally during requirements or design — the cheaper it is to fix compared to finding it during system testing or already in production; shift-left doesn't replace later test levels or eliminate risk entirely. (CTFL Syllabus, ch. 2)",
    },
  },
  {
    id: "qz-2-4",
    chapter: "2",
    difficulty: "medium",
    question: {
      es: "¿Cuál es la distinción correcta entre pruebas de confirmación (re-testing) y pruebas de regresión?",
      en: "What is the correct distinction between confirmation testing (re-testing) and regression testing?",
    },
    options: [
      { id: "a", text: { es: "Confirmación repite un caso que falló para verificar que ese defecto concreto se corrigió; regresión busca efectos secundarios en otras áreas", en: "Confirmation re-runs a previously failed case to verify that specific defect is fixed; regression looks for side effects in other areas" } },
      { id: "b", text: { es: "Son sinónimos exactos de la misma actividad", en: "They're exact synonyms for the same activity" } },
      { id: "c", text: { es: "Confirmación siempre se automatiza y regresión siempre se ejecuta manualmente", en: "Confirmation is always automated and regression is always run manually" } },
      { id: "d", text: { es: "Regresión solo aplica en el primer ciclo de pruebas y confirmación solo en los siguientes", en: "Regression only applies in the first test cycle, confirmation only in later ones" } },
    ],
    correctId: "a",
    explanation: {
      es: "Son actividades complementarias pero distintas: la confirmación se enfoca en un defecto específico que ya se corrigió, mientras que la regresión busca efectos secundarios inesperados en partes del sistema no relacionadas directamente con el cambio. (Syllabus CTFL, cap. 2)",
      en: "They're complementary but distinct: confirmation testing focuses on one specific defect that was already fixed, while regression testing looks for unexpected side effects in parts of the system not directly related to the change. (CTFL Syllabus, ch. 2)",
    },
  },
  {
    id: "qz-2-5",
    chapter: "2",
    difficulty: "medium",
    question: {
      es: "En ciclos de vida iterativos, la suite de regresión suele crecer en cada iteración. ¿Por qué?",
      en: "In iterative lifecycles, the regression suite tends to grow with each iteration. Why?",
    },
    options: [
      { id: "a", text: { es: "Porque cada iteración agrega funcionalidad que debe seguir funcionando junto con lo anterior, acumulando riesgo de cambio", en: "Because each iteration adds functionality that must keep working alongside earlier work, accumulating change risk" } },
      { id: "b", text: { es: "Porque el syllabus CTFL exige un tamaño mínimo de suite por iteración", en: "Because the CTFL syllabus mandates a minimum suite size per iteration" } },
      { id: "c", text: { es: "Porque las herramientas de automatización requieren un número fijo de pruebas para funcionar", en: "Because automation tools require a fixed number of tests to function" } },
      { id: "d", text: { es: "Porque las pruebas de componente dejan de ser necesarias una vez que empieza la integración", en: "Because component testing is no longer needed once integration begins" } },
    ],
    correctId: "a",
    explanation: {
      es: "Con cada iteración se suma nueva funcionalidad que debe convivir con lo ya construido, y cualquier cambio puede introducir efectos secundarios en el código anterior; por eso el riesgo de regresión se acumula y la suite necesaria para cubrirlo también crece. (Syllabus CTFL, cap. 2)",
      en: "Each iteration adds new functionality that must coexist with what was already built, and any change can introduce side effects in earlier code; regression risk accumulates as a result, and the suite needed to cover it grows too. (CTFL Syllabus, ch. 2)",
    },
  },
  {
    id: "qz-2-6",
    chapter: "2",
    difficulty: "hard",
    question: {
      es: "¿Para qué se utiliza el análisis de impacto (impact analysis) tras un cambio en el software?",
      en: "What is impact analysis used for after a change is made to the software?",
    },
    options: [
      { id: "a", text: { es: "Para evaluar el cambio e identificar qué partes del sistema podrían verse afectadas, guiando qué pruebas de regresión son relevantes", en: "To evaluate the change and identify which parts of the system might be affected, guiding which regression tests are relevant" } },
      { id: "b", text: { es: "Es una técnica de análisis estático para encontrar código inalcanzable", en: "It's a static analysis technique for finding unreachable code" } },
      { id: "c", text: { es: "Sustituye la necesidad de tener un plan de pruebas", en: "It replaces the need for a test plan" } },
      { id: "d", text: { es: "Solo se realiza durante las pruebas de aceptación", en: "It is only performed during acceptance testing" } },
    ],
    correctId: "a",
    explanation: {
      es: "El análisis de impacto examina un cambio propuesto o realizado para determinar qué áreas del sistema pueden quedar afectadas, lo que permite seleccionar de forma más precisa qué pruebas de regresión priorizar en vez de re-ejecutar toda la suite. (Syllabus CTFL, cap. 2)",
      en: "Impact analysis examines a proposed or completed change to determine which areas of the system may be affected, allowing regression tests to be selected and prioritized more precisely instead of re-running the entire suite. (CTFL Syllabus, ch. 2)",
    },
  },

  /* -------------------------- Capítulo 3 -------------------------- */
  {
    id: "qz-3-1",
    chapter: "3",
    difficulty: "easy",
    question: {
      es: "¿Qué afirmación es correcta sobre las pruebas estáticas?",
      en: "Which statement about static testing is correct?",
    },
    options: [
      { id: "a", text: { es: "Requieren ejecutar el código que se está examinando", en: "They require executing the code being examined" } },
      { id: "b", text: { es: "Examinan artefactos de trabajo (requisitos, diseños, código) sin ejecutarlos", en: "They examine work products (requirements, designs, code) without executing them" } },
      { id: "c", text: { es: "Solo pueden realizarse después de terminar las pruebas de sistema", en: "They can only be performed after system testing is complete" } },
      { id: "d", text: { es: "Solo existen como inspecciones formales, nunca como revisiones informales", en: "They only exist as formal inspections, never as informal reviews" } },
    ],
    correctId: "b",
    explanation: {
      es: "Las pruebas estáticas — revisiones e inspecciones de documentos, y análisis estático de código — examinan artefactos sin ejecutarlos, lo que permite encontrar defectos mucho antes de llegar a las pruebas dinámicas. (Syllabus CTFL, cap. 3)",
      en: "Static testing — reviews and inspections of documents, and static code analysis — examines artifacts without executing them, which allows defects to be found long before dynamic testing even begins. (CTFL Syllabus, ch. 3)",
    },
  },
  {
    id: "qz-3-2",
    chapter: "3",
    difficulty: "easy",
    question: {
      es: "De los tipos de revisión del syllabus, ¿cuál es el más formal, con roles definidos, métricas y criterios de entrada/salida?",
      en: "Among the syllabus's review types, which is the most formal, with defined roles, metrics, and entry/exit criteria?",
    },
    options: [
      { id: "a", text: { es: "Walkthrough (recorrido)", en: "Walkthrough" } },
      { id: "b", text: { es: "Revisión informal", en: "Informal review" } },
      { id: "c", text: { es: "Inspección", en: "Inspection" } },
      { id: "d", text: { es: "Programación en pareja", en: "Pair programming" } },
    ],
    correctId: "c",
    explanation: {
      es: "La inspección es el tipo de revisión más formal: sigue un proceso definido, con roles asignados (moderador, autor, revisores), métricas, criterios de entrada y salida, y normalmente una reunión de revisión estructurada. (Syllabus CTFL, cap. 3)",
      en: "Inspection is the most formal review type: it follows a defined process, with assigned roles (moderator, author, reviewers), metrics, entry and exit criteria, and typically a structured review meeting. (CTFL Syllabus, ch. 3)",
    },
  },
  {
    id: "qz-3-3",
    chapter: "3",
    difficulty: "medium",
    question: {
      es: "¿Qué tipo de defectos suele encontrar el análisis estático que las pruebas dinámicas típicamente pasan por alto?",
      en: "What kind of defects does static analysis typically find that dynamic testing tends to miss?",
    },
    options: [
      { id: "a", text: { es: "Código inalcanzable, violaciones de estándares de codificación y variables sin inicializar", en: "Unreachable code, coding standard violations, and uninitialized variables" } },
      { id: "b", text: { es: "Resultados de cálculo incorrectos que solo aparecen con combinaciones específicas de entradas en ejecución", en: "Incorrect calculation results that only appear with specific runtime input combinations" } },
      { id: "c", text: { es: "Degradación de rendimiento bajo carga concurrente de usuarios", en: "Performance degradation under peak concurrent user load" } },
      { id: "d", text: { es: "Problemas de usabilidad reportados por usuarios finales durante la aceptación", en: "Usability issues reported by end users during acceptance testing" } },
    ],
    correctId: "a",
    explanation: {
      es: "El análisis estático examina el código sin ejecutarlo, por lo que detecta bien código inalcanzable, incumplimientos de estándares o variables sin inicializar; en cambio, defectos que dependen del comportamiento en ejecución (cálculos bajo ciertos datos, rendimiento, usabilidad) requieren pruebas dinámicas. (Syllabus CTFL, cap. 3)",
      en: "Static analysis examines the code without executing it, so it's good at catching unreachable code, standard violations, or uninitialized variables; defects that depend on runtime behavior (calculations under specific data, performance, usability) instead require dynamic testing. (CTFL Syllabus, ch. 3)",
    },
  },
  {
    id: "qz-3-4",
    chapter: "3",
    difficulty: "medium",
    question: {
      es: "En una revisión formal, ¿quién dirige la reunión de revisión?",
      en: "In a formal review, who runs the review meeting?",
    },
    options: [
      { id: "a", text: { es: "El autor del documento revisado", en: "The author of the document being reviewed" } },
      { id: "b", text: { es: "El moderador/facilitador", en: "The moderator/facilitator" } },
      { id: "c", text: { es: "Exclusivamente el gerente del proyecto", en: "The project manager exclusively" } },
      { id: "d", text: { es: "El revisor que llegue primero a la reunión", en: "Whichever reviewer arrives first" } },
    ],
    correctId: "b",
    explanation: {
      es: "El moderador (o facilitador) lidera la reunión, gestiona el proceso, media entre participantes y asegura que la revisión sea eficaz; el autor participa aportando contexto, pero no dirige la sesión. (Syllabus CTFL, cap. 3)",
      en: "The moderator (or facilitator) leads the meeting, manages the process, mediates between participants, and ensures the review is effective; the author takes part by providing context, but doesn't run the session. (CTFL Syllabus, ch. 3)",
    },
  },
  {
    id: "qz-3-5",
    chapter: "3",
    difficulty: "hard",
    question: {
      es: "¿Qué tipo de revisión suele estar dirigida por el propio autor, con el objetivo de educar a los participantes o alcanzar consenso sobre el contenido?",
      en: "Which review type is typically led by the author, with the goal of educating participants or reaching consensus on the content?",
    },
    options: [
      { id: "a", text: { es: "Inspección", en: "Inspection" } },
      { id: "b", text: { es: "Revisión técnica", en: "Technical review" } },
      { id: "c", text: { es: "Walkthrough (recorrido)", en: "Walkthrough" } },
      { id: "d", text: { es: "Análisis estático", en: "Static analysis" } },
    ],
    correctId: "c",
    explanation: {
      es: "En un walkthrough, el propio autor conduce la sesión, presentando el documento paso a paso para explicarlo, resolver dudas y buscar consenso o retroalimentación; a diferencia de la inspección, es más ligero y menos formal. (Syllabus CTFL, cap. 3)",
      en: "In a walkthrough, the author themselves leads the session, presenting the document step by step to explain it, resolve doubts, and seek consensus or feedback; unlike an inspection, it's lighter-weight and less formal. (CTFL Syllabus, ch. 3)",
    },
  },
  {
    id: "qz-3-6",
    chapter: "3",
    difficulty: "hard",
    question: {
      es: "¿Cuál de las siguientes afirmaciones sobre análisis estático y revisiones es correcta?",
      en: "Which of the following statements about static analysis and reviews is correct?",
    },
    options: [
      { id: "a", text: { es: "El análisis estático normalmente se apoya en herramientas, mientras que las revisiones se basan principalmente en el juicio humano", en: "Static analysis is normally tool-supported, while reviews rely primarily on human judgment" } },
      { id: "b", text: { es: "Las revisiones siempre requieren soporte de herramientas automatizadas para ser válidas", en: "Reviews always require automated tool support to be valid" } },
      { id: "c", text: { es: "El análisis estático y las revisiones son la misma actividad, realizada por el mismo actor", en: "Static analysis and reviews are the same activity, performed by the same actor" } },
      { id: "d", text: { es: "El análisis estático elimina por completo la necesidad de revisores humanos", en: "Static analysis completely removes the need for human reviewers" } },
    ],
    correctId: "a",
    explanation: {
      es: "El análisis estático se ejecuta con herramientas que aplican reglas sobre el código de forma automática y consistente, mientras que las revisiones dependen del criterio, la experiencia y la comunicación entre las personas participantes; son actividades complementarias, no intercambiables. (Syllabus CTFL, cap. 3)",
      en: "Static analysis runs through tools that apply rules to the code automatically and consistently, while reviews depend on the judgment, experience, and communication of the people involved; they're complementary activities, not interchangeable. (CTFL Syllabus, ch. 3)",
    },
  },

  /* -------------------------- Capítulo 4 -------------------------- */
  {
    id: "qz-4-1",
    chapter: "4",
    difficulty: "medium",
    question: {
      es: "Un campo acepta enteros de 10 a 50. Con BVA de 2 valores, ¿qué conjunto de valores de frontera debes probar?",
      en: "A field accepts integers 10 to 50. Using 2-value BVA, which set of boundary values should you test?",
    },
    options: [
      { id: "a", text: { es: "9, 10, 50, 51", en: "9, 10, 50, 51" } },
      { id: "b", text: { es: "10, 30, 50", en: "10, 30, 50" } },
      { id: "c", text: { es: "9, 11, 49, 51", en: "9, 11, 49, 51" } },
      { id: "d", text: { es: "0, 10, 50, 100", en: "0, 10, 50, 100" } },
    ],
    correctId: "a",
    explanation: {
      es: "El BVA de 2 valores toma cada frontera y su vecino inmediato fuera del rango: 10 y 9 abajo, 50 y 51 arriba. La opción b es partición de equivalencia (un valor por clase), no BVA. (Syllabus CTFL, cap. 4)",
      en: "2-value BVA takes each boundary and its immediate out-of-range neighbor: 10 and 9 below, 50 and 51 above. Option b is equivalence partitioning (one value per class), not BVA. (CTFL Syllabus, ch. 4)",
    },
  },
  {
    id: "qz-4-2",
    chapter: "4",
    difficulty: "easy",
    question: {
      es: "Al aplicar partición de equivalencia (equivalence partitioning), ¿cuántos valores como mínimo hace falta probar de cada partición?",
      en: "When applying equivalence partitioning, how many values from each partition need to be tested at minimum?",
    },
    options: [
      { id: "a", text: { es: "Uno solo por partición es suficiente", en: "Just one value per partition is sufficient" } },
      { id: "b", text: { es: "Al menos tres valores por partición para tener confianza", en: "At least three values per partition for confidence" } },
      { id: "c", text: { es: "Es obligatorio probar todos los valores de frontera de la partición", en: "Every boundary value of the partition must be tested" } },
      { id: "d", text: { es: "Ninguno; solo importa definir la partición, no probarla", en: "None — only defining the partition matters, not testing it" } },
    ],
    correctId: "a",
    explanation: {
      es: "La partición de equivalencia asume que todos los valores de una misma clase se comportan de forma equivalente ante el sistema, por lo que basta con probar un valor representativo de cada partición para tener una cobertura razonable. (Syllabus CTFL, cap. 4)",
      en: "Equivalence partitioning assumes every value within the same class is treated equivalently by the system, so testing one representative value per partition gives reasonable coverage. (CTFL Syllabus, ch. 4)",
    },
  },
  {
    id: "qz-4-3",
    chapter: "4",
    difficulty: "medium",
    question: {
      es: "Tienes una tabla de decisión con 3 condiciones booleanas independientes. ¿Cuántas columnas de reglas se necesitan para lograr cobertura completa?",
      en: "You have a decision table with 3 independent boolean conditions. How many rule columns are needed for full coverage?",
    },
    options: [
      { id: "a", text: { es: "6 columnas", en: "6 columns" } },
      { id: "b", text: { es: "8 columnas", en: "8 columns" } },
      { id: "c", text: { es: "9 columnas", en: "9 columns" } },
      { id: "d", text: { es: "3 columnas", en: "3 columns" } },
    ],
    correctId: "b",
    explanation: {
      es: "Con n condiciones booleanas independientes, el número de combinaciones posibles es 2^n; con 3 condiciones son 2^3 = 8 columnas de reglas para cubrir todas las combinaciones de verdadero/falso. (Syllabus CTFL, cap. 4)",
      en: "With n independent boolean conditions, the number of possible combinations is 2^n; with 3 conditions that's 2^3 = 8 rule columns to cover every true/false combination. (CTFL Syllabus, ch. 4)",
    },
  },
  {
    id: "qz-4-4",
    chapter: "4",
    difficulty: "medium",
    question: {
      es: "En pruebas de transición de estados, ¿qué verifican las pruebas de transición inválida?",
      en: "In state transition testing, what do invalid-transition tests check?",
    },
    options: [
      { id: "a", text: { es: "Que los eventos se rechacen correctamente en los estados donde no están permitidos", en: "That events are correctly rejected in states where they are not allowed" } },
      { id: "b", text: { es: "Que cada transición válida se ejecute en menos de 1 segundo", en: "That every valid transition executes in under 1 second" } },
      { id: "c", text: { es: "Que todos los estados sean alcanzables al menos una vez desde el estado inicial", en: "That every state is reachable at least once from the initial state" } },
      { id: "d", text: { es: "Que el número de estados coincida con el número de casos de prueba", en: "That the number of states matches the number of test cases" } },
    ],
    correctId: "a",
    explanation: {
      es: "Las pruebas de transición inválida disparan eventos que no están definidos como válidos en el estado actual, comprobando que el sistema los rechace o los maneje adecuadamente (por ejemplo, mostrando un error) en lugar de aceptarlos silenciosamente. (Syllabus CTFL, cap. 4)",
      en: "Invalid-transition tests trigger events that aren't defined as valid in the current state, checking that the system rejects or handles them appropriately (for example, showing an error) instead of silently accepting them. (CTFL Syllabus, ch. 4)",
    },
  },
  {
    id: "qz-4-5",
    chapter: "4",
    difficulty: "hard",
    question: {
      es: "Respecto a la relación entre cobertura de decisión (branch) y cobertura de sentencias (statement), ¿cuál es la implicación correcta?",
      en: "Regarding the relationship between decision (branch) coverage and statement coverage, which implication is correct?",
    },
    options: [
      { id: "a", text: { es: "El 100% de cobertura de sentencias siempre implica el 100% de cobertura de decisión", en: "100% statement coverage always implies 100% decision (branch) coverage" } },
      { id: "b", text: { es: "El 100% de cobertura de decisión implica el 100% de cobertura de sentencias, pero no al revés", en: "100% decision (branch) coverage implies 100% statement coverage, but not the other way around" } },
      { id: "c", text: { es: "Ninguna de las dos implica a la otra", en: "Neither implies the other" } },
      { id: "d", text: { es: "Ambas son siempre equivalentes porque una decisión se define como una sentencia", en: "They are always equivalent because a decision is defined as a statement" } },
    ],
    correctId: "b",
    explanation: {
      es: "Cubrir el 100% de las decisiones obliga a recorrer, al ejercitar ambos resultados de cada condición, todas las sentencias del código, por lo que implica el 100% de cobertura de sentencias. Lo contrario no es cierto: se pueden ejecutar todas las líneas sin haber probado ambas ramas (verdadero/falso) de cada decisión. (Syllabus CTFL, cap. 4)",
      en: "Covering 100% of decisions forces every statement in the code to be executed, since exercising both outcomes of each condition passes through every line, so it implies 100% statement coverage. The reverse isn't true: you can execute every line without having exercised both branches (true/false) of every decision. (CTFL Syllabus, ch. 4)",
    },
  },
  {
    id: "qz-4-6",
    chapter: "4",
    difficulty: "hard",
    question: {
      es: "Un campo acepta enteros de 10 a 50. Con BVA de 3 valores, ¿qué conjunto de valores de frontera debes probar?",
      en: "A field accepts integers 10 to 50. Using 3-value BVA, which set of boundary values should you test?",
    },
    options: [
      { id: "a", text: { es: "9, 10, 11, 49, 50, 51", en: "9, 10, 11, 49, 50, 51" } },
      { id: "b", text: { es: "10, 30, 50", en: "10, 30, 50" } },
      { id: "c", text: { es: "9, 10, 50, 51", en: "9, 10, 50, 51" } },
      { id: "d", text: { es: "8, 10, 50, 52", en: "8, 10, 50, 52" } },
    ],
    correctId: "a",
    explanation: {
      es: "El BVA de 3 valores toma cada frontera junto con su vecino inmediato por debajo y por encima: para el mínimo 10, se prueban 9, 10 y 11; para el máximo 50, se prueban 49, 50 y 51. La opción c corresponde al BVA de 2 valores, no de 3. (Syllabus CTFL, cap. 4)",
      en: "3-value BVA takes each boundary together with its immediate neighbor below and above: for the minimum 10, it tests 9, 10, and 11; for the maximum 50, it tests 49, 50, and 51. Option c is 2-value BVA, not 3-value. (CTFL Syllabus, ch. 4)",
    },
  },

  /* -------------------------- Capítulo 5 -------------------------- */
  {
    id: "qz-5-1",
    chapter: "5",
    difficulty: "easy",
    question: {
      es: "¿Qué documenta típicamente un plan de pruebas (test plan)?",
      en: "What does a test plan typically document?",
    },
    options: [
      { id: "a", text: { es: "El alcance, el enfoque, los recursos, el cronograma y los criterios de las actividades de prueba", en: "The scope, approach, resources, schedule, and criteria of the testing activities" } },
      { id: "b", text: { es: "Únicamente la lista de defectos encontrados durante la ejecución", en: "Only the list of defects found during execution" } },
      { id: "c", text: { es: "Exclusivamente los scripts de automatización utilizados", en: "Only the automation scripts used" } },
      { id: "d", text: { es: "Solo las firmas de aprobación final de los interesados", en: "Only the final stakeholder sign-off signatures" } },
    ],
    correctId: "a",
    explanation: {
      es: "El plan de pruebas describe el alcance de lo que se va a probar, el enfoque o estrategia, los recursos necesarios, el cronograma de actividades y los criterios (de entrada, salida, suspensión y reanudación) que rigen el proceso. (Syllabus CTFL, cap. 5)",
      en: "The test plan describes the scope of what will be tested, the approach or strategy, the resources needed, the schedule of activities, and the criteria (entry, exit, suspension, and resumption) that govern the process. (CTFL Syllabus, ch. 5)",
    },
  },
  {
    id: "qz-5-2",
    chapter: "5",
    difficulty: "easy",
    question: {
      es: "¿Qué tipo de criterio determina si se puede EMPEZAR una actividad de prueba concreta?",
      en: "Which type of criterion determines whether a particular test activity can be STARTED?",
    },
    options: [
      { id: "a", text: { es: "Criterios de entrada", en: "Entry criteria" } },
      { id: "b", text: { es: "Criterios de salida", en: "Exit criteria" } },
      { id: "c", text: { es: "Criterios de suspensión", en: "Suspension criteria" } },
      { id: "d", text: { es: "Criterios de reanudación", en: "Resumption criteria" } },
    ],
    correctId: "a",
    explanation: {
      es: "Los criterios de entrada definen las condiciones necesarias para comenzar una actividad de prueba (por ejemplo, tener el entorno listo y los requisitos disponibles); los criterios de salida, en cambio, determinan cuándo se considera completa la actividad. (Syllabus CTFL, cap. 5)",
      en: "Entry criteria define the conditions needed to start a test activity (for example, having the environment ready and requirements available); exit criteria, instead, determine when the activity is considered complete. (CTFL Syllabus, ch. 5)",
    },
  },
  {
    id: "qz-5-3",
    chapter: "5",
    difficulty: "medium",
    question: {
      es: "\"El proveedor podría entregar tarde el entorno de pruebas.\" ¿Cómo se clasifica este riesgo?",
      en: '"The vendor may deliver the test environment late." How is this risk classified?',
    },
    options: [
      { id: "a", text: { es: "Riesgo de producto", en: "Product risk" } },
      { id: "b", text: { es: "Riesgo de proyecto", en: "Project risk" } },
      { id: "c", text: { es: "Riesgo de seguridad", en: "Security risk" } },
      { id: "d", text: { es: "No es un riesgo, es un incidente ya ocurrido", en: "It's not a risk, it's an issue that already happened" } },
    ],
    correctId: "b",
    explanation: {
      es: "Este riesgo afecta a la capacidad del proyecto para cumplir sus objetivos (plazos, recursos, dependencias externas), por lo que es un riesgo de proyecto; un riesgo de producto, en cambio, sería algo como que el propio software falle en un área crítica para el usuario. (Syllabus CTFL, cap. 5)",
      en: "This risk affects the project's ability to meet its objectives (deadlines, resources, external dependencies), so it's a project risk; a product risk, instead, would be something like the software itself failing in an area critical to the user. (CTFL Syllabus, ch. 5)",
    },
  },
  {
    id: "qz-5-4",
    chapter: "5",
    difficulty: "medium",
    question: {
      es: "Un typo cosmético en el título de la página de inicio de una marca importante. En términos de severidad y prioridad, ¿cuál es la combinación correcta?",
      en: "A cosmetic typo in the headline of a major brand's homepage. In terms of severity and priority, what's the correct pairing?",
    },
    options: [
      { id: "a", text: { es: "Severidad baja, prioridad baja", en: "Low severity, low priority" } },
      { id: "b", text: { es: "Severidad alta, prioridad baja", en: "High severity, low priority" } },
      { id: "c", text: { es: "Severidad baja, prioridad alta", en: "Low severity, high priority" } },
      { id: "d", text: { es: "Severidad alta, prioridad alta", en: "High severity, high priority" } },
    ],
    correctId: "c",
    explanation: {
      es: "La severidad mide el impacto técnico/funcional del defecto: un typo no rompe ninguna funcionalidad, así que es de severidad baja. La prioridad mide la urgencia de corregirlo: por ser visible para todos los visitantes de la home y afectar a la imagen de marca, la urgencia de corregirlo es alta. Severidad y prioridad son ejes independientes. (Syllabus CTFL, cap. 5)",
      en: "Severity measures the defect's technical/functional impact: a typo breaks no functionality, so it's low severity. Priority measures the urgency of fixing it: since it's visible to every visitor on the homepage and affects brand image, the urgency to fix it is high. Severity and priority are independent axes. (CTFL Syllabus, ch. 5)",
    },
  },
  {
    id: "qz-5-5",
    chapter: "5",
    difficulty: "medium",
    question: {
      es: "¿Qué métrica relaciona la cantidad de defectos con el tamaño o un componente del software, y ayuda a decidir dónde enfocar el esfuerzo de pruebas?",
      en: "Which metric relates the number of defects to the size or a component of the software, helping decide where to focus testing effort?",
    },
    options: [
      { id: "a", text: { es: "Densidad de defectos (defect density)", en: "Defect density" } },
      { id: "b", text: { es: "Tasa de ejecución de pruebas", en: "Test execution rate" } },
      { id: "c", text: { es: "Tiempo medio hasta el fallo", en: "Mean time to failure" } },
      { id: "d", text: { es: "Cobertura de requisitos", en: "Requirements coverage" } },
    ],
    correctId: "a",
    explanation: {
      es: "La densidad de defectos expresa el número de defectos encontrados por unidad de tamaño (por ejemplo, por cada mil líneas de código o por módulo), lo que permite comparar componentes entre sí y priorizar dónde concentrar el esfuerzo de pruebas. (Syllabus CTFL, cap. 5)",
      en: "Defect density expresses the number of defects found per unit of size (for example, per thousand lines of code or per module), which allows components to be compared against each other and helps prioritize where to concentrate testing effort. (CTFL Syllabus, ch. 5)",
    },
  },
  {
    id: "qz-5-6",
    chapter: "5",
    difficulty: "hard",
    question: {
      es: "En el testing basado en riesgos (risk-based testing), ¿qué papel cumple el nivel de riesgo de un elemento?",
      en: "In risk-based testing, what role does an item's risk level play?",
    },
    options: [
      { id: "a", text: { es: "Determina con cuánta profundidad y en qué orden se prueba ese elemento", en: "It determines how thoroughly and in what order that item is tested" } },
      { id: "b", text: { es: "Solo se usa para decidir qué testers reciben horas extra", en: "It's only used to decide which testers get overtime" } },
      { id: "c", text: { es: "El testing basado en riesgos ignora la probabilidad y solo considera el impacto", en: "Risk-based testing ignores likelihood and only considers impact" } },
      { id: "d", text: { es: "Solo es aplicable a las pruebas de seguridad", en: "It's only applicable to security testing" } },
    ],
    correctId: "a",
    explanation: {
      es: "El nivel de riesgo (combinación de probabilidad e impacto) guía tanto el orden en que se prueban los elementos como el esfuerzo y la profundidad dedicados a cada uno: los elementos de mayor riesgo se prueban antes y con mayor rigor. (Syllabus CTFL, cap. 5)",
      en: "The risk level (a combination of likelihood and impact) guides both the order in which items are tested and the effort and depth devoted to each: higher-risk items are tested earlier and more rigorously. (CTFL Syllabus, ch. 5)",
    },
  },

  /* -------------------------- Capítulo 6 -------------------------- */
  {
    id: "qz-6-1",
    chapter: "6",
    difficulty: "easy",
    question: {
      es: "¿Qué tipo de herramienta mide el porcentaje de código ejecutado por un conjunto de pruebas?",
      en: "Which type of tool measures the percentage of code executed by a set of tests?",
    },
    options: [
      { id: "a", text: { es: "Herramienta de cobertura", en: "Coverage tool" } },
      { id: "b", text: { es: "Herramienta de gestión de pruebas", en: "Test management tool" } },
      { id: "c", text: { es: "Herramienta de análisis estático", en: "Static analysis tool" } },
      { id: "d", text: { es: "Herramienta de gestión de defectos", en: "Defect management tool" } },
    ],
    correctId: "a",
    explanation: {
      es: "Las herramientas de cobertura instrumentan el código para registrar qué sentencias, decisiones u otros elementos estructurales se ejercitaron durante la ejecución de las pruebas, y reportan ese porcentaje. (Syllabus CTFL, cap. 6)",
      en: "Coverage tools instrument the code to record which statements, decisions, or other structural elements were exercised during test execution, and report that percentage. (CTFL Syllabus, ch. 6)",
    },
  },
  {
    id: "qz-6-2",
    chapter: "6",
    difficulty: "easy",
    question: {
      es: "¿Cuál de las siguientes listas contiene ejemplos de herramientas de gestión de pruebas?",
      en: "Which of the following lists contains examples of test management tools?",
    },
    options: [
      { id: "a", text: { es: "Jira con Xray, Azure Test Plans, TestRail", en: "Jira with Xray, Azure Test Plans, TestRail" } },
      { id: "b", text: { es: "ESLint y SonarQube", en: "ESLint and SonarQube" } },
      { id: "c", text: { es: "JMeter y LoadRunner", en: "JMeter and LoadRunner" } },
      { id: "d", text: { es: "Selenium y Cypress", en: "Selenium and Cypress" } },
    ],
    correctId: "a",
    explanation: {
      es: "Las herramientas de gestión de pruebas organizan casos, ejecuciones, trazabilidad y reportes de un proyecto de testing. ESLint/SonarQube son herramientas de análisis estático, JMeter/LoadRunner son de pruebas de rendimiento, y Selenium/Cypress son de automatización funcional, no de gestión. (Syllabus CTFL, cap. 6)",
      en: "Test management tools organize a testing project's cases, executions, traceability, and reports. ESLint/SonarQube are static analysis tools, JMeter/LoadRunner are performance testing tools, and Selenium/Cypress are functional automation tools, not management tools. (CTFL Syllabus, ch. 6)",
    },
  },
  {
    id: "qz-6-3",
    chapter: "6",
    difficulty: "medium",
    question: {
      es: "Para que la automatización de pruebas tenga un ROI positivo, ¿qué deben superar los ahorros obtenidos?",
      en: "For test automation to have a positive ROI, what must the savings gained exceed?",
    },
    options: [
      { id: "a", text: { es: "La inversión inicial más el coste continuo de mantenimiento de los scripts", en: "The initial investment plus the ongoing cost of maintaining the scripts" } },
      { id: "b", text: { es: "Únicamente el coste de la licencia de la herramienta", en: "Only the cost of the tool's license" } },
      { id: "c", text: { es: "El salario de un tester manual durante un mes", en: "One manual tester's salary for one month" } },
      { id: "d", text: { es: "Nada; el ROI de la automatización está garantizado sin importar el mantenimiento", en: "Nothing — automation ROI is guaranteed regardless of maintenance" } },
    ],
    correctId: "a",
    explanation: {
      es: "El retorno de inversión de la automatización debe considerar no solo el coste inicial de crear los scripts, sino también su mantenimiento continuo a medida que el software evoluciona; si el mantenimiento consume más de lo que se ahorra en ejecución manual, el ROI se vuelve negativo. (Syllabus CTFL, cap. 6)",
      en: "Automation's return on investment must factor in not just the initial cost of building the scripts, but also their ongoing maintenance as the software evolves; if maintenance consumes more than what's saved on manual execution, the ROI turns negative. (CTFL Syllabus, ch. 6)",
    },
  },
  {
    id: "qz-6-4",
    chapter: "6",
    difficulty: "medium",
    question: {
      es: "¿Cuál de las siguientes es un riesgo real de la automatización de pruebas?",
      en: "Which of the following is a real risk of test automation?",
    },
    options: [
      { id: "a", text: { es: "Genera una falsa sensación de seguridad y una carga de mantenimiento que crece con la evolución del sistema", en: "It creates a false sense of security and a maintenance burden that grows as the system evolves" } },
      { id: "b", text: { es: "Las pruebas automatizadas siempre corren más lento que las manuales", en: "Automated tests always run slower than manual tests" } },
      { id: "c", text: { es: "Las pruebas automatizadas nunca pueden integrarse en un pipeline de CI", en: "Automated tests can never be integrated into a CI pipeline" } },
      { id: "d", text: { es: "La automatización elimina la necesidad de cualquier técnica de diseño de pruebas", en: "Automation removes the need for any test design technique" } },
    ],
    correctId: "a",
    explanation: {
      es: "Un riesgo bien documentado es que pasar una suite automatizada en verde genere confianza excesiva (falsa sensación de seguridad) si no cubre casos relevantes, y que el mantenimiento de los scripts crezca conforme el sistema bajo prueba cambia. (Syllabus CTFL, cap. 6)",
      en: "A well-documented risk is that a green automated suite can create excessive confidence (a false sense of security) if it doesn't cover relevant cases, and that script maintenance grows as the system under test changes. (CTFL Syllabus, ch. 6)",
    },
  },
  {
    id: "qz-6-5",
    chapter: "6",
    difficulty: "hard",
    question: {
      es: "¿Qué describe el \"efecto sonda\" (probe effect) en el contexto de las herramientas de prueba?",
      en: 'What does the "probe effect" describe in the context of testing tools?',
    },
    options: [
      { id: "a", text: { es: "La sobrecarga de instrumentación de la propia herramienta altera el comportamiento (por ejemplo, los tiempos) que está midiendo", en: "The tool's own instrumentation overhead alters the behavior (for example, timing) it is measuring" } },
      { id: "b", text: { es: "La herramienta siempre mejora el rendimiento del sistema bajo prueba", en: "The tool always improves the performance of the system under test" } },
      { id: "c", text: { es: "Se refiere a que los testers cambien los requisitos durante la ejecución", en: "It refers to testers changing requirements during execution" } },
      { id: "d", text: { es: "Es un sinónimo de la paradoja del pesticida", en: "It's a synonym for the pesticide paradox" } },
    ],
    correctId: "a",
    explanation: {
      es: "El efecto sonda ocurre, por ejemplo, en pruebas de rendimiento: la propia instrumentación necesaria para medir tiempos de respuesta añade una sobrecarga que distorsiona el dato que se está midiendo, por lo que hay que tenerlo en cuenta al interpretar resultados. (Syllabus CTFL, cap. 6)",
      en: "The probe effect happens, for example, in performance testing: the very instrumentation needed to measure response times adds overhead that distorts the data being measured, so it must be accounted for when interpreting results. (CTFL Syllabus, ch. 6)",
    },
  },
  {
    id: "qz-6-6",
    chapter: "6",
    difficulty: "hard",
    question: {
      es: "¿Qué actividad realiza una herramienta de ejecución de pruebas (test execution tool)?",
      en: "What activity does a test execution tool perform?",
    },
    options: [
      { id: "a", text: { es: "Ejecuta casos de prueba y compara los resultados reales con los esperados", en: "It runs test cases and compares actual results against expected results" } },
      { id: "b", text: { es: "Redacta automáticamente la documentación de la base de pruebas", en: "It automatically writes the test basis documentation" } },
      { id: "c", text: { es: "Estima los niveles de riesgo del proyecto para el plan de pruebas", en: "It estimates the project's risk levels for the test plan" } },
      { id: "d", text: { es: "Sustituye la necesidad de una herramienta de gestión de pruebas", en: "It replaces the need for a test management tool" } },
    ],
    correctId: "a",
    explanation: {
      es: "Una herramienta de ejecución toma casos de prueba (a menudo desde scripts), los ejecuta contra el sistema bajo prueba, registra los resultados reales y los compara con los resultados esperados para determinar si la prueba pasa o falla. (Syllabus CTFL, cap. 6)",
      en: "An execution tool takes test cases (often from scripts), runs them against the system under test, records the actual results, and compares them against the expected results to determine whether the test passes or fails. (CTFL Syllabus, ch. 6)",
    },
  },
];

const CHAPTERS = ["1", "2", "3", "4", "5", "6"] as const;

function fisherYates<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = shuffled[i];
    const b = shuffled[j];
    if (a === undefined || b === undefined) continue;
    shuffled[i] = b;
    shuffled[j] = a;
  }
  return shuffled;
}

/**
 * Picks a 10-question round from `bank`: 1 random question per chapter (6),
 * then 4 more at random from the rest, then shuffles the 10.
 */
function pickRound(bank: QuizQuestion[]): QuizQuestion[] {
  const picked: QuizQuestion[] = [];
  const usedIds = new Set<string>();

  for (const chapter of CHAPTERS) {
    const inChapter = bank.filter((q) => q.chapter === chapter);
    const shuffledChapter = fisherYates(inChapter);
    const choice = shuffledChapter[0];
    if (choice) {
      picked.push(choice);
      usedIds.add(choice.id);
    }
  }

  const rest = bank.filter((q) => !usedIds.has(q.id));
  const shuffledRest = fisherYates(rest);
  picked.push(...shuffledRest.slice(0, 4));

  return fisherYates(picked);
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbQuizClient(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  // Deterministic on first render (matches SSR output); pickRound()'s Math.random()
  // shuffle only runs after mount, so the server and the client's hydration pass
  // render identical markup and no hydration mismatch is thrown.
  const [order, setOrder] = useState<QuizQuestion[]>(() => BANK.slice(0, 10));
  const [index, setIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [chapterResults, setChapterResults] = useState<{ chapter: string; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setOrder(pickRound(BANK));
  }, []);

  const total = order.length;
  const current = order[index];
  const locked = selectedId !== null;

  function answer(optionId: string) {
    if (locked || !current) return;
    setSelectedId(optionId);
    const isCorrect = optionId === current.correctId;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setChapterResults((r) => [...r, { chapter: current.chapter, correct: isCorrect }]);
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
    setSelectedId(null);
  }

  function reset() {
    setOrder(pickRound(BANK));
    setIndex(0);
    setSelectedId(null);
    setCorrectCount(0);
    setChapterResults([]);
    setFinished(false);
  }

  const isCorrect = current !== undefined && selectedId !== null && selectedId === current.correctId;
  const passed = correctCount >= 7;

  const chaptersInRound = Array.from(new Set(order.map((q) => q.chapter))).sort();
  const breakdown = chaptersInRound.map((chapter) => {
    const forChapter = chapterResults.filter((r) => r.chapter === chapter);
    const correct = forChapter.filter((r) => r.correct).length;
    return { chapter, correct, total: forChapter.length };
  });

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Quiz Rápido ISTQB" : "ISTQB Quick Quiz"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "10 preguntas al azar de opción múltiple, mezclando los 6 capítulos del syllabus CTFL. Responde y recibe retroalimentación inmediata con explicación."
              : "10 random multiple-choice questions mixing all 6 CTFL syllabus chapters. Answer and get instant feedback with an explanation."}
          </p>
        </div>

        {!finished && current && (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-[var(--color-text-muted)]">
              <span>
                {lng === "es" ? "Pregunta" : "Question"} {index + 1}/{total}
              </span>
              <span>
                {lng === "es" ? "Correctas" : "Correct"}: {correctCount}
              </span>
            </div>
            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
              <div
                className="h-1.5 rounded-full bg-brand-forest-500 transition-all duration-300"
                style={{ width: `${(index / total) * 100}%` }}
              />
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
              <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                {lng === "es" ? `Cap. ${current.chapter}` : `Ch. ${current.chapter}`}
              </span>
              <p className="mt-2 text-lg font-medium leading-relaxed text-[var(--color-text-primary)]">
                {current.question[lng as "es" | "en"] ?? current.question.en}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {current.options.map((option) => {
                const isSelected = selectedId === option.id;
                const isThisCorrect = option.id === current.correctId;
                let stateClasses = "border-[var(--color-border)] hover:bg-[var(--color-bg-elevated)]";
                if (locked && isThisCorrect) {
                  stateClasses = "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400";
                } else if (locked && isSelected && !isThisCorrect) {
                  stateClasses = "border-red-500/40 bg-red-500/10 text-red-400";
                } else if (locked) {
                  stateClasses = "border-[var(--color-border)] opacity-40";
                }

                return (
                  <button
                    key={option.id}
                    type="button"
                    disabled={locked}
                    onClick={() => answer(option.id)}
                    className={[
                      "rounded-xl border-2 px-5 py-4 text-left text-base font-medium text-[var(--color-text-primary)] transition-colors disabled:cursor-not-allowed",
                      stateClasses,
                    ].join(" ")}
                  >
                    {option.text[lng as "es" | "en"] ?? option.text.en}
                  </button>
                );
              })}
            </div>

            {locked && (
              <div
                className={[
                  "mt-6 rounded-xl border p-5",
                  isCorrect ? "border-brand-forest-500/40 bg-brand-forest-500/10" : "border-red-500/40 bg-red-500/10",
                ].join(" ")}
              >
                <p className={["font-semibold", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                  {isCorrect ? (lng === "es" ? "¡Correcto!" : "Correct!") : (lng === "es" ? "Incorrecto" : "Incorrect")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {current.explanation[lng as "es" | "en"] ?? current.explanation.en}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-4 rounded-lg bg-brand-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {lng === "es" ? "Siguiente →" : "Next →"}
                </button>
              </div>
            )}
          </>
        )}

        {finished && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {correctCount}/{total} {lng === "es" ? "correctas" : "correct"}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {breakdown.map(({ chapter, correct, total: chapterTotal }) => (
                <span
                  key={chapter}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {lng === "es" ? `Cap. ${chapter}` : `Ch. ${chapter}`}: {correct}/{chapterTotal}
                </span>
              ))}
            </div>

            {passed && (
              <div className="mt-5">
                <p className="text-sm text-[var(--color-text-muted)]">
                  {lng === "es" ? "¡Nivel certificación!" : "Certification level!"}
                </p>
                <Link
                  href={`/${lng}/exams`}
                  className="mt-2 inline-block rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {lng === "es"
                    ? "¿Listo para el examen real? → Simulacros CTFL"
                    : "Ready for the real thing? → CTFL mocks"}
                </Link>
              </div>
            )}

            <div className="mt-4">
              <Link
                href={`/${lng}/campus/istqb`}
                className="text-sm font-medium text-[var(--color-text-secondary)] underline-offset-4 transition-colors hover:text-[var(--color-text-primary)] hover:underline"
              >
                {lng === "es" ? "Repasa los fundamentos en el campus ISTQB" : "Review the fundamentals in the ISTQB campus"}
              </Link>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Nueva ronda" : "↺ New round"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
