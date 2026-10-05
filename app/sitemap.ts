import type { MetadataRoute } from "next";

import { getPoems } from "@/lib/poems";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = ["", "/poems", "/manuscripts", "/about", "/memories", "/media", "/search"];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path || "/"}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...getPoems()
      .filter((poem) => !poem.sample)
      .map((poem) => ({
        url: `${site.url}/poems/${poem.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
  ];
}
