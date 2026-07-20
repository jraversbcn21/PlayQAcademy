import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import LoginClient from "./LoginClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/login");
}

export default function Page(props: PageProps) {
  return <LoginClient params={props.params} />;
}
