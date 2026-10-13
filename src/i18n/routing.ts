import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Supported languages: English + 8 major Indian languages
  locales: ["en", "hi", "kn", "te", "ta", "ml", "mr", "bn", "gu"],
  defaultLocale: "en",
  localePrefix: "always",
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const LOCALE_METADATA: Record<
  string,
  { name: string; nativeName: string; script: string; direction: "ltr" }
> = {
  en: { name: "English", nativeName: "English", script: "Latin", direction: "ltr" },
  hi: { name: "Hindi", nativeName: "हिन्दी", script: "Devanagari", direction: "ltr" },
  kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", script: "Kannada", direction: "ltr" },
  te: { name: "Telugu", nativeName: "తెలుగు", script: "Telugu", direction: "ltr" },
  ta: { name: "Tamil", nativeName: "தமிழ்", script: "Tamil", direction: "ltr" },
  ml: { name: "Malayalam", nativeName: "മലയാളം", script: "Malayalam", direction: "ltr" },
  mr: { name: "Marathi", nativeName: "मराठी", script: "Devanagari", direction: "ltr" },
  bn: { name: "Bengali", nativeName: "বাংলা", script: "Bengali", direction: "ltr" },
  gu: { name: "Gujarati", nativeName: "ગુજરાતી", script: "Gujarati", direction: "ltr" },
};
