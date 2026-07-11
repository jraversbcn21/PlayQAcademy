# Playground signup banner — design

## Problem

Jorge noticed that `/leaderboard` gates unauthenticated users to sign-in
(via `PROTECTED_PATTERNS` in `src/middleware.ts`), but `/glossary` and
`/playground` don't and are freely browsable while logged out. Investigation
confirmed this is intentional and correct: Ranking needs an account because
it shows *your* rank, while Glossary and Playground carry no account-linked
state at all — grepping both directories for `useAuth`/`isAuthenticated`
returns zero hits, and neither writes to Firestore. Decision: don't gate
Glossary or Playground behind login (see conversation). But Playground —
where a visitor is actively hands-on with the product — is a reasonable
place to nudge signed-out visitors toward creating an account, since that's
where they're most likely to want to keep going (lessons, exams, badges,
leaderboard).

## Goal

A small, dismissible banner on the Playground index (`/playground`) that
promotes account creation to signed-out visitors, without misrepresenting
what an account buys them.

## Non-goals

- **Glossary** — pure reference content, no interactive moment to hook a
  CTA to; out of scope for this banner.
- **"Save your progress" messaging** — rejected. Verified Playground
  exercises write nothing to Firestore for anyone, logged in or not, so a
  progress-saving pitch would be false. The banner sells access to the rest
  of the platform (lessons/exams/badges/leaderboard), not a Playground
  feature.
- **Per-exercise banner placement** — index-only, per Jorge's choice, to
  avoid repeating the pitch every time a signed-out visitor moves between
  drills.
- **Gating Playground/Glossary behind auth** — explicitly rejected in favor
  of this softer nudge.

## Architecture

### New component: `src/components/playground/SignupBanner.tsx`

`"use client"`. Specific to this one use site — not a generic reusable
`Banner` abstraction, since Playground is the only place this is needed
today.

```tsx
const DISMISS_KEY = "playground_signup_banner_dismissed";

export default function SignupBanner({ lng }: { lng: string }) {
  const { user, loading } = useAuth();
  const [dismissed, setDismissed] = useState(true); // default hidden until checked

  useEffect(() => {
    setDismissed(localStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  if (loading || user || dismissed) return null;

  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-forest-500/30 bg-brand-forest-500/10 p-4">
      <p className="flex-1 text-sm text-[var(--color-text-secondary)]">
        {lng === "es"
          ? "Crea una cuenta gratis para desbloquear lecciones, exámenes, insignias y el ranking."
          : "Create a free account to unlock lessons, exams, badges, and the leaderboard."}
      </p>
      <Link
        href={`/${lng}/auth/sign-up`}
        className="shrink-0 rounded-lg bg-brand-forest-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-forest-500 transition-colors"
      >
        {lng === "es" ? "Crear cuenta" : "Create account"}
      </Link>
      <button
        type="button"
        aria-label={lng === "es" ? "Cerrar" : "Dismiss"}
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, "1");
          setDismissed(true);
        }}
        className="shrink-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
      >
        ✕
      </button>
    </div>
  );
}
```

Defaulting `dismissed` to `true` until the `localStorage` check runs in
`useEffect` avoids a flash-of-banner on first paint for returning visitors
who already dismissed it (and avoids an SSR/CSR hydration mismatch, since
`localStorage` isn't available server-side). Combined with the
`loading || user` guard, the banner only ever pops in once auth state is
known *and* the stored dismissal is known — never a flicker.

Copy is inlined bilingual (`lng === "es" ? … : …`), matching the existing
pattern already used throughout `playground/page.tsx` and
`playground/layout.tsx` rather than the i18n JSON files — consistent with
how the rest of this route handles copy.

### Mounting: `src/app/[lng]/playground/page.tsx`

Rendered once, between the hero block and the campus pill row (i.e. right
before the `{/* Campus pill row */}` comment at `playground/page.tsx:108`):

```tsx
<SignupBanner lng={lng} />
{/* Campus pill row */}
<div className="mb-6 grid gap-3 sm:grid-cols-3">
  ...
```

Not mounted in `playground/layout.tsx`, so it never appears on individual
exercise pages — only the index.

## Edge cases

- **Auth still resolving:** `loading` from `useAuth()` guards against
  showing the banner to a user who's actually logged in but whose session
  hasn't hydrated yet (same pattern already used by `/badges`, `/settings`,
  `/exams`).
- **Returning dismissed visitor:** `localStorage` persists indefinitely
  (no expiry) — once dismissed, gone for that browser until cleared. This
  matches the "Sí, con X que recuerda la elección" choice; no snooze/expiry
  requested.
- **Private/incognito or `localStorage` disabled:** `localStorage` calls
  would throw in rare lockdown configurations; not handled specially since
  the rest of the codebase (theme toggle) makes the same assumption.

## Testing

No automated test runner in this repo (per `AGENTS.md`); `npm run
typecheck` and `npm run lint` must stay at 0/0, `npm run build` must
succeed. Manual verification in the browser:

1. Signed out, visit `/es/playground` and `/en/playground` — banner shows
   with correct bilingual copy, positioned above the campus pills.
2. Click "Crear cuenta" — navigates to `/{lng}/auth/sign-up`.
3. Click ✕ — banner disappears immediately; reload the page — stays gone.
4. Clear `localStorage` (or open a fresh browser profile) — banner reappears.
5. Signed in — banner never renders, on first load or after navigating back
   to `/playground` from elsewhere.
6. Navigate into any individual exercise (e.g. `/playground/triage`) — no
   banner there, signed in or out.
