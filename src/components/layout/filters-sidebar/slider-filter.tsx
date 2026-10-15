import { Slider } from '@/components/ui/slider';

import { Filter } from './filter';

type SliderFilterProps = {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
  ticks?: string[];
  valueLabel?: string;
};

export function SliderFilter({
  label,
  min,
  max,
  step = 1,
  value,
  onValueChange,
  ticks,
  valueLabel,
}: SliderFilterProps) {
  return (
    <Filter label={label} contentClassName="px-2">
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => {
          if (Array.isArray(next)) {
            onValueChange([next[0], next[1]]);
          }
        }}
      />
      {ticks && (
        <div
          className="mt-2 flex justify-between text-[10px] text-muted-foreground"
          aria-hidden
        >
          {ticks.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>
      )}
      {valueLabel && (
        <p className="mt-2 text-center text-sm font-medium">{valueLabel}</p>
      )}
    </Filter>
  );
}
