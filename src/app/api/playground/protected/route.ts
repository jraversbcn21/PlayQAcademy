import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, error: "Missing or invalid Authorization header" }, { status: 401 });
  }
  const token = authHeader.slice(7);
  if (token === "playq_mock_jwt_student_abc123" || token === "playq_mock_jwt_admin_xyz789") {
    return NextResponse.json({
      success: true,
      data: { message: "You have accessed a protected endpoint", token },
    });
  }
  return NextResponse.json({ success: false, error: "Invalid token" }, { status: 401 });
}
