'use client';
import { ChatHeader } from '@/features/chat/ui/ChatHeader';
import { ChatInput } from '@/features/chat/ui/ChatInput';
import { MessageList } from '@/features/chat/ui/MessageList';
import { useParams } from 'next/navigation';

export function Chat() {
  const params = useParams();
  const chatId = params?.id as string;
  return (
    <section className="relative min-h-screen">
      <ChatHeader chatId={chatId}></ChatHeader>
      <MessageList chatId={chatId}></MessageList>
      <ChatInput chatId={chatId}></ChatInput>
    </section>
  );
}
