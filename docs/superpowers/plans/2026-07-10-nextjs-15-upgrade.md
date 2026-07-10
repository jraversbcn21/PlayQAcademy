# Next.js 14 → 15 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Next.js from 14.2.35 to 15.5.x (latest), React 18→19, and eslint-config-next 14→15, handling the async params/searchParams breaking change via codemod.

**Architecture:** Single-pass upgrade: bump all deps in one npm install, run `@next/codemod next-async-request-api` to convert ~40 sync params/searchParams signatures to async/await, fix any remaining edge cases, then verify with typecheck + lint + build.

**Tech Stack:** Next.js 15.5.x, React 19.x, React DOM 19.x, @types/react 19.x, @types/react-dom 19.x, eslint-config-next 15.x

## Global Constraints

- Target: Next.js 15.5.x (latest stable), React 19.x
- Verification gate: `npm run typecheck && npm run lint && npm run build` — all three must pass with zero errors
- No browser regression required
- Direct-to-main workflow (commit straight to main, no branches/PRs)
- Quality gate: typecheck, lint, AND build before every commit (per AGENTS.md)

---

### Task 1: Bump all dependencies in one shot

**Files:**
- Modify: `package.json` (via npm install)
- Modify: `package-lock.json` (via npm install)

**Interfaces:**
- Consumes: current package.json with next@14.2.35, react@18.3.1, react-dom@18.3.1, @types/react@18.3.18, @types/react-dom@18.3.5, eslint-config-next@14.2.35
- Produces: updated package.json with next@latest, react@19.x, react-dom@19.x, @types/react@19.x, @types/react-dom@19.x, eslint-config-next@15.x

- [ ] **Step 1: Install latest versions of all upgrade targets**

```powershell
npm install next@latest react@latest react-dom@latest @types/react@latest @types/react-dom@latest eslint-config-next@latest
```

Expected: installs without errors. Warnings about peer deps or engine mismatches are acceptable (file them). The exact versions will be whatever `latest` resolves to on the day of execution.

- [ ] **Step 2: Verify package.json shows new versions**

```powershell
Get-Content package.json | Select-String 'next|react|react-dom|@types/react|eslint-config-next'
```

Expected: all six packages reflect version 15.x or 19.x respectively.

- [ ] **Step 3: Commit the dependency bump**

```bash
git add package.json package-lock.json
git commit -m "chore(deps): bump next@15 react@19 eslint-config-next@15"
```

---

### Task 2: Run the Next.js codemod for async request APIs

**Files:**
- Modify: ALL page.tsx files with `params` in props (31 files)
- Modify: `src/app/[lng]/dashboard/page.tsx` (searchParams too)
- Modify: `src/app/[lng]/layout.tsx` (params + generateMetadata + generateStaticParams)
- Modify: `src/app/[lng]/playground/layout.tsx` (params)
- Modify: `src/app/[lng]/terms/page.tsx` (params + generateMetadata)
- Modify: `src/app/[lng]/privacy/page.tsx` (params + generateMetadata)
- Modify: `src/app/[lng]/cookies/page.tsx` (params + generateMetadata)
- Modify: `src/app/[lng]/campus/[campusId]/page.tsx` (generateMetadata with params)
- Modify: `src/app/api/playground/users/[id]/route.ts` (params in GET/PUT/DELETE handlers)

**Interfaces:**
- Consumes: current sync `params`/`searchParams` prop destructuring patterns
- Produces: `await params` / `await searchParams` patterns. Function signatures become async.

- [ ] **Step 1: Run the codemod**

```powershell
npx @next/codemod@latest next-async-request-api .
```

This codemod targets the entire project (`.`). It will:
- Convert `({ params: { lng } }: Props)` to async functions that `await params`
- Handle `searchParams` the same way
- Update `generateMetadata` signatures
- Update route handler `params` in the second argument

Expected: codemod runs and reports which files were modified.

- [ ] **Step 2: Inspect a sample of affected files to confirm the transformation is correct**

```powershell
git diff --stat
```

Expected: shows ~40 files modified. Skim a few key files:

```powershell
git diff src/app/\[lng\]/dashboard/page.tsx
git diff src/app/\[lng\]/exams/\[examId\]/start/page.tsx
git diff "src/app/\[lng\]/learn/\[moduleId\]/\[lessonId\]/page.tsx"
git diff src/app/api/playground/users/\[id\]/route.ts
```

