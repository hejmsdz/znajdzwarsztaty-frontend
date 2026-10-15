import { useState } from 'react';
import { SparklesIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';

import { CheckboxFilter } from './checkbox-filter';
import {
  AMENITIES,
  LEVELS,
  MONTHS,
  RESULT_COUNT,
  VOIVODESHIP_OPTIONS,
  WORKSHOP_TYPES,
} from './constants';
import { SelectFilter } from './select-filter';
import { SliderFilter } from './slider-filter';

export function FiltersSidebar() {
  const [voivodeship, setVoivodeship] = useState('all');
  const [months, setMonths] = useState<[number, number]>([1, 12]);
  const [types, setTypes] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const [from, to] = months;
  const monthsLabel =
    from === 1 && to === 12
      ? 'Cały rok'
      : from === to
        ? MONTHS[from - 1]
        : `${MONTHS[from - 1]} – ${MONTHS[to - 1]}`;

  function clearFilters() {
    setVoivodeship('all');
    setMonths([1, 12]);
    setTypes([]);
    setLevels([]);
    setAmenities([]);
  }

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
            {RESULT_COUNT} warsztaty
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Zawęź wyniki i znajdź warsztaty śpiewu liturgicznego blisko Ciebie.
        </p>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="px-1 pt-2">
        <SelectFilter
          label="Lokalizacja"
          value={voivodeship}
          options={VOIVODESHIP_OPTIONS}
          onValueChange={(value) => setVoivodeship(value ?? 'all')}
        />
        <SliderFilter
          label="Termin"
          min={1}
          max={12}
          value={months}
          onValueChange={setMonths}
          ticks={MONTHS}
          valueLabel={monthsLabel}
        />
        <CheckboxFilter
          label="Rodzaj warsztatów"
          options={WORKSHOP_TYPES}
          value={types}
          onValueChange={setTypes}
        />
        <CheckboxFilter
          label="Poziom zaawansowania"
          options={LEVELS}
          value={levels}
          onValueChange={setLevels}
        />
        <CheckboxFilter
          label="Udogodnienia"
          options={AMENITIES}
          value={amenities}
          onValueChange={setAmenities}
        />
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Wyczyść filtry
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
