import { useState, useEffect } from 'react';
import api from '@/api/axios';

export interface Pendant {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
}

export const useGetPendantShop = () => {
  const [data, setData] = useState<Pendant[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<{ data: Pendant[] }>(
          '/game/game-type/watch-and-memorize/pendant/shop'
        );
        setData(response.data.data);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShop();
  }, []);

  return { data, isLoading, error };
};