import type { PropsWithChildren } from 'react';
import { Button } from '#/components/ui/button';
import { XIcon } from 'lucide-react';

type FilterBadgeProps = PropsWithChildren & {
  onRemove: () => void;
};

export const FilterBadge = ({ children, onRemove }: FilterBadgeProps) => (
  <Button
    size="xs"
    variant="secondary"
    onClick={onRemove}
    title="Kliknij, aby usunąć filtr"
  >
    {children}
    <XIcon data-icon="inline-end" />
  </Button>
);
