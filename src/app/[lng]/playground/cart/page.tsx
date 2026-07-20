import type { Metadata } from "next";
import { buildExerciseMetadata } from "@/lib/seo";
import CartClient from "./CartClient";

interface PageProps {
  params: Promise<{ lng: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lng } = await props.params;
  return buildExerciseMetadata(lng, "/playground/cart");
}

export default function Page(props: PageProps) {
  return <CartClient params={props.params} />;
}
