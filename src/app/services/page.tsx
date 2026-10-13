import type { Metadata } from "next";
import NextLink from "next/link";
import {
  Globe,
  Palette,
  Cpu,
  Bot,
  RefreshCw,
  Sparkles,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Layers,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SERVICES, type ServiceItem } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Services & Capabilities | Intelligent Digital Engineering",
  description:
    "Explore CascadeTech Solutions' core capabilities: Custom Website Development, Web Design & UI/UX, Software Development, Applied AI & Chatbots, Loyalty Programs, and EdTech.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Palette,
  Cpu,
  Bot,
  RefreshCw,
  Sparkles,
  GraduationCap,
};

const ENGAGEMENT_MODELS = [
  {
    title: "Dedicated Engineering Pod",
    subtitle: "For ongoing product velocity & scale",
    badge: "Most Popular",
    description:
      "A dedicated team of senior full-stack engineers, UI/UX designers, and QA specialists integrated seamlessly into your workflow.",
    features: [
      "Full-time sprint commitment & priority bandwidth",
      "Direct Slack/Discord collaboration with daily standups",
      "Flexible scaling as product requirements evolve",
      "Bi-weekly deployments with automated CI/CD pipelines",
    ],
    idealFor: "SaaS platforms, scale-ups, and evolving enterprise tools",
  },
  {
    title: "Fixed-Scope Agile Sprint",
    subtitle: "For defined roadmaps & milestone delivery",
    badge: "Milestone-Driven",
    description:
      "A laser-focused delivery model designed around a well-scoped technical specification with clear deadlines and guaranteed deliverables.",
    features: [
      "Rigid scope lock with transparent milestone pricing",
      "Documented technical architecture & schema contracts",
      "Staging preview access delivered every 2 weeks",
      "30-day post-launch warranty & bug-fix guarantee",
    ],
    idealFor: "New product builds, MVP launches, and website revamps",
  },
  {
    title: "Architecture & AI Advisory",
    subtitle: "For high-stakes technical strategy & audits",
    badge: "Strategic Advisory",
    description:
      "Fractional CTO advisory, legacy system code audits, vector database architecture, and generative AI feasibility evaluations.",
    features: [
      "Comprehensive architectural review & security audit",
      "AI feasibility analysis and prototype benchmarking",
      "Infrastructure cost optimization (AWS, GCP, Vercel)",
      "Technical roadmap for board and investor readiness",
    ],
    idealFor: "Founders seeking technical guidance or preparing to fundraise",
  },
];

export default function ServicesPage() {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>End-to-End Capabilities</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Specialized <span className="text-gradient-cyan">Engineering</span> Services
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            We provide precision engineering across the modern technology spectrum — from bespoke web applications and design systems to applied artificial intelligence.
          </p>
        </div>

        {/* Detailed Service Deep-Dives */}
        <div className="space-y-16 mb-28">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Cpu;

            return (
              <section
                id={service.slug}
                key={service.id}
                className="scroll-mt-32 rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/30 p-8 sm:p-12 backdrop-blur-xl transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                  {/* Left Column: Icon, Title, Description */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-[#00F2FE] shadow-sm shadow-cyan-500/20">
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Capability 0{idx + 1}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {service.title}
                    </h2>

                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="pt-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2 font-medium">
                        Primary Technologies:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {service.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.08]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Benefits & Deliverables */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/[0.02] p-6 sm:p-8 rounded-2xl border border-white/[0.05]">
                    {/* Benefits */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-bold">
                        Business Leverage:
                      </h3>
                      <ul className="space-y-2.5">
                        {service.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">
                        What You Receive:
                      </h3>
                      <ul className="space-y-2.5">
                        {service.deliverables.map((deliv, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                            <Layers className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Clear Engagement / Process Model */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
              Flexible Collaboration
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Engagement & Partnership Models
            </h2>
            <p className="text-base text-zinc-400">
              Choose the operational framework that fits your organization&rsquo;s timeline, internal capacity, and budget predictability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/40 p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#00F2FE] uppercase tracking-wider font-semibold">
                      {model.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {model.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    {model.subtitle}
                  </p>

                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {model.description}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-[11px] font-mono uppercase text-zinc-400 block font-semibold">
                      Included in Model:
                    </span>
                    {model.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.06]">
                  <div className="text-xs text-zinc-400 mb-4">
                    <span className="font-semibold text-zinc-300">Best for: </span>
                    {model.idealFor}
                  </div>
                  <NextLink
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-center block text-white bg-white/[0.05] hover:bg-[#00F2FE] hover:text-black border border-white/[0.1] hover:border-transparent transition-all"
                  >
                    Select This Model
                  </NextLink>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0a1220] to-blue-950/40 border border-cyan-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need a Tailored Technical Architecture?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
            Schedule an exploratory engineering review. We evaluate your current stack, pinpoint bottlenecks, and propose a phased development plan.
          </p>
          <NextLink
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_24px_rgba(0,242,254,0.4)] transition-all"
          >
            <span>Request Technical Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
