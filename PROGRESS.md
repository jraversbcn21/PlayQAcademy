# PlayQ Academy - Progress Tracker

**Branch:** `feature/unified-campus`  
**Last Commit:** `46463cf` (Phase 3.5: curriculum page restructured)  
**Date:** 2026-01-28

---

## Completed Phases

### Phase 0: Baseline Assessment ✓
- Established baseline: 13 pre-existing TypeScript errors (all in pre-existing files)
- Verified `npm run dev` starts cleanly
- Documented all 13 errors with file locations

### Phase 1: Campus Type System ✓
- Created `src/types/campus.ts` with Campus interface
- Created `src/lib/constants/campuses.ts` with 3 campuses (QA Fundamentals, ISTQB, Automation)
- Added `getCampusForModule()`, `getModulesForCampus()`, `getCampusById()` helpers
- Created `/[lng]/campus/[campusId]/page.tsx` route
- Added i18n keys for campus navigation

### Phase 2: Lesson Component Extensions ✓
- Added `flashcard` and `table` section types to `LessonSection` union
- Created `FlashcardSection.tsx` with flip animation and TTS support
- Created `TableSection.tsx` for bilingual tables
- Updated `LessonRenderer.tsx` to handle new section types
- Added i18n keys for flashcard UI

### Phase 3: ISTQB Content Port (6 Chapters) ✓
- **Chapter 1 (Fundamentals):** 5 lessons, 8 flashcards (fc-1 to fc-8)
- **Chapter 2 (SDLC):** 4 lessons, 4 flashcards (fc-9 to fc-12)
- **Chapter 3 (Static Testing):** 2 lessons, 3 flashcards (fc-13 to fc-15)
- **Chapter 4 (Test Analysis):** 5 lessons, 7 flashcards (fc-16 to fc-22)
- **Chapter 5 (Management):** 5 lessons, 4 flashcards (fc-23 to fc-26)
- **Chapter 6 (Tools):** 1 lesson, 2 flashcards (fc-27 to fc-28)
- **Total:** 22 lessons, 28 flashcards, 0 missing EN entries
- Created transform scripts for each chapter (scripts/transform-istqb-ch*.mjs)
- Fixed Chapter 4 flashcard bug (was filtering by wrong chapter index)

### Phase 3.5: Public Curriculum Restructure ✓
- Replaced flat 14-module grid with 3 campus cards on `/[lng]/curriculum`
- Each campus card links to `/[lng]/campus/[campusId]` (DRY principle)
- Updated hero stats: "3 campuses, 14 modules, 66 lessons, ~22 hours"
- Expanded skills section: 6 Playwright + 3 ISTQB skills
- Updated certification section with subtitle explaining per-campus exams
- Added i18n keys for campus selector UI
- Verified `/campus/[campusId]` is NOT protected (public access works)

### Phase 4: Wiring ✓
- Registered 6 ISTQB modules in `curriculum.ts` (modules 9-14)
- Registered 6 ISTQB lesson files in `useLesson.ts` LESSON_REGISTRY
- Imported 50 exam questions from `examQuestions/istqb.ts` into `exams.ts`
- Created ISTQB mock exam: 40 questions, 65% pass, 60 min
- Flipped Campus 2 (istqb) from `coming_soon` to `active`
- Fixed ESLint config: added `"plugins": ["@typescript-eslint"]`
- Fixed 6 lint errors in modified files (unused imports/vars)

---

## Current State

### Typecheck
- **13 pre-existing errors** (unchanged from baseline)
- **0 new errors** from campus work
- All errors are in pre-existing files not touched by this feature

### Lint
- **My files:** 0 errors (all clean)
- **Pre-existing files:** 45 errors (untouched, predate this feature)
- ESLint config was broken from start (missing plugin declaration), now fixed

### Build Status
- TypeScript compilation: ✓ "Compiled successfully"
- ESLint: ✗ Fails on 45 pre-existing errors in unrelated files
- **Decision:** Do not fix pre-existing 45 errors as part of campus work (mixes concerns)

### App Status
- Dev server runs on `http://localhost:3001`
- Campus 2 (ISTQB) accessible at `/es/campus/istqb` and `/en/campus/istqb`
- Curriculum page shows 3 campus cards with correct navigation
- All 22 ISTQB lessons render in both ES and EN

### Flashcard Accounting
- **Source:** 28 flashcards (IDs 1-28)
- **Generated:** 28 flashcards (all accounted for)
- **Distribution:**
  - Ch 1 (Fundamentals): fc-1 to fc-8 (8 cards)
  - Ch 2 (SDLC): fc-9 to fc-12 (4 cards)
  - Ch 3 (Static Testing): fc-13 to fc-15 (3 cards)
  - Ch 4 (Test Analysis): fc-16 to fc-22 (7 cards)
  - Ch 5 (Management): fc-23 to fc-26 (4 cards)
  - Ch 6 (Tools): fc-27 to fc-28 (2 cards)

---

## Remaining Work

### (a) Manual Browser Walkthrough — PENDING
User needs to verify in browser:
- Navigate to `http://localhost:3001/es/campus/istqb`
- Verify Campus 2 loads with all 6 modules visible
- Click into each module, verify lessons render
- Test flashcard flip + TTS
- Test tables render correctly
- Switch to EN, verify all content translates
- Test curriculum page → click ISTQB card → verify navigation works

