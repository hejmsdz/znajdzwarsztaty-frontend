import { ListIcon, MapPinIcon, MusicIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuItem } from './menu-item';

export function TopBar() {
  return (
    <header className="flex justify-between h-20 shrink-0 items-center gap-2 border-b bg-background px-4">
      <div>
        <div className="flex items-center gap-1 md:hidden">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-1 h-4" />
        </div>
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
          <MenuItem to="/" icon={MapPinIcon} label="Mapa" />
          <MenuItem to="/list" icon={ListIcon} label="Lista" />
        </ul>
      </nav>
    </header>
  );
}
