// Text that rolls up on hover: a second copy waits below the first and both move up together.
// MicroInteractions moves them when the link or button around it is hovered.
// The copy is hidden from screen readers, so the text is read once.
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden align-top ${className}`}>
      <span data-roll-line className="block">
        {children}
      </span>
      <span data-roll-line aria-hidden="true" className="absolute left-0 top-full block">
        {children}
      </span>
    </span>
  );
}
