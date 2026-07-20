import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import DynamicClient from "./DynamicClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/dynamic");
}

export default function Page(props: PageProps) {
  return <DynamicClient params={props.params} />;
}
