import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getCmsContent, saveCmsContent } from "@/lib/cmsStore";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = getCmsContent();
  return NextResponse.json(content, { status: 200 });
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid CMS data" }, { status: 400 });
    }

    const saved = saveCmsContent(body);

    // Revalidate Next.js cache so updates are immediately visible to visitors
    try {
      revalidatePath("/", "layout");
      revalidatePath("/[locale]", "layout");
    } catch (e) {
      // Revalidation warning (non-fatal)
    }

    return NextResponse.json({ success: true, data: saved }, { status: 200 });
  } catch (error) {
    console.error("[Admin CMS Save Error]", error);
    return NextResponse.json(
      { error: "Internal server error saving CMS data" },
      { status: 500 }
    );
  }
}
