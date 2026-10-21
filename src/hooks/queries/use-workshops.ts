import { stringifyFilters } from '#/api/workshops/filters';
import { fetchWorkshops } from '#/api/workshops/workshops';
import type { WorkshopsSearch } from '#/filters/types';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useWorkshops = (search: WorkshopsSearch) => {
  const filterString = stringifyFilters(search);
  return useQuery({
    queryKey: queryKeys.workshops(filterString),
    queryFn: () => fetchWorkshops({ filter: filterString }),
    placeholderData: keepPreviousData,
  });
};
