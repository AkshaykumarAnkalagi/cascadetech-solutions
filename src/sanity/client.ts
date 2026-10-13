import { apiVersion, dataset, projectId, useCdn } from "./env";
import {
  SITE_INFO,
  STATS,
  PROJECTS,
  SERVICES,
  type StatItem,
  type ProjectItem,
  type ServiceItem,
} from "@/data/siteData";

export const isSanityConfigured =
  Boolean(projectId) &&
  projectId !== "your-project-id" &&
  projectId !== "undefined" &&
  projectId.trim().length > 3;

/**
 * Perform a clean, zero-dependency Sanity API query using native fetch
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!isSanityConfigured) return null;

  try {
    const host = useCdn ? `${projectId}.apicdn.sanity.io` : `${projectId}.api.sanity.io`;
    const url = `https://${host}/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.warn(`Sanity API query returned status ${res.status}`);
      return null;
    }

    const data = await res.json();
    return data.result as T;
  } catch (err) {
    console.warn("Sanity fetch error:", err);
    return null;
  }
}

// Lightweight image URL builder
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any): string | null {
  if (!source || !isSanityConfigured) return null;
  if (typeof source === "string") return source;
  if (source.asset && source.asset._ref) {
    // format: image-5b8c...-1200x800-jpg
    const ref = source.asset._ref as string;
    const parts = ref.split("-");
    if (parts.length >= 4) {
      const id = parts[1];
      const dimensions = parts[2];
      const ext = parts[3];
      return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}`;
    }
  }
  return null;
}

// Fetch Services with graceful fallback
export async function getServices(): Promise<ServiceItem[]> {
  const query = `*[_type == "service"] | order(order asc) {
    "id": slug.current,
    "slug": slug.current,
    title,
    shortDescription,
    fullDescription,
    iconName,
    benefits,
    deliverables,
    techStack
  }`;

  const result = await sanityFetch<ServiceItem[]>(query);
  return result && result.length > 0 ? result : SERVICES;
}

// Fetch Projects with graceful fallback
export async function getProjects(): Promise<ProjectItem[]> {
  const query = `*[_type == "project"] {
    "id": slug.current,
    "slug": slug.current,
    title,
    category,
    tagline,
    shortDescription,
    fullDescription,
    status,
    featured,
    accentColor,
    keyFeatures,
    techStack,
    metrics,
    link
  }`;

  const result = await sanityFetch<ProjectItem[]>(query);
  return result && result.length > 0 ? result : PROJECTS;
}

// Fetch Stats with graceful fallback
export async function getStats(): Promise<StatItem[]> {
  const query = `*[_type == "stat"] | order(order asc) {
    "id": _id,
    value,
    label,
    description
  }`;

  const result = await sanityFetch<StatItem[]>(query);
  return result && result.length > 0 ? result : STATS;
}

// Fetch Site Settings with graceful fallback
export async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0] {
    companyName,
    tagline,
    email,
    phone,
    location,
    navigation,
    seo
  }`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await sanityFetch<any>(query);
  if (!result) return SITE_INFO;

  return {
    ...SITE_INFO,
    name: result.companyName || SITE_INFO.name,
    tagline: result.tagline || SITE_INFO.tagline,
    email: result.email || SITE_INFO.email,
    phone: result.phone || SITE_INFO.phone,
    address: result.location || SITE_INFO.address,
  };
}
