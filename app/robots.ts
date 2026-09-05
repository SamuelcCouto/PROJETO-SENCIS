import type { MetadataRoute } from "next";
import { clinica } from "@/lib/clinica";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${clinica.siteUrl}/sitemap.xml`,
    host: clinica.siteUrl,
  };
}
