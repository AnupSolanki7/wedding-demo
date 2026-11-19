"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FRAME_PATHS, type FrameShape } from "./ornaments";
import { EASE_SILK, maskReveal } from "@/lib/animations";

interface Props {
  src: string;
  alt: string;
  shape?: FrameShape;
  /** CSS aspect-ratio, e.g. "4 / 5". Shapes are designed for 4:5. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** object-position, to keep faces inside arched frames. */
  position?: string;
  /** Gold rule colour drawn around the shape; null for no frame. */
  frame?: string | null;
  className?: string;
  children?: React.ReactNode;
}

function maskFor(shape: FrameShape) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 125' preserveAspectRatio='none'><path d='${FRAME_PATHS[shape]}' fill='black'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Photograph inside a traditional frame shape. The original image is shown
 * untouched (no filters); only the frame shape crops its edges.
 */
export default function FramedImage({
  src,
  alt,
  shape = "arch",
  aspect = "4 / 5",
  sizes = "(max-width: 768px) 90vw, 480px",
  priority = false,
  position = "50% 35%",
  frame = "#b88632",
  className = "",
  children,
}: Props) {
  const mask = maskFor(shape);
  const isSvg = src.endsWith(".svg");

  return (
    // The trigger lives on the unclipped wrapper: an element starting at
    // clip-path inset(100%) never registers as in view.
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`relative ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <motion.div
        variants={maskReveal}
        className="absolute inset-[3%] overflow-hidden"
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <motion.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.18 }, show: { scale: 1, transition: { duration: 2.2, ease: EASE_SILK } } }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            unoptimized={isSvg}
            className="object-cover"
            style={{ objectPosition: position }}
          />
        </motion.div>
      </motion.div>

      {frame && (
        <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
          <path d={FRAME_PATHS[shape]} fill="none" stroke={frame} strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
          <path
            d={FRAME_PATHS[shape]}
            transform="translate(3 3.75) scale(.94)"
            fill="none"
            stroke={frame}
            strokeOpacity=".7"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      )}
      {children}
    </motion.div>
  );
}
