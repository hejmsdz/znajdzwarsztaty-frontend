import { fetchInstructors } from '#/api/instructors';
import { queryKeys } from '#/hooks/queries/keys';
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';

async function fetchInstructorsAndUpdateByIdCache(
  options: Parameters<typeof fetchInstructors>[0],
  queryClient: QueryClient,
): ReturnType<typeof fetchInstructors> {
  const result = await fetchInstructors(options);

  result.items.forEach((instructor) => {
    queryClient.setQueryData(queryKeys.instructor(instructor.id), instructor);
  });

  return result;
}

export const useInstructorsHead = (headNumItems: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: queryKeys.instructorsHead(headNumItems),
    queryFn: () =>
      fetchInstructorsAndUpdateByIdCache(
        { perPage: headNumItems },
        queryClient,
      ),
    placeholderData: keepPreviousData,
  });
};

export const useInstructorsPages = (
  headNumItems: number,
  pageSize: number,
  enabled: boolean,
) => {
  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: queryKeys.instructorsPages(headNumItems, pageSize),
    queryFn: ({ pageParam }) =>
      fetchInstructorsAndUpdateByIdCache(
        {
          perPage: pageSize,
          page: pageParam,
        },
        queryClient,
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled,
  });
};
