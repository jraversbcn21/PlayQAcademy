"use client";

import Link from "next/link";
import { useMemo, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface CoverageOption {
  value: string;
  label: { es: string; en: string };
}

interface CoverageExercise {
  id: string;
  pseudocode: string;
  testCase: { es: string; en: string };
  question: { es: string; en: string };
  options: CoverageOption[];
  correct: string;
  explanation: { es: string; en: string };
}

const COVERAGE_EXERCISES: CoverageExercise[] = [
  {
    id: "cv-1",
    pseudocode: `1  leer x
2  si x > 10:
3      imprimir "alto"
4  imprimir "fin"`,
    testCase: { es: "Caso de prueba: x = 5.", en: "Test case: x = 5." },
    question: {
      es: "¿Qué cobertura de sentencia y de rama se alcanza con este único caso de prueba?",
      en: "What statement and branch coverage does this single test case achieve?",
    },
    options: [
      { value: "a", label: { es: "100% sentencia, 50% rama", en: "100% statement, 50% branch" } },
      { value: "b", label: { es: "75% sentencia (3/4), 50% rama (1/2)", en: "75% statement (3/4), 50% branch (1/2)" } },
      { value: "c", label: { es: "75% sentencia, 100% rama", en: "75% statement, 100% branch" } },
      { value: "d", label: { es: "50% sentencia, 50% rama", en: "50% statement, 50% branch" } },
    ],
    correct: "b",
    explanation: {
      es: "Con x = 5: la línea 1 se ejecuta (lee x). La línea 2 se ejecuta y evalúa a falso (5 no es mayor que 10), por lo que toma la rama falsa del si. La línea 3 nunca se ejecuta porque pertenece a la rama verdadera del si, que no se toma. La línea 4 se ejecuta siempre. Total: 3 de 4 sentencias ejecutadas (75%) y solo 1 de las 2 ramas del si —la falsa— fue tomada (50%).",
      en: "With x = 5: line 1 runs (reads x). Line 2 runs and evaluates to false (5 is not greater than 10), so it takes the si's false branch. Line 3 never runs because it belongs to the si's true branch, which is not taken. Line 4 always runs. Total: 3 of 4 statements executed (75%) and only 1 of the si's 2 branches — the false one — was taken (50%).",
    },
  },
  {
    id: "cv-2",
    pseudocode: `1  leer a, b
2  si a > 0 y b > 0:
3      msg = "ambos positivos"
4  si no:
5      msg = "no ambos"
6  si a > b:
7      msg = msg + ", a mayor"
8  imprimir msg`,
    testCase: {
      es: "Casos de prueba: {a=3, b=2} y {a=-1, b=4}.",
      en: "Test cases: {a=3, b=2} and {a=-1, b=4}.",
    },
    question: {
      es: "¿Qué cobertura de sentencia y de rama alcanzan estos dos casos de prueba juntos?",
      en: "What statement and branch coverage do these two test cases achieve together?",
    },
    options: [
      { value: "a", label: { es: "100% sentencia, 75% rama", en: "100% statement, 75% branch" } },
      { value: "b", label: { es: "87% sentencia, 100% rama", en: "87% statement, 100% branch" } },
      { value: "c", label: { es: "100% sentencia, 100% rama", en: "100% statement, 100% branch" } },
      { value: "d", label: { es: "75% sentencia, 50% rama", en: "75% statement, 50% branch" } },
    ],
    correct: "c",
    explanation: {
      es: "TC1 (a=3, b=2): la línea 2 evalúa a>0 y b>0 → verdadero, toma la rama verdadera (línea 3); la línea 6 evalúa a>b (3>2) → verdadero, ejecuta la línea 7. Cubre las sentencias 1, 2, 3, 6, 7, 8 y la rama verdadera de ambos si. TC2 (a=-1, b=4): la línea 2 evalúa a>0 y b>0 → falso, toma la rama 'si no' (línea 4-5); la línea 6 evalúa a>b (-1>4) → falso, no ejecuta la línea 7. Cubre las sentencias 1, 2, 4, 5, 6, 8 y la rama falsa de ambos si. Entre los dos casos se ejecutan las 8 sentencias (100%) y las 4 ramas posibles quedan cubiertas (100%): dos casos bien elegidos bastan para cubrir todo el flujo.",
      en: "TC1 (a=3, b=2): line 2 evaluates a>0 and b>0 → true, taking the true branch (line 3); line 6 evaluates a>b (3>2) → true, running line 7. It covers statements 1, 2, 3, 6, 7, 8 and the true branch of both si. TC2 (a=-1, b=4): line 2 evaluates a>0 and b>0 → false, taking the 'si no' branch (lines 4-5); line 6 evaluates a>b (-1>4) → false, skipping line 7. It covers statements 1, 2, 4, 5, 6, 8 and the false branch of both si. Between the two cases all 8 statements run (100%) and all 4 possible branches are covered (100%): two well-chosen cases are enough to fully cover this flow.",
    },
  },
  {
    id: "cv-3",
    pseudocode: `1  leer n
2  si n >= 0:
3      resultado = "válido"
4  si n > 100:
5      resultado = "demasiado grande"
6  imprimir resultado`,
    testCase: { es: "Caso de prueba: n = 150.", en: "Test case: n = 150." },
    question: {
      es: "¿Qué cobertura de sentencia y de rama alcanza este único caso de prueba?",
      en: "What statement and branch coverage does this single test case achieve?",
    },
    options: [
      { value: "a", label: { es: "100% sentencia, 100% rama", en: "100% statement, 100% branch" } },
      { value: "b", label: { es: "83% sentencia, 50% rama", en: "83% statement, 50% branch" } },
      { value: "c", label: { es: "100% sentencia, 75% rama", en: "100% statement, 75% branch" } },
      { value: "d", label: { es: "100% sentencia, 50% rama (2/4)", en: "100% statement, 50% branch (2/4)" } },
    ],
    correct: "d",
    explanation: {
      es: "Con n = 150: la línea 2 evalúa n>=0 → verdadero (ejecuta la línea 3); la línea 4 evalúa n>100 → verdadero (ejecuta la línea 5); la línea 6 imprime. Las 6 sentencias se ejecutan (100%), pero en ambos si solo se tomó la rama verdadera: la rama falsa de 'n>=0' y la rama falsa de 'n>100' nunca se ejercitaron. De 4 ramas posibles, solo 2 se cubrieron (50%). Este es el ejemplo clásico de que 100% de cobertura de sentencia no implica 100% de cobertura de rama.",
      en: "With n = 150: line 2 evaluates n>=0 → true (runs line 3); line 4 evaluates n>100 → true (runs line 5); line 6 prints. All 6 statements run (100%), but in both si only the true branch was taken: the false branch of 'n>=0' and the false branch of 'n>100' were never exercised. Of 4 possible branches, only 2 were covered (50%). This is the classic example that 100% statement coverage does not imply 100% branch coverage.",
    },
  },
];

interface TraceabilityExercise {
  id: string;
  requirements: string[];
  testCases: string[];
  mapping: Record<string, string[]>;
  correctSet: string[];
  prompt: { es: string; en: string };
  explanation: { es: string; en: string };
}

const TRACE_EXERCISES: TraceabilityExercise[] = [
  {
    id: "tr-1",
    requirements: ["R1", "R2", "R3"],
    testCases: ["TC1", "TC2", "TC3", "TC4"],
    mapping: {
      R1: ["TC1"],
      R2: ["TC2", "TC3"],
      R3: [],
    },
    correctSet: ["R3", "TC4"],
    prompt: {
      es: "Marca todos los elementos que tienen un problema: requisitos sin ningún caso de prueba, o casos de prueba que no cubren ningún requisito.",
      en: "Check every item with a problem: requirements with no test case, or test cases that cover no requirement.",
    },
    explanation: {
      es: "R3 no tiene ningún caso de prueba asociado: es un requisito sin cobertura. TC4 está mapeado en la matriz pero no cubre ningún requisito: es un caso de prueba huérfano. R1 (cubierto por TC1) y R2 (cubierto por TC2 y TC3) no tienen ningún problema.",
      en: "R3 has no test case mapped to it: it's an uncovered requirement. TC4 appears in the matrix but doesn't cover any requirement: it's an orphan test case. R1 (covered by TC1) and R2 (covered by TC2 and TC3) have no issue.",
    },
  },
  {
    id: "tr-2",
    requirements: ["R1", "R2", "R3", "R4"],
    testCases: ["TC1", "TC2", "TC3", "TC4"],
    mapping: {
      R1: ["TC1"],
      R2: ["TC1"],
      R3: ["TC2", "TC4"],
      R4: [],
    },
    correctSet: ["R4", "TC3"],
    prompt: {
      es: "Marca todos los elementos que tienen un problema: requisitos sin ningún caso de prueba, o casos de prueba que no cubren ningún requisito.",
      en: "Check every item with a problem: requirements with no test case, or test cases that cover no requirement.",
    },
    explanation: {
      es: "R4 no tiene ningún caso de prueba asociado: requisito sin cobertura. TC3 no cubre ningún requisito: caso huérfano. Fíjate en que TC1 cubre tanto R1 como R2 — eso no es un problema, la cobertura no tiene por qué ser 1 a 1 entre requisitos y casos de prueba.",
      en: "R4 has no test case mapped to it: an uncovered requirement. TC3 covers no requirement: an orphan case. Notice that TC1 covers both R1 and R2 — that's not a problem, coverage doesn't have to be 1-to-1 between requirements and test cases.",
    },
  },
  {
    id: "tr-3",
    requirements: ["R1", "R2", "R3", "R4", "R5", "R6"],
    testCases: ["TC1", "TC2", "TC3", "TC4", "TC5", "TC6", "TC7"],
    mapping: {
      R1: ["TC1", "TC2", "TC3"],
      R2: ["TC4"],
      R3: ["TC5"],
      R4: ["TC5"],
      R5: [],
      R6: [],
    },
    correctSet: ["R5", "R6", "TC6", "TC7"],
    prompt: {
      es: "Marca todos los elementos que tienen un problema: requisitos sin ningún caso de prueba, o casos de prueba que no cubren ningún requisito.",
      en: "Check every item with a problem: requirements with no test case, or test cases that cover no requirement.",
    },
    explanation: {
      es: "R5 y R6 no tienen ningún caso de prueba asociado: son los dos requisitos sin cobertura. TC6 y TC7 no cubren ningún requisito: son los dos casos huérfanos. Ojo con los distractores: R1 está cubierto por tres casos de prueba (TC1, TC2, TC3) y eso está perfectamente bien; TC5 cubre dos requisitos (R3 y R4) a la vez, lo cual también es válido — ninguno de esos dos patrones es un problema por sí mismo.",
      en: "R5 and R6 have no test case mapped to them: they're the two uncovered requirements. TC6 and TC7 cover no requirement: they're the two orphan cases. Watch the distractors: R1 is covered by three test cases (TC1, TC2, TC3) and that's perfectly fine; TC5 covers two requirements (R3 and R4) at once, which is also valid — neither of those two patterns is a problem on its own.",
    },
  },
];

const TOTAL_EXERCISES = COVERAGE_EXERCISES.length + TRACE_EXERCISES.length;

function isTraceCorrect(ex: TraceabilityExercise, checks: Record<string, Record<string, boolean>>): boolean {
  const checked = checks[ex.id] ?? {};
  const checkedKeys = Object.keys(checked).filter((k) => checked[k]);
  if (checkedKeys.length !== ex.correctSet.length) return false;
  return ex.correctSet.every((item) => checked[item]);
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbCoverageDrillPage(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const { lng } = params;
  const t = lng as "es" | "en";

  const [coverageAnswers, setCoverageAnswers] = useState<Record<string, string>>({});
  const [traceChecks, setTraceChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCoverageCount = COVERAGE_EXERCISES.filter((c) => coverageAnswers[c.id]).length;
  const allAnswered = answeredCoverageCount === COVERAGE_EXERCISES.length;

  function toggleTraceItem(exerciseId: string, item: string) {
    setTraceChecks((prev) => {
      const current = prev[exerciseId] ?? {};
      return {
        ...prev,
        [exerciseId]: { ...current, [item]: !current[item] },
      };
    });
  }

  const score = useMemo(() => {
    if (!submitted) return 0;
    const coverageScore = COVERAGE_EXERCISES.filter((c) => coverageAnswers[c.id] === c.correct).length;
    const traceScore = TRACE_EXERCISES.filter((ex) => isTraceCorrect(ex, traceChecks)).length;
    return coverageScore + traceScore;
  }, [submitted, coverageAnswers, traceChecks]);

  const passed = score >= 4;

  function reset() {
    setCoverageAnswers({});
    setTraceChecks({});
    setSubmitted(false);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Cobertura y Trazabilidad" : "Coverage & Traceability"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Calcula la cobertura de sentencia y de rama sobre pseudocódigo, y audita matrices de trazabilidad en busca de requisitos sin cubrir y casos de prueba huérfanos."
              : "Compute statement and branch coverage over pseudocode, and audit traceability matrices for uncovered requirements and orphan test cases."}
          </p>
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Section 1: coverage calculations                            */}
        {/* ------------------------------------------------------------ */}
        <h2 className="mb-4 text-lg font-semibold text-[var(--color-text-primary)]">
          {lng === "es" ? "Cálculos de cobertura" : "Coverage calculations"}
        </h2>

        <div className="space-y-5">
          {COVERAGE_EXERCISES.map((c) => {
            const selected = coverageAnswers[c.id];
            const isCorrect = submitted && selected === c.correct;
            return (
              <section key={c.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <pre className="rounded-lg bg-[var(--color-bg-elevated)] p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  {c.pseudocode}
                </pre>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{c.testCase[t] ?? c.testCase.en}</p>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-primary)]">{c.question[t] ?? c.question.en}</p>

                <div className="mt-3 flex flex-col gap-1.5">
                  {c.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={selected === opt.value}
                      disabled={submitted}
                      onClick={() => setCoverageAnswers((prev) => ({ ...prev, [c.id]: opt.value }))}
                      className={[
                        "rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors disabled:cursor-not-allowed",
                        selected === opt.value
                          ? submitted
                            ? opt.value === c.correct
                              ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                              : "border-red-500/40 bg-red-500/10 text-red-400"
                            : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400"
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                      ].join(" ")}
                    >
                      {opt.label[t] ?? opt.label.en}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <p className={["mt-3 text-xs leading-relaxed", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                    {isCorrect ? "✓ " : "✗ "}
                    {c.explanation[t] ?? c.explanation.en}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        {/* ------------------------------------------------------------ */}
        {/*  Section 2: traceability audits                              */}
        {/* ------------------------------------------------------------ */}
        <h2 className="mb-4 mt-10 text-lg font-semibold text-[var(--color-text-primary)]">
          {lng === "es" ? "Auditorías de trazabilidad" : "Traceability audits"}
        </h2>

        <div className="space-y-5">
          {TRACE_EXERCISES.map((ex) => {
            const isCorrect = submitted && isTraceCorrect(ex, traceChecks);
            const checked = traceChecks[ex.id] ?? {};
            return (
              <section key={ex.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{ex.prompt[t] ?? ex.prompt.en}</p>

                <div className="mt-3 overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr>
                        <th className="border border-[var(--color-border)] p-2 text-left text-[var(--color-text-secondary)]" />
                        {ex.testCases.map((tc) => (
                          <th key={tc} className="border border-[var(--color-border)] p-2 text-center font-medium text-[var(--color-text-secondary)]">
                            {tc}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {ex.requirements.map((req) => (
                        <tr key={req}>
                          <th className="border border-[var(--color-border)] p-2 text-left font-medium text-[var(--color-text-secondary)]">
                            {req}
                          </th>
                          {ex.testCases.map((tc) => (
                            <td key={tc} className="border border-[var(--color-border)] p-2 text-center text-[var(--color-text-primary)]">
                              {(ex.mapping[req] ?? []).includes(tc) ? "✓" : ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                  {[...ex.requirements, ...ex.testCases].map((item) => {
                    const itemChecked = !!checked[item];
                    const shouldBeChecked = ex.correctSet.includes(item);
                    const inputId = `${ex.id}-${item}`;
                    let labelClass = "text-[var(--color-text-secondary)]";
                    if (submitted) {
                      if (shouldBeChecked && itemChecked) labelClass = "text-brand-forest-400";
                      else if (shouldBeChecked && !itemChecked) labelClass = "text-red-400";
                      else if (!shouldBeChecked && itemChecked) labelClass = "text-red-400";
                      else labelClass = "text-[var(--color-text-muted)]";
                    }
                    return (
                      <div key={item} className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          id={inputId}
                          checked={itemChecked}
                          disabled={submitted}
                          onChange={() => toggleTraceItem(ex.id, item)}
                          className="h-4 w-4 rounded border-[var(--color-border)]"
                        />
                        <label htmlFor={inputId} className={["text-sm font-medium transition-colors", labelClass].join(" ")}>
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <p className={["mt-3 text-xs leading-relaxed", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                    {isCorrect ? "✓ " : "✗ "}
                    {ex.explanation[t] ?? ex.explanation.en}
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
                {lng === "es"
                  ? `Enviar respuestas (${answeredCoverageCount}/${COVERAGE_EXERCISES.length})`
                  : `Submit answers (${answeredCoverageCount}/${COVERAGE_EXERCISES.length})`}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {score}/{TOTAL_EXERCISES} {lng === "es" ? "correctas" : "correct"}
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
