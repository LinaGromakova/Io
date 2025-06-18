import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header/header';
import { Chat } from '@/widgets/Chat/chat';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { FormAuth } from '@/entities/FormAuth/form-auth-layout';
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
      <body className='  flex overflow-y-hidden'>
        <FormAuth></FormAuth>
        {/* <SidebarContactsLayout></SidebarContactsLayout>
        <div className='w-full'>
          <Header type='HEADER_MAIN'></Header>
          <Chat></Chat>
        </div> */}
      </body>
    </html>
  );
}
