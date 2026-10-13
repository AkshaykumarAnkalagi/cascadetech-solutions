import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
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
  projectId !== "undefined";

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn,
    })
  : null;

const builder = isSanityConfigured && sanityClient ? imageUrlBuilder(sanityClient) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!builder || !source) return null;
  return builder.image(source);
}

// Fetch Services with graceful fallback
export async function getServices(): Promise<ServiceItem[]> {
  if (!isSanityConfigured || !sanityClient) {
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
    const result = await sanityClient.fetch<ServiceItem[]>(query);
    return result && result.length > 0 ? result : SERVICES;
  } catch (error) {
    console.warn("Falling back to local services data:", error);
    return SERVICES;
  }
}

// Fetch Projects with graceful fallback
export async function getProjects(): Promise<ProjectItem[]> {
  if (!isSanityConfigured || !sanityClient) {
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
    const result = await sanityClient.fetch<ProjectItem[]>(query);
    return result && result.length > 0 ? result : PROJECTS;
  } catch (error) {
    console.warn("Falling back to local projects data:", error);
    return PROJECTS;
  }
}

// Fetch Stats with graceful fallback
export async function getStats(): Promise<StatItem[]> {
  if (!isSanityConfigured || !sanityClient) {
    return STATS;
  }
  try {
    const query = `*[_type == "stat"] | order(order asc) {
      "id": _id,
      value,
      label,
      description
    }`;
    const result = await sanityClient.fetch<StatItem[]>(query);
    return result && result.length > 0 ? result : STATS;
  } catch (error) {
    console.warn("Falling back to local stats data:", error);
    return STATS;
  }
}

// Fetch Site Settings with graceful fallback
export async function getSiteSettings() {
  if (!isSanityConfigured || !sanityClient) {
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
    const result = await sanityClient.fetch(query);
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
