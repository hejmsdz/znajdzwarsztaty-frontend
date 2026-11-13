import {
  WorkshopDetails,
  WorkshopDetailsSkeleton,
} from '#/components/workshop-details';
import type { Workshop } from '#/api/workshops/workshops';
import { useId } from 'react';

const CARD_CLASS = 'rounded-2xl border bg-card shadow-sm';

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  const id = useId();
  return (
    <article
      className={CARD_CLASS}
      aria-labelledby={id}
      id={`w-${workshop.id}`}
    >
      <WorkshopDetails workshop={workshop} variant="card" titleId={id} />
    </article>
  );
}

export function WorkshopCardSkeleton() {
  return (
    <article
      className={CARD_CLASS}
      data-testid="workshop-card-skeleton"
      aria-busy
    >
      <WorkshopDetailsSkeleton />
    </article>
  );
}
