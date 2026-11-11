import type { LucideIcon } from 'lucide-react';
import type { LinkComponentProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

type MenuItemProps = {
  icon: LucideIcon;
  label: string;
} & Pick<LinkComponentProps, 'to' | 'search'>;

export function MenuItem({ to, icon: Icon, label, search }: MenuItemProps) {
  return (
    <li className="h-full">
      <Link
        activeProps={{ 'aria-current': 'page' }}
        className="flex h-full gap-1 justify-center items-center aria-[current]:text-primary aria-[current]:border-primary aria-[current]:font-bold border-b-2"
        to={to}
        search={search}
      >
        <Icon width={16} height={16} className="mr-1" /> {label}
      </Link>
    </li>
  );
}
