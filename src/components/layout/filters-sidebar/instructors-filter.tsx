import { useState } from 'react';
import { InstructorInfo } from '@/components/instructor-info';
import { Button } from '@/components/ui/button';
import { useInstructors } from '#/hooks/queries/use-instructors';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { CheckboxFilter } from './checkbox-filter';

const INITIAL_NUM_ITEMS = 5;

export function InstructorsFilter() {
  const [search, onChange] = useWorkshopsSearchParams();
  const [showAll, setShowAll] = useState(false);
  const { data: instructors } = useInstructors(
    showAll ? undefined : INITIAL_NUM_ITEMS,
  );

  const visibleInstructors = instructors ?? [];
  const hasMore = !showAll;

  return (
    <CheckboxFilter
      label="Prowadzący"
      options={visibleInstructors.map((instructor) => ({
        value: instructor.id,
        label: instructor.name,
        instructor,
      }))}
      value={search.instructors ?? []}
      onValueChange={(instructorIds) =>
        onChange({ instructors: instructorIds })
      }
      renderOption={(option) => (
        <InstructorInfo instructor={option.instructor} />
      )}
    >
      {hasMore && (
        <Button variant="link" size="xs" onClick={() => setShowAll(true)}>
          Pokaż więcej
        </Button>
      )}
    </CheckboxFilter>
  );
}
