import { useMemo } from "react";
import { useSvgId } from "@/hooks/useSvgId";
import { GoldGradient } from "./ornaments";

/** Jagged crack running top to bottom; the two halves are clipped along it. */
const CRACK = "M54 0 L50 18 L58 34 L47 52 L56 68 L49 86 L55 102 L52 120";
const LEFT_CLIP = "polygon(0 0, 45% 0, 41.7% 15%, 48.3% 28.3%, 39.2% 43.3%, 46.7% 56.7%, 40.8% 71.7%, 45.8% 85%, 43.3% 100%, 0 100%)";
const RIGHT_CLIP =
  "polygon(45% 0, 100% 0, 100% 100%, 43.3% 100%, 45.8% 85%, 40.8% 71.7%, 46.7% 56.7%, 39.2% 43.3%, 48.3% 28.3%, 41.7% 15%)";

function SealFace({ first, second }: { first: string; second: string }) {
  const wax = useSvgId("wax");
  const gold = useSvgId("wg");
  const blob = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const r = 55 + Math.sin(i * 1.7) * 1.8 + Math.sin(i * 0.6 + 1) * 2.2;
      pts.push(`${(60 + Math.cos(a) * r).toFixed(1)} ${(60 + Math.sin(a) * r).toFixed(1)}`);
    }
    return `M${pts.join("L")}Z`;
  }, []);

  return (
    <svg viewBox="0 0 120 120" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id={wax} cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#b52a3c" />
          <stop offset=".45" stopColor="#8a1426" />
          <stop offset="1" stopColor="#4a0812" />
        </radialGradient>
        <GoldGradient id={gold} shimmer />
      </defs>
      <path d={blob} fill={`url(#${wax})`} />
      {/* pooled wax lip */}
      <circle cx="60" cy="60" r="44" fill="none" stroke="#3a0610" strokeOpacity=".55" strokeWidth="3" />
      <circle cx="60" cy="61" r="44" fill="none" stroke="#e46a7a" strokeOpacity=".25" strokeWidth="1.2" />
      {/* embossed ring with beads */}
      <circle cx="60" cy="60" r="38" fill="none" stroke={`url(#${gold})`} strokeWidth="1.1" />
      <circle cx="60" cy="60" r="34" fill="none" stroke={`url(#${gold})`} strokeWidth="1.2" strokeDasharray="0 4.4" strokeLinecap="round" />
      {[0, 90, 180, 270].map((r) => (
        <path key={r} transform={`rotate(${r} 60 60)`} d="M60 18c2.5 2 2.5 5 0 7-2.5-2-2.5-5 0-7Z" fill={`url(#${gold})`} />
      ))}
      <g style={{ fontFamily: "var(--ff-script)" }} textAnchor="middle">
        <text x="47" y="71" fontSize="34" fill="#2a0408" opacity=".5">
          {first}
        </text>
        <text x="46" y="70" fontSize="34" fill={`url(#${gold})`}>
          {first}
        </text>
        <text x="60" y="66" fontSize="13" fill={`url(#${gold})`} style={{ fontFamily: "var(--ff-cormorant)", fontStyle: "italic" }}>
          &amp;
        </text>
        <text x="75" y="77" fontSize="34" fill="#2a0408" opacity=".5">
          {second}
        </text>
        <text x="74" y="76" fontSize="34" fill={`url(#${gold})`}>
          {second}
        </text>
      </g>
      {/* glossy highlight */}
      <ellipse cx="42" cy="30" rx="16" ry="7" fill="#fff" opacity=".12" transform="rotate(-30 42 30)" />
    </svg>
  );
}

/**
 * Two clipped copies of the same seal sit on top of each other. GSAP draws the
 * crack, then throws each half (and a few crumbs) away to "break" the seal.
 */
export default function WaxSeal({ first, second, className = "" }: { first: string; second: string; className?: string }) {
  return (
    <div className={`relative ${className}`} data-seal>
      <div className="seal-glow absolute inset-0" data-seal-glow>
        <div className="absolute inset-0" style={{ clipPath: LEFT_CLIP }} data-seal-left>
          <SealFace first={first} second={second} />
        </div>
        <div className="absolute inset-0" style={{ clipPath: RIGHT_CLIP }} data-seal-right>
          <SealFace first={first} second={second} />
        </div>
      </div>
      <svg viewBox="0 0 120 120" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
        <path d={CRACK} fill="none" stroke="#2a0408" strokeWidth="1.8" pathLength={1} strokeDasharray="1" strokeDashoffset="1" data-seal-crack />
      </svg>
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          data-seal-crumb
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-[40%] bg-[#7a1020] opacity-0"
          style={{ width: 4 + (i % 3) * 2, height: 3 + (i % 2) * 2 }}
        />
      ))}
    </div>
  );
}
