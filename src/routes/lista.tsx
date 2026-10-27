import { createFileRoute } from '@tanstack/react-router';
import type { CSSProperties } from 'react';
import { workshopsSearchSchema } from '#/filters/types';
import { FiltersSidebar } from '@/components/layout/filters-sidebar/filters-sidebar';
import { TopBar } from '@/components/layout/top-bar/top-bar';
import { WorkshopList } from '@/components/layout/workshop-list/workshop-list';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const Route = createFileRoute('/lista')({
  component: ListPage,
  validateSearch: workshopsSearchSchema,
});

function ListPage() {
  return (
    <SidebarProvider
      className="flex h-svh flex-col overflow-hidden"
      style={{ '--sidebar-width': '20rem' } as CSSProperties}
    >
      <TopBar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <FiltersSidebar />
        <SidebarInset className="min-w-0">
          <WorkshopList />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
