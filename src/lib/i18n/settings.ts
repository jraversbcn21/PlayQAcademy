/**
 * Shared i18n settings used by both server and client i18n instances.
 *
 * languages      — supported locales (order matters for fallback)
 * fallbackLng    — default when detection produces no match
 * defaultNS      — namespace used when none specified
 * cookieName     — cookie that persists the user's language choice
 */

export const languages = ["es", "en"] as const;
export type SupportedLocale = (typeof languages)[number];
export const fallbackLng: SupportedLocale = "es";
export const defaultNS = "common";
export const cookieName = "i18next";

export function getOptions(
  lng: string = fallbackLng,
  ns: string = defaultNS
) {
  return {
    debug: process.env.NODE_ENV === "development",
    supportedLngs: languages as readonly string[],
    fallbackLng,
    lng,
    ns,
    defaultNS,
    interpolation: {
      escapeValue: false,
    },
  };
}
