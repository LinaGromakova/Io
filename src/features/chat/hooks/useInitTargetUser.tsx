import { useEffect, useState } from 'react';
import { useChatContext } from '../context';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useSocketContext } from '@/features/socket/context/socketContext';

type TargetUserInterface = {
  userId: string;
  userName: string;
  userImage: string;
  onlineStatus: boolean;
};

export function useInitTargetUser(chatId: string) {
  const { socket } = useSocketContext();
  const { user } = useAuth();
  const { getTargetUser } = useChatContext();
  const [targetUser, setTargetUser] = useState<TargetUserInterface>({
    userId: '',
    userName: '',
    userImage: '',
    onlineStatus: false,
  });

  useEffect(() => {
    if (!chatId || !user?.userId) return;

    const fetchUser = async () => {
      const userData = await getTargetUser(chatId, user.userId);
      setTargetUser(userData);
    };

    fetchUser();
  }, [chatId]);

  useEffect(() => {
    socket.on('update-online', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, onlineStatus: data.onlineStatus }
          : user;
      });
    });
    return () => {
      socket.off('update-online');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-image', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userImage: data.userimage }
          : user;
      });
    });
    return () => {
      socket.off('update-image');
    };
  }, [socket]);

  useEffect(() => {
    socket.on('update-name', (data) => {
      setTargetUser((user) => {
        return data.userId === user.userId
          ? { ...user, userName: data.userName }
          : user;
      });
    });
    return () => {
      socket.off('update-name');
    };
  }, [socket]);

  return { targetUser };
}
