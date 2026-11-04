import Link from "next/link";
import { AccordionList, type AccordionItem } from "@/components/accordion-list";
import { SectionHeader, labelClass as label } from "@/components/section-label";
import { getDisciplines } from "@/content/localized";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

function buildItems(lang: Locale): AccordionItem[] {
  const t = getDictionary(lang).home;
  return getDisciplines(lang).map((d) => ({
  id: d.id,
  title: d.title,
  subtitle: d.subtitle,
  badge: t.proofs(d.proofs.length),
  content: (
    <>
      <div className="flex flex-col gap-6">
        <p className={`${label} text-ink-muted`}>{t.whatItCovers}</p>
        <p className="text-[19px] font-medium leading-[1.5]">{d.lead}</p>
        <ul className="flex flex-wrap gap-2">
          {d.tags.map((tag) => (
            <li key={tag} className={`${label} bg-ink px-2.5 py-1.5 font-bold text-highlight`}>
              {tag}
            </li>
          ))}
        </ul>
        <ul className="flex flex-col">
          {d.covers.map((item) => (
            <li key={item} className={`${label} border-b border-line py-3 first:border-t first:border-line`}>
              + {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <p className={`${label} text-ink-muted`}>{t.workBehind}</p>
        <ul className="flex flex-col gap-4">
          {d.proofs.map((proof, i) => (
            <li key={proof.slug}>
              <Link
                href={`/projects/${proof.slug}`}
                data-lift
                data-press
                className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border border-ink bg-surface p-4 transition-colors hover:bg-surface-2"
              >
                <span className={`${label} pt-1 font-bold`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-medium leading-snug">
                    {proof.title}, {proof.context}{" "}
                    <span aria-hidden="true" data-nudge="ne" className="inline-block">
                      ↗
                    </span>
                  </span>
                  <span className="text-[15px] leading-[1.5] text-ink-muted">{proof.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="#projects"
        data-lift
        data-press
        className="flex h-fit flex-col gap-3 bg-ink p-6 text-paper transition-colors hover:bg-ink-soft"
      >
        <span className={`${label} text-highlight`}>{t.ownProducts}</span>
        <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] uppercase leading-[1.05]">
          {t.seeWhatIBuild}
        </span>
        <span className={`${label} border-t border-paper pt-3`}>{t.goToList}</span>
      </Link>
    </>
  ),
  }));
}

export function WhatIDoContainer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home;
  const items = buildItems(lang);
  return (
    <section id="what-i-do" className="font-space-grotesk relative overflow-hidden px-8 pb-24 pt-16 text-ink">
      <div className="relative">
        <SectionHeader
          label={t.clientWork}
          title={t.disciplinesTitle}
          note={t.disciplinesNote(items.length)}
        />
        <div className="mt-16">
          <AccordionList items={items} />
        </div>
      </div>
    </section>
  );
}
