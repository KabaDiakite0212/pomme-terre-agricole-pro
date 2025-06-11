
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface Equipment {
  _id?: string;
  name: string;
  type: string;
  status: string;
  acquisitionDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  value: number;
  description?: string;
  caracteristique?: string;
  dateMiseService?: string;
  dureeAmortissement?: number;
  quantite: number;
  createdAt?: string;
  updatedAt?: string;
}

export const useEquipment = () => {
  return useQuery({
    queryKey: ['equipment'],
    queryFn: ApiService.getEquipment,
  });
};

export const useCreateEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Equipment, '_id' | 'createdAt' | 'updatedAt'>) => 
      ApiService.createEquipment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success('Équipement créé avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la création de l\'équipement');
      console.error('Create equipment error:', error);
    },
  });
};

export const useUpdateEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Equipment> }) => 
      ApiService.updateEquipment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success('Équipement mis à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour de l\'équipement');
      console.error('Update equipment error:', error);
    },
  });
};

export const useDeleteEquipment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => ApiService.deleteEquipment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      toast.success('Équipement supprimé avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la suppression de l\'équipement');
      console.error('Delete equipment error:', error);
    },
  });
};
