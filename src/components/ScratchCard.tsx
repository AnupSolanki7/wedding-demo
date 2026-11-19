"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Sparkle } from "./FloatingDecorations";
import { CornerFlourish, GoldDivider, PetalShape } from "./ornaments";
import { EASE_ROYAL, seeded } from "@/lib/animations";
import { wedding } from "@/data/wedding";

const GRID_W = 32;
const GRID_H = 20;
const REVEAL_AT = 0.52;

const COIN_CURSOR =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Ccircle cx='17' cy='17' r='13' fill='%23e3c27a' stroke='%237a5418' stroke-width='2'/%3E%3Ccircle cx='17' cy='17' r='8' fill='none' stroke='%237a5418'/%3E%3Ctext x='17' y='21' font-size='10' text-anchor='middle' fill='%237a5418'%3E%E2%9C%A6%3C/text%3E%3C/svg%3E\") 17 17, pointer";

function cssFont(variable: string, fallback: string) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return v || fallback;
}

export default function ScratchCard() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = useRef(new Uint8Array(GRID_W * GRID_H));
  const cleared = useRef(0);
  const last = useRef<{ x: number; y: number } | null>(null);
  const pressing = useRef(false);
  const started = useRef(false);
  const revealedRef = useRef(false);
  const size = useRef({ w: 0, h: 0 });
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const { wedding: day } = wedding;

  /** Paint the metallic gold foil that hides the date. */
  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    size.current = { w, h };
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";

    const base = ctx.createLinearGradient(0, 0, w, h);
    (
      [
        [0, "#8a6020"],
        [0.17, "#d9b468"],
        [0.33, "#f6e2a6"],
        [0.5, "#b88632"],
        [0.67, "#ecd38f"],
        [0.84, "#9c7029"],
        [1, "#d2a95a"],
      ] as const
    ).forEach(([o, c]) => base.addColorStop(o, c));
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // brushed-metal lines and grain
    const r = seeded(4);
    for (let y = 0; y < h; y += 2) {
      ctx.fillStyle = r() > 0.5 ? `rgba(255,245,215,${(r() * 0.08).toFixed(3)})` : `rgba(90,60,15,${(r() * 0.07).toFixed(3)})`;
      ctx.fillRect(0, y, w, 1);
    }
    for (let i = 0; i < (w * h) / 80; i++) {
      ctx.fillStyle = r() > 0.5 ? "rgba(255,248,225,.35)" : "rgba(80,50,10,.2)";
      ctx.fillRect(r() * w, r() * h, 1, 1);
    }

    // engraved frame
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(90,58,12,.5)";
    ctx.strokeRect(10.5, 10.5, w - 21, h - 21);
    ctx.strokeStyle = "rgba(255,244,214,.55)";
    ctx.strokeRect(14.5, 14.5, w - 29, h - 29);

    // central medallion
    const cx = w / 2;
    const cy = h / 2;
    const R = Math.min(w, h) * 0.34;
    ctx.strokeStyle = "rgba(90,58,12,.35)";
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255,244,214,.45)";
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.9, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      ctx.save();
      ctx.translate(cx + Math.cos(a) * R * 1.13, cy + Math.sin(a) * R * 1.13);
      ctx.rotate(a + Math.PI / 2);
      ctx.beginPath();
      ctx.ellipse(0, 0, 2.6, 6.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(90,58,12,.22)";
      ctx.fill();
      ctx.restore();
    }

    // embossed lettering
    const fs = Math.max(15, Math.min(28, w * 0.056));
    const emboss = (text: string, y: number) => {
      ctx.fillStyle = "rgba(255,246,220,.75)";
      ctx.fillText(text, cx - 1, y - 1);
      ctx.fillStyle = "rgba(70,44,8,.55)";
      ctx.fillText(text, cx + 1, y + 1);
      ctx.fillStyle = "#a87a2c";
      ctx.fillText(text, cx, y);
    };
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `600 ${fs}px ${cssFont("--ff-cinzel", "serif")}`;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "4px";
    emboss("SCRATCH HERE", cy - fs * 0.45);
    if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
    ctx.font = `italic ${Math.round(fs * 0.62)}px ${cssFont("--ff-lora", "serif")}`;
    emboss("our special day awaits", cy + fs * 0.85);

    const sheen = ctx.createLinearGradient(0, 0, w, h * 0.7);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.45, "rgba(255,250,230,.32)");
    sheen.addColorStop(0.56, "rgba(255,250,230,0)");
    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, w, h);

    grid.current.fill(0);
    cleared.current = 0;
  }, []);

  useEffect(() => {
    let lastWidth = 0;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) paint();
    });
    const ro = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width === lastWidth || revealedRef.current) return;
      lastWidth = width;
      // A fresh foil only if the guest hasn't begun scratching yet
      if (!started.current) paint();
    });
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      cancelled = true;
      ro.disconnect();
    };
  }, [paint]);

  const reveal = useCallback(() => {
    if (revealedRef.current) return;
    revealedRef.current = true;
    setRevealed(true);
  }, []);

  const markCoverage = (x: number, y: number, radius: number) => {
    const { w, h } = size.current;
    const cw = w / GRID_W;
    const ch = h / GRID_H;
    const x0 = Math.max(0, Math.floor((x - radius) / cw));
    const x1 = Math.min(GRID_W - 1, Math.floor((x + radius) / cw));
    const y0 = Math.max(0, Math.floor((y - radius) / ch));
    const y1 = Math.min(GRID_H - 1, Math.floor((y + radius) / ch));
    for (let gy = y0; gy <= y1; gy++)
      for (let gx = x0; gx <= x1; gx++) {
        const dx = (gx + 0.5) * cw - x;
        const dy = (gy + 0.5) * ch - y;
        const i = gy * GRID_W + gx;
        if (!grid.current[i] && dx * dx + dy * dy <= radius * radius) {
          grid.current[i] = 1;
          cleared.current++;
        }
      }
  };

  const scratchTo = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || revealedRef.current) return;
    if (!started.current) {
      started.current = true;
      setTouched(true);
    }
    const brush = Math.max(28, size.current.w * 0.075);
    const from = last.current ?? { x: x - 0.1, y };
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brush;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    last.current = { x, y };

    const dist = Math.hypot(x - from.x, y - from.y);
    const steps = Math.max(1, Math.ceil(dist / (brush / 3)));
    for (let s = 0; s <= steps; s++) markCoverage(from.x + ((x - from.x) * s) / steps, from.y + ((y - from.y) * s) / steps, brush / 2);
    if (cleared.current / (GRID_W * GRID_H) >= REVEAL_AT) reveal();
  };

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pressing.current = true;
    if (e.pointerType !== "mouse") e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    last.current = null;
    scratchTo(p.x, p.y);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    // A mouse scratches just by gliding over the foil; touch needs contact
    if (e.pointerType !== "mouse" && !pressing.current) return;
    const p = point(e);
    scratchTo(p.x, p.y);
  };
  const endStroke = () => {
    pressing.current = false;
    last.current = null;
  };

  const burst = useMemo(() => {
    const r = seeded(21);
    return Array.from({ length: 26 }).map((_, i) => {
      const a = (i / 26) * Math.PI * 2 + r() * 0.3;
      const d = 90 + r() * 140;
      return { x: Math.cos(a) * d, y: Math.sin(a) * d * 0.7, s: 8 + r() * 12, delay: r() * 0.25, petal: i % 3 === 0, hue: i };
    });
  }, []);

  return (
    <section id="date-reveal" aria-labelledby="secret-title" className="paper relative overflow-hidden px-4 pb-24 pt-16 sm:pt-24">
      <SectionHeading
        id="secret-title"
        script="A little secret"
        title="A Little Secret For You"
        subtitle="Every beautiful story has a special day…"
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: EASE_ROYAL }}
        className="relative mx-auto mt-10 max-w-[620px]"
      >
        <div className="maroon-silk relative rounded-[4px] p-3 shadow-[0_28px_60px_-26px_rgba(58,6,16,0.8)] sm:p-4">
          <div className="pointer-events-none absolute inset-1.5 rounded-[3px] border border-gold/70" />
          <CornerFlourish className="pointer-events-none absolute left-1 top-1 z-10 w-12 sm:w-16" />
          <CornerFlourish className="pointer-events-none absolute right-1 top-1 z-10 w-12 -scale-x-100 sm:w-16" />
          <CornerFlourish className="pointer-events-none absolute bottom-1 left-1 z-10 w-12 -scale-y-100 sm:w-16" />
          <CornerFlourish className="pointer-events-none absolute bottom-1 right-1 z-10 w-12 -scale-100 sm:w-16" />

          <div ref={wrapRef} className="relative aspect-[4/3] overflow-hidden rounded-[2px] sm:aspect-[16/10]">
            {/* the hidden date */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#8d1629_0%,#650d19_55%,#3a0610_100%)] px-6 text-center">
              <p className="font-cinzel text-[10px] tracking-[0.4em] text-gold-light/80 sm:text-xs">Save the date</p>
              <p className="mt-2 flex items-baseline justify-center gap-3 font-serif font-semibold leading-none">
                <span className="text-foil text-[76px] sm:text-[112px]">{day.day}</span>
                <span className="flex flex-col items-start text-left">
                  <span className="text-foil font-cinzel text-xl tracking-[0.18em] sm:text-3xl">{day.month.toUpperCase()}</span>
                  <span className="text-foil font-cinzel text-xl tracking-[0.38em] sm:text-3xl">{day.year}</span>
                </span>
              </p>
              <GoldDivider className="mt-4 w-44 sm:w-60" />
              <motion.p
                initial={false}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 1, delay: 0.5, ease: EASE_ROYAL }}
                className="mt-4 font-cinzel text-[11px] tracking-[0.28em] text-beige sm:text-sm"
              >
                {day.revealLine.toUpperCase()}
              </motion.p>
            </div>

            {/* the gold foil */}
            <motion.canvas
              ref={canvasRef}
              aria-hidden
              animate={revealed ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: EASE_ROYAL }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endStroke}
              onPointerCancel={endStroke}
              onPointerLeave={endStroke}
              className={`absolute inset-0 h-full w-full touch-none select-none ${revealed ? "pointer-events-none" : ""}`}
              style={{ cursor: COIN_CURSOR }}
            />

            {/* celebration */}
            <AnimatePresence>
              {revealed && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
                  {burst.map((b, i) => (
                    <motion.span
                      key={i}
                      className="absolute"
                      style={{ width: b.s, height: b.s }}
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                      animate={{ x: b.x, y: b.y, opacity: [0, 1, 1, 0], scale: [0, 1.2, 1, 0.6], rotate: 220 }}
                      transition={{ duration: 1.8, delay: 0.15 + b.delay, ease: EASE_ROYAL }}
                    >
                      {b.petal ? <PetalShape kind="marigold" hue={b.hue} /> : <Sparkle className="h-full w-full" />}
                    </motion.span>
                  ))}
                </div>
              )}
            </AnimatePresence>
            {revealed &&
              [
                [12, 18],
                [86, 22],
                [16, 80],
                [84, 78],
                [50, 10],
              ].map(([l, t], i) => (
                <Sparkle
                  key={i}
                  className="pointer-events-none absolute h-4 w-4"
                  style={{ left: `${l}%`, top: `${t}%`, animation: `twinkle 2.4s ease-in-out ${i * 0.4}s infinite` }}
                />
              ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-col items-center gap-4 text-center" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {revealed ? (
            <motion.p
              key="done"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-xl italic text-maroon sm:text-2xl"
            >
              Our forever begins on {day.dateLabel}.
            </motion.p>
          ) : (
            <motion.p key="hint" exit={{ opacity: 0, y: -8 }} className="font-cinzel text-xs tracking-[0.26em] text-brown/80 sm:text-sm">
              {touched ? "Keep going…" : "Scratch to reveal our wedding date"}
            </motion.p>
          )}
        </AnimatePresence>
        {!revealed && (
          <button
            type="button"
            onClick={reveal}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold/70 px-6 font-cinzel text-[11px] tracking-[0.24em] text-gold-dark transition-colors hover:bg-gold/10"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.4} aria-hidden />
            Reveal the date
          </button>
        )}
      </div>
    </section>
  );
}