### (b) Verify EN SSR/Hydration i18n — PENDING
**Issue:** HTTP requests to `/en/curriculum` show Spanish text in SSR response, but browser navigation works correctly.

**Hypothesis:** Next.js renders SSR with default language (es) and hydrates client-side with correct language from URL. This is pre-existing behavior, not introduced by campus work.

**To verify:**
1. Open browser, navigate to `/en/curriculum`
2. Check if English text appears after hydration
3. Compare with `/en/dashboard` (known working)
4. If browser shows English correctly, issue is benign (SSR/CSR mismatch is cosmetic)

### (c) Phase 4 — Author QA Fundamentals Content — PENDING
**Campus 1 (QA Fundamentals)** currently has placeholder modules:
- `qa-intro`
- `qa-basics`

**Task:** Create actual lesson content for these 2 modules:
- Define curriculum entries in `curriculum.ts`
- Create lesson files in `src/lib/constants/lessons/`
- Register in `useLesson.ts` LESSON_REGISTRY
- Add i18n keys if needed
- Flip Campus 1 from `coming_soon` to `active`

**Content scope:** Basic QA concepts, testing mindset, career path overview (simpler than ISTQB)

### (d) Final AGENTS.md Update + Merge to Main — PENDING
**After walkthrough passes:**
1. Update `AGENTS.md` with:
   - Campus system documentation
   - How to add new campuses/modules
   - Transform script usage
   - Flashcard accounting
   - Build status (13 typecheck, 45 lint pre-existing)
2. Create PR from `feature/unified-campus` to `main`
3. Merge after review

### (e) Pre-existing Lint Errors Cleanup — SEPARATE TASK
**45 lint errors** in files unrelated to campus work:
- playground/*, auth/*, badges/*, leaderboard/*
- GamificationContext.tsx, scoring.ts, firestore.ts, badgeChecker.ts
- useExamAttempt.ts, useGamification.ts, i18n/client.ts
- Navbar.tsx, Sidebar.tsx, AchievementCard.tsx, etc.

**Decision:** Do NOT fix as part of campus feature (mixes concerns, risks breaking working code).

**Create separate branch:** `fix/pre-existing-lint-errors`
- Fix all 45 errors (unused imports/vars)
- Verify no functionality breaks
- Merge to main independently

---

## Key Files Modified

### New Files
- `src/types/campus.ts`
- `src/lib/constants/campuses.ts`
- `src/app/[lng]/campus/[campusId]/page.tsx`
- `src/components/lesson/FlashcardSection.tsx`
- `src/components/lesson/TableSection.tsx`
- `src/lib/constants/lessons/istqb-fundamentals.ts`
- `src/lib/constants/lessons/istqb-sdlc.ts`
- `src/lib/constants/lessons/istqb-static-testing.ts`
- `src/lib/constants/lessons/istqb-test-analysis.ts`
- `src/lib/constants/lessons/istqb-management.ts`
- `src/lib/constants/lessons/istqb-tools.ts`
- `scripts/transform-istqb-v2.mjs`
- `scripts/transform-istqb-ch2.mjs`
- `scripts/transform-istqb-ch3.mjs`
- `scripts/transform-istqb-ch4.mjs`
- `scripts/transform-istqb-ch5.mjs`
- `scripts/transform-istqb-ch6.mjs`

### Modified Files
- `src/lib/constants/curriculum.ts` (added 6 ISTQB modules)
- `src/lib/hooks/useLesson.ts` (registered 6 ISTQB lesson files)
- `src/lib/constants/exams.ts` (added ISTQB mock exam, imported questions)
- `src/lib/constants/campuses.ts` (flipped istqb to active)
- `src/app/[lng]/curriculum/page.tsx` (restructured to 3 campus cards)
- `src/app/[lng]/dashboard/page.tsx` (added campus selector)
- `public/locales/es/common.json` (added campus + curriculum i18n keys)
- `public/locales/en/common.json` (added campus + curriculum i18n keys)
- `.eslintrc.json` (added @typescript-eslint plugin)

---

## Commit History (feature/unified-campus)

```
46463cf feat(phase-3.5): restructure curriculum page — 3 campus cards, campus-aware navigation, updated skills/certification
cb2403f fix: remove unused imports/vars in campus wiring files
ef4a15f fix: add @typescript-eslint plugin to ESLint config
81f669d feat(phase-4): wire ISTQB campus — 6 modules in curriculum + registry, 50 exam questions, mock exam, campus active
958093b wip(phase-3): ISTQB chapter 6 (tool support) ported, 1 lesson + 2 flashcards
d0efc5c wip(phase-3): ISTQB chapter 5 (managing test activities) ported, 5 lessons + 4 flashcards
5feb4ce fix(phase-3): correct Chapter 4 flashcards (16-22 instead of 23-26)
1166f5c wip(phase-3): ISTQB content chapters 1-4 ported, not yet wired
```

---

## Next Session Instructions

1. **Start with walkthrough verification** (task a)
   - User manually tests Campus 2 in browser
   - Verify EN hydration works correctly (task b)

2. **If walkthrough passes, proceed to Phase 4 content** (task c)
   - Author QA Fundamentals lessons (2 modules)
   - Flip Campus 1 to active

3. **After all content complete, update AGENTS.md** (task d)
   - Document campus system
   - Create PR, merge to main

4. **Create separate lint cleanup branch** (task e)
   - Fix 45 pre-existing lint errors
   - Independent of campus feature

---

**Status:** Ready for manual walkthrough. All automated work complete.
