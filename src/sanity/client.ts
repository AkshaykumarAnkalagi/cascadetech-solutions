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
  projectId.length > 3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _sanityClient: any = null;

export function getSanityClient() {
  if (!isSanityConfigured) return null;
  if (!_sanityClient) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createClient } = require("next-sanity");
      _sanityClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn,
      });
    } catch {
      _sanityClient = null;
    }
  }
  return _sanityClient;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  const client = getSanityClient();
  if (!client || !source) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const imageUrlBuilder = require("@sanity/image-url");
    const builder = imageUrlBuilder(client);
    return builder.image(source);
  } catch {
    return null;
  }
}

// Fetch Services with graceful fallback
export async function getServices(): Promise<ServiceItem[]> {
  const client = getSanityClient();
  if (!client) {
    return SERVICES;
  }
  try {
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
    const result = await client.fetch(query);
    return result && result.length > 0 ? result : SERVICES;
  } catch (error) {
    console.warn("Falling back to local services data:", error);
    return SERVICES;
  }
}

// Fetch Projects with graceful fallback
export async function getProjects(): Promise<ProjectItem[]> {
  const client = getSanityClient();
  if (!client) {
    return PROJECTS;
  }
  try {
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
    const result = await client.fetch(query);
    return result && result.length > 0 ? result : PROJECTS;
  } catch (error) {
    console.warn("Falling back to local projects data:", error);
    return PROJECTS;
  }
}

// Fetch Stats with graceful fallback
export async function getStats(): Promise<StatItem[]> {
  const client = getSanityClient();
  if (!client) {
    return STATS;
  }
  try {
    const query = `*[_type == "stat"] | order(order asc) {
      "id": _id,
      value,
      label,
      description
    }`;
    const result = await client.fetch(query);
    return result && result.length > 0 ? result : STATS;
  } catch (error) {
    console.warn("Falling back to local stats data:", error);
    return STATS;
  }
}

// Fetch Site Settings with graceful fallback
export async function getSiteSettings() {
  const client = getSanityClient();
  if (!client) {
    return SITE_INFO;
  }
  try {
    const query = `*[_type == "siteSettings"][0] {
      companyName,
      tagline,
      email,
      phone,
      location,
      navigation,
      seo
    }`;
    const result = await client.fetch(query);
    if (!result) return SITE_INFO;
    return {
      ...SITE_INFO,
      name: result.companyName || SITE_INFO.name,
      tagline: result.tagline || SITE_INFO.tagline,
      email: result.email || SITE_INFO.email,
      phone: result.phone || SITE_INFO.phone,
      address: result.location || SITE_INFO.address,
    };
  } catch (error) {
    console.warn("Falling back to local site info:", error);
    return SITE_INFO;
  }
}
