import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Variants } from "framer-motion";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  registered = true;
}

export const EASE_ROYAL = [0.22, 1, 0.36, 1] as const;
export const EASE_SILK = [0.65, 0, 0.35, 1] as const;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Deterministic PRNG so decorative scatter is identical between renders. */
export function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------------------------------------------- framer variants */

export const stagger = (gap = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_ROYAL } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_ROYAL } },
};

/** Letter-spaced headings settle from wide tracking, like ink pressing into paper. */
export const inkIn: Variants = {
  hidden: { opacity: 0, letterSpacing: "0.5em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    letterSpacing: "0.22em",
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: EASE_ROYAL },
  },
};

export const bloomIn: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -25 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1.2, ease: EASE_ROYAL } },
};

/** Curtain-style mask that lifts from the bottom edge. */
export const maskReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.4, ease: EASE_SILK } },
};

export const viewportOnce = { once: true, amount: 0.3 } as const;
