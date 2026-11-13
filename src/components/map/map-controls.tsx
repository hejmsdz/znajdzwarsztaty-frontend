import { MinusIcon, PlusIcon } from 'lucide-react';
import { useMap } from 'react-leaflet';
import { Button } from '#/components/ui/button';

export function MapControls() {
  const map = useMap();

  return (
    <div className="absolute right-3 bottom-10 z-1 flex flex-col gap-0.5 rounded-2xl bg-card/95 p-1 shadow-lg ring-1 ring-foreground/5">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Przybliż mapę"
        onClick={() => map.zoomIn()}
      >
        <PlusIcon />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Oddal mapę"
        onClick={() => map.zoomOut()}
      >
        <MinusIcon />
      </Button>
    </div>
  );
}
