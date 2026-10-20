type HeroCornerIconProps = {
  className?: string;
};

export function HeroCornerIcon({ className }: HeroCornerIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Arrowhead (L-Shape at bottom-right) */}
      <path
        d="M56 16V56H16"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Diagonal Stem */}
      <path
        d="M24 24L49.5 49.5"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="square"
      />
    </svg>
  );
}
