import { apiFetch } from '../api';
import type { Instructor } from '../instructors';

const COLLECTION_PATH = '/api/collections/upcomingWorkshops/records';

export interface Coordinates {
  lat: number;
  lon: number;
}

export type WorkshopLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkshopType =
  | 'polyphony'
  | 'gregorian-chant'
  | 'contemporary-worship'
  | 'various-traditions'
  | 'orchestral';
export type WorkshopDuration = 'one-day' | 'weekend' | 'longer';

export interface Workshop {
  id: string;
  title: string;
  venue: string;
  locality: string;
  location: Coordinates;
  startTime: string;
  endTime: string;
  duration: WorkshopDuration;
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
  expand?: {
    instructors?: Instructor[];
  };
}

export type WorkshopSummary = Pick<Workshop, 'id' | 'title' | 'location'>;

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

export async function fetchWorkshop(id: string): Promise<Workshop> {
  const params = new URLSearchParams({ expand: 'instructors' });

  return apiFetch<Workshop>(`${COLLECTION_PATH}/${id}?${params}`);
}

export async function fetchWorkshops(filter?: string): Promise<WorkshopsData> {
  const params = new URLSearchParams({
    perPage: '500',
    fields: 'id,title,location',
  });
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
