"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070E]/85 backdrop-blur-md border-b border-white/[0.08] py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform duration-200 shrink-0"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-400/30 via-cyan-500/20 to-blue-600/30 p-[1.5px] shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-400/40 group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full bg-[#070d1a]/90 backdrop-blur-md rounded-[10px] flex items-center justify-center overflow-hidden p-1 border border-cyan-400/20">
                <Image
                  src="/cascade-logo.png"
                  alt="CascadeTech Solutions Logo"
                  width={42}
                  height={42}
                  priority
                  className="object-contain drop-shadow-[0_0_8px_rgba(0,242,254,0.4)] transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-base sm:text-lg group-hover:text-[#00F2FE] transition-colors leading-tight">
                CascadeTech
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400">
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-1.5 backdrop-blur-md">
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

          {/* Right Action Buttons: Language Switcher + Get Started */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher />

            <Link
              href="/contact"
              className="relative inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{tCommon("getStarted")}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Header Controls */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-zinc-300 hover:text-white rounded-lg bg-white/[0.05] border border-white/[0.08]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#05070E]/95 backdrop-blur-xl px-5 pt-4 pb-6 mt-3 transition-all animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-[#00F2FE] font-semibold"
                      : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </Link>
              );
            })}
            <div className="pt-3 mt-2 border-t border-white/[0.08]">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8]"
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
