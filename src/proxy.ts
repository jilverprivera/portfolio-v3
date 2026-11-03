import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, locales, type Locale } from "@/i18n/config";

// The first language in Accept-Language that the site supports, ignoring regions (es-CO -> es).
function fromHeader(header: string | null): Locale | undefined {
  if (!header) return undefined;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.map((r) => r.lang).find(isLocale);
}

// Every page lives under /[lang], but the URL never shows it: the request is rewritten to the
// visitor's language, taken from their cookie or, on the first visit, from the browser.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // A prefixed URL (an old link, or typed by hand) sets the language and drops the prefix.
  const prefixed = locales.find((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (prefixed) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(prefixed.length + 1) || "/";
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, prefixed, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookie) ? cookie : (fromHeader(request.headers.get("accept-language")) ?? defaultLocale);

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.rewrite(url);
  // The same URL serves two languages, so caches must keep them apart.
  response.headers.set("Vary", "Cookie, Accept-Language");
  return response;
}

export const config = {
  // Pages only: not Next internals, API routes or files with an extension (images, fonts, favicon).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
