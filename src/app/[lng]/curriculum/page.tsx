/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import { useTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import CurriculumClient from "./CurriculumClient";

interface PageParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const { lng } = await props.params;
  const { t } = await useTranslation(lng, "common");
  const alternates = buildAlternates(lng, "/curriculum");

  return {
    title: t("curriculum.hero.title"),
    description: t("curriculum.hero.subtitle"),
    alternates,
    openGraph: {
      title: t("curriculum.hero.title"),
      description: t("curriculum.hero.subtitle"),
      url: alternates.canonical,
      locale: lng === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function CurriculumPage() {
  return <CurriculumClient />;
}
