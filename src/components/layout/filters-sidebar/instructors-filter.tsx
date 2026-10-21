import { useState } from 'react';
import {
  InstructorInfo,
  InstructorInfoSkeleton,
} from '@/components/instructor-info';
import { Button } from '@/components/ui/button';
import { useInstructors } from '#/hooks/queries/use-instructors';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { CheckboxFilter } from './checkbox-filter';

const INITIAL_NUM_ITEMS = 5;

export function InstructorsFilter() {
  const [search, onChange] = useWorkshopsSearchParams();
  const [showAll, setShowAll] = useState(false);
  const { data, isLoading } = useInstructors(
    showAll ? undefined : INITIAL_NUM_ITEMS,
  );

  const instructors = data?.items ?? [];
  const totalItems = data?.totalItems;
  const hasMore = totalItems !== undefined && instructors.length < totalItems;

  const skeletonCount = isLoading
    ? INITIAL_NUM_ITEMS
    : showAll && totalItems !== undefined && instructors.length < totalItems
      ? totalItems - instructors.length
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
      {hasMore && (
        <Button variant="link" size="xs" onClick={() => setShowAll(true)}>
          Pokaż więcej
        </Button>
      )}
    </CheckboxFilter>
  );
}
