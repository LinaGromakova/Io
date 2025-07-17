'use client';
import {
  ThemeContext,
  ThemeProvider,
} from '@/widgets/Header/layouts/header-sidebar-layout';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { useContext } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LayoutBase>
        <Component {...pageProps} />
      </LayoutBase>
    </ThemeProvider>
  );
}
function LayoutBase({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <html lang="en" data-theme={theme?.toLowerCase()}>
      <body>
        <Link href="/"></Link>
        <Link href="login"></Link>
        {children}
      </body>
    </html>
  );
}
