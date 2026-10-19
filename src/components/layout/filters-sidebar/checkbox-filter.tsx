import type { ReactNode } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

import { Filter } from './filter';

type CheckboxFilterOption<T extends string = string> = {
  value: T;
  label: string;
  count?: number;
};

type CheckboxFilterProps<
  T extends string = string,
  TOption extends CheckboxFilterOption<T> = CheckboxFilterOption<T>,
> = {
  label: string;
  options: TOption[];
  value: T[];
  onValueChange: (value: T[]) => void;
  renderOption?: (option: TOption) => ReactNode;
};

function toggleValue<T>(list: T[], value: T, checked: boolean) {
  return checked ? [...list, value] : list.filter((item) => item !== value);
}

function CheckboxRow({
  content,
  count,
  checked,
  onCheckedChange,
}: {
  content: ReactNode;
  count?: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm hover:bg-sidebar-accent">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      <span className="flex-1">{content}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground tabular-nums">
          {count}
        </span>
      )}
    </label>
  );
}

export function CheckboxFilter<
  T extends string = string,
  TOption extends CheckboxFilterOption<T> = CheckboxFilterOption<T>,
>({
  label,
  options,
  value,
  onValueChange,
  renderOption,
}: CheckboxFilterProps<T, TOption>) {
  return (
    <Filter label={label}>
      {options.map((option) => (
        <CheckboxRow
          key={option.value}
          content={renderOption ? renderOption(option) : option.label}
          count={option.count}
          checked={value.includes(option.value)}
          onCheckedChange={(checked) =>
            onValueChange(toggleValue(value, option.value, checked))
          }
        />
      ))}
    </Filter>
  );
}
