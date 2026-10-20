import type { ReactNode } from "react";

type SectionFrameProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

// Contenedor común de cada sección: columna de lectura centrada, título pequeño y cuerpo.
export function SectionFrame({ id, title, className = "", children }: SectionFrameProps) {
  return (
    <section
      id={id}
      className={`w-full scroll-mt-24 px-6 md:px-12 pt-24 md:pt-40 ${className}`}
    >
      <h2 className="text-[22px] font-bold uppercase leading-7 tracking-[0.12em] text-[#E7F451]">{title}</h2>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </section>
  );
}
