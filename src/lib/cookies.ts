export interface CookiePreferences {
  necessary: boolean; // Always true
  analytics: boolean; // Enables Heatmaps, Clarity, and visitor metrics
  performance: boolean; // Enables telemetry for performance/vitals
  timestamp: number;
  version: string;
}

export const COOKIE_CONSENT_NAME = "cascade_cookie_consent";
export const CURRENT_CONSENT_VERSION = "1.0.0";

export const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  performance: false,
  timestamp: 0,
  version: CURRENT_CONSENT_VERSION,
};

/**
 * Reads cookie value on client side
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Sets a cookie on client side with secure attributes
 */
export function setCookie(name: string, value: string, days = 365): void {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

/**
 * Gets the current cookie consent preferences
 */
export function getConsentPreferences(): CookiePreferences | null {
  const cookieVal = getCookie(COOKIE_CONSENT_NAME);
  if (!cookieVal) return null;
  try {
    const parsed = JSON.parse(cookieVal);
    if (parsed && typeof parsed.necessary === "boolean") {
      return parsed as CookiePreferences;
    }
  } catch {
    // Malformed cookie
  }
  return null;
}

/**
 * Saves consent preferences to cookie and dispatches a DOM event
 */
export function saveConsentPreferences(prefs: Partial<CookiePreferences>): CookiePreferences {
  const completePrefs: CookiePreferences = {
    necessary: true,
    analytics: Boolean(prefs.analytics),
    performance: Boolean(prefs.performance),
    timestamp: Date.now(),
    version: CURRENT_CONSENT_VERSION,
  };

  setCookie(COOKIE_CONSENT_NAME, JSON.stringify(completePrefs), 365);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("cascade-consent-change", { detail: completePrefs })
    );
  }

  return completePrefs;
}

/**
 * Checks if user has already made a consent choice
 */
export function hasConsentDecision(): boolean {
  return getConsentPreferences() !== null;
}
