# TODO — Reestructuración "QA Campus" como dominio raíz

> **Origen:** plan aprobado en `~/.claude/plans/idempotent-giggling-wolf.md`.
> **Rama sugerida:** `feature/qa-campus-root` (crear desde `feature/unified-campus`).
> **Estado al iniciar:** pendiente de ejecutar — NO se ha tocado código todavía.

## Decisiones ya tomadas (no reabrir)
- [x] Entry point: el root `/[lng]` **se convierte en el hub QA Campus**. URLs de sub-campus quedan planas `/campus/[campusId]` (sin redirects).
- [x] Abstracción: **un solo padre fijo `QA_CAMPUS`** (no modelo genérico de grupos).
- [x] Branding: **neutralizar** el branding automation-céntrico del root + enlaces de examen **data-driven** (quitar hardcode `istqb`).

## Hallazgo clave (recordatorio)
`Campus` ya es una *capa de agrupación derivada sobre módulos*. Progreso, gamificación, exámenes y badges se indexan por `moduleId`/`examId`, **nunca por `campusId`**.
→ **No hay migración de Firestore. No hay rotura de URLs. No hay riesgo de datos.** Es refactor de UI/navegación/branding + abstracción fina.

## Fuera de alcance (ramas separadas, según AGENTS.md)
Bugs de exámenes (`exam-module-2-3`, `exam-midterm`, `exam-final`, `calculateScore`, rediseño `/exams`), contenido de QA Fundamentals, y los ~45 errores de lint preexistentes.

> **Estado a 2026-06-19 — RESUELTO.** Lo anterior describe el alcance *en el momento* de esta reestructuración; desde entonces estos puntos se arreglaron en commits dedicados, así que **ya no son pendientes**:
> - Pools de los módulos 2/3 completados → `exam-module-2-3` deliverable (`8d494c7`); `exam-midterm`/`exam-final` con pools de sobra (m1-m8 = 175 preguntas).
> - `calculateScore` reescrito a modelo equal-weight consistente (`a3ac5af`).
> - `isExamReady` ahora exige cobertura por módulo, no solo total (`05c2733`).
> - Los ~45 errores de lint + 13 de typecheck preexistentes corregidos (`26aec48`); `typecheck`/`lint` limpios.
>
> Verificación estática (2026-06-19): los **26 exámenes** pasan `isExamReady` (pool ≥ `questionCount` y cada módulo aporta ≥1). Nota menor: `exam-module-2-3` (25/25), `exam-qaf-m1` (10/10) y `exam-qaf-m2` (8/8) tienen margen cero — sirven el pool completo en cada intento (sin variedad en reintentos). Pendiente real: verificación end-to-end en navegador (`AGENTS.md` → Open items). `AGENTS.md` ya refleja todo esto y es la fuente viva.

---

## Paso 1 — Abstracción padre + helper de exámenes (riesgo: bajo)
- [x] `src/types/campus.ts`: añadir interface `QaCampus` (`id`, `title: Bilingual`, `description: Bilingual`, `tagline?: Bilingual`).
- [x] `src/lib/constants/campuses.ts`: exportar `QA_CAMPUS: QaCampus` (id `"qa"`, título "Campus QA" / "QA Campus") y añadir `getSubCampuses(): Campus[]` (= `CAMPUSES` ordenado por `order`).
- [x] `src/lib/constants/exams.ts`: añadir `getExamsForCampus(campusId): Exam[]` — filtra `EXAMS` donde **todos** los `exam.moduleIds` estén en los `moduleIds` del campus (subset = propiedad inequívoca). Reutiliza `getModulesForCampus`.
- [x] **Validar:** `npm run typecheck`; comprobar `getExamsForCampus("istqb") === ["exam-istqb-ctfl"]` y `getExamsForCampus("automation")` = los 4 exámenes de automation.

## Paso 2 — Neutralizar branding del root (riesgo: bajo)
- [x] `src/app/layout.tsx:24-52`: title default → neutral (ej. "PlayQAcademy — Domina el QA de software"); actualizar description/keywords/openGraph/twitter a copy QA-amplio (Fundamentos + ISTQB + Automation).
- [x] `src/app/[lng]/layout.tsx:23-47`: misma neutralización en `generateMetadata` (mantener ramas ES/EN y template `%s | PlayQAcademy`).
- [x] **Validar:** view-source de `<title>`/`<meta og:*>` en `/es` y `/en` sin "Playwright" en el title default.

## Paso 3 — Reframe del landing como hub QA Campus (riesgo: bajo-medio)
- [x] `src/app/[lng]/page.tsx`: mantener hero + `CampusGrid` (ya itera `CAMPUSES`); actualizar copy del hero a framing "QA Campus" vía claves i18n (`hero.title`, `hero.tagline`, `landing.campuses.title/subtitle`). Opcional: tomar título/subtítulo del hub desde `QA_CAMPUS`.
  - `hero.title` y `landing.campuses.title/subtitle` ya estaban en framing neutral ("Tu carrera en QA empieza aquí" / "Elige tu campus") — sin cambios.
  - `hero.tagline` actualizado a "Bienvenido al Campus QA: elige tu camino entre Fundamentos de QA, certificación ISTQB CTFL y automatización con Playwright." (ES) / "Welcome to QA Campus: choose your path between QA Fundamentals, ISTQB CTFL certification, and Playwright automation." (EN).
