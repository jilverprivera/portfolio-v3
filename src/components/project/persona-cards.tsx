import type { ReactNode } from "react";

type Tool = "bag" | "register" | "box" | "coat" | "tie" | "map" | "headset" | "magnifier" | "chip" | "chart";
type Hair = "short" | "long" | "bun" | "cap" | "curly" | "bob";

export type Persona = {
  name: string;
  does: string;
  where: string;
  tool: Tool;
  hair: Hair;
  skin: string;
  shirt: string;
  hairColor: string;
  glasses?: boolean;
};

const INK = "#15151b";
const ACCENT = "#ff1a4d";
const DEVICE = "#1d1f26";
const DEVICE_EDGE = "#3a3d48";

// Hair that sits behind the head and the shoulders.
function HairBack({ hair, color }: { hair: Hair; color: string }) {
  if (hair === "long")
    return <path d="M62 104C56 60 80 46 100 46s44 14 38 58l6 66H56z" fill={color} />;
  if (hair === "bob")
    return <path d="M64 104C58 62 80 48 100 48s42 14 36 56l2 30c-8 4-12-4-12-14H74c0 10-4 18-12 14z" fill={color} />;
  return null;
}

// Hair and headwear in front of the head.
function HairFront({ hair, color }: { hair: Hair; color: string }) {
  switch (hair) {
    case "long":
    case "bob":
      return <path d="M69 92c9-21 31-26 49-22 8 3 12 12 13 22-13-12-41-14-62 0z" fill={color} />;
    case "bun":
      return (
        <>
          <circle cx="100" cy="43" r="13" fill={color} />
          <path d="M68 96c-2-32 16-42 32-42s34 10 32 42c-6-14-16-20-32-20S74 82 68 96z" fill={color} />
        </>
      );
    case "curly":
      return (
        <>
          {[
            [72, 82, 12],
            [80, 66, 12],
            [100, 58, 13],
            [120, 66, 12],
            [128, 82, 12],
            [68, 98, 9],
            [132, 98, 9],
          ].map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill={color} />
          ))}
          <path d="M70 92c4-14 16-18 30-18s26 4 30 18c-9-9-18-12-30-12S79 83 70 92z" fill={color} />
        </>
      );
    case "cap":
      return (
        <>
          <path d="M66 94c0-34 18-44 34-44s34 10 34 44z" fill={color} />
          <path d="M106 92h46q6 0 3 6h-49z" fill="#000" opacity="0.28" />
          <path d="M106 92h46q6 0 3 6h-49z" fill={color} opacity="0.85" />
        </>
      );
    default:
      return <path d="M68 98c-4-34 14-46 32-46s36 12 32 46c-5-16-16-24-32-24s-27 8-32 24z" fill={color} />;
  }
}

