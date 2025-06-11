
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService } from '@/services/api';
import { toast } from 'react-toastify';

export interface Surface {
  _id?: string;
  name: string;
  size: number;
  location: string;
  soilType: string;
  description?: string;
  status: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useSurfaces = () => {
  return useQuery({
    queryKey: ['surfaces'],
    queryFn: ApiService.getSurfaces,
  });
};

export const useCreateSurface = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Surface, '_id' | 'createdAt' | 'updatedAt'>) => 
      ApiService.createSurface(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surfaces'] });
      toast.success('Surface créée avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la création de la surface');
      console.error('Create surface error:', error);
    },
  });
};

export const useUpdateSurface = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Surface> }) => 
      ApiService.updateSurface(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['surfaces'] });
      toast.success('Surface mise à jour avec succès');
    },
    onError: (error: any) => {
      toast.error('Erreur lors de la mise à jour de la surface');
      console.error('Update surface error:', error);
    },
  });
};
