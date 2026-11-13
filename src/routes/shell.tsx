import { createFileRoute } from '@tanstack/react-router';

// Hosts the SPA shell render configured via `spa.maskPath` in vite.config.ts.
// During that render every non-root route is replaced by its pending fallback
// (nothing), so this component stays empty on purpose. The output is written
// to `/_shell.html`, which static hosting serves as a fallback for routes that
// are not prerendered (e.g. routes with path params).
export const Route = createFileRoute('/shell')({
  component: ShellRoute,
});

function ShellRoute() {
  return null;
}
