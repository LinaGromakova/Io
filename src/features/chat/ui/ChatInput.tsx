'use client';
import { useState } from 'react';
import { InputMain } from '@/shared/ui/InputMain';
import { useChatMessages, useSendMessage } from '../hooks';
import { useBlackList } from '@/features/blacklist/hooks/useBlackList';
import { ChatInputBlock } from './ChatInputBlock';
import { useInitTargetUser } from '../hooks/useInitTargetUser';
import { useAuthState } from '@/features/auth/lib/useAuthState';
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
    targetUser.userId,
    chatId
  );
  const { messages } = useChatMessages(chatId, user?.userId || '');

  if (!messages) {
    return <ChatInputLoading></ChatInputLoading>;
  }
  return (
    <>
      {userInBlackList.block ? (
        <ChatInputBlock
          currentUserId={user.userId}
          targetUserId={userInBlackList.targetUserId}
        ></ChatInputBlock>
      ) : (
        <form
          action="#"
          onSubmit={(e) => e.preventDefault()}
          className="absolute px-2 flex justify-center w-full max-md:py-0 max-md:px-0 bottom-15 max-md:bottom-6"
        >
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
