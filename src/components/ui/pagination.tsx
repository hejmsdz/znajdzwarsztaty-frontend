import * as React from 'react';
import { cn } from 'cn';

import { Button } from '#/components/ui/button';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import type {
  AnyRouter,
  LinkComponentProps,
  RegisteredRouter,
} from '@tanstack/react-router';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="paginacja"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
> = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  LinkComponentProps<'a', TRouter, TFrom, TTo>;

function PaginationLink<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
>({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps<TRouter, TFrom, TTo>) {
  return (
    <Button
      variant={isActive ? 'outline' : 'ghost'}
      size={size}
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={cn(className)}
      nativeButton={false}
      render={<Link {...(props as LinkComponentProps)} />}
    />
  );
}

function PaginationPrevious<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
>({
  className,
  text = 'Previous',
  ...props
}: PaginationLinkProps<TRouter, TFrom, TTo> & {
  text?: string;
}) {
  return (
    <PaginationLink
      {...(props as PaginationLinkProps)}
      aria-label="Poprzednia strona"
      size="default"
      className={cn('pl-2!', className)}
    >
      <ChevronLeftIcon data-icon="inline-start" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext<
  TRouter extends AnyRouter = RegisteredRouter,
  TFrom extends string = string,
  TTo extends string | undefined = undefined,
>({
  className,
  text = 'Next',
  ...props
}: PaginationLinkProps<TRouter, TFrom, TTo> & {
  text?: string;
}) {
  return (
    <PaginationLink
      {...(props as PaginationLinkProps)}
      aria-label="Następna strona"
      size="default"
      className={cn('pr-2!', className)}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon data-icon="inline-end" />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "flex size-9 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
