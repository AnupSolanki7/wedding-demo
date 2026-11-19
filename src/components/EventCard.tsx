"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CalendarDays, Clock, ExternalLink, MapPin } from "lucide-react";
import FramedImage from "./FramedImage";
import { GoldDust, PetalRain } from "./FloatingDecorations";
import {
  BananaLeaf,
  Bell,
  FloralArch,
  Garbo,
  GoldDivider,
  HaldiBowl,
  HangingLamp,
  Kalash,
  Lantern,
  Lotus,
  MangoSprig,
  PaithaniBorder,
  PalaceSilhouette,
  RangoliMandala,
  Toran,
  type FrameShape,
  type PetalKind,
} from "./ornaments";
import { EASE_ROYAL, fadeUp, inkIn, prefersReducedMotion, registerGsap, stagger } from "@/lib/animations";
import type { EventTheme, WeddingEvent } from "@/data/wedding";

registerGsap();

interface ThemeStyle {
  section: string;
  body: string;
  heading: string;
  accent: string;
  muted: string;
  frame: string;
  shape: FrameShape;
  petals?: PetalKind;
  chip: string;
  button: string;
  thread: string;
  medallion: string;
}

const THEMES: Record<EventTheme, ThemeStyle> = {
  haldi: {
    section: "bg-[linear-gradient(180deg,#fbe8ab_0%,#f5cf65_58%,#ecb535_100%)]",
    body: "text-brown",
    heading: "text-[#7a2a12]",
    accent: "text-[#a2470c]",
    muted: "text-brown/80",
    frame: "#8a5a14",
    shape: "arch",
    petals: "marigold",
    chip: "border-[#8a5a14]/45 bg-[#fff3d0]/70 text-[#7a2a12]",
    button: "bg-[#7a2a12] text-[#fff3d0] hover:bg-[#5e1f0c] shadow-[0_10px_24px_-10px_rgba(122,42,18,0.8)]",
    thread: "#8a5a14",
    medallion: "bg-[#7a2a12] text-[#fbe8ab] border-[#f6c33a]",
  },
  vivah: {
    section: "paper",
    body: "text-brown",
    heading: "text-maroon",
    accent: "text-paithani",
    muted: "text-brown/80",
    frame: "#b88632",
    shape: "cusped",
    chip: "border-paithani/40 bg-ivory/80 text-paithani",
    button: "bg-paithani text-ivory hover:bg-[#154a30] shadow-[0_10px_24px_-10px_rgba(29,91,60,0.8)]",
    thread: "#b88632",
    medallion: "bg-paithani text-gold-pale border-paithani-pink",
  },
  varmala: {
    section: "bg-[linear-gradient(180deg,#3a0610_0%,#650d19_36%,#8f1e33_64%,#c4553f_86%,#e3925a_100%)]",
    body: "text-beige",
    heading: "text-gold-pale",
    accent: "text-rose",
    muted: "text-beige/85",
    frame: "#e3c27a",
    shape: "arch",
    petals: "rose",
    chip: "border-gold-light/50 bg-maroon-deep/40 text-gold-pale",
    button: "bg-gold-light text-maroon hover:bg-gold-pale shadow-[0_10px_30px_-10px_rgba(243,223,168,0.6)]",
    thread: "#e3c27a",
    medallion: "bg-maroon text-gold-pale border-gold-light",
  },
};

/* --------------------------------------------------------- decorations */

function HaldiDecor() {
  return (
    <>
      <div className="bandhani pointer-events-none absolute inset-0 opacity-[0.22]" />
      <Toran className="absolute inset-x-0 top-0 h-[64px] w-full sm:h-[84px]" />
      <div data-speed="-0.6" className="pointer-events-none absolute -right-28 top-24 w-72 opacity-25 sm:w-[420px]">
        <RangoliMandala className="spin-slow w-full" stroke="#7a2a12" fills={["#e9ad24", "#c92a3e", "#f6c33a", "#3f6b2a"]} />
      </div>
      <div data-speed="0.5" className="pointer-events-none absolute -left-32 bottom-10 w-72 opacity-20 sm:w-[380px]">
        <RangoliMandala className="spin-slow w-full" stroke="#7a2a12" fills={["#f6c33a", "#e88aa0", "#e9ad24", "#3f6b2a"]} />
      </div>
      <Garbo className="pointer-events-none absolute bottom-6 left-3 w-14 sm:left-10 sm:w-20" />
      <Garbo className="pointer-events-none absolute bottom-6 right-3 w-14 sm:right-10 sm:w-20" />
      <MangoSprig className="pointer-events-none absolute left-0 top-28 hidden w-36 -rotate-12 md:block" />
    </>
  );
}

