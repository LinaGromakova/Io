'use client';
import { Header } from '@/widgets/Header/header';
import { Chat } from '@/widgets/Chat/chat';
import { SidebarContactsLayout } from '@/widgets/SidebarContacts/sidebar-contacts-layout';

// import { useState } from 'react';

export function ChatViewLaout() {
  // const [open, isOpen] = useState(true);
  return (
    <div className="flex overflow-y-hidden">
      <SidebarContactsLayout className="w-6/12 max-md:hidden"></SidebarContactsLayout>
      <div className="w-full max-h-screen">
        <Header type="HEADER_MAIN"></Header>
        <Chat></Chat>
      </div>
    </div>
  );
}
