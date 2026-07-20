"use client";

import { useEffect, useMemo, useState, use } from "react";

import { GLOSSARY, CHAPTER_TITLES, type GlossaryEntry } from "@/lib/constants/glossary";

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

const ISTQB_CHAPTERS = ["1", "2", "3", "4", "5", "6"];

type Mark = "known" | "review";

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

/**
 * Returns the index of the next unmarked card in `deck`, scanning forward
 * from `from` and wrapping around. Returns `null` when every card is marked.
 */
function nextUnmarkedIndex(deck: GlossaryEntry[], marks: Record<string, Mark>, from: number): number | null {
  for (let offset = 1; offset <= deck.length; offset++) {
    const i = (from + offset) % deck.length;
    const candidate = deck[i];
    if (candidate && !marks[candidate.term]) return i;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function IstqbFlashcardsPage(props: { params: Promise<{ lng: string }> }) {
  const params = use(props.params);

  const {
    lng
  } = params;

  const istqbEntries = useMemo(
    () => GLOSSARY.filter((e) => ISTQB_CHAPTERS.includes(e.chapter)),
    []
  );

  function buildDeck(chapter: string): GlossaryEntry[] {
    return chapter === "all" ? istqbEntries : istqbEntries.filter((e) => e.chapter === chapter);
  }

  const [chapterFilter, setChapterFilter] = useState("all");
  const [deck, setDeck] = useState<GlossaryEntry[]>(() => buildDeck("all"));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<string, Mark>>({});

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setFlipped(false);
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setFlipped(false);
        setIndex((i) => Math.min(deck.length - 1, i + 1));
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [deck.length]);

  function selectFilter(chapter: string) {
    setChapterFilter(chapter);
    setDeck(buildDeck(chapter));
    setIndex(0);
    setFlipped(false);
    setMarks({});
  }

  function shuffle() {
    setDeck((prev) => fisherYates(prev));
    setIndex(0);
    setFlipped(false);
    setMarks({});
  }

  function goPrev() {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    setFlipped(false);
    setIndex((i) => Math.min(deck.length - 1, i + 1));
  }

  function markCard(mark: Mark) {
    const entry = deck[index];
    if (!entry) return;
    const nextMarks = { ...marks, [entry.term]: mark };
    setMarks(nextMarks);
    setFlipped(false);
    const next = nextUnmarkedIndex(deck, nextMarks, index);
    if (next !== null) setIndex(next);
  }

  function reviewMissed() {
    const missed = deck.filter((e) => marks[e.term] === "review");
    setDeck(missed);
    setIndex(0);
    setFlipped(false);
    setMarks({});
  }

  function restart() {
    setDeck(buildDeck(chapterFilter));
    setIndex(0);
    setFlipped(false);
    setMarks({});
  }

  const allMarked = deck.length > 0 && deck.every((e) => marks[e.term] !== undefined);
  const knownCount = Object.values(marks).filter((m) => m === "known").length;
  const reviewCount = Object.values(marks).filter((m) => m === "review").length;

  const entry = deck[index];

  return (
    <div className="px-4 py-8">
      <div className="container-app max-w-3xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
            {lng === "es" ? "Flashcards del Glosario ISTQB" : "ISTQB Glossary Flashcards"}
          </h1>
          <p className="mt-2 leading-relaxed text-[var(--color-text-secondary)]">
            {lng === "es"
              ? "Repasa los términos oficiales del syllabus CTFL capítulo por capítulo. Gira la tarjeta, comprueba si la sabías y marca las que quieras repasar."
              : "Review the official CTFL syllabus terms chapter by chapter. Flip the card, check yourself, and mark the ones you want to revisit."}
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-1.5">
          <button
            type="button"
            aria-pressed={chapterFilter === "all"}
            onClick={() => selectFilter("all")}
            className={[
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              chapterFilter === "all"
                ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            {lng === "es" ? "Todos" : "All"}
          </button>
          {ISTQB_CHAPTERS.map((chapter) => (
            <button
              key={chapter}
              type="button"
              aria-pressed={chapterFilter === chapter}
              title={CHAPTER_TITLES[chapter]?.[lng as "es" | "en"] ?? CHAPTER_TITLES[chapter]?.en}
              onClick={() => selectFilter(chapter)}
              className={[
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                chapterFilter === chapter
                  ? "border-brand-forest-500/40 bg-brand-forest-500/10 text-brand-forest-400"
                  : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
              ].join(" ")}
            >
              {`Cap. ${chapter}`}
            </button>
          ))}
        </div>

        {allMarked ? (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-center">
            <p className="text-lg font-bold text-[var(--color-text-primary)]">
              {knownCount} {lng === "es" ? "sabidas" : "known"} / {reviewCount} {lng === "es" ? "para repasar" : "to review"}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {reviewCount > 0 && (
                <button
                  type="button"
                  onClick={reviewMissed}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
                >
                  {lng === "es" ? "Repasar falladas" : "Review missed"}
                </button>
              )}
              <button
                type="button"
                onClick={restart}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
              >
                {lng === "es" ? "↺ Reiniciar" : "↺ Restart"}
              </button>
            </div>
          </div>
        ) : (
          entry && (
            <>
              <button
                type="button"
                className="group [perspective:1000px] w-full"
                aria-pressed={flipped}
                onClick={() => setFlipped((f) => !f)}
              >
                <div
                  className={[
                    "relative min-h-[16rem] w-full max-w-xl mx-auto rounded-xl transition-transform duration-500 [transform-style:preserve-3d]",
                    flipped ? "[transform:rotateY(180deg)]" : "",
                  ].join(" ")}
                >
                  {/* front: term */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 [backface-visibility:hidden]">
                    <span className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
                      Cap. {entry.chapter}
                    </span>
                    <span className="text-center text-xl font-semibold text-[var(--color-text-primary)]">
                      {entry.term}
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {lng === "es" ? "Toca para ver la definición" : "Tap to reveal the definition"}
                    </span>
                  </div>
                  {/* back: definition */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-brand-forest-500/40 bg-brand-forest-500/10 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <p className="text-center text-sm leading-relaxed text-[var(--color-text-primary)]">
                      {entry.def[lng as "es" | "en"] ?? entry.def.en}
                    </p>
                  </div>
                </div>
              </button>

              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={goPrev}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {lng === "es" ? "← Anterior" : "← Previous"}
                </button>
                <span className="text-sm text-[var(--color-text-muted)]">
                  {index + 1}/{deck.length}
                </span>
                <button
                  type="button"
                  disabled={index === deck.length - 1}
                  onClick={goNext}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {lng === "es" ? "Siguiente →" : "Next →"}
                </button>
                <button
                  type="button"
                  onClick={shuffle}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {lng === "es" ? "🔀 Mezclar" : "🔀 Shuffle"}
                </button>
              </div>

              {flipped && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => markCard("known")}
                    className="rounded-lg bg-brand-forest-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-forest-500"
                  >
                    {lng === "es" ? "✓ La sabía" : "✓ Knew it"}
                  </button>
                  <button
                    type="button"
                    onClick={() => markCard("review")}
                    className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
                  >
                    {lng === "es" ? "↻ Repasar" : "↻ Review"}
                  </button>
                </div>
              )}
            </>
          )
        )}
      </div>
    </div>
  );
}
