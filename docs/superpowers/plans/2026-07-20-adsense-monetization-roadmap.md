# Growth & Monetization Roadmap — custom domain → traffic → AdSense

> **Status:** Phase 0 in progress (domain purchased, awaiting DNS propagation).
> **Started:** 2026-07-20. Owner: Jorge.
> **Context:** AdSense readiness audit run 2026-07-20 against the live site + repo at commit `1e38460`.
> **Reordered 2026-07-20** after establishing real traffic figures — see "Why this order" below.

**Goal:** get the campus discovered by Google and growing, then monetize once there is traffic worth monetizing.

**Hard rule:** phases are sequential. Do not start a phase until the previous one is verified.

---

## Why this order (read before changing it)

The roadmap originally drove straight at AdSense. It was reordered once Jorge confirmed **~10 users, minimal traffic.**

The arithmetic that forced the change:

| | |
|---|---|
| ~10 users × ~20 pageviews/mo | ~200 pageviews/month |
| Niche-education RPM | €2-10 per 1.000 pageviews |
| **Realistic monthly revenue** | **€0,40 - €2** |
| Pageviews needed for ~€50/mo | ~10.000 - 25.000 |

Two orders of magnitude short. Worse, approval odds are poor at this traffic level with the current thin public surface — a rejection costs time and forces a retry.

**The insight that drove the reorder:** almost all the "AdSense requirements" (robots.txt, sitemap, metadata, Search Console, opening content) are not really AdSense requirements — they are *the things that generate traffic*. Same work, different motivation, different order. Traffic is the bottleneck; monetization is downstream of it.

**Consequence worth noting:** while no ad code ships, the current privacy/cookies text stays truthful. The legal contradiction documented in Phase 5 is not an active liability — it only becomes blocking if and when AdSense goes in.

---

## Phase 0 — Custom domain (IN PROGRESS)

`playqacademy.vercel.app` cannot be monetized properly: `ads.txt` must live at the domain root, and we do not control `vercel.app`. A `.vercel.app` subdomain also reads as a test project to a reviewer. It is also simply a better base for everything downstream.

- [x] Choose TLD — `playqacademy.com` (`.com` over `.academy`: `.academy` renews at ~$40-55/yr vs `.com` at ~$12-15/yr, and `.com` carries less reviewer friction)
- [x] Purchase — bought through Vercel Domains, $11.25, 2026-07-20 (first attempt silently failed on an incomplete billing address; completed after filling it in)
- [ ] **Domain resolves** — `https://playqacademy.com` serves the campus, redirects to `/es`, valid SSL, no cert warnings
- [ ] **Link to project** — appears in project → Settings → Domains with `Valid Configuration`, marked **Primary**
- [ ] **`www` redirect** — `www.playqacademy.com` added as a *redirect* to the apex `playqacademy.com` (single canonical URL; avoids treating www/non-www as duplicate content)

### ⚠️ Phase 0 blocker — Firebase authorized domains

**Adding the domain to Vercel is not enough. Login will silently fail on `playqacademy.com` until it is added to Firebase → Authentication → Authorized domains.**

This project has already been bitten by this exact failure mode (see `[[project_lan_ip_email_verification]]`). Symptom is nasty: the page loads fine, sign-in just does nothing.

- [ ] Add `playqacademy.com` (and `www.playqacademy.com`) to Firebase → Authentication → Authorized domains
- [ ] Keep `playqacademy.vercel.app` authorized too — Vercel cannot disable it, and preview deploys still use it
- [ ] Verify end-to-end on the new domain: email/password sign-in, Google sign-in, sign-up → verification email actually delivered

**Gate:** sign in on `https://playqacademy.com` with a real account and reach `/dashboard`.

---

## Phase 1 — Discoverability

Nothing else matters until Google can find and index the site.

- [ ] **Google Search Console** — not set up for any domain today. Register `playqacademy.com`, submit the sitemap, request indexing. This is the instrument panel for every later decision
- [ ] **`robots.txt`** — does not exist (confirmed 404 live). Use `app/robots.ts` (Next 15 native)
- [ ] **`sitemap.xml`** — does not exist. Use `app/sitemap.ts`; 46 routes × 2 locales
- [ ] **Per-page metadata** — only 4 of 46 pages define `metadata` (`campus/[campusId]`, `cookies`, `privacy`, `terms`). Everything else inherits the generic root title. Titles and descriptions are what actually get clicked in search results
- [ ] **`metadataBase`** + **`canonical`** — required, and the fix for the duplicate-content problem below
- [ ] **`hreflang`** es/en — so Google does not read the two locales as duplicates

### Duplicate content note

Vercel **cannot** disable `playqacademy.vercel.app`; it will keep serving identical content alongside `playqacademy.com`. This is not fixable in the Vercel dashboard — the fix is `canonical` tags always pointing at `playqacademy.com`. Do not waste time trying to switch the `.vercel.app` URL off.

---

## Phase 2 — Open QA Fundamentals to the public

**The highest-leverage move in this roadmap.** The platform's substantial content — 111 lessons across 3 campuses — sits under `/learn/*`, gated by `src/middleware.ts:31`. Googlebot sees only: landing, `/about` (115 lines), `/curriculum`, `/glossary`, `/playground`.

**Decision taken (Jorge, 2026-07-20):** open the **QA Fundamentals campus only** (10 modules, 45 lessons). ISTQB and Playwright Automation stay gated as the registration incentive.

