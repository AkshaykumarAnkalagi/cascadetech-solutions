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
    metadataBase: new URL("https://www.cascade-erp.in"),
    title: {
      default: title,
      template: `%s | ${SITE_INFO.name}`,
    },
    description:
      "CascadeTech Solutions delivers intelligent and scalable digital solutions from Vidya-Nagar, Hubballi, Karnataka. Custom website development, web design & UI/UX, enterprise software, AI chatbots, Educore ERP, Nestora Hub & GovOS.",
    keywords: [
      "CascadeTech Solutions",
      "Hubballi software company",
      "Karnataka tech solutions",
      "Custom website development",
      "UI/UX Design",
      "AI and Chatbot development",
      "Custom Software Development",
      "Educore ERP",
      "Nestora Hub",
      "GovOS",
      "Civic Governance Operating System",
      "Municipal ERP",
      "Next.js 15 developer",
      "Scalable digital solutions",
    ],
    other: {
      "revisit-after": "1 days",
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "32x32" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
    alternates: {
      canonical: `https://www.cascade-erp.in/${locale}`,
      languages: {
        en: "https://www.cascade-erp.in/en",
        hi: "https://www.cascade-erp.in/hi",
        kn: "https://www.cascade-erp.in/kn",
        te: "https://www.cascade-erp.in/te",
        ta: "https://www.cascade-erp.in/ta",
        ml: "https://www.cascade-erp.in/ml",
        mr: "https://www.cascade-erp.in/mr",
        bn: "https://www.cascade-erp.in/bn",
        gu: "https://www.cascade-erp.in/gu",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: `https://www.cascade-erp.in/${locale}`,
      siteName: SITE_INFO.name,
      title: title,
      description:
        "Delivering Intelligent and Scalable Digital Solutions from Vidya-Nagar, Hubballi, Karnataka.",
      images: [
        {
          url: "https://www.cascade-erp.in/og-image.jpg",
          secureUrl: "https://www.cascade-erp.in/og-image.jpg",
          width: 1200,
          height: 630,
          type: "image/jpeg",
          alt: "CascadeTech Solutions — Delivering Intelligent & Scalable Digital Solutions",
        },
        {
          url: "https://www.cascade-erp.in/og-image.png",
          secureUrl: "https://www.cascade-erp.in/og-image.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "CascadeTech Solutions — Delivering Intelligent & Scalable Digital Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description:
        "Delivering Intelligent and Scalable Digital Solutions from Vidya-Nagar, Hubballi.",
      images: ["https://www.cascade-erp.in/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
  const messages = await getMessages({ locale });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.cascade-erp.in/#organization",
        name: SITE_INFO.name,
        legalName: "CascadeTech Solutions",
        url: "https://www.cascade-erp.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.cascade-erp.in/cascade-logo.png",
          width: 854,
          height: 854,
        },
        image: "https://www.cascade-erp.in/og-image.png",
        description: SITE_INFO.tagline,
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
          SITE_INFO.socials.github,
          SITE_INFO.socials.linkedin,
          SITE_INFO.socials.twitter,
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.cascade-erp.in/#website",
        url: "https://www.cascade-erp.in",
        name: "CascadeTech Solutions",
        description: "Delivering Intelligent and Scalable Digital Solutions",
        publisher: {
          "@id": "https://www.cascade-erp.in/#organization",
        },
        inLanguage: ["en", "hi", "kn", "te", "ta", "ml", "mr", "bn", "gu"],
      },
      {
        "@type": "SoftwareApplication",
        name: "Educore ERP",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud / Web",
        url: "https://www.cascade-erp.in/educore",
        description:
          "Enterprise multi-tenant school operating system with statutory India DPDP Act 2023 compliance, double-entry finance, automated CBSE report cards, and student attendance.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "SoftwareApplication",
        name: "Nestora Hub",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud / Web",
        url: "https://www.cascade-erp.in/nestorahub",
        description:
          "AI-powered real estate and property discovery ecosystem connecting buyers, tenants, and developers across North Karnataka with verified listings and sub-second search.",
      },
      {
        "@type": "SoftwareApplication",
        name: "GovOS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cloud / Web",
        url: "https://www.cascade-erp.in/govos",
        description:
          "Multi-tenant civic governance operating system empowering municipalities, panchayats, and urban local bodies with real-time grievance tracking, GIS ward intelligence, and DPDP 2023 compliance.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What digital solutions does CascadeTech Solutions offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CascadeTech Solutions specializes in custom website development, enterprise software engineering, UI/UX design, AI chatbots, cloud architecture, and flagship SaaS products including Educore ERP, Nestora Hub, and GovOS.",
            },
          },
          {
            "@type": "Question",
            name: "Where is CascadeTech Solutions located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "CascadeTech Solutions is headquartered in Vidya-Nagar, Hubballi, Karnataka 580021, India.",
            },
          },
          {
            "@type": "Question",
            name: "What are CascadeTech Solutions' flagship products?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Our live flagship products are Educore ERP (complete school operating system with DPDP Act 2023 compliance), Nestora Hub (comprehensive property and real estate ecosystem), and GovOS (multi-tenant civic governance operating system).",
            },
          },
        ],
      },
    ],
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
