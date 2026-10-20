import type { ProjectMeta } from "@/content/projects";
import { CoverImage } from "@/components/project/cover-image";

// Encabezado del proyecto: fecha y estado, título, portada, metadatos y cifras clave.
export function ProjectHero({ meta }: { meta: ProjectMeta }) {
  return (
    <header className="pt-32 md:pt-[200px]">
      <div className="w-full px-6 md:px-12 text-center">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-white/55">
          <span>{meta.year}</span>
          <span aria-hidden="true">·</span>
          <span>{meta.status}</span>
        </div>
        <h1 className="mt-8 text-[36px] font-medium leading-[1.4] text-white">{meta.title}</h1>
      </div>

      <div className="mt-16 w-full px-6 md:px-12">
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

      <div className="mt-16 grid w-full grid-cols-[120px_1fr] gap-x-6 gap-y-5 px-6 md:px-12 md:grid-cols-[160px_1fr]">
        <span className="text-[14px] text-white/55">Type</span>
        <span className="text-[16px] text-white">{meta.type}</span>
        <span className="text-[14px] text-white/55">Status</span>
        <span className="text-[16px] text-white">{meta.status}</span>
        <span className="text-[14px] text-white/55">Stack</span>
        <span className="text-[16px] leading-[1.6] text-white/70">{meta.stack.join(" · ")}</span>
      </div>

      {meta.highlights.length > 0 && (
        <dl className="mt-20 grid w-full grid-cols-1 gap-10 px-6 md:px-12 text-center sm:grid-cols-3">
          {meta.highlights.map((h) => (
            <div key={h.label}>
              <dt className="text-[15px] leading-[1.4] text-white/55">{h.label}</dt>
              <dd className="mt-3 text-[48px] font-medium leading-none text-white">{h.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
