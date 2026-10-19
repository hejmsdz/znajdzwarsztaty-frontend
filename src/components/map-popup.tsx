import { BanknoteIcon, MapPinIcon } from 'lucide-react';
import { Popup } from 'react-leaflet';
import { cn } from 'cn';
import type { Workshop } from '#/api/workshops/workshops';
import { LEVELS, WORKSHOP_TYPES } from '#/filters/types';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ContactLink } from './contact-link';
import { InstructorInfo } from './instructor-info';

const DATE_FORMATTER = new Intl.DateTimeFormat('pl-PL', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function parseWorkshopDate(value: string): Date | null {
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

function formatWorkshopCost(amount: number, currency: string): string {
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

export function MapPopup({ workshop }: { workshop: Workshop }) {
  const dates = formatWorkshopDateRange(workshop.startTime, workshop.endTime);
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

  return (
    <Popup
      className="workshop-popup"
      offset={[0, -22]}
      minWidth={320}
      maxWidth={360}
    >
      <div className="flex flex-col gap-3 p-4 text-sm">
        <div className="flex flex-col gap-1">
          <p className="text-primary text-xs font-bold uppercase">{dates}</p>
          <h3 className="font-heading text-base leading-snug font-semibold pe-5">
            {workshop.title}
          </h3>
          <p className="flex items-center gap-1.5 text-muted-foreground">
            <MapPinIcon aria-hidden className="size-3.5 shrink-0" />
            <span>
              {workshop.locality} &middot; {workshop.venue}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-1">
          {typeLabels.map((label) => (
            <Badge key={label} variant="secondary">
              {label}
            </Badge>
          ))}
          {levelLabels.map((label) => (
            <Badge key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-2">
            <BanknoteIcon
              aria-hidden
              className="size-3.5 shrink-0 text-muted-foreground"
            />
            <span className="font-medium">{cost}</span>
          </p>

          {workshop.contactUrl && <ContactLink url={workshop.contactUrl} />}

          {instructors.length > 0 && (
            <ul className="flex items-start gap-2 flex-col">
              {instructors.map((instructor) => (
                <li key={instructor.id}>
                  <InstructorInfo instructor={instructor} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasActions && (
          <>
            <Separator />
            <div className="flex gap-2">
              {workshop.registerUrl && (
                <a
                  href={workshop.registerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'flex-1',
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
                  className={cn(
                    buttonVariants({
                      variant: workshop.registerUrl ? 'outline' : 'default',
                      size: 'sm',
                    }),
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Więcej informacji
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </Popup>
  );
}
