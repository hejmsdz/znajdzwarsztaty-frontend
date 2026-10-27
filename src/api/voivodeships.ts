import { apiFetch, MAX_PER_PAGE } from './api';
import type { PaginatedList } from './api';

const COLLECTION_PATH = '/api/collections/voivodeships/records';

export type Voivodeship = {
  id: string;
};

export async function fetchVoivodeships(): Promise<PaginatedList<Voivodeship>> {
  const params = new URLSearchParams({
    perPage: `${MAX_PER_PAGE}`,
  });
  const data = await apiFetch<PaginatedList<Voivodeship>>(
    `${COLLECTION_PATH}?${params}`,
  );

  return data;
}
