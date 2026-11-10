import { cn } from '#/lib/utils';
import type { ReactNode } from 'react';

export type BaseMessageProps = {
  icon: ReactNode;
  iconClassName?: string;
  title: string;
  children: ReactNode;
};

export function BaseMessage({
  icon,
  iconClassName,
  title,
  children,
}: BaseMessageProps) {
  return (
    <section className="rounded-4xl border bg-card p-8 text-center shadow-sm">
      <div
        className={cn(
          'mx-auto flex size-12 items-center justify-center rounded-2xl',
          iconClassName,
        )}
      >
        {icon}
      </div>
      <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </section>
  );
}
