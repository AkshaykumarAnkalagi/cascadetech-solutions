import type { Metadata } from "next";
import NextLink from "next/link";
import {
  Sparkles,
  Target,
  Compass,
  Shield,
  Zap,
  Code2,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Building2,
} from "lucide-react";
import { ABOUT_CONTENT, SITE_INFO } from "@/data/siteData";

export const metadata: Metadata = {
  title: "About Us | Purpose, Mission & Values",
  description:
    "Learn about CascadeTech Solutions — our company purpose, mission, vision, and core engineering values. Engineered in Hubballi, Karnataka for global impact.",
};

export default function AboutPage() {
  return (
    <div className="relative pt-32 pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow & Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Company Blueprint</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Engineering Digital <span className="text-gradient-cyan">Sovereignty</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            &ldquo;{SITE_INFO.tagline}&rdquo; — Rooted in Vidya-Nagar, Hubballi, Karnataka, we build software designed to conquer operational complexity.
          </p>
        </div>

        {/* Company Purpose Section */}
        <div className="mb-20 rounded-3xl bg-[#090e17]/80 border border-white/[0.08] p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden">
          <div className="max-w-4xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
              Our Core Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {ABOUT_CONTENT.headline}
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {ABOUT_CONTENT.purpose}
            </p>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="rounded-2xl bg-[#090e17]/70 border border-white/[0.08] p-8 sm:p-10 relative group hover:border-cyan-400/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Our Mission
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {ABOUT_CONTENT.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-2xl bg-[#090e17]/70 border border-white/[0.08] p-8 sm:p-10 relative group hover:border-blue-400/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              Our Vision
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {ABOUT_CONTENT.vision}
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
              Operating Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Principles That Guide Every Commit
            </h2>
            <p className="text-sm text-zinc-400">
              We hold ourselves to rigorous engineering standards that prioritize long-term durability over temporary convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ABOUT_CONTENT.values.map((val, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white/[0.02] border border-white/[0.07] p-8 hover:border-cyan-400/30 hover:bg-[#0c1424]/40 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-[#00F2FE] font-bold">
                    0{idx + 1}
                  </span>
                  <Code2 className="w-4 h-4 text-zinc-500" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Stand For */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#0c1626] to-[#060810] border border-cyan-500/20 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#00F2FE] font-semibold">
                Client Guarantees
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                What We Stand For
              </h2>
              <p className="text-sm text-zinc-400">
                A non-negotiable pact we make with every client, enterprise partner, and startup founder who trusts us with their systems.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-3.5">
              {ABOUT_CONTENT.standFor.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Presence (No team/leadership section per instructions) */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-[#00F2FE] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Headquartered in Hubballi, Karnataka
              </h3>
              <p className="text-xs text-zinc-400">
                {SITE_INFO.address} • Serving global enterprises & high-growth founders
              </p>
            </div>
          </div>

          <NextLink
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all shrink-0"
          >
            <span>Partner With Us</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>
      </div>
    </div>
  );
}
