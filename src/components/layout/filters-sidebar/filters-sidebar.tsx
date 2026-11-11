import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { XIcon } from 'lucide-react';
import { CheckboxFilter } from './checkbox-filter';
import { InstructorsFilter } from './instructors-filter';
import { SelectFilter } from './select-filter';
import { SliderFilter } from './slider-filter';
import {
  COST_MAX,
  COST_MIN,
  COST_STEP,
  COST_TICKS,
  DURATIONS,
  LEVELS,
  WORKSHOP_TYPES,
} from '@/filters/types';
import type { WorkshopsSearch } from '@/filters/types';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { useVoivodeships } from '#/hooks/queries/use-voivodeships';
import { Input } from '#/components/ui/input';
import { Filter } from './filter';
import { ShowWorkshopsButton } from './show-workshops-button';

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

type FiltersSidebarProps = {
  showVoivodeshipFilter?: boolean;
};

export function FiltersSidebar({ showVoivodeshipFilter }: FiltersSidebarProps) {
  const { setOpenMobile } = useSidebar();
  const close = () => setOpenMobile(false);
  const [{ page, ...search }, onChange] = useWorkshopsSearchParams();

  const voivodeships = useVoivodeships(showVoivodeshipFilter ?? false);

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
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={close}
            title="Zamknij"
          >
            <XIcon />
            <span className="sr-only">Zamknij filtry</span>
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-1 pt-0">
        <Filter label="Szukaj">
          <Input
            value={search.q || ''}
            onChange={(event) => onChange({ q: event.target.value })}
            placeholder="Tytuł albo miejsce warsztatów"
          />
        </Filter>
        {showVoivodeshipFilter && (
          <SelectFilter
            label="Województwo"
            options={voivodeships}
            value={search.voivodeship}
            onValueChange={(voivodeship) => onChange({ voivodeship })}
            allLabel="Wszystkie"
          />
        )}
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
          label="Rodzaj warsztatów"
          options={WORKSHOP_TYPES}
          value={search.type ?? []}
          onValueChange={(type) => onChange({ type })}
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
      <SidebarFooter className="md:hidden">
        <ShowWorkshopsButton onClick={close} />
      </SidebarFooter>
    </Sidebar>
  );
}
