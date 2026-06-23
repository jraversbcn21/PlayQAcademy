# Campus Module Progress Indicators Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each module card on `/campus/[campusId]` visually show whether that specific module is completed, in progress, or untouched — instead of all cards looking identical regardless of progress.

**Architecture:** `CampusPageClient.tsx` already calls `useProgress(user?.uid)` for the campus-wide percentage; pull in that hook's existing `getModuleProgress(moduleId)` method and use its `percentComplete`/`status` per card to drive three already-existing visual primitives: `Card`'s `"achievement"` variant (gold border/bg), `ProgressBar`'s `barColor` prop, and a check mark on the module-number tag.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, no test runner (manual + typecheck/lint/build gate per `AGENTS.md`).

## Global Constraints

- No automated test framework in this repo — verification is `npm run typecheck` (0 errors), `npm run lint` (0 errors/warnings), `npm run build` (must succeed), plus manual browser verification (per `AGENTS.md`'s mandatory quality gate).
- No new colors/CSS classes — reuse `Card`'s existing `"achievement"` variant and `ProgressBar`'s existing `barColor` prop, matching the convention already used in `src/components/dashboard/ModuleCard.tsx`.
- Module order in the grid stays unchanged (curriculum order) — do not reorder by completion.
- Per-module locking stays untouched (`ENFORCE_MODULE_LOCKING` is `false` platform-wide) — this is a read-only indicator, not a gate.
- Commit straight to `main`, no branch/PR (per existing project workflow).

---

### Task 1: Show per-module completion state on the campus page module grid

**Files:**
- Modify: `src/app/[lng]/campus/[campusId]/CampusPageClient.tsx:27` (hook destructure)
- Modify: `src/app/[lng]/campus/[campusId]/CampusPageClient.tsx:168-210` (modules grid)

**Interfaces:**
- Consumes: `useProgress(userId).getModuleProgress(moduleId): ModuleProgressInfo | null` (defined in `src/lib/hooks/useProgress.ts:191-196`), where `ModuleProgressInfo` has `status: "locked" | "in_progress" | "completed"` and `percentComplete: number` (`src/lib/hooks/useProgress.ts:15-24`). Already used today by the dashboard via the same hook — no changes to `useProgress.ts` needed.
- Consumes: `Card` component's `variant` prop, specifically `"achievement"` → `border-brand-gold-500/20 bg-brand-gold-500/5` (`src/components/ui/Card.tsx:24-25`, unchanged).
- Consumes: `ProgressBar` component's `barColor` prop (`src/components/ui/ProgressBar.tsx:13`, unchanged) — already imported in `CampusPageClient.tsx:14`.
- Produces: no new exports; this task only changes JSX/logic inside `CampusPageClient`.

- [ ] **Step 1: Destructure `getModuleProgress` from the existing `useProgress` call**

In `src/app/[lng]/campus/[campusId]/CampusPageClient.tsx`, find:

```tsx
  const { user } = useAuth();
  const { progressData } = useProgress(user?.uid);
```

Replace with:

```tsx
  const { user } = useAuth();
  const { progressData, getModuleProgress } = useProgress(user?.uid);
```

- [ ] **Step 2: Compute per-module progress info inside the grid's `.map()` and wire it into the `Card` and module tag**

Find the full modules-grid block:

```tsx
      {/* Modules grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, index) => {
          const isLocked = campus.status === "coming_soon";

          return (
            <Link
              key={mod.id}
              href={isLocked ? "#" : `/${lng}/learn/${mod.id}`}
              className={[
                "group block",
                isLocked ? "cursor-not-allowed opacity-60" : "",
              ].join(" ")}
            >
              <Card className="h-full p-5 transition-all hover:border-brand-forest-500/30 hover:shadow-lg hover:shadow-brand-forest-500/5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
                    {t("campus.module")} {index + 1}
                  </span>
                  {isLocked && (
                    <svg className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>

                <h3 className="mb-2 font-semibold text-[var(--color-text-primary)] group-hover:text-brand-forest-400">
                  {mod.title[lang]}
                </h3>

                <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                  {mod.description[lang]}
                </p>

                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>{t("campus.lessonsCount", { count: mod.lessons.length })}</span>
                  <span>{t("campus.minutesCount", { minutes: mod.estimatedMinutes })}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
```

Replace it with:

```tsx
      {/* Modules grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod, index) => {
          const isLocked = campus.status === "coming_soon";
          const moduleInfo = getModuleProgress(mod.id);
          const percent = moduleInfo?.percentComplete ?? 0;
          const isCompleted = moduleInfo?.status === "completed";

          return (
            <Link
              key={mod.id}
              href={isLocked ? "#" : `/${lng}/learn/${mod.id}`}
              className={[
                "group block",
                isLocked ? "cursor-not-allowed opacity-60" : "",
              ].join(" ")}
            >
              <Card
                variant={isCompleted ? "achievement" : "default"}
                className={[
                  "h-full p-5 transition-all hover:shadow-lg",
                  isCompleted
                    ? "hover:border-brand-gold-500/30 hover:shadow-brand-gold-500/5"
                    : "hover:border-brand-forest-500/30 hover:shadow-brand-forest-500/5",
                ].join(" ")}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-brand-forest-500/20 px-2.5 py-0.5 text-xs font-medium text-brand-forest-400">
                    {t("campus.module")} {index + 1}{isCompleted ? " ✓" : ""}
                  </span>
                  {isLocked && (
                    <svg className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>

                <h3 className="mb-2 font-semibold text-[var(--color-text-primary)] group-hover:text-brand-forest-400">
                  {mod.title[lang]}
                </h3>

                <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
                  {mod.description[lang]}
                </p>

                <div className="mb-4">
                  <ProgressBar
                    value={percent}
                    size="sm"
                    barColor={isCompleted ? "bg-brand-gold-500" : "bg-brand-forest-500"}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>{t("campus.lessonsCount", { count: mod.lessons.length })}</span>
                  <span>{t("campus.minutesCount", { minutes: mod.estimatedMinutes })}</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
```

Note: `✓` is the ✓ character — written as an escape here only because this plan document's code fence; write the literal `✓` character in the actual file (matches how the rest of the codebase writes literal emoji/symbols, e.g. `getModuleIcon` in `ModuleCard.tsx`).

- [ ] **Step 3: Run the quality gate**

Run: `npm run typecheck`
Expected: `0 errors` (no new TypeScript errors — `moduleInfo` is typed as `ModuleProgressInfo | null`, matching `getModuleProgress`'s return type).

Run: `npm run lint`
Expected: `0 errors, 0 warnings`.

Run: `npm run build`
Expected: build succeeds (this page has no `useSearchParams()`, so no Suspense boundary concern, but the full build must still pass per the mandatory gate).

- [ ] **Step 4: Manual browser verification**

Start the dev server (`npm run dev`) and sign in with the real Test1 account (has QA Fundamentals modules 1-2 completed, module 3 untouched/in-progress — see `AGENTS.md` "Verified in browser" history for this account's known state).

1. Navigate to `/es/campus/qaFundamentals`.
   - Módulo 1 and Módulo 2 cards: gold-tinted border/background, "✓" appended to the "Módulo N" tag, progress bar full and gold.
   - Módulo 3+ cards: default border/background (no gold tint), green progress bar at the module's real completion percentage (0% if untouched).
2. Hover over a completed (gold) card → border/shadow shift to gold tones (`hover:border-brand-gold-500/30`), not green.
3. Hover over a non-completed card → border/shadow shift to green tones (unchanged from before).
4. Toggle the theme switcher (sun/moon icon) between light/dark → gold tint on completed cards stays legible in both themes.
5. Open a private/incognito window (signed out) and visit `/es/campus/qaFundamentals` → every card renders default (no gold), every progress bar at 0%, no console errors.
6. Repeat step 1 quickly on `/es/campus/istqb` or `/es/campus/automation` if the Test1 account has any progress there, to confirm the fix isn't QA-Fundamentals-specific.

- [ ] **Step 5: Commit**

```bash
git add src/app/[lng]/campus/[campusId]/CampusPageClient.tsx
git commit -m "$(cat <<'EOF'
feat(campus): show per-module completion state on module cards

Completed modules now render with the existing achievement-gold Card
variant, a check mark on the module tag, and a gold progress bar,
instead of looking identical to untouched modules.
EOF
)"
```

- [ ] **Step 6: Sync AGENTS.md**

Per this project's workflow convention ("Sync this file" in `AGENTS.md`), add a dated entry to the "Architecture" or "Verified in browser" section describing this fix (model it after the existing 2026-06-22 "Campus page overall-progress fix" entry), then commit:

```bash
git add AGENTS.md
git commit -m "docs(agents): sync AGENTS.md with campus module progress indicators fix"
```

---

## Self-Review

**Spec coverage:**
- Data source (`getModuleProgress`) — Step 1-2. ✅
- Gold `Card` variant for completed — Step 2. ✅
- Check mark on tag — Step 2. ✅
- Per-module progress bar with color convention — Step 2. ✅
- Hover color matches state — Step 2. ✅
- No reordering, no locking changes — not touched anywhere in this plan. ✅
- Edge cases (coming_soon campus, signed-out user) — covered by existing `isLocked` logic (untouched) and `getModuleProgress` returning `null` when there's no `rawProgress`; verified manually in Step 4.5. ✅
- Testing plan from spec — Step 3 (quality gate) + Step 4 (manual browser checklist), matching the spec's "Testing" section exactly. ✅

**Type consistency:** `moduleInfo` is typed `ModuleProgressInfo | null` from `getModuleProgress`'s real return type (`src/lib/hooks/useProgress.ts:191-196`); `percentComplete` and `status` field names match that interface exactly (`src/lib/hooks/useProgress.ts:15-24`). `Card`'s `variant` prop accepts `"achievement"` as a real `CardVariant` union member (`src/components/ui/Card.tsx:3`). `ProgressBar`'s `barColor` prop is a plain string (Tailwind class), matching both `"bg-brand-gold-500"` and `"bg-brand-forest-500"` usages elsewhere in the codebase.

**No placeholders:** all code blocks are complete and copy-pasteable; no TBD/TODO.
