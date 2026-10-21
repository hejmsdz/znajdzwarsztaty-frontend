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
): Promise<{ items: Instructor[]; totalItems: number }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const params = new URLSearchParams({ perPage: `${perPage}` });
  const data = await apiFetch<{ items: Instructor[]; totalItems: number }>(
    `${COLLECTION_PATH}?${params}`,
  );

  return { items: data.items, totalItems: data.totalItems };
}
