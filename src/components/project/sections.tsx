import type { ReactNode } from "react";
import { SectionFrame } from "@/components/project/section-frame";

type Props = { title: string; children: ReactNode };

// Resumen: el primer párrafo se presenta como lectura principal.
export function SummarySection({ title, children }: Props) {
  return (
    <SectionFrame id="summary" title={title} className="[&>div>p:first-child]:text-[22px] [&>div>p:first-child]:leading-[1.45] [&>div>p:first-child]:text-white">
      {children}
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
