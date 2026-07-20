"use client";

import Link from "next/link";
import { useState, use } from "react";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

interface TFStatement {
  id: string;
  statement: { es: string; en: string };
  answer: boolean; // true = Verdadero
  explanation: { es: string; en: string };
}

const STATEMENTS: TFStatement[] = [
  {
    id: "tf-1",
    statement: {
      es: "Con suficiente tiempo y recursos, es posible probar exhaustivamente todas las combinaciones de entradas de un sistema.",
      en: "Given enough time and resources, it is possible to exhaustively test all input combinations of a system.",
    },
    answer: false,
    explanation: {
      es: "Falso — es el principio 2 del testing: las pruebas exhaustivas son imposibles. Salvo en casos triviales, las combinaciones de entradas y precondiciones son astronómicas; por eso se priorizan riesgos y se usan técnicas de diseño para elegir un subconjunto potente de casos.",
      en: "False — this is testing principle 2: exhaustive testing is impossible. Except in trivial cases, the combinations of inputs and preconditions are astronomical; that's why we prioritize by risk and use design techniques to pick a powerful subset of cases.",
    },
  },
  {
    id: "tf-2",
    statement: {
      es: "El testing puede mostrar que existen defectos en un sistema, pero nunca puede demostrar que no existen defectos.",
      en: "Testing can show that defects are present in a system, but it can never prove that no defects exist.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — es el principio 1 del testing. Reducir la probabilidad de defectos no descubiertos es posible, pero aunque no se encuentre ninguno durante las pruebas, eso no prueba que el sistema esté libre de ellos.",
      en: "True — this is testing principle 1. Testing can reduce the probability of undiscovered defects remaining, but even finding zero defects during a test run does not prove the system is defect-free.",
    },
  },
  {
    id: "tf-3",
    statement: {
      es: "Si una ronda de pruebas termina sin encontrar ningún defecto, eso garantiza que el sistema cumple con las necesidades reales de los usuarios y puede pasar a producción.",
      en: "If a round of testing finds zero defects, that guarantees the system meets users' real needs and is ready for production.",
    },
    answer: false,
    explanation: {
      es: "Falso — es la falacia de la ausencia de errores. Un sistema puede estar técnicamente libre de defectos y aun así no cumplir las necesidades del usuario, ser difícil de usar o no resolver el problema de negocio; cero defectos no equivale a calidad adecuada.",
      en: "False — this is the absence-of-errors fallacy. A system can be technically defect-free and still fail to meet users' needs, be hard to use, or miss the actual business problem; zero defects found doesn't equal adequate quality.",
    },
  },
  {
    id: "tf-4",
    statement: {
      es: "En la mayoría de los sistemas, un número reducido de módulos concentra la mayor parte de los defectos detectados.",
      en: "In most systems, a small number of modules account for the majority of defects found.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — es el principio de agrupación de defectos (defect clustering), similar al principio de Pareto: una parte pequeña del sistema suele concentrar la mayoría de los defectos, lo que ayuda a priorizar dónde probar con más intensidad.",
      en: "True — this is the defect clustering principle, similar to the Pareto principle: a small part of the system usually concentrates most of the defects found, which helps prioritize where to test more intensively.",
    },
  },
  {
    id: "tf-5",
    statement: {
      es: "Ejecutar exactamente la misma batería de pruebas una y otra vez, sin cambios, sigue encontrando nuevos defectos indefinidamente.",
      en: "Running exactly the same test suite over and over, unchanged, keeps finding new defects indefinitely.",
    },
    answer: false,
    explanation: {
      es: "Falso — es la paradoja del pesticida invertida. Si se repiten siempre los mismos casos de prueba, dejan de encontrar defectos nuevos porque el software «se vuelve inmune» a ellos; hay que revisar y variar las pruebas para seguir siendo efectivos.",
      en: "False — this inverts the pesticide paradox. Running the same test cases over and over stops finding new defects because the software becomes 'immune' to them; test cases need to be reviewed and varied to stay effective.",
    },
  },
  {
    id: "tf-6",
    statement: {
      es: "Iniciar las actividades de prueba lo antes posible en el ciclo de vida del desarrollo reduce costos y ahorra tiempo a largo plazo.",
      en: "Starting test activities as early as possible in the development lifecycle reduces costs and saves time in the long run.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — es el principio de pruebas tempranas (shift-left). Cuanto antes se detecta un defecto — idealmente en requisitos o diseño —, más barato es corregirlo, comparado con encontrarlo ya en producción.",
      en: "True — this is the early testing principle (shift-left). The earlier a defect is found — ideally in requirements or design — the cheaper it is to fix, compared to finding it already in production.",
    },
  },
  {
    id: "tf-7",
    statement: {
      es: "Como ambas son aplicaciones de software, una app bancaria y un videojuego casual deberían probarse exactamente con el mismo enfoque, el mismo rigor y las mismas técnicas.",
      en: "Since both are software applications, a banking app and a casual video game should be tested with exactly the same approach, rigor, and techniques.",
    },
    answer: false,
    explanation: {
      es: "Falso — es el principio de que el testing depende del contexto. Una app bancaria exige un enfoque mucho más riguroso en seguridad y precisión de cálculos que un videojuego casual, donde la prioridad puede ser la experiencia de usuario; el contexto determina las técnicas y el nivel de rigor.",
      en: "False — this is the testing-is-context-dependent principle. A banking app demands a far more rigorous approach to security and calculation accuracy than a casual game, where the priority might be user experience; context should drive the techniques and level of rigor used.",
    },
  },
  {
    id: "tf-8",
    statement: {
      es: "El testing y la depuración (debugging) son la misma actividad, normalmente realizada por el mismo rol.",
      en: "Testing and debugging are the same activity, usually carried out by the same role.",
    },
    answer: false,
    explanation: {
      es: "Falso — son actividades distintas. El testing (normalmente a cargo de testers) busca y reporta fallos; la depuración (normalmente a cargo de desarrolladores) investiga la causa raíz del defecto y lo corrige.",
      en: "False — these are distinct activities. Testing (usually done by testers) finds and reports failures; debugging (usually done by developers) investigates the defect's root cause and fixes it.",
    },
  },
  {
    id: "tf-9",
    statement: {
      es: "El aseguramiento de la calidad (QA) se centra en los procesos utilizados para construir el producto, mientras que el testing se centra en el producto en sí.",
      en: "Quality assurance (QA) focuses on the processes used to build the product, while testing focuses on the product itself.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — el QA busca mejorar y estandarizar los procesos de desarrollo para prevenir defectos, mientras que el testing evalúa directamente el producto de trabajo (el software) para detectarlos.",
      en: "True — QA aims to improve and standardize the development processes to prevent defects, while testing directly evaluates the work product (the software) to detect them.",
    },
  },
  {
    id: "tf-10",
    statement: {
      es: "Una equivocación humana (error) puede introducir un defecto en el código, y ese defecto puede llegar a provocar un fallo (failure) al ejecutarse.",
      en: "A human mistake (error) can introduce a defect into the code, and that defect can go on to cause a failure when executed.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — es la cadena error → defecto → fallo. Una persona comete un error (por ejemplo, interpretar mal un requisito), ese error queda como un defecto en el código, y ese defecto puede manifestarse como un fallo observable cuando el software se ejecuta en ciertas condiciones.",
      en: "True — this is the error → defect → failure chain. A person makes a mistake (for example, misreading a requirement), that mistake becomes a defect in the code, and that defect can surface as an observable failure when the software runs under certain conditions.",
    },
  },
  {
    id: "tf-11",
    statement: {
      es: "Todo defecto que existe en el código termina siempre provocando un fallo visible durante la ejecución.",
      en: "Every defect that exists in the code always ends up causing a visible failure during execution.",
    },
    answer: false,
    explanation: {
      es: "Falso — un defecto puede quedar «dormido» si el camino de código que lo contiene nunca se ejecuta, o si las condiciones exactas para activarlo nunca se dan; por eso puede haber defectos en producción durante años sin manifestarse como fallo.",
      en: "False — a defect can remain dormant if the code path containing it is never executed, or if the exact conditions to trigger it never occur; that's why defects can sit in production for years without ever surfacing as a failure.",
    },
  },
  {
    id: "tf-12",
    statement: {
      es: "Contar con testers completamente independientes del equipo de desarrollo siempre mejora la efectividad de las pruebas y no tiene ninguna desventaja.",
      en: "Having testers who are fully independent from the development team always improves test effectiveness and has no downsides.",
    },
    answer: false,
    explanation: {
      es: "Falso — la independencia tiene beneficios (una mirada objetiva, sin los sesgos del autor del código) pero también desventajas: puede aislar al tester del equipo, generar fricción o convertirse en un cuello de botella si las pruebas solo pueden hacerlas ellos.",
      en: "False — independence has benefits (an objective view, free of the code author's own assumptions) but also drawbacks: it can isolate testers from the team, create friction, or become a bottleneck if only they are allowed to test.",
    },
  },
  {
    id: "tf-13",
    statement: {
      es: "Los desarrolladores nunca deberían probar su propio código, bajo ninguna circunstancia.",
      en: "Developers should never test their own code, under any circumstances.",
    },
    answer: false,
    explanation: {
      es: "Falso — la independencia del testing es un espectro, no una regla absoluta. Los propios desarrolladores suelen (y deben) realizar pruebas de componente sobre su propio código; lo que se recomienda es sumar además niveles con mayor independencia, no prohibir que el autor pruebe nada.",
      en: "False — testing independence is a spectrum, not an absolute rule. Developers commonly (and should) perform component testing on their own code; the recommendation is to add levels with more independence too, not to forbid the author from testing anything.",
    },
  },
  {
    id: "tf-14",
    statement: {
      es: "En las pruebas exploratorias, el diseño y la ejecución de los casos de prueba ocurren de forma simultánea, guiados por la experiencia del tester.",
      en: "In exploratory testing, test design and test execution happen simultaneously, guided by the tester's experience.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — es una técnica basada en la experiencia. En lugar de diseñar los casos por adelantado, el tester aprende del sistema mientras lo prueba y usa esos hallazgos para decidir qué probar a continuación, en el mismo momento.",
      en: "True — this is an experience-based technique. Instead of designing cases up front, the tester learns about the system while testing it and uses those findings to decide what to test next, in the same moment.",
    },
  },
  {
    id: "tf-15",
    statement: {
      es: "Las pruebas estáticas pueden encontrar defectos en el software antes de ejecutar una sola línea de código.",
      en: "Static testing can find defects in the software before a single line of code has been executed.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — las pruebas estáticas (revisiones, inspecciones, análisis estático de código) examinan artefactos como requisitos, diseños o el propio código fuente sin ejecutarlos, por lo que pueden detectar defectos mucho antes de llegar a las pruebas dinámicas.",
      en: "True — static testing (reviews, inspections, static code analysis) examines artifacts like requirements, designs, or the source code itself without running them, so it can catch defects long before dynamic testing even begins.",
    },
  },
  {
    id: "tf-16",
    statement: {
      es: "Las pruebas de regresión verifican que los cambios recientes no hayan roto funcionalidades que antes funcionaban correctamente.",
      en: "Regression testing verifies that recent changes have not broken functionality that previously worked correctly.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — cada vez que se modifica el software (una corrección, una nueva funcionalidad), las pruebas de regresión repiten pruebas ya existentes para confirmar que las áreas no relacionadas con el cambio siguen funcionando como antes.",
      en: "True — whenever the software changes (a fix, a new feature), regression testing re-runs existing tests to confirm that areas unrelated to the change still work as they did before.",
    },
  },
  {
    id: "tf-17",
    statement: {
      es: "Las pruebas de confirmación (re-testing) y las pruebas de regresión son exactamente la misma actividad.",
      en: "Confirmation testing (re-testing) and regression testing are exactly the same activity.",
    },
    answer: false,
    explanation: {
      es: "Falso — son complementarias pero distintas. Las pruebas de confirmación repiten un caso de prueba que antes falló para verificar que ese defecto concreto ya está corregido; las pruebas de regresión, en cambio, buscan efectos secundarios inesperados en otras partes del sistema que no estaban directamente relacionadas con el cambio.",
      en: "False — they are complementary but distinct. Confirmation testing re-runs a test case that previously failed to verify that specific defect is now fixed; regression testing, instead, looks for unexpected side effects in other parts of the system not directly related to the change.",
    },
  },
  {
    id: "tf-18",
    statement: {
      es: "Alcanzar el 100% de cobertura de sentencias (statement coverage) garantiza automáticamente el 100% de cobertura de decisión (branch coverage).",
      en: "Achieving 100% statement coverage automatically guarantees 100% decision (branch) coverage.",
    },
    answer: false,
    explanation: {
      es: "Falso — es al revés. El 100% de cobertura de decisión sí implica el 100% de cobertura de sentencias (porque para recorrer todas las ramas hay que pasar por todas las líneas), pero ejecutar todas las líneas no garantiza haber recorrido todas las combinaciones de verdadero/falso de cada decisión.",
      en: "False — it's the other way around. 100% decision (branch) coverage does imply 100% statement coverage (because covering every branch means passing through every line), but executing every line doesn't guarantee you've exercised every true/false outcome of each decision.",
    },
  },
  {
    id: "tf-19",
    statement: {
      es: "Las pruebas de aceptación suelen ser responsabilidad de los usuarios o del área de negocio, no exclusivamente de los testers.",
      en: "Acceptance testing is typically the responsibility of users or the business side, not only of testers.",
    },
    answer: true,
    explanation: {
      es: "Verdadero — las pruebas de aceptación buscan confirmar que el sistema satisface las necesidades del negocio y de los usuarios finales, por lo que suelen ser ellos (o sus representantes) quienes las ejecutan o las validan, más allá del equipo de testing técnico.",
      en: "True — acceptance testing aims to confirm that the system meets business and end-user needs, so it's typically the users (or their representatives) who run or sign off on it, beyond the technical testing team.",
    },
  },
  {
    id: "tf-20",
    statement: {
      es: "Automatizar una batería de pruebas elimina por completo la paradoja del pesticida.",
      en: "Automating a test suite completely eliminates the pesticide paradox.",
    },
    answer: false,
    explanation: {
      es: "Falso — automatizar solo acelera la ejecución de los mismos casos; si esos casos no se revisan ni se amplían con el tiempo, la suite automatizada dejará de encontrar defectos nuevos igual que una suite manual repetida sin cambios. La paradoja del pesticida sigue aplicando: hace falta mantener y variar los casos, automatizados o no.",
      en: "False — automating only speeds up running the same cases; if those cases are never reviewed or expanded over time, the automated suite will stop finding new defects just like an unchanged manual suite would. The pesticide paradox still applies: test cases need to be maintained and varied, automated or not.",
    },
  },
];

