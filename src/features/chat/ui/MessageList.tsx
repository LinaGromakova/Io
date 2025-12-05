'use client';
import { MessageItem } from '@/entities/message';
import Empty from '@/shared/assets/chatIcons/Empty.svg';
import Stellar from '@/shared/assets/chatIcons/Stellar.svg';
import { useChatMessages } from '../hooks/useChatMessages';
import { MessageInterface } from '../types/MessageInterface';
import { useScrollToBottom } from '../hooks';
import { useAuthState } from '@/features/auth/lib/useAuthState';
import { MessageListLoading } from './MessageListLoading';

export function MessageList({ chatId }: { chatId: string }) {
  const { user } = useAuthState();
  const { messages } = useChatMessages(chatId, user?.userId || '');
  const { chatRef } = useScrollToBottom(messages);

  if (!messages) {
    return <MessageListLoading></MessageListLoading>;
  }
  return (
    <section className="pt-5 px-12 max-xl:px-8 max-md:px-6 w-full h-[calc(100vh-60px)] overflow-y-auto scrollbar-custom max-h-[100vh] overflow-x-hidden">
      <Stellar
        className="absolute pointer-events-none top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-[calc(100vh)/2.5] 
         w-2/3 h-2/3 max-lg:w-[130%] max-xl:w-[90%] max-sm:w-[150%] max-[380px]:w-[250%]"
      />
      {messages.length == 0 && (
        <Empty
          className="w-[55%] min-2xl:w-[39%] h-1/2 mx-auto relative my-auto translate-y-[15vh]
         max-lg:w-11/12 max-md:w-2/3 max-sm:w-[85%]"
        />
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
        <div ref={chatRef} className="h-26 max-md:h-18"></div>
      </div>
    </section>
  );
}
