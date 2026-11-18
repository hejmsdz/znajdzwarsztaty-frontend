import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import { WorkshopsEmptyState } from '#/components/workshops-empty-state';
import { WorkshopsErrorState } from '#/components/workshops-error-state';
import { MapPopup } from './map-popup';
import { MapControls } from './map-controls';
import { pinIcon } from './pin';
import { useIsMobile } from '#/hooks/use-mobile';

const MAP_CENTER: [number, number] = [52.06, 19.48];
const DEFAULT_ZOOM = 6;

export function MapCanvas() {
  const { data: workshops, isPending, isError, refetch } = useWorkshops();
  const isMobile = useIsMobile();

  const items = workshops?.items ?? [];
  const showMessage = !isPending && (isError || items.length === 0);

  return (
    <div className="relative min-h-0 flex-1 @container-size" aria-label="Mapa">
      <MapContainer
        center={MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={isMobile ? 5 : 6}
        zoomControl={false}
        className="h-full w-full"
      >
        <div className="map-placeholder" aria-hidden="true" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
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
      {showMessage && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/20 backdrop-blur-xs p-4">
          <div className="rounded-2xl bg-card/95 p-6 shadow-lg ring-1 ring-foreground/5">
            {isError ? (
              <WorkshopsErrorState
                className="pointer-events-auto"
                onRetry={refetch}
              />
            ) : (
              <WorkshopsEmptyState className="pointer-events-auto" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
