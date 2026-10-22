import { useEffect, useRef, useState, useCallback } from "react";
import { WEDDING_CONFIG } from "../config/wedding.config";

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.7);

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioNodeGainRef = useRef<GainNode | null>(null);
  const audioIntervalRef = useRef<number | null>(null);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Sync ref
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize HTML Audio element if URL provided
  useEffect(() => {
    if (WEDDING_CONFIG.audio.defaultTrackUrl) {
      const audio = new Audio(WEDDING_CONFIG.audio.defaultTrackUrl);
      audio.loop = true;
      audio.volume = volume;
      htmlAudioRef.current = audio;

      return () => {
        audio.pause();
        htmlAudioRef.current = null;
      };
    }
  }, [volume]);

  // Web Audio Synth for peaceful Islamic oud/strings acoustic soundscape
  const initSynth = useCallback(() => {
    if (!audioContextRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioContextRef.current = ctx;
      audioNodeGainRef.current = masterGain;
    }
  }, [volume]);

  const playPluck = useCallback((freq: number, detune = 0, gainVal = 0.14) => {
    const ctx = audioContextRef.current;
    const master = audioNodeGainRef.current;
    if (!ctx || !master) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    const pluckGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, now);
    osc.detune.setValueAtTime(detune, now);

    oscHarmonic.type = "sine";
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);
    oscHarmonic.detune.setValueAtTime(detune + 4, now);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + 2.8);

    pluckGain.gain.setValueAtTime(0.0001, now);
    pluckGain.gain.linearRampToValueAtTime(gainVal, now + 0.04);
    pluckGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(pluckGain);
    pluckGain.connect(master);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + 4);
    oscHarmonic.stop(now + 4);
  }, []);

  const startMusic = useCallback(() => {
    setHasInteracted(true);
    setIsPlaying(true);
    isPlayingRef.current = true;

    if (WEDDING_CONFIG.audio.defaultTrackUrl && htmlAudioRef.current) {
      htmlAudioRef.current.play().catch(() => {});
      return;
    }

    // Peaceful synthesized acoustic strings & oud
    initSynth();
    const ctx = audioContextRef.current;
    if (ctx && ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    let step = 0;
    const chords = [
      [146.83, 220.0, 293.66, 440.0], // D minor / serene
      [196.0, 293.66, 392.0, 466.16],  // G minor
      [220.0, 261.63, 349.23, 523.25], // F / A warmth
      [174.61, 233.08, 349.23, 440.0], // Bb maj7 barakah
    ];

    const playAmbientStep = () => {
      if (!isPlayingRef.current) return;
      const chord = chords[step % chords.length];
      chord.forEach((n, i) => {
        setTimeout(() => {
          if (isPlayingRef.current) {
            playPluck(n, (Math.random() - 0.5) * 6, 0.09);
          }
        }, i * 380 + Math.random() * 80);
      });
      step++;
    };

    playAmbientStep();
    if (audioIntervalRef.current) clearInterval(audioIntervalRef.current);
    audioIntervalRef.current = window.setInterval(playAmbientStep, 3600);
  }, [initSynth, playPluck]);

  const pauseMusic = useCallback(() => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (htmlAudioRef.current) {
      htmlAudioRef.current.pause();
    }
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state === "running") {
      audioContextRef.current.suspend().catch(() => {});
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }, [isPlaying, pauseMusic, startMusic]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      if (audioNodeGainRef.current) audioNodeGainRef.current.gain.value = volume;
      if (htmlAudioRef.current) htmlAudioRef.current.muted = false;
    } else {
      setIsMuted(true);
      if (audioNodeGainRef.current) audioNodeGainRef.current.gain.value = 0;
      if (htmlAudioRef.current) htmlAudioRef.current.muted = true;
    }
  }, [isMuted, volume]);

  // AUTO-PLAY ON FIRST USER INTERACTION (click, touch, scroll anywhere)
  useEffect(() => {
    const handleFirstGesture = () => {
      if (!isPlayingRef.current) {
        startMusic();
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { passive: true });
    window.addEventListener("touchstart", handleFirstGesture, { passive: true });
    window.addEventListener("scroll", handleFirstGesture, { passive: true });
    window.addEventListener("keydown", handleFirstGesture, { passive: true });

    // Also attempt immediate start on mount (works if browser allows autoplay)
    try {
      startMusic();
    } catch {
      // Browser autoplay policy caught by gesture listeners
    }

    return () => {
      removeListeners();
    };
  }, [startMusic]);

  useEffect(() => {
    if (audioNodeGainRef.current && !isMuted) {
      audioNodeGainRef.current.gain.value = volume;
    }
    if (htmlAudioRef.current && !isMuted) {
      htmlAudioRef.current.volume = volume;
    }
  }, [volume, isMuted]);

  return {
    isPlaying,
    isMuted,
    hasInteracted,
    volume,
    setVolume,
    startMusic,
    pauseMusic,
    toggleMusic,
    toggleMute,
  };
}
