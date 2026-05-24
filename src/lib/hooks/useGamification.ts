"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { Badge, EarnedBadge, UserGamification, LeaderboardEntry } from "@/types/gamification";
import { BADGES, BADGES_BY_ID } from "@/lib/constants/badges";
import { getLevelFromPoints, getPointsToNextLevel, getLevelProgress } from "@/lib/gamification/levels";
import { checkAndAwardBadges, type BadgeCheckContext } from "@/lib/gamification/badgeChecker";
import { getUserProgress } from "@/lib/firebase/firestore";
import { db } from "@/lib/firebase/config";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface UseGamificationResult {
  data: UserGamification | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  awardPoints: (amount: number, reason: string) => Promise<void>;
  recordActivity: () => Promise<void>;
  getEarnedBadges: () => Badge[];
  getUnearnedBadges: () => Badge[];
  levelInfo: ReturnType<typeof getLevelFromPoints> | null;
  pointsToNext: number;
  levelProgress: number;
}

/* ------------------------------------------------------------------ */
/*  Default gamification state                                         */
/* ------------------------------------------------------------------ */

function defaultGamification(uid: string): UserGamification {
  return {
    uid,
    totalPoints: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: "",
    earnedBadges: [],
    quizStats: { totalAttempts: 0, correctOnFirstTry: 0, perfectQuizzes: 0 },
    correctQuizIds: [],
    completedExerciseIds: [],
  };
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------ */
/*  Standalone gamification actions                                     */
/* ------------------------------------------------------------------ */

export interface RecordQuizResult {
  newBadges: Badge[];
  pointsAwarded: number;
  totalPoints: number;
  levelChanged: boolean;
  oldLevel: number;
  newLevel: number;
}

export interface RecordExerciseResult {
  newBadges: Badge[];
  pointsAwarded: number;
  totalPoints: number;
  levelChanged: boolean;
  oldLevel: number;
  newLevel: number;
}

/** Record a quiz answer and check for badges. */
export async function recordQuizAnswer(
  uid: string,
  params: {
    quizId: string;
    moduleId: string;
    correct: boolean;
    firstTry: boolean;
    displayName?: string;
    photoURL?: string;
  },
): Promise<RecordQuizResult> {
  if (!db) return { newBadges: [], pointsAwarded: 0, totalPoints: 0, levelChanged: false, oldLevel: 1, newLevel: 1 };

  try {
    const ref = doc(db, "gamification", uid);
    const snap = await getDoc(ref);

    let correctQuizIds: string[];
    let completedExerciseIds: string[];
    let quizStats: { totalAttempts: number; correctOnFirstTry: number; perfectQuizzes: number };
    let totalPoints: number;
    let currentLevel: number;
    let currentStreak: number;
    let earnedBadges: EarnedBadge[];

    if (snap.exists()) {
      const d = snap.data() as Record<string, unknown>;
      correctQuizIds = (d["correctQuizIds"] as string[]) ?? [];
      completedExerciseIds = (d["completedExerciseIds"] as string[]) ?? [];
      const qs = d["quizStats"] as Record<string, number> | undefined;
      quizStats = {
        totalAttempts: qs?.["totalAttempts"] ?? 0,
        correctOnFirstTry: qs?.["correctOnFirstTry"] ?? 0,
        perfectQuizzes: qs?.["perfectQuizzes"] ?? 0,
      };
      totalPoints = (d["totalPoints"] as number) ?? 0;
      currentLevel = (d["level"] as number) ?? 1;
      currentStreak = (d["currentStreak"] as number) ?? 0;
      earnedBadges = (d["earnedBadges"] as EarnedBadge[]) ?? [];
    } else {
      correctQuizIds = [];
      completedExerciseIds = [];
      quizStats = { totalAttempts: 0, correctOnFirstTry: 0, perfectQuizzes: 0 };
      totalPoints = 0;
      currentLevel = 1;
      currentStreak = 0;
      earnedBadges = [];
    }

    quizStats.totalAttempts++;

    let pointsAwarded = 0;

    if (params.correct && params.firstTry && !correctQuizIds.includes(params.quizId)) {
      correctQuizIds = [...correctQuizIds, params.quizId];
      quizStats.correctOnFirstTry++;
      quizStats.perfectQuizzes++;
      pointsAwarded = 5;
      totalPoints += pointsAwarded;
    }

    const newLevel = getLevelFromPoints(totalPoints).level;

    if (snap.exists()) {
      await updateDoc(ref, {
        quizStats,
        correctQuizIds,
        completedExerciseIds,
        totalPoints,
        level: newLevel,
        ...(params.displayName ? { displayName: params.displayName } : {}),
        ...(params.photoURL ? { photoURL: params.photoURL } : {}),
      }).catch(() => {});
    } else {
      await setDoc(ref, {
        ...defaultGamification(uid),
        quizStats,
        correctQuizIds,
        completedExerciseIds,
        totalPoints,
        level: newLevel,
        ...(params.displayName ? { displayName: params.displayName } : {}),
        ...(params.photoURL ? { photoURL: params.photoURL } : {}),
      }).catch(() => {});
    }

    const progress = await getUserProgress(uid);
    let totalLessonsCompleted = 0;
    const completedModuleIds: string[] = [];
    if (progress) {
      for (const [, mp] of Object.entries(progress.modules)) {
        totalLessonsCompleted += mp.completedLessons.length;
        if (mp.completedLessons.length > 0) {
          const moduleFromCurriculum = mp.moduleId || "";
          completedModuleIds.push(moduleFromCurriculum);
        }
      }
    }

    const badgeContext: BadgeCheckContext = {
      totalLessonsCompleted,
      completedModuleIds,
      perfectQuizIds: correctQuizIds,
      exerciseCompletedCount: completedExerciseIds.length,
      currentStreak,
    };

    const newBadges = await checkAndAwardBadges(uid, badgeContext);

    return {
      newBadges,
      pointsAwarded,
      totalPoints,
      levelChanged: newLevel > currentLevel,
      oldLevel: currentLevel,
      newLevel,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[recordQuizAnswer] Firestore error (non-blocking):", err);
    }
    return { newBadges: [], pointsAwarded: 0, totalPoints: 0, levelChanged: false, oldLevel: 1, newLevel: 1 };
  }
}

/** Mark an exercise as completed and check for badges. */
export async function recordExerciseCompleted(
  uid: string,
  params: {
    exerciseId: string;
    moduleId: string;
    displayName?: string;
    photoURL?: string;
  },
): Promise<RecordExerciseResult> {
  if (!db) return { newBadges: [], pointsAwarded: 0, totalPoints: 0, levelChanged: false, oldLevel: 1, newLevel: 1 };

  try {
    const ref = doc(db, "gamification", uid);
    const snap = await getDoc(ref);

    let correctQuizIds: string[];
    let completedExerciseIds: string[];
    let quizStats: { totalAttempts: number; correctOnFirstTry: number; perfectQuizzes: number };
    let totalPoints: number;
    let currentLevel: number;
    let currentStreak: number;
    let earnedBadges: EarnedBadge[];

    if (snap.exists()) {
      const d = snap.data() as Record<string, unknown>;
      correctQuizIds = (d["correctQuizIds"] as string[]) ?? [];
      completedExerciseIds = (d["completedExerciseIds"] as string[]) ?? [];
      const qs = d["quizStats"] as Record<string, number> | undefined;
      quizStats = {
        totalAttempts: qs?.["totalAttempts"] ?? 0,
        correctOnFirstTry: qs?.["correctOnFirstTry"] ?? 0,
        perfectQuizzes: qs?.["perfectQuizzes"] ?? 0,
      };
      totalPoints = (d["totalPoints"] as number) ?? 0;
      currentLevel = (d["level"] as number) ?? 1;
      currentStreak = (d["currentStreak"] as number) ?? 0;
      earnedBadges = (d["earnedBadges"] as EarnedBadge[]) ?? [];
    } else {
      correctQuizIds = [];
      completedExerciseIds = [];
      quizStats = { totalAttempts: 0, correctOnFirstTry: 0, perfectQuizzes: 0 };
      totalPoints = 0;
      currentLevel = 1;
      currentStreak = 0;
      earnedBadges = [];
    }

    let pointsAwarded = 0;

    if (!completedExerciseIds.includes(params.exerciseId)) {
      completedExerciseIds = [...completedExerciseIds, params.exerciseId];
      pointsAwarded = 15;
      totalPoints += pointsAwarded;
    }

    const newLevel = getLevelFromPoints(totalPoints).level;

    if (snap.exists()) {
      await updateDoc(ref, {
        quizStats,
        correctQuizIds,
        completedExerciseIds,
        totalPoints,
        level: newLevel,
        ...(params.displayName ? { displayName: params.displayName } : {}),
        ...(params.photoURL ? { photoURL: params.photoURL } : {}),
      }).catch(() => {});
    } else {
      await setDoc(ref, {
        ...defaultGamification(uid),
        quizStats,
        correctQuizIds,
        completedExerciseIds,
        totalPoints,
        level: newLevel,
        ...(params.displayName ? { displayName: params.displayName } : {}),
        ...(params.photoURL ? { photoURL: params.photoURL } : {}),
      }).catch(() => {});
    }

    const progress = await getUserProgress(uid);
    let totalLessonsCompleted = 0;
    const completedModuleIds: string[] = [];
    if (progress) {
      for (const [, mp] of Object.entries(progress.modules)) {
        totalLessonsCompleted += mp.completedLessons.length;
        if (mp.completedLessons.length > 0) {
          completedModuleIds.push(mp.moduleId || "");
        }
      }
    }

    const badgeContext: BadgeCheckContext = {
      totalLessonsCompleted,
      completedModuleIds,
      perfectQuizIds: correctQuizIds,
      exerciseCompletedCount: completedExerciseIds.length,
      currentStreak,
    };

    const newBadges = await checkAndAwardBadges(uid, badgeContext);

    return {
      newBadges,
      pointsAwarded,
      totalPoints,
      levelChanged: newLevel > currentLevel,
      oldLevel: currentLevel,
      newLevel,
    };
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[recordExerciseCompleted] Firestore error (non-blocking):", err);
    }
    return { newBadges: [], pointsAwarded: 0, totalPoints: 0, levelChanged: false, oldLevel: 1, newLevel: 1 };
  }
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useGamification(uid: string | undefined): UseGamificationResult {
  const [data, setData] = useState<UserGamification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => setFetchKey((k) => k + 1), []);

  useEffect(() => {
    if (!uid || !db) {
      setLoading(false);
      setData(null);
      return;
    }

    let cancelled = false;
    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        const ref = doc(db!, "gamification", uid!);
        const snap = await getDoc(ref);
        if (!cancelled) {
          if (snap.exists()) {
            const d = snap.data() as DocumentData;
            setData(d as UserGamification);
          } else {
            setData(defaultGamification(uid!));
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load gamification");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch();
    return () => { cancelled = true; };
  }, [uid, fetchKey]);

  /* ---------- Award points ---------- */

  const awardPoints = useCallback(
    async (amount: number, _reason: string) => {
      if (!uid || !db || amount <= 0) return;
      const ref = doc(db, "gamification", uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        const initial = { ...defaultGamification(uid), totalPoints: amount, level: getLevelFromPoints(amount).level };
        await setDoc(ref, initial);
      } else {
        const current = (snap.data() as DocumentData)["totalPoints"] as number ?? 0;
        const newTotal = current + amount;
        const newLevel = getLevelFromPoints(newTotal).level;
        await updateDoc(ref, { totalPoints: newTotal, level: newLevel });
      }
      refetch();
    },
    [uid, refetch]
  );

  /* ---------- Record activity (streak) ---------- */

  const recordActivity = useCallback(async () => {
    if (!uid || !db) return;
    const ref = doc(db, "gamification", uid);
    const snap = await getDoc(ref);
    const today = todayStr();

    if (!snap.exists()) {
      await setDoc(ref, {
        ...defaultGamification(uid),
        lastActivityDate: today,
        currentStreak: 1,
        longestStreak: 1,
      });
    } else {
      const d = snap.data() as DocumentData;
      const lastDate = (d["lastActivityDate"] as string) ?? "";
      const currentStreak = (d["currentStreak"] as number) ?? 0;
      const longestStreak = (d["longestStreak"] as number) ?? 0;

      if (lastDate === today) {
        // Already recorded today — do nothing
        return;
      }

      let newStreak: number;
      if (lastDate === yesterdayStr()) {
        newStreak = currentStreak + 1;
      } else {
        newStreak = 1; // Reset
      }

      await updateDoc(ref, {
        lastActivityDate: today,
        currentStreak: newStreak,
        longestStreak: Math.max(longestStreak, newStreak),
      });
    }
    refetch();
  }, [uid, refetch]);

  /* ---------- Badge accessors ---------- */

  const getEarnedBadges = useCallback((): Badge[] => {
    if (!data) return [];
    return data.earnedBadges
      .map((eb) => BADGES_BY_ID[eb.badgeId])
      .filter((b): b is Badge => !!b);
  }, [data]);

  const getUnearnedBadges = useCallback((): Badge[] => {
    if (!data) return BADGES;
    const earned = new Set(data.earnedBadges.map((eb) => eb.badgeId));
    return BADGES.filter((b) => !earned.has(b.id));
  }, [data]);

  /* ---------- Derived level info ---------- */

  const levelInfo = useMemo(
    () => (data ? getLevelFromPoints(data.totalPoints) : null),
    [data]
  );
  const pointsToNext = useMemo(
    () => (data ? getPointsToNextLevel(data.totalPoints) : 0),
    [data]
  );
  const levelProgress = useMemo(
    () => (data ? getLevelProgress(data.totalPoints) : 0),
    [data]
  );

  return {
    data,
    loading,
    error,
    refetch,
    awardPoints,
    recordActivity,
    getEarnedBadges,
    getUnearnedBadges,
    levelInfo,
    pointsToNext,
    levelProgress,
  };
}

/* ------------------------------------------------------------------ */
/*  Leaderboard query (standalone, not part of the hook)               */
/* ------------------------------------------------------------------ */

export async function fetchLeaderboard(
  pageSize = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ entries: LeaderboardEntry[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
  if (!db) return { entries: [], lastVisible: null };

  let q = query(
    collection(db, "gamification"),
    orderBy("totalPoints", "desc"),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(
      collection(db, "gamification"),
      orderBy("totalPoints", "desc"),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  const snap = await getDocs(q);
  const entries: LeaderboardEntry[] = [];

  snap.forEach((docSnap) => {
    const d = docSnap.data();
    entries.push({
      uid: docSnap.id,
      displayName: typeof d["displayName"] === "string" && d["displayName"].trim()
        ? (d["displayName"] as string)
        : "Anonymous",
      photoURL: (d["photoURL"] as string | null) ?? null,
      totalPoints: (d["totalPoints"] as number) ?? 0,
      level: (d["level"] as number) ?? 1,
      badgeCount: Array.isArray(d["earnedBadges"]) ? (d["earnedBadges"] as unknown[]).length : 0,
      rank: 0,
    });
  });

  // Assign ranks
  entries.forEach((e, i) => {
    e.rank = (lastDoc ? 0 : 0) + i + 1;
  });

  const lastVisible = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] ?? null : null;

  return { entries, lastVisible };
}
