import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Globe,
  Palette,
  Cpu,
  Bot,
  RefreshCw,
  Sparkles,
  GraduationCap,
  Users,
  CalendarCheck,
  Search,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("servicesPage");
  const tServ = useTranslations("services");
  const tCommon = useTranslations("common");

  const services = [
    {
      id: "custom-website-development",
      title: tServ("s1Title"),
      desc: tServ("s1Desc"),
      icon: Globe,
      capabilities: [
        "Next.js 15 App Router Architecture",
        "Edge-Rendered SSR & Dynamic Caching",
        "Headless CMS (Sanity.io) Integration",
        "Performance Tuning (95+ Lighthouse Score)",
      ],
    },
    {
      id: "web-design-ui-ux",
      title: tServ("s2Title"),
      desc: tServ("s2Desc"),
      icon: Palette,
      capabilities: [
        "Figma Interactive Clickable Prototypes",
        "Bespoke Dark-Theme Design Systems",
        "Accessible WCAG Compliant Interfaces",
        "Conversion-Optimized User Journeys",
      ],
    },
    {
      id: "custom-software-development",
      title: tServ("s3Title"),
      desc: tServ("s3Desc"),
      icon: Cpu,
      capabilities: [
        "Distributed Microservice Architectures",
        "PostgreSQL, Supabase & Vector Stores",
        "Automated CI/CD Delivery Pipelines",
        "Secure Enterprise API Integrations",
      ],
    },
    {
      id: "ai-chatbot-development",
      title: tServ("s4Title"),
      desc: tServ("s4Desc"),
      icon: Bot,
      capabilities: [
        "Autonomous LLM Workflow Agents",
        "RAG (Retrieval-Augmented Generation)",
        "Enterprise Knowledge Base Querying",
        "Multi-turn Conversational Interfaces",
      ],
    },
    {
      id: "digital-transformation",
      title: tServ("s5Title"),
      desc: tServ("s5Desc"),
      icon: RefreshCw,
      capabilities: [
        "Legacy Monolith to Cloud Modernization",
        "Automated Internal Operations & OCR",
        "Zero-Downtime Database Migrations",
        "Security & Compliance Hardening",
      ],
    },
    {
      id: "loyalty-program-solutions",
      title: tServ("s6Title"),
      desc: tServ("s6Desc"),
      icon: Sparkles,
      capabilities: [
        "Tiered Retention & Reward Engines",
        "Gamified Referral & Point Systems",
        "Real-Time Analytics & Cohort Tracking",
        "Omnichannel Web & Mobile Sync",
      ],
    },
    {
      id: "educational-technology",
      title: tServ("s7Title"),
      desc: tServ("s7Desc"),
      icon: GraduationCap,
      capabilities: [
        "Custom Learning Management Systems (LMS)",
        "Real-Time Student Analytics & Telemetry",
        "Online Examination & Proctoring Portals",
        "Interactive Video & Content Streaming",
      ],
    },
  ];

  const engagementModels = [
    {
      icon: Users,
      title: t("model1Title"),
      desc: t("model1Desc"),
      badge: "High Velocity",
    },
    {
      icon: CalendarCheck,
      title: t("model2Title"),
      desc: t("model2Desc"),
      badge: "Predictable",
    },
    {
      icon: Search,
      title: t("model3Title"),
      desc: t("model3Desc"),
      badge: "Specialized",
    },
  ];

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/25 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <span>{t("eyebrow")}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 7 Services Detailed Breakdown */}
        <div className="space-y-10 mb-28">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                id={service.id}
                className="rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/40 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,242,254,0.06)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-[#00F2FE]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                          Service 0{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-zinc-300 leading-relaxed pt-2">
                      {service.desc}
                    </p>
                  </div>

                  <div className="lg:col-span-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Engineering Capabilities:
                    </h3>
                    <ul className="space-y-2.5">
                      {service.capabilities.map((cap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Models */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              {t("engagementTitle")}
            </h2>
            <p className="text-base text-zinc-400">
              {t("engagementSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, idx) => {
              const Icon = model.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-[#080d16]/80 border border-white/[0.08] hover:border-cyan-400/40 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-cyan-950/70 text-[#00F2FE] border border-cyan-800/40">
                        {model.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-[#00F2FE] transition-colors">
                      {model.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                      {model.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06]">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#00F2FE] hover:underline"
                    >
                      <span>Inquire About This Model</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/50 via-[#071324]/80 to-[#03060d] border border-cyan-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Custom Architecture or Unsure Which Service Fits?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Schedule a direct architecture consultation with our engineering leads in Vidya-Nagar, Hubballi.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-black bg-[#00F2FE] hover:shadow-[0_0_24px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
          >
            <span>{tCommon("engageConsultants")}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
