import { Reveal } from "@/components/reveal";

// Mono label that opens a home section: a dark tag with accent text, and corner crosshairs
// that sit on the top corners of the section's content box.
export const labelClass = "font-label text-[11px] uppercase tracking-[0.12em]";

function Crosshair({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`absolute h-4 w-4 text-ink ${className}`}>
      <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

type Marks = "both" | "left" | "right" | "none";

// `marks` picks which top corners get a crosshair, for labels that share a row.
export function SectionLabel({ children, marks = "both" }: { children: string; marks?: Marks }) {
  return (
    <div className="relative">
      {(marks === "both" || marks === "left") && <Crosshair className="-left-3 -top-3" />}
      {(marks === "both" || marks === "right") && <Crosshair className="-right-3 -top-3" />}
      <p className="flex items-center gap-3">
        <span className={`${labelClass} bg-ink px-2 py-1 font-bold text-accent`}>{children}</span>
      </p>
    </div>
  );
}

// Label, big display heading and a small note, shared by the home sections that use the numbered rows.
export function SectionHeader({ label, title, note }: { label: string; title: string; note: string }) {
  return (
    <>
      <SectionLabel>{label}</SectionLabel>
      <Reveal
        as="h2"
        className="!mt-4"
        textClassName="!font-display !text-[clamp(2.75rem,8vw,7.5rem)] !font-normal uppercase !leading-[0.92] !tracking-[-0.01em]"
      >
        {title}
      </Reveal>
      <Reveal
        className="!mt-6 max-w-md text-ink-muted"
        textClassName={`${labelClass} !text-[11px] !font-normal !leading-[1.7]`}
      >
        {note}
      </Reveal>
    </>
  );
}
