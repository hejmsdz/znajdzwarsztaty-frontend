import L from 'leaflet';
import { LocateFixedIcon, MinusIcon, PlusIcon } from 'lucide-react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Button } from '@/components/ui/button';

const MAP_CENTER: [number, number] = [52.06, 19.48];
const DEFAULT_ZOOM = 6;

const WORKSHOP_PINS = [
  {
    id: 1,
    name: 'Warsztaty chorału gregoriańskiego – Kraków',
    position: [50.0614, 19.9366] as [number, number],
  },
  {
    id: 2,
    name: 'Śpiew chóralny – Warszawa',
    position: [52.2297, 21.0122] as [number, number],
  },
  {
    id: 3,
    name: 'Polifonia sakralna – Gniezno',
    position: [52.5348, 17.5826] as [number, number],
  },
  {
    id: 4,
    name: 'Cantus planus – Przemyśl',
    position: [49.7848, 22.7679] as [number, number],
  },
  {
    id: 5,
    name: 'Warsztaty muzyki liturgicznej – Wrocław',
    position: [51.1079, 17.0385] as [number, number],
  },
  {
    id: 6,
    name: 'Śpiew brewiarzowy – Gdańsk',
    position: [54.352, 18.6466] as [number, number],
  },
  {
    id: 7,
    name: 'Chorał gregoriański – Częstochowa',
    position: [50.8118, 19.1203] as [number, number],
  },
  {
    id: 8,
    name: 'Polifonia renesansowa – Lublin',
    position: [51.2465, 22.5684] as [number, number],
  },
  {
    id: 9,
    name: 'Śpiew chóralny – Poznań',
    position: [52.4064, 16.9252] as [number, number],
  },
  {
    id: 10,
    name: 'Warsztaty śpiewu liturgicznego – Białystok',
    position: [53.1325, 23.1688] as [number, number],
  },
];

const PIN_HTML = `<span class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4"><path d="M9 18V5l12-2v13"/><circle cx="9" cy="18" r="3"/><circle cx="21" cy="16" r="3"/></svg></span>`;

const pinIcon = L.divIcon({
  className: '',
  html: PIN_HTML,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

function MapControls() {
  const map = useMap();

  return (
    <div className="absolute right-3 bottom-10 z-1000 flex flex-col gap-0.5 rounded-2xl bg-card/95 p-1 shadow-lg ring-1 ring-foreground/5">
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
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Pokaż moją lokalizację"
        onClick={() => map.locate({ setView: true, maxZoom: 13 })}
      >
        <LocateFixedIcon />
      </Button>
    </div>
  );
}

export function MapCanvas() {
  return (
    <div className="relative min-h-0 flex-1">
      <MapContainer
        center={MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={6}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {WORKSHOP_PINS.map((pin) => (
          <Marker key={pin.id} position={pin.position} icon={pinIcon}>
            <Tooltip direction="top" offset={[0, -18]}>
              {pin.name}
            </Tooltip>
          </Marker>
        ))}
        <MapControls />
      </MapContainer>
    </div>
  );
}
