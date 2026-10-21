import { fetchInstructors } from '#/api/instructors';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery } from '@tanstack/react-query';

export const useInstructors = () => {
  return useQuery({
    queryKey: queryKeys.instructors(),
    queryFn: fetchInstructors,
  });
};
