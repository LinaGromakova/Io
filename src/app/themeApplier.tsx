'use client';
import { useLayoutEffect } from 'react';
import { useTheme } from '@/features/theme/hooks/useTheme';

export function ThemeApplier() {
  const { theme } = useTheme();

  useLayoutEffect(() => {
    console.log(theme);
    document.documentElement.className = `theme-${theme}`;
  }, [theme]);

  return null;
}
