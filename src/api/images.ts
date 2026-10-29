import { API_URL } from './api';

export function getImageUrl(
  collection: string,
  recordId: string,
  fileName: string,
  thumbSize?: string,
) {
  const url = new URL(
    `api/files/${collection}/${recordId}/${fileName}`,
    API_URL,
  );

  if (thumbSize) {
    url.searchParams.set('thumb', thumbSize);
  }

  return url.href;
}
