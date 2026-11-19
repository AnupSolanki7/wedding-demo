import { useSvgId } from "@/hooks/useSvgId";

type SvgProps = { className?: string; style?: React.CSSProperties };

/** Antique gold foil gradient; `shimmer` slowly slides the highlight across. */
export function GoldGradient({ id, shimmer = false }: { id: string; shimmer?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect">
      <stop offset="0" stopColor="#7a5418" />
      <stop offset=".28" stopColor="#e3c27a" />
      <stop offset=".5" stopColor="#b88632" />
      <stop offset=".72" stopColor="#f3dfa8" />
      <stop offset="1" stopColor="#8a6020" />
      {shimmer && (
        <animateTransform
          attributeName="gradientTransform"
          type="translate"
          values="-1 -1; 1 1"
          dur="7s"
          repeatCount="indefinite"
        />
      )}
    </linearGradient>
  );
}

export function CornerFlourish({ className, style }: SvgProps) {
  const g = useSvgId("cf");
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} fill="none" aria-hidden>
      <defs>
        <GoldGradient id={g} shimmer />
      </defs>
      <g stroke={`url(#${g})`} strokeLinecap="round">
        <path d="M4 72V4h68" strokeWidth="1.6" />
        <path d="M11 54V11h43" strokeWidth=".8" />
        <path d="M11 11c20 3 33 15 31 30-1 9-11 12-16 6-4-5 0-11 6-9" strokeWidth="1.2" />
        <path d="M11 11c3 20 15 33 30 31" strokeWidth="1.2" />
        <path d="M72 4c8-3 18-2 26 4-9 3-18 2-26-4Z" fill={`url(#${g})`} fillOpacity=".35" strokeWidth=".9" />
        <path d="M4 72c-3 8-2 18 4 26 3-9 2-18-4-26Z" fill={`url(#${g})`} fillOpacity=".35" strokeWidth=".9" />
        <path d="M54 11c6-4 13-4 18 0-5 4-12 4-18 0ZM11 54c-4 6-4 13 0 18 4-5 4-12 0-18Z" strokeWidth=".8" />
        <path d="M17 17c7 1 12 6 13 13-7-1-12-6-13-13Z" fill={`url(#${g})`} fillOpacity=".6" strokeWidth=".8" />
      </g>
      <g fill={`url(#${g})`}>
        <circle cx="106" cy="4" r="2.2" />
        <circle cx="4" cy="106" r="2.2" />
        <circle cx="46" cy="22" r="1.5" />
        <circle cx="22" cy="46" r="1.5" />
      </g>
    </svg>
  );
}

export function GoldDivider({ className, style }: SvgProps) {
  const g = useSvgId("gd");
  return (
    <svg viewBox="0 0 320 24" className={className} style={style} aria-hidden>
      <defs>
        <GoldGradient id={g} />
      </defs>
      <g fill={`url(#${g})`}>
        <path d="M10 12 128 11.1v1.8Z" />
        <path d="m310 12-118-.9v1.8Z" />
        <circle cx="5" cy="12" r="2.2" />
        <circle cx="315" cy="12" r="2.2" />
        <circle cx="160" cy="12" r="2.4" />
        <circle cx="148" cy="12" r="1.3" />
        <circle cx="172" cy="12" r="1.3" />
      </g>
      <g fill="none" stroke={`url(#${g})`} strokeWidth="1.1">
        <path d="M133 12c4-6 9-6 11 0-2 6-7 6-11 0ZM187 12c-4-6-9-6-11 0 2 6 7 6 11 0Z" />
        <path d="m160 2 8.5 10-8.5 10-8.5-10Z" />
      </g>
    </svg>
  );
}

export function Lotus({ className, style }: SvgProps) {
  const g = useSvgId("lt");
  return (
    <svg viewBox="0 0 100 64" className={className} style={style} fill="none" aria-hidden>
      <defs>
        <GoldGradient id={g} shimmer />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1.3" strokeLinejoin="round">
        <path d="M50 52C30 52 14 44 6 30c16 0 34 8 44 22ZM50 52c20 0 36-8 44-22-16 0-34 8-44 22Z" />
        <path d="M50 52c-14-6-24-20-26-36 12 6 22 20 26 36ZM50 52c14-6 24-20 26-36-12 6-22 20-26 36Z" />
        <path d="M50 6c8 14 8 32 0 46-8-14-8-32 0-46Z" fill={`url(#${g})`} fillOpacity=".3" />
        <path d="M26 56q24 10 48 0" />
      </g>
      <circle cx="50" cy="61" r="2" fill={`url(#${g})`} />
    </svg>
  );
}

