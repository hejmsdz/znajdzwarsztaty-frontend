import { useRef } from 'react';
import type { ComponentRef } from 'react';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useWorkshops } from '#/hooks/queries/use-workshops';
import { useMapFocus } from '#/hooks/use-map-focus';
import { WorkshopsEmptyState } from '#/components/workshops-empty-state';
import { WorkshopsErrorState } from '#/components/workshops-error-state';
import { MapPopup } from './map-popup';
import { MapControls } from './map-controls';
import { pinIcon } from './pin';
import { useIsMobile } from '#/hooks/use-mobile';
import { useMediaQuery } from '#/hooks/use-media-query';

const MAP_CENTER: [number, number] = [52.06, 19.48];

export function MapCanvas() {
  const { data: workshops, isPending, isError, refetch } = useWorkshops();
  const isMobile = useIsMobile();
  const isDesktopXl = useMediaQuery('(min-width: 1536px)');
  const clusterRef = useRef<ComponentRef<typeof MarkerClusterGroup>>(null);
  const captureMarker = useMapFocus(clusterRef);

  const items = workshops?.items ?? [];
  const showMessage = !isPending && (isError || items.length === 0);

  const defaultZoom = isDesktopXl ? 7 : 6;
  const minZoom = isMobile ? 5 : 6;

  return (
    <div className="relative min-h-0 flex-1 @container-size" aria-label="Mapa">
      <MapContainer
        center={MAP_CENTER}
        zoom={defaultZoom}
        minZoom={minZoom}
        zoomControl={false}
        className="h-full w-full"
      >
        <div className="map-placeholder" aria-hidden="true" />
        <TileLayer
          attribution={`&copy; <a href="https://stadiamaps.com/attribution/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>`}
          url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        />
        <MarkerClusterGroup ref={clusterRef} showCoverageOnHover={false}>
          {(workshops?.items ?? []).map(
            ({ id, title, location: { lat, lon } }) => (
              <Marker
                key={id}
                ref={(marker) => captureMarker(marker, id)}
                position={[lat, lon]}
                icon={pinIcon(title)}
              >
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
