"use client";

/**
 * Landing page — Hero section with feature cards.
 *
 * The entry point for PlayQ Academy. Renders an animated gradient heading,
 * bilingual tagline, two CTA buttons, and three feature highlight cards.
 */

import { useTranslation } from "next-i18next";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

/* ------------------------------------------------------------------ */
/*  Decorative icons for feature cards                                 */
/* ------------------------------------------------------------------ */

function LessonsIcon() {
  return (
    <svg className="h-6 w-6 text-brand-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg className="h-6 w-6 text-brand-green-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function BilingualIcon() {
  return (
    <svg className="h-6 w-6 text-brand-orange-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.79.147 2.676.258m-1.314 2.854A47.58 47.58 0 0118 15.75m-4.304-4.276c.866-.216 1.74-.346 2.618-.376" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature card data                                                  */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const FEATURES: FeatureItem[] = [
  { icon: <LessonsIcon />, titleKey: "hero.feature1.title", descriptionKey: "hero.feature1.description" },
  { icon: <ProjectsIcon />, titleKey: "hero.feature2.title", descriptionKey: "hero.feature2.description" },
  { icon: <BilingualIcon />, titleKey: "hero.feature3.title", descriptionKey: "hero.feature3.description" },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  const { t } = useTranslation("common");

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-20">
        <div className="container-app text-center">
          {/* Brand badge */}
          <span className="mb-4 inline-block rounded-full bg-brand-blue-500/10 px-4 py-1.5 text-sm font-medium text-brand-blue-400 ring-1 ring-inset ring-brand-blue-500/20">
            PlayQ Academy
          </span>

          {/* Animated gradient heading */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="animate-gradient bg-gradient-to-r from-brand-blue-400 via-brand-green-400 to-brand-orange-400 bg-[length:200%_auto] bg-clip-text text-transparent">
              {t("hero.titleLine1")}
            </span>
            <br />
            <span className="text-[var(--color-text-primary)]">
              {t("hero.titleLine2")}
            </span>
          </h1>

          {/* Tagline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
            {t("hero.tagline")}
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="primary" size="lg" className="!bg-brand-orange-500 hover:!bg-brand-orange-400">
              {t("hero.ctaPrimary")}
            </Button>
            <Button variant="secondary" size="lg">
              {t("hero.ctaSecondary")}
            </Button>
          </div>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────── */}
      <section className="border-t border-[var(--color-border)] px-4 py-20">
        <div className="container-app">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon, titleKey, descriptionKey }) => (
              <Card key={titleKey} variant="highlight" icon={icon} title={t(titleKey)}>
                <p className="leading-relaxed">{t(descriptionKey)}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
