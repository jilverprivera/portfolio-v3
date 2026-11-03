"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Locale } from "./config";
import { getDictionary, type Dictionary } from "./dictionaries";

const LocaleContext = createContext<Locale>("en");

// Client components read the current language from here; the layout provides it from the route.
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = (): Locale => useContext(LocaleContext);

export const useDictionary = (): Dictionary => getDictionary(useContext(LocaleContext));
