import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.cascade-erp.in";
  const locales = ["en", "hi", "kn", "te", "ta", "ml", "mr", "bn", "gu"];
  const subpages = ["", "/about", "/services", "/work", "/contact"];

  const routes: MetadataRoute.Sitemap = [];

  // Home and localized pages
  locales.forEach((locale) => {
    subpages.forEach((page) => {
      routes.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    });
  });

  // Flagship Products
  routes.push({
    url: `${baseUrl}/educore`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  routes.push({
    url: `${baseUrl}/nestorahub`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  });

  return routes;
}
