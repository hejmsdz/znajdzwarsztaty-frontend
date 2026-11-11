import { useRouterState } from '@tanstack/react-router';

type WorkshopsView =
  | { path: '/'; view: 'map' }
  | { path: '/list'; view: 'list' }
  | { path: string; view: null };

export function useWorkshopsView(): WorkshopsView {
  const path = useRouterState({
    select: (state) => state.location.pathname,
  });

  switch (path) {
    case '/':
      return { path, view: 'map' };
    case '/list':
      return { path, view: 'list' };
    default:
      return { path, view: null };
  }
}
