import { unsubscribeNotificationSubscription } from '#/api/notification-subscriptions';
import { useMutation } from '@tanstack/react-query';

export const useUnsubscribeNotificationSubscription = () =>
  useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      unsubscribeNotificationSubscription(id, token),
  });
