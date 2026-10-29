import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { SectionLabel } from "@/components/section-label";

const intro =
  "I'm a Software Developer and Electronic Engineer with nearly 5 years of experience designing, modernizing and scaling web and mobile platforms, from fintech, real estate and blockchain to enterprise SaaS. Now, based in Floridablanca, CO, I've taken an independent path, working across the entire product lifecycle, from design and architecture to deployment, while building and operating four products of my own.";

const expertise = [
  "Backend & distributed systems",
  "Fintech & digital payments products",
  "Software architecture & system design",
  "Modern web & mobile development",
  "Cloud, CI/CD & observability",
  "AI-powered solutions & automation",
  "Testing & TDD",
  "Embedded systems & robotics",
];

export function AboutContainer() {
  return (
    <section
      id="who-am-i"
      className="font-space-grotesk relative flex flex-col px-8 pb-16 pt-32 text-ink"
    >
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-12">
          <SectionLabel marks="left">Who am I</SectionLabel>
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
            Explore my professional experience →
          </Link>
        </div>

        <div className="flex flex-col gap-12">
          <SectionLabel marks="none">Expertise</SectionLabel>
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
