# AdSense Monetization Roadmap — custom domain + Google AdSense

> **Status:** Phase 0 in progress (domain purchased, awaiting DNS propagation).
> **Started:** 2026-07-20. Owner: Jorge.
> **Context:** Full AdSense readiness audit run 2026-07-20 against the live site + repo at commit `1e38460`.

**Goal:** Serve the campus from a domain we own, bring the site into full Google AdSense policy compliance, and monetize without breaking the user experience or our own legal commitments.

**Hard rule for this roadmap:** phases are sequential. Do not start a phase until the previous one is verified. Two findings below are *blocking* — shipping ad code before they are fixed risks both an AdSense rejection and a GDPR exposure.

---

## Phase 0 — Custom domain (IN PROGRESS)

`playqacademy.vercel.app` cannot be monetized properly: `ads.txt` must live at the domain root, and we do not control `vercel.app`. A `.vercel.app` subdomain also reads as a test project to a reviewer.

- [x] Choose TLD — `playqacademy.com` (`.com` over `.academy`: `.academy` renews at ~$40-55/yr vs `.com` at ~$12-15/yr, and `.com` carries less reviewer friction)
- [x] Purchase — bought through Vercel Domains, $11.25, 2026-07-20 (first attempt silently failed on an incomplete billing address; completed after filling it in)
- [ ] **Domain resolves** — `https://playqacademy.com` serves the campus, redirects to `/es`, valid SSL, no cert warnings
- [ ] **Link to project** — appears in project → Settings → Domains with `Valid Configuration`, marked **Primary**
- [ ] **`www` redirect** — `www.playqacademy.com` added as a *redirect* to the apex `playqacademy.com` (single canonical URL; avoids treating www/non-www as duplicate content)

### ⚠️ Phase 0 blocker — Firebase authorized domains

**Adding the domain to Vercel is not enough. Login will silently fail on `playqacademy.com` until it is added to Firebase → Authentication → Authorized domains.**

This project has already been bitten by this exact failure mode (see `[[project_lan_ip_email_verification]]` — a non-authorized origin stops Firebase delivering verification emails). Symptom is nasty: the page loads fine, sign-in just does nothing.

- [ ] Add `playqacademy.com` (and `www.playqacademy.com`) to Firebase → Authentication → Authorized domains
- [ ] Keep `playqacademy.vercel.app` authorized too — Vercel cannot disable it, and preview deploys still use it
- [ ] Verify end-to-end on the new domain: email/password sign-in, Google sign-in, sign-up → verification email actually delivered

**Verification gate for Phase 0:** sign in on `https://playqacademy.com` with a real account and reach `/dashboard`. Nothing else proceeds until this passes.

---

## Phase 1 — Legal (BLOCKING for AdSense)

### 🛑 Blocker: our own policies forbid advertising

Verified in `public/locales/{es,en}/common.json`:

| Key | Current text |
|---|---|
| `privacy.s3Body` | "…**no mostramos publicidad** y no vendemos datos a terceros." |
| `cookies.s2Body` | "**No utilizamos cookies de publicidad**, de seguimiento, de análisis ni de terceros…" |
| `cookies.s4Body` | "PlayQAcademy **NO utiliza: cookies de publicidad comportamental**… ni compartimos información con redes publicitarias." |

EN mirrors are equally explicit ("There is no advertising on the platform").

