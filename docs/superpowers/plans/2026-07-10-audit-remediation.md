# Auditoría 2026-07-06 — Plan de Remediación por Fases

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cerrar los 11 hallazgos abiertos de la auditoría de arquitectura del 2026-07-06 (badges inalcanzables/incorrectos, gap de middleware, bugs latentes y código muerto), en 5 fases independientemente commiteables.

**Architecture:** Cada fase es un grupo de cambios cohesivo que termina en su propio commit directo a `main` (workflow del repo, sin PR). Las fases están ordenadas por severidad: P2 middleware (1 línea) → P1 integridad de badges → P3 bugs latentes → P3 persistencia de preguntas de examen → P4 limpieza + sync de AGENTS.md. Cada push a `main` auto-deploya a producción (Vercel), así que **cada fase debe dejar la app funcionando**.

**Tech Stack:** Next.js 15 (App Router), TypeScript estricto, Firebase (Auth + Firestore), Tailwind CSS.

## Global Constraints

- **Quality gate obligatorio antes de CADA commit:** `npm run typecheck && npm run lint && npm run build` — los tres con **0 errores/warnings**. No hay test runner en este repo; el gate + verificación en navegador sustituyen a los tests automatizados (convención de AGENTS.md).
- **Direct-to-main:** commits directos a `main`, sin branch ni PR.
- **Bilingüe:** todo string visible al usuario es `{ es, en }` (tipo `Bilingual`), sin `en: ""` vacíos.
- **IDs de badges son inmutables** (los `earnedBadges` en Firestore referencian por id) — se puede cambiar nombre/descripción/criteria de un badge, nunca su `id`.
- **Reglas de Firestore:** las reglas actuales de `gamification` y `exam_attempts` NO restringen campos concretos, así que los campos nuevos de este plan (`lessonsToday`, `lessonsTodayDate`, `questionIds`) **no requieren tocar ni redeployar `firestore.rules`**. No editar ese fichero en este plan.
- Convención post-feature: commit `docs:` que sincroniza AGENTS.md (Fase 5, Task 5.2).

## Decisiones ya tomadas por Jorge (no reabrir)

1. **`speed_learner`:** se reemplaza el criterio inalcanzable por uno alcanzable con tracking barato: "5 lecciones completadas en un solo día (fecha local)". Se mantiene id/icono/rareza/puntos.
2. **`perfect_module`:** se re-describe honesto — nuevo nombre "Perfeccionista Avanzado"/"Advanced Perfectionist", criterio `perfect_quizzes count: 15` (distinto de `perfect_5`). Se mantiene id/icono/rareza/puntos.

---

## FASE 1 — Middleware: proteger `/badges` (P2)

### Task 1.1: Añadir `/badges` a PROTECTED_PATTERNS

**Files:**
- Modify: `src/middleware.ts:24-30`

**Interfaces:**
- Consumes: nada.
- Produces: nada (cambio autocontenido).

- [ ] **Step 1: Editar el patrón**

En `src/middleware.ts`, el array actual es:

```ts
const PROTECTED_PATTERNS = [
  /^\/[a-z]{2}\/dashboard/,
  /^\/[a-z]{2}\/learn\//,
  /^\/[a-z]{2}\/leaderboard/,
  /^\/[a-z]{2}\/exams/,
  /^\/[a-z]{2}\/settings/,
];
```

Dejarlo así (añadida la línea de `badges`):

```ts
const PROTECTED_PATTERNS = [
  /^\/[a-z]{2}\/dashboard/,
  /^\/[a-z]{2}\/learn\//,
  /^\/[a-z]{2}\/leaderboard/,
  /^\/[a-z]{2}\/badges/,
  /^\/[a-z]{2}\/exams/,
  /^\/[a-z]{2}\/settings/,
];
```

- [ ] **Step 2: Quality gate**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: 0 errores, 0 warnings, build OK.

- [ ] **Step 3: Verificación en navegador**

Con `npm run dev`: en una ventana de incógnito (sin sesión), navegar a `http://localhost:3000/es/badges`.
Expected: redirect inmediato a `/es/auth/sign-in?callbackUrl=/es/badges` (antes: spinner infinito del guard cliente).
Con sesión iniciada: `/es/badges` carga normal.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "fix(middleware): add /badges to PROTECTED_PATTERNS (server half of the auth guard)"
```

---

## FASE 2 — Integridad del catálogo de badges (P1)

### Task 2.1: badgeChecker no debe perder badges en silencio

**Files:**
- Modify: `src/lib/gamification/badgeChecker.ts:10` (import) y `:74-76` (el catch vacío)

**Interfaces:**
- Consumes: nada nuevo.
- Produces: `checkAndAwardBadges` devuelve `[]` si la escritura a Firestore falla definitivamente (los callers ya tratan `[]` como "sin badges nuevos", así que no se muestra modal de un badge no persistido).

- [ ] **Step 1: Ampliar el import de firestore**

Línea 10 actual:

```ts
import { doc, getDoc, updateDoc, arrayUnion, type DocumentData, type UpdateData } from "firebase/firestore";
```

Nueva:

```ts
import { doc, getDoc, updateDoc, setDoc, arrayUnion, type DocumentData, type UpdateData } from "firebase/firestore";
```

- [ ] **Step 2: Reemplazar el catch vacío**

Bloque actual (líneas 74-76):

```ts
  await updateDoc(ref, updates as UpdateData<DocumentData>).catch(() => {
    // Create the doc if it doesn't exist yet
  });
