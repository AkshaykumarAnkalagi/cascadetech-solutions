import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_INFO } from "@/data/siteData";

export const metadata: Metadata = {
  metadataBase: new URL("https://cascadetech.in"),
  title: {
    default: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    template: `%s | ${SITE_INFO.name}`,
  },
  description:
    "CascadeTech Solutions delivers intelligent and scalable digital solutions. Custom website development, web design & UI/UX, enterprise software, AI & chatbots, and flagship products Startopia & TextYourBoss.ai.",
  keywords: [
    "CascadeTech Solutions",
    "Hubballi software company",
    "Karnataka tech solutions",
    "Custom website development",
    "UI/UX Design",
    "AI and Chatbot development",
    "Custom Software Development",
    "Startopia",
    "TextYourBoss.ai",
    "Next.js 15 developer",
    "Scalable digital solutions",
  ],
  authors: [{ name: "CascadeTech Solutions" }],
  creator: "CascadeTech Solutions",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cascadetech.in",
    siteName: SITE_INFO.name,
    title: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    description:
      "Delivering Intelligent and Scalable Digital Solutions. High-performance websites, custom software, applied AI, and flagship products.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_INFO.name} | ${SITE_INFO.tagline}`,
    description:
      "Delivering Intelligent and Scalable Digital Solutions from Vidya-Nagar, Hubballi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_INFO.name,
    description: SITE_INFO.tagline,
    url: "https://cascadetech.in",
    email: SITE_INFO.email,
    telephone: SITE_INFO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Vidya-Nagar",
      addressLocality: "Hubballi",
      addressRegion: "Karnataka",
      postalCode: "580021",
      addressCountry: "IN",
    },
    sameAs: [
      SITE_INFO.socials.linkedin,
      SITE_INFO.socials.github,
      SITE_INFO.socials.twitter,
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05070e] text-[#f8fafc] antialiased selection:bg-cyan-500/20 selection:text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
