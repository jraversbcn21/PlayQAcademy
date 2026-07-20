"use client";

import { useMemo, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Severity = "critical" | "major" | "minor" | "trivial";
type Priority = "high" | "medium" | "low";

interface Defect {
  id: string;
  title: { es: string; en: string };
  context: { es: string; en: string };
  severity: Severity;
  priority: Priority;
  reason: { es: string; en: string };
}

const DEFECTS: Defect[] = [
  {
    id: "payment-gateway",
    title: { es: "La pasarela de pago rechaza el 100% de las transacciones en producción.", en: "The payment gateway rejects 100% of transactions in production." },
    context: { es: "Entorno: producción. Impacto: ningún cliente puede completar una compra.", en: "Environment: production. Impact: no customer can complete a purchase." },
    severity: "critical",
    priority: "high",
    reason: { es: "Bloquea por completo la función principal del negocio (cobrar) — crítica y urgente.", en: "Completely blocks the core business function (charging customers) — critical and urgent." },
  },
  {
    id: "cancel-button-color",
    title: { es: "El botón «Cancelar» del modal de confirmación tiene un color ligeramente distinto al especificado en el diseño.", en: "The «Cancel» button in the confirmation modal has a slightly different color than the design spec." },
    context: { es: "Entorno: producción. Impacto: ninguno funcional, solo visual.", en: "Environment: production. Impact: none functional, purely visual." },
    severity: "trivial",
    priority: "low",
    reason: { es: "Puramente cosmético, no afecta el uso de la app.", en: "Purely cosmetic, doesn't affect app usage." },
  },
  {
    id: "pdf-export",
    title: { es: "La exportación a PDF falla solo cuando el reporte tiene más de 500 filas, y afecta al 5% de los clientes empresariales.", en: "PDF export fails only when the report has more than 500 rows, affecting 5% of enterprise customers." },
    context: { es: "Entorno: producción. Impacto: subconjunto de clientes, existe un workaround (exportar a CSV).", en: "Environment: production. Impact: a subset of customers, a workaround exists (export to CSV)." },
    severity: "major",
    priority: "medium",
    reason: { es: "Funcionalidad rota para un caso real, pero limitada en alcance y con workaround disponible.", en: "Broken functionality for a real case, but limited in scope and a workaround exists." },
  },
  {
    id: "android-camera-crash",
    title: { es: "La app crashea al abrir la cámara en dispositivos Android 9, usado por el 15% de la base de usuarios móviles.", en: "The app crashes when opening the camera on Android 9 devices, used by 15% of the mobile user base." },
    context: { es: "Entorno: producción, móvil. Impacto: 15% de usuarios no pueden usar una función central.", en: "Environment: production, mobile. Impact: 15% of users can't use a core feature." },
    severity: "critical",
    priority: "high",
    reason: { es: "Crash que bloquea una función central para una porción significativa de usuarios.", en: "Crash that blocks a core feature for a significant share of users." },
  },
  {
    id: "tooltip-typo",
    title: { es: "El texto de ayuda contextual (tooltip) tiene una errata: «Continuar» está escrito como «Continure».", en: "The contextual help tooltip has a typo: «Continue» is written as «Continoo»." },
    context: { es: "Entorno: producción. Impacto: ninguno funcional.", en: "Environment: production. Impact: none functional." },
    severity: "trivial",
    priority: "low",
    reason: { es: "Errata visual sin impacto funcional.", en: "Visual typo with no functional impact." },
  },
  {
    id: "google-login-intermittent",
    title: { es: "El login con Google falla intermitentemente (~10% de los intentos) solo en Safari.", en: "Google login intermittently fails (~10% of attempts) only on Safari." },
    context: { es: "Entorno: producción, navegador Safari. Impacto: subconjunto de usuarios, comportamiento intermitente.", en: "Environment: production, Safari browser. Impact: a subset of users, intermittent behavior." },
    severity: "major",
    priority: "medium",
    reason: { es: "Falla real de un flujo importante, pero limitada a un navegador y no reproducible al 100%.", en: "Real failure of an important flow, but limited to one browser and not 100% reproducible." },
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TriageDrillClient(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [severities, setSeverities] = useState<Record<string, Severity>>({});
  const [priorities, setPriorities] = useState<Record<string, Priority>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = DEFECTS.every((d) => severities[d.id] && priorities[d.id]);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return DEFECTS.filter((d) => severities[d.id] === d.severity && priorities[d.id] === d.priority).length;
  }, [submitted, severities, priorities]);

  function reset() {
    setSeverities({});
    setPriorities({});
    setSubmitted(false);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Triage de Defectos" : "Defect Triage"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Asigna severidad (impacto técnico) y prioridad (urgencia de negocio) a cada defecto. Recuerda: severidad y prioridad no siempre coinciden."
              : "Assign severity (technical impact) and priority (business urgency) to each defect. Remember: severity and priority don't always match."}
          </p>
        </div>

        <div className="space-y-5">
          {DEFECTS.map((d) => {
            const sevCorrect = submitted && severities[d.id] === d.severity;
            const prioCorrect = submitted && priorities[d.id] === d.priority;
            return (
              <section key={d.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">{d.title[lng as "es" | "en"] ?? d.title.en}</p>
                <p className="mt-1 text-xs text-[var(--color-text-muted)]">{d.context[lng as "es" | "en"] ?? d.context.en}</p>

                <div className="mt-3 flex flex-wrap gap-6">
                  <div>
                    <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">{lng === "es" ? "Severidad" : "Severity"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {SEVERITY_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          disabled={submitted}
                          onClick={() => setSeverities((prev) => ({ ...prev, [d.id]: s }))}
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                            severities[d.id] === s
                              ? (submitted
                                  ? (s === d.severity ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
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
                    <p className="mb-1.5 text-xs font-medium text-[var(--color-text-secondary)]">{lng === "es" ? "Prioridad" : "Priority"}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {PRIORITY_OPTIONS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          disabled={submitted}
                          onClick={() => setPriorities((prev) => ({ ...prev, [d.id]: p }))}
                          className={[
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                            priorities[d.id] === p
                              ? (submitted
                                  ? (p === d.priority ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
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

                {submitted && (
                  <p className={["mt-3 text-xs", sevCorrect && prioCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                    {sevCorrect && prioCorrect ? "✓ " : "✗ "}
                    {d.reason[lng as "es" | "en"] ?? d.reason.en}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex items-center gap-4">
          {!submitted ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
              className="rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {lng === "es" ? "Enviar triage" : "Submit triage"}
            </button>
          ) : (
            <>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {score}/{DEFECTS.length} {lng === "es" ? "correctos" : "correct"}
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
