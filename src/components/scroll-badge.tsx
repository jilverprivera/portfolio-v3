"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { gsap } from "gsap";
import CircularText from "@/components/CircularText";

const MIN_SIZE = 112;
const MAX_SIZE = 280;

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

const getSize = () =>
  Math.round(
    Math.min(
      MAX_SIZE,
      Math.max(MIN_SIZE, Math.min(window.innerWidth * 0.13, window.innerHeight * 0.3)),
    ),
  );

export function ScrollBadge({ text }: { text: string }) {
  const size = useSyncExternalStore(subscribe, getSize, () => 160);
  const arrow = useRef<SVGSVGElement>(null);

  // The arrow fades in after the ring has started turning.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(arrow.current, { autoAlpha: 0, duration: 1.4, delay: 0.5, ease: "power1.out" });
    });
    return () => mm.revert();
  }, []);

  return (
    <CircularText
      text={text}
      size={size}
      fontSize={size * 0.1}
      fontWeight={700}
      spinDuration={20}
      className="!m-0 shrink-0"
      onHover="slowDown"
      color="#0a0a0a"
    >
      <svg
        ref={arrow}
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden
        style={{ width: size * 0.34, height: size * 0.34 }}
      >
        {/* Tail node */}
        <rect x="5" y="5" width="7" height="7" stroke="currentColor" strokeWidth="2" />
        {/* Dashed lead-in */}
        <path d="M17 17L27 27" stroke="currentColor" strokeWidth="2" strokeDasharray="2 4" />
        {/* Stem */}
        <path d="M31 31L53 53" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        {/* Arrowhead */}
        <path d="M58 30V58H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
        {/* Inner echo of the head */}
        <path d="M50 32V50H32" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.45" />
        {/* Tip accent */}
        <rect x="55" y="55" width="6" height="6" fill="currentColor" />
      </svg>
    </CircularText>
  );
}
