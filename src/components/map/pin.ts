import L from 'leaflet';
import { escapeHtml } from '#/lib/escape-html';

const PIN_HTML = (label: string) =>
  `<span role="img" aria-label="${label}" class="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-primary/20"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m19 6-5.2-3.9a.5.5 0 0 0-.8.4V18"/><circle cx="9" cy="18" r="4"/></svg></span>`;

export const pinIcon = (title: string) =>
  L.divIcon({
    className: '',
    html: PIN_HTML(escapeHtml(title)),
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
