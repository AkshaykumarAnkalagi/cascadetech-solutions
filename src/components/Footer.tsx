import NextLink from "next/link";
import { Mail, MapPin, ArrowUpRight, ShieldCheck, Heart } from "lucide-react";
import { SITE_INFO, SERVICES, PROJECTS } from "@/data/siteData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#030509] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#00F2FE]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.07]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <NextLink href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070E] rounded-[7px] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-white font-extrabold text-lg">
                    C
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-lg">
                  {SITE_INFO.name}
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400 -mt-1">
                  Solutions
                </span>
              </div>
            </NextLink>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              &ldquo;{SITE_INFO.tagline}&rdquo; — Engineering high-scale software, bespoke web applications, and applied AI systems for companies ready to lead.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <MapPin className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span>{SITE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <Mail className="w-4 h-4 text-[#00F2FE] shrink-0" />
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="hover:text-[#00F2FE] transition-colors underline-offset-4 hover:underline"
                >
                  {SITE_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <NextLink href="/" className="hover:text-white transition-colors">
                  Home
                </NextLink>
              </li>
              <li>
                <NextLink href="/work" className="hover:text-white transition-colors">
                  Selected Work
                </NextLink>
              </li>
              <li>
                <NextLink href="/services" className="hover:text-white transition-colors">
                  Capabilities & Services
                </NextLink>
              </li>
              <li>
                <NextLink href="/about" className="hover:text-white transition-colors">
                  About CascadeTech
                </NextLink>
              </li>
              <li>
                <NextLink href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="/studio"
                  target="_blank"
                  className="text-xs inline-flex items-center gap-1 text-[#00F2FE]/80 hover:text-[#00F2FE] pt-1"
                >
                  <span>CMS Studio Login</span>
                  <ArrowUpRight className="w-3 h-3" />
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              {SERVICES.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <NextLink
                    href={`/services#${srv.slug}`}
                    className="hover:text-[#00F2FE] transition-colors line-clamp-1"
                  >
                    {srv.title}
                  </NextLink>
                </li>
              ))}
              <li>
                <NextLink
                  href="/services"
                  className="text-xs text-[#00F2FE] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>All Services (7)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </NextLink>
              </li>
            </ul>
          </div>

          {/* Live Flagship Products */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              Live Products
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              {PROJECTS.map((prod) => (
                <li key={prod.id} className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                  <NextLink
                    href={`/work#${prod.slug}`}
                    className="text-white font-semibold text-sm hover:text-[#00F2FE] flex items-center justify-between"
                  >
                    <span>{prod.title}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-[#00F2FE] border border-cyan-800/40">
                      Live
                    </span>
                  </NextLink>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                    {prod.shortDescription}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {currentYear} {SITE_INFO.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
              Enterprise Grade Security
            </span>
            <span>•</span>
            <span>Hubballi, Karnataka, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
