export type Difficulty = "easy" | "medium" | "hard";

export interface DifficultyConfig {
  name: string;
  pairs: number;
  timeLimit: number;
  description: string;
  color: string;
}

export const DIFFICULTY_CONFIGS: Record<Difficulty, DifficultyConfig> = {
  easy: {
    name: "Easy",
    pairs: 4,
    timeLimit: 60,
    description: "4 pairs, 60 seconds",
    color: "from-green-400 to-emerald-500",
  },
  medium: {
    name: "Medium",
    pairs: 6,
    timeLimit: 90,
    description: "6 pairs, 90 seconds",
    color: "from-yellow-400 to-orange-500",
  },
  hard: {
    name: "Hard",
    pairs: 8,
    timeLimit: 120,
    description: "8 pairs, 120 seconds",
    color: "from-red-400 to-pink-500",
  },
};
