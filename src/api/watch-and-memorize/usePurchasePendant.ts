import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from '../../pages/watch-and-memorize/hooks/use-toast';

interface PurchaseResponse {
  success: boolean;
  pendantId: string;
  pendantName: string;
  coinsSpent: number;
  newQuantity: number;
  message: string;
}

export const usePurchasePendant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pendantId: string) => {
      const { data } = await api.post<{ data: PurchaseResponse }>(
        '/game/game-type/watch-and-memorize/pendant/purchase',
        { pendantId }
      );
      return data.data;
    },
    onSuccess: (data) => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['coins'] });
      queryClient.invalidateQueries({ queryKey: ['owned-pendants'] });

      toast({
        title: 'Purchase Successful! 🎉',
        description: data.message,
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Insufficient coins or error occurred';
      
      toast({
        title: 'Purchase Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    },
  });
};