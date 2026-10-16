import { apiFetch } from '../api';

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

export interface WorkshopsData {
  items: Workshop[];
  totalItems: number;
}

export async function fetchWorkshops(filter?: string): Promise<WorkshopsData> {
  const params = new URLSearchParams({ perPage: '500' });
  if (filter) {
    params.set('filter', filter);
  }

  const data = await apiFetch<WorkshopsResponse>(
    `${COLLECTION_PATH}?${params}`,
  );

  return {
    items: data.items,
    totalItems: data.totalItems,
  };
}
