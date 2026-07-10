import { NextRequest, NextResponse } from "next/server";
import { USERS, type PlaygroundUser } from "@/lib/playground/store";

export async function GET(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id, 10);
  const user = USERS.find((u) => u.id === id);
  if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: user });
}

export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const id = parseInt(params.id, 10);
    const idx = USERS.findIndex((u) => u.id === id);
    if (idx === -1) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    const body = await request.json() as Partial<PlaygroundUser>;
    USERS[idx] = { ...USERS[idx]!, ...body, id };
    return NextResponse.json({ success: true, data: USERS[idx] });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id, 10);
  const idx = USERS.findIndex((u) => u.id === id);
  if (idx === -1) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  USERS.splice(idx, 1);
  return NextResponse.json({ success: true, message: "User deleted" });
}
