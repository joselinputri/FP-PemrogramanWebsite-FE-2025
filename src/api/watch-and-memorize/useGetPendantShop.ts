import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

export interface Pendant {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
}

export const useGetPendantShop = () => {
  return useQuery({
    queryKey: ['pendant-shop'],
    queryFn: async () => {
      const { data } = await api.get<{ data: Pendant[] }>(
        '/game/game-type/watch-and-memorize/pendant/shop'
      );
      return data.data;
    },
    staleTime: 60000, // 1 minute
  });
};