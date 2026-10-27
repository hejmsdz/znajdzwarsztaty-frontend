import { stringifyFilters } from '#/api/workshops/filters';
import {
  fetchWorkshopsSummary,
  fetchWorkshopsFull,
} from '#/api/workshops/workshops';
import type { WorkshopsSearch } from '#/filters/types';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export const useWorkshops = (search: WorkshopsSearch) => {
  const { voivodeship, ...restFilters } = search;
  const filterString = stringifyFilters(restFilters);
  return useQuery({
    queryKey: queryKeys.workshopsSummary(filterString),
    queryFn: () => fetchWorkshopsSummary({ filter: filterString }),
    placeholderData: keepPreviousData,
  });
};

export const useWorkshopsList = (search: WorkshopsSearch) => {
  const filterString = stringifyFilters(search);
  return useQuery({
    queryKey: queryKeys.workshopsFull(filterString, search.page),
    queryFn: () =>
      fetchWorkshopsFull({ filter: filterString, page: search.page }),
    placeholderData: keepPreviousData,
  });
};
