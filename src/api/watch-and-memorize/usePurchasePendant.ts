import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const purchasePendant = async (pendantId: string, onSuccess?: () => void) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data } = await api.post<{ data: PurchaseResponse }>(
        '/game/game-type/watch-and-memorize/pendant/purchase',
        { pendantId }
      );

      toast({
        title: 'Purchase Successful! 🎉',
        description: data.data.message,
      });

      // Call refetch functions if provided
      if (onSuccess) onSuccess();

      return data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Insufficient coins or error occurred';
      
      toast({
        title: 'Purchase Failed',
        description: errorMessage,
        variant: 'destructive',
      });
      
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { purchasePendant, isLoading, error };
};