
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface Input {
  _id?: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  alertLevel: number;
  totalValue: number;
  lastPurchase: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useInputs = () => {
  return useQuery({
    queryKey: ['inputs'],
    queryFn: ApiService.getInputs,
  });
};

export const useCreateInput = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Input, '_id' | 'createdAt' | 'updatedAt'>) => 
      ApiService.createInput(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      toast.success('Intrant créé avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la création de l\'intrant');
      console.error('Create input error:', error);
    },
  });
};

export const useUpdateInput = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Input> }) => 
      ApiService.updateInput(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      toast.success('Intrant mis à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour de l\'intrant');
      console.error('Update input error:', error);
    },
  });
};

export const useUseInput = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ inputId, usage }: { inputId: string; usage: any }) => 
      ApiService.useInput(inputId, usage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      toast.success('Utilisation d\'intrant enregistrée');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de l\'enregistrement de l\'utilisation');
      console.error('Use input error:', error);
    },
  });
};

export const useBuyInput = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ inputId, purchase }: { inputId: string; purchase: any }) => 
      ApiService.buyInput(inputId, purchase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inputs'] });
      toast.success('Achat d\'intrant enregistré');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de l\'enregistrement de l\'achat');
      console.error('Buy input error:', error);
    },
  });
};
