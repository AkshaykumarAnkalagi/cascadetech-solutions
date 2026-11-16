import { setRequestLocale } from "next-intl/server";
import { getCmsContent } from "@/lib/cmsStore";
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
  const cmsData = getCmsContent();

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with Multi-Language Interactive Visual */}
      <HeroSection cmsHero={cmsData.hero} />

      {/* 2. Stats / Credibility Bar */}
      <StatsBar cmsStats={cmsData.stats} />

      {/* 3. Selected Work & Live Products */}
      <SelectedWork cmsProjects={cmsData.projects} />

      {/* 4. Services Overview */}
      <ServicesOverview cmsServices={cmsData.services} />

      {/* 5. 4-Step Process Section */}
      <ProcessSection />

      {/* 6. Final CTA + Working Contact Form */}
      <ContactSection />
    </div>
  );
}
