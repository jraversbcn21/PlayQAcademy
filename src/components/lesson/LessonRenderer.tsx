"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useTranslation } from "@/lib/i18n/client";
import type { LessonSection, Bilingual } from "@/types/lesson";
import QuizSectionRenderer from "./QuizSection";
import ExerciseSectionRenderer from "./ExerciseSection";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface LessonRendererProps {
  sections: LessonSection[];
  lng: string;
  moduleId?: string;
  lessonId?: string;
}

/* ------------------------------------------------------------------ */
/*  Bilingual helper                                                   */
/* ------------------------------------------------------------------ */

function tText(bi: Bilingual, lng: string): string {
  return (bi as Record<string, string>)[lng] ?? bi.en;
}

/* ------------------------------------------------------------------ */
/*  CodeBlock — with copy-to-clipboard                                 */
/* ------------------------------------------------------------------ */

const LANGUAGE_LABELS: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  json: "JSON",
  bash: "Bash",
  shell: "Shell",
  ts: "TypeScript",
  js: "JavaScript",
};

function CodeBlock({
  language,
  code,
  caption,
  lng,
}: {
  language: string;
  code: string;
  caption?: Bilingual;
  lng: string;
}) {
  const { t: tFn } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  }, [code]);

  return (
    <div className="not-prose my-5 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#0d1117]">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]/50 px-4 py-2">
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {LANGUAGE_LABELS[language] ?? language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 text-xs text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              {tFn("lesson.copied")}
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
              {tFn("lesson.copyCode")}
            </>
          )}
        </button>
      </div>

      {/* Code area */}
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-[#c9d1d9]">
        <code>{code}</code>
      </pre>

      {caption && (
        <p className="border-t border-[var(--color-border)] px-4 py-2 font-sans text-xs text-[var(--color-text-muted)]">
          {tText(caption, lng)}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Callout                                                            */
/* ------------------------------------------------------------------ */

const CALLOUT_ICONS: Record<string, string> = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
  important: "🔥",
};

const CALLOUT_STYLES: Record<string, string> = {
  info: "border-brand-blue-500/20 bg-brand-blue-500/5",
  warning: "border-amber-500/20 bg-amber-500/5",
  tip: "border-brand-green-500/20 bg-brand-green-500/5",
  important: "border-red-500/20 bg-red-500/5",
};

function CalloutBlock({
  variant,
  content,
  lng,
}: {
  variant: "info" | "warning" | "tip" | "important";
  content: Bilingual;
  lng: string;
}) {
  return (
    <div className={["my-5 flex gap-3 rounded-xl border p-4", CALLOUT_STYLES[variant]].join(" ")}>
      <span className="shrink-0 text-lg leading-none" aria-hidden="true">
        {CALLOUT_ICONS[variant]}
      </span>
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {tText(content, lng)}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Video embed                                                        */
/* ------------------------------------------------------------------ */

function VideoEmbed({ src, provider }: { src: string; provider: string }) {
  if (provider === "youtube") {
    const videoId = src.includes("youtube.com/watch?v=")
      ? new URL(src).searchParams.get("v")
      : src;
    return (
      <div className="not-prose my-5 aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Lesson video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (provider === "vimeo") {
    return (
      <div className="not-prose my-5 aspect-video overflow-hidden rounded-xl">
        <iframe
          src={`https://player.vimeo.com/video/${src}`}
          title="Lesson video"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  // Local video
  return (
    <div className="not-prose my-5 overflow-hidden rounded-xl">
      <video controls className="w-full" src={src}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Image                                                              */
/* ------------------------------------------------------------------ */

function ImageBlock({ src, alt, lng }: { src: string; alt: Bilingual; lng: string }) {
  return (
    <figure className="not-prose my-5 overflow-hidden rounded-xl border border-[var(--color-border)]">
      <div className="bg-[var(--color-bg-elevated)] p-4 flex items-center justify-center">
        <img
          src={src}
          alt={tText(alt, lng)}
          className="max-h-96 rounded-lg object-contain"
          loading="lazy"
        />
      </div>
      <figcaption className="px-4 py-2 text-center text-xs text-[var(--color-text-muted)]">
        {tText(alt, lng)}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Main renderer                                                      */
/* ------------------------------------------------------------------ */

export default function LessonRenderer({ sections, lng, moduleId, lessonId }: LessonRendererProps) {
  return (
    <article className="space-y-1">
      {sections.map((section, idx) => {
        const key = `${section.type}-${idx}`;

        switch (section.type) {
          case "heading": {
            const Tag = `h${section.level}` as keyof JSX.IntrinsicElements;
            const sizeClasses: Record<number, string> = {
              1: "text-2xl sm:text-3xl font-bold mt-10 mb-4",
              2: "text-xl sm:text-2xl font-semibold mt-8 mb-3",
              3: "text-lg sm:text-xl font-semibold mt-6 mb-2",
            };
            return (
              <Tag key={key} className={[sizeClasses[section.level], "text-[var(--color-text-primary)]"].join(" ")}>
                {tText(section.content, lng)}
              </Tag>
            );
          }

          case "paragraph":
            return (
              <p key={key} className="leading-relaxed text-[var(--color-text-secondary)]">
                {tText(section.content, lng)}
              </p>
            );

          case "code":
            return (
              <CodeBlock
                key={key}
                language={section.language}
                code={section.code}
                caption={section.caption}
                lng={lng}
              />
            );

          case "callout":
            return (
              <CalloutBlock
                key={key}
                variant={section.variant}
                content={section.content}
                lng={lng}
              />
            );

          case "image":
            return (
              <ImageBlock
                key={key}
                src={section.src}
                alt={section.alt}
                lng={lng}
              />
            );

          case "video":
            return (
              <VideoEmbed
                key={key}
                src={section.src}
                provider={section.provider}
              />
            );

          case "list": {
            const ListTag = section.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={key}
                className={[
                  "my-4 space-y-2",
                  section.ordered ? "list-decimal" : "list-disc",
                  "pl-6 text-[var(--color-text-secondary)]",
                ].join(" ")}
              >
                {section.items.map((item, i) => (
                  <li key={i} className="pl-1 leading-relaxed">
                    {tText(item, lng)}
                  </li>
                ))}
              </ListTag>
            );
          }

          case "quiz":
            return (
              <QuizSectionRenderer
                key={key}
                questionId={section.questionId}
                question={section.question}
                options={section.options}
                correctOptionId={section.correctOptionId}
                explanation={section.explanation}
                lng={lng}
                moduleId={moduleId}
                lessonId={lessonId}
              />
            );

          case "exercise":
            return (
              <ExerciseSectionRenderer
                key={key}
                exerciseId={section.exerciseId}
                instructions={section.instructions}
                starterCode={section.starterCode}
                solution={section.solution}
                hints={section.hints}
                lng={lng}
                moduleId={moduleId}
                lessonId={lessonId}
              />
            );

          default:
            return null;
        }
      })}
    </article>
  );
}
