/**
 * Gamification type definitions.
 *
 * All gamification state lives in a single Firestore document
 * at `gamification/{uid}`. Badge definitions are constants in
 * src/lib/constants/badges.ts — they are NOT stored in Firestore.
 */

/* ------------------------------------------------------------------ */
/*  Badge definition                                                   */
/* ------------------------------------------------------------------ */

export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export type BadgeCriteria =
  | { type: "lessons_completed"; count: number }
  | { type: "module_completed"; moduleId: string }
  | { type: "campus_completed"; campusId: string }
  | { type: "perfect_quizzes"; count: number }
  | { type: "streak_days"; days: number }
  | { type: "first_login" }
  | { type: "exercise_completed"; count: number }
  | { type: "speed_learner"; minutesUnder: number; moduleId: string }
  | { type: "exam_passed"; examId: string }
  | { type: "all_badges_earned" };

export interface Badge {
  id: string;
  name: { es: string; en: string };
  description: { es: string; en: string };
  icon: string;
  rarity: BadgeRarity;
  points: number;
  criteria: BadgeCriteria;
}

/* ------------------------------------------------------------------ */
/*  Earned badge record                                                */
/* ------------------------------------------------------------------ */

export interface EarnedBadge {
  badgeId: string;
  earnedAt: string; // ISO-8601
}

/* ------------------------------------------------------------------ */
/*  Gamification state (per user, stored in Firestore)                 */
/* ------------------------------------------------------------------ */

export interface UserGamification {
  uid: string;
  totalPoints: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // "YYYY-MM-DD"
  earnedBadges: EarnedBadge[];
  quizStats: {
    totalAttempts: number;
    correctOnFirstTry: number;
    perfectQuizzes: number; // quiz IDs where first attempt was correct
  };
  /** Quiz IDs answered correctly on first try — prevents double-counting. */
  correctQuizIds: string[];
  /** Exercise IDs marked as completed — idempotent tracking. */
  completedExerciseIds: string[];
}

/* ------------------------------------------------------------------ */
/*  Level definition                                                   */
/* ------------------------------------------------------------------ */

export interface LevelInfo {
  level: number;
  minPoints: number;
  title: { es: string; en: string };
  nextLevelPoints: number; // min points for next level (Infinity for max)
}

/* ------------------------------------------------------------------ */
/*  Leaderboard entry                                                  */
/* ------------------------------------------------------------------ */

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  totalPoints: number;
  level: number;
  badgeCount: number;
  rank: number;
}
