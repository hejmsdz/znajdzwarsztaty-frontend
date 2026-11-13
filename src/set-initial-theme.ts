// Runs as an inline `<head>` script before first paint. Wrapped in an IIFE so
// that re-insertion by `HeadContent` on client-side navigation doesn't
// re-declare globals.
(() => {
  const theme = localStorage.getItem('uiTheme') || 'system';
  const dark =
    theme === 'dark' ||
    (theme === 'system' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);
  const rootClasses = document.documentElement.classList;
  rootClasses.toggle('dark', dark);
  rootClasses.toggle('light', !dark);
})();
