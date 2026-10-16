import { clearSearchParams } from '#/filters/types';
import type { WorkshopsSearch } from '#/filters/types';
import { Route } from '#/routes/index';

type Patch = Partial<WorkshopsSearch>;
type Updater = (patch: Patch) => void;

export function useWorkshopsSearchParams(): [WorkshopsSearch, Updater] {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const updateSearch = (patch: Patch) => {
    void navigate({
      search: (prev) => clearSearchParams({ ...prev, ...patch }),
      replace: true,
    });
  };

  return [search, updateSearch];
}
