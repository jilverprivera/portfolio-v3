"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useDictionary } from "@/i18n/locale-context";

export type ModalImage = { src: string; title: string; width: number; height: number };

// Large viewer for project images. It closes with the button, the Esc key or a click outside the image.
// Clicking the image toggles between fitting the screen and its full size.
// It opens with the backdrop fading in while the image rises and grows into place, and closes by playing that backwards.

export function ImageModal({ image, onClose }: { image: ModalImage; onClose: () => void }) {
  const t = useDictionary().project;
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const motion = useRef<gsap.core.Timeline | null>(null);
  const closing = useRef(false);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    motion.current = gsap
      .timeline({ defaults: { duration: still ? 0 : 0.5 } })
      .fromTo(backdrop.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: still ? 0 : 0.3, ease: "power2.out" })
      .fromTo(frame.current, { y: 24, scale: 0.94 }, { y: 0, scale: 1, ease: "expo.out" }, 0)
      .fromTo(closeRef.current, { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, ease: "back.out(2.5)" }, 0.12);
    return () => {
      motion.current?.kill();
    };
  }, []);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const timeline = motion.current;
    if (!timeline) return onClose();
    timeline.eventCallback("onReverseComplete", onClose).timeScale(1.6).reverse();
  }, [onClose]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && requestClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [requestClose]);

  // Rendered on the body: an ancestor with a transform (the scroll animations use them) would otherwise
  // trap a fixed element inside it instead of letting it cover the screen.
  return createPortal(
    <div
      ref={backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className="invisible fixed inset-0 z-[100] flex items-center justify-center bg-stage/90 p-4 sm:p-8"
      onClick={requestClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        aria-label={t.close}
        data-press
        className="fixed right-4 top-4 z-[101] flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-paper text-[20px] leading-none text-ink transition-colors hover:border-ink sm:right-6 sm:top-6"
      >
        ✕
      </button>

      <div
        ref={frame}
        className={`max-h-full max-w-full rounded-[8px] ${zoomed ? "overflow-auto" : "overflow-hidden"}`}
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.title}
          width={image.width}
          height={image.height}
          onClick={() => setZoomed((value) => !value)}
          className={
            zoomed
              ? "h-auto max-w-none cursor-zoom-out"
              : "h-auto max-h-[88vh] w-auto max-w-[94vw] cursor-zoom-in object-contain"
          }
          style={zoomed ? { width: image.width } : undefined}
        />
      </div>

      <p className="pointer-events-none fixed bottom-4 left-0 right-0 text-center text-[14px] text-ink-muted">
        {image.title}
      </p>
    </div>,
    document.body,
  );
}

// Thumbnail button that opens the modal. Until its image loads it shows a loader in the space the image will take,
// and it marks itself with data-loaded so the scroll animation can wait for the picture.
export function ImageThumb({
  image,
  className = "",
  imgClassName = "",
}: {
  image: ModalImage;
  className?: string;
  imgClassName?: string;
}) {
  const t = useDictionary().project;
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const frame = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = img.current;
    if (!el) return;
    // An image already in the cache can finish before React attaches onLoad.
    if (el.complete && el.naturalWidth > 0) return setLoaded(true);
    // The scroll animation keeps the image clipped until it loads, and the browser never lazy-loads a clipped
    // image. So the frame around it, which is never clipped, starts the download as it gets near the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        el.loading = "eager";
        observer.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    if (frame.current) observer.observe(frame.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <button
        ref={frame}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.openLarge(image.title)}
        aria-busy={!loaded}
        data-motion="image"
        data-loaded={loaded}
        data-press
        className={`relative cursor-zoom-in text-left transition-colors ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={img}
          src={image.src}
          alt={image.title}
          width={image.width}
          height={image.height}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          // A failed image hides the loader too, instead of spinning forever.
          onError={() => setLoaded(true)}
          className={`${imgClassName} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        {!loaded && (
          <span aria-hidden="true" className="image-loader absolute inset-0 flex items-center justify-center rounded-[inherit]">
            <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
          </span>
        )}
      </button>
      {open && <ImageModal image={image} onClose={() => setOpen(false)} />}
    </>
  );
}
