"use client";

import { useState, useEffect } from "react";
import Link from "next/navigation";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

const NAV_LINKS = [
  { name: "Work", href: "/work" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          ? "bg-[#05070E]/85 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NextLink
            href="/"
            className="flex items-center gap-2.5 group transition-transform duration-200"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-sm shadow-cyan-500/20 group-hover:shadow-cyan-400/40 transition-shadow">
              <div className="w-full h-full bg-[#05070E] rounded-[7px] flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-white font-extrabold text-lg tracking-wider">
                  C
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-tight text-base sm:text-lg group-hover:text-[#00F2FE] transition-colors">
                CascadeTech
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400 -mt-1">
                Solutions
              </span>
            </div>
          </NextLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-5 py-1.5 backdrop-blur-md">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <NextLink
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? "text-white bg-white/[0.08] shadow-inner"
                      : "text-zinc-300 hover:text-[#00F2FE] hover:bg-white/[0.03]"
                  }`}
                >
                  {link.name}
                </NextLink>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <NextLink
              href="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </NextLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <NextLink
              href="/contact"
              className="px-3 py-1.5 text-xs font-semibold text-black bg-[#00F2FE] rounded-full"
            >
              Get Started
            </NextLink>
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
                <NextLink
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-[#00F2FE]"
                      : "text-zinc-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </NextLink>
              );
            })}
            <div className="pt-3 mt-2 border-t border-white/[0.08]">
              <NextLink
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8]"
              >
                <span>Initiate Consultation</span>
                <Sparkles className="w-4 h-4" />
              </NextLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
