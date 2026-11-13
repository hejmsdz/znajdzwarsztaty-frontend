import { createFileRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import type { CSSProperties } from 'react';
import { workshopsSearchSchema } from '#/filters/types';
import { FiltersSidebar } from '#/components/layout/filters-sidebar/filters-sidebar';
import { MapSkeleton } from '#/components/map/map-skeleton';
import { PageHeader } from '#/components/layout/page-header/page-header';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { MainInset } from '#/components/layout/main';
import { SidebarProvider } from '#/components/ui/sidebar';
import { useWorkshops } from '#/hooks/queries/use-workshops';

// Leaflet needs browser APIs, so the map module must only be imported in the
// browser. While the chunk loads — and in the prerendered HTML, where the
// import never runs — the gradient placeholder is rendered instead.
const MapCanvas = lazy(() =>
  typeof window === 'undefined'
    ? Promise.resolve({ default: MapSkeleton })
    : import('#/components/map/map-canvas').then((m) => ({
        default: m.MapCanvas,
      })),
);

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: workshopsSearchSchema,
});

function Home() {
  const { data } = useWorkshops();

  return (
    <SidebarProvider
      className="flex h-svh flex-col overflow-hidden"
      style={{ '--sidebar-width': '20rem' } as CSSProperties}
    >
      <TopBar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <FiltersSidebar />
        <MainInset className="min-w-0">
          <PageHeader title="Mapa warsztatów" totalItems={data?.totalItems} />
          <div className="flex min-h-0 flex-1 flex-col">
            <Suspense fallback={<MapSkeleton />}>
              <MapCanvas />
            </Suspense>
          </div>
        </MainInset>
      </div>
    </SidebarProvider>
  );
}
