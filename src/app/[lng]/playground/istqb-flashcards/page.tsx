import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbFlashcardsClient from "./IstqbFlashcardsClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-flashcards");
}

export default function Page(props: PageProps) {
  return <IstqbFlashcardsClient params={props.params} />;
}
