import type { Metadata } from "next";
import Link from "next/link";
import { education, groupStack, jobs } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience · Portfolio",
  description: "Professional experience, education and honors.",
};

const label = "font-mono text-[13px] uppercase tracking-[0.1em] text-white/45";

export default function ExperiencePage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="w-full px-6 pt-10 text-[15px] md:px-12 md:pt-12">
        <ol className="flex items-center gap-2 text-white/45">
          <li>
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <h1 aria-current="page" className="text-[15px] font-normal text-white">
              Experience
            </h1>
          </li>
        </ol>
      </nav>

      <section className="w-full px-6 pt-24 md:px-12 md:pt-32">
        <h2 className="text-[22px] font-bold uppercase leading-7 tracking-[0.12em] text-[#E7F451]">
          Professional experience
        </h2>

        <ol className="mt-12 flex flex-col">
          {jobs.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="grid gap-6 border-t border-white/15 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12"
            >
              <div className="flex flex-col gap-3">
                <p className={label}>{job.period}</p>
                <p className="text-[15px] text-white/55">{job.location}</p>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-[28px] font-medium leading-tight text-white">{job.company}</h3>
                  <p className="mt-1 text-[18px] text-[#E7F451]">{job.role}</p>
                </div>

                <ul className="flex flex-col gap-5">
                  {job.highlights.map((h) => (
                    <li
                      key={h.title}
                      className="relative pl-6 text-[18px] leading-[1.6] text-white/85 before:absolute before:left-0 before:top-[0.75em] before:h-1 before:w-1 before:rounded-full before:bg-white"
                    >
                      <strong className="font-medium text-white">{h.title}.</strong> {h.text}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3 pt-2">
                  <span className={label}>Stack</span>
                  <ul className="flex flex-wrap gap-2">
                    {groupStack(job.stack)
                      .flatMap((g) => g.items)
                      .map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/20 bg-white/[0.04] px-3.5 py-1.5 text-[14px] leading-none text-white/85"
                        >
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>

                {job.projects && (
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2">
                    <span className={label}>Projects</span>
                    {job.projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="text-[16px] text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
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
        <h2 className="text-[22px] font-bold uppercase leading-7 tracking-[0.12em] text-[#E7F451]">
          Education & honors
        </h2>

        <div className="mt-12 grid gap-6 border-t border-white/15 py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] md:gap-12">
          <div className="flex flex-col gap-3">
            <p className={label}>{education.period}</p>
            <p className="text-[15px] text-white/55">{education.place}</p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-[28px] font-medium leading-tight text-white">{education.degree}</h3>
              <p className="mt-1 text-[18px] text-[#E7F451]">{education.school}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {education.honors.map((h) => (
                <li
                  key={h}
                  className="relative pl-6 text-[18px] leading-[1.6] text-white/85 before:absolute before:left-0 before:top-[0.75em] before:h-1 before:w-1 before:rounded-full before:bg-white"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
