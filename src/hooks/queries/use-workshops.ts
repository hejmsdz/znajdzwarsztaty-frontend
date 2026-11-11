import { stringifyFilters } from '#/api/workshops/filters';
import {
  fetchWorkshopsSummary,
  fetchWorkshopsFull,
} from '#/api/workshops/workshops';
import type { WorkshopsSearch } from '#/filters/types';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedValue } from '../use-debounced-value';
import { useWorkshopsSearchParams } from '../use-workshops-search-params';

const debounceDelayMs = 400;

const useDebouncedFilters = (params: WorkshopsSearch) => {
  const filterString = stringifyFilters(params);

  const debouncedFilterString = useDebouncedValue(
    filterString,
    debounceDelayMs,
  );

  return {
    filterString: debouncedFilterString,
    isDebouncing: filterString !== debouncedFilterString,
  };
};

export const useWorkshops = () => {
  const [search] = useWorkshopsSearchParams();
  const { filterString, isDebouncing } = useDebouncedFilters(search);

  const query = useQuery({
    queryKey: queryKeys.workshopsSummary(filterString),
    queryFn: () => fetchWorkshopsSummary({ filter: filterString }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    isFetching: query.isFetching || isDebouncing,
  };
};

export const useWorkshopsList = () => {
  const [search] = useWorkshopsSearchParams();
  const { filterString, isDebouncing } = useDebouncedFilters(search);

  const query = useQuery({
    queryKey: queryKeys.workshopsFull(filterString, search.page),
    queryFn: () =>
      fetchWorkshopsFull({ filter: filterString, page: search.page }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    isFetching: query.isFetching || isDebouncing,
  };
};
