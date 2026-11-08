import { FilterIcon, XIcon } from 'lucide-react';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { Button } from '@/components/ui/button';
import { useSidebar } from '../../ui/sidebar';
import { Badge } from '../../ui/badge';
import { emptySearch } from '#/filters/types';
import { FilterBadges } from './filter-badges';

type PageHeaderProps = {
  title: string;
};

const PLURAL_RULES = new Intl.PluralRules('pl-PL');

const EVENT_NOUNS = {
  zero: 'wydarzeń',
  one: 'wydarzenie',
  two: 'wydarzenia',
  few: 'wydarzenia',
  many: 'wydarzeń',
  other: 'wydarzeń',
} as const;

function getEventNoun(count: number) {
  return EVENT_NOUNS[PLURAL_RULES.select(count)];
}

export function PageHeader({ title }: PageHeaderProps) {
  const { toggleSidebar } = useSidebar();
  const [search, onChange] = useWorkshopsSearchParams();
  const { data } = useWorkshops(search);

  const { page, ...filters } = search;
  const filtersCount = Object.keys(filters).length;

  return (
    <header className="border-b">
      <div className="flex items-center justify-between p-4">
        <div>
          <h1 className="text-xl font-semibold">{title}</h1>
          {data && (
            <p className="text-sm text-muted-foreground">
              Znaleziono {data.totalItems} {getEventNoun(data.totalItems)}
            </p>
          )}
        </div>
        <Button className="md:hidden" variant="outline" onClick={toggleSidebar}>
          <FilterIcon />
          Filtry
          {filtersCount ? <Badge>{filtersCount}</Badge> : null}
        </Button>
      </div>
      {filtersCount > 0 ? (
        <div className="px-4 pb-2 flex gap-1 overflow-auto">
          <FilterBadges />
          <Button
            size="xs"
            variant="link"
            onClick={() => onChange(emptySearch)}
          >
            Wyczyść
          </Button>
        </div>
      ) : null}
    </header>
  );
}
