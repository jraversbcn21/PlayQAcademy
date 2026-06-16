"use client";

/**
 * Landing page — Hero section, campus grid, and feature cards.
 *
 * The entry point for PlayQAcademy. Renders the hero heading, bilingual
 * tagline, CTA button, a campus grid, and three feature cards.
 */

import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/client";
import Card from "@/components/ui/Card";
import CampusGrid from "@/components/campus/CampusGrid";
import { QA_CAMPUS } from "@/lib/constants/campuses";

/* ------------------------------------------------------------------ */
/*  Decorative icons for feature cards                                 */
/* ------------------------------------------------------------------ */

function LessonsIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-forest-400 to-brand-forest-600 text-white shadow-lg shadow-brand-forest-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    </div>
  );
}

function ProjectsIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-gold-400 to-brand-gold-600 text-white shadow-lg shadow-brand-gold-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    </div>
  );
}

function BilingualIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-terra-400 to-brand-terra-600 text-white shadow-lg shadow-brand-terra-500/30">
      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.79.147 2.676.258m-1.314 2.854A47.58 47.58 0 0118 15.75m-4.304-4.276c.866-.216 1.74-.346 2.618-.376" />
      </svg>
    </div>
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
  const { lng } = useParams() as { lng: string };
  const lang = lng === "es" ? "es" : "en";

  return (
    <>
      {/* ── Banner image ──────────────────────────────────────── */}
      <section className="px-4 pb-0 pt-8">
        <div className="container-app">
          <div className="h-52 overflow-hidden rounded-2xl shadow-lg shadow-brand-forest-500/10 ring-1 ring-[var(--color-border)]">
            <Image
              src="/images/banner.jpg"
              alt="PlayQAcademy — Automation Lab, Bug Tracking Hub, Software Testing Lab, Playwright Learning Center, ISTQB Certification Path, Quality Engineering Workspace"
              width={1280}
              height={720}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>
        </div>
      </section>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="flex items-center justify-center px-4 py-12">
        <div className="container-app text-center">
          {/* Eyebrow badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-forest-500/10 px-4 py-1.5 text-sm font-semibold text-brand-forest-400">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-forest-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-forest-500" />
            </span>
            {QA_CAMPUS.title[lang]}
          </div>

          {/* Heading */}
          <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-brand-terra-500">{t("hero.title")}</span>
          </h1>

          {/* Tagline */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
            {t("hero.tagline")}
          </p>

          {/* CTA button */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#campuses"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-brand-forest-500 to-brand-forest-700 px-8 py-4 text-base font-bold text-white shadow-lg shadow-brand-forest-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-forest-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terra-500"
            >
              {t("hero.ctaSecondary")}
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Campus grid ──────────────────────────────────────── */}
      <div id="campuses">
        <CampusGrid
          lng={lng}
          t={t}
          titleKey="landing.campuses.title"
          subtitleKey="landing.campuses.subtitle"
        />
      </div>

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
