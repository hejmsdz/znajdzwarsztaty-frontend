import type { LucideIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type MenuItemProps = {
  to: string;
  icon: LucideIcon;
  label: string;
  current?: boolean;
};

export function MenuItem({ to, icon: Icon, label }: MenuItemProps) {
  return (
    <li className="h-full">
      <Link
        activeProps={{ 'aria-current': 'page' }}
        className="flex h-full gap-1 justify-center items-center aria-[current]:text-primary aria-[current]:border-primary aria-[current]:font-bold border-b-2"
        to={to}
        search
      >
        <Icon width={16} height={16} className="mr-1" /> {label}
      </Link>
    </li>
  );
}
