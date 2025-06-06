
import { useState } from 'react';
import { ApiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const useInput = async (usage: InputUsage) => {
    setIsLoading(true);
    try {
      await ApiService.useInput(usage.inputId, usage);
      toast({
        title: "Utilisation enregistrée",
        description: `${usage.quantity} unités utilisées avec succès`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'utilisation",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const buyInput = async (purchase: InputPurchase) => {
    setIsLoading(true);
    try {
      await ApiService.buyInput(purchase.inputId, purchase);
      toast({
        title: "Achat enregistré",
        description: `Achat de ${purchase.quantity} unités enregistré avec succès`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'achat",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    useInput,
    buyInput,
    isLoading
  };
};
