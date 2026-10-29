import Link from "next/link";
import { AccordionList, type AccordionItem } from "@/components/accordion-list";
import { SectionHeader, labelClass as label } from "@/components/section-label";
import { getAllProjectMeta } from "@/content/projects";

// Short line for each product, shown next to its name when the row is closed.
const tagline: Record<string, string> = {
  vigia: "Pharmacy management PWA",
  telemetrix: "IoT telemetry platform",
  ganaderiapp: "Cattle farm app",
};

export async function ProjectsContainer() {
  const projects = (await getAllProjectMeta()).filter((project) => project.type === "Side project");

  const items: AccordionItem[] = projects.map((project) => ({
    id: project.slug,
    title: project.title,
    subtitle: tagline[project.slug] ?? project.type,
    badge: project.status,
    image: project.cover,
    content: (
      <>
        <div className="flex flex-col gap-6">
          <p className={`${label} text-ink-muted`}>What it is</p>
          <p className="text-[19px] font-medium leading-[1.5]">{project.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <li key={tech} className={`${label} bg-ink px-2.5 py-1.5 font-bold text-highlight`}>
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <p className={`${label} text-ink-muted`}>In numbers</p>
          <ul className="flex flex-col">
            {project.highlights.map((h) => (
              <li
                key={h.label}
                className="flex items-baseline gap-4 border-b border-line py-3 first:border-t first:border-line"
              >
                <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none">{h.value}</span>
                <span className={`${label} text-ink-muted`}>{h.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="flex h-fit flex-col gap-3 bg-ink p-6 text-paper transition-colors hover:bg-ink-soft"
        >
          <span className={`${label} text-highlight`}>{project.year}</span>
          <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] uppercase leading-[1.05]">
            Open the project
          </span>
          <span className={`${label} border-t border-paper pt-3`}>Read the case study ↗</span>
        </Link>
      </>
    ),
  }));

  return (
    <section id="projects" className="font-space-grotesk relative overflow-hidden px-8 pb-32 pt-16 text-ink">
      <div className="relative">
        <SectionHeader
          label="My own products"
          title="Built and run by me."
          note={`${items.length} products. Each one designed, built and operated end to end. Tap a word.`}
        />
        <div className="mt-16">
          <AccordionList items={items} />
        </div>
      </div>
    </section>
  );
}
