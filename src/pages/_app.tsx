'use context';
import {
  useGlobalContext,
  GlobalProvider,
} from '@/features/common/globalContext';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ModalMessageLayout } from '@/shared/Modal-message/modal-message-layout';


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
  const { theme, isModalMessageOpen } = useGlobalContext();

  return (
    <div className="wrapper" data-theme={theme}>
      {children}
      <ModalMessageLayout {...isModalMessageOpen}></ModalMessageLayout>
    </div>
  );
}
