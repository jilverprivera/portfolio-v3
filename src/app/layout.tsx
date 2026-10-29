import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Anton, Space_Grotesk, Space_Mono } from "next/font/google";
import GlowCursor from "@/components/GlowCursor";
import { PageTransitions } from "@/components/page-transitions";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Jilver Pacheco | I create my own products and help design yours.",
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
      className={`${spaceGrotesk.variable} ${anton.variable} ${spaceMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
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
