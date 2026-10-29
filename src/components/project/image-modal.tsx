"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ModalImage = { src: string; title: string; width: number; height: number };

// Large viewer for project images. It closes with the button, the Esc key or a click outside the image.
// Clicking the image toggles between fitting the screen and its full size.
const FADE_MS = 220;

export function ImageModal({ image, onClose }: { image: ModalImage; onClose: () => void }) {
  const [zoomed, setZoomed] = useState(false);
  // `visible` drives the fade: false while mounting and while closing.
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const requestClose = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    setVisible(false);
    window.setTimeout(onClose, FADE_MS);
  }, [onClose]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-stage/90 p-4 transition-opacity ease-out sm:p-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
      onClick={requestClose}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={requestClose}
        aria-label="Close"
        className="fixed right-4 top-4 z-[101] flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-paper text-[20px] leading-none text-ink transition-colors hover:border-ink sm:right-6 sm:top-6"
      >
        ✕
      </button>

      <div
        className={`max-h-full max-w-full rounded-[8px] transition-transform ease-out ${zoomed ? "overflow-auto" : "overflow-hidden"} ${
          visible ? "scale-100" : "scale-[0.97]"
        }`}
        style={{ transitionDuration: `${FADE_MS}ms` }}
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
    </div>
  );
}

// Thumbnail button that opens the modal.
export function ImageThumb({
  image,
  className = "",
  imgClassName = "",
}: {
  image: ModalImage;
  className?: string;
  imgClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Open ${image.title} in a large viewer`}
        className={`cursor-zoom-in text-left transition-colors ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image.src}
          alt={image.title}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={imgClassName}
        />
      </button>
      {open && <ImageModal image={image} onClose={() => setOpen(false)} />}
    </>
  );
}
