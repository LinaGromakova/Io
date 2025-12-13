'use client';
import { MessageItem } from '@/entities/message';
import Stellar from '@/shared/assets/chatIcons/Stellar.svg';
import { useChatMessages, useInitTargetUser } from '../../lib/hooks';
import { MessageInterface } from '../../types/MessageInterface';
import { useScrollToBottom } from '../../lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { MessageListLoading } from './MessageListLoading';
import { clsx } from 'clsx';

export function MessageList({ chatId }: { chatId: string }) {
  const { user } = useAuthState();
  const { messages } = useChatMessages(chatId, user?.userId || '');
  const { chatRef } = useScrollToBottom(messages);
  const { targetUser } = useInitTargetUser(chatId);

  if (!messages || targetUser?.userId === '' || !targetUser?.userId) {
    return <MessageListLoading></MessageListLoading>;
  }
  return (
    <section
      className={clsx(
        'pt-5 px-12 max-xl:px-8 max-md:px-6 w-full h-[calc(100vh-60px)] overflow-y-auto scrollbar-custom max-h-[100vh] overflow-x-hidden',
        messages && messages.length == 0 && 'overflow-y-hidden'
      )}
    >
      <Stellar
        className="absolute pointer-events-none top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-[calc(100vh)/2.5] 
         w-2/3 h-2/3 max-lg:w-[130%] max-xl:w-[90%] max-sm:w-[150%] max-[380px]:w-[250%]"
      />
      {messages && messages.length == 0 && (
        <div className="h-full flex flex-col justify-center items-center">
          <h1
            className="custom-title bg-radial-[at_50%_75%] from-accent to-accent-shadow
            bg-clip-text text-transparent text-center text-9xl max-lg:text-[92px] leading-normal max-sm:text-7xl"
          >
            It&apos;s empty
            <br />
            here yet
          </h1>
        </div>
      )}
      <div>
        {messages.map((message: MessageInterface) => {
          return (
            <MessageItem
              key={message.messageId}
              currentUserId={user?.userId || ''}
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
