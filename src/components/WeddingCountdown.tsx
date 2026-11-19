"use client";

import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { GoldDust } from "./FloatingDecorations";
import { Diya, FRAME_PATHS, Lotus, ScallopEdge } from "./ornaments";
import { useCountdown } from "@/hooks/useCountdown";
import { EASE_ROYAL, fadeUp, stagger, viewportOnce } from "@/lib/animations";
import { wedding } from "@/data/wedding";

const pad = (n: number) => String(n).padStart(2, "0");

function Tile({ value, label, ready }: { value: number; label: string; ready: boolean }) {
  const text = ready ? pad(value) : "--";
  return (
    <motion.div variants={fadeUp} className="relative w-[calc(50%-0.5rem)] max-w-[150px] sm:w-[140px]">
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <path d={FRAME_PATHS.jharokha} fill="rgba(58,6,16,.55)" stroke="#b88632" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path
          d={FRAME_PATHS.jharokha}
          transform="translate(5 6) scale(.9)"
          fill="none"
          stroke="#e3c27a"
          strokeOpacity=".45"
          strokeWidth=".8"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center pt-5">
        <span className="relative h-[1.1em] overflow-hidden font-serif text-5xl font-semibold leading-none tabular-nums lining-nums sm:text-6xl">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={text}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ duration: 0.55, ease: EASE_ROYAL }}
              className="text-foil block"
            >
              {text}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="mt-3 font-cinzel text-[10px] tracking-[0.3em] text-beige/80 sm:text-[11px]">{label}</span>
      </div>
    </motion.div>
  );
}

export default function WeddingCountdown() {
  const { wedding: day } = wedding;
  const t = useCountdown(day.startsAt);
  const when = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: day.timeZone,
  }).format(new Date(day.startsAt));

  return (
    <section id="countdown" aria-labelledby="countdown-title" className="maroon-silk relative px-4 pb-24 pt-20 sm:pt-28">
      <ScallopEdge color="#650d19" className="absolute inset-x-0 -top-[27px] h-7 w-full" />
      <GoldDust count={22} seed={8} />
      <Lotus className="mx-auto mb-4 w-16 opacity-90" />

      <SectionHeading id="countdown-title" tone="light" script="Counting the moments" title="Until the Auspicious Muhurat" subtitle={when + " IST"} />

      <AnimatePresence mode="wait">
        {t.ready && t.done ? (
          <motion.div
            key="today"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: EASE_ROYAL }}
            className="mx-auto mt-12 max-w-xl text-center"
          >
            <p className="text-foil font-script text-5xl sm:text-6xl">The auspicious day is here</p>
            <p className="mt-4 font-serif text-xl italic text-beige/90">
              {wedding.couple.bride} &amp; {wedding.couple.groom} are tying the knot today — thank you for being part of our story.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="ticking"
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mx-auto mt-12 flex max-w-[640px] flex-wrap justify-center gap-4"
            role="timer"
            aria-label={
              t.ready ? `${t.days} days, ${t.hours} hours, ${t.minutes} minutes to go` : "Countdown to the wedding"
            }
          >
            <Tile value={t.days} label="DAYS" ready={t.ready} />
            <Tile value={t.hours} label="HOURS" ready={t.ready} />
            <Tile value={t.minutes} label="MINUTES" ready={t.ready} />
            <Tile value={t.seconds} label="SECONDS" ready={t.ready} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 flex items-center justify-center gap-6" aria-hidden>
        <Diya className="w-10" />
        <Diya className="w-12" />
        <Diya className="w-10" />
      </div>
    </section>
  );
}
