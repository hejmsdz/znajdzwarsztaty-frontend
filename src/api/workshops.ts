import { queryOptions } from '@tanstack/react-query';

import { apiFetch } from './api';

const COLLECTION_PATH = '/api/collections/workshops/records';

export interface WorkshopLocation {
  lat: number;
  lon: number;
}

export type WorkshopLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkshopType =
  'polyphony' | 'gregorian-chant' | 'contemporary-worship' | 'orchestral';

export interface Workshop {
  id: string;
  title: string;
  venue: string;
  locality: string;
  location: WorkshopLocation;
  startTime: string;
  endTime: string;
  level: WorkshopLevel[];
  type: WorkshopType[];
  costAmount: number;
  costCurrency: string;
  infoUrl: string;
  registerUrl: string;
  contactUrl: string;
  instructors: string[];
  created: string;
  updated: string;
}

interface WorkshopsResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Workshop[];
}

export async function fetchWorkshops(): Promise<Workshop[]> {
  const data = await apiFetch<WorkshopsResponse>(COLLECTION_PATH);

  return data.items;
}

export const workshopsQueryOptions = queryOptions({
  queryKey: ['workshops'],
  queryFn: fetchWorkshops,
});
