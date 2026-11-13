import type { ComponentProps } from 'react';
import { SidebarInset } from '#/components/ui/sidebar';

export const MAIN_CONTENT_ID = 'main';

type MainProps = ComponentProps<'main'>;

export function Main({ className, ...props }: MainProps) {
  return (
    <main id={MAIN_CONTENT_ID} tabIndex={-1} className={className} {...props} />
  );
}

type MainInsetProps = ComponentProps<typeof SidebarInset>;

export function MainInset({ className, ...props }: MainInsetProps) {
  return (
    <SidebarInset
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      className={className}
      {...props}
    />
  );
}
