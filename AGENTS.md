# PlayQ Academy — Agent Instructions

## Quick commands

```bash
npm run dev          # Start dev server (localhost:3000 → redirects to /es)
npm run build        # Production build
npm run lint         # ESLint (next/core-web-vitals)
npm run typecheck    # tsc --noEmit (strict + noUncheckedIndexedAccess)
```

Run `typecheck` after every significant change. Run `lint` after typecheck passes.

## Architecture overview

Single Next.js 14 App Router project — no monorepo, no workspaces.

```
Page entrypoint:  src/app/[lng]/**          (every route is locale-prefixed)
Root layout:      src/app/[lng]/layout.tsx   (AuthProvider → GamificationProvider → Navbar → Footer)
Middleware:       src/middleware.ts           (locale redirect + protected route guard)
```

**Context nesting order matters.** GamificationProvider must be inside AuthProvider. Both wrap children in `[lng]/layout.tsx`. Do not reorder them.

## Path aliases

```ts
@/* → ./src/*
~/* → ./public/*
```

Always use `@/` for imports within `src/`. Never use relative `../../../` chains.

## Routes

| Route | Auth | Purpose |
|---|---|---|
| `/` → `/[lng]` | Public | Landing page hero + features |
| `/[lng]/curriculum` | **Public** | Full curriculum preview (8 modules, 44 lessons, skills, certification path) |
| `/[lng]/auth/sign-in` | Public | Sign-in form |
| `/[lng]/auth/sign-up` | Public | Sign-up form |
| `/[lng]/dashboard` | **Protected** | User dashboard (progress, stats, modules) |
| `/[lng]/learn/[moduleId]/[lessonId]` | **Protected** | Lesson player with quizzes and exercises |
| `/[lng]/leaderboard` | **Protected** | Top 50 ranked by points |
| `/[lng]/exams/*` | **Protected** | Exam listing, take, results |
| `/[lng]/badges` | **Protected** | Earned/unearned badge gallery |
| `/[lng]/playground/*` | **Protected** | Interactive test playground |

## i18n (App Router native — no next-i18next)

- **`next-i18next` has been REMOVED.** The project now uses native App Router i18n via `i18next` + `react-i18next` + `accept-language`.
- **Single namespace: `"common"`**. All `useTranslation()` calls use `useTranslation("common")`. Translation JSON lives in `public/locales/{es,en}/common.json`.
- **Spanish is the default locale** (`fallbackLng: "es"` in `src/lib/i18n/settings.ts`). Middleware redirects `/` → `/es`.
- **All routes are under `[lng]`** — e.g., `/es/dashboard`, `/en/learn/m1-typescript-foundations/m1-l1`.
- **New translation keys**: Always add to BOTH `public/locales/es/common.json` AND `public/locales/en/common.json` simultaneously. The key structure must match exactly.
- **Client components** import `useTranslation` from `@/lib/i18n/client`. The hook auto-detects `lng` from `useParams()`.
- **Server components** import `useTranslation` from `@/lib/i18n` (async, takes explicit `lng`).
- **There is NO `appWithTranslation` wrapper.** The layout exports a plain function component.
- **Middleware** uses `accept-language` package for locale detection and sets `i18next` cookie.
- **`next-i18next.config.js` was deleted** — it is Pages Router only. `next.config.js` has no `i18n` block.

## Styling

- **Dark mode is the default**. The `<html>` element has `class="dark"`. Toggling to `.light` changes CSS custom properties defined in `src/app/globals.css`.
- **Use `var(--color-*)` CSS custom properties** for themeable colors (text, background, border) — not Tailwind's `dark:` prefix. `brand-*` colors (blue/green/orange) are static across themes.
- **Tailwind custom animations** available: `animate-fade-in-up`, `animate-slide-in-right`, `animate-gradient`, `animate-confetti-fall`.
- **Tailwind content paths** scan `./src/**/*.{js,ts,jsx,tsx,mdx}`. Do not add components outside `src/`.

## Firebase / Firestore

