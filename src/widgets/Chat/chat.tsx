import { ChatBody } from '@/entities/ChatBody/chat-body';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import { JSX, useContext } from 'react';
import { GlobalContext } from '../Header/layouts/header-sidebar-layout';
import clsx from 'clsx';

export function Chat(): JSX.Element {
  const { theme } = useContext(GlobalContext);
  return (
    <section
      className={clsx(
        'relative min-h-screen ',
        theme === 'dark' ? 'bg-[#1b1a1a]' : 'bg-[#e6e6e6]'
      )}
    >
      <ChatBody></ChatBody>
      <ChatInput></ChatInput>
    </section>
  );
}