```

Nuevo bloque:

```ts
  try {
    await updateDoc(ref, updates as UpdateData<DocumentData>);
  } catch {
    // updateDoc rejects if the doc doesn't exist yet — create it instead.
    try {
      await setDoc(
        ref,
        { uid, earnedBadges: arrayUnion(...newEarned), totalPoints: currentPoints + pointsToAdd },
        { merge: true }
      );
    } catch {
      // Persist failed for real: don't report badges the user won't have —
      // every returned badge triggers a BadgeUnlockedModal upstream.
      return [];
    }
  }
```

(El `uid` en el `setDoc` es obligatorio: la regla de `gamification` exige `request.resource.data.uid == uid` en create. `arrayUnion` también en el `setDoc` para no machacar `earnedBadges` si el doc sí existía y el fallo fue otro.)

- [ ] **Step 3: Quality gate**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: limpio.

- [ ] **Step 4: Commit**

```bash
git add src/lib/gamification/badgeChecker.ts
git commit -m "fix(badges): create gamification doc on award instead of silently dropping badges"
```

### Task 2.2: Reemplazar el criterio inalcanzable de `speed_learner`

**Files:**
- Create: `src/lib/utils/date.ts`
- Modify: `src/types/gamification.ts:23` (union de criteria)
- Modify: `src/lib/constants/badges.ts:235-253` (badge speed_learner)
- Modify: `src/lib/gamification/badgeChecker.ts` (context + evaluador)
- Modify: `src/lib/hooks/useLesson.ts:197-254` (`markLessonComplete`)

**Interfaces:**
- Produces: `localDateStr(d?: Date): string` y `localYesterdayStr(): string` en `src/lib/utils/date.ts` (la Fase 3, Task 3.3 los reutiliza). Campos nuevos en `gamification/{uid}`: `lessonsToday: number`, `lessonsTodayDate: "YYYY-MM-DD"`. Campo de contexto `lessonsCompletedToday?: number` en `BadgeCheckContext`. Tipo de criteria `{ type: "lessons_in_one_day"; count: number }` que sustituye a `speed_learner` en la union (el id del badge sigue siendo `"speed_learner"`).

- [ ] **Step 1: Crear el helper de fechas locales**

Crear `src/lib/utils/date.ts`:

```ts
/**
 * Date helpers — all day-boundary logic uses the user's LOCAL date, not
 * UTC. `toISOString().slice(0, 10)` flips to "tomorrow" at 00:00 UTC,
 * i.e. mid-evening for Spanish-timezone users, which broke streak logic.
 */

/** Format a Date as "YYYY-MM-DD" in the user's local timezone. */
export function localDateStr(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Local "YYYY-MM-DD" for yesterday. */
export function localYesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return localDateStr(d);
}
```

- [ ] **Step 2: Cambiar el tipo de criteria**

En `src/types/gamification.ts`, línea 23, sustituir:

```ts
  | { type: "speed_learner"; minutesUnder: number; moduleId: string }
```

por:

```ts
  | { type: "lessons_in_one_day"; count: number }
```

- [ ] **Step 3: Actualizar el badge en badges.ts**

Sustituir el objeto completo del badge `speed_learner` (líneas ~235-253) por:

```ts
  {
    id: "speed_learner",
    name: {
      es: "Aprendiz Veloz",
      en: "Speed Learner",
    },
    description: {
      es: "Completaste 5 lecciones en un solo día.",
      en: "You completed 5 lessons in a single day.",
    },
    icon: "⚡",
    rarity: "epic",
    points: 100,
    criteria: { type: "lessons_in_one_day", count: 5 },
  },
```

- [ ] **Step 4: Actualizar BadgeCheckContext y el evaluador**

En `src/lib/gamification/badgeChecker.ts`:

(a) En `BadgeCheckContext`, eliminar:

```ts
  /** Speed data: moduleId → minutes taken to complete */
  moduleCompletionTimes?: Record<string, number>;
```

y añadir en su lugar:

```ts
  /** Lessons completed today (local date) — populated by markLessonComplete. */
  lessonsCompletedToday?: number;
