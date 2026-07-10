"use client";

import { useMemo, useCallback, useState, useEffect } from "react";
import {
  CURRICULUM,
  getModuleById,
  getLessonById,
} from "@/lib/constants/curriculum";
import type { LessonContent, LessonMeta } from "@/types/lesson";
import type { Badge } from "@/types/gamification";
import { getLessonContent } from "@/lib/constants/lessons/registry";
import { updateUserProgress as fbUpdateProgress } from "@/lib/firebase/firestore";
import { updateDoc, setDoc, doc, arrayUnion, arrayRemove, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { checkAndAwardBadges } from "@/lib/gamification/badgeChecker";
import { getLevelFromPoints } from "@/lib/gamification/levels";
import { localDateStr } from "@/lib/utils/date";

export { getLessonContent };

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
  currentStreak: number
): Promise<MarkCompleteResult> {
  // Update progress in Firestore
  await fbUpdateProgress(uid, moduleId, lessonId, true);

  // Award 10 points via gamification doc
  let oldLevel = 1;
  let totalPoints = 0;
  let correctQuizIds: string[] = [];
  let completedExerciseIds: string[] = [];
  const today = localDateStr();
  let lessonsToday = 1;
  if (db) {
    const gRef = doc(db, "gamification", uid);
    const gSnap = await getDoc(gRef).catch(() => null);
    if (gSnap?.exists()) {
      const d = gSnap.data() as Record<string, unknown>;
      totalPoints = ((d["totalPoints"] as number) ?? 0) + 10;
      oldLevel = (d["level"] as number) ?? 1;
      correctQuizIds = (d["correctQuizIds"] as string[]) ?? [];
      completedExerciseIds = (d["completedExerciseIds"] as string[]) ?? [];
      lessonsToday = (d["lessonsTodayDate"] as string) === today
        ? ((d["lessonsToday"] as number) ?? 0) + 1
        : 1;
      await updateDoc(gRef, {
        totalPoints,
        level: getLevelFromPoints(totalPoints).level,
        lessonsToday,
        lessonsTodayDate: today,
      }).catch(() => {});
    } else {
      totalPoints = 10;
      await setDoc(gRef, {
        uid, totalPoints, level: 1, currentStreak, longestStreak: Math.max(currentStreak, 1),
        lastActivityDate: today,
        lessonsToday: 1,
        lessonsTodayDate: today,
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
    perfectQuizIds: correctQuizIds,
    exerciseCompletedCount: completedExerciseIds.length,
    currentStreak,
    lessonsCompletedToday: lessonsToday,
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
    if (!uid || !db) {
      setBookmarked(false);
      return;
    }

    let cancelled = false;
    const bookmarkValue = `${moduleId}__${lessonId}`;

    getDoc(doc(db, "users", uid))
      .then((snap) => {
        if (cancelled) return;
        const bookmarks = (snap.exists() ? (snap.data()["bookmarks"] as string[] | undefined) : undefined) ?? [];
        setBookmarked(bookmarks.includes(bookmarkValue));
      })
      .catch(() => {
        if (!cancelled) setBookmarked(false);
      });

    return () => {
      cancelled = true;
    };
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
