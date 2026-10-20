import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  // Keep previews out of Google until launch: set NEXT_PUBLIC_ALLOW_INDEXING=true on production only.
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return { rules: allow ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
