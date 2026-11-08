import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import type { WorkshopsFilters } from '@/filters/types';
import { FilterBadge } from './filter-badge';
import { FilterValue } from './filter-value';

export function FilterBadges() {
  const [search, onChange] = useWorkshopsSearchParams();
  const { page, ...filters } = search;

  const filterKeys = Object.keys(filters) as Array<keyof WorkshopsFilters>;

  return filterKeys.map((key) => {
    const value = filters[key];

    if (value === undefined) {
      return null;
    }

    const isArray = Array.isArray(value);
    const values = isArray ? value : [value];

    return values.map((itemValue) => (
      <FilterBadge
        key={`${key}__${itemValue}`}
        onRemove={() =>
          onChange({
            [key]: isArray ? value.filter((iv) => iv !== itemValue) : undefined,
          })
        }
      >
        <FilterValue filterKey={key} value={itemValue} />
      </FilterBadge>
    ));
  });
}
