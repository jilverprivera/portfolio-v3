import type { Locale } from "@/i18n/config";
import { Footer } from "@/components/footer";

// The experience view shares the dark theme and Space Grotesk with the rest of the site.
export default async function ExperienceLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  return (
    <div className="font-space-grotesk min-h-dvh bg-paper text-ink antialiased">
      <main className="pb-32">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
