import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicitly bypass next-intl for admin, api, educore, nestorahub, govos, studio
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/educore") ||
    pathname.startsWith("/nestorahub") ||
    pathname.startsWith("/govos") ||
    pathname.startsWith("/studio")
  ) {
    // If accessing /admin dashboard directly without session cookie, redirect to /admin/login
    if (pathname === "/admin" || pathname === "/admin/") {
      const session = request.cookies.get("cascade_admin_session")?.value;
      if (!session) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /admin routes (Cascade Internal Admin & Analytics Dashboard)
  // - /studio routes (Sanity CMS)
  // - /educore routes (Flagship ERP product)
  // - /nestorahub routes (Flagship Real Estate product)
  // - /govos routes (Flagship Civic Governance product)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - static files (e.g. /favicon.ico, /images/*, etc.)
  matcher: [
    "/",
    "/(en|hi|kn|te|ta|ml|mr|bn|gu)/:path*",
    "/((?!api|admin|studio|educore|nestorahub|govos|_next|_vercel|.*\\..*).*)",
  ],
};
