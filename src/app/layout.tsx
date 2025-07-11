'use client';
// import type { Metadata } from 'next';

import './globals.css';
import Link from 'next/link';

// export const metadata: Metadata = {
//   title: 'Io',
//   description: 'lroem',
// };
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <Link href="/"></Link>
        <Link href="login"></Link>
      </body>
    </html>
  );
}
// style={clsx(router.query)}
