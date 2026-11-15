"use client";

import { useEffect } from "react";
import { getConsentPreferences } from "@/lib/cookies";

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

export const CLARITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "ze4cuerold";

export default function ClarityScript() {
  useEffect(() => {
    const applyConsent = (allowed: boolean) => {
      if (typeof window !== "undefined" && typeof window.clarity === "function") {
        window.clarity("consent", allowed);
      }
    };

    const prefs = getConsentPreferences();
    if (prefs) {
      applyConsent(Boolean(prefs.analytics));
    }

    const handleConsentChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      applyConsent(Boolean(customEvent.detail?.analytics));
    };

    window.addEventListener("cascade-consent-change", handleConsentChange);
    return () => {
      window.removeEventListener("cascade-consent-change", handleConsentChange);
    };
  }, []);

  return null;
}
