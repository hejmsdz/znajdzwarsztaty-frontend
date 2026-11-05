import { useEffect, useState } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { useCitiesByLetter } from '#/hooks/queries/use-cities-by-letter';
import type { City } from '#/hooks/queries/use-cities-by-letter';

type CitiesComboboxProps = {
  value: City | null;
  onChange: (value: City | null) => void;
};

export function CitiesCombobox({ value, onChange }: CitiesComboboxProps) {
  const [textValue, setTextValue] = useState<string>('');
  const cities = useCitiesByLetter(
    typeof textValue === 'string' ? textValue.toLowerCase().slice(0, 1) : '',
  );

  useEffect(() => {
    setTextValue(value?.name || '');
  }, [value]);

  return (
    <Combobox items={cities} value={value} onValueChange={onChange}>
      <ComboboxInput
        placeholder="Wybierz miasto"
        value={textValue}
        onChange={(event) => {
          if (typeof event.target.value === 'string') {
            setTextValue(event.target.value);
          }
        }}
      />
      <ComboboxContent>
        <ComboboxEmpty>
          {textValue ? 'Nie znaleziono' : 'Zacznij wpisywać nazwę miasta'}
        </ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item.name} value={item}>
              {item.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
