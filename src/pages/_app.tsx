'use context';
import {
  useGlobalContext,
  GlobalProvider,
} from '@/features/common/globalContext';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Head from 'next/head';
import { ModalMessage } from '@/shared/ui/Modals';

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
  const { theme, isModalMessageOpen, setIsModalMessageOpen } =
    useGlobalContext();

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon/favicon.ico" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest"></link>
        <title>IO</title>
      </Head>
      <div className="wrapper" data-theme={theme}>
        {children}
        <ModalMessage
          {...isModalMessageOpen}
          isModalOpen={isModalMessageOpen.open}
          setIsModalOpen={setIsModalMessageOpen}
        ></ModalMessage>
      </div>
    </>
  );
}
