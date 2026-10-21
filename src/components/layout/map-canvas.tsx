import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LocateFixedIcon, MinusIcon, PlusIcon } from 'lucide-react';
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { MapPopup } from '#/components/map-popup';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { Button } from '@/components/ui/button';

const MAP_CENTER: [number, number] = [52.06, 19.48];
const DEFAULT_ZOOM = 6;

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
  const [search] = useWorkshopsSearchParams();
  const { data: workshops } = useWorkshops(search);

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
        <MarkerClusterGroup showCoverageOnHover={false}>
          {(workshops?.items ?? []).map(
            ({ id, title, location: { lat, lon } }) => (
              <Marker key={id} position={[lat, lon]} icon={pinIcon}>
                <Tooltip direction="top" offset={[0, -18]}>
                  {title}
                </Tooltip>
                <MapPopup workshopId={id} />
              </Marker>
            ),
          )}
        </MarkerClusterGroup>
        <MapControls />
      </MapContainer>
    </div>
  );
}
