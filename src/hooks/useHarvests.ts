
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface Harvest {
  _id?: string;
  fieldName: string;
  variety: string;
  harvestDate: string;
  quantity: number;
  quality: string;
  storageLocation: string;
  unitPrice: number;
  totalValue: number;
  sold: number;
  inStock: number;
  createdAt?: string;
  updatedAt?: string;
}

export const useHarvests = () => {
  return useQuery({
    queryKey: ['harvests'],
    queryFn: ApiService.getHarvests,
  });
};

export const useCreateHarvest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Harvest, '_id' | 'createdAt' | 'updatedAt'>) => 
      ApiService.createHarvest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success('Récolte créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la création de la récolte');
      console.error('Create harvest error:', error);
    },
  });
};

export const useUpdateHarvest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Harvest> }) => 
      ApiService.updateHarvest(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success('Récolte mise à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour de la récolte');
      console.error('Update harvest error:', error);
    },
  });
};

export const useUpdateHarvestStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, quantitySold }: { id: string; quantitySold: number }) => 
      ApiService.updateHarvestStock(id, quantitySold),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['harvests'] });
      toast.success('Stock mis à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour du stock');
      console.error('Update harvest stock error:', error);
    },
  });
};
