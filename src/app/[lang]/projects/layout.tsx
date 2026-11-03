import type { Locale } from "@/i18n/config";
import { Footer } from "@/components/footer";
import { ProjectFooterFrame } from "@/components/project/project-footer-frame";
// Project views share the dark theme and Space Grotesk with the home page.
export default async function ProjectsLayout({ children, params }: LayoutProps<"/[lang]">) {
  const lang = (await params).lang as Locale;
  return (
    <div className="font-space-grotesk min-h-dvh bg-paper text-ink antialiased">
      <main className="pb-32">{children}</main>
      <ProjectFooterFrame>
        <Footer lang={lang} />
      </ProjectFooterFrame>
    </div>
  );
}
