/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import { useTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import AboutClient from "./AboutClient";

interface PageParams {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const { lng } = await props.params;
  const { t } = await useTranslation(lng, "common");
  const alternates = buildAlternates(lng, "/about");

  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates,
    openGraph: {
      title: t("about.title"),
      description: t("about.description"),
      url: alternates.canonical,
      locale: lng === "es" ? "es_ES" : "en_US",
      type: "profile",
    },
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
