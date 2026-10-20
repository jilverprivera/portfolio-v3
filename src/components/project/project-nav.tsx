import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";

type Props = {
  current: ProjectMeta;
  all: ProjectMeta[];
};

// Project navigation: previous and next.
export function ProjectNav({ current, all }: Props) {
  const index = all.findIndex((p) => p.slug === current.slug);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <nav aria-label="Projects" className="mx-auto mt-32 w-full px-6 md:px-12 md:mt-40">
      <div className="grid grid-cols-1 gap-6 border-t border-white/15 pt-8 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1">
          <span className="text-[14px] text-white/55">← Previous</span>
          <span className="text-[20px] text-white underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-white">
            {prev.title}
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
          <span className="text-[14px] text-white/55">Next →</span>
          <span className="text-[20px] text-white underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-white">
            {next.title}
          </span>
        </Link>
      </div>

    </nav>
  );
}
