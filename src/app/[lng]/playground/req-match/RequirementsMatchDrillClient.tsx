"use client";

import { useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface Pair {
  id: string;
  requirement: { es: string; en: string };
  testCase: { es: string; en: string };
}

const PAIRS: Pair[] = [
  {
    id: "login-lockout",
    requirement: { es: "El sistema debe bloquear la cuenta tras 5 intentos fallidos de login.", en: "The system must lock the account after 5 failed login attempts." },
    testCase: { es: "Verificar que la cuenta se bloquea en el 5º intento fallido consecutivo.", en: "Verify the account locks on the 5th consecutive failed attempt." },
  },
  {
    id: "password-policy",
    requirement: { es: "El campo de contraseña debe exigir mínimo 8 caracteres, una mayúscula y un número.", en: "The password field must require at least 8 characters, one uppercase letter, and one digit." },
    testCase: { es: "Verificar que una contraseña de 6 caracteres sin mayúscula es rechazada.", en: "Verify a 6-character password with no uppercase letter is rejected." },
  },
  {
    id: "password-reset",
    requirement: { es: "El usuario debe poder recuperar su contraseña mediante un enlace enviado por email.", en: "The user must be able to recover their password via a link sent by email." },
    testCase: { es: "Verificar que el enlace de recuperación expira a las 24 horas.", en: "Verify the recovery link expires after 24 hours." },
  },
  {
    id: "cart-discount",
    requirement: { es: "El carrito de compras debe recalcular el total al aplicar un código de descuento.", en: "The shopping cart must recalculate the total when a discount code is applied." },
    testCase: { es: "Verificar que el total se actualiza correctamente tras aplicar un código válido.", en: "Verify the total updates correctly after applying a valid code." },
  },
  {
    id: "load-capacity",
    requirement: { es: "El sistema debe soportar al menos 500 usuarios concurrentes sin degradación mayor al 10%.", en: "The system must support at least 500 concurrent users with no more than 10% degradation." },
    testCase: { es: "Ejecutar una prueba de carga con 500 usuarios simultáneos y medir el tiempo de respuesta.", en: "Run a load test with 500 simultaneous users and measure response time." },
  },
  {
    id: "screen-reader",
    requirement: { es: "La aplicación debe ser usable con lector de pantalla (NVDA/VoiceOver) en todos los flujos críticos.", en: "The application must be usable with a screen reader (NVDA/VoiceOver) across all critical flows." },
    testCase: { es: "Verificar con NVDA que el flujo de checkout es completamente navegable por teclado y lector de pantalla.", en: "Verify with NVDA that the checkout flow is fully navigable by keyboard and screen reader." },
  },
];

/** Fixed shuffle (not random) so the right column order never matches the left, deterministically. */
const SHUFFLED_TC_IDS = ["password-reset", "load-capacity", "login-lockout", "screen-reader", "cart-discount", "password-policy"];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RequirementsMatchDrillClient(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [selectedReqId, setSelectedReqId] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongFlash, setWrongFlash] = useState<{ reqId: string; tcId: string } | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);

  const allMatched = matched.size === PAIRS.length;

  function selectReq(reqId: string) {
    if (matched.has(reqId) || wrongFlash) return;
    setSelectedReqId((prev) => (prev === reqId ? null : reqId));
  }

  function selectTc(tcId: string) {
    if (!selectedReqId || wrongFlash) return;
    if (selectedReqId === tcId) {
      setMatched((prev) => new Set(prev).add(selectedReqId));
      setSelectedReqId(null);
    } else {
      setWrongFlash({ reqId: selectedReqId, tcId });
      setWrongAttempts((n) => n + 1);
      setTimeout(() => {
        setWrongFlash(null);
        setSelectedReqId(null);
      }, 700);
    }
  }

  function reset() {
    setSelectedReqId(null);
    setMatched(new Set());
    setWrongFlash(null);
    setWrongAttempts(0);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Requisitos ↔ Casos de Prueba" : "Requirements ↔ Test Cases"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Haz clic en un requisito y luego en el caso de prueba que realmente lo verifica. Si no coinciden, podrás reintentar."
              : "Click a requirement, then click the test case that actually verifies it. If they don't match, you can try again."}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Requirements column */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              {lng === "es" ? "Requisitos" : "Requirements"}
            </p>
            {PAIRS.map((pair) => {
              const isMatched = matched.has(pair.id);
              const isSelected = selectedReqId === pair.id;
              const isWrong = wrongFlash?.reqId === pair.id;
              return (
                <button
                  key={pair.id}
                  type="button"
                  disabled={isMatched}
                  onClick={() => selectReq(pair.id)}
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
                  {pair.requirement[lng as "es" | "en"] ?? pair.requirement.en}
                </button>
              );
            })}
          </div>

          {/* Test cases column */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              {lng === "es" ? "Casos de prueba" : "Test cases"}
            </p>
            {SHUFFLED_TC_IDS.map((tcId) => {
              const pair = PAIRS.find((p) => p.id === tcId)!;
              const isMatched = matched.has(tcId);
              const isWrong = wrongFlash?.tcId === tcId;
              return (
                <button
                  key={tcId}
                  type="button"
                  disabled={isMatched || !selectedReqId}
                  onClick={() => selectTc(tcId)}
                  className={[
                    "block w-full rounded-lg border p-3 text-left text-sm transition-colors disabled:cursor-not-allowed",
                    isMatched
                      ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                      : isWrong
                        ? "border-red-500/60 bg-red-500/10 text-red-400"
                        : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:border-brand-forest-500/30 disabled:opacity-50",
                  ].join(" ")}
                >
                  {pair.testCase[lng as "es" | "en"] ?? pair.testCase.en}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          {allMatched ? (
            <>
              <p className="text-lg font-bold text-[var(--color-text-primary)]">
                {lng === "es" ? "¡Completado!" : "Done!"} {wrongAttempts === 0
                  ? (lng === "es" ? "Sin errores." : "No mistakes.")
                  : `${wrongAttempts} ${lng === "es" ? "intento(s) incorrecto(s)." : "wrong attempt(s)."}`}
              </p>
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
              </button>
            </>
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">
              {matched.size}/{PAIRS.length} {lng === "es" ? "emparejados" : "matched"}
              {wrongAttempts > 0 && ` · ${wrongAttempts} ${lng === "es" ? "incorrecto(s)" : "wrong"}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
