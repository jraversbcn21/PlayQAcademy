# Session Log: 2026-06-10

## Session: 2026-06-10 — Exam & Gamification Fixes

### Git state at close
- **HEAD:** 36953c7 fix(exam): score from in-memory answers + isolate gamification write with try/catch + update level on pass (browser-verified)
- **origin/feature/unified-campus:** 3bed207 fix: set qaFundamentals moduleIds to empty array
- **Uncommitted files (working tree):**
  - `public/locales/en/common.json`
  - `public/locales/es/common.json`
  - `src/app/[lng]/campus/[campusId]/page.tsx`
  - `src/app/[lng]/exams/[examId]/take/[attemptId]/page.tsx`
  - `src/app/[lng]/learn/[moduleId]/page.tsx`
  - `src/components/lesson/FlashcardSection.tsx`
  - `src/lib/constants/campuses.ts`
  - `src/lib/hooks/useProgress.ts`
- **Note:** Uncommitted files are in-progress walkthrough work (campus detail page, module breadcrumb, flashcard i18n, unlock logic), not bugs. Will be committed after manual walkthrough completes.

### Commits landed this session (not yet pushed to origin)

#### Commit 5f66750
- **Message:** fix(firestore): allow in_progress->in_progress for answer persistence (ISTQB fix, rules half; code half pending in useExamAttempt.ts)
- **Files changed:** `firestore.rules`
- **What it fixes:** Firestore security rules now allow `exam_attempts` update when status stays `in_progress`, enabling answer persistence during exam taking.
- **Verification:** Rules deployed to Firebase via `firebase deploy --only firestore:rules`. Console shows no permission errors when `saveAnswer` writes during exam.

#### Commit 36953c7
- **Message:** fix(exam): score from in-memory answers + isolate gamification write with try/catch + update level on pass (browser-verified)
- **Files changed:** `src/lib/hooks/useExamAttempt.ts`
- **What it fixes:** Three changes to `submitExam`:
  1. Accept `answers` parameter and use it for scoring (no Firestore re-read)
  2. Wrap gamification write in try/catch with detailed error logging
  3. Update `level` field alongside `totalPoints` using `getLevelFromPoints(newTotal)`
- **Verification:** Browser walkthrough of ISTQB exam. User passed with score 68, Firestore doc shows `passed: true, score: 68`. Gamification doc shows `totalPoints: 561, level: 5` (correct: 295 + 130 + 136 = 561, level 5 matches 500-749 threshold in levels.ts).

### Closed and verified

1. **ISTQB exam scoring — correct from in-memory answers, not Firestore reread.**
   - **Evidence:** Score 68 = 27/40 correct (27 × 2 = 54 earned, 40 × 2 = 80 total, 54/80 = 67.5% → rounds to 68%), confirmed in `exam_attempts` doc `status: "submitted", score: 68, passed: true`.

2. **Firestore rules — in_progress→in_progress transition allowed for answer persistence.**
   - **Evidence:** Deployed to Firebase. Console shows no "Missing or insufficient permissions" errors when `saveAnswer` calls `updateDoc` during exam taking.

3. **Gamification write isolation — try/catch wraps the points write so a failure cannot hang the results screen.**
   - **Evidence:** Browser-verified. User reached results screen after passing. No `[exam-gamification-write-failed]` in console on pass.

4. **Level update on exam pass — getLevelFromPoints(newTotal) called on same write.**
   - **Evidence:** Gamification doc shows `totalPoints: 561, level: 5`. Levels.ts threshold for level 5 is 500 points. 561 ≥ 500, so level 5 is correct.

5. **Points write confirmed working — reconstructed from two exam passes.**
   - **Evidence:** User had `totalPoints: 295` before ISTQB exam. Passed twice: score 65 → 130 points, score 68 → 136 points. Total delta: 266. Final: 295 + 266 = 561. Matches Firestore doc exactly.

### Known decisions (product, not bugs)

- **Scoring model:** Equal weight per question (correct/total). ISTQB bank is all-medium (50 questions, all `points: 2`), so points-weighted and equal-weight produce identical results. `calculateScore` fix (explicit correct/total formula) is logged as separate work for consistency with non-uniform question banks.
- **No exam-pass badge exists by design for now.** Badge criteria `exam_passed` not implemented. The 20 badges in `badges.ts` cover lessons, modules, quizzes, exercises, streaks, and speed — but not exam passing. Logged as future feature.

### Open work — NOT in this branch, separate branches

- **Fix calculateScore to correct/total explicitly + fix results page "6/15" vs percentage mismatch** (two denominators: raw count vs points-weighted). Separate branch.
- **3 content-less exams (module 2-3, midterm, final):** Hide or gate while question banks for m2-m8 don't exist. Currently show infinite spinner. Separate branch.
- **/exams index redesign:** Separate per-campus exam sections instead of global mixed list. Currently shows all 5 exams regardless of campus. Separate branch.

### Remaining walkthrough (manual, Jorge's eyes)

- 21 ISTQB lessons + modules 4-6 tables (verify not flattened to lists)
- TTS "Escuchar" audio verification
- Full English walkthrough: hydration flash ES→EN, catch empty `"en":""`
- Badge "Módulos" missing count on ISTQB campus page (undiagnosed)

### Pre-existing debt (do not touch without instruction)

- SEO/OG metadata `layout.tsx` Playwright-only
- `coming_soon` campus is a clickable Link to empty campus
- Automation header shows 44 lessons vs 41 real
- ~45 pre-existing lint errors → separate cleanup branch after merge
- 3 unused imports in `useExamAttempt.ts` (`useCallback`, `Exam`, `getQuestionBank`) confirmed pre-existing via `git diff`, go to lint cleanup branch
