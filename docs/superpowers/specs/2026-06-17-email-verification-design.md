# Email verification on sign-up — design

## Problem

Today, signing up with any email (real or fake) + password immediately authenticates
the user: `createUserWithEmailAndPassword` fires `onAuthStateChanged`, `AuthContext`
sets the `auth_token` cookie unconditionally, and the middleware lets the user straight
into `/dashboard`. There is no email-ownership check anywhere in the flow.

## Goal

Email/password sign-up must require the user to click a verification link sent to
their inbox before they can reach any protected route (`/dashboard`, `/learn/*`,
`/leaderboard`). Google sign-in is unaffected (Google-verified emails are already
`emailVerified = true` in Firebase).

## Non-goals

- Passwordless / magic-link sign-in (out of scope — current form keeps email +
  password + confirm + strength meter as-is).
- Read-only access for unverified users (full block instead — simpler, matches
  the "no progress should be saved for an unverified account" intent).
- Storing `emailVerified` in the Firestore `UserProfile` document — it's read live
  from the Firebase `User` object, never persisted separately.
- Changing the password-reset flow (`sendPasswordResetEmail`) — untouched, keeps
  using Firebase's default hosted confirmation page.

## Architecture

`emailVerified` is sourced live from `fbUser.emailVerified` (Firebase Auth `User`),
never duplicated into Firestore. The existing `auth_token` cookie — already read by
`middleware.ts` to gate `/dashboard`, `/learn/*`, `/leaderboard` — becomes the
enforcement point: **the cookie is only set when `emailVerified === true`**. The
middleware itself needs no changes; an unverified user simply never gets the cookie
and is bounced to `/auth/sign-in` by the existing redirect logic.

Google sign-in is unaffected: Firebase marks Google-authenticated users as
`emailVerified = true` automatically, so they pass the same check that email/password
users now have to clear.

## Components

### `src/lib/firebase/auth.ts`

- `signUpWithEmail(email, password, displayName, lng)` — gains an `lng` (locale)
  parameter. After `createUserWithEmailAndPassword` + `updateProfile`, calls
  `sendVerificationEmail` on the new user.
- `sendVerificationEmail(user, lng)` (new) — wraps `sendEmailVerification(user,
  actionCodeSettings)` where:
  ```ts
  actionCodeSettings = {
    url: `${window.location.origin}/${lng}/auth/action`,
    handleCodeInApp: true,
  }
  ```
  `handleCodeInApp: true` makes the emailed link open our own `/auth/action` page
  with `?mode=verifyEmail&oobCode=...` directly, instead of Firebase's generic
  hosted confirmation page.
- `reloadCurrentUser(user)` (new) — wraps `user.reload()`. Used to refresh
  `emailVerified` after the user comes back from clicking the link.
- `verifyEmailWithCode(oobCode)` (new) — wraps `applyActionCode(auth, oobCode)`.
  Used by the `/auth/action` page.

### `src/context/AuthContext.tsx`

- New state: `emailVerified: boolean`.
- The `onAuthStateChanged` listener and the `signIn` / `signUp` / `signInWithGoogle`
  methods now set `emailVerified` from `fbUser.emailVerified` and only call
  `setAuthCookie()` when it's `true` (otherwise `removeAuthCookie()`).
- Two new context methods:
  - `resendVerification(lng): Promise<void>` — re-sends the verification email to
    `auth.currentUser` via `sendVerificationEmail`.
  - `refreshVerification(): Promise<boolean>` — reloads the current user, re-derives
    `emailVerified`, updates state/cookie accordingly, and returns the final value.
    Used by both the manual "I verified, continue" button and the automatic
    re-check described below.

### `src/app/[lng]/auth/verify-email/page.tsx` (new)

Branded "check your email" screen, styled like the success state of
`forgot-password/page.tsx`:

- If there's no authenticated user at all, redirect to `/auth/sign-in`.
- If the user is already verified (e.g. they reloaded after verifying), redirect to
  `/dashboard`.
- Shows the account's email, instructions, and a spam-folder hint.
- "Ya verifiqué mi email, continuar" button → calls `refreshVerification()`; on
  `true` redirects to `/dashboard`, on `false` shows an inline "aún no detectamos la
  verificación" message.
- "Reenviar correo" button → calls `resendVerification(lng)`, then disables itself
  for a 60-second client-side cooldown (countdown shown in the button label).
- "Cerrar sesión / usar otra cuenta" link → `signOut()` then redirect to `/auth/sign-up`.
- Auto re-check: a `visibilitychange`/`focus` listener on the window calls
  `refreshVerification()` silently whenever the tab regains focus (covers the case
  where the user clicked the link in another tab and came back) — no error shown if
  it's still `false`.

### `src/app/[lng]/auth/action/page.tsx` (new)

Handles the link Firebase actually emails (`?mode=verifyEmail&oobCode=...`):

- `mode !== "verifyEmail"` → generic "invalid link" state (defensive; today we only
  ever generate verification links here).
- `mode === "verifyEmail"` → calls `verifyEmailWithCode(oobCode)`.
  - Success: branded "¡Email verificado!" confirmation + "Continuar" button
    → `/auth/sign-in` (the user may be verifying from a different browser/device
    than the one they signed up on, so we don't assume an active session here —
    sign-in will pick up the now-verified state and let them straight through).
  - Failure (expired/already-used/invalid code): branded error message + link back
    to `/auth/verify-email` (which offers "reenviar correo").

### `src/app/[lng]/auth/sign-up/page.tsx` and `sign-in/page.tsx`

- The "already signed in" `useEffect` redirect and the post-submit redirect both
  branch on `emailVerified`: `true` → `/dashboard`, `false` → `/auth/verify-email`.
- Google sign-in keeps redirecting straight to `/dashboard` (Google accounts are
  always pre-verified, so this is never reached in practice, but the branch is the
  same code path — no special-casing needed).

## Strings (es/en `public/locales/{es,en}/common.json`)

New `auth.verifyEmail.*` namespace (title, subtitle with `{{email}}` interpolation —
same pattern as `forgotPassword.successMessage` — checkSpam, resendButton,
resendCooldown, continueButton, notYetVerified, signOutLink) and `auth.action.*`
(verifying, successTitle, successMessage, errorTitle, errorMessage, continueButton).

## Manual / infrastructure steps (not code)

- Firebase Console → Authentication → Settings → Authorized domains must include
  every domain the app is served from (localhost for dev, the production domain).
  `handleCodeInApp: true` links fail outside authorized domains.
- Any pre-existing "fake email" test accounts created before this change will be
  blocked on next sign-in until verified with a real inbox or deleted from the
  Firebase console.

## Testing

- `npm run typecheck` and `npm run lint` clean (project-wide gate, per AGENTS.md).
- Manual browser verification (this app's auth flows are always click-tested per
  AGENTS.md "Verified in browser" conventions): sign up with a real inbox → land on
  `verify-email` → click the emailed link → lands on `/auth/action` → success →
  sign in → reaches `/dashboard`. Also verify: resend cooldown counts down and
  re-enables; an expired/already-used `oobCode` shows the error state; Google
  sign-up still goes straight to `/dashboard`.
