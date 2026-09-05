import type { MetadataRoute } from "next";
import { clinica } from "@/lib/clinica";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: clinica.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
