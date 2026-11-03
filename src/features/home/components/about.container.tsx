import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/section-label";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function AboutContainer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home;
  const { intro, expertise } = t;
  return (
    <section
      id="who-am-i"
      className="font-space-grotesk relative flex flex-col px-8 pb-16 pt-32 text-ink"
    >
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-12">
          <SectionLabel marks="left">{t.whoAmI}</SectionLabel>
          <ScrollReveal
            scrollContainerRef={undefined}
            baseOpacity={0.12}
            baseRotation={0}
            blurStrength={6}
            stagger={0.03}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.75rem,3.6vw,4rem)] !font-bold !leading-[1.12] !tracking-[-0.02em]"
          >
            {intro}
          </ScrollReveal>

          <Link
            href="/experience"
            className="w-fit text-lg font-bold uppercase tracking-wide text-accent-text underline-offset-8 hover:underline"
          >
            {t.exploreExperience}
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          <SectionLabel marks="none">{t.expertiseLabel}</SectionLabel>
          <ul className="flex flex-col gap-4">
            {expertise.map((item) => (
              <li key={item}>
                <ScrollReveal
                  scrollContainerRef={undefined}
                  baseOpacity={0.12}
                  baseRotation={0}
                  blurStrength={6}
                  stagger={0.03}
                  containerClassName="!my-0"
                  textClassName="!text-[clamp(1.125rem,1.7vw,1.75rem)] !font-medium !leading-tight"
                >
                  {item}
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
