/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

interface PageParams {
  params: { lng: string };
}

export async function generateMetadata({
  params: { lng },
}: PageParams): Promise<Metadata> {
  const { t } = await useTranslation(lng, "common");
  return {
    title: t("privacy.title"),
    description: t("privacy.metaDescription"),
  };
}

export default async function PrivacyPage({
  params: { lng },
}: PageParams) {
  const { t } = await useTranslation(lng, "common");

  const sections = [
    { heading: "privacy.s1Heading", body: "privacy.s1Body" },
    { heading: "privacy.s2Heading", body: "privacy.s2Body" },
    { heading: "privacy.s3Heading", body: "privacy.s3Body", body2: "privacy.s3Body2", list: "privacy.s3List" },
    { heading: "privacy.s4Heading", body: "privacy.s4Body", list: "privacy.s4List" },
    { heading: "privacy.s5Heading", body: "privacy.s5Body", list: "privacy.s5List" },
    { heading: "privacy.s6Heading", body: "privacy.s6Body" },
    { heading: "privacy.s7Heading", body: "privacy.s7Body" },
    { heading: "privacy.s8Heading", body: "privacy.s8Body", list: "privacy.s8List" },
    { heading: "privacy.s9Heading", body: "privacy.s9Body" },
    { heading: "privacy.s10Heading", body: "privacy.s10Body" },
    { heading: "privacy.s11Heading", body: "privacy.s11Body" },
    { heading: "privacy.s12Heading", body: "privacy.s12Body" },
  ];

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="sticky top-0 z-10 -mx-4 mb-10 bg-[var(--color-bg-primary)]/90 px-4 py-4 backdrop-blur-sm">
          <Link
            href={`/${lng}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            {t("privacy.backToHome")}
          </Link>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
          {t("privacy.title")}
        </h1>
        <p className="mb-12 text-sm text-[var(--color-text-secondary)]">
          {t("privacy.lastUpdated")}
        </p>

        <div className="prose prose-invert max-w-none space-y-10">
          {sections.map((sec) => (
            <section key={sec.heading}>
              <h2 className="mb-4 text-xl font-semibold text-[var(--color-text-primary)] sm:text-2xl">
                {t(sec.heading)}
              </h2>
              <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
                {t(sec.body)}
              </p>
              {"body2" in sec && sec.body2 ? (
                <p className="mb-4 leading-relaxed text-[var(--color-text-secondary)]">
                  {t(sec.body2)}
                </p>
              ) : null}
              {"list" in sec && sec.list ? (
                <ul className="mb-4 ml-6 list-disc space-y-2 text-[var(--color-text-secondary)]">
                  {(t(sec.list, { returnObjects: true }) as string[]).map((item: string, idx: number) => (
                    <li key={idx} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
