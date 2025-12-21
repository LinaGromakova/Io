'use client';
import { useState } from 'react';
import { InputMain } from '@/shared/ui/InputMain';
import { useChatMessages, useSendMessage } from '../../lib/hooks';
import { useBlackList } from '@/features/blacklist/lib/hooks/use-blacklist';
import { ChatInputBlock } from './ChatInputBlock';
import { useInitTargetUser } from '../../lib/hooks';
import { useAuthState } from '@/features/auth/lib/hooks';
import { ChatInputLoading } from './ChatInputLoading';
import { useTheme } from '@/features/theme/hooks/useTheme';

interface ChatInputProps {
  chatId: string;
}
export function ChatInput({ chatId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { theme } = useTheme();
  const { user } = useAuthState();
  const { targetUser } = useInitTargetUser(chatId);
  const { sendMessage } = useSendMessage(chatId, user?.userId || '');
  const { userInBlackList } = useBlackList(
    user?.userId || '',
    targetUser?.userId || '',
    chatId
  );
  const { messages } = useChatMessages(chatId, user?.userId || '');
  if (!messages || !targetUser?.userId || targetUser?.userId === '') {
    return <ChatInputLoading></ChatInputLoading>;
  }
  return (
    <>
      {userInBlackList.isBlock ? (
        <ChatInputBlock
          currentUserId={user?.userId || ''}
          targetUserId={userInBlackList.blockedUserId}
        ></ChatInputBlock>
      ) : (
        <form
          action="#"
          onSubmit={(e) => e.preventDefault()}
          className="px-2 flex justify-center w-full h-10
         max-md:mb-0 max-md:px-0 mb-6 absolute bottom-0"
        >
          <div className="w-full h-[10%] fixed bottom-0 blur-2xl bg-extra max-md:hidden z-0"></div>
          <InputMain
            changeHandler={(e) => setMessage(e.target.value)}
            setMessage={setMessage}
            theme={theme}
            type="text"
            value={message}
            purpose="message"
            placeholder="Сообщение..."
            name="chat"
            sendMessage={() => {
              sendMessage(message);
              setMessage('');
            }}
          ></InputMain>
        </form>
      )}
    </>
  );
}
