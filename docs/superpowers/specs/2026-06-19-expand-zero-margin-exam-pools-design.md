# Expand Zero-Margin Exam Question Pools — Design

**Date:** 2026-06-19
**Status:** Approved (pending implementation plan)

## Problem

Three exams pass `isExamReady` (they are deliverable) but have **zero margin** —
their question pool size equals the exam's `questionCount` exactly, so every
attempt serves the entire pool:

| Exam | `questionCount` | Pool (modules) | Margin |
|------|-----------------|----------------|--------|
| `exam-module-2-3` | 25 | m2 (12) + m3 (13) = 25 | 0 |
| `exam-qaf-m1` | 10 | qaf-m1 (10) | 0 |
| `exam-qaf-m2` | 8 | qaf-m2 (8) | 0 |

Consequences:
- **No retake variety.** `generateExamQuestions` is seeded by `userId+examId`,
  but with pool == count it must return all questions every time. Retakes are
  identical.
- **Difficulty buckets are at their exact quota or worse.** The 40/35/25
  easy/medium/hard split for a 25-question exam is 10/9/6, and m2+m3 combined is
  *exactly* 10e/9m/6h — no slack in any bucket. Worse, `qaf-m1` and `qaf-m2`
  have **0 hard questions**, so their exams' hard quota (2 each) can never be
  filled from a hard question; `generateExamQuestions` silently backfills from
  other buckets.

This is a quality/robustness gap, not a functional bug (the exams work today).

## Goal

Grow the four affected question banks to roughly **1.5×** their consuming exam's
`questionCount`, so every attempt draws a varied, seeded subset and every
difficulty bucket has surplus. Specifically add ~21 new questions.

## Decisions (confirmed with user)

1. **Target margin: ~1.5×.** Concrete per-bank targets below.
2. **Difficulty additions prioritize the scarce/absent buckets** (especially
   `hard`, which is absent in both QAF banks), so each exam's pool comfortably
   exceeds its 40/35/25 bucket quota.

## What changes

Four question-bank files grow; nothing else is touched. Each bank is a flat
`ExamQuestion[]` registered via `registerQuestions()` and side-effect-imported
in `exams.ts` (already wired — no import changes needed).

| File | Current (e/m/h = total) | Add (e/m/h) | Result (e/m/h = total) |
|------|-------------------------|-------------|------------------------|
| `src/lib/constants/examQuestions/module-2.ts` | 5/4/3 = 12 | +2/+2/+2 | 7/6/5 = **18** |
| `src/lib/constants/examQuestions/module-3.ts` | 5/5/3 = 13 | +3/+2/+1 | 8/7/4 = **19** |
| `src/lib/constants/examQuestions/qaf-m1.ts` | 5/5/0 = 10 | +1/+1/+3 | 6/6/3 = **15** |
| `src/lib/constants/examQuestions/qaf-m2.ts` | 3/5/0 = 8 | +1/+0/+3 | 4/5/3 = **12** |

Total new questions: **21** (6 + 6 + 5 + 4).

### Resulting exam pools vs. requirements

| Exam | Needs (total; e/m/h buckets) | New pool (e/m/h = total) | Per-bucket surplus |
|------|------------------------------|--------------------------|--------------------|
| `exam-module-2-3` | 25; 10/9/6 | m2+m3 = 15/13/9 = 37 | +5/+4/+3 |
| `exam-qaf-m1` | 10; 4/4/2 | 6/6/3 = 15 | +2/+2/+1 |
| `exam-qaf-m2` | 8; 3/3/2 | 4/5/3 = 12 | +1/+2/+1 |

(`exam-midterm`, `exam-final`, and `exam-qaf-final` also consume these modules
and only gain more headroom — no separate action.)

## Content & format requirements (non-negotiable)

Every new question is an `ExamQuestion` (`src/types/exam.ts`) matching the exact
shape and conventions of the sibling questions already in the same file:

- **Bilingual `{ es, en }` parity** on `question`, every `option.text`, and
  `explanation`. No empty strings, no missing language.
- **Single-module tag:** `moduleIds: M` (the file's local `const M = [...]`), to
  keep per-module pools pure (AGENTS.md convention).
- **Four options**, exactly one correct (`type: "single_choice"`,
  `correctOptionIds` with one id), plausible distractors (no obvious throwaways).
- **Syllabus-accurate, non-duplicating:** each question covers a real topic of
  the module drawn from that module's lessons/sources, and does **not** restate
  a concept already covered by an existing question in the file. Source basis
  per file:
  - `module-2.ts` — Playwright Fundamentals: install/first test, test runner
    (`test`/`describe`/hooks/annotations), browsers (Chromium/Firefox/WebKit),
    browser contexts, headless/headed/UI mode/slowMo.
  - `module-3.ts` — Locators & Selectors: role/label/text/test-id locators,
    locator vs. ElementHandle, chaining/filtering, strictness, auto-waiting on
    locators, CSS/XPath.
  - `qaf-m1.ts` — Introduction to QA: QA vs QC vs testing, error/defect/failure,
    the 7 testing principles, testing objectives, verification vs validation.
  - `qaf-m2.ts` — Software Quality: ISO/IEC 25010 characteristics, functional
    vs non-functional, cost of quality, shift-left.
- **ID scheme:** continue the file's existing `<module>-eN` sequence after the
  current maximum (e.g. `m2.ts` last is `m2-e12` → new are `m2-e13`…`m2-e18`),
  so ids stay unique within the global bank.
- **`points`** follows the file's existing convention; **`timeEstimateSeconds`**
  is a sensible per-difficulty value in the range already used by siblings
  (~40–70s). Because scoring is equal-weight, `points` does not affect scoring.

## Out of scope

- No changes to exam definitions, `generateExamQuestions`, `calculateScore`, or
  `isExamReady` — the engine already works; only the banks grow.
- No new questions for modules that already have margin (m1, m4–m8, all istqb
  banks, qaf-m3…qaf-m10).
- No browser/runtime exam walkthrough (tracked separately as the standing QA
  verification debt).

## Verification

1. **Static:** `npm run typecheck` (0 errors) and `npm run lint` (0 new errors).
2. **Counts:** per-difficulty grep confirms the result column above
   (module-2 = 7/6/5, module-3 = 8/7/4, qaf-m1 = 6/6/3, qaf-m2 = 4/5/3).
3. **Pool sufficiency:** confirm `getQuestionsForModules(["m2-playwright-fundamentals","m3-locators-selectors"]).length === 37`, `getQuestionsForModules(["qaf-m1"]).length === 15`, `getQuestionsForModules(["qaf-m2"]).length === 12` — each exceeds its exam's `questionCount` with the surplus above. (Verified via the grep counts since there is no test runner; the counts are deterministic from the static banks.)
4. **No duplication / parity spot-check:** read the added questions to confirm bilingual parity and that no new question restates an existing one in the same file.

## Critical files

- `src/lib/constants/examQuestions/module-2.ts` — +6 questions
- `src/lib/constants/examQuestions/module-3.ts` — +6 questions
- `src/lib/constants/examQuestions/qaf-m1.ts` — +5 questions
- `src/lib/constants/examQuestions/qaf-m2.ts` — +4 questions
- `src/types/exam.ts` — `ExamQuestion` shape (reference, not modified)
- `src/lib/exam/scoring.ts` — `registerQuestions`/`getQuestionsForModules` (reference, not modified)
