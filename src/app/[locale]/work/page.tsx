import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  ExternalLink,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Flame,
  Layers,
  Cpu,
} from "lucide-react";

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <WorkContent />;
}

function WorkContent() {
  const t = useTranslations("workPage");
  const tWork = useTranslations("work");
  const tCommon = useTranslations("common");

  const caseStudies = [
    {
      id: "startopia",
      title: tWork("startopiaTitle"),
      category: tWork("startopiaCategory"),
      status: tWork("badgeLive"),
      desc: tWork("startopiaDesc"),
      highlights: [
        tWork("startopiaFeat1"),
        tWork("startopiaFeat2"),
        tWork("startopiaFeat3"),
        "Modular Multi-Tenant Architecture with Row-Level Security",
        "Sub-100ms Global API Response Times across South Asia",
      ],
      metrics: [
        { label: "Active Founders", value: "2,400+" },
        { label: "Pipeline Value Tracked", value: "$18M+" },
        { label: "Platform Uptime", value: "99.98%" },
      ],
      techStack: ["Next.js 15 App Router", "TypeScript", "Tailwind CSS", "Supabase", "Prisma ORM", "Vercel Edge"],
      link: "https://startopia.in",
    },
    {
      id: "textyourboss",
      title: tWork("textYourBossTitle"),
      category: tWork("textYourBossCategory"),
      status: tWork("badgeLive"),
      desc: tWork("textYourBossDesc"),
      highlights: [
        tWork("textYourBossFeat1"),
        tWork("textYourBossFeat2"),
        tWork("textYourBossFeat3"),
        "Streaming LLM Completion with Custom Guardrails",
        "Enterprise Air-Gapped Encryption Option",
      ],
      metrics: [
        { label: "Messages Drafted", value: "140K+" },
        { label: "Time Saved / Brief", value: "82%" },
        { label: "Sentiment Accuracy", value: "99.2%" },
      ],
      techStack: ["Next.js 15", "LangChain", "OpenAI / Claude", "FastAPI Python", "Pinecone Vector DB", "PostgreSQL"],
      link: "https://textyourboss.ai",
    },
  ];

  const pipeline = [
    {
      title: t("pipeline1Title"),
      desc: t("pipeline1Desc"),
      stage: "Alpha Staging",
      tech: "Whisper AI • IndicTrans2 • WebAssembly",
    },
    {
      title: t("pipeline2Title"),
      desc: t("pipeline2Desc"),
      stage: "Lab Testing",
      tech: "Time-Series Forecasting • Rust Engine • Edge CDN",
    },
  ];

  return (
    <div className="pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-24 left-1/3 w-[650px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

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

        {/* Detailed Case Studies */}
        <div className="space-y-16 mb-24">
          {caseStudies.map((study, idx) => (
            <div
              key={study.id}
              id={study.id}
              className="rounded-3xl bg-[#090e17]/85 border border-white/[0.08] hover:border-cyan-400/30 p-8 sm:p-12 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-black/80"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {study.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-950/80 text-[#00F2FE] border border-cyan-800/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                      {study.status}
                    </span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {study.title}
                  </h2>
                </div>

                <a
                  href={study.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all shrink-0"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8 items-start">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Overview & Architecture
                    </h3>
                    <p className="text-base text-zinc-300 leading-relaxed">
                      {study.desc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-400 mb-3">
                      Key Technical Deliverables:
                    </h3>
                    <ul className="space-y-2.5">
                      {study.highlights.map((high, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                          <span>{high}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Production Stack:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {study.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Metrics Column */}
                <div className="lg:col-span-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 space-y-6">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Operational Metrics</span>
                  </h3>

                  <div className="space-y-5">
                    {study.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <span className="text-3xl font-extrabold text-white text-gradient-cyan">
                          {metric.value}
                        </span>
                        <p className="text-xs font-mono text-zinc-400 mt-1">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Innovation Pipeline Section */}
        <div className="rounded-3xl bg-[#070b14]/90 border border-white/[0.08] p-8 sm:p-12 mb-20 backdrop-blur-xl">
          <div className="max-w-3xl mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-400">
              <Flame className="w-4 h-4" />
              <span>R&D Incubator</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              {t("pipelineTitle")}
            </h2>
            <p className="text-base text-zinc-400">
              {t("pipelineSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pipeline.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-orange-950/70 text-orange-400 border border-orange-800/40 inline-block mb-3">
                    {item.stage}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/[0.05] text-[11px] font-mono text-cyan-400/70">
                  {item.tech}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Have a Technical Product You Need Built & Scaled?
          </h2>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-black bg-[#00F2FE] hover:shadow-[0_0_24px_rgba(0,242,254,0.4)] transition-all cursor-pointer"
            >
              <span>{tCommon("engageConsultants")}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
