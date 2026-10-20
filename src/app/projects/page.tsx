import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjectMeta } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects · Portfolio",
  description: "Personal projects: goals, features, decisions and architecture.",
};

// Index of all projects, with cards linking to each detail view.
export default async function ProjectsIndexPage() {
  const projects = await getAllProjectMeta();

  return (
    <section className="mx-auto w-full max-w-[960px] px-4 pt-32 md:pt-[200px]">
      <header className="mx-auto max-w-[640px] text-center">
        <p className="text-[14px] text-white/55">{projects.length} projects</p>
        <h1 className="mt-8 text-[36px] font-medium leading-[1.4] text-white">Projects</h1>
      </header>

      <ul className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projects/${p.slug}`} className="group flex flex-col gap-5">
              {p.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover}
                  alt={`Cover of ${p.title}`}
                  className="aspect-video w-full rounded-[8px] border border-white/10 object-cover object-top"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`Cover of ${p.title}`}
                  className="flex aspect-video w-full items-center justify-center rounded-[8px] bg-white/[0.06] text-[13px] text-white/40"
                >
                  Cover
                </div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-x-4 text-[14px] text-white/55">
                  <span>{p.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{p.status}</span>
                </div>
                <h2 className="text-[24px] font-medium leading-[1.25] text-white underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-white">
                  {p.title}
                </h2>
                <p className="line-clamp-3 text-[16px] leading-[1.6] text-white/70">{p.summary}</p>
                <p className="mt-2 text-[14px] text-white/55">{p.stack.slice(0, 4).join(" · ")}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
