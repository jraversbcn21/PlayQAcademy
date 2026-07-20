import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbLevelsDrillClient from "./IstqbLevelsDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-levels");
}

export default function Page(props: PageProps) {
  return <IstqbLevelsDrillClient params={props.params} />;
}
