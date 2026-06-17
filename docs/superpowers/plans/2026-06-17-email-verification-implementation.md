# Email Verification on Sign-Up — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Email/password sign-up must require the user to click a verification link sent to their inbox before they can reach any protected route (`/dashboard`, `/learn/*`, `/leaderboard`). Google sign-in is unaffected.

**Architecture:** `emailVerified` is read live from the Firebase `User` object (never duplicated into Firestore). The existing `auth_token` cookie — already the thing `middleware.ts` checks to gate protected routes — is now only set when `emailVerified === true`. No middleware changes are needed; an unverified user simply never gets the cookie and the existing redirect-to-sign-in logic handles the rest.

**Tech Stack:** Next.js 14 App Router, TypeScript (strict), Firebase Auth v10 (`firebase/auth` modular SDK), react-i18next.

## Global Constraints

- `npm run typecheck` and `npm run lint` must both report 0 errors / 0 warnings before every commit (AGENTS.md quality gate).
- Every user-facing string is added to **both** `public/locales/es/common.json` and `public/locales/en/common.json` (no empty strings, no partial translations).
- Commits land directly on `main` (no branches/PRs — this repo's established workflow).
- This repo has no automated test runner (`package.json` has no `test` script, no `__tests__` anywhere under `src`). The verification cycle for every task is: typecheck clean → lint clean → (for UI tasks) manual browser check. There is no unit-test step to add.
- Auth flows in this app are conventionally verified by clicking through them in a real browser before being considered done (see AGENTS.md "Verified in browser").

---

## File Structure

| File | Change |
|---|---|
| `src/lib/firebase/auth.ts` | Modify — `signUpWithEmail` gains an `lng` param and now sends a verification email; add `sendVerificationEmail`, `reloadCurrentUser`, `verifyEmailWithCode`. |
| `src/context/AuthContext.tsx` | Modify — add `emailVerified` state, gate the `auth_token` cookie on it, add `resendVerification` / `refreshVerification`, and make `signIn`/`signUp`/`signInWithGoogle` return the verified flag. |
| `public/locales/es/common.json`, `public/locales/en/common.json` | Modify — add `auth.verifyEmail.*` and `auth.action.*` keys. |
| `src/app/[lng]/auth/sign-up/page.tsx` | Modify — pass `lng` into `signUp`, redirect to `verify-email` instead of `dashboard` for unverified accounts. |
| `src/app/[lng]/auth/sign-in/page.tsx` | Modify — same redirect change for sign-in. |
| `src/app/[lng]/auth/verify-email/page.tsx` | Create — "check your email" holding screen with resend (60s cooldown) and manual + automatic re-check. |
| `src/app/[lng]/auth/action/page.tsx` | Create — handles the emailed `?mode=verifyEmail&oobCode=...` link, applies the code, shows success/error. |
| `AGENTS.md` | Modify — document the new durable fact (verification gate) per this repo's "sync this file" convention. |

---

### Task 1: Firebase Auth helpers for email verification

**Files:**
- Modify: `src/lib/firebase/auth.ts`

**Interfaces:**
- Consumes: nothing new (Firebase `firebase/auth` modular SDK, already a dependency).
- Produces:
  - `sendVerificationEmail(user: User, lng: string): Promise<void>`
  - `signUpWithEmail(email: string, password: string, displayName: string, lng: string): Promise<User>` (signature changed — gains `lng`)
  - `reloadCurrentUser(user: User): Promise<void>`
  - `verifyEmailWithCode(oobCode: string): Promise<void>`
  - These four are consumed by Task 2 (`AuthContext.tsx`) and Task 7 (`action/page.tsx`).

- [ ] **Step 1: Replace the contents of `src/lib/firebase/auth.ts`**

Replace the entire file with:

```ts
/**
 * Firebase Authentication helpers.
 *
 * Each function assumes the Firebase app was initialised in
 * src/lib/firebase/config.ts. If the auth instance is null
 * (missing env vars), every call throws with a clear message.
 */

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
  type NextOrObserver,
  type Unsubscribe,
  type ActionCodeSettings,
} from "firebase/auth";
import { auth } from "./config";

function requireAuth() {
  if (!auth) {
    throw new Error(
      "[Firebase Auth] Not initialised — check NEXT_PUBLIC_FIREBASE_* env vars."
    );
  }
  return auth;
}

/** Sign in with a Google popup. */
export async function signInWithGoogle(): Promise<User> {
  const a = requireAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const result = await signInWithPopup(a, provider);
  return result.user;
}

/** Sign in with email + password. */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<User> {
  const a = requireAuth();
  const result = await signInWithEmailAndPassword(a, email, password);
  return result.user;
}

/**
 * Build the actionCodeSettings that route a Firebase email-action link
 * back into our own /auth/action page instead of Firebase's generic
 * hosted confirmation page.
 */
function buildActionCodeSettings(lng: string): ActionCodeSettings {
  return {
    url: `${window.location.origin}/${lng}/auth/action`,
    handleCodeInApp: true,
  };
}

/** Send (or resend) a verification email to the given user. */
export async function sendVerificationEmail(
  user: User,
  lng: string
): Promise<void> {
  await sendEmailVerification(user, buildActionCodeSettings(lng));
}

/** Create a new account with email + password + display name, then send a verification email. */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string,
  lng: string
): Promise<User> {
  const a = requireAuth();
  const result = await createUserWithEmailAndPassword(a, email, password);
  await updateProfile(result.user, { displayName });
  await sendVerificationEmail(result.user, lng);
  return result.user;
}

/** Sign out the current user. */
export async function signOutUser(): Promise<void> {
  const a = requireAuth();
  await signOut(a);
}

/** Subscribe to Firebase auth state changes. Returns the unsubscribe function. */
export function onAuthStateChange(
  callback: NextOrObserver<User>
): Unsubscribe {
  const a = requireAuth();
  return onAuthStateChanged(a, callback);
}

/** Send a password reset email to the given address. */
export async function sendPasswordReset(email: string): Promise<void> {
  const a = requireAuth();
  await sendPasswordResetEmail(a, email);
}

/** Reload the given user so emailVerified reflects the latest server state. */
export async function reloadCurrentUser(user: User): Promise<void> {
  await user.reload();
}

/** Apply a Firebase email-action code (e.g. from a verification link) to the account it targets. */
export async function verifyEmailWithCode(oobCode: string): Promise<void> {
  const a = requireAuth();
  await applyActionCode(a, oobCode);
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: 0 errors. (This will currently report an error in `AuthContext.tsx` because it calls the old 3-arg `signUpWithEmail` — that's expected and gets fixed in Task 2. If you're applying this task in isolation, ignore that one downstream error; everything inside `auth.ts` itself must be clean.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/firebase/auth.ts
git commit -m "feat(auth): add Firebase helpers for email verification"
```

---

### Task 2: Gate the session cookie on `emailVerified` in `AuthContext`

**Files:**
- Modify: `src/context/AuthContext.tsx`

**Interfaces:**
- Consumes: `sendVerificationEmail`, `reloadCurrentUser` from `src/lib/firebase/auth.ts` (Task 1); `auth` from `src/lib/firebase/config.ts` (already exists, unchanged).
- Produces (new `AuthContextValue` shape, consumed by Tasks 4-6):
  - `emailVerified: boolean`
  - `signIn(email: string, password: string): Promise<boolean>` (now returns the verified flag instead of `void`)
  - `signUp(email: string, password: string, displayName: string, lng: string): Promise<boolean>` (gains `lng`, now returns the verified flag)
  - `signInWithGoogle(): Promise<boolean>` (now returns the verified flag)
  - `resendVerification(lng: string): Promise<void>`
  - `refreshVerification(): Promise<boolean>`

- [ ] **Step 1: Update imports**

Find:
```ts
import {
  signInWithGoogle as fbSignInWithGoogle,
  signInWithEmail as fbSignInWithEmail,
  signUpWithEmail as fbSignUpWithEmail,
  signOutUser as fbSignOut,
  onAuthStateChange,
} from "@/lib/firebase/auth";
```

Replace with:
```ts
import {
  signInWithGoogle as fbSignInWithGoogle,
  signInWithEmail as fbSignInWithEmail,
  signUpWithEmail as fbSignUpWithEmail,
  signOutUser as fbSignOut,
  onAuthStateChange,
  sendVerificationEmail as fbSendVerificationEmail,
  reloadCurrentUser as fbReloadCurrentUser,
} from "@/lib/firebase/auth";
import { auth } from "@/lib/firebase/config";
```

- [ ] **Step 2: Extend the context interface**

Find:
```ts
interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  clearError: () => void;
}
```

Replace with:
```ts
interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  emailVerified: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    lng: string
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<boolean>;
  resendVerification: (lng: string) => Promise<void>;
  refreshVerification: () => Promise<boolean>;
  clearError: () => void;
}
```

- [ ] **Step 3: Add the `emailVerified` state**

Find:
```ts
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
```

Replace with:
```ts
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
```

- [ ] **Step 4: Gate the cookie in the `onAuthStateChanged` listener**

Find:
```ts
        if (fbUser) {
          const profile = await syncProfile(fbUser);
          setUser(profile);
          setAuthCookie();
        } else {
          setUser(null);
          removeAuthCookie();
        }
```

Replace with:
```ts
        if (fbUser) {
          const profile = await syncProfile(fbUser);
          setUser(profile);
          setEmailVerified(fbUser.emailVerified);
          if (fbUser.emailVerified) {
            setAuthCookie();
          } else {
            removeAuthCookie();
          }
        } else {
          setUser(null);
          setEmailVerified(false);
          removeAuthCookie();
        }
```

- [ ] **Step 5: Gate the cookie in `signIn`, and return the verified flag**

Find:
```ts
  const signIn = useCallback(
    async (email: string, password: string) => {
      clearError();
      setLoading(true);
      try {
        log(`Sign-in attempt: ${email}`);
        const fbUser = await fbSignInWithEmail(email, password);
        log(`Sign-in succeeded for: ${fbUser.uid}`);
        // Sync profile and set user immediately — don't wait for onAuthStateChanged
        const profile = await syncProfile(fbUser);
        setUser(profile);
        setAuthCookie();
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearError, syncProfile, t]
  );
```

Replace with:
```ts
  const signIn = useCallback(
    async (email: string, password: string) => {
      clearError();
      setLoading(true);
      try {
        log(`Sign-in attempt: ${email}`);
        const fbUser = await fbSignInWithEmail(email, password);
        log(`Sign-in succeeded for: ${fbUser.uid}`);
        // Sync profile and set user immediately — don't wait for onAuthStateChanged
        const profile = await syncProfile(fbUser);
        setUser(profile);
        setEmailVerified(fbUser.emailVerified);
        if (fbUser.emailVerified) {
          setAuthCookie();
        } else {
          removeAuthCookie();
        }
        return fbUser.emailVerified;
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearError, syncProfile, t]
  );
```

- [ ] **Step 6: Gate the cookie in `signUp`, thread `lng`, and return the verified flag**

Find:
```ts
  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      clearError();
      setLoading(true);
      try {
        log(`Sign-up attempt: ${email}`);
        const fbUser = await fbSignUpWithEmail(email, password, displayName);
        log(`Sign-up succeeded for: ${fbUser.uid}`);
        const profile = await syncProfile(fbUser);
        setUser(profile);
        setAuthCookie();
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearError, syncProfile, t]
  );
```

Replace with:
```ts
  const signUp = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      lng: string
    ) => {
      clearError();
      setLoading(true);
      try {
        log(`Sign-up attempt: ${email}`);
        const fbUser = await fbSignUpWithEmail(email, password, displayName, lng);
        log(`Sign-up succeeded for: ${fbUser.uid}`);
        const profile = await syncProfile(fbUser);
        setUser(profile);
        setEmailVerified(fbUser.emailVerified);
        if (fbUser.emailVerified) {
          setAuthCookie();
        } else {
          removeAuthCookie();
        }
        return fbUser.emailVerified;
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [clearError, syncProfile, t]
  );
```

- [ ] **Step 7: Gate the cookie in `signInWithGoogle`, and return the verified flag**

Find:
```ts
  const signInWithGoogle = useCallback(async () => {
    clearError();
    setLoading(true);
    try {
      log("Google sign-in attempt");
      const fbUser = await fbSignInWithGoogle();
      log(`Google sign-in succeeded for: ${fbUser.uid}`);
      const profile = await syncProfile(fbUser);
      setUser(profile);
      setAuthCookie();
    } catch (err) {
      const key = getFirebaseErrorKey(err);
      setError(t(key));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError, syncProfile, t]);
```

Replace with:
```ts
  const signInWithGoogle = useCallback(async () => {
    clearError();
    setLoading(true);
    try {
      log("Google sign-in attempt");
      const fbUser = await fbSignInWithGoogle();
      log(`Google sign-in succeeded for: ${fbUser.uid}`);
      const profile = await syncProfile(fbUser);
      setUser(profile);
      setEmailVerified(fbUser.emailVerified);
      if (fbUser.emailVerified) {
        setAuthCookie();
      } else {
        removeAuthCookie();
      }
      return fbUser.emailVerified;
    } catch (err) {
      const key = getFirebaseErrorKey(err);
      setError(t(key));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [clearError, syncProfile, t]);
```

- [ ] **Step 8: Add `resendVerification` and `refreshVerification`**

Find:
```ts
  }, [clearError, syncProfile, t]);

  /* ---------- Safety timeout (prevents infinite spinners) ---------- */
```

Replace with:
```ts
  }, [clearError, syncProfile, t]);

  const resendVerification = useCallback(async (lng: string) => {
    const current = auth?.currentUser;
    if (!current) return;
    await fbSendVerificationEmail(current, lng);
  }, []);

  const refreshVerification = useCallback(async (): Promise<boolean> => {
    const current = auth?.currentUser;
    if (!current) return false;
    await fbReloadCurrentUser(current);
    const verified = current.emailVerified;
    setEmailVerified(verified);
    if (verified) {
      setAuthCookie();
    } else {
      removeAuthCookie();
    }
    return verified;
  }, []);

  /* ---------- Safety timeout (prevents infinite spinners) ---------- */
```

- [ ] **Step 9: Expose the new state and methods on the context value**

Find:
```ts
  const value: AuthContextValue = {
    user,
    loading,
    error,
    initialized,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    clearError,
  };
```

Replace with:
```ts
  const value: AuthContextValue = {
    user,
    loading,
    error,
    initialized,
    emailVerified,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    resendVerification,
    refreshVerification,
    clearError,
  };
```

- [ ] **Step 10: Typecheck and lint**

Run: `npm run typecheck`
Expected: 0 errors (this also resolves the expected Task 1 downstream error, since `signUp` now passes 4 args).

Run: `npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 11: Commit**

```bash
git add src/context/AuthContext.tsx
git commit -m "feat(auth): gate session cookie on email verification in AuthContext"
```

---

### Task 3: i18n strings for the verification flow

**Files:**
- Modify: `public/locales/es/common.json`
- Modify: `public/locales/en/common.json`

**Interfaces:**
- Produces translation keys consumed by Task 6 (`auth.verifyEmail.*`) and Task 7 (`auth.action.*`).

- [ ] **Step 1: Add the Spanish strings**

In `public/locales/es/common.json`, find:
```json
      "haveAccount": "¿Ya tienes cuenta?",
      "signInLink": "Iniciar sesión",
      "divider": "o"
    },
    "errors": {
```

Replace with:
```json
      "haveAccount": "¿Ya tienes cuenta?",
      "signInLink": "Iniciar sesión",
      "divider": "o"
    },
    "verifyEmail": {
      "title": "Revisa tu correo",
      "subtitle": "Hemos enviado un enlace de verificación a {{email}}. Haz clic en el enlace para continuar con tu registro.",
      "checkSpam": "Si no lo ves en unos minutos, revisa la carpeta de spam.",
      "continueButton": "Ya verifiqué mi email, continuar",
      "notYetVerified": "Aún no detectamos la verificación. Inténtalo de nuevo en unos segundos.",
      "resendButton": "Reenviar correo",
      "resendCooldown": "Reenviar en {{seconds}}s",
      "resendSuccess": "Correo de verificación reenviado",
      "signOutLink": "Cerrar sesión y usar otra cuenta"
    },
    "action": {
      "verifying": "Verificando tu correo...",
      "successTitle": "¡Correo verificado!",
      "successMessage": "Tu cuenta ha sido verificada correctamente. Ya puedes iniciar sesión.",
      "errorTitle": "Enlace inválido o caducado",
      "errorMessage": "Este enlace de verificación ya no es válido. Solicita uno nuevo desde la pantalla de inicio de sesión.",
      "continueButton": "Ir a iniciar sesión"
    },
    "errors": {
```

- [ ] **Step 2: Add the English strings**

In `public/locales/en/common.json`, find:
```json
      "haveAccount": "Already have an account?",
      "signInLink": "Sign in",
      "divider": "or"
    },
    "errors": {
```

Replace with:
```json
      "haveAccount": "Already have an account?",
      "signInLink": "Sign in",
      "divider": "or"
    },
    "verifyEmail": {
      "title": "Check your email",
      "subtitle": "We've sent a verification link to {{email}}. Click the link to continue your sign-up.",
      "checkSpam": "If you don't see it in a few minutes, check your spam folder.",
      "continueButton": "I've verified my email, continue",
      "notYetVerified": "We haven't detected the verification yet. Try again in a few seconds.",
      "resendButton": "Resend email",
      "resendCooldown": "Resend in {{seconds}}s",
      "resendSuccess": "Verification email resent",
      "signOutLink": "Sign out and use another account"
    },
    "action": {
      "verifying": "Verifying your email...",
      "successTitle": "Email verified!",
      "successMessage": "Your account has been verified successfully. You can now sign in.",
      "errorTitle": "Invalid or expired link",
      "errorMessage": "This verification link is no longer valid. Request a new one from the sign-in screen.",
      "continueButton": "Go to sign in"
    },
    "errors": {
```

- [ ] **Step 3: Validate JSON and lint**

Run: `node -e "JSON.parse(require('fs').readFileSync('public/locales/es/common.json','utf8')); JSON.parse(require('fs').readFileSync('public/locales/en/common.json','utf8')); console.log('valid json')"`
Expected: `valid json` printed, no parse errors.

Run: `npm run typecheck && npm run lint`
Expected: 0 errors / 0 warnings (these files aren't TS, this just confirms nothing else broke).

- [ ] **Step 4: Commit**

```bash
git add public/locales/es/common.json public/locales/en/common.json
git commit -m "feat(auth): add i18n strings for email verification flow"
```

---

### Task 4: Route unverified sign-ups to the verify-email screen

**Files:**
- Modify: `src/app/[lng]/auth/sign-up/page.tsx`

**Interfaces:**
- Consumes: `emailVerified`, `signUp(email, password, displayName, lng): Promise<boolean>`, `signInWithGoogle(): Promise<boolean>` from `AuthContext` (Task 2).
- Produces: navigations to `/${lng}/auth/verify-email` (consumed visually by Task 6, which must exist for this to be a real route — but Next.js won't error at build time on a missing route reference, so task order is safe either way).

- [ ] **Step 1: Destructure `emailVerified` from `useAuth()`**

Find:
```tsx
  const { user, loading, initialized, error, signUp, signInWithGoogle, clearError } = useAuth();
```

Replace with:
```tsx
  const { user, loading, initialized, error, emailVerified, signUp, signInWithGoogle, clearError } =
    useAuth();
```

- [ ] **Step 2: Branch the "already signed in" redirect on `emailVerified`**

Find:
```tsx
  // Redirect if already signed in
  useEffect(() => {
    if (initialized && user) {
      router.replace(`/${lng}/dashboard?welcome=1`);
    }
  }, [initialized, user, lng, router]);
```

Replace with:
```tsx
  // Redirect if already signed in
  useEffect(() => {
    if (initialized && user) {
      router.replace(
        emailVerified ? `/${lng}/dashboard?welcome=1` : `/${lng}/auth/verify-email`
      );
    }
  }, [initialized, user, emailVerified, lng, router]);
```

- [ ] **Step 3: Use the returned verified flag after submitting the form**

Find:
```tsx
    setSubmitting(true);
    try {
      await signUp(email.trim(), password, displayName.trim());
      router.replace(`/${lng}/dashboard?welcome=1`);
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

Replace with:
```tsx
    setSubmitting(true);
    try {
      const verified = await signUp(email.trim(), password, displayName.trim(), lng);
      router.replace(
        verified ? `/${lng}/dashboard?welcome=1` : `/${lng}/auth/verify-email`
      );
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

> Note: this always resolves to `/auth/verify-email` in practice (a brand-new email/password account is never pre-verified), but using the returned flag — rather than hardcoding it — keeps this branch identical to the sign-in one and avoids special-casing.

- [ ] **Step 4: Use the returned verified flag after Google sign-up**

Find:
```tsx
  async function handleGoogleSignUp() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace(`/${lng}/dashboard?welcome=1`);
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

Replace with:
```tsx
  async function handleGoogleSignUp() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      const verified = await signInWithGoogle();
      router.replace(
        verified ? `/${lng}/dashboard?welcome=1` : `/${lng}/auth/verify-email`
      );
    } catch {
      // Error stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

- [ ] **Step 5: Typecheck and lint**

Run: `npm run typecheck`
Expected: 0 errors.

Run: `npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[lng]/auth/sign-up/page.tsx"
git commit -m "feat(auth): route unverified sign-ups to the verify-email screen"
```

---

### Task 5: Route unverified sign-ins to the verify-email screen

**Files:**
- Modify: `src/app/[lng]/auth/sign-in/page.tsx`

**Interfaces:**
- Consumes: `emailVerified`, `signIn(email, password): Promise<boolean>`, `signInWithGoogle(): Promise<boolean>` from `AuthContext` (Task 2).

- [ ] **Step 1: Destructure `emailVerified` from `useAuth()`**

Find:
```tsx
  const { user, loading, initialized, error, signIn, signInWithGoogle, clearError } = useAuth();
```

Replace with:
```tsx
  const { user, loading, initialized, error, emailVerified, signIn, signInWithGoogle, clearError } =
    useAuth();
```

- [ ] **Step 2: Branch the "already signed in" redirect on `emailVerified`**

Find:
```tsx
  // Redirect if already signed in
  useEffect(() => {
    if (initialized && user) {
      router.replace(`/${lng}/dashboard`);
    }
  }, [initialized, user, lng, router]);
```

Replace with:
```tsx
  // Redirect if already signed in
  useEffect(() => {
    if (initialized && user) {
      router.replace(emailVerified ? `/${lng}/dashboard` : `/${lng}/auth/verify-email`);
    }
  }, [initialized, user, emailVerified, lng, router]);
```

- [ ] **Step 3: Use the returned verified flag after submitting the form**

Find:
```tsx
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      router.replace(`/${lng}/dashboard`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

Replace with:
```tsx
    setSubmitting(true);
    try {
      const verified = await signIn(email.trim(), password);
      router.replace(verified ? `/${lng}/dashboard` : `/${lng}/auth/verify-email`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

- [ ] **Step 4: Use the returned verified flag after Google sign-in**

Find:
```tsx
  async function handleGoogleSignIn() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace(`/${lng}/dashboard`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

Replace with:
```tsx
  async function handleGoogleSignIn() {
    clearError();
    setFormError(null);
    setSubmitting(true);
    try {
      const verified = await signInWithGoogle();
      router.replace(verified ? `/${lng}/dashboard` : `/${lng}/auth/verify-email`);
    } catch {
      // Error is already stored in context
    } finally {
      setSubmitting(false);
    }
  }
```

- [ ] **Step 5: Typecheck and lint**

Run: `npm run typecheck`
Expected: 0 errors.

Run: `npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 6: Commit**

```bash
git add "src/app/[lng]/auth/sign-in/page.tsx"
git commit -m "feat(auth): route unverified sign-ins to the verify-email screen"
```

---

### Task 6: "Check your email" holding screen

**Files:**
- Create: `src/app/[lng]/auth/verify-email/page.tsx`

**Interfaces:**
- Consumes: `user`, `initialized`, `emailVerified`, `refreshVerification`, `resendVerification`, `signOut` from `AuthContext` (Task 2); `auth.verifyEmail.*` strings (Task 3); `Button` from `src/components/ui/Button.tsx` (existing, unchanged).
- Produces: the `/auth/verify-email` route that Tasks 4 and 5 redirect to.

- [ ] **Step 1: Create the page**

```tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { lng } = useParams() as { lng: string };
  const { user, initialized, emailVerified, refreshVerification, resendVerification, signOut } =
    useAuth();

  const [checking, setChecking] = useState(false);
  const [notYetVerified, setNotYetVerified] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  // No session at all → nothing to verify, go sign in.
  useEffect(() => {
    if (initialized && !user) {
      router.replace(`/${lng}/auth/sign-in`);
    }
  }, [initialized, user, lng, router]);

  // Already verified (e.g. came back after clicking the link) → continue in.
  useEffect(() => {
    if (initialized && user && emailVerified) {
      router.replace(`/${lng}/dashboard`);
    }
  }, [initialized, user, emailVerified, lng, router]);

  const checkVerification = useCallback(async () => {
    setChecking(true);
    setNotYetVerified(false);
    try {
      const verified = await refreshVerification();
      if (verified) {
        router.replace(`/${lng}/dashboard`);
      } else {
        setNotYetVerified(true);
      }
    } finally {
      setChecking(false);
    }
  }, [refreshVerification, lng, router]);

  // Auto-check whenever the tab regains focus (user may have clicked the link elsewhere).
  useEffect(() => {
    function handleFocus() {
      if (document.visibilityState === "visible") {
        void checkVerification();
      }
    }
    document.addEventListener("visibilitychange", handleFocus);
    window.addEventListener("focus", handleFocus);
    return () => {
      document.removeEventListener("visibilitychange", handleFocus);
      window.removeEventListener("focus", handleFocus);
    };
  }, [checkVerification]);

  // Resend cooldown countdown (ticks every second while > 0).
  useEffect(() => {
    const interval = setInterval(() => {
      setResendCooldown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function handleResend() {
    setResending(true);
    setResendMessage(null);
    try {
      await resendVerification(lng);
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
      setResendMessage(t("auth.verifyEmail.resendSuccess"));
    } catch {
      // Resend failures are rare (e.g. rate-limited); the cooldown still protects spam-clicking.
      setResendCooldown(RESEND_COOLDOWN_SECONDS);
    } finally {
      setResending(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.replace(`/${lng}/auth/sign-up`);
  }

  if (!initialized || !user) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {t("auth.verifyEmail.title")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {t("auth.verifyEmail.subtitle", { email: user.email ?? "" })}
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          {t("auth.verifyEmail.checkSpam")}
        </p>

        {notYetVerified && (
          <p className="mt-4 text-sm text-amber-500">{t("auth.verifyEmail.notYetVerified")}</p>
        )}

        {resendMessage && (
          <p className="mt-4 text-sm text-brand-forest-400">{resendMessage}</p>
        )}

        <div className="mt-8 space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full justify-center"
            loading={checking}
            disabled={checking}
            onClick={checkVerification}
          >
            {t("auth.verifyEmail.continueButton")}
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full justify-center"
            loading={resending}
            disabled={resending || resendCooldown > 0}
            onClick={handleResend}
          >
            {resendCooldown > 0
              ? t("auth.verifyEmail.resendCooldown", { seconds: resendCooldown })
              : t("auth.verifyEmail.resendButton")}
          </Button>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 text-sm font-medium text-brand-forest-400 hover:text-brand-forest-300"
        >
          {t("auth.verifyEmail.signOutLink")}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck`
Expected: 0 errors.

Run: `npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 3: Manual browser check (partial — full click-through happens in Task 8)**

Run: `npm run dev`, sign up with a real inbox email at `http://localhost:3001/es/auth/sign-up`.
Expected: after submitting, you land on `/es/auth/verify-email`, see your email address in the message, the "Reenviar correo" button works once then shows a counting-down cooldown, and switching to another tab and back doesn't crash (auto-check runs silently in the background).

- [ ] **Step 4: Commit**

```bash
git add "src/app/[lng]/auth/verify-email/page.tsx"
git commit -m "feat(auth): add verify-email holding screen"
```

---

### Task 7: `/auth/action` page — handle the emailed verification link

**Files:**
- Create: `src/app/[lng]/auth/action/page.tsx`

**Interfaces:**
- Consumes: `verifyEmailWithCode(oobCode: string): Promise<void>` from `src/lib/firebase/auth.ts` (Task 1); `auth.action.*` strings (Task 3); `Button` from `src/components/ui/Button.tsx`.
- Produces: the `/auth/action` route, which is the `url` Task 1's `buildActionCodeSettings` points the verification email at.

- [ ] **Step 1: Create the page**

`useSearchParams` requires a `Suspense` boundary in the Next.js App Router (this repo's `[lng]` layout uses `generateStaticParams`, so routes are statically prerendered by default — without `Suspense`, the build fails with "useSearchParams() should be wrapped in a suspense boundary"). The page below splits the search-param-reading logic into an inner component wrapped by the default export.

```tsx
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "@/lib/i18n/client";
import { verifyEmailWithCode } from "@/lib/firebase/auth";
import Button from "@/components/ui/Button";

type ActionState = "verifying" | "success" | "error";

function VerifyEmailAction() {
  const { t } = useTranslation("common");
  const { lng } = useParams() as { lng: string };
  const searchParams = useSearchParams();
  const [state, setState] = useState<ActionState>("verifying");

  useEffect(() => {
    const mode = searchParams.get("mode");
    const oobCode = searchParams.get("oobCode");

    if (mode !== "verifyEmail" || !oobCode) {
      setState("error");
      return;
    }

    let cancelled = false;
    verifyEmailWithCode(oobCode)
      .then(() => {
        if (!cancelled) setState("success");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [searchParams]);

  if (state === "verifying") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
          <p className="mt-4 text-sm text-[var(--color-text-muted)]">
            {t("auth.action.verifying")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
          {state === "success" ? t("auth.action.successTitle") : t("auth.action.errorTitle")}
        </h1>
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {state === "success" ? t("auth.action.successMessage") : t("auth.action.errorMessage")}
        </p>
        <Link href={`/${lng}/auth/sign-in`} className="mt-8 block">
          <Button variant="primary" size="lg" className="w-full justify-center">
            {t("auth.action.continueButton")}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function VerifyEmailActionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-forest-500 border-t-transparent" />
        </div>
      }
    >
      <VerifyEmailAction />
    </Suspense>
  );
}
```

- [ ] **Step 2: Typecheck and lint**

Run: `npm run typecheck`
Expected: 0 errors.

Run: `npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 3: Production build sanity check**

Run: `npm run build`
Expected: build succeeds — this is the step that would catch a missing `Suspense` boundary around `useSearchParams`.

- [ ] **Step 4: Manual browser check (partial — full click-through happens in Task 8)**

Run: `npm run dev`, visit `http://localhost:3001/es/auth/action` directly with no query params.
Expected: shows the error state ("Enlace inválido o caducado") with a working "Ir a iniciar sesión" button — confirms the page doesn't crash on a malformed/missing code before you have a real `oobCode` to test the success path with (that requires Task 8's real email).

- [ ] **Step 5: Commit**

```bash
git add "src/app/[lng]/auth/action/page.tsx"
git commit -m "feat(auth): add /auth/action page to handle verification links"
```

---

### Task 8: End-to-end browser verification + sync AGENTS.md

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: nothing new — this task exercises the full feature built in Tasks 1-7 and documents it per this repo's "sync this file" convention (AGENTS.md line ~20: "every feature commit is followed by (or includes) a `docs:` commit that updates AGENTS.md").

- [ ] **Step 1: Firebase Console setup check (manual, one-time)**

In the Firebase Console for this project, go to **Authentication → Settings → Authorized domains** and confirm `localhost` is listed (it is by default). If you'll also test against a deployed URL, add that domain too. `handleCodeInApp: true` action links fail outside authorized domains — if Step 2 below fails with an auth/unauthorized-domain-style error, this is the first thing to check.

- [ ] **Step 2: Full click-through with a real inbox**

1. Run `npm run dev`.
2. Go to `http://localhost:3001/es/auth/sign-up`, sign up with a real email you can check and a valid password.
3. Confirm you land on `/es/auth/verify-email` (not the dashboard) and see your email address in the message.
4. Open the inbox, find the verification email, click the link.
5. Confirm it opens `http://localhost:3001/es/auth/action?mode=verifyEmail&oobCode=...` and shows the success state ("¡Correo verificado!").
6. Click "Ir a iniciar sesión", sign in with the same credentials at `/es/auth/sign-in`.
7. Confirm you now land on `/es/dashboard` (the cookie gate passes).
8. Sign out, sign back in again — confirm you go straight to `/es/dashboard` (no repeat verification prompt).
9. In a fresh incognito window, sign up again with a second real email, but this time click "Reenviar correo" on the verify-email screen before clicking the emailed link — confirm the button disables and shows a counting-down "Reenviar en Ns" label, then re-enables at 0.
10. While still unverified in that incognito window, try navigating directly to `http://localhost:3001/es/dashboard` — confirm the middleware bounces you to `/es/auth/sign-in` (no cookie was ever set).
11. Sign up with Google (`Continuar con Google`) — confirm it goes straight to `/es/dashboard` with no verify-email detour.

If any step fails, fix the underlying code in the relevant earlier task before proceeding — do not weaken the gate to make this checklist pass.

- [ ] **Step 3: Update AGENTS.md**

Find (in the "Architecture (durable facts...)" section, the last bullet before "## Visual identity"):
```markdown
- **Module `estimatedMinutes` is a manual value** shown directly in the UI (campus cards, dashboard, learn page) — bump it when you add/remove lessons in a module.

## Visual identity
```

Replace with:
```markdown
- **Module `estimatedMinutes` is a manual value** shown directly in the UI (campus cards, dashboard, learn page) — bump it when you add/remove lessons in a module.
- **Email/password sign-up requires verification.** `signUpWithEmail` sends a Firebase verification email whose link opens our own `/auth/action` page (`actionCodeSettings.handleCodeInApp = true`); the `auth_token` cookie that `middleware.ts` checks is only set once `emailVerified` is `true`, so unverified accounts are bounced to `/auth/verify-email` (resend with 60s cooldown, auto re-check on tab focus) instead of the dashboard. Google sign-in is exempt — Firebase marks Google accounts as pre-verified.

## Visual identity
```

- [ ] **Step 4: Final typecheck/lint sanity check**

Run: `npm run typecheck && npm run lint`
Expected: 0 errors / 0 warnings.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs: sync AGENTS.md with email verification flow"
```