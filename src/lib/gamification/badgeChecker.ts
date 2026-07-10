/**
 * Badge checker — evaluates all unearned badges against user state
 * and awards any that are newly met criteria.
 */

import type { Badge, BadgeCriteria, EarnedBadge } from "@/types/gamification";
import { BADGES } from "@/lib/constants/badges";
import { getModulesForCampus } from "@/lib/constants/campuses";
import { db } from "@/lib/firebase/config";
import { doc, getDoc, updateDoc, setDoc, arrayUnion, type DocumentData, type UpdateData } from "firebase/firestore";

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
  /** Lessons completed today (local date) — populated by markLessonComplete. */
  lessonsCompletedToday?: number;
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
    if (!meetsCriteria(badge.criteria, context, earnedIds)) continue;

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

  try {
    await updateDoc(ref, updates as UpdateData<DocumentData>);
  } catch {
    // updateDoc rejects if the doc doesn't exist yet — create it instead.
    try {
      await setDoc(
        ref,
        { uid, earnedBadges: arrayUnion(...newEarned), totalPoints: currentPoints + pointsToAdd },
        { merge: true }
      );
    } catch {
      // Persist failed for real: don't report badges the user won't have —
      // every returned badge triggers a BadgeUnlockedModal upstream.
      return [];
    }
  }

  // Also update level — handled by the useGamification hook on next fetch
  return newlyEarned;
}

/* ------------------------------------------------------------------ */
/*  Criteria evaluator                                                 */
/* ------------------------------------------------------------------ */

function meetsCriteria(criteria: BadgeCriteria, ctx: BadgeCheckContext, earnedIds: string[]): boolean {
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
      // Global count, not campus-scoped. Only correct today because every
      // "exercise"-type lesson section in the entire curriculum (8) lives in
      // the Automation campus — see automation_master in badges.ts. If QA
      // Fundamentals or ISTQB ever add an "exercise" section, this criteria
      // must be re-scoped (campus_completed shows the pattern) before it
      // silently stops meaning "all of Automation's exercises".
      return ctx.exerciseCompletedCount >= criteria.count;

    case "lessons_in_one_day":
      return (ctx.lessonsCompletedToday ?? 0) >= criteria.count;

    case "exam_passed":
      return ctx.passedExamIds?.includes(criteria.examId) ?? false;

    case "all_badges_earned": {
      const otherBadgeIds = BADGES.filter((b) => b.criteria.type !== "all_badges_earned").map((b) => b.id);
      return otherBadgeIds.every((id) => earnedIds.includes(id));
    }

    default:
      return false;
  }
}
