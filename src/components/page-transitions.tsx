"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const FALLBACK_MS = 2500;

type Origin = { x: number; y: number };

// Module state shared between the listeners and the layout effect.
let renderedPath = "";
let waiting: { path: string; resolve: () => void } | null = null;
let lastOrigin: Origin | null = null;

function canAnimate() {
  return (
    typeof document.startViewTransition === "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

const DURATION_MS = 900;
const EASING = "cubic-bezier(0.76, 0, 0.24, 1)";
const BORDER_PX = 1.5;
const POINTS = 28;

// An erratic outline: a few low harmonics plus per-point jitter, as radius factors around 1.
function randomShape() {
  const harmonics = [2, 3, 5, 7].map((n) => ({
    n,
    amp: (0.09 / Math.sqrt(n)) * (0.6 + Math.random() * 0.8),
    phase: Math.random() * Math.PI * 2,
  }));
  return Array.from({ length: POINTS }, (_, i) => {
    const angle = (i / POINTS) * Math.PI * 2 + (Math.random() - 0.5) * 0.12;
    let factor = 1;
    for (const h of harmonics) factor += h.amp * Math.sin(h.n * angle + h.phase);
    factor += (Math.random() - 0.5) * 0.05;
    return { angle, factor };
  });
}

type Shape = ReturnType<typeof randomShape>;

function outline(shape: Shape, origin: Origin, radius: number, extra: number) {
  return shape.map(({ angle, factor }) => ({
    x: origin.x + Math.cos(angle) * (radius * factor + extra),
    y: origin.y + Math.sin(angle) * (radius * factor + extra),
  }));
}

type Point = { x: number; y: number };

// A closed Catmull-Rom spline through the points, as cubic Bezier segments, so the edge is smooth.
function smoothPath(points: Point[]) {
  const n = points.length;
  const f = (v: number) => v.toFixed(1);
  let d = `M${f(points[0].x)} ${f(points[0].y)}`;
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];
    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
    d += ` C${f(c1.x)} ${f(c1.y)} ${f(c2.x)} ${f(c2.y)} ${f(p2.x)} ${f(p2.y)}`;
  }
  return `${d}Z`;
}

const blobClip = (points: Point[]) => `path("${smoothPath(points)}")`;

// The old page is clipped to "everything except the outline", using an even-odd path.
const holeClip = (points: Point[]) =>
  `path(evenodd, "M0 0H${window.innerWidth}V${window.innerHeight}H0Z ${smoothPath(points)}")`;

function setOrigin(origin: Origin) {
  const root = document.documentElement;
  root.style.setProperty("--vt-x", `${origin.x}px`);
  root.style.setProperty("--vt-y", `${origin.y}px`);
}

function clearOrigin() {
  const root = document.documentElement;
  root.style.removeProperty("--vt-x");
  root.style.removeProperty("--vt-y");
}

function animateReveal(origin: Origin) {
  const root = document.documentElement;
  const farthest = Math.hypot(
    Math.max(origin.x, window.innerWidth - origin.x),
    Math.max(origin.y, window.innerHeight - origin.y),
  );
  // Large enough that even the smallest radius factor still covers the farthest corner.
  const finalRadius = farthest * 1.5;
  const shape = randomShape();

  const from = outline(shape, origin, 0, 2);
  const to = outline(shape, origin, finalRadius, 0);
  const ringFrom = outline(shape, origin, 0, 2 + BORDER_PX);
  const ringTo = outline(shape, origin, finalRadius, BORDER_PX);

  const options = { duration: DURATION_MS, easing: EASING, fill: "both" as const };
  root.animate({ clipPath: [blobClip(from), blobClip(to)] }, { ...options, pseudoElement: "::view-transition-new(root)" });
  root.animate({ clipPath: [holeClip(ringFrom), holeClip(ringTo)] }, { ...options, pseudoElement: "::view-transition-old(root)" });
}

// Runs the reveal from `origin` while `navigate` (if any) changes the route.
// The page only stays frozen until the target route has rendered, or FALLBACK_MS at most.
function reveal(targetPath: string, origin: Origin, navigate?: () => void) {
  setOrigin(origin);
  const transition = document.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        const timer = setTimeout(resolve, FALLBACK_MS);
        const done = () => {
          clearTimeout(timer);
          waiting = null;
          resolve();
        };
        navigate?.();
        if (renderedPath === targetPath) done();
        else waiting = { path: targetPath, resolve: done };
      }),
  );
  transition.ready.then(() => animateReveal(origin)).catch(() => {});
  transition.finished.finally(clearOrigin);
}

function isInternalNavigation(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.defaultPrevented || event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname;
}

export function PageTransitions() {
  const pathname = usePathname();
  const router = useRouter();

  useLayoutEffect(() => {
    renderedPath = pathname;
    if (waiting && waiting.path === pathname) waiting.resolve();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!canAnimate()) return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor || !isInternalNavigation(event, anchor)) return;

      event.preventDefault();
      event.stopPropagation();
      const url = new URL(anchor.href, window.location.href);
      const origin = { x: event.clientX, y: event.clientY };
      lastOrigin = origin;
      reveal(url.pathname, origin, () => router.push(url.pathname + url.search + url.hash));
    };

    // Browser back and forward: Next handles the navigation, we only wrap it.
    const onPopState = () => {
      if (!canAnimate() || window.location.pathname === renderedPath) return;
      const origin = lastOrigin ?? { x: window.innerWidth / 2, y: window.innerHeight / 2 };
      reveal(window.location.pathname, origin);
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  return null;
}