- [x] `public/locales/es/common.json` y `public/locales/en/common.json`: actualizar esas claves. **Mantener paridad ES/EN** (sin strings vacíos, sin claves faltantes — AGENTS.md item 7).
- [x] **Validar:** `/es` y `/en` muestran copy del hub, sin flash de hidratación, sin warnings de claves faltantes. *(confirmado en walkthrough manual final — ver Verificación final end-to-end)*

## Paso 4 — Página sub-campus: exámenes data-driven + breadcrumb padre (riesgo: medio)
- [x] `src/app/[lng]/campus/[campusId]/page.tsx`: reemplazar el bloque `campusId === "istqb"` (líneas 76-88) por `getExamsForCampus(campusId).map(...)` → un enlace "Tomar examen" por examen a `/${lng}/exams/${exam.id}/start`, título desde `exam.title[lang]`.
- [x] Añadir breadcrumb `QA Campus → {campus.title[lang]}`, con el padre enlazando a `/${lng}` (hub). Mantener el "volver al dashboard" existente.
- [x] **Nota:** los 3 exámenes rotos de automation quedarán visibles aquí (ya lo estaban en `/exams`). Su corrección es rama aparte — anotarlo en el PR.
- [x] **Validar:** ISTQB muestra botón CTFL → `/exams/exam-istqb-ctfl/start`; automation lista sus exámenes; qaFundamentals sin exámenes ni crash; breadcrumb padre vuelve al hub. Ambos idiomas.
  - Confirmado vía curl: ISTQB → 1 link (`exam-istqb-ctfl`), automation → 4 links (`exam-module-1`, `exam-module-2-3`, `exam-midterm`, `exam-final`), qaFundamentals → 0 links. Breadcrumb "Campus QA"/"QA Campus" → `/es` y `/en` respectivamente, en los 3 campus.

## Paso 5 — (Opcional, misma rama) metadata SEO por campus (riesgo: medio)
- [x] **DONE** (commit `6a43861`, follow-up session) — implementado tal como estaba previsto, con el hijo cliente llamado `CampusPageClient.tsx` (en vez de `CampusDetail.tsx`).
- [x] La página era `"use client"`, así que `generateMetadata` no podía ir directo. Se extrajo el componente original a `CampusPageClient.tsx` y `page.tsx` pasó a ser un server component que exporta `generateMetadata` (deriva title/description/OG de `getCampusById`) y renderiza `<CampusPageClient />`.
- [x] `useParams`/`useTranslation` y demás hooks se mantuvieron en `CampusPageClient.tsx`.
- [x] **Validado:** vía curl, el `<title>`/`<meta name="description">`/`og:title`/`og:description`/`og:locale` difieren correctamente entre `qaFundamentals`, `automation` e `istqb` (es/en), y el caso "campus no encontrado" devuelve un título de fallback.

## Paso 6 — Pase de consistencia (riesgo: bajo)
- [x] Verificar `Navbar`/`Footer`: logo/home apunta al hub `/[lng]` y sin etiquetas solo-automation.
  - Navbar `Logo` → `/` (redirige a `/[lng]` hub vía middleware). Footer brand → `/${currentLng}` (hub). Ambos OK sin cambios.
  - `footer.tagline` era automation-céntrico ("De QA Manual a QA Automatizado..."/"From Manual QA to Automated QA..."). Actualizado a framing QA Campus neutral en ES/EN, consistente con `hero.tagline` y metadata de Paso 2.
- [x] Confirmar que `dashboard/page.tsx` (grid de campus, itera `CAMPUSES`) se lee bien bajo el framing QA Campus.
  - Sección "Campus selector" usa `t("campus.title")` = "Campus" (neutral), itera `CAMPUSES` con estilo igualitario para las 3. Sin cambios necesarios.

---

## Verificación final end-to-end
1. [x] `npm run typecheck` limpio; `npm run lint` sin errores **nuevos** (más allá de los ~45 preexistentes documentados). *(13 errores de typecheck + ~45 de lint confirmados idénticos al commit pre-rama `22f2dca` — no son nuevos)*
2. [x] `npm run dev` (puerto 3001), recorrido en **`/es` y `/en`**:
   - [x] Hub root: hero neutral QA Campus + 3 cards; `<title>` sin "Playwright".
   - [x] `/campus/istqb`: botón examen CTFL funciona; breadcrumb → hub.
   - [x] `/campus/automation`: lista exámenes; breadcrumb → hub.
   - [x] `/campus/qaFundamentals`: coming-soon, sin exámenes, sin crash.
   - [x] Abrir una lección (logueado) y confirmar que el progreso sigue guardándose (prueba que la capa de datos no se tocó).
3. [x] i18n: sin warnings de claves faltantes; sin strings `""`; sin flash de hidratación.
4. [x] Helper: assert de `getExamsForCampus("istqb")` y `getExamsForCampus("automation")`. *(cubierto en Paso 1)*

**Walkthrough manual confirmado por Jorge en `/es` y `/en` — 2026-06-13. Restructure QA Campus root listo para PR/merge.**

## Archivos críticos a tocar
- `src/types/campus.ts` — interface `QaCampus`
- `src/lib/constants/campuses.ts` — `QA_CAMPUS`, `getSubCampuses()`
- `src/lib/constants/exams.ts` — `getExamsForCampus()`
- `src/app/layout.tsx`, `src/app/[lng]/layout.tsx` — branding neutral
- `src/app/[lng]/page.tsx` — hub QA Campus
- `src/app/[lng]/campus/[campusId]/page.tsx` — exámenes data-driven + breadcrumb (+ split server/client opcional)
- `public/locales/{es,en}/common.json` — claves hub + breadcrumb + botón examen (paridad)
