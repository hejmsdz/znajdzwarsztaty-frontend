import {
  WorkshopDetails,
  WorkshopDetailsSkeleton,
} from '@/components/workshop-details';
import type { Workshop } from '#/api/workshops/workshops';

const CARD_CLASS = 'rounded-2xl border bg-card shadow-sm';

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className={CARD_CLASS}>
      <WorkshopDetails workshop={workshop} variant="card" />
    </article>
  );
}

export function WorkshopCardSkeleton() {
  return (
    <div className={CARD_CLASS} data-testid="workshop-card-skeleton">
      <WorkshopDetailsSkeleton />
    </div>
  );
}
