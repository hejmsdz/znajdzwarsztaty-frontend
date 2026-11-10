import { BaseMessage } from '#/components/messages/base-message';
import type { BaseMessageProps } from '#/components/messages/base-message';
import { CircleCheckIcon } from 'lucide-react';

type SuccessMessageProps = Pick<BaseMessageProps, 'title' | 'children'>;

export function SuccessMessage({ title, children }: SuccessMessageProps) {
  return (
    <BaseMessage
      icon={<CircleCheckIcon className="size-6" />}
      iconClassName="bg-primary/10 text-primary"
      title={title}
    >
      {children}
    </BaseMessage>
  );
}
