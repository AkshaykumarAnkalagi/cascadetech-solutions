import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  verifyAdminCredentials,
} from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON format" }, { status: 400 });
    }

    const { username, password } = body || {};

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    if (!verifyAdminCredentials(username, password)) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const token = createAdminSessionToken(username);
    const response = NextResponse.json({ success: true }, { status: 200 });

    const isSecure = process.env.NODE_ENV === "production";
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 3600, // 8 hours
    });

    return response;
  } catch (error) {
    console.error("[Admin Login Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
