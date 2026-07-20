/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";

interface PageParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;

  const {
    lng
  } = params;

  const { t } = await useTranslation(lng, "common");
  return {
    title: t("cookies.title"),
    description: t("cookies.metaDescription"),
    alternates: buildAlternates(lng, "/cookies"),
  };
}

export default async function CookiesPage(props: PageParams) {
  const params = await props.params;

  const {
    lng
  } = params;

  const { t } = await useTranslation(lng, "common");

  const sections = [
    { heading: "cookies.s1Heading", body: "cookies.s1Body" },
    { heading: "cookies.s2Heading", body: "cookies.s2Body" },
    { heading: "cookies.s3Heading", body: "cookies.s3Body", list: "cookies.s3List" },
    { heading: "cookies.s4Heading", body: "cookies.s4Body" },
    { heading: "cookies.s5Heading", body: "cookies.s5Body", list: "cookies.s5List" },
    { heading: "cookies.s6Heading", body: "cookies.s6Body" },
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
            {t("cookies.backToHome")}
          </Link>
        </div>

        <h1 className="mb-3 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
          {t("cookies.title")}
        </h1>
        <p className="mb-12 text-sm text-[var(--color-text-secondary)]">
          {t("cookies.lastUpdated")}
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
