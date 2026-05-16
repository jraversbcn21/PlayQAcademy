/**
 * next-i18next configuration.
 * Spanish is the primary language; English is the secondary fallback.
 */
module.exports = {
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : undefined,
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
