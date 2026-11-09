import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectMeta, getProject, projectSlugs } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { pageMetadata, shareCover, SITE_NAME, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { ProjectHero } from "@/components/project/project-hero";
import { SummarySection } from "@/components/project/sections";
import { ProjectNav } from "@/components/project/project-nav";
import { ProjectSidebar } from "@/components/project/project-sidebar";
import { ProjectMotion } from "@/components/project/project-motion";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}


export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { slug, lang } = await params;
  const project = await getProject(slug, lang as Locale);
  if (!project) return {};
  return pageMetadata({
    lang: lang as Locale,
    path: `/projects/${slug}`,
    title: project.meta.title,
    description: project.meta.summary,
    image: shareCover(project.meta),
    type: "article",
  });
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug, lang: raw } = await params;
  const lang = raw as Locale;
  const project = await getProject(slug, lang);
  if (!project) notFound();

  const all = await getAllProjectMeta(lang);
  const { Content, meta } = project;
  const cover = shareCover(meta);

  return (
    <article className="lg:pl-64">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.summary,
          url: `${SITE_URL}/projects/${meta.slug}`,
          inLanguage: lang,
          ...(cover && { image: `${SITE_URL}${cover}` }),
          author: { "@type": "Person", "@id": `${SITE_URL}/#person`, name: SITE_NAME },
        }}
      />
      <ProjectMotion key={`${meta.slug}-${lang}`} />
      {/* Remounted per language, since it reads the section titles from the page once. */}
      <ProjectSidebar key={lang} />
      <ProjectHero meta={meta} lang={lang} />
      <div className="pb-8">
        <Content components={{ SummarySection: (props) => <SummarySection {...props} highlights={meta.highlights} /> }} />
      </div>
      <ProjectNav current={meta} all={all} lang={lang} />
    </article>
  );
}
