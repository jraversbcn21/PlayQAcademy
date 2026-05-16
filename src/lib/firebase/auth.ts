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
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
  type NextOrObserver,
  type Unsubscribe,
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

/** Create a new account with email + password + display name. */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  const a = requireAuth();
  const result = await createUserWithEmailAndPassword(a, email, password);
  await updateProfile(result.user, { displayName });
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
