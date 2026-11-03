import type { ComponentType } from "react";
import type { MDXComponents } from "mdx/types";
import type { Locale } from "@/i18n/config";

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
  // Confidential projects have no screens to show, so the hero skips the cover entirely.
  hideCover?: boolean;
  // Public site of the product, when it has one.
  url?: string;
};

type ProjectModule = { default: ComponentType<{ components?: MDXComponents }>; frontmatter: Record<string, unknown> };

// Orden de presentación: el primero es el que aparece primero en la navegación.
// Each project has an English file and a Spanish one under es/.
const loaders: Record<string, Record<Locale, () => Promise<ProjectModule>>> = {
  ganaderiapp: { en: () => import("./ganaderiapp.mdx"), es: () => import("./es/ganaderiapp.mdx") },
  telemetrix: { en: () => import("./telemetrix.mdx"), es: () => import("./es/telemetrix.mdx") },
  vigia: { en: () => import("./vigia.mdx"), es: () => import("./es/vigia.mdx") },
  emisys: { en: () => import("./emisys.mdx"), es: () => import("./es/emisys.mdx") },
  mottika: { en: () => import("./mottika.mdx"), es: () => import("./es/mottika.mdx") },
  nido: { en: () => import("./nido.mdx"), es: () => import("./es/nido.mdx") },
  "midea-hvac": { en: () => import("./midea-hvac.mdx"), es: () => import("./es/midea-hvac.mdx") },
  getsellers: { en: () => import("./getsellers.mdx"), es: () => import("./es/getsellers.mdx") },
  uncierre: { en: () => import("./uncierre.mdx"), es: () => import("./es/uncierre.mdx") },
  "comfandi-digital": { en: () => import("./comfandi-digital.mdx"), es: () => import("./es/comfandi-digital.mdx") },
};

export const projectSlugs = Object.keys(loaders);

export async function getProject(slug: string, locale: Locale = "en") {
  const load = loaders[slug]?.[locale];
  if (!load) return null;
  const mod = await load();
  return {
    Content: mod.default,
    meta: mod.frontmatter as unknown as ProjectMeta,
  };
}

export async function getAllProjectMeta(locale: Locale = "en"): Promise<ProjectMeta[]> {
  const all = await Promise.all(projectSlugs.map((slug) => getProject(slug, locale)));
  const metas = all.flatMap((p) => (p ? [p.meta] : []));
  // Newest first. Array.sort is stable, so ties keep the registration order.
  return metas.sort((a, b) => b.date.localeCompare(a.date));
}
