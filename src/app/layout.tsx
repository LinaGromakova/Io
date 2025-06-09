import type { Metadata } from 'next';
import { LayoutButtonCircle } from '@/shared/Button-circle/layout-button-circle';
import './globals.css';

export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <LayoutButtonCircle type='MESSAGE'></LayoutButtonCircle>
      </body>
    </html>
  );
}
