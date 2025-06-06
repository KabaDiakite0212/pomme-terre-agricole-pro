
import { useState } from 'react';
import { ApiService } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export interface FieldAction {
  type: 'Irrigation' | 'Traitement' | 'Fertilisation' | 'Entretien';
  date: string;
  quantity?: string;
  product?: string;
  notes?: string;
}

export const useFieldActions = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const executeAction = async (fieldId: string, action: FieldAction) => {
    setIsLoading(true);
    try {
      await ApiService.createFieldAction(fieldId, action);
      toast({
        title: "Action enregistrée",
        description: `${action.type} programmée avec succès`,
      });
      return true;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'enregistrer l'action",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeAction,
    isLoading
  };
};
