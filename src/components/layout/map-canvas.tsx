import type { CSSProperties } from 'react';
import { LocateFixedIcon, MinusIcon, Music2Icon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

const WORKSHOP_PINS = [
  { id: 1, name: 'Warsztaty chorału gregoriańskiego – Kraków', x: 43, y: 74 },
  { id: 2, name: 'Śpiew chóralny – Warszawa', x: 66, y: 38 },
  { id: 3, name: 'Polifonia sakralna – Gniezno', x: 47, y: 33 },
  { id: 4, name: 'Cantus planus – Przemyśl', x: 76, y: 66 },
  { id: 5, name: 'Warsztaty muzyki liturgicznej – Wrocław', x: 30, y: 62 },
  { id: 6, name: 'Śpiew brewiarzowy – Gdańsk', x: 44, y: 14 },
  { id: 7, name: 'Chorał gregoriański – Częstochowa', x: 52, y: 55 },
  { id: 8, name: 'Polifonia renesansowa – Lublin', x: 70, y: 57 },
  { id: 9, name: 'Śpiew chóralny – Poznań', x: 34, y: 40 },
  { id: 10, name: 'Warsztaty śpiewu liturgicznego – Białystok', x: 80, y: 27 },
];

const mapBackground: CSSProperties = {
  backgroundColor: 'oklch(0.96 0.014 145)',
  backgroundImage:
    'linear-gradient(to right, oklch(0.45 0.03 150 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.45 0.03 150 / 0.07) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
};

export function MapCanvas() {
  return (
    <div
      className="relative min-h-0 flex-1 overflow-hidden"
      style={mapBackground}
    >
      <div
        aria-hidden
        className="absolute top-8 -left-20 size-80 rounded-full bg-emerald-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute right-[20%] bottom-0 size-96 translate-y-1/3 rounded-full bg-sky-200/70 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute top-1/4 left-1/3 size-72 rounded-full bg-amber-100/60 blur-3xl"
      />

      {WORKSHOP_PINS.map((pin) => (
        <button
          key={pin.id}
          type="button"
          title={pin.name}
          aria-label={pin.name}
          className="absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20 transition-transform outline-none hover:scale-110 focus-visible:ring-6"
          style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
        >
          <Music2Icon className="size-4" />
        </button>
      ))}

      <div className="absolute right-3 bottom-3 flex flex-col gap-0.5 rounded-2xl bg-card/95 p-1 shadow-lg ring-1 ring-foreground/5">
        <Button variant="ghost" size="icon-sm" aria-label="Przybliż mapę">
          <PlusIcon />
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Oddal mapę">
          <MinusIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Pokaż moją lokalizację"
        >
          <LocateFixedIcon />
        </Button>
      </div>
    </div>
  );
}
