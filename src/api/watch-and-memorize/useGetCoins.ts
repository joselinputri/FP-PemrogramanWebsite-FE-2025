import { useState, useEffect } from 'react';
import api from '@/api/axios';

interface CoinsResponse {
  userId: string;
  username: string;
  coins: number;
}

export const useGetCoins = () => {
  const [data, setData] = useState<CoinsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<{ data: CoinsResponse }>(
          '/game/game-type/watch-and-memorize/coins'
        );
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);

  return { data, isLoading, error };
};