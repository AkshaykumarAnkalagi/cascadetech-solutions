"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import {
  Globe,
  Palette,
  Cpu,
  Bot,
  Sparkles,
  GraduationCap,
  RefreshCw,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { SERVICES, type ServiceItem } from "@/data/siteData";

const ICON_MAP: Record<string, React.ElementType> = {
  Globe,
  Palette,
  Cpu,
  Bot,
  Sparkles,
  GraduationCap,
  RefreshCw,
};

interface ServicesOverviewProps {
  services?: ServiceItem[];
}

export default function ServicesOverview({ services = SERVICES }: ServicesOverviewProps) {
  return (
    <section id="services" className="py-24 relative bg-[#04060b] border-t border-white/[0.06]">
      {/* Background glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <span>Engineering Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comprehensive Digital <span className="text-gradient-cyan">Specializations</span>
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            From modern responsive websites to enterprise software and generative AI pipelines, we deliver intelligent digital assets built to endure.
          </p>
        </div>

        {/* 6 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.slice(0, 6).map((service, idx) => {
            const Icon = ICON_MAP[service.iconName] || Cpu;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative rounded-2xl bg-[#090e17]/70 border border-white/[0.08] p-8 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/30 hover:bg-[#0c1424]/80 hover:shadow-[0_12px_36px_rgba(0,242,254,0.06)] hover:-translate-y-1"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[#00F2FE] mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-300 shadow-sm shadow-cyan-500/10">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-[#00F2FE] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Short benefit-focused description */}
                  <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <NextLink
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 group-hover:text-[#00F2FE] transition-colors"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </NextLink>

                  <span className="text-[10px] font-mono text-zinc-400 uppercase">
                    0{idx + 1}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services Callout */}
        <div className="mt-14 text-center">
          <NextLink
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-cyan-400/40 transition-all"
          >
            <span>Explore All 7 Services & Engagement Models</span>
            <ArrowRight className="w-4 h-4 text-[#00F2FE]" />
          </NextLink>
        </div>
      </div>
    </section>
  );
}
