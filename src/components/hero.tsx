import { HeroCornerIcon } from "./hero-corner-icon";

const topLineClass =
  "block text-[clamp(1.5rem,8.4vw,13rem)] font-extrabold leading-[0.76] tracking-[-0.02em] whitespace-nowrap";

const bottomLineClass =
  "block text-[clamp(2.5rem,13vw,13rem)] font-extrabold leading-[0.76]  whitespace-nowrap";

export function Hero() {
  return (
    <section className="relative flex min-h-dvh flex-col justify-between bg-paper p-8 select-none overflow-hidden">
      <div className="font-space-grotesk text-left uppercase text-ink space-y-16 mt-32">
        <h1 className={topLineClass}>ELECTRONICS ENGINEER.</h1>
        <h1 className={topLineClass}>SOFTWARE ENGINEER.</h1>
      </div>

      <div className="font-space-grotesk self-end text-right uppercase text-ink mb-32">
        <h2 className={bottomLineClass}>STRATEGY.</h2>
        <h2 className={bottomLineClass}>CREATIVE.</h2>
      </div>

     
    </section>
  );
}
