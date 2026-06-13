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

---

## Paso 1 — Abstracción padre + helper de exámenes (riesgo: bajo)
- [ ] `src/types/campus.ts`: añadir interface `QaCampus` (`id`, `title: Bilingual`, `description: Bilingual`, `tagline?: Bilingual`).
- [ ] `src/lib/constants/campuses.ts`: exportar `QA_CAMPUS: QaCampus` (id `"qa"`, título "Campus QA" / "QA Campus") y añadir `getSubCampuses(): Campus[]` (= `CAMPUSES` ordenado por `order`).
- [ ] `src/lib/constants/exams.ts`: añadir `getExamsForCampus(campusId): Exam[]` — filtra `EXAMS` donde **todos** los `exam.moduleIds` estén en los `moduleIds` del campus (subset = propiedad inequívoca). Reutiliza `getModulesForCampus`.
- [ ] **Validar:** `npm run typecheck`; comprobar `getExamsForCampus("istqb") === ["exam-istqb-ctfl"]` y `getExamsForCampus("automation")` = los 4 exámenes de automation.

## Paso 2 — Neutralizar branding del root (riesgo: bajo)
- [ ] `src/app/layout.tsx:24-52`: title default → neutral (ej. "PlayQAcademy — Domina el QA de software"); actualizar description/keywords/openGraph/twitter a copy QA-amplio (Fundamentos + ISTQB + Automation).
- [ ] `src/app/[lng]/layout.tsx:23-47`: misma neutralización en `generateMetadata` (mantener ramas ES/EN y template `%s | PlayQAcademy`).
- [ ] **Validar:** view-source de `<title>`/`<meta og:*>` en `/es` y `/en` sin "Playwright" en el title default.

## Paso 3 — Reframe del landing como hub QA Campus (riesgo: bajo-medio)
- [ ] `src/app/[lng]/page.tsx`: mantener hero + `CampusGrid` (ya itera `CAMPUSES`); actualizar copy del hero a framing "QA Campus" vía claves i18n (`hero.title`, `hero.tagline`, `landing.campuses.title/subtitle`). Opcional: tomar título/subtítulo del hub desde `QA_CAMPUS`.
- [ ] `public/locales/es/common.json` y `public/locales/en/common.json`: actualizar esas claves. **Mantener paridad ES/EN** (sin strings vacíos, sin claves faltantes — AGENTS.md item 7).
- [ ] **Validar:** `/es` y `/en` muestran copy del hub, sin flash de hidratación, sin warnings de claves faltantes.

## Paso 4 — Página sub-campus: exámenes data-driven + breadcrumb padre (riesgo: medio)
- [ ] `src/app/[lng]/campus/[campusId]/page.tsx`: reemplazar el bloque `campusId === "istqb"` (líneas 76-88) por `getExamsForCampus(campusId).map(...)` → un enlace "Tomar examen" por examen a `/${lng}/exams/${exam.id}/start`, título desde `exam.title[lang]`.
- [ ] Añadir breadcrumb `QA Campus → {campus.title[lang]}`, con el padre enlazando a `/${lng}` (hub). Mantener el "volver al dashboard" existente.
- [ ] **Nota:** los 3 exámenes rotos de automation quedarán visibles aquí (ya lo estaban en `/exams`). Su corrección es rama aparte — anotarlo en el PR.
- [ ] **Validar:** ISTQB muestra botón CTFL → `/exams/exam-istqb-ctfl/start`; automation lista sus exámenes; qaFundamentals sin exámenes ni crash; breadcrumb padre vuelve al hub. Ambos idiomas.

## Paso 5 — (Opcional, misma rama) metadata SEO por campus (riesgo: medio)
- [ ] La página es `"use client"`, así que `generateMetadata` no puede ir directo. Extraer el componente actual a un hijo cliente (ej. `CampusDetail.tsx`) y convertir `page.tsx` en server component que añade `generateMetadata` (deriva title/description de `getCampusById`) y renderiza el hijo cliente.
- [ ] Mantener `useParams`/`useTranslation` y demás hooks en el hijo cliente.
- [ ] **Validar:** OG de `/es/campus/istqb` vs `/es/campus/automation` difieren y coinciden con el campus.
- [ ] *Si falta tiempo, diferir a follow-up: los pasos 1-4 ya cumplen el requisito central.*

## Paso 6 — Pase de consistencia (riesgo: bajo)
- [ ] Verificar `Navbar`/`Footer`: logo/home apunta al hub `/[lng]` y sin etiquetas solo-automation.
- [ ] Confirmar que `dashboard/page.tsx` (grid de campus, itera `CAMPUSES`) se lee bien bajo el framing QA Campus.

---

## Verificación final end-to-end
1. [ ] `npm run typecheck` limpio; `npm run lint` sin errores **nuevos** (más allá de los ~45 preexistentes documentados).
2. [ ] `npm run dev` (puerto 3001), recorrido en **`/es` y `/en`**:
   - [ ] Hub root: hero neutral QA Campus + 3 cards; `<title>` sin "Playwright".
   - [ ] `/campus/istqb`: botón examen CTFL funciona; breadcrumb → hub.
   - [ ] `/campus/automation`: lista exámenes; breadcrumb → hub.
   - [ ] `/campus/qaFundamentals`: coming-soon, sin exámenes, sin crash.
   - [ ] Abrir una lección (logueado) y confirmar que el progreso sigue guardándose (prueba que la capa de datos no se tocó).
3. [ ] i18n: sin warnings de claves faltantes; sin strings `""`; sin flash de hidratación.
4. [ ] Helper: assert de `getExamsForCampus("istqb")` y `getExamsForCampus("automation")`.

## Archivos críticos a tocar
- `src/types/campus.ts` — interface `QaCampus`
- `src/lib/constants/campuses.ts` — `QA_CAMPUS`, `getSubCampuses()`
- `src/lib/constants/exams.ts` — `getExamsForCampus()`
- `src/app/layout.tsx`, `src/app/[lng]/layout.tsx` — branding neutral
- `src/app/[lng]/page.tsx` — hub QA Campus
- `src/app/[lng]/campus/[campusId]/page.tsx` — exámenes data-driven + breadcrumb (+ split server/client opcional)
- `public/locales/{es,en}/common.json` — claves hub + breadcrumb + botón examen (paridad)
