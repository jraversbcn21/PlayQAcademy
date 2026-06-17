"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { verifyEmailWithCode } from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";

type ActionState = "confirm" | "verifying" | "success" | "error";

function VerifyEmailAction() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const searchParams = useSearchParams();
  const [state, setState] = useState<ActionState>("confirm");
  const verifyAttempted = useRef(false);
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (mode !== "verifyEmail" || !oobCode) {
      setState("error");
    }
  }, [mode, oobCode]);

  // Verification is gated behind an explicit click rather than firing on
  // page load: many email clients (Outlook Safe Links, Gmail, corporate
  // scanners) auto-visit links to scan for malware before the user ever
  // clicks, which would silently consume the one-time oobCode and make a
  // genuine click show "invalid/expired" right after a real verification.
  const handleConfirm = () => {
    if (!oobCode || verifyAttempted.current) return;
    verifyAttempted.current = true;
    setState("verifying");

    verifyEmailWithCode(oobCode)
      .then(() => setState("success"))
      .catch(() => setState("error"));
  };

  if (state === "confirm") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {t("auth.action.confirmTitle")}
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            {t("auth.action.confirmMessage")}
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-8 w-full justify-center"
            onClick={handleConfirm}
          >
            {t("auth.action.confirmButton")}
          </Button>
        </div>
      </div>
    );
  }

  if (state === "verifying") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            {t("auth.action.verifying")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {state === "success" ? t("auth.action.successTitle") : t("auth.action.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {state === "success" ? t("auth.action.successMessage") : t("auth.action.errorMessage")}
        </p>
        <Link
          href={state === "success" ? `/${lng}/auth/sign-in` : `/${lng}/auth/verify-email`}
          className="mt-8 block"
        >
          <Button variant="primary" size="lg" className="w-full justify-center">
            {t("auth.action.continueButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailActionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
        </div>
      }
    >
      <VerifyEmailAction />
    </Suspense>
  );
}
