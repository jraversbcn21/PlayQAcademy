import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import FilesClient from "./FilesClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/files");
}

export default function Page(props: PageProps) {
  return <FilesClient params={props.params} />;
}
