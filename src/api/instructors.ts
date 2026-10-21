import { apiFetch, MAX_PER_PAGE } from './api';
import type { PaginatedList } from './api';

const COLLECTION_PATH =
  '/api/collections/instructorsWithUpcomingWorkshops/records';

export type Instructor = {
  collectionId: string;
  id: string;
  name: string;
  photo: string;
  specialization: string;
};

export async function fetchInstructors({
  perPage = MAX_PER_PAGE,
  page = 1,
}: {
  perPage?: number;
  page?: number;
}): Promise<PaginatedList<Instructor>> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const params = new URLSearchParams({
    perPage: `${perPage}`,
    page: `${page}`,
  });
  const data = await apiFetch<PaginatedList<Instructor>>(
    `${COLLECTION_PATH}?${params}`,
  );

  return data;
}
