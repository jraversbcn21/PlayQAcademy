/**
 * Canonical site identity — single source for the production domain.
 *
 * `www.playqacademy.com`, not the apex: apex `playqacademy.com` 308-redirects
 * to `www` in Vercel (www is what actually serves Production), so www is the
 * only host that can be canonical without contradicting that redirect —
 * pointing canonical at a host that immediately redirects elsewhere confuses
 * crawlers about which URL is authoritative.
 *
 * `playqacademy.vercel.app` keeps serving identical content too (Vercel
 * cannot disable it, and preview deploys depend on it) but must never be
 * treated as canonical: every absolute URL, canonical tag, and sitemap entry
 * is built from SITE_URL so Google always resolves duplicate content back to
 * one host.
 */

export const SITE_URL = "https://www.playqacademy.com";
