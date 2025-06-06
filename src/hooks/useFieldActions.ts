
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface FieldAction {
  type: 'Irrigation' | 'Traitement' | 'Fertilisation' | 'Entretien';
  date: string;
  quantity?: string;
  product?: string;
  notes?: string;
}

export const useFieldActions = () => {
  const queryClient = useQueryClient();

  const executeActionMutation = useMutation({
    mutationFn: async ({ fieldId, action }: { fieldId: string; action: FieldAction }) => {
      return await ApiService.createFieldAction(fieldId, action);
    },
    onSuccess: (_, { action }) => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      
      toast.success(`${action.type} programmée avec succès`, {
        position: "top-right",
        autoClose: 3000,
      });
    },
    onError: (error) => {
      console.error('Erreur lors de l\'enregistrement de l\'action:', error);
      toast.error('Impossible d\'enregistrer l\'action', {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });

  return {
    executeAction: (fieldId: string, action: FieldAction) => 
      executeActionMutation.mutateAsync({ fieldId, action }),
    isLoading: executeActionMutation.isPending,
  };
};
