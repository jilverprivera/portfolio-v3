import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { groupStack } from "@/content/experience";
import { getEducation, getJobs } from "@/content/localized";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/experience">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang).meta;
  return pageMetadata({ lang, path: "/experience", title: t.experience, description: t.experienceDescription });
}

const label = "font-mono text-[13px] uppercase tracking-[0.1em] text-ink-muted";

export default async function ExperiencePage({ params }: PageProps<"/[lang]/experience">) {
  const lang = (await params).lang as Locale;
  const t = getDictionary(lang);
  const jobs = getJobs(lang);
  const education = getEducation(lang);
  return (
    <>
      <nav aria-label="Breadcrumb" className="w-full px-6 pt-10 text-[15px] md:px-12 md:pt-12">
        <ol className="flex items-center gap-2 text-ink-faint">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              {t.nav.home}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {t.nav.experience}
          </li>
        </ol>
      </nav>

      <h1 className="w-full px-6 pt-10 text-[36px] font-medium leading-[1.4] text-ink md:px-12">{t.nav.experience}</h1>

      <section className="w-full px-6 pt-24 md:px-12 md:pt-32">
        <Reveal
          as="h2"
          className="text-accent-text"
          textClassName="!text-[22px] !font-bold uppercase !leading-7 !tracking-[0.12em]"
        >
          {t.experience.professional}
        </Reveal>

        <ol className="mt-12 flex flex-col">
          {jobs.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12"
            >
              <div className="flex flex-col gap-3">
                <p className={label}>{job.period}</p>
                <p className="text-[15px] text-ink-muted">{job.location}</p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-[28px] font-medium leading-tight text-ink">{job.company}</h3>
                  <p className="mt-1 text-[18px] text-accent-text">{job.role}</p>
                </div>

                <ul className="flex flex-col gap-5">
                  {job.highlights.map((h) => (
                    <li
                      key={h.title}
                      className="relative pl-6 text-[18px] leading-[1.6] text-ink-soft before:absolute before:left-0 before:top-[0.75em] before:h-1 before:w-1 before:rounded-full before:bg-ink"
                    >
                      <Reveal className="text-ink" textClassName="!text-[18px] !font-bold !leading-[1.6]">
                        {`${h.title}.`}
                      </Reveal>
                      <Reveal textClassName="!text-[18px] !font-normal !leading-[1.6]">{h.text}</Reveal>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 pt-2">
                  <span className={label}>{t.experience.stack}</span>
                  <ul className="flex flex-wrap gap-2">
                    {groupStack(job.stack)
                      .flatMap((g) => g.items)
                      .map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line-strong bg-surface px-3.5 py-1.5 text-[14px] leading-none text-ink-soft"
                        >
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>

                {job.projects && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                    <span className={label}>{t.experience.projects}</span>
                    {job.projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="text-[16px] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent-text hover:decoration-accent"
                      >
                        {p.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="w-full px-6 pt-24 md:px-12 md:pt-32">
        <Reveal
          as="h2"
          className="text-accent-text"
          textClassName="!text-[22px] !font-bold uppercase !leading-7 !tracking-[0.12em]"
        >
          {t.experience.education}
        </Reveal>

        <div className="mt-12 grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12">
          <div className="flex flex-col gap-3">
            <p className={label}>{education.period}</p>
            <p className="text-[15px] text-ink-muted">{education.place}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-[28px] font-medium leading-tight text-ink">{education.degree}</h3>
              <p className="mt-1 text-[18px] text-accent-text">{education.school}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {education.honors.map((h) => (
                <li
                  key={h}
                  className="relative pl-6 text-[18px] leading-[1.6] text-ink-soft before:absolute before:left-0 before:top-[0.75em] before:h-1 before:w-1 before:rounded-full before:bg-ink"
                >
                  <Reveal textClassName="!text-[18px] !font-normal !leading-[1.6]">{h}</Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
