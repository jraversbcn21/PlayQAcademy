import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { email?: string; password?: string };
    if (body.email === "student@playq.test" && body.password === "Playwright123!") {
      return NextResponse.json({
        success: true,
        data: { token: "playq_mock_jwt_student_abc123", user: { email: body.email, role: "student" } },
      });
    }
    if (body.email === "admin@playq.test" && body.password === "Admin123!") {
      return NextResponse.json({
        success: true,
        data: { token: "playq_mock_jwt_admin_xyz789", user: { email: body.email, role: "admin" } },
      });
    }
    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }
}
