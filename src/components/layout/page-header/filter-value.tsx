import {
  DURATIONS,
  LEVELS,
  VOIVODESHIPS,
  WORKSHOP_TYPES,
} from '@/filters/types';
import type { WorkshopsFilters } from '@/filters/types';
import { MAX_PER_PAGE } from '#/api/api';
import { useInstructorsHead } from '#/hooks/queries/use-instructors';

type FilterValueProps<
  T extends keyof WorkshopsFilters = keyof WorkshopsFilters,
> = {
  filterKey: T;
  value: WorkshopsFilters[T] extends Array<infer U> ? U : WorkshopsFilters[T];
};

function InstructorValue({ id }: { id: string }) {
  const instructorsQuery = useInstructorsHead(MAX_PER_PAGE);
  const name = instructorsQuery.data?.items.find(
    (instructor) => instructor.id === id,
  )?.name;

  return name ?? id;
}

export function FilterValue({ filterKey, value }: FilterValueProps) {
  switch (filterKey) {
    case 'costMin':
      return `≥ ${value} zł`;
    case 'costMax':
      return value === 0 ? 'Bezpłatne' : `≤ ${value} zł`;
    case 'type':
      return (
        WORKSHOP_TYPES.find((entry) => entry.value === value)?.label ?? value
      );
    case 'level':
      return LEVELS.find((entry) => entry.value === value)?.label ?? value;
    case 'duration':
      return DURATIONS.find((entry) => entry.value === value)?.label ?? value;
    case 'voivodeship':
      return (
        VOIVODESHIPS.find((entry) => entry.value === value)?.label ?? value
      );
    case 'instructors':
      return typeof value === 'string' ? <InstructorValue id={value} /> : null;
    default:
      return value;
  }
}
