"use client";

import { motion } from "framer-motion";
import { GoldDivider } from "./ornaments";
import { fadeUp, inkIn, stagger, viewportOnce } from "@/lib/animations";

interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  script?: string;
  subtitle?: string;
  tone?: "dark" | "light";
  className?: string;
}

export default function SectionHeading({ id, eyebrow, title, script, subtitle, tone = "dark", className = "" }: Props) {
  const light = tone === "light";
  return (
    <motion.header
      variants={stagger(0.14)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`mx-auto flex max-w-2xl flex-col items-center text-center ${className}`}
    >
      {script && (
        <motion.p variants={fadeUp} className={`font-script text-3xl sm:text-4xl ${light ? "text-gold-light" : "text-gold-dark"}`}>
          {script}
        </motion.p>
      )}
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className={`mt-1 font-cinzel text-[11px] tracking-[0.32em] sm:text-xs ${light ? "text-beige/75" : "text-brown/70"}`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        id={id}
        variants={inkIn}
        className={`mt-2 font-cinzel text-[22px] font-semibold uppercase leading-snug text-balance sm:text-3xl ${
          light ? "text-gold-pale" : "text-maroon"
        }`}
      >
        {title}
      </motion.h2>
      <motion.div variants={fadeUp} className="mt-4 w-56 sm:w-72">
        <GoldDivider className="w-full" />
      </motion.div>
      {subtitle && (
        <motion.p variants={fadeUp} className={`mt-4 font-serif text-lg italic sm:text-xl ${light ? "text-beige/85" : "text-brown/85"}`}>
          {subtitle}
        </motion.p>
      )}
    </motion.header>
  );
}
