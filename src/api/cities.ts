export type Cities = Record<string, [number, number]>;

export async function fetchCitiesByLetter(letter: string): Promise<Cities> {
  const response = await fetch(`/data/cities/${letter}.json`);

  if (!response.ok) {
    throw new Error(
      `Failed to load cities (${response.status} ${response.statusText})`,
    );
  }

  return response.json() as Promise<Cities>;
}
