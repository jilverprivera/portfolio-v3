import type { ReactNode } from "react";
import { Footer } from "@/components/footer";

// The experience view shares the dark theme and Space Grotesk with the rest of the site.
export default function ExperienceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-space-grotesk min-h-dvh bg-paper text-ink antialiased">
      <main className="pb-32">{children}</main>
      <Footer />
    </div>
  );
}
