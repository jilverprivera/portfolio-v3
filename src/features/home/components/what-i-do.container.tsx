import Link from "next/link";
import { AccordionList, type AccordionItem } from "@/components/accordion-list";
import { SectionHeader, labelClass as label } from "@/components/section-label";
import { disciplines } from "@/content/disciplines";

const items: AccordionItem[] = disciplines.map((d) => ({
  id: d.id,
  title: d.title,
  subtitle: d.subtitle,
  badge: `${d.proofs.length} ${d.proofs.length === 1 ? "proof" : "proofs"}`,
  content: (
    <>
      <div className="flex flex-col gap-6">
        <p className={`${label} text-ink-muted`}>What it covers</p>
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
        <p className={`${label} text-ink-muted`}>The work behind it</p>
        <ul className="flex flex-col gap-4">
          {d.proofs.map((proof, i) => (
            <li key={proof.slug}>
              <Link
                href={`/projects/${proof.slug}`}
                className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border border-ink bg-surface p-4 transition-colors hover:bg-surface-2"
              >
                <span className={`${label} pt-1 font-bold`}>{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-1">
                  <span className="text-[17px] font-medium leading-snug">
                    {proof.title}, {proof.context} ↗
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
        className="flex h-fit flex-col gap-3 bg-ink p-6 text-paper transition-colors hover:bg-ink-soft"
      >
        <span className={`${label} text-highlight`}>My own products</span>
        <span className="font-display text-[clamp(1.75rem,3vw,2.5rem)] uppercase leading-[1.05]">
          See what I build
        </span>
        <span className={`${label} border-t border-paper pt-3`}>Go to the list ↓</span>
      </Link>
    </>
  ),
}));

export function WhatIDoContainer() {
  return (
    <section id="what-i-do" className="font-space-grotesk relative overflow-hidden px-8 pb-24 pt-16 text-ink">
      <div className="relative">
        <SectionHeader
          label="Client work"
          title="The disciplines behind the work."
          note={`${disciplines.length} disciplines. Each one backed by projects delivered for companies. Tap a word.`}
        />
        <div className="mt-16">
          <AccordionList items={items} />
        </div>
      </div>
    </section>
  );
}
