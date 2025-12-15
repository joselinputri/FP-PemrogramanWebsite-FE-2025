import { useQuery } from '@tanstack/react-query';
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
  return useQuery({
    queryKey: ['owned-pendants'],
    queryFn: async () => {
      const { data } = await api.get<{ data: OwnedPendantsResponse }>(
        '/game/game-type/watch-and-memorize/pendant/owned'
      );
      return data.data;
    },
    staleTime: 30000,
  });
};