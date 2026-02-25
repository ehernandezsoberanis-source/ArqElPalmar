import type { MetadataRoute } from "next";
import { projects } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/studio", "/projects", "/contact"];

  const staticEntries = staticRoutes.map((route) => ({
    url: `https://www.arqelpalmar.com${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const projectEntries = projects.map((project) => ({
    url: `https://www.arqelpalmar.com/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticEntries, ...projectEntries];
}
