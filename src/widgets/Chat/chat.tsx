import { ChatBody } from '@/entities/ChatBody/chat-body';
import { ChatInput } from '@/features/ChatInput/ChatInput';
import { JSX } from 'react';
export function Chat(): JSX.Element {
  return (
    <section className='chat-wallpaper'>
      <ChatBody></ChatBody>
      <ChatInput></ChatInput>
    </section>
  );
}
