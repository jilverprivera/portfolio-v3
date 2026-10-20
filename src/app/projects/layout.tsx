import type { ReactNode } from "react";
import Link from "next/link";
// Project views share the dark theme and Space Grotesk with the home page.
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-space-grotesk min-h-dvh bg-black text-white antialiased">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-black/90 px-6 py-6 text-[17px] text-white backdrop-blur">
        <Link href="/" className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-white">
          ← Home
        </Link>
      </header>
      <main>{children}</main>
      <footer className="mt-32 px-6 py-16 text-center text-[15px] text-white/55">
        © 2026 · Portfolio
      </footer>
    </div>
  );
}
