import { fetchWorkshop } from '#/api/workshops/workshops';
import { useQuery } from '@tanstack/react-query';

export const useWorkshop = (id: string) => {
  return useQuery({
    queryKey: ['workshop', id],
    queryFn: () => fetchWorkshop(id),
  });
};
