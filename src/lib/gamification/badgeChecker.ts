/**
 * Badge checker — evaluates all unearned badges against user state
 * and awards any that are newly met criteria.
 */

import type { Badge, BadgeCriteria, EarnedBadge } from "@/types/gamification";
import { BADGES } from "@/lib/constants/badges";
import { getModulesForCampus } from "@/lib/constants/campuses";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc, arrayUnion, type DocumentData, type UpdateData } from "firebase/firestore";

/* ------------------------------------------------------------------ */
/*  Context passed after each key event                                */
/* ------------------------------------------------------------------ */

export interface BadgeCheckContext {
  totalLessonsCompleted: number;
  completedModuleIds: string[];
  /** Quiz IDs where the user answered correctly on first try */
  perfectQuizIds: string[];
  exerciseCompletedCount: number;
  currentStreak: number;
  /** Speed data: moduleId → minutes taken to complete */
  moduleCompletionTimes?: Record<string, number>;
  /** Exam IDs the user has passed (populated from the exam flow). */
  passedExamIds?: string[];
}

/* ------------------------------------------------------------------ */
/*  Check and award                                                    */
/* ------------------------------------------------------------------ */

export async function checkAndAwardBadges(
  uid: string,
  context: BadgeCheckContext
): Promise<Badge[]> {
  if (!db) return [];

  // Load current gamification state
  const ref = doc(db, "gamification", uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? (snap.data() as Record<string, unknown>) : null;

  const earnedIds: string[] = Array.isArray(data?.["earnedBadges"])
    ? (data?.["earnedBadges"] as EarnedBadge[]).map((b) => b.badgeId)
    : [];

  const currentPoints: number = (data?.["totalPoints"] as number) ?? 0;

  const newlyEarned: Badge[] = [];
  const updates: Record<string, unknown> = {};
  let pointsToAdd = 0;
  const newEarned: EarnedBadge[] = [];

  for (const badge of BADGES) {
    if (earnedIds.includes(badge.id)) continue;
    if (!meetsCriteria(badge.criteria, context)) continue;

    const earnedAt = new Date().toISOString();
    newEarned.push({ badgeId: badge.id, earnedAt });
    earnedIds.push(badge.id);
    pointsToAdd += badge.points;
    newlyEarned.push(badge);
  }

  if (newlyEarned.length === 0) return [];

  // Write to Firestore
  updates.earnedBadges = arrayUnion(...newEarned);
  if (pointsToAdd > 0) {
    updates.totalPoints = currentPoints + pointsToAdd;
  }

  await updateDoc(ref, updates as UpdateData<DocumentData>).catch(() => {
    // Create the doc if it doesn't exist yet
  });

  // Also update level — handled by the useGamification hook on next fetch
  return newlyEarned;
}

/* ------------------------------------------------------------------ */
/*  Criteria evaluator                                                 */
/* ------------------------------------------------------------------ */

function meetsCriteria(criteria: BadgeCriteria, ctx: BadgeCheckContext): boolean {
  switch (criteria.type) {
    case "lessons_completed":
      return ctx.totalLessonsCompleted >= criteria.count;

    case "module_completed":
      return ctx.completedModuleIds.includes(criteria.moduleId);

    case "campus_completed": {
      const moduleIds = getModulesForCampus(criteria.campusId);
      return moduleIds.length > 0 && moduleIds.every((id) => ctx.completedModuleIds.includes(id));
    }

    case "perfect_quizzes":
      return ctx.perfectQuizIds.length >= criteria.count;

    case "streak_days":
      return ctx.currentStreak >= criteria.days;

    case "first_login":
      return true; // Always true when checking

    case "exercise_completed":
      return ctx.exerciseCompletedCount >= criteria.count;

    case "speed_learner":
      if (!ctx.moduleCompletionTimes) return false;
      const time = ctx.moduleCompletionTimes[criteria.moduleId];
      return time !== undefined && time < criteria.minutesUnder;

    case "exam_passed":
      return ctx.passedExamIds?.includes(criteria.examId) ?? false;

    default:
      return false;
  }
}
