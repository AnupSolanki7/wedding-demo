"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { createAmbience, type Ambience } from "@/lib/ambience";
import { wedding } from "@/data/wedding";

/** Brass medallion that toggles the ambience. Muted until the guest opts in. */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ambience = useRef<Ambience | null>(null);

  useEffect(() => () => ambience.current?.stop(), []);

  const toggle = async () => {
    ambience.current ??= createAmbience(wedding.audio.src);
    if (playing) {
      ambience.current.stop();
      setPlaying(false);
      return;
    }
    try {
      await ambience.current.start();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Mute background music" : "Play soft traditional background music"}
      className="group fixed right-3 top-3 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-gold-light/70 bg-maroon/85 text-gold-pale shadow-[0_6px_18px_rgba(30,0,6,0.45)] backdrop-blur-[2px] transition-transform duration-300 hover:scale-105 sm:right-5 sm:top-5"
    >
      <span className="absolute inset-[3px] rounded-full border border-gold/40" aria-hidden />
      {playing ? (
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0, 0.2, 0.4].map((d) => (
            <span
              key={d}
              className="w-[3px] rounded-full bg-gold-pale"
              style={{ animation: `nudge 1s ease-in-out ${d}s infinite`, height: `${10 + d * 10}px` }}
            />
          ))}
        </span>
      ) : (
        <span className="relative" aria-hidden>
          <Music className="h-5 w-5" strokeWidth={1.5} />
          <VolumeX className="absolute -bottom-1.5 -right-2 h-3 w-3 rounded-full bg-maroon" strokeWidth={2} />
        </span>
      )}
    </button>
  );
}
