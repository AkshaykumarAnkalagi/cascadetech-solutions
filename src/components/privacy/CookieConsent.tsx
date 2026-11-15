"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Cookie, Settings, Check, X } from "lucide-react";
import {
  CookiePreferences,
  getConsentPreferences,
  saveConsentPreferences,
} from "@/lib/cookies";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [performanceAllowed, setPerformanceAllowed] = useState(true);

  useEffect(() => {
    setMounted(true);
    const existing = getConsentPreferences();
    if (!existing) {
      // Delay slightly for smooth entrance
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || !isVisible) return null;

  const handleAcceptAll = () => {
    saveConsentPreferences({ analytics: true, performance: true });
    setIsVisible(false);
    setShowModal(false);
  };

  const handleEssentialOnly = () => {
    saveConsentPreferences({ analytics: false, performance: false });
    setIsVisible(false);
    setShowModal(false);
  };

  const handleSaveCustom = () => {
    saveConsentPreferences({
      analytics: analyticsAllowed,
      performance: performanceAllowed,
    });
    setIsVisible(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      <AnimatePresence>
        {!showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-xl z-50 pointer-events-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-[#0a0f1d]/95 p-5 md:p-6 shadow-2xl backdrop-blur-xl text-slate-100">
              {/* Background ambient gradient */}
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />
              
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold tracking-wide text-white">
                      Privacy & Cookie Consent
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-medium text-cyan-300">
                      <ShieldCheck className="h-3 w-3" /> DPDP 2023 Compliant
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-300">
                    We use strictly necessary cookies to ensure security and optional analytics & heatmaps 
                    (including Microsoft Clarity) to understand how you interact with our platform and improve our solutions.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5" />
                  Customize
                </button>
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="rounded-lg border border-slate-700/80 bg-slate-800/50 px-3.5 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700/60 hover:text-white transition-colors"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all duration-200"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-2xl border border-cyan-500/30 bg-[#0a0f1d] p-6 shadow-2xl text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      Cookie & Telemetry Preferences
                    </h3>
                    <p className="text-xs text-slate-400">
                      Manage how we collect usage and performance information
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="my-5 space-y-4">
                {/* Strictly Necessary */}
                <div className="flex items-start justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                  <div className="space-y-0.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        Strictly Necessary
                      </span>
                      <span className="rounded bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400 border border-cyan-500/20">
                        Required
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Essential for security, session authenticity, and basic navigation. Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex h-6 w-11 items-center rounded-full bg-cyan-500/30 px-1 cursor-not-allowed">
                    <div className="h-4 w-4 rounded-full bg-cyan-400 transform translate-x-5" />
                  </div>
                </div>

                {/* Analytics & Heatmaps */}
                <div className="flex items-start justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                  <div className="space-y-0.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        Analytics & Heatmaps
                      </span>
                      <span className="rounded bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-medium text-blue-400 border border-blue-500/20">
                        Microsoft Clarity
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Captures aggregated scroll depth, click heatmaps, and dwell times to help us optimize page layout and user experience.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnalyticsAllowed(!analyticsAllowed)}
                    className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                      analyticsAllowed ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        analyticsAllowed ? "transform translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Performance & Vitals */}
                <div className="flex items-start justify-between rounded-xl bg-slate-900/60 border border-slate-800 p-3.5">
                  <div className="space-y-0.5 pr-4">
                    <span className="text-xs font-semibold text-white">
                      Performance & Web Vitals
                    </span>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Monitors page load latency, asset bottlenecks, and UI responsiveness.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPerformanceAllowed(!performanceAllowed)}
                    className={`flex h-6 w-11 items-center rounded-full px-1 transition-colors ${
                      performanceAllowed ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white transition-transform ${
                        performanceAllowed ? "transform translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal footer */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="rounded-lg border border-slate-700 bg-slate-800/60 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition"
                >
                  Reject Optional
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition"
                >
                  <Check className="h-3.5 w-3.5" />
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
