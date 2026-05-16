import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/playground/store";

export async function GET() {
  return NextResponse.json({ success: true, data: PRODUCTS, count: PRODUCTS.length });
}
