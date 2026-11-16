import fs from "fs";
import path from "path";
import { WebsiteCmsData, INITIAL_CMS_DATA } from "./cmsTypes";

export * from "./cmsTypes";

// In-memory buffer for microsecond responses
let memoryCms: WebsiteCmsData = { ...INITIAL_CMS_DATA };
let isCmsLoaded = false;

function getCmsStoragePath(): string {
  if (process.env.CMS_DATA_PATH) {
    return process.env.CMS_DATA_PATH;
  }
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "cascade-cms-content.json");
  }
  const dir = path.join(process.cwd(), ".cms-data");
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      return path.join("/tmp", "cascade-cms-content.json");
    }
  }
  return path.join(dir, "content.json");
}

export function getCmsContent(): WebsiteCmsData {
  if (isCmsLoaded) return memoryCms;

  const filePath = getCmsStoragePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      memoryCms = {
        siteInfo: parsed.siteInfo || INITIAL_CMS_DATA.siteInfo,
        hero: parsed.hero || INITIAL_CMS_DATA.hero,
        stats: Array.isArray(parsed.stats) ? parsed.stats : INITIAL_CMS_DATA.stats,
        projects: Array.isArray(parsed.projects) ? parsed.projects : INITIAL_CMS_DATA.projects,
        services: Array.isArray(parsed.services) ? parsed.services : INITIAL_CMS_DATA.services,
        faqs: Array.isArray(parsed.faqs) ? parsed.faqs : INITIAL_CMS_DATA.faqs,
        testimonials: Array.isArray(parsed.testimonials)
          ? parsed.testimonials
          : INITIAL_CMS_DATA.testimonials,
        media: parsed.media || INITIAL_CMS_DATA.media,
        lastUpdated: parsed.lastUpdated || Date.now(),
      };
    } else {
      memoryCms = { ...INITIAL_CMS_DATA };
      persistCms(memoryCms);
    }
  } catch (err) {
    console.warn("[CmsStore] Error loading, using memory defaults:", err);
    memoryCms = { ...INITIAL_CMS_DATA };
  }

  isCmsLoaded = true;
  return memoryCms;
}

export function saveCmsContent(updated: Partial<WebsiteCmsData>): WebsiteCmsData {
  const current = getCmsContent();
  const merged: WebsiteCmsData = {
    siteInfo: updated.siteInfo ? { ...current.siteInfo, ...updated.siteInfo } : current.siteInfo,
    hero: updated.hero ? { ...current.hero, ...updated.hero } : current.hero,
    stats: Array.isArray(updated.stats) ? updated.stats : current.stats,
    projects: Array.isArray(updated.projects) ? updated.projects : current.projects,
    services: Array.isArray(updated.services) ? updated.services : current.services,
    faqs: Array.isArray(updated.faqs) ? updated.faqs : current.faqs,
    testimonials: Array.isArray(updated.testimonials) ? updated.testimonials : current.testimonials,
    media: updated.media ? { ...current.media, ...updated.media } : current.media,
    lastUpdated: Date.now(),
  };

  memoryCms = merged;
  persistCms(merged);
  return merged;
}

function persistCms(data: WebsiteCmsData): void {
  const filePath = getCmsStoragePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[CmsStore] Failed to write to disk, holding in memory buffer:", err);
  }
}
