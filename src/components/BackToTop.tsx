"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { scrollToTop, useLenis } from "./SmoothScroll";

/** Appears after the first screen; its gold ring traces scroll progress. */
export default function BackToTop() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShow(window.scrollY > window.innerHeight * 0.9);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const c = 2 * Math.PI * 21;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => scrollToTop(lenis)}
          aria-label="Back to top"
          className="fixed bottom-4 right-3 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold-pale shadow-[0_6px_18px_rgba(30,0,6,0.45)] sm:bottom-6 sm:right-5"
        >
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r="21" fill="none" stroke="#e3c27a" strokeOpacity=".25" strokeWidth="1.5" />
            <circle
              cx="24"
              cy="24"
              r="21"
              fill="none"
              stroke="#e3c27a"
              strokeWidth="1.8"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - progress)}
              strokeLinecap="round"
            />
          </svg>
          <ArrowUp className="h-5 w-5" strokeWidth={1.5} aria-hidden />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
