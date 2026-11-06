import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_INFO } from "@/data/siteData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cascadetech.in"),
  title: {
    default: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.tagline,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let locale: string = routing.defaultLocale;
  try {
    const detectedLocale = await getLocale();
    if (detectedLocale) {
      locale = detectedLocale;
    }
  } catch {
    locale = routing.defaultLocale;
  }

  return (
    <html lang={locale} className="dark scroll-smooth">
      <body className="bg-[#05070e] text-[#f8fafc] antialiased selection:bg-cyan-500/20 selection:text-white min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
