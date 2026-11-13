/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { devtools } from '@tanstack/devtools-vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { citiesJson } from './vite/cities-json.ts';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  server: {
    port: 3000,
  },
  plugins: [
    citiesJson(),
    devtools(),
    tailwindcss(),
    // Static generation: every route without path params is prerendered to
    // static HTML files, so no server runtime is needed in production. The
    // SPA shell (`/_shell.html`) is rendered at the `maskPath` route below and
    // served by the hosting provider as a fallback for client-only routes
    // (e.g. routes with path params). It points at a dedicated empty route
    // (src/routes/shell.tsx) so that the real home page at `/` can be
    // prerendered with content instead of being taken over by the shell.
    tanstackStart({
      spa: {
        enabled: true,
        maskPath: '/shell',
      },
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
});

export default config;
