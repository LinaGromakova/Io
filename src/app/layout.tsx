'use client';
// import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/widgets/Header/header';
import { Chat } from '@/widgets/Chat/chat';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';
import { FormAuth } from '@/entities/FormAuth/form-auth-layout';
import { clsx } from 'clsx';
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Io',
//   description: 'lroem',
// };
// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>
const login = true;
export default function RootLayout() {
  const [open, isOpen] = useState(true);
  return (
    <html lang="en">
      <body className={clsx(login && 'overflow-y-hidden')}>
        {(!login && <FormAuth></FormAuth>) || (
          <div className="flex overflow-y-hidden">
            {!open && <SidebarContactsLayout></SidebarContactsLayout>}

            {open && (
              <div className="w-full">
                <Header type="HEADER_MAIN"></Header>
                <Chat></Chat>
              </div>
            )}
          </div>
        )}
      </body>
    </html>
  );
}
