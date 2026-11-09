import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { RollText } from "@/components/roll-text";
import { getAllProjectMeta } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).meta;
  return pageMetadata({ lang, path: "/projects", title: t.projects, description: t.projectsDescription });
}

// Index of all projects, with cards linking to each detail view.
export default async function ProjectsIndexPage({ params }: PageProps<"/[lang]/projects">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const projects = await getAllProjectMeta(lang);

  return (
    <section className="mx-auto w-full max-w-[960px] px-4 pt-32 md:pt-[200px]">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-[14px] text-ink-muted">{t.project.count(projects.length)}</p>
        <h1 className="mt-8 text-[36px] font-medium leading-[1.4] text-ink">{t.nav.projects}</h1>
      </header>

      <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} data-press className="flex flex-col gap-5">
              {p.cover ? (
                <span data-zoom className="block overflow-hidden rounded-[8px] border border-line">
                  {/* Only the first row is on screen when the page opens. */}
                  <Image
                    src={p.cover}
                    alt={t.project.cover(p.title)}
                    width={1600}
                    height={900}
                    sizes="(min-width: 768px) 448px, calc(100vw - 32px)"
                    loading={i < 2 ? "eager" : "lazy"}
                    className="aspect-video w-full object-cover object-top"
                  />
                </span>
              ) : (
                <div
                  role="img"
                  aria-label={t.project.cover(p.title)}
                  className="flex aspect-video w-full items-center justify-center rounded-[8px] bg-surface-2 text-[13px] text-ink-faint"
                >
                  {t.project.coverPlaceholder}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-4 text-[14px] text-ink-muted">
                  <span>{p.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.status}</span>
                </div>
                <h2 className="text-[24px] font-medium leading-[1.25] text-ink">
                  <RollText>{p.title}</RollText>
                </h2>
                <p className="line-clamp-3 text-[16px] leading-[1.6] text-ink-muted">{p.summary}</p>
                <p className="mt-2 text-[14px] text-ink-muted">{p.stack.slice(0, 4).join(" · ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
