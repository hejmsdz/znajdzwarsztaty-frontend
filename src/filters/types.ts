import { z } from 'zod';
import type {
  WorkshopDuration,
  WorkshopLevel,
  WorkshopType,
} from '#/api/workshops/workshops';

export const COST_MIN = 0;
export const COST_MAX = 500;
export const COST_STEP = 50;
export const COST_TICKS = ['0', '100', '200', '300', '400', '500+'];

export const VOIVODESHIPS: { value: string; label: string }[] = [
  { value: 'ds', label: 'dolnośląskie' },
  { value: 'kp', label: 'kujawsko-pomorskie' },
  { value: 'lu', label: 'lubelskie' },
  { value: 'lb', label: 'lubuskie' },
  { value: 'ld', label: 'łódzkie' },
  { value: 'ma', label: 'małopolskie' },
  { value: 'mz', label: 'mazowieckie' },
  { value: 'op', label: 'opolskie' },
  { value: 'pk', label: 'podkarpackie' },
  { value: 'pd', label: 'podlaskie' },
  { value: 'pm', label: 'pomorskie' },
  { value: 'sl', label: 'śląskie' },
  { value: 'sk', label: 'świętokrzyskie' },
  { value: 'wn', label: 'warmińsko-mazurskie' },
  { value: 'wp', label: 'wielkopolskie' },
  { value: 'zp', label: 'zachodniopomorskie' },
];

export const WORKSHOP_TYPES: { value: WorkshopType; label: string }[] = [
  { value: 'polyphony', label: 'Śpiew wielogłosowy' },
  { value: 'gregorian-chant', label: 'Chorał gregoriański' },
  { value: 'contemporary-worship', label: 'Współczesna muzyka uwielbienia' },
  { value: 'various-traditions', label: 'Różne tradycje śpiewu' },
  { value: 'orchestral', label: 'Warsztaty orkiestrowe' },
];

export const LEVELS: { value: WorkshopLevel; label: string }[] = [
  { value: 'beginner', label: 'Początkujący' },
  { value: 'intermediate', label: 'Średnio zaawansowany' },
  { value: 'advanced', label: 'Zaawansowany' },
];

export const DURATIONS: { value: WorkshopDuration; label: string }[] = [
  { value: 'one-day', label: 'Jednodniowe' },
  { value: 'weekend', label: 'Weekendowe' },
  { value: 'longer', label: 'Dłuższe' },
];

export const workshopsSearchSchema = z.object({
  text: z.string().optional(),
  type: z.array(z.enum(WORKSHOP_TYPES.map((entry) => entry.value))).optional(),
  level: z.array(z.enum(LEVELS.map((entry) => entry.value))).optional(),
  duration: z.array(z.enum(DURATIONS.map((entry) => entry.value))).optional(),
  voivodeship: z.enum(VOIVODESHIPS.map((entry) => entry.value)).optional(),
  instructors: z.array(z.string()).optional(),
  costMin: z.number().optional(),
  costMax: z.number().optional(),
  page: z.number().int().min(1).optional(),
});

export type WorkshopsSearch = z.infer<typeof workshopsSearchSchema>;

export const emptySearch: WorkshopsSearch = {
  type: undefined,
  level: undefined,
  duration: undefined,
  voivodeship: undefined,
  instructors: undefined,
  costMin: undefined,
  costMax: undefined,
  page: undefined,
};

export function clearSearchParams(
  searchToClear: WorkshopsSearch,
): WorkshopsSearch {
  const search = { ...searchToClear };

  if (!search.text) {
    delete search.text;
  }

  if (search.type?.length === 0) {
    delete search.type;
  }

  if (search.level?.length === 0) {
    delete search.level;
  }

  if (search.duration?.length === 0) {
    delete search.duration;
  }

  if (search.instructors?.length === 0) {
    delete search.instructors;
  }

  if (search.costMin === COST_MIN) {
    delete search.costMin;
  }

  if (search.costMax === COST_MAX) {
    delete search.costMax;
  }

  return search;
}
