import { Button } from '#/components/ui/button';
import { cn } from '#/lib/utils';

type WorkshopsErrorStateProps = {
  onRetry: () => void;
  className?: string;
};

export function WorkshopsErrorState({
  onRetry,
  className,
}: WorkshopsErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 text-sm', className)}>
      <p className="text-muted-foreground">
        Nie udało się załadować warsztatów.
      </p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Spróbuj ponownie
      </Button>
    </div>
  );
}
