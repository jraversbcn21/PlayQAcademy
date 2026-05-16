/**
 * Maps raw Firebase error codes to i18n translation keys.
 * Every consumer (AuthContext, sign-in page, sign-up page)
 * uses this helper so error messages stay consistent.
 */

import { FirebaseError } from "firebase/app";

const CODE_TO_KEY: Record<string, string> = {
  "auth/email-already-in-use": "auth.errors.emailInUse",
  "auth/invalid-email": "auth.errors.invalidEmail",
  "auth/weak-password": "auth.errors.weakPassword",
  "auth/user-not-found": "auth.errors.userNotFound",
  "auth/wrong-password": "auth.errors.wrongPassword",
  "auth/invalid-credential": "auth.errors.invalidCredential",
  "auth/too-many-requests": "auth.errors.tooManyRequests",
  "auth/popup-closed-by-user": "auth.errors.popupClosed",
  "auth/network-request-failed": "auth.errors.networkError",
  "auth/internal-error": "auth.errors.default",
};

/**
 * Return the i18n key that corresponds to a Firebase Auth error.
 * Falls back to `"auth.errors.default"` for unrecognised codes.
 */
export function getFirebaseErrorKey(error: unknown): string {
  if (error instanceof FirebaseError) {
    return CODE_TO_KEY[error.code] ?? "auth.errors.default";
  }
  if (error instanceof Error) {
    return "auth.errors.default";
  }
  return "auth.errors.default";
}
