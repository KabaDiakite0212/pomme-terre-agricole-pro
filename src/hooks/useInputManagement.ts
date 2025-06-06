
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface InputUsage {
  inputId: string;
  field: string;
  quantity: number;
  usageDate: string;
  notes?: string;
}

export interface InputPurchase {
  inputId: string;
  supplier: string;
  quantity: number;
  unitPrice: number;
  totalCost: number;
  paymentMethod: string;
  purchaseDate: string;
}

export const useInputManagement = () => {
  const queryClient = useQueryClient();

  const useInputMutation = useMutation({
    mutationFn: async (usage: InputUsage) => {
      return await ApiService.useInput(usage.inputId, usage);
    },
    onSuccess: (_, usage) => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      
      toast.success(`${usage.quantity} unités utilisées avec succès`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'utilisation:', error);
      toast.error('Impossible d\'enregistrer l\'utilisation', {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  const buyInputMutation = useMutation({
    mutationFn: async (purchase: InputPurchase) => {
      return await ApiService.buyInput(purchase.inputId, purchase);
    },
    onSuccess: (_, purchase) => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      
      toast.success(`Achat de ${purchase.quantity} unités enregistré avec succès`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'achat:', error);
      toast.error('Impossible d\'enregistrer l\'achat', {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return {
    useInput: useInputMutation.mutateAsync,
    buyInput: buyInputMutation.mutateAsync,
    isLoading: useInputMutation.isPending || buyInputMutation.isPending,
  };
};
