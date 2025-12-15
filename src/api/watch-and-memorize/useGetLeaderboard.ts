import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['leaderboard', gameId, limit],
    queryFn: async (): Promise<LeaderboardResponse> => {
      const response = await api.get(
        `/api/game/watch-and-memorize/${gameId}/leaderboard?limit=${limit}`
      );
      return response.data;
    },
    enabled: !!gameId,
  });
};