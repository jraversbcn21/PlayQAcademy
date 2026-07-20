import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbQuizClient from "./IstqbQuizClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-quiz");
}

export default function Page(props: PageProps) {
  return <IstqbQuizClient params={props.params} />;
}
