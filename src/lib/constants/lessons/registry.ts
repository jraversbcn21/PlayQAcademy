import type { LessonContent } from "@/types/lesson";
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
import { getAllLessonsContent as getQafM1Content } from "@/lib/constants/lessons/qaf-m1";
import { getAllLessonsContent as getQafM2Content } from "@/lib/constants/lessons/qaf-m2";
import { getAllLessonsContent as getQafM3Content } from "@/lib/constants/lessons/qaf-m3";
import { getAllLessonsContent as getQafM4Content } from "@/lib/constants/lessons/qaf-m4";
import { getAllLessonsContent as getQafM5Content } from "@/lib/constants/lessons/qaf-m5";
import { getAllLessonsContent as getQafM6Content } from "@/lib/constants/lessons/qaf-m6";
import { getAllLessonsContent as getQafM7Content } from "@/lib/constants/lessons/qaf-m7";
import { getAllLessonsContent as getQafM8Content } from "@/lib/constants/lessons/qaf-m8";
import { getAllLessonsContent as getQafM9Content } from "@/lib/constants/lessons/qaf-m9";
import { getAllLessonsContent as getQafM10Content } from "@/lib/constants/lessons/qaf-m10";

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
    ...getQafM1Content(),
    ...getQafM2Content(),
    ...getQafM3Content(),
    ...getQafM4Content(),
    ...getQafM5Content(),
    ...getQafM6Content(),
    ...getQafM7Content(),
    ...getQafM8Content(),
    ...getQafM9Content(),
    ...getQafM10Content(),
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

/**
 * Total number of quiz sections across ALL lesson content, derived from
 * the authored lessons — never hardcode this (it was frozen at 44 while
 * the real count grew to 82). Used by the `perfectionist` badge.
 */
export const TOTAL_QUIZ_SECTIONS: number = Object.values(LESSON_REGISTRY).reduce(
  (sum, lc) => sum + lc.sections.filter((s) => s.type === "quiz").length,
  0
);
