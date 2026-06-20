"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Severity = "critical" | "major" | "minor" | "trivial";
type Priority = "high" | "medium" | "low";

interface Scenario {
  id: string;
  narrative: { es: string; en: string };
  severity: Severity;
  priority: Priority;
  severityReason: { es: string; en: string };
  modelReport: {
    es: { steps: string; expected: string; actual: string };
    en: { steps: string; expected: string; actual: string };
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "signup-validation",
    narrative: {
      es: "Al introducir un email sin «@» en el formulario de registro, el botón «Crear cuenta» permite continuar y la app muestra un error 500 del servidor en lugar de validar el campo en el cliente.",
      en: "When entering an email without «@» on the sign-up form, the «Create account» button still proceeds and the app shows a server 500 error instead of validating the field on the client.",
    },
    severity: "major",
    priority: "high",
    severityReason: {
      es: "Falta validación de cliente y el servidor expone un error 500 sin manejar — es un defecto funcional importante, pero la app no queda inoperable para otros flujos.",
      en: "Client-side validation is missing and the server exposes an unhandled 500 error — a significant functional defect, but it doesn't make the rest of the app unusable.",
    },
    modelReport: {
      es: {
        steps: "1) Ir al formulario de registro. 2) Escribir un email sin «@» (ej. «usuariotest.com»). 3) Completar el resto de campos válidamente. 4) Clic en «Crear cuenta».",
        expected: "El formulario debe mostrar un mensaje de validación en el campo email («Email inválido») y no enviar la petición al servidor.",
        actual: "El formulario envía la petición; el servidor responde con un error 500 y la pantalla muestra una página de error genérica.",
      },
      en: {
        steps: "1) Go to the sign-up form. 2) Type an email without «@» (e.g. «usertest.com»). 3) Fill the remaining fields validly. 4) Click «Create account».",
        expected: "The form should show an inline validation message on the email field («Invalid email») and never submit the request.",
        actual: "The form submits the request; the server responds with a 500 error and the screen shows a generic error page.",
      },
    },
  },
  {
    id: "footer-logo",
    narrative: {
      es: "El logo de la empresa en el pie de página aparece con una resolución borrosa en pantallas de alta densidad (Retina/4K), pero el resto del sitio se ve correctamente.",
      en: "The company logo in the footer appears blurry on high-density (Retina/4K) screens, but the rest of the site renders fine.",
    },
    severity: "trivial",
    priority: "low",
    severityReason: {
      es: "Es puramente cosmético: no bloquea ninguna funcionalidad ni afecta a un flujo crítico.",
      en: "It's purely cosmetic: it doesn't block any functionality or affect a critical flow.",
    },
    modelReport: {
      es: {
        steps: "1) Abrir el sitio en un monitor o laptop con pantalla Retina/4K. 2) Hacer scroll hasta el pie de página. 3) Observar el logo de la empresa.",
        expected: "El logo debe verse nítido, usando una imagen de mayor resolución o un SVG escalable.",
        actual: "El logo se ve pixelado/borroso porque se sirve un PNG de baja resolución escalado por CSS.",
      },
      en: {
        steps: "1) Open the site on a monitor or laptop with a Retina/4K screen. 2) Scroll to the footer. 3) Look at the company logo.",
        expected: "The logo should render crisply, using a higher-resolution image or a scalable SVG.",
        actual: "The logo looks pixelated/blurry because a low-resolution PNG is being scaled via CSS.",
      },
    },
  },
];

const SEVERITY_OPTIONS: Severity[] = ["critical", "major", "minor", "trivial"];
const PRIORITY_OPTIONS: Priority[] = ["high", "medium", "low"];

const SEVERITY_LABEL: Record<Severity, { es: string; en: string }> = {
  critical: { es: "Crítica", en: "Critical" },
  major: { es: "Mayor", en: "Major" },
  minor: { es: "Menor", en: "Minor" },
  trivial: { es: "Trivial", en: "Trivial" },
};

const PRIORITY_LABEL: Record<Priority, { es: string; en: string }> = {
  high: { es: "Alta", en: "High" },
  medium: { es: "Media", en: "Medium" },
  low: { es: "Baja", en: "Low" },
};

/* ------------------------------------------------------------------ */
/*  Single scenario form                                               */
/* ------------------------------------------------------------------ */

