import type { Metadata } from "next";
// import { Hero } from "@/components/hero";
import { AboutContainer } from "@/features/home/components/about.container";
import { WhatIDoContainer } from "@/features/home/components/what-i-do.container";
import { ProjectsContainer } from "@/features/home/components/projects.container";
import { Footer, socials } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { HomeContainer } from "@/features/home/components/home.container";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  return pageMetadata({ lang, path: "/", description: getDictionary(lang).meta.description });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).meta;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: SITE_NAME,
          url: SITE_URL,
          jobTitle: t.jobTitle,
          description: t.description,
          sameAs: socials.map((social) => social.href),
        }}
      />
      <main>
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
      </main>
      <Footer lang={lang} />
    </>
  );
}
