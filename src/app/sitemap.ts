import type { MetadataRoute } from "next";
import { projectSlugs } from "@/content/projects";
import { SITE_URL } from "@/lib/seo";

// One entry per page: both languages share the same URL.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/projects", "/experience", ...projectSlugs.map((slug) => `/projects/${slug}`)];
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
