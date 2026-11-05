import { fetchCitiesByLetter } from '#/api/cities';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery } from '@tanstack/react-query';

export type City = {
  name: string;
  lat: number;
  lon: number;
};

export const useCitiesByLetter = (letter: string): City[] | undefined => {
  const { data } = useQuery({
    queryKey: queryKeys.citiesByLetter(letter),
    queryFn: () => fetchCitiesByLetter(letter),
    enabled: letter != '',
    select: (dataObject) =>
      Object.entries(dataObject).map(([name, [lat, lon]]) => ({
        name,
        lat,
        lon,
      })),
  });

  return data;
};
