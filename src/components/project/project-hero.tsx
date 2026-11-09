import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";
import { CoverImage } from "@/components/project/cover-image";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

// Encabezado del proyecto: fecha y estado, título, portada, metadatos y cifras clave.
export function ProjectHero({ meta, lang }: { meta: ProjectMeta; lang: Locale }) {
  const t = getDictionary(lang);
  return (
    <header className="pt-10 md:pt-12">
      <div className="flex w-full flex-wrap items-center justify-between gap-4 px-6 text-[15px] md:px-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-ink-faint">
            <li>
              <Link href="/" className="transition-colors hover:text-ink">
                {t.nav.home}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {meta.title}
            </li>
          </ol>
        </nav>
        {meta.url && (
          <a
            href={meta.url}
            target="_blank"
            rel="noreferrer"
            className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
          >
            {t.project.visit} {new URL(meta.url).hostname.replace(/^www\./, "")} <span aria-hidden="true" data-nudge="ne" className="inline-block">↗</span>
          </a>
        )}
      </div>

      <h1 className="mt-10 w-full px-6 text-[36px] font-medium leading-[1.4] text-ink md:px-12">{meta.title}</h1>

      {!meta.hideCover && (
        <div className="mt-10 w-full px-6 md:px-12">
          {meta.cover ? (
            <CoverImage src={meta.cover} title={t.project.cover(meta.title)} />
          ) : (
            <div
              role="img"
              aria-label={t.project.cover(meta.title)}
              className="flex aspect-video w-full items-center justify-center rounded-[8px] bg-surface-2 text-[14px] text-ink-faint"
            >
              {t.project.coverPlaceholder}
            </div>
          )}
        </div>
      )}

      <div className="mt-16 w-full px-6 md:px-12">
        <dl data-motion="meta" className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-8 md:grid-cols-[1fr_1fr_1fr_2fr]">
          {[
            [t.project.year, meta.year],
            [t.project.type, meta.type],
            [t.project.status, meta.status],
          ].map(([label, value], i) => (
            <div key={label}>
              <dt className="font-mono text-[13px] uppercase tracking-[0.1em] text-ink-faint">{label}</dt>
              <dd className="mt-3 text-[17px] leading-[1.5] text-ink">{value}</dd>
              {/* The website shares the status column, so the grid keeps its four columns. */}
              {i === 2 && meta.url && (
                <>
                  <dt className="mt-8 font-mono text-[13px] uppercase tracking-[0.1em] text-ink-faint">{t.project.website}</dt>
                  <dd className="mt-3 text-[17px] leading-[1.5]">
                    <a
                      href={meta.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {new URL(meta.url).hostname.replace(/^www\./, "")} <span aria-hidden="true" data-nudge="ne" className="inline-block">↗</span>
                    </a>
                  </dd>
                </>
              )}
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <dt className="font-mono text-[13px] uppercase tracking-[0.1em] text-ink-faint">{t.project.stack}</dt>
            <dd className="mt-3">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-[17px] leading-[1.5] text-ink sm:grid-cols-2">
                {meta.stack.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>

    </header>
  );
}
