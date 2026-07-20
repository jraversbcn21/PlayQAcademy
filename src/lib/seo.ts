import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants/site";
import { languages } from "@/lib/i18n/settings";
import { PLAYGROUND_EXERCISES } from "@/lib/constants/playground";

/**
 * Canonical + hreflang alternates for a given locale/path, shared by every
 * page's generateMetadata so Google always resolves the two locales (and
 * the playqacademy.vercel.app duplicate) back to one canonical URL per page.
 *
 * `path` is the part after /{lng} — "" for a campus/locale root, "/about"
 * for /es/about, etc. Must match an entry in src/app/sitemap.ts.
 */
export function buildAlternates(lng: string, path: string) {
  return {
    canonical: `${SITE_URL}/${lng}${path}`,
    languages: Object.fromEntries(
      languages.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
  };
}

/**
 * Metadata for a Playground exercise page, sourced from PLAYGROUND_EXERCISES
 * (src/lib/constants/playground.ts) — the same registry that already drives
 * the exercise cards, so titles/descriptions never drift between the two.
 */
export function buildExerciseMetadata(lng: string, href: string): Metadata {
  const exercise = PLAYGROUND_EXERCISES.find((e) => e.href === href);
  if (!exercise) return {};

  const lang = lng === "es" ? "es" : "en";
  const title = exercise.title[lang];
  const description = exercise.description[lang];
  const alternates = buildAlternates(lng, href);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}