Shipping AdSense against this text violates AdSense policy (which requires a truthful privacy policy disclosing Google's third-party cookies) **and** the GDPR — we would be telling EU users in writing that we do no ad profiling while doing exactly that. The GDPR side is the more serious one and is enforceable by the AEPD independently of Google.

**Good news, confirmed by grep:** no "ad-free" claim exists anywhere in the *marketing* copy (`hero`, `landing`, `about`). The public value proposition is "gratuito", not "sin anuncios". Rewriting the legal text breaks no commercial promise.

**Decision taken:** Option A — rewrite the legal text and monetize with AdSense. (Option B, a freemium ad-free tier, is deliberately deferred: it shrinks inventory and complicates the implementation. Option C, donations only, remains the fallback if traffic is too low to justify the work.)

- [ ] Rewrite `privacy.s3Body` + `privacy.s6Body` — declare Google as a third-party ad provider and disclose ad cookies
- [ ] Rewrite `cookies.s2Body` / `s3Body` / `s4Body` + add a new advertising-cookies section
- [ ] Fix the domain reference — `privacy.s1Body` says "accesible desde https://playq.academy", a domain that was never deployed. Must become `playqacademy.com`
- [ ] Bump `lastUpdated` on both pages (only when body content actually changes — existing repo convention)
- [ ] Keep both `es` and `en` in sync (no empty `"en": ""` — repo-wide rule)

### Missing legal surfaces

- [ ] **Contact page** (`/contact`) — does not exist today. Reviewers check for it early. Needs a real route + footer link, not just an email buried in the privacy text
- [ ] **Aviso legal (LSSI)** — Spain requires identifying details (name/company, NIF, registered address) once a site is monetized. Today the site only says "SidMaier, Barcelona". **Jorge to confirm fiscal details with his gestor** — out of scope for the assistant per `[[project_buymeacoffee_setup]]`
- [ ] **CMP (Consent Management Platform)** — **none exists today**, confirmed on the live site. Google has required a Google-certified CMP for serving ads to EEA/UK/Switzerland users since Jan 2024. Jorge's audience is primarily Spain, so this is mandatory, not optional. Google's own CMP is free and the simplest path

---

## Phase 2 — SEO / indexing

- [ ] **`robots.txt`** — does not exist (confirmed 404 live). Use `app/robots.ts` (Next 15 native)
- [ ] **`sitemap.xml`** — does not exist. Use `app/sitemap.ts`; 46 routes × 2 locales
- [ ] **Per-page metadata** — only 4 of 46 pages define `metadata` (`campus/[campusId]`, `cookies`, `privacy`, `terms`). Everything else inherits the generic root title
- [ ] **`metadataBase`** + **`canonical`** — required, and the fix for the duplicate-content problem below
- [ ] **`hreflang`** es/en — so Google does not read the two locales as duplicates
- [ ] **Google Search Console** — register the new domain, submit the sitemap, request indexing

### Duplicate content note

Vercel **cannot** disable `playqacademy.vercel.app`; it will keep serving identical content alongside `playqacademy.com`. This is not fixable in the Vercel dashboard — the fix is `canonical` tags always pointing at `playqacademy.com`, handled in this phase. Do not waste time trying to switch the `.vercel.app` URL off.

---

## Phase 3 — Content exposure (highest impact on approval)

**This is the single biggest approval risk.** The platform's substantial content — 111 lessons across 3 campuses — lives under `/learn/*`, which `src/middleware.ts:31` gates behind auth. Googlebot and the AdSense reviewer see only: landing, `/about` (115 lines), `/curriculum`, `/glossary`, `/playground`. That can read as "insufficient content".

- [ ] **Decision needed from Jorge:** open part of `/learn/*` to the public, or publish new public content (guides, articles, expanded glossary)
- [ ] Implement whichever path is chosen
- [ ] Confirm the public surface is genuinely crawlable (view-source, not just visually present)

---

## Phase 4 — AdSense implementation

Only after Phases 0-3 verify.

- [ ] Add the site in AdSense and verify ownership
- [ ] **`ads.txt`** at the domain root
- [ ] Insert the AdSense script
- [ ] Configure Auto Ads
- [ ] Choose placements deliberately — **never** inside exam-taking (`/exams/[examId]/take/[attemptId]`) or lesson flows where they would harm the learning experience. Note the existing self-exclusion pattern in `BuyMeCoffeeButton.tsx`: a global fixed element owns its own `usePathname()` exclusion list rather than making callers aware of it. Reuse that pattern for ad placement exclusions
- [ ] Submit for review and manage the approval process

---

## Audit summary (2026-07-20)

Full findings verified against code + live site.

**Blocking:** privacy/cookies contradict advertising · no CMP · no contact page · no robots.txt · no sitemap.xml · content gated behind auth · `.vercel.app` domain (now resolved by Phase 0)

**Important:** metadata on only 4/46 pages · no canonical/hreflang/`metadataBase` · aviso legal lacks LSSI fiscal details · footer `github.com`/`linkedin.com` are generic placeholders, not real profiles · footer "Cursos" points at `/`

**Already correct:** HTTPS (Vercel) · mobile responsive · navigation/UX · no internal duplicate content · typecheck/lint/build clean · ISTQB® disclaimer present in `terms.s8Body`

**Not measured:** Core Web Vitals — deliberately not asserted without data. Measure during Phase 2.

---

## Open questions for Jorge

1. Current traffic (visits/month)? If under ~1.000, AdSense revenue may not justify the work versus strengthening content first.
2. Fiscal details for the aviso legal — same entity as the Buy Me a Coffee business registration?
3. **Phase 3 decision:** willing to open part of the lesson content publicly?
4. Is Google Search Console already set up for any domain?
