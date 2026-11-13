import { Filter } from './filter';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';

type SelectFilterOption<T extends string = string> = {
  value: T;
  label: string;
};

type SelectFilterProps<
  T extends string = string,
  TOption extends SelectFilterOption<T> = SelectFilterOption<T>,
> = {
  label: string;
  options: TOption[];
  value: T | undefined;
  onValueChange: (value: T | undefined) => void;
  allLabel: string;
};

export function SelectFilter<
  T extends string = string,
  TOption extends SelectFilterOption<T> = SelectFilterOption<T>,
>({
  label,
  options,
  value,
  onValueChange,
  allLabel,
}: SelectFilterProps<T, TOption>) {
  return (
    <Filter label={label}>
      <Select
        items={options}
        value={value ?? null}
        onValueChange={(nextValue) => onValueChange(nextValue || undefined)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={allLabel} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">{allLabel}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Filter>
  );
}
