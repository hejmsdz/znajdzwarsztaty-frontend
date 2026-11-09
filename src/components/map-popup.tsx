import { useState } from 'react';
import { Popup } from 'react-leaflet';
import { WorkshopDetails, WorkshopDetailsSkeleton } from './workshop-details';
import { useWorkshop } from '#/hooks/queries/use-workshop';

function MapPopupContent({ workshopId }: { workshopId: string }) {
  const { data: workshop } = useWorkshop(workshopId);

  if (!workshop) {
    return <WorkshopDetailsSkeleton />;
  }

  return <WorkshopDetails workshop={workshop} />;
}

export function MapPopup({ workshopId }: { workshopId: string }) {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <Popup
      className="workshop-popup"
      offset={[0, -22]}
      minWidth={320}
      maxWidth={360}
      eventHandlers={{ add: () => setHasOpened(true) }}
      autoPan
    >
      {hasOpened ? (
        <MapPopupContent workshopId={workshopId} />
      ) : (
        <WorkshopDetailsSkeleton />
      )}
    </Popup>
  );
}
