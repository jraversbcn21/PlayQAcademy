/**
 * Firestore helpers for user profiles and progress.
 *
 * All writes go through Firestore security rules; this module only
 * provides typed CRUD wrappers so the rest of the app never touches
 * raw DocumentData.
 */

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  type Firestore,
  type DocumentData,
} from "firebase/firestore";
import type { UserProfile, UserProgress, ModuleProgress } from "@/types/auth";
import { db } from "./config";

function requireDb(): Firestore {
  if (!db) {
    throw new Error(
      "[Firestore] Not initialised — check NEXT_PUBLIC_FIREBASE_* env vars."
    );
  }
  return db;
}

/* ------------------------------------------------------------------ */
/*  User Profile                                                       */
/* ------------------------------------------------------------------ */

interface CreateProfileData {
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

/** Create a user profile document on first sign-up / first Google sign-in. */
export async function createUserProfile(
  uid: string,
  data: CreateProfileData
): Promise<void> {
  const firestore = requireDb();
  const ref = doc(firestore, "users", uid);
  const now = new Date().toISOString();

  await setDoc(ref, {
    uid,
    email: data.email,
    displayName: data.displayName,
    photoURL: data.photoURL,
    role: "student",
    language: "es",
    createdAt: now,
    lastLoginAt: now,
    totalPoints: 0,
    badges: [],
  });
}

/** Fetch a user profile by UID. Returns null if the document does not exist. */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const firestore = requireDb();
  const ref = doc(firestore, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const d = snap.data() as DocumentData;
  return {
    uid: d["uid"] as string,
    email: (d["email"] as string | undefined) ?? null,
    displayName: (d["displayName"] as string | undefined) ?? null,
    photoURL: (d["photoURL"] as string | undefined) ?? null,
    role: (d["role"] as "student" | "admin" | undefined) ?? "student",
    language: (d["language"] as "es" | "en" | undefined) ?? "es",
    createdAt: d["createdAt"] as string,
    lastLoginAt: d["lastLoginAt"] as string,
    totalPoints: (d["totalPoints"] as number | undefined) ?? 0,
    badges: (d["badges"] as string[] | undefined) ?? [],
  };
}

/** Update the user's display name in their Firestore profile document. */
export async function updateUserDisplayName(
  uid: string,
  displayName: string
): Promise<void> {
  const firestore = requireDb();
  const ref = doc(firestore, "users", uid);
  await updateDoc(ref, { displayName });
}

/** Update displayName (and optionally photoURL) in the gamification doc so the leaderboard stays in sync. */
export async function updateGamificationDisplayName(
  uid: string,
  displayName: string,
  photoURL?: string | null
): Promise<void> {
  const firestore = requireDb();
  const ref = doc(firestore, "gamification", uid);
  if (photoURL !== undefined) {
    await updateDoc(ref, { displayName, photoURL }).catch(() => {});
  } else {
    await updateDoc(ref, { displayName }).catch(() => {});
  }
}

/** Update lastLoginAt timestamp on every sign-in. */
export async function updateLastLogin(uid: string): Promise<void> {
  const firestore = requireDb();
  const ref = doc(firestore, "users", uid);
  await updateDoc(ref, { lastLoginAt: new Date().toISOString() });
}

/* ------------------------------------------------------------------ */
/*  User Progress                                                      */
/* ------------------------------------------------------------------ */

/** Mark or unmark a lesson as completed for a given module. */
export async function updateUserProgress(
  uid: string,
  moduleId: string,
  lessonId: string,
  completed: boolean
): Promise<void> {
  const firestore = requireDb();
  const ref = doc(firestore, "progress", uid);

  // Use arrayUnion/arrayRemove with a merge write so concurrent or
  // rapid-fire completions can't clobber each other via a stale
  // read-modify-write race on the `modules` map.
  await setDoc(
    ref,
    {
      userId: uid,
      modules: {
        [moduleId]: {
          moduleId,
          completedLessons: completed ? arrayUnion(lessonId) : arrayRemove(lessonId),
          updatedAt: new Date().toISOString(),
        },
      },
    },
    { merge: true }
  );
}

/** Fetch the full progress document for a user. */
export async function getUserProgress(
  uid: string
): Promise<UserProgress | null> {
  const firestore = requireDb();
  const ref = doc(firestore, "progress", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const d = snap.data() as DocumentData;
  const rawModules = (d["modules"] ?? {}) as Record<string, Partial<ModuleProgress>>;

  const modules: Record<string, ModuleProgress> = {};
  for (const [key, val] of Object.entries(rawModules)) {
    modules[key] = {
      moduleId: val.moduleId ?? key,
      completedLessons: val.completedLessons ?? [],
      percentComplete: val.percentComplete ?? 0,
      unlockedAt: val.unlockedAt ? new Date(val.unlockedAt as unknown as string) : null,
      updatedAt: (val.updatedAt as unknown as string) ?? null,
    };
  }

  return {
    userId: (d["userId"] as string) ?? uid,
    modules,
  };
}
