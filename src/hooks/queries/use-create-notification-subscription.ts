import { createNotificationSubscription } from '#/api/notification-subscriptions';
import { useMutation } from '@tanstack/react-query';

export const useCreateNotificationSubscription = () =>
  useMutation({
    mutationFn: createNotificationSubscription,
  });
