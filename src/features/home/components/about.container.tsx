import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const intro =
  "I'm a Software Engineer and Electronic Engineer with nearly 5 years of experience designing, modernizing and scaling web and mobile platforms, from fintech, real estate and blockchain to enterprise SaaS.";

const expertise = [
  "Backend & distributed systems",
  "Fintech & digital payments products",
  "Software architecture & system design",
  "Web & mobile (Next.js, React Native)",
  "Cloud, CI/CD & observability",
  "AI-powered solutions & automation",
  "Testing & TDD",
  "Embedded systems & robotics",
];

export function AboutContainer() {
  return (
    <section
      id="who-am-i"
      className="font-space-grotesk relative flex min-h-dvh flex-col justify-center gap-12 bg-black px-8 py-32 text-white"
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#E7F451]">
        Who am I
      </p>

      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-12">
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
            href="/projects"
            className="w-fit text-lg font-bold uppercase tracking-wide text-[#E7F451] underline-offset-8 hover:underline"
          >
            Dive into the specifics of my work →
          </Link>
        </div>

        <div className="flex flex-col gap-6 lg:pt-3">
          <h3 className="text-base text-white/50">Expertise</h3>
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
