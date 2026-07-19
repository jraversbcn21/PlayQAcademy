"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { lng } = useParams() as { lng: string };
  const {
    user,
    initialized,
    emailVerified,
    refreshVerification,
    resendVerification,
    signOut,
    navigateAfterAuth,
  } = useAuth();

  const [checking, setChecking] = useState(false);
  const [notYetVerified, setNotYetVerified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  // No session at all → nothing to verify, go sign in.
  useEffect(() => {
    if (initialized && !user) {
      router.replace(`/${lng}/auth/sign-in`);
    }
  }, [initialized, user, lng, router]);

  // Already verified (e.g. came back after clicking the link) → continue in.
  // navigateAfterAuth (not a plain replace): while unverified, the navbar's
  // Dashboard link prefetches /dashboard WITHOUT the auth cookie, caching the
  // middleware's redirect — same staleness as the sign-in flow.
  useEffect(() => {
    if (initialized && user && emailVerified) {
      navigateAfterAuth(`/${lng}/dashboard`);
    }
  }, [initialized, user, emailVerified, lng, navigateAfterAuth]);

  const checkVerification = useCallback(async () => {
    setChecking(true);
    setNotYetVerified(false);
    try {
      const verified = await refreshVerification();
      if (verified) {
        navigateAfterAuth(`/${lng}/dashboard`);
      } else {
        setNotYetVerified(true);
      }
    } finally {
      setChecking(false);
    }
  }, [refreshVerification, lng, navigateAfterAuth]);

  // Auto-check whenever the tab regains focus (user may have clicked the link elsewhere).
  useEffect(() => {
    function handleFocus() {
      if (document.visibilityState === "visible") {
        void checkVerification();
      }
    }
    document.addEventListener("visibilitychange", handleFocus);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleFocus);
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkVerification]);

  // Resend cooldown countdown (ticks every second while > 0).
  useEffect(() => {
    const interval = setInterval(() => {
      setResendCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleResend() {
    setResending(true);
    setResendMessage(null);
    try {
      await resendVerification(lng);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setResendMessage(t("auth.verifyEmail.resendSuccess"));
    } catch {
      // Resend failures are rare (e.g. rate-limited); the cooldown still protects spam-clicking.
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } finally {
      setResending(false);
    }
  }

  async function handleSignOut() {
    // signOut dispatches the redirect after the cache purge, so it wins over
    // this page's own no-session guard (which replaces to sign-in).
    await signOut(`/${lng}/auth/sign-up`);
  }

  if (!initialized || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {t("auth.verifyEmail.title")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {t("auth.verifyEmail.subtitle", { email: user.email ?? "" })}
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {t("auth.verifyEmail.checkSpam")}
        </p>

        {notYetVerified && (
          <p className="mt-4 text-sm text-amber-500">{t("auth.verifyEmail.notYetVerified")}</p>
        )}

        {resendMessage && (
          <p className="mt-4 text-sm text-brand-forest-400">{resendMessage}</p>
        )}

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            loading={checking}
            disabled={checking}
            onClick={checkVerification}
          >
            {t("auth.verifyEmail.continueButton")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full justify-center"
            loading={resending}
            disabled={resending || resendCooldown > 0}
            onClick={handleResend}
          >
            {resendCooldown > 0
              ? t("auth.verifyEmail.resendCooldown", { seconds: resendCooldown })
              : t("auth.verifyEmail.resendButton")}
          </Button>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 text-sm font-medium text-brand-forest-400 hover:text-brand-forest-300"
        >
          {t("auth.verifyEmail.signOutLink")}
        </button>
      </div>
    </div>
  );
}
