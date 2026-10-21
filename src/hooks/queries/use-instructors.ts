import { fetchInstructors } from '#/api/instructors';
import { queryKeys } from '#/hooks/queries/keys';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

export const useInstructorsHead = (headNumItems: number) => {
  return useQuery({
    queryKey: queryKeys.instructorsHead(headNumItems),
    queryFn: () => fetchInstructors({ perPage: headNumItems }),
    placeholderData: keepPreviousData,
  });
};

export const useInstructorsPages = (
  headNumItems: number,
  pageSize: number,
  enabled: boolean,
) => {
  return useInfiniteQuery({
    queryKey: queryKeys.instructorsPages(headNumItems, pageSize),
    queryFn: ({ pageParam }) =>
      fetchInstructors({ perPage: pageSize, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
