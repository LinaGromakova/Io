import { useEffect, useState } from 'react';
import { useAuthState } from '@/features/auth/lib/hooks';
import { useChatActions } from './use-chat-actions';
import { getSocket } from '@/shared/api/socket';
import { useRouter } from 'next/navigation';
import { UserShortInterface } from '@/shared/types/domain';

export function useInitTargetUser(chatId: string) {
  const socket = getSocket();
  const { user } = useAuthState();
  const { getTargetUser } = useChatActions();
  const router = useRouter();
  const [targetUser, setTargetUser] = useState<UserShortInterface>({
    userId: '',
    userName: '',
    userImage: '',
    onlineStatus: false,
  });

  useEffect(() => {
    if (!chatId || !user?.userId) return;
    const fetchUser = async () => {
      const userData = await getTargetUser(chatId, user.userId);
      if (!userData) {
        router.push('/404');
      }
      setTargetUser(userData);
    };
    fetchUser();
  }, [chatId, user]);

  useEffect(() => {
    socket.on('updateOnline', (data) => {
      if (data) {
        setTargetUser((user) => {
          return data.userId === user.userId
            ? { ...user, onlineStatus: data.onlineStatus }
            : user;
        });
      }
    });
    return () => {
      socket.off('updateOnline');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateImage', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userImage: data.userImage }
          : user;
      });
    });
    return () => {
      socket.off('updateImage');
    };
  }, [socket]);
  useEffect(() => {
    socket.on('updateName', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userName: data.userName }
          : user;
      });
    });
    return () => {
      socket.off('updateName');
    };
  }, [socket]);
  return { targetUser };
}
