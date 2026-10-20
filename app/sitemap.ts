import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { AREAS } from "@/lib/locations";
import { POSTS } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    "", "/immediate-need", "/services", "/planning-ahead", "/our-team", "/our-founder", "/pricing", "/contact", "/areas", "/insights",
    ...SERVICES.map((s) => `/services/${s.slug}`),
    ...AREAS.map((a) => `/areas/${a.slug}`),
    ...POSTS.map((p) => `/insights/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${SITE.url}${p}`, lastModified: now, priority: p === "" ? 1 : p.startsWith("/areas/") ? 0.6 : 0.8 }));
}
