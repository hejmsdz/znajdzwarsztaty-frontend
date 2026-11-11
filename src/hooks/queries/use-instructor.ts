import { fetchInstructor } from '#/api/instructors';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery } from '@tanstack/react-query';

export const useInstructor = (id: string) => {
  return useQuery({
    queryKey: queryKeys.instructor(id),
    queryFn: () => fetchInstructor(id),
    staleTime: 5 * 60 * 1000,
  });
};
