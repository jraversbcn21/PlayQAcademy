/**
 * Shared i18n constants.
 * Used across the app to avoid hard-coding locale strings.
 */

export const SUPPORTED_LOCALES = ["es", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "es";
export const DEFAULT_NAMESPACE = "common";
