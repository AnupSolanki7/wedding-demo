"use client";

import { useEffect, useState } from "react";

export interface Countdown {
  /** False until the first client tick, so server and client markup match. */
  ready: boolean;
  done: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Ticks once a second toward an ISO timestamp. The timestamp carries its own
 * UTC offset (+05:30 for Asia/Kolkata), so the result is correct for guests
 * in any timezone.
 */
export function useCountdown(targetIso: string): Countdown {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return { ready: false, done: false, days: 0, hours: 0, minutes: 0, seconds: 0 };

  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  const total = Math.floor(diff / 1000);
  return {
    ready: true,
    done: diff === 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}
