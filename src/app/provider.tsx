'use client';
import { Provider as JotaiProvider } from 'jotai';

import { AuthInitializer } from './authInitializer';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <JotaiProvider>
      <AuthInitializer />
      {children}
    </JotaiProvider>
  );
}
