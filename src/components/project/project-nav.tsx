import Link from "next/link";
import { RollText } from "@/components/roll-text";
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
        <Link href={`/projects/${prev.slug}`} className="flex flex-col items-start gap-1">
          <span className="text-[14px] text-ink-muted">
            <span aria-hidden="true" data-nudge="w" className="inline-block">
              ←
            </span>{" "}
            {t.previous}
          </span>
          <RollText className="text-[20px] text-ink">{prev.title}</RollText>
        </Link>
        <Link href={`/projects/${next.slug}`} className="flex flex-col gap-1 sm:items-end sm:text-right">
          <span className="text-[14px] text-ink-muted">
            {t.next}{" "}
            <span aria-hidden="true" data-nudge="e" className="inline-block">
              →
            </span>
          </span>
          <RollText className="text-[20px] text-ink">{next.title}</RollText>
        </Link>
      </div>

    </nav>
  );
}
