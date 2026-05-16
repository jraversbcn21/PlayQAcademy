/**
 * Level system for PlayQ Academy.
 *
 * 10 levels with bilingual titles and a points-based curve.
 * Each level unlocks at a minimum points threshold.
 */

import type { LevelInfo } from "@/types/gamification";

/* ------------------------------------------------------------------ */
/*  Level definitions                                                  */
/* ------------------------------------------------------------------ */

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    minPoints: 0,
    title: {
      es: "Tester Manual",
      en: "Manual Tester",
    },
    nextLevelPoints: 50,
  },
  {
    level: 2,
    minPoints: 50,
    title: {
      es: "Aprendiz de Testing",
      en: "Test Apprentice",
    },
    nextLevelPoints: 150,
  },
  {
    level: 3,
    minPoints: 150,
    title: {
      es: "Escritor de Scripts",
      en: "Script Writer",
    },
    nextLevelPoints: 300,
  },
  {
    level: 4,
    minPoints: 300,
    title: {
      es: "Practicante de Automatización",
      en: "Automation Practitioner",
    },
    nextLevelPoints: 500,
  },
  {
    level: 5,
    minPoints: 500,
    title: {
      es: "Ingeniero de Pruebas",
      en: "Test Engineer",
    },
    nextLevelPoints: 750,
  },
  {
    level: 6,
    minPoints: 750,
    title: {
      es: "Automatización Senior",
      en: "Senior Automation",
    },
    nextLevelPoints: 1100,
  },
  {
    level: 7,
    minPoints: 1100,
    title: {
      es: "Arquitecto de Calidad",
      en: "Quality Architect",
    },
    nextLevelPoints: 1500,
  },
  {
    level: 8,
    minPoints: 1500,
    title: {
      es: "Líder de Pruebas",
      en: "Test Lead",
    },
    nextLevelPoints: 2000,
  },
  {
    level: 9,
    minPoints: 2000,
    title: {
      es: "Experto en Automatización",
      en: "Automation Expert",
    },
    nextLevelPoints: 2600,
  },
  {
    level: 10,
    minPoints: 2600,
    title: {
      es: "Maestro PlayQ",
      en: "PlayQ Master",
    },
    nextLevelPoints: Infinity,
  },
];

const MAX_LEVEL = LEVELS[LEVELS.length - 1]!;

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/** Return the LevelInfo for a given points total. */
export function getLevelFromPoints(points: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    const lvl = LEVELS[i];
    if (lvl && points >= lvl.minPoints) return lvl;
  }
  return LEVELS[0]!;
}

/** How many points until the next level (0 if maxed out). */
export function getPointsToNextLevel(currentPoints: number): number {
  const info = getLevelFromPoints(currentPoints);
  if (info.level >= MAX_LEVEL.level) return 0;
  const next = LEVELS[info.level];
  if (!next) return 0;
  return next.minPoints - currentPoints;
}

/** Progress within the current level as a 0-100 number. */
export function getLevelProgress(currentPoints: number): number {
  const info = getLevelFromPoints(currentPoints);
  if (info.level >= MAX_LEVEL.level) return 100;
  const currentMin = info.minPoints;
  const nextMin = info.nextLevelPoints;
  if (!isFinite(nextMin)) return 100;
  const range = nextMin - currentMin;
  if (range <= 0) return 100;
  return Math.min(100, Math.round(((currentPoints - currentMin) / range) * 100));
}
