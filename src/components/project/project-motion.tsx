"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Formats a counted value the way it was written, so "1,100+" counts up as "1,100+".
// The value is read from data-value, not from the text, because the text itself is what gets animated.
function counter(el: HTMLElement) {
  const text = el.dataset.value ?? "";
  const match = text.match(/[\d,.]+/);
  if (!match) return null;
  const target = Number(match[0].replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  const [before, after] = [text.slice(0, match.index), text.slice((match.index ?? 0) + match[0].length)];
  const grouped = match[0].includes(",");
  return { target, render: (n: number) => `${before}${grouped ? Math.round(n).toLocaleString("en-US") : Math.round(n)}${after}` };
}

// Scroll-driven motion for a project detail, built with GSAP: the cover opens, titles rise letter by letter,
// blocks and images reveal as they enter, figures count up and a progress line follows the reading.
// Everything is skipped when the reader prefers reduced motion, and the page reads the same without it.
export function ProjectMotion() {
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = progress.current?.closest("article");
    if (!page) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = <T extends Element = HTMLElement>(selector: string) => Array.from(page.querySelectorAll<T & Element>(selector)) as unknown as T[];

      // Reading progress.
      gsap.to(progress.current, { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.4 } });

      // Opening: the cover unfolds from a smaller frame while its image settles, then the metadata follows.
      const cover = page.querySelector<HTMLElement>("[data-motion=cover]");
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (cover) {
        intro
          .fromTo(cover, { clipPath: "inset(14% 10% 14% 10% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 8px)", duration: 1.8 })
          .from(cover.querySelector("img"), { scale: 1.3, duration: 2.2 }, 0);
        // While it scrolls away, the image drifts a little slower than the page.
        gsap.to(cover.querySelector("img"), {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: cover, start: "top top", end: "bottom top", scrub: true },
        });
      }
      const meta = q("[data-motion=meta] > div");
      if (meta.length) intro.from(meta, { y: 28, autoAlpha: 0, stagger: 0.07, duration: 1.1 }, 0.5);
      // The sidebar fills its list after mount, so on the first run the items may not exist yet: the nav enters as a whole.
      const navItems = q("aside nav li");
      const nav = navItems.length ? navItems : q("aside nav");
      if (nav.length) intro.from(nav, { x: -18, autoAlpha: 0, stagger: 0.04, duration: 0.9 }, 0.3);

      // Section titles rise letter by letter from behind a mask.
      for (const title of q("section[id] > h2")) {
        const split = SplitText.create(title, { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 120,
          rotate: 10,
          duration: 1,
          ease: "power4.out",
          stagger: 0.02,
          scrollTrigger: { trigger: title, start: "top 88%", once: true },
        });
      }

      // Content blocks enter in small groups as they reach the viewport. Persona grids animate per card instead.
      const blocks = q("section[id] > div > *").filter((el) => !el.querySelector("[data-motion=persona]"));
      if (blocks.length) gsap.set(blocks, { y: 48, autoAlpha: 0 });
      ScrollTrigger.batch(blocks, {
        start: "top 90%",
        once: true,
        // The transform is cleared at the end so finished blocks do not stay as containing blocks for fixed elements.
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out", stagger: 0.09, overwrite: true, clearProps: "transform" }),
      });

      // Images open with a wipe while the picture settles inside its frame. The frame keeps showing its loader,
      // and the wipe only plays once the image is in view and has loaded.
      for (const frame of q("[data-motion=image]")) {
        const img = frame.querySelector("img");
        if (!img) continue;
        const reveal = gsap.timeline({ paused: true, onComplete: () => gsap.set(img, { clearProps: "clipPath,transform" }) });
        reveal
          .fromTo(img, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" })
          .fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: "expo.out" }, 0.2);
        const play = () => {
          if (img.complete && img.naturalWidth > 0) reveal.play();
          else img.addEventListener("load", () => reveal.play(), { once: true });
        };
        ScrollTrigger.create({ trigger: frame, start: "top 88%", once: true, onEnter: play });
      }

      // Personas pop in one after another, with a slight tilt that straightens out.
      const personas = q("[data-motion=persona]");
      if (personas.length) gsap.set(personas, { y: 70, rotate: -4, autoAlpha: 0 });
      ScrollTrigger.batch(personas, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { y: 0, rotate: 0, autoAlpha: 1, duration: 1.1, ease: "back.out(1.6)", stagger: 0.12, overwrite: true }),
      });

      // Key figures count up from zero.
      for (const el of q("[data-motion=count]")) {
        const count = counter(el);
        if (!count) continue;
        const state = { n: 0 };
        el.textContent = count.render(0);
        gsap.to(state, {
          // If the motion is undone (on leaving the page or when effects run twice), the figure is restored.
          onInterrupt: () => {
            el.textContent = count.render(count.target);
          },
          n: count.target,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = count.render(state.n);
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      }

      // Lazy images change the page height as they load, so positions are measured again.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const images = q<HTMLImageElement>("img");
      images.forEach((img) => img.addEventListener("load", refresh, { once: true }));
      return () => {
        window.removeEventListener("load", refresh);
        images.forEach((img) => img.removeEventListener("load", refresh));
      };
    });

    return () => {
      mm.revert();
      // The counters write their text directly, so it is put back to the real values.
      page.querySelectorAll<HTMLElement>("[data-motion=count]").forEach((el) => {
        if (el.dataset.value) el.textContent = el.dataset.value;
      });
    };
  }, []);

  return (
    <div
      ref={progress}
      aria-hidden="true"
      // GSAP drives the transform, so the starting scale is set inline rather than with a utility class.
      style={{ transform: "scaleX(0)" }}
      className="pointer-events-none fixed left-0 top-0 z-40 h-[2px] w-full origin-left bg-accent"
    />
  );
}
