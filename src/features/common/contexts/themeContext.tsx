'use client';
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../../../shared/lib/hooks/useLocalStorage';

interface ThemeContextInterface {
  theme: 'light' | 'dark';
  changeTheme: () => void;
}
export const ThemeContext = React.createContext<ThemeContextInterface>(null!);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { preferTheme, updatePreferTheme } = useLocalStorage();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  function changeTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updatePreferTheme(newTheme);
  }

  useEffect(() => {
    if (preferTheme) {
      setTheme(preferTheme);
    }
  }, [preferTheme]);

  const value = { theme, changeTheme };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
export function useThemeContext(): ThemeContextInterface {
  return React.useContext(ThemeContext);
}
