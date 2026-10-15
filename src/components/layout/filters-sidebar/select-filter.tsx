import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Filter } from './filter';

type SelectFilterOption = {
  value: string;
  label: string;
  className?: string;
};

type SelectFilterProps = {
  label: string;
  value: string;
  options: SelectFilterOption[];
  onValueChange: (value: string | null) => void;
};

export function SelectFilter({
  label,
  value,
  options,
  onValueChange,
}: SelectFilterProps) {
  return (
    <Filter label={label}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={option.className}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Filter>
  );
}
