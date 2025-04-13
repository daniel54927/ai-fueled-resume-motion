
import { createContext, useContext, useEffect, useState } from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  disableToggle?: boolean;
};

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  disableToggle?: boolean;
};

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({ 
  children, 
  defaultTheme = 'system',
  disableToggle = false 
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (disableToggle) return 'dark';
    const storedTheme = localStorage.getItem('theme') as Theme;
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system' && !disableToggle) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(disableToggle ? 'dark' : theme);
    
    if (!disableToggle) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, disableToggle]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, disableToggle }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
