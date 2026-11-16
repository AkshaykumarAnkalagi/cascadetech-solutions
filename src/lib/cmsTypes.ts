import {
  SITE_INFO as DEFAULT_SITE_INFO,
  STATS as DEFAULT_STATS,
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  FAQS as DEFAULT_FAQS,
  StatItem,
  ProjectItem,
  ServiceItem,
} from "@/data/siteData";

export interface SiteInfo {
  name: string;
  legalName?: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface HeroContent {
  eyebrow: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface MediaSettings {
  logoUrl: string;
  faviconUrl: string;
  ogImageUrl: string;
}

export interface WebsiteCmsData {
  siteInfo: SiteInfo;
  hero: HeroContent;
  stats: StatItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  faqs: FaqItem[];
  testimonials: TestimonialItem[];
  media: MediaSettings;
  lastUpdated: number;
}

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "test-1",
    author: "Dr. Arvind Rao",
    role: "Trustee & Secretary",
    company: "Apex Educational Foundation",
    quote:
      "Educore ERP transformed our institutional operations with complete DPDP 2023 compliance, automated fee ledgers, and zero system downtime.",
    rating: 5,
  },
  {
    id: "test-2",
    author: "Rohan Kulkarni",
    role: "Managing Partner",
    company: "Skyline Properties",
    quote:
      "Nestora Hub provides verified real estate discovery that cut our client onboarding turnaround from days to under two hours.",
    rating: 5,
  },
  {
    id: "test-3",
    author: "Suresh Patil",
    role: "Commissioner",
    company: "Urban Local Bodies & Civic Administration",
    quote:
      "GovOS modernized our civic grievance turnaround from weeks to under 24 hours while ensuring full statutory compliance and transparent audit trails.",
    rating: 5,
  },
];

export const INITIAL_CMS_DATA: WebsiteCmsData = {
  siteInfo: {
    name: DEFAULT_SITE_INFO.name,
    legalName: "CascadeTech Solutions",
    tagline: DEFAULT_SITE_INFO.tagline,
    email: DEFAULT_SITE_INFO.email,
    phone: DEFAULT_SITE_INFO.phone,
    address: DEFAULT_SITE_INFO.address,
    socials: { ...DEFAULT_SITE_INFO.socials },
  },
  hero: {
    eyebrow: "NEXT-GEN TECHNOLOGY PARTNER",
    headline: "Delivering Intelligent and Scalable Digital Solutions",
    description:
      "CascadeTech Solutions engineers high-performance web platforms, custom enterprise software, and applied AI systems. We turn ambitious visions into bulletproof digital realities that scale effortlessly.",
    primaryCtaText: "Explore Our Expertise",
    primaryCtaLink: "/services",
    secondaryCtaText: "Engage Our Consultants",
    secondaryCtaLink: "/contact",
  },
  stats: [...DEFAULT_STATS],
  projects: [...DEFAULT_PROJECTS],
  services: [...DEFAULT_SERVICES],
  faqs: [...DEFAULT_FAQS],
  testimonials: [...DEFAULT_TESTIMONIALS],
  media: {
    logoUrl: "/cascade-logo.png",
    faviconUrl: "/favicon.ico",
    ogImageUrl: "/og-image.png",
  },
  lastUpdated: Date.now(),
};
