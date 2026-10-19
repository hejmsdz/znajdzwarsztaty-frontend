import { MessageCircleQuestionIcon, MailIcon, PhoneIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ContactLinkProps = {
  url: string;
};

type ContactKind = 'web' | 'email' | 'phone';

const CONTACT_ICONS: Record<ContactKind, LucideIcon> = {
  web: MessageCircleQuestionIcon,
  email: MailIcon,
  phone: PhoneIcon,
};

function getContactKind(url: string): ContactKind {
  if (/^mailto:/i.test(url)) {
    return 'email';
  }
  if (/^tel:/i.test(url)) {
    return 'phone';
  }
  return 'web';
}

function formatContactText(url: string): string {
  if (/^https?:\/\//i.test(url)) {
    return url.replace(/^https?:\/\//i, '').replace(/\/$/, '');
  }
  return url.replace(/^(mailto|tel):/i, '');
}

export function ContactLink({ url }: ContactLinkProps) {
  const kind = getContactKind(url);
  const Icon = CONTACT_ICONS[kind];

  return (
    <p className="flex items-center gap-2">
      <Icon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" />
      <a
        href={url}
        {...(kind === 'web' ? { target: '_blank', rel: 'noreferrer' } : {})}
        className="font-medium"
      >
        {formatContactText(url)}
      </a>
    </p>
  );
}
