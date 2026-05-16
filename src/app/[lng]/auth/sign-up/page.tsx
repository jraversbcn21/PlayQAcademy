"use client";

import { useState, useEffect, useMemo, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProgressBar from "@/components/ui/ProgressBar";

/* ------------------------------------------------------------------ */
/*  Google "G" icon                                                    */
/* ------------------------------------------------------------------ */

function GoogleIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Password strength calculator                                       */
/* ------------------------------------------------------------------ */

interface StrengthResult {
  score: number; // 0-100
  color: string;
}

function calculateStrength(password: string): StrengthResult {
  let score = 0;

  if (password.length >= 8) score += 30;
  if (password.length >= 12) score += 10;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 10;

  const clamped = Math.min(100, score);

  if (clamped <= 30) return { score: clamped, color: "bg-red-500" };
  if (clamped <= 60) return { score: clamped, color: "bg-amber-500" };
  return { score: clamped, color: "bg-brand-green-500" };
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return "auth.errors.weakPassword";
  if (!/[A-Z]/.test(password)) return "auth.errors.weakPassword";
  if (!/[0-9]/.test(password)) return "auth.errors.weakPassword";
  return null;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface SignUpPageProps {
  params: { lng: string };
}

export default function SignUpPage({ params: { lng } }: SignUpPageProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user, loading, error, signUp, signInWithGoogle, clearError } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (user) {
      router.push(`/${lng}/dashboard?welcome=1`);
    }
  }, [user, lng, router]);

  const displayedError = formError ?? error;

  const passwordStrength = useMemo(() => calculateStrength(password), [password]);
  const passwordError = useMemo(() => validatePassword(password), [password]);
  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();
    setFormError(null);

    if (!displayName.trim()) {
      setFormError(t("auth.errors.nameRequired"));
      return;
    }

    const pwErr = validatePassword(password);
    if (pwErr) {
      setFormError(t(pwErr));
      return;
    }

    if (password !== confirmPassword) {
      setFormError(t("auth.errors.passwordMismatch"));
      return;
    }

    if (!acceptedTerms) {
      setFormError(t("auth.errors.termsRequired"));
      return;
    }

    setSubmitting(true);
    try {
      await signUp(email.trim(), password, displayName.trim());
      router.push(`/${lng}/dashboard?welcome=1`);
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignUp() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.push(`/${lng}/dashboard?welcome=1`);
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }

  // Loading shell
  if (loading && !submitting) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("auth.signUp.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {t("auth.signUp.subtitle")}
          </p>
        </div>

        {/* Error banner */}
        {displayedError && (
          <div className="mb-6">
            <Badge variant="error" size="md" className="w-full justify-center">
              {displayedError}
            </Badge>
          </div>
        )}

        {/* Google button */}
        <Button
          variant="secondary"
          size="lg"
          className="w-full justify-center"
          leftIcon={<GoogleIcon />}
          loading={submitting}
          onClick={handleGoogleSignUp}
        >
          {t("auth.signUp.googleButton")}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[var(--color-bg-primary)] px-3 text-xs text-[var(--color-text-muted)]">
              {t("auth.signUp.divider")}
            </span>
          </div>
        </div>

        {/* Registration form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Display name */}
            <div>
              <label
                htmlFor="signup-name"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("auth.signUp.displayName")}
              </label>
              <input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={t("auth.signUp.displayNamePlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("auth.signUp.email")}
              </label>
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.signUp.emailPlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("auth.signUp.password")}
              </label>
              <input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.signUp.passwordPlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />

              {/* Password strength bar */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {t("auth.signUp.passwordStrength")}
                    </span>
                  </div>
                  <ProgressBar
                    value={passwordStrength.score}
                    size="sm"
                    barColor={passwordStrength.color}
                  />
                  {passwordError && (
                    <p className="mt-1 text-xs text-red-400">{t(passwordError)}</p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("auth.signUp.confirmPassword")}
              </label>
              <input
                id="signup-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("auth.signUp.confirmPasswordPlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />
              {!passwordsMatch && (
                <p className="mt-1 text-xs text-red-400">
                  {t("auth.errors.passwordMismatch")}
                </p>
              )}
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2.5">
              <input
                id="signup-terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-brand-blue-600 focus:ring-brand-blue-500"
              />
              <label
                htmlFor="signup-terms"
                className="text-sm text-[var(--color-text-muted)]"
              >
                {t("auth.signUp.termsAccept")}
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              loading={submitting}
              disabled={submitting}
            >
              {t("auth.signUp.submit")}
            </Button>
          </div>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {t("auth.signUp.haveAccount")}{" "}
          <Link
            href={`/${lng}/auth/sign-in`}
            className="font-medium text-brand-blue-400 hover:text-brand-blue-300"
          >
            {t("auth.signUp.signInLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
