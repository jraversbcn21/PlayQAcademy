/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import { useTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import GlossaryClient from "./GlossaryClient";

interface PageParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const { lng } = await props.params;
  const { t } = await useTranslation(lng, "common");
  const alternates = buildAlternates(lng, "/glossary");

  return {
    title: t("glossary.title"),
    description: t("glossary.subtitle"),
    alternates,
    openGraph: {
      title: t("glossary.title"),
      description: t("glossary.subtitle"),
      url: alternates.canonical,
      locale: lng === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function GlossaryPage() {
  return <GlossaryClient />;
}
