import { motion } from "framer-motion";
import { Zap, Target, Flame } from "lucide-react";

export type Difficulty = "easy" | "normal" | "hard";

interface DifficultyConfig {
  animalsToWatch: number;
  memorizationTime: number;
  totalRounds: number;
  shuffleSpeed: number;
  guessTimeLimit: number;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    animalsToWatch: 3,
    memorizationTime: 6000,
    totalRounds: 1,
    shuffleSpeed: 1200,
    guessTimeLimit: 25,
  },
  normal: {
    animalsToWatch: 4,
    memorizationTime: 5000,
    totalRounds: 3,
    shuffleSpeed: 800,
    guessTimeLimit: 15,
  },
  hard: {
    animalsToWatch: 5,
    memorizationTime: 4000,
    totalRounds: 4,
    shuffleSpeed: 500,
    guessTimeLimit: 10,
  },
};

interface DifficultySelectProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultySelect = ({ selected, onSelect }: DifficultySelectProps) => {
  const difficulties: { id: Difficulty; label: string; icon: React.ReactNode; color: string; description: string }[] = [
    { 
      id: "easy", 
      label: "EASY", 
      icon: <Zap size={18} />, 
      color: "from-pastel-mint to-success/60",
      description: "3 animals, 1 round"
    },
    { 
      id: "normal", 
      label: "NORMAL", 
      icon: <Target size={18} />, 
      color: "from-pastel-blue to-secondary/60",
      description: "4 animals, balanced"
    },
    { 
      id: "hard", 
      label: "HARD", 
      icon: <Flame size={18} />, 
      color: "from-pastel-coral to-destructive/60",
      description: "5 animals, fast pace"
    },
  ];

  return (
    <div className="flex gap-2">
      {difficulties.map((diff) => (
        <motion.button
          key={diff.id}
          className={`flex-1 p-3 rounded-xl border-2 transition-all ${
            selected === diff.id
              ? `bg-gradient-to-br ${diff.color} border-foreground/30 shadow-md`
              : "bg-card/50 border-border/50 hover:border-border"
          }`}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(diff.id)}
        >
          <div className="flex flex-col items-center gap-1">
            <div className={`${selected === diff.id ? "text-foreground" : "text-muted-foreground"}`}>
              {diff.icon}
            </div>
            <span className={`font-pixel text-[9px] ${selected === diff.id ? "text-foreground" : "text-muted-foreground"}`}>
              {diff.label}
            </span>
            <span className="text-[8px] text-muted-foreground">
              {diff.description}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
