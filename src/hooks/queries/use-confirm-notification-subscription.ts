import { confirmNotificationSubscription } from '#/api/notification-subscriptions';
import { useMutation } from '@tanstack/react-query';

export const useConfirmNotificationSubscription = () =>
  useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      confirmNotificationSubscription(id, token),
  });
