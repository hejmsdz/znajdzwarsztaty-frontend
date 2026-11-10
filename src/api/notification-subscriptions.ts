import { apiFetch } from './api';

const COLLECTION_PATH = '/api/collections/notificationSubscriptions/records';

export interface NotificationSubscriptionPayload {
  email: string;
  lat: number;
  lon: number;
  maxDistanceKm: number;
  antispamToken: string;
}

export async function createNotificationSubscription(
  payload: NotificationSubscriptionPayload,
): Promise<void> {
  const { email, lat, lon, maxDistanceKm, antispamToken } = payload;

  await apiFetch(COLLECTION_PATH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Antispam-Token': antispamToken,
    },
    body: JSON.stringify({
      center: { lon, lat },
      maxDistanceKm,
      email,
    }),
  });
}
