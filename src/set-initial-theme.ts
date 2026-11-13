const theme = localStorage.getItem('uiTheme') || 'system';
const dark =
  theme === 'dark' ||
  (theme === 'system' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);
const rootClasses = document.documentElement.classList;
rootClasses.toggle('dark', dark);
rootClasses.toggle('light', !dark);
