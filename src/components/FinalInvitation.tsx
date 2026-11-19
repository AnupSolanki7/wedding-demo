"use client";

import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { GoldDust } from "./FloatingDecorations";
import { Bell, CornerFlourish, Diya, GoldDivider, Lotus, MarigoldGarland, Monogram, RangoliMandala } from "./ornaments";
import { fadeUp, inkIn, stagger } from "@/lib/animations";
import { wedding } from "@/data/wedding";

export default function FinalInvitation({ onReplay }: { onReplay: () => void }) {
  const { couple } = wedding;
  return (
    <section id="closing" aria-labelledby="closing-title" className="maroon-silk relative overflow-hidden px-5 pb-20 pt-40 sm:pt-48">
      {/* dusk: the Varmala sunset deepens into night */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#e3925a] via-[#8f1e33]/70 to-transparent" />
      <GoldDust count={30} seed={21} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[160vw] max-w-[1000px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]">
        <RangoliMandala className="spin-slow w-full" stroke="#e3c27a" fills={["none", "#e3c27a", "none", "#f3dfa8"]} />
      </div>

      <MarigoldGarland count={10} className="sway pointer-events-none absolute left-[6%] top-0 w-4 sm:left-[12%] sm:w-5" />
      <MarigoldGarland count={14} className="sway pointer-events-none absolute left-[14%] top-0 hidden w-5 sm:block" style={{ "--sway-dur": "7s" } as React.CSSProperties} />
      <MarigoldGarland count={10} className="sway pointer-events-none absolute right-[6%] top-0 w-4 sm:right-[12%] sm:w-5" />
      <MarigoldGarland count={14} className="sway pointer-events-none absolute right-[14%] top-0 hidden w-5 sm:block" style={{ "--sway-dur": "7.4s" } as React.CSSProperties} />
      <Bell className="sway pointer-events-none absolute left-1/2 top-0 w-7 -translate-x-1/2" style={{ "--sway-dur": "3.8s" } as React.CSSProperties} />

      <motion.div
        variants={stagger(0.18)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <div className="relative w-full border border-gold/50 px-5 py-14 outline outline-1 outline-offset-[6px] outline-gold/30 sm:px-12">
          <CornerFlourish className="absolute -left-2 -top-2 w-16 sm:w-20" />
          <CornerFlourish className="absolute -right-2 -top-2 w-16 -scale-x-100 sm:w-20" />
          <CornerFlourish className="absolute -bottom-2 -left-2 w-16 -scale-y-100 sm:w-20" />
          <CornerFlourish className="absolute -bottom-2 -right-2 w-16 -scale-100 sm:w-20" />

          <motion.div variants={fadeUp}>
            <Lotus className="mx-auto w-20" />
          </motion.div>
          <motion.h2
            id="closing-title"
            variants={inkIn}
            className="mt-6 font-cinzel text-[22px] font-semibold uppercase leading-snug text-gold-pale text-balance sm:text-[32px]"
          >
            We can&apos;t wait to celebrate with you
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-md font-serif text-xl italic leading-relaxed text-beige/90 sm:text-2xl">
            Your presence will make our celebration even more special.
          </motion.p>
          <motion.div variants={fadeUp} className="mx-auto mt-8 w-52 sm:w-64">
            <GoldDivider className="w-full" />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 flex flex-col items-center font-script text-[56px] leading-[1.1] sm:flex-row sm:justify-center sm:gap-4 sm:text-7xl">
            <span className="text-foil px-2">{couple.bride}</span>
            <span className="font-serif text-3xl italic text-gold-light sm:text-4xl">&amp;</span>
            <span className="text-foil px-2">{couple.groom}</span>
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 font-serif text-lg italic text-beige/85 sm:text-xl">
            Two families. Two traditions. One beautiful beginning.
          </motion.p>
          <motion.p variants={fadeUp} className="mt-10 font-cinzel text-xs tracking-[0.36em] text-gold-light sm:text-sm">
            With love and gratitude
          </motion.p>
        </div>

        <motion.div variants={fadeUp} className="mt-12 flex items-end justify-center gap-6">
          <Diya className="mb-2 w-10" />
          <Monogram first={couple.monogram.first} second={couple.monogram.second} className="w-28 sm:w-32" />
          <Diya className="mb-2 w-10" />
        </motion.div>

        <motion.button
          variants={fadeUp}
          type="button"
          onClick={onReplay}
          className="group mt-12 inline-flex min-h-12 items-center gap-3 rounded-full border border-gold-light/70 px-8 font-cinzel text-xs font-semibold tracking-[0.24em] text-gold-pale transition-colors duration-300 hover:bg-gold-light hover:text-maroon"
        >
          <RotateCcw className="h-4 w-4 transition-transform duration-700 group-hover:-rotate-[360deg]" strokeWidth={1.6} aria-hidden />
          REPLAY OUR INVITATION
        </motion.button>

        <p className="mt-14 flex items-center gap-3 text-gold-light/70">
          <span lang="gu" className="font-gujarati">શુભ લગ્ન</span>
          <span aria-hidden>✦</span>
          <span lang="mr" className="font-devanagari">शुभविवाह</span>
        </p>
      </motion.div>
    </section>
  );
}
