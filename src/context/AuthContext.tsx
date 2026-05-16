"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { useTranslation } from "@/lib/i18n/client";
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
/*  Debug logging (development only)                                    */
/* ------------------------------------------------------------------ */

const isDev = typeof process !== "undefined" && process.env.NODE_ENV === "development";

function log(msg: string): void {
  if (isDev) console.log(`[Auth] ${msg}`);
}

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
  initialized: boolean;
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

export function AuthProvider({ children, lng: _lng }: AuthProviderProps) {
  const { t } = useTranslation("common");

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  const clearError = useCallback(() => setError(null), []);

  /**
   * Convert a Firebase User into a full UserProfile.
   * Profile sync is NON-BLOCKING: if Firestore fails we return a basic
   * UserProfile built from the Firebase User directly, so the UI never
   * stalls waiting for Firestore.
   */
  const syncProfile = useCallback(
    async (fbUser: User): Promise<UserProfile> => {
      try {
        let profile = await getUserProfile(fbUser.uid);

        if (!profile) {
          log(`Profile not found for ${fbUser.uid}, creating...`);
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
          log("Profile created successfully");
        } else {
          // Returning user: update lastLoginAt (fire-and-forget)
          updateLastLogin(fbUser.uid).catch(() => {
            /* non-critical */
          });
          log(`Profile found for ${fbUser.uid}, returning user`);
        }

        return profile;
      } catch (err) {
        // If Firestore fails, return a basic profile from Firebase data
        log(`Profile sync failed, using fallback: ${String(err)}`);
        return {
          uid: fbUser.uid,
          email: fbUser.email,
          displayName: fbUser.displayName,
          photoURL: fbUser.photoURL,
          role: "student",
          language: "es",
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          totalPoints: 0,
          badges: [],
        };
      }
    },
    []
  );

  /* ---------- Auth state listener ---------- */

  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      setInitialized(true);
      return;
    }

    const unsubscribe = onAuthStateChange(async (fbUser) => {
      log(`onAuthStateChanged fired: ${fbUser ? fbUser.uid : "no user"}`);
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
        // syncProfile already handles its own errors, but belt-and-suspenders
        log(`Unhandled error in auth listener: ${String(err)}`);
        setError(t(getFirebaseErrorKey(err)));
      } finally {
        setLoading(false);
        setInitialized(true);
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

  const signOut = useCallback(async () => {
    clearError();
    try {
      log("Sign-out requested");
      await fbSignOut();
      setUser(null);
      removeAuthCookie();
      log("Sign-out completed");
    } catch (err) {
      const key = getFirebaseErrorKey(err);
      setError(t(key));
    }
  }, [clearError, t]);

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

  /* ---------- Safety timeout (prevents infinite spinners) ---------- */

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading && typeof window !== "undefined") {
      // If loading persists for more than 15 seconds, force-reset
      timeoutRef.current = setTimeout(() => {
        if (loading) {
          log("Safety timeout: forcing loading=false after 15s");
          setLoading(false);
          setInitialized(true);
          setError(t("auth.errors.default"));
        }
      }, 15000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loading, t]);

  /* ---------- Render ---------- */

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