function VivahDecor() {
  return (
    <>
      <PaithaniBorder className="absolute inset-x-0 top-0" />
      <Toran variant="vivah" className="absolute inset-x-0 top-[44px] h-[60px] w-full sm:h-[78px]" />
      <div data-speed="0.4" className="pointer-events-none absolute left-1/2 top-1/2 w-[130vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <RangoliMandala className="spin-slow w-full" />
      </div>
      <div data-speed="-0.35" className="pointer-events-none absolute -left-14 bottom-0 w-24 sm:-left-6 sm:w-48 lg:w-56">
        <BananaLeaf className="sway w-full" style={{ "--origin": "50% 100%", "--sway-dur": "7s" } as React.CSSProperties} />
      </div>
      <div data-speed="-0.35" className="pointer-events-none absolute -right-14 bottom-0 w-24 -scale-x-100 sm:-right-6 sm:w-48 lg:w-56">
        <BananaLeaf className="sway w-full" style={{ "--origin": "50% 100%", "--sway-dur": "8s" } as React.CSSProperties} />
      </div>
      <HangingLamp className="sway pointer-events-none absolute left-[8%] top-[90px] w-14 sm:left-[14%] sm:w-20" chain={90} style={{ "--sway-dur": "5s" } as React.CSSProperties} />
      <HangingLamp className="sway pointer-events-none absolute right-[8%] top-[90px] w-14 sm:right-[14%] sm:w-20" chain={90} style={{ "--sway-dur": "5.6s" } as React.CSSProperties} />
      <PaithaniBorder className="absolute inset-x-0 bottom-0" flip />
    </>
  );
}

