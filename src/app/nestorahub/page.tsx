import Link from "next/link";
import { ArrowLeft, ExternalLink, Home, Search, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Nestora Hub - CascadeTech Solutions",
  description: "Real Estate & Property Ecosystem for Buying, Selling & Renting",
};

export default function NestoraGatewayPage() {
  const isDev = process.env.NODE_ENV === "development";
  const localDevUrl = "http://localhost:5173";
  const targetUrl =
    process.env.NEXT_PUBLIC_NESTORAHUB_URL ||
    process.env.NESTORAHUB_FRONTEND_URL ||
    (isDev ? localDevUrl : "https://cascade-erp.in/nestorahub");

  return (
    <div className="min-h-screen bg-[#06090e] text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans">
      {/* Background accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-10 flex items-center justify-between max-w-6xl w-full mx-auto pb-8 border-b border-white/[0.08]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-[#00F2FE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to CascadeTech Solutions</span>
        </Link>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/70 text-[#00F2FE] border border-cyan-800/40">
          Flagship PropTech Product
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl w-full mx-auto py-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PropTech Ecosystem</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Nestora <span className="text-[#00F2FE]">Hub</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Next-generation real estate marketplace simplifying verified property discovery, commercial leasing, residential sales, and automated inquiry pipelines across Hubli-Dharwad.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">100% Verified Listings</h3>
            <p className="text-xs text-zinc-400">Strict ownership and documentation validation before publishing.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <Search className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">Locality Discovery</h3>
            <p className="text-xs text-zinc-400">Detailed neighborhood analytics, price trends, and instant visits.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <Home className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">Admin CRM Engine</h3>
            <p className="text-xs text-zinc-400">Direct buyer-seller matchmaking and integrated lead management.</p>
          </div>
        </div>

        {/* Launch / Action Box */}
        <div className="p-6 rounded-3xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">Direct Application Access</h2>
              <p className="text-xs text-zinc-400">
                {isDev
                  ? "Local development server runs on port 5173."
                  : "Launch the live Nestora Hub Real Estate marketplace."}
              </p>
            </div>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all shrink-0 cursor-pointer"
            >
              <span>{isDev ? "Open Local Nestora (Port 5173)" : "Open Live Nestora Hub"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-3 border-t border-white/[0.08] text-xs text-zinc-400 flex flex-col sm:flex-row gap-4">
            <span>
              <strong>Production Single-Domain URL:</strong> <code className="text-[#00F2FE]">www.cascade-erp.in/nestorahub</code>
            </span>
            <span>
              <strong>Backend Endpoint:</strong> <code className="text-[#00F2FE]">api-nestora.cascade-erp.in</code>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto pt-8 border-t border-white/[0.08] text-xs text-zinc-500 flex justify-between">
        <span>&copy; {new Date().getFullYear()} CascadeTech Solutions</span>
        <span>Nestora Hub &bull; Property Ecosystem</span>
      </footer>
    </div>
  );
}
