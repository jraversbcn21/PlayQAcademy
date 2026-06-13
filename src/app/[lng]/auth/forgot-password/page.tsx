"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { sendPasswordReset } from "@/lib/firebase/auth";
import { getFirebaseErrorKey } from "@/lib/firebase/errors";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Email validation regex                                             */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ForgotPasswordPage() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!EMAIL_RE.test(email.trim())) {
      setError(t("auth.errors.invalidEmail"));
      return;
    }

    setSubmitting(true);
    try {
      await sendPasswordReset(email.trim());
      setSent(true);
    } catch (err: unknown) {
      const firebaseErr = err as { code?: string };
      if (firebaseErr.code === "auth/user-not-found") {
        setError(t("auth.errors.userNotFoundForReset"));
      } else if (firebaseErr.code === "auth/too-many-requests") {
        setError(t("auth.errors.tooManyResetAttempts"));
      } else {
        setError(t(getFirebaseErrorKey(err)));
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {sent ? t("forgotPassword.successTitle") : t("forgotPassword.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {sent
              ? t("forgotPassword.successMessage", { email: email.trim() })
              : t("forgotPassword.subtitle")}
          </p>
          {sent && (
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {t("forgotPassword.checkSpam")}
            </p>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="mb-6">
            <Badge variant="error" size="md" className="w-full justify-center">
              {error}
            </Badge>
          </div>
        )}

        {sent ? (
          /* Success state */
          <div className="text-center">
            <Link href={`/${lng}/auth/sign-in`}>
              <Button variant="primary" size="lg" className="w-full justify-center">
                {t("forgotPassword.backToSignIn")}
              </Button>
            </Link>
          </div>
        ) : (
          /* Email form */
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-sm font-medium text-[var(--color-text-primary)]"
                >
                  {t("forgotPassword.emailLabel")}
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); }}
                  placeholder={t("forgotPassword.emailPlaceholder")}
                  className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center"
                loading={submitting}
                disabled={submitting}
              >
                {submitting ? t("forgotPassword.submitting") : t("forgotPassword.submitButton")}
              </Button>
            </div>
          </form>
        )}

        {/* Back link (only when form is visible) */}
        {!sent && (
          <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
            <Link
              href={`/${lng}/auth/sign-in`}
              className="font-medium text-brand-blue-400 transition-colors hover:text-brand-blue-300"
            >
              {t("forgotPassword.backToSignIn")}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
