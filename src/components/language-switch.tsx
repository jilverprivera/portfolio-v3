"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/i18n/locale-context";

// A small fixed toggle. The choice is kept in a cookie that the proxy reads, so the URL stays the same.
export function LanguageSwitch() {
  const current = useLocale();
  const t = useDictionary();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (locale: Locale) => {
    if (locale === current) return;
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    // Refreshing drops the client cache and asks the server again, which now answers in the new language.
    startTransition(() => router.refresh());
  };

  return (
    <div
      role="group"
      aria-label={t.language.label}
      aria-busy={pending}
      className="fixed bottom-4 right-4 z-40 flex items-center rounded-full border border-line-strong bg-paper/90 p-1 font-mono text-[12px] uppercase tracking-[0.1em] backdrop-blur sm:bottom-6 sm:right-6"
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => choose(locale)}
          aria-pressed={locale === current}
          title={locale === current ? undefined : t.language.switchTo}
          className={`rounded-full px-3 py-1.5 transition-colors ${
            locale === current ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
          }`}
        >
          {t.language.short[locale]}
        </button>
      ))}
    </div>
  );
}
