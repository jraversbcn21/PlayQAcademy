"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "@/lib/i18n/client";
import type { Bilingual } from "@/types/lesson";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface FlashcardSectionProps {
  flashcardId: string;
  front: Bilingual;
  back: Bilingual;
  lng: string;
}

/* ------------------------------------------------------------------ */
/*  TTS helper                                                         */
/* ------------------------------------------------------------------ */

function getVoiceForLanguage(
  lang: string,
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  // Try female voice first
  const femaleVoices = voices.filter(
    (v) =>
      v.lang.startsWith(lang) &&
      (v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("zira") ||
        v.name.toLowerCase().includes("samantha") ||
        v.name.toLowerCase().includes("google") ||
        v.name.toLowerCase().includes("microsoft"))
  );
  if (femaleVoices.length > 0) return femaleVoices[0] ?? null;

  // Any voice of the language
  const langVoices = voices.filter((v) => v.lang.startsWith(lang));
  if (langVoices.length > 0) return langVoices[0] ?? null;

  // System default
  return voices[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FlashcardSection({
  flashcardId: _flashcardId,
  front,
  back,
  lng,
}: FlashcardSectionProps) {
  const { t } = useTranslation("common");
  const [flipped, setFlipped] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Cleanup TTS on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleFlip = useCallback(() => {
    setFlipped((prev) => !prev);
  }, []);

  const handleSpeak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const text = flipped ? (back[lng as "es" | "en"] ?? back.en) : (front[lng as "es" | "en"] ?? front.en);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lng === "es" ? "es-ES" : "en-US";

    // Try to get a voice for the language
    const voices = window.speechSynthesis.getVoices();
    const voice = getVoiceForLanguage(utterance.lang, voices);
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [flipped, front, back, lng]);

  const handleStop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  const currentText = flipped ? (back[lng as "es" | "en"] ?? back.en) : (front[lng as "es" | "en"] ?? front.en);
  const currentLabel = flipped
    ? (lng === "es" ? "Respuesta" : "Answer")
    : (lng === "es" ? "Pregunta" : "Question");

  return (
    <div className="not-prose my-6">
      {/* Card */}
      <div
        className="relative cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 transition-all hover:border-brand-blue-500/30 hover:shadow-lg hover:shadow-brand-blue-500/5"
        onClick={handleFlip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleFlip();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={t("lesson.flashcard.flip")}
      >
        {/* Label */}
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-brand-blue-500/20 px-3 py-1 text-xs font-medium text-brand-blue-400">
            {currentLabel}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {t("lesson.flashcard.tapToFlip")}
          </span>
        </div>

        {/* Content */}
        <p className="text-lg leading-relaxed text-[var(--color-text-primary)]">
          {currentText}
        </p>

        {/* Flip indicator */}
        <div className="mt-4 flex justify-center">
          <svg
            className={`h-5 w-5 text-[var(--color-text-muted)] transition-transform ${flipped ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* TTS button */}
      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={speaking ? handleStop : handleSpeak}
          className={[
            "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors",
            speaking
              ? "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
              : "border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-brand-blue-500/30 hover:text-brand-blue-400",
          ].join(" ")}
          aria-label={speaking ? t("lesson.flashcard.stopSpeaking") : t("lesson.flashcard.speak")}
        >
          {speaking ? (
            <>
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
              {t("lesson.flashcard.stopSpeaking")}
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
              </svg>
              {t("lesson.flashcard.speak")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
