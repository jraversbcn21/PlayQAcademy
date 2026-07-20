"use client";

import Link from "next/link";
import { useEffect, useRef, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface MatchPair {
  id: string;
  left: { es: string; en: string };
  right: { es: string; en: string };
}

interface MatchRound {
  id: string;
  title: { es: string; en: string };
  leftHeader: { es: string; en: string };
  rightHeader: { es: string; en: string };
  pairs: MatchPair[];
}

const ROUNDS: MatchRound[] = [
  {
    id: "terms",
    title: { es: "Ronda 1 — Término ↔ Definición", en: "Round 1 — Term ↔ Definition" },
    leftHeader: { es: "Término", en: "Term" },
    rightHeader: { es: "Definición", en: "Definition" },
    pairs: [
      {
        id: "error",
        left: { es: "Error (equivocación)", en: "Error (mistake)" },
        right: { es: "Acción humana que produce un resultado incorrecto.", en: "A human action that produces an incorrect result." },
      },
      {
        id: "defect",
        left: { es: "Defecto", en: "Defect" },
        right: { es: "Imperfección en un producto de trabajo que puede llegar a causar un fallo.", en: "An imperfection in a work product that can go on to cause a failure." },
      },
      {
        id: "failure",
        left: { es: "Fallo", en: "Failure" },
        right: { es: "Evento en el que el sistema se desvía de su comportamiento esperado durante la operación.", en: "An event in which the system deviates from its expected behavior during operation." },
      },
      {
        id: "quality",
        left: { es: "Calidad", en: "Quality" },
        right: { es: "Grado en que las necesidades de los interesados (stakeholders) quedan satisfechas.", en: "The degree to which stakeholders' needs are satisfied." },
      },
      {
        id: "verification",
        left: { es: "Verificación", en: "Verification" },
        right: { es: "Confirma que el producto cumple sus requisitos especificados: «¿estamos construyendo el producto correctamente?».", en: "Confirms the product meets its specified requirements: ‘are we building the product right?’" },
      },
      {
        id: "validation",
        left: { es: "Validación", en: "Validation" },
        right: { es: "Confirma que el producto satisface las necesidades reales del usuario: «¿estamos construyendo el producto correcto?».", en: "Confirms the product meets the user's actual needs: ‘are we building the right product?’" },
      },
      {
        id: "testware",
        left: { es: "Testware", en: "Testware" },
        right: { es: "Conjunto de artefactos producidos durante el testing: planes, casos, datos e informes.", en: "The set of artifacts produced during testing: plans, cases, data, and reports." },
      },
      {
        id: "root-cause",
        left: { es: "Causa raíz", en: "Root cause" },
        right: { es: "Razón fundamental de un defecto cuya eliminación evita que vuelva a producirse.", en: "The fundamental reason for a defect, whose removal prevents it from recurring." },
      },
    ],
  },
  {
    id: "process",
    title: { es: "Ronda 2 — Actividad ↔ Fase del proceso", en: "Round 2 — Activity ↔ Process phase" },
    leftHeader: { es: "Actividad", en: "Activity" },
    rightHeader: { es: "Fase", en: "Phase" },
    pairs: [
      {
        id: "planning",
        left: { es: "Definir el alcance, el calendario y los criterios de salida de las pruebas.", en: "Defining the scope, schedule, and exit criteria for testing." },
        right: { es: "Planificación de pruebas", en: "Test planning" },
      },
      {
        id: "analysis",
        left: { es: "Derivar las condiciones de prueba a partir de los requisitos y otras bases de prueba.", en: "Deriving test conditions from the requirements and other test bases." },
        right: { es: "Análisis de pruebas", en: "Test analysis" },
      },
      {
        id: "design",
        left: { es: "Convertir las condiciones de prueba en casos de prueba, datos y configuración del entorno.", en: "Turning test conditions into test cases, data, and environment setup." },
        right: { es: "Diseño de pruebas", en: "Test design" },
      },
      {
        id: "implementation",
        left: { es: "Priorizar los casos de prueba y organizarlos en un orden de ejecución.", en: "Prioritizing test cases and scheduling them into an execution order." },
        right: { es: "Implementación de pruebas", en: "Test implementation" },
      },
      {
        id: "execution",
        left: { es: "Ejecutar los casos de prueba y registrar el resultado real frente al esperado.", en: "Running the test cases and logging the actual result against the expected one." },
        right: { es: "Ejecución de pruebas", en: "Test execution" },
      },
      {
        id: "completion",
        left: { es: "Comprobar los criterios de salida e informar del resultado a los interesados.", en: "Checking the exit criteria and reporting the outcome to stakeholders." },
        right: { es: "Cierre de pruebas / seguimiento y control", en: "Test completion / monitoring & control" },
      },
    ],
  },
  {
    id: "reviews",
    title: { es: "Ronda 3 — Rol ↔ Responsabilidad en revisión", en: "Round 3 — Role ↔ Review responsibility" },
    leftHeader: { es: "Rol", en: "Role" },
    rightHeader: { es: "Responsabilidad", en: "Responsibility" },
    pairs: [
      {
        id: "author",
        left: { es: "Autor/a", en: "Author" },
        right: { es: "Crea el producto de trabajo bajo revisión y corrige los defectos encontrados.", en: "Creates the work product under review and fixes the defects found." },
      },
      {
        id: "moderator",
        left: { es: "Moderador/a (facilitador)", en: "Moderator (facilitator)" },
        right: { es: "Dirige la reunión de revisión, media entre los participantes y asegura que se siga el proceso.", en: "Leads the review meeting, mediates between participants, and ensures the process is followed." },
      },
      {
        id: "scribe",
        left: { es: "Secretario/a (scribe)", en: "Scribe" },
        right: { es: "Registra los defectos, las decisiones y los puntos abiertos durante la reunión.", en: "Records the defects, decisions, and open points raised during the meeting." },
      },
      {
        id: "reviewer",
        left: { es: "Revisor/a", en: "Reviewer" },
        right: { es: "Examina el producto para encontrar anomalías, a veces desde una perspectiva concreta asignada.", en: "Examines the product to find anomalies, sometimes from a specific assigned perspective." },
      },
      {
        id: "review-leader",
        left: { es: "Líder/gestor de la revisión", en: "Review leader/manager" },
        right: { es: "Planifica la revisión y decide quién participa y cuáles son sus objetivos.", en: "Plans the review and decides who participates and what its objectives are." },
      },
    ],
  },
];

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

function shuffleAllRounds(): string[][] {
  return ROUNDS.map((round) => fisherYates(round.pairs.map((pair) => pair.id)));
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbMatchPage(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [roundIndex, setRoundIndex] = useState(0);
  const [rightOrders, setRightOrders] = useState<string[][]>(() => shuffleAllRounds());
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<{ leftId: string; rightId: string } | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const round = ROUNDS[roundIndex] ?? ROUNDS[0];
  if (!round) return null;
  const rightOrder = rightOrders[roundIndex] ?? [];
  const isLastRound = roundIndex === ROUNDS.length - 1;
  const allMatched = matched.size === round.pairs.length;
  const finished = isLastRound && allMatched;

  function selectLeft(id: string) {
    if (matched.has(id) || wrongFlash) return;
    setSelectedLeftId((prev) => (prev === id ? null : id));
  }

  function selectRight(id: string) {
    if (!selectedLeftId || wrongFlash) return;
    if (selectedLeftId === id) {
      setMatched((prev) => new Set(prev).add(selectedLeftId));
      setSelectedLeftId(null);
    } else {
      setWrongFlash({ leftId: selectedLeftId, rightId: id });
      setWrongAttempts((n) => n + 1);
      timeoutRef.current = setTimeout(() => {
        setWrongFlash(null);
        setSelectedLeftId(null);
      }, 700);
    }
  }

  function nextRound() {
    setRoundIndex((i) => Math.min(i + 1, ROUNDS.length - 1));
    setMatched(new Set());
    setSelectedLeftId(null);
    setWrongFlash(null);
  }

  function reset() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setRoundIndex(0);
    setRightOrders(shuffleAllRounds());
    setMatched(new Set());
    setSelectedLeftId(null);
    setWrongFlash(null);
    setWrongAttempts(0);
  }

  const passed = wrongAttempts <= 3;

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Relacionar Conceptos" : "Concept Matching"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Tres rondas de emparejar: elige un elemento de la izquierda y luego el de la derecha que le corresponde. Si no coinciden, podrás reintentar."
              : "Three matching rounds: click an item on the left, then the one on the right that pairs with it. If they don't match, you can try again."}
          </p>
        </div>

        {/* Round stepper */}
        <div className="mb-6 flex items-center gap-2">
          {ROUNDS.map((r, i) => (
            <div
              key={r.id}
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                i === roundIndex
                  ? "border-brand-forest-500/60 bg-brand-forest-500/10 text-brand-forest-400"
                  : i < roundIndex
                    ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                    : "border-[var(--color-border)] text-[var(--color-text-muted)]",
              ].join(" ")}
            >
              {i < roundIndex ? "✓" : i + 1}
            </div>
          ))}
          <span className="ml-2 text-sm text-[var(--color-text-muted)]">
            {lng === "es" ? `Ronda ${roundIndex + 1}/${ROUNDS.length}` : `Round ${roundIndex + 1}/${ROUNDS.length}`}
          </span>
        </div>

        {!finished && (
          <>
            <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
              {round.title[lng as "es" | "en"] ?? round.title.en}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Left column */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {round.leftHeader[lng as "es" | "en"] ?? round.leftHeader.en}
                </p>
                {round.pairs.map((pair) => {
                  const isMatched = matched.has(pair.id);
                  const isSelected = selectedLeftId === pair.id;
                  const isWrong = wrongFlash?.leftId === pair.id;
                  return (
                    <button
                      key={pair.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => selectLeft(pair.id)}
                      className={[
                        "block w-full rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-not-allowed",
                        isMatched
                          ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                          : isWrong
                            ? "border-red-500/60 bg-red-500/10 text-red-400"
                            : isSelected
                              ? "border-brand-gold-500/50 bg-brand-gold-500/10 text-brand-gold-400"
                              : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-brand-forest-500/30",
                      ].join(" ")}
                    >
                      {pair.left[lng as "es" | "en"] ?? pair.left.en}
                    </button>
                  );
                })}
              </div>

              {/* Right column */}
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                  {round.rightHeader[lng as "es" | "en"] ?? round.rightHeader.en}
                </p>
                {rightOrder.map((id) => {
                  const pair = round.pairs.find((p) => p.id === id);
                  if (!pair) return null;
                  const isMatched = matched.has(id);
                  const isWrong = wrongFlash?.rightId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      disabled={isMatched || !selectedLeftId}
                      onClick={() => selectRight(id)}
                      className={[
                        "block w-full rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-not-allowed",
                        isMatched
                          ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                          : isWrong
                            ? "border-red-500/60 bg-red-500/10 text-red-400"
                            : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-brand-forest-500/30 disabled:opacity-50",
                      ].join(" ")}
                    >
                      {pair.right[lng as "es" | "en"] ?? pair.right.en}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              {allMatched && !isLastRound ? (
                <button
                  type="button"
                  onClick={nextRound}
                  className="rounded-lg bg-brand-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {lng === "es" ? "Siguiente ronda →" : "Next round →"}
                </button>
              ) : (
                <p className="text-sm text-[var(--color-text-muted)]">
                  {matched.size}/{round.pairs.length} {lng === "es" ? "emparejados" : "matched"}
                  {wrongAttempts > 0 && ` · ${wrongAttempts} ${lng === "es" ? "incorrecto(s)" : "wrong"}`}
                </p>
              )}
            </div>
          </>
        )}

        {finished && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {lng === "es" ? "¡Completado!" : "Done!"}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {wrongAttempts === 0
                ? (lng === "es" ? "Sin errores en las 3 rondas." : "No mistakes across all 3 rounds.")
                : `${wrongAttempts} ${lng === "es" ? "intento(s) incorrecto(s) en total." : "wrong attempt(s) in total."}`}
            </p>

            <div className="mt-5">
              <Link
                href={passed ? `/${lng}/exams` : `/${lng}/campus/istqb`}
                className="inline-block rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
              >
                {passed
                  ? lng === "es"
                    ? "¡Gran dominio conceptual! Prueba un simulacro CTFL completo."
                    : "Strong conceptual grasp! Try a full CTFL mock exam."
                  : lng === "es"
                    ? "Repasa los fundamentos en el campus ISTQB y vuelve a intentarlo."
                    : "Review the fundamentals in the ISTQB campus and try again."}
              </Link>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
