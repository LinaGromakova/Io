'use context';
import {
  ThemeContext,
  ThemeProvider,
} from '@/widgets/Header/layouts/header-sidebar-layout';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { useContext } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </ThemeProvider>
  );
}
function Wrapper({ children }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="wrapper" data-theme={theme?.toLowerCase()}>
      {children}
    </div>
  );
}