```

(b) En `meetsCriteria`, eliminar el case `speed_learner` completo:

```ts
    case "speed_learner":
      if (!ctx.moduleCompletionTimes) return false;
      const time = ctx.moduleCompletionTimes[criteria.moduleId];
      return time !== undefined && time < criteria.minutesUnder;
```

y añadir en su lugar:

```ts
    case "lessons_in_one_day":
      return (ctx.lessonsCompletedToday ?? 0) >= criteria.count;
```

- [ ] **Step 5: Trackear lecciones/día en markLessonComplete**

En `src/lib/hooks/useLesson.ts`:

(a) Añadir el import:

```ts
import { localDateStr } from "@/lib/utils/date";
```

(b) En `markLessonComplete`, sustituir el bloque `if (db) { ... }` completo (líneas ~213-234) por:

```ts
  const today = localDateStr();
  let lessonsToday = 1;
  if (db) {
    const gRef = doc(db, "gamification", uid);
    const gSnap = await getDoc(gRef).catch(() => null);
    if (gSnap?.exists()) {
      const d = gSnap.data() as Record<string, unknown>;
      totalPoints = ((d["totalPoints"] as number) ?? 0) + 10;
      oldLevel = (d["level"] as number) ?? 1;
      correctQuizIds = (d["correctQuizIds"] as string[]) ?? [];
      completedExerciseIds = (d["completedExerciseIds"] as string[]) ?? [];
      lessonsToday = (d["lessonsTodayDate"] as string) === today
        ? ((d["lessonsToday"] as number) ?? 0) + 1
        : 1;
      await updateDoc(gRef, {
        totalPoints,
        level: getLevelFromPoints(totalPoints).level,
        lessonsToday,
        lessonsTodayDate: today,
      }).catch(() => {});
    } else {
      totalPoints = 10;
      await setDoc(gRef, {
        uid, totalPoints, level: 1, currentStreak, longestStreak: Math.max(currentStreak, 1),
        lastActivityDate: today,
        lessonsToday: 1,
        lessonsTodayDate: today,
        earnedBadges: [],
        quizStats: { totalAttempts: 0, correctOnFirstTry: 0, perfectQuizzes: 0 },
        correctQuizIds: [],
        completedExerciseIds: [],
      }).catch(() => {});
    }
  }
```

(c) En la llamada a `checkAndAwardBadges` unas líneas más abajo, añadir el campo nuevo:

```ts
  const newBadges = await checkAndAwardBadges(uid, {
    totalLessonsCompleted,
    completedModuleIds,
    perfectQuizIds: correctQuizIds,
    exerciseCompletedCount: completedExerciseIds.length,
    currentStreak,
    lessonsCompletedToday: lessonsToday,
  });
```

Nota: los docs de gamification existentes no tienen `lessonsToday`/`lessonsTodayDate` — el código de arriba los trata como "día distinto" y arranca en 1. Sin migración.

- [ ] **Step 6: Quality gate**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: limpio. Si typecheck falla con "speed_learner no existe en el union", hay algún uso restante del criteria viejo — buscarlo con `grep -rn "speed_learner" src/` (el ÚNICO resultado válido tras este task es el `id: "speed_learner"` en badges.ts).

- [ ] **Step 7: Verificación en navegador**

Con una cuenta de prueba con 4 lecciones ya completadas hoy: completar una 5ª lección.
Expected: modal "Aprendiz Veloz" (⚡) + badge visible en `/badges`. (Alternativa rápida: bajar temporalmente `count` a 2 en badges.ts, verificar con 2 lecciones, y restaurar a 5 antes del commit.)

- [ ] **Step 8: Commit**

```bash
git add src/lib/utils/date.ts src/types/gamification.ts src/lib/constants/badges.ts src/lib/gamification/badgeChecker.ts src/lib/hooks/useLesson.ts
git commit -m "fix(badges): make speed_learner attainable — 5 lessons in one local day (was unwired module timing)"
```

### Task 2.3: Derivar el count de `perfectionist` del contenido real

**Files:**
- Create: `src/lib/constants/lessons/registry.ts`
- Modify: `src/lib/hooks/useLesson.ts:11-88` (mover registry al fichero nuevo)
- Modify: `src/lib/constants/badges.ts` (import + criteria de `perfectionist`, línea ~320)

**Interfaces:**
- Produces: `LESSON_REGISTRY`, `getLessonContent(moduleId, lessonId)` y `TOTAL_QUIZ_SECTIONS: number` exportados desde `src/lib/constants/lessons/registry.ts`. `useLesson.ts` re-exporta `getLessonContent` (la página `learn/[moduleId]/[lessonId]` lo importa desde `@/lib/hooks/useLesson` — no romperla).
- Consumes: los 24 ficheros de contenido `src/lib/constants/lessons/*.ts` (sin cambios).

**Por qué un fichero nuevo:** `badges.ts` no puede importar desde `useLesson.ts` (fichero `"use client"` con deps de firebase/hooks). El registry de lecciones es un dato constante puro — moverlo a `constants/lessons/registry.ts` deja: `badges.ts → registry → ficheros de lecciones` y `useLesson.ts → registry`, sin ciclos (badgeChecker importa badges, useLesson importa badgeChecker; el registry no importa ninguno de ellos).

- [ ] **Step 1: Crear el registry**

Crear `src/lib/constants/lessons/registry.ts` moviendo desde `useLesson.ts` los 24 imports `getAllLessonsContent as ...` (líneas 11-34), el bloque `LESSON_REGISTRY` (líneas 49-81) y la función `getLessonContent` (líneas 83-88), **tal cual** (ajustar rutas de import de `@/lib/constants/lessons/module-1` etc. — quedan iguales al ser alias absolutos), y añadir al final:

```ts
/**
 * Total number of quiz sections across ALL lesson content, derived from
 * the authored lessons — never hardcode this (it was frozen at 44 while
 * the real count grew to 82). Used by the `perfectionist` badge.
 */
