import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck, Database, Layers, Sparkles } from "lucide-react";

export const metadata = {
  title: "Educore ERP - CascadeTech Solutions",
  description: "Enterprise School Management ERP with DPDP Act 2023 Compliance & Double-Entry Ledgers",
};

export default function EducoreGatewayPage() {
  const isDev = process.env.NODE_ENV === "development";
  const localDevUrl = "http://localhost:3002";
  const targetUrl =
    process.env.NEXT_PUBLIC_EDUCORE_URL ||
    process.env.EDUCORE_FRONTEND_URL ||
    (isDev ? localDevUrl : "https://cascade-erp.in/educore");

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
          Flagship ERP Product
        </span>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl w-full mx-auto py-12 space-y-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Enterprise SaaS Solution</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Educore <span className="text-[#00F2FE]">ERP</span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
            Enterprise-grade, multi-tenant school management platform engineered with statutory compliance for India&apos;s DPDP Act 2023, double-entry financial ledgers, and zero-trust tenant isolation.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <ShieldCheck className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">DPDP Act 2023 Ready</h3>
            <p className="text-xs text-zinc-400">Field-level AES-256 encryption, blind indexing, and consent workflows.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <Database className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">Zero Fee Drift Ledgers</h3>
            <p className="text-xs text-zinc-400">Double-entry accounting with pessimistic locking and payment audit trails.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-2">
            <Layers className="w-5 h-5 text-[#00F2FE]" />
            <h3 className="text-sm font-semibold">Zero-Trust Isolation</h3>
            <p className="text-xs text-zinc-400">PostgreSQL Row-Level Security (RLS) policies per school tenant.</p>
          </div>
        </div>

        {/* Launch / Action Box */}
        <div className="p-6 rounded-3xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-white">Direct Application Access</h2>
              <p className="text-xs text-zinc-400">
                {isDev
                  ? "Local development server detected on port 3002."
                  : "Launch the live SchoolMitra & Educore ERP application."}
              </p>
            </div>
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all shrink-0 cursor-pointer"
            >
              <span>{isDev ? "Open Local ERP (Port 3002)" : "Open Live Educore Platform"}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="pt-3 border-t border-white/[0.08] text-xs text-zinc-400 flex flex-col sm:flex-row gap-4">
            <span>
              <strong>Production Single-Domain URL:</strong> <code className="text-[#00F2FE]">www.cascade-erp.in/educore</code>
            </span>
            <span>
              <strong>Backend Endpoint:</strong> <code className="text-[#00F2FE]">api-educore.cascade-erp.in</code>
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto pt-8 border-t border-white/[0.08] text-xs text-zinc-500 flex justify-between">
        <span>&copy; {new Date().getFullYear()} CascadeTech Solutions</span>
        <span>SchoolMitra &bull; Educore Suite</span>
      </footer>
    </div>
  );
}
