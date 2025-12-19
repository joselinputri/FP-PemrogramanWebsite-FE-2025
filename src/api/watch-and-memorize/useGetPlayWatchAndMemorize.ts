// src/api/watch-and-memorize/useGetPlayWatchAndMemorize.ts
import { useState, useEffect } from 'react';
import axiosInstance from "@/api/axios";

interface DifficultyConfig {
  animalsToWatch: number;
  memorizationTime: number;
  totalRounds: number;
  shuffleSpeed: number;
  guessTimeLimit: number;
}

interface ShopConfig {
  hint: { price: number; available: boolean };
  freeze: { price: number; available: boolean };
  double: { price: number; available: boolean };
  shield: { price: number; available: boolean };
  reveal: { price: number; available: boolean };
}

// ⭐ MUST MATCH GameConfig from Dashboard.tsx
export interface IWatchAndMemorizePlayResponse {
  id: string;
  name: string;
  description: string;
  thumbnail_image: string;
  background_music?: string;
  difficulty_configs: {
    easy: DifficultyConfig;
    medium: DifficultyConfig;
    hard: DifficultyConfig;
  };
  available_animals: string[];
  shop_config: ShopConfig;
}

export const useGetPlayWatchAndMemorize = (gameId: string) => {
  const [data, setData] = useState<IWatchAndMemorizePlayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!gameId) {
      setIsLoading(false);
      return;
    }

    const fetchGame = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<{ data: IWatchAndMemorizePlayResponse }>(
          `/api/game/game-type/watch-and-memorize/${gameId}/play`
        );
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  return { data, isLoading, error };
};