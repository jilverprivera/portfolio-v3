"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

// Small hover and press responses for the whole site, driven by GSAP and opted into with data attributes,
// so server components can use them without becoming client components:
// - data-magnetic="0.3": the element leans toward the cursor and springs back when it leaves.
// - data-press: the element sinks a little while pressed.
// - data-lift: the element rises a few pixels on hover.
// - data-shift="16": the element slides right on hover, by that many pixels (8 by default).
// - data-nudge="ne" | "e" | "w": an arrow inside a link leaves on one side and comes back from the other.
// - data-roll-line: the two lines of a RollText swap on hover.
// - data-zoom: the image inside the hovered element grows slightly.
// Hover effects start from the closest link or button, so the whole link reacts, not only the part under the cursor.
// Nothing runs on touch screens or when the reader prefers reduced motion.

const TRIGGER = "a, button, [data-hover]";

const NUDGE: Record<string, [number, number]> = { ne: [1, -1], e: [1, 0], w: [-1, 0] };

function enter(target: Element) {
  const all = <T extends Element = Element>(selector: string) => [
    ...(target.matches(selector) ? [target as T] : []),
    ...target.querySelectorAll<T>(selector),
  ];
  const lines = target.querySelectorAll("[data-roll-line]");
  if (lines.length) gsap.to(lines, { yPercent: -100, duration: 0.5, ease: "expo.out", overwrite: true });
  for (const el of all("[data-lift]")) gsap.to(el, { y: -4, duration: 0.45, ease: "power3.out", overwrite: "auto" });
  for (const el of all<HTMLElement>("[data-shift]")) gsap.to(el, { x: Number(el.dataset.shift) || 8, duration: 0.45, ease: "power3.out", overwrite: "auto" });
  for (const el of target.querySelectorAll("[data-zoom] img")) gsap.to(el, { scale: 1.05, duration: 0.9, ease: "power3.out", overwrite: "auto" });
  for (const el of target.querySelectorAll<HTMLElement>("[data-nudge]")) {
    const [dx, dy] = NUDGE[el.dataset.nudge ?? "e"] ?? NUDGE.e;
    gsap
      .timeline({ overwrite: true })
      .to(el, { x: dx * 14, y: dy * 14, autoAlpha: 0, duration: 0.18, ease: "power2.in" })
      .set(el, { x: -dx * 14, y: -dy * 14 })
      .to(el, { x: 0, y: 0, autoAlpha: 1, duration: 0.4, ease: "back.out(2.5)" });
  }
}

function leave(target: Element) {
  const all = (selector: string) => [...(target.matches(selector) ? [target] : []), ...target.querySelectorAll(selector)];
  const lines = target.querySelectorAll("[data-roll-line]");
  if (lines.length) gsap.to(lines, { yPercent: 0, duration: 0.5, ease: "expo.out", overwrite: true });
  for (const el of [...all("[data-lift]"), ...all("[data-shift]")]) {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" });
  }
  for (const el of target.querySelectorAll("[data-zoom] img")) gsap.to(el, { scale: 1, duration: 0.9, ease: "power3.out", overwrite: "auto" });
}

export function MicroInteractions() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference) and (hover: hover)", () => {
      let magnet: HTMLElement | null = null;

      const release = (el: HTMLElement) =>
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: "auto" });

      const onMove = (event: PointerEvent) => {
        const el = (event.target as Element | null)?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet && magnet !== el) release(magnet);
        magnet = el;
        if (!el) return;
        // Measured without the current offset, so the pull is always relative to where the element rests.
        const box = el.getBoundingClientRect();
        const x = Number(gsap.getProperty(el, "x"));
        const y = Number(gsap.getProperty(el, "y"));
        const strength = Number(el.dataset.magnetic) || 0.3;
        gsap.to(el, {
          x: (event.clientX - (box.left - x + box.width / 2)) * strength,
          y: (event.clientY - (box.top - y + box.height / 2)) * strength,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      // pointerover and pointerout bubble, so one pair of listeners covers every link; moves inside the same link are ignored.
      const onOver = (event: PointerEvent) => {
        const target = (event.target as Element | null)?.closest(TRIGGER);
        if (target && !target.contains(event.relatedTarget as Node | null)) enter(target);
      };
      const onOut = (event: PointerEvent) => {
        const target = (event.target as Element | null)?.closest(TRIGGER);
        if (target && !target.contains(event.relatedTarget as Node | null)) leave(target);
      };

      let pressed: HTMLElement | null = null;
      const onDown = (event: PointerEvent) => {
        pressed = (event.target as Element | null)?.closest<HTMLElement>("[data-press]") ?? null;
        if (pressed) gsap.to(pressed, { scale: 0.96, duration: 0.15, ease: "power2.out", overwrite: "auto" });
      };
      const onUp = () => {
        if (pressed) gsap.to(pressed, { scale: 1, duration: 0.6, ease: "elastic.out(1.1, 0.45)", overwrite: "auto" });
        pressed = null;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);
      document.addEventListener("pointerdown", onDown);
      document.addEventListener("pointerup", onUp);
      document.addEventListener("pointercancel", onUp);
      return () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        document.removeEventListener("pointerout", onOut);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("pointercancel", onUp);
      };
    });
    return () => mm.revert();
  }, []);

  return null;
}
