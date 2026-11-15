import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface ClickPoint {
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  path: string;
  tag?: string;
  timestamp: number;
}

export interface SectionDwellData {
  totalSeconds: number;
  count: number;
}

export interface PageDwellData {
  totalSeconds: number;
  count: number;
}

export interface AnalyticsRecord {
  totalViews: number;
  uniqueVisitors: string[]; // List of hashed visitor IDs
  pageViews: Record<string, number>;
  pageDwellTimes: Record<string, PageDwellData>;
  sectionDwellTimes: Record<string, SectionDwellData>;
  scrollMilestones: {
    "25": number;
    "50": number;
    "75": number;
    "100": number;
  };
  clicks: ClickPoint[];
  lastUpdated: number;
}

const DEFAULT_STORE: AnalyticsRecord = {
  totalViews: 0,
  uniqueVisitors: [],
  pageViews: {},
  pageDwellTimes: {},
  sectionDwellTimes: {},
  scrollMilestones: {
    "25": 0,
    "50": 0,
    "75": 0,
    "100": 0,
  },
  clicks: [],
  lastUpdated: Date.now(),
};

// In-memory buffer for high-throughput speed
let memoryBuffer: AnalyticsRecord = { ...DEFAULT_STORE };
let isLoaded = false;

// Compute data storage path (uses .analytics-data in dev or /tmp in serverless when read-only)
function getStoragePath(): string {
  if (process.env.ANALYTICS_DATA_PATH) {
    return process.env.ANALYTICS_DATA_PATH;
  }
  // If running in Vercel or cloud container with read-only root, use /tmp
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join("/tmp", "cascade-analytics.json");
  }
  const dir = path.join(process.cwd(), ".analytics-data");
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      return path.join("/tmp", "cascade-analytics.json");
    }
  }
  return path.join(dir, "analytics.json");
}

/**
 * Loads analytics from hosted infrastructure storage
 */
function loadStore(): AnalyticsRecord {
  if (isLoaded) return memoryBuffer;

  const filePath = getStoragePath();
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(data);
      memoryBuffer = {
        totalViews: parsed.totalViews || 0,
        uniqueVisitors: Array.isArray(parsed.uniqueVisitors) ? parsed.uniqueVisitors : [],
        pageViews: parsed.pageViews || {},
        pageDwellTimes: parsed.pageDwellTimes || {},
        sectionDwellTimes: parsed.sectionDwellTimes || {},
        scrollMilestones: parsed.scrollMilestones || { "25": 0, "50": 0, "75": 0, "100": 0 },
        clicks: Array.isArray(parsed.clicks) ? parsed.clicks : [],
        lastUpdated: parsed.lastUpdated || Date.now(),
      };
    } else {
      memoryBuffer = { ...DEFAULT_STORE };
    }
  } catch (err) {
    console.warn("[AnalyticsStore] Fallback to in-memory store:", err);
    memoryBuffer = { ...DEFAULT_STORE };
  }

  isLoaded = true;
  return memoryBuffer;
}

/**
 * Persists memory buffer to hosted storage
 */
function persistStore(): void {
  const filePath = getStoragePath();
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(memoryBuffer, null, 2), "utf-8");
  } catch (err) {
    // Gracefully handle serverless disk write restrictions
    console.warn("[AnalyticsStore] Persist to disk failed, maintained in memory buffer:", err);
  }
}

/**
 * Hash visitor identifiers for privacy-preserving unique counting
 */
