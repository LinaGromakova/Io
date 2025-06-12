import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};

import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>

export default function RootLayout() {
  return (
    <html lang='en'>
      <body className=' bg-slate-900'>
        <SidebarContactsLayout></SidebarContactsLayout>
      </body>
    </html>
  );
}
