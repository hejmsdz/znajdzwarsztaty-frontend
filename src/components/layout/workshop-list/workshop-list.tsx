import { useEffect, useId, useRef } from 'react';
import { parseWorkshopDate } from '#/components/workshop-details';
import type { Workshop } from '#/api/workshops/workshops';
import { useWorkshopsList } from '#/hooks/queries/use-workshops';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import type { WorkshopsSearch } from '#/filters/types';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '#/components/ui/pagination';
import { WorkshopCard, WorkshopCardSkeleton } from './workshop-card';
import { WorkshopsEmptyState } from '#/components/workshops-empty-state';
import { WorkshopsErrorState } from '#/components/workshops-error-state';

const MONTH_FORMATTER = new Intl.DateTimeFormat('pl-PL', {
  month: 'long',
  year: 'numeric',
});

const SKELETON_COUNT = 9;

type WorkshopGroup = {
  key: string;
  label: string;
  workshops: Workshop[];
};

function groupWorkshopsByMonth(workshops: Workshop[]): WorkshopGroup[] {
  const groups: WorkshopGroup[] = [];
  const groupsByKey = new Map<string, WorkshopGroup>();

  for (const workshop of workshops) {
    const date = parseWorkshopDate(workshop.startTime);
    const key = date ? `${date.getFullYear()}-${date.getMonth()}` : 'unknown';
    const label = date ? MONTH_FORMATTER.format(date) : 'Termin nieokreślony';

    let group = groupsByKey.get(key);
    if (!group) {
      group = { key, label, workshops: [] };
      groupsByKey.set(key, group);
      groups.push(group);
    }
    group.workshops.push(workshop);
  }

  return groups;
}

function pageSearch(search: WorkshopsSearch, page: number): WorkshopsSearch {
  return { ...search, page: page > 1 ? page : undefined };
}

export function WorkshopList() {
  const id = useId();
  const [search] = useWorkshopsSearchParams();
  const { data, isPending, isError, isPlaceholderData, refetch } =
    useWorkshopsList();
  const scrollRef = useRef<HTMLDivElement>(null);

  const workshops = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const currentPage = data?.page ?? search.page ?? 1;

  useEffect(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0 });
    }, 0);
  }, [currentPage]);

  if (isPending || isError || workshops.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {isPending ? (
            <div className="grid gap-4">
              {Array.from({ length: SKELETON_COUNT }, (_, index) => (
                <WorkshopCardSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <WorkshopsErrorState className="py-16" onRetry={refetch} />
          ) : (
            <WorkshopsEmptyState className="py-16" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-4">
        <div className="flex flex-col gap-8" aria-busy={isPlaceholderData}>
          {groupWorkshopsByMonth(workshops).map((group) => (
            <section
              key={group.key}
              className="flex flex-col gap-4"
              aria-labelledby={`${id}-${group.key}`}
            >
              <h2
                id={`${id}-${group.key}`}
                className="font-heading text-lg font-semibold tracking-tight first-letter:uppercase"
              >
                {group.label}
              </h2>
              {group.workshops.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </section>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="py-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    text="Poprzednia"
                    to="."
                    search={pageSearch(search, currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  />
                </PaginationItem>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      to="."
                      search={pageSearch(search, page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    text="Następna"
                    to="."
                    search={pageSearch(search, currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
