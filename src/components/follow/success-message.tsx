import { CircleCheckIcon } from 'lucide-react';
import type { ReactNode } from 'react';

type SuccessMessageProps = {
  title: string;
  children: ReactNode;
};

export function SuccessMessage({ title, children }: SuccessMessageProps) {
  return (
    <section className="rounded-4xl border bg-card p-8 text-center shadow-sm">
      <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <CircleCheckIcon className="size-6" />
      </div>
      <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">{children}</p>
    </section>
  );
}
