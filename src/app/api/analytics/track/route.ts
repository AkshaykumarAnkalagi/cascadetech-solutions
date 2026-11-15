import { NextRequest, NextResponse } from "next/server";
import { hashVisitor, recordTelemetry } from "@/lib/analyticsStore";

export async function POST(req: NextRequest) {
  try {
    let payload;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else {
      // Handle sendBeacon text/plain or form data
      const text = await req.text();
      try {
        payload = JSON.parse(text);
      } catch {
        return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
      }
    }

    if (!payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Missing payload" }, { status: 400 });
    }

    // Extract headers for privacy-safe visitor identification
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const visitorHash = hashVisitor(ip, userAgent);

    recordTelemetry({
      ...payload,
      visitorHash,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Analytics Ingestion Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
