import { useEffect, useId, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Popup } from 'react-leaflet';
import { useLeafletContext } from '@react-leaflet/core';
import type { Marker } from 'leaflet';
import FocusLock from 'react-focus-lock';
import { WorkshopDetails, WorkshopDetailsSkeleton } from '../workshop-details';
import { useWorkshop } from '#/hooks/queries/use-workshop';
import { useIsMobile } from '#/hooks/use-mobile';
import { Button } from '#/components/ui/button';
import { XIcon } from 'lucide-react';

function setUrlHash(workshopId: string | null) {
  const { pathname, search } = window.location;
  const hash = workshopId ? `#w-${workshopId}` : '';
  history.replaceState(null, '', `${pathname}${search}${hash}`);
}

function MapPopupContent({
  workshopId,
  onLoad,
  onClose,
}: {
  workshopId: string;
  onLoad: () => void;
  onClose: () => void;
}) {
  const ref = useRef<ComponentRef<'div'>>(null);
  const { data: workshop, isFetched } = useWorkshop(workshopId);
  const wasFetchedRef = useRef<boolean>(isFetched);

  useEffect(() => {
    if (isFetched && !wasFetchedRef.current) {
      onLoad();
    }

    wasFetchedRef.current = isFetched;
  }, [isFetched]);

  const titleId = useId();

  return (
    <div
      ref={ref}
      role="dialog"
      aria-busy={!workshop}
      aria-labelledby={titleId}
    >
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onClose()}
        className="absolute top-1 right-1"
        title="Zamknij"
      >
        <XIcon aria-label="Zamknij" />
      </Button>
      {workshop ? (
        <WorkshopDetails workshop={workshop} titleId={titleId} />
      ) : (
        <WorkshopDetailsSkeleton />
      )}
    </div>
  );
}

// Leaflet keeps a closing popup in the DOM for ~200ms to fade it out, while
// `.leaflet-container:has(.leaflet-popup) .leaflet-tooltip` hides tooltips.
// A tooltip opened within that window is measured at width 0 and mispositioned.
const TOOLTIP_SUPPRESS_MS = 500;

export function MapPopup({ workshopId }: { workshopId: string }) {
  const [hasOpened, setHasOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<ComponentRef<typeof Popup>>(null);
  const isMobile = useIsMobile();
  const closedAtRef = useRef(0);
  const context = useLeafletContext();

  // When the popup closes, FocusLock returns focus to the marker, and Leaflet
  // opens the marker's tooltip on focus. Close it again in that case so the
  // tooltip stays hidden; it would otherwise resurface mispositioned (Leaflet
  // sizes it while it is still hidden by the popup's fade-out).
  useEffect(() => {
    const marker = context.overlayContainer as Marker | undefined;
    const container = context.map.getContainer();
    if (!marker) return;

    const onContainerFocus = (event: FocusEvent) => {
      const justClosed = Date.now() - closedAtRef.current < TOOLTIP_SUPPRESS_MS;
      if (justClosed && event.target === marker.getElement()) {
        // Microtask: run after Leaflet's own focus handler opens the tooltip.
        Promise.resolve().then(() => marker.closeTooltip());
      }
    };

    container.addEventListener('focus', onContainerFocus, true);
    return () => {
      container.removeEventListener('focus', onContainerFocus, true);
    };
  }, [context]);

  return (
    <Popup
      ref={popupRef}
      className="workshop-popup"
      offset={[0, -22]}
      minWidth={320}
      maxWidth={360}
      eventHandlers={{
        add: () => {
          setHasOpened(true);
          setIsOpen(true);
          setUrlHash(workshopId);
        },
        remove: () => {
          closedAtRef.current = Date.now();
          setUrlHash(null);
          setIsOpen(false);
        },
      }}
      autoPan
      autoPanPadding={isMobile ? [4, 4] : [32, 32]}
      closeButton={false}
    >
      <FocusLock returnFocus disabled={!isOpen}>
        {hasOpened ? (
          <MapPopupContent
            workshopId={workshopId}
            onLoad={() => popupRef.current?.update()}
            onClose={() => popupRef.current?.close()}
          />
        ) : null}
      </FocusLock>
    </Popup>
  );
}
