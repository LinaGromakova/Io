'use client';
import { useFetch } from '@/shared/lib/hooks';

export const useActions = () => {
  const { getData } = useFetch();
  const deleteUserChat = (chatId: string) => {
    return getData(`http://localhost:5000/api/chat/delete/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const writeUser = (currentUserId: string, targetUserId: string) => {
    const data = getData('http://localhost:5000/api/chats/start-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        сhatMemberId1: currentUserId,
        сhatMemberId2: targetUserId,
      }),
    });
    console.log(data);
    return data;
  };
  const unBlockUser = (userId: string, targetUserId: string) => {
    return getData(
      `http://localhost:5000/api/blacklist/delete/${userId}/${targetUserId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const blockUser = (userId: string, targetUserId: string) => {
    return getData('http://localhost:5000/api/blacklist/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentUserId: userId,
        targetUserId: targetUserId,
      }),
    });
  };

  return { deleteUserChat, writeUser, unBlockUser, blockUser };
};
