import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';

interface CoinsResponse {
  userId: string;
  username: string;
  coins: number;
}

export const useGetCoins = () => {
  return useQuery({
    queryKey: ['coins'],
    queryFn: async () => {
      const { data } = await api.get<{ data: CoinsResponse }>(
        '/game/game-type/watch-and-memorize/coins'
      );
      return data.data;
    },
    staleTime: 30000, // 30 seconds
    retry: 1,
  });
};