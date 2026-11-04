"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/locale-context";

// A small fixed toggle. The choice is kept in a cookie that the proxy reads, so the URL stays the same.
export function LanguageSwitch() {
  const current = useLocale();
  const t = useDictionary();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  // The pill moves as soon as a language is picked, without waiting for the page to come back in it.
  const [picked, setPicked] = useState<Locale | null>(null);
  const shown = pending && picked ? picked : current;
  const group = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  // The dark pill slides under the chosen language. The first time it is only placed, without motion.
  useEffect(() => {
    const button = group.current?.querySelector<HTMLElement>(`[data-locale=${shown}]`);
    if (!button || !pill.current) return;
    const still = !placed.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.to(pill.current, {
      x: button.offsetLeft,
      width: button.offsetWidth,
      autoAlpha: 1,
      duration: still ? 0 : 0.55,
      ease: "expo.out",
      overwrite: true,
    });
    placed.current = true;
  }, [shown]);

  const choose = (locale: Locale) => {
    if (locale === current) return;
    setPicked(locale);
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // Refreshing drops the client cache and asks the server again, which now answers in the new language.
    startTransition(() => router.refresh());
  };

  return (
    <div
      ref={group}
      data-magnetic="0.2"
      role="group"
      aria-label={t.language.label}
      aria-busy={pending}
      className="fixed bottom-4 right-4 z-40 flex items-center rounded-full border border-line-strong bg-paper/90 p-1 font-mono text-[12px] uppercase tracking-[0.1em] backdrop-blur sm:bottom-6 sm:right-6"
    >
      <span ref={pill} aria-hidden="true" className="invisible absolute left-0 top-1 bottom-1 rounded-full bg-ink" />
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          data-locale={locale}
          data-press
          onClick={() => choose(locale)}
          aria-pressed={locale === current}
          title={locale === current ? undefined : t.language.switchTo}
          className={`relative rounded-full px-3 py-1.5 transition-colors duration-300 ${
            locale === shown ? "text-paper" : "text-ink-muted hover:text-ink"
          }`}
        >
          {t.language.short[locale]}
        </button>
      ))}
    </div>
  );
}
