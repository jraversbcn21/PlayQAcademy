"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/client";

/* ------------------------------------------------------------------ */
/*  Social / portfolio links                                            */
/* ------------------------------------------------------------------ */

const ABOUT_LINKS = [
  {
    href: "https://www.linkedin.com/in/jorge-carre%C3%B1o-dam/",
    labelKey: "about.linkedinLabel",
    tooltipKey: "about.linkedinTooltip",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/jraversbcn21",
    labelKey: "about.githubLabel",
    tooltipKey: "about.githubTooltip",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://mycampusistqb.vercel.app/",
    labelKey: "about.istqbLabel",
    tooltipKey: "about.istqbTooltip",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

/* ================================================================== */
/*  Page component                                                     */
/* ================================================================== */

export default function AboutClient() {
  const { t } = useTranslation("common");

  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 lg:py-20">
      <div className="container-app max-w-4xl">
        {/* Tagline, rendered as a pull quote */}
        <blockquote className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-2xl font-semibold italic leading-snug text-[var(--color-text-primary)] sm:text-3xl">
            <span aria-hidden="true" className="text-brand-forest-400">&ldquo;</span>
            {t("about.title")}
            <span aria-hidden="true" className="text-brand-forest-400">&rdquo;</span>
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-brand-forest-500/40" />
        </blockquote>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
          {/* Photo */}
          <div className="shrink-0">
            {imgError ? (
              <div className="flex h-[280px] w-[280px] items-center justify-center rounded-2xl bg-brand-forest-500/10 ring-2 ring-brand-forest-500/30 shadow-xl shadow-brand-forest-500/10">
                <span className="text-5xl font-bold text-brand-forest-400">JC</span>
              </div>
            ) : (
              <Image
                src="/jorgeprofile.png"
                alt={t("about.name")}
                width={280}
                height={280}
                className="rounded-2xl ring-2 ring-brand-forest-500/30 shadow-xl shadow-brand-forest-500/10 object-cover"
                priority
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            {/* The page's h1: the tagline above is a quote, not a heading */}
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
              {t("about.name")}
            </h1>
            <p className="mt-1 text-sm text-brand-forest-400">
              {t("about.role")}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t("about.description")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {t("about.portfolio")}
            </p>

            {/* Social / project links */}
            <div className="mt-5 flex flex-wrap gap-3 justify-center lg:justify-start">
              {ABOUT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t(link.tooltipKey)}
                  className="rounded-lg border border-[var(--color-border)] p-2.5 text-[var(--color-text-muted)] transition-colors hover:border-brand-forest-500/40 hover:text-brand-forest-400 hover:bg-brand-forest-500/10"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
