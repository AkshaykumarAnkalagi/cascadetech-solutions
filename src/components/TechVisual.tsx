"use client";

import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";

interface LanguageNode {
  id: string; // locale code: 'en' | 'hi' | 'kn' | 'te' | 'ta' | 'ml' | 'mr' | 'bn' | 'gu'
  name: string;
  sub: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  delay: number;
}

const LANGUAGES: LanguageNode[] = [
  { id: "en", name: "English", sub: "Global", x: 50, y: 7, delay: 0 },
  { id: "kn", name: "ಕನ್ನಡ", sub: "Kannada", x: 84, y: 19, delay: 0.15 },
  { id: "hi", name: "हिंदी", sub: "Hindi", x: 16, y: 19, delay: 0.2 },
  { id: "te", name: "తెలుగు", sub: "Telugu", x: 92, y: 46, delay: 0.25 },
  { id: "gu", name: "ગુજરાતી", sub: "Gujarati", x: 8, y: 46, delay: 0.3 },
  { id: "ta", name: "தமிழ்", sub: "Tamil", x: 85, y: 73, delay: 0.35 },
  { id: "mr", name: "मराठी", sub: "Marathi", x: 15, y: 73, delay: 0.4 },
  { id: "ml", name: "മലയാളം", sub: "Malayalam", x: 68, y: 93, delay: 0.45 },
  { id: "bn", name: "বাংলা", sub: "Bengali", x: 32, y: 93, delay: 0.5 },
];

