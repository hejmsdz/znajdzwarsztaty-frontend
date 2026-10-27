import { useMemo } from 'react';
import { fetchVoivodeships } from '#/api/voivodeships';
import { queryKeys } from '#/hooks/queries/keys';
import { useQuery } from '@tanstack/react-query';
import { VOIVODESHIPS } from '#/filters/types';

export const useVoivodeships = (enabled: boolean) => {
  const { data: voivodeships, isFetched } = useQuery({
    queryKey: queryKeys.voivodeships(),
    queryFn: () => fetchVoivodeships(),
    enabled,
    select: (data) => new Set(data.items.map((voivodeship) => voivodeship.id)),
  });

  return useMemo(() => {
    if (!voivodeships) {
      return VOIVODESHIPS;
    }

    return VOIVODESHIPS.filter((voivodeship) =>
      voivodeships.has(voivodeship.value),
    );
  }, [voivodeships, isFetched]);
};
