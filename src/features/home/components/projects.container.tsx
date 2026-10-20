import { ProjectsMenu } from "@/features/home/components/projects-menu";
import { getAllProjectMeta } from "@/content/projects";

export async function ProjectsContainer() {
  const projects = await getAllProjectMeta();

  const items = projects.map((project) => ({
    text: project.title,
    link: `/projects/${project.slug}`,
    meta: project.year,
    marquee: `${project.title} • ${project.type}`,
    // Projects with a cover show it in the flowing band.
    image: project.cover,
  }));

  return (
    <section
      id="projects"
      className="font-space-grotesk relative flex flex-col gap-12 bg-black px-8 py-32 text-white"
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E7F451]">
        Selected projects
      </p>

      <div
        className="-mx-8"
        style={{ height: `calc(${items.length} * clamp(6rem, 16vw, 14rem))` }}
      >
        <ProjectsMenu items={items} />
      </div>
    </section>
  );
}
