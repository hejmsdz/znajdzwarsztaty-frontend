import { fetchInstructors } from '#/api/instructors';
import { queryKeys } from '#/hooks/queries/keys';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useInstructors = (limit: number | undefined) => {
  return useQuery({
    queryKey: limit
      ? queryKeys.instructorsHead(limit)
      : queryKeys.instructors(),
    queryFn: () => fetchInstructors(limit),
    placeholderData: keepPreviousData,
  });
};
