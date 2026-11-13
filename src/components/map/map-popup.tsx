import { useEffect, useId, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { Popup } from 'react-leaflet';
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

export function MapPopup({ workshopId }: { workshopId: string }) {
  const [hasOpened, setHasOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<ComponentRef<typeof Popup>>(null);
  const isMobile = useIsMobile();

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
          setUrlHash(null);
          setIsOpen(false);
          setTimeout(() => {
            // popupRef.current?.closeTooltip();
            // debugger;
          }, 0);
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
