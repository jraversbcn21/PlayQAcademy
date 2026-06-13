/**
 * Campus type definitions.
 *
 * A Campus is a derived grouping layer over modules. It is defined in
 * exactly one place: src/lib/constants/campuses.ts. Progress, exams,
 * and badges keep referencing modules. Anything campus-level is derived,
 * never duplicated.
 */

import type { Bilingual } from "./lesson";

/* ------------------------------------------------------------------ */
/*  Campus status                                                      */
/* ------------------------------------------------------------------ */

export type CampusStatus = "active" | "coming_soon";

/* ------------------------------------------------------------------ */
/*  Campus definition                                                  */
/* ------------------------------------------------------------------ */

export interface Campus {
  /** Semantic ID used in URLs and i18n keys (e.g. "qaFundamentals"). */
  id: string;
  /** Display order (1 = first). */
  order: number;
  /** Campus name in both languages. */
  title: Bilingual;
  /** Short description in both languages. */
  description: Bilingual;
  /** Module IDs belonging to this campus. */
  moduleIds: string[];
  /** Whether the campus is currently active or coming soon. */
  status: CampusStatus;
}

/* ------------------------------------------------------------------ */
/*  QA Campus (root hub)                                               */
/* ------------------------------------------------------------------ */

/**
 * The single neutral root that hosts the sub-campuses (QA Fundamentals,
 * ISTQB, Automation). Not part of CAMPUSES — it's the parent hub.
 */
export interface QaCampus {
  /** Semantic ID (e.g. "qa"). */
  id: string;
  /** Hub name in both languages. */
  title: Bilingual;
  /** Hub description in both languages. */
  description: Bilingual;
  /** Optional short tagline in both languages. */
  tagline?: Bilingual;
}
