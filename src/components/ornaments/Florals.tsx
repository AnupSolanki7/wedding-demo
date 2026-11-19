import { useMemo } from "react";
import { useSvgId } from "@/hooks/useSvgId";
import { seeded } from "@/lib/animations";

type SvgProps = { className?: string; style?: React.CSSProperties };

export const BLOOMS = {
  orange: ["#d9661a", "#ee8a22", "#b9480f"],
  yellow: ["#e7a316", "#f6c33a", "#c47f0c"],
  white: ["#e6dcc5", "#fffaf0", "#cbbb98"],
  rose: ["#d9637a", "#ef9aa8", "#b03a55"],
  red: ["#a3162b", "#c92a3e", "#7a0d1d"],
  pink: ["#e88aa0", "#f6b8c6", "#c4587a"],
} as const;
export type BloomTone = keyof typeof BLOOMS;

const r1 = (n: number) => Math.round(n * 10) / 10;

/** A ruffled marigold / mogra bloom drawn with flat fills (safe to repeat). */
export function Bloom({ cx, cy, r, tone, petals = 7 }: { cx: number; cy: number; r: number; tone: BloomTone; petals?: number }) {
  const [outer, mid, inner] = BLOOMS[tone];
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={outer} />
      {Array.from({ length: petals }).map((_, k) => {
        const a = (k / petals) * Math.PI * 2;
        return <circle key={k} cx={r1(cx + Math.cos(a) * r * 0.6)} cy={r1(cy + Math.sin(a) * r * 0.6)} r={r1(r * 0.42)} fill={mid} />;
      })}
      <circle cx={cx} cy={cy} r={r1(r * 0.4)} fill={inner} />
    </g>
  );
}

const LEAF = "M0 0C7 9 8 24 0 36C-8 24-7 9 0 0Z";

const TORAN_TONES: Record<"marigold" | "vivah" | "rose", BloomTone[]> = {
  marigold: ["orange", "yellow"],
  vivah: ["orange", "white"],
  rose: ["rose", "white", "red"],
};

/**
 * Door toran: a scalloped cord of mango leaves with marigold strings.
 * Uses <symbol>/<use> so a full-width toran stays a light DOM.
 */
export function Toran({ variant = "marigold", className, style }: SvgProps & { variant?: keyof typeof TORAN_TONES }) {
  const id = useSvgId("toran");
  const tones = TORAN_TONES[variant];
  const units = 36;
  const unit = (len: number, offset: number) => (
    <>
      <path d="M0 6Q30 15 60 6" stroke="#8a5a14" strokeWidth="1.6" fill="none" />
      <g fill="#3f6b2a">
        <path transform="translate(14 9) rotate(10)" d={LEAF} />
        <path transform="translate(46 9) rotate(-10)" d={LEAF} />
      </g>
      <g stroke="#7fae4f" strokeWidth=".8">
        <path transform="translate(14 9) rotate(10)" d="M0 2V32" />
        <path transform="translate(46 9) rotate(-10)" d="M0 2V32" />
      </g>
      <line x1="30" y1="10" x2="30" y2={14 + len * 12} stroke="#8a5a14" strokeWidth=".8" />
      {Array.from({ length: len }).map((_, k) => (
        <Bloom key={k} cx={30} cy={18 + k * 12} r={6.6} tone={tones[(k + offset) % tones.length]} />
      ))}
      <circle cx="30" cy={18 + len * 12 - 2} r="2.4" fill="#d6ac52" />
    </>
  );
  return (
    <svg
      viewBox={`0 0 ${units * 60} 90`}
      preserveAspectRatio="xMidYMin slice"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <symbol id={`${id}-l`} viewBox="0 0 60 90" width="60" height="90" overflow="visible">
          {unit(5, 0)}
        </symbol>
        <symbol id={`${id}-s`} viewBox="0 0 60 90" width="60" height="90" overflow="visible">
          {unit(3, 1)}
        </symbol>
      </defs>
      <rect x="0" y="0" width={units * 60} height="5" fill="#8a1a2e" />
      <rect x="0" y="4" width={units * 60} height="1.5" fill="#d6ac52" />
      {Array.from({ length: units }).map((_, i) => (
        <use key={i} href={`#${id}-${i % 2 ? "s" : "l"}`} x={i * 60} y="0" width="60" height="90" />
      ))}
    </svg>
  );
}

