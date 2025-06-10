import type { Metadata } from 'next';
import './globals.css';
import { InputLayoutMain } from '@/shared/Input-main/layout-input-main';

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
      <body className='m-6 bg-slate-900'>
        <InputLayoutMain purpose='FORM' />
      </body>
    </html>
  );
}
