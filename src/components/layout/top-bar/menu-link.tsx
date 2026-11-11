import type { LucideIcon } from 'lucide-react';
import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { buttonVariants } from '#/components/ui/button';

type MenuLinkProps = {
  className?: string;
  icon: LucideIcon;
  label: string;
} & Pick<LinkComponentProps, 'to' | 'search'>;

export function MenuLink({
  className,
  to,
  icon: Icon,
  label,
  search,
}: MenuLinkProps) {
  return (
    <li className={cn('flex items-center', className)}>
      <Link
        activeProps={{ 'aria-current': 'page' }}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'aria-[current]:bg-muted aria-[current]:text-primary aria-[current]:font-bold dark:aria-[current]:bg-muted/50',
        )}
        to={to}
        search={search}
      >
        <Icon className="size-5 sm:size-4" />
        <span className="max-sm:sr-only">{label}</span>
      </Link>
    </li>
  );
}
