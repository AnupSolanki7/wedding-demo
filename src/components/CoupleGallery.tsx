"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import FramedImage from "./FramedImage";
import { Paisley } from "./ornaments";
import { EASE_ROYAL } from "@/lib/animations";
import { wedding, type GalleryImage } from "@/data/wedding";

const TILTS = [-3, 2.2, -1.6, 2.8, -2.4, 1.6];

function PhotoCorners() {
  const corner = "absolute h-5 w-5 bg-[linear-gradient(135deg,#b88632_50%,transparent_50%)] opacity-90";
  return (
    <>
      <span className={`${corner} left-1.5 top-1.5`} />
      <span className={`${corner} right-1.5 top-1.5 rotate-90`} />
      <span className={`${corner} bottom-1.5 right-1.5 rotate-180`} />
      <span className={`${corner} bottom-1.5 left-1.5 -rotate-90`} />
    </>
  );
}

function Polaroid({ photo, index }: { photo: GalleryImage; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE_ROYAL, delay: (index % 3) * 0.12 }}
      className="group w-[76vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none"
    >
      <div
        className="paper-ivory relative rounded-[2px] p-3 pb-4 shadow-[0_18px_40px_-20px_rgba(81,53,30,0.6)] transition-[transform,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] md:rotate-[var(--tilt)] md:p-4 md:pb-5 md:group-hover:-translate-y-2 md:group-hover:rotate-0 md:group-hover:shadow-[0_30px_60px_-24px_rgba(81,53,30,0.65)]"
        style={{ "--tilt": `${TILTS[index % TILTS.length]}deg` } as React.CSSProperties}
      >
        <div className="relative overflow-hidden">
          <FramedImage
            src={photo.src}
            alt={photo.alt}
            shape="rect"
            frame={null}
            position={photo.position}
            sizes="(max-width: 768px) 76vw, 33vw"
            className="transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] md:group-hover:scale-[1.04]"
          />
          <PhotoCorners />
        </div>
        <figcaption className="pt-3 text-center font-script text-2xl text-maroon md:text-[28px]">{photo.caption}</figcaption>
      </div>
    </motion.figure>
  );
}

export default function CoupleGallery() {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const photos = wedding.gallery;

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const onScroll = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + 20;
      setActive(Math.min(photos.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [photos.length]);

  const go = (i: number) => {
    const el = rail.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="paper relative overflow-hidden pb-24 pt-20 sm:pt-28">
      <Paisley className="pointer-events-none absolute -left-6 top-20 w-24 opacity-40 sm:left-8 sm:w-32" />
      <Paisley className="pointer-events-none absolute -right-6 bottom-24 w-24 rotate-180 opacity-40 sm:right-8 sm:w-32" />

      <SectionHeading id="gallery-title" script="Captured with love" title="Our Moments" subtitle="A few pages from the story we are about to write together." className="px-4" />

      <div
        ref={rail}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[12vw] pb-6 pt-2 md:mx-auto md:grid md:max-w-5xl md:grid-cols-3 md:gap-10 md:overflow-visible md:px-8"
        aria-label="Couple photographs"
      >
        {photos.map((photo, i) => (
          <Polaroid key={photo.src} photo={photo} index={i} />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => go(Math.max(0, active - 1))}
          aria-label="Previous photograph"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-dark disabled:opacity-40"
          disabled={active === 0}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <div className="flex gap-2">
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show photograph ${i + 1}`}
              aria-current={i === active}
              className="flex h-6 w-4 items-center justify-center"
            >
              <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-4 bg-gold" : "w-1.5 bg-gold/40"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(Math.min(photos.length - 1, active + 1))}
          aria-label="Next photograph"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold-dark disabled:opacity-40"
          disabled={active === photos.length - 1}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
