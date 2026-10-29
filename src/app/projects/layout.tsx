import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
// Project views share the dark theme and Space Grotesk with the home page.
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-space-grotesk min-h-dvh bg-paper text-ink antialiased">
      <main className="pb-32">{children}</main>
      <Footer />
    </div>
  );
}
