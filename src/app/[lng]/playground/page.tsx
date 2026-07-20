/* eslint-disable react-hooks/rules-of-hooks */
import type { Metadata } from "next";
import { useTranslation } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import PlaygroundIndexClient from "./PlaygroundIndexClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  const { t } = await useTranslation(lng, "common");
  const alternates = buildAlternates(lng, "/playground");

  return {
    title: t("playground.title"),
    description: t("playground.subtitle"),
    alternates,
    openGraph: {
      title: t("playground.title"),
      description: t("playground.subtitle"),
      url: alternates.canonical,
      locale: lng === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function PlaygroundPage(props: PageProps) {
  return <PlaygroundIndexClient params={props.params} />;
}
