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
const IRIS = "#4a3426";
const LIPS = "#b45a54";

// Shared gradients: a soft light from the top left and shadow towards the edges, laid over flat colors
// so every skin, hair and shirt color gets the same volume.
function Defs({ uid, shirt }: { uid: string; shirt: string }) {
  return (
    <defs>
      <clipPath id={`clip-${uid}`}>
        <circle cx="100" cy="112" r="88" />
      </clipPath>
      <radialGradient id={`bg-${uid}`} cx="35%" cy="25%" r="85%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="100%" stopColor={shirt} stopOpacity="0.28" />
      </radialGradient>
      <radialGradient id={`light-${uid}`} cx="38%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.28" />
        <stop offset="55%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
      </radialGradient>
      <linearGradient id={`hair-${uid}`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
        <stop offset="45%" stopColor="#fff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
      </linearGradient>
      <linearGradient id={`cloth-${uid}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.22" />
      </linearGradient>
    </defs>
  );
}

// Hair that sits behind the head and the shoulders.
function HairBack({ hair, color, uid }: { hair: Hair; color: string; uid: string }) {
  const shapes: Partial<Record<Hair, string>> = {
    long: "M64 102C56 58 78 44 100 44s46 14 36 58l8 70c-12 10-28 8-34-4H90c-6 12-22 14-34 4z",
    bob: "M64 104C56 60 78 46 100 46s44 14 36 58l2 34c-8 8-20 6-22-4H84c-2 10-14 12-22 4z",
  };
  const d = shapes[hair];
  if (!d) return null;
  return (
    <>
      <path d={d} fill={color} />
      <path d={d} fill={`url(#hair-${uid})`} />
    </>
  );
}

// Hair and headwear in front of the head, with a few strands for texture.
function HairFront({ hair, color, uid }: { hair: Hair; color: string; uid: string }) {
  const strands = (d: string) => (
    <path d={d} fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="1.4" strokeLinecap="round" />
  );
  const shine = (d: string) => (
    <path d={d} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="2" strokeLinecap="round" />
  );
  const fill = (d: string) => (
    <>
      <path d={d} fill={color} />
      <path d={d} fill={`url(#hair-${uid})`} />
    </>
  );

  switch (hair) {
    case "long":
    case "bob":
      return (
        <>
          {fill("M68 100c-2-30 14-44 34-44 22 0 34 16 31 44-6-14-16-22-30-24-12 6-24 12-35 24z")}
          {strands("M100 60c-6 6-14 14-20 26M112 60c4 8 10 16 18 22")}
          {shine("M86 66c6-4 14-5 20-4")}
        </>
      );
    case "bun":
      return (
        <>
          {fill("M100 30a14 14 0 1 1 0 28 14 14 0 0 1 0-28z")}
          {strands("M92 40c4-4 12-4 16 0")}
          {fill("M68 100c-3-32 14-46 32-46s35 14 32 46c-4-16-14-26-32-27-18 1-28 11-32 27z")}
          {strands("M84 62c-6 8-10 18-12 28M100 56v14M116 62c6 8 10 18 12 28")}
          {shine("M84 64c8-5 20-6 30-2")}
        </>
      );
    case "curly":
      return (
        <>
          {[
            [70, 84, 11],
            [76, 68, 12],
            [90, 58, 12],
            [106, 55, 13],
            [122, 64, 12],
            [130, 80, 11],
            [66, 100, 8],
            [134, 98, 8],
          ].map(([x, y, r]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={r} fill={color} />
              <circle cx={x} cy={y} r={r} fill={`url(#hair-${uid})`} />
              <path
                d={`M${x - r / 2} ${y}a${r / 2} ${r / 2} 0 0 1 ${r} 0`}
                fill="none"
                stroke="#000"
                strokeOpacity="0.2"
                strokeWidth="1.3"
              />
            </g>
          ))}
          {strands("M82 72c6-4 12-5 18-5s12 1 18 5")}
        </>
      );
    case "cap":
      return (
        <>
          {fill("M68 104c-1-8 0-14 2-18h60c2 4 3 10 2 18-2-6-4-9-6-10H74c-2 1-4 4-6 10z")}
          <path d="M67 92c0-26 15-38 33-38s33 12 33 38z" fill={color} />
          <path d="M67 92c0-26 15-38 33-38s33 12 33 38z" fill={`url(#hair-${uid})`} />
          <path d="M100 54v38M84 58c-4 10-6 22-6 34M116 58c4 10 6 22 6 34" stroke="#000" strokeOpacity="0.14" strokeWidth="1.3" fill="none" />
          <circle cx="100" cy="55" r="2.6" fill={color} />
          <rect x="92" y="74" width="16" height="10" rx="2.5" fill="#f2c94c" />
          <path d="M95.500 79h9" stroke="#a67c2e" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M68 90c20-4 44-4 64 0 6 1 8 6 3 9-10 4-22 6-35 6s-25-2-35-6c-5-3-3-8 3-9z" fill={color} />
          <path d="M68 90c20-4 44-4 64 0 6 1 8 6 3 9-10 4-22 6-35 6s-25-2-35-6c-5-3-3-8 3-9z" fill="#000" opacity="0.25" />
          <path d="M72 93c18-3 38-3 56 0" stroke="#fff" strokeOpacity="0.18" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </>
      );
    default:
      return (
        <>
          {fill("M68 100c-4-34 12-48 33-48 22 0 37 14 31 48-3-12-8-20-14-24-12 4-28 4-40 0-5 5-8 12-10 24z")}
          {strands("M80 62c-4 4-8 10-9 18M96 56c-2 6-2 12 0 18M114 58c4 4 8 10 10 18")}
          {shine("M86 60c8-4 18-4 26-1")}
        </>
      );
  }
}

// Objects the persona carries or wears, drawn in front of the figure.
function ToolShape({ tool }: { tool: Tool }) {
  switch (tool) {
    case "bag":
      return (
        <>
          <path d="M70 160l58 58" stroke="#7a1c2e" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <g className="persona-tool">
            <path d="M124 174h40l5 44h-50z" fill={ACCENT} />
            <path d="M124 174h40l5 44h-50z" fill="#000" opacity="0.12" />
            <path d="M144 174h20l5 44h-25z" fill="#fff" opacity="0.08" />
            <path d="M134 174c0-14 20-14 20 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
            <rect x="136" y="190" width="16" height="4" rx="2" fill="#fff" opacity="0.45" />
          </g>
        </>
      );
    case "register":
      return (
        <g className="persona-tool">
          <rect x="108" y="176" width="58" height="40" rx="7" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <rect x="115" y="183" width="44" height="16" rx="3" fill={ACCENT} />
          <path d="M119 191h20" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" strokeLinecap="round" />
          {[118, 130, 142, 154].map((x) => (
            <rect key={x} x={x - 2} y="205" width="7" height="5" rx="1.5" fill="#6b6f7d" />
          ))}
        </g>
      );
    case "box":
      return (
        <g className="persona-tool">
          <rect x="58" y="180" width="84" height="46" rx="4" fill="#c9a36a" />
          <path d="M58 180h84l-6 10H64z" fill="#a8834d" />
          <rect x="94" y="180" width="12" height="46" fill="#ecd9b0" opacity="0.85" />
          <rect x="112" y="200" width="22" height="12" rx="2" fill="#fff" opacity="0.85" />
          <path d="M116 204h14M116 208h9" stroke="#8a8273" strokeWidth="1.2" />
          <rect x="58" y="180" width="84" height="46" rx="4" fill="#000" opacity="0.06" />
        </g>
      );
    case "coat":
      return (
        <>
          <path d="M100 184L76 154 60 176l22 54h18z" fill="#fff" />
          <path d="M100 184l24-30 16 22-22 54h-18z" fill="#f1f1f1" />
          <path d="M100 184L76 154l-6 8 22 26z" fill="#000" opacity="0.06" />
          <path d="M90 150c0 18 14 30 14 30" stroke="#27a36d" strokeWidth="2.5" fill="none" />
          <g className="persona-tool">
            <rect x="122" y="190" width="26" height="32" rx="4" fill="#fff" stroke="#e2e2e2" />
            <rect x="133" y="196" width="4" height="18" fill="#27a36d" />
            <rect x="126" y="203" width="18" height="4" fill="#27a36d" />
          </g>
        </>
      );
    case "tie":
      return (
        <>
          <path d="M80 156l20 26 20-26-6-6H86z" fill="#fff" />
          <path d="M80 156l20 26-4-24-10-8z" fill="#000" opacity="0.06" />
          <path d="M94 166h12l-2 9h-8z" fill="#c8384f" />
          <path d="M96 175h8l5 38-9 7-9-7z" fill="#e0566b" />
          <path d="M100 175h4l5 38-9 7z" fill="#000" opacity="0.14" />
          <path d="M97 186l8 4M96 198l10 4" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.5" />
        </>
      );
    case "map":
      return (
        <g className="persona-tool">
          <rect x="112" y="176" width="54" height="40" rx="6" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <path d="M118 206l10-8 10 6 12-10 10 6" fill="none" stroke="#4a4f5c" strokeWidth="2" />
          <path d="M139 182c-7 0-11 5-11 10 0 8 11 15 11 15s11-7 11-15c0-5-4-10-11-10z" fill={ACCENT} />
          <circle cx="139" cy="192" r="3.6" fill={DEVICE} />
        </g>
      );
    case "headset":
      return (
        <>
          <path d="M64 100C62 56 82 42 100 42s38 14 36 58" fill="none" stroke="#1c1c22" strokeWidth="5" strokeLinecap="round" />
          <rect x="57" y="92" width="14" height="26" rx="7" fill="#1c1c22" />
          <rect x="129" y="92" width="14" height="26" rx="7" fill="#1c1c22" />
          <rect x="60" y="96" width="4" height="16" rx="2" fill="#fff" opacity="0.18" />
          <path d="M136 114c2 16-10 20-26 18" fill="none" stroke="#1c1c22" strokeWidth="3" strokeLinecap="round" />
          <circle cx="109" cy="132" r="4.5" fill={ACCENT} className="persona-pulse" />
        </>
      );
    case "magnifier":
      return (
        <g className="persona-tool">
          <circle cx="148" cy="150" r="17" fill="#fff" fillOpacity="0.35" stroke={ACCENT} strokeWidth="5" />
          <path d="M160 163l16 17" stroke={INK} strokeWidth="8" strokeLinecap="round" />
          <path d="M160 163l16 17" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round" />
          <path d="M139 144c3-5 8-7 13-6" stroke="#fff" strokeOpacity="0.8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
          <rect x="128" y="186" width="28" height="20" rx="4" fill={ACCENT} className="persona-pulse" />
        </g>
      );
    case "chart":
      return (
        <g className="persona-tool">
          <rect x="108" y="172" width="62" height="46" rx="7" fill={DEVICE} stroke={DEVICE_EDGE} strokeWidth="1.5" />
          <path d="M116 206l12-14 10 8 16-18 8 6" fill="none" stroke={ACCENT} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="154" cy="188" r="3.5" fill={ACCENT} className="persona-pulse" />
        </g>
      );
  }
}

function Eye({ x }: { x: number }) {
  return (
    <g>
      <path d={`M${x - 5.5} 101c2-3.2 3.6-4.2 5.5-4.2s3.5 1 5.5 4.2c-2 2.4-3.6 3.2-5.5 3.2s-3.5-.8-5.5-3.2z`} fill="#fff" />
      <g className="persona-look">
        <circle cx={x} cy="100.6" r="2.9" fill={IRIS} />
        <circle cx={x} cy="100.6" r="1.4" fill={INK} />
        <circle cx={x + 1} cy="99.6" r="0.75" fill="#fff" />
      </g>
      <path d={`M${x - 6} 100.8c2-3.6 3.8-4.6 6-4.6s4 1 6 4.6`} fill="none" stroke={INK} strokeWidth="1.9" strokeLinecap="round" />
    </g>
  );
}

function Character({ persona, uid, delay }: { persona: Persona; uid: string; delay: number }) {
  const { tool, hair, skin, shirt, hairColor, glasses } = persona;
  const timing = { animationDelay: `${delay}s` };
  const face = "M70 98c0-24 13-38 30-38s30 14 30 38c0 22-12 40-30 40s-30-18-30-40z";

  return (
    <svg viewBox="0 0 200 220" role="img" aria-label={`Illustration of ${persona.name}`} className="h-full w-full overflow-visible">
      <Defs uid={uid} shirt={shirt} />

      <circle cx="100" cy="112" r="88" fill={`url(#bg-${uid})`} />
      <circle cx="100" cy="112" r="87" fill="none" stroke={shirt} strokeOpacity="0.4" strokeWidth="1.5" />

      <g className="persona-float" style={timing}>
        <g clipPath={`url(#clip-${uid})`}>
          <g className="persona-head" style={timing}>
            <HairBack hair={hair} color={hairColor} uid={uid} />
          </g>

          {/* body: shoulders with a collar, breathing slowly */}
          <g className="persona-breathe" style={timing}>
            <path d="M22 236c0-54 34-80 78-80s78 26 78 80z" fill={shirt} />
            <path d="M22 236c0-54 34-80 78-80s78 26 78 80z" fill={`url(#cloth-${uid})`} />
            <path d="M54 196c4 10 6 24 6 40M146 196c-4 10-6 24-6 40" stroke="#000" strokeOpacity="0.12" strokeWidth="2" fill="none" />
            <path d="M84 152c4 12 10 18 16 20 6-2 12-8 16-20" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* neck, with the shadow the jaw casts on it */}
          <path d="M87 126h26v28c0 8-6 16-13 19-7-3-13-11-13-19z" fill={skin} />
          <path d="M87 126h26v28c0 8-6 16-13 19-7-3-13-11-13-19z" fill={`url(#light-${uid})`} />
          <path d="M87 132c8 9 18 9 26 0v-8H87z" fill="#000" opacity="0.18" />

          <g className="persona-head" style={timing}>
            {/* ears */}
            {[69, 131].map((x) => (
              <g key={x}>
                <ellipse cx={x} cy="103" rx="6" ry="8.5" fill={skin} />
                <ellipse cx={x} cy="103" rx="2.6" ry="4.5" fill="#000" opacity="0.12" />
              </g>
            ))}

            {/* face with soft volume */}
            <path d={face} fill={skin} />
            <path d={face} fill={`url(#light-${uid})`} />
            <ellipse cx="84" cy="115" rx="6" ry="3.5" fill="#ff6b6b" opacity="0.16" />
            <ellipse cx="116" cy="115" rx="6" ry="3.5" fill="#ff6b6b" opacity="0.16" />

            {/* eyes blink together, irises glance around */}
            <g className="persona-blink" style={timing}>
              <Eye x={88} />
              <Eye x={112} />
            </g>
            <path d="M80 91c4-4 10-4.500 14-2.500M106 88.500c4-2 10-1.500 14 2.500" stroke={hairColor} strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* nose */}
            <path d="M98.500 105c-.5 3.500-2 6-3 8.500 1.500 1.500 4 2 6.500 1.200" fill="none" stroke="#000" strokeOpacity="0.18" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M101.500 106c1 3 1.500 5 1 7" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.4" strokeLinecap="round" />

            {/* mouth */}
            <path d="M91 124c3 4 6 5.500 9 5.500s6-1.500 9-5.500c-3 1-6 1.500-9 1.500s-6-.500-9-1.500z" fill={LIPS} />
            <path d="M91 124c3 1 6 1.500 9 1.500s6-.500 9-1.500" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M96 129c2.500 1 5.500 1 8 0" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.2" strokeLinecap="round" />

            {glasses && (
              <g fill="none" stroke={INK} strokeWidth="2.4">
                <rect x="77" y="93" width="22" height="16" rx="6" fill="#fff" fillOpacity="0.12" />
                <rect x="101" y="93" width="22" height="16" rx="6" fill="#fff" fillOpacity="0.12" />
                <path d="M99 100h2M77 99l-8-2M123 99l8-2" strokeLinecap="round" />
                <path d="M81 97l5-2M105 97l5-2" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" />
              </g>
            )}

            <HairFront hair={hair} color={hairColor} uid={uid} />
          </g>
        </g>
        {/* Objects sit outside the avatar circle, so they can break its edge. */}
        <ToolShape tool={tool} />
      </g>
    </svg>
  );
}

// Animated illustrations of the personas of a project: they breathe, blink, look around and react on hover.
export function PersonaCards({ items }: { items: Persona[] }): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((persona, index) => (
        <article
          key={persona.name}
          data-motion="persona"
          className="group flex flex-col gap-6 rounded-[16px] border border-line bg-surface p-6 transition-colors hover:border-line-strong"
        >
          <div className="mx-auto h-48 w-48 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:transform-none">
            <Character persona={persona} uid={`${index}-${persona.name.replace(/\W+/g, "")}`} delay={index * 0.4} />
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
