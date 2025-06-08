import type { Metadata } from 'next';

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
      <body>Hello World!</body>
    </html>
  );
}
