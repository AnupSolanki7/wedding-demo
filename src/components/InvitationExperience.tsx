"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EnvelopeIntro from "./EnvelopeIntro";
import InvitationCard from "./InvitationCard";
import ScratchCard from "./ScratchCard";
import WeddingCountdown from "./WeddingCountdown";
import CoupleGallery from "./CoupleGallery";
import EventTimeline from "./EventTimeline";
import FinalInvitation from "./FinalInvitation";
import MusicToggle from "./MusicToggle";
import BackToTop from "./BackToTop";
import SmoothScroll, { scrollToTop, useLenis } from "./SmoothScroll";

function Story() {
  const lenis = useLenis();
  const [introKey, setIntroKey] = useState(0);
  const [introVisible, setIntroVisible] = useState(true);
  const [mainVisible, setMainVisible] = useState(false);
  const replaying = useRef(false);
  const mainRef = useRef<HTMLElement>(null);

  // Hold the page still while the envelope is on screen
  useEffect(() => {
    const root = document.documentElement;
    if (introVisible) {
      root.style.overflow = "hidden";
      lenis?.stop();
    } else {
      root.style.overflow = "";
      lenis?.start();
    }
  }, [introVisible, lenis]);

  const handleReveal = useCallback(() => setMainVisible(true), []);

  const handleDone = useCallback(() => {
    setIntroVisible(false);
    replaying.current = false;
    mainRef.current?.focus({ preventScroll: true });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const handleCovered = useCallback(() => {
    setMainVisible(false);
    scrollToTop(lenis, true);
  }, [lenis]);

  const replay = useCallback(() => {
    if (replaying.current) return;
    replaying.current = true;
    setIntroKey((k) => k + 1);
    setIntroVisible(true);
  }, []);

  return (
    <>
      <MusicToggle />
      {mainVisible && (
        <main ref={mainRef} tabIndex={-1} className="outline-none">
          <InvitationCard />
          <ScratchCard />
          <WeddingCountdown />
          <CoupleGallery />
          <EventTimeline />
          <FinalInvitation onReplay={replay} />
        </main>
      )}
      {mainVisible && !introVisible && <BackToTop />}
      {introVisible && (
        <EnvelopeIntro
          key={introKey}
          replay={introKey > 0}
          onCovered={handleCovered}
          onReveal={handleReveal}
          onDone={handleDone}
        />
      )}
    </>
  );
}

export default function InvitationExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Story />
      </SmoothScroll>
    </MotionConfig>
  );
}
