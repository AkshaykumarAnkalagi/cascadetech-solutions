"use client";

import { motion } from "framer-motion";
import { Cpu, Database, Zap, Sparkles, Terminal, Activity, Layers, Server } from "lucide-react";

export default function TechVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[540px] mx-auto flex items-center justify-center select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00F2FE]/15 via-[#1E6FFF]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Outer rotating dashed ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-cyan-500/20"
      />

      {/* Middle rotating ring in reverse */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute w-[72%] h-[72%] rounded-full border border-cyan-400/25 border-t-[#00F2FE] border-r-transparent"
      />

      {/* Core hexagon / cyber hub */}
      <div className="relative z-10 w-44 h-44 rounded-3xl bg-gradient-to-br from-[#0c1626] to-[#05070e] border border-cyan-500/30 p-1 shadow-[0_0_50px_rgba(0,242,254,0.18)] flex items-center justify-center">
        <div className="w-full h-full rounded-[22px] bg-[#05070e]/80 backdrop-blur-xl flex flex-col items-center justify-center p-4 text-center border border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#00F2FE] mb-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
            Cascade Core
          </span>
          <span className="text-[10px] text-cyan-400/80 font-mono mt-0.5">
            Scalable • AI-Native
          </span>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[9px] font-mono text-zinc-400">Systems Active</span>
          </div>
        </div>
      </div>

      {/* Floating Interactive Micro-Nodes */}
      {/* Node 1: Top Right - Applied AI / RAG */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-4 right-2 sm:right-6 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#090e17]/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-black/60">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 flex items-center justify-center text-[#00F2FE]">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold text-white">Applied AI & RAG</p>
            <p className="text-[9px] font-mono text-cyan-400/80">TextYourBoss.ai Engine</p>
          </div>
        </div>
      </motion.div>

      {/* Node 2: Bottom Left - Next.js 15 & TS */}
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-0 sm:left-4 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#090e17]/90 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-black/60">
          <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold text-white">Modern Architecture</p>
            <p className="text-[9px] font-mono text-blue-300/80">Next.js 15 App Router</p>
          </div>
        </div>
      </motion.div>

      {/* Node 3: Bottom Right - Startopia Founder Hub */}
      <motion.div
        animate={{ y: [-3, 5, -3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-12 right-2 sm:right-8 z-20"
      >
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-[#090e17]/90 border border-emerald-500/30 backdrop-blur-md shadow-lg shadow-black/60">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <p className="text-[11px] font-semibold text-white">Startopia Ecosystem</p>
            <p className="text-[9px] font-mono text-emerald-300/80">2,400+ Founders</p>
          </div>
        </div>
      </motion.div>

      {/* Node 4: Top Left - Enterprise Scalability */}
      <motion.div
        animate={{ y: [3, -5, 3] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-2 sm:left-6 z-20"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#090e17]/90 border border-white/10 backdrop-blur-md shadow-lg shadow-black/60">
          <Server className="w-3.5 h-3.5 text-zinc-300" />
          <span className="text-[10px] font-mono text-zinc-300">Distributed & Cloud-Native</span>
        </div>
      </motion.div>

      {/* Connecting animated SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="25%"
          y1="25%"
          x2="45%"
          y2="45%"
          stroke="rgba(0, 242, 254, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="75%"
          y1="25%"
          x2="55%"
          y2="45%"
          stroke="rgba(0, 242, 254, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="25%"
          y1="75%"
          x2="45%"
          y2="55%"
          stroke="rgba(56, 189, 248, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="75%"
          y1="75%"
          x2="55%"
          y2="55%"
          stroke="rgba(0, 242, 254, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>
    </div>
  );
}
