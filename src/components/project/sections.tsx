import type { ReactNode } from "react";
import type { ProjectHighlight } from "@/content/projects";
import { SectionFrame } from "@/components/project/section-frame";

type Props = { title: string; children: ReactNode };

// Resumen: el primer párrafo se presenta como lectura principal; las cifras clave van debajo.
export function SummarySection({ title, children, highlights = [] }: Props & { highlights?: ProjectHighlight[] }) {
  return (
    <SectionFrame id="summary" title={title} className="[&>div>p:first-child]:text-[22px] [&>div>p:first-child]:leading-[1.45] [&>div>p:first-child]:text-white">
      {children}
      {highlights.length > 0 && (
        <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-white/15 pt-10 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.label}>
              <dd className="text-[48px] font-medium leading-none text-white">{h.value}</dd>
              <dt className="mt-3 text-[15px] leading-[1.4] text-white/55">{h.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </SectionFrame>
  );
}

// Objetivos: la lista se lee como una secuencia numerada con separadores.
export function ObjectivesSection({ title, children }: Props) {
  return (
    <SectionFrame id="goals" title={title} className="[&_strong]:text-[#E7F451] [&_li]:border-b [&_li]:border-white/10 [&_li]:pb-3 [&_li:last-child]:border-b-0">
      {children}
    </SectionFrame>
  );
}

// Funcionalidades: las tablas por capacidad ocupan el ancho de la columna.
export function FeaturesSection({ title, children }: Props) {
  return (
    <SectionFrame id="features" title={title}>
      {children}
    </SectionFrame>
  );
}

// Motivación: texto corrido, sin viñetas, con párrafos más amplios.
export function MotivationSection({ title, children }: Props) {
  return (
    <SectionFrame id="motivation" title={title} className="[&_p]:text-[19px] [&_p]:leading-[1.7]">
      {children}
    </SectionFrame>
  );
}

// Implementación: cada subsección (h3) se separa con una línea fina.
export function ImplementationSection({ title, children }: Props) {
  return (
    <SectionFrame id="implementation" title={title} className="[&_h3]:mt-6 [&_h3]:border-t [&_h3]:border-white/10 [&_h3]:pt-8">
      {children}
    </SectionFrame>
  );
}

// Decisiones: la tabla explica el por qué de cada decisión.
export function DecisionsSection({ title, children }: Props) {
  return (
    <SectionFrame id="decisions" title={title}>
      {children}
    </SectionFrame>
  );
}

// Limitaciones: lista de pendientes en tono sobrio.
export function LimitationsSection({ title, children }: Props) {
  return (
    <SectionFrame id="limitations" title={title} className="[&_li]:text-[17px] [&_li]:text-white/80">
      {children}
    </SectionFrame>
  );
}

// Reto, estrategia y resultados: una sola sección con tres subsecciones separadas por una línea fina.
export function ChallengeSection({ title, children }: Props) {
  return (
    <SectionFrame
      id="challenge"
      title={title}
      className="[&_h3]:mt-6 [&_h3]:border-t [&_h3]:border-white/10 [&_h3]:pt-8 [&_h3:first-child]:mt-0 [&_h3:first-child]:border-t-0 [&_h3:first-child]:pt-0 [&_strong]:text-[#E7F451]"
    >
      {children}
    </SectionFrame>
  );
}

// Personas de usuario: tarjetas ilustradas.
export function PersonasSection({ title, children }: Props) {
  return (
    <SectionFrame id="personas" title={title}>
      {children}
    </SectionFrame>
  );
}

// Resultados: cierre de la página, con lo logrado y lo que sigue abierto.
export function ResultsSection({ title, children }: Props) {
  return (
    <SectionFrame id="results" title={title}>
      {children}
    </SectionFrame>
  );
}
