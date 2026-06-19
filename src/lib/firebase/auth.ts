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

/** Update the display name on the Firebase Auth user record. */
export async function updateDisplayName(
  user: User,
  displayName: string
): Promise<void> {
  await updateProfile(user, { displayName });
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

/** Return the currently signed-in Firebase user, if any (no-op outside the browser). */
export function getCurrentUser(): User | null {
  return auth?.currentUser ?? null;
}

/** Apply a Firebase email-action code (e.g. from a verification link) to the account it targets. */
export async function verifyEmailWithCode(oobCode: string): Promise<void> {
  const a = requireAuth();
  await applyActionCode(a, oobCode);
}