export const TOTAL_QUIZ_SECTIONS: number = Object.values(LESSON_REGISTRY).reduce(
  (sum, lc) => sum + lc.sections.filter((s) => s.type === "quiz").length,
  0
);
```

El fichero NO lleva `"use client"`. Necesita `import type { LessonContent } from "@/types/lesson";`.

- [ ] **Step 2: Adelgazar useLesson.ts**

En `src/lib/hooks/useLesson.ts`: borrar los 24 imports de contenido, el bloque `LESSON_REGISTRY` y la función `getLessonContent`; añadir en su lugar:

```ts
import { getLessonContent } from "@/lib/constants/lessons/registry";

export { getLessonContent };
```

(El re-export mantiene funcionando el import existente de `learn/[moduleId]/[lessonId]/page.tsx`.)

- [ ] **Step 3: Usar el count derivado en perfectionist**

En `src/lib/constants/badges.ts`, añadir el import:

```ts
import { TOTAL_QUIZ_SECTIONS } from "./lessons/registry";
```

y en el badge `perfectionist` (línea ~320) sustituir:

```ts
    criteria: { type: "perfect_quizzes", count: 44 },
```

por:

```ts
    criteria: { type: "perfect_quizzes", count: TOTAL_QUIZ_SECTIONS },
```

- [ ] **Step 4: Verificar el count derivado**

Run (Git Bash): `grep -c 'type: "quiz"' src/lib/constants/lessons/*.ts | awk -F: '{s+=$2} END {print s}'`
Expected: **82** (37 Automation + 45 QAF; ISTQB no tiene). Si difiere del valor esperado, inspeccionar antes de continuar — la auditoría contó 82 el 2026-07-06.

- [ ] **Step 5: Quality gate**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: limpio.

- [ ] **Step 6: Commit**

```bash
git add src/lib/constants/lessons/registry.ts src/lib/hooks/useLesson.ts src/lib/constants/badges.ts
git commit -m "fix(badges): derive perfectionist quiz count from lesson content (was stale hardcoded 44 of 82)"
```

### Task 2.4: Diferenciar `perfect_module` de `perfect_5` + limpiar header

**Files:**
- Modify: `src/lib/constants/badges.ts:2` (header) y `:220-234` (badge perfect_module)

**Interfaces:** nada — cambio de datos puro.

- [ ] **Step 1: Re-describir el badge**

Sustituir el objeto completo de `perfect_module` (líneas ~220-234) por:

```ts
  {
    id: "perfect_module",
    name: {
      es: "Perfeccionista Avanzado",
      en: "Advanced Perfectionist",
    },
    description: {
      es: "Respondiste 15 quizzes perfectamente en el primer intento.",
      en: "You answered 15 quizzes perfectly on the first try.",
    },
    icon: "⭐",
    rarity: "epic",
    points: 150,
    criteria: { type: "perfect_quizzes", count: 15 },
  },
```

(Id, icono, rareza y puntos NO cambian. Quien ya lo tenga ganado lo conserva — badgeChecker nunca revoca.)

- [ ] **Step 2: Corregir el header del fichero**

Línea 2, sustituir:

```ts
 * PlayQAcademy — 20 Badge Definitions.
```

por:

```ts
 * PlayQAcademy — Badge definitions (the full catalog; count them, don't trust a number here).
```

- [ ] **Step 3: Quality gate**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: limpio.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants/badges.ts
git commit -m "fix(badges): differentiate perfect_module (15 perfect quizzes) from perfect_5, honest copy"
```

---

## FASE 3 — Bugs latentes: rank, navegación entre campus, fechas UTC (P3)

### Task 3.1: Offset real de rank en fetchLeaderboard

**Files:**
- Modify: `src/lib/hooks/useGamification.ts:545-587`

**Interfaces:**
- Produces: `fetchLeaderboard(pageSize?, lastDoc?, rankOffset?)` — tercer parámetro nuevo con default `0`; el caller actual (`leaderboard/page.tsx`, que solo pide el top 50 sin paginar) no necesita cambios.

- [ ] **Step 1: Añadir el parámetro y usarlo**

Firma actual:

```ts
export async function fetchLeaderboard(
  pageSize = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ entries: LeaderboardEntry[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
```

Nueva:

```ts
export async function fetchLeaderboard(
  pageSize = 20,
  lastDoc?: QueryDocumentSnapshot<DocumentData> | null,
  /** Nº of entries already fetched on previous pages — callers that paginate MUST pass it. */
  rankOffset = 0
): Promise<{ entries: LeaderboardEntry[]; lastVisible: QueryDocumentSnapshot<DocumentData> | null }> {
```

Y la asignación de ranks (línea ~585-587), sustituir:

```ts
  entries.forEach((e, i) => {
    e.rank = (lastDoc ? 0 : 0) + i + 1;
  });
```

por:

```ts
  entries.forEach((e, i) => {
    e.rank = rankOffset + i + 1;
  });
```

- [ ] **Step 2: Quality gate + verificación**

Run: `npm run typecheck && npm run lint && npm run build`
Expected: limpio. En navegador: `/es/leaderboard` muestra ranks 1..N idénticos a antes.

- [ ] **Step 3: Commit**

```bash
git add src/lib/hooks/useGamification.ts
git commit -m "fix(leaderboard): real rank offset param instead of dead (lastDoc ? 0 : 0) expression"
```

### Task 3.2: Navegación prev/next de lección sin cruzar campus

**Files:**
- Modify: `src/lib/hooks/useLesson.ts` — función `useLessonNavigation` (líneas ~143-183)

**Interfaces:**
- Consumes: `getCampusForModule(moduleId)` y `getModulesForCampus(campusId)` de `@/lib/constants/campuses` (ya existen; `getCampusForModule` devuelve `Campus | null` con campo `id`).

- [ ] **Step 1: Añadir imports**

En `src/lib/hooks/useLesson.ts`:

```ts
import { getCampusForModule, getModulesForCampus } from "@/lib/constants/campuses";
```

- [ ] **Step 2: Reescribir los saltos de módulo**

Dentro del `useMemo` de `useLessonNavigation`, tras el cálculo de `idx`, añadir:

```ts
    // Module order WITHIN the lesson's campus — prev/next never cross
    // campus boundaries (global `order ± 1` used to jump from the last
    // Automation lesson straight into ISTQB).
    const campus = getCampusForModule(moduleId);
    const campusModuleIds = campus ? getModulesForCampus(campus.id) : [];
    const cIdx = campusModuleIds.indexOf(moduleId);
```

Sustituir el bloque "Previous" completo (líneas ~157-167) por:

```ts
    // Previous: same module if not first, else last lesson of the previous
    // module in the SAME campus.
    if (idx > 0) {
      const pl = mod.lessons[idx - 1];
      if (pl) prev = { moduleId, lessonId: pl.id };
    } else if (cIdx > 0) {
      const prevMod = CURRICULUM.find((m) => m.id === campusModuleIds[cIdx - 1]);
      if (prevMod && prevMod.lessons.length > 0) {
        const last = prevMod.lessons[prevMod.lessons.length - 1];
        if (last) prev = { moduleId: prevMod.id, lessonId: last.id };
      }
    }
```

Sustituir el bloque "Next" completo (líneas ~169-179) por:

```ts
    // Next: same module if not last, else first lesson of the next module
    // in the SAME campus (null at the campus's final lesson).
    if (idx < mod.lessons.length - 1) {
      const nl = mod.lessons[idx + 1];
      if (nl) next = { moduleId, lessonId: nl.id };
    } else if (cIdx >= 0 && cIdx < campusModuleIds.length - 1) {
      const nextMod = CURRICULUM.find((m) => m.id === campusModuleIds[cIdx + 1]);
      if (nextMod && nextMod.lessons.length > 0) {
        const first = nextMod.lessons[0];
        if (first) next = { moduleId: nextMod.id, lessonId: first.id };
      }
    }
```

- [ ] **Step 3: Quality gate + verificación en navegador**

Run: `npm run typecheck && npm run lint && npm run build` → limpio.
En navegador (3 comprobaciones):
1. Última lección del último módulo de Automation (`m8-cicd-reporting`): el botón "Siguiente" NO aparece (antes llevaba a ISTQB).
2. Primera lección de `istqb-fundamentals`: "Anterior" NO aparece.
3. Última lección de `qaf-m1` → "Siguiente" lleva a la primera de `qaf-m2` (salto intra-campus intacto).

- [ ] **Step 4: Commit**

```bash
git add src/lib/hooks/useLesson.ts
git commit -m "fix(learn): scope prev/next lesson navigation to the module's campus"
```

### Task 3.3: Frontera de día local (no UTC) para rachas

**Files:**
- Modify: `src/lib/hooks/useGamification.ts:64-72` (`todayStr`/`yesterdayStr`)

**Interfaces:**
- Consumes: `localDateStr`/`localYesterdayStr` de `src/lib/utils/date.ts` (creado en Task 2.2 — esta task requiere Fase 2 hecha).

- [ ] **Step 1: Delegar en el helper local**

En `src/lib/hooks/useGamification.ts`, añadir el import:

```ts
import { localDateStr, localYesterdayStr } from "@/lib/utils/date";
```

y sustituir (líneas 64-72):

```ts
function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
```

por:

```ts
function todayStr(): string {
  return localDateStr();
}

function yesterdayStr(): string {
  return localYesterdayStr();
}
```

(Los `lastActivityDate` ya guardados se escribieron con fecha UTC; el día del cambio una racha puede, como mucho, contar un día de gracia extra — sin migración, se autocorrige al día siguiente. `useLesson.ts:227` ya quedó en fecha local en Task 2.2.)

- [ ] **Step 2: Confirmar que no quedan usos UTC de día**

Run (Git Bash): `grep -rn 'toISOString().slice(0, 10)' src/`
Expected: solo `src/app/api/playground/users/route.ts` (un `createdAt` de datos mock del playground — irrelevante para rachas, dejarlo).

- [ ] **Step 3: Quality gate + commit**

Run: `npm run typecheck && npm run lint && npm run build` → limpio.

```bash
git add src/lib/hooks/useGamification.ts
git commit -m "fix(streaks): use local-timezone day boundary instead of UTC"
```

---

## FASE 4 — Persistir las preguntas del intento de examen (P3 #7)

**Contexto:** hoy, `take`, `submit` y `results` regeneran el set de preguntas con la selección sembrada (userId+examId) desde el banco *actual* — si un banco crece, el review de intentos pasados muestra preguntas que el usuario nunca vio. Solución: guardar `questionIds` en el doc del attempt al crearlo, y resolver siempre desde ahí; intentos antiguos sin el campo caen al comportamiento actual. **Las reglas de Firestore no restringen campos: no hay que tocar `firestore.rules`.**

### Task 4.1: `questionIds` en el modelo + resolución centralizada

**Files:**
- Modify: `src/types/exam.ts:68-79` (ExamAttempt)
- Modify: `src/lib/exam/scoring.ts` (helper nuevo)
- Modify: `src/lib/hooks/useExamAttempt.ts` (start + submit + export nuevo)

**Interfaces:**
- Produces: `ExamAttempt.questionIds?: string[]`; `getQuestionsByIds(ids: string[]): ExamQuestion[]` en `scoring.ts`; `resolveAttemptQuestions(attempt: ExamAttempt): ExamQuestion[]` exportado desde `useExamAttempt.ts` (Task 4.2 lo consume en las dos páginas).

- [ ] **Step 1: Ampliar el tipo**

En `src/types/exam.ts`, dentro de `ExamAttempt`, añadir tras `status: ExamStatus;`:

```ts
  /**
   * Ids of the questions generated for THIS attempt, in display order.
   * Persisted at start so review/scoring always use the exact set the
   * user saw, even if the question bank changes later. Attempts created
   * before this field existed fall back to seeded regeneration.
   */
  questionIds?: string[];
```

- [ ] **Step 2: Helper de resolución por id en scoring.ts**

Añadir en `src/lib/exam/scoring.ts` (tras `getQuestionsForModules`):

```ts
/** Resolve questions by id, preserving the given order. Ids missing from the bank are skipped. */
export function getQuestionsByIds(ids: string[]): ExamQuestion[] {
  const byId = new Map(QUESTION_BANK.map((q) => [q.id, q]));
  const out: ExamQuestion[] = [];
  for (const id of ids) {
    const q = byId.get(id);
    if (q) out.push(q);
  }
  return out;
}
```

- [ ] **Step 3: Persistir en startExamAttempt**

En `src/lib/hooks/useExamAttempt.ts`, ampliar el import de scoring:

```ts
import { generateExamQuestions, getQuestionsByIds, calculateScore } from "@/lib/exam/scoring";
```

En `startExamAttempt`, tras el `if (!exam) throw ...`, generar y guardar los ids (misma semilla determinista de siempre — el set no cambia respecto a lo que el usuario habría visto):

```ts
  const questions = generateExamQuestions(examId, uid, exam.moduleIds, exam.questionCount);

  const now = new Date().toISOString();
  const attempt: ExamAttempt = {
    id: attemptId,
    userId: uid,
    examId,
    startedAt: now,
    submittedAt: null,
    timeSpent: 0,
    answers: [],
    score: 0,
    passed: false,
    status: "in_progress",
    questionIds: questions.map((q) => q.id),
  };
```

- [ ] **Step 4: Resolver centralizado + usarlo en submitExam**

Añadir en `useExamAttempt.ts` (antes de `submitExam`):

```ts
/* ------------------------------------------------------------------ */
/*  Resolve an attempt's question set                                  */
/* ------------------------------------------------------------------ */

/**
 * The question set for an attempt: the persisted `questionIds` when present
 * (exact set the user saw), else the legacy seeded regeneration (attempts
 * created before questionIds existed). If any persisted id no longer exists
 * in the bank (question deleted/renamed), falls back to regeneration too.
 */
export function resolveAttemptQuestions(attempt: ExamAttempt): ExamQuestion[] {
  const exam = EXAMS_BY_ID[attempt.examId];
  if (!exam) return [];
  if (attempt.questionIds && attempt.questionIds.length > 0) {
    const qs = getQuestionsByIds(attempt.questionIds);
    if (qs.length === attempt.questionIds.length) return qs;
  }
  return generateExamQuestions(attempt.examId, attempt.userId, exam.moduleIds, exam.questionCount);
}
```

(Requiere `import type { ExamAttempt, ExamAnswer } from "@/types/exam";` — ya está — y `ExamQuestion`: ampliar ese import a `import type { ExamAttempt, ExamAnswer, ExamQuestion } from "@/types/exam";`.)

En `submitExam`, sustituir la línea:

```ts
  const questions = generateExamQuestions(examId, data["userId"] as string, exam.moduleIds, exam.questionCount);
```

por:

```ts
  const questions = resolveAttemptQuestions(data as ExamAttempt);
```

- [ ] **Step 5: Quality gate + commit**

Run: `npm run typecheck && npm run lint && npm run build` → limpio.

```bash
git add src/types/exam.ts src/lib/exam/scoring.ts src/lib/hooks/useExamAttempt.ts
git commit -m "fix(exams): persist attempt questionIds so review/scoring survive bank changes"
```

### Task 4.2: Consumir questionIds en las páginas take y results

**Files:**
- Modify: `src/app/[lng]/exams/[examId]/take/[attemptId]/page.tsx:116-125` (useEffect de generación)
- Modify: `src/app/[lng]/exams/[examId]/results/[attemptId]/page.tsx:36-48` (useEffect de carga)

**Interfaces:**
- Consumes: `resolveAttemptQuestions` y `getAttempt` de `@/lib/hooks/useExamAttempt` (Task 4.1).

- [ ] **Step 1: Página take — cargar el attempt y resolver**

En `take/[attemptId]/page.tsx`, asegurar los imports (getAttempt puede que ya esté importado — comprobar y ampliar):

```ts
import { getAttempt, resolveAttemptQuestions } from "@/lib/hooks/useExamAttempt";
```

Sustituir el useEffect actual:

```ts
  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push(`/${lng}/auth/sign-in`); return; }
    const exam = EXAMS_BY_ID[examId];
    if (!exam) return;
    const qs = generateExamQuestions(examId, user.uid, exam.moduleIds, exam.questionCount);
    setQuestions(qs);
    setGenerated(true);
    endTimeRef.current = Date.now() + exam.timeLimit * 1000;
  }, [user, authLoading, examId, lng, router]);
