import type { QueryClient } from '@tanstack/react-query';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';

import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';

import { NotFound } from '#/components/not-found';
import { ThemeProvider } from '#/components/theme-provider';

import stylesHref from '../styles.css?url';
import themeScript from '#/set-initial-theme?raw';

const apiUrl = import.meta.env.VITE_API_URL;

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      {
        title: 'Znajdź Warsztaty | warsztaty muzyki liturgicznej blisko Ciebie',
      },
      {
        name: 'description',
        content:
          'Szukasz warsztatów muzyki liturgicznej? Znajdź terminy aktualnych wydarzeń w całej Polsce lub zapisz się na powiadomienia o warsztatach w Twojej okolicy.',
      },
      { name: 'theme-color', content: '#007a55' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      {
        rel: 'icon',
        href: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        rel: 'icon',
        href: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: stylesHref },
      ...(apiUrl ? [{ rel: 'preconnect', href: apiUrl }] : []),
    ],
    scripts: [
      // Applies the persisted theme before first paint to avoid a flash.
      { children: themeScript },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <ThemeProvider>
      {/* The inline theme script mutates the `class` attribute before
          hydration, so React must not compare attributes on this element. */}
      <html lang="pl" suppressHydrationWarning>
        <head>
          <HeadContent />
        </head>
        <body>
          <Outlet />
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
              {
                name: 'TanStack Query',
                render: <ReactQueryDevtoolsPanel />,
              },
            ]}
          />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}
