import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";

export type ProjectHighlight = { value: string; label: string };

export type ProjectMeta = {
  title: string;
  slug: string;
  summary: string;
  type: string;
  // Last activity, "YYYY-MM". Used to sort projects from newest to oldest.
  date: string;
  year: string;
  status: string;
  featured?: boolean;
  stack: string[];
  highlights: ProjectHighlight[];
  cover?: string;
};

type ProjectModule = { default: ComponentType<{ components?: MDXComponents }>; frontmatter: Record<string, unknown> };

// Orden de presentación: el primero es el que aparece primero en la navegación.
const loaders: Record<string, () => Promise<ProjectModule>> = {
  ganaderiapp: () => import("./ganaderiapp.mdx"),
  telemetrix: () => import("./telemetrix.mdx"),
  vigia: () => import("./vigia.mdx"),
  emisys: () => import("./emisys.mdx"),
  mottika: () => import("./mottika.mdx"),
  nido: () => import("./nido.mdx"),
  "midea-hvac": () => import("./midea-hvac.mdx"),
  getsellers: () => import("./getsellers.mdx"),
  uncierre: () => import("./uncierre.mdx"),
  "comfandi-digital": () => import("./comfandi-digital.mdx"),
};

export const projectSlugs = Object.keys(loaders);

export async function getProject(slug: string) {
  const load = loaders[slug];
  if (!load) return null;
  const mod = await load();
  return {
    Content: mod.default,
    meta: mod.frontmatter as unknown as ProjectMeta,
  };
}

export async function getAllProjectMeta(): Promise<ProjectMeta[]> {
  const all = await Promise.all(projectSlugs.map((slug) => getProject(slug)));
  const metas = all.flatMap((p) => (p ? [p.meta] : []));
  // Newest first. Array.sort is stable, so ties keep the registration order.
  return metas.sort((a, b) => b.date.localeCompare(a.date));
}
