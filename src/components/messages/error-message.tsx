import { BaseMessage } from '#/components/messages/base-message';
import type { BaseMessageProps } from '#/components/messages/base-message';
import { CircleAlertIcon } from 'lucide-react';

type ErrorMessageProps = Pick<BaseMessageProps, 'title' | 'children'>;

export function ErrorMessage({ title, children }: ErrorMessageProps) {
  return (
    <BaseMessage
      icon={<CircleAlertIcon className="size-6" />}
      iconClassName="bg-destructive/10 text-destructive"
      title={title}
    >
      {children}
    </BaseMessage>
  );
}