```

por:

```ts
  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push(`/${lng}/auth/sign-in`); return; }
    const exam = EXAMS_BY_ID[examId];
    if (!exam) return;
    const uid = user.uid;
    let cancelled = false;
    async function load() {
      const att = await getAttempt(attemptId);
      if (cancelled) return;
      const qs = att
        ? resolveAttemptQuestions(att)
        : generateExamQuestions(examId, uid, exam.moduleIds, exam.questionCount);
      setQuestions(qs);
      setGenerated(true);
      endTimeRef.current = Date.now() + exam.timeLimit * 1000;
    }
    load();
    return () => { cancelled = true; };
  }, [user, authLoading, examId, attemptId, lng, router]);
```

(Si tras esto `generateExamQuestions` queda sin usar en el fichero, mantenerlo: es el fallback del branch `!att`. Si lint marca `exam` como posiblemente-null dentro de `load`, TypeScript ya lo narrowea por ser `const` — si aún así protesta, capturar `const examDef = exam;` tras el guard y usar `examDef` dentro.)

- [ ] **Step 2: Página results — resolver desde el attempt**

En `results/[attemptId]/page.tsx`, cambiar el import:

```ts
import { getAttempt, resolveAttemptQuestions } from "@/lib/hooks/useExamAttempt";
```

(y quitar `generateExamQuestions` del import de `@/lib/exam/scoring`, dejando solo `identifyWeakAreas`).

En el useEffect, sustituir:

```ts
      const qs = generateExamQuestions(examId, user.uid, exam.moduleIds, exam.questionCount);
