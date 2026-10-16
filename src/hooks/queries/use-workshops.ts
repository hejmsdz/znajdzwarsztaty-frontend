import { stringifyFilters } from '#/api/workshops/filters';
import { fetchWorkshops } from '#/api/workshops/workshops';
import type { WorkshopsSearch } from '#/filters/types';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useWorkshops = (search: WorkshopsSearch) => {
  const filtersString = stringifyFilters(search);
  return useQuery({
    queryKey: ['workshops', filtersString],
    queryFn: () => fetchWorkshops(filtersString),
    placeholderData: keepPreviousData,
  });
};
