import { useEffect, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Popup } from 'react-leaflet';
import { WorkshopDetails, WorkshopDetailsSkeleton } from '../workshop-details';
import { useWorkshop } from '#/hooks/queries/use-workshop';

function setUrlHash(workshopId: string | null) {
  const { pathname, search } = window.location;
  const hash = workshopId ? `#w-${workshopId}` : '';
  history.replaceState(null, '', `${pathname}${search}${hash}`);
}

function MapPopupContent({
  workshopId,
  onLoad,
}: {
  workshopId: string;
  onLoad: () => void;
}) {
  const { data: workshop, isFetched } = useWorkshop(workshopId);
  const wasFetchedRef = useRef<boolean>(isFetched);

  useEffect(() => {
    if (isFetched && !wasFetchedRef.current) {
      onLoad();
    }

    wasFetchedRef.current = isFetched;
  }, [isFetched]);

  if (!workshop) {
    return <WorkshopDetailsSkeleton />;
  }

  return <WorkshopDetails workshop={workshop} />;
}

export function MapPopup({ workshopId }: { workshopId: string }) {
  const [hasOpened, setHasOpened] = useState(false);
  const popupRef = useRef<ComponentRef<typeof Popup>>(null);

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
          setUrlHash(workshopId);
        },
        remove: () => setUrlHash(null),
      }}
      autoPan
      autoPanPadding={[32, 32]}
    >
      {hasOpened ? (
        <MapPopupContent
          workshopId={workshopId}
          onLoad={() => popupRef.current?.update()}
        />
      ) : (
        <WorkshopDetailsSkeleton />
      )}
    </Popup>
  );
}
