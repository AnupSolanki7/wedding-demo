"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PetalShape, type PetalKind } from "./ornaments";
import { seeded } from "@/lib/animations";

/** Slow-rising motes of gold, used on maroon backdrops. */
export function GoldDust({ count = 28, seed = 3, className = "" }: { count?: number; seed?: number; className?: string }) {
  const motes = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }).map(() => ({
      left: r() * 100,
      top: 20 + r() * 80,
      size: 2 + r() * 3.5,
      dur: 7 + r() * 9,
      delay: -r() * 14,
      dx: (r() - 0.5) * 80,
      o: 0.35 + r() * 0.55,
    }));
  }, [count, seed]);

  return (
    <div className={`gold-dust pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={
            {
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              background: "radial-gradient(circle, #fff4d0 0%, #e3c27a 45%, rgba(184,134,50,0) 72%)",
              animation: `dust ${m.dur}s linear ${m.delay}s infinite`,
              "--dx": `${m.dx}px`,
              "--o": m.o,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * Petals drifting down through a section. Runs only while the section is on
 * screen so off-screen sections cost nothing on mid-range phones.
 */
export function PetalRain({
  kind,
  density = 1,
  seed = 1,
  className = "",
}: {
  kind: PetalKind;
  density?: number;
  seed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    setCount(Math.round((narrow ? 14 : 24) * density));
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, [density]);

  const petals = useMemo(() => {
    const r = seeded(seed * 97);
    return Array.from({ length: count }).map((_, i) => ({
      left: r() * 100,
      size: 10 + r() * 14,
      fall: 9 + r() * 9,
      drift: 14 + r() * 40,
      driftDur: 3.5 + r() * 3,
      delay: -r() * 18,
      hue: i,
      opacity: 0.65 + r() * 0.35,
    }));
  }, [count, seed]);

  return (
    <div
      ref={ref}
      className={`petal-rain pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
        visible ? "opacity-100" : "petals-paused opacity-0"
      } ${className}`}
      aria-hidden
    >
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal-track"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              "--fall-dur": `${p.fall}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <span
            className="petal"
            style={
              {
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                "--drift": `${p.drift}px`,
                "--drift-dur": `${p.driftDur}s`,
              } as React.CSSProperties
            }
          >
            <PetalShape kind={kind} hue={p.hue} />
          </span>
        </div>
      ))}
    </div>
  );
}

/** Four-point gold star used for twinkles and sparkle bursts. */
export function Sparkle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} style={style} aria-hidden>
      <path d="M0-10C1-2 2-1 10 0 2 1 1 2 0 10-1 2-2 1-10 0-2-1-1-2 0-10Z" fill="#f6e2a6" />
    </svg>
  );
}
