import { useState } from 'react';
import {
  InstructorInfo,
  InstructorInfoSkeleton,
} from '#/components/instructor-info';
import { Button } from '#/components/ui/button';
import {
  useInstructorsHead,
  useInstructorsPages,
} from '#/hooks/queries/use-instructors';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { CheckboxFilter } from './checkbox-filter';

const INITIAL_NUM_ITEMS = 5;
const SUBSEQUENT_NUM_ITEMS = 10;

export function InstructorsFilter() {
  const [search, onChange] = useWorkshopsSearchParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const headQuery = useInstructorsHead(INITIAL_NUM_ITEMS);
  const pagesQuery = useInstructorsPages(
    INITIAL_NUM_ITEMS,
    SUBSEQUENT_NUM_ITEMS,
    isExpanded,
  );

  // The pages query is disabled until expanded, so it can only fetch then.
  const isLoading = headQuery.isLoading || pagesQuery.isFetching;
  const headItems = headQuery.data?.items ?? [];

  const instructors = isExpanded
    ? (pagesQuery.data?.pages.flatMap((page) => page.items) ?? headItems)
    : headItems;

  const remaining =
    headQuery.data?.totalItems === undefined
      ? undefined
      : Math.max(headQuery.data.totalItems - instructors.length, 0);

  // New items the in-flight fetch will add. The first pages page re-fetches
  // the head items, so it only adds pageSize - headNumItems new ones.
  const batchSize = isExpanded
    ? pagesQuery.data
      ? SUBSEQUENT_NUM_ITEMS
      : SUBSEQUENT_NUM_ITEMS - INITIAL_NUM_ITEMS
    : INITIAL_NUM_ITEMS;

  // Skeletons fill the gap between what's loaded and what the in-flight
  // request will add.
  const skeletonCount = isLoading
    ? Math.min(batchSize, remaining ?? batchSize)
    : 0;

  const options = [
    ...instructors.map((instructor) => ({
      value: instructor.id,
      label: instructor.name,
      instructor,
    })),
    ...Array.from({ length: skeletonCount }, (_, index) => ({
      value: `skeleton-${index}`,
      label: '',
      instructor: null,
      disabled: true,
    })),
  ];

  const loadMore = () => {
    if (isExpanded) {
      pagesQuery.fetchNextPage();
    } else {
      setIsExpanded(true);
    }
  };

  const isFetchingLastPage = pagesQuery.isFetching && skeletonCount < batchSize;
  const showMoreButton =
    (Boolean(remaining) || isLoading) && !isFetchingLastPage;

  return (
    <CheckboxFilter
      label="Prowadzący"
      options={options}
      value={search.instructors ?? []}
      onValueChange={(instructorIds) =>
        onChange({ instructors: instructorIds })
      }
      renderOption={(option) =>
        option.instructor ? (
          <InstructorInfo instructor={option.instructor} />
        ) : (
          <InstructorInfoSkeleton />
        )
      }
    >
      {showMoreButton && (
        <Button
          variant="link"
          size="xs"
          onClick={loadMore}
          disabled={isLoading}
        >
          Pokaż więcej
        </Button>
      )}
    </CheckboxFilter>
  );
}
