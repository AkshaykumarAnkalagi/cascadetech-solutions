import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import SelectedWork from "@/components/SelectedWork";
import ServicesOverview from "@/components/ServicesOverview";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import { getServices, getProjects, getStats } from "@/sanity/client";

export const revalidate = 60; // Revalidate every minute for fresh CMS edits

export default async function HomePage() {
  const [services, projects, stats] = await Promise.all([
    getServices(),
    getProjects(),
    getStats(),
  ]);

  return (
    <div className="relative">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Stats / Credibility Bar */}
      <StatsBar stats={stats} />

      {/* 4. Selected Work (Startopia & TextYourBoss.ai) */}
      <SelectedWork projects={projects} />

      {/* 5. Services Overview */}
      <ServicesOverview services={services} />

      {/* 6. Process Section (4 Steps) */}
      <ProcessSection />

      {/* 7. Final CTA + Working Contact Form */}
      <ContactSection />
    </div>
  );
}