export function Paisley({ className, style }: SvgProps) {
  const g = useSvgId("ps");
  return (
    <svg viewBox="0 0 80 100" className={className} style={style} fill="none" aria-hidden>
      <defs>
        <GoldGradient id={g} />
      </defs>
      <g stroke={`url(#${g})`} strokeWidth="1.3" strokeLinecap="round">
        <path d="M30 94C8 84 4 54 20 32 34 13 62 9 70 27c8 18-10 32-24 24-8-5-4-16 4-14" />
        <path d="M32 84C16 76 14 54 26 38c10-13 30-16 36-4" strokeWidth=".8" />
        <path d="M30 74c-8-6-8-20 0-28" strokeWidth=".8" strokeDasharray="0 5" strokeLinecap="round" />
      </g>
      <circle cx="40" cy="58" r="3" fill={`url(#${g})`} />
    </svg>
  );
}

/** A stylised Shri Ganesh in fine gold line, set inside a dotted prabhavali halo. */
export function GaneshMotif({ className, style }: SvgProps) {
  const g = useSvgId("gn");
  return (
    <svg viewBox="0 0 120 124" className={className} style={style} fill="none" role="img" aria-label="Shri Ganesh">
      <defs>
        <GoldGradient id={g} shimmer />
      </defs>
      <circle cx="60" cy="60" r="56" stroke={`url(#${g})`} strokeWidth=".8" strokeDasharray="0 5.2" strokeLinecap="round" />
      <circle cx="60" cy="60" r="50" stroke={`url(#${g})`} strokeWidth=".6" opacity=".6" />
      <g stroke={`url(#${g})`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {/* mukut */}
        <path d="M46 36 49 22l11-10 11 10 3 14Z" fill={`url(#${g})`} fillOpacity=".18" />
        <path d="M48 28h24M50 22h20" strokeWidth="1" />
        <circle cx="60" cy="9" r="2" fill={`url(#${g})`} />
        {/* ears */}
        <path d="M44 40C26 32 16 46 20 62c3 12 16 14 24 6" />
        <path d="M76 40c18-8 28 6 24 22-3 12-16 14-24 6" />
        {/* face */}
        <path d="M44 38c-2 10 0 20 4 26M76 38c2 10 0 20-4 26M44 38q16-6 32 0" />
        {/* eyes + tilak */}
        <path d="M49 47q3.5-3 7 0M64 47q3.5-3 7 0" strokeWidth="1.4" />
        <path d="M57 37q3 6 6 0" strokeWidth="1.2" />
        <path d="M60 33v6" strokeWidth="1.2" />
        {/* trunk curling to the right */}
        <path d="M60 50c-3 12-2 24 3 32 6 9 16 8 16 0 0-6-6-7-8-3" strokeWidth="2.6" />
        {/* tusk */}
        <path d="M50 64c-5 3-7 8-7 12" strokeWidth="1.4" />
        {/* modak on a lotus base */}
        <path d="M38 104c8-10 36-10 44 0" strokeWidth="1.2" />
        <path d="M60 104c-6-4-6-10 0-14 6 4 6 10 0 14Z" fill={`url(#${g})`} fillOpacity=".4" strokeWidth="1" />
        <path d="M48 104c-8-2-12-8-12-12 6 0 12 6 12 12ZM72 104c8-2 12-8 12-12-6 0-12 6-12 12Z" strokeWidth="1" />
      </g>
      <g fill={`url(#${g})`}>
        <circle cx="30" cy="96" r="1.6" />
        <circle cx="90" cy="96" r="1.6" />
        <circle cx="60" cy="116" r="1.8" />
      </g>
    </svg>
  );
}

/** A & D monogram medallion with a beaded ring and mango-leaf laurels. */
export function Monogram({
  className,
  style,
  first = "A",
  second = "D",
  tone = "gold",
}: SvgProps & { first?: string; second?: string; tone?: "gold" | "ivory" }) {
  const g = useSvgId("mg");
  const fill = tone === "gold" ? `url(#${g})` : "#fff7e8";
  return (
    <svg viewBox="0 0 160 160" className={className} style={style} role="img" aria-label={`${first} and ${second} monogram`}>
      <defs>
        <GoldGradient id={g} shimmer />
      </defs>
      <circle cx="80" cy="80" r="66" fill="none" stroke={fill} strokeWidth="1.4" />
      <circle cx="80" cy="80" r="60" fill="none" stroke={fill} strokeWidth=".7" />
      <circle cx="80" cy="80" r="72" fill="none" stroke={fill} strokeWidth="1.4" strokeDasharray="0 6" strokeLinecap="round" />
      {/* laurels */}
      <g fill={fill} opacity=".85">
        {Array.from({ length: 6 }).map((_, i) => (
          <g key={i}>
            <path transform={`rotate(${118 + i * 13} 80 80) translate(80 14)`} d="M0 0c4 2 5 7 0 11-5-4-4-9 0-11Z" />
            <path transform={`rotate(${-118 - i * 13} 80 80) translate(80 14)`} d="M0 0c4 2 5 7 0 11-5-4-4-9 0-11Z" />
          </g>
        ))}
        <path d="M80 4c4 4 4 8 0 11-4-3-4-7 0-11Z" />
      </g>
      <text
        x="61"
        y="98"
        textAnchor="middle"
        fill={fill}
        style={{ fontFamily: "var(--ff-script)", fontSize: 58 }}
      >
        {first}
      </text>
      <text x="80" y="88" textAnchor="middle" fill={fill} style={{ fontFamily: "var(--ff-cormorant)", fontSize: 16, fontStyle: "italic" }}>
        &amp;
      </text>
      <text
        x="101"
        y="104"
        textAnchor="middle"
        fill={fill}
        style={{ fontFamily: "var(--ff-script)", fontSize: 58 }}
      >
        {second}
      </text>
    </svg>
  );
}

/** Temple arch that crowns the invitation card; legs fade into the paper. */
export function TempleArch({ className, style }: SvgProps) {
  const g = useSvgId("ta");
  const fade = useSvgId("taf");
  return (
    <svg viewBox="0 0 400 260" className={className} style={style} fill="none" aria-hidden preserveAspectRatio="xMidYMin meet">
      <defs>
        <GoldGradient id={g} shimmer />
        <linearGradient id={fade} x1="0" y1="0" x2="0" y2="1">
          <stop offset=".55" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${fade}-m`}>
          <rect width="400" height="260" fill={`url(#${fade})`} />
        </mask>
      </defs>
      <g mask={`url(#${fade}-m)`} stroke={`url(#${g})`} strokeLinecap="round">
        <path
          d="M16 260V150c0-48 54-60 92-70 42-12 74-20 92-46 18 26 50 34 92 46 38 10 92 22 92 70v110"
          strokeWidth="1.6"
        />
        <path
          d="M28 260V152c0-40 50-50 84-60 40-12 72-20 88-42 16 22 48 30 88 42 34 10 84 20 84 60v108"
          strokeWidth=".8"
        />
        <path
          d="M40 260V156c0-32 44-42 76-52 38-11 68-19 84-38 16 19 46 27 84 38 32 10 76 20 76 52v104"
          strokeWidth="1"
          strokeDasharray="0 7"
        />
        <path d="M6 150h22M372 150h22" strokeWidth="2" />
      </g>
      {/* kalash finial */}
      <g fill={`url(#${g})`}>
        <path d="M200 6c4 5 4 10 0 13-4-3-4-8 0-13Z" />
        <circle cx="200" cy="24" r="4" />
        <path d="M192 30h16l-3 5h-10Z" />
      </g>
    </svg>
  );
}

/** Mask shapes for framed images, drawn in a 100 x 125 box (4:5). */
export const FRAME_PATHS = {
  arch: "M5 125V50A45 45 0 0 1 95 50V125Z",
  cusped:
    "M4 125V46C4 40 8 37 12 36 12 28 18 24 24 25 26 16 34 12 40 14 43 7 47 4 50 1 53 4 57 7 60 14 66 12 74 16 76 25 82 24 88 28 88 36 92 37 96 40 96 46V125Z",
  jharokha: "M4 125V52C4 36 22 28 36 22 44 18 48 10 50 2 52 10 56 18 64 22 78 28 96 36 96 52V125Z",
  rect: "M0 0H100V125H0Z",
} as const;

export type FrameShape = keyof typeof FRAME_PATHS;
