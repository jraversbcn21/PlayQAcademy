"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { verifyEmailWithCode } from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";

type ActionState = "verifying" | "success" | "error";

function VerifyEmailAction() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const searchParams = useSearchParams();
  const [state, setState] = useState<ActionState>("verifying");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode !== "verifyEmail" || !oobCode) {
      setState("error");
      return;
    }

    let cancelled = false;
    verifyEmailWithCode(oobCode)
      .then(() => {
        if (!cancelled) setState("success");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

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
