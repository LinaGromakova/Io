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
  // const { user } = useAuth();
  const user = {
    userId: '5HEzeZ4dB0iA2wJ3NdmvS',
    userName: 'Lina=',
    userImage: '/uploads/avatars/avatar-1759159994251-893137663.jpg',
    onlineStatus: false,
    lastSeen: '2025-10-13T00:49:32.751Z',
    createdAt: '2025-08-27T19:03:13.408Z',
  };
  const { targetUser } = useInitTargetUser(chatId);
  const { sendMessage } = useSendMessage(chatId, user?.userId || '');
  const { userInBlackList } = useBlackList(
    user?.userId || '',
    targetUser.userId,
    chatId
  );
  console.log('Chat Input rendering');
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
