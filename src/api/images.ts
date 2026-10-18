import { API_URL } from './api';

export function getImageUrl(
  collection: string,
  recordId: string,
  fileName: string,
) {
  return new URL(`api/files/${collection}/${recordId}/${fileName}`, API_URL)
    .href;
}
