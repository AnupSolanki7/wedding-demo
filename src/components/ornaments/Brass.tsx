import { useMemo } from "react";
import { useSvgId } from "@/hooks/useSvgId";
import { Bloom } from "./Florals";

type SvgProps = { className?: string; style?: React.CSSProperties };

function BrassGradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stopColor="#6e4a12" />
      <stop offset=".42" stopColor="#e9c97f" />
      <stop offset=".6" stopColor="#c09040" />
      <stop offset="1" stopColor="#7a5418" />
    </linearGradient>
  );
}

function Flame({ x, y, s = 1, id }: { x: number; y: number; s?: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-10" r="16" fill={`url(#${id}-glow)`} />
      <path className="flicker" d="M0-22C6-12 6-5 0 0-6-5-6-12 0-22Z" fill={`url(#${id}-flame)`} />
    </g>
  );
}

function FlameDefs({ id }: { id: string }) {
  return (
    <>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0" stopColor="#ffd98a" stopOpacity=".7" />
        <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${id}-flame`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff2b0" />
        <stop offset=".5" stopColor="#ffb52e" />
        <stop offset="1" stopColor="#e2541a" />
      </linearGradient>
    </>
  );
}

export function Diya({ className, style }: SvgProps) {
  const id = useSvgId("diya");
  return (
    <svg viewBox="0 0 60 56" className={className} style={style} aria-hidden overflow="visible">
      <defs>
        <BrassGradient id={`${id}-b`} />
        <FlameDefs id={id} />
      </defs>
      <Flame x={30} y={30} id={id} />
      <path d="M6 32q24 26 48 0-10 4-24 4T6 32Z" fill={`url(#${id}-b)`} />
      <path d="M48 31q8-4 10-8-2 8-8 12Z" fill={`url(#${id}-b)`} />
      <ellipse cx="30" cy="33" rx="24" ry="3.5" fill="#f3dfa8" opacity=".5" />
      <path d="M22 50h16l-2 5H24Z" fill={`url(#${id}-b)`} />
    </svg>
  );
}

export function Bell({ className, style }: SvgProps) {
  const id = useSvgId("bell");
  return (
    <svg viewBox="0 0 40 96" className={className} style={style} aria-hidden>
      <defs>
        <BrassGradient id={id} />
      </defs>
      <path d="M20 0v30" stroke="#a57425" strokeWidth="1.6" strokeDasharray="3 2" />
      <circle cx="20" cy="33" r="3" fill="none" stroke="#c09040" strokeWidth="1.6" />
      <path d="M20 36C10 38 8 56 5 68h30c-3-12-5-30-15-32Z" fill={`url(#${id})`} />
      <path d="M3 68h34v4H3Z" fill="#8a6020" />
      <path d="M12 46q8-4 16 0" stroke="#f3dfa8" strokeWidth="1" fill="none" opacity=".7" />
      <circle cx="20" cy="78" r="4" fill={`url(#${id})`} />
      <path d="M20 82v8" stroke="#c92a3e" strokeWidth="2" />
      <circle cx="20" cy="92" r="2.5" fill="#c92a3e" />
    </svg>
  );
}

/** Hanging brass lamp with five wicks (Maharashtrian lamandiva). */
export function HangingLamp({ className, style, chain = 80 }: SvgProps & { chain?: number }) {
  const id = useSvgId("lamp");
  const y = chain + 60;
  return (
    <svg viewBox={`0 0 100 ${y + 60}`} className={className} style={style} aria-hidden overflow="visible">
      <defs>
        <BrassGradient id={`${id}-b`} />
        <FlameDefs id={id} />
      </defs>
      <path d={`M50 0V${chain}`} stroke="#a57425" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d={`M38 ${chain}q12-16 24 0Z`} fill={`url(#${id}-b)`} />
      <path d={`M50 ${chain}L12 ${y}M50 ${chain}L88 ${y}M50 ${chain}V${y}`} stroke="#a57425" strokeWidth="1" />
      {[-34, -17, 0, 17, 34].map((dx) => (
        <Flame key={dx} x={50 + dx} y={y - 2} s={0.62} id={id} />
      ))}
      <path d={`M6 ${y}q44 40 88 0Z`} fill={`url(#${id}-b)`} />
      <ellipse cx="50" cy={y} rx="44" ry="5" fill="#e9c97f" />
      <path d={`M50 ${y + 20}v20`} stroke="#a57425" strokeWidth="1.6" />
      <path d={`M50 ${y + 40}c5 4 5 9 0 13-5-4-5-9 0-13Z`} fill={`url(#${id}-b)`} />
    </svg>
  );
}

/** Pierced brass lantern for the Varmala palace courtyard. */
export function Lantern({ className, style }: SvgProps) {
  const id = useSvgId("lan");
  return (
    <svg viewBox="0 0 80 230" className={className} style={style} aria-hidden overflow="visible">
      <defs>
        <BrassGradient id={`${id}-b`} />
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".55" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-in`} cx=".5" cy=".55" r=".6">
          <stop offset="0" stopColor="#fff0b8" />
          <stop offset=".5" stopColor="#f6a23a" />
          <stop offset="1" stopColor="#9a3a12" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="110" r="60" fill={`url(#${id}-glow)`} />
      <path d="M40 0v40" stroke="#c09040" strokeWidth="1.6" />
      <circle cx="40" cy="40" r="4" fill="none" stroke="#c09040" strokeWidth="1.6" />
      <path d="M20 66q20-30 40 0Z" fill={`url(#${id}-b)`} />
      <rect x="16" y="64" width="48" height="7" fill={`url(#${id}-b)`} />
      <path d="M19 71h42l-4 82H23Z" fill={`url(#${id}-in)`} />
      <g fill="none" stroke="#b88632" strokeWidth="2">
        <path d="M19 71h42l-4 82H23Z" />
        <path d="M33 71l-1 82M47 71l1 82" />
      </g>
      <g fill="#7a3a12" opacity=".35">
        {[90, 110, 130].map((y) => (
          <path key={y} d={`M26 ${y}a5 6 0 0 1 10 0v8H26ZM44 ${y}a5 6 0 0 1 10 0v8H44Z`} />
        ))}
      </g>
      <rect x="20" y="153" width="40" height="6" fill={`url(#${id}-b)`} />
      <path d="M24 159h32l-16 22Z" fill={`url(#${id}-b)`} />
      <path d="M40 181v26M36 186l-3 22M44 186l3 22" stroke="#b0122b" strokeWidth="2" />
      <circle cx="40" cy="210" r="3" fill="#d6ac52" />
    </svg>
  );
}

export function Kalash({ className, style }: SvgProps) {
  const id = useSvgId("kal");
  return (
    <svg viewBox="0 0 100 124" className={className} style={style} aria-hidden>
      <defs>
        <BrassGradient id={id} />
      </defs>
      {[-58, -30, 0, 30, 58].map((r) => (
        <g key={r} transform={`translate(50 62) rotate(${r})`}>
          <path d="M0 0C7-9 8-24 0-36-8-24-7-9 0 0Z" fill={r % 60 ? "#3f6b2a" : "#55873a"} />
        </g>
      ))}
      <ellipse cx="50" cy="44" rx="15" ry="18" fill="#7a4a22" />
      <path d="M44 30q6-10 12 0" stroke="#a57a42" strokeWidth="2" fill="none" />
      <path d="M36 60h28v9H36Z" fill={`url(#${id})`} />
      <path d="M32 69C16 76 14 102 30 112c12 7 28 7 40 0 16-10 14-36-2-43Z" fill={`url(#${id})`} />
      <path d="M20 86h60" stroke="#b0122b" strokeWidth="3" />
      <path d="M46 92h8M50 88v8" stroke="#b0122b" strokeWidth="2" />
      <path d="M36 118h28" stroke="#7a5418" strokeWidth="3" />
    </svg>
  );
}

/** Gujarati garbo — a pierced terracotta pot with a lamp glowing inside. */
export function Garbo({ className, style }: SvgProps) {
  const id = useSvgId("garbo");
  const holes = useMemo(() => {
    const pts: [number, number][] = [];
    for (let row = 0; row < 4; row++)
      for (let col = 0; col < 6 - (row % 2); col++) pts.push([24 + col * 10 + (row % 2) * 5, 64 + row * 11]);
    return pts;
  }, []);
  return (
    <svg viewBox="0 0 100 124" className={className} style={style} aria-hidden overflow="visible">
      <defs>
        <FlameDefs id={id} />
        <radialGradient id={`${id}-pot`} cx=".4" cy=".35">
          <stop offset="0" stopColor="#d4793a" />
          <stop offset="1" stopColor="#8a3814" />
        </radialGradient>
      </defs>
      <Flame x={50} y={34} id={id} />
      <path d="M36 36h28l-4 10H40Z" fill="#a8521f" />
      <path d="M38 46C14 54 10 98 30 110c12 8 28 8 40 0 20-12 16-56-8-64Z" fill={`url(#${id}-pot)`} />
      {holes.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="2.4" fill="#ffd27a" />
      ))}
      <path d="M22 58q28-10 56 0M18 106q32 10 64 0" stroke="#fff7e8" strokeWidth="1.6" strokeDasharray="0 5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Brass urli heaped with turmeric paste and marigolds. */
export function HaldiBowl({ className, style }: SvgProps) {
  const id = useSvgId("urli");
  return (
    <svg viewBox="0 0 160 80" className={className} style={style} aria-hidden>
      <defs>
        <BrassGradient id={id} />
        <radialGradient id={`${id}-h`} cx=".5" cy=".3">
          <stop offset="0" stopColor="#ffd35a" />
          <stop offset="1" stopColor="#d98a0c" />
        </radialGradient>
      </defs>
      <ellipse cx="80" cy="74" rx="62" ry="5" fill="#3d2410" opacity=".25" />
      <path d="M26 40q54-44 108 0Z" fill={`url(#${id}-h)`} />
      <path d="M8 40q72 62 144 0Z" fill={`url(#${id})`} />
      <ellipse cx="80" cy="40" rx="72" ry="7" fill="#e9c97f" stroke="#8a6020" strokeWidth="1.5" />
      <path d="M30 40q50-30 100 0" fill={`url(#${id}-h)`} />
      <Bloom cx={66} cy={28} r={8} tone="orange" />
      <Bloom cx={86} cy={22} r={9} tone="yellow" />
      <Bloom cx={104} cy={30} r={7} tone="orange" />
    </svg>
  );
}

/* ------------------------------------------------------- architecture */

/** Paithani selvedge: green body, gold zari temple border and a pink edge. */
export function PaithaniBorder({ className, style, flip = false }: SvgProps & { flip?: boolean }) {
  const id = useSvgId("paithani");
  return (
    <svg
      className={className}
      style={{ ...style, transform: flip ? "scaleY(-1)" : undefined }}
      width="100%"
      height="44"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="26" fill="#1d5b3c" />
          <rect y="3" width="44" height="1.2" fill="#d6ac52" />
          <rect y="23" width="44" height="1.2" fill="#d6ac52" />
          <g transform="translate(22 14)" fill="#d6ac52">
            <path d="M0-7c3 3 3 7 0 9-3-2-3-6 0-9Z" />
            <path d="M0 2C-2-2-6-3-8-1-6 2-3 3 0 2ZM0 2C2-2 6-3 8-1 6 2 3 3 0 2Z" />
          </g>
          <circle cx="0" cy="14" r="1.4" fill="#e8a0b4" />
          <rect y="26" width="44" height="3" fill="#d6ac52" />
          <rect y="29" width="44" height="15" fill="#c8436e" />
          <path d="M0 44 11 31l11 13Zm22 0 11-13 11 13Z" fill="#d6ac52" opacity=".9" />
          <path d="M11 44V37M33 44V37" stroke="#c8436e" strokeWidth="1.2" />
        </pattern>
      </defs>
      <rect width="100%" height="44" fill={`url(#${id})`} />
    </svg>
  );
}

function domePath(cx: number, base: number, w: number, h: number) {
  return `M${cx - w / 2} ${base}C${cx - w / 2} ${base - h * 0.55} ${cx - w * 0.18} ${base - h * 0.72} ${cx} ${base - h}C${cx + w * 0.18} ${base - h * 0.72} ${cx + w / 2} ${base - h * 0.55} ${cx + w / 2} ${base}Z`;
}

/** Rajput-palace skyline of domes, chhatris and lit jharokhas. */
export function PalaceSilhouette({
  className,
  style,
  color = "#3a0610",
  lit = "#f6b75f",
}: SvgProps & { color?: string; lit?: string }) {
  const { shapes, windows } = useMemo(() => {
    const base = 210;
    const towers: [number, number, number][] = [
      [70, 120, 90],
      [260, 90, 70],
      [600, 240, 170],
      [940, 90, 70],
      [1130, 120, 90],
      [430, 70, 54],
      [770, 70, 54],
    ];
    let d = `M0 ${base}H1200V300H0Z`;
    for (const [cx, w, h] of towers) {
      d += `M${cx - w / 2} ${base}V${base - 60}H${cx + w / 2}V${base}Z`;
      d += domePath(cx, base - 60, w, h);
      d += `M${cx - 2} ${base - 60 - h}h4v-16h-4Z`;
    }
    let win = "";
    for (let x = 24; x < 1200; x += 48) win += `M${x} ${base + 64}V${base + 28}a12 12 0 0 1 24 0V${base + 64}Z`;
    return { shapes: d, windows: win };
  }, []);
  return (
    <svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax meet" className={className} style={style} aria-hidden>
      <path d={shapes} fill={color} />
      <path d={windows} fill={lit} opacity=".5" />
    </svg>
  );
}

/** Scalloped jhalar edge that stitches one section into the next. */
export function ScallopEdge({ color, className, flip = false }: { color: string; className?: string; flip?: boolean }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 28"
      preserveAspectRatio="none"
      aria-hidden
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        fill={color}
        d={`M0 28V14${Array.from({ length: 30 })
          .map((_, i) => `Q${i * 40 + 20} -6 ${i * 40 + 40} 14`)
          .join("")}V28Z`}
      />
    </svg>
  );
}
