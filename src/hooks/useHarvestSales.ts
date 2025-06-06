
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface SaleData {
  harvestId: string;
  clientName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  paymentMethod: string;
  saleDate: string;
  product: string;
}

export const useHarvestSales = () => {
  const queryClient = useQueryClient();

  const createSaleMutation = useMutation({
    mutationFn: async (saleData: SaleData) => {
      await ApiService.createSale(saleData);
      await ApiService.updateHarvestStock(saleData.harvestId, saleData.quantity);
      return saleData;
    },
    onSuccess: (saleData) => {
      // Invalider les queries pour mettre à jour les données
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      
      toast.success(`Vente de ${saleData.quantity}kg enregistrée avec succès`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      console.error('Erreur lors de la création de la vente:', error);
      toast.error('Impossible de créer la vente', {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return {
    createSale: createSaleMutation.mutateAsync,
    isLoading: createSaleMutation.isPending,
  };
};
