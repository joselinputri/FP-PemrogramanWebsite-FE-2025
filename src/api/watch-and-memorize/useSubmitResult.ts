import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios';

interface SubmitResultPayload {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  coinsEarned: number; 
}

interface SubmitResultResponse {
  success: boolean;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  coinsEarned: number;
  rank: number;
  message: string;
}

export const useSubmitResult = (gameId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitResultPayload) => {
      const { data } = await api.post<{ data: SubmitResultResponse }>(
        `/game/game-type/watch-and-memorize/${gameId}/submit`,
        payload
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard', gameId] });
      queryClient.invalidateQueries({ queryKey: ['coins'] });
    },
  });
};