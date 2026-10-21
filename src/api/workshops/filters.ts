import { anyOfGroup } from '../filters';
import type { WorkshopsSearch } from '#/filters/types';

export function stringifyFilters(filter?: WorkshopsSearch): string | undefined {
  if (!filter) {
    return undefined;
  }

  const groups: string[] = [];

  if (filter.type && filter.type.length > 0) {
    groups.push(anyOfGroup('type', filter.type));
  }
  if (filter.level && filter.level.length > 0) {
    groups.push(anyOfGroup('level', filter.level));
  }
  if (filter.instructors && filter.instructors.length > 0) {
    groups.push(anyOfGroup('instructors.id', filter.instructors));
  }
  if (filter.costMin !== undefined) {
    groups.push(`costAmount >= ${filter.costMin}`);
  }
  if (filter.costMax !== undefined) {
    groups.push(`costAmount <= ${filter.costMax}`);
  }
  if (filter.duration && filter.duration.length > 0) {
    groups.push(anyOfGroup('duration', filter.duration));
  }

  return groups.length > 0 ? groups.join(' && ') : undefined;
}
