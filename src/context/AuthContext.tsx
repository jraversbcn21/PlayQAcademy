"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useTranslation } from "next-i18next";
import type { User } from "firebase/auth";
import type { UserProfile } from "@/types/auth";
import { DEFAULT_USER_PROFILE } from "@/types/auth";
import {
  signInWithGoogle as fbSignInWithGoogle,
  signInWithEmail as fbSignInWithEmail,
  signUpWithEmail as fbSignUpWithEmail,
  signOutUser as fbSignOut,
  onAuthStateChange,
} from "@/lib/firebase/auth";
import {
  createUserProfile,
  getUserProfile,
  updateLastLogin,
} from "@/lib/firebase/firestore";
import { getFirebaseErrorKey } from "@/lib/firebase/errors";

/* ------------------------------------------------------------------ */
/*  Cookie helper (for middleware route guard)                         */
/* ------------------------------------------------------------------ */

const AUTH_COOKIE = "auth_token";
const COOKIE_MAX_AGE = 86400; // 1 day

function setAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=1; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

function removeAuthCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

interface AuthProviderProps {
  children: ReactNode;
  lng: string;
}

export function AuthProvider({ children, lng }: AuthProviderProps) {
  const { t } = useTranslation("common");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  /**
   * Convert a Firebase User into a full UserProfile.
   * If no Firestore document exists (first sign-in), creates it.
   */
  const syncProfile = useCallback(
    async (fbUser: User): Promise<UserProfile | null> => {
      let profile = await getUserProfile(fbUser.uid);

      if (!profile) {
        // First sign-in: create the Firestore document
        await createUserProfile(fbUser.uid, {
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
        });

        profile = {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          ...DEFAULT_USER_PROFILE,
        };
      } else {
        // Returning user: update lastLoginAt
        await updateLastLogin(fbUser.uid).catch(() => {
          /* non-critical */
        });
      }

      return profile;
    },
    []
  );

  /* ---------- Auth state listener ---------- */

  useEffect(() => {
    // Skip listener when Firebase is not configured (SSR / missing env)
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChange(async (fbUser) => {
      try {
        if (fbUser) {
          const profile = await syncProfile(fbUser);
          setUser(profile);
          setAuthCookie();
        } else {
          setUser(null);
          removeAuthCookie();
        }
      } catch (err) {
        setError(t(getFirebaseErrorKey(err)));
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [syncProfile, t]);

  /* ---------- Auth actions ---------- */

  const signIn = useCallback(
    async (email: string, password: string) => {
      clearError();
      setLoading(true);
      try {
        await fbSignInWithEmail(email, password);
        // onAuthStateChange handles setUser + cookie
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        setLoading(false);
        throw err;
      }
    },
    [clearError, t]
  );

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      clearError();
      setLoading(true);
      try {
        await fbSignUpWithEmail(email, password, displayName);
        // onAuthStateChange fires → syncProfile creates doc
      } catch (err) {
        const key = getFirebaseErrorKey(err);
        setError(t(key));
        setLoading(false);
        throw err;
      }
    },
    [clearError, t]
  );

  const signOut = useCallback(async () => {
    clearError();
    try {
      await fbSignOut();
      setUser(null);
      removeAuthCookie();
    } catch (err) {
      const key = getFirebaseErrorKey(err);
      setError(t(key));
    }
  }, [clearError, t]);

  const signInWithGoogle = useCallback(async () => {
    clearError();
    setLoading(true);
    try {
      await fbSignInWithGoogle();
      // onAuthStateChange handles the rest
    } catch (err) {
      const key = getFirebaseErrorKey(err);
      setError(t(key));
      setLoading(false);
      throw err;
    }
  }, [clearError, t]);

  /* ---------- Render ---------- */

  const value: AuthContextValue = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>.");
  }
  return ctx;
}
