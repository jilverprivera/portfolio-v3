"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "goals", label: "Goals" },
  { id: "features", label: "Features" },
  { id: "motivation", label: "Motivation" },
  { id: "implementation", label: "Implementation" },
  { id: "decisions", label: "Decisions" },
  { id: "limitations", label: "Limitations" },
];

// Fixed sidebar with the sections of a project; the current one follows the scroll.
export function ProjectSidebar() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const found = SECTIONS.filter((s) => document.getElementById(s.id));

    const update = () => {
      // The active section is the last one whose top has passed a line near the top of the viewport.
      const line = window.innerHeight * 0.3;
      let current = found[0]?.id ?? "";
      for (const s of found) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = found[found.length - 1]?.id ?? current;
      }
      setActive(current);
    };

    const first = requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <aside className="fixed left-0 top-24 z-10 hidden h-[calc(100dvh-6rem)] w-64 flex-col px-6 lg:flex">
      <nav aria-label="Project sections">
        <ul className="flex flex-col gap-3">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={goTo(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex items-center gap-3 text-[17px] transition-colors ${
                    isActive ? "text-white" : "text-white/45 hover:text-white/80"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                      isActive ? "bg-[#E7F451] opacity-100" : "opacity-0"
                    }`}
                  />
                  {s.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
