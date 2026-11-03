// import { Hero } from "@/components/hero";
import { AboutContainer } from "@/features/home/components/about.container";
import { WhatIDoContainer } from "@/features/home/components/what-i-do.container";
import { ProjectsContainer } from "@/features/home/components/projects.container";
import { Footer } from "@/components/footer";
import { HomeContainer } from "@/features/home/components/home.container";
import type { Locale } from "@/i18n/config";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  return (
    <>
      {/* <Hero /> */}
      <HomeContainer lang={lang} />
      {/* One set of column guides runs behind the three sections, from the top of Who am I. */}
      <div className="relative bg-paper">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px)] [background-size:25%_100%]"
        />
        <AboutContainer lang={lang} />
        <WhatIDoContainer lang={lang} />
        <ProjectsContainer lang={lang} />
      </div>
      <Footer lang={lang} />
    </>
  );
}
