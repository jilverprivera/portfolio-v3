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

export function Footer() {
  return (
    <footer
      className="font-space-grotesk px-6 pt-32 text-white sm:px-8"
      style={{ background: "linear-gradient(to bottom, #000 0, #0d0d0d 16rem)" }}
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-8">
        <div>
          <p className="text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] tracking-tight">
            Want to collaborate together?
            <br />
            I&rsquo;d love to{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="underline decoration-1 underline-offset-[0.12em] transition-colors hover:text-[#E7F451]"
            >
              connect
            </a>
            .
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-0">
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] leading-none tracking-tight text-white/85">
            Find me on
          </h2>
          <ul className="flex flex-col lg:w-[60%]">
            {socials.map(({ label, href }) => (
              <li key={label} className="border-b border-white/15 first:border-t-0">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-6 text-lg text-white/55 transition-colors hover:text-white"
                >
                  {label}
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

      <p className="mt-24 flex flex-wrap items-center justify-center gap-x-1.5 border-t border-white/15 py-8 text-center text-sm text-white/80">
        Last update: {LAST_UPDATE}
      </p>
    </footer>
  );
}
