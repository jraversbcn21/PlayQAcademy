"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Category = "valid" | "boundary" | "invalid";

interface DrillValue {
  value: string;
  category: Category;
  explanation: { es: string; en: string };
}

interface Scenario {
  id: string;
  spec: { es: string; en: string };
  values: DrillValue[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "age",
    spec: {
      es: "El campo «Edad» acepta enteros entre 18 y 65 (ambos incluidos).",
      en: "The «Age» field accepts integers from 18 to 65 (inclusive).",
    },
    values: [
      { value: "17", category: "boundary", explanation: { es: "Justo debajo del límite inferior — valor límite inválido.", en: "Just below the lower bound — invalid boundary value." } },
      { value: "18", category: "boundary", explanation: { es: "El límite inferior exacto — valor límite válido.", en: "The exact lower bound — valid boundary value." } },
      { value: "40", category: "valid", explanation: { es: "Está claramente dentro del rango permitido.", en: "Clearly within the allowed range." } },
      { value: "65", category: "boundary", explanation: { es: "El límite superior exacto — valor límite válido.", en: "The exact upper bound — valid boundary value." } },
      { value: "66", category: "boundary", explanation: { es: "Justo encima del límite superior — valor límite inválido.", en: "Just above the upper bound — invalid boundary value." } },
      { value: "-5", category: "invalid", explanation: { es: "Negativo y muy lejos del rango — partición inválida, no es un valor límite.", en: "Negative and far outside the range — invalid partition, not a boundary value." } },
      { value: "\"abc\"", category: "invalid", explanation: { es: "No es un entero — partición inválida por tipo de dato.", en: "Not an integer — invalid partition by data type." } },
    ],
  },
  {
    id: "password",
    spec: {
      es: "El campo «Contraseña» exige entre 8 y 20 caracteres.",
      en: "The «Password» field requires between 8 and 20 characters.",
    },
    values: [
      { value: "7 caracteres", category: "boundary", explanation: { es: "Uno menos que el mínimo — límite inválido.", en: "One less than the minimum — invalid boundary." } },
      { value: "8 caracteres", category: "boundary", explanation: { es: "El mínimo exacto — límite válido.", en: "The exact minimum — valid boundary." } },
      { value: "14 caracteres", category: "valid", explanation: { es: "Dentro del rango permitido, sin tocar ningún límite.", en: "Within the allowed range, not touching either bound." } },
      { value: "20 caracteres", category: "boundary", explanation: { es: "El máximo exacto — límite válido.", en: "The exact maximum — valid boundary." } },
      { value: "21 caracteres", category: "boundary", explanation: { es: "Uno más que el máximo — límite inválido.", en: "One more than the maximum — invalid boundary." } },
      { value: "vacío (0 caracteres)", category: "invalid", explanation: { es: "Muy por debajo del rango — partición inválida, no es un valor límite.", en: "Far below the range — invalid partition, not a boundary value." } },
    ],
  },
  {
    id: "quantity",
    spec: {
      es: "El campo «Cantidad» de un carrito acepta enteros entre 1 y 10 unidades por producto.",
      en: "A cart's «Quantity» field accepts integers between 1 and 10 units per product.",
    },
    values: [
      { value: "0", category: "boundary", explanation: { es: "Uno menos que el mínimo — límite inválido.", en: "One less than the minimum — invalid boundary." } },
      { value: "1", category: "boundary", explanation: { es: "El mínimo exacto — límite válido.", en: "The exact minimum — valid boundary." } },
      { value: "5", category: "valid", explanation: { es: "Dentro del rango permitido.", en: "Within the allowed range." } },
      { value: "10", category: "boundary", explanation: { es: "El máximo exacto — límite válido.", en: "The exact maximum — valid boundary." } },
      { value: "11", category: "boundary", explanation: { es: "Uno más que el máximo — límite inválido.", en: "One more than the maximum — invalid boundary." } },
      { value: "500", category: "invalid", explanation: { es: "Muy por encima del rango — partición inválida, no es un valor límite.", en: "Far above the range — invalid partition, not a boundary value." } },
    ],
  },
];

const CATEGORY_LABEL: Record<Category, { es: string; en: string }> = {
  valid: { es: "Válido", en: "Valid" },
  boundary: { es: "Límite", en: "Boundary" },
  invalid: { es: "Inválido", en: "Invalid" },
};

const CATEGORY_COLOR: Record<Category, string> = {
  valid: "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400",
  boundary: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  invalid: "border-red-500/40 bg-red-500/10 text-red-400",
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PartitioningDrillPage({ params: { lng } }: { params: { lng: string } }) {
  const allValues = useMemo(
    () => SCENARIOS.flatMap((s) => s.values.map((v) => ({ ...v, scenarioId: s.id }))),
    []
  );
  const [answers, setAnswers] = useState<Record<string, Category>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalAnswered = Object.keys(answers).length;
  const allAnswered = totalAnswered === allValues.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return allValues.filter((v) => answers[`${v.scenarioId}-${v.value}`] === v.category).length;
  }, [submitted, answers, allValues]);

  function selectCategory(key: string, category: Category) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [key]: category }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Partición de Equivalencia y Valores Límite" : "Equivalence Partitioning & BVA"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Para cada campo, clasifica cada valor de prueba como Válido, Límite (boundary, en el borde del rango o justo fuera de él) o Inválido. Cuando termines, envía tus respuestas."
              : "For each field, classify every test value as Valid, Boundary (right at the edge of the range, or just outside it), or Invalid. When you're done, submit your answers."}
          </p>
        </div>

        <div className="space-y-8">
          {SCENARIOS.map((scenario) => (
            <section key={scenario.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
              <p className="mb-4 text-sm font-medium text-[var(--color-text-primary)]">
                {scenario.spec[lng as "es" | "en"] ?? scenario.spec.en}
              </p>
              <div className="space-y-3">
                {scenario.values.map((v) => {
                  const key = `${scenario.id}-${v.value}`;
                  const selected = answers[key];
                  const isCorrect = submitted && selected === v.category;
                  const isWrong = submitted && selected && selected !== v.category;
                  return (
                    <div key={key} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <code className="text-sm text-[var(--color-text-primary)]">{v.value}</code>
                      <div className="flex flex-wrap gap-1.5">
                        {(["valid", "boundary", "invalid"] as Category[]).map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            disabled={submitted}
                            onClick={() => selectCategory(key, cat)}
                            className={[
                              "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                              selected === cat
                                ? CATEGORY_COLOR[cat]
                                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                            ].join(" ")}
                          >
                            {CATEGORY_LABEL[cat][lng as "es" | "en"] ?? CATEGORY_LABEL[cat].en}
                          </button>
                        ))}
                      </div>
                      {submitted && (
                        <p className={["text-xs sm:max-w-[40%]", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                          {isCorrect ? "✓ " : "✗ "}
                          {v.explanation[lng as "es" | "en"] ?? v.explanation.en}
                          {isWrong && (
                            <> — {lng === "es" ? "correcto:" : "correct:"} {CATEGORY_LABEL[v.category][lng as "es" | "en"] ?? CATEGORY_LABEL[v.category].en}</>
                          )}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-4">
          {!submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
              className="rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {lng === "es" ? "Enviar respuestas" : "Submit answers"}
              {!allAnswered && ` (${totalAnswered}/${allValues.length})`}
            </button>
          ) : (
            <>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {score}/{allValues.length} {lng === "es" ? "correctas" : "correct"}
              </p>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
