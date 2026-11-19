import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes, Lora, Noto_Serif_Gujarati, Tiro_Devanagari_Marathi } from "next/font/google";
import { wedding } from "@/data/wedding";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--ff-cormorant",
  display: "swap",
});
const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--ff-cinzel", display: "swap" });
const script = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--ff-script", display: "swap" });
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--ff-lora", display: "swap" });
const gujarati = Noto_Serif_Gujarati({
  subsets: ["gujarati"],
  weight: ["400", "500"],
  variable: "--ff-gujarati",
  display: "swap",
  preload: false,
});
const devanagari = Tiro_Devanagari_Marathi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--ff-devanagari",
  display: "swap",
  preload: false,
});

const { bride, groom } = wedding.couple;
const title = `${bride} & ${groom} · Wedding Invitation`;
const description = `With the blessings of our families, you are cordially invited to celebrate the wedding of ${bride} & ${groom}. Tap to open your invitation.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title,
  description,
  openGraph: { title, description, type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#650D19",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${cinzel.variable} ${script.variable} ${lora.variable} ${gujarati.variable} ${devanagari.variable}`}
    >
      <body>
        <noscript>
          <style>{`[data-intro]{opacity:1!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
