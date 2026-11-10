export const API_URL = import.meta.env.VITE_API_URL;

export const MAX_PER_PAGE = 500;

export interface PaginatedList<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export class ApiError extends Error {
  readonly status: number;
  readonly body?: unknown;

  static async fromResponse(response: Response): Promise<ApiError> {
    const body = await response.json().catch(() => undefined);
    return new ApiError(response.status, response.statusText, body);
  }

  constructor(status: number, statusText: string, body?: unknown) {
    super(`API request failed (${status} ${statusText})`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw await ApiError.fromResponse(response);
  }

  // 204 No Content has no body to parse (e.g. record deletion).
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
