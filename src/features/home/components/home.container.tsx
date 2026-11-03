import WarpText from "@/components/WarpText";
import { ScrollBadge } from "@/components/scroll-badge";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const warpProps = {
  fontFamily: "inherit",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 0.9,
  color: "#0a0a0a",
} as const;

export function HomeContainer({ lang }: { lang: Locale }) {
  const t = getDictionary(lang).home;
  return (
    <div
      className="font-space-grotesk uppercase text-ink relative flex min-h-dvh flex-col justify-between gap-12 p-8"
      style={
        {
          "--fs": "min(10vw, calc((100dvh - 7rem) / 3.9))",
        } as React.CSSProperties
      }
    >
      <h1 className="sr-only">{t.heading}</h1>
      <WarpText
        {...warpProps}
        text={t.warpTop}
        accentChar="+"
        accentColor="#ff1a4d"
        align="left"
        fontSize="var(--fs)"
        className="!min-h-[calc(var(--fs)*1.9)]"
        style={{}}
      />
      <div className="flex items-end justify-between gap-6">
        <ScrollBadge text={t.scroll} />
        <WarpText
          {...warpProps}
          text={t.warpBottom}
          align="right"
          fontSize="var(--fs)"
          className="!min-h-[calc(var(--fs)*1.9)] flex-1"
          style={{}}
        />
      </div>
    </div>
  );
}
