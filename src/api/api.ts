const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(
      `API request failed (${response.status} ${response.statusText})`,
    );
  }

  return response.json() as Promise<T>;
}
