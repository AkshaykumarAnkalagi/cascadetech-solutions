import type { Metadata } from "next";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import { SITE_INFO } from "@/data/siteData";
import CookieConsent from "@/components/privacy/CookieConsent";
import ClarityScript from "@/components/analytics/ClarityScript";
import AnalyticsTracker from "@/components/analytics/AnalyticsTracker";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cascade-erp.in"),
  title: {
    default: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description: SITE_INFO.tagline,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: SITE_INFO.name,
    title: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    description: SITE_INFO.tagline,
    url: "https://www.cascade-erp.in",
    images: [
      {
        url: "https://www.cascade-erp.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "CascadeTech Solutions — Delivering Intelligent & Scalable Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    description: SITE_INFO.tagline,
    images: ["https://www.cascade-erp.in/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={routing.defaultLocale} className="dark scroll-smooth">
      <body className="bg-[#05070e] text-[#f8fafc] antialiased selection:bg-cyan-500/20 selection:text-white min-h-screen flex flex-col justify-between">
        {/* Official Microsoft Clarity Tag */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ze4cuerold");
            `,
          }}
        />
        <ClarityScript />
        <AnalyticsTracker />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
