import type { ReactNode } from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

type FilterProps = {
  label: string;
  children: ReactNode;
  contentClassName?: string;
};

export function Filter({ label, children, contentClassName }: FilterProps) {
  return (
    <SidebarGroup className="pt-0">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent className={contentClassName}>
        {children}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
