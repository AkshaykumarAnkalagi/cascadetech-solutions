"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Database,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode2,
  Layers,
  Settings,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { isSanityConfigured } from "@/sanity/client";
import { projectId, dataset } from "@/sanity/env";

export default function StudioPage() {
  const [activeTab, setActiveTab] = useState<"schemas" | "setup">("schemas");

  const schemas = [
    {
      name: "homePage",
      title: "Homepage Settings",
      description: "Hero eyebrow, headline, primary/secondary CTAs, and trust indicators",
      fields: ["eyebrow", "heroHeadline", "heroDescription", "primaryCtaText", "trustIndicators"],
    },
    {
      name: "service",
      title: "Services & Capabilities",
      description: "Custom websites, UI/UX, software development, AI chatbots, etc.",
      fields: ["title", "slug", "shortDescription", "fullDescription", "benefits", "deliverables", "techStack"],
    },
    {
      name: "project",
      title: "Projects & Case Studies",
      description: "Startopia, TextYourBoss.ai, pipeline projects, metrics, and links",
      fields: ["title", "slug", "category", "tagline", "metrics", "keyFeatures", "techStack", "status"],
    },
    {
      name: "stat",
      title: "Credibility Metrics",
      description: "Years of innovation, projects delivered, live products, client retention",
      fields: ["value", "label", "description", "order"],
    },
    {
      name: "siteSettings",
      title: "Site Settings & Contact",
      description: "Company legal name, address in Hubballi, email, phone, navigation",
      fields: ["companyName", "tagline", "email", "phone", "location", "navigation", "seo"],
    },
    {
      name: "seo",
      title: "Global SEO Meta",
      description: "Meta title, descriptions, open graph images, keywords",
      fields: ["metaTitle", "metaDescription", "keywords", "ogImage"],
    },
  ];

  return (
    <div className="min-h-screen bg-[#05070e] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Studio Top Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-950/60 via-[#0a1220] to-blue-950/60 border border-cyan-500/30 p-8 sm:p-10 backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-[#00F2FE] text-xs font-mono font-semibold">
              <Database className="w-3.5 h-3.5" />
              <span>CascadeTech Headless CMS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sanity Content Studio
            </h1>
            <p className="text-sm text-zinc-300 max-w-xl">
              Manage live case studies, capabilities, homepage copy, and global SEO metadata for CascadeTech Solutions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href="https://www.sanity.io/manage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-black bg-gradient-to-r from-[#00F2FE] to-[#38BDF8] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all"
            >
              <span>Open Sanity Manage</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <NextLink
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-zinc-300 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] transition-all"
            >
              <span>Back to Website</span>
            </NextLink>
          </div>
        </div>

        {/* Configuration Status Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#090e17]/80 border border-white/[0.08] backdrop-blur-md space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              CMS Status
            </span>
            <div className="flex items-center gap-2 text-base font-bold text-white">
              {isSanityConfigured ? (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400">Connected to Sanity Cloud</span>
                </>
              ) : (
                <>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-[#00F2FE]">Active (Local Fallback Mode)</span>
                </>
              )}
            </div>
            <p className="text-xs text-zinc-400">
              {isSanityConfigured
                ? `Project: ${projectId} • Dataset: ${dataset}`
                : "Serving production content from siteData.ts out of the box."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e17]/80 border border-white/[0.08] backdrop-blur-md space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Active Schemas
            </span>
            <div className="text-2xl font-extrabold text-white">
              6 Document Models
            </div>
            <p className="text-xs text-zinc-400">
              Homepage, Services, Projects, Stats, Settings, SEO
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#090e17]/80 border border-white/[0.08] backdrop-blur-md space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Live Products Tracked
            </span>
            <div className="text-2xl font-extrabold text-[#00F2FE]">
              Startopia & TextYourBoss.ai
            </div>
            <p className="text-xs text-zinc-400">
              Synchronized across all marketing cards and detail pages
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveTab("schemas")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "schemas"
                ? "bg-white/[0.1] text-[#00F2FE] border border-cyan-500/30"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            Configured CMS Schemas ({schemas.length})
          </button>
          <button
            onClick={() => setActiveTab("setup")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "setup"
                ? "bg-white/[0.1] text-[#00F2FE] border border-cyan-500/30"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            How to Connect Your Sanity Project
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "schemas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemas.map((schema) => (
              <div
                key={schema.name}
                className="p-6 rounded-2xl bg-[#090e17]/80 border border-white/[0.08] hover:border-cyan-400/30 transition-all space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCode2 className="w-5 h-5 text-[#00F2FE]" />
                    <h3 className="text-lg font-bold text-white">{schema.title}</h3>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.08]">
                    _type: &ldquo;{schema.name}&rdquo;
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {schema.description}
                </p>

                <div className="pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Fields Configured:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {schema.fields.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-zinc-300 border border-white/[0.05]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "setup" && (
          <div className="rounded-3xl bg-[#090e17]/90 border border-white/[0.09] p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-[#00F2FE]" />
              <span>3-Step Sanity Cloud Connection</span>
            </h2>

            <div className="space-y-4 text-sm text-zinc-300">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-[#00F2FE] font-mono font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-white">Create a Sanity Project</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    Visit{" "}
                    <a
                      href="https://www.sanity.io"
                      target="_blank"
                      className="text-[#00F2FE] underline"
                    >
                      sanity.io
                    </a>{" "}
                    and create a new project, or run <code className="text-zinc-200 bg-white/[0.06] px-1 rounded">npm create sanity@latest</code>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-[#00F2FE] font-mono font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-white">Add Your Environment Variables</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    In your <code className="text-zinc-200 bg-white/[0.06] px-1 rounded">.env.local</code> file (or Vercel dashboard), add:
                  </p>
                  <pre className="mt-2 p-3 rounded-lg bg-black/60 text-xs font-mono text-cyan-300 overflow-x-auto">
                    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
                    {"\n"}NEXT_PUBLIC_SANITY_DATASET=production
                  </pre>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
                <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-[#00F2FE] font-mono font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-white">Authorize CORS Origins</h4>
                  <p className="text-xs text-zinc-400 mt-1">
                    In Sanity Management Settings under <strong>API → CORS Origins</strong>, add{" "}
                    <code className="text-zinc-200 bg-white/[0.06] px-1 rounded">http://localhost:3000</code> and your production Vercel domain with credentials enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
