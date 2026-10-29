import type { ReactNode } from "react";
import ScrollReveal from "@/components/ScrollReveal";

// The word-by-word reveal used in "Who am I", with its settings, so any text can use it.
export function Reveal({
  as = "p",
  className = "",
  textClassName = "",
  children,
}: {
  as?: "h2" | "h3" | "p" | "span";
  className?: string;
  // Utility classes for the text itself. Prefix them with ! so they win over the component's own sizes.
  textClassName?: string;
  children: string;
}) {
  return (
    <ScrollReveal
      as={as}
      scrollContainerRef={undefined}
      baseOpacity={0.12}
      baseRotation={0}
      blurStrength={6}
      stagger={0.03}
      containerClassName={`!my-0 ${className}`}
      textClassName={textClassName}
    >
      {children}
    </ScrollReveal>
  );
}
