import { Button } from '#/components/ui/button';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import type { ComponentProps } from 'react';

const PLURAL_RULES = new Intl.PluralRules('pl-PL');

const EVENT_NOUNS = {
  zero: 'warsztatów',
  one: 'warsztaty',
  two: 'warsztaty',
  few: 'warsztaty',
  many: 'warsztatów',
  other: 'warsztatów',
} as const;

function getWorkshopsNoun(count: number) {
  return EVENT_NOUNS[PLURAL_RULES.select(count)];
}

export function ShowWorkshopsButton(
  props: Omit<ComponentProps<typeof Button>, 'children'>,
) {
  const { data } = useWorkshops();

  return (
    <Button {...props}>
      {data
        ? `Pokaż ${data.totalItems} ${getWorkshopsNoun(data.totalItems)}`
        : 'Pokaż warsztaty'}
    </Button>
  );
}