- Firebase client SDK only (no Admin SDK). All auth is client-side.
- Config file: `src/lib/firebase/config.ts` — exports `{ app, auth, db }` (each can be `null` if env vars are missing).
- **All callers MUST handle the `null` case.** Helper functions in `auth.ts` and `firestore.ts` use `requireAuth()` / `requireDb()` guards that throw descriptive errors.
- **Firestore collections used:**
  - `users/{uid}` — UserProfile (email, displayName, photoURL, role, language, createdAt, lastLoginAt)
  - `progress/{uid}` — UserProgress (userId, modules map, bookmarks)
  - `gamification/{uid}` — UserGamification (uid, totalPoints, level, streaks, earnedBadges, quizStats, correctQuizIds, completedExerciseIds, displayName, photoURL)
  - `exam_attempts/{attemptId}` — ExamAttempt (id, userId, examId, answers, score, passed, status)
- **Required Firestore composite index:**
  - `exam_attempts`: `userId` ASC, `submittedAt` DESC (for exam history query)
  - Single-field indexes (e.g., `gamification.totalPoints DESC`) are auto-managed by Firestore — no declaration needed
- **Firestore security rules** are in `firestore.rules` at the project root — production-grade, least-privilege, with helper functions `isAuthenticated()` and `isOwner()`. Collection-specific rules: users (owner read/write, field-level update restrictions), progress (owner read/write, no delete), gamification (public read for leaderboard, owner write, no delete), exam_attempts (owner read/write, status-gated transitions, no delete), default deny catch-all.
- **Firebase config files** at project root:
  - `firebase.json` — CLI config pointing to `firestore.rules` and `firestore.indexes.json`
  - `.firebaserc` — project alias (replace `REPLACE_WITH_YOUR_FIREBASE_PROJECT_ID` placeholder)
  - `firestore.rules` — production security rules
  - `firestore.indexes.json` — composite index definitions
- **Deployment guide** at `docs/FIRESTORE_DEPLOYMENT.md` — covers CLI setup, deploy commands, verification, emulator testing, rollback, troubleshooting.
- **`auth_token` cookie**: Set by AuthProvider on sign-in, cleared on sign-out. The middleware checks this cookie as a simple navigation guard — it is NOT a verified Firebase token. Real security lives in Firestore rules.
- **`.env.example`** lists all required `NEXT_PUBLIC_FIREBASE_*` variables. Copy to `.env.local` to configure. Missing vars cause `null` objects, not runtime crashes (functions throw clear errors).

## Auth system (post-bugfix behavior)

- **AuthProvider** in `src/context/AuthContext.tsx` now exposes `initialized: boolean` alongside `user`, `loading`, `error`.
- **Profile sync is NON-BLOCKING.** `syncProfile()` catches all Firestore errors internally and returns a basic `UserProfile` built from Firebase User data if Firestore fails. The UI never stalls on Firestore.
- **Sign-in/sign-up/signInWithGoogle** all call `syncProfile()` directly and set `user` + `loading=false` in `finally` blocks. They do NOT wait for `onAuthStateChanged`.
- **15-second safety timeout** forces `loading=false` if auth gets stuck.
- **Auth pages** use `router.replace()` (not `push()`) to prevent back-button returning to auth page. Loading guards check `!initialized || loading`.
- **All imports are consolidated.** No duplicate `getDoc`/`updateDoc` imports anywhere.

## UX fixes applied (May 2026)

- **Hero section** (`src/app/[lng]/page.tsx`):
  - Removed redundant "PlayQ Academy" pill badge above the gradient heading.
  - Both CTA buttons now navigate: primary links to `/[lng]/auth/sign-up`, secondary links to `/[lng]/curriculum`.
  - Copy: `hero.ctaPrimary` → "Regístrate aquí" / "Register here".
- **Navbar** (`src/components/layout/Navbar.tsx`):
  - `nav.startFree` renamed to "Crear cuenta" / "Create account".
- **Sign-up form** (`src/app/[lng]/auth/sign-up/page.tsx`):
  - Unchecked terms checkbox turns label and border red inline (`text-red-500`, `border-red-500`) instead of showing a top-of-form badge. Other validation errors keep their Badge display.
- **Curriculum page** (`src/app/[lng]/curriculum/page.tsx`):
  - Public page with hero, module grid (expandable lesson lists), skill cards, certification timeline, auth-aware CTA. Reuses `CURRICULUM` and `EXAMS` constants.

## Curriculum and lesson content

- **The curriculum IS the course.** `src/lib/constants/curriculum.ts` defines all 8 modules and 44 lessons as typed constants. Firestore only stores user progress (completed lesson IDs), NOT the structure itself.
- **Lesson content is in `src/lib/constants/lessons/`.**

