'use context';
import {
  GlobalContext,
  GlobalProvider,
} from '@/widgets/Header/layouts/header-sidebar-layout';
import '../app/globals.css';
import type { AppProps } from 'next/app';
import { useContext } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </GlobalProvider>
  );
}
function Wrapper({ children }) {
  const { theme } = useContext(GlobalContext);
  return (
    <div className="wrapper" data-theme={theme}>
      {children}
    </div>
  );
}
