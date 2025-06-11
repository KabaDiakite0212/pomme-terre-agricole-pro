
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface Field {
  _id?: string;
  name: string;
  surfaceId: string;
  variety: string;
  plantDate: string;
  density: string;
  stage: string;
  progress: number;
  area: number;
  saison: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useFields = () => {
  return useQuery({
    queryKey: ['fields'],
    queryFn: ApiService.getFields,
  });
};

export const useCreateField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Field, '_id' | 'createdAt' | 'updatedAt'>) => 
      ApiService.createField(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      toast.success('Champ créé avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la création du champ');
      console.error('Create field error:', error);
    },
  });
};

export const useUpdateField = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Field> }) => 
      ApiService.updateField(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      toast.success('Champ mis à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour du champ');
      console.error('Update field error:', error);
    },
  });
};

export const useCreateFieldAction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ fieldId, action }: { fieldId: string; action: any }) => 
      ApiService.createFieldAction(fieldId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fields'] });
      toast.success('Action ajoutée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de l\'ajout de l\'action');
      console.error('Create field action error:', error);
    },
  });
};
