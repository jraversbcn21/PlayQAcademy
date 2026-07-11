"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const DISMISS_KEY = "playground_signup_banner_dismissed";

export default function SignupBanner({ lng }: { lng: string }) {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (loading || user || dismissed) return null;

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-forest-500/30 bg-brand-forest-500/10 p-4">
      <p className="flex-1 text-sm text-[var(--color-text-secondary)]">
        {lng === "es"
          ? "Crea una cuenta gratis para desbloquear lecciones, exámenes, insignias y el ranking."
          : "Create a free account to unlock lessons, exams, badges, and the leaderboard."}
      </p>
      <Link
        href={`/${lng}/auth/sign-up`}
        className="shrink-0 rounded-lg bg-brand-forest-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-forest-500 transition-colors"
      >
        {lng === "es" ? "Crear cuenta" : "Create account"}
      </Link>
      <button
        type="button"
        aria-label={lng === "es" ? "Cerrar" : "Dismiss"}
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
        className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      >
        ✕
      </button>
    </div>
  );
}
