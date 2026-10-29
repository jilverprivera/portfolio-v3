"use client";

import { useEffect, useRef } from "react";
import { ImageThumb, type ModalImage } from "@/components/project/image-modal";

// Backgrounds for the device scenes: flat gradients, so nothing but the phones and the page behind them is drawn.
export type Tone = "green" | "forest" | "cream" | "mint" | "dark";

const TONES: Record<Tone, string> = {
  green: "linear-gradient(160deg, #b7e286 0%, #8cc765 100%)",
  forest: "linear-gradient(160deg, #1f3a2b 0%, #12231a 100%)",
  cream: "linear-gradient(160deg, #f7f2e6 0%, #e9e2d0 100%)",
  mint: "linear-gradient(160deg, #dcf1cf 0%, #bde0a6 100%)",
  dark: "linear-gradient(160deg, #1d211f 0%, #0e1110 100%)",
};

// The device frame, drawn with CSS. Children are the screen (an image or a video) and fill it.
export function PhoneFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[2.4rem] border border-line bg-[#1b1b1d] p-[6px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)] ${className}`}
    >
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-paper">{children}</div>
    </div>
  );
}

type SceneProps = { phones: ModalImage[]; tone: Tone };

// One to three phone screens side by side over a flat background. Click a screen to open it in the large viewer.
export function DeviceScene({ phones, tone }: SceneProps) {
  const middle = phones.length === 3 ? 1 : -1;
  return (
    <div
      className="flex w-full items-center justify-center gap-[4%] overflow-hidden rounded-[8px] border border-line px-[4%]"
      style={{ background: TONES[tone], aspectRatio: phones.length === 3 ? "16 / 9" : "1 / 1" }}
    >
      {phones.map((phone, index) => (
        <PhoneFrame
          key={phone.src}
          className={index === middle ? "h-[94%]" : phones.length === 3 ? "h-[84%]" : "h-[90%]"}
        >
          <ImageThumb
            image={phone}
            className="block h-full hover:opacity-90"
            imgClassName="block h-full w-auto max-w-none"
          />
        </PhoneFrame>
      ))}
    </div>
  );
}

type PhoneItem = ModalImage & { caption?: string };

// Phone screens in a grid, each one inside a device frame with its name and a short description below.
// Click a screen to open it in the large viewer.
export function PhoneGallery({ items }: { items: PhoneItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <figure key={item.src} className="flex flex-col gap-5">
          <PhoneFrame className="mx-auto w-full max-w-[340px]">
            <ImageThumb
              image={item}
              className="block w-full hover:opacity-90"
              imgClassName="block h-auto w-full"
            />
          </PhoneFrame>
          <figcaption className="mx-auto flex w-full max-w-[340px] flex-col gap-1">
            <span className="text-[18px] font-medium text-ink">{item.title}</span>
            {item.caption && <span className="text-[15px] leading-[1.5] text-ink-muted">{item.caption}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

const CLIP_TONES: Tone[] = ["green", "forest", "cream"];

type Clip = { src: string; title: string; caption?: string };

// A silent looping clip. It plays only while it is on screen, so a page with many clips stays light.
function LoopVideo({ src, label }: { src: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className="block aspect-[720/1566] h-full w-auto max-w-none"
    />
  );
}

// Short screen recordings of the app in use, played as loops (the same idea as a GIF, in a much lighter file).
export function MotionGallery({ items }: { items: Clip[] }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <figure key={item.src} className="flex flex-col gap-4">
          <div
            className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[8px] border border-line"
            style={{ background: TONES[CLIP_TONES[index % CLIP_TONES.length]] }}
          >
            <PhoneFrame className="h-[92%]">
              <LoopVideo src={item.src} label={item.title} />
            </PhoneFrame>
          </div>
          <figcaption className="flex flex-col gap-1">
            <span className="text-[18px] font-medium text-ink">{item.title}</span>
            {item.caption && <span className="text-[15px] leading-[1.5] text-ink-muted">{item.caption}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
