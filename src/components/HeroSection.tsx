"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Bot, Shield, Headphones, Sparkles } from "lucide-react";
import TechVisual from "./TechVisual";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[420px] bg-[#00d4ff]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 sm:space-y-7 text-left"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-pulse shadow-[0_0_8px_#00d4ff]" />
              <span>{t("eyebrow")}</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.14]">
                {t("titleP1") && `${t("titleP1")} `}
                <span className="text-gradient-cyan">{t("titleCyan")}</span>{" "}
                {t("titleP2") && `${t("titleP2")} `}
                <span className="text-gradient-blue">{t("titleBlue")}</span>{" "}
                {t("titleP3")}
              </h1>

              {/* Small Cyan Underline Bar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="h-1.5 w-24 sm:w-32 bg-gradient-to-r from-[#00d4ff] via-[#22d3ee] to-transparent rounded-full shadow-[0_0_12px_rgba(0,212,255,0.6)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff]" />
              </div>
            </div>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
              {t("description")}
            </p>

            {/* Two CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Primary Filled Button */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm sm:text-base text-black bg-gradient-to-r from-[#00d4ff] via-[#22d3ee] to-[#38bdf8] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,212,255,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>{t("ctaPrimary")}</span>
                <Sparkles className="w-4 h-4" />
              </Link>

              {/* Secondary Outline Button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm sm:text-base text-zinc-200 bg-white/[0.04] hover:bg-white/[0.08] border border-cyan-400/40 hover:border-[#00d4ff] hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] group cursor-pointer"
              >
                <span>{t("ctaSecondary")}</span>
              </Link>
            </div>

            {/* Small Trust Indicators */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-[#00d4ff] shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{t("badge1Title")}</p>
                  <p className="text-[10px] text-zinc-400">{t("badge1Sub")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{t("badge2Title")}</p>
                  <p className="text-[10px] text-zinc-400">{t("badge2Sub")}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-white">{t("badge3Title")}</p>
                  <p className="text-[10px] text-zinc-400">{t("badge3Sub")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Multi-Language Connected Visual */}
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
