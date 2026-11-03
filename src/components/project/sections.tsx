import type { ReactNode } from "react";
import type { ProjectHighlight } from "@/content/projects";
import { SectionFrame } from "@/components/project/section-frame";

// `nav` is the short label for the sidebar when the title is too long for it.
type Props = { title: string; nav?: string; children: ReactNode };

// Resumen: el primer párrafo se presenta como lectura principal; las cifras clave van debajo.
export function SummarySection({ title, nav, children, highlights = [] }: Props & { highlights?: ProjectHighlight[] }) {
  return (
    <SectionFrame id="summary" title={title} nav={nav} className="[&>div>p:first-child]:text-[22px] [&>div>p:first-child]:leading-[1.45] [&>div>p:first-child]:text-ink">
      {children}
      {highlights.length > 0 && (
        <dl className="mt-10 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
          {highlights.map((h) => (
            <div key={h.label}>
              <dd data-motion="count" data-value={h.value} className="text-[48px] font-medium leading-none text-accent-text">{h.value}</dd>
              <dt className="mt-3 text-[15px] leading-[1.4] text-ink-muted">{h.label}</dt>
            </div>
          ))}
        </dl>
      )}
    </SectionFrame>
  );
}

// Objetivos: la lista se lee como una secuencia numerada con separadores.
export function ObjectivesSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="goals" title={title} nav={nav} className="[&_strong]:text-accent-text [&_li]:border-b [&_li]:border-line [&_li]:pb-3 [&_li:last-child]:border-b-0">
      {children}
    </SectionFrame>
  );
}

// Funcionalidades: las tablas por capacidad ocupan el ancho de la columna.
export function FeaturesSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="features" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Motivación: texto corrido, sin viñetas, con párrafos más amplios.
export function MotivationSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="motivation" title={title} nav={nav} className="[&_p]:text-[19px] [&_p]:leading-[1.7]">
      {children}
    </SectionFrame>
  );
}

// Implementación: cada subsección (h3) se separa con una línea fina.
export function ImplementationSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="implementation" title={title} nav={nav} className="[&_h3]:mt-6 [&_h3]:border-t [&_h3]:border-line [&_h3]:pt-8">
      {children}
    </SectionFrame>
  );
}

// Decisiones: la tabla explica el por qué de cada decisión.
export function DecisionsSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="decisions" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Limitaciones: lista de pendientes en tono sobrio.
export function LimitationsSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="limitations" title={title} nav={nav} className="[&_li]:text-[17px] [&_li]:text-ink-soft">
      {children}
    </SectionFrame>
  );
}

// Reto, estrategia y resultados: una sola sección con tres subsecciones separadas por una línea fina.
export function ChallengeSection({ title, nav, children }: Props) {
  return (
    <SectionFrame
      id="challenge"
      title={title} nav={nav}
      className="[&_h3]:mt-6 [&_h3]:border-t [&_h3]:border-line [&_h3]:pt-8 [&_h3:first-child]:mt-0 [&_h3:first-child]:border-t-0 [&_h3:first-child]:pt-0 [&_strong]:text-accent-text"
    >
      {children}
    </SectionFrame>
  );
}

// Personas de usuario: tarjetas ilustradas.
export function PersonasSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="personas" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Resultados: cierre de la página, con lo logrado y lo que sigue abierto.
export function ResultsSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="results" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Contexto y rol: cliente, equipo, duración y qué hizo cada quien.
export function ContextSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="context" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Problema: cómo funcionaba todo antes del producto y a quién le dolía.
export function ProblemSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="problem" title={title} nav={nav} className="[&_strong]:text-accent-text">
      {children}
    </SectionFrame>
  );
}

// Proceso: del problema al alcance, con lo que entró, lo que esperó y lo que se descartó.
export function ProcessSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="process" title={title} nav={nav} className="[&_h3]:mt-6 [&_h3]:border-t [&_h3]:border-line [&_h3]:pt-8">
      {children}
    </SectionFrame>
  );
}

// Decisiones de diseño: cada una con problema, decisión, costo y la imagen que la muestra.
export function DesignDecisionsSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="design-decisions" title={title} nav={nav} className="[&_strong]:text-accent-text">
      {children}
    </SectionFrame>
  );
}

// Sistema de diseño: el lenguaje visual compartido entre las pantallas del producto.
export function DesignSystemSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="design-system" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Aprendizajes: qué se haría distinto y qué sigue.
export function LearningsSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="learnings" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Producto final: una galería corta al cierre del caso.
export function FinalProductSection({ title, nav, children }: Props) {
  return (
    <SectionFrame id="final-product" title={title} nav={nav}>
      {children}
    </SectionFrame>
  );
}

// Dato que falta en el caso de estudio: visible solo en desarrollo, para no publicar marcadores.
export function Pending({ children }: { children: ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="rounded-[8px] border border-dashed border-accent bg-accent/5 px-5 py-4 text-[15px] leading-[1.55] text-ink-soft">
      <span className="mr-2 font-bold uppercase tracking-[0.12em] text-accent-text">Pendiente</span>
      {children}
    </div>
  );
}
