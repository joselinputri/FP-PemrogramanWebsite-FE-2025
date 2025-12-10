import { useCallback, useRef, useEffect } from "react";

// Sound effect types
type SoundType = 
  | "click" 
  | "hover" 
  | "correct" 
  | "wrong" 
  | "shuffle" 
  | "win" 
  | "lose" 
  | "countdown" 
  | "pop" 
  | "whoosh"
  | "powerup"
  | "coin"
  | "go";

// Using Web Audio API for cute game sounds
export const useSoundEffects = (enabled: boolean = true) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  
  useEffect(() => {
    // Create AudioContext on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
    };
    
    document.addEventListener("click", initAudio, { once: true });
    return () => document.removeEventListener("click", initAudio);
  }, []);

  const playTone = useCallback((
    frequency: number, 
    duration: number, 
    type: OscillatorType = "sine",
    volume: number = 0.15
  ) => {
    if (!enabled || !audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [enabled]);

  const playSound = useCallback((sound: SoundType) => {
    if (!enabled) return;
    
    // Initialize audio context if needed
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    switch (sound) {
      case "click":
        playTone(800, 0.08, "sine", 0.12);
        setTimeout(() => playTone(1000, 0.05, "sine", 0.08), 30);
        break;
        
      case "hover":
        playTone(600, 0.04, "sine", 0.05);
        break;
        
      case "correct":
        // Happy ascending arpeggio
        playTone(523, 0.12, "sine", 0.15); // C5
        setTimeout(() => playTone(659, 0.12, "sine", 0.15), 80); // E5
        setTimeout(() => playTone(784, 0.12, "sine", 0.15), 160); // G5
        setTimeout(() => playTone(1047, 0.2, "sine", 0.12), 240); // C6
        break;
        
      case "wrong":
        // Descending sad tones
        playTone(400, 0.15, "sawtooth", 0.08);
        setTimeout(() => playTone(300, 0.2, "sawtooth", 0.06), 100);
        break;
        
      case "shuffle":
        // Card shuffle whoosh
        for (let i = 0; i < 5; i++) {
          setTimeout(() => playTone(200 + Math.random() * 300, 0.05, "noise" as any, 0.03), i * 50);
        }
        break;
        
      case "win":
        // Victory fanfare
        const winNotes = [523, 659, 784, 1047, 1319, 1568];
        winNotes.forEach((freq, i) => {
          setTimeout(() => playTone(freq, 0.2, "sine", 0.12), i * 100);
        });
        break;
        
      case "lose":
        // Sad descending
        playTone(400, 0.2, "sine", 0.1);
        setTimeout(() => playTone(350, 0.2, "sine", 0.1), 150);
        setTimeout(() => playTone(300, 0.3, "sine", 0.08), 300);
        break;
        
        case "countdown":
          // Cute countdown beep - higher pitch each count
          playTone(660, 0.15, "sine", 0.18);
          setTimeout(() => playTone(660, 0.08, "sine", 0.12), 100);
          break;

        
        
      case "pop":
        playTone(1200, 0.06, "sine", 0.12);
        setTimeout(() => playTone(1400, 0.04, "sine", 0.08), 30);
        break;
        
      case "whoosh":
        // Whoosh sound using frequency sweep
        const ctx = audioContextRef.current;
        if (ctx) {
          const oscillator = ctx.createOscillator();
          const gainNode = ctx.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(ctx.destination);
          oscillator.type = "sine";
          oscillator.frequency.setValueAtTime(800, ctx.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
          gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
          oscillator.start(ctx.currentTime);
          oscillator.stop(ctx.currentTime + 0.15);
        }
        break;
        
      case "powerup":
        // Magical powerup sound
        playTone(440, 0.1, "sine", 0.12);
        setTimeout(() => playTone(554, 0.1, "sine", 0.12), 60);
        setTimeout(() => playTone(659, 0.1, "sine", 0.12), 120);
        setTimeout(() => playTone(880, 0.15, "triangle", 0.1), 180);
        break;
        
      case "coin":
        // Coin collect sound
        playTone(988, 0.08, "square", 0.08);
        setTimeout(() => playTone(1319, 0.12, "square", 0.06), 60);
        break;

        case "go":
          // Energetic "GO!" sound
          playTone(523, 0.15, "sine", 0.18); // C5
          playTone(659, 0.15, "sine", 0.18); // E5

          setTimeout(() => {
            playTone(784, 0.15, "sine", 0.2); // G5
            playTone(1047, 0.15, "triangle", 0.15); // C6
          }, 80);

          setTimeout(() => {
            playTone(1319, 0.25, "sine", 0.16); // E6 final burst
          }, 160);
          break;
      }
    },
    [enabled, playTone]
  );

  return { playSound };
}

export type { SoundType };





