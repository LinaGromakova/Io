'use context';
import {
  useGlobalContext,
  GlobalProvider,
} from '@/features/common/globalContext';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </GlobalProvider>
  );
}
function Wrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useGlobalContext();
  return (
    <div className="wrapper" data-theme={theme}>
      {children}
    </div>
  );
}
