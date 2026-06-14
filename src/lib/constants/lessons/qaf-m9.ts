/**
 * QA Fundamentals — Módulo 9: Testing Web y Mobile Manual.
 *
 * Contenido autorado en español (primera pasada de inglés incluida).
 * Fuentes: ISTQB CTFL v4.0, Azure Test Plans, documentación de navegadores (DevTools).
 */

import type { LessonContent } from "@/types/lesson";

const MODULE_ID = "qaf-m9";

/* ------------------------------------------------------------------ */
/*  Lección 9.1 — Testing web manual y DevTools                        */
/* ------------------------------------------------------------------ */

const L1: LessonContent = {
  id: "qaf-m9-l1",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Las herramientas de desarrollador del navegador", en: "The browser developer tools" } },
    {
      type: "paragraph",
      content: {
        es: "Las DevTools (se abren con F12 en la mayoría de navegadores) son el mejor aliado del QA web. Permiten inspeccionar la página, ver errores, analizar peticiones de red y simular dispositivos, sin necesidad de programar.",
        en: "DevTools (opened with F12 in most browsers) are the web QA's best ally. They let you inspect the page, see errors, analyze network requests and simulate devices, with no coding required.",
      },
    },
    {
      type: "table",
      caption: { es: "Pestañas útiles de las DevTools", en: "Useful DevTools tabs" },
      headers: [
        { es: "Pestaña", en: "Tab" },
        { es: "Para qué sirve en QA", en: "What it is for in QA" },
      ],
      rows: [
        { cells: [ { es: "Elements", en: "Elements" }, { es: "Inspeccionar el HTML/CSS de un elemento", en: "Inspect an element's HTML/CSS" } ] },
        { cells: [ { es: "Console", en: "Console" }, { es: "Ver errores de JavaScript", en: "See JavaScript errors" } ] },
        { cells: [ { es: "Network", en: "Network" }, { es: "Revisar peticiones, códigos y tiempos", en: "Review requests, codes and timings" } ] },
        { cells: [ { es: "Device toolbar", en: "Device toolbar" }, { es: "Simular tamaños de pantalla y móviles", en: "Simulate screen sizes and mobiles" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Cuando reportes un bug web, abre la pestaña Console y Network: muchos defectos van acompañados de un error visible ahí, que es evidencia valiosísima para el desarrollador.",
        en: "When reporting a web bug, open the Console and Network tabs: many defects come with a visible error there, which is very valuable evidence for the developer.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m9-l1-fc1",
      front: { es: "¿Qué pestaña de DevTools usarías para ver si una petición devolvió error 500?", en: "Which DevTools tab would you use to see if a request returned a 500 error?" },
      back: { es: "La pestaña Network (red), que muestra las peticiones y sus códigos de estado.", en: "The Network tab, which shows requests and their status codes." },
    },
    {
      type: "quiz",
      questionId: "qaf-m9-l1-q1",
      question: { es: "¿Dónde verías los errores de JavaScript de una página web?", en: "Where would you see a web page's JavaScript errors?" },
      options: [
        { id: "a", text: { es: "En la pestaña Console", en: "In the Console tab" } },
        { id: "b", text: { es: "En la pestaña Elements", en: "In the Elements tab" } },
        { id: "c", text: { es: "En el menú de marcadores", en: "In the bookmarks menu" } },
        { id: "d", text: { es: "En el historial del navegador", en: "In the browser history" } },
      ],
      correctOptionId: "a",
      explanation: { es: "La consola (Console) muestra los errores de JavaScript de la página.", en: "The Console shows the page's JavaScript errors." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 9.2 — Compatibilidad y diseño responsive                   */
/* ------------------------------------------------------------------ */

const L2: LessonContent = {
  id: "qaf-m9-l2",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Probar en muchos contextos", en: "Testing across many contexts" } },
    {
      type: "paragraph",
      content: {
        es: "Un sitio web debe funcionar en distintos navegadores (cross-browser) y adaptarse a distintos tamaños de pantalla (responsive). El QA comprueba que la experiencia se mantiene correcta en todos los contextos relevantes para el usuario.",
        en: "A website must work across different browsers (cross-browser) and adapt to different screen sizes (responsive). QA checks that the experience stays correct in all contexts relevant to the user.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Cross-browser: Chrome, Firefox, Safari, Edge.", en: "Cross-browser: Chrome, Firefox, Safari, Edge." },
        { es: "Breakpoints responsive: móvil, tablet, escritorio.", en: "Responsive breakpoints: mobile, tablet, desktop." },
        { es: "Sin scroll horizontal inesperado ni elementos cortados.", en: "No unexpected horizontal scroll or clipped elements." },
        { es: "Texto legible y botones pulsables en pantallas pequeñas.", en: "Readable text and tappable buttons on small screens." },
      ],
    },
    {
      type: "callout",
      variant: "info",
      content: {
        es: "La 'device toolbar' de las DevTools permite simular tamaños rápidamente, pero la prueba en dispositivos reales sigue siendo más fiable para detectar problemas táctiles o de rendimiento.",
        en: "The DevTools 'device toolbar' lets you simulate sizes quickly, but testing on real devices is still more reliable for catching touch or performance issues.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m9-l2-fc1",
      front: { es: "¿Qué es el testing cross-browser?", en: "What is cross-browser testing?" },
      back: { es: "Comprobar que el sitio funciona correctamente en distintos navegadores.", en: "Checking that the site works correctly across different browsers." },
    },
    {
      type: "quiz",
      questionId: "qaf-m9-l2-q1",
      question: { es: "Comprobar que una web se ve bien en móvil, tablet y escritorio es probar su…", en: "Checking that a website looks good on mobile, tablet and desktop is testing its…" },
      options: [
        { id: "a", text: { es: "Seguridad", en: "Security" } },
        { id: "b", text: { es: "Diseño responsive", en: "Responsive design" } },
        { id: "c", text: { es: "Rendimiento de base de datos", en: "Database performance" } },
        { id: "d", text: { es: "Cobertura de código", en: "Code coverage" } },
      ],
      correctOptionId: "b",
      explanation: { es: "Adaptarse a distintos tamaños de pantalla es el diseño responsive.", en: "Adapting to different screen sizes is responsive design." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 9.3 — Testing mobile manual                                */
/* ------------------------------------------------------------------ */

const L3: LessonContent = {
  id: "qaf-m9-l3",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Lo que hace especial al móvil", en: "What makes mobile special" } },
    {
      type: "paragraph",
      content: {
        es: "Probar apps móviles añade retos que no existen en web de escritorio: gestos táctiles, permisos, interrupciones (llamadas, notificaciones) y condiciones de red cambiantes. El QA mobile debe considerar estos factores propios del dispositivo.",
        en: "Testing mobile apps adds challenges that do not exist on desktop web: touch gestures, permissions, interruptions (calls, notifications) and changing network conditions. Mobile QA must consider these device-specific factors.",
      },
    },
    {
      type: "list",
      ordered: false,
      items: [
        { es: "Gestos: tap, swipe, pinch, long-press.", en: "Gestures: tap, swipe, pinch, long-press." },
        { es: "Permisos: cámara, ubicación, notificaciones.", en: "Permissions: camera, location, notifications." },
        { es: "Interrupciones: llamada entrante, batería baja.", en: "Interruptions: incoming call, low battery." },
        { es: "Redes: WiFi, 4G/5G, modo avión, sin conexión.", en: "Networks: WiFi, 4G/5G, airplane mode, offline." },
        { es: "Diferencias entre iOS y Android.", en: "Differences between iOS and Android." },
      ],
    },
    {
      type: "callout",
      variant: "warning",
      content: {
        es: "Un caso muy olvidado: ¿qué pasa si llega una llamada o se pierde la conexión a mitad de una operación? Estas interrupciones revelan muchos defectos en apps móviles.",
        en: "A commonly forgotten case: what happens if a call comes in or the connection drops mid-operation? These interruptions reveal many defects in mobile apps.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m9-l3-fc1",
      front: { es: "Menciona dos factores propios del testing mobile que no aplican a web de escritorio.", en: "Name two factors specific to mobile testing that do not apply to desktop web." },
      back: { es: "Gestos táctiles e interrupciones (llamadas/notificaciones); también permisos y redes cambiantes.", en: "Touch gestures and interruptions (calls/notifications); also permissions and changing networks." },
    },
    {
      type: "quiz",
      questionId: "qaf-m9-l3-q1",
      question: { es: "¿Cuál de estas pruebas es específica de aplicaciones móviles?", en: "Which of these tests is specific to mobile applications?" },
      options: [
        { id: "a", text: { es: "Comprobar el comportamiento ante una llamada entrante", en: "Checking behavior on an incoming call" } },
        { id: "b", text: { es: "Verificar un cálculo de descuento", en: "Verifying a discount calculation" } },
        { id: "c", text: { es: "Revisar la ortografía de un texto", en: "Reviewing the spelling of a text" } },
        { id: "d", text: { es: "Comprobar un enlace roto", en: "Checking a broken link" } },
      ],
      correctOptionId: "a",
      explanation: { es: "Las interrupciones como una llamada entrante son propias del contexto móvil.", en: "Interruptions like an incoming call are specific to the mobile context." },
    },
  ],
  resources: [
    { title: { es: "Azure Test Plans — Documentación", en: "Azure Test Plans — Documentation" }, url: "https://learn.microsoft.com/en-us/azure/devops/test/?view=azure-devops" },
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Lección 9.4 — Introducción a la accesibilidad (WCAG)               */
/* ------------------------------------------------------------------ */

const L4: LessonContent = {
  id: "qaf-m9-l4",
  moduleId: MODULE_ID,
  sections: [
    { type: "heading", level: 2, content: { es: "Software para todas las personas", en: "Software for everyone" } },
    {
      type: "paragraph",
      content: {
        es: "La accesibilidad busca que el software pueda ser usado por personas con distintas capacidades (visuales, auditivas, motoras, cognitivas). Las pautas de referencia son las WCAG (Web Content Accessibility Guidelines), organizadas en cuatro principios.",
        en: "Accessibility aims to make software usable by people with different abilities (visual, auditory, motor, cognitive). The reference guidelines are the WCAG (Web Content Accessibility Guidelines), organized into four principles.",
      },
    },
    {
      type: "table",
      caption: { es: "Principios WCAG (POUR)", en: "WCAG principles (POUR)" },
      headers: [
        { es: "Principio", en: "Principle" },
        { es: "Idea", en: "Idea" },
      ],
      rows: [
        { cells: [ { es: "Perceptible", en: "Perceivable" }, { es: "La información se puede percibir (texto alternativo, contraste)", en: "Information can be perceived (alt text, contrast)" } ] },
        { cells: [ { es: "Operable", en: "Operable" }, { es: "Se puede usar (navegación por teclado)", en: "It can be operated (keyboard navigation)" } ] },
        { cells: [ { es: "Comprensible", en: "Understandable" }, { es: "Es claro y predecible", en: "It is clear and predictable" } ] },
        { cells: [ { es: "Robusto", en: "Robust" }, { es: "Funciona con tecnologías de asistencia", en: "Works with assistive technologies" } ] },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      content: {
        es: "Comprobaciones rápidas de accesibilidad para QA: navegar solo con el teclado, verificar texto alternativo en imágenes y comprobar el contraste de color.",
        en: "Quick accessibility checks for QA: navigate using only the keyboard, verify alt text on images and check color contrast.",
      },
    },
    {
      type: "flashcard",
      flashcardId: "qaf-m9-l4-fc1",
      front: { es: "¿Qué cuatro principios resumen las WCAG?", en: "Which four principles summarize WCAG?" },
      back: { es: "Perceptible, Operable, Comprensible y Robusto (POUR).", en: "Perceivable, Operable, Understandable and Robust (POUR)." },
    },
    {
      type: "quiz",
      questionId: "qaf-m9-l4-q1",
      question: { es: "Poder usar toda la web solo con el teclado se relaciona con el principio WCAG…", en: "Being able to use the whole site with only the keyboard relates to the WCAG principle…" },
      options: [
        { id: "a", text: { es: "Perceptible", en: "Perceivable" } },
        { id: "b", text: { es: "Operable", en: "Operable" } },
        { id: "c", text: { es: "Robusto", en: "Robust" } },
        { id: "d", text: { es: "Comprensible", en: "Understandable" } },
      ],
      correctOptionId: "b",
      explanation: { es: "La navegación por teclado es parte del principio Operable.", en: "Keyboard navigation is part of the Operable principle." },
    },
  ],
  resources: [
    { title: { es: "ISTQB CTFL v4.0 — Syllabus oficial", en: "ISTQB CTFL v4.0 — Official syllabus" }, url: "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/" },
  ],
};

export function getAllLessonsContent(): LessonContent[] {
  return [L1, L2, L3, L4];
}
