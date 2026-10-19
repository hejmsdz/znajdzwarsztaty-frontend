import { fetchInstructors } from '#/api/instructors';
import { useQuery } from '@tanstack/react-query';

export const useInstructors = () => {
  return useQuery({
    queryKey: ['instructors'],
    queryFn: fetchInstructors,
  });
};
