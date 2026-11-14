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

const educoreUrl = formatUrl(process.env.EDUCORE_FRONTEND_URL);
const nestoraUrl = formatUrl(process.env.NESTORAHUB_FRONTEND_URL);

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
    const rewritesList = [];

    if (educoreUrl) {
      rewritesList.push(
        {
          source: "/educore",
          destination: `${educoreUrl}/educore`,
        },
        {
          source: "/educore/:path*",
          destination: `${educoreUrl}/educore/:path*`,
        }
      );
    }

    if (nestoraUrl) {
      rewritesList.push(
        {
          source: "/nestorahub",
          destination: `${nestoraUrl}/nestorahub`,
        },
        {
          source: "/nestorahub/:path*",
          destination: `${nestoraUrl}/nestorahub/:path*`,
        }
      );
    }

    return rewritesList;
  },
};

export default withNextIntl(nextConfig);
