"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HoverImagePreview } from "@/components/hover-image-preview";
import { labelClass } from "@/components/section-label";

gsap.registerPlugin(ScrollTrigger);

export type AccordionItem = {
  id: string;
  title: string;
  subtitle: string;
  // Small boxed note under the subtitle, such as "3 proofs".
  badge: string;
  content: ReactNode;
  // Shown next to the cursor while the row is hovered.
  image?: string;
};

// The vertical stroke of the plus folds away when the row opens (animated by the list).
function Toggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-200 ${
        open ? "border-ink bg-ink text-highlight" : "border-current bg-transparent group-hover:bg-surface-2/40"
      }`}
    >
      <span className="absolute h-[2px] w-4 bg-current" />
      <span data-accordion="plus" className="absolute h-4 w-[2px] bg-current" />
    </span>
  );
}

// Big numbered rows that open one at a time. The content of each row is passed in, so any section can use it.
// Rows with a picture show it next to the cursor, and the hovered header is drawn with a difference blend so the
// text stays readable on top of the picture.
export function AccordionList({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const images = Object.fromEntries(items.filter((item) => item.image).map((item) => [item.id, item.image as string]));
  const hasImages = Object.keys(images).length > 0;
  const list = useRef<HTMLUListElement>(null);

  // Rows rise into place as they scroll in.
  useEffect(() => {
    const rows = list.current?.querySelectorAll(":scope > li");
    if (!rows?.length) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(rows, { y: 48, autoAlpha: 0 });
      ScrollTrigger.batch(rows, {
        start: "top 85%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.09, clearProps: "transform" }),
      });
    });
    return () => mm.revert();
  }, []);

  // Opening a row draws the marker under its title, folds the plus into a minus and brings its columns up
  // one after the other. Closing reverses the marker and the plus.
  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    for (const row of root.querySelectorAll<HTMLElement>(":scope > li")) {
      const isOpen = row.dataset.id === open;
      const marker = row.querySelector("[data-accordion=marker]");
      const plus = row.querySelector("[data-accordion=plus]");
      gsap.to(marker, { scaleX: isOpen ? 1 : 0, duration: still ? 0 : 0.6, ease: "expo.out", overwrite: true });
      gsap.to(plus, { rotate: isOpen ? 90 : 0, scaleY: isOpen ? 0 : 1, duration: still ? 0 : 0.5, ease: "back.out(2)", overwrite: true });
      const columns = row.querySelectorAll("[data-accordion=columns] > *");
      if (isOpen && !still) {
        gsap.fromTo(columns, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, delay: 0.12, stagger: 0.1, ease: "power3.out", overwrite: true });
      }
    }
  }, [open]);

  return (
    <ul ref={list} className="border-t border-ink" onPointerLeave={() => setHovered(null)}>
      {hasImages && <HoverImagePreview images={images} active={hovered} />}
      {items.map((item, index) => {
        const isOpen = open === item.id;
        // The difference blend is only on while the picture is under the cursor. It needs a backdrop to blend with,
        // and a row that is still fading in would show its text as plain white.
        const blended = hasImages && !isOpen && hovered === item.id;
        return (
          <li key={item.id} data-id={item.id} className="border-b border-ink">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
              onClick={() => {
                setOpen(isOpen ? null : item.id);
                setHovered(null);
              }}
              onPointerEnter={() => !isOpen && setHovered(item.id)}
              onPointerLeave={() => setHovered((current) => (current === item.id ? null : current))}
              className={`group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-start gap-x-4 py-5 text-left md:grid-cols-[4rem_minmax(0,1fr)_auto_auto] md:items-center md:gap-x-8 ${
                blended ? "relative z-[45] text-white mix-blend-difference" : ""
              }`}
            >
              <span className={`${labelClass} pt-2 font-bold md:self-start`}>{String(index + 1).padStart(2, "0")}</span>

              <span data-shift="16" className="relative inline-block self-start">
                <span
                  aria-hidden="true"
                  data-accordion="marker"
                  className="absolute inset-x-0 bottom-[6%] h-[30%] origin-left scale-x-0 bg-highlight"
                />
                <span className="relative block font-display text-[clamp(3rem,9.5vw,9rem)] uppercase leading-[0.95]">
                  {item.title}
                </span>
              </span>

              <span className="hidden flex-col items-end gap-2 text-right md:flex">
                <span className={`${labelClass} font-bold`}>{item.subtitle}</span>
                <span className={`${labelClass} border border-current px-2 py-1 font-bold`}>{item.badge}</span>
              </span>

              <Toggle open={isOpen} />
            </button>

            <div
              id={`accordion-${item.id}`}
              role="region"
              aria-label={item.title}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="grid gap-10 pb-12 pt-4 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-x-8">
                  <div className="hidden md:block" />
                  <div
                    data-accordion="columns"
                    className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-12"
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