Why this works:
- ~45 lessons × 2 locales ≈ 90 new indexable URLs of genuine, sourced content
- Targets real search demand ("qué es ISO 25010", "tipos de pruebas de software", "cómo escribir un reporte de bug")
- Creates a natural funnel: search → read free → register for ISTQB/Automation

- [ ] Design the gating change — `/learn/qaf-*` public, everything else unchanged. Note `PROTECTED_PATTERNS` in `middleware.ts` currently matches `/learn/` wholesale; it needs to become campus-aware
- [ ] Handle the signed-out lesson experience: progress tracking, "mark complete", and gamification all assume a user. Decide what a signed-out reader sees (likely: full lesson content, with completion/progress UI replaced by a sign-up CTA)
- [ ] Confirm no Firestore writes are attempted for signed-out readers
- [ ] Verify crawlability via view-source, not just visual presence
- [ ] Add the new public lesson URLs to the sitemap

**Open question:** whether the existing `SignupBanner` pattern (`src/components/playground/SignupBanner.tsx`) should be reused on public lessons.

---

## Phase 3 — Contact & legal surfaces

Worth doing regardless of monetization; required before it.

- [ ] **Contact page** (`/contact`) — does not exist today. Real route + footer link, not an email buried in the privacy text
- [ ] **Aviso legal (LSSI)** — Spain requires identifying details once a site is monetized: name/company, **NIF/CIF**, registered address, contact email. Today the site only says "SidMaier, Barcelona". Note: PayPal is a payment processor, not a fiscal identity — it does not satisfy this. **Jorge to confirm the exact publishable details with his gestor**; out of scope for the assistant per `[[project_buymeacoffee_setup]]`
- [ ] Fix the domain reference in `privacy.s1Body` — says "accesible desde https://playq.academy", a domain never deployed. Must become `playqacademy.com`
- [ ] Clean up the footer placeholders: `github.com` and `linkedin.com` are generic landing pages, not real profiles; "Cursos" points at `/`

---

## Phase 4 — Measure and grow (2-3 months)

No code. Watch Search Console: impressions, clicks, indexed pages, which lessons attract queries. Let the data decide whether Phase 5 is worth the effort.

**Revisit trigger:** roughly 3.000-5.000 monthly pageviews makes AdSense worth the compliance work. Below that, reconsider — donations (Buy Me a Coffee, already live) or direct sponsorship may fit better than ads.

---

## Phase 5 — AdSense (only if traffic justifies it)

### 🛑 Blocker: our own policies forbid advertising

Verified in `public/locales/{es,en}/common.json`:

| Key | Current text |
|---|---|
| `privacy.s3Body` | "…**no mostramos publicidad** y no vendemos datos a terceros." |
| `cookies.s2Body` | "**No utilizamos cookies de publicidad**, de seguimiento, de análisis ni de terceros…" |
| `cookies.s4Body` | "PlayQAcademy **NO utiliza: cookies de publicidad comportamental**… ni compartimos información con redes publicitarias." |

EN mirrors are equally explicit ("There is no advertising on the platform").

Shipping AdSense against this text violates AdSense policy (which requires a truthful privacy policy disclosing Google's third-party cookies) **and** the GDPR — telling EU users in writing that we do no ad profiling while doing exactly that. The GDPR side is the more serious one, enforceable by the AEPD independently of Google.

**Confirmed by grep:** no "ad-free" claim exists in the *marketing* copy (`hero`, `landing`, `about`). The public value proposition is "gratuito", not "sin anuncios". Rewriting the legal text breaks no commercial promise.

**Decision taken:** Option A — rewrite the legal text and run AdSense. Option B (freemium ad-free tier) deferred: shrinks inventory, complicates implementation. Option C (donations only) is the fallback if traffic never justifies ads.

- [ ] Rewrite `privacy.s3Body` + `privacy.s6Body` — declare Google as a third-party ad provider, disclose ad cookies
- [ ] Rewrite `cookies.s2Body` / `s3Body` / `s4Body` + add an advertising-cookies section
- [ ] Bump `lastUpdated` on both pages; keep `es`/`en` in sync (no empty `"en": ""`)
- [ ] **CMP** — none exists today. Google has required a certified CMP for EEA/UK/Swiss traffic since Jan 2024; the audience is primarily Spain, so this is mandatory. Google's own CMP is free and simplest
- [ ] Add the site in AdSense, verify ownership
- [ ] **`ads.txt`** at the domain root
- [ ] Insert the AdSense script; configure Auto Ads
- [ ] Placements: **never** inside exam-taking (`/exams/[examId]/take/[attemptId]`) or in flows where they harm learning. Reuse the self-exclusion pattern from `BuyMeCoffeeButton.tsx` — a global fixed element owns its own `usePathname()` exclusion list rather than making callers aware of it
- [ ] Submit for review, manage approval

---

## Audit reference (2026-07-20)

**Already correct:** HTTPS (Vercel) · mobile responsive · navigation/UX · no internal duplicate content · typecheck/lint/build clean · ISTQB® disclaimer present in `terms.s8Body`

**Not measured:** Core Web Vitals — deliberately not asserted without data. Measure during Phase 1.

## Answered (Jorge, 2026-07-20)

1. **Traffic:** ~10 users, minimal. Drove the reorder above.
2. **Fiscal details:** payments via PayPal — but that is not a fiscal identity; LSSI details still pending from his gestor.
3. **Content:** open QA Fundamentals only. → Phase 2.
4. **Search Console:** not set up. → Phase 1.
