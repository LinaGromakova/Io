import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/features/common/contexts/themeContext';
import { AuthProvider } from '@/features/auth/context/authContext';
import { ModalProvider } from '@/features/common/contexts/modalContext';
import { UiProvider } from '@/features/common/contexts/uiContext';
import { ChatProvider } from '@/features/chat/context/chatContext';
import { SocketProvider } from '@/features/socket/context/socketContext';
import { ActionProvider } from '@/features/common/contexts/actionContext';
import { SearchProvider } from '@/features/common/contexts/searchContext';

export const metadata: Metadata = {
  title: 'IO',
  description:
    'Io - самый активный спутник в солнечной системе. Как и наш мессенджер: всегда на связи, всегда в движении',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
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
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider>
          <UiProvider>
            <SocketProvider>
              <AuthProvider>
                <ChatProvider>
                  <ActionProvider>
                    <SearchProvider>
                      <ModalProvider>{children}</ModalProvider>
                    </SearchProvider>
                  </ActionProvider>
                </ChatProvider>
              </AuthProvider>
            </SocketProvider>
          </UiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
