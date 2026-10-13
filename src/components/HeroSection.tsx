"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { ArrowRight, Bot, Shield, Headphones, Sparkles, ChevronRight } from "lucide-react";
import TechVisual from "./TechVisual";
import { SITE_INFO } from "@/data/siteData";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#00F2FE]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-8 text-left"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
              <span>NEXT-GEN TECHNOLOGY PARTNER</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Delivering <span className="text-gradient-cyan">Intelligent</span> and{" "}
              <span className="text-gradient-blue">Scalable</span> Digital Solutions
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              CascadeTech Solutions engineers high-performance web platforms, custom enterprise software, and applied AI systems. We turn ambitious visions into bulletproof digital realities that scale effortlessly.
            </p>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <NextLink
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#00F2FE] via-[#38BDF8] to-blue-500 transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,242,254,0.45)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </NextLink>

              <NextLink
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] hover:border-cyan-400/40 transition-all duration-300 hover:text-white"
              >
                <span>Explore Live Products</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </NextLink>
            </div>

            {/* Small Trust Indicators */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">AI-Powered</p>
                  <p className="text-[10px] text-zinc-400">Intelligent Systems</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">Reliable</p>
                  <p className="text-[10px] text-zinc-400">99.9% Cloud Scale</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">Expert Support</p>
                  <p className="text-[10px] text-zinc-400">Direct Engineering</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Abstract Tech Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <TechVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
