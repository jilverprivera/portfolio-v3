import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import GlowCursor from "@/components/GlowCursor";
import { PageTransitions } from "@/components/page-transitions";
import { LanguageSwitch } from "@/components/language-switch";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
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
        <LocaleProvider locale={lang}>
          {children}
          <LanguageSwitch />
        </LocaleProvider>
        <GlowCursor
          color="#ff1a4d"
          secondaryColor="#4a38f5"
          theme="light"
          blendMode="normal"
          className="!fixed !inset-0 !h-dvh !w-screen z-50 pointer-events-none"
          style={{}}
        >
          {null}
        </GlowCursor>
        <PageTransitions />
        <Analytics />
      </body>
    </html>
  );
}