export function hashVisitor(ip: string, userAgent: string): string {
  return crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}-${new Date().toISOString().slice(0, 10)}`)
    .digest("hex")
    .slice(0, 16);
}

export interface IngestTelemetryPayload {
  visitorHash?: string;
  path: string;
  pageDwellSeconds?: number;
  sectionDwells?: Record<string, number>; // { [sectionId]: seconds }
  scrollMaxPercent?: number; // 25, 50, 75, 100
  clicks?: Array<{
    x: number; // 0 - 100%
    y: number; // 0 - 100%
    tag?: string;
  }>;
}

/**
 * Record a telemetry batch into the self-hosted store
 */
export function recordTelemetry(payload: IngestTelemetryPayload): void {
  const store = loadStore();

  store.totalViews += 1;
  const currentPath = payload.path || "/";
  store.pageViews[currentPath] = (store.pageViews[currentPath] || 0) + 1;

  if (payload.visitorHash) {
    if (!store.uniqueVisitors.includes(payload.visitorHash)) {
      store.uniqueVisitors.push(payload.visitorHash);
      // Keep only recent 5000 unique visitor hashes to prevent memory bloat
      if (store.uniqueVisitors.length > 5000) {
        store.uniqueVisitors.shift();
      }
    }
  }

  // Record page dwell time
  if (payload.pageDwellSeconds && payload.pageDwellSeconds > 0) {
    const existing = store.pageDwellTimes[currentPath] || { totalSeconds: 0, count: 0 };
    existing.totalSeconds += Math.min(payload.pageDwellSeconds, 3600); // capped at 1h max
    existing.count += 1;
    store.pageDwellTimes[currentPath] = existing;
  }

  // Record section dwell times
  if (payload.sectionDwells) {
    for (const [sectionId, seconds] of Object.entries(payload.sectionDwells)) {
      if (typeof seconds === "number" && seconds > 0) {
        const existing = store.sectionDwellTimes[sectionId] || { totalSeconds: 0, count: 0 };
        existing.totalSeconds += Math.min(seconds, 1800);
        existing.count += 1;
        store.sectionDwellTimes[sectionId] = existing;
      }
    }
  }

  // Record scroll milestone
  if (payload.scrollMaxPercent) {
    if (payload.scrollMaxPercent >= 100) store.scrollMilestones["100"] += 1;
    else if (payload.scrollMaxPercent >= 75) store.scrollMilestones["75"] += 1;
    else if (payload.scrollMaxPercent >= 50) store.scrollMilestones["50"] += 1;
    else if (payload.scrollMaxPercent >= 25) store.scrollMilestones["25"] += 1;
  }

  // Record heatmap click points
  if (Array.isArray(payload.clicks) && payload.clicks.length > 0) {
    for (const click of payload.clicks) {
      if (
        typeof click.x === "number" &&
        typeof click.y === "number" &&
        click.x >= 0 &&
        click.x <= 100 &&
        click.y >= 0 &&
        click.y <= 100
      ) {
        store.clicks.push({
          x: Math.round(click.x * 10) / 10,
          y: Math.round(click.y * 10) / 10,
          path: currentPath,
          tag: click.tag?.slice(0, 30),
          timestamp: Date.now(),
        });
      }
    }

    // Keep the most recent 1500 clicks
    if (store.clicks.length > 1500) {
      store.clicks = store.clicks.slice(-1500);
    }
  }

  store.lastUpdated = Date.now();
  persistStore();
}

/**
 * Returns formatted stats for the Admin Dashboard
 */
export function getAnalyticsSummary() {
  const store = loadStore();

  // Calculate average dwell times per section
  const sectionAverages: Record<string, { avgSeconds: number; views: number }> = {};
  for (const [sec, data] of Object.entries(store.sectionDwellTimes)) {
    sectionAverages[sec] = {
      avgSeconds: data.count > 0 ? Math.round(data.totalSeconds / data.count) : 0,
      views: data.count,
    };
  }

  // Calculate average dwell times per page
  const pageAverages: Record<string, { avgSeconds: number; views: number }> = {};
  for (const [pg, data] of Object.entries(store.pageDwellTimes)) {
    pageAverages[pg] = {
      avgSeconds: data.count > 0 ? Math.round(data.totalSeconds / data.count) : 0,
      views: data.count,
    };
  }

  // Compute overall average dwell
  let totalDwellSum = 0;
  let totalDwellCount = 0;
  for (const data of Object.values(store.pageDwellTimes)) {
    totalDwellSum += data.totalSeconds;
    totalDwellCount += data.count;
  }
  const siteAvgDwell =
    totalDwellCount > 0 ? Math.round(totalDwellSum / totalDwellCount) : 0;

  return {
    totalViews: store.totalViews,
    uniqueVisitorsCount: store.uniqueVisitors.length,
    pageViews: store.pageViews,
    siteAvgDwellSeconds: siteAvgDwell,
    pageAverages,
    sectionAverages,
    scrollMilestones: store.scrollMilestones,
    clicks: store.clicks,
    lastUpdated: store.lastUpdated,
  };
}
