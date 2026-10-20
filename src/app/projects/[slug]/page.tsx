import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectMeta, getProject, projectSlugs } from "@/content/projects";
import { ProjectHero } from "@/components/project/project-hero";
import { SummarySection } from "@/components/project/sections";
import { ProjectNav } from "@/components/project/project-nav";
import { ProjectSidebar } from "@/components/project/project-sidebar";

export const dynamicParams = false;

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.meta.title} · Portfolio`,
    description: project.meta.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const all = await getAllProjectMeta();
  const { Content, meta } = project;

  return (
    <article className="lg:pl-64">
      <ProjectSidebar />
      <ProjectHero meta={meta} />
      <div className="pb-8">
        <Content components={{ SummarySection: (props) => <SummarySection {...props} highlights={meta.highlights} /> }} />
      </div>
      <ProjectNav current={meta} all={all} />
    </article>
  );
}
