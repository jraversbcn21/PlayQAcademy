import { NextResponse } from "next/server";
import { USERS, getNextUserId, type PlaygroundUser } from "@/lib/playground/store";

export async function GET() {
  return NextResponse.json({ success: true, data: USERS, count: USERS.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<PlaygroundUser>;
    if (!body.name || !body.email || !body.role) {
      return NextResponse.json({ success: false, error: "name, email, and role are required" }, { status: 400 });
    }
    const user: PlaygroundUser = {
      id: getNextUserId(),
      name: body.name,
      email: body.email,
      role: body.role,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    USERS.push(user);
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }
}
