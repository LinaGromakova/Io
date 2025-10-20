import { useFetch } from '@/shared/lib/hooks';
import React from 'react';
import { MessageInterface } from '../types/MessageInterface';
import { useRouter } from 'next/navigation';

type TargetUserInterface = {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
};

interface ChatContextInterface {
  getTargetUser: (
    chatId: string,
    userId: string
  ) => Promise<TargetUserInterface>;
  isBlock: boolean;
  setIsBlock: React.Dispatch<React.SetStateAction<boolean>>;
  getMessages: (chatId: string) => Promise<MessageInterface[]>;
  checkBlackList: (currentUserId: string, targetUserId: string) => void;
}
export const ChatContext = React.createContext<ChatContextInterface>(null!);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { getData } = useFetch();
  const [isBlock, setIsBlock] = React.useState(false);

  const getTargetUser = async (chatId: string, userId: string) => {
    try {
      const user = await getData(
        `http://localhost:5000/${chatId}/user/${userId}`
      );
      return user;
    } catch (error) {
      if (error instanceof Error && 'status' in error) {
        router.replace(`/${error.status}`);
        return null;
      }
      return null;
    }
  };

  const getMessages = async (chatId: string) => {
    try {
      const messages = await getData(`http://localhost:5000/chat/${chatId}`);
      return messages;
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      return [];
    }
  };

  const checkBlackList = async (
    currentUserId: string,
    targetUserId: string
  ) => {
    try {
      const userInBlackList = await getData(
        `http://localhost:5000/check_blacklist/${currentUserId}/${targetUserId}`
      );
      setIsBlock(!userInBlackList);
      return userInBlackList;
    } catch (error) {
      console.error('Blacklist check failed:', error);
      setIsBlock(false);
    }
  };
  const value = {
    isBlock,
    setIsBlock,
    getMessages,
    checkBlackList,
    getTargetUser,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextInterface {
  return React.useContext(ChatContext);
}
