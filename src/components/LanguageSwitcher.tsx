"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { LOCALE_METADATA, routing } from "@/i18n/routing";
import { Globe, ChevronDown, Check } from "lucide-react";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (locale: string) => {
    setIsOpen(false);
    // Seamlessly navigate to the same page with new locale
    router.replace(pathname, { locale: locale as any });
  };

  const currentMeta = LOCALE_METADATA[currentLocale] || LOCALE_METADATA.en;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-cyan-500/25 hover:border-cyan-400/50 text-xs sm:text-sm font-medium text-zinc-200 hover:text-white transition-all duration-200 shadow-[0_0_15px_rgba(0,212,255,0.06)]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5 text-[#00d4ff]" />
        <span className="font-semibold text-white tracking-wide">
          {currentMeta.nativeName}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#00d4ff]" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 sm:w-60 rounded-2xl bg-[#070e1b]/95 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,212,255,0.15)] py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1">
            <p className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Select Language / ಭಾಷೆ / भाषा
            </p>
          </div>

          <div className="max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 py-1">
            {routing.locales.map((loc) => {
              const meta = LOCALE_METADATA[loc];
              const isSelected = loc === currentLocale;

              return (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={`w-full flex items-center justify-between px-3.5 py-2 text-left text-xs sm:text-sm rounded-lg transition-colors group ${
                    isSelected
                      ? "bg-cyan-950/60 text-[#00d4ff] font-semibold"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-bold text-sm tracking-wide">
                      {meta.nativeName}
                    </span>
                    <span className="text-[11px] font-normal text-zinc-400">
                      ({meta.name})
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-[#00d4ff] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
