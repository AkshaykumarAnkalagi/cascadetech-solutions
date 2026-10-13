import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Compass,
  Target,
  Eye,
  CheckCircle2,
  Shield,
  Zap,
  Lock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations("aboutPage");
  const tCommon = useTranslations("common");

  const values = [
    {
      icon: Zap,
      title: t("val1Title"),
      desc: t("val1Desc"),
    },
    {
      icon: Shield,
      title: t("val2Title"),
      desc: t("val2Desc"),
    },
    {
      icon: Sparkles,
      title: t("val3Title"),
      desc: t("val3Desc"),
    },
    {
      icon: Lock,
      title: t("val4Title"),
      desc: t("val4Desc"),
    },
  ];

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

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

        {/* 1. Purpose & Foundation */}
        <div className="mb-20">
          <div className="rounded-3xl bg-gradient-to-br from-[#0c1524] via-[#080d18] to-[#04060c] border border-cyan-500/25 p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-cyan-950/20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-3xl relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-[#00F2FE] mb-2">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t("purposeTitle")}
              </h2>
              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                {t("purposeDesc")}
              </p>
            </div>
          </div>
        </div>

        {/* 2. Mission & Vision Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/30 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t("missionTitle")}
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {t("missionDesc")}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/30 p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-[#00F2FE]">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {t("visionTitle")}
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {t("visionDesc")}
            </p>
          </div>
        </div>

        {/* 3. Core Values Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-3xl font-extrabold text-white">
              {t("valuesTitle")}
            </h2>
            <p className="text-sm text-zinc-400">
              Guiding principles embedded in every sprint, deployment, and line of code.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#080d16]/70 border border-white/[0.08] hover:border-cyan-400/30 p-6 flex flex-col justify-between transition-all duration-300 hover:bg-[#0c1424]/80 group"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/[0.05] text-[10px] font-mono text-cyan-400/60 uppercase">
                    Value 0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Engineering Guarantee & Standards */}
        <div className="rounded-3xl bg-[#070b14]/90 border border-white/[0.08] p-8 sm:p-12 mb-20 backdrop-blur-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-[#00F2FE]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t("guaranteeTitle")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built to Endure, Scale, and Never Compromise
            </h2>
            <p className="text-base text-zinc-300 leading-relaxed">
              {t("guaranteeDesc")}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-[#00F2FE] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
              >
                <span>{tCommon("exploreExpertise")}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition-all"
              >
                <span>{tCommon("contactUs")}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
