import WarpText from "@/components/WarpText";
import { ScrollBadge } from "@/components/scroll-badge";

const warpProps = {
  fontFamily: "inherit",
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 0.9,
  color: "#ffffff",
} as const;

export function HomeContainer() {
  return (
    <div
      className="font-space-grotesk uppercase text-white relative flex min-h-dvh flex-col justify-between gap-12 p-8"
      style={
        {
          "--fs": "min(10vw, calc((100dvh - 7rem) / 3.9))",
        } as React.CSSProperties
      }
    >
      <h1 className="sr-only">
        Software Engineer + Electronic Engineer, Strategy. Creative.
      </h1>
      <WarpText
        {...warpProps}
        text={"SOFTWARE ENGINEER\n+ ELECTRONIC ENGINEER"}
        accentChar="+"
        accentColor="#E7F451"
        align="left"
        fontSize="var(--fs)"
        className="!min-h-[calc(var(--fs)*1.9)]"
        style={{}}
      />
      <div className="flex items-end justify-between gap-6">
        <ScrollBadge />
        <WarpText
          {...warpProps}
          text={"STRATEGY.\nCREATIVE."}
          align="right"
          fontSize="var(--fs)"
          className="!min-h-[calc(var(--fs)*1.9)] flex-1"
          style={{}}
        />
      </div>
    </div>
  );
}
