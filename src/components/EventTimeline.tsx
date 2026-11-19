"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import EventCard from "./EventCard";
import { EASE_ROYAL } from "@/lib/animations";
import { wedding } from "@/data/wedding";

/** Overview strip of the three ceremonies, followed by each event's own scene. */
export default function EventTimeline() {
  const { events } = wedding;
  return (
    <div id="celebrations">
      <section aria-labelledby="celebrations-title" className="paper relative px-4 pb-24 pt-20 sm:pt-28">
        <SectionHeading
          id="celebrations-title"
          script="Join us"
          title="The Wedding Celebrations"
          subtitle="Three sacred moments, one beautiful forever."
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-7 hidden h-px bg-gradient-to-r from-gold/0 via-gold/70 to-gold/0 sm:block" />
          <ol className="relative grid gap-8 sm:grid-cols-3 sm:gap-4">
          {events.map((e, i) => (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: EASE_ROYAL, delay: i * 0.18 }}
              className="relative flex flex-col items-center text-center"
            >
              <a
                href={`#${e.id}`}
                className="group flex flex-col items-center rounded-lg px-2 py-1"
                aria-label={`${e.name}, ${e.dateLabel} at ${e.timeLabel}`}
              >
                <span className="paper-ivory flex h-14 w-14 items-center justify-center rounded-full border border-gold font-serif text-xl font-semibold text-maroon shadow-[0_6px_16px_-8px_rgba(81,53,30,0.6)] transition-transform duration-500 group-hover:scale-110">
                  {e.number}
                </span>
                <span className="mt-3 font-cinzel text-sm font-semibold tracking-[0.16em] text-maroon">{e.name.toUpperCase()}</span>
                <span className="mt-1 font-serif text-lg italic text-brown/85">
                  {e.dateLabel} · {e.timeLabel}
                </span>
              </a>
            </motion.li>
          ))}
          </ol>
        </div>
      </section>

      {events.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>
  );
}
