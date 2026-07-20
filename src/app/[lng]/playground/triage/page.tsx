import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import TriageDrillClient from "./TriageDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/triage");
}

export default function Page(props: PageProps) {
  return <TriageDrillClient params={props.params} />;
}
