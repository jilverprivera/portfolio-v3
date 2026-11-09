import type { Metadata } from "next";
import type { ProjectMeta } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// SITE_URL overrides the production address that Vercel provides, so previews still point at the real site.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const SITE_URL = process.env.SITE_URL ?? (productionHost ? `https://${productionHost}` : "http://localhost:3000");

export const SITE_NAME = "Jilver Pacheco";

const OG_LOCALES: Record<Locale, string> = { en: "en_US", es: "es_LA" };

// Confidential projects never show their screens, and that includes link previews.
export const shareCover = (meta: ProjectMeta) => (meta.hideCover ? undefined : meta.cover);

type PageSeo = {
  lang: Locale;
  path: string;
  description: string;
  // Without one, the page uses the site's main title.
  title?: string;
  image?: string;
  type?: "website" | "article";
};

// Next replaces openGraph and twitter as a whole instead of merging them, so every page declares its own.
export function pageMetadata({ lang, path, description, title, image = "/og.png", type = "website" }: PageSeo): Metadata {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : getDictionary(lang).meta.title;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: OG_LOCALES[lang],
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
  };
}
