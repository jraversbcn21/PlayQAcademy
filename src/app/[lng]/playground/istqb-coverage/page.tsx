import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbCoverageDrillClient from "./IstqbCoverageDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-coverage");
}

export default function Page(props: PageProps) {
  return <IstqbCoverageDrillClient params={props.params} />;
}
