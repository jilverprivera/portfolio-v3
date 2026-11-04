import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import GlowCursor from "@/components/GlowCursor";
import { PageTransitions } from "@/components/page-transitions";
import { LanguageSwitch } from "@/components/language-switch";
import { MicroInteractions } from "@/components/micro-interactions";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";

// Regular and medium are loaded too: with only the bold file, text set to normal or medium also rendered bold.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Both languages are prerendered; the proxy picks one per visitor without changing the URL.
// Any other first segment is a 404, so a file request that misses, such as a stale service worker asking for
// /sw.js, never renders the pages with a language that does not exist.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return { title: t.meta.title, description: t.meta.description };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html
      lang={lang}
      className={`${spaceGrotesk.variable} ${anton.variable} ${spaceMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Loading a page always starts at the top instead of where it was left or at a #section in the URL
            (public/scroll-top.js). An async script with a src is hoisted to the head as a resource, while an inline
            one makes React warn whenever the layout renders again on the client. */}
        <script src="/scroll-top.js" async />
        <LocaleProvider locale={lang}>
          {children}
          <LanguageSwitch />
        </LocaleProvider>
        <GlowCursor
          color="#ff1a4d"
          secondaryColor="#4a38f5"
          theme="light"
          blendMode="normal"
          className="!fixed !inset-0 !h-dvh !w-auto z-50 pointer-events-none"
          style={{}}
        >
          {null}
        </GlowCursor>
        <PageTransitions />
        <MicroInteractions />
        <Analytics />
      </body>
    </html>
  );
}
