'use client';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeApplier } from './themeApplier';
import { AuthInitializer } from './authInitializer';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <ThemeApplier />
      <AuthInitializer />
      {children}
    </JotaiProvider>
  );
}
