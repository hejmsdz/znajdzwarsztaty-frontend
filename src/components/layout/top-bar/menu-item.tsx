import type { LucideIcon } from 'lucide-react';

type MenuItemProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  current?: boolean;
};

export function MenuItem({
  href,
  icon: Icon,
  label,
  current = false,
}: MenuItemProps) {
  return (
    <li className="h-full">
      <a
        className="flex h-full gap-1 justify-center items-center aria-[current]:text-primary aria-[current]:border-primary aria-[current]:font-bold border-b-2"
        aria-current={current ? 'page' : undefined}
        href={href}
      >
        <Icon width={16} height={16} /> {label}
      </a>
    </li>
  );
}
