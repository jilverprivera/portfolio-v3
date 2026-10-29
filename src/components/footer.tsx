import { Reveal } from "@/components/reveal";

const EMAIL = "jilverrivera1@gmail.com";

// The page is prerendered, so this is the date of the last build.
const LAST_UPDATE = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Bogota",
});

const socials = [
  { label: "Github", href: "https://github.com/jilverprivera" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/jilverprivera" },
  { label: "Instagram", href: "https://www.instagram.com/jilverprivera" },
  { label: "X (Twitter)", href: "https://x.com/Jilverprivera" },
];

// The big sentence keeps the footer's size and weight, and the reveal only adds the motion.
const headline = "!text-[1em] !font-medium !leading-[1.05] !tracking-tight";

export function Footer() {
  return (
    <footer
      className="font-space-grotesk px-6 pt-32 text-ink sm:px-8"
      style={{ background: "var(--paper)" }}
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <div className="flex flex-col text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tight">
            <Reveal as="p" textClassName={headline}>
              Want to collaborate together?
            </Reveal>
            <div className="flex flex-wrap gap-x-[0.25em]">
              <Reveal as="span" textClassName={headline}>
                I&rsquo;d love to
              </Reveal>
              <a
                href={`mailto:${EMAIL}`}
                className="underline decoration-1 underline-offset-[0.12em] transition-colors hover:text-accent-text"
              >
                <Reveal as="span" textClassName={headline}>
                  connect.
                </Reveal>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
          <h2 className="sr-only">Find me on</h2>
          <ul className="flex flex-col lg:ml-auto lg:w-[60%]">
            {socials.map(({ label, href }) => (
              <li key={label} className="border-b border-line first:border-t-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-6 text-lg text-ink-muted transition-colors hover:text-ink"
                >
                  <Reveal as="span" textClassName="!text-lg !font-medium !leading-normal">
                    {label}
                  </Reveal>
                  <span
                    aria-hidden
                    className="translate-x-[-4px] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-24 flex flex-wrap items-center justify-center gap-x-1.5 border-t border-line py-8 text-center text-sm text-ink-soft">
        <Reveal as="span" textClassName="!text-sm !font-normal !leading-normal">{`Last update: ${LAST_UPDATE}`}</Reveal>
      </p>
    </footer>
  );
}