/** Vertical marigold garland that hangs beside a frame. */
export function MarigoldGarland({
  count = 12,
  tones = ["orange", "yellow"],
  className,
  style,
}: SvgProps & { count?: number; tones?: BloomTone[] }) {
  const h = count * 13 + 40;
  return (
    <svg viewBox={`0 0 24 ${h}`} className={className} style={style} aria-hidden>
      <line x1="12" y1="0" x2="12" y2={h - 30} stroke="#8a5a14" strokeWidth=".8" />
      {Array.from({ length: count }).map((_, k) => (
        <Bloom key={k} cx={12} cy={8 + k * 13} r={7.4} tone={tones[k % tones.length]} />
      ))}
      <g fill="#3f6b2a">
        <path transform={`translate(12 ${count * 13 + 2}) rotate(-18)`} d={LEAF} />
        <path transform={`translate(12 ${count * 13 + 2}) rotate(18)`} d={LEAF} />
      </g>
    </svg>
  );
}

/** Concentric rangoli / mandala. Monochrome gold by default. */
export function RangoliMandala({
  className,
  style,
  stroke = "#b88632",
  fills = ["none", "#b88632", "none", "#e3c27a"],
}: SvgProps & { stroke?: string; fills?: [string, string, string, string] }) {
  const petal = (len: number, w: number) =>
    `M0 0C${w} ${-len * 0.35} ${w} ${-len * 0.75} 0 ${-len}C${-w} ${-len * 0.75} ${-w} ${-len * 0.35} 0 0Z`;
  const ring = (n: number, r: number, d: string, fill: string, sw = 0) =>
    Array.from({ length: n }).map((_, i) => (
      <path
        key={`${r}-${i}`}
        transform={`rotate(${r1((360 / n) * i)}) translate(0 ${-r})`}
        d={d}
        fill={fill}
        stroke={sw ? stroke : undefined}
        strokeWidth={sw || undefined}
      />
    ));
  return (
    <svg viewBox="-104 -104 208 208" className={className} style={style} aria-hidden>
      {ring(16, 52, petal(44, 14), fills[0], 1)}
      {ring(16, 52, petal(26, 6), fills[1])}
      <circle r="52" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle r="70" fill="none" stroke={stroke} strokeWidth=".6" strokeDasharray="2 4" />
      {ring(32, 98, "M0 0a2.4 2.4 0 1 0 .1 0Z", stroke)}
      {ring(8, 10, petal(40, 16), fills[2], 1)}
      {ring(8, 10, petal(22, 7), fills[3])}
      <circle r="12" fill={fills[1] === "none" ? "none" : fills[1]} stroke={stroke} strokeWidth="1.2" />
      <circle r="5" fill={stroke} />
    </svg>
  );
}

