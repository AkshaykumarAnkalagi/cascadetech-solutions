"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  ExternalLink,
  Layers,
  Sparkles,
  FileText,
  Briefcase,
  Wrench,
  HelpCircle,
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";
import { WebsiteCmsData, INITIAL_CMS_DATA } from "@/lib/cmsTypes";

export default function CmsEditor() {
  const [data, setData] = useState<WebsiteCmsData>(INITIAL_CMS_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<
    "hero" | "products" | "services" | "stats" | "media" | "faqs"
  >("hero");

  useEffect(() => {
    fetchCmsData();
  }, []);

  const fetchCmsData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/cms");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      setError("Failed to load CMS content.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaveSuccess(false);

    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to save CMS data.");
      } else {
        setData(json.data);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 4000);
      }
    } catch {
      setError("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-slate-800 bg-[#0a0f1d]/60 p-8 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <span>Loading Website CMS Content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top CMS Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-cyan-500/25 bg-[#0a0f1d]/90 p-5 shadow-xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-400">
              <Sparkles className="h-3 w-3" />
              Live Visual CMS Engine
            </span>
            <span className="text-xs text-slate-400">
              Instant updates across all pages
            </span>
          </div>
          <h2 className="mt-1 text-lg font-bold text-white">
            Website Content & Section Manager
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 animate-fade-in">
              <CheckCircle2 className="h-4 w-4" />
              Changes Published Live!
            </span>
          )}
          {error && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-red-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition disabled:opacity-60"
          >
            {saving ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span>{saving ? "Publishing..." : "Save & Publish"}</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: "hero", label: "Hero & Identity", icon: FileText },
          { id: "products", label: "Products & Projects", icon: Briefcase },
          { id: "services", label: "Services (7)", icon: Wrench },
          { id: "stats", label: "Credibility Stats", icon: Layers },
          { id: "media", label: "Media & Logos", icon: ImageIcon },
          { id: "faqs", label: "FAQs & Reviews", icon: HelpCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition ${
                active
                  ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO & GENERAL IDENTITY */}
      {activeSubTab === "hero" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
          <div className="border-b border-slate-800/80 pb-4">
            <h3 className="text-sm font-bold text-white">Homepage Hero Section</h3>
            <p className="text-xs text-slate-400">
              The primary banner visitors see when entering cascade-erp.in
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">
                Eyebrow Badge Text
              </label>
              <input
                type="text"
                value={data.hero.eyebrow}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, eyebrow: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">
                Main Headline
              </label>
              <input
                type="text"
                value={data.hero.headline}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, headline: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-slate-300">
                Hero Sub-Headline / Description
              </label>
              <textarea
                rows={3}
                value={data.hero.description}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, description: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Primary CTA Button Label
              </label>
              <input
                type="text"
                value={data.hero.primaryCtaText}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, primaryCtaText: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Primary CTA Destination Link
              </label>
              <input
                type="text"
                value={data.hero.primaryCtaLink}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, primaryCtaLink: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Secondary CTA Button Label
              </label>
              <input
                type="text"
                value={data.hero.secondaryCtaText}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, secondaryCtaText: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Secondary CTA Destination Link
              </label>
              <input
                type="text"
                value={data.hero.secondaryCtaLink}
                onChange={(e) =>
                  setData({
                    ...data,
                    hero: { ...data.hero, secondaryCtaLink: e.target.value },
                  })
                }
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6 mt-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Company Identity & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">Legal Name</label>
                <input
                  type="text"
                  value={data.siteInfo.name}
                  onChange={(e) =>
                    setData({
                      ...data,
                      siteInfo: { ...data.siteInfo, name: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">Contact Email</label>
                <input
                  type="email"
                  value={data.siteInfo.email}
                  onChange={(e) =>
                    setData({
                      ...data,
                      siteInfo: { ...data.siteInfo, email: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400">Contact Phone</label>
                <input
                  type="text"
                  value={data.siteInfo.phone}
                  onChange={(e) =>
                    setData({
                      ...data,
                      siteInfo: { ...data.siteInfo, phone: e.target.value },
                    })
                  }
                  className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS & PORTFOLIO */}
      {activeSubTab === "products" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Flagship Products & Case Studies</h3>
                <p className="text-xs text-slate-400">
                  Manage Educore ERP, Nestora Hub, and active projects
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newProj = {
                    id: `project-${Date.now()}`,
                    slug: `project-${Date.now()}`,
                    title: "New Flagship Software",
                    category: "ENTERPRISE SOFTWARE",
                    tagline: "Scalable platform built for modern business requirements.",
                    shortDescription: "High-performance software engine with statutory compliance.",
                    fullDescription: "Enterprise software engineered with resilient architecture and modular scale.",
                    featured: false,
                    accentColor: "#00F2FE",
                    metrics: [{ label: "Uptime", value: "99.9%" }],
                    keyFeatures: ["Secure Architecture", "Real-Time Telemetry"],
                    techStack: ["Next.js", "PostgreSQL", "Tailwind CSS"],
                    status: "Live Product" as const,
                    link: "/",
                  };
                  setData({ ...data, projects: [...data.projects, newProj] });
                }}
                className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Product
              </button>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                      <span className="text-sm font-bold text-white">{proj.title}</span>
                      <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-cyan-400 font-mono">
                        {proj.category}
                      </span>
                    </div>
                    {data.projects.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const updated = data.projects.filter((_, i) => i !== idx);
                          setData({ ...data, projects: updated });
                        }}
                        className="rounded p-1 text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-400">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].title = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-400">Destination Link</label>
                      <input
                        type="text"
                        value={proj.link || ""}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].link = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-medium text-slate-400">Tagline</label>
                      <input
                        type="text"
                        value={proj.tagline}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].tagline = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-[11px] font-medium text-slate-400">Description</label>
                      <textarea
                        rows={2}
                        value={proj.shortDescription}
                        onChange={(e) => {
                          const updated = [...data.projects];
                          updated[idx].shortDescription = e.target.value;
                          setData({ ...data, projects: updated });
                        }}
                        className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SERVICES */}
      {activeSubTab === "services" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white">Services & Capabilities (7 Offerings)</h3>
            <p className="text-xs text-slate-400">
              Customize offerings presented on the Services page and Homepage
            </p>
          </div>

          <div className="space-y-4">
            {data.services.map((svc, idx) => (
              <div
                key={svc.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300">
                    Service #{idx + 1}: {svc.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">slug: /{svc.slug}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Service Name</label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => {
                        const updated = [...data.services];
                        updated[idx].title = e.target.value;
                        setData({ ...data, services: updated });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Short Summary</label>
                    <input
                      type="text"
                      value={svc.shortDescription}
                      onChange={(e) => {
                        const updated = [...data.services];
                        updated[idx].shortDescription = e.target.value;
                        setData({ ...data, services: updated });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STATS */}
      {activeSubTab === "stats" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white">Credibility & Innovation Stats</h3>
            <p className="text-xs text-slate-400">
              Shown across Homepage StatsBar, About, and Work pages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.stats.map((st, idx) => (
              <div
                key={st.id || idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Metric #{idx + 1}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">{st.id}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">Value (e.g. 2+)</label>
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const updated = [...data.stats];
                        updated[idx].value = e.target.value;
                        setData({ ...data, stats: updated });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-bold text-cyan-300"
                    />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <label className="text-[11px] text-slate-400">Label</label>
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const updated = [...data.stats];
                        updated[idx].label = e.target.value;
                        setData({ ...data, stats: updated });
                      }}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400">Description</label>
                  <input
                    type="text"
                    value={st.description}
                    onChange={(e) => {
                      const updated = [...data.stats];
                      updated[idx].description = e.target.value;
                      setData({ ...data, stats: updated });
                    }}
                    className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: MEDIA & LOGOS */}
      {activeSubTab === "media" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white">Media Assets & Preview Graphics</h3>
            <p className="text-xs text-slate-400">
              Configure brand logos, browser favicons, and social sharing cards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <span className="text-xs font-semibold text-white">Official Brand Logo</span>
              <div className="flex h-28 items-center justify-center rounded-lg bg-[#05070E] border border-cyan-500/20 p-2">
                <Image
                  src={data.media.logoUrl || "/cascade-logo.png"}
                  alt="Logo Preview"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <input
                type="text"
                value={data.media.logoUrl}
                onChange={(e) =>
                  setData({
                    ...data,
                    media: { ...data.media, logoUrl: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-[11px] text-white"
              />
            </div>

            {/* Favicon Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <span className="text-xs font-semibold text-white">Browser Tab Favicon</span>
              <div className="flex h-28 items-center justify-center rounded-lg bg-[#05070E] border border-cyan-500/20 p-2">
                <Image
                  src={data.media.faviconUrl || "/favicon.ico"}
                  alt="Favicon Preview"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <input
                type="text"
                value={data.media.faviconUrl}
                onChange={(e) =>
                  setData({
                    ...data,
                    media: { ...data.media, faviconUrl: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-[11px] text-white"
              />
            </div>

            {/* OG Social Card */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
              <span className="text-xs font-semibold text-white">1200x630 Social Card</span>
              <div className="relative h-28 overflow-hidden rounded-lg bg-[#05070E] border border-cyan-500/20">
                <Image
                  src={data.media.ogImageUrl || "/og-image.png"}
                  alt="OG Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <input
                type="text"
                value={data.media.ogImageUrl}
                onChange={(e) =>
                  setData({
                    ...data,
                    media: { ...data.media, ogImageUrl: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-[11px] text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: FAQS & REVIEWS */}
      {activeSubTab === "faqs" && (
        <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Frequently Asked Questions (AEO/AIO)</h3>
              <p className="text-xs text-slate-400">
                These Q&As are automatically parsed by ChatGPT, Perplexity, and Google AI Overviews
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                const newFaq = {
                  question: "What makes CascadeTech different?",
                  answer: "We engineer production-grade enterprise software with strict statutory compliance and modern AI capabilities.",
                  category: "General",
                };
                setData({ ...data, faqs: [...data.faqs, newFaq] });
              }}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 transition"
            >
              <Plus className="h-3.5 w-3.5" />
              Add FAQ
            </button>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Question #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = data.faqs.filter((_, i) => i !== idx);
                      setData({ ...data, faqs: updated });
                    }}
                    className="text-slate-500 hover:text-red-400 text-xs"
                  >
                    Delete
                  </button>
                </div>

                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...data.faqs];
                    updated[idx].question = e.target.value;
                    setData({ ...data, faqs: updated });
                  }}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-white"
                />

                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...data.faqs];
                    updated[idx].answer = e.target.value;
                    setData({ ...data, faqs: updated });
                  }}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
