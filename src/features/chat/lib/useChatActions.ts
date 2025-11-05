import { useSetAtom } from 'jotai';
import { useFetch } from '@/shared/lib/hooks';
import { useRouter } from 'next/navigation';
import { setIsBlockAtom } from '../model/atoms';

export const useChatActions = () => {
  const router = useRouter();
  const { getData } = useFetch();
  const setIsBlock = useSetAtom(setIsBlockAtom);

  const getTargetUser = async (chatId: string, userId: string) => {
    try {
      const user = await getData(
        `http://localhost:5000/api/chats/${chatId}/${userId}`
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
        `http://localhost:5000/api/blacklist/check/${currentUserId}/${targetUserId}`
      );
      setIsBlock(!userInBlackList);
      return userInBlackList;
    } catch (error) {
      console.error('Blacklist check failed:', error);
      setIsBlock(false);
    }
  };

  return {
    getTargetUser,
    getMessages,
    checkBlackList,
  };
};
