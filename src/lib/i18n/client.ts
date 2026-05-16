"use client";

/**
 * Client-side i18n — for use in Client Components.
 *
 * Initialises i18next with the react-i18next integration ONCE at
 * module load time (browser-only). The `'use client'` directive
 * ensures React.createContext() executes in the browser, not SSR.
 *
 * Usage (identical to the old next-i18next pattern):
 *
 *   import { useTranslation } from "@/lib/i18n/client";
 *   const { t } = useTranslation("common");  // lng auto-detected from URL
 */

import { useEffect, useState } from "react";
import i18next from "i18next";
import {
  initReactI18next,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { useParams } from "next/navigation";
import { getOptions, languages, cookieName } from "./settings";
import type { SupportedLocale, defaultNS } from "./settings";

const runsOnServerSide = typeof window === "undefined";

/*
 * Initialise i18next ONCE at module level.
 * On the server (SSR pass), we skip preloading to avoid Node I/O.
 * The browser will load resources lazily via resourcesToBackend.
 */
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`../../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined, // will be set by useEffect below
    preload: runsOnServerSide ? (languages as readonly string[]) : [],
  });

/**
 * Returns the current locale from the [lng] route segment.
 */
function useLng(): string {
  const params = useParams();
  const lng = params.lng as string | undefined;
  return lng ?? getOptions().lng;
}

/**
 * Reads the locale cookie (set by middleware) as a fallback.
 */
function getCookieLocale(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${cookieName}=([^;]*)`)
  );
  return match?.[1];
}

/**
 * Replacement for the old `useTranslation("common")` pattern.
 *
 * @param ns    Translation namespace (defaults to "common")
 * @param options  react-i18next options
 */
export function useTranslation(
  ns?: string,
  options: Record<string, unknown> = {}
) {
  const lng = useLng();
  const ret = useTranslationOrg(ns ?? "common", options);
  const { i18n } = ret;

  /*
   * Keep i18next in sync with the URL segment AND the cookie.
   * The middleware sets `i18next` cookie on every request, which
   * is used as fallback when the URL segment changes.
   */
  const [activeLng, setActiveLng] = useState(lng);

  useEffect(() => {
    const cookieLng = getCookieLocale();
    const target = lng || cookieLng || getOptions().lng;
    if (target && i18n.resolvedLanguage !== target) {
      i18n.changeLanguage(target);
      setActiveLng(target);
    }
  }, [lng, i18n]);

  return ret;
}
