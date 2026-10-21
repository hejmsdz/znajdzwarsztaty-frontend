import { fetchWorkshop } from '#/api/workshops/workshops';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery } from '@tanstack/react-query';

export const useWorkshop = (id: string) => {
  return useQuery({
    queryKey: queryKeys.workshop(id),
    queryFn: () => fetchWorkshop(id),
  });
};
