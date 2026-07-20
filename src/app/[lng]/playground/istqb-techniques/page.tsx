import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbTechniquesDrillClient from "./IstqbTechniquesDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-techniques");
}

export default function Page(props: PageProps) {
  return <IstqbTechniquesDrillClient params={props.params} />;
}
