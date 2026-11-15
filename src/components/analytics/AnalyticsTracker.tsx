"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getConsentPreferences } from "@/lib/cookies";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const consentAllowedRef = useRef(false);
  const clickBatchRef = useRef<Array<{ x: number; y: number; tag: string }>>([]);
  const maxScrollRef = useRef<number>(0);
  const pageStartTimeRef = useRef<number>(Date.now());
  const activeSectionRef = useRef<string | null>(null);
  const sectionDwellsRef = useRef<Record<string, number>>({});
  const lastSectionTickRef = useRef<number>(Date.now());

  // Check consent state
  useEffect(() => {
    const prefs = getConsentPreferences();
    consentAllowedRef.current = Boolean(prefs?.analytics);

    const handleConsent = (e: Event) => {
      const customEvent = e as CustomEvent;
      consentAllowedRef.current = Boolean(customEvent.detail?.analytics);
    };

    window.addEventListener("cascade-consent-change", handleConsent);
    return () => {
      window.removeEventListener("cascade-consent-change", handleConsent);
    };
  }, []);

  // Flush function to dispatch telemetry batch to backend
  const flushTelemetry = (isPageExit = false) => {
    if (!consentAllowedRef.current) return;

    const now = Date.now();
    // Flush current active section dwell
    if (activeSectionRef.current && document.visibilityState === "visible") {
      const elapsed = Math.round((now - lastSectionTickRef.current) / 1000);
      if (elapsed > 0 && elapsed < 600) {
        sectionDwellsRef.current[activeSectionRef.current] =
          (sectionDwellsRef.current[activeSectionRef.current] || 0) + elapsed;
      }
    }
    lastSectionTickRef.current = now;

    const pageDwellSeconds = Math.round((now - pageStartTimeRef.current) / 1000);
    const clicksToSend = [...clickBatchRef.current];
    const sectionDwellsToSend = { ...sectionDwellsRef.current };
    const maxScroll = maxScrollRef.current;

    // Reset accumulators
    clickBatchRef.current = [];
    sectionDwellsRef.current = {};
    if (isPageExit) {
      pageStartTimeRef.current = now;
      maxScrollRef.current = 0;
    }

    // Skip sending empty ping if dwell is 0 and no clicks/scroll
    if (
      pageDwellSeconds <= 0 &&
      clicksToSend.length === 0 &&
      Object.keys(sectionDwellsToSend).length === 0
    ) {
      return;
    }

    const payload = JSON.stringify({
      path: pathname || "/",
      pageDwellSeconds,
      sectionDwells: sectionDwellsToSend,
      scrollMaxPercent: maxScroll,
      clicks: clicksToSend,
    });

    try {
      if (typeof navigator !== "undefined" && navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/track", blob);
      } else {
        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore network errors on unload
    }
  };

  // Track route changes
  useEffect(() => {
    pageStartTimeRef.current = Date.now();
    lastSectionTickRef.current = Date.now();
    maxScrollRef.current = 0;
    clickBatchRef.current = [];
    sectionDwellsRef.current = {};

    return () => {
      flushTelemetry(true);
    };
  }, [pathname]);

  // Track clicks, scroll milestones, section visibility, and timer loops
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Click Listener (relative coordinates)
    const handleClick = (e: MouseEvent) => {
      if (!consentAllowedRef.current) return;

      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight
      );
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = ((e.clientY + scrollY) / docHeight) * 100;

      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase() || "unknown";

      clickBatchRef.current.push({
        x: Math.max(0, Math.min(100, xPercent)),
        y: Math.max(0, Math.min(100, yPercent)),
        tag,
      });
    };

    // 2. Scroll Listener
    const handleScroll = () => {
      if (!consentAllowedRef.current) return;
      const scrollTop = window.scrollY || window.pageYOffset || 0;
      const winHeight = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const totalScrollable = docHeight - winHeight;

      if (totalScrollable > 0) {
        const pct = Math.round((scrollTop / totalScrollable) * 100);
        if (pct > maxScrollRef.current) {
          maxScrollRef.current = pct;
        }
      }
    };

    // 3. Section Intersection Observer
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        if (!consentAllowedRef.current) return;
        const now = Date.now();

        // Accumulate dwell on previously active section
        if (activeSectionRef.current && document.visibilityState === "visible") {
          const elapsed = Math.round((now - lastSectionTickRef.current) / 1000);
          if (elapsed > 0 && elapsed < 600) {
            sectionDwellsRef.current[activeSectionRef.current] =
              (sectionDwellsRef.current[activeSectionRef.current] || 0) + elapsed;
          }
        }
        lastSectionTickRef.current = now;

        // Find the most visible intersecting section
        const intersecting = entries.filter((entry) => entry.isIntersecting);
        if (intersecting.length > 0) {
          // Sort by intersectionRatio
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topEntry = intersecting[0];
          activeSectionRef.current =
            topEntry.target.getAttribute("id") ||
            topEntry.target.getAttribute("data-section") ||
            topEntry.target.tagName.toLowerCase();
        }
      },
      { threshold: [0.2, 0.5, 0.8] }
    );

    // Observe all sections and key article/main containers
    const sections = document.querySelectorAll("section[id], section, main > div[id]");
    sections.forEach((sec) => sectionObserver.observe(sec));

    // 4. Periodic Flush Loop (every 20s)
    const interval = setInterval(() => {
      flushTelemetry(false);
    }, 20000);

    // 5. Unload / Visibilitychange Flush
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushTelemetry(false);
      } else {
        lastSectionTickRef.current = Date.now();
      }
    };

    const handleBeforeUnload = () => {
      flushTelemetry(true);
    };

    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      sectionObserver.disconnect();
    };
  }, []);

  return null;
}
