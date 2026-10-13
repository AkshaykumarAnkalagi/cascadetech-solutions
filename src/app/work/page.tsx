import type { Metadata } from "next";
import NextLink from "next/link";
import {
  Sparkles,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { PROJECTS, PIPELINE_PROJECTS, type ProjectItem } from "@/data/siteData";

export const metadata: Metadata = {
  title: "Work & Case Studies | Startopia & TextYourBoss.ai",
  description:
    "Explore CascadeTech Solutions' flagship deployments: Startopia (founder ecosystem platform) and TextYourBoss.ai (AI communication co-pilot), along with our R&D innovation pipeline.",
};

export default function WorkPage() {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <Rocket className="w-3.5 h-3.5" />
            <span>Proven Deployments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Case Studies & <span className="text-gradient-cyan">Flagship Products</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            Real software built for real scale. Explore our two live market-tested products alongside our internal innovation pipeline.
          </p>
        </div>

        {/* Deep Dive Case Studies: Startopia & TextYourBoss.ai */}
        <div className="space-y-24 mb-28">
          {PROJECTS.map((project, idx) => (
            <section
              id={project.slug}
              key={project.id}
              className="scroll-mt-32 rounded-3xl bg-[#090e17]/85 border border-white/[0.09] p-8 sm:p-12 lg:p-14 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/40 transition-all duration-300"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-[#00F2FE] border border-cyan-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {project.category}
                  </span>
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#00F2FE] hover:underline"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Title & Tagline */}
              <div className="max-w-3xl mb-8 space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                  {project.title}
                </h2>
                <p className="text-base sm:text-lg font-mono text-cyan-400/90">
                  {project.tagline}
                </p>
              </div>

              {/* Metrics Highlights Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                {project.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="text-left space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#00F2FE]">
                      {metric.value}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Two Column Breakdown: Architecture & Features */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left: Detailed Overview */}
                <div className="lg:col-span-7 space-y-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-[#00F2FE]" />
                    <span>The Engineering Challenge & Solution</span>
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                    {project.fullDescription}
                  </p>

                  <div className="pt-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 font-semibold">
                      Full Technology Architecture:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/[0.04] text-zinc-200 border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Key Features list */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-4">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-[#00F2FE] font-bold">
                    Core Platform Capabilities:
                  </h3>
                  <ul className="space-y-3">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Innovation Pipeline Section */}
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
              R&D Incubator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Cascade Innovation Pipeline
            </h2>
            <p className="text-base text-zinc-400">
              In addition to our flagship products, our research lab continuously prototypes next-generation systems in educational technology, retention engines, and applied artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PIPELINE_PROJECTS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/30 p-8 flex flex-col justify-between transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 font-semibold px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mb-4">
                    {item.category}
                  </p>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                    Internal R&D
                  </span>
                  <span className="font-mono text-[#00F2FE]">Beta Q2 2026</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#0a1220] to-blue-950/40 border border-cyan-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a Product Idea Ready to Architect?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto">
            From technical prototyping to full-scale SaaS development, we help founders and corporate innovators launch world-class software.
          </p>
          <NextLink
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_24px_rgba(0,242,254,0.4)] transition-all"
          >
            <span>Discuss Your Product</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