function fisherYates<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = shuffled[i];
    const b = shuffled[j];
    if (a === undefined || b === undefined) continue;
    shuffled[i] = b;
    shuffled[j] = a;
  }
  return shuffled;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbTrueFalsePage(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const [order, setOrder] = useState<TFStatement[]>(() => fisherYates(STATEMENTS));
  const [index, setIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const total = order.length;
  const current = order[index];
  const locked = selectedAnswer !== null;

  function answer(pick: boolean) {
    if (locked || !current) return;
    setSelectedAnswer(pick);
    if (pick === current.answer) {
      setCorrectCount((c) => c + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
    }
    setSelectedAnswer(null);
  }

  function reset() {
    setOrder(fisherYates(STATEMENTS));
    setIndex(0);
    setSelectedAnswer(null);
    setStreak(0);
    setBestStreak(0);
    setCorrectCount(0);
    setFinished(false);
  }

  const isCorrect = current !== undefined && selectedAnswer !== null && selectedAnswer === current.answer;
  const passed = correctCount >= 13;

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Verdadero o Falso" : "True or False"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Ronda rápida sobre los 7 principios del testing, mitos frecuentes e independencia del QA. Responde y recibe retroalimentación inmediata."
              : "Rapid round on the 7 testing principles, common myths, and QA independence. Answer and get immediate feedback."}
          </p>
        </div>

        {!finished && current && (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-[var(--color-text-muted)]">
              <span>
                {lng === "es" ? "Pregunta" : "Question"} {index + 1}/{total}
              </span>
              <span>
                {lng === "es" ? "Racha" : "Streak"}: {streak} · {lng === "es" ? "Mejor" : "Best"}: {bestStreak}
              </span>
            </div>
            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-bg-elevated)]">
              <div
                className="h-1.5 rounded-full bg-brand-forest-500 transition-all duration-300"
                style={{ width: `${(index / total) * 100}%` }}
              />
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6">
              <p className="text-lg font-medium leading-relaxed text-[var(--color-text-primary)]">
                {current.statement[lng as "es" | "en"] ?? current.statement.en}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                disabled={locked}
                onClick={() => answer(true)}
                className={[
                  "rounded-xl border-2 border-brand-forest-500/40 bg-brand-forest-500/10 px-6 py-8 text-lg font-bold text-brand-forest-400 transition-colors hover:bg-brand-forest-500/20 disabled:cursor-not-allowed",
                  locked && selectedAnswer !== true ? "opacity-40" : "",
                ].join(" ")}
              >
                {lng === "es" ? "✓ Verdadero" : "✓ True"}
              </button>
              <button
                type="button"
                disabled={locked}
                onClick={() => answer(false)}
                className={[
                  "rounded-xl border-2 border-red-500/40 bg-red-500/10 px-6 py-8 text-lg font-bold text-red-400 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed",
                  locked && selectedAnswer !== false ? "opacity-40" : "",
                ].join(" ")}
              >
                {lng === "es" ? "✗ Falso" : "✗ False"}
              </button>
            </div>

            {locked && (
              <div
                className={[
                  "mt-6 rounded-xl border p-5",
                  isCorrect ? "border-brand-forest-500/40 bg-brand-forest-500/10" : "border-red-500/40 bg-red-500/10",
                ].join(" ")}
              >
                <p className={["font-semibold", isCorrect ? "text-brand-forest-400" : "text-red-400"].join(" ")}>
                  {isCorrect ? (lng === "es" ? "¡Correcto!" : "Correct!") : (lng === "es" ? "Incorrecto" : "Incorrect")}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {current.explanation[lng as "es" | "en"] ?? current.explanation.en}
                </p>
                <button
                  type="button"
                  onClick={next}
                  className="mt-4 rounded-lg bg-brand-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                >
                  {lng === "es" ? "Siguiente →" : "Next →"}
                </button>
              </div>
            )}
          </>
        )}

        {finished && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-2xl font-bold text-[var(--color-text-primary)]">
              {correctCount}/{total} {lng === "es" ? "correctas" : "correct"}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {lng === "es" ? "Mejor racha" : "Best streak"}: {bestStreak}
            </p>

            <div className="mt-5">
              <Link
                href={passed ? `/${lng}/exams` : `/${lng}/campus/istqb`}
                className="inline-block rounded-lg bg-brand-forest-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
              >
                {passed
                  ? lng === "es"
                    ? "¡Nivel certificación! Prueba un simulacro CTFL completo."
                    : "Certification level! Try a full CTFL mock exam."
                  : lng === "es"
                    ? "Repasa los fundamentos en el campus ISTQB y vuelve a intentarlo."
                    : "Review the fundamentals in the ISTQB campus and try again."}
              </Link>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={reset}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Reintentar" : "↺ Retry"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
