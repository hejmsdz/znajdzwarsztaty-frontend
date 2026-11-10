import { BaseMessage } from '#/components/messages/base-message';
import type { BaseMessageProps } from '#/components/messages/base-message';
import { LoaderCircleIcon } from 'lucide-react';

type LoadingMessageProps = Pick<BaseMessageProps, 'title' | 'children'>;

export function LoadingMessage({ title, children }: LoadingMessageProps) {
  return (
    <BaseMessage
      icon={<LoaderCircleIcon className="size-6 animate-spin" />}
      iconClassName="bg-primary/10 text-primary"
      title={title}
    >
      {children}
    </BaseMessage>
  );
}
