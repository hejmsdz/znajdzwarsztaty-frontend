import { cn } from 'cn';
import { MessageCircleQuestionIcon, MailIcon, PhoneIcon } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { buttonVariants } from './ui/button';

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

export function ContactLink({ url }: ContactLinkProps) {
  const kind = getContactKind(url);
  const Icon = CONTACT_ICONS[kind];

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Kontakt"
      className={cn(
        buttonVariants({
          variant: 'outline',
          size: 'icon-sm',
        }),
      )}
    >
      <Icon aria-hidden />
    </a>
  );
}
