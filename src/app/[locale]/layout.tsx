import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_INFO } from "@/data/siteData";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: "CascadeTech Solutions | Delivering Intelligent and Scalable Digital Solutions",
    hi: "CascadeTech Solutions | बुद्धिमान और स्केलेबल डिजिटल समाधान प्रदान करना",
    kn: "CascadeTech Solutions | ಬುದ್ಧಿವಂತ ಮತ್ತು ಅಳೆಯಬಹುದಾದ ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳು",
    te: "CascadeTech Solutions | మేధోవంతమైన మరియు స్కేలబుల్ డిజిటల్ పరిష్కారాలు",
    ta: "CascadeTech Solutions | அறிவார்ந்த மற்றும் அளவிடக்கூடிய டிஜிட்டல் தீர்வுகள்",
    ml: "CascadeTech Solutions | ബുദ്ധിപരവും സ്കേലബിളുമായ ഡിജിറ്റൽ സൊല്യൂഷനുകൾ",
    mr: "CascadeTech Solutions | बुद्धिमान आणि स्केलेबल डिजिटल सोल्यूशन्स",
    bn: "CascadeTech Solutions | বুদ্ধিমান এবং স্কেলেবল ডিজিটাল সমাধান",
    gu: "CascadeTech Solutions | બુદ્ધિશાળી અને સ્કેલેબલ ડિજિટલ સોલ્યુશન્સ",
  };

  const title = titles[locale] || titles.en;

  return {
    metadataBase: new URL("https://cascadetech.in"),
    title: {
      default: title,
      template: `%s | ${SITE_INFO.name}`,
    },
    description:
      "CascadeTech Solutions delivers intelligent and scalable digital solutions from Vidya-Nagar, Hubballi, Karnataka. Custom website development, web design & UI/UX, enterprise software, AI chatbots, Startopia & TextYourBoss.ai.",
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
    alternates: {
      canonical: `https://cascadetech.in/${locale}`,
      languages: {
        en: "https://cascadetech.in/en",
        hi: "https://cascadetech.in/hi",
        kn: "https://cascadetech.in/kn",
        te: "https://cascadetech.in/te",
        ta: "https://cascadetech.in/ta",
        ml: "https://cascadetech.in/ml",
        mr: "https://cascadetech.in/mr",
        bn: "https://cascadetech.in/bn",
        gu: "https://cascadetech.in/gu",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: `https://cascadetech.in/${locale}`,
      siteName: SITE_INFO.name,
      title: title,
      description:
        "Delivering Intelligent and Scalable Digital Solutions from Vidya-Nagar, Hubballi, Karnataka.",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:
        "Delivering Intelligent and Scalable Digital Solutions from Vidya-Nagar, Hubballi.",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_INFO.name,
    description: SITE_INFO.tagline,
    url: `https://cascadetech.in/${locale}`,
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
  };

  return (
    <html lang={locale} className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#05070e] text-[#f8fafc] antialiased selection:bg-cyan-500/20 selection:text-white min-h-screen flex flex-col justify-between">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
