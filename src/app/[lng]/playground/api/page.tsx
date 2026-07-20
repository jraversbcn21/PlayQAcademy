import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import ApiPlaygroundClient from "./ApiPlaygroundClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/api");
}

export default function Page(props: PageProps) {
  return <ApiPlaygroundClient params={props.params} />;
}
