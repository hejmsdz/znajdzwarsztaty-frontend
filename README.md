# Znajdź Warsztaty — frontend

Frontend of [znajdzwarsztaty.pl](https://znajdzwarsztaty.pl) — a searchable map
and list of liturgical music workshops in Poland. Built with React, TanStack
Start (static generation mode), TanStack Router, TanStack Query, Tailwind CSS
v4 and Leaflet.

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

```bash
npm run build
```

The build prerenders every route that doesn't have path parameters to static
HTML files (static generation, no server runtime needed in production). The
deployable output is the `dist/client` directory.

Deployment notes (configured for Cloudflare Pages, see `public/_headers` and
`public/_redirects`):

- Static assets are served first; every route without path params (`/`,
  `/about`, `/list`, `/follow`, `/privacy`) is served as prerendered HTML. The
  home page includes the full page chrome and the gradient that approximates
  the map; the Leaflet map itself is loaded in a separate, deferred client
  chunk after hydration (see `src/routes/index.tsx`).
- Any other path falls back to `/_shell.html` (the SPA shell generated during
  the build from the placeholder route in `src/routes/shell.tsx`) and is
  rendered on the client after hydration. This covers routes with path
  parameters, e.g. `/follow/confirm/$id` links from e-mails.
- TanStack Start injects inline scripts (theme initialization, hydration
  data), so the Content-Security-Policy in `public/_headers` allows
  `'unsafe-inline'` in `script-src`.

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and
[prettier](https://prettier.io/) for linting and formatting. Eslint is
configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint).
The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with
file-based routing via TanStack Start. Routes are managed as files in
`src/routes`; the route tree is generated automatically by the TanStack Start
Vite plugin when running `npm run dev` or `npm run build` (no separate
generation step needed).

### Adding A Route

To add a new route to your application just add a new file in the
`./src/routes` directory.

Static routes (without path parameters) are prerendered automatically. Routes
that render browser-only libraries (e.g. the Leaflet map) should opt out with
`ssr: false` in their route options.

### Adding Links

To use SPA navigation you will need to import the `Link` component from
`@tanstack/react-router`:

```tsx
import { Link } from '@tanstack/react-router';
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the
[Link documentation](https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent).

### Document Head

There is no `index.html`; the full document (`<html>`, `<head>`, `<body>`) is
rendered by the root route in `src/routes/__root.tsx`. Meta tags, favicons and
global styles are configured in its `head` option via `HeadContent`.

## Data Fetching

Data comes from the external API (`VITE_API_URL`) via
[TanStack Query](https://tanstack.com/query) hooks in `src/hooks/queries`.
The QueryClient is created in `src/router.tsx` and integrated with the router
through `setupRouterSsrQueryIntegration`, which handles de/hydration of the
query cache during prerendering.

# Learn More

You can learn more about all of the offerings from TanStack in the
[TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit
[TanStack Start](https://tanstack.com/start), in particular the
[static prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
and [SPA mode](https://tanstack.com/start/latest/docs/framework/react/guide/spa-mode)
guides.
