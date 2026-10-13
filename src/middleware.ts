import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - /api routes
  // - /studio routes (Sanity CMS)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - static files (e.g. /favicon.ico, /images/*, etc.)
  matcher: [
    "/",
    "/(en|hi|kn|te|ta|ml|mr|bn|gu)/:path*",
    "/((?!api|studio|_next|_vercel|.*\\..*).*)",
  ],
};
