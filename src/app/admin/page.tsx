"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CmsEditor from "@/components/admin/CmsEditor";
import {
  Activity,
  Users,
  Clock,
  Eye,
  Flame,
  MousePointer,
  ExternalLink,
  LogOut,
  RefreshCw,
  Compass,
  CheckCircle2,
  Layers,
  ArrowUpRight,
  Shield,
  BarChart3,
} from "lucide-react";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitorsCount: number;
  pageViews: Record<string, number>;
  siteAvgDwellSeconds: number;
  pageAverages: Record<string, { avgSeconds: number; views: number }>;
  sectionAverages: Record<string, { avgSeconds: number; views: number }>;
  scrollMilestones: {
    "25": number;
    "50": number;
    "75": number;
    "100": number;
  };
  clicks: Array<{
    x: number;
    y: number;
    path: string;
    tag?: string;
    timestamp: number;
  }>;
  clarityProjectId: string;
  lastUpdated: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"overview" | "heatmap" | "dwell" | "cms">("overview");

  const fetchData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to load admin stats", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Auto-refresh every 30s
    const timer = setInterval(() => fetchData(), 30000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  // Format seconds to mm:ss
  const formatDuration = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  // Filter clicks by route
  const filteredClicks = useMemo(() => {
    if (!data?.clicks) return [];
    if (selectedRoute === "all") return data.clicks;
    return data.clicks.filter((c) => c.path === selectedRoute || (selectedRoute === "/" && c.path === ""));
  }, [data, selectedRoute]);

  // Unique route list
  const availableRoutes = useMemo(() => {
    if (!data?.pageViews) return [];
    return Object.keys(data.pageViews);
  }, [data]);

  // Top page
  const topPage = useMemo(() => {
    if (!data?.pageViews) return "/";
    let maxViews = -1;
    let maxPath = "/";
    for (const [path, views] of Object.entries(data.pageViews)) {
      if (views > maxViews) {
        maxViews = views;
        maxPath = path;
      }
    }
    return maxPath;
  }, [data]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#05070e] text-slate-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
          <p className="text-xs text-slate-400">Loading Cascade Analytics Console...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070e] text-slate-100 pb-16">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-cyan-500/20 bg-[#070b16]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-20 h-16 rounded-full bg-cyan-400/25 blur-lg pointer-events-none -z-10 group-hover:scale-125 transition-all" />
                <Image
                  src="/cascade-logo.png"
                  alt="Cascade Logo"
                  width={68}
                  height={55}
                  className="h-12 sm:h-14 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition group-hover:scale-105"
                />
              </div>
              <div>
                <span className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition leading-tight">
                  CascadeTech Solutions
                </span>
                <span className="block text-[10px] sm:text-xs text-cyan-400 font-mono tracking-wider">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400 ml-3">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Self-Hosted Live Storage
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => fetchData(true)}
              disabled={refreshing}
              title="Refresh Analytics"
              className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin text-cyan-400" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-3">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "overview"
                ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            Overview & Telemetry
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "heatmap"
                ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Flame className="h-4 w-4" />
            Interactive Heatmaps
          </button>
          <button
            onClick={() => setActiveTab("dwell")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "dwell"
                ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Clock className="h-4 w-4" />
            Section Dwell Times
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition ${
              activeTab === "cms"
                ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-900"
            }`}
          >
            <Layers className="h-4 w-4" />
            Website CMS
          </button>
        </div>

        {/* SECTION: Overview & Telemetry */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Views */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1d]/80 p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium uppercase tracking-wider">Total Views</span>
                  <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-400">
                    <Eye className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-bold text-white">
                  {data?.totalViews.toLocaleString() || 0}
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Across all localized & product pages
                </p>
              </div>

              {/* Unique Visitors */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1d]/80 p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium uppercase tracking-wider">Unique Visitors</span>
                  <div className="rounded-lg bg-blue-500/10 p-2 text-blue-400">
                    <Users className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-bold text-white">
                  {data?.uniqueVisitorsCount.toLocaleString() || 0}
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  DPDP 2023 hashed privacy identifiers
                </p>
              </div>

              {/* Avg Time on Site */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1d]/80 p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium uppercase tracking-wider">Avg Time on Site</span>
                  <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-2xl font-bold text-white">
                  {formatDuration(data?.siteAvgDwellSeconds || 0)}
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  Active in-tab engagement time
                </p>
              </div>

              {/* Top Route */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#0a0f1d]/80 p-5 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-medium uppercase tracking-wider">Top Visited</span>
                  <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
                    <Compass className="h-4 w-4" />
                  </div>
                </div>
                <div className="mt-3 text-xl font-bold text-white truncate" title={topPage}>
                  {topPage}
                </div>
                <p className="mt-1 text-[11px] text-slate-400">
                  {data?.pageViews[topPage] || 0} recorded hits
                </p>
              </div>
            </div>

            {/* Microsoft Clarity Verified Card */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-[#0a1224] to-[#070b16] p-6 shadow-2xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 text-xs font-semibold text-cyan-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                      Microsoft Clarity Active
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Project ID: <span className="text-white font-semibold">{data?.clarityProjectId || "ze4cuerold"}</span>
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-white">
                    Official Microsoft Clarity Telemetry Hub
                  </h2>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Live telemetry is streaming to Microsoft Clarity. View full session replays, 
                    device-level heatmaps, dead-click analysis, and funnel drop-offs on the Clarity portal.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <a
                    href={`https://clarity.microsoft.com/projects/view/${data?.clarityProjectId || "ze4cuerold"}/dashboard`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition"
                  >
                    <span>Clarity Dashboard</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`https://clarity.microsoft.com/projects/view/${data?.clarityProjectId || "ze4cuerold"}/heatmaps`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition"
                  >
                    <span>Clarity Heatmaps</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`https://clarity.microsoft.com/projects/view/${data?.clarityProjectId || "ze4cuerold"}/recordings`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 hover:text-white transition"
                  >
                    <span>Session Recordings</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll Milestones & Page Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scroll Depth Milestones */}
              <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="h-4 w-4 text-cyan-400" />
                    Scroll Depth Reach
                  </h3>
                  <span className="text-[11px] text-slate-400">Milestone distribution</span>
                </div>
                <div className="mt-5 space-y-4">
                  {[
                    { label: "25% Page Depth", key: "25", color: "from-cyan-500 to-cyan-400" },
                    { label: "50% Mid-page", key: "50", color: "from-blue-500 to-cyan-500" },
                    { label: "75% Deep Reading", key: "75", color: "from-indigo-500 to-blue-500" },
                    { label: "100% Full Footer Reach", key: "100", color: "from-emerald-500 to-teal-400" },
                  ].map((m) => {
                    const count = data?.scrollMilestones[m.key as keyof typeof data.scrollMilestones] || 0;
                    const max = Math.max(1, data?.totalViews || 1);
                    const pct = Math.min(100, Math.round((count / max) * 100));
                    return (
                      <div key={m.key} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-medium">{m.label}</span>
                          <span className="text-slate-400">{count} visitors ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-500`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Page Views Breakdown */}
              <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-cyan-400" />
                    Page Traffic & Views
                  </h3>
                  <span className="text-[11px] text-slate-400">By URL pathname</span>
                </div>
                <div className="mt-5 max-h-56 overflow-y-auto space-y-2.5 pr-1">
                  {Object.entries(data?.pageViews || {}).length === 0 ? (
                    <p className="text-xs text-slate-500 py-6 text-center">No route visits recorded yet.</p>
                  ) : (
                    Object.entries(data?.pageViews || {})
                      .sort((a, b) => b[1] - a[1])
                      .map(([route, count]) => (
                        <div
                          key={route}
                          className="flex items-center justify-between rounded-xl bg-slate-900/60 border border-slate-800/80 px-3.5 py-2.5 text-xs"
                        >
                          <span className="font-mono text-cyan-300 truncate max-w-xs">{route}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-medium">{count} views</span>
                            <span className="text-[11px] text-slate-500">
                              avg {formatDuration(data?.pageAverages[route]?.avgSeconds || 0)}
                            </span>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Interactive Heatmaps */}
        {activeTab === "heatmap" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="h-5 w-5 text-amber-400" />
                  Self-Hosted Click Density Heatmap
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Visual overlay representing exact relative coordinates where visitors clicked
                </p>
              </div>

              {/* Route filter selector */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-400 font-medium">Filter Route:</label>
                <select
                  value={selectedRoute}
                  onChange={(e) => setSelectedRoute(e.target.value)}
                  className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="all">All Pages ({data?.clicks.length || 0} clicks)</option>
                  {availableRoutes.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Wireframe Canvas with Click Heatmap Points */}
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#03060f] p-6 shadow-2xl">
              <div className="text-xs text-slate-400 mb-4 flex items-center justify-between">
                <span>Viewport Wireframe Scale (Normalized Height)</span>
                <span className="font-semibold text-cyan-400">
                  {filteredClicks.length} Clicks Displayed
                </span>
              </div>

              {/* Canvas Representation */}
              <div className="relative mx-auto w-full max-w-4xl h-[520px] rounded-xl border border-slate-800 bg-slate-950/80 overflow-hidden shadow-inner">
                {/* Structural page wireframe guides */}
                <div className="absolute top-0 inset-x-0 h-10 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between px-4 text-[10px] text-slate-500">
                  <span>Navigation Header</span>
                  <span>Menu / Language</span>
                </div>
                <div className="absolute top-12 inset-x-8 h-28 rounded-lg border border-dashed border-slate-800/60 bg-slate-900/20 flex items-center justify-center text-[10px] text-slate-600">
                  Hero Section / Primary Call to Action
                </div>
                <div className="absolute top-44 inset-x-8 h-32 rounded-lg border border-dashed border-slate-800/60 bg-slate-900/20 flex items-center justify-center text-[10px] text-slate-600">
                  Flagship Products: Educore ERP & Nestora Hub
                </div>
                <div className="absolute top-80 inset-x-8 h-28 rounded-lg border border-dashed border-slate-800/60 bg-slate-900/20 flex items-center justify-center text-[10px] text-slate-600">
                  Services, Credibility Stats & Selected Work
                </div>
                <div className="absolute bottom-0 inset-x-0 h-14 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between px-4 text-[10px] text-slate-500">
                  <span>Footer Contact & Privacy</span>
                  <span>Copyright 2026</span>
                </div>

                {/* Heatmap Click Dots */}
                {filteredClicks.map((click, idx) => (
                  <div
                    key={idx}
                    title={`Click at (${click.x}%, ${click.y}%) on <${click.tag || "elem"}>`}
                    className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${click.x}%`, top: `${click.y}%` }}
                  >
                    {/* Glowing Heat Dot */}
                    <div className="h-4 w-4 rounded-full bg-cyan-400/80 shadow-[0_0_12px_rgba(0,242,254,0.9)] animate-pulse transition-transform group-hover:scale-150" />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center rounded-lg bg-slate-900 border border-cyan-500/40 px-2 py-1 text-[10px] text-white shadow-xl whitespace-nowrap z-30">
                      <span>Tag: &lt;{click.tag || "element"}&gt;</span>
                      <span className="text-cyan-400">({click.x}%, {click.y}%)</span>
                    </div>
                  </div>
                ))}

                {filteredClicks.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
                    No clicks recorded for this route yet.
                  </div>
                )}
              </div>

              {/* Heatmap Legend */}
              <div className="mt-5 flex items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,242,254,0.8)]" />
                  Primary Interaction Point
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-blue-500" />
                  Secondary Navigation
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  Footer & Form Interaction
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Section Dwell Times */}
        {activeTab === "dwell" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#0a0f1d]/80 p-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="h-5 w-5 text-emerald-400" />
                    Section Dwell Time Analysis
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Exact seconds visitors spend actively engaged on key page sections
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-400">
                  IntersectionObserver Active
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {Object.entries(data?.sectionAverages || {}).length === 0 ? (
                  <p className="text-xs text-slate-500 py-8 text-center">
                    No section engagement registered yet. Dwell times will populate as visitors scroll through the site.
                  </p>
                ) : (
                  Object.entries(data?.sectionAverages || {})
                    .sort((a, b) => b[1].avgSeconds - a[1].avgSeconds)
                    .map(([sectionId, stats]) => {
                      const maxSec = Math.max(
                        1,
                        ...Object.values(data?.sectionAverages || {}).map((s) => s.avgSeconds)
                      );
                      const widthPct = Math.min(100, Math.round((stats.avgSeconds / maxSec) * 100));
                      return (
                        <div
                          key={sectionId}
                          className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-white capitalize">
                              Section: <span className="text-cyan-400">{sectionId}</span>
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                                Avg {formatDuration(stats.avgSeconds)}
                              </span>
                              <span className="text-slate-400 text-[11px]">
                                {stats.views} sessions recorded
                              </span>
                            </div>
                          </div>
                          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                              style={{ width: `${widthPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            </div>
          </div>
        )}

        {/* SECTION: Website CMS */}
        {activeTab === "cms" && <CmsEditor />}
      </main>
    </div>
  );
}
