"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Authentication failed. Please verify credentials.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network or server connection error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#05070e] px-4 py-12 text-slate-100">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="relative w-full max-w-md">
        {/* Top Header Card */}
        <div className="mb-6 text-center flex flex-col items-center">
          <div className="relative mb-3 flex items-center justify-center">
            {/* Soft radiant shade behind the logo */}
            <div className="absolute w-36 h-36 rounded-full bg-gradient-to-r from-cyan-400/35 via-blue-500/25 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none -z-10" />
            <Image
              src="/cascade-logo.png"
              alt="CascadeTech Solutions Logo"
              width={120}
              height={98}
              priority
              className="h-24 sm:h-28 w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
            />
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-medium text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
            Cascade Infrastructure Console
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Admin Portal
          </h1>
          <p className="mt-1.5 text-xs text-slate-400">
            Sign in to access analytics, heatmaps, and website CMS
          </p>
        </div>

        {/* Login Box */}
        <div className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1d]/90 p-7 shadow-2xl backdrop-blur-xl">
          {error && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username or email address"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2.5 pl-9 pr-10 text-xs text-white placeholder-slate-500 transition focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 disabled:opacity-60"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  Sign In to Dashboard
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-slate-800/80 pt-4 text-center">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-cyan-400 transition"
            >
              &larr; Return to Cascade Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
