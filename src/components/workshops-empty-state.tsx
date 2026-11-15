import { Button } from '#/components/ui/button';
import { emptySearch } from '#/filters/types';
import { useWorkshopsSearchParams } from '#/hooks/use-workshops-search-params';
import { cn } from '#/lib/utils';

export function WorkshopsEmptyState({ className }: { className?: string }) {
  const [, onSearchChange] = useWorkshopsSearchParams();

  return (
    <div className={cn('flex flex-col items-center gap-3 text-sm', className)}>
      <p className="text-muted-foreground">
        Brak warsztatów spełniających wybrane filtry.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSearchChange(emptySearch)}
      >
        Wyczyść filtry
      </Button>
    </div>
  );
}
