/**
 * Background ambience. Plays an audio file when one is configured; otherwise
 * synthesises a soft tanpura drone (Pa–Sa–Sa–low Sa) with an occasional
 * temple-bell chime, so no copyrighted recording is needed.
 */

export interface Ambience {
  start(): Promise<void>;
  stop(): void;
}

const SA = 138.59; // C#3, a common tanpura tonic
const STRINGS = [SA * 0.75, SA, SA, SA * 0.5];
const GAPS = [1.05, 1.05, 1.05, 1.9];
const VOLUME = 0.2;

type AudioCtor = typeof AudioContext;

class TanpuraAmbience implements Ambience {
  private ctx?: AudioContext;
  private master?: GainNode;
  private reverb?: ConvolverNode;
  private timer?: number;
  private nextTime = 0;
  private step = 0;
  private sinceBell = 0;

  private setup() {
    const Ctor: AudioCtor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext: AudioCtor }).webkitAudioContext;
    const ctx = new Ctor();
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Generated impulse response: a warm 3s hall
    const len = ctx.sampleRate * 3;
    const impulse = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = impulse.getChannelData(ch);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6);
    }
    const reverb = ctx.createConvolver();
    reverb.buffer = impulse;
    const wet = ctx.createGain();
    wet.gain.value = 0.45;
    reverb.connect(wet).connect(master);

    this.ctx = ctx;
    this.master = master;
    this.reverb = reverb;
  }

  private voice(freq: number, when: number, type: OscillatorType, detune: number, level: number, decay: number, out: AudioNode) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    osc.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(level, when + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, when + decay);
    osc.connect(g).connect(out);
    osc.start(when);
    osc.stop(when + decay + 0.1);
  }

  private pluck(freq: number, when: number) {
    const ctx = this.ctx!;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.Q.value = 2;
    // The sweeping filter gives the buzzing "jawari" bloom of a real tanpura
    filter.frequency.setValueAtTime(2600, when);
    filter.frequency.exponentialRampToValueAtTime(520, when + 3.2);
    const bus = ctx.createGain();
    bus.gain.value = 0.5;
    filter.connect(bus);
    bus.connect(this.master!);
    bus.connect(this.reverb!);
    this.voice(freq, when, "sawtooth", 0, 0.22, 4.6, filter);
    this.voice(freq, when, "sawtooth", 4, 0.16, 4.2, filter);
    this.voice(freq, when, "triangle", -3, 0.35, 4.8, filter);
    this.voice(freq * 2, when, "sine", 2, 0.06, 3.4, filter);
  }

  private bell(when: number) {
    const ctx = this.ctx!;
    const bus = ctx.createGain();
    bus.gain.value = 0.18;
    bus.connect(this.master!);
    bus.connect(this.reverb!);
    const f = SA * 8;
    for (const [ratio, level, decay] of [
      [1, 0.5, 5],
      [2.76, 0.22, 3],
      [5.4, 0.1, 1.6],
      [8.93, 0.05, 0.9],
    ]) {
      this.voice(f * ratio, when, "sine", 0, level, decay, bus);
    }
  }

  private schedule = () => {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + 0.6) {
      const i = this.step % STRINGS.length;
      this.pluck(STRINGS[i], this.nextTime);
      this.nextTime += GAPS[i];
      this.sinceBell += GAPS[i];
      if (this.sinceBell > 14 && Math.random() < 0.25) {
        this.bell(this.nextTime - 0.5);
        this.sinceBell = 0;
      }
      this.step++;
    }
  };

  async start() {
    if (!this.ctx) this.setup();
    const ctx = this.ctx!;
    await ctx.resume();
    const now = ctx.currentTime;
    this.master!.gain.cancelScheduledValues(now);
    this.master!.gain.setValueAtTime(this.master!.gain.value, now);
    this.master!.gain.linearRampToValueAtTime(VOLUME, now + 2.5);
    this.nextTime = Math.max(this.nextTime, now + 0.1);
    window.clearInterval(this.timer);
    this.timer = window.setInterval(this.schedule, 200);
    this.schedule();
  }

  stop() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.8);
    window.clearInterval(this.timer);
    const ctx = this.ctx;
    window.setTimeout(() => {
      if (this.master && this.master.gain.value < 0.01) void ctx.suspend();
    }, 1000);
  }
}

class FileAmbience implements Ambience {
  private audio: HTMLAudioElement;
  private fade?: number;

  constructor(src: string) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.preload = "none";
    this.audio.volume = 0;
  }

  private fadeTo(target: number, done?: () => void) {
    window.clearInterval(this.fade);
    this.fade = window.setInterval(() => {
      const v = this.audio.volume + (target > this.audio.volume ? 0.04 : -0.06);
      this.audio.volume = Math.min(1, Math.max(0, v));
      if (Math.abs(this.audio.volume - target) < 0.05) {
        this.audio.volume = target;
        window.clearInterval(this.fade);
        done?.();
      }
    }, 60);
  }

  async start() {
    await this.audio.play();
    this.fadeTo(0.55);
  }

  stop() {
    this.fadeTo(0, () => this.audio.pause());
  }
}

export function createAmbience(src: string | null): Ambience {
  return src ? new FileAmbience(src) : new TanpuraAmbience();
}
