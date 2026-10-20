"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "challenge", label: "Challenge & strategy" },
  { id: "personas", label: "User persona" },
  { id: "features", label: "Features" },
  { id: "implementation", label: "Implementation & design" },
  { id: "results", label: "Results" },
];

// Fixed sidebar with the sections of a project; the current one follows the scroll.
export function ProjectSidebar() {
  // Only the sections this project actually has, known after mount.
  const [items, setItems] = useState<typeof SECTIONS>([]);
  const [active, setActive] = useState(SECTIONS[0].id);
  // After a click the chosen section stays active until the reader scrolls by hand.
  const locked = useRef(false);

  useEffect(() => {
    // Listed in the order they appear on the page, since a project can reorder its sections.
    const found = SECTIONS.filter((s) => document.getElementById(s.id)).sort((a, b) =>
      document.getElementById(a.id)!.compareDocumentPosition(document.getElementById(b.id)!) & Node.DOCUMENT_POSITION_FOLLOWING
        ? -1
        : 1,
    );
    // The page is server-rendered, so which sections exist is only known after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(found);

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
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <aside className="fixed left-0 top-12 z-10 hidden h-[calc(100dvh-3rem)] w-64 flex-col px-6 lg:flex">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-[17px] text-white/70 transition-colors hover:text-white"
      >
        <span aria-hidden="true">←</span> Back to home
      </Link>
      <nav aria-label="Project sections">
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
