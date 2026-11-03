"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "context", label: "Context & role" },
  { id: "problem", label: "Problem" },
  { id: "challenge", label: "Challenge & strategy" },
  { id: "personas", label: "User persona" },
  { id: "goals", label: "Goals & constraints" },
  { id: "process", label: "Process" },
  { id: "features", label: "Features" },
  { id: "design-decisions", label: "Design decisions" },
  { id: "design-system", label: "Design system" },
  { id: "implementation", label: "Implementation & design" },
  { id: "results", label: "Results" },
  { id: "learnings", label: "Learnings" },
  { id: "final-product", label: "Final product" },
];

// Fixed sidebar with the sections of a project; the current one follows the scroll.
export function ProjectSidebar() {
  // Only the sections this project actually has, known after mount.
  const [items, setItems] = useState<typeof SECTIONS>([]);
  const [active, setActive] = useState(SECTIONS[0].id);
  // After a click the chosen section stays active until the reader scrolls by hand.
  const locked = useRef(false);
  // The menu that replaces the sidebar on small screens.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // The page behind the open menu stays still.
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  useEffect(() => {
    // Listed in the order they appear on the page, since a project can reorder its sections.
    const found = SECTIONS.filter((s) => document.getElementById(s.id)).sort((a, b) =>
      document.getElementById(a.id)!.compareDocumentPosition(document.getElementById(b.id)!) & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1,
    );
    // The page is server-rendered, so which sections exist is only known after mount.
    // A section can bring its own short label, for projects whose titles differ from the defaults.
    const labelled = found.map((s) => ({ ...s, label: document.getElementById(s.id)?.dataset.nav ?? s.label }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(labelled);

    const titleTop = (id: string) =>
      (document.getElementById(id)?.querySelector("h2") ?? document.getElementById(id))?.getBoundingClientRect().top ?? 0;

    const update = () => {
      if (locked.current) return;
      // The active section is the last one whose title has passed a line near the top of the viewport.
      const line = window.innerHeight * 0.35;
      let current = found[0]?.id ?? "";
      for (const s of found) if (titleTop(s.id) <= line) current = s.id;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = found[found.length - 1]?.id ?? current;
      }
      setActive(current);
    };
    const release = () => {
      locked.current = false;
    };

    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchmove", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchmove", release);
      window.removeEventListener("keydown", release);
    };
  }, []);

  const goTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Land on the section title, not on the empty space above it.
    const title = section.querySelector("h2") ?? section;
    const top = title.getBoundingClientRect().top + window.scrollY - 48;
    locked.current = true;
    setActive(id);
    setOpen(false);
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const sections = (
    <ul className="flex flex-col gap-3">
      {items.map((s) => {
        const isActive = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={goTo(s.id)}
              aria-current={isActive ? "true" : undefined}
              className={`flex items-center gap-3 text-[17px] transition-colors ${
                isActive ? "text-ink" : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                  isActive ? "bg-accent opacity-100" : "opacity-0"
                }`}
              />
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
  const current = items.find((s) => s.id === active)?.label;

  return (
    <>
      <aside className="fixed left-0 top-12 z-10 hidden h-[calc(100dvh-3rem)] w-64 flex-col px-6 lg:flex">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[17px] text-ink-muted transition-colors hover:text-ink"
        >
          <span aria-hidden="true">←</span> Back to home
        </Link>
        <nav aria-label="Project sections">{sections}</nav>
      </aside>

      {/* Below the large breakpoint the sidebar becomes a bar with a menu button that stays at the top. */}
      <div className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-line bg-paper/90 px-6 py-3 backdrop-blur lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 text-[15px] text-ink-muted transition-colors hover:text-ink">
          <span aria-hidden="true">←</span> Home
        </Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="project-sections-menu"
          className="flex min-w-0 items-center gap-3 text-[15px] text-ink"
        >
          <span className="truncate text-ink-muted">{current}</span>
          <span aria-hidden="true" className="relative h-3 w-5 flex-none">
            <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "top-[5px] rotate-45" : "top-0"}`} />
            <span className={`absolute left-0 top-[5px] h-[2px] w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[2px] w-5 bg-ink transition-transform ${open ? "top-[5px] -rotate-45" : "top-[10px]"}`} />
          </span>
          <span className="sr-only">{open ? "Close the sections menu" : "Open the sections menu"}</span>
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-20 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-paper/70 backdrop-blur-sm" />
          <nav
            id="project-sections-menu"
            aria-label="Project sections"
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-x-0 top-[49px] max-h-[calc(100dvh-49px)] overflow-y-auto border-b border-line bg-paper px-6 py-6"
          >
            {sections}
          </nav>
        </div>
      )}
    </>
  );
}
