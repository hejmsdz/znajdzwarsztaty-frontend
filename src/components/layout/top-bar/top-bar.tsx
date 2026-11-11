import { BellIcon, ListIcon, MapPinIcon, MusicIcon } from 'lucide-react';
import type { LinkComponentProps } from '@tanstack/react-router';
import { MenuItem } from './menu-item';
import { workshopsSearchKeys } from '#/filters/types';
import { pick } from '#/lib/pick';

const workshopsSearch: NonNullable<LinkComponentProps['search']> = (params) =>
  pick(params, workshopsSearchKeys);

export function TopBar() {
  return (
    <header className="flex justify-between h-20 shrink-0 items-center gap-2 border-b bg-background px-4">
      <div>
        <a href="/" className="flex items-center gap-2 rounded-lg p-1">
          <div className="flex size-7 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <MusicIcon className="size-4" />
          </div>
          <span className="font-heading tracking-tight">
            Znajdź <span className="font-semibold text-primary">warsztaty</span>
          </span>
        </a>
      </div>

      <nav className="h-full flex text-sm">
        <ul className="flex gap-4">
          <MenuItem
            to="/"
            icon={MapPinIcon}
            label="Mapa"
            search={workshopsSearch}
          />
          <MenuItem
            to="/list"
            icon={ListIcon}
            label="Lista"
            search={workshopsSearch}
          />
          <MenuItem to="/follow" icon={BellIcon} label="Bądź na bieżąco" />
        </ul>
      </nav>
    </header>
  );
}
