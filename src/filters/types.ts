import { z } from 'zod';
import type { WorkshopLevel, WorkshopType } from '#/api/workshops/workshops';

export const COST_MIN = 0;
export const COST_MAX = 500;
export const COST_STEP = 50;
export const COST_TICKS = ['0', '100', '200', '300', '400', '500+'];

export const WORKSHOP_TYPES: { value: WorkshopType; label: string }[] = [
  { value: 'polyphony', label: 'Śpiew wielogłosowy' },
  { value: 'gregorian-chant', label: 'Chorał gregoriański' },
  { value: 'contemporary-worship', label: 'Współczesna muzyka uwielbienia' },
  { value: 'orchestral', label: 'Warsztaty orkiestrowe' },
];

export const LEVELS: { value: WorkshopLevel; label: string }[] = [
  { value: 'beginner', label: 'Początkujący' },
  { value: 'intermediate', label: 'Średniozaawansowany' },
  { value: 'advanced', label: 'Zaawansowany' },
];

export const workshopsSearchSchema = z.object({
  type: z.array(z.enum(WORKSHOP_TYPES.map((entry) => entry.value))).optional(),
  level: z.array(z.enum(LEVELS.map((entry) => entry.value))).optional(),
  costMin: z.number().optional(),
  costMax: z.number().optional(),
});

export type WorkshopsSearch = z.infer<typeof workshopsSearchSchema>;

export const emptySearch: WorkshopsSearch = {
  type: undefined,
  level: undefined,
  costMin: undefined,
  costMax: undefined,
};

export function clearSearchParams(
  searchToClear: WorkshopsSearch,
): WorkshopsSearch {
  const search = { ...searchToClear };

  if (search.type?.length === 0) {
    delete search.type;
  }

  if (search.level?.length === 0) {
    delete search.level;
  }

  if (search.costMin === COST_MIN) {
    delete search.costMin;
  }

  if (search.costMax === COST_MAX) {
    delete search.costMax;
  }

  return search;
}
