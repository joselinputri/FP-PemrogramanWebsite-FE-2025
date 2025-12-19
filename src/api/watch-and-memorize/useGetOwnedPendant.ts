import { useState, useEffect } from 'react';
import api from '@/api/axios';
import type { Pendant } from './useGetPendantShop';

export interface PendantWithQuantity extends Pendant {
  owned: number;
}

interface OwnedPendantsResponse {
  userId: string;
  pendants: PendantWithQuantity[];
}

export const useGetOwnedPendants = () => {
  const [data, setData] = useState<OwnedPendantsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<{ data: OwnedPendantsResponse }>(
        '/game/game-type/watch-and-memorize/pendant/owned'
      );
      setData(response.data.data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { data, isLoading, error, refetch };
};