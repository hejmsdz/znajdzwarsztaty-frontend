import { useNavigate, useRouterState, useSearch } from '@tanstack/react-router';
import { clearSearchParams } from '#/filters/types';
import type { WorkshopsSearch } from '#/filters/types';

type Patch = Partial<WorkshopsSearch>;
type Updater = (patch: Patch) => void;

const WORKSHOPS_ROUTES = ['/', '/lista'] as const;
type WorkshopsRoute = (typeof WORKSHOPS_ROUTES)[number];

function getWorkshopsRoute(pathname: string): WorkshopsRoute {
  return WORKSHOPS_ROUTES.find((route) => route === pathname) ?? '/';
}

export function useWorkshopsSearchParams(): [WorkshopsSearch, Updater] {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  const updateSearch = (patch: Patch) => {
    void navigate({
      to: getWorkshopsRoute(pathname),
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