// Objects the persona carries or wears, drawn in front of the figure.
function ToolShape({ tool }: { tool: Tool }) {
  switch (tool) {
    case "bag":
      return (
        <>
          <path d="M66 158l60 62" stroke={ACCENT} strokeWidth="6" opacity="0.9" />
          <g className="persona-tool">
            <path d="M126 174h38l4 42h-46z" fill={ACCENT} />
            <path d="M136 174c0-12 18-12 18 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <rect x="138" y="190" width="14" height="4" rx="2" fill={INK} opacity="0.35" />
          </g>
        </>
      );
    case "register":
      return (
        <g className="persona-tool">
          <rect x="108" y="176" width="58" height="40" rx="7" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <rect x="115" y="183" width="44" height="16" rx="3" fill={ACCENT} />
          {[118, 130, 142, 154].map((x) => (
            <rect key={x} x={x - 2} y="205" width="7" height="5" rx="1.5" fill="#6b6f7d" />
          ))}
        </g>
      );
    case "box":
      return (
        <g className="persona-tool">
          <rect x="58" y="182" width="84" height="44" rx="4" fill="#c9a36a" />
          <rect x="58" y="182" width="84" height="9" rx="2" fill="#a8834d" />
          <rect x="94" y="182" width="12" height="44" fill="#ecd9b0" opacity="0.85" />
          <rect x="112" y="200" width="22" height="12" rx="2" fill="#fff" opacity="0.8" />
        </g>
      );
    case "coat":
      return (
        <>
          <path d="M100 184L76 156 62 176l22 54h16z" fill="#fff" opacity="0.95" />
          <path d="M100 184l24-28 14 20-22 54h-16z" fill="#fff" opacity="0.9" />
          <path d="M100 184l24-28 14 20-22 54h-16z" fill="#000" opacity="0.08" />
          <path d="M92 150c0 18 14 30 14 30" stroke="#27a36d" strokeWidth="2.5" fill="none" />
          <g className="persona-tool">
            <rect x="122" y="190" width="26" height="32" rx="4" fill="#fff" />
            <rect x="133" y="196" width="4" height="18" fill="#27a36d" />
            <rect x="126" y="203" width="18" height="4" fill="#27a36d" />
          </g>
        </>
      );
    case "tie":
      return (
        <>
          <path d="M82 158l18 24 18-24-6-6h-24z" fill="#fff" opacity="0.92" />
          <path d="M94 168h12l-2 8h-8z" fill="#e0566b" />
          <path d="M96 176h8l4 36-8 6-8-6z" fill="#e0566b" />
          <path d="M96 176h8l4 36-8 6-8-6z" fill="#000" opacity="0.12" />
        </>
      );
    case "map":
      return (
        <g className="persona-tool">
          <rect x="112" y="176" width="54" height="40" rx="6" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <path d="M139 184c-7 0-11 5-11 10 0 8 11 15 11 15s11-7 11-15c0-5-4-10-11-10z" fill={ACCENT} />
          <circle cx="139" cy="194" r="3.6" fill={DEVICE} />
        </g>
      );
    case "headset":
      return (
        <>
          <path d="M66 100C64 58 82 44 100 44s36 14 34 56" fill="none" stroke="#1c1c22" strokeWidth="5" strokeLinecap="round" />
          <rect x="59" y="94" width="13" height="24" rx="6" fill="#1c1c22" />
          <rect x="128" y="94" width="13" height="24" rx="6" fill="#1c1c22" />
          <path d="M134 114c2 14-10 18-24 16" fill="none" stroke="#1c1c22" strokeWidth="3" strokeLinecap="round" />
          <circle cx="109" cy="130" r="4.5" fill={ACCENT} />
        </>
      );
    case "magnifier":
      return (
        <g className="persona-tool">
          <circle cx="148" cy="150" r="17" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="5" />
          <path d="M160 163l16 17" stroke={ACCENT} strokeWidth="7" strokeLinecap="round" />
          <path d="M139 144c3-5 8-7 13-6" stroke="#fff" strokeOpacity="0.6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      );
    case "chip":
      return (
        <g className="persona-tool">
          {[124, 136, 148, 160].map((x) => (
            <g key={x}>
              <rect x={x - 1.5} y="168" width="3" height="6" fill={ACCENT} />
              <rect x={x - 1.5} y="216" width="3" height="6" fill={ACCENT} />
            </g>
          ))}
          <rect x="114" y="174" width="56" height="44" rx="8" fill={DEVICE} stroke={ACCENT} strokeWidth="2" />
          <rect x="128" y="186" width="28" height="20" rx="4" fill={ACCENT} />
        </g>
      );
    case "chart":
      return (
        <g className="persona-tool">
          <rect x="108" y="172" width="62" height="46" rx="7" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <path d="M116 206l12-14 10 8 16-18 8 6" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="154" cy="188" r="3.5" fill={ACCENT} />
        </g>
      );
  }
}

function Character({ persona, uid, delay }: { persona: Persona; uid: string; delay: number }) {
  const { tool, hair, skin, shirt, hairColor, glasses } = persona;
  const timing = { animationDelay: `${delay}s` };
  const clip = `persona-clip-${uid}`;

  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={`Illustration of ${persona.name}`} className="h-full w-full">
      <defs>
        <clipPath id={clip}>
          <circle cx="100" cy="112" r="88" />
        </clipPath>
      </defs>

      <circle cx="100" cy="112" r="88" fill={shirt} fillOpacity="0.16" />
      <circle cx="100" cy="112" r="87" fill="none" stroke={shirt} strokeOpacity="0.45" strokeWidth="1.5" />

      <g className="persona-float" style={timing}>
        <g clipPath={`url(#${clip})`}>
          <HairBack hair={hair} color={hairColor} />

          {/* shoulders */}
          <path d="M24 232c0-52 32-76 76-76s76 24 76 76z" fill={shirt} />
          <path d="M100 156c44 0 76 24 76 76h-76z" fill="#000" opacity="0.14" />

          {/* neck and chest */}
          <path d="M86 128h28v30c0 8-6 18-14 22-8-4-14-14-14-22z" fill={skin} />
          <path d="M86 140c8 8 20 8 28 0v-12H86z" fill="#000" opacity="0.16" />

          {/* head */}
          <circle cx="69" cy="104" r="6.5" fill={skin} />
          <circle cx="131" cy="104" r="6.5" fill={skin} />
          <ellipse cx="100" cy="100" rx="30" ry="35" fill={skin} />
          <path d="M100 65c17 0 30 15 30 35 0 18-10 33-30 35z" fill="#000" opacity="0.07" />

          {/* face */}
          <g className="persona-blink" style={timing}>
            <ellipse cx="88" cy="102" rx="2.4" ry="3" fill={INK} />
            <ellipse cx="112" cy="102" rx="2.4" ry="3" fill={INK} />
          </g>
          <path d="M82 94c3-3 8-3.500 12-1.500M106 92.500c4-2 9-1.500 12 1.500" stroke={hairColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <path d="M100 106c-3 6-2.500 8 1 8" stroke="#000" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M92 120c5 4 11 4 16 0" stroke={INK} strokeOpacity="0.6" strokeWidth="2.4" strokeLinecap="round" fill="none" />

          {glasses && (
            <g fill="none" stroke={INK} strokeWidth="2.6">
              <rect x="77" y="94" width="21" height="17" rx="7" />
              <rect x="102" y="94" width="21" height="17" rx="7" />
              <path d="M98 101h4M77 100l-8-2M123 100l8-2" strokeLinecap="round" />
            </g>
          )}

          <HairFront hair={hair} color={hairColor} />
        </g>
        {/* Objects sit outside the avatar circle, so they can break its edge. */}
        <ToolShape tool={tool} />
      </g>
    </svg>
  );
}

// Animated illustrations of the personas of a project, in a flat editorial style.
export function PersonaCards({ items }: { items: Persona[] }): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((persona, index) => (
        <article
          key={persona.name}
          className="flex flex-col gap-6 rounded-[16px] border border-line bg-surface p-6"
        >
          <div className="mx-auto h-48 w-48">
            <Character persona={persona} uid={String(index)} delay={index * 0.4} />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-[20px] font-medium leading-tight text-ink">{persona.name}</h4>
            <p className="text-[15px] leading-[1.55] text-ink-muted">{persona.does}</p>
            <p className="text-[14px] leading-[1.5] text-accent-text">{persona.where}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
