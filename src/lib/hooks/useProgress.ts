"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import type { ModuleProgress, UserProgress } from "@/types/auth";
import { getUserProgress } from "@/lib/firebase/firestore";
import { CURRICULUM, type CurriculumModule } from "@/lib/constants/curriculum";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type LessonStatus = "locked" | "available" | "completed";

export interface ModuleProgressInfo {
  module: CurriculumModule;
  progress: ModuleProgress | null;
  status: "locked" | "in_progress" | "completed";
  percentComplete: number;
  completedLessonCount: number;
  totalLessonCount: number;
}

export interface ProgressData {
  raw: UserProgress | null;
  modules: ModuleProgressInfo[];
  overallPercent: number;
  totalCompletedLessons: number;
}

interface UseProgressResult {
  progressData: ProgressData | null;
  loading: boolean;
  error: string | null;
  getModuleProgress: (moduleId: string) => ModuleProgressInfo | null;
  getLessonStatus: (moduleId: string, lessonId: string) => LessonStatus;
  calculateOverallProgress: () => number;
  isModuleUnlocked: (moduleId: string) => boolean;
}

/* ------------------------------------------------------------------ */
/*  Unlock logic                                                       */
/* ------------------------------------------------------------------ */

/**
 * Modules 1-3 are always unlocked.
 * Module N (N > 3) unlocks when the previous module (order N-1) is 100 % complete.
 */
function isModuleUnlocked(
  moduleOrder: number,
  progressDoc: UserProgress | null
): boolean {
  if (moduleOrder <= 3) return true;

  const prevModule = CURRICULUM.find((m) => m.order === moduleOrder - 1);
  if (!prevModule) return true;

  if (!progressDoc) return false;

  const prevProgress = progressDoc.modules[prevModule.id];
  if (!prevProgress) return false;

  const total = prevModule.lessons.length;
  const completed = prevProgress.completedLessons.length;
  return total > 0 && completed >= total;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useProgress(userId: string | undefined): UseProgressResult {
  const [rawProgress, setRawProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch progress from Firestore
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      setRawProgress(null);
      return;
    }

    let cancelled = false;

    async function fetch() {
      try {
        setLoading(true);
        setError(null);
        const data = await getUserProgress(userId!);
        if (!cancelled) {
          setRawProgress(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to load progress"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  /* ---------- Derived module progress ---------- */

  const moduleInfoList = useMemo<ModuleProgressInfo[]>(() => {
    return CURRICULUM.map((mod) => {
      const modProgress = rawProgress?.modules[mod.id] ?? null;
      const completedCount = modProgress?.completedLessons.length ?? 0;
      const totalCount = mod.lessons.length;
      const percent =
        totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

      let status: "locked" | "in_progress" | "completed";
      if (!isModuleUnlocked(mod.order, rawProgress)) {
        status = "locked";
      } else if (percent >= 100) {
        status = "completed";
      } else {
        status = "in_progress";
      }

      return {
        module: mod,
        progress: modProgress,
        status,
        percentComplete: percent,
        completedLessonCount: completedCount,
        totalLessonCount: totalCount,
      };
    });
  }, [rawProgress]);

  /* ---------- Overall progress ---------- */

  const overallPercent = useMemo(() => {
    const totalLessons = CURRICULUM.reduce(
      (sum, m) => sum + m.lessons.length,
      0
    );
    const completed = moduleInfoList.reduce(
      (sum, m) => sum + m.completedLessonCount,
      0
    );
    return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  }, [moduleInfoList]);

  const totalCompletedLessons = useMemo(
    () => moduleInfoList.reduce((sum, m) => sum + m.completedLessonCount, 0),
    [moduleInfoList]
  );

  /* ---------- Progress data object ---------- */

  const progressData = useMemo<ProgressData | null>(() => {
    if (!rawProgress && loading) return null;
    return {
      raw: rawProgress,
      modules: moduleInfoList,
      overallPercent,
      totalCompletedLessons,
    };
  }, [rawProgress, loading, moduleInfoList, overallPercent, totalCompletedLessons]);

  /* ---------- Utility methods ---------- */

  const getModuleProgress = useCallback(
    (moduleId: string): ModuleProgressInfo | null => {
      return moduleInfoList.find((m) => m.module.id === moduleId) ?? null;
    },
    [moduleInfoList]
  );

  const getLessonStatus = useCallback(
    (moduleId: string, lessonId: string): LessonStatus => {
      const info = getModuleProgress(moduleId);
      if (!info) return "locked";

      if (info.status === "locked") return "locked";

      const modProgress = rawProgress?.modules[moduleId];
      if (modProgress?.completedLessons.includes(lessonId)) return "completed";

      return "available";
    },
    [getModuleProgress, rawProgress]
  );

  const calculateOverallProgress = useCallback((): number => {
    return overallPercent;
  }, [overallPercent]);

  const checkModuleUnlocked = useCallback(
    (moduleId: string): boolean => {
      const mod = CURRICULUM.find((m) => m.id === moduleId);
      if (!mod) return false;
      return isModuleUnlocked(mod.order, rawProgress);
    },
    [rawProgress]
  );

  return {
    progressData,
    loading,
    error,
    getModuleProgress,
    getLessonStatus,
    calculateOverallProgress,
    isModuleUnlocked: checkModuleUnlocked,
  };
}
