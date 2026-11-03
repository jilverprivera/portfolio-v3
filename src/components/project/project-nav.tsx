import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Props = {
  current: ProjectMeta;
  all: ProjectMeta[];
  lang: Locale;
};

// Project navigation: previous and next.
export function ProjectNav({ current, all, lang }: Props) {
  const t = getDictionary(lang).nav;
  const index = all.findIndex((p) => p.slug === current.slug);
  const prev = all[(index - 1 + all.length) % all.length];
  const next = all[(index + 1) % all.length];

  return (
    <nav aria-label={t.projects} className="mx-auto mt-32 w-full px-6 md:px-12 md:mt-40">
      <div className="grid grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} className="group flex flex-col gap-1">
          <span className="text-[14px] text-ink-muted">{t.previous}</span>
          <span className="text-[20px] text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-ink">
            {prev.title}
          </span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group flex flex-col gap-1 sm:items-end sm:text-right">
          <span className="text-[14px] text-ink-muted">{t.next}</span>
          <span className="text-[20px] text-ink underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-ink">
            {next.title}
          </span>
        </Link>
      </div>

    </nav>
  );
}
