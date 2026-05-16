"use client";

import { useState, useEffect, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface SignInPageProps {
  params: { lng: string };
}

export default function SignInPage({ params: { lng } }: SignInPageProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user, loading, initialized, error, signIn, signInWithGoogle, clearError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (initialized && user) {
      router.replace(`/${lng}/dashboard`);
    }
  }, [initialized, user, lng, router]);

  const displayedError = formError ?? error;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearError();
    setFormError(null);

    if (!email.trim() || !password) {
      setFormError(t("auth.errors.fillAllFields"));
      return;
    }

    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace(`/${lng}/dashboard`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace(`/${lng}/dashboard`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }

  // Show a brief loading shell while auth state is initialising
  if (!initialized || (loading && !submitting)) {
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
            {t("auth.signIn.title")}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {t("auth.signIn.subtitle")}
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
          onClick={handleGoogleSignIn}
        >
          {t("auth.signIn.googleButton")}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--color-border)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-[var(--color-bg-primary)] px-3 text-xs text-[var(--color-text-muted)]">
              {t("auth.signIn.divider")}
            </span>
          </div>
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="signin-email"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("auth.signIn.email")}
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.signIn.emailPlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="signin-password"
                  className="block text-sm font-medium text-[var(--color-text-primary)]"
                >
                  {t("auth.signIn.password")}
                </label>
                <Link
                  href={`/${lng}/auth/forgot-password`}
                  className="text-xs text-brand-blue-400 hover:text-brand-blue-300"
                >
                  {t("auth.signIn.forgotPassword")}
                </Link>
              </div>
              <input
                id="signin-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("auth.signIn.passwordPlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-blue-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-500"
              />
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
              {t("auth.signIn.submit")}
            </Button>
          </div>
        </form>

        {/* Footer link */}
        <p className="mt-6 text-center text-sm text-[var(--color-text-muted)]">
          {t("auth.signIn.noAccount")}{" "}
          <Link
            href={`/${lng}/auth/sign-up`}
            className="font-medium text-brand-blue-400 hover:text-brand-blue-300"
          >
            {t("auth.signIn.signUpLink")}
          </Link>
        </p>
      </div>
    </div>
  );
}
