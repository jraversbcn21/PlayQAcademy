/**
 * Canonical site identity — single source for the production domain.
 *
 * `playqacademy.vercel.app` keeps serving identical content (Vercel cannot
 * disable it, and preview deploys depend on it) but must never be treated
 * as canonical: every absolute URL, canonical tag, and sitemap entry is
 * built from SITE_URL so Google always resolves duplicate content back to
 * playqacademy.com.
 */

export const SITE_URL = "https://playqacademy.com";
