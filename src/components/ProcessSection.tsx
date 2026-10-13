"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { PROCESS_STEPS } from "@/data/siteData";

export default function ProcessSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#05070e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-[#00F2FE] text-xs font-mono font-semibold tracking-wider uppercase">
            <span>Execution Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our 4-Step <span className="text-gradient-cyan">Engineering Process</span>
          </h2>
          <p className="text-base text-zinc-300 leading-relaxed">
            Predictable sprints, radical architectural transparency, and institutional-grade code standards ensure zero surprises from concept to launch.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative rounded-2xl bg-[#090e17]/80 border border-white/[0.08] p-7 flex flex-col justify-between group hover:border-cyan-400/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,242,254,0.08)] backdrop-blur-md"
            >
              {/* Step indicator header */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl font-mono font-extrabold text-[#00F2FE] group-hover:scale-110 transition-transform">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                    Phase {idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F2FE] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Deliverables list */}
              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Key Deliverables:
                </span>
                {step.deliverables.map((deliv, dIdx) => (
                  <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{deliv}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
