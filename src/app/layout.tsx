import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import GlowCursor from "@/components/GlowCursor";
import { PageTransitions } from "@/components/page-transitions";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Brand designer & art director portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <GlowCursor
          color="#ffffff"
          secondaryColor="#7aa2ff"
          blendMode="screen"
          className="!fixed !inset-0 !h-dvh !w-screen z-50 pointer-events-none"
          style={{}}
        >
          {null}
        </GlowCursor>
        <PageTransitions />
      </body>
    </html>
  );
}
