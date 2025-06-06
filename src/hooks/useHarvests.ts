
import { useQuery } from '@tanstack/react-query';
import { ApiService } from '@/services/api';

export const useHarvests = () => {
  return useQuery({
    queryKey: ['harvests'],
    queryFn: ApiService.getHarvests,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
