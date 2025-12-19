import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const submitResult = async (payload: SubmitResultPayload, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await api.post<{ data: SubmitResultResponse }>(
        `api/game/game-type/watch-and-memorize/${gameId}/submit`,
        payload
      );

      // Call refetch functions if provided
      if (onSuccess) onSuccess();

      return data.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitResult, isLoading, error };
};