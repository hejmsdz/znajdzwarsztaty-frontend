import { createFileRoute } from '@tanstack/react-router';
import { useId } from 'react';
import type { CSSProperties } from 'react';
import { workshopsSearchSchema } from '#/filters/types';
import { FiltersSidebar } from '#/components/layout/filters-sidebar/filters-sidebar';
import { PageHeader } from '#/components/layout/page-header/page-header';
import { TopBar } from '#/components/layout/top-bar/top-bar';
import { MainInset } from '#/components/layout/main';
import { WorkshopList } from '#/components/layout/workshop-list/workshop-list';
import { SidebarProvider } from '#/components/ui/sidebar';
import { useWorkshopsList } from '#/hooks/queries/use-workshops';

export const Route = createFileRoute('/list')({
  component: ListPage,
  validateSearch: workshopsSearchSchema,
});

function ListPage() {
  const { data } = useWorkshopsList();
  const titleId = useId();

  return (
    <SidebarProvider
      className="flex h-svh flex-col overflow-hidden"
      style={{ '--sidebar-width': '20rem' } as CSSProperties}
    >
      <TopBar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <FiltersSidebar showVoivodeshipFilter />
        <MainInset className="min-w-0" aria-labelledby={titleId}>
          <PageHeader
            title="Lista warsztatów"
            totalItems={data?.totalItems}
            titleId={titleId}
          />
          <WorkshopList />
        </MainInset>
      </div>
    </SidebarProvider>
  );
}
