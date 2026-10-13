"use client";

import { motion } from "framer-motion";
import { STATS, type StatItem } from "@/data/siteData";

interface StatsBarProps {
  stats?: StatItem[];
}

export default function StatsBar({ stats = STATS }: StatsBarProps) {
  return (
    <section className="relative py-12 border-y border-white/[0.08] bg-[#070b13]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id || index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left group"
            >
              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00F2FE] tracking-tight group-hover:text-glow transition-all">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-[#00F2FE] transition-colors">
                {stat.label}
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-[200px] leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