export function MangoSprig({ className, style }: SvgProps) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={style} aria-hidden>
      <path d="M4 56C20 40 40 28 76 20" stroke="#5a3a1a" strokeWidth="1.6" fill="none" />
      {[
        [18, 45, -60],
        [30, 37, -120],
        [44, 30, -50],
        [56, 25, -130],
        [70, 21, -70],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(.62)`}>
          <path d={LEAF} fill={i % 2 ? "#3f6b2a" : "#55873a"} />
          <path d="M0 2V32" stroke="#8fbb5c" strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

/** Tall banana leaf (kelichi paana) that frames Maharashtrian mandaps. */
export function BananaLeaf({ className, style }: SvgProps) {
  const g = useSvgId("bl");
  const veins = useMemo(() => {
    const out: string[] = [];
    for (let y = 30; y < 396; y += 13) {
      const t = (y - 6) / 404;
      const w = 58 * Math.pow(Math.sin(Math.PI * t), 0.75);
      out.push(`M70 ${y}Q${r1(70 - w * 0.5)} ${y + 5} ${r1(70 - w)} ${y + 15}M70 ${y}Q${r1(70 + w * 0.5)} ${y + 5} ${r1(70 + w)} ${y + 15}`);
    }
    return out.join("");
  }, []);
  return (
    <svg viewBox="0 0 140 440" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={g} x1="0" x2="1">
          <stop offset="0" stopColor="#2f6322" />
          <stop offset=".5" stopColor="#4c8a33" />
          <stop offset="1" stopColor="#2a581d" />
        </linearGradient>
      </defs>
      <path d="M70 410C40 330 12 250 10 160 8 90 34 30 70 6Z" fill={`url(#${g})`} />
      <path d="M70 410c30-80 58-160 60-250 2-70-24-130-60-154Z" fill="#36702a" />
      <path d="M70 6V440" stroke="#b5d17a" strokeWidth="3" />
      <path d={veins} stroke="#9cc463" strokeWidth=".9" fill="none" opacity=".5" />
      {/* natural tears in the blade */}
      <path d="M14 190l40 14M128 120l-40 10M20 280l34 10M124 250l-36 12" stroke="#f8ebd1" strokeWidth="1.4" opacity=".55" />
    </svg>
  );
}

/** Pink & red rose arch with mogra that hugs an arch-shaped photo frame. */
export function FloralArch({ className, style }: SvgProps) {
  const blooms = useMemo(() => {
    const rand = seeded(9);
    const pts: [number, number][] = [];
    for (let y = 500; y > 200; y -= 22) pts.push([20, y], [380, y]);
    for (let a = 0; a <= 180; a += 6) {
      const rad = (a * Math.PI) / 180;
      pts.push([200 - 180 * Math.cos(rad), 200 - 180 * Math.sin(rad)]);
    }
    const tones: BloomTone[] = ["pink", "rose", "white", "red", "rose"];
    return pts.map(([x, y], i) => ({
      x: r1(x + (rand() - 0.5) * 8),
      y: r1(y + (rand() - 0.5) * 8),
      r: r1(11 + rand() * 5),
      tone: tones[i % tones.length],
      leaf: r1(rand() * 360),
    }));
  }, []);
  return (
    <svg viewBox="0 0 400 500" className={className} style={style} overflow="visible" aria-hidden>
      {blooms.map((b, i) => (
        <path key={`l${i}`} transform={`translate(${b.x} ${b.y}) rotate(${b.leaf}) scale(.8)`} d={LEAF} fill={i % 2 ? "#2f5a1e" : "#3f6b2a"} />
      ))}
      {blooms.map((b, i) => (
        <Bloom key={`b${i}`} cx={b.x} cy={b.y} r={b.r} tone={b.tone} petals={8} />
      ))}
    </svg>
  );
}

/* --------------------------------------------------------------- petals */

export type PetalKind = "marigold" | "haldi" | "rose" | "gold";

export function PetalShape({ kind, hue }: { kind: PetalKind; hue: number }) {
  if (kind === "rose") {
    const fill = ["#d9637a", "#b0122b", "#ef9aa8", "#c4405a"][hue % 4];
    return (
      <svg viewBox="-10 -10 20 20" width="100%" height="100%">
        <path d="M0 9C-7 5-8-3-3-7-1-8.5 1-8.5 3-7 8-3 7 5 0 9Z" fill={fill} />
        <path d="M0 8C-3 4-3-2 0-6" stroke="#fff" strokeOpacity=".25" fill="none" />
      </svg>
    );
  }
  if (kind === "gold") {
    return (
      <svg viewBox="-10 -10 20 20" width="100%" height="100%">
        <path d="M0-9 2 0 0 9-2 0Z M-9 0 0 2 9 0 0-2Z" fill="#f3dfa8" />
      </svg>
    );
  }
  const fill =
    kind === "haldi" ? ["#e9ad24", "#f6c33a", "#e7a316", "#f0b93a"][hue % 4] : ["#ee8a22", "#d9661a", "#f6c33a", "#e7a316"][hue % 4];
  return (
    <svg viewBox="-10 -10 20 20" width="100%" height="100%">
      <path d="M0-7C4-7 7-3 6 2 5 6-3 8-6 3-8-1-5-7 0-7Z" fill={fill} />
      <path d="M-3 0C-1-2 2-2 3 1" stroke="#000" strokeOpacity=".12" fill="none" />
    </svg>
  );
}
