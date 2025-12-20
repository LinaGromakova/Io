'use client';
import { RequestGuard } from '@/shared/api/client';
import { API_URL } from '@/shared/lib/config';

export const useChatActions = () => {
  const guard = RequestGuard.getInstance();

  const getTargetUser = async (chatId: string, userId: string) => {
    const key = `targetUser-${chatId}-${userId}`;
    return guard.execute(key, async () => {
      const response = await fetch(`${API_URL}/api/chats/${chatId}/${userId}`);
      if (
        response.status === 200 &&
        response.headers.get('content-length') === '0'
      ) {
        return undefined;
      }
      return response.json();
    });
  };
  const getMessages = async (chatId: string) => {
    const key = `messages-${chatId}`;
    return guard.execute(key, async () => {
      const response = await fetch(`${API_URL}/chat/${chatId}`);
      return response.json();
    });
  };

  const checkBlackList = async (
    currentUserId: string,
    targetUserId?: string
  ) => {
    const key = `blacklist-${currentUserId}-${targetUserId}`;
    return guard.execute(key, async () => {
      const response = await fetch(
        `${API_URL}/api/blacklist/check/${currentUserId}/${targetUserId}`
      );
      return response.json();
    });
  };

  return {
    getTargetUser,
    getMessages,
    checkBlackList,
  };
};
