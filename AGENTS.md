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
  - `users/{uid}` — UserProfile (email, displayName, role, language, points, badges)
  - `progress/{uid}` — UserProgress (completed lesson IDs per module)
  - `gamification/{uid}` — UserGamification (streaks, levels, earnedBadge records)
  - `exam_attempts/{attemptId}` — ExamAttempt (answers, score, status)
- **Required Firestore composite indexes:**
  - `gamification`: `totalPoints` DESC (for leaderboard)
  - `exam_attempts`: `userId` ASC, `submittedAt` DESC (for exam history)
- **`auth_token` cookie**: Set by AuthProvider on sign-in, cleared on sign-out. The middleware checks this cookie as a simple navigation guard — it is NOT a verified Firebase token. Real security lives in Firestore rules.
- **`.env.example`** lists all required `NEXT_PUBLIC_FIREBASE_*` variables. Copy to `.env.local` to configure. Missing vars cause `null` objects, not runtime crashes (functions throw clear errors).

## Auth system (post-bugfix behavior)

- **AuthProvider** in `src/context/AuthContext.tsx` now exposes `initialized: boolean` alongside `user`, `loading`, `error`.
- **Profile sync is NON-BLOCKING.** `syncProfile()` catches all Firestore errors internally and returns a basic `UserProfile` built from Firebase User data if Firestore fails. The UI never stalls on Firestore.
- **Sign-in/sign-up/signInWithGoogle** all call `syncProfile()` directly and set `user` + `loading=false` in `finally` blocks. They do NOT wait for `onAuthStateChanged`.
- **15-second safety timeout** forces `loading=false` if auth gets stuck.
- **Auth pages** use `router.replace()` (not `push()`) to prevent back-button returning to auth page. Loading guards check `!initialized || loading`.
- **All imports are consolidated.** No duplicate `getDoc`/`updateDoc` imports anywhere (previously in `useLesson.ts` lines 14 and 142).

## Curriculum and lesson content

- **The curriculum IS the course.** `src/lib/constants/curriculum.ts` defines all 8 modules and 44 lessons as typed constants. Firestore only stores user progress (completed lesson IDs), NOT the structure itself.
- **Lesson content is in `src/lib/constants/lessons/`.**

| Module | File | Status | Lessons |
|---|---|---|---|
| M1: TypeScript Foundations | `module-1.ts` | ✅ Complete | 5 lessons, 23 sections, 5 quizzes, 1 exercise |
| M2: Playwright Fundamentals | `module-2.ts` | ✅ Complete | 6 lessons, 30 sections, 6 quizzes, 1 exercise |
| M3: Locators and Selectors | `module-3.ts` | ✅ Complete | 6 lessons, 37 sections, 6 quizzes, 1 exercise |
| M4: Actions and Assertions | `module-4.ts` | ✅ Complete | 5 lessons, 31 sections, 5 quizzes, 1 exercise |
| M5: Page Object Model | `module-5.ts` | 🔲 Pending | 5 lessons |
| M6: Configuration and Environments | `module-6.ts` | 🔲 Pending | 4 lessons |
| M7: API Testing | `module-7.ts` | 🔲 Pending | 5 lessons |
| M8: CI/CD and Reporting | `module-8.ts` | 🔲 Pending | 5 lessons |

**22 of 44 lessons authored (50% complete).**

- **To add new module content**: create `src/lib/constants/lessons/module-N.ts` with a `getAllLessonsContent()` export, then import it in `src/lib/hooks/useLesson.ts` and add to the `LESSON_REGISTRY` spread. The registry keys are `"moduleId__lessonId"`.
- **`LessonSection` discriminated union**: 9 types defined in `src/types/lesson.ts` — `heading`, `paragraph`, `code`, `callout`, `image`, `video`, `list`, `quiz`, `exercise`. The `LessonRenderer` in `src/components/lesson/LessonRenderer.tsx` maps each type to its sub-component.

## TypeScript constraints

- **`strict: true` + `noUncheckedIndexedAccess: true`** in tsconfig. Array/Record access may return `undefined`.
- **No `any` allowed** anywhere in the codebase. Use proper interfaces or `unknown` + type narrowing instead.
- **Unused variables**: prefix with `_` (e.g., `_params`) per the ESLint `argsIgnorePattern`/`varsIgnorePattern` rule.

## Gamification system

- **21 badges** defined as constants in `src/lib/constants/badges.ts`. Badge criteria are stored in code, not in Firestore.
- **10 levels** in `src/lib/gamification/levels.ts` — points-based curve from 0 to 2600+.
- **Badge checking** runs inside `markLessonComplete()` in `src/lib/hooks/useLesson.ts`. It calls `checkAndAwardBadges()` from `src/lib/gamification/badgeChecker.ts`.
- **Badge/level modals** are queued via `useGamificationUI()` from `src/context/GamificationContext.tsx`. Call `queueBadges(badges)` to trigger the badge modal sequence; call `triggerLevelUp(old, new)` for level-up.

## Exam system

- **Question bank registration**: Each module question file calls `registerQuestions()` (from `src/lib/exam/scoring.ts`) at import time. This populates the global question bank.
- **Exams are defined** in `src/lib/constants/exams.ts` — 4 exams with time limits, passing scores, and module requirements.
- **Question generation** uses a seeded deterministic shuffle (`generateExamQuestions`) so the same user+exam combination gets the same questions.
- **Timer is timestamp-based** (not interval) in the exam take page. This prevents drift if the browser throttles timers.

## Playground API

- **In-memory store** in `src/lib/playground/store.ts` — resets on every deploy/cold start. Intentional for a sandbox.
- **Route Handlers** are at `src/app/api/playground/*`. They use standard Next.js Route Handlers (not Pages Router API routes).
- **Login endpoint** accepts `student@playq.test / Playwright123!` and `admin@playq.test / Admin123!` — returns mock JWT tokens.

## Conventions

- **All comments in English.**
- **All user-facing strings via i18n keys.** No hardcoded UI text (except emojis and proper nouns like "PlayQ Academy").
- **Mobile-first responsive design.** Use `sm:`, `lg:` breakpoints. Test at 375px width.
- **No external UI libraries.** All components are hand-built with Tailwind. No `@monaco-editor/react` or `prism-react-renderer` installed — code blocks use a plain `<pre>` tag.
- **Firebase imports** must come from specific sub-packages (`firebase/auth`, `firebase/firestore`, `firebase/app`), not from the `firebase` barrel.
