'use client';
import { useState } from 'react';
import { InputMain } from '@/shared/ui/InputMain';
import { useThemeContext } from '@/features/common/contexts';
import { useSendMessage } from '../hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useBlackList } from '@/features/blacklist/hooks/useBlackList';
import { ChatInputBlock } from './ChatInputBlock';
import { useInitTargetUser } from '../hooks/useInitTargetUser';

interface ChatInputProps {
  chatId: string;
}
export function ChatInput({ chatId }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const { theme } = useThemeContext();
  const { user } = useAuth();
  const { targetUser } = useInitTargetUser(chatId);
  const { sendMessage } = useSendMessage(chatId, user.userId);
  const { userInBlackList } = useBlackList(
    user.userId,
    targetUser.userId,
    chatId
  );
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
          className="absolute px-2 py-4 flex justify-center w-full max-md:py-0 max-md:px-0 bottom-15"
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