| Module | File | Status | Details |
|---|---|---|---|
| M1: TypeScript Foundations | `module-1.ts` | ✅ Complete | 5 lessons |
| M2: Playwright Fundamentals | `module-2.ts` | ✅ Complete | 6 lessons |
| M3: Locators and Selectors | `module-3.ts` | ✅ Complete | 6 lessons |
| M4: Actions and Assertions | `module-4.ts` | ✅ Complete | 5 lessons |
| M5: Page Object Model | `module-5.ts` | ✅ Complete | 5 lessons |
| M6: Configuration and Environments | `module-6.ts` | ✅ Complete | 4 lessons |
| M7: API Testing with Playwright | `module-7.ts` | ✅ Complete | 5 lessons |
| M8: CI/CD and Reporting | `module-8.ts` | ✅ Complete | 5 lessons |

**44 of 44 lessons authored (100% complete).**

- **LESSON_REGISTRY** at `src/lib/hooks/useLesson.ts:30` spreads all 8 modules:
  ```ts
  [...getModule1Content(), ...getModule2Content(), ...getModule3Content(),
   ...getModule4Content(), ...getModule5Content(), ...getModule6Content(),
   ...getModule7Content(), ...getModule8Content()]
  ```
- **To add new module content**: create `src/lib/constants/lessons/module-N.ts` with a `getAllLessonsContent()` export, then import it in `src/lib/hooks/useLesson.ts` and add to the `LESSON_REGISTRY` spread. The registry keys are `"moduleId__lessonId"`.
- **`LessonSection` discriminated union**: 9 types defined in `src/types/lesson.ts` — `heading`, `paragraph`, `code`, `callout`, `image`, `video`, `list`, `quiz`, `exercise`. The `LessonRenderer` in `src/components/lesson/LessonRenderer.tsx` maps each type to its sub-component.
- **All code examples in lessons target the PlayQ Playground** (`/playground/login`, `/playground/signup`, `/playground/catalog`, `/playground/dynamic`) and its REST API (`/api/playground/*`). API response shapes in lessons match the actual route handlers exactly.

## Playground API (reference for lesson content)

The in-memory REST API at `src/app/api/playground/*` provides the following endpoints used across the curriculum:

| Endpoint | Methods | Key response fields |
|---|---|---|
| `/api/playground/auth/login` | POST | `{ success, data: { token, user: { email, role } } }` |
| `/api/playground/protected` | GET | `{ success, data: { message, token } }` (requires `Authorization: Bearer <token>`) |
| `/api/playground/products` | GET | `{ success, data: Product[], count }` (Product: `id, name, price, category, inStock`) |
| `/api/playground/users` | GET, POST | `{ success, data: User[] }` (User: `id, name, email, role, createdAt`) |
| `/api/playground/users/[id]` | GET, PUT, DELETE | `{ success, data: User }` / DELETE: `{ success, message }` |

**Login credentials:** `student@playq.test / Playwright123!` (student), `admin@playq.test / Admin123!` (admin). Tokens are plain strings: `playq_mock_jwt_{role}_{suffix}`.

**Store** (`src/lib/playground/store.ts`): In-memory, resets on dev server restart. 3 seeded users, 6 seeded products. `nextUserId` starts at 4.

## TypeScript constraints

- **`strict: true` + `noUncheckedIndexedAccess: true`** in tsconfig. Array/Record access may return `undefined`.
- **No `any` allowed** anywhere in the codebase. Use proper interfaces or `unknown` + type narrowing instead.
- **Unused variables**: prefix with `_` (e.g., `_params`) per the ESLint `argsIgnorePattern`/`varsIgnorePattern` rule.

## Known type errors (6 pre-existing, not blocking)

These errors existed before lesson content authoring began and are intentionally deferred:

1. `src/app/[lng]/badges/page.tsx` — Duplicate identifier `Badge` (name clash between local component and `@/components/ui/Badge` import).
2. `src/app/[lng]/layout.tsx` — `Metadata` imported from `"react"` but must come from `"next"` in App Router.
3. `src/components/lesson/ExerciseSection.tsx`, `LessonRenderer.tsx`, `QuizSection.tsx` — `Bilingual` type cast to `Record<string, string>` (missing index signature).
4. `src/lib/constants/badges.ts:370` — Object possibly `undefined` (unchecked indexed access).
5. `src/lib/firebase/firestore.ts:170` — `Date` to `string` type cast issue.
6. `src/lib/gamification/badgeChecker.ts:72` — `Record<string, unknown>` not assignable to Firestore field types.