function VarmalaDecor() {
  return (
    <>
      <GoldDust count={26} seed={14} />
      {/* skylines keep a minimum width so phones see a few domes, not one giant one */}
      <div data-speed="0.25" className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] opacity-80">
        <div className="absolute bottom-0 left-1/2 h-full w-[max(100%,1000px)] -translate-x-1/2">
          <PalaceSilhouette className="absolute bottom-0 h-full w-full" color="#5a0f1f" lit="#f6b75f" />
        </div>
      </div>
      <div data-speed="0.1" className="pointer-events-none absolute inset-x-0 bottom-0 h-[20%]">
        <div className="absolute bottom-0 left-1/2 h-full w-[max(100%,760px)] -translate-x-1/2">
          <PalaceSilhouette className="absolute bottom-0 h-full w-full" color="#2a040b" lit="#ffcf7a" />
        </div>
      </div>
      {[
        ["left-[5%]", "w-10 sm:w-14", "4.6s", "top-0"],
        ["left-[22%]", "hidden w-12 md:block", "5.4s", "-top-10"],
        ["right-[22%]", "hidden w-12 md:block", "5s", "-top-10"],
        ["right-[5%]", "w-10 sm:w-14", "4.2s", "top-0"],
      ].map(([pos, size, dur, top]) => (
        <Lantern
          key={pos}
          className={`sway pointer-events-none absolute ${top} ${pos} ${size}`}
          style={{ "--sway-dur": dur, "--sway-from": "-3deg", "--sway-to": "3deg" } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- card */

export default function EventCard({ event, index }: { event: WeddingEvent; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const t = THEMES[event.theme];
  const reverse = index % 2 === 1;
  const titleId = `${event.id}-title`;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-thread]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 85%", end: "top 25%", scrub: true } }
      );
      gsap.utils.toArray<HTMLElement>("[data-speed]", ref.current).forEach((el) => {
        const speed = parseFloat(el.dataset.speed ?? "0");
        gsap.fromTo(
          el,
          { y: () => -speed * 120 },
          {
            y: () => speed * 120,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id={event.id} aria-labelledby={titleId} className={`relative overflow-hidden ${t.section}`}>
      {event.theme === "haldi" && <HaldiDecor />}
      {event.theme === "vivah" && <VivahDecor />}
      {event.theme === "varmala" && <VarmalaDecor />}
      {t.petals && <PetalRain kind={t.petals} density={event.theme === "varmala" ? 1.25 : 0.9} seed={index + 3} />}

      <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-28 sm:px-8 sm:pt-36">
        {/* gold thread that stitches the celebrations together */}
        <div className="absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 sm:h-32">
          <span data-thread className="block h-full w-full origin-top" style={{ background: `linear-gradient(${t.thread}00, ${t.thread})` }} />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.9, ease: EASE_ROYAL }}
          className={`mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-full border-2 ${t.medallion} shadow-[0_10px_24px_-10px_rgba(0,0,0,0.5)]`}
        >
          <span className="font-cinzel text-[9px] tracking-[0.3em] opacity-80">EVENT</span>
          <span className="font-serif text-3xl font-semibold leading-none">{event.number}</span>
        </motion.div>

        <div className="mt-12 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className={`relative mx-auto w-full max-w-[400px] ${reverse ? "lg:order-2" : ""}`}>
            {event.theme === "varmala" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 2.2, ease: EASE_ROYAL }}
                className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(255,196,120,0.55)_0%,rgba(255,196,120,0)_65%)]"
              />
            )}
            <FramedImage src={event.image.src} alt={event.image.alt} shape={t.shape} frame={t.frame} position={event.image.position}>
              {event.theme === "varmala" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.6, ease: EASE_ROYAL, delay: 0.4 }}
                  className="pointer-events-none absolute inset-0"
                >
                  <FloralArch className="h-full w-full" />
                </motion.div>
              )}
            </FramedImage>
            {event.theme === "haldi" && <HaldiBowl className="absolute -bottom-10 left-1/2 w-44 -translate-x-1/2 sm:w-52" />}
            {event.theme === "vivah" && (
              <>
                <Kalash className="absolute -bottom-6 -left-4 w-16 sm:-left-10 sm:w-20" />
                <Lotus className="absolute -bottom-5 left-1/2 w-24 -translate-x-1/2" />
              </>
            )}
            {event.theme === "haldi" && <Bell className="sway absolute -top-6 right-4 w-6" />}
          </div>

          <motion.div
            variants={stagger(0.13)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`flex flex-col items-center text-center ${t.body}`}
          >
            <motion.p variants={fadeUp} lang={event.accent.script === "gujarati" ? "gu" : "mr"} className={`font-gujarati text-xl ${t.accent}`} style={{ fontFamily: "var(--ff-gujarati), var(--ff-devanagari), serif" }}>
              {event.accent.text}
            </motion.p>

            {event.preface?.map((line) => (
              <motion.p key={line} variants={fadeUp} className={`mt-3 max-w-md font-cinzel text-[11px] leading-relaxed tracking-[0.22em] sm:text-xs ${t.muted}`}>
                {line.toUpperCase()}
              </motion.p>
            ))}

            <motion.h3 id={titleId} variants={inkIn} className={`mt-4 font-cinzel text-[28px] font-semibold uppercase leading-tight text-balance sm:text-[40px] ${t.heading}`}>
              {event.name}
            </motion.h3>

            <motion.p variants={fadeUp} className={`mt-3 max-w-md font-serif text-xl italic leading-snug sm:text-2xl ${t.muted}`}>
              {event.theme === "vivah" ? event.tagline.toUpperCase() : event.tagline}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 w-52">
              <GoldDivider className="w-full" />
            </motion.div>

            <motion.dl variants={fadeUp} className="mt-6 grid w-full max-w-sm gap-4 text-left">
              {[
                { icon: CalendarDays, label: "Date", value: event.dateLabel },
                { icon: Clock, label: "Time", value: event.timeLabel },
                { icon: MapPin, label: "Venue", value: `${event.venue.name},\n${event.venue.address}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${t.chip}`}>
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.4} aria-hidden />
                  </span>
                  <div>
                    <dt className={`font-cinzel text-[10px] tracking-[0.3em] ${t.muted}`}>{label.toUpperCase()}</dt>
                    <dd className="mt-0.5 whitespace-pre-line font-serif text-lg font-medium leading-snug sm:text-xl">{value}</dd>
                  </div>
                </div>
              ))}
            </motion.dl>

            <motion.div variants={fadeUp} className={`mt-7 inline-flex items-center gap-3 rounded-full border px-4 py-2 ${t.chip}`}>
              <span className="flex -space-x-1.5" aria-hidden>
                {event.swatches.map((c) => (
                  <span key={c} className="h-4 w-4 rounded-full border border-white/70 shadow-sm" style={{ background: c }} />
                ))}
              </span>
              <span className="font-cinzel text-[10px] font-semibold tracking-[0.22em] sm:text-[11px]">THEME: {event.dressCode.toUpperCase()}</span>
            </motion.div>

            <motion.a
              variants={fadeUp}
              href={event.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${event.venue.name} on Google Maps (opens in a new tab)`}
              className={`mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-full px-7 font-cinzel text-xs font-semibold tracking-[0.22em] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 ${t.button}`}
            >
              <MapPin className="h-4 w-4" strokeWidth={1.6} aria-hidden />
              VIEW VENUE ON MAP
              <ExternalLink className="h-3.5 w-3.5 opacity-70" strokeWidth={1.6} aria-hidden />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
