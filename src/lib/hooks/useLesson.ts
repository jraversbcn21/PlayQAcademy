"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  CURRICULUM,
  getModuleById,
  getLessonById,
} from "@/lib/constants/curriculum";
import type { LessonContent, LessonMeta } from "@/types/lesson";
import type { Badge } from "@/types/gamification";
import { getAllLessonsContent as getModule1Content } from "@/lib/constants/lessons/module-1";
import { getAllLessonsContent as getModule2Content } from "@/lib/constants/lessons/module-2";
import { getAllLessonsContent as getModule3Content } from "@/lib/constants/lessons/module-3";
import { getAllLessonsContent as getModule4Content } from "@/lib/constants/lessons/module-4";
import { getAllLessonsContent as getModule5Content } from "@/lib/constants/lessons/module-5";
import { getAllLessonsContent as getModule6Content } from "@/lib/constants/lessons/module-6";
import { getAllLessonsContent as getModule7Content } from "@/lib/constants/lessons/module-7";
import { getAllLessonsContent as getModule8Content } from "@/lib/constants/lessons/module-8";
import { getAllLessonsContent as getIstqbFundamentalsContent } from "@/lib/constants/lessons/istqb-fundamentals";
import { getAllLessonsContent as getIstqbSdlcContent } from "@/lib/constants/lessons/istqb-sdlc";
import { getAllLessonsContent as getIstqbStaticTestingContent } from "@/lib/constants/lessons/istqb-static-testing";
import { getAllLessonsContent as getIstqbTestAnalysisContent } from "@/lib/constants/lessons/istqb-test-analysis";
import { getAllLessonsContent as getIstqbManagementContent } from "@/lib/constants/lessons/istqb-management";
import { getAllLessonsContent as getIstqbToolsContent } from "@/lib/constants/lessons/istqb-tools";
import { updateUserProgress as fbUpdateProgress } from "@/lib/firebase/firestore";
import { updateDoc, setDoc, doc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { checkAndAwardBadges } from "@/lib/gamification/badgeChecker";
import { getLevelFromPoints } from "@/lib/gamification/levels";

/* ------------------------------------------------------------------ */
/*  Lesson registry (extend with new module imports)                    */
/* ------------------------------------------------------------------ */

/**
 * All authored lesson content keyed by "moduleId__lessonId".
 * Add new module content files here as they are written.
 */
const LESSON_REGISTRY: Record<string, LessonContent> = (() => {
  const all = [
    ...getModule1Content(),
    ...getModule2Content(),
    ...getModule3Content(),
    ...getModule4Content(),
    ...getModule5Content(),
    ...getModule6Content(),
    ...getModule7Content(),
    ...getModule8Content(),
    ...getIstqbFundamentalsContent(),
    ...getIstqbSdlcContent(),
    ...getIstqbStaticTestingContent(),
    ...getIstqbTestAnalysisContent(),
    ...getIstqbManagementContent(),
    ...getIstqbToolsContent(),
  ];
  const map: Record<string, LessonContent> = {};
  for (const lc of all) {
    map[`${lc.moduleId}__${lc.id}`] = lc;
  }
  return map;
})();

export function getLessonContent(
  moduleId: string,
  lessonId: string
): LessonContent | null {
  return LESSON_REGISTRY[`${moduleId}__${lessonId}`] ?? null;
}

/* ------------------------------------------------------------------ */
/*  useLesson                                                          */
/* ------------------------------------------------------------------ */

interface UseLessonResult {
  content: LessonContent | null;
  meta: LessonMeta | null;
  exists: boolean;
}

export function useLesson(
  moduleId: string,
  lessonId: string,
  lng: string
): UseLessonResult {
  return useMemo(() => {
    const mod = getModuleById(moduleId);
    const les = mod ? getLessonById(moduleId, lessonId) : null;
    const content = getLessonContent(moduleId, lessonId);
    const exists = !!mod && !!les && !!content;
    const _lngKey = lng === "es" ? "es" : "en";

    if (!mod || !les) {
      return { content: null, meta: null, exists: false };
    }

    const prevLessons = mod.lessons.slice(0, mod.lessons.indexOf(les));
    const lessonNumber = prevLessons.length + 1;

    const meta: LessonMeta = {
      id: les.id,
      moduleId: mod.id,
      moduleTitle: mod.title,
      title: les.title,
      description: les.description,
      estimatedMinutes: les.estimatedMinutes,
      lessonNumber,
      totalInModule: mod.lessons.length,
    };

    return { content, meta, exists };
  }, [moduleId, lessonId, lng]);
}

/* ------------------------------------------------------------------ */
/*  useLessonNavigation                                                */
/* ------------------------------------------------------------------ */

interface NavResult {
  prevLesson: { moduleId: string; lessonId: string } | null;
  nextLesson: { moduleId: string; lessonId: string } | null;
}

export function useLessonNavigation(
  moduleId: string,
  lessonId: string
): NavResult {
  return useMemo(() => {
    const mod = CURRICULUM.find((m) => m.id === moduleId);
    if (!mod) return { prevLesson: null, nextLesson: null };

    const idx = mod.lessons.findIndex((l) => l.id === lessonId);
    if (idx === -1) return { prevLesson: null, nextLesson: null };

    let prev: { moduleId: string; lessonId: string } | null = null;
    let next: { moduleId: string; lessonId: string } | null = null;

    // Previous: same module if not first, else last lesson of previous module
    if (idx > 0) {
      const pl = mod.lessons[idx - 1];
      if (pl) prev = { moduleId, lessonId: pl.id };
    } else {
      const prevMod = CURRICULUM.find((m) => m.order === mod.order - 1);
      if (prevMod && prevMod.lessons.length > 0) {
        const last = prevMod.lessons[prevMod.lessons.length - 1];
        if (last) prev = { moduleId: prevMod.id, lessonId: last.id };
      }
    }

    // Next: same module if not last, else first lesson of next module
    if (idx < mod.lessons.length - 1) {
      const nl = mod.lessons[idx + 1];
      if (nl) next = { moduleId, lessonId: nl.id };
    } else {
      const nextMod = CURRICULUM.find((m) => m.order === mod.order + 1);
      if (nextMod && nextMod.lessons.length > 0) {
        const first = nextMod.lessons[0];
        if (first) next = { moduleId: nextMod.id, lessonId: first.id };
      }
    }

    return { prevLesson: prev, nextLesson: next };
  }, [moduleId, lessonId]);
}

/* ------------------------------------------------------------------ */
/*  markLessonComplete                                                 */
/* ------------------------------------------------------------------ */

export interface MarkCompleteResult {
  newBadges: Badge[];
  levelChanged: boolean;
  oldLevel: number;
  newLevel: number;
  totalPoints: number;
}

export async function markLessonComplete(
  uid: string,
  moduleId: string,
  lessonId: string,
  totalLessonsCompleted: number,
  completedModuleIds: string[],
  perfectQuizIds: string[],
  exerciseCompletedCount: number,
  currentStreak: number
): Promise<MarkCompleteResult> {
  // Update progress in Firestore
  await fbUpdateProgress(uid, moduleId, lessonId, true);

  // Award 10 points via gamification doc
  let oldLevel = 1;
  let totalPoints = 0;
  if (db) {
    const gRef = doc(db, "gamification", uid);
    const gSnap = await getDoc(gRef).catch(() => null);
    if (gSnap?.exists()) {
      const d = gSnap.data() as Record<string, unknown>;
      totalPoints = ((d["totalPoints"] as number) ?? 0) + 10;
      oldLevel = (d["level"] as number) ?? 1;
      await updateDoc(gRef, { totalPoints, level: getLevelFromPoints(totalPoints).level }).catch(() => {});
    } else {
      totalPoints = 10;
      await setDoc(gRef, {
        uid, totalPoints, level: 1, currentStreak, longestStreak: Math.max(currentStreak, 1),
        lastActivityDate: new Date().toISOString().slice(0, 10),
        earnedBadges: [],
        quizStats: { totalAttempts: 0, correctOnFirstTry: 0, perfectQuizzes: 0 },
        correctQuizIds: [],
        completedExerciseIds: [],
      }).catch(() => {});
    }
  }

  const newLevel = getLevelFromPoints(totalPoints).level;

  // Run badge checker
  const newBadges = await checkAndAwardBadges(uid, {
    totalLessonsCompleted,
    completedModuleIds,
    perfectQuizIds,
    exerciseCompletedCount,
    currentStreak,
  });

  return {
    newBadges,
    levelChanged: newLevel > oldLevel,
    oldLevel,
    newLevel,
    totalPoints,
  };
}

/* ------------------------------------------------------------------ */
/*  toggleBookmark                                                     */
/* ------------------------------------------------------------------ */

export async function toggleBookmark(
  uid: string,
  moduleId: string,
  lessonId: string,
  currentlyBookmarked: boolean
): Promise<void> {
  if (!db) return;

  const ref = doc(db, "users", uid);
  const bookmarkValue = `${moduleId}__${lessonId}`;

  if (currentlyBookmarked) {
    await updateDoc(ref, {
      bookmarks: arrayRemove(bookmarkValue),
    }).catch(() => {});
  } else {
    await updateDoc(ref, {
      bookmarks: arrayUnion(bookmarkValue),
    }).catch(() => {});
  }
}

/* ------------------------------------------------------------------ */
/*  Bookmark hook                                                      */
/* ------------------------------------------------------------------ */

export function useBookmarked(
  uid: string | undefined,
  moduleId: string,
  lessonId: string
): { bookmarked: boolean; toggle: () => void; loading: boolean } {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: fetch bookmarks from user profile in Firestore
    setBookmarked(false);
  }, [uid, moduleId, lessonId]);

  const toggle = useCallback(async () => {
    if (!uid) return;
    setLoading(true);
    await toggleBookmark(uid, moduleId, lessonId, bookmarked);
    setBookmarked((prev) => !prev);
    setLoading(false);
  }, [uid, moduleId, lessonId, bookmarked]);

  return { bookmarked, toggle, loading };
}
