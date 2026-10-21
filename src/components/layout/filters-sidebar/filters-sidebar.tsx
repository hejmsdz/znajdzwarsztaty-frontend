import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { CheckboxFilter } from './checkbox-filter';
import { InstructorsFilter } from './instructors-filter';
import { SliderFilter } from './slider-filter';
import {
  COST_MAX,
  COST_MIN,
  COST_STEP,
  COST_TICKS,
  DURATIONS,
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
          {Object.keys(search).length > 0 && (
            <Button
              variant="link"
              size="xs"
              onClick={() => onChange(emptySearch)}
            >
              Wyczyść wszystkie
            </Button>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1 pt-2">
        <CheckboxFilter
          label="Rodzaj warsztatów"
          options={WORKSHOP_TYPES}
          value={search.type ?? []}
          onValueChange={(type) => onChange({ type })}
        />
        <InstructorsFilter />
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
        <CheckboxFilter
          label="Długość"
          options={DURATIONS}
          value={search.duration ?? []}
          onValueChange={(duration) => onChange({ duration })}
        />
        <CheckboxFilter
          label="Poziom zaawansowania"
          options={LEVELS}
          value={search.level ?? []}
          onValueChange={(level) => onChange({ level })}
        />
      </SidebarContent>
    </Sidebar>
  );
}
