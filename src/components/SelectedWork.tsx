"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import { ArrowUpRight, CheckCircle2, Layers, Sparkles, ExternalLink } from "lucide-react";
import { PROJECTS, type ProjectItem } from "@/data/siteData";

interface SelectedWorkProps {
  projects?: ProjectItem[];
}

export default function SelectedWork({ projects = PROJECTS }: SelectedWorkProps) {
  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#00F2FE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Flagship Deployments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Selected Work & <span className="text-gradient-cyan">Live Products</span>
            </h2>
            <p className="text-base text-zinc-300 max-w-xl">
              We don&rsquo;t just build client solutions; we engineer and scale proprietary market-leading platforms in active global circulation.
            </p>
          </div>

          <NextLink
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00F2FE] hover:text-white transition-colors group"
          >
            <span>Explore All Work & Pipeline</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </NextLink>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-3xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/40 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,242,254,0.08)] backdrop-blur-xl"
            >
              {/* Top Bar inside Card */}
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-950/70 text-[#00F2FE] border border-cyan-800/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {project.category}
                  </span>
                </div>

                {/* Title and tagline */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-[#00F2FE] transition-colors mb-2">
                  {project.title}
                </h3>
                <p className="text-xs font-mono text-zinc-300 mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {project.shortDescription}
                </p>

                {/* Key Features */}
                <div className="mb-6 space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {project.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom section: Tech Stack & CTA */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 block mb-2">
                    Tech Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <NextLink
                    href={`/work#${project.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/[0.06] hover:bg-[#00F2FE] hover:text-black transition-all duration-300 border border-white/[0.12] hover:border-transparent group/btn"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </NextLink>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#00F2FE] transition-colors"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
