"use client";

import Link from "next/link";
import { useTranslation } from "next-i18next";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FooterColumn {
  titleKey: string;
  links: { labelKey: string; href: string }[];
}

interface FooterProps {
  currentLng: string;
}

/* ------------------------------------------------------------------ */
/*  Social icon SVGs                                                   */
/* ------------------------------------------------------------------ */

function GitHubIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedInIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function DiscordIcon(): ReactNode {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer columns data                                                */
/* ------------------------------------------------------------------ */

function getFooterColumns(): FooterColumn[] {
  return [
    {
      titleKey: "footer.learn.title",
      links: [
        { labelKey: "footer.learn.courses", href: "/courses" },
        { labelKey: "footer.learn.curriculum", href: "/curriculum" },
        { labelKey: "footer.learn.playground", href: "/playground" },
      ],
    },
    {
      titleKey: "footer.community.title",
      links: [
        { labelKey: "footer.community.github", href: "https://github.com" },
        { labelKey: "footer.community.linkedin", href: "https://linkedin.com" },
        { labelKey: "footer.community.discord", href: "https://discord.com" },
      ],
    },
    {
      titleKey: "footer.legal.title",
      links: [
        { labelKey: "footer.legal.privacy", href: "/privacy" },
        { labelKey: "footer.legal.terms", href: "/terms" },
        { labelKey: "footer.legal.cookies", href: "/cookies" },
      ],
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */

export default function Footer({ currentLng }: FooterProps) {
  const { t } = useTranslation("common");
  const currentYear = new Date().getFullYear();
  const columns = getFooterColumns();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-app py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href={`/${currentLng}`}
              className="inline-flex items-center gap-2 text-lg font-bold text-[var(--color-text-primary)]"
            >
              <svg
                viewBox="0 0 28 28"
                className="h-7 w-7"
                fill="none"
                aria-hidden="true"
              >
                <path d="M14 2L26 24H2L14 2Z" fill="currentColor" className="text-brand-blue-500" />
              </svg>
              PlayQ
              <span className="text-brand-green-400" aria-hidden="true">&#9679;</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--color-text-muted)]">
              {t("footer.tagline")}
            </p>

            {/* Social links */}
            <div className="mt-5 flex gap-4">
              {[
                { icon: <GitHubIcon />, label: t("footer.community.github"), href: "https://github.com" },
                { icon: <LinkedInIcon />, label: t("footer.community.linkedin"), href: "https://linkedin.com" },
                { icon: <DiscordIcon />, label: t("footer.community.discord"), href: "https://discord.com" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg p-2 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-elevated)] hover:text-[var(--color-text-primary)]"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.titleKey}>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                {t(col.titleKey)}
              </h3>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      href={`/${currentLng}${link.href}`}
                      className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[var(--color-border)] pt-6">
          <p className="text-center text-xs text-[var(--color-text-muted)]">
            {t("footer.copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
