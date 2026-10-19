import { apiFetch } from './api';

const COLLECTION_PATH =
  '/api/collections/instructorsWithUpcomingWorkshops/records';

export type Instructor = {
  collectionId: string;
  id: string;
  name: string;
  photo: string;
  specialization: string;
};

export async function fetchInstructors(): Promise<Instructor[]> {
  const params = new URLSearchParams({ perPage: '500' });
  const data = await apiFetch<{ items: Instructor[] }>(
    `${COLLECTION_PATH}?${params}`,
  );

  return data.items;
}
