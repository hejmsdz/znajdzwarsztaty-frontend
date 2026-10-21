import { stringifyFilters } from '#/api/workshops/filters';
import { fetchWorkshops } from '#/api/workshops/workshops';
import type { WorkshopsSearch } from '#/filters/types';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useWorkshops = (search: WorkshopsSearch) => {
  const filtersString = stringifyFilters(search);
  return useQuery({
    queryKey: queryKeys.workshops(filtersString),
    queryFn: () => fetchWorkshops(filtersString),
    placeholderData: keepPreviousData,
  });
};
