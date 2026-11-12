import { useId } from 'react';
import type { ReactNode } from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

type FilterProps = {
  label: ReactNode;
  children: ReactNode;
  contentClassName?: string;
};

export function Filter({ label, children, contentClassName }: FilterProps) {
  const id = useId();

  return (
    <SidebarGroup className="pt-0">
      <fieldset aria-labelledby={id}>
        <SidebarGroupLabel>
          <legend id={id}>{label}</legend>
        </SidebarGroupLabel>
        <SidebarGroupContent className={contentClassName}>
          {children}
        </SidebarGroupContent>
      </fieldset>
    </SidebarGroup>
  );
}
