import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminSessionToken } from "@/lib/adminAuth";
import { getAnalyticsSummary } from "@/lib/analyticsStore";
import { CLARITY_PROJECT_ID } from "@/components/analytics/ClarityScript";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = getAnalyticsSummary();
  return NextResponse.json({
    ...summary,
    clarityProjectId: CLARITY_PROJECT_ID,
  });
}
