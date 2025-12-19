import { useState, useEffect } from 'react';
import api from '@/api/axios';

interface LeaderboardEntry {
  id: string;
  user_id: string;
  username: string;
  profile_picture?: string;
  score: number;
  difficulty?: string;
  time_taken?: number;
  created_at: string;
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  total: number;
}

export const useGetLeaderboard = (gameId: string, limit: number = 10) => {
  const [data, setData] = useState<LeaderboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!gameId) {
      setIsLoading(false);
      return;
    }

    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(
          `/api/game/game-type/watch-and-memorize/${gameId}/leaderboard?limit=${limit}`
        );
       
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [gameId, limit]);

  return { data, isLoading, error };
};