import {
  BellIcon,
  InfoIcon,
  LayoutListIcon,
  MapPinIcon,
  MenuIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type { LinkComponentProps } from '@tanstack/react-router';
import { DropdownMenuLink } from './dropdown-menu-link';
import { MenuLink } from './menu-link';
import logo from '#/assets/logo.svg';
import { Button } from '#/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu';
import { workshopsSearchKeys } from '#/filters/types';
import { pick } from '#/lib/pick';

const workshopsSearch: NonNullable<LinkComponentProps['search']> = (params) =>
  pick(params, workshopsSearchKeys);

type SecondaryLink = {
  to: LinkComponentProps['to'];
  icon: LucideIcon;
  label: string;
};

const secondaryLinks: SecondaryLink[] = [
  {
    to: '/follow',
    icon: BellIcon,
    label: 'Bądź na bieżąco',
  },
  {
    to: '/about',
    icon: InfoIcon,
    label: 'O stronie',
  },
];

export function TopBar() {
  return (
    <header className="flex justify-between h-20 shrink-0 items-center gap-2 border-b bg-background px-4">
      <div>
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="logo"
            width="40"
            height="40"
            className="size-8 sm:size-10"
          />
          <span className="flex flex-col text-base sm:text-lg">
            <span className="font-heading tracking-tight">
              Znajdź{' '}
              <span className="font-semibold text-primary">warsztaty</span>
            </span>
            <small className="font-heading text-xs text-muted-foreground hidden sm:block">
              Warsztaty muzyki liturgicznej blisko Ciebie
            </small>
          </span>
        </Link>
      </div>

      <nav className="h-full flex text-sm">
        <ul className="flex gap-1">
          <MenuLink
            to="/"
            icon={MapPinIcon}
            label="Mapa"
            search={workshopsSearch}
          />
          <MenuLink
            to="/list"
            icon={LayoutListIcon}
            label="Lista"
            search={workshopsSearch}
          />
          {secondaryLinks.map((link) => (
            <MenuLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              label={link.label}
              className="hidden md:flex"
            />
          ))}
          <li className="flex items-center md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" aria-label="Menu">
                    <MenuIcon className="size-5" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {secondaryLinks.map((link) => (
                  <DropdownMenuLink
                    key={link.to}
                    to={link.to}
                    icon={link.icon}
                    label={link.label}
                  />
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </nav>
    </header>
  );
}
