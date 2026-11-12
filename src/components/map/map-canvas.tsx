import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import { MapPopup } from './map-popup';
import { MapControls } from './map-controls';
import { pinIcon } from './pin';

const MAP_CENTER: [number, number] = [52.06, 19.48];
const DEFAULT_ZOOM = 6;

export function MapCanvas() {
  const { data: workshops } = useWorkshops();

  return (
    <div className="relative min-h-0 flex-1" aria-label="Mapa">
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
              <Marker key={id} position={[lat, lon]} icon={pinIcon(title)}>
                <Tooltip
                  direction="top"
                  offset={[0, -18]}
                  className="workshop-tooltip"
                >
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
