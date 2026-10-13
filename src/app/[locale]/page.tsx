import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import SelectedWork from "@/components/SelectedWork";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Multi-Language Interactive Visual */}
      <HeroSection />

      {/* 2. Stats / Credibility Bar */}
      <StatsBar />

      {/* 3. Selected Work & Live Products */}
      <SelectedWork />

      {/* 4. Services Overview */}
      <ServicesOverview />

      {/* 5. 4-Step Process Section */}
      <ProcessSection />

      {/* 6. Final CTA + Working Contact Form */}
      <ContactSection />
    </div>
  );
}
