import { apiFetch, MAX_PER_PAGE } from './api';

const COLLECTION_PATH =
  '/api/collections/instructorsWithUpcomingWorkshops/records';

export type Instructor = {
  collectionId: string;
  id: string;
  name: string;
  photo: string;
  specialization: string;
};

export async function fetchInstructors(
  perPage: number = MAX_PER_PAGE,
): Promise<Instructor[]> {
  const params = new URLSearchParams({ perPage: `${perPage}` });
  const data = await apiFetch<{ items: Instructor[] }>(
    `${COLLECTION_PATH}?${params}`,
  );

  return data.items;
}
