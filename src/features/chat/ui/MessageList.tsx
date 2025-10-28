'use client';
import { MessageItem } from '@/entities/message';
import { useAuth } from '@/features/auth/hooks/useAuth';
import Empty from '@/shared/assets/chatIcons/Empty.svg';
import Stellar from '@/shared/assets/chatIcons/Stellar.svg';
import { useChatMessages } from '../hooks/useChatMessages';
import { MessageInterface } from '../types/MessageInterface';
import { useScrollToBottom } from '../hooks';

export function MessageList({ chatId }: { chatId: string }) {
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  // const { user } = useAuth();
  const { messages } = useChatMessages(chatId, user?.userId || '');
  const { chatRef } = useScrollToBottom(messages);
  if (!user || !user.userId || !chatId) {
    return <div>Loading messages...</div>;
  }
  console.log('MessageList rendering');
  return (
    <section className="pt-5 px-12 max-md:px-6 w-full h-[calc(100vh-80px)] overflow-y-auto scrollbar-custom">
      <Stellar className="absolute pointer-events-none top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-[calc(100vh)/2.5] w-2/3 h-2/3" />
      {messages.length == 0 && (
        <Empty className="w-2/3 h-2/3 mx-auto relative my-auto translate-y-[10vh]" />
      )}
      <div>
        {messages.map((message: MessageInterface) => {
          return (
            <MessageItem
              key={message.messageId}
              currentUserId={user.userId}
              senderId={message.senderId}
              content={message.content}
              isRead={message.isRead}
              createdAt={message.createdAt}
            ></MessageItem>
          );
        })}
        <div ref={chatRef} className="h-15"></div>
      </div>
    </section>
  );
}