```

por:

```ts
      const qs = resolveAttemptQuestions(att);
```

- [ ] **Step 3: Quality gate + verificación end-to-end en navegador**

Run: `npm run typecheck && npm run lint && npm run build` → limpio.
En navegador (cuenta de prueba): iniciar un examen corto (p.ej. `exam-qaf-m1`) → en Firestore Console, comprobar que el doc `exam_attempts/attempt_...` tiene `questionIds` con N ids → responder y enviar → la página de resultados muestra las MISMAS preguntas respondidas, fracción y % consistentes → abrir el review de un intento ANTIGUO (pre-cambio, sin `questionIds`): sigue renderizando igual que antes (fallback).

- [ ] **Step 4: Commit**

```bash
git add "src/app/[lng]/exams/[examId]/take/[attemptId]/page.tsx" "src/app/[lng]/exams/[examId]/results/[attemptId]/page.tsx"
git commit -m "fix(exams): take/results resolve the attempt's persisted question set"
```

---

## FASE 5 — Limpieza y sincronización (P4)

### Task 5.1: Borrar Sidebar.tsx (código muerto)

**Files:**
- Delete: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1: Confirmar que sigue sin importarse**

Run (Git Bash): `grep -rn "from ['\"].*Sidebar" src/`
Expected: 0 resultados. (La otra mención de "Sidebar" en `curriculum.ts` es texto/comentario, no un import.)

- [ ] **Step 2: Borrar y verificar**

```bash
git rm src/components/layout/Sidebar.tsx
npm run typecheck && npm run lint && npm run build
```

Expected: limpio.

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: delete dead Sidebar component (never imported, rendered mock modules)"
```

