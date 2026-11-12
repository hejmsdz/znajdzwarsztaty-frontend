import {
  WalletIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MusicIcon,
  GaugeIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from 'cn';
import type { Workshop } from '#/api/workshops/workshops';
import { LEVELS, WORKSHOP_TYPES } from '#/filters/types';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { ContactLink } from './contact-link';
import { InstructorInfo } from './instructor-info';

const DATE_FORMATTER = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('pl-PL', {
  weekday: 'long',
});

export function parseWorkshopDate(value: string): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value.includes(' ') ? value.replace(' ', 'T') : value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatWorkshopDateRange(startTime: string, endTime: string): string {
  const start = parseWorkshopDate(startTime);
  const end = parseWorkshopDate(endTime) ?? start;

  if (!start) {
    return endTime ? `${startTime} – ${endTime}` : startTime;
  }

  if (!end || start.toDateString() === end.toDateString()) {
    return DATE_FORMATTER.format(start);
  }

  const isSameMonth =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth();
  if (isSameMonth) {
    return `${start.getDate()}-${DATE_FORMATTER.format(end)}`;
  }

  return `${DATE_FORMATTER.format(start)} – ${DATE_FORMATTER.format(end)}`;
}

function formatWorkshopWeekdays(
  startTime: string,
  endTime: string,
): string | null {
  const start = parseWorkshopDate(startTime);
  if (!start) {
    return null;
  }

  const end = parseWorkshopDate(endTime) ?? start;
  const startDay = WEEKDAY_FORMATTER.format(start);
  const endDay = WEEKDAY_FORMATTER.format(end);

  return startDay === endDay ? startDay : `${startDay} – ${endDay}`;
}

function formatWorkshopCost(amount: number, currency: string): string {
  if (amount < 0) {
    return '';
  }

  if (amount === 0) {
    return 'Bezpłatne';
  }

  try {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

function InfoRow({
  icon: Icon,
  label,
  main,
  secondary,
}: {
  icon: LucideIcon;
  label?: string;
  main: string;
  secondary?: string | null;
}) {
  return (
    <div className="flex gap-2.5">
      <Icon
        aria-hidden
        className="mt-0.5 size-4 shrink-0 text-muted-foreground"
      />
      <span className="sr-only">{label}</span>
      <div className="flex flex-col gap-0.5">
        <span className="leading-tight font-medium">{main}</span>
        {secondary ? (
          <span className="text-muted-foreground text-xs leading-tight">
            {secondary}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function WorkshopDetailsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3 p-4 text-sm', className)} aria-busy>
      <div className="flex gap-1">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-7 w-3/4" />
      <div className="flex flex-col gap-2.5">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-9 w-1/2" />
      </div>
    </div>
  );
}

export function WorkshopDetails({
  workshop,
  variant = 'popup',
  className,
  titleId,
}: {
  workshop: Workshop;
  variant?: 'popup' | 'card';
  className?: string;
  titleId?: string;
}) {
  const isCard = variant === 'card';
  const dates = formatWorkshopDateRange(workshop.startTime, workshop.endTime);
  const weekdays = formatWorkshopWeekdays(workshop.startTime, workshop.endTime);
  const cost = formatWorkshopCost(workshop.costAmount, workshop.costCurrency);
  const instructors = workshop.expand?.instructors?.filter(Boolean) ?? [];
  const typeLabels = workshop.type.map(
    (value) =>
      WORKSHOP_TYPES.find((entry) => entry.value === value)?.label ?? value,
  );
  const levelLabels = workshop.level.map(
    (value) => LEVELS.find((entry) => entry.value === value)?.label ?? value,
  );
  const hasActions = Boolean(
    workshop.registerUrl || workshop.infoUrl || workshop.contactUrl,
  );

  const badgesBlock = (
    <div className="flex flex-wrap gap-1">
      <span className="sr-only">Kategorie:</span>
      {typeLabels.map((label) => (
        <Badge key={label} variant="secondary">
          <MusicIcon />
          {label}
        </Badge>
      ))}
      {levelLabels.map((label) => (
        <Badge key={label} variant="secondary">
          <GaugeIcon aria-label="Poziom" />
          {label}
        </Badge>
      ))}
    </div>
  );

  const headingLevel = isCard ? 3 : 2;
  const subHeadingLevel = isCard ? 4 : 3;

  const HeadingTag = `h${headingLevel}` as const;
  const SubHeadingTag = `h${subHeadingLevel}` as const;

  const titleBlock = (
    <HeadingTag
      id={titleId}
      className="font-heading text-lg leading-tight font-semibold"
    >
      {workshop.title}
    </HeadingTag>
  );

  const infoBlock = (
    <div className="flex flex-col gap-2.5">
      <InfoRow
        icon={CalendarDaysIcon}
        label="Termin"
        main={dates}
        secondary={weekdays}
      />
      <InfoRow
        icon={MapPinIcon}
        label="Miejsce"
        main={workshop.locality}
        secondary={workshop.venue}
      />
      {workshop.costAmount >= 0 && (
        <InfoRow icon={WalletIcon} label="Cena" main={cost} />
      )}
    </div>
  );

  const allFemaleInstructors = instructors.every((instructor) =>
    instructor.name
      .split(' ')
      .find((word) => word[0] === word[0].toLocaleUpperCase())
      ?.endsWith('a'),
  );
  const instructorsBlock = (
    <section className="flex flex-col gap-2">
      <SubHeadingTag className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {allFemaleInstructors
          ? instructors.length == 1
            ? 'Prowadząca'
            : 'Prowadzące'
          : 'Prowadzący'}
      </SubHeadingTag>
      <ul className="flex flex-col gap-2">
        {instructors.map((instructor) => (
          <li key={instructor.id}>
            <InstructorInfo instructor={instructor} />
          </li>
        ))}
      </ul>
    </section>
  );

  const actionsRow = (
    <div className="flex gap-2">
      {workshop.registerUrl && (
        <a
          href={workshop.registerUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            !isCard && 'flex-1',
            buttonVariants({
              variant: 'default',
              size: 'sm',
            }),
            'text-white!',
          )}
        >
          Zapisz się
        </a>
      )}
      {workshop.infoUrl && (
        <a
          href={workshop.infoUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({
              variant: 'outline',
              size: 'sm',
            }),
          )}
        >
          Więcej informacji
        </a>
      )}
      {workshop.contactUrl && <ContactLink url={workshop.contactUrl} />}
    </div>
  );

  return (
    <div className={cn('flex flex-col gap-3 p-4 text-sm', className)}>
      {badgesBlock}
      {titleBlock}
      {infoBlock}
      {instructors.length > 0 && (
        <>
          <Separator />
          {instructorsBlock}
        </>
      )}
      {hasActions && (
        <>
          <Separator />
          <div className="flex flex-col gap-2">
            {(workshop.registerUrl ||
              workshop.infoUrl ||
              workshop.contactUrl) &&
              actionsRow}
          </div>
        </>
      )}
    </div>
  );
}