## Gamification system

- **21 badges** defined as constants in `src/lib/constants/badges.ts`. Badge criteria are stored in code, not in Firestore.
- **10 levels** in `src/lib/gamification/levels.ts` — points-based curve from 0 to 2600+.
- **Gamification tracking fields** in `gamification/{uid}`:
  - `quizStats: { totalAttempts, correctOnFirstTry, perfectQuizzes }` — quiz performance counters
  - `correctQuizIds: string[]` — quiz IDs answered correctly on first try (prevents double-counting)
  - `completedExerciseIds: string[]` — exercise IDs marked as completed (idempotent)
- **Badge checking** is triggered from three code paths:
  - `markLessonComplete()` in `src/lib/hooks/useLesson.ts` — lesson completion (+10 pts, calls `checkAndAwardBadges`)
  - `recordQuizAnswer()` in `src/lib/hooks/useGamification.ts` — quiz answer submission (+5 pts on first-try correct, idempotent via `correctQuizIds`, calls `checkAndAwardBadges`)
  - `recordExerciseCompleted()` in `src/lib/hooks/useGamification.ts` — exercise "Mark as Tried" (+15 pts, idempotent via `completedExerciseIds`, calls `checkAndAwardBadges`)
- `recordQuizAnswer` and `recordExerciseCompleted` are STANDALONE async functions (exported from `useGamification.ts`, not inside the hook) so QuizSection and ExerciseSection can import them directly.
- **QuizSection** (`src/components/lesson/QuizSection.tsx`) wires to `recordQuizAnswer` — tracks first-try via `useRef`, auto-prefixes quiz IDs with `moduleId__lessonId__`, triggers `queueBadges` and `triggerLevelUp` on result.
- **ExerciseSection** (`src/components/lesson/ExerciseSection.tsx`) wires to `recordExerciseCompleted` — idempotent via `completedExerciseIds` check, triggers modals.
- **LessonRenderer** now passes `moduleId` and `lessonId` to QuizSection and ExerciseSection for quiz/exercise ID construction.
- **All gamification writes are non-blocking** — Firestore errors are caught and logged (dev mode only), UI continues unaffected.
- **Badge/level modals** are queued via `useGamificationUI()` from `src/context/GamificationContext.tsx`. Call `queueBadges(badges)` to trigger the badge modal sequence; call `triggerLevelUp(old, new)` for level-up.
- **`BadgeCheckContext`** (in `src/lib/gamification/badgeChecker.ts`) receives `totalLessonsCompleted`, `completedModuleIds`, `perfectQuizIds`, `exerciseCompletedCount`, and `currentStreak` — aggregated from both progress and gamification docs.

## Exam system

- **Question bank registration**: Each module question file calls `registerQuestions()` (from `src/lib/exam/scoring.ts`) at import time. This populates the global question bank.
- **Exams are defined** in `src/lib/constants/exams.ts` — 4 exams with time limits, passing scores, and module requirements.
- **Question generation** uses a seeded deterministic shuffle (`generateExamQuestions`) so the same user+exam combination gets the same questions.
- **Timer is timestamp-based** (not interval) in the exam take page. This prevents drift if the browser throttles timers.

## Conventions

- **All comments in English.**
- **All user-facing strings via i18n keys.** No hardcoded UI text (except emojis and proper nouns like "PlayQ Academy").
- **Mobile-first responsive design.** Use `sm:`, `lg:` breakpoints. Test at 375px width.
- **No external UI libraries.** All components are hand-built with Tailwind. No `@monaco-editor/react` or `prism-react-renderer` installed — code blocks use a plain `<pre>` tag.
- **Firebase imports** must come from specific sub-packages (`firebase/auth`, `firebase/firestore`, `firebase/app`), not from the `firebase` barrel.
- **Navigation**: Use `<Link href={...}>` from `next/link` for internal navigation (preferred over `router.push()`). Only use `router.replace()` for auth page redirects and `router.push()` for programmatic navigation triggered by callbacks.
