import type { Metadata } from "next";
import { getCampusById } from "@/lib/constants/campuses";
import CampusPageClient from "./CampusPageClient";

interface CampusPageProps {
  params: { lng: string; campusId: string };
}

export async function generateMetadata({
  params: { lng, campusId },
}: CampusPageProps): Promise<Metadata> {
  const isEs = lng === "es";
  const lang = isEs ? "es" : "en";
  const campus = getCampusById(campusId);

  if (!campus) {
    return {
      title: isEs ? "Campus no encontrado" : "Campus not found",
    };
  }

  return {
    title: campus.title[lang],
    description: campus.description[lang],
    openGraph: {
      title: campus.title[lang],
      description: campus.description[lang],
      locale: isEs ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default function CampusPage() {
  return <CampusPageClient />;
}
