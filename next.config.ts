import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isGithubPages =
  process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS === "true";

function formatUrl(url?: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

const educoreUrl =
  formatUrl(process.env.EDUCORE_FRONTEND_URL) || "https://edu-core-um1o.onrender.com";
const nestoraUrl =
  formatUrl(process.env.NESTORAHUB_FRONTEND_URL) || "https://nestora-egk4.vercel.app";

const nextConfig: NextConfig = {
  ...(isGithubPages ? { output: "export", basePath: "/cascadetech-solutions" } : {}),
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async rewrites() {
    if (isGithubPages) return [];
    return {
      beforeFiles: [
        {
          source: "/educore",
          destination: `${educoreUrl}/educore`,
        },
        {
          source: "/educore/:path*",
          destination: `${educoreUrl}/educore/:path*`,
        },
        {
          source: "/api/auth/:path*",
          destination: `${educoreUrl}/educore/api/auth/:path*`,
        },
        {
          source: "/api/telemetry/:path*",
          destination: `${educoreUrl}/educore/api/telemetry/:path*`,
        },
        {
          source: "/nestorahub",
          destination: `${nestoraUrl}/nestorahub`,
        },
        {
          source: "/nestorahub/:path*",
          destination: `${nestoraUrl}/nestorahub/:path*`,
        },
        {
          source: "/assets/:path*",
          destination: `${nestoraUrl}/assets/:path*`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default withNextIntl(nextConfig);
