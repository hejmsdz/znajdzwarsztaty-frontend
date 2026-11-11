import type { LucideIcon } from 'lucide-react';
import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { cn } from 'cn';
import { DropdownMenuItem } from '#/components/ui/dropdown-menu';

type DropdownMenuLinkProps = {
  className?: string;
  icon: LucideIcon;
  label: string;
} & Pick<LinkComponentProps, 'to' | 'search'>;

export function DropdownMenuLink({
  className,
  to,
  icon: Icon,
  label,
  search,
}: DropdownMenuLinkProps) {
  return (
    <DropdownMenuItem
      render={
        <Link
          to={to}
          search={search}
          activeProps={{ 'aria-current': 'page' }}
        />
      }
      className={cn(
        'aria-[current]:text-primary aria-[current]:font-bold',
        className,
      )}
    >
      <Icon />
      {label}
    </DropdownMenuItem>
  );
}