export default function TechVisual() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const centerX = 50;
  const centerY = 50;

  const handleLanguageClick = (localeId: string) => {
    if (localeId !== currentLocale) {
      router.replace(pathname, { locale: localeId as any });
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[560px] mx-auto flex items-center justify-center select-none overflow-visible">
      {/* 1. Ambient Background Glows */}
      <div className="absolute inset-0 bg-gradient-radial from-[#00d4ff]/15 via-[#22d3ee]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute w-72 h-72 bg-[#00d4ff]/10 rounded-full blur-[90px] pointer-events-none animate-pulse-slow" />

      {/* 2. Layered Abstract Tech Graphic (Isometric Platform Effect) below the network */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Deep Perspective Elliptical Cyber Discs */}
        <div
          className="w-[90%] h-[90%] rounded-full border border-cyan-500/20"
          style={{ transform: "perspective(700px) rotateX(66deg) translateZ(-40px)" }}
        >
          <div
            className="w-full h-full rounded-full border border-dashed border-cyan-400/25 animate-spin"
            style={{ animationDuration: "50s" }}
          />
        </div>

        <div
          className="w-[72%] h-[72%] rounded-full border border-cyan-400/30 bg-gradient-to-b from-cyan-950/20 to-transparent"
          style={{ transform: "perspective(700px) rotateX(66deg) translateZ(-20px)" }}
        />

        <div
          className="w-[52%] h-[52%] rounded-full border border-cyan-300/40 shadow-[0_0_35px_rgba(0,212,255,0.2)]"
          style={{ transform: "perspective(700px) rotateX(66deg) translateZ(0px)" }}
        />
      </div>

      {/* 3. Concentric Orbital Energy Rings in 2D plane */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[86%] h-[86%] rounded-full border border-dashed border-cyan-500/15 pointer-events-none"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[68%] h-[68%] rounded-full border border-cyan-400/20 border-t-[#00d4ff]/40 border-b-transparent pointer-events-none"
      />

      {/* 4. Dynamic SVG Connecting Network Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Cyan linear gradient */}
          <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
          </linearGradient>

          {/* High glow filter for connections */}
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {LANGUAGES.map((node) => {
          const isActive = node.id === currentLocale;

          return (
            <g key={`connection-${node.id}`}>
              {/* Base glowing line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={isActive ? "#00d4ff" : "url(#cyanLineGrad)"}
                strokeWidth={isActive ? "0.6" : "0.3"}
                strokeDasharray={isActive ? "none" : "1.2 1.2"}
                filter="url(#softGlow)"
                className={isActive ? "opacity-100" : "opacity-70"}
              />

              {/* Animated traveling energy pulse along the line */}
              <motion.circle
                r={isActive ? "1.0" : "0.6"}
                fill="#00d4ff"
                initial={{ cx: centerX, cy: centerY, opacity: 0 }}
                animate={{
                  cx: [centerX, node.x],
                  cy: [centerY, node.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.6 + node.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: node.delay * 1.5,
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* 5. Central Glowing Code Icon Node </> */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#0c182c] via-[#07101e] to-[#030712] border-2 border-cyan-400/50 p-1 shadow-[0_0_50px_rgba(0,212,255,0.35)] flex items-center justify-center group"
      >
        <div className="w-full h-full rounded-[22px] bg-[#050b16]/90 backdrop-blur-xl flex flex-col items-center justify-center p-2 text-center border border-cyan-300/20 relative overflow-hidden">
          {/* Inner sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/5 pointer-events-none" />

          {/* Glowing Code Symbol */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-cyan-500/15 border border-cyan-400/40 flex items-center justify-center text-[#00d4ff] shadow-[0_0_18px_rgba(0,212,255,0.4)] group-hover:scale-110 transition-transform">
            <span className="font-mono font-extrabold text-base sm:text-lg tracking-tight select-none">
              &lt;/&gt;
            </span>
          </div>

          <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase mt-1">
            CASCADE
          </span>
          <span className="text-[8px] font-mono text-cyan-300/80 -mt-0.5">
            Omni-Tech
          </span>
        </div>

        {/* Ambient Ring Pulses around Center */}
        <span className="absolute -inset-1 rounded-3xl border border-cyan-400/30 animate-ping opacity-25 pointer-events-none" />
      </motion.div>

      {/* 6. Floating Language Pills Connected to Center (Interactive!) */}
      {LANGUAGES.map((node) => {
        const isActive = node.id === currentLocale;
        const isEnglish = node.id === "en";

        // Floating oscillation range
        const floatY = isActive ? [-6, 6, -6] : [-4, 4, -4];

        return (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: isActive ? 1.05 : 1,
              y: floatY,
            }}
            transition={{
              opacity: { duration: 0.6, delay: node.delay },
              scale: { duration: 0.6, delay: node.delay },
              y: {
                duration: 3.5 + (node.x % 3),
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              },
            }}
            whileHover={{
              scale: 1.15,
              y: -5,
              transition: { duration: 0.2 },
            }}
            onClick={() => handleLanguageClick(node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={`Switch language to ${node.name}`}
            className={`absolute z-30 cursor-pointer transition-shadow duration-300 ${
              isActive
                ? "shadow-[0_0_28px_rgba(0,212,255,0.6)]"
                : isEnglish
                ? "shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(0,212,255,0.5)]"
                : "shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_22px_rgba(0,212,255,0.4)]"
            }`}
          >
            <div
              className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl backdrop-blur-md flex items-center gap-2 border transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-cyan-950 to-[#0c1f38] border-[#00d4ff] text-white ring-1 ring-[#00d4ff]"
                  : isEnglish
                  ? "bg-gradient-to-r from-cyan-950/70 to-[#071324]/90 border-cyan-400/40 text-white"
                  : "bg-[#070e1b]/85 hover:bg-[#0c182c]/95 border-cyan-500/25 hover:border-cyan-400/60 text-zinc-200 hover:text-white"
              }`}
            >
              {/* Highlight / Status indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive
                    ? "bg-[#00d4ff] animate-pulse shadow-[0_0_10px_#00d4ff]"
                    : "bg-cyan-400/60"
                }`}
              />

              <div className="flex flex-col text-left leading-none">
                <span className="font-semibold text-xs sm:text-sm tracking-wide">
                  {node.name}
                </span>
                <span className="text-[9px] font-mono text-zinc-400 mt-0.5">
                  {node.sub}
                </span>
              </div>

              {isActive ? (
                <Check className="w-3.5 h-3.5 text-[#00d4ff] shrink-0" />
              ) : isEnglish ? (
                <Sparkles className="w-3 h-3 text-[#00d4ff] shrink-0" />
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