Verify patterns like:
- Page props interface changed or removed (codemod may inline types)
- `const { lng } = await params` or `const { lng, examId } = await params` for nested segments
- `const { welcome } = await searchParams` for dashboard
- Route handlers: `export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> })` with `const { id } = await params` inside

- [ ] **Step 3: Quick sanity check — look for any file the codemod should have touched but didn't**

```powershell
rg "params: \{" --type ts --type tsx src/app src/app/api
```

This should return ZERO matches — no file should still have sync `params: {` in a server component or route handler. If any match remains, that file was missed by the codemod and needs manual fixing (see Task 3).

Be careful to distinguish from `useParams()` calls (client components) which are fine and should not match this pattern.

- [ ] **Step 4: Commit the codemod changes**

```bash
git add -A
git commit -m "refactor: apply next-async-request-api codemod for Next.js 15"
```

---

### Task 3: Manual fixes for codemod edge cases

**Files:**
- Potentially any file the codemod touched incorrectly or missed entirely

**Interfaces:**
- Consumes: codemod output from Task 2
- Produces: typecheck-clean code

- [ ] **Step 1: Run typecheck to surface any issues**

```powershell
npm run typecheck
```

Available options if there are errors:
- **If 0 errors:** Task 3 is complete — skip to Task 4.
- **If errors exist:** Read and fix each one. Common codemod edge cases:
  - Interfaces with `params: { lng: string }` not updated: change to `params: Promise<{ lng: string }>`
  - `generateMetadata` that uses `params.lng` before the await: manually add `const awaitedParams = await params`
  - Route handler params type not updated to `Promise<{ id: string }>`

- [ ] **Step 2: For each type error, fix the file and re-run typecheck**

Show the actual error, the fix applied, and confirm it resolves.

- [ ] **Step 3: Commit manual fixes if any were needed**

```bash
git add -A
git commit -m "fix: manual corrections after codemod for Next.js 15 async params"
```

If no fixes were needed, skip this commit.

---

### Task 4: Full verification gate

**Files:**
- (All previously modified files)

**Interfaces:**
- Consumes: fixed code from Tasks 2 and 3
- Produces: verified build artifacts (temporary, not committed)

- [ ] **Step 1: Run typecheck**

```powershell
npm run typecheck
```

Expected output: zero errors. Example success:
```
> typecheck
> tsc --noEmit
(no output)
```

- [ ] **Step 2: Run lint**

```powershell
npm run lint
```

Expected: zero errors, zero warnings. Example success:
```
> next lint
✔ No ESLint warnings or errors
```

- [ ] **Step 3: Run build**

```powershell
npm run build
```

Expected: successful production build with both locales (`/es` and `/en`). Output should show:
```
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
```

No "useSearchParams() should be wrapped in a suspense boundary" errors (already handled, but Next 15 is stricter about static prerendering, so this is the key build-breaking check).

- [ ] **Step 4: If any of the three checks fail, fix and re-run**

Do not proceed until all three pass with zero errors and zero warnings.

---

### Task 5: Final commit and AGENTS.md sync

**Files:**
- Modify: `AGENTS.md` (update version references)
- All files from Tasks 1-4 are already committed

**Interfaces:**
- Consumes: verified, passing codebase from Task 4
- Produces: updated AGENTS.md reflecting new versions

- [ ] **Step 1: Update AGENTS.md with new version numbers**

Replace all references to "Next.js 14" / "14.2.35" with "Next.js 15" / "15.5.x", and "React 18" with "React 19" in AGENTS.md. Also update the pending task description to reflect completion:

In the "Open items / backlog" section, replace the Next.js upgrade item with:
```
- **Upgrade Next.js 14.2.35 → 15.5.x+** — COMPLETED 2026-07-10 (commit <hash>). Next.js 15.5.x, React 19.x, eslint-config-next 15.x. Async params/searchParams handled via codemod. Build verified (typecheck + lint + build all clean).
```

Also remove the `firebase 10.x → 12.x` audit item (the third pending task is "no action needed, by design" — it's not actionable).

- [ ] **Step 2: Commit the documentation sync**

```bash
git add AGENTS.md
git commit -m "docs(agents): sync AGENTS.md with Next.js 15 upgrade"
```
