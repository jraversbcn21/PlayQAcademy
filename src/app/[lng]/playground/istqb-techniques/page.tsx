"use client";

import Link from "next/link";
import { useMemo, useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type Technique = "ep" | "bva" | "decisiontable" | "statetransition" | "whitebox" | "experience";

interface TechniqueCase {
  id: string;
  spec: { es: string; en: string };
  technique: Technique;
  reason: { es: string; en: string }; // why it wins AND why the tempting runner-up loses
}

const CASES: TechniqueCase[] = [
  {
    id: "tk-1",
    spec: {
      es: "Un campo «Cantidad» acepta enteros de 1 a 999. Quieres el mínimo de casos que detecte errores de rango típicos (< >, ≤ ≥) en los bordes.",
      en: "A «Quantity» field accepts integers 1 to 999. You want the fewest cases that catch typical range errors (< >, ≤ ≥) at the edges.",
    },
    technique: "bva",
    reason: {
      es: "El análisis de valores límite ataca exactamente los bordes (0, 1, 999, 1000), donde viven los errores de comparación. La partición de equivalencia es la tentadora — también reduce casos — pero un valor «del medio» por partición no detectaría un `>` mal escrito como `>=`.",
      en: "Boundary value analysis targets exactly the edges (0, 1, 999, 1000), where comparison errors live. Equivalence partitioning is the tempting one — it also reduces cases — but one mid-partition value per class wouldn't catch a `>` miswritten as `>=`.",
    },
  },
  {
    id: "tk-2",
    spec: {
      es: "El costo de envío depende de la combinación de tres condiciones booleanas independientes: ¿es socio?, ¿el paquete pesa más de 5 kg? y ¿es envío exprés? Quieres cubrir sistemáticamente cada combinación de reglas de negocio, no solo cada condición por separado.",
      en: "Shipping cost depends on the combination of three independent boolean conditions: member? package over 5 kg? express delivery? You want to systematically cover every business-rule combination, not just test each condition in isolation.",
    },
    technique: "decisiontable",
    reason: {
      es: "La tabla de decisión modela exactamente combinaciones de condiciones independientes como reglas explícitas, asegurando que cada combinación relevante (2³ = 8) se exprese y se pruebe. La partición de equivalencia es la tentadora — cada condición booleana parece una partición en sí misma — pero probar cada condición por separado no garantiza cubrir las combinaciones entre ellas, que es justo donde vive el riesgo de negocio.",
      en: "A decision table models exactly this: independent conditions combined into explicit rules, ensuring every relevant combination (2³ = 8) is expressed and tested. Equivalence partitioning is the tempting one — each boolean condition looks like its own partition — but testing each condition separately doesn't guarantee covering the combinations between them, which is exactly where the business risk lives.",
    },
  },
  {
    id: "tk-3",
    spec: {
      es: "Un documento se mueve por los estados Borrador → En revisión → Aprobado → Publicado; algunos eventos (por ejemplo «publicar») solo son válidos en ciertos estados. Además de las transiciones permitidas, quieres probar también las transiciones inválidas (publicar un documento aún en Borrador).",
      en: "A document moves through the states Draft → In Review → Approved → Published; some events (e.g. «publish») are only valid in certain states. Besides the allowed transitions, you also want to test invalid transitions (publishing a document still in Draft).",
    },
    technique: "statetransition",
    reason: {
      es: "La transición de estados modela los estados posibles del documento y qué eventos son válidos en cada uno, permitiendo diseñar casos tanto para transiciones válidas como inválidas. La tabla de decisión es la tentadora — también organiza combinaciones de condiciones — pero no captura el orden ni la dependencia del estado actual: no distingue si «publicar» falla porque el documento está en Borrador y no en Aprobado, que es justo lo que importa aquí.",
      en: "State transition testing models the document's possible states and which events are valid in each one, letting you design cases for both valid and invalid transitions. The decision table is the tempting one — it also organizes combinations of conditions — but it doesn't capture order or dependence on the current state: it doesn't distinguish whether «publish» fails because the document is in Draft rather than Approved, which is exactly what matters here.",
    },
  },
  {
    id: "tk-4",
    spec: {
      es: "Un campo acepta cualquier cadena de texto de entre 3 y 20 caracteres. Quieres agrupar las entradas de forma que cada grupo se comporte igual frente al sistema, y probar solo un representante por grupo.",
      en: "A field accepts any string between 3 and 20 characters. You want to group inputs so each group behaves the same way against the system, and test only one representative per group.",
    },
    technique: "ep",
    reason: {
      es: "La partición de equivalencia agrupa las entradas en clases que el sistema trata de forma equivalente y elige un único representante por clase, que es exactamente lo que pide el enunciado. El análisis de valores límite es el tentador — el rango 3-20 sugiere bordes — pero BVA se enfoca en los extremos de cada partición (2, 3, 20, 21), no en reducir el conjunto completo de entradas a un representante por grupo.",
      en: "Equivalence partitioning groups inputs into classes the system treats the same way and picks a single representative per class, which is exactly what the prompt asks for. Boundary value analysis is the tempting one — the 3-20 range suggests edges — but BVA focuses on the extremes of each partition (2, 3, 20, 21), not on reducing the whole input set down to one representative per group.",
    },
  },
  {
    id: "tk-5",
    spec: {
      es: "Debes alcanzar una cobertura de ramas del 100% en el flujo de control de una función crítica de cálculo de precios.",
      en: "You must achieve 100% branch coverage of a critical pricing function's control flow.",
    },
    technique: "whitebox",
    reason: {
      es: "La cobertura de ramas es una métrica de caja blanca: los casos se diseñan a partir de la estructura interna del código (sus condiciones y bifurcaciones), no de su especificación externa. La tabla de decisión es la tentadora — «cálculo de precios» suena a reglas de negocio — pero una tabla de decisión se construye desde los requisitos, sin garantizar que cada rama del código realmente se ejecute; solo mirando el código fuente puedes asegurar el 100% de cobertura de ramas.",
      en: "Branch coverage is a white-box metric: cases are designed from the code's internal structure (its conditions and branches), not from its external specification. The decision table is the tempting one — «pricing calculation» sounds like business rules — but a decision table is built from requirements and doesn't guarantee that every branch of the code actually executes; only looking at the source code lets you ensure 100% branch coverage.",
    },
  },
  {
    id: "tk-6",
    spec: {
      es: "Un tester veterano explora, sin guiones ni casos escritos, un área donde lanzamientos similares anteriores escondieron defectos de concurrencia.",
      en: "A veteran tester explores, without scripts or written cases, an area where similar past releases hid concurrency defects.",
    },
    technique: "experience",
    reason: {
      es: "Las pruebas basadas en la experiencia (como las exploratorias o la intuición del tester para adivinar errores) aprovechan el conocimiento tácito del tester sobre dónde suelen esconderse los defectos, sin necesitar casos escritos de antemano. La caja blanca es la tentadora — «concurrencia» suena a código — pero exige derivar casos de la estructura interna del código; aquí no se menciona ningún diseño formal, solo la intuición de un tester veterano explorando libremente.",
      en: "Experience-based testing (like exploratory testing or a tester's error-guessing intuition) draws on the tester's tacit knowledge of where defects tend to hide, without needing cases scripted in advance. White-box is the tempting one — «concurrency» sounds code-level — but it requires deriving cases from the code's internal structure, and nothing here mentions any formal design, just a veteran tester's intuition exploring freely.",
    },
  },
  {
    id: "tk-7",
    spec: {
      es: "La prima de un seguro se calcula combinando reglas sobre el rango de edad, el historial de siniestros (sí/no) y la región del asegurado. Los auditores exigen que se ejercite cada combinación de reglas.",
      en: "An insurance premium is calculated by combining rules on age bracket, claim history (yes/no), and region. Auditors demand that every rule combination be exercised.",
    },
    technique: "decisiontable",
    reason: {
      es: "La tabla de decisión traduce «edad × historial × región» en reglas explícitas y garantiza sistemáticamente que cada combinación exigida por los auditores quede cubierta por un caso de prueba. La partición de equivalencia es la tentadora — «rango de edad» suena a partición — pero EP reduce cada condición por separado a un representante; no asegura que la combinación completa de las tres condiciones se ponga a prueba, que es justo la exigencia de auditoría.",
      en: "A decision table translates «age × claim history × region» into explicit rules and systematically guarantees that every combination the auditors demand is covered by a test case. Equivalence partitioning is the tempting one — «age bracket» sounds like a partition — but EP reduces each condition separately to one representative; it doesn't ensure the full combination of all three conditions gets exercised, which is exactly the audit requirement.",
    },
  },
  {
    id: "tk-8",
    spec: {
      es: "El flujo de un cajero automático: Inactivo → Tarjeta insertada → PIN correcto/PIN incorrecto (al tercer intento fallido, la tarjeta queda retenida). Quieres verificar tanto las secuencias de eventos permitidas como las bloqueadas.",
      en: "An ATM card flow: Idle → Card inserted → PIN ok / PIN fail (on the third failed attempt, the card is swallowed). You want to verify both the allowed and the blocked event sequences.",
    },
    technique: "statetransition",
    reason: {
      es: "La transición de estados modela el cajero como una máquina de estados donde el evento válido depende del estado actual y del historial de intentos (primer, segundo, tercer fallo), permitiendo probar secuencias permitidas y bloqueadas (un PIN correcto tras retener ya la tarjeta). La tabla de decisión es la tentadora — «tres intentos» parece una regla de combinación — pero evalúa condiciones en un instante, sin memoria de la secuencia previa; aquí importa el orden y el conteo acumulado de fallos, no una combinación estática de condiciones.",
      en: "State transition testing models the ATM as a state machine where the valid event depends on the current state and the history of attempts (first, second, third failure), letting you test both allowed sequences and blocked ones (a correct PIN after the card was already swallowed). The decision table is the tempting one — «three attempts» sounds like a combination rule — but it evaluates conditions at a single instant, with no memory of prior events; what matters here is the order and the accumulated failure count, not a static combination of conditions.",
    },
  },
  {
    id: "tk-9",
    spec: {
      es: "Un campo de fecha de nacimiento se prueba en dos pasos. Primer paso: se particiona en fechas válidas, fechas futuras y cadenas con formato inválido, y se prueba un representante de cada grupo. Segundo paso: además, se prueban específicamente el 29 de febrero y los fines de mes (28/30/31). ¿Qué técnica se añade en ese SEGUNDO paso, dirigido a esas fechas límite concretas?",
      en: "A date-of-birth field is tested in two steps. First step: it's partitioned into valid dates, future dates, and malformed strings, and one representative from each group is tested. Second step: additionally, 29 February and month-end dates (28/30/31) are tested specifically. Which technique is added in that SECOND step, targeting those specific boundary dates?",
    },
    technique: "bva",
    reason: {
      es: "El primer paso ya fue partición de equivalencia (válidas, futuras, mal formadas); el segundo paso, dirigido a fechas límite muy concretas como el 29 de febrero y los cierres de mes, es el sello del análisis de valores límite: se prueban los bordes exactos de un dominio (aquí, los límites del calendario) donde suelen vivir los errores de cálculo. La partición de equivalencia es la tentadora — la palabra «particiona» aparece en el enunciado — pero esa técnica ya se aplicó en el primer paso; un representante «del medio» de la partición de fechas válidas nunca elegiría específicamente el 29 de febrero o un día 31, que es justo lo que añade el segundo paso.",
      en: "The first step was already equivalence partitioning (valid, future, malformed); the second step, aimed at very specific boundary dates like 29 February and month-end closings, is the hallmark of boundary value analysis: testing the exact edges of a domain (here, the calendar's limits) where calculation errors tend to live. Equivalence partitioning is the tempting one — the word «partitioned» appears in the prompt — but that technique was already applied in step one; a «middle-of-the-partition» representative from the valid-dates group would never specifically pick 29 February or a 31st, which is exactly what the second step adds.",
    },
  },
  {
    id: "tk-10",
    spec: {
      es: "Una sesión de pruebas acotada en el tiempo (time-boxed) sobre una funcionalidad totalmente nueva que todavía no tiene especificación escrita, guiada por una carta o misión (charter) en lugar de casos de prueba predefinidos.",
      en: "A time-boxed testing session on a brand-new feature that has no written specification yet, guided by a charter rather than predefined test cases.",
    },
    technique: "experience",
    reason: {
      es: "Sin especificación escrita, una sesión exploratoria acotada en el tiempo y guiada por un charter se apoya en la habilidad, la intuición y el conocimiento previo del tester para diseñar y ejecutar las pruebas sobre la marcha — la esencia de las técnicas basadas en la experiencia. La caja blanca es la tentadora — «no hay especificación» podría sugerir que solo queda mirar el código — pero exige derivar casos de la estructura interna del código, y aquí no se menciona ningún análisis de código: el charter guía la exploración del comportamiento observable, no de su implementación.",
      en: "With no written specification, a time-boxed exploratory session guided by a charter relies on the tester's skill, intuition, and prior knowledge to design and execute tests on the fly — the essence of experience-based techniques. White-box is the tempting one — «no specification» might suggest all that's left is looking at the code — but it requires deriving cases from the code's internal structure, and nothing here mentions any code analysis: the charter guides exploration of observable behavior, not its implementation.",
    },
  },
];

const TECHNIQUE_OPTIONS: Technique[] = ["ep", "bva", "decisiontable", "statetransition", "whitebox", "experience"];

const TECHNIQUE_LABEL: Record<Technique, { es: string; en: string }> = {
  ep: { es: "Partición de equivalencia", en: "Equivalence partitioning" },
  bva: { es: "Valores límite", en: "Boundary values" },
  decisiontable: { es: "Tabla de decisión", en: "Decision table" },
  statetransition: { es: "Transición de estados", en: "State transition" },
  whitebox: { es: "Caja blanca", en: "White-box" },
  experience: { es: "Basada en experiencia", en: "Experience-based" },
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbTechniquesDrillPage(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [answers, setAnswers] = useState<Record<string, Technique>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = CASES.filter((c) => answers[c.id]).length;
  const allAnswered = answeredCount === CASES.length;

  const score = useMemo(() => {
    if (!submitted) return 0;
    return CASES.filter((c) => answers[c.id] === c.technique).length;
  }, [submitted, answers]);

  const passed = score >= 7;

  function selectTechnique(id: string, technique: Technique) {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [id]: technique }));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Selección de Técnica de Diseño" : "Test Design Technique Picker"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Para cada mini-especificación, elige la técnica de diseño de pruebas más adecuada. Cuando termines, envía tus respuestas."
              : "For each mini-spec, pick the single best-fit test design technique. When you're done, submit your answers."}
          </p>
        </div>

        <div className="space-y-5">
          {CASES.map((c) => {
            const selected = answers[c.id];
            const isCorrect = submitted && selected === c.technique;
            const isWrong = submitted && selected !== undefined && selected !== c.technique;
            return (
              <section key={c.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-5">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {c.spec[lng as "es" | "en"] ?? c.spec.en}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {TECHNIQUE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={selected === t}
                      disabled={submitted}
                      onClick={() => selectTechnique(c.id, t)}
                      className={[
                        "rounded-full border px-3 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed",
                        selected === t
                          ? (submitted
                              ? (t === c.technique ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400" : "border-red-500/40 bg-red-500/10 text-red-400")
                              : "border-brand-gold-500/40 bg-brand-gold-500/10 text-brand-gold-400")
                          : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                      ].join(" ")}
                    >
                      {TECHNIQUE_LABEL[t][lng as "es" | "en"] ?? TECHNIQUE_LABEL[t].en}
                    </button>
                  ))}
                </div>

                {submitted && (
                  <p className={["mt-3 text-xs", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                    {isCorrect ? "✓ " : "✗ "}
                    {c.reason[lng as "es" | "en"] ?? c.reason.en}
                    {isWrong && (
                      <> — {lng === "es" ? "correcto:" : "correct:"} {TECHNIQUE_LABEL[c.technique][lng as "es" | "en"] ?? TECHNIQUE_LABEL[c.technique].en}</>
                    )}
                  </p>
                )}
              </section>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {!submitted ? (
            <div className="flex items-center gap-4">
              <button
                type="button"
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className="rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {lng === "es" ? `Enviar respuestas (${answeredCount}/${CASES.length})` : `Submit answers (${answeredCount}/${CASES.length})`}
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {score}/{CASES.length} {lng === "es" ? "correctas" : "correct"}
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
                </button>
              </div>

              <div>
                <Link
                  href={passed ? `/${lng}/exams` : `/${lng}/campus/istqb`}
                  className="inline-block rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {passed
                    ? lng === "es"
                      ? "¡Nivel certificación! Prueba un simulacro CTFL completo."
                      : "Certification level! Try a full CTFL mock exam."
                    : lng === "es"
                      ? "Repasa las técnicas en el campus ISTQB y vuelve a intentarlo."
                      : "Review the techniques in the ISTQB campus and try again."}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
