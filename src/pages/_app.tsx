'use context';
import {
  useGlobalContext,
  GlobalProvider,
} from '@/features/common/globalContext';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ModalMessageLayout } from '@/shared/Modal-message/modal-message-layout';
import Head from 'next/head';

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
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/icons/favicon.ico" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest"></link>
        <title>IO</title>
      </Head>
      <div className="wrapper" data-theme={theme}>
        {children}
        <ModalMessageLayout {...isModalMessageOpen}></ModalMessageLayout>
      </div>
    </>
  );
}
