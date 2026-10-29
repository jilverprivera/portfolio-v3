"use client";

import { motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { HoverImagePreview } from "@/components/hover-image-preview";
import { labelClass } from "@/components/section-label";

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

function Toggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex h-9 w-9 shrink-0 items-center justify-center border transition-colors duration-200 ${
        open ? "border-ink bg-ink text-highlight" : "border-current bg-transparent group-hover:bg-surface-2/40"
      }`}
    >
      <span className="absolute h-[2px] w-4 bg-current" />
      <span className={`absolute h-4 w-[2px] bg-current transition-transform duration-300 ${open ? "scale-y-0 rotate-90" : ""}`} />
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

  return (
    <ul className="border-t border-ink" onPointerLeave={() => setHovered(null)}>
      {hasImages && <HoverImagePreview images={images} active={hovered} />}
      {items.map((item, index) => {
        const isOpen = open === item.id;
        // The difference blend is only on while the picture is under the cursor. It needs a backdrop to blend with,
        // and a row that is still fading in would show its text as plain white.
        const blended = hasImages && !isOpen && hovered === item.id;
        return (
          <motion.li
            key={item.id}
            className="border-b border-ink"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
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

              <span className="relative inline-block self-start transition-transform duration-500 ease-out group-hover:translate-x-4">
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-[6%] h-[30%] origin-left bg-highlight transition-transform duration-500 ease-out ${
                    isOpen ? "scale-x-100" : "scale-x-0"
                  }`}
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
                  {/* The columns come up one after the other when the row opens. */}
                  <div
                    className={`grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.7fr)] lg:gap-12 [&>*]:transition-[opacity,transform] [&>*]:duration-700 [&>*]:ease-out [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-200 ${
                      isOpen ? "[&>*]:translate-y-0 [&>*]:opacity-100" : "[&>*]:translate-y-6 [&>*]:opacity-0 [&>*]:delay-0"
                    }`}
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
