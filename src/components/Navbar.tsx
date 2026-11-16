"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, ArrowUpRight, Sparkles, Globe, Check } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { routing, LOCALE_METADATA } from "@/i18n/routing";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  const NAV_LINKS = [
    { name: t("home"), href: "/" },
    { name: t("work"), href: "/work" },
    { name: t("services"), href: "/services" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMobileLocaleChange = (locale: string) => {
    setMobileMenuOpen(false);
    router.replace(pathname, { locale: locale as any });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070E]/95 backdrop-blur-xl border-b border-cyan-500/15 py-2 sm:py-3 shadow-2xl shadow-black/80"
          : "bg-gradient-to-b from-[#05070E]/95 via-[#05070E]/70 to-transparent backdrop-blur-md py-2.5 sm:py-4 border-b border-white/[0.04]"
      }`}
    >
      {/* Ambient lighting shade across the navbar */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent pointer-events-none" />
      <div className="absolute -top-6 left-1/4 w-[450px] h-16 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -top-6 right-1/4 w-[400px] h-16 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Brand Name */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3.5 group transition-transform duration-200 min-w-0 shrink"
          >
            <div className="relative flex items-center justify-center shrink-0">
              {/* Soft diffused background shade behind logo (no hard box border) */}
              <div className="absolute w-20 sm:w-44 h-14 sm:h-28 rounded-full bg-gradient-to-r from-cyan-400/35 via-blue-500/20 to-transparent blur-xl sm:blur-2xl pointer-events-none -z-10 group-hover:scale-125 group-hover:from-cyan-400/50 transition-all duration-300" />
              <div className="absolute w-14 sm:w-28 h-10 sm:h-20 rounded-full bg-white/10 blur-lg sm:blur-xl pointer-events-none -z-10" />

              <Image
                src="/cascade-logo.png"
                alt="CascadeTech Solutions Logo"
                width={104}
                height={84}
                priority
                className="h-11 sm:h-16 lg:h-[76px] w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-105 shrink-0"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white font-bold tracking-tight text-base sm:text-xl lg:text-2xl group-hover:text-[#00F2FE] transition-colors leading-tight truncate">
                CascadeTech
              </span>
              <span className="text-[10px] sm:text-xs tracking-widest uppercase font-semibold text-zinc-400 truncate">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-1.5 backdrop-blur-md shrink-0">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-inner font-semibold"
                      : "text-zinc-300 hover:text-[#00F2FE] hover:bg-white/[0.03]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Action Buttons: Language Switcher + Get Started */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-[1.02] active:scale-[0.98] shrink-0"
            >
              <span>{tCommon("getStarted")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Header Controls: Compact Language Switcher + Perfectly Positioned Hamburger */}
          <div className="flex md:hidden items-center gap-1.5 sm:gap-2 shrink-0 ml-auto">
            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-cyan-500/25 active:scale-95 transition-all text-zinc-200 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#00d4ff]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-cyan-500/15 bg-[#05070E]/98 backdrop-blur-2xl px-4 pt-3 pb-6 mt-2 transition-all animate-in slide-in-from-top-4 shadow-2xl shadow-black">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-cyan-950/60 text-[#00F2FE] border border-cyan-500/25 font-semibold"
                      : "text-zinc-200 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </Link>
              );
            })}

            {/* Dedicated Mobile Language Switcher Section with touch-friendly pills */}
            <div className="pt-3 pb-2 mt-2 border-t border-white/[0.08]">
              <div className="flex items-center gap-1.5 px-1 mb-2">
                <Globe className="w-3.5 h-3.5 text-[#00d4ff]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                  Language / ಭಾಷೆ / भाषा
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {routing.locales.map((loc) => {
                  const meta = LOCALE_METADATA[loc];
                  const isSelected = loc === currentLocale;
                  return (
                    <button
                      key={loc}
                      onClick={() => handleMobileLocaleChange(loc)}
                      className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs transition-all active:scale-95 ${
                        isSelected
                          ? "bg-cyan-500/20 text-[#00d4ff] border border-cyan-400/40 font-bold shadow-[0_0_12px_rgba(0,212,255,0.15)]"
                          : "bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]"
                      }`}
                    >
                      <span className="font-semibold text-xs leading-tight">
                        {meta.nativeName}
                      </span>
                      <span className="text-[9px] text-zinc-400 font-mono mt-0.5">
                        ({meta.name})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile CTA Button */}
            <div className="pt-2 border-t border-white/[0.08]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] shadow-[0_0_20px_rgba(0,242,254,0.3)] active:scale-[0.99] transition-transform"
              >
                <span>{t("consultationBtn")}</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
