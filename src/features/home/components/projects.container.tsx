import Link from "next/link";
import { AccordionList, type AccordionItem } from "@/components/accordion-list";
import { SectionHeader, labelClass as label } from "@/components/section-label";
import { getAllProjectMeta } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function ProjectsContainer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home;
  // The type is translated, so own products are picked from the English metadata.
  const own = new Set((await getAllProjectMeta("en")).filter((p) => p.type === "Side project").map((p) => p.slug));
  const projects = (await getAllProjectMeta(lang)).filter((project) => own.has(project.slug));

  const items: AccordionItem[] = projects.map((project) => ({
    id: project.slug,
    title: project.title,
    subtitle: t.taglines[project.slug] ?? project.type,
    badge: project.status,
    image: project.cover,
    content: (
      <>
        <div className="flex flex-col gap-6">
          <p className={`${label} text-ink-muted`}>{t.whatItIs}</p>
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
          <p className={`${label} text-ink-muted`}>{t.inNumbers}</p>
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
            {t.openProject}
          </span>
          <span className={`${label} border-t border-paper pt-3`}>{t.readCase}</span>
        </Link>
      </>
    ),
  }));

  return (
    <section id="projects" className="font-space-grotesk relative overflow-hidden px-8 pb-32 pt-16 text-ink">
      <div className="relative">
        <SectionHeader
          label={t.ownProducts}
          title={t.productsTitle}
          note={t.productsNote(items.length)}
        />
        <div className="mt-16">
          <AccordionList items={items} />
        </div>
      </div>
    </section>
  );
}
