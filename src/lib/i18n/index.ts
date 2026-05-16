/**
 * Server-side i18n — for use in Server Components and Route Handlers.
 *
 * Usage in an async server component:
 *
 *   const { t } = await useTranslation(lng, "common");
 *   <h1>{t("hero.titleLine1")}</h1>
 */

import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`../../../public/locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

export async function useTranslation(
  lng: string,
  ns: string = "common",
  options: Record<string, unknown> = {}
) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns[0] as string) : ns
  );
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? (ns[0] as string) : ns,
      (options as { keyPrefix?: string }).keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
