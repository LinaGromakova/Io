'use client';
import { ChatHeader } from '@/features/chat/ui';
import { ChatInput } from '@/features/chat/ui';
import { MessageList } from '@/features/chat/ui';
import { useParams } from 'next/navigation';

export function Chat() {
  const params = useParams();
  const chatId = params?.id as string;

  return (
    <section className="relative overflow-hidden flex flex-col justify-between h-lvh max-md:h-auto">
      <ChatHeader chatId={chatId}></ChatHeader>
      <MessageList chatId={chatId}></MessageList>
      <ChatInput chatId={chatId}></ChatInput>
    </section>
  );
}
