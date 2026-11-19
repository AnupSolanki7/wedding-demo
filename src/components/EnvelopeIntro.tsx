"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Hand } from "lucide-react";
import WaxSeal from "./WaxSeal";
import { GoldDust } from "./FloatingDecorations";
import { Bell, CornerFlourish, Diya, Lotus, Toran } from "./ornaments";
import { prefersReducedMotion, registerGsap } from "@/lib/animations";
import { wedding } from "@/data/wedding";

registerGsap();

interface Props {
  /** True when replaying from the final section: fade in over the page first. */
  replay?: boolean;
  /** Replay only — the overlay fully covers the page. */
  onCovered?: () => void;
  /** The card has filled the screen; mount the invitation underneath. */
  onReveal: () => void;
  /** The overlay has faded away; unmount it. */
  onDone: () => void;
}

const FLAP_CLIP = "polygon(0 0, 100% 0, 54% 93%, 50% 100%, 46% 93%)";
const LINER_CLIP = "polygon(0 100%, 100% 100%, 54% 7%, 50% 0, 46% 7%)";
const POCKET_CLIP = "polygon(0 0, 50% 54%, 100% 0, 100% 100%, 0 100%)";

export default function EnvelopeIntro({ replay = false, onCovered, onReveal, onDone }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const opened = useRef(false);
  const idle = useRef<gsap.core.Tween | null>(null);
  const tiltX = useRef<gsap.QuickToFunc | null>(null);
  const tiltY = useRef<gsap.QuickToFunc | null>(null);
  const { couple } = wedding;

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (replay) {
        tl.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.9, ease: "power2.inOut", onComplete: onCovered });
      }

      if (prefersReducedMotion()) {
        tl.set(q("[data-intro]"), { autoAlpha: 1 });
        return;
      }

      tl.fromTo(q('[data-intro="decor"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.6 })
        .fromTo(q('[data-intro="top"]'), { autoAlpha: 0, y: -14 }, { autoAlpha: 1, y: 0, duration: 1.1 }, "<0.2")
        .fromTo(
          q('[data-intro="envelope"]'),
          { autoAlpha: 0, scale: 0.84, y: 26 },
          { autoAlpha: 1, scale: 1, y: 0, duration: 1.9, ease: "expo.out" },
          "<0.15"
        )
        .fromTo(q('[data-intro="line"]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14 }, "-=1.3")
        .fromTo(q('[data-intro="hint"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, "-=0.4")
        .add(() => {
          if (opened.current) return;
          idle.current = gsap.to(q('[data-intro="envelope"]'), {
            y: -7,
            duration: 2.6,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });

      const tilt = q("[data-env-tilt]")[0];
      if (tilt && window.matchMedia("(hover: hover)").matches) {
        gsap.set(tilt, { transformPerspective: 1200 });
        tiltX.current = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });
        tiltY.current = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
      }
    },
    { scope: root }
  );

  const onPointerMove = contextSafe((e: React.PointerEvent<HTMLButtonElement>) => {
    if (opened.current || !tiltX.current || !tiltY.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    tiltX.current(((e.clientX - r.left) / r.width - 0.5) * 10);
    tiltY.current(-((e.clientY - r.top) / r.height - 0.5) * 8);
  });
  const onPointerLeave = contextSafe(() => {
    tiltX.current?.(0);
    tiltY.current?.(0);
  });

  const open = contextSafe(() => {
    if (opened.current) return;
    opened.current = true;
    idle.current?.kill();

    const q = gsap.utils.selector(root);
    const card = q('[data-env="card"]')[0] as HTMLElement;

    if (prefersReducedMotion()) {
      gsap
        .timeline()
        .to(q('[data-intro="beige"]'), { autoAlpha: 1, duration: 0.4 })
        .add(onReveal)
        .to(root.current, { autoAlpha: 0, duration: 0.5, onComplete: onDone });
      return;
    }

    const centreOffset = () => {
      const r = card.getBoundingClientRect();
      return window.innerHeight / 2 - (r.top + r.height / 2);
    };
    const coverScale = () => {
      const r = card.getBoundingClientRect();
      const w = r.width / 1.12;
      const h = r.height / 1.12;
      return Math.max(window.innerWidth / w, window.innerHeight / h) * 1.08;
    };

    gsap
      .timeline({ defaults: { ease: "power2.inOut" } })
      .to(q('[data-intro="hint"]'), { autoAlpha: 0, duration: 0.3 })
      .to(q('[data-intro="envelope"]'), { y: 0, duration: 0.35 }, 0)
      .to(q("[data-env-tilt]"), { rotationX: 0, rotationY: 0, duration: 0.35 }, 0)
      // 1 — the seal is pressed, cracks, and breaks apart
      .set(q("[data-seal-glow]"), { animation: "none" }, 0)
      .to(q("[data-seal]"), { scale: 1.12, duration: 0.22, ease: "power1.out" }, 0.05)
      .to(q("[data-seal-crack]"), { strokeDashoffset: 0, duration: 0.32, ease: "none" })
      .to(q("[data-seal]"), { scale: 1, duration: 0.18 }, "<")
      .addLabel("break")
      .to(q("[data-seal-left]"), { xPercent: -55, yPercent: 120, rotation: -38, autoAlpha: 0, duration: 1, ease: "power2.in" }, "break")
      .to(q("[data-seal-right]"), { xPercent: 55, yPercent: 140, rotation: 32, autoAlpha: 0, duration: 1, ease: "power2.in" }, "break")
      .to(q("[data-seal-crack]"), { autoAlpha: 0, duration: 0.2 }, "break")
      .fromTo(
        q("[data-seal-crumb]"),
        { autoAlpha: 1, x: 0, y: 0 },
        {
          autoAlpha: 0,
          x: (i: number) => (i - 3) * 20,
          y: (i: number) => 26 + (i % 3) * 26,
          rotation: 200,
          duration: 0.9,
          ease: "power2.out",
        },
        "break"
      )
      // 2 — the flap swings open in 3D and tucks behind the card
      .to(q('[data-env="flap"]'), { rotationX: 180, duration: 1.2, ease: "power2.inOut" }, "break+=0.2")
      .set(q('[data-env="flap-wrap"]'), { zIndex: 2 }, "break+=0.8")
      // 3 — the invitation card slides up out of the envelope
      .to(card, { yPercent: -108, duration: 1.6, ease: "power2.inOut" }, "break+=1.1")
      .set(card, { zIndex: 9 })
      .addLabel("out")
      // 4 — the envelope falls away while the card settles centre stage
      .to(q("[data-env-part]"), { y: () => window.innerHeight * 0.8, autoAlpha: 0, duration: 1.25, ease: "power2.in" }, "out")
      .to(q('[data-intro="top"], [data-intro="line"]'), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.04 }, "out")
      .to(card, { y: centreOffset, scale: 1.12, duration: 1.35, ease: "power3.inOut" }, "out+=0.15")
      .addLabel("zoom")
      // 5 — the card fills the screen and the maroon warms into beige paper
      .to(q('[data-env="card-content"]'), { autoAlpha: 0, duration: 0.5 }, "zoom+=0.25")
      .to(card, { scale: coverScale, duration: 1.3, ease: "power3.in" }, "zoom+=0.2")
      .to(q('[data-intro="beige"]'), { autoAlpha: 1, duration: 1, ease: "power2.in" }, "zoom+=0.4")
      .add(onReveal)
      .to(root.current, { autoAlpha: 0, duration: 1, ease: "power2.out", onComplete: onDone });
  });

  return (
    <div
      ref={root}
      className="maroon-silk fixed inset-0 z-50 overflow-hidden"
      style={replay ? { opacity: 0, visibility: "hidden" } : undefined}
      role="dialog"
      aria-modal="true"
      aria-label={`Wedding invitation of ${couple.bride} and ${couple.groom}`}
    >
      {/* ambient decoration */}
      <div data-intro="decor" className="pointer-events-none absolute inset-0 opacity-0">
        <Toran className="absolute inset-x-0 top-0 h-[64px] w-full sm:h-[84px]" />
        <GoldDust count={34} />
        <CornerFlourish className="absolute bottom-3 left-3 w-16 -scale-y-100 opacity-80 sm:w-24" />
        <CornerFlourish className="absolute bottom-3 right-3 w-16 -scale-100 opacity-80 sm:w-24" />
        <Bell className="sway absolute left-[6%] top-[60px] hidden w-7 md:block" style={{ "--sway-dur": "4s" } as React.CSSProperties} />
        <Bell className="sway absolute right-[6%] top-[60px] hidden w-7 md:block" style={{ "--sway-dur": "4.6s" } as React.CSSProperties} />
        <Diya className="absolute bottom-6 left-[12%] hidden w-12 sm:block" />
        <Diya className="absolute bottom-6 right-[12%] hidden w-12 sm:block" />
      </div>

      {/* warm paper wash used during the transition */}
      <div data-intro="beige" className="paper pointer-events-none absolute inset-0 z-[1] opacity-0" />

      <div className="relative z-[2] flex h-full flex-col items-center justify-center px-4 pb-6 pt-[68px] text-center sm:pt-[88px]">
        <p data-intro="top" className="font-cinzel text-[11px] tracking-[0.32em] text-gold-light opacity-0 sm:text-sm">
          {wedding.invocation}
        </p>

        <div className="envelope-stage mt-5 sm:mt-7">
          <button
            type="button"
            data-intro="envelope"
            onClick={open}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            aria-label="Open your invitation"
            className="envelope-size relative block cursor-pointer opacity-0 outline-offset-8"
          >
            <span data-env-tilt className="absolute inset-0 block">
              {/* back panel with a maroon damask liner */}
              <span
                data-env-part
                className="absolute inset-0 z-[1] block overflow-hidden rounded-[3px] bg-[#e9d6ae] shadow-[0_30px_60px_-18px_rgba(20,0,4,0.75)]"
              >
                <span className="maroon-silk absolute inset-[5px] block rounded-[2px]" />
              </span>

              {/* the invitation card tucked inside */}
              <span
                data-env="card"
                className="paper-ivory absolute left-[6%] right-[6%] top-[7%] z-[3] block h-[86%] rounded-[2px] shadow-[0_4px_18px_rgba(60,20,10,0.25)] [container-type:inline-size]"
              >
                <span data-env="card-content" className="absolute inset-[4%] flex flex-col items-center border border-gold/70 pt-[5%] outline outline-1 outline-offset-[-6px] outline-gold/40">
                  <span className="font-devanagari text-[3.6cqw] text-maroon/80">{wedding.invocationDevanagari}</span>
                  <span className="text-foil-dark mt-[2%] font-cinzel text-[3cqw] tracking-[0.3em]">The wedding of</span>
                  <span className="mt-[1%] font-script text-[10cqw] leading-none text-maroon">
                    {couple.bride} <span className="text-[6cqw] text-gold">&amp;</span> {couple.groom}
                  </span>
                  <span className="mt-[2%] font-devanagari text-[4cqw] text-gold-dark">शुभविवाह</span>
                </span>
              </span>

              {/* front pocket */}
              <span data-env-part className="absolute inset-0 z-[4] block" style={{ filter: "drop-shadow(0 -2px 3px rgba(81,53,30,0.18))" }}>
                <span className="paper absolute inset-0 block overflow-hidden rounded-[3px]" style={{ clipPath: POCKET_CLIP }}>
                  <svg viewBox="0 0 300 200" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                    <path d="M0 0 150 108 0 200Z" fill="#51351e" opacity=".035" />
                    <path d="M300 0 150 108 300 200Z" fill="#51351e" opacity=".06" />
                    <path d="M0 200 140 112q10-7 20 0L300 200Z" fill="#fff7e8" opacity=".35" />
                    <path d="M0 200 140 112q10-7 20 0L300 200" fill="none" stroke="#51351e" strokeOpacity=".22" strokeWidth="1" />
                    <path d="M12 192 141 118q9-6 18 0l129 74" fill="none" stroke="#b88632" strokeWidth=".9" />
                    <rect x="7" y="7" width="286" height="186" fill="none" stroke="#b88632" strokeWidth=".9" />
                    <rect x="11" y="11" width="278" height="178" fill="none" stroke="#b88632" strokeOpacity=".5" strokeWidth=".5" />
                  </svg>
                  <CornerFlourish className="absolute bottom-[4%] left-[2.6%] w-[13%] -scale-y-100" />
                  <CornerFlourish className="absolute bottom-[4%] right-[2.6%] w-[13%] -scale-100" />
                  <Lotus className="absolute bottom-[12%] left-1/2 w-[15%] -translate-x-1/2" />
                  <span className="absolute bottom-[5.5%] left-1/2 -translate-x-1/2 whitespace-nowrap font-cinzel text-[clamp(7px,1.9vw,10px)] tracking-[0.35em] text-gold-dark">
                    Shubh Vivah
                  </span>
                  <span className="shimmer-sweep block" />
                </span>
              </span>

              {/* top flap — front is envelope paper, back is the damask liner */}
              <span data-env-part data-env="flap-wrap" className="absolute inset-x-0 top-0 z-[5] block h-[57%] [perspective:900px] [perspective-origin:50%_0%]">
                <span data-env="flap" className="env-flap absolute inset-0 block">
                  <span className="env-face absolute inset-0 block" style={{ filter: "drop-shadow(0 3px 3px rgba(81,53,30,0.28))" }}>
                    <span className="paper absolute inset-0 block overflow-hidden rounded-t-[3px]" style={{ clipPath: FLAP_CLIP }}>
                      <svg viewBox="0 0 300 114" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
                        <path d="M14 7 150 104 286 7" fill="none" stroke="#b88632" strokeWidth=".9" />
                        <path d="M7 7h286" stroke="#b88632" strokeWidth=".9" />
                        <path d="M11 11h278" stroke="#b88632" strokeOpacity=".5" strokeWidth=".5" />
                      </svg>
                      <CornerFlourish className="absolute left-[2.6%] top-[7%] w-[13%]" />
                      <CornerFlourish className="absolute right-[2.6%] top-[7%] w-[13%] -scale-x-100" />
                      <span className="shimmer-sweep block" />
                    </span>
                  </span>
                  <span
                    className="env-face maroon-silk absolute inset-0 block"
                    style={{ clipPath: LINER_CLIP, transform: "rotateX(180deg)" }}
                  />
                </span>
              </span>

              {/* wax seal at the flap tip */}
              <span data-env-part className="absolute left-1/2 top-[57%] z-[6] block w-[21%] -translate-x-1/2 -translate-y-1/2">
                <WaxSeal first={couple.monogram.first} second={couple.monogram.second} className="aspect-square w-full" />
              </span>
            </span>
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center sm:mt-8">
          <p data-intro="line" className="font-body text-sm italic text-beige/80 opacity-0 sm:text-base">
            With the blessings of our families
          </p>
          <p data-intro="line" className="mt-3 font-cinzel text-xs tracking-[0.34em] text-gold-light opacity-0 sm:text-sm">
            You are cordially invited
          </p>
          <p data-intro="line" className="mt-1.5 font-cinzel text-[10px] tracking-[0.3em] text-beige/70 opacity-0 sm:text-xs">
            to celebrate the wedding of
          </p>
          <h1 data-intro="line" className="mt-2 px-2 font-script text-[44px] leading-tight opacity-0 sm:text-6xl">
            <span className="text-foil">
              {couple.bride} <span className="font-serif text-3xl italic sm:text-4xl">&amp;</span> {couple.groom}
            </span>
          </h1>
          <button
            type="button"
            data-intro="hint"
            onClick={open}
            className="mt-4 flex min-h-11 items-center gap-2 rounded-full px-4 font-cinzel text-[10px] tracking-[0.28em] text-beige/75 opacity-0 transition-colors hover:text-gold-light sm:text-[11px]"
          >
            <Hand className="nudge h-4 w-4" aria-hidden strokeWidth={1.4} />
            Tap to open your invitation
          </button>
        </div>
      </div>
    </div>
  );
}
