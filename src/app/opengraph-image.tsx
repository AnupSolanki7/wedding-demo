import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { wedding } from "@/data/wedding";

export const alt = `${wedding.couple.bride} & ${wedding.couple.groom} — Wedding Invitation`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const fonts = join(process.cwd(), "src/app/og-fonts");
  const [vibes, cinzel] = await Promise.all([
    readFile(join(fonts, "GreatVibes-Regular.ttf")),
    readFile(join(fonts, "CinzelDecorative-Regular.ttf")),
  ]);
  const { bride, groom } = wedding.couple;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(ellipse at 50% 45%, #8d1629 0%, #650d19 50%, #3a0610 100%)",
          fontFamily: "Cinzel",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 28, left: 28, right: 28, bottom: 28,
            border: "2px solid #b88632",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 40, left: 40, right: 40, bottom: 40,
            border: "1px solid rgba(227,194,122,0.5)",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#e3c27a" }}>
          <div style={{ fontSize: 24, letterSpacing: 8 }}>{wedding.invocation}</div>
          <div style={{ marginTop: 34, fontSize: 24, letterSpacing: 8, color: "#f8ebd1" }}>
            YOU ARE CORDIALLY INVITED TO THE WEDDING OF
          </div>
          <div style={{ marginTop: 10, fontFamily: "Great Vibes", fontSize: 150, lineHeight: 1.15, color: "#f3dfa8" }}>
            {`${bride} & ${groom}`}
          </div>
          <div style={{ marginTop: 18, width: 360, height: 2, background: "linear-gradient(90deg, rgba(184,134,50,0), #e3c27a, rgba(184,134,50,0))" }} />
          <div style={{ marginTop: 26, fontSize: 22, letterSpacing: 7, color: "rgba(248,235,209,0.8)" }}>
            TAP TO OPEN YOUR INVITATION
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Great Vibes", data: vibes, style: "normal", weight: 400 },
        { name: "Cinzel", data: cinzel, style: "normal", weight: 400 },
      ],
    }
  );
}
