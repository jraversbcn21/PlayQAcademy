import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import IstqbTrueFalseClient from "./IstqbTrueFalseClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/istqb-truefalse");
}

export default function Page(props: PageProps) {
  return <IstqbTrueFalseClient params={props.params} />;
}
