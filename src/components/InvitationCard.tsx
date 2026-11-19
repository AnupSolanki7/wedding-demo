"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  CornerFlourish,
  GaneshMotif,
  GoldDivider,
  MangoSprig,
  MarigoldGarland,
  Monogram,
  RangoliMandala,
  TempleArch,
  Toran,
} from "./ornaments";
import { EASE_ROYAL, fadeIn, fadeUp, inkIn, stagger } from "@/lib/animations";
import { wedding } from "@/data/wedding";

export default function InvitationCard() {
  const { couple } = wedding;

  return (
    <section id="invitation" aria-labelledby="invitation-title" className="paper relative overflow-hidden pb-16 pt-24 sm:pb-24 sm:pt-32">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.6, ease: EASE_ROYAL, delay: 0.3 }}
        className="absolute inset-x-0 top-0"
      >
        <Toran className="h-[70px] w-full sm:h-[92px]" />
      </motion.div>

      <RangoliMandala className="spin-slow pointer-events-none absolute left-1/2 top-[46%] w-[150vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
      <MangoSprig className="pointer-events-none absolute -left-4 bottom-10 w-28 opacity-70 sm:left-6 sm:w-40" />
      <MangoSprig className="pointer-events-none absolute -right-4 bottom-10 w-28 -scale-x-100 opacity-70 sm:right-6 sm:w-40" />

      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: EASE_ROYAL, delay: 0.45 }}
        className="paper-ivory gold-frame relative mx-4 mt-10 max-w-[560px] rounded-[3px] px-7 pb-12 pt-20 shadow-[0_30px_60px_-30px_rgba(81,53,30,0.55)] sm:mx-auto sm:px-14 sm:pb-16 sm:pt-24"
      >
        {/* monogram medallion resting on the top edge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE_ROYAL, delay: 1 }}
          className="absolute left-1/2 top-0 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ivory p-1.5 shadow-[0_8px_20px_-8px_rgba(81,53,30,0.5)] sm:w-28"
        >
          <Monogram first={couple.monogram.first} second={couple.monogram.second} className="w-full" />
        </motion.div>

        <CornerFlourish className="absolute left-2 top-2 w-14 sm:w-20" />
        <CornerFlourish className="absolute right-2 top-2 w-14 -scale-x-100 sm:w-20" />
        <CornerFlourish className="absolute bottom-2 left-2 w-14 -scale-y-100 sm:w-20" />
        <CornerFlourish className="absolute bottom-2 right-2 w-14 -scale-100 sm:w-20" />

        <MarigoldGarland count={14} className="sway pointer-events-none absolute -left-3 top-6 w-4 sm:-left-4 sm:w-5" />
        <MarigoldGarland count={14} className="sway pointer-events-none absolute -right-3 top-6 w-4 sm:-right-4 sm:w-5" />

        <TempleArch className="pointer-events-none absolute inset-x-4 top-10 w-[calc(100%-2rem)] sm:inset-x-8 sm:w-[calc(100%-4rem)]" />

        <motion.div variants={stagger(0.16, 1.1)} initial="hidden" animate="show" className="relative flex flex-col items-center text-center">
          <motion.div variants={fadeIn}>
            <GaneshMotif className="w-20 sm:w-24" />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-3 font-devanagari text-base text-maroon sm:text-lg">
            {wedding.invocationDevanagari}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-5 w-48 sm:w-60">
            <GoldDivider className="w-full" />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 font-cinzel text-[11px] tracking-[0.28em] text-brown/80 sm:text-xs">
            With the blessings of our families
          </motion.p>
          <motion.p variants={fadeUp} className="mt-3 font-cinzel text-[11px] tracking-[0.28em] text-brown/80 sm:text-xs">
            We invite you to our
          </motion.p>
          <motion.h2
            id="invitation-title"
            variants={inkIn}
            className="mt-3 font-cinzel text-xl font-semibold uppercase leading-snug text-maroon text-balance sm:text-[28px]"
          >
            Grand Wedding Celebration
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-7 flex flex-col items-center">
            <span className="text-foil-dark px-3 font-script text-[64px] leading-[1.05] sm:text-[84px]">{couple.bride}</span>
            <span className="my-1 flex items-center gap-3 font-serif text-2xl italic text-gold-dark">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
              &amp;
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
            </span>
            <span className="text-foil-dark px-3 font-script text-[64px] leading-[1.05] sm:text-[84px]">{couple.groom}</span>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-6 w-48 sm:w-60">
            <GoldDivider className="w-full" />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 max-w-sm font-serif text-xl italic leading-relaxed text-brown sm:text-2xl">
            Two families, two traditions, one beautiful celebration of love.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-8 flex items-center gap-3 text-gold-dark">
            <span lang="gu" className="font-gujarati text-base">
              શુભ લગ્ન
            </span>
            <span className="text-xs">✦</span>
            <span lang="mr" className="font-devanagari text-lg">
              शुभविवाह
            </span>
          </motion.p>
        </motion.div>
      </motion.article>

      <motion.a
        href="#date-reveal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="relative mx-auto mt-10 flex w-fit flex-col items-center gap-1 font-cinzel text-[10px] tracking-[0.3em] text-brown/70"
      >
        Scroll to continue
        <ChevronDown className="nudge h-5 w-5 text-gold-dark" strokeWidth={1.4} aria-hidden />
      </motion.a>
    </section>
  );
}
