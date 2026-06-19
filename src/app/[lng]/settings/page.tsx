"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import { sendPasswordReset } from "@/lib/firebase/auth";
import { getFirebaseErrorKey } from "@/lib/firebase/errors";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

interface SettingsPageProps {
  params: { lng: string };
}

export default function SettingsPage({ params: { lng } }: SettingsPageProps) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { user, loading: authLoading, updateDisplayName } = useAuth();

  const [displayName, setDisplayName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [nameSaved, setNameSaved] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);

  const [sendingReset, setSendingReset] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) router.push(`/${lng}/auth/sign-in`);
  }, [authLoading, user, lng, router]);

  useEffect(() => {
    if (user) setDisplayName(user.displayName ?? "");
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
      </div>
    );
  }

  async function handleSaveName(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNameError(null);
    setNameSaved(false);

    const trimmed = displayName.trim();
    if (!trimmed) return;

    setSavingName(true);
    try {
      await updateDisplayName(trimmed);
      setNameSaved(true);
    } catch (err) {
      setNameError(t(getFirebaseErrorKey(err)));
    } finally {
      setSavingName(false);
    }
  }

  async function handleChangePassword() {
    const email = user?.email;
    if (!email) return;
    setResetError(null);
    setSendingReset(true);
    try {
      await sendPasswordReset(email);
      setResetSent(true);
    } catch (err) {
      setResetError(t(getFirebaseErrorKey(err)));
    } finally {
      setSendingReset(false);
    }
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-2xl">
        <Link
          href={`/${lng}/dashboard`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          {t("settings.backToDashboard")}
        </Link>

        <h1 className="mb-1 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {t("settings.title")}
        </h1>
        <p className="mb-8 text-sm text-[var(--color-text-muted)]">
          {t("settings.subtitle")}
        </p>

        {/* Profile section */}
        <Card title={t("settings.profileSection.title")} className="mb-6">
          <form onSubmit={handleSaveName} className="space-y-4">
            <div>
              <label
                htmlFor="settings-display-name"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("settings.profileSection.displayNameLabel")}
              </label>
              <input
                id="settings-display-name"
                type="text"
                value={displayName}
                onChange={(e) => {
                  setDisplayName(e.target.value);
                  setNameSaved(false);
                }}
                placeholder={t("settings.profileSection.displayNamePlaceholder")}
                className="mt-1.5 block w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-brand-forest-500 focus:outline-none focus:ring-1 focus:ring-brand-forest-500"
              />
            </div>

            <div>
              <label
                htmlFor="settings-email"
                className="block text-sm font-medium text-[var(--color-text-primary)]"
              >
                {t("settings.profileSection.emailLabel")}
              </label>
              <input
                id="settings-email"
                type="email"
                value={user.email ?? ""}
                disabled
                className="mt-1.5 block w-full cursor-not-allowed rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-2.5 text-sm text-[var(--color-text-muted)]"
              />
              <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
                {t("settings.profileSection.emailHint")}
              </p>
            </div>

            {nameError && (
              <Badge variant="error" size="md" className="w-full justify-center">
                {nameError}
              </Badge>
            )}
            {nameSaved && !nameError && (
              <Badge variant="success" size="md" className="w-full justify-center">
                {t("settings.profileSection.saved")}
              </Badge>
            )}

            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={savingName}
              disabled={savingName || !displayName.trim()}
            >
              {savingName ? t("settings.profileSection.saving") : t("settings.profileSection.saveButton")}
            </Button>
          </form>
        </Card>

        {/* Security section */}
        <Card title={t("settings.securitySection.title")}>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[var(--color-text-primary)]">
                {t("settings.securitySection.passwordLabel")}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {t("settings.securitySection.passwordHint")}
              </p>
            </div>

            {resetError && (
              <Badge variant="error" size="md" className="w-full justify-center">
                {resetError}
              </Badge>
            )}
            {resetSent && !resetError && (
              <Badge variant="success" size="md" className="w-full justify-center">
                {t("settings.securitySection.sent", { email: user.email })}
              </Badge>
            )}

            <Button
              type="button"
              variant="secondary"
              size="md"
              loading={sendingReset}
              disabled={sendingReset}
              onClick={handleChangePassword}
            >
              {sendingReset
                ? t("settings.securitySection.sending")
                : t("settings.securitySection.changePasswordButton")}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
