import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative bg-[#030509] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#00F2FE]/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.07]">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-[#05070E] rounded-[7px] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-white font-extrabold text-lg">
                    C
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold tracking-tight text-lg">
                  CascadeTech
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-400 -mt-1">
                  Solutions
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              &ldquo;{tCommon("tagline")}&rdquo;
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3 text-xs text-zinc-300">
                <MapPin className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span>{tCommon("location")}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-zinc-300">
                <Mail className="w-4 h-4 text-[#00F2FE] shrink-0" />
                <a
                  href={`mailto:${tCommon("email")}`}
                  className="hover:text-[#00F2FE] transition-colors underline-offset-4 hover:underline"
                >
                  {tCommon("email")}
                </a>
              </div>
            </div>

            {/* Language Switcher in Footer */}
            <div className="pt-2">
              <p className="text-[11px] font-mono uppercase text-zinc-400 mb-2">
                {tNav("selectLanguage")}:
              </p>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              {tNav("home")} & Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  {tNav("work")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {tNav("services")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tNav("about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tNav("contact")}
                </Link>
              </li>
              <li>
                <a
                  href="/studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs inline-flex items-center gap-1 text-[#00F2FE]/80 hover:text-[#00F2FE] pt-1"
                >
                  <span>{t("studioLink")}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              {tNav("services")}
            </h4>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/services#custom-website-development" className="hover:text-[#00F2FE] transition-colors line-clamp-1">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services#web-design-ui-ux" className="hover:text-[#00F2FE] transition-colors line-clamp-1">
                  Web Design & UI/UX
                </Link>
              </li>
              <li>
                <Link href="/services#custom-software-development" className="hover:text-[#00F2FE] transition-colors line-clamp-1">
                  Software Development
                </Link>
              </li>
              <li>
                <Link href="/services#ai-chatbot-development" className="hover:text-[#00F2FE] transition-colors line-clamp-1">
                  AI & Chatbot
                </Link>
              </li>
              <li>
                <Link href="/services#digital-transformation" className="hover:text-[#00F2FE] transition-colors line-clamp-1">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-xs text-[#00F2FE] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>All 7 Services</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Live Flagship Products */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-zinc-300 mb-4">
              {tCommon("liveProducts")}
            </h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <Link
                  href="/work#startopia"
                  className="text-white font-semibold text-sm hover:text-[#00F2FE] flex items-center justify-between"
                >
                  <span>Startopia</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-[#00F2FE] border border-cyan-800/40">
                    Live
                  </span>
                </Link>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  Founder ecosystem platform
                </p>
              </li>

              <li className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <Link
                  href="/work#textyourboss"
                  className="text-white font-semibold text-sm hover:text-[#00F2FE] flex items-center justify-between"
                >
                  <span>TextYourBoss.ai</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-[#00F2FE] border border-cyan-800/40">
                    Live
                  </span>
                </Link>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  AI communication & workflow
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {currentYear} CascadeTech Solutions. {t("rights")}</p>
          <div className="flex items-center gap-6 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
              Enterprise Security
            </span>
            <span>•</span>
            <span>{t("madeWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
