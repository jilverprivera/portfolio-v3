import Link from "next/link";
import type { ProjectMeta } from "@/content/projects";
import { CoverImage } from "@/components/project/cover-image";

// Encabezado del proyecto: fecha y estado, título, portada, metadatos y cifras clave.
export function ProjectHero({ meta }: { meta: ProjectMeta }) {
  return (
    <header className="pt-10 md:pt-12">
      <nav aria-label="Breadcrumb" className="w-full px-6 text-[15px] md:px-12">
        <ol className="flex items-center gap-2 text-white/45">
          <li>
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <h1 aria-current="page" className="text-[15px] font-normal text-white">
              {meta.title}
            </h1>
          </li>
        </ol>
      </nav>

      <div className="mt-10 w-full px-6 md:px-12">
        {meta.cover ? (
          <CoverImage src={meta.cover} title={`Cover of ${meta.title}`} />
        ) : (
          <div
            role="img"
            aria-label={`Cover of ${meta.title}`}
            className="flex aspect-video w-full items-center justify-center rounded-[8px] bg-white/[0.06] text-[14px] text-white/40"
          >
            Cover image
          </div>
        )}
      </div>

      <div className="mt-16 w-full px-6 md:px-12">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-white/15 py-8 md:grid-cols-[1fr_1fr_1fr_2fr]">
          {[
            ["Year", meta.year],
            ["Type", meta.type],
            ["Status", meta.status],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[13px] uppercase tracking-[0.1em] text-white/45">{label}</dt>
              <dd className="mt-3 text-[17px] leading-[1.5] text-white">{value}</dd>
            </div>
          ))}
          <div className="col-span-2 md:col-span-1">
            <dt className="font-mono text-[13px] uppercase tracking-[0.1em] text-white/45">Stack</dt>
            <dd className="mt-3">
              <ul className="grid grid-cols-1 gap-x-8 gap-y-1.5 text-[17px] leading-[1.5] text-white sm:grid-cols-2">
                {meta.stack.map((item) => (
                  <li
                    key={item}
                    className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-white"
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
