import { useCallback, useRef, useEffect, useState } from "react";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
// Calming Ghibli-style background music using Web Audio API
export const useBackgroundMusic = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const isPlayingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.connect(audioContextRef.current.destination);
      masterGainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    }
    return audioContextRef.current;
  }, []);

  // Play a gentle, dreamy note with reverb-like sustain
  const playNote = useCallback((frequency: number, duration: number, delay: number = 0, type: OscillatorType = "sine", gain: number = 0.08) => {
    const ctx = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    const osc = ctx.createOscillator();
    const noteGain = ctx.createGain();
    
    // Add subtle vibrato for warmth
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4, ctx.currentTime);
    vibratoGain.gain.setValueAtTime(2, ctx.currentTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);
    
    osc.connect(noteGain);
    noteGain.connect(masterGain);
    
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);
    
    // Soft attack, gentle sustain, slow release (Ghibli-style)
    noteGain.gain.setValueAtTime(0, ctx.currentTime + delay);
    noteGain.gain.linearRampToValueAtTime(gain, ctx.currentTime + delay + 0.15);
    noteGain.gain.setValueAtTime(gain * 0.8, ctx.currentTime + delay + duration * 0.6);
    noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    
    vibrato.start(ctx.currentTime + delay);
    osc.start(ctx.currentTime + delay);
    vibrato.stop(ctx.currentTime + delay + duration);
    osc.stop(ctx.currentTime + delay + duration);
  }, []);

  // Ghibli-inspired peaceful melody (major pentatonic with gentle movement)
  const playGhibliMelody = useCallback(() => {
    if (!isPlayingRef.current) return;
    
    // C major pentatonic scale - dreamy and calming
    const notes = {
      C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00, A4: 440.00,
      C5: 523.25, D5: 587.33, E5: 659.26, G5: 783.99, A5: 880.00,
      C3: 130.81, G3: 196.00,
    };
    
    // Peaceful, flowing melody pattern
    const melody = [
      { note: notes.E4, dur: 1.2 },
      { note: notes.G4, dur: 0.8 },
      { note: notes.A4, dur: 1.0 },
      { note: notes.G4, dur: 0.6 },
      { note: notes.E4, dur: 1.4 },
      { note: notes.D4, dur: 0.8 },
      { note: notes.C4, dur: 1.2 },
      { note: notes.D4, dur: 0.6 },
      { note: notes.E4, dur: 1.0 },
      { note: notes.G4, dur: 1.4 },
      { note: notes.C5, dur: 0.8 },
      { note: notes.A4, dur: 1.0 },
      { note: notes.G4, dur: 1.2 },
      { note: notes.E4, dur: 0.6 },
      { note: notes.D4, dur: 1.4 },
      { note: notes.C4, dur: 1.0 },
    ];

    let time = 0;
    melody.forEach((item, i) => {
      if (isPlayingRef.current) {
        // Main melody with sine (soft, pure tone)
        playNote(item.note, item.dur * 1.1, time, "sine", 0.06);
        
        // Gentle harmony - fifth below
        playNote(item.note * 0.67, item.dur * 1.2, time, "sine", 0.025);
        
        // Ethereal octave shimmer (occasional)
        if (i % 3 === 0) {
          playNote(item.note * 2, item.dur * 0.6, time + 0.1, "sine", 0.015);
        }
        
        // Bass note on downbeats
        if (i % 4 === 0) {
          playNote(notes.C3, item.dur * 1.5, time, "triangle", 0.03);
        } else if (i % 4 === 2) {
          playNote(notes.G3, item.dur * 1.2, time, "triangle", 0.025);
        }
      }
      time += item.dur;
    });
  }, [playNote]);

  // Smooth fade in
  const fadeIn = useCallback((targetVolume: number, duration: number = 2000) => {
    const ctx = audioContextRef.current;
    const masterGain = masterGainRef.current;
    if (!ctx || !masterGain) return;

    const startVolume = 0;
    const steps = 50;
    const stepTime = duration / steps;
    const volumeStep = (targetVolume - startVolume) / steps;
    let currentStep = 0;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVol = startVolume + (volumeStep * currentStep);
      masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, newVol)), ctx.currentTime);
      
      if (currentStep >= steps) {
        clearInterval(fadeIntervalRef.current!);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
  }, []);

  const startMusic = useCallback(() => {
    initAudio();
    isPlayingRef.current = true;
    setIsPlaying(true);
    
    // Fade in smoothly
    fadeIn(isMuted ? 0 : volume, 2500);
    
    // Play initial melody
    playGhibliMelody();
    
    // Loop the melody (each cycle ~14 seconds)
    intervalRef.current = setInterval(() => {
      if (isPlayingRef.current) {
        playGhibliMelody();
      }
    }, 14000);
  }, [initAudio, playGhibliMelody, fadeIn, volume, isMuted]);

  const stopMusic = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Fade out quickly
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.5);
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (isPlayingRef.current) {
      stopMusic();
    } else {
      startMusic();
    }
  }, [startMusic, stopMusic]);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (masterGainRef.current && audioContextRef.current && !isMuted) {
      masterGainRef.current.gain.setValueAtTime(newVolume, audioContextRef.current.currentTime);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newMuted = !prev;
      if (masterGainRef.current && audioContextRef.current) {
        masterGainRef.current.gain.setValueAtTime(
          newMuted ? 0 : volume, 
          audioContextRef.current.currentTime
        );
      }
      return newMuted;
    });
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [stopMusic]);

  return { 
    isPlaying, 
    startMusic, 
    stopMusic, 
    toggleMusic, 
    volume, 
    setVolume: updateVolume,
    isMuted,
    toggleMute,
  };
};