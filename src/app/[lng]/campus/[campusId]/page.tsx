import type { Metadata } from "next";
import { getCampusById } from "@/lib/constants/campuses";
import { buildAlternates } from "@/lib/seo";
import CampusPageClient from "./CampusPageClient";

interface CampusPageProps {
  params: Promise<{ lng: string; campusId: string }>;
}

export async function generateMetadata(props: CampusPageProps): Promise<Metadata> {
  const params = await props.params;

  const {
    lng,
    campusId
  } = params;

  const isEs = lng === "es";
  const lang = isEs ? "es" : "en";
  const campus = getCampusById(campusId);

  if (!campus) {
    return {
      title: isEs ? "Campus no encontrado" : "Campus not found",
    };
  }

  const alternates = buildAlternates(lng, `/campus/${campusId}`);

  return {
    title: campus.title[lang],
    description: campus.description[lang],
    alternates,
    openGraph: {
      title: campus.title[lang],
      description: campus.description[lang],
      url: alternates.canonical,
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function CampusPage() {
  return <CampusPageClient />;
}
