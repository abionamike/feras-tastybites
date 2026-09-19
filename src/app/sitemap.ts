import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";
import { siteUrl } from "@/lib/url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = ["", "/menu", "/catering", "/about", "/faq", "/contact"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  const items = products.map((p) => ({ url: `${base}/menu/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...pages, ...items];
}
