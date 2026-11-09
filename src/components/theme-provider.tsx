import { useMediaQuery } from '#/hooks/use-media-query';
import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined,
);

const storageKey = 'uiTheme';
const defaultTheme: Theme = 'system';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);

    return storedTheme === 'dark' ||
      storedTheme === 'light' ||
      storedTheme === 'system'
      ? storedTheme
      : defaultTheme;
  });

  const systemTheme = useMediaQuery('(prefers-color-scheme: dark)')
    ? 'dark'
    : 'light';
  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const rootClasses = window.document.documentElement.classList;
    rootClasses.remove('light', 'dark');
    rootClasses.add(resolvedTheme);
  }, [resolvedTheme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
