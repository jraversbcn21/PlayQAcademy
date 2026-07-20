import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import RequirementsMatchDrillClient from "./RequirementsMatchDrillClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/req-match");
}

export default function Page(props: PageProps) {
  return <RequirementsMatchDrillClient params={props.params} />;
}
