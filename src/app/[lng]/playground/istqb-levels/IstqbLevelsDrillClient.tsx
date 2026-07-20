"use client";

import Link from "next/link";
import { useMemo, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Level = "component" | "integration" | "system" | "acceptance";
type TestType = "functional" | "nonfunctional" | "whitebox" | "changerelated";

interface LevelScenario {
  id: string;
  scenario: { es: string; en: string };
  level: Level;
  type: TestType;
  reason: { es: string; en: string };
}

const SCENARIOS: LevelScenario[] = [
  {
    id: "lv-1",
    scenario: {
      es: "Un desarrollador ejecuta pruebas unitarias sobre la función `calcularDescuento()` en aislamiento, con stubs para el servicio de precios.",
      en: "A developer runs unit tests on the `calculateDiscount()` function in isolation, with stubs for the pricing service.",
    },
    level: "component",
    type: "functional",
    reason: {
      es: "Se prueba una unidad individual aislada de sus dependencias (nivel de componente) y se verifica QUÉ hace la función — su comportamiento funcional.",
      en: "An individual unit is tested in isolation from its dependencies (component level), verifying WHAT the function does — its functional behavior.",
    },
  },
  {
    id: "lv-2",
    scenario: {
      es: "Un equipo de QA verifica que el servicio de pagos y el servicio de facturación intercambien correctamente los datos de una transacción a través de su contrato de API, sin usar dobles de prueba para ninguno de los dos.",
      en: "A QA team verifies that the payments service and the invoicing service correctly exchange transaction data over their API contract, without test doubles for either side.",
    },
    level: "integration",
    type: "functional",
    reason: {
      es: "Se prueba la interacción entre dos componentes reales a través de su interfaz (nivel de integración), verificando QUÉ datos intercambian correctamente — comportamiento funcional.",
      en: "The interaction between two real components is tested through their interface (integration level), verifying WHAT data they correctly exchange — functional behavior.",
    },
  },
  {
    id: "lv-3",
    scenario: {
      es: "El equipo de rendimiento ejecuta una prueba de carga con 5.000 usuarios concurrentes contra el sistema completo desplegado en staging, midiendo los tiempos de respuesta bajo estrés.",
      en: "The performance team runs a load test with 5,000 concurrent users against the complete system deployed in staging, measuring response times under stress.",
    },
    level: "system",
    type: "nonfunctional",
    reason: {
      es: "Se ejecuta sobre el sistema completo e integrado en un entorno similar a producción (nivel de sistema), midiendo CÓMO se comporta bajo carga — un atributo no funcional (rendimiento).",
      en: "It runs against the complete, integrated system in a production-like environment (system level), measuring HOW it behaves under load — a nonfunctional attribute (performance).",
    },
  },
  {
    id: "lv-4",
    scenario: {
      es: "Antes del lanzamiento, representantes del área de negocio ejecutan el flujo completo de compra siguiendo los criterios de aceptación acordados, para decidir si el sistema está listo para producción.",
      en: "Before go-live, business representatives run through the complete purchase flow following the agreed acceptance criteria, to decide whether the system is ready for production.",
    },
    level: "acceptance",
    type: "functional",
    reason: {
      es: "Usuarios de negocio validan que el sistema cumple los criterios de aceptación acordados para decidir el paso a producción (nivel de aceptación), evaluando QUÉ hace el flujo de compra — comportamiento funcional.",
      en: "Business users validate that the system meets the agreed acceptance criteria to decide on go-live (acceptance level), assessing WHAT the purchase flow does — functional behavior.",
    },
  },
  {
    id: "lv-5",
    scenario: {
      es: "Tras aplicar un hotfix en producción, el equipo vuelve a ejecutar exactamente el caso de prueba que antes había fallado, sobre el sistema completo desplegado, para confirmar que el defecto quedó corregido.",
      en: "After applying a hotfix in production, the team re-runs the exact test case that previously failed, against the complete deployed system, to confirm the defect has been fixed.",
    },
    level: "system",
    type: "changerelated",
    reason: {
      es: "Se ejecuta contra el sistema completo desplegado (nivel de sistema), repitiendo el caso exacto que antes falló para confirmar que el cambio (el hotfix) corrigió el defecto — pruebas de confirmación, relacionadas con cambios.",
      en: "It runs against the complete deployed system (system level), re-running the exact previously-failing case to confirm the change (the hotfix) fixed the defect — confirmation testing, change-related.",
    },
  },
  {
    id: "lv-6",
    scenario: {
      es: "Un desarrollador escribe pruebas basadas en la estructura interna de un módulo, diseñadas para ejercitar todas las ramas de sus decisiones (cobertura de decisión), con acceso directo al código fuente.",
      en: "A developer writes tests based on a module's internal structure, designed to exercise every branch of its decisions (branch coverage), with direct access to the source code.",
    },
    level: "component",
    type: "whitebox",
    reason: {
      es: "Se prueba un único módulo de forma aislada (nivel de componente), diseñando los casos a partir de la estructura interna del código y su cobertura de ramas — pruebas de caja blanca.",
      en: "A single module is tested in isolation (component level), with test cases designed from the code's internal structure and its branch coverage — white-box testing.",
    },
  },
  {
    id: "lv-7",
    scenario: {
      es: "Un equipo de UX conduce una sesión de pruebas de usabilidad de punta a punta sobre el producto completo, midiendo cuán fácil les resulta a los participantes completar tareas típicas.",
      en: "A UX team conducts an end-to-end usability testing session on the complete product, measuring how easily participants complete typical tasks.",
    },
    level: "system",
    type: "nonfunctional",
    reason: {
      es: "Se evalúa el producto completo de punta a punta (nivel de sistema), midiendo CÓMO de fácil es de usar — un atributo de calidad no funcional (usabilidad), no si una función puntual produce el resultado correcto.",
      en: "The complete product is evaluated end-to-end (system level), measuring HOW easy it is to use — a nonfunctional quality attribute (usability), not whether a specific function produces the correct output.",
    },
  },
  {
    id: "lv-8",
    scenario: {
      es: "Después de que el equipo de backend modifica la estructura de un payload, se ejecutan pruebas de contrato entre la app móvil y su backend para confirmar que la interfaz entre ambos sigue funcionando tras el cambio.",
      en: "After the backend team changes a payload's structure, contract tests are run between the mobile app and its backend to confirm the interface between them still works after the change.",
    },
    level: "integration",
    type: "changerelated",
    reason: {
      es: "Se prueba la interfaz entre dos componentes (nivel de integración), y el disparador es un cambio reciente en el payload — se valida que ese cambio no rompió la interacción entre la app y el backend, pruebas relacionadas con cambios.",
      en: "The interface between two components is tested (integration level), triggered by a recent change to the payload — validating that the change didn't break the interaction between the app and backend, change-related testing.",
    },
  },
  {
    id: "lv-9",
    scenario: {
      es: "Un grupo de clientes reales prueba una versión beta del producto en su propio entorno de uso cotidiano, evaluando si el software resuelve sus necesidades antes del lanzamiento general.",
      en: "A group of real customers tests a beta version of the product in their own everyday environment, evaluating whether the software meets their needs before general release.",
    },
    level: "acceptance",
    type: "functional",
    reason: {
      es: "Clientes reales, no el equipo de desarrollo, validan el producto en su propio entorno antes del lanzamiento (nivel de aceptación, pruebas beta), evaluando QUÉ tan bien el software resuelve sus necesidades — comportamiento funcional.",
      en: "Real customers, not the development team, validate the product in their own environment before release (acceptance level, beta testing), evaluating WHETHER the software meets their needs — functional behavior.",
    },
  },
  {
    id: "lv-10",
    scenario: {
      es: "Un especialista en seguridad realiza un test de penetración sobre la aplicación completa ya desplegada, buscando vulnerabilidades explotables en el sistema en su conjunto.",
      en: "A security specialist performs a penetration test on the complete, already-deployed application, looking for exploitable vulnerabilities across the system as a whole.",
    },
    level: "system",
    type: "nonfunctional",
    reason: {
      es: "Se analiza la aplicación completa ya desplegada como un todo (nivel de sistema), evaluando un atributo de calidad — la seguridad —, no si una función puntual produce el resultado esperado: pruebas no funcionales.",
      en: "The complete deployed application is examined as a whole (system level), assessing a quality attribute — security — rather than whether a specific function produces the expected result: nonfunctional testing.",
    },
  },
  {
    id: "lv-11",
    scenario: {
      es: "Tras refactorizar el bus de mensajería interno, el equipo ejecuta una suite de regresión enfocada en los límites entre los módulos que se comunican a través de él, para detectar efectos secundarios del cambio.",
      en: "After refactoring the internal messaging bus, the team runs a regression suite focused on the boundaries between the modules that communicate through it, to detect side effects of the change.",
    },
    level: "integration",
    type: "changerelated",
    reason: {
      es: "Se prueban los límites entre módulos que se comunican entre sí (nivel de integración), a raíz de un cambio reciente (el refactor) — se buscan efectos secundarios no deseados, regresión: pruebas relacionadas con cambios.",
      en: "The boundaries between modules that communicate with each other are tested (integration level), triggered by a recent change (the refactor) — looking for unintended side effects, regression: change-related testing.",
    },
  },
  {
    id: "lv-12",
    scenario: {
      es: "Un desarrollador ejecuta un micro-benchmark de rendimiento sobre una función de parseo aislada, midiendo si su tiempo de ejecución se mantiene dentro de un presupuesto definido.",
      en: "A developer runs a performance micro-benchmark on an isolated parsing function, measuring whether its execution time stays within a defined budget.",
    },
    level: "component",
    type: "nonfunctional",
    reason: {
      es: "Se mide una única función aislada (nivel de componente), pero el foco no es si el resultado es correcto sino CUÁNTO tarda en ejecutarse frente a un presupuesto de tiempo — un atributo no funcional (rendimiento) a nivel de componente.",
      en: "A single isolated function is measured (component level), but the focus is not whether the output is correct but HOW LONG it takes to run against a time budget — a nonfunctional attribute (performance) at the component level.",
    },
  },
];

const LEVEL_OPTIONS: Level[] = ["component", "integration", "system", "acceptance"];
const TYPE_OPTIONS: TestType[] = ["functional", "nonfunctional", "whitebox", "changerelated"];

const LEVEL_LABEL: Record<Level, { es: string; en: string }> = {
  component: { es: "Componente", en: "Component" },
  integration: { es: "Integración", en: "Integration" },
  system: { es: "Sistema", en: "System" },
  acceptance: { es: "Aceptación", en: "Acceptance" },
};

const TYPE_LABEL: Record<TestType, { es: string; en: string }> = {
  functional: { es: "Funcional", en: "Functional" },
  nonfunctional: { es: "No funcional", en: "Nonfunctional" },
  whitebox: { es: "Caja blanca", en: "White-box" },
  changerelated: { es: "Relacionado con cambios", en: "Change-related" },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbLevelsDrillClient(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [levels, setLevels] = useState<Record<string, Level>>({});
  const [types, setTypes] = useState<Record<string, TestType>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = SCENARIOS.filter((s) => levels[s.id] && types[s.id]).length;
  const allAnswered = answeredCount === SCENARIOS.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return SCENARIOS.filter((s) => levels[s.id] === s.level && types[s.id] === s.type).length;
  }, [submitted, levels, types]);

  const passed = score >= 8;

  function reset() {
    setLevels({});
    setTypes({});
    setSubmitted(false);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Niveles y Tipos de Prueba" : "Test Levels & Types"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Clasifica cada escenario según su nivel de prueba (qué se prueba y con qué alcance) y su tipo de prueba (qué objetivo persigue). Los dos ejes son independientes entre sí."
              : "Classify each scenario by its test level (what's being tested and at what scope) and its test type (what objective it pursues). The two axes are independent of each other."}
          </p>
        </div>

        <div className="space-y-5">
          {SCENARIOS.map((s) => {
            const levelCorrect = submitted && levels[s.id] === s.level;
            const typeCorrect = submitted && types[s.id] === s.type;
            return (
              <section key={s.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{s.scenario[lng as "es" | "en"] ?? s.scenario.en}</p>

                <div className="mt-3 flex flex-wrap gap-6">
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">{lng === "es" ? "Nivel" : "Level"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {LEVEL_OPTIONS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          aria-pressed={levels[s.id] === l}
                          disabled={submitted}
                          onClick={() => setLevels((prev) => ({ ...prev, [s.id]: l }))}
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                            levels[s.id] === l
                              ? (submitted
                                  ? (l === s.level ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
                                  : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400")
                              : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                          ].join(" ")}
                        >
                          {LEVEL_LABEL[l][lng as "es" | "en"] ?? LEVEL_LABEL[l].en}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">{lng === "es" ? "Tipo" : "Type"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {TYPE_OPTIONS.map((t) => (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={types[s.id] === t}
                          disabled={submitted}
                          onClick={() => setTypes((prev) => ({ ...prev, [s.id]: t }))}
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                            types[s.id] === t
                              ? (submitted
                                  ? (t === s.type ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
                                  : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400")
                              : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                          ].join(" ")}
                        >
                          {TYPE_LABEL[t][lng as "es" | "en"] ?? TYPE_LABEL[t].en}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {submitted && (
                  <p className={["mt-3 text-xs", levelCorrect && typeCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                    {levelCorrect && typeCorrect ? "✓ " : "✗ "}
                    {s.reason[lng as "es" | "en"] ?? s.reason.en}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {!submitted ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className="rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {lng === "es" ? `Enviar respuestas (${answeredCount}/${SCENARIOS.length})` : `Submit answers (${answeredCount}/${SCENARIOS.length})`}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {score}/{SCENARIOS.length} {lng === "es" ? "correctas" : "correct"}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
                </button>
              </div>

              <div>
                <Link
                  href={passed ? `/${lng}/exams` : `/${lng}/campus/istqb`}
                  className="inline-block rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {passed
                    ? lng === "es"
                      ? "¡Nivel certificación! Prueba un simulacro CTFL completo."
                      : "Certification level! Try a full CTFL mock exam."
                    : lng === "es"
                      ? "Repasa los fundamentos en el campus ISTQB y vuelve a intentarlo."
                      : "Review the fundamentals in the ISTQB campus and try again."}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
