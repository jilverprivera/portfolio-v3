import type { MDXComponents } from "mdx/types";
import { ProjectTable } from "@/components/project/project-table";
import { DiagramGallery, DiagramRow, ScreenshotGallery } from "@/components/project/diagram-gallery";
import { PhoneGallery, MotionGallery } from "@/components/project/phone-gallery";
import { PersonaCards } from "@/components/project/persona-cards";
import {
  SummarySection,
  ChallengeSection,
  ResultsSection,
  PersonasSection,
  ObjectivesSection,
  FeaturesSection,
  MotivationSection,
  ImplementationSection,
  DecisionsSection,
  LimitationsSection,
} from "@/components/project/sections";

// Tipografía y elementos del Markdown dentro de los proyectos (tema claro, columna de lectura).
const typography: MDXComponents = {
  h3: ({ children }) => (
    <h3 className="pt-6 text-[17px] font-medium leading-snug text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[18px] leading-[1.65] text-ink-soft">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="flex list-none flex-col gap-3 pl-0 text-[18px] leading-[1.6] text-ink-soft">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="flex list-decimal flex-col gap-3 pl-6 text-[18px] leading-[1.6] text-ink-soft marker:text-ink-muted">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink">
      {children}
    </li>
  ),
  strong: ({ children }) => <strong className="font-medium text-ink">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="rounded-[4px] bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l border-line pl-5 text-ink-muted">{children}</blockquote>
  ),
  hr: () => <hr className="my-6 border-line" />,
  table: ({ children }) => <ProjectTable>{children}</ProjectTable>,
  th: ({ children }) => (
    <th className="border-b border-line px-4 py-3 align-top text-[14px] font-medium text-ink-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line px-4 py-3 align-top text-ink-soft">{children}</td>
  ),
};

export function useMDXComponents(): MDXComponents {
  return {
    ...typography,
    DiagramGallery,
    DiagramRow,
    ScreenshotGallery,
    PhoneGallery,
    MotionGallery,
    PersonaCards,
    SummarySection,
    ChallengeSection,
    ResultsSection,
    PersonasSection,
    ObjectivesSection,
    FeaturesSection,
    MotivationSection,
    ImplementationSection,
    DecisionsSection,
    LimitationsSection,
  };
}
