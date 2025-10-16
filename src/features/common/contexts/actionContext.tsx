import { useFetch } from '@/shared/lib/hooks';
import React from 'react';

interface ActionContextInterface {
  deleteUserChat: (chatId: string) => Promise<void>;
  blockUser: (userId: string, targetUserId: string) => Promise<void>;
  unBlockUser: (userId: string, targetUserId: string) => Promise<void>;
  writeUser: (currentUserId: string, targetUserId: string) => Promise<void>;
}
export const ActionContext = React.createContext<ActionContextInterface>(null!);

export function ActionProvider({ children }: { children: React.ReactNode }) {
  const { getData } = useFetch();

  const deleteUserChat = (chatId: string) => {
    return getData(`http://localhost:5000/delete_chat/${chatId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };
  const writeUser = (currentUserId: string, targetUserId: string) => {
    return getData('http://localhost:5000/start-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user1_id: currentUserId, user2_id: targetUserId }),
    });
  };
  const unBlockUser = (userId: string, targetUserId: string) => {
    return getData(
      `http://localhost:5000/delete_user_blacklist/${userId}/${targetUserId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const blockUser = (userId: string, targetUserId: string) => {
    return getData('http://localhost:5000/blacklist_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        targetUserId: targetUserId,
      }),
    });
  };

  const value = { deleteUserChat, writeUser, unBlockUser, blockUser };
  return (
    <ActionContext.Provider value={value}>{children}</ActionContext.Provider>
  );
}

export function useActionContext(): ActionContextInterface {
  return React.useContext(ActionContext);
}
