import { SITE_URL } from "@/lib/constants/site";
import { languages } from "@/lib/i18n/settings";

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
