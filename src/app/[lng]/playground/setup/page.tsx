import type { Metadata } from "next";
import { buildAlternates } from "@/lib/seo";
import SetupClient from "./SetupClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

const TITLE = { es: "Guía de Configuración", en: "Setup Guide" };
const DESCRIPTION = {
  es: "Sigue estos pasos para empezar a escribir tests de Playwright contra el PlayQ Playground.",
  en: "Follow these steps to start writing Playwright tests against the PlayQ Playground.",
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  const lang = lng === "es" ? "es" : "en";
  const alternates = buildAlternates(lng, "/playground/setup");

  return {
    title: TITLE[lang],
    description: DESCRIPTION[lang],
    alternates,
    openGraph: {
      title: TITLE[lang],
      description: DESCRIPTION[lang],
      url: alternates.canonical,
      locale: lang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function Page(props: PageProps) {
  return <SetupClient params={props.params} />;
}
