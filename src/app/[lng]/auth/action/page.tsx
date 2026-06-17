"use client";

import { Suspense, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import {
  verifyEmailWithCode,
  getCurrentUser,
  reloadCurrentUser,
} from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";

type ActionState = "confirm" | "verifying" | "success" | "alreadyVerified" | "error";

function VerifyEmailAction() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  // Computed once in the initial render (not a useEffect) so there is no
  // render-then-effect timing gap where the link could be re-validated and
  // flip the screen to "error" before the user ever clicks the button.
  const [state, setState] = useState<ActionState>(() =>
    searchParams.get("mode") === "verifyEmail" && oobCode ? "confirm" : "error"
  );
  const verifyAttempted = useRef(false);

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
      .catch(async () => {
        // A code rejected by Firebase is also what happens when it was
        // already consumed by an earlier, successful verification (e.g. an
        // email-client prescan) — check the live account before assuming
        // the link is genuinely broken.
        const user = getCurrentUser();
        if (user) {
          await reloadCurrentUser(user);
          if (user.emailVerified) {
            setState("alreadyVerified");
            return;
          }
        }
        setState("error");
      });
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

  const copy = {
    success: {
      title: "auth.action.successTitle",
      message: "auth.action.successMessage",
      href: `/${lng}/auth/sign-in`,
    },
    alreadyVerified: {
      title: "auth.action.alreadyVerifiedTitle",
      message: "auth.action.alreadyVerifiedMessage",
      href: `/${lng}/auth/sign-in`,
    },
    error: {
      title: "auth.action.errorTitle",
      message: "auth.action.errorMessage",
      href: `/${lng}/auth/verify-email`,
    },
  }[state as "success" | "alreadyVerified" | "error"];

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {t(copy.title)}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {t(copy.message)}
        </p>
        <Link href={copy.href} className="mt-8 block">
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
