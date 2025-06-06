
import { useState } from 'react';
import { ApiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createSale = async (saleData: SaleData) => {
    setIsLoading(true);
    try {
      await ApiService.createSale(saleData);
      await ApiService.updateHarvestStock(saleData.harvestId, saleData.quantity);
      
      toast({
        title: "Vente créée",
        description: `Vente de ${saleData.quantity}kg enregistrée avec succès`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer la vente",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSale,
    isLoading
  };
};