function ScenarioForm({ scenario, lng }: { scenario: Scenario; lng: string }) {
  const [steps, setSteps] = useState("");
  const [expected, setExpected] = useState("");
  const [actual, setActual] = useState("");
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const model = scenario.modelReport[lng as "es" | "en"] ?? scenario.modelReport.en;
  const canSubmit = steps.trim().length > 0 && expected.trim().length > 0 && actual.trim().length > 0 && severity && priority;

  return (
    <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
      <p className="mb-4 text-sm font-medium text-[var(--color-text-primary)]">
        {scenario.narrative[lng as "es" | "en"] ?? scenario.narrative.en}
      </p>

      <div className="space-y-3">
        <div>
          <label htmlFor={`${scenario.id}-steps`} className="block text-xs font-medium text-[var(--color-text-secondary)]">
            {lng === "es" ? "Pasos para reproducir" : "Steps to reproduce"}
          </label>
          <textarea
            id={`${scenario.id}-steps`}
            value={steps}
            disabled={submitted}
            onChange={(e) => setSteps(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2.5 text-sm text-[var(--color-text-primary)] focus:border-brand-forest-500 focus:outline-none disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor={`${scenario.id}-expected`} className="block text-xs font-medium text-[var(--color-text-secondary)]">
            {lng === "es" ? "Resultado esperado" : "Expected result"}
          </label>
          <textarea
            id={`${scenario.id}-expected`}
            value={expected}
            disabled={submitted}
            onChange={(e) => setExpected(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2.5 text-sm text-[var(--color-text-primary)] focus:border-brand-forest-500 focus:outline-none disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor={`${scenario.id}-actual`} className="block text-xs font-medium text-[var(--color-text-secondary)]">
            {lng === "es" ? "Resultado actual" : "Actual result"}
          </label>
          <textarea
            id={`${scenario.id}-actual`}
            value={actual}
            disabled={submitted}
            onChange={(e) => setActual(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-2.5 text-sm text-[var(--color-text-primary)] focus:border-brand-forest-500 focus:outline-none disabled:opacity-60"
          />
        </div>

        <div className="flex flex-wrap gap-6 pt-1">
          <div>
            <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
              {lng === "es" ? "Severidad" : "Severity"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SEVERITY_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={submitted}
                  onClick={() => setSeverity(s)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                    severity === s
                      ? (submitted
                          ? (s === scenario.severity ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
                          : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400")
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {SEVERITY_LABEL[s][lng as "es" | "en"] ?? SEVERITY_LABEL[s].en}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">
              {lng === "es" ? "Prioridad" : "Priority"}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_OPTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={submitted}
                  onClick={() => setPriority(p)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                    priority === p
                      ? (submitted
                          ? (p === scenario.priority ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
                          : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400")
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  ].join(" ")}
                >
                  {PRIORITY_LABEL[p][lng as "es" | "en"] ?? PRIORITY_LABEL[p].en}
                </button>
              ))}
            </div>
          </div>
        </div>

        {!submitted ? (
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => setSubmitted(true)}
            className="mt-2 rounded-lg bg-brand-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {lng === "es" ? "Enviar reporte" : "Submit report"}
          </button>
        ) : (
          <div className="mt-3 space-y-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              {lng === "es" ? "Severidad/prioridad esperadas y reporte modelo (autoevalúa tu redacción)" : "Expected severity/priority + model report (self-assess your wording)"}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">{lng === "es" ? "Severidad correcta:" : "Correct severity:"}</strong>{" "}
              {SEVERITY_LABEL[scenario.severity][lng as "es" | "en"] ?? SEVERITY_LABEL[scenario.severity].en} —{" "}
              {scenario.severityReason[lng as "es" | "en"] ?? scenario.severityReason.en}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">{lng === "es" ? "Prioridad correcta:" : "Correct priority:"}</strong>{" "}
              {PRIORITY_LABEL[scenario.priority][lng as "es" | "en"] ?? PRIORITY_LABEL[scenario.priority].en}
            </p>
            <div className="space-y-1 border-t border-[var(--color-border)] pt-3 text-sm text-[var(--color-text-secondary)]">
              <p><strong className="text-[var(--color-text-primary)]">{lng === "es" ? "Pasos modelo:" : "Model steps:"}</strong> {model.steps}</p>
              <p><strong className="text-[var(--color-text-primary)]">{lng === "es" ? "Esperado:" : "Expected:"}</strong> {model.expected}</p>
              <p><strong className="text-[var(--color-text-primary)]">{lng === "es" ? "Actual:" : "Actual:"}</strong> {model.actual}</p>
            </div>
            <button
              type="button"
              onClick={() => { setSubmitted(false); }}
              className="text-xs font-medium text-brand-forest-400 hover:underline"
            >
              {lng === "es" ? "↺ Editar mi reporte" : "↺ Edit my report"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BugReportDrillPage({ params: { lng } }: { params: { lng: string } }) {
  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Redacción de Reporte de Bug" : "Writing a Bug Report"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Lee cada escenario y redacta los pasos, el resultado esperado y el resultado actual como lo harías en un reporte real. Elige también la severidad y prioridad. Al enviar, verás un reporte modelo para autoevaluarte."
              : "Read each scenario and write the steps, expected result, and actual result as you would in a real report. Also pick severity and priority. On submit, you'll see a model report to self-assess against."}
          </p>
        </div>
        <div className="space-y-8">
          {SCENARIOS.map((scenario) => (
            <ScenarioForm key={scenario.id} scenario={scenario} lng={lng} />
          ))}
        </div>
      </div>
    </div>
  );
}
