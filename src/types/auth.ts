/**
 * Shared type definitions for the authentication and user domain.
 */

export type UserRole = "student" | "admin";
export type UserLanguage = "es" | "en";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  language: UserLanguage;
  createdAt: string;  // ISO-8601
  lastLoginAt: string; // ISO-8601
  totalPoints: number;
  badges: string[];
}

export interface ModuleProgress {
  moduleId: string;
  completedLessons: string[];
  percentComplete: number;
  unlockedAt: Date | null;
}

export interface UserProgress {
  userId: string;
  modules: Record<string, ModuleProgress>;
}

/** Initial values used when a profile document does not exist yet. */
export const DEFAULT_USER_PROFILE: Omit<UserProfile, "uid" | "email" | "displayName" | "photoURL"> = {
  role: "student",
  language: "es",
  createdAt: new Date().toISOString(),
  lastLoginAt: new Date().toISOString(),
  totalPoints: 0,
  badges: [],
};