### Task 5.2: Sincronizar AGENTS.md (convención del repo)

**Files:**
- Modify: `AGENTS.md`

- [ ] **Step 1: Actualizar las secciones afectadas**

En AGENTS.md:
1. **Sección "Badges are criteria-based":** añadir que `speed_learner` usa `lessons_in_one_day` (5 lecciones/día local, trackeado vía `lessonsToday`/`lessonsTodayDate` en el doc de gamification), que `perfectionist` deriva su count de `TOTAL_QUIZ_SECTIONS` (registry de lecciones) y que `perfect_module` es ahora "Perfeccionista Avanzado" (15 perfect quizzes). Añadir la regla: **los counts de badges nunca se hardcodean si pueden derivarse del contenido.**
2. **Sección "Every auth-gated client page needs both halves":** anotar que `/badges` ya está en `PROTECTED_PATTERNS` (cerrado el gap encontrado en la auditoría 2026-07-06).
3. **Sección "Exams are data-driven":** añadir que cada attempt persiste `questionIds` en su creación y que take/submit/results resuelven vía `resolveAttemptQuestions` (fallback a regeneración sembrada para attempts antiguos). Los bancos pueden crecer sin alterar reviews pasados.
4. **Nueva nota durable:** la frontera de día para rachas es la fecha LOCAL del navegador (`src/lib/utils/date.ts`), nunca `toISOString()`. La navegación prev/next de lecciones es campus-scoped (nunca cruza campus).
5. **Sección "Open items / backlog":** marcar los 11 hallazgos de la auditoría 2026-07-06 como resueltos, referenciando los hashes de commit de las fases 1-5.

- [ ] **Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): sync AGENTS.md with 2026-07-06 audit remediation (phases 1-5)"
```

- [ ] **Step 3: Push final y verificación de deploy**

```bash
git push
```

Vercel auto-deploya. Verificar en `https://playqacademy.vercel.app`: login → `/badges` (protegido) → una lección → leaderboard → un examen corto end-to-end.

---

## Self-review (hecho al escribir el plan)

- Cobertura: los 11 hallazgos de la auditoría tienen task (1→2.2, 2→2.3, 3→2.4, 4→2.1, 5→1.1, 6→3.1, 7→4.1+4.2, 8→3.2, 9→3.3+parte de 2.2, 10→5.1, 11→2.4).
- Dependencias entre fases: Task 3.3 y Task 2.2 comparten `src/lib/utils/date.ts` (se crea en 2.2 — ejecutar Fase 2 antes que la 3). Fase 4 Task 4.2 depende de 4.1. Todo lo demás es independiente.
- Sin cambios en `firestore.rules` (verificado: las reglas de `gamification` y `exam_attempts` no restringen campos).
- Los ids de badges no cambian en ningún task (earnedBadges existentes intactos).
