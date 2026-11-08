import { createFileRoute } from '@tanstack/react-router';
import type { CSSProperties } from 'react';
import { workshopsSearchSchema } from '#/filters/types';
import { FiltersSidebar } from '@/components/layout/filters-sidebar/filters-sidebar';
import { MapCanvas } from '@/components/layout/map-canvas';
import { PageHeader } from '#/components/layout/page-header/page-header';
import { TopBar } from '@/components/layout/top-bar/top-bar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const Route = createFileRoute('/')({
  component: Home,
  validateSearch: workshopsSearchSchema,
});

function Home() {
  return (
    <SidebarProvider
      className="flex h-svh flex-col overflow-hidden"
      style={{ '--sidebar-width': '20rem' } as CSSProperties}
    >
      <TopBar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <FiltersSidebar />
        <SidebarInset className="min-w-0">
          <PageHeader title="Mapa warsztatów" />
          <div className="flex min-h-0 flex-1 flex-col">
            <MapCanvas />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
