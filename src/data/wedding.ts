/**
 * Every name, date, venue, theme and image used by the invitation lives here.
 *
 * Replacing photographs: drop the real photo into /public/assets/couple or
 * /public/assets/events (JPG/PNG/WebP/AVIF all work) and change the `src`
 * below. Images are served through next/image, which produces WebP/AVIF
 * automatically and never alters or crops faces beyond the frame you choose.
 */

export type EventTheme = "haldi" | "vivah" | "varmala";

export interface ImageAsset {
  src: string;
  alt: string;
  /** Optional focal point for object-position, e.g. "50% 30%" to keep faces in frame. */
  position?: string;
}

export interface WeddingEvent {
  id: string;
  number: string;
  theme: EventTheme;
  name: string;
  /** Regional script shown as a decorative accent beside the title. */
  accent: { text: string; script: "gujarati" | "devanagari" };
  /** Lines shown above the title (invocation-style wording). */
  preface?: string[];
  tagline: string;
  dateLabel: string;
  timeLabel: string;
  /** ISO 8601 with the IST offset so every guest sees the same moment. */
  startsAt: string;
  venue: { name: string; address: string; mapUrl: string };
  dressCode: string;
  swatches: string[];
  image: ImageAsset;
}

export interface GalleryImage extends ImageAsset {
  caption: string;
}

export const wedding = {
  couple: {
    bride: "Ananya",
    groom: "Rohan",
    monogram: { first: "A", second: "R" },
  },

  invocation: "|| Shree Ganeshaya Namah ||",
  invocationDevanagari: "॥ श्री गणेशाय नमः ॥",

  /** The muhurat everyone counts down to. */
  wedding: {
    dateLabel: "5 December 2026",
    day: "5",
    month: "December",
    year: "2026",
    startsAt: "2026-12-05T12:05:00+05:30",
    timeZone: "Asia/Kolkata",
    revealLine: "The day we begin our forever",
  },

  events: [
    {
      id: "haldi",
      number: "01",
      theme: "haldi",
      name: "Haldi Ceremony",
      accent: { text: "પીઠી · हळद", script: "gujarati" },
      tagline: "A golden beginning, blessed with turmeric and laughter.",
      dateLabel: "4th December, 2026",
      timeLabel: "06:30 PM",
      startsAt: "2026-12-04T18:30:00+05:30",
      venue: {
        name: "Sunrise Meadows Resort",
        address: "Lakeview Road, Lonavala.",
        mapUrl: "https://maps.google.com/?q=Lonavala",
      },
      dressCode: "Traditional Yellow",
      swatches: ["#E9AD24", "#F6C33A", "#D9661A", "#3F6B2A"],
      image: {
        src: "/assets/events/haldi.svg",
        alt: "Illustration of the couple at their Haldi ceremony beneath marigold strings",
      },
    },
    {
      id: "vaidik-vivah",
      number: "02",
      theme: "vivah",
      name: "Vaidik Vivah",
      accent: { text: "मंगलाष्टक", script: "devanagari" },
      preface: [
        "With Vedic mantras and the blessings of our families",
        "We invite you to witness our sacred union",
      ],
      tagline: "The beginning of forever",
      dateLabel: "5th December, 2026",
      timeLabel: "12:05 PM",
      startsAt: "2026-12-05T12:05:00+05:30",
      venue: {
        name: "Royal Orchid Banquet & Lawns",
        address: "Baner, Pune.",
        mapUrl: "https://maps.google.com/?q=Baner,+Pune",
      },
      dressCode: "Maharashtrian Elegance",
      swatches: ["#1D6B45", "#D14F7F", "#D6AC52", "#F3E6C8"],
      image: {
        src: "/assets/events/vaidik-vivah.svg",
        alt: "Illustration of the bride in a green Paithani saree and the groom in a cream kurta beneath the mandap",
      },
    },
    {
      id: "varmala",
      number: "03",
      theme: "varmala",
      name: "Varmala Ceremony",
      accent: { text: "શુભ લગ્ન", script: "gujarati" },
      tagline: "Two souls, one promise, a lifetime of togetherness.",
      dateLabel: "5th December, 2026",
      timeLabel: "06:00 PM",
      startsAt: "2026-12-05T18:00:00+05:30",
      venue: {
        name: "Royal Orchid Banquet & Lawns",
        address: "Baner, Pune.",
        // Same venue as the Vaidik Vivah, so it shares that map link.
        mapUrl: "https://maps.google.com/?q=Baner,+Pune",
      },
      dressCode: "Festive Glamour",
      swatches: ["#B0122B", "#E8A0A0", "#D6AC52", "#FBF1DD"],
      image: {
        src: "/assets/events/varmala.svg",
        alt: "Illustration of the couple exchanging garlands under a floral arch at sunset",
      },
    },
  ] as WeddingEvent[],

  gallery: [
    { src: "/assets/couple/couple-01.svg", alt: "Ananya and Rohan", caption: "Two hearts, one promise" },
    { src: "/assets/couple/couple-02.svg", alt: "Ananya and Rohan", caption: "Blessed beginnings" },
    { src: "/assets/couple/couple-03.svg", alt: "Ananya and Rohan", caption: "Laughter & haldi" },
    { src: "/assets/couple/couple-04.svg", alt: "Ananya and Rohan", caption: "Forever starts here" },
    { src: "/assets/couple/couple-05.svg", alt: "Ananya and Rohan", caption: "Hand in hand" },
    { src: "/assets/couple/couple-06.svg", alt: "Ananya and Rohan", caption: "Always & always" },
  ] as GalleryImage[],

  /**
   * Background music. Leave `src` as null to use the built-in, synthesised
   * tanpura-and-temple-bell ambience; or drop an MP3 in /public/assets/audio
   * and point to it, e.g. "/assets/audio/shehnai.mp3". Always muted by default.
   */
  audio: { src: null as string | null },
};

export type Wedding = typeof wedding;
