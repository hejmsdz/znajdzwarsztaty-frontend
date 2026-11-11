import { useMemo } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  clearSearchParams,
  emptySearch,
  workshopsSearchKeys,
} from '#/filters/types';
import type { WorkshopsSearch } from '#/filters/types';
import { pick } from '#/lib/pick';
import { useWorkshopsView } from './use-workshops-vlew';

type Patch = Partial<WorkshopsSearch>;
type Updater = (patch: Patch) => void;

const noop = () => {};
const mapViewKeys = workshopsSearchKeys.filter(
  (key) => key !== 'voivodeship' && key !== 'page',
);

export function useWorkshopsSearchParams(): [WorkshopsSearch, Updater] {
  const { path, view } = useWorkshopsView();
  const rawSearch = useSearch({
    strict: false,
  });
  const search = useMemo(() => {
    if (view == 'map') {
      return pick(rawSearch, mapViewKeys);
    }

    if (view === 'list') {
      return pick(rawSearch, workshopsSearchKeys);
    }
    return emptySearch;
  }, [rawSearch, view]);
  const navigate = useNavigate();

  if (!view) {
    return [{}, noop];
  }

  const updateSearch = (patch: Patch) => {
    void navigate({
      to: path,
      search: (prev) =>
        clearSearchParams({
          ...prev,
          ...patch,
          page: patch.page ?? undefined,
        }),
      replace: true,
    });
  };

  return [search, updateSearch];
}
