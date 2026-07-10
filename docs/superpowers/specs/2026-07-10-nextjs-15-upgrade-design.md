# Next.js 14 → 15 Upgrade — Design Spec

**Date:** 2026-07-10  
**Status:** approved  
**Target:** Next.js 15.5.x (latest stable), React 19.x

## Motivation

Several Next.js CVEs — most notably RSC response cache poisoning (GHSA-wfc6-r584-vfw7) — have no patch in the 14.x line. The fix only exists from 15.5.16 onward. This upgrade also brings React 19 and its improvements.

## Breaking change: async `params` / `searchParams`

In Next.js 15, `params` and `searchParams` in page/layout/route-handler props become **Promises**. Every destructuring like `({ params: { lng } })` must become `await params` / `await searchParams`.

### Files affected

| Category | Count | Examples |
|---|---|---|
| page.tsx with `params` in props | 31 | sign-in, sign-up, dashboard, learn/[moduleId], exams/*, playground/*, etc. |
| page.tsx with `searchParams` in props | 1 | dashboard/page.tsx (`welcome` param) |
| route.ts with `params` | 1 (3 handlers) | api/playground/users/[id]/route.ts (GET, PUT, DELETE) |
| `generateMetadata` with `params` | 5 | [lng]/layout.tsx, terms, privacy, cookies, campus/[campusId] |
| `generateStaticParams` | 1 | [lng]/layout.tsx (returns flat array, no change needed) |

### Files NOT affected (no change needed)

- **7 pages** using `useParams()` (client-side hook, works same): home, curriculum, glossary, forgot-password, verify-email, auth/action, CampusPageClient
- **2 pages** using `useSearchParams()` in Suspense (client-side, works same): sign-in, auth/action
- **middleware.ts**: uses `request.cookies` / `request.headers`, not `next/headers`. No changes.
- **0 usages** of `cookies()` or `headers()` from `next/headers`

## React 19

Next.js 15 requires React 19. The project uses standard hooks (`useState`, `useEffect`, `useRef`, `useContext`, `useCallback`, `useMemo`) and patterns that are compatible. No `forwardRef` or class components exist that would need migration. The main risk is type-only: `@types/react` 19.x changes some callback types (e.g., `useEffect` cleanup can no longer return a value), but those surface at typecheck time.

## Process

1. **Bump dependencies:** `npm install next@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest eslint-config-next@latest`
2. **Run codemod:** `npx @next/codemod@latest next-async-request-api .` — converts all page/layout/generateMetadata/route-handler params to `await`
3. **Manual fixes:** any edge cases the codemod misses
4. **Verify:** `npm run typecheck`, `npm run lint`, `npm run build`
5. **Commit**

## Risk areas

- **Route handler params:** the `/api/playground/users/[id]/route.ts` handlers destructure `{ params }` as the second argument. The codemod should handle this but verify.
- **TypeScript strict:** `noUncheckedIndexedAccess` may flag new patterns if the codemod introduces index access on awaited params.
- **React 19 type changes:** `useEffect` cleanup return types, `useRef` initializer semantics, JSX namespace changes. Low risk given the hook usage patterns here.

## Verification gate

`npm run typecheck && npm run lint && npm run build` — all three must pass with zero errors. No browser regression pass required per decision.
