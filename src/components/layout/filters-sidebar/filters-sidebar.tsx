import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { CheckboxFilter } from './checkbox-filter';
import { SliderFilter } from './slider-filter';
import {
  COST_MAX,
  COST_MIN,
  COST_STEP,
  COST_TICKS,
  emptySearch,
  LEVELS,
  WORKSHOP_TYPES,
} from '@/filters/types';
import type { WorkshopsSearch } from '@/filters/types';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';

function formatCostLabel({
  costMin = COST_MIN,
  costMax = COST_MAX,
}: Pick<WorkshopsSearch, 'costMin' | 'costMax'>) {
  if (costMin === COST_MIN && costMax === COST_MAX) {
    return 'Dowolna cena';
  }

  if (costMax === 0) {
    return 'Bezpłatne';
  }

  if (costMin === 0 && costMax > 0) {
    return `do ${costMax} zł`;
  }

  if (costMax === COST_MAX) {
    return `od ${costMin} zł`;
  }

  if (costMin === costMax) {
    return `${costMin} zł`;
  }

  return `${costMin} – ${costMax} zł`;
}

export function FiltersSidebar() {
  const [search, onChange] = useWorkshopsSearchParams();

  return (
    <Sidebar
      collapsible="none"
      className="hidden md:flex md:border-r md:border-sidebar-border"
    >
      <SidebarHeader className="gap-3 p-4 pb-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-heading text-base font-semibold tracking-tight">
            Filtry
          </h2>
          <Badge variant="secondary" className="font-medium tabular-nums">
            {/* {data ? `${data.totalItems} warsztatów` : '…'} */}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Zawęź wyniki i znajdź warsztaty śpiewu liturgicznego blisko Ciebie.
        </p>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="px-1 pt-2">
        <CheckboxFilter
          label="Rodzaj warsztatów"
          options={WORKSHOP_TYPES}
          value={search.type ?? []}
          onValueChange={(type) => onChange({ type })}
        />
        <CheckboxFilter
          label="Poziom zaawansowania"
          options={LEVELS}
          value={search.level ?? []}
          onValueChange={(level) => onChange({ level })}
        />
        <SliderFilter
          label="Koszt uczestnictwa (zł)"
          min={COST_MIN}
          max={COST_MAX}
          step={COST_STEP}
          value={[search.costMin ?? COST_MIN, search.costMax ?? COST_MAX]}
          onValueChange={([costMin, costMax]) => onChange({ costMin, costMax })}
          ticks={COST_TICKS}
          valueLabel={formatCostLabel(search)}
        />
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onChange(emptySearch)}
        >
          Wyczyść filtry
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
