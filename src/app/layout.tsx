import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header/header';
import { Chat } from '@/widgets/Chat/chat';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';

export const metadata: Metadata = {
  title: 'Io',
  description: 'lroem',
};
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>

export default function RootLayout() {
  return (
    <html lang='en'>
      <body className=' bg-slate-900 flex overflow-y-hidden'>
        <SidebarContactsLayout></SidebarContactsLayout>

        <div className='w-full'>
          <Header type='HEADER_MAIN'></Header>
          <Chat></Chat>
        </div>
      </body>
    </html>
  );
}
